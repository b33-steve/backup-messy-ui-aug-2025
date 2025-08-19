"""Initial schema for PM33 Intelligence Operations

Revision ID: 001_initial_schema
Revises: 
Create Date: 2024-08-19 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '001_initial_schema'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create all tables for PM33 Intelligence Operations."""
    
    # Create users table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('username', sa.String(length=100), nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.Column('first_name', sa.String(length=100), nullable=True),
        sa.Column('last_name', sa.String(length=100), nullable=True),
        sa.Column('company', sa.String(length=255), nullable=True),
        sa.Column('role', sa.String(length=50), nullable=True, default='user'),
        sa.Column('is_active', sa.Boolean(), nullable=True, default=True),
        sa.Column('is_verified', sa.Boolean(), nullable=True, default=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('last_login_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('stripe_customer_id', sa.String(length=255), nullable=True),
        sa.Column('api_key', sa.String(length=255), nullable=True),
        sa.Column('preferences', sa.Text(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_username'), 'users', ['username'], unique=True)
    op.create_index(op.f('ix_users_stripe_customer_id'), 'users', ['stripe_customer_id'], unique=True)
    op.create_index(op.f('ix_users_api_key'), 'users', ['api_key'], unique=True)
    
    # Create subscriptions table
    op.create_table(
        'subscriptions',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('tier', sa.String(length=50), nullable=False),
        sa.Column('status', sa.String(length=50), nullable=True, default='active'),
        sa.Column('stripe_subscription_id', sa.String(length=255), nullable=True),
        sa.Column('stripe_price_id', sa.String(length=255), nullable=True),
        sa.Column('current_period_start', sa.DateTime(timezone=True), nullable=True),
        sa.Column('current_period_end', sa.DateTime(timezone=True), nullable=True),
        sa.Column('cancel_at_period_end', sa.Boolean(), nullable=True, default=False),
        sa.Column('canceled_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('operations_used_this_month', sa.Integer(), nullable=True, default=0),
        sa.Column('operations_limit', sa.Integer(), nullable=False),
        sa.Column('monthly_price', sa.Numeric(precision=10, scale=2), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_subscriptions_stripe_subscription_id'), 'subscriptions', ['stripe_subscription_id'], unique=True)
    
    # Create operations table
    op.create_table(
        'operations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('operation_type', sa.String(length=100), nullable=False),
        sa.Column('query', sa.Text(), nullable=False),
        sa.Column('status', sa.String(length=50), nullable=True, default='pending'),
        sa.Column('started_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('completed_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('result', sa.Text(), nullable=True),
        sa.Column('error_message', sa.Text(), nullable=True),
        sa.Column('execution_time_ms', sa.Integer(), nullable=True),
        sa.Column('cost', sa.Numeric(precision=10, scale=4), nullable=False),
        sa.Column('billed', sa.Boolean(), nullable=True, default=False),
        sa.Column('context_data', sa.Text(), nullable=True),
        sa.Column('session_id', sa.String(length=255), nullable=True),
        sa.Column('ip_address', sa.String(length=45), nullable=True),
        sa.Column('user_agent', sa.String(length=500), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_operations_user_id'), 'operations', ['user_id'])
    op.create_index(op.f('ix_operations_session_id'), 'operations', ['session_id'])
    op.create_index(op.f('ix_operations_operation_type'), 'operations', ['operation_type'])
    op.create_index(op.f('ix_operations_status'), 'operations', ['status'])
    op.create_index(op.f('ix_operations_created_at'), 'operations', ['created_at'])
    
    # Create billing_records table
    op.create_table(
        'billing_records',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('event_type', sa.String(length=100), nullable=False),
        sa.Column('amount', sa.Numeric(precision=10, scale=2), nullable=False),
        sa.Column('currency', sa.String(length=3), nullable=True, default='usd'),
        sa.Column('stripe_event_id', sa.String(length=255), nullable=True),
        sa.Column('stripe_invoice_id', sa.String(length=255), nullable=True),
        sa.Column('stripe_payment_intent_id', sa.String(length=255), nullable=True),
        sa.Column('stripe_subscription_id', sa.String(length=255), nullable=True),
        sa.Column('status', sa.String(length=50), nullable=True, default='pending'),
        sa.Column('processed', sa.Boolean(), nullable=True, default=False),
        sa.Column('billing_period_start', sa.DateTime(timezone=True), nullable=True),
        sa.Column('billing_period_end', sa.DateTime(timezone=True), nullable=True),
        sa.Column('operations_count', sa.Integer(), nullable=True),
        sa.Column('description', sa.String(length=500), nullable=True),
        sa.Column('metadata', sa.Text(), nullable=True),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('processed_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_billing_records_stripe_event_id'), 'billing_records', ['stripe_event_id'], unique=True)
    op.create_index(op.f('ix_billing_records_user_id'), 'billing_records', ['user_id'])
    op.create_index(op.f('ix_billing_records_event_type'), 'billing_records', ['event_type'])
    op.create_index(op.f('ix_billing_records_status'), 'billing_records', ['status'])
    op.create_index(op.f('ix_billing_records_created_at'), 'billing_records', ['created_at'])


def downgrade() -> None:
    """Drop all tables."""
    op.drop_table('billing_records')
    op.drop_table('operations') 
    op.drop_table('subscriptions')
    op.drop_table('users')