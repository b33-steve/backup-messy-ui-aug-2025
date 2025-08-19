"""Configuration management for PM33 Intelligence Operations."""

from typing import Optional
from pydantic import validator
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

load_dotenv()


class Settings(BaseSettings):
    """Application settings with validation."""
    
    # Database
    database_url: str
    database_url_sync: str
    
    # Stripe
    stripe_publishable_key: str
    stripe_secret_key: str
    stripe_webhook_secret: str
    
    # JWT
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Redis (optional for development)
    redis_url: Optional[str] = None
    
    # Application
    app_name: str = "PM33 Intelligence Operations"
    app_version: str = "1.0.0"
    debug: bool = False
    environment: str = "production"
    
    # Logging
    log_level: str = "INFO"
    
    # Intelligence Operations
    operation_cost_per_execution: float = 0.08
    
    # Subscription Tier Limits (operations per month)
    starter_tier_limit: int = 100
    team_tier_limit: int = 500
    scale_tier_limit: int = 2000
    enterprise_tier_limit: int = 10000
    
    # Tier Pricing (in cents)
    starter_tier_price: int = 2900
    team_tier_price: int = 7900
    scale_tier_price: int = 19900
    enterprise_tier_price: int = 59900
    
    # Additional Service APIs (optional)
    railway_token: Optional[str] = None
    resend_api_key: Optional[str] = None
    posthog_api_key: Optional[str] = None
    pinecone_api_key: Optional[str] = None
    pinecone_environment: Optional[str] = None
    
    @validator('database_url')
    def validate_database_url(cls, v):
        if not v or not v.startswith('postgresql'):
            raise ValueError('DATABASE_URL must be a valid PostgreSQL connection string')
        return v
    
    @validator('secret_key')
    def validate_secret_key(cls, v):
        if not v or len(v) < 32:
            raise ValueError('SECRET_KEY must be at least 32 characters long')
        return v
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()


class SubscriptionTier:
    """Subscription tier configuration."""
    
    STARTER = "starter"
    TEAM = "team"
    SCALE = "scale"
    ENTERPRISE = "enterprise"
    
    TIER_LIMITS = {
        STARTER: settings.starter_tier_limit,
        TEAM: settings.team_tier_limit,
        SCALE: settings.scale_tier_limit,
        ENTERPRISE: settings.enterprise_tier_limit,
    }
    
    TIER_PRICES = {
        STARTER: settings.starter_tier_price,
        TEAM: settings.team_tier_price,
        SCALE: settings.scale_tier_price,
        ENTERPRISE: settings.enterprise_tier_price,
    }
    
    @classmethod
    def get_limit(cls, tier: str) -> int:
        """Get operation limit for a subscription tier."""
        return cls.TIER_LIMITS.get(tier, 0)
    
    @classmethod
    def get_price(cls, tier: str) -> int:
        """Get price in cents for a subscription tier."""
        return cls.TIER_PRICES.get(tier, 0)
    
    @classmethod
    def is_valid_tier(cls, tier: str) -> bool:
        """Check if tier is valid."""
        return tier in cls.TIER_LIMITS