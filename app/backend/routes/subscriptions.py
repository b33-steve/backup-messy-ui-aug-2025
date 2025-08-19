"""Subscription management API routes."""

from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from services.subscription_service import SubscriptionService
from services.stripe_service import StripeService
from utils.auth import get_current_user
from utils.database import get_db
from utils.config import SubscriptionTier
from utils.logging import logger

router = APIRouter(prefix="/api/subscriptions", tags=["subscriptions"])


class SubscriptionCreate(BaseModel):
    """Schema for creating a subscription."""
    tier: str
    payment_method_id: Optional[str] = None


class SubscriptionUpdate(BaseModel):
    """Schema for updating a subscription."""
    tier: str


class SubscriptionResponse(BaseModel):
    """Response schema for subscription information."""
    id: int
    tier: str
    status: str
    operations_used_this_month: int
    operations_limit: int
    operations_remaining: int
    usage_percentage: float
    monthly_price: float
    current_period_start: Optional[str]
    current_period_end: Optional[str]
    cancel_at_period_end: bool
    created_at: str


class TierInfo(BaseModel):
    """Schema for subscription tier information."""
    tier: str
    name: str
    operations_limit: int
    monthly_price: float
    features: List[str]


@router.get("/tiers")
async def get_subscription_tiers():
    """Get available subscription tiers and their features."""
    tiers = [
        {
            "tier": SubscriptionTier.STARTER,
            "name": "Starter",
            "operations_limit": SubscriptionTier.get_limit(SubscriptionTier.STARTER),
            "monthly_price": SubscriptionTier.get_price(SubscriptionTier.STARTER) / 100.0,
            "features": [
                "100 Intelligence Operations per month",
                "Basic strategic analysis",
                "Workflow generation",
                "Email support"
            ]
        },
        {
            "tier": SubscriptionTier.TEAM,
            "name": "Team", 
            "operations_limit": SubscriptionTier.get_limit(SubscriptionTier.TEAM),
            "monthly_price": SubscriptionTier.get_price(SubscriptionTier.TEAM) / 100.0,
            "features": [
                "500 Intelligence Operations per month",
                "Advanced strategic analysis",
                "Competitive analysis",
                "Market research",
                "Priority support"
            ]
        },
        {
            "tier": SubscriptionTier.SCALE,
            "name": "Scale",
            "operations_limit": SubscriptionTier.get_limit(SubscriptionTier.SCALE),
            "monthly_price": SubscriptionTier.get_price(SubscriptionTier.SCALE) / 100.0,
            "features": [
                "2,000 Intelligence Operations per month",
                "Full strategic analysis suite",
                "Custom workflow templates",
                "API access",
                "Dedicated support"
            ]
        },
        {
            "tier": SubscriptionTier.ENTERPRISE,
            "name": "Enterprise",
            "operations_limit": SubscriptionTier.get_limit(SubscriptionTier.ENTERPRISE),
            "monthly_price": SubscriptionTier.get_price(SubscriptionTier.ENTERPRISE) / 100.0,
            "features": [
                "10,000 Intelligence Operations per month",
                "Enterprise strategic analysis",
                "Custom integrations",
                "White-label options",
                "24/7 support",
                "Custom pricing available"
            ]
        }
    ]
    
    return {"tiers": tiers}


