"""Intelligence Operations API routes."""

from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from services.operation_service import OperationService
from services.subscription_service import SubscriptionService
from utils.auth import get_current_user
from utils.database import get_db
from utils.logging import logger
import uuid

router = APIRouter(prefix="/api/operations", tags=["intelligence-operations"])


class OperationRequest(BaseModel):
    """Request schema for intelligence operations."""
    operation_type: str  # strategic_analysis, workflow_generation, etc.
    query: str
    context_data: Dict[str, Any] = {}
    session_id: Optional[str] = None


class OperationResponse(BaseModel):
    """Response schema for intelligence operations."""
    operation_id: int
    operation_type: str
    status: str
    result: Optional[Dict[str, Any]] = None
    cost: float
    execution_time_ms: Optional[int] = None
    session_id: Optional[str] = None
    created_at: str


class OperationListResponse(BaseModel):
    """Response schema for operation list."""
    operations: List[Dict[str, Any]]
    total: int
    page: int
    per_page: int


class UsageStatistics(BaseModel):
    """Response schema for usage statistics."""
    period_days: int
    total_operations: int
    operations_by_type: Dict[str, int]
    operations_by_status: Dict[str, int]
    total_cost: float
    average_cost_per_operation: float


@router.post("/execute", response_model=OperationResponse)
async def execute_operation(
    request: OperationRequest,
    http_request: Request,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Execute an intelligence operation."""
    
    # Generate session ID if not provided
    session_id = request.session_id or str(uuid.uuid4())
    
    # Get client information
    ip_address = http_request.client.host if http_request.client else None
    user_agent = http_request.headers.get("user-agent")
    
    try:
        operation = await OperationService.execute_intelligence_operation(
            db=db,
            user_id=current_user.id,
            operation_type=request.operation_type,
            query=request.query,
            context_data=request.context_data,
            session_id=session_id,
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        # Parse result if available
        result = None
        if operation.result:
            import json
            try:
                result = json.loads(operation.result)
            except json.JSONDecodeError:
                result = {"raw_result": operation.result}
        
        return OperationResponse(
            operation_id=operation.id,
            operation_type=operation.operation_type,
            status=operation.status,
            result=result,
            cost=float(operation.cost),
            execution_time_ms=operation.execution_time_ms,
            session_id=operation.session_id,
            created_at=operation.created_at.isoformat()
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Operation execution error for user {current_user.id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Operation execution failed"
        )


@router.get("/", response_model=OperationListResponse)
async def list_operations(
    page: int = 1,
    per_page: int = 50,
    operation_type: Optional[str] = None,
    status: Optional[str] = None,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """List user's operations with pagination and filtering."""
    
    if per_page > 100:
        per_page = 100
    
    offset = (page - 1) * per_page
    
    operations = await OperationService.get_user_operations(
        db=db,
        user_id=current_user.id,
        limit=per_page,
        offset=offset,
        operation_type=operation_type,
        status=status
    )
    
    # Convert to dict format
    operations_data = [op.to_summary_dict() for op in operations]
    
    return OperationListResponse(
        operations=operations_data,
        total=len(operations_data),  # This should be the actual total count
        page=page,
        per_page=per_page
    )


@router.get("/{operation_id}")
async def get_operation(
    operation_id: int,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get a specific operation by ID."""
    
    operation = await OperationService.get_operation_by_id(
        db=db,
        operation_id=operation_id,
        user_id=current_user.id
    )
    
    if not operation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Operation not found"
        )
    
    operation_dict = operation.to_dict()
    
    # Parse result if available
    if operation.result:
        import json
        try:
            operation_dict["result"] = json.loads(operation.result)
        except json.JSONDecodeError:
            operation_dict["result"] = {"raw_result": operation.result}
    
    # Parse context data if available
    if operation.context_data:
        import json
        try:
            operation_dict["context_data"] = json.loads(operation.context_data)
        except json.JSONDecodeError:
            operation_dict["context_data"] = {"raw_context": operation.context_data}
    
    return operation_dict


@router.get("/session/{session_id}")
async def get_session_operations(
    session_id: str,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get all operations for a specific session."""
    
    operations = await OperationService.get_session_operations(
        db=db,
        session_id=session_id,
        user_id=current_user.id
    )
    
    return [op.to_dict() for op in operations]


@router.get("/statistics/usage", response_model=UsageStatistics)
async def get_usage_statistics(
    days: int = 30,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get usage statistics for the user."""
    
    if days > 365:
        days = 365  # Limit to 1 year
    
    statistics = await OperationService.get_operation_statistics(
        db=db,
        user_id=current_user.id,
        days=days
    )
    
    return UsageStatistics(**statistics)


@router.get("/types/available")
async def get_available_operation_types():
    """Get list of available operation types."""
    return {
        "operation_types": [
            {
                "type": "strategic_analysis",
                "name": "Strategic Analysis",
                "description": "Comprehensive strategic analysis with recommendations and risk assessment",
                "cost": 0.08
            },
            {
                "type": "workflow_generation", 
                "name": "Workflow Generation",
                "description": "Generate executable workflows with task breakdown and assignments",
                "cost": 0.08
            },
            {
                "type": "competitive_analysis",
                "name": "Competitive Analysis",
                "description": "Analyze competitors, market position, and opportunities",
                "cost": 0.08
            },
            {
                "type": "market_research",
                "name": "Market Research",
                "description": "Market sizing, trends analysis, and customer segmentation",
                "cost": 0.08
            }
        ]
    }


@router.get("/limits/check")
async def check_operation_limits(
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Check user's current operation limits and usage."""
    
    can_execute, subscription = await SubscriptionService.check_operation_limit(
        db=db, user_id=current_user.id
    )
    
    usage_stats = await SubscriptionService.get_usage_statistics(
        db=db, user_id=current_user.id
    )
    
    return {
        "can_execute": can_execute,
        "subscription": subscription.to_dict() if subscription else None,
        "usage": usage_stats
    }