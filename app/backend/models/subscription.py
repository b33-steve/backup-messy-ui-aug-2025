"""Subscription model for PM33 Intelligence Operations."""

from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Numeric
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from utils.sync_database import Base
from utils.config import SubscriptionTier


class Subscription(Base):
    """Subscription model for tracking user subscriptions."""
    
    __tablename__ = "subscriptions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Subscription details
    tier = Column(String(50), nullable=False)  # starter, team, scale, enterprise
    status = Column(String(50), default="active")  # active, canceled, past_due, incomplete
    
    # Stripe information
    stripe_subscription_id = Column(String(255), unique=True, nullable=True)
    stripe_price_id = Column(String(255), nullable=True)
    
    # Billing information
    current_period_start = Column(DateTime(timezone=True), nullable=True)
    current_period_end = Column(DateTime(timezone=True), nullable=True)
    cancel_at_period_end = Column(Boolean, default=False)
    canceled_at = Column(DateTime(timezone=True), nullable=True)
    
    # Usage tracking
    operations_used_this_month = Column(Integer, default=0)
    operations_limit = Column(Integer, nullable=False)
    
    # Pricing
    monthly_price = Column(Numeric(10, 2), nullable=False)  # Price in dollars
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="subscriptions")
    
    @property
    def is_active(self) -> bool:
        """Check if subscription is currently active."""
        return self.status == "active"
    
    @property
    def operations_remaining(self) -> int:
        """Get remaining operations for this billing period."""
        return max(0, self.operations_limit - self.operations_used_this_month)
    
    @property
    def usage_percentage(self) -> float:
        """Get usage percentage for this billing period."""
        if self.operations_limit == 0:
            return 0.0
        return min(100.0, (self.operations_used_this_month / self.operations_limit) * 100)
    
    @property
    def is_over_limit(self) -> bool:
        """Check if user has exceeded their operation limit."""
        return self.operations_used_this_month >= self.operations_limit
    
    def can_execute_operation(self) -> bool:
        """Check if user can execute another operation."""
        return self.is_active and not self.is_over_limit
    
    def increment_usage(self) -> None:
        """Increment operation usage count."""
        self.operations_used_this_month += 1
    
    def reset_monthly_usage(self) -> None:
        """Reset monthly usage counter (called at billing period start)."""
        self.operations_used_this_month = 0
    
    @classmethod
    def create_from_tier(cls, user_id: int, tier: str) -> "Subscription":
        """Create subscription from tier name."""
        if not SubscriptionTier.is_valid_tier(tier):
            raise ValueError(f"Invalid tier: {tier}")
        
        return cls(
            user_id=user_id,
            tier=tier,
            operations_limit=SubscriptionTier.get_limit(tier),
            monthly_price=SubscriptionTier.get_price(tier) / 100.0,  # Convert from cents
        )
    
    def to_dict(self) -> dict:
        """Convert subscription to dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "tier": self.tier,
            "status": self.status,
            "operations_used_this_month": self.operations_used_this_month,
            "operations_limit": self.operations_limit,
            "operations_remaining": self.operations_remaining,
            "usage_percentage": self.usage_percentage,
            "monthly_price": float(self.monthly_price),
            "current_period_start": self.current_period_start.isoformat() if self.current_period_start else None,
            "current_period_end": self.current_period_end.isoformat() if self.current_period_end else None,
            "cancel_at_period_end": self.cancel_at_period_end,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }