"""User management service."""

from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from fastapi import HTTPException, status
from models.user import User
from models.subscription import Subscription
from utils.auth import get_password_hash, verify_password
from utils.logging import logger


class UserService:
    """Service for user management operations."""
    
    @staticmethod
    async def create_user(
        db: AsyncSession,
        email: str,
        username: str,
        password: str,
        first_name: str = None,
        last_name: str = None,
        company: str = None
    ) -> User:
        """Create a new user account."""
        
        # Check if user already exists
        existing_user = await UserService.get_user_by_email(db, email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        existing_username = await UserService.get_user_by_username(db, username)
        if existing_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
        
        # Create new user
        user = User(
            email=email,
            username=username,
            hashed_password=get_password_hash(password),
            first_name=first_name,
            last_name=last_name,
            company=company
        )
        
        db.add(user)
        await db.commit()
        await db.refresh(user)
        
        logger.info(f"User created: {user.email} (ID: {user.id})")
        return user
    
    @staticmethod
    async def get_user_by_email(db: AsyncSession, email: str) -> Optional[User]:
        """Get user by email address."""
        stmt = select(User).where(User.email == email)
        result = await db.execute(stmt)
        return result.scalar_one_or_none()
    
    @staticmethod
    async def get_user_by_username(db: AsyncSession, username: str) -> Optional[User]:
        """Get user by username."""
        stmt = select(User).where(User.username == username)
        result = await db.execute(stmt)
        return result.scalar_one_or_none()
    
    @staticmethod
    async def get_user_by_id(db: AsyncSession, user_id: int) -> Optional[User]:
        """Get user by ID."""
        stmt = select(User).where(User.id == user_id)
        result = await db.execute(stmt)
        return result.scalar_one_or_none()
    
    @staticmethod
    async def authenticate_user(
        db: AsyncSession, 
        email: str, 
        password: str
    ) -> Optional[User]:
        """Authenticate user with email and password."""
        user = await UserService.get_user_by_email(db, email)
        if not user:
            return None
        
        if not user.is_active:
            return None
        
        if not verify_password(password, user.hashed_password):
            return None
        
        return user
    
    @staticmethod
    async def update_user_profile(
        db: AsyncSession,
        user_id: int,
        first_name: str = None,
        last_name: str = None,
        company: str = None
    ) -> User:
        """Update user profile information."""
        user = await UserService.get_user_by_id(db, user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        if first_name is not None:
            user.first_name = first_name
        if last_name is not None:
            user.last_name = last_name
        if company is not None:
            user.company = company
        
        await db.commit()
        await db.refresh(user)
        
        logger.info(f"User profile updated: {user.email} (ID: {user.id})")
        return user
    
    @staticmethod
    async def change_password(
        db: AsyncSession,
        user_id: int,
        current_password: str,
        new_password: str
    ) -> bool:
        """Change user password."""
        user = await UserService.get_user_by_id(db, user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        if not verify_password(current_password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Current password is incorrect"
            )
        
        user.hashed_password = get_password_hash(new_password)
        await db.commit()
        
        logger.info(f"Password changed for user: {user.email} (ID: {user.id})")
        return True
    
    @staticmethod
    async def set_stripe_customer_id(
        db: AsyncSession,
        user_id: int,
        stripe_customer_id: str
    ) -> User:
        """Set Stripe customer ID for user."""
        user = await UserService.get_user_by_id(db, user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        user.stripe_customer_id = stripe_customer_id
        await db.commit()
        await db.refresh(user)
        
        return user
    
    @staticmethod
    async def deactivate_user(db: AsyncSession, user_id: int) -> User:
        """Deactivate user account."""
        user = await UserService.get_user_by_id(db, user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        user.is_active = False
        await db.commit()
        await db.refresh(user)
        
        logger.info(f"User deactivated: {user.email} (ID: {user.id})")
        return user
    
    @staticmethod
    async def get_user_with_subscription(db: AsyncSession, user_id: int) -> Optional[User]:
        """Get user with current subscription information."""
        stmt = (
            select(User)
            .where(User.id == user_id)
            .join(Subscription, and_(
                Subscription.user_id == User.id,
                Subscription.status == "active"
            ), isouter=True)
        )
        result = await db.execute(stmt)
        return result.scalar_one_or_none()