"""Intelligence Operations execution and tracking service."""

import json
import asyncio
from typing import Optional, List, Dict, Any
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, func, desc
from fastapi import HTTPException, status
from models.user import User
from models.operation import Operation
from models.subscription import Subscription
from services.subscription_service import SubscriptionService
from utils.config import settings
from utils.logging import logger, log_operation


class OperationService:
    """Service for Intelligence Operations execution and tracking."""
    
    @staticmethod
    async def execute_intelligence_operation(
        db: AsyncSession,
        user_id: int,
        operation_type: str,
        query: str,
        context_data: Dict[str, Any] = None,
        session_id: str = None,
        ip_address: str = None,
        user_agent: str = None
    ) -> Operation:
        """Execute an intelligence operation with usage tracking."""
        
        # Check if user can execute operation
        can_execute, subscription = await SubscriptionService.check_operation_limit(db, user_id)
        if not can_execute:
            if subscription:
                raise HTTPException(
                    status_code=status.HTTP_402_PAYMENT_REQUIRED,
                    detail=f"Operation limit exceeded for {subscription.tier} tier. "
                           f"Used {subscription.operations_used_this_month}/{subscription.operations_limit} operations this month."
                )
            else:
                raise HTTPException(
                    status_code=status.HTTP_402_PAYMENT_REQUIRED,
                    detail="No active subscription found. Please subscribe to use Intelligence Operations."
                )
        
        # Create operation record
        operation = Operation(
            user_id=user_id,
            operation_type=operation_type,
            query=query,
            cost=settings.operation_cost_per_execution,
            context_data=json.dumps(context_data) if context_data else None,
            session_id=session_id,
            ip_address=ip_address,
            user_agent=user_agent,
        )
        
        db.add(operation)
        await db.commit()
        await db.refresh(operation)
        
        try:
            # Mark operation as started
            operation.mark_started()
            await db.commit()
            
            # Execute the actual operation
            result = await OperationService._execute_operation_logic(
                operation_type, query, context_data
            )
            
            # Mark operation as completed
            operation.mark_completed(json.dumps(result))
            
            # Increment user's operation usage
            await SubscriptionService.increment_operation_usage(db, user_id)
            
            await db.commit()
            await db.refresh(operation)
            
            log_operation(
                user_id=user_id,
                operation_type=operation_type,
                context={"operation_id": operation.id, "session_id": session_id},
                success=True
            )
            
            return operation
            
        except Exception as e:
            # Mark operation as failed
            operation.mark_failed(str(e))
            await db.commit()
            
            log_operation(
                user_id=user_id,
                operation_type=operation_type,
                context={"operation_id": operation.id, "session_id": session_id},
                success=False,
                error=str(e)
            )
            
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Operation failed: {str(e)}"
            )
    
    @staticmethod
    async def _execute_operation_logic(
        operation_type: str,
        query: str,
        context_data: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Execute the actual operation logic based on operation type."""
        
        # Simulate processing time
        await asyncio.sleep(0.1)
        
        if operation_type == "strategic_analysis":
            return await OperationService._execute_strategic_analysis(query, context_data)
        elif operation_type == "workflow_generation":
            return await OperationService._execute_workflow_generation(query, context_data)
        elif operation_type == "competitive_analysis":
            return await OperationService._execute_competitive_analysis(query, context_data)
        elif operation_type == "market_research":
            return await OperationService._execute_market_research(query, context_data)
        else:
            raise ValueError(f"Unknown operation type: {operation_type}")
    
    @staticmethod
    async def _execute_strategic_analysis(
        query: str,
        context_data: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Execute strategic analysis operation."""
        # This would integrate with your strategic workflow engine
        # For now, return mock data
        return {
            "analysis_type": "strategic_analysis",
            "query": query,
            "recommendations": [
                "Implement data-driven decision making framework",
                "Establish cross-functional collaboration processes",
                "Develop competitive intelligence capabilities"
            ],
            "risk_factors": [
                "Market volatility",
                "Resource constraints",
                "Regulatory changes"
            ],
            "success_metrics": [
                "Revenue growth",
                "Market share",
                "Customer satisfaction"
            ],
            "timeline": "6-12 months",
            "confidence_score": 0.85
        }
    
    @staticmethod
    async def _execute_workflow_generation(
        query: str,
        context_data: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Execute workflow generation operation."""
        return {
            "workflow_id": f"wf_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}",
            "query": query,
            "tasks": [
                {
                    "title": "Research and Analysis",
                    "description": "Conduct market research and competitive analysis",
                    "assignee": "Research Team",
                    "priority": "high",
                    "estimated_hours": 16
                },
                {
                    "title": "Strategy Development",
                    "description": "Develop strategic recommendations based on research",
                    "assignee": "Strategy Team",
                    "priority": "high",
                    "estimated_hours": 12
                },
                {
                    "title": "Implementation Planning",
                    "description": "Create detailed implementation plan",
                    "assignee": "Project Manager",
                    "priority": "medium",
                    "estimated_hours": 8
                }
            ],
            "estimated_completion": "2-3 weeks",
            "total_estimated_hours": 36
        }
    
    @staticmethod
    async def _execute_competitive_analysis(
        query: str,
        context_data: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Execute competitive analysis operation."""
        return {
            "analysis_type": "competitive_analysis",
            "query": query,
            "competitors": [
                {
                    "name": "Competitor A",
                    "market_share": 0.25,
                    "strengths": ["Strong brand", "Wide distribution"],
                    "weaknesses": ["High prices", "Limited innovation"]
                },
                {
                    "name": "Competitor B", 
                    "market_share": 0.18,
                    "strengths": ["Innovative products", "Strong R&D"],
                    "weaknesses": ["Limited market presence", "High costs"]
                }
            ],
            "market_opportunities": [
                "Emerging markets expansion",
                "Digital transformation",
                "Sustainable solutions"
            ],
            "competitive_advantages": [
                "Superior technology",
                "Cost efficiency",
                "Customer relationships"
            ]
        }
    
    @staticmethod
    async def _execute_market_research(
        query: str,
        context_data: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Execute market research operation."""
        return {
            "research_type": "market_research",
            "query": query,
            "market_size": {
                "total_addressable_market": "$10.5B",
                "serviceable_addressable_market": "$2.1B",
                "serviceable_obtainable_market": "$420M"
            },
            "growth_rate": "12.5% CAGR",
            "key_trends": [
                "Increasing automation adoption",
                "Remote work acceleration",
                "AI and ML integration"
            ],
            "customer_segments": [
                {
                    "segment": "Enterprise",
                    "size": "65%",
                    "characteristics": ["High budget", "Complex requirements"]
                },
                {
                    "segment": "SMB",
                    "size": "35%", 
                    "characteristics": ["Price sensitive", "Simple solutions"]
                }
            ]
        }
    
    @staticmethod
    async def get_user_operations(
        db: AsyncSession,
        user_id: int,
        limit: int = 50,
        offset: int = 0,
        operation_type: str = None,
        status: str = None
    ) -> List[Operation]:
        """Get operations for a user with filtering and pagination."""
        stmt = select(Operation).where(Operation.user_id == user_id)
        
        if operation_type:
            stmt = stmt.where(Operation.operation_type == operation_type)
        
        if status:
            stmt = stmt.where(Operation.status == status)
        
        stmt = stmt.order_by(desc(Operation.created_at)).limit(limit).offset(offset)
        
        result = await db.execute(stmt)
        return result.scalars().all()
    
    @staticmethod
    async def get_operation_by_id(
        db: AsyncSession,
        operation_id: int,
        user_id: int = None
    ) -> Optional[Operation]:
        """Get operation by ID, optionally filtered by user."""
        stmt = select(Operation).where(Operation.id == operation_id)
        
        if user_id:
            stmt = stmt.where(Operation.user_id == user_id)
        
        result = await db.execute(stmt)
        return result.scalar_one_or_none()
    
    @staticmethod
    async def get_operation_statistics(
        db: AsyncSession,
        user_id: int,
        days: int = 30
    ) -> Dict[str, Any]:
        """Get operation statistics for a user."""
        since_date = datetime.utcnow() - timedelta(days=days)
        
        # Total operations
        total_stmt = select(func.count(Operation.id)).where(
            and_(
                Operation.user_id == user_id,
                Operation.created_at >= since_date
            )
        )
        total_result = await db.execute(total_stmt)
        total_operations = total_result.scalar()
        
        # Operations by type
        type_stmt = (
            select(Operation.operation_type, func.count(Operation.id))
            .where(
                and_(
                    Operation.user_id == user_id,
                    Operation.created_at >= since_date
                )
            )
            .group_by(Operation.operation_type)
        )
        type_result = await db.execute(type_stmt)
        operations_by_type = dict(type_result.fetchall())
        
        # Operations by status
        status_stmt = (
            select(Operation.status, func.count(Operation.id))
            .where(
                and_(
                    Operation.user_id == user_id,
                    Operation.created_at >= since_date
                )
            )
            .group_by(Operation.status)
        )
        status_result = await db.execute(status_stmt)
        operations_by_status = dict(status_result.fetchall())
        
        # Total cost
        cost_stmt = select(func.sum(Operation.cost)).where(
            and_(
                Operation.user_id == user_id,
                Operation.created_at >= since_date,
                Operation.status == "completed"
            )
        )
        cost_result = await db.execute(cost_stmt)
        total_cost = cost_result.scalar() or 0
        
        return {
            "period_days": days,
            "total_operations": total_operations,
            "operations_by_type": operations_by_type,
            "operations_by_status": operations_by_status,
            "total_cost": float(total_cost),
            "average_cost_per_operation": float(total_cost / total_operations) if total_operations > 0 else 0
        }
    
    @staticmethod
    async def get_session_operations(
        db: AsyncSession,
        session_id: str,
        user_id: int = None
    ) -> List[Operation]:
        """Get all operations for a session."""
        stmt = select(Operation).where(Operation.session_id == session_id)
        
        if user_id:
            stmt = stmt.where(Operation.user_id == user_id)
        
        stmt = stmt.order_by(Operation.created_at)
        
        result = await db.execute(stmt)
        return result.scalars().all()