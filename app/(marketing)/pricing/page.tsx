'use client';

import { Container, Grid, Card, Badge, Title, Text, Group, Stack, Button, List, Box } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import Link from 'next/link';
import Navigation from '../../../components/shared/Navigation';

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$20",
      period: "per user/month",
      description: "Perfect for small PM teams getting started with AI",
      features: [
        "Connect up to 3 tools (Jira, Slack, Monday)",
        "100 AI-generated documents per month",
        "Basic strategic insights dashboard",
        "Email support",
        "14-day free trial",
        "No setup fees"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      price: "$30",
      period: "per user/month", 
      description: "For growing teams ready to scale AI-powered PM workflows",
      features: [
        "Unlimited tool integrations",
        "Unlimited AI documentation and analysis",
        "Advanced predictive insights and recommendations",
        "Priority support + dedicated onboarding",
        "Custom AI training on your data",
        "Advanced analytics and reporting"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations with advanced security and customization needs",
      features: [
        "White-label AI assistant",
        "Custom AI training on your historical data",
        "Advanced security and compliance features",
        "Dedicated customer success manager",
        "Custom integrations and API access",
        "SLA guarantees and premium support"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Navigation />

      {/* Hero Section */}
      <Container size={1200} px={24} py={80}>
        <Stack gap={32} align="center">
          <Title order={1} size="48px" fw={700} ta="center" c="dark">
            Pricing That Scales with Value, Not Seats
          </Title>
          <Text size="xl" c="dimmed" ta="center" maw={600}>
            Usage-based pricing means you pay for results, not team size. All plans include our 10x Time Saved guarantee.
          </Text>
        </Stack>
      </Container>

      {/* Pricing Cards */}
      <Container size={1200} px={24} py={48}>
        <Grid>
          {plans.map((plan, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 4 }}>
              <Card
                shadow="md"
                padding={32}
                radius={16}
                style={{ 
                  height: '100%',
                  border: plan.popular ? '2px solid var(--mantine-color-blue-5)' : undefined,
                  backgroundColor: plan.popular ? 'var(--mantine-color-blue-0)' : undefined,
                  position: 'relative'
                }}
              >
                {plan.popular && (
                  <Badge
                    size="lg"
                    variant="filled"
                    color="blue"
                    style={{ 
                      position: 'absolute', 
                      top: -12, 
                      left: '50%', 
                      transform: 'translateX(-50%)' 
                    }}
                  >
                    Most Popular
                  </Badge>
                )}
                
                <Stack gap={24}>
                  <Stack gap={8} align="center">
                    <Title order={2} size="h2">{plan.name}</Title>
                    <Group gap={4}>
                      <Text size="36px" fw={700}>{plan.price}</Text>
                      <Text size="lg" c="dimmed">{plan.period}</Text>
                    </Group>
                    <Text c="dimmed" ta="center">{plan.description}</Text>
                  </Stack>

                  <List
                    spacing="sm"
                    size="sm"
                    center
                    icon={<IconCheck size="16" color="var(--mantine-color-green-5)" />}
                  >
                    {plan.features.map((feature, featureIndex) => (
                      <List.Item key={featureIndex}>{feature}</List.Item>
                    ))}
                  </List>

                  <Button
                    component={Link}
                    href={plan.name === 'Enterprise' ? '/contact' : '/trial'}
                    size="lg"
                    variant={plan.popular ? 'filled' : 'light'}
                    color="blue"
                    fullWidth
                  >
                    {plan.cta}
                  </Button>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Container size={1200} px={24} py={80} style={{ backgroundColor: 'var(--mantine-color-blue-6)' }}>
        <Stack gap={32} align="center">
          <Title order={1} size="36px" fw={700} ta="center" c="white">
            Ready to 10x Your PM Productivity?
          </Title>
          <Text size="xl" ta="center" c="rgba(255,255,255,0.9)">
            All plans come with our 10x Time Saved guarantee. Cancel anytime.
          </Text>
          <Button
            component={Link}
            href="/trial"
            size="xl"
            variant="white"
            color="blue"
          >
            Start Your Free 14-Day Trial
          </Button>
          <Text size="sm" c="rgba(255,255,255,0.8)">
            No credit card required. Full access to all features.
          </Text>
        </Stack>
      </Container>

      <Container>
        <Text ta="center" py={24} c="dimmed">© 2025 PM33. Pricing That Scales with You.</Text>
      </Container>
    </div>
  )
}