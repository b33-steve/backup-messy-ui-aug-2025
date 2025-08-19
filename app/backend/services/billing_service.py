"""Billing service for handling payments and usage-based billing."""

from typing import Optional, List, Dict, Any
from datetime import datetime, timedelta
from decimal import Decimal
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, func, desc
from models.billing import BillingRecord
from models.user import User
from models.subscription import Subscription
from models.operation import Operation
from services.stripe_service import StripeService
from utils.config import settings
from utils.logging import logger, log_billing_event


class BillingService:
    """Service for billing operations and Stripe integration."""
    
    @staticmethod
    async def create_billing_record(
        db: AsyncSession,
        user_id: int,
        event_type: str,
        amount: float,
        stripe_event_id: str = None,
        stripe_invoice_id: str = None,
        stripe_subscription_id: str = None,
        description: str = None,
        metadata: Dict[str, Any] = None
    ) -> BillingRecord:
        """Create a billing record."""
        billing_record = BillingRecord(
            user_id=user_id,
            event_type=event_type,
            amount=amount,
            stripe_event_id=stripe_event_id,
            stripe_invoice_id=stripe_invoice_id,
            stripe_subscription_id=stripe_subscription_id,
            description=description,
            metadata=str(metadata) if metadata else None
        )
        
        db.add(billing_record)
        await db.commit()
        await db.refresh(billing_record)
        
        log_billing_event(
            user_id=user_id,
            event_type=event_type,
            amount=amount,
            context={"billing_record_id": billing_record.id}
        )
        
        return billing_record
    
    @staticmethod
    async def process_subscription_created(
        db: AsyncSession,
        user_id: int,
        stripe_subscription_id: str,
        amount: float
    ) -> BillingRecord:
        """Process subscription creation billing event."""
        return await BillingService.create_billing_record(
            db=db,
            user_id=user_id,
            event_type="subscription_created",
            amount=amount,
            stripe_subscription_id=stripe_subscription_id,
            description="Monthly subscription payment"
        )
    
    @staticmethod
    async def process_invoice_paid(
        db: AsyncSession,
        user_id: int,
        stripe_invoice_id: str,
        stripe_subscription_id: str,
        amount: float
    ) -> BillingRecord:
        """Process successful invoice payment."""
        billing_record = await BillingService.create_billing_record(
            db=db,
            user_id=user_id,
            event_type="invoice_paid",
            amount=amount,
            stripe_invoice_id=stripe_invoice_id,
            stripe_subscription_id=stripe_subscription_id,
            description="Invoice payment received"
        )
        
        billing_record.mark_completed()
        await db.commit()
        
        return billing_record
    
    @staticmethod
    async def process_payment_failed(
        db: AsyncSession,
        user_id: int,
        stripe_invoice_id: str,
        amount: float,
        error_message: str = None
    ) -> BillingRecord:
        """Process failed payment."""
        billing_record = await BillingService.create_billing_record(
            db=db,
            user_id=user_id,
            event_type="payment_failed",
            amount=amount,
            stripe_invoice_id=stripe_invoice_id,
            description="Payment failed",
            metadata={"error": error_message} if error_message else None
        )
        
        billing_record.mark_failed(error_message)
        await db.commit()
        
        return billing_record
    
    @staticmethod
    async def bill_operation_usage(
        db: AsyncSession,
        user_id: int,
        billing_period_start: datetime,
        billing_period_end: datetime
    ) -> Optional[BillingRecord]:
        """Bill user for operation usage in a billing period."""
        
        # Get unbilled operations in the period
        stmt = select(Operation).where(
            and_(
                Operation.user_id == user_id,
                Operation.created_at >= billing_period_start,
                Operation.created_at < billing_period_end,
                Operation.billed == False,
                Operation.status == "completed"
            )
        )
        result = await db.execute(stmt)
        operations = result.scalars().all()
        
        if not operations:
            return None
        
        # Calculate total cost
        total_cost = sum(op.cost for op in operations)
        operations_count = len(operations)
        
        # Create billing record
        billing_record = BillingRecord.create_operation_billing(
            user_id=user_id,
            operations_count=operations_count,
            amount=float(total_cost),
            billing_period_start=billing_period_start,
            billing_period_end=billing_period_end
        )
        
        db.add(billing_record)
        
        # Mark operations as billed
        for operation in operations:
            operation.billed = True
        
        await db.commit()
        await db.refresh(billing_record)
        
        # Create Stripe invoice item if user has Stripe customer ID
        user = await BillingService._get_user(db, user_id)
        if user and user.stripe_customer_id:
            try:
                StripeService.create_invoice_item(
                    customer_id=user.stripe_customer_id,
                    amount=int(total_cost * 100),  # Convert to cents
                    description=f"Intelligence Operations usage ({operations_count} operations)",
                    metadata={
                        "billing_record_id": str(billing_record.id),
                        "user_id": str(user_id),
                        "operations_count": str(operations_count)
                    }
                )
            except Exception as e:
                logger.error(f"Failed to create Stripe invoice item: {str(e)}")
        
        logger.info(
            f"Billed user {user_id} for {operations_count} operations: ${total_cost:.2f}"
        )
        
        return billing_record
    
    @staticmethod
    async def get_user_billing_history(
        db: AsyncSession,
        user_id: int,
        limit: int = 50,
        offset: int = 0
    ) -> List[BillingRecord]:
        """Get billing history for a user."""
        stmt = (
            select(BillingRecord)
            .where(BillingRecord.user_id == user_id)
            .order_by(desc(BillingRecord.created_at))
            .limit(limit)
            .offset(offset)
        )
        
        result = await db.execute(stmt)
        return result.scalars().all()
    
    @staticmethod
    async def get_billing_summary(
        db: AsyncSession,
        user_id: int,
        days: int = 30
    ) -> Dict[str, Any]:
        """Get billing summary for a user."""
        since_date = datetime.utcnow() - timedelta(days=days)
        
        # Total amount billed
        amount_stmt = select(func.sum(BillingRecord.amount)).where(
            and_(
                BillingRecord.user_id == user_id,
                BillingRecord.created_at >= since_date,
                BillingRecord.status == "completed"
            )
        )
        amount_result = await db.execute(amount_stmt)
        total_amount = amount_result.scalar() or 0
        
        # Billing by event type
        type_stmt = (
            select(BillingRecord.event_type, func.sum(BillingRecord.amount))
            .where(
                and_(
                    BillingRecord.user_id == user_id,
                    BillingRecord.created_at >= since_date,
                    BillingRecord.status == "completed"
                )
            )
            .group_by(BillingRecord.event_type)
        )
        type_result = await db.execute(type_stmt)
        billing_by_type = dict(type_result.fetchall())
        
        # Number of billing records
        count_stmt = select(func.count(BillingRecord.id)).where(
            and_(
                BillingRecord.user_id == user_id,
                BillingRecord.created_at >= since_date
            )
        )
        count_result = await db.execute(count_stmt)
        total_records = count_result.scalar()
        
        return {
            "period_days": days,
            "total_amount": float(total_amount),
            "total_records": total_records,
            "billing_by_type": {k: float(v) for k, v in billing_by_type.items()},
        }
    
    @staticmethod
    async def process_stripe_webhook(
        db: AsyncSession,
        event: Dict[str, Any]
    ) -> Optional[BillingRecord]:
        """Process Stripe webhook event."""
        event_type = event["type"]
        data = event["data"]["object"]
        
        try:
            if event_type == "invoice.payment_succeeded":
                return await BillingService._handle_invoice_payment_succeeded(db, data)
            elif event_type == "invoice.payment_failed":
                return await BillingService._handle_invoice_payment_failed(db, data)
            elif event_type == "customer.subscription.created":
                return await BillingService._handle_subscription_created(db, data)
            elif event_type == "customer.subscription.updated":
                return await BillingService._handle_subscription_updated(db, data)
            elif event_type == "customer.subscription.deleted":
                return await BillingService._handle_subscription_deleted(db, data)
            else:
                logger.info(f"Unhandled webhook event type: {event_type}")
                return None
                
        except Exception as e:
            logger.error(f"Error processing webhook {event_type}: {str(e)}")
            raise
    
    @staticmethod
    async def _handle_invoice_payment_succeeded(
        db: AsyncSession,
        invoice: Dict[str, Any]
    ) -> Optional[BillingRecord]:
        """Handle successful invoice payment."""
        customer_id = invoice["customer"]
        amount = invoice["amount_paid"] / 100.0  # Convert from cents
        
        user = await BillingService._get_user_by_stripe_customer_id(db, customer_id)
        if not user:
            logger.warning(f"User not found for Stripe customer: {customer_id}")
            return None
        
        return await BillingService.process_invoice_paid(
            db=db,
            user_id=user.id,
            stripe_invoice_id=invoice["id"],
            stripe_subscription_id=invoice.get("subscription"),
            amount=amount
        )
    
    @staticmethod
    async def _handle_invoice_payment_failed(
        db: AsyncSession,
        invoice: Dict[str, Any]
    ) -> Optional[BillingRecord]:
        """Handle failed invoice payment."""
        customer_id = invoice["customer"]
        amount = invoice["amount_due"] / 100.0  # Convert from cents
        
        user = await BillingService._get_user_by_stripe_customer_id(db, customer_id)
        if not user:
            logger.warning(f"User not found for Stripe customer: {customer_id}")
            return None
        
        return await BillingService.process_payment_failed(
            db=db,
            user_id=user.id,
            stripe_invoice_id=invoice["id"],
            amount=amount,
            error_message=invoice.get("last_finalization_error", {}).get("message")
        )
    
    @staticmethod
    async def _handle_subscription_created(
        db: AsyncSession,
        subscription: Dict[str, Any]
    ) -> Optional[BillingRecord]:
        """Handle subscription creation."""
        customer_id = subscription["customer"]
        amount = subscription["items"]["data"][0]["price"]["unit_amount"] / 100.0
        
        user = await BillingService._get_user_by_stripe_customer_id(db, customer_id)
        if not user:
            logger.warning(f"User not found for Stripe customer: {customer_id}")
            return None
        
        return await BillingService.process_subscription_created(
            db=db,
            user_id=user.id,
            stripe_subscription_id=subscription["id"],
            amount=amount
        )
    
    @staticmethod
    async def _handle_subscription_updated(
        db: AsyncSession,
        subscription: Dict[str, Any]
    ) -> None:
        """Handle subscription update."""
        # This would update the subscription in our database
        # Implementation depends on what needs to be updated
        logger.info(f"Subscription updated: {subscription['id']}")
    
    @staticmethod
    async def _handle_subscription_deleted(
        db: AsyncSession,
        subscription: Dict[str, Any]
    ) -> None:
        """Handle subscription deletion."""
        # This would mark the subscription as canceled in our database
        logger.info(f"Subscription deleted: {subscription['id']}")
    
    @staticmethod
    async def _get_user(db: AsyncSession, user_id: int) -> Optional[User]:
        """Get user by ID."""
        stmt = select(User).where(User.id == user_id)
        result = await db.execute(stmt)
        return result.scalar_one_or_none()
    
    @staticmethod
    async def _get_user_by_stripe_customer_id(
        db: AsyncSession, 
        stripe_customer_id: str
    ) -> Optional[User]:
        """Get user by Stripe customer ID."""
        stmt = select(User).where(User.stripe_customer_id == stripe_customer_id)
        result = await db.execute(stmt)
        return result.scalar_one_or_none()