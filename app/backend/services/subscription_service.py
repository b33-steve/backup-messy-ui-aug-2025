"""Subscription management service."""

from typing import Optional, List
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, func
from fastapi import HTTPException, status
from models.user import User
from models.subscription import Subscription
from utils.config import SubscriptionTier, settings
from utils.logging import logger, log_billing_event


class SubscriptionService:
    """Service for subscription management operations."""
    
    @staticmethod
    async def create_subscription(
        db: AsyncSession,
        user_id: int,
        tier: str,
        stripe_subscription_id: str = None,
        stripe_price_id: str = None
    ) -> Subscription:
        """Create a new subscription for a user."""
        
        if not SubscriptionTier.is_valid_tier(tier):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid subscription tier: {tier}"
            )
        
        # Deactivate existing subscriptions
        await SubscriptionService.deactivate_user_subscriptions(db, user_id)
        
        # Create new subscription
        subscription = Subscription.create_from_tier(user_id, tier)
        subscription.stripe_subscription_id = stripe_subscription_id
        subscription.stripe_price_id = stripe_price_id
        subscription.current_period_start = datetime.utcnow()
        subscription.current_period_end = datetime.utcnow() + timedelta(days=30)
        
        db.add(subscription)
        await db.commit()
        await db.refresh(subscription)
        
        log_billing_event(
            user_id=user_id,
            event_type="subscription_created",
            subscription_tier=tier,
            amount=float(subscription.monthly_price)
        )
        
        logger.info(f"Subscription created: {tier} for user {user_id}")
        return subscription
    
    @staticmethod
    async def get_user_subscription(
        db: AsyncSession, 
        user_id: int
    ) -> Optional[Subscription]:
        """Get active subscription for a user."""
        stmt = select(Subscription).where(
            and_(
                Subscription.user_id == user_id,
                Subscription.status == "active"
            )
        )
        result = await db.execute(stmt)
        return result.scalar_one_or_none()
    
    @staticmethod
    async def update_subscription_tier(
        db: AsyncSession,
        user_id: int,
        new_tier: str
    ) -> Subscription:
        """Update user's subscription tier."""
        
        if not SubscriptionTier.is_valid_tier(new_tier):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid subscription tier: {new_tier}"
            )
        
        subscription = await SubscriptionService.get_user_subscription(db, user_id)
        if not subscription:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No active subscription found"
            )
        
        old_tier = subscription.tier
        subscription.tier = new_tier
        subscription.operations_limit = SubscriptionTier.get_limit(new_tier)
        subscription.monthly_price = SubscriptionTier.get_price(new_tier) / 100.0
        
        await db.commit()
        await db.refresh(subscription)
        
        log_billing_event(
            user_id=user_id,
            event_type="subscription_updated",
            subscription_tier=new_tier,
            context={"old_tier": old_tier, "new_tier": new_tier}
        )
        
        logger.info(f"Subscription updated: {old_tier} -> {new_tier} for user {user_id}")
        return subscription
    
    @staticmethod
    async def cancel_subscription(
        db: AsyncSession,
        user_id: int,
        cancel_at_period_end: bool = True
    ) -> Subscription:
        """Cancel user's subscription."""
        subscription = await SubscriptionService.get_user_subscription(db, user_id)
        if not subscription:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No active subscription found"
            )
        
        if cancel_at_period_end:
            subscription.cancel_at_period_end = True
        else:
            subscription.status = "canceled"
            subscription.canceled_at = datetime.utcnow()
        
        await db.commit()
        await db.refresh(subscription)
        
        log_billing_event(
            user_id=user_id,
            event_type="subscription_canceled",
            subscription_tier=subscription.tier,
            context={"cancel_at_period_end": cancel_at_period_end}
        )
        
        logger.info(f"Subscription canceled for user {user_id}")
        return subscription
    
    @staticmethod
    async def increment_operation_usage(
        db: AsyncSession,
        user_id: int
    ) -> Subscription:
        """Increment operation usage for user's subscription."""
        subscription = await SubscriptionService.get_user_subscription(db, user_id)
        if not subscription:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No active subscription found"
            )
        
        subscription.increment_usage()
        await db.commit()
        await db.refresh(subscription)
        
        return subscription
    
    @staticmethod
    async def check_operation_limit(
        db: AsyncSession,
        user_id: int
    ) -> tuple[bool, Optional[Subscription]]:
        """Check if user can execute another operation."""
        subscription = await SubscriptionService.get_user_subscription(db, user_id)
        if not subscription:
            return False, None
        
        return subscription.can_execute_operation(), subscription
    
    @staticmethod
    async def reset_monthly_usage(
        db: AsyncSession,
        subscription_id: int
    ) -> Subscription:
        """Reset monthly usage for a subscription (called at billing period start)."""
        stmt = select(Subscription).where(Subscription.id == subscription_id)
        result = await db.execute(stmt)
        subscription = result.scalar_one_or_none()
        
        if not subscription:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Subscription not found"
            )
        
        subscription.reset_monthly_usage()
        subscription.current_period_start = datetime.utcnow()
        subscription.current_period_end = datetime.utcnow() + timedelta(days=30)
        
        await db.commit()
        await db.refresh(subscription)
        
        logger.info(f"Monthly usage reset for subscription {subscription_id}")
        return subscription
    
    @staticmethod
    async def deactivate_user_subscriptions(
        db: AsyncSession,
        user_id: int
    ) -> None:
        """Deactivate all active subscriptions for a user."""
        stmt = select(Subscription).where(
            and_(
                Subscription.user_id == user_id,
                Subscription.status == "active"
            )
        )
        result = await db.execute(stmt)
        subscriptions = result.scalars().all()
        
        for subscription in subscriptions:
            subscription.status = "canceled"
            subscription.canceled_at = datetime.utcnow()
        
        await db.commit()
        logger.info(f"Deactivated {len(subscriptions)} subscriptions for user {user_id}")
    
    @staticmethod
    async def get_subscription_by_stripe_id(
        db: AsyncSession,
        stripe_subscription_id: str
    ) -> Optional[Subscription]:
        """Get subscription by Stripe subscription ID."""
        stmt = select(Subscription).where(
            Subscription.stripe_subscription_id == stripe_subscription_id
        )
        result = await db.execute(stmt)
        return result.scalar_one_or_none()
    
    @staticmethod
    async def update_subscription_from_stripe(
        db: AsyncSession,
        stripe_subscription_id: str,
        status: str,
        current_period_start: datetime = None,
        current_period_end: datetime = None
    ) -> Optional[Subscription]:
        """Update subscription from Stripe webhook data."""
        subscription = await SubscriptionService.get_subscription_by_stripe_id(
            db, stripe_subscription_id
        )
        
        if not subscription:
            return None
        
        subscription.status = status
        if current_period_start:
            subscription.current_period_start = current_period_start
        if current_period_end:
            subscription.current_period_end = current_period_end
        
        await db.commit()
        await db.refresh(subscription)
        
        logger.info(f"Subscription {subscription.id} updated from Stripe: {status}")
        return subscription
    
    @staticmethod
    async def get_usage_statistics(
        db: AsyncSession,
        user_id: int
    ) -> dict:
        """Get usage statistics for a user."""
        subscription = await SubscriptionService.get_user_subscription(db, user_id)
        if not subscription:
            return {
                "tier": None,
                "operations_used": 0,
                "operations_limit": 0,
                "operations_remaining": 0,
                "usage_percentage": 0.0,
            }
        
        return {
            "tier": subscription.tier,
            "operations_used": subscription.operations_used_this_month,
            "operations_limit": subscription.operations_limit,
            "operations_remaining": subscription.operations_remaining,
            "usage_percentage": subscription.usage_percentage,
            "period_start": subscription.current_period_start.isoformat() if subscription.current_period_start else None,
            "period_end": subscription.current_period_end.isoformat() if subscription.current_period_end else None,
        }