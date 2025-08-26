'use client';
import { PM33_DESIGN } from '../../../components/marketing/PM33Header';

const PRICING_TIERS = [
  {
    name: 'Starter',
    price: '$29',
    description: '40 Intelligence Operations/month',
    features: [
      'Strategic Intelligence Engine',
      'Basic integrations (Jira, Linear)',
      'Email support',
      'Single user'
    ],
    cta: 'Start Free Trial',
    highlight: false
  },
  {
    name: 'Team', 
    price: '$79',
    description: '200 Intelligence Operations/month',
    features: [
      'Everything in Starter',
      '4 AI Teams coordination',
      'Advanced integrations',
      'Up to 5 users',
      'Priority support'
    ],
    cta: 'Start Free Trial',
    highlight: true
  },
  {
    name: 'Scale',
    price: '$199',
    description: '800 Intelligence Operations/month',
    features: [
      'Everything in Team',
      'Unlimited users',
      'Custom AI training',
      'Dedicated success manager',
      'SLA guarantees'
    ],
    cta: 'Contact Sales',
    highlight: false
  }
];

export default function PricingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '120px',
      paddingBottom: '80px',
      backgroundColor: PM33_DESIGN.colors.marketing.bg.primary
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <h1 style={{
          ...PM33_DESIGN.typography.h1,
          textAlign: 'center',
          color: PM33_DESIGN.colors.marketing.text.primary,
          marginBottom: '16px'
        }}>
          Simple, Transparent Pricing
        </h1>
        
        <p style={{
          ...PM33_DESIGN.typography.body,
          textAlign: 'center',
          color: PM33_DESIGN.colors.marketing.text.secondary,
          marginBottom: '64px'
        }}>
          Start with 40 free operations. No credit card required.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {PRICING_TIERS.map(tier => (
            <div key={tier.name} style={{
              backgroundColor: '#FFFFFF',
              border: tier.highlight ? `2px solid ${PM33_DESIGN.colors.marketing.primary}` : '1px solid #E5E7EB',
              borderRadius: '16px',
              padding: '32px',
              position: 'relative',
              transform: tier.highlight ? 'scale(1.05)' : 'scale(1)'
            }}>
              {tier.highlight && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: PM33_DESIGN.colors.marketing.primary,
                  color: '#FFFFFF',
                  padding: '4px 16px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 600
                }}>
                  MOST POPULAR
                </div>
              )}
              
              <h3 style={{ color: PM33_DESIGN.colors.marketing.text.primary }}>{tier.name}</h3>
              <div style={{ fontSize: '36px', fontWeight: 700, color: PM33_DESIGN.colors.marketing.primary }}>
                {tier.price}
              </div>
              <p style={{ color: PM33_DESIGN.colors.marketing.text.secondary, marginBottom: '24px' }}>
                {tier.description}
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
                {tier.features.map(feature => (
                  <li key={feature} style={{
                    padding: '8px 0',
                    color: PM33_DESIGN.colors.marketing.text.primary,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: '#10B981', marginRight: '8px' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button style={{
                width: '100%',
                padding: '16px',
                backgroundColor: tier.highlight ? PM33_DESIGN.colors.marketing.primary : '#FFFFFF',
                color: tier.highlight ? '#FFFFFF' : PM33_DESIGN.colors.marketing.primary,
                border: `2px solid ${PM33_DESIGN.colors.marketing.primary}`,
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}