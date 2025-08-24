'use client';

import { Container, Card, Title, Text, Button, Grid, Badge, Group } from '@mantine/core';
import { IconCheck, IconSparkles } from '@tabler/icons-react';
import { useState } from 'react';

const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individual PMs starting their AI transformation',
    badge: 'Most Popular',
    badgeColor: 'pink',
    monthlyPrice: 29,
    annualPrice: 24,
    confidence: 85,
    features: [
      '1 PM workspace',
      '50 AI analyses per month',
      'Basic strategic frameworks (ICE, RICE)',
      'PM tool integrations (3)',
      'Email support',
      '7-day analysis history'
    ]
  },
  {
    id: 'team',
    name: 'Team',
    description: 'For product teams ready to scale strategic intelligence',
    badge: 'Best Value',
    badgeColor: 'green',
    monthlyPrice: 79,
    annualPrice: 65,
    confidence: 92,
    features: [
      '5 PM workspaces',
      '200 AI analyses per month',
      'Advanced frameworks (Porter\'s Five Forces)',
      'PM tool integrations (unlimited)',
      'Priority support',
      '30-day analysis history'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For enterprises requiring full PMO transformation at scale',
    badge: 'Premium',
    badgeColor: 'violet',
    monthlyPrice: 599,
    annualPrice: 499,
    confidence: 98,
    features: [
      'Unlimited workspaces',
      'Unlimited AI analyses',
      'Custom strategic frameworks',
      'White-label integrations',
      'Dedicated success manager',
      'Unlimited history & exports'
    ],
    isEnterprise: true
  }
];

const faqs = [
  {
    question: 'How is PM33 different from other PM tools?',
    answer: 'PM33 doesn\'t replace your existing tools—it makes them 10x smarter. While others charge per seat, we charge for strategic value delivered. Our AI teams provide PMO-level intelligence in 10 minutes instead of 8 hours of manual work.'
  },
  {
    question: 'What integrations are included?',
    answer: 'All plans include integrations with Jira, Linear, Monday.com, Asana, Notion, and Slack. Enterprise plans include custom API access and white-label integration options.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! All plans include a 14-day free trial with full access to features. No credit card required to start—experience the PMO transformation yourself.'
  }
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="marketing-context">
      <Container size={1200} px={24} py={80}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Title 
            order={1} 
            size="3.5rem" 
            fw={700}
            c="var(--marketing-text-primary)"
            mb={24}
          >
            Intelligence Operations Pricing
          </Title>
          <Text 
            size="xl" 
            c="var(--marketing-text-secondary)"
            maw={700}
            mx="auto"
            mb={48}
          >
            Usage-based pricing that scales with your PMO transformation. No per-seat limits, no feature restrictions—just pure intelligence.
          </Text>
        </div>

        {/* Billing Toggle */}
        <Group justify="center" gap={16} mb={48}>
          <Text fw={isAnnual ? 400 : 600} c="var(--marketing-text-primary)">
            Monthly
          </Text>
          <Button
            variant="light"
            onClick={() => setIsAnnual(!isAnnual)}
            style={{
              width: '60px',
              height: '30px',
              padding: 0,
              backgroundColor: isAnnual ? 'var(--marketing-primary)' : 'var(--marketing-bg-secondary)',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: 'white',
                position: 'absolute',
                top: '2px',
                left: isAnnual ? '32px' : '2px',
                transition: 'left 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            />
          </Button>
          <Text fw={isAnnual ? 600 : 400} c="var(--marketing-text-primary)">
            Annual
          </Text>
          {isAnnual && (
            <Badge color="green" variant="filled" size="sm">
              Save 20%
            </Badge>
          )}
        </Group>

        {/* Pricing Cards */}
        <Grid mb={64}>
          {pricingPlans.map((plan) => (
            <Grid.Col key={plan.id} span={{ base: 12, md: 4 }}>
              <Card
                shadow="md"
                padding={32}
                radius={16}
                h="100%"
                style={{
                  backgroundColor: 'var(--marketing-bg-primary)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Plan Badge */}
                <Badge
                  color={plan.badgeColor}
                  variant="filled"
                  size="lg"
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  {plan.badge}
                </Badge>

                {/* Confidence Indicator */}
                <Group justify="flex-end" mb={16} mt={8}>
                  <div 
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--marketing-success)',
                      animation: 'pulse 2s infinite'
                    }}
                  />
                  <Text size="xs" c="var(--marketing-text-secondary)">
                    {plan.confidence}% Confidence
                  </Text>
                </Group>

                {/* Plan Name & Description */}
                <Title order={3} c="var(--marketing-text-primary)" mb={8}>
                  {plan.name}
                </Title>
                <Text c="var(--marketing-text-secondary)" size="sm" mb={32}>
                  {plan.description}
                </Text>

                {/* Price Display */}
                <div style={{ marginBottom: '2rem' }}>
                  <Text
                    size="3rem"
                    fw={700}
                    c="var(--marketing-primary)"
                    style={{ lineHeight: 1 }}
                  >
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </Text>
                  <Text c="var(--marketing-text-secondary)" size="sm" mt={8}>
                    {isAnnual ? 'per month (billed annually)' : 'per month'}
                  </Text>
                </div>

                {/* Features List */}
                <div style={{ flex: 1, marginBottom: '2rem' }}>
                  {plan.features.map((feature, index) => (
                    <Group key={index} gap={12} mb={12}>
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--marketing-success)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <IconCheck size={10} color="white" />
                      </div>
                      <Text size="sm" c="var(--marketing-text-secondary)">
                        {feature}
                      </Text>
                    </Group>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  size="lg"
                  fullWidth
                  variant={plan.isEnterprise ? 'outline' : 'filled'}
                  color={plan.isEnterprise ? 'gray' : undefined}
                  style={plan.isEnterprise ? {} : {
                    backgroundColor: 'var(--marketing-primary)',
                    color: 'white'
                  }}
                  leftSection={plan.isEnterprise ? undefined : <IconSparkles size={16} />}
                >
                  {plan.isEnterprise ? 'Contact Sales' : 'Start Free Trial'}
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* FAQ Section */}
        <Card
          shadow="md"
          padding={48}
          radius={16}
          style={{
            backgroundColor: 'var(--marketing-bg-accent)',
            border: '1px solid var(--marketing-primary)'
          }}
        >
          <Title 
            order={2} 
            c="var(--marketing-text-primary)"
            ta="center"
            mb={32}
          >
            Frequently Asked Questions
          </Title>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ marginBottom: '2rem' }}>
                <Title 
                  order={4} 
                  c="var(--marketing-primary)" 
                  mb={12}
                  size="1.1rem"
                  fw={600}
                >
                  {faq.question}
                </Title>
                <Text 
                  c="var(--marketing-text-secondary)" 
                  style={{ lineHeight: 1.6 }}
                >
                  {faq.answer}
                </Text>
              </div>
            ))}
          </div>
        </Card>
      </Container>
    </div>
  );
}