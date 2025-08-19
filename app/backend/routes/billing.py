"""Billing and payment API routes."""

from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from services.billing_service import BillingService
from utils.auth import get_current_user
from utils.database import get_db
from utils.logging import logger

router = APIRouter(prefix="/api/billing", tags=["billing"])


class BillingHistoryResponse(BaseModel):
    """Response schema for billing history."""
    billing_records: List[Dict[str, Any]]
    total: int
    page: int
    per_page: int


class BillingSummaryResponse(BaseModel):
    """Response schema for billing summary."""
    period_days: int
    total_amount: float
    total_records: int
    billing_by_type: Dict[str, float]


@router.get("/history", response_model=BillingHistoryResponse)
async def get_billing_history(
    page: int = 1,
    per_page: int = 50,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's billing history with pagination."""
    
    if per_page > 100:
        per_page = 100
    
    offset = (page - 1) * per_page
    
    billing_records = await BillingService.get_user_billing_history(
        db=db,
        user_id=current_user.id,
        limit=per_page,
        offset=offset
    )
    
    records_data = [record.to_dict() for record in billing_records]
    
    return BillingHistoryResponse(
        billing_records=records_data,
        total=len(records_data),  # This should be the actual total count
        page=page,
        per_page=per_page
    )


@router.get("/summary", response_model=BillingSummaryResponse)
async def get_billing_summary(
    days: int = 30,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get billing summary for the user."""
    
    if days > 365:
        days = 365  # Limit to 1 year
    
    summary = await BillingService.get_billing_summary(
        db=db,
        user_id=current_user.id,
        days=days
    )
    
    return BillingSummaryResponse(**summary)


@router.post("/webhooks/stripe")
async def stripe_webhook(
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    """Handle Stripe webhook events."""
    
    try:
        payload = await request.body()
        sig_header = request.headers.get('stripe-signature')
        
        if not sig_header:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Missing Stripe signature header"
            )
        
        # Process the webhook
        from services.stripe_service import StripeService
        event = StripeService.process_webhook(payload, sig_header)
        
        # Handle the event
        billing_record = await BillingService.process_stripe_webhook(db, event)
        
        logger.info(f"Stripe webhook processed: {event['type']}")
        
        return {
            "received": True,
            "event_type": event["type"],
            "billing_record_id": billing_record.id if billing_record else None
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Stripe webhook error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Webhook processing failed"
        )


@router.get("/invoices")
async def get_invoices(
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's invoices from Stripe."""
    
    if not current_user.stripe_customer_id:
        return {"invoices": []}
    
    try:
        import stripe
        from utils.config import settings
        
        stripe.api_key = settings.stripe_secret_key
        
        invoices = stripe.Invoice.list(
            customer=current_user.stripe_customer_id,
            limit=50
        )
        
        invoice_data = []
        for invoice in invoices.data:
            invoice_data.append({
                "id": invoice.id,
                "amount_paid": invoice.amount_paid / 100.0,  # Convert from cents
                "amount_due": invoice.amount_due / 100.0,
                "currency": invoice.currency,
                "status": invoice.status,
                "invoice_pdf": invoice.invoice_pdf,
                "hosted_invoice_url": invoice.hosted_invoice_url,
                "created": invoice.created,
                "due_date": invoice.due_date,
                "subscription": invoice.subscription,
                "description": invoice.description,
            })
        
        return {"invoices": invoice_data}
        
    except Exception as e:
        logger.error(f"Error fetching invoices for user {current_user.id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch invoices"
        )


@router.get("/payment-methods")
async def get_payment_methods(
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's saved payment methods."""
    
    if not current_user.stripe_customer_id:
        return {"payment_methods": []}
    
    try:
        from services.stripe_service import StripeService
        
        payment_methods = StripeService.list_payment_methods(
            customer_id=current_user.stripe_customer_id
        )
        
        method_data = []
        for method in payment_methods:
            if method.type == "card":
                method_data.append({
                    "id": method.id,
                    "brand": method.card.brand,
                    "last4": method.card.last4,
                    "exp_month": method.card.exp_month,
                    "exp_year": method.card.exp_year,
                    "created": method.created,
                })
        
        return {"payment_methods": method_data}
        
    except Exception as e:
        logger.error(f"Error fetching payment methods for user {current_user.id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch payment methods"
        )


@router.post("/setup-intent")
async def create_setup_intent(
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a setup intent for saving payment methods."""
    
    if not current_user.stripe_customer_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User must have a Stripe customer account"
        )
    
    try:
        from services.stripe_service import StripeService
        
        setup_intent = StripeService.create_setup_intent(
            customer_id=current_user.stripe_customer_id
        )
        
        return {
            "client_secret": setup_intent.client_secret,
            "setup_intent_id": setup_intent.id
        }
        
    except Exception as e:
        logger.error(f"Setup intent creation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create setup intent"
        )


@router.get("/usage-billing")
async def get_usage_billing_estimate(
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get estimate for current month's usage-based billing."""
    
    from datetime import datetime, timedelta
    from services.subscription_service import SubscriptionService
    from services.operation_service import OperationService
    from utils.config import settings
    
    # Get current subscription
    subscription = await SubscriptionService.get_user_subscription(
        db=db, user_id=current_user.id
    )
    
    if not subscription:
        return {
            "has_subscription": False,
            "usage_billing": 0.0,
            "operations_over_limit": 0
        }
    
    # Calculate overage
    operations_over_limit = max(0, subscription.operations_used_this_month - subscription.operations_limit)
    usage_billing = operations_over_limit * settings.operation_cost_per_execution
    
    return {
        "has_subscription": True,
        "subscription_tier": subscription.tier,
        "operations_used": subscription.operations_used_this_month,
        "operations_limit": subscription.operations_limit,
        "operations_over_limit": operations_over_limit,
        "usage_billing": usage_billing,
        "cost_per_operation": settings.operation_cost_per_execution
    }