'use client';

import { Container, Title, Text, Button, Card, Group, List, Stack, Badge, Grid, Divider } from '@mantine/core';
import { IconRocket, IconBrain, IconShield, IconCheck, IconX, IconStar, IconTrophy, IconUsers, IconClock, IconTarget, IconSparkles, IconArrowRight, IconCrown } from '@tabler/icons-react';
import Link from 'next/link';
import { trackCAC } from '../../../lib/posthog';

/**
 * Component: Pricing - Strategic Intelligence Plans & Pricing
 * Route: /pricing
 * Purpose: Display PM33 pricing tiers and help users choose the right plan
 * Target: Product Managers evaluating PM33 for personal or team use
 */

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "14 days",
      description: "Perfect for evaluating PM33's strategic intelligence capabilities",
      features: [
        "Full access to all 4 AI teams",
        "Strategic Intelligence analysis (5 queries)",
        "Basic workflow automation",
        "PM tool integration (1 tool)",
        "Community support",
        "All strategic documents included"
      ],
      limitations: [
        "Limited to 5 strategic analyses",
        "1 PM tool integration only",
        "Standard response times"
      ],
      cta: "Start Free Trial",
      ctaVariant: "filled",
      popular: false,
      color: "gray"
    },
    {
      name: "Professional PM", 
      price: "$29",
      period: "per month",
      description: "Complete PMO transformation for individual product managers",
      features: [
        "Unlimited strategic intelligence queries",
        "All 4 AI teams (Strategic, Workflow, Data, Communication)",
        "Advanced competitive analysis",
        "All PM tool integrations (Jira, Linear, Monday, Asana)",
        "Automated workflow orchestration",
        "Stakeholder communication generation",
        "Priority support (4-hour response)",
        "Custom strategic frameworks",
        "Performance analytics & insights"
      ],
      limitations: [],
      cta: "Start Professional",
      ctaVariant: "filled", 
      popular: true,
      color: "blue"
    },
    {
      name: "Team Intelligence",
      price: "$149", 
      period: "per month",
      description: "Strategic intelligence for PM teams (up to 5 PMs)",
      features: [
        "Everything in Professional",
        "Multi-PM team coordination",
        "Cross-project strategic alignment",
        "Team performance analytics",
        "Shared strategic knowledge base",
        "Advanced integrations & APIs",
        "Team onboarding & training",
        "Priority support (2-hour response)",
        "Custom AI model fine-tuning",
        "Dedicated success manager"
      ],
      limitations: [],
      cta: "Contact Sales",
      ctaVariant: "outline",
      popular: false,
      color: "purple"
    },
    {
      name: "Enterprise PMO",
      price: "Custom",
      period: "pricing",
      description: "Full PMO transformation for large product organizations",
      features: [
        "Everything in Team Intelligence",
        "Unlimited team members",
        "Enterprise-grade security (SOC 2)",
        "Custom AI team configurations",
        "Advanced analytics & reporting",
        "24/7 priority support (15-min response)",
        "On-premise deployment options",
        "Custom integrations & workflows",
        "Executive strategic briefings",
        "Dedicated technical account manager"
      ],
      limitations: [],
      cta: "Enterprise Sales",
      ctaVariant: "filled",
      popular: false,
      color: "orange"
    }
  ];

  const comparisonFeatures = [
    { feature: "Strategic Intelligence Queries", free: "5 total", pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited" },
    { feature: "AI Teams Access", free: "All 4 teams", pro: "All 4 teams", team: "All 4 teams", enterprise: "All 4 teams" },
    { feature: "PM Tool Integrations", free: "1 tool", pro: "All tools", team: "All tools", enterprise: "All tools + Custom" },
    { feature: "Support Response Time", free: "24 hours", pro: "4 hours", team: "2 hours", enterprise: "15 minutes" },
    { feature: "Team Members", free: "1 user", pro: "1 user", team: "Up to 5 users", enterprise: "Unlimited" },
    { feature: "Custom Frameworks", free: "❌", pro: "✅", team: "✅", enterprise: "✅" },
    { feature: "API Access", free: "❌", pro: "Basic", team: "Advanced", enterprise: "Enterprise" },
    { feature: "Enterprise Security", free: "❌", pro: "❌", team: "❌", enterprise: "✅" }
  ];

  return (
    <Container size={1400} px={24} py={40}>
      
      {/* Hero Section */}
      <Stack gap={32} ta="center" mb={80}>
        <Badge
          size="lg"
          variant="gradient"
          gradient={{ from: 'green', to: 'blue' }}
          radius="xl"
        >
          💰 Transparent Pricing • No Hidden Fees
        </Badge>
        
        <Title order={1} size="h1" fw={700} maw={900} mx="auto">
          Choose Your
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: 'green', to: 'blue', deg: 45 }}
            inherit
            display="block"
            mt={8}
          >
            PMO Transformation Plan
          </Text>
        </Title>
        
        <Text size="xl" c="dimmed" maw={700} mx="auto" mb={32}>
          From individual PM to strategic PMO leader. Choose the plan that matches your ambition and scale. 
          All plans include our 30-day transformation guarantee.
        </Text>
        
        <Group justify="center" gap={24}>
          <Button 
            component={Link}
            href="/trial"
            size="xl"
            radius="xl"
            leftSection={<IconRocket size={24} />}
            style={{
              fontSize: '18px',
              padding: '16px 32px',
              height: 'auto'
            }}
          >
            Start Free 14-Day Trial
          </Button>
          
          <Button 
            component={Link}
            href="/command-center-demo"
            size="xl"
            variant="outline"
            radius="xl"
            leftSection={<IconBrain size={24} />}
            style={{
              fontSize: '16px', 
              padding: '16px 32px',
              height: 'auto'
            }}
          >
            See Live Demo
          </Button>
        </Group>
      </Stack>

      {/* Pricing Cards */}
      <Grid mb={80}>
        {pricingPlans.map((plan, index) => (
          <Grid.Col key={index} span={{ base: 12, lg: 6, xl: 3 }}>
            <Card 
              padding="xl" 
              radius="lg" 
              shadow={plan.popular ? "xl" : "md"}
              style={{ 
                height: '100%',
                position: 'relative',
                border: plan.popular ? `2px solid var(--mantine-color-${plan.color}-6)` : '1px solid rgba(0,0,0,0.1)',
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              {plan.popular && (
                <Badge 
                  size="lg"
                  color={plan.color}
                  variant="filled"
                  style={{ 
                    position: 'absolute', 
                    top: -12, 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    zIndex: 1
                  }}
                  leftSection={<IconStar size={16} />}
                >
                  Most Popular
                </Badge>
              )}
              
              <Stack gap={24} style={{ height: '100%' }}>
                <div>
                  <Title order={3} fw={700} mb={8} ta="center">
                    {plan.name}
                  </Title>
                  
                  <Group justify="center" gap={8} mb={16}>
                    <Text size="3xl" fw={900} c={`var(--mantine-color-${plan.color}-6)`}>
                      {plan.price}
                    </Text>
                    <Text c="dimmed">/{plan.period}</Text>
                  </Group>
                  
                  <Text size="sm" ta="center" c="dimmed" mb={24}>
                    {plan.description}
                  </Text>
                </div>
                
                <div style={{ flex: 1 }}>
                  <Title order={4} size="sm" fw={700} mb={16} c={`var(--mantine-color-${plan.color}-6)`}>
                    ✨ What's Included:
                  </Title>
                  <Stack gap={8}>
                    {plan.features.map((feature, idx) => (
                      <Group key={idx} gap={8}>
                        <IconCheck size={16} color="var(--marketing-success)" />
                        <Text size="sm">{feature}</Text>
                      </Group>
                    ))}
                  </Stack>
                  
                  {plan.limitations.length > 0 && (
                    <>
                      <Divider my={16} />
                      <Title order={4} size="sm" fw={700} mb={12} c="orange">
                        ⚠️ Limitations:
                      </Title>
                      <Stack gap={8}>
                        {plan.limitations.map((limitation, idx) => (
                          <Group key={idx} gap={8}>
                            <IconX size={16} color="orange" />
                            <Text size="sm" c="dimmed">{limitation}</Text>
                          </Group>
                        ))}
                      </Stack>
                    </>
                  )}
                </div>
                
                <Button
                  component={Link}
                  href={plan.cta === 'Start Free Trial' ? '/trial' : 
                        plan.cta === 'Contact Sales' ? '/contact' :
                        plan.cta === 'Enterprise Sales' ? '/contact' : '/trial'}
                  size="lg"
                  color={plan.color}
                  variant={plan.ctaVariant}
                  radius="xl"
                  fullWidth
                  rightSection={<IconArrowRight size={16} />}
                  onClick={() => {
                    // Track pricing plan selection for $100K MRR analysis
                    if (plan.cta === 'Start Free Trial') {
                      trackCAC.signupStarted(`pricing_${plan.name.toLowerCase().replace(' ', '_')}`, window.location.href);
                      trackCAC.trialStarted(`user_${Date.now()}`, plan.name);
                    } else if (plan.cta.includes('Sales')) {
                      trackCAC.signupStarted(`pricing_sales_${plan.name.toLowerCase().replace(' ', '_')}`, window.location.href);
                    }
                  }}
                >
                  {plan.cta}
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Feature Comparison Table */}
      <Card shadow="md" padding={48} radius={16} mb={80}>
        <Title order={2} ta="center" mb={48} fw={700}>
          📊 Detailed Feature Comparison
        </Title>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '16px', borderBottom: '2px solid #e0e0e0' }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '16px', borderBottom: '2px solid #e0e0e0' }}>Free Trial</th>
                <th style={{ textAlign: 'center', padding: '16px', borderBottom: '2px solid #e0e0e0', backgroundColor: '#f0f8ff' }}>Professional</th>
                <th style={{ textAlign: 'center', padding: '16px', borderBottom: '2px solid #e0e0e0' }}>Team</th>
                <th style={{ textAlign: 'center', padding: '16px', borderBottom: '2px solid #e0e0e0' }}>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{row.feature}</td>
                  <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px' }}>{row.free}</td>
                  <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px', backgroundColor: '#f0f8ff' }}>{row.pro}</td>
                  <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px' }}>{row.team}</td>
                  <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px' }}>{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ROI Calculator */}
      <Card shadow="md" padding={48} radius={16} mb={80}
            style={{ backgroundColor: 'var(--marketing-bg-secondary)' }}>
        <Title order={2} ta="center" mb={32} fw={700}>
          💡 Calculate Your ROI
        </Title>
        
        <Grid align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap={24}>
              <div>
                <Text fw={700} mb={8}>Your Current PM Time Allocation:</Text>
                <Stack gap={8}>
                  <Group justify="space-between">
                    <Text>Administrative Tasks:</Text>
                    <Text fw={700} c="red">60% (4.8 hrs/day)</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text>Strategic Work:</Text>
                    <Text fw={700} c="orange">40% (3.2 hrs/day)</Text>
                  </Group>
                </Stack>
              </div>
              
              <Divider />
              
              <div>
                <Text fw={700} mb={8} c="green">With PM33 Professional ($29/month):</Text>
                <Stack gap={8}>
                  <Group justify="space-between">
                    <Text>Administrative Tasks:</Text>
                    <Text fw={700} c="green">20% (1.6 hrs/day)</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text>Strategic Work:</Text>
                    <Text fw={700} c="green">80% (6.4 hrs/day)</Text>
                  </Group>
                </Stack>
              </div>
            </Stack>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card padding="xl" radius="xl" shadow="lg">
              <Stack align="center" ta="center">
                <IconTrophy size={64} color="var(--marketing-primary)" />
                <Title order={3} fw={700}>Monthly Value Added</Title>
                
                <Grid>
                  <Grid.Col span={6}>
                    <Text size="xl" fw={700} c="green">+72 hrs</Text>
                    <Text size="sm" c="dimmed">Strategic time gained</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="xl" fw={700} c="green">$7,200</Text>
                    <Text size="sm" c="dimmed">Value at $100/hr PM rate</Text>
                  </Grid.Col>
                </Grid>
                
                <Divider style={{ width: '100%' }} />
                
                <Group>
                  <Text size="lg" fw={700}>ROI: </Text>
                  <Text size="2xl" fw={900} c="green">24,800%</Text>
                </Group>
                
                <Text size="sm" c="dimmed" ta="center">
                  $29 investment → $7,200 monthly value
                </Text>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Card>

      {/* Guarantee Section */}
      <Card shadow="xl" padding={48} radius={20} mb={80}
            style={{ borderLeft: '8px solid var(--marketing-success)' }}>
        <Group align="center" mb={32}>
          <IconShield size={64} color="var(--marketing-success)" />
          <div>
            <Title order={2} fw={700} mb={8}>
              🛡️ Zero-Risk PMO Transformation Guarantee
            </Title>
            <Text c="dimmed" size="lg">
              We're confident PM33 will transform your strategic capabilities within 30 days
            </Text>
          </div>
        </Group>
        
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="center" ta="center">
              <IconClock size={48} color="var(--marketing-success)" />
              <Text size="xl" fw={700} c="var(--marketing-success)">14 Days Free</Text>
              <Text>No credit card required for full access trial</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="center" ta="center">
              <IconTrophy size={48} color="var(--marketing-success)" />
              <Text size="xl" fw={700} c="var(--marketing-success)">30-Day Guarantee</Text>
              <Text>Full refund if not completely satisfied</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="center" ta="center">
              <IconTarget size={48} color="var(--marketing-success)" />
              <Text size="xl" fw={700} c="var(--marketing-success)">Keep Everything</Text>
              <Text>All strategic documents and insights yours to keep</Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Card>

      {/* FAQ Section */}
      <Card shadow="md" padding={48} radius={16} mb={80}>
        <Title order={2} ta="center" mb={48} fw={700}>
          🤔 Frequently Asked Questions
        </Title>
        
        <Grid>
          {[
            {
              q: "Can I upgrade or downgrade my plan anytime?",
              a: "Yes! You can upgrade immediately for more features or downgrade at your next billing cycle. No penalties or long-term commitments."
            },
            {
              q: "What happens to my data if I cancel?",
              a: "You keep all strategic documents, analyses, and insights generated during your subscription. We provide data export tools for easy migration."
            },
            {
              q: "Do you offer discounts for annual payments?",
              a: "Yes! Save 20% with annual billing. Professional becomes $278/year ($23/month) and Team becomes $1,430/year ($119/month)."
            },
            {
              q: "Can I try Team or Enterprise features?",
              a: "Absolutely! Contact our sales team to arrange a custom trial with team features or enterprise security requirements."
            },
            {
              q: "What if I need custom integrations?",
              a: "Team and Enterprise plans include custom API development. Our technical team works with you to integrate PM33 with your unique tool stack."
            },
            {
              q: "Is my strategic data secure?",
              a: "Yes! SOC 2 Type II certified, end-to-end encryption, and enterprise-grade security. Your strategic intelligence stays confidential."
            }
          ].map((faq, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 6 }}>
              <Card padding="lg" radius="lg" shadow="sm" style={{ height: '100%' }}>
                <Title order={4} fw={700} mb={12} c="var(--marketing-primary)">
                  {faq.q}
                </Title>
                <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                  {faq.a}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Card>

      {/* Final CTA */}
      <Card shadow="xl" padding={64} radius={20} 
            style={{ 
              background: 'linear-gradient(135deg, var(--marketing-primary) 0%, var(--marketing-success) 100%)',
              color: 'white',
              textAlign: 'center'
            }}>
        <IconCrown size={64} style={{ marginBottom: 32 }} />
        <Title order={1} size="h1" fw={700} mb={24} style={{ color: 'white' }}>
          Ready to Transform from PM to Strategic PMO?
        </Title>
        
        <Text size="xl" mb={48} maw={800} mx="auto" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          Join 2,500+ product managers who've already made the transformation. 
          Start your strategic intelligence journey with zero risk.
        </Text>
        
        <Group justify="center" gap={24}>
          <Button 
            component={Link}
            href="/trial"
            size="xl"
            radius="xl"
            variant="white"
            style={{ 
              fontSize: '20px',
              padding: '20px 40px',
              height: 'auto',
              color: 'var(--marketing-primary)'
            }}
            leftSection={<IconRocket size={24} />}
          >
            Start Free 14-Day Trial
          </Button>
          <Button 
            component={Link}
            href="/contact"
            size="xl"
            variant="outline"
            radius="xl"
            style={{ 
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'white',
              fontSize: '18px',
              padding: '18px 32px',
              height: 'auto'
            }}
            rightSection={<IconArrowRight size={20} />}
          >
            Talk to Sales
          </Button>
        </Group>
        
        <Text mt={32} style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          🚀 No credit card required • 30-day money-back guarantee • Keep all strategic insights
        </Text>
      </Card>
      
    </Container>
  );
}