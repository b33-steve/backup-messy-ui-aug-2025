"""PM33 Intelligence Operations API - Production-ready FastAPI application."""

from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.openapi.utils import get_openapi

# Import routes
from routes import strategic_chat, auth, operations, subscriptions, billing

# Import utilities
from utils.config import settings
from utils.logging import setup_logging, logger
from utils.database import async_engine, Base


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager."""
    # Startup
    setup_logging()
    logger.info("PM33 Intelligence Operations API starting up...")
    
    # Create database tables (in production, use Alembic migrations instead)
    if settings.debug:
        async with async_engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Database tables created (debug mode)")
    
    yield
    
    # Shutdown
    logger.info("PM33 Intelligence Operations API shutting down...")
    await async_engine.dispose()


app = FastAPI(
    title="PM33 Intelligence Operations API",
    description="""
    ## PM33 Intelligence Operations Billing System
    
    Production-ready API for PM33's Intelligence Operations platform with:
    - **User Authentication**: JWT-based authentication with role management
    - **Subscription Management**: Multi-tier subscription system ($29/$79/$199/$599)
    - **Operations Tracking**: Usage tracking with $0.08 per operation billing
    - **Stripe Integration**: Complete payment processing and webhook handling
    - **Usage Analytics**: Comprehensive usage statistics and billing history
    
    ### Subscription Tiers
    - **Starter** ($29/month): 100 operations
    - **Team** ($79/month): 500 operations  
    - **Scale** ($199/month): 2,000 operations
    - **Enterprise** ($599/month): 10,000 operations
    
    ### Intelligence Operations
    - Strategic Analysis
    - Workflow Generation
    - Competitive Analysis
    - Market Research
    """,
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs" if settings.debug else None,
    redoc_url="/redoc" if settings.debug else None,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://pm33.ai"] if not settings.debug else ["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


# Global exception handler
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle HTTP exceptions with structured logging."""
    logger.warning(
        f"HTTP {exc.status_code}: {exc.detail}",
        extra={
            "status_code": exc.status_code,
            "detail": exc.detail,
            "path": str(request.url),
            "method": request.method,
        }
    )
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.status_code,
                "message": exc.detail,
                "timestamp": "2024-08-19T12:00:00Z"
            }
        },
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle unexpected exceptions."""
    logger.error(
        f"Unexpected error: {str(exc)}",
        extra={
            "path": str(request.url),
            "method": request.method,
            "exception_type": type(exc).__name__,
        },
        exc_info=True
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": {
                "code": 500,
                "message": "Internal server error",
                "timestamp": "2024-08-19T12:00:00Z"
            }
        },
    )


# Include API routers
app.include_router(auth.router)
app.include_router(operations.router)
app.include_router(subscriptions.router)
app.include_router(billing.router)
app.include_router(strategic_chat.router)  # Keep existing strategic chat


@app.get("/", tags=["root"])
async def root():
    """API root endpoint with system information."""
    return {
        "service": "PM33 Intelligence Operations API",
        "version": "1.0.0",
        "status": "running",
        "environment": settings.environment,
        "documentation": {
            "swagger": "/docs",
            "redoc": "/redoc"
        },
        "endpoints": {
            "authentication": "/api/auth",
            "operations": "/api/operations", 
            "subscriptions": "/api/subscriptions",
            "billing": "/api/billing"
        }
    }


@app.get("/health", tags=["health"])
async def health_check():
    """Comprehensive health check endpoint."""
    try:
        # Test database connection
        async with async_engine.begin() as conn:
            await conn.execute("SELECT 1")
        database_status = "healthy"
    except Exception as e:
        logger.error(f"Database health check failed: {str(e)}")
        database_status = "unhealthy"
    
    health_status = {
        "status": "healthy" if database_status == "healthy" else "degraded",
        "service": "pm33-intelligence-operations-api",
        "version": "1.0.0",
        "timestamp": "2024-08-19T12:00:00Z",
        "components": {
            "database": database_status,
            "api": "healthy"
        }
    }
    
    status_code = 200 if health_status["status"] == "healthy" else 503
    return JSONResponse(content=health_status, status_code=status_code)


@app.get("/metrics", tags=["monitoring"])
async def get_metrics():
    """Basic metrics endpoint for monitoring."""
    # This would integrate with Prometheus or other monitoring systems
    return {
        "service": "pm33-intelligence-operations-api",
        "uptime_seconds": 0,  # Would track actual uptime
        "requests_total": 0,  # Would track total requests
        "errors_total": 0,    # Would track errors
        "database_connections": 0,  # Would track DB connections
    }


# Custom OpenAPI schema
def custom_openapi():
    """Generate custom OpenAPI schema with enhanced documentation."""
    if app.openapi_schema:
        return app.openapi_schema
    
    openapi_schema = get_openapi(
        title="PM33 Intelligence Operations API",
        version="1.0.0",
        description=app.description,
        routes=app.routes,
    )
    
    # Add custom API info
    openapi_schema["info"]["contact"] = {
        "name": "PM33 Support",
        "email": "support@pm33.ai",
        "url": "https://pm33.ai/support"
    }
    
    openapi_schema["info"]["license"] = {
        "name": "Proprietary",
    }
    
    # Add server information
    openapi_schema["servers"] = [
        {
            "url": "https://api.pm33.ai",
            "description": "Production server"
        },
        {
            "url": "https://staging-api.pm33.ai", 
            "description": "Staging server"
        },
        {
            "url": "http://localhost:8000",
            "description": "Development server"
        }
    ]
    
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi


# Middleware for request/response logging in debug mode
if settings.debug:
    @app.middleware("http")
    async def log_requests(request: Request, call_next):
        """Log all requests in debug mode."""
        logger.info(f"{request.method} {request.url}")
        response = await call_next(request)
        logger.info(f"Response: {response.status_code}")
        return response