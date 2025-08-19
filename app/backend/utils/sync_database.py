"""Synchronous database configuration for migrations."""

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from .config import settings

# Create sync engine for migrations
sync_engine = create_engine(
    settings.database_url_sync,
    echo=settings.debug,
    pool_pre_ping=True,
)

# Create session factory
SessionLocal = sessionmaker(
    autocommit=False, 
    autoflush=False, 
    bind=sync_engine
)

# Base class for models
Base = declarative_base()


def get_sync_db():
    """Get synchronous database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()