"""Operation model for tracking Intelligence Operations usage."""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric, Text, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from utils.sync_database import Base


class Operation(Base):
    """Model for tracking individual Intelligence Operations executions."""
    
    __tablename__ = "operations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Operation details
    operation_type = Column(String(100), nullable=False)  # e.g., "strategic_analysis", "workflow_generation"
    query = Column(Text, nullable=False)  # The user's query/input
    
    # Execution details
    status = Column(String(50), default="pending")  # pending, processing, completed, failed
    started_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Results and metadata
    result = Column(Text, nullable=True)  # JSON result data
    error_message = Column(Text, nullable=True)
    execution_time_ms = Column(Integer, nullable=True)  # Execution time in milliseconds
    
    # Billing information
    cost = Column(Numeric(10, 4), nullable=False)  # Cost of this operation
    billed = Column(Boolean, default=False)  # Whether this operation has been billed
    
    # Context and metadata
    context_data = Column(Text, nullable=True)  # JSON context provided with query
    session_id = Column(String(255), nullable=True)  # For grouping related operations
    ip_address = Column(String(45), nullable=True)  # IPv4/IPv6 address
    user_agent = Column(String(500), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="operations")
    
    @property
    def duration_seconds(self) -> float:
        """Get operation duration in seconds."""
        if self.execution_time_ms:
            return self.execution_time_ms / 1000.0
        elif self.started_at and self.completed_at:
            delta = self.completed_at - self.started_at
            return delta.total_seconds()
        return 0.0
    
    @property
    def is_completed(self) -> bool:
        """Check if operation completed successfully."""
        return self.status == "completed"
    
    @property
    def is_failed(self) -> bool:
        """Check if operation failed."""
        return self.status == "failed"
    
    @property
    def is_processing(self) -> bool:
        """Check if operation is currently processing."""
        return self.status in ["pending", "processing"]
    
    def mark_started(self) -> None:
        """Mark operation as started."""
        self.status = "processing"
        self.started_at = func.now()
    
    def mark_completed(self, result: str = None) -> None:
        """Mark operation as completed."""
        self.status = "completed"
        self.completed_at = func.now()
        if result:
            self.result = result
        
        # Calculate execution time if not already set
        if not self.execution_time_ms and self.started_at and self.completed_at:
            delta = self.completed_at - self.started_at
            self.execution_time_ms = int(delta.total_seconds() * 1000)
    
    def mark_failed(self, error: str) -> None:
        """Mark operation as failed."""
        self.status = "failed"
        self.completed_at = func.now()
        self.error_message = error
        
        # Calculate execution time if not already set
        if not self.execution_time_ms and self.started_at and self.completed_at:
            delta = self.completed_at - self.started_at
            self.execution_time_ms = int(delta.total_seconds() * 1000)
    
    def to_dict(self) -> dict:
        """Convert operation to dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "operation_type": self.operation_type,
            "query": self.query,
            "status": self.status,
            "started_at": self.started_at.isoformat() if self.started_at else None,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
            "execution_time_ms": self.execution_time_ms,
            "duration_seconds": self.duration_seconds,
            "cost": float(self.cost) if self.cost else 0.0,
            "billed": self.billed,
            "session_id": self.session_id,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "error_message": self.error_message,
        }
    
    def to_summary_dict(self) -> dict:
        """Convert operation to summary dictionary (without sensitive data)."""
        return {
            "id": self.id,
            "operation_type": self.operation_type,
            "status": self.status,
            "duration_seconds": self.duration_seconds,
            "cost": float(self.cost) if self.cost else 0.0,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }