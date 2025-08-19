"""Stripe integration service for subscription management."""

import stripe
from typing import Optional, Dict, Any, List
from datetime import datetime
from fastapi import HTTPException, status
from utils.config import settings
from utils.logging import logger, log_billing_event

# Configure Stripe
stripe.api_key = settings.stripe_secret_key


class StripeService:
    """Service for Stripe payment processing and subscription management."""
    
    @staticmethod
    def create_customer(
        email: str,
        name: str = None,
        phone: str = None,
        metadata: Dict[str, str] = None
    ) -> stripe.Customer:
        """Create a new Stripe customer."""
        try:
            customer_data = {
                "email": email,
                "metadata": metadata or {}
            }
            
            if name:
                customer_data["name"] = name
            if phone:
                customer_data["phone"] = phone
            
            customer = stripe.Customer.create(**customer_data)
            logger.info(f"Stripe customer created: {customer.id} for {email}")
            return customer
            
        except stripe.error.StripeError as e:
            logger.error(f"Failed to create Stripe customer: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create customer: {str(e)}"
            )
    
    @staticmethod
    def get_customer(customer_id: str) -> Optional[stripe.Customer]:
        """Get Stripe customer by ID."""
        try:
            return stripe.Customer.retrieve(customer_id)
        except stripe.error.StripeError as e:
            logger.error(f"Failed to retrieve Stripe customer {customer_id}: {str(e)}")
            return None
    
    @staticmethod
    def create_subscription(
        customer_id: str,
        price_id: str,
        metadata: Dict[str, str] = None
    ) -> stripe.Subscription:
        """Create a new subscription for a customer."""
        try:
            subscription = stripe.Subscription.create(
                customer=customer_id,
                items=[{"price": price_id}],
                metadata=metadata or {},
                expand=["latest_invoice.payment_intent"]
            )
            
            logger.info(f"Stripe subscription created: {subscription.id} for customer {customer_id}")
            return subscription
            
        except stripe.error.StripeError as e:
            logger.error(f"Failed to create subscription: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create subscription: {str(e)}"
            )
    
    @staticmethod
    def get_subscription(subscription_id: str) -> Optional[stripe.Subscription]:
        """Get subscription by ID."""
        try:
            return stripe.Subscription.retrieve(subscription_id)
        except stripe.error.StripeError as e:
            logger.error(f"Failed to retrieve subscription {subscription_id}: {str(e)}")
            return None
    
    @staticmethod
    def update_subscription(
        subscription_id: str,
        price_id: str = None,
        metadata: Dict[str, str] = None
    ) -> stripe.Subscription:
        """Update an existing subscription."""
        try:
            update_data = {}
            
            if price_id:
                # Get current subscription to update items
                subscription = stripe.Subscription.retrieve(subscription_id)
                update_data["items"] = [
                    {
                        "id": subscription["items"]["data"][0]["id"],
                        "price": price_id
                    }
                ]
            
            if metadata:
                update_data["metadata"] = metadata
            
            if update_data:
                subscription = stripe.Subscription.modify(subscription_id, **update_data)
                logger.info(f"Stripe subscription updated: {subscription_id}")
                return subscription
            
            return stripe.Subscription.retrieve(subscription_id)
            
        except stripe.error.StripeError as e:
            logger.error(f"Failed to update subscription {subscription_id}: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to update subscription: {str(e)}"
            )
    
    @staticmethod
    def cancel_subscription(
        subscription_id: str,
        at_period_end: bool = True
    ) -> stripe.Subscription:
        """Cancel a subscription."""
        try:
            if at_period_end:
                subscription = stripe.Subscription.modify(
                    subscription_id,
                    cancel_at_period_end=True
                )
            else:
                subscription = stripe.Subscription.delete(subscription_id)
            
            logger.info(f"Stripe subscription canceled: {subscription_id} (at_period_end: {at_period_end})")
            return subscription
            
        except stripe.error.StripeError as e:
            logger.error(f"Failed to cancel subscription {subscription_id}: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to cancel subscription: {str(e)}"
            )
    
    @staticmethod
    def create_setup_intent(customer_id: str) -> stripe.SetupIntent:
        """Create a setup intent for saving payment methods."""
        try:
            setup_intent = stripe.SetupIntent.create(
                customer=customer_id,
                payment_method_types=["card"]
            )
            
            logger.info(f"Setup intent created: {setup_intent.id} for customer {customer_id}")
            return setup_intent
            
        except stripe.error.StripeError as e:
            logger.error(f"Failed to create setup intent: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create setup intent: {str(e)}"
            )
    
    @staticmethod
    def list_payment_methods(customer_id: str) -> List[stripe.PaymentMethod]:
        """List payment methods for a customer."""
        try:
            payment_methods = stripe.PaymentMethod.list(
                customer=customer_id,
                type="card"
            )
            return payment_methods.data
            
        except stripe.error.StripeError as e:
            logger.error(f"Failed to list payment methods for {customer_id}: {str(e)}")
            return []
    
    @staticmethod
    def create_invoice_item(
        customer_id: str,
        amount: int,  # Amount in cents
        description: str,
        metadata: Dict[str, str] = None
    ) -> stripe.InvoiceItem:
        """Create an invoice item for usage-based billing."""
        try:
            invoice_item = stripe.InvoiceItem.create(
                customer=customer_id,
                amount=amount,
                currency="usd",
                description=description,
                metadata=metadata or {}
            )
            
            logger.info(f"Invoice item created: {invoice_item.id} for customer {customer_id}")
            return invoice_item
            
        except stripe.error.StripeError as e:
            logger.error(f"Failed to create invoice item: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create invoice item: {str(e)}"
            )
    
    @staticmethod
    def create_invoice(
        customer_id: str,
        auto_advance: bool = True
    ) -> stripe.Invoice:
        """Create and optionally send an invoice."""
        try:
            invoice = stripe.Invoice.create(
                customer=customer_id,
                auto_advance=auto_advance
            )
            
            if auto_advance:
                invoice = stripe.Invoice.finalize_invoice(invoice.id)
            
            logger.info(f"Invoice created: {invoice.id} for customer {customer_id}")
            return invoice
            
        except stripe.error.StripeError as e:
            logger.error(f"Failed to create invoice: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create invoice: {str(e)}"
            )
    
    @staticmethod
    def process_webhook(payload: bytes, sig_header: str) -> Dict[str, Any]:
        """Process Stripe webhook event."""
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.stripe_webhook_secret
            )
            
            logger.info(f"Stripe webhook received: {event['type']}")
            return event
            
        except ValueError as e:
            logger.error(f"Invalid webhook payload: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid payload"
            )
        except stripe.error.SignatureVerificationError as e:
            logger.error(f"Invalid webhook signature: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid signature"
            )
    
    @staticmethod
    def get_tier_price_id(tier: str) -> str:
        """Get Stripe price ID for a subscription tier."""
        # These would be configured in Stripe dashboard
        price_ids = {
            "starter": "price_starter_tier_id",
            "team": "price_team_tier_id", 
            "scale": "price_scale_tier_id",
            "enterprise": "price_enterprise_tier_id"
        }
        
        price_id = price_ids.get(tier)
        if not price_id:
            raise ValueError(f"No price ID configured for tier: {tier}")
        
        return price_id
    
    @staticmethod
    def create_customer_portal_session(
        customer_id: str,
        return_url: str
    ) -> stripe.billing_portal.Session:
        """Create a customer portal session for managing subscriptions."""
        try:
            session = stripe.billing_portal.Session.create(
                customer=customer_id,
                return_url=return_url
            )
            
            logger.info(f"Customer portal session created for customer {customer_id}")
            return session
            
        except stripe.error.StripeError as e:
            logger.error(f"Failed to create customer portal session: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create portal session: {str(e)}"
            )
    
    @staticmethod
    def create_checkout_session(
        customer_id: str,
        price_id: str,
        success_url: str,
        cancel_url: str,
        metadata: Dict[str, str] = None
    ) -> stripe.checkout.Session:
        """Create a Stripe Checkout session for subscription signup."""
        try:
            session = stripe.checkout.Session.create(
                customer=customer_id,
                payment_method_types=["card"],
                line_items=[{
                    "price": price_id,
                    "quantity": 1
                }],
                mode="subscription",
                success_url=success_url,
                cancel_url=cancel_url,
                metadata=metadata or {}
            )
            
            logger.info(f"Checkout session created: {session.id} for customer {customer_id}")
            return session
            
        except stripe.error.StripeError as e:
            logger.error(f"Failed to create checkout session: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create checkout session: {str(e)}"
            )