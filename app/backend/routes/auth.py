"""Authentication routes for PM33 Intelligence Operations."""

from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel, EmailStr
from services.user_service import UserService
from services.stripe_service import StripeService
from utils.auth import create_access_token, get_current_user
from utils.database import get_db
from utils.config import settings
from utils.logging import logger

router = APIRouter(prefix="/api/auth", tags=["authentication"])


class UserRegistration(BaseModel):
    """User registration schema."""
    email: EmailStr
    username: str
    password: str
    first_name: str = None
    last_name: str = None
    company: str = None


class UserLogin(BaseModel):
    """User login schema."""
    email: EmailStr
    password: str


class Token(BaseModel):
    """Token response schema."""
    access_token: str
    token_type: str
    user: dict


class UserProfile(BaseModel):
    """User profile schema."""
    first_name: str = None
    last_name: str = None
    company: str = None


class PasswordChange(BaseModel):
    """Password change schema."""
    current_password: str
    new_password: str


@router.post("/register", response_model=Token)
async def register_user(
    user_data: UserRegistration,
    db: AsyncSession = Depends(get_db)
):
    """Register a new user account."""
    try:
        # Create user account
        user = await UserService.create_user(
            db=db,
            email=user_data.email,
            username=user_data.username,
            password=user_data.password,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            company=user_data.company
        )
        
        # Create Stripe customer
        try:
            stripe_customer = StripeService.create_customer(
                email=user.email,
                name=user.full_name,
                metadata={"user_id": str(user.id)}
            )
            
            # Update user with Stripe customer ID
            await UserService.set_stripe_customer_id(
                db, user.id, stripe_customer.id
            )
            
        except Exception as e:
            logger.warning(f"Failed to create Stripe customer for user {user.id}: {str(e)}")
        
        # Create access token
        access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
        access_token = create_access_token(
            data={"sub": str(user.id)}, expires_delta=access_token_expires
        )
        
        return Token(
            access_token=access_token,
            token_type="bearer",
            user=user.to_dict()
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Registration failed"
        )


@router.post("/login", response_model=Token)
async def login_user(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: AsyncSession = Depends(get_db)
):
    """Authenticate user and return access token."""
    user = await UserService.authenticate_user(
        db, form_data.username, form_data.password  # username field contains email
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user=user.to_dict()
    )


@router.post("/login-email", response_model=Token)
async def login_user_email(
    login_data: UserLogin,
    db: AsyncSession = Depends(get_db)
):
    """Authenticate user with email and password."""
    user = await UserService.authenticate_user(
        db, login_data.email, login_data.password
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user=user.to_dict()
    )


@router.get("/me")
async def get_current_user_profile(
    current_user = Depends(get_current_user)
):
    """Get current user profile."""
    return current_user.to_dict()


@router.put("/me")
async def update_user_profile(
    profile_data: UserProfile,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update user profile."""
    updated_user = await UserService.update_user_profile(
        db=db,
        user_id=current_user.id,
        first_name=profile_data.first_name,
        last_name=profile_data.last_name,
        company=profile_data.company
    )
    
    return updated_user.to_dict()


@router.post("/change-password")
async def change_password(
    password_data: PasswordChange,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Change user password."""
    success = await UserService.change_password(
        db=db,
        user_id=current_user.id,
        current_password=password_data.current_password,
        new_password=password_data.new_password
    )
    
    return {"message": "Password changed successfully"}


@router.post("/logout")
async def logout_user():
    """Logout user (client should discard token)."""
    return {"message": "Logged out successfully"}