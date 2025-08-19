"""Structured logging configuration for PM33."""

import sys
import logging
from typing import Any
from loguru import logger
from .config import settings


class InterceptHandler(logging.Handler):
    """Intercept standard logging messages toward Loguru."""
    
    def emit(self, record):
        # Get corresponding Loguru level if it exists
        try:
            level = logger.level(record.levelname).name
        except ValueError:
            level = record.levelno

        # Find caller from where originated the logged message
        frame, depth = logging.currentframe(), 2
        while frame.f_code.co_filename == logging.__file__:
            frame = frame.f_back
            depth += 1

        logger.opt(depth=depth, exception=record.exc_info).log(
            level, record.getMessage()
        )


def setup_logging():
    """Configure structured logging with Loguru."""
    
    # Remove default handler
    logger.remove()
    
    # Add console handler with structured format
    logger.add(
        sys.stdout,
        format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | "
               "<level>{level: <8}</level> | "
               "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> | "
               "<level>{message}</level>",
        level=settings.log_level,
        colorize=True,
    )
    
    # Add file handler for production
    if settings.environment == "production":
        logger.add(
            "logs/pm33_api.log",
            rotation="10 MB",
            retention="30 days",
            format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {name}:{function}:{line} | {message}",
            level=settings.log_level,
        )
    
    # Intercept standard logging
    logging.basicConfig(handlers=[InterceptHandler()], level=0, force=True)
    
    # Set levels for external libraries
    for logger_name in ["uvicorn", "uvicorn.error", "uvicorn.access", "fastapi"]:
        logging_logger = logging.getLogger(logger_name)
        logging_logger.handlers = [InterceptHandler()]
        logging_logger.setLevel(logging.INFO)


def log_operation(
    user_id: int,
    operation_type: str,
    context: dict[str, Any] = None,
    success: bool = True,
    error: str = None
):
    """Log an intelligence operation execution."""
    log_data = {
        "user_id": user_id,
        "operation_type": operation_type,
        "success": success,
        "context": context or {},
    }
    
    if error:
        log_data["error"] = error
        logger.error(f"Operation failed: {operation_type}", **log_data)
    else:
        logger.info(f"Operation executed: {operation_type}", **log_data)


def log_billing_event(
    user_id: int,
    event_type: str,
    amount: float = None,
    subscription_tier: str = None,
    context: dict[str, Any] = None
):
    """Log a billing-related event."""
    log_data = {
        "user_id": user_id,
        "event_type": event_type,
        "subscription_tier": subscription_tier,
        "context": context or {},
    }
    
    if amount is not None:
        log_data["amount"] = amount
    
    logger.info(f"Billing event: {event_type}", **log_data)