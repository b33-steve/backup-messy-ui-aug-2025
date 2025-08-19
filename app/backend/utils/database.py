"""Database configuration and session management."""

from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.pool import NullPool
from .config import settings

# Create async engine
async_engine = create_async_engine(
    settings.database_url,
    echo=settings.debug,
    poolclass=NullPool,
    pool_pre_ping=True,
)

# Create sync engine for migrations
sync_engine = create_engine(
    settings.database_url_sync,
    echo=settings.debug,
    pool_pre_ping=True,
)

# Create session factories
AsyncSessionLocal = async_sessionmaker(
    async_engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)

SessionLocal = sessionmaker(
    autocommit=False, 
    autoflush=False, 
    bind=sync_engine
)

# Import Base from sync database to ensure consistency
from .sync_database import Base


async def get_db() -> AsyncSession:
    """Dependency to get database session."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


def get_sync_db():
    """Get synchronous database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()