@router.get("/current", response_model=Optional[SubscriptionResponse])
async def get_current_subscription(
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's current subscription."""
    subscription = await SubscriptionService.get_user_subscription(
        db=db, user_id=current_user.id
    )
    
    if not subscription:
        return None
    
    return SubscriptionResponse(**subscription.to_dict())


@router.post("/create", response_model=SubscriptionResponse)
async def create_subscription(
    subscription_data: SubscriptionCreate,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new subscription for the user."""
    
    if not SubscriptionTier.is_valid_tier(subscription_data.tier):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid subscription tier: {subscription_data.tier}"
        )
    
    # Check if user already has an active subscription
    existing_subscription = await SubscriptionService.get_user_subscription(
        db=db, user_id=current_user.id
    )
    
    if existing_subscription:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already has an active subscription. Use update endpoint instead."
        )
    
    try:
        # Create Stripe subscription if user has Stripe customer ID
        stripe_subscription_id = None
        stripe_price_id = None
        
        if current_user.stripe_customer_id:
            try:
                price_id = StripeService.get_tier_price_id(subscription_data.tier)
                stripe_subscription = StripeService.create_subscription(
                    customer_id=current_user.stripe_customer_id,
                    price_id=price_id,
                    metadata={
                        "user_id": str(current_user.id),
                        "tier": subscription_data.tier
                    }
                )
                stripe_subscription_id = stripe_subscription.id
                stripe_price_id = price_id
                
            except Exception as e:
                logger.error(f"Failed to create Stripe subscription: {str(e)}")
                # Continue with local subscription creation
        
        # Create subscription in our database
        subscription = await SubscriptionService.create_subscription(
            db=db,
            user_id=current_user.id,
            tier=subscription_data.tier,
            stripe_subscription_id=stripe_subscription_id,
            stripe_price_id=stripe_price_id
        )
        
        return SubscriptionResponse(**subscription.to_dict())
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Subscription creation error for user {current_user.id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create subscription"
        )


@router.put("/update", response_model=SubscriptionResponse)
async def update_subscription(
    update_data: SubscriptionUpdate,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update user's subscription tier."""
    
    if not SubscriptionTier.is_valid_tier(update_data.tier):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid subscription tier: {update_data.tier}"
        )
    
    try:
        subscription = await SubscriptionService.update_subscription_tier(
            db=db,
            user_id=current_user.id,
            new_tier=update_data.tier
        )
        
        # Update Stripe subscription if exists
        if subscription.stripe_subscription_id:
            try:
                price_id = StripeService.get_tier_price_id(update_data.tier)
                StripeService.update_subscription(
                    subscription_id=subscription.stripe_subscription_id,
                    price_id=price_id
                )
            except Exception as e:
                logger.error(f"Failed to update Stripe subscription: {str(e)}")
        
        return SubscriptionResponse(**subscription.to_dict())
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Subscription update error for user {current_user.id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update subscription"
        )


@router.post("/cancel")
async def cancel_subscription(
    cancel_at_period_end: bool = True,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Cancel user's subscription."""
    
    try:
        subscription = await SubscriptionService.cancel_subscription(
            db=db,
            user_id=current_user.id,
            cancel_at_period_end=cancel_at_period_end
        )
        
        # Cancel Stripe subscription if exists
        if subscription.stripe_subscription_id:
            try:
                StripeService.cancel_subscription(
                    subscription_id=subscription.stripe_subscription_id,
                    at_period_end=cancel_at_period_end
                )
            except Exception as e:
                logger.error(f"Failed to cancel Stripe subscription: {str(e)}")
        
        return {
            "message": "Subscription canceled successfully",
            "cancel_at_period_end": cancel_at_period_end,
            "subscription": subscription.to_dict()
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Subscription cancellation error for user {current_user.id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to cancel subscription"
        )


@router.get("/usage")
async def get_usage_statistics(
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's subscription usage statistics."""
    
    usage_stats = await SubscriptionService.get_usage_statistics(
        db=db, user_id=current_user.id
    )
    
    return usage_stats


@router.post("/checkout")
async def create_checkout_session(
    subscription_data: SubscriptionCreate,
    success_url: str,
    cancel_url: str,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a Stripe checkout session for subscription signup."""
    
    if not current_user.stripe_customer_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User must have a Stripe customer account"
        )
    
    if not SubscriptionTier.is_valid_tier(subscription_data.tier):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid subscription tier: {subscription_data.tier}"
        )
    
    try:
        price_id = StripeService.get_tier_price_id(subscription_data.tier)
        
        checkout_session = StripeService.create_checkout_session(
            customer_id=current_user.stripe_customer_id,
            price_id=price_id,
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "user_id": str(current_user.id),
                "tier": subscription_data.tier
            }
        )
        
        return {
            "checkout_url": checkout_session.url,
            "checkout_session_id": checkout_session.id
        }
        
    except Exception as e:
        logger.error(f"Checkout session creation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create checkout session"
        )


@router.post("/customer-portal")
async def create_customer_portal_session(
    return_url: str,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a Stripe customer portal session for managing subscriptions."""
    
    if not current_user.stripe_customer_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User must have a Stripe customer account"
        )
    
    try:
        portal_session = StripeService.create_customer_portal_session(
            customer_id=current_user.stripe_customer_id,
            return_url=return_url
        )
        
        return {
            "portal_url": portal_session.url
        }
        
    except Exception as e:
        logger.error(f"Customer portal session creation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create customer portal session"
        )