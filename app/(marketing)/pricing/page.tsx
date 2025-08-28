'use client';

import React, { useState } from 'react';
import { Container, Card, Title, Text, Button, Stack, Box, Badge, Group, SimpleGrid, Switch, Divider, List, ThemeIcon, Center, Progress } from '@mantine/core';
import { IconCheck, IconArrowRight, IconCalculator, IconTrendingUp, IconUsers, IconBolt, IconStar, IconShield, IconClock } from '@tabler/icons-react';
import Link from 'next/link';
import TestimonialShowcase from '../../../components/marketing/TestimonialShowcase';
import SocialProofMetrics from '../../../components/marketing/SocialProofMetrics';
import ABTestingFramework, { ABTestCTA } from '../../../components/marketing/ABTestingFramework';

/**
 * Component: ConversionOptimizedPricingPage
 * Design Reference: 100K MRR Strategy - Team Tier Focus ($79/month primary driver)
 * UX Pattern: Value-based pricing with ROI calculator and segment targeting
 * 
 * Compliance Checklist:
 * - [x] Segment-specific value propositions
 * - [x] ROI calculator for value demonstration  
 * - [x] Enterprise tier emphasis (primary revenue driver)
 * - [x] Social proof and urgency elements
 * - [x] Multiple CTAs with conversion optimization
 * - [x] Progressive pricing disclosure
 */

export default function ConversionOptimizedPricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [roiInputs, setRoiInputs] = useState({
    currentPMSalary: 120000,
    timeSpentOnBusywork: 60,
    teamSize: 5,
    consultantHours: 20
  });

  // ROI Calculations
  const monthlyPMCost = (roiInputs.currentPMSalary / 12) * (roiInputs.timeSpentOnBusywork / 100);
  const consultantCost = roiInputs.consultantHours * 300;
  const totalMonthlySavings = monthlyPMCost + consultantCost;
  const pm33Cost = 79; // Team tier (most popular - 25% of customer base)
  const netSavings = totalMonthlySavings - pm33Cost;
  const roiPercentage = ((netSavings / pm33Cost) * 100).toFixed(0);

  const handleTrialClick = (tier: string) => {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('pricing_cta_clicked', {
        tier: tier,
        pricing_page: 'conversion_optimized',
        is_annual: isAnnual
      });
    }
  };

  return (
    <div>
        <Box style={{ backgroundColor: 'var(--pm33-bg-primary)', minHeight: '100vh' }}>
          
          {/* Hero Section with Value Proposition */}
          <Box py={80} style={{ background: 'linear-gradient(135deg, var(--marketing-bg-secondary) 0%, var(--marketing-bg-primary) 100%)' }}>
            <Container size="xl">
              <Stack align="center" gap={32} mb={48}>
                <Badge size="xl" variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                  💰 Save $45,000+ annually vs hiring consultants
                </Badge>
                
                <Stack align="center" gap={16}>
                  <Title order={1} size="h1" ta="center" maw={800} lh={1.1}>
                    Transform Your PM Team Into a{' '}
                    <Text span variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                      Strategic Powerhouse
                    </Text>
                  </Title>
                  <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6}>
                    Join 2,500+ Product Managers using PM33 to focus on strategy, not busywork. 
                    <Text span fw={600} c="indigo.6"> 78% faster feature delivery guaranteed.</Text>
                  </Text>
                </Stack>

                {/* ROI Calculator Preview */}
                <Card shadow="xl" radius="xl" p={32} maw={500} style={{ border: '2px solid var(--marketing-primary)' }}>
                  <Group mb={16}>
                    <ThemeIcon size={32} variant="gradient" gradient={{ from: 'green', to: 'teal' }}>
                      <IconCalculator size={18} />
                    </ThemeIcon>
                    <Text fw={700} size="lg">Your Potential Savings</Text>
                  </Group>
                  <SimpleGrid cols={2} spacing={16}>
                    <div>
                      <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Monthly Savings</Text>
                      <Text size="xl" fw={900} c="green.6">${totalMonthlySavings.toLocaleString()}</Text>
                    </div>
                    <div>
                      <Text size="xs" c="dimmed" tt="uppercase" fw={600}>ROI</Text>
                      <Text size="xl" fw={900} c="green.6">{roiPercentage}%</Text>
                    </div>
                  </SimpleGrid>
                  <Progress value={Math.min(100, parseInt(roiPercentage) / 10)} color="green" size="sm" mt={12} />
                  <Text size="sm" c="dimmed" ta="center" mt={8}>
                    Based on average PM salary and consulting costs
                  </Text>
                </Card>
              </Stack>
            </Container>
          </Box>

          {/* Pricing Toggle */}
          <Container size="xl" py={48}>
            <Center mb={48}>
              <Card shadow="md" radius="xl" p={24}>
                <Group gap={24}>
                  <Text fw={600}>Monthly</Text>
                  <Switch
                    size="lg"
                    checked={isAnnual}
                    onChange={(event) => setIsAnnual(event.currentTarget.checked)}
                    color="green"
                  />
                  <Stack gap={4}>
                    <Text fw={600}>Annual</Text>
                    <Badge size="sm" color="green" variant="filled">Save 25%</Badge>
                  </Stack>
                </Group>
              </Card>
            </Center>

            {/* Pricing Tiers */}
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={24}>
              
              {/* Starter Tier */}
              <Card shadow="md" radius="xl" p={32} h="fit-content">
                <Stack gap={24}>
                  <div>
                    <Title order={3} size="h3" mb={8}>Starter</Title>
                    <Group align="baseline" gap={8}>
                      <Text size="32px" fw={900} c="dark">
                        ${isAnnual ? '22' : '29'}
                      </Text>
                      <Text size="sm" c="dimmed">/month</Text>
                    </Group>
                    {isAnnual && (
                      <Text size="xs" c="green.6" fw={600}>
                        $264 billed annually (save $84)
                      </Text>
                    )}
                    <Text size="sm" c="dimmed" mt={8}>
                      Perfect for individual PMs getting started
                    </Text>
                  </div>

                  <List spacing={8} size="sm" icon={<ThemeIcon size={20} radius="xl" color="green"><IconCheck size={12} /></ThemeIcon>}>
                    <List.Item>Strategic Intelligence Engine</List.Item>
                    <List.Item>Up to 100 AI analysis requests/month</List.Item>
                    <List.Item>Basic integrations (Jira, Linear)</List.Item>
                    <List.Item>Email support</List.Item>
                    <List.Item>Mobile app access</List.Item>
                  </List>

                  <ABTestCTA
                    test="pricing"
                    component={Link}
                    href="/trial?tier=starter"
                    onClick={() => handleTrialClick('starter')}
                    fullWidth
                    rightSection={<IconArrowRight size={16} />}
                    pageContext="pricing_page_starter"
                  />
                </Stack>
              </Card>

              {/* Enterprise Tier - FEATURED */}
              <Card 
                shadow="xl" 
                radius="xl" 
                p={32} 
                h="fit-content"
                style={{ 
                  border: '3px solid var(--marketing-primary)',
                  transform: 'scale(1.05)',
                  position: 'relative'
                }}
              >
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'orange', to: 'red' }}
                  style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)' }}
                >
                  🔥 Most Popular
                </Badge>

                <Stack gap={24} pt={16}>
                  <div>
                    <Title order={3} size="h3" mb={8} c="indigo.7">Team</Title>
                    <Group align="baseline" gap={8}>
                      <Text size="40px" fw={900} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                        ${isAnnual ? '59' : '79'}
                      </Text>
                      <Text size="sm" c="dimmed">/month</Text>
                    </Group>
                    {isAnnual && (
                      <Text size="xs" c="green.6" fw={600}>
                        $708 billed annually (save $240)
                      </Text>
                    )}
                    <Text size="sm" c="indigo.6" mt={8} fw={600}>
                      🎯 Most Popular - 1,043 customers = $82.4K MRR
                    </Text>
                  </div>

                  <List spacing={8} size="sm" icon={<ThemeIcon size={20} radius="xl" variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}><IconCheck size={12} /></ThemeIcon>}>
                    <List.Item>Everything in Starter</List.Item>
                    <List.Item><Text span fw={600}>Advanced AI strategic advisor with all workflows</Text></List.Item>
                    <List.Item><Text span fw={600}>Unlimited integrations (PM tools + analytics)</Text></List.Item>
                    <List.Item>Multi-framework analysis + competitive intelligence</List.Item>
                    <List.Item>Team collaboration features</List.Item>
                    <List.Item>Priority support</List.Item>
                    <List.Item>Strategic roadmap intelligence</List.Item>
                    <List.Item>Resource allocation optimizer</List.Item>
                    <List.Item>Execution bridge to Jira/Linear</List.Item>
                  </List>

                  <Card bg="indigo.0" p={16} radius="lg">
                    <Group gap={12} mb={8}>
                      <ThemeIcon size={20} variant="light" color="indigo">
                        <IconTrendingUp size={12} />
                      </ThemeIcon>
                      <Text size="sm" fw={600} c="indigo.7">Value Guarantee</Text>
                    </Group>
                    <Text size="xs" c="indigo.6">
                      Save $45,000+ annually vs hiring strategic consultants
                    </Text>
                  </Card>

                  <ABTestCTA
                    test="pricing"
                    component={Link}
                    href="/trial?tier=team"
                    onClick={() => handleTrialClick('team')}
                    fullWidth
                    rightSection={<IconArrowRight size={16} />}
                    pageContext="pricing_page_team"
                  />
                </Stack>
              </Card>

              {/* Strategic Tier */}
              <Card shadow="md" radius="xl" p={32} h="fit-content">
                <Stack gap={24}>
                  <div>
                    <Title order={3} size="h3" mb={8}>Scale</Title>
                    <Group align="baseline" gap={8}>
                      <Text size="32px" fw={900} c="dark">
                        ${isAnnual ? '149' : '199'}
                      </Text>
                      <Text size="sm" c="dimmed">/month</Text>
                    </Group>
                    {isAnnual && (
                      <Text size="xs" c="green.6" fw={600}>
                        $1,788 billed annually (save $600)
                      </Text>
                    )}
                    <Text size="sm" c="dimmed" mt={8}>
                      Advanced PM teams and growing companies
                    </Text>
                  </div>

                  <List spacing={8} size="sm" icon={<ThemeIcon size={20} radius="xl" color="orange"><IconStar size={12} /></ThemeIcon>}>
                    <List.Item>Everything in Team</List.Item>
                    <List.Item><Text span fw={600}>Custom AI model training on company data</Text></List.Item>
                    <List.Item>Advanced predictive analytics and what-if scenarios</List.Item>
                    <List.Item>Dedicated customer success manager</List.Item>
                    <List.Item>White-glove onboarding + API access</List.Item>
                    <List.Item>Custom strategic frameworks</List.Item>
                    <List.Item>Enterprise security & compliance</List.Item>
                  </List>

                  <ABTestCTA
                    test="pricing"
                    component={Link}
                    href="/trial?tier=scale"
                    onClick={() => handleTrialClick('scale')}
                    fullWidth
                    rightSection={<IconArrowRight size={16} />}
                    color="orange"
                    variant="outline"
                    pageContext="pricing_page_scale"
                  />
                </Stack>
              </Card>

              {/* Enterprise Tier */}
              <Card shadow="lg" radius="xl" p={32} h="fit-content" style={{ border: '2px solid #dc2626' }}>
                <Stack gap={24}>
                  <div>
                    <Badge size="md" color="red" variant="filled" mb={8}>
                      🏢 Enterprise
                    </Badge>
                    <Title order={3} size="h3" mb={8} c="red.7">Enterprise</Title>
                    <Group align="baseline" gap={8}>
                      <Text size="32px" fw={900} c="red.7">
                        ${isAnnual ? '449' : '599'}
                      </Text>
                      <Text size="sm" c="dimmed">/month</Text>
                    </Group>
                    {isAnnual && (
                      <Text size="xs" c="green.6" fw={600}>
                        $5,388 billed annually (save $1,800)
                      </Text>
                    )}
                    <Text size="sm" c="dimmed" mt={8}>
                      Large enterprises and PMO organizations
                    </Text>
                  </div>

                  <List spacing={8} size="sm" icon={<ThemeIcon size={20} radius="xl" color="red"><IconCheck size={12} /></ThemeIcon>}>
                    <List.Item>Everything in Scale</List.Item>
                    <List.Item><Text span fw={600}>Unlimited users and projects</Text></List.Item>
                    <List.Item><Text span fw={600}>Enterprise security & compliance</Text></List.Item>
                    <List.Item>Dedicated customer success manager</List.Item>
                    <List.Item>White-glove onboarding & training</List.Item>
                    <List.Item>Custom integrations & API access</List.Item>
                    <List.Item>24/7 priority support</List.Item>
                  </List>

                  <ABTestCTA
                    test="pricing"
                    component={Link}
                    href="/trial?tier=enterprise"
                    onClick={() => handleTrialClick('enterprise')}
                    fullWidth
                    rightSection={<IconArrowRight size={16} />}
                    color="red"
                    variant="filled"
                    pageContext="pricing_page_enterprise"
                  />
                </Stack>
              </Card>
            </SimpleGrid>

            {/* Trust Indicators */}
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32} mt={64}>
              <Card shadow="sm" radius="lg" p={24} ta="center">
                <ThemeIcon size={40} mx="auto" mb={16} variant="light" color="green">
                  <IconShield size={20} />
                </ThemeIcon>
                <Text fw={600} mb={8}>14-Day Free Trial</Text>
                <Text size="sm" c="dimmed">No credit card required</Text>
              </Card>
              
              <Card shadow="sm" radius="lg" p={24} ta="center">
                <ThemeIcon size={40} mx="auto" mb={16} variant="light" color="blue">
                  <IconClock size={20} />
                </ThemeIcon>
                <Text fw={600} mb={8}>5-Minute Setup</Text>
                <Text size="sm" c="dimmed">Start getting value immediately</Text>
              </Card>
              
              <Card shadow="sm" radius="lg" p={24} ta="center">
                <ThemeIcon size={40} mx="auto" mb={16} variant="light" color="orange">
                  <IconUsers size={20} />
                </ThemeIcon>
                <Text fw={600} mb={8}>Cancel Anytime</Text>
                <Text size="sm" c="dimmed">No long-term commitments</Text>
              </Card>
            </SimpleGrid>

            {/* ROI Calculator Section */}
            <Card shadow="xl" radius="xl" p={48} mt={64} style={{ background: 'linear-gradient(135deg, var(--marketing-bg-secondary) 0%, var(--marketing-bg-primary) 100%)' }}>
              <Stack align="center" gap={32}>
                <Group gap={16}>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'green', to: 'teal' }}>
                    <IconCalculator size={24} />
                  </ThemeIcon>
                  <Title order={2} size="h2">Calculate Your ROI</Title>
                </Group>

                <Text size="lg" ta="center" maw={600} c="dimmed">
                  See exactly how much PM33 can save your team by replacing expensive consultants and eliminating busywork.
                </Text>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing={48} w="100%" maw={900}>
                  <Stack gap={24}>
                    <Title order={3} size="h4">Your Current Costs</Title>
                    
                    <div>
                      <Text size="sm" fw={600} mb={8}>PM Salary (annual)</Text>
                      <Text size="xl" fw={700}>${roiInputs.currentPMSalary.toLocaleString()}</Text>
                      <Text size="xs" c="dimmed">Time lost to busywork: {roiInputs.timeSpentOnBusywork}%</Text>
                    </div>

                    <div>
                      <Text size="sm" fw={600} mb={8}>Strategic Consultant Hours/Month</Text>
                      <Text size="xl" fw={700}>{roiInputs.consultantHours} hours</Text>
                      <Text size="xs" c="dimmed">At $300/hour = ${consultantCost.toLocaleString()}/month</Text>
                    </div>

                    <Divider />

                    <div>
                      <Text size="sm" fw={600} mb={8} c="red.6">Total Monthly Waste</Text>
                      <Text size="xl" fw={900} c="red.6">${totalMonthlySavings.toLocaleString()}</Text>
                    </div>
                  </Stack>

                  <Stack gap={24}>
                    <Title order={3} size="h4">With PM33 Enterprise</Title>
                    
                    <div>
                      <Text size="sm" fw={600} mb={8}>PM33 Enterprise Cost</Text>
                      <Text size="xl" fw={700}>$99/month</Text>
                      <Text size="xs" c="dimmed">All AI teams included</Text>
                    </div>

                    <div>
                      <Text size="sm" fw={600} mb={8} c="green.6">Monthly Savings</Text>
                      <Text size="xl" fw={900} c="green.6">${netSavings.toLocaleString()}</Text>
                      <Text size="xs" c="green.6">ROI: {roiPercentage}%</Text>
                    </div>

                    <div>
                      <Text size="sm" fw={600} mb={8} c="green.6">Annual Savings</Text>
                      <Text size="xl" fw={900} c="green.6">${(netSavings * 12).toLocaleString()}</Text>
                    </div>

                    <Card bg="green.0" p={16} radius="lg">
                      <Text size="sm" fw={600} c="green.7" mb={4}>Productivity Gains</Text>
                      <Text size="xs" c="green.6">
                        • 78% faster feature delivery<br />
                        • 65% reduction in admin work<br />
                        • $2.3M+ revenue impact potential
                      </Text>
                    </Card>
                  </Stack>
                </SimpleGrid>

                <ABTestCTA
                  test="pricing"
                  component={Link}
                  href="/trial?tier=enterprise&roi-calculated=true"
                  rightSection={<IconTrendingUp size={20} />}
                  onClick={() => handleTrialClick('enterprise-roi')}
                  pageContext="pricing_page_roi_calculator"
                />
              </Stack>
            </Card>

            {/* Social Proof Metrics */}
            <SocialProofMetrics
              segment="all"
              showTrustSignals={true}
              animated={true}
              maxColumns={3}
              className="mt-64"
              pageContext="pricing_page"
            />

            {/* Customer Testimonials */}
            <TestimonialShowcase
              format="grid"
              maxItems={3}
              showMetrics={true}
              autoRotate={false}
              className="mt-64"
              pageContext="pricing_page"
            />

            {/* Final CTA */}
            <Card 
              shadow="xl" 
              radius="xl" 
              p={48} 
              mt={64} 
              style={{ 
                background: 'var(--marketing-primary)', 
                color: 'var(--gradient-text)', 
                textAlign: 'center' 
              }}
            >
              <Stack align="center" gap={24}>
                <Badge 
                  size="lg" 
                  style={{ 
                    backgroundColor: 'var(--badge-bg-primary)',
                    color: 'var(--gradient-text)' 
                  }} 
                  variant="light"
                >
                  ⚡ Limited Time: Join 2,500+ Product Managers
                </Badge>
                
                <Title order={2} size="h2" style={{ color: 'var(--gradient-text)' }}>
                  Ready to Transform Your PM Work?
                </Title>
                
                <Text 
                  size="lg" 
                  maw={600}
                  style={{ color: 'var(--gradient-text)', opacity: 0.9 }}
                >
                  Start your free trial today. No credit card required. Cancel anytime. 
                  See results in your first week.
                </Text>

                <Group gap={24}>
                  <ABTestCTA
                    test="pricing"
                    component={Link}
                    href="/trial?tier=enterprise&final-cta=true"
                    rightSection={<IconArrowRight size={20} />}
                    onClick={() => handleTrialClick('enterprise-final')}
                    style={{ fontWeight: 700 }}
                    pageContext="pricing_page_final_cta"
                  />
                  
                  <Button 
                    component={Link}
                    href="/strategic-intelligence-demo"
                    size="xl"
                    variant="outline"
                    style={{ 
                      borderColor: 'var(--gradient-text)', 
                      color: 'var(--gradient-text)',
                      opacity: 0.8
                    }}
                    leftSection={<IconBolt size={20} />}
                  >
                    Try Live Demo
                  </Button>
                </Group>
              </Stack>
            </Card>
          </Container>
        </Box>
    </div>
  );
}