"""Billing model for tracking payment records and Stripe integration."""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric, Boolean, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from utils.sync_database import Base


class BillingRecord(Base):
    """Model for tracking billing events and Stripe integration."""
    
    __tablename__ = "billing_records"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Billing event details
    event_type = Column(String(100), nullable=False)  # subscription_created, invoice_paid, payment_failed, etc.
    amount = Column(Numeric(10, 2), nullable=False)  # Amount in dollars
    currency = Column(String(3), default="usd")
    
    # Stripe information
    stripe_event_id = Column(String(255), unique=True, nullable=True)
    stripe_invoice_id = Column(String(255), nullable=True)
    stripe_payment_intent_id = Column(String(255), nullable=True)
    stripe_subscription_id = Column(String(255), nullable=True)
    
    # Status tracking
    status = Column(String(50), default="pending")  # pending, completed, failed, refunded
    processed = Column(Boolean, default=False)
    
    # Operation billing details
    billing_period_start = Column(DateTime(timezone=True), nullable=True)
    billing_period_end = Column(DateTime(timezone=True), nullable=True)
    operations_count = Column(Integer, nullable=True)  # Number of operations billed
    
    # Metadata  
    description = Column(String(500), nullable=True)
    extra_data = Column(Text, nullable=True)  # JSON metadata (renamed from metadata)
    notes = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    processed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="billing_records")
    
    @property
    def is_completed(self) -> bool:
        """Check if billing record is completed."""
        return self.status == "completed"
    
    @property
    def is_failed(self) -> bool:
        """Check if billing failed."""
        return self.status == "failed"
    
    @property
    def is_refunded(self) -> bool:
        """Check if billing was refunded."""
        return self.status == "refunded"
    
    def mark_completed(self) -> None:
        """Mark billing record as completed."""
        self.status = "completed"
        self.processed = True
        self.processed_at = func.now()
    
    def mark_failed(self, notes: str = None) -> None:
        """Mark billing record as failed."""
        self.status = "failed"
        self.processed = True
        self.processed_at = func.now()
        if notes:
            self.notes = notes
    
    def mark_refunded(self, notes: str = None) -> None:
        """Mark billing record as refunded."""
        self.status = "refunded"
        self.processed_at = func.now()
        if notes:
            self.notes = notes
    
    @classmethod
    def create_subscription_record(
        cls,
        user_id: int,
        amount: float,
        stripe_subscription_id: str = None,
        description: str = None
    ) -> "BillingRecord":
        """Create a subscription billing record."""
        return cls(
            user_id=user_id,
            event_type="subscription_created",
            amount=amount,
            stripe_subscription_id=stripe_subscription_id,
            description=description or "Monthly subscription",
        )
    
    @classmethod
    def create_operation_billing(
        cls,
        user_id: int,
        operations_count: int,
        amount: float,
        billing_period_start: DateTime,
        billing_period_end: DateTime
    ) -> "BillingRecord":
        """Create an operation usage billing record."""
        return cls(
            user_id=user_id,
            event_type="operation_usage",
            amount=amount,
            operations_count=operations_count,
            billing_period_start=billing_period_start,
            billing_period_end=billing_period_end,
            description=f"Intelligence Operations usage ({operations_count} operations)",
        )
    
    def to_dict(self) -> dict:
        """Convert billing record to dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "event_type": self.event_type,
            "amount": float(self.amount),
            "currency": self.currency,
            "status": self.status,
            "processed": self.processed,
            "operations_count": self.operations_count,
            "description": self.description,
            "billing_period_start": self.billing_period_start.isoformat() if self.billing_period_start else None,
            "billing_period_end": self.billing_period_end.isoformat() if self.billing_period_end else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "processed_at": self.processed_at.isoformat() if self.processed_at else None,
            "notes": self.notes,
        }