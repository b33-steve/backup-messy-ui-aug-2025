# PM33 Intelligence Operations Backend API

Production-ready FastAPI application for PM33's Intelligence Operations billing system with multi-tier subscriptions, operations tracking, and Stripe integration.

## Features

- **User Authentication**: JWT-based authentication with role management
- **Subscription Management**: Multi-tier subscription system ($29/$79/$199/$599)
- **Operations Tracking**: Usage tracking with $0.08 per operation billing
- **Stripe Integration**: Complete payment processing and webhook handling
- **Usage Analytics**: Comprehensive usage statistics and billing history
- **Production Ready**: Structured logging, error handling, health checks

## Architecture

```
app/backend/
├── main.py                 # FastAPI application entry point
├── alembic/               # Database migrations
├── models/                # SQLAlchemy models
├── routes/                # API endpoints
├── services/              # Business logic
├── utils/                 # Configuration and utilities
└── requirements.txt       # Python dependencies
```

## Subscription Tiers

| Tier | Price/Month | Operations Limit | Features |
|------|-------------|------------------|-----------|
| Starter | $29 | 100 | Basic analysis, Email support |
| Team | $79 | 500 | Advanced analysis, Priority support |
| Scale | $199 | 2,000 | Full suite, API access, Dedicated support |
| Enterprise | $599 | 10,000 | Custom integrations, 24/7 support |

## Intelligence Operations

- **Strategic Analysis**: Comprehensive strategic analysis with recommendations
- **Workflow Generation**: Generate executable workflows with task breakdown
- **Competitive Analysis**: Analyze competitors, market position, opportunities
- **Market Research**: Market sizing, trends analysis, customer segmentation

## Setup

### 1. Environment Configuration

Copy the environment template and configure your settings:

```bash
cp .env.template .env
```

Configure the following variables in `.env`:

- `DATABASE_URL`: PostgreSQL connection string for async operations
- `DATABASE_URL_SYNC`: PostgreSQL connection string for migrations
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
- `SECRET_KEY`: JWT secret key (32+ characters)
- `REDIS_URL`: Redis connection string

### 2. Database Setup

Install PostgreSQL and create the database:

```bash
createdb pm33_db
```

Run database migrations:

```bash
alembic upgrade head
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Start the Application

Development mode:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Production mode:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile
- `POST /api/auth/change-password` - Change password

### Intelligence Operations
- `POST /api/operations/execute` - Execute an intelligence operation
- `GET /api/operations/` - List user operations
- `GET /api/operations/{operation_id}` - Get specific operation
- `GET /api/operations/statistics/usage` - Get usage statistics
- `GET /api/operations/types/available` - Get available operation types

### Subscriptions
- `GET /api/subscriptions/tiers` - Get available subscription tiers
- `GET /api/subscriptions/current` - Get current subscription
- `POST /api/subscriptions/create` - Create new subscription
- `PUT /api/subscriptions/update` - Update subscription tier
- `POST /api/subscriptions/cancel` - Cancel subscription
- `POST /api/subscriptions/checkout` - Create Stripe checkout session

### Billing
- `GET /api/billing/history` - Get billing history
- `GET /api/billing/summary` - Get billing summary
- `POST /api/billing/webhooks/stripe` - Stripe webhook endpoint
- `GET /api/billing/invoices` - Get user invoices
- `GET /api/billing/payment-methods` - Get payment methods

## Stripe Integration

### Webhook Configuration

Configure the following Stripe webhook events:
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Webhook URL: `https://your-domain.com/api/billing/webhooks/stripe`

### Price IDs

Configure Stripe Price IDs in `services/stripe_service.py`:

```python
price_ids = {
    "starter": "price_starter_tier_id",
    "team": "price_team_tier_id", 
    "scale": "price_scale_tier_id",
    "enterprise": "price_enterprise_tier_id"
}
```

## Database Schema

### Users
- User accounts with authentication
- Stripe customer integration
- Profile information

### Subscriptions
- Subscription tier management
- Usage tracking (operations per month)
- Stripe subscription integration

### Operations
- Intelligence operation execution tracking
- Cost calculation and billing
- Session and context management

### Billing Records
- Payment event tracking
- Stripe webhook event processing
- Invoice and payment method management

## Security

- JWT tokens for authentication
- Password hashing with bcrypt
- Input validation with Pydantic
- CORS configuration
- Rate limiting (can be added with Redis)
- Stripe webhook signature verification

## Monitoring

- Structured logging with Loguru
- Health check endpoint (`/health`)
- Metrics endpoint (`/metrics`)
- Exception tracking and reporting

## Deployment

### Docker Deployment

1. Create `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

2. Build and run:

```bash
docker build -t pm33-api .
docker run -p 8000:8000 --env-file .env pm33-api
```

### Production Considerations

- Use a process manager like Gunicorn with Uvicorn workers
- Set up SSL/TLS termination
- Configure logging to external service
- Set up monitoring with Prometheus/Grafana
- Use Redis for caching and rate limiting
- Set up backup strategy for PostgreSQL

## API Documentation

When running in development mode, API documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Testing

Run tests with pytest:

```bash
pytest tests/
```

## License

Proprietary - PM33 Intelligence Operations