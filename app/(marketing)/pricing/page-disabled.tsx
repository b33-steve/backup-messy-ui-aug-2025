'use client';

import React, { useState, useEffect } from 'react';
import { trackCAC, trackMRRProgress } from '../../../lib/posthog';
import { Container, Title, Text, Card, Stack, Badge, Button, Group, SimpleGrid, Box, Grid, ThemeIcon, Table, Divider } from '@mantine/core';
import { IconCheck, IconArrowRight, IconCalculator, IconUsers, IconBolt, IconShield, IconTrendingUp, IconStar } from '@tabler/icons-react';
import Link from 'next/link';

export default function PricingPage() {
  const [roiInputs, setRoiInputs] = useState({ teamSize: 5, hoursSaved: 15 });
  const [selectedTier, setSelectedTier] = useState('team');

  useEffect(() => {
    // Track pricing page views for conversion analysis
    trackCAC.landingPageView(
      new URLSearchParams(window.location.search).get('utm_source') || 'direct',
      new URLSearchParams(window.location.search).get('utm_medium') || undefined,
      new URLSearchParams(window.location.search).get('utm_campaign') || undefined
    );
    
    if (window.posthog) {
      window.posthog.capture('pricing_page_viewed', {
        referrer: document.referrer,
        page_load_time: Date.now(),
      });
    }
  }, []);

  const handlePlanSelect = (planId: string, planPrice: number) => {
    setSelectedTier(planId);
    
    // Track plan selection for MRR forecasting
    if (window.posthog) {
      window.posthog.capture('pricing_plan_selected', {
        plan_id: planId,
        plan_price: planPrice,
        roi_team_size: roiInputs.teamSize,
        roi_hours_saved: roiInputs.hoursSaved,
        calculated_savings: calculateROI().monthlySavings,
      });
    }

    trackCAC.signupStarted(`pricing_${planId}`, window.location.href);
  };

  const calculateROI = () => {
    const monthlySavings = roiInputs.teamSize * roiInputs.hoursSaved * 4 * 75; // $75/hr avg PM rate
    const teamPlanCost = 79;
    const monthlyCost = roiInputs.teamSize <= 1 ? 29 : teamPlanCost;
    const annualSavings = monthlySavings * 12;
    const annualCost = monthlyCost * 12;
    return { 
      monthlySavings, 
      annualSavings, 
      monthlyCost,
      roi: ((annualSavings - annualCost) / annualCost * 100).toFixed(0),
      paybackMonths: (monthlyCost / monthlySavings).toFixed(1)
    };
  };

  const pricingTiers = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$29',
      period: 'per month',
      description: 'Perfect for individual PMs starting their AI transformation',
      operations: '40 operations',
      costPerOp: '$0.73',
      badge: null,
      features: [
        '1 PM workspace',
        '40 AI operations per month',
        'Basic frameworks (ICE, RICE)',
        'Strategic analysis reports',
        'Email support',
        'Mobile app access'
      ]
    },
    {
      id: 'team',
      name: 'Team',
      price: '$79',
      period: 'per month',
      description: 'For small teams ready to scale strategic intelligence',
      operations: '200 operations',
      costPerOp: '$0.40',
      badge: 'Most Popular',
      popular: true,
      features: [
        'Up to 5 PM workspaces',
        '200 AI operations per month',
        'Advanced frameworks (Porter\'s Five Forces)',
        'Competitive intelligence reports',
        'Priority support',
        'Team collaboration tools',
        'Custom integrations (Jira, Slack)',
        'Advanced analytics dashboard'
      ]
    },
    {
      id: 'scale',
      name: 'Scale',
      price: '$199',
      period: 'per month',
      description: 'For growing organizations scaling PM operations',
      operations: '800 operations',
      costPerOp: '$0.25',
      badge: 'Best Value',
      features: [
        'Up to 15 PM workspaces',
        '800 AI operations per month',
        'Full framework library',
        'Predictive analytics',
        'Dedicated success manager',
        'Advanced team workflows',
        'Enterprise integrations',
        'Custom reporting',
        'API access'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$599',
      period: 'per month',
      description: 'For large organizations requiring full PMO transformation',
      operations: '3,000+ operations',
      costPerOp: '<$0.20',
      badge: 'Custom',
      features: [
        'Unlimited PM workspaces',
        '3,000+ AI operations per month',
        'Custom AI model training',
        'White-label options',
        '24/7 dedicated support',
        'On-premise deployment',
        'Custom integrations',
        'Advanced security (SOC 2)',
        'Executive training program'
      ],
      cta: 'Contact Sales'
    }
  ];

  const roi = calculateROI();

  return (
    <div className="marketing-context">
      <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>

        {/* Hero Section */}
        <Box 
          style={{ 
            position: 'relative',
            padding: '4rem 0',
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
            overflow: 'hidden'
          }}
        >
          <Container size="xl">
            <Stack align="center" gap={32}>
              <Badge 
                size="lg" 
                variant="gradient" 
                gradient={{ from: 'indigo.1', to: 'purple.1' }}
                c="indigo.7"
                leftSection={<IconCalculator size={16} />}
              >
                Intelligence Operations Pricing
              </Badge>
              
              <Stack align="center" gap={16}>
                <Title 
                  order={1} 
                  size="h1"
                  ta="center"
                  lh={1.1}
                  style={{ 
                    fontWeight: 800,
                    color: 'var(--mantine-color-dark-8)',
                    maxWidth: 900
                  }}
                >
                  Scale Your PMO Impact with
                  <Text 
                    span 
                    variant="gradient" 
                    gradient={{ from: 'indigo', to: 'cyan' }}
                    style={{ display: 'block', marginTop: 8 }}
                  >
                    Intelligence Operations
                  </Text>
                </Title>
                
                <Text size="xl" c="dimmed" ta="center" maw={700} lh={1.6}>
                  Usage-based pricing that scales with your PMO transformation. No per-seat limits, 
                  no feature restrictions—just pure strategic intelligence that grows with your team.
                </Text>
              </Stack>
              
              <Group gap={24}>
                <Group gap={8}>
                  <IconCheck size={16} color="var(--mantine-color-teal-6)" />
                  <Text size="sm" c="dimmed">14-day free trial</Text>
                </Group>
                <Group gap={8}>
                  <IconCheck size={16} color="var(--mantine-color-teal-6)" />
                  <Text size="sm" c="dimmed">No credit card required</Text>
                </Group>
                <Group gap={8}>
                  <IconCheck size={16} color="var(--mantine-color-teal-6)" />
                  <Text size="sm" c="dimmed">Cancel anytime</Text>
                </Group>
              </Group>
            </Stack>
          </Container>
        </Box>

        {/* Pricing Tiers */}
        <Box py={64} bg="white">
          <Container size="xl">
            <Grid gutter={24}>
              {pricingTiers.map((tier, index) => (
                <Grid.Col key={tier.id} span={{ base: 12, sm: 6, md: 3 }}>
                  <Card 
                    shadow="xl" 
                    radius="xl" 
                    p={32}
                    h="100%"
                    style={{ 
                      backgroundColor: 'white',
                      border: tier.popular ? '2px solid var(--mantine-color-indigo-4)' : '1px solid var(--mantine-color-gray-2)',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    className="hover:shadow-2xl hover:translate-y-[-4px]"
                    onClick={() => setSelectedTier(tier.id)}
                  >
                    {tier.badge && (
                      <Badge 
                        pos="absolute"
                        top={-12}
                        left="50%"
                        style={{ transform: 'translateX(-50%)' }}
                        size="sm"
                        color={tier.popular ? 'indigo' : tier.id === 'scale' ? 'green' : 'orange'}
                        variant="filled"
                      >
                        {tier.badge}
                      </Badge>
                    )}
                    
                    <Stack gap={24} h="100%">
                      <Stack gap={8}>
                        <Title order={3} size="h3" ta="center">
                          {tier.name}
                        </Title>
                        <Text size="sm" c="dimmed" ta="center">
                          {tier.description}
                        </Text>
                      </Stack>
                      
                      <Stack gap={8} ta="center">
                        <Group justify="center" align="baseline">
                          <Text size="48px" fw={800} c="indigo.6">
                            {tier.price}
                          </Text>
                          <Text size="sm" c="dimmed">
                            {tier.period}
                          </Text>
                        </Group>
                        <Group justify="center" gap={16}>
                          <Badge size="sm" color="blue" variant="light">
                            {tier.operations}
                          </Badge>
                          <Text size="xs" c="dimmed">
                            {tier.costPerOp} per operation
                          </Text>
                        </Group>
                      </Stack>
                      
                      <Stack gap={12} style={{ flex: 1 }}>
                        {tier.features.map((feature, i) => (
                          <Group key={i} gap={12} align="flex-start">
                            <IconCheck size={16} color="var(--mantine-color-teal-6)" style={{ marginTop: 2, flexShrink: 0 }} />
                            <Text size="sm">{feature}</Text>
                          </Group>
                        ))}
                      </Stack>
                      
                      <Button 
                        size="md"
                        variant={tier.popular ? 'gradient' : 'outline'}
                        gradient={tier.popular ? { from: 'indigo', to: 'purple' } : undefined}
                        color="indigo"
                        fullWidth
                        rightSection={<IconArrowRight size={16} />}
                        component={Link}
                        href={tier.cta === 'Contact Sales' ? '/contact' : '/trial'}
                      >
                        {tier.cta || 'Start Free Trial'}
                      </Button>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Feature Comparison Table */}
        <Box py={64} bg="gray.0">
          <Container size="xl">
            <Stack align="center" gap={48}>
              <Stack align="center" gap={16}>
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'blue', to: 'indigo' }}
                  leftSection={<IconUsers size={16} />}
                >
                  Feature Comparison
                </Badge>
                
                <Title order={2} size="h2" ta="center">
                  Compare Plans Side-by-Side
                </Title>
                <Text size="lg" c="dimmed" ta="center" maw={600}>
                  Choose the right plan based on your team size and strategic intelligence needs.
                </Text>
              </Stack>
              
              <Card shadow="xl" radius="xl" p={32} w="100%">
                <div style={{ overflowX: 'auto' }}>
                  <Table.ScrollContainer minWidth="800px">
                    <Table verticalSpacing="md" horizontalSpacing="lg" striped highlightOnHover>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th style={{ width: '35%' }}>
                            <Text fw={700} size="lg">Features</Text>
                          </Table.Th>
                          <Table.Th ta="center" style={{ width: '16.25%' }}>
                            <Stack gap={4} align="center">
                              <Text fw={700}>Starter</Text>
                              <Badge size="sm" color="blue" variant="light">$29/mo</Badge>
                            </Stack>
                          </Table.Th>
                          <Table.Th ta="center" style={{ width: '16.25%', position: 'relative' }}>
                            <Stack gap={4} align="center">
                              <Text fw={700}>Team</Text>
                              <Badge size="sm" color="indigo" variant="filled">$79/mo</Badge>
                              <Badge size="xs" color="indigo" variant="light" style={{ position: 'absolute', top: -8 }}>
                                Most Popular
                              </Badge>
                            </Stack>
                          </Table.Th>
                          <Table.Th ta="center" style={{ width: '16.25%' }}>
                            <Stack gap={4} align="center">
                              <Text fw={700}>Scale</Text>
                              <Badge size="sm" color="green" variant="filled">$199/mo</Badge>
                            </Stack>
                          </Table.Th>
                          <Table.Th ta="center" style={{ width: '16.25%' }}>
                            <Stack gap={4} align="center">
                              <Text fw={700}>Enterprise</Text>
                              <Badge size="sm" color="orange" variant="filled">$599/mo</Badge>
                            </Stack>
                          </Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {/* Core Capacity */}
                        <Table.Tr>
                          <Table.Td>
                            <Stack gap={2}>
                              <Text fw={600}>PM Workspaces</Text>
                              <Text size="xs" c="dimmed">Number of individual PM environments</Text>
                            </Stack>
                          </Table.Td>
                          <Table.Td ta="center"><Text fw={500}>1</Text></Table.Td>
                          <Table.Td ta="center"><Text fw={500}>Up to 5</Text></Table.Td>
                          <Table.Td ta="center"><Text fw={500}>Up to 15</Text></Table.Td>
                          <Table.Td ta="center"><Text fw={500}>Unlimited</Text></Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>
                            <Stack gap={2}>
                              <Text fw={600}>AI Operations per Month</Text>
                              <Text size="xs" c="dimmed">Strategic analysis, reports, framework processing</Text>
                            </Stack>
                          </Table.Td>
                          <Table.Td ta="center"><Text fw={500}>40</Text></Table.Td>
                          <Table.Td ta="center"><Text fw={500}>200</Text></Table.Td>
                          <Table.Td ta="center"><Text fw={500}>800</Text></Table.Td>
                          <Table.Td ta="center"><Text fw={500}>3,000+</Text></Table.Td>
                        </Table.Tr>
                        
                        {/* Strategic Analysis */}
                        <Table.Tr>
                          <Table.Td colSpan={5}>
                            <Text fw={700} c="indigo.6" size="md" mb={8}>Strategic Analysis Frameworks</Text>
                          </Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>Basic Frameworks (ICE, RICE)</Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>Advanced Frameworks (Porter's Five Forces)</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>Full Framework Library</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>Custom AI Model Training</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        {/* Intelligence & Analytics */}
                        <Table.Tr>
                          <Table.Td colSpan={5}>
                            <Text fw={700} c="indigo.6" size="md" mb={8}>Intelligence & Analytics</Text>
                          </Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>Strategic Analysis Reports</Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>Competitive Intelligence Reports</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>Predictive Analytics</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>Advanced Analytics Dashboard</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        {/* Collaboration & Integrations */}
                        <Table.Tr>
                          <Table.Td colSpan={5}>
                            <Text fw={700} c="indigo.6" size="md" mb={8}>Collaboration & Integrations</Text>
                          </Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>Team Collaboration Tools</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>Custom Integrations (Jira, Slack)</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>Enterprise Integrations</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>API Access</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        {/* Support & Services */}
                        <Table.Tr>
                          <Table.Td colSpan={5}>
                            <Text fw={700} c="indigo.6" size="md" mb={8}>Support & Services</Text>
                          </Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>Email Support</Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>Priority Support</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>Dedicated Success Manager</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>24/7 Dedicated Support</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        {/* Enterprise Features */}
                        <Table.Tr>
                          <Table.Td colSpan={5}>
                            <Text fw={700} c="indigo.6" size="md" mb={8}>Enterprise Features</Text>
                          </Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>Advanced Security (SOC 2)</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>On-Premise Deployment</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>White-Label Options</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                        
                        <Table.Tr>
                          <Table.Td>Executive Training Program</Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><Text c="dimmed">—</Text></Table.Td>
                          <Table.Td ta="center"><IconCheck size={16} color="var(--mantine-color-teal-6)" /></Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                  </Table.ScrollContainer>
                </div>
                
                <Divider my="xl" />
                
                <Group justify="center">
                  <Text size="sm" c="dimmed" ta="center">
                    All plans include mobile app access, 14-day free trial, and can be cancelled anytime.
                  </Text>
                </Group>
              </Card>
            </Stack>
          </Container>
        </Box>

        {/* ROI Calculator */}
        <Box py={64} bg="white">
          <Container size="xl">
            <Stack align="center" gap={48}>
              <Stack align="center" gap={16}>
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'teal', to: 'green' }}
                  leftSection={<IconCalculator size={16} />}
                >
                  ROI Calculator
                </Badge>
                
                <Title order={2} size="h2" ta="center">
                  See Your ROI in Real Time
                </Title>
                <Text size="lg" c="dimmed" ta="center" maw={600}>
                  Calculate how much PM33 can save your team based on strategic intelligence automation.
                </Text>
              </Stack>
              
              <Card shadow="xl" radius="xl" p={48} maw={800} w="100%">
                <Grid gutter={32}>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Stack gap={24}>
                      <Stack gap={8}>
                        <Text fw={600}>Team Size</Text>
                        <Group gap={16}>
                          <Button 
                            size="sm" 
                            variant={roiInputs.teamSize === 1 ? 'filled' : 'light'}
                            onClick={() => setRoiInputs({...roiInputs, teamSize: 1})}
                          >
                            1 PM
                          </Button>
                          <Button 
                            size="sm" 
                            variant={roiInputs.teamSize === 5 ? 'filled' : 'light'}
                            onClick={() => setRoiInputs({...roiInputs, teamSize: 5})}
                          >
                            5 PMs
                          </Button>
                          <Button 
                            size="sm" 
                            variant={roiInputs.teamSize === 15 ? 'filled' : 'light'}
                            onClick={() => setRoiInputs({...roiInputs, teamSize: 15})}
                          >
                            15 PMs
                          </Button>
                        </Group>
                      </Stack>
                      
                      <Stack gap={8}>
                        <Text fw={600}>Hours Saved per PM per Week</Text>
                        <Group gap={16}>
                          <Button 
                            size="sm" 
                            variant={roiInputs.hoursSaved === 10 ? 'filled' : 'light'}
                            onClick={() => setRoiInputs({...roiInputs, hoursSaved: 10})}
                          >
                            10 hrs
                          </Button>
                          <Button 
                            size="sm" 
                            variant={roiInputs.hoursSaved === 15 ? 'filled' : 'light'}
                            onClick={() => setRoiInputs({...roiInputs, hoursSaved: 15})}
                          >
                            15 hrs
                          </Button>
                          <Button 
                            size="sm" 
                            variant={roiInputs.hoursSaved === 20 ? 'filled' : 'light'}
                            onClick={() => setRoiInputs({...roiInputs, hoursSaved: 20})}
                          >
                            20 hrs
                          </Button>
                        </Group>
                      </Stack>
                    </Stack>
                  </Grid.Col>
                  
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Stack gap={16}>
                      <Group justify="space-between" align="baseline">
                        <Text fw={600} c="dimmed">Monthly Savings:</Text>
                        <Text size="xl" fw={700} c="teal.6">
                          ${roi.monthlySavings.toLocaleString()}
                        </Text>
                      </Group>
                      
                      <Group justify="space-between" align="baseline">
                        <Text fw={600} c="dimmed">PM33 Monthly Cost:</Text>
                        <Text size="lg" fw={600} c="orange.6">
                          ${roi.monthlyCost}
                        </Text>
                      </Group>
                      
                      <Divider />
                      
                      <Group justify="space-between" align="baseline">
                        <Text fw={700}>Net Monthly Savings:</Text>
                        <Text size="xl" fw={800} c="green.6">
                          ${(roi.monthlySavings - roi.monthlyCost).toLocaleString()}
                        </Text>
                      </Group>
                      
                      <Group justify="space-between" align="baseline">
                        <Text fw={700}>Annual ROI:</Text>
                        <Text size="24px" fw={800} c="green.6">
                          {roi.roi}%
                        </Text>
                      </Group>
                      
                      <Group justify="space-between" align="baseline">
                        <Text fw={600} c="dimmed">Payback Period:</Text>
                        <Text fw={600}>
                          {roi.paybackMonths} months
                        </Text>
                      </Group>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Card>
            </Stack>
          </Container>
        </Box>

        {/* Trust & Security */}
        <Box py={64} bg="white">
          <Container size="xl">
            <Stack align="center" gap={48}>
              <Stack align="center" gap={16}>
                <Badge size="lg" color="green" variant="light">
                  🛡️ Enterprise Security
                </Badge>
                <Title order={2} size="h2" ta="center">
                  Built for Enterprise Trust
                </Title>
              </Stack>
              
              <SimpleGrid cols={{ base: 1, md: 4 }} spacing={32}>
                {[
                  { icon: IconShield, title: 'SOC 2 Type II', desc: 'Certified compliance' },
                  { icon: IconBolt, title: '99.9% Uptime', desc: 'Guaranteed availability' },
                  { icon: IconUsers, title: 'GDPR Compliant', desc: 'Data protection' },
                  { icon: IconStar, title: 'Enterprise Support', desc: '24/7 dedicated team' }
                ].map((item, index) => (
                  <Card key={index} shadow="md" radius="xl" p={24} ta="center">
                    <Stack align="center" gap={16}>
                      <ThemeIcon size={56} color="green" variant="light">
                        <item.icon size={28} />
                      </ThemeIcon>
                      <Stack align="center" gap={8}>
                        <Text fw={600} size="lg">{item.title}</Text>
                        <Text c="dimmed" size="sm">{item.desc}</Text>
                      </Stack>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>

        {/* CTA */}
        <Box py={96} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Container size="md">
            <Stack align="center" gap={32}>
              <Stack align="center" gap={16}>
                <Badge size="lg" color="white" variant="light">
                  🚀 Ready to Transform?
                </Badge>
                <Title order={2} size="h2" c="white" ta="center">
                  Start Your PMO Transformation Today
                </Title>
                <Text size="lg" c="rgba(255, 255, 255, 0.9)" ta="center" maw={600}>
                  Join 2,500+ product teams using PM33 to scale strategic intelligence 
                  and focus on what matters most.
                </Text>
              </Stack>
              
              <Group gap={16}>
                <Button 
                  size="xl"
                  variant="white"
                  color="dark"
                  leftSection={<IconArrowRight size={20} />}
                  component={Link}
                  href="/trial"
                >
                  Start Free 14-Day Trial
                </Button>
                <Button 
                  size="xl"
                  variant="outline"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.3)', color: 'white' }}
                  component={Link}
                  href="/contact"
                >
                  Contact Sales
                </Button>
              </Group>
              
              <Text size="sm" c="rgba(255, 255, 255, 0.8)">
                ✅ No credit card required • ✅ Setup in 5 minutes • ✅ Cancel anytime
              </Text>
            </Stack>
          </Container>
        </Box>

      </Box>
    </div>
  );
}