'use client';

import React, { useState } from 'react';
import { Container, Card, Title, Text, Button, Stack, Box, Badge, Group, SimpleGrid, Switch, Divider, List, ThemeIcon, Center, Progress, Slider, NumberInput } from '@mantine/core';
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
          {/* Pricing Toggle */}
          <Container size="xl" py={64}>
            <Center mb={64}>
              <Card 
                shadow="xl" 
                radius="xl" 
                p={40} 
                style={{ 
                  border: '3px solid var(--mantine-color-indigo-2)',
                  backgroundColor: 'var(--color-bg-primary)',
                  color: 'var(--color-text-primary)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                }}
              >
                <Group gap={40} justify="center" align="center">
                  <Text 
                    fw={700} 
                    style={{ 
                      color: !isAnnual ? 'var(--mantine-color-indigo-7)' : 'var(--mantine-color-gray-7)',
                      fontSize: '20px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Monthly
                  </Text>
                  <Switch
                    size="xl"
                    checked={isAnnual}
                    onChange={(event) => setIsAnnual(event.currentTarget.checked)}
                    color="indigo"
                    thumbIcon={
                      isAnnual ? (
                        <IconCheck size={12} color="white" stroke={3} />
                      ) : null
                    }
                    styles={{
                      root: {
                        cursor: 'pointer'
                      },
                      input: {
                        cursor: 'pointer'
                      },
                      track: {
                        border: '3px solid var(--mantine-color-indigo-3)',
                        backgroundColor: isAnnual ? 'var(--mantine-color-indigo-6)' : 'var(--mantine-color-gray-4)',
                        minWidth: '70px',
                        height: '36px',
                        cursor: 'pointer'
                      },
                      thumb: {
                        border: '3px solid var(--mantine-color-indigo-7)',
                        width: '28px',
                        height: '28px',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      },
                      body: {
                        alignItems: 'center'
                      }
                    }}
                  />
                  <Stack gap={8} align="center">
                    <Text 
                      fw={700}
                      style={{ 
                        color: isAnnual ? 'var(--mantine-color-indigo-7)' : 'var(--mantine-color-gray-7)',
                        fontSize: '20px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Annual
                    </Text>
                    <Badge 
                      size="lg" 
                      color="green" 
                      variant="filled"
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      💰 Save 25%
                    </Badge>
                  </Stack>
                </Group>
              </Card>
            </Center>

            {/* Pricing Tiers */}
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={32} mt={32}>
              
              {/* Starter Tier */}
              <Card shadow="md" radius="xl" p={32} h="fit-content">
                <Stack gap={24}>
                  <div>
                    <Title order={3} size="h3" mb={8}>Starter</Title>
                    <Group align="baseline" gap={8}>
                      <Text size="32px" fw={900} style={{ color: 'var(--mantine-color-gray-9)' }}>
                        ${isAnnual ? '22' : '29'}
                      </Text>
                      <Text size="sm" style={{ color: 'var(--mantine-color-gray-7)' }}>/month</Text>
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

              {/* Team Tier - FEATURED */}
              <Card 
                shadow="xl" 
                radius="xl" 
                p={32} 
                h="fit-content"
                style={{ 
                  border: '3px solid var(--mantine-color-indigo-5)',
                  transform: 'scale(1.05)',
                  position: 'relative',
                  background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                  overflow: 'visible'
                }}
              >
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'indigo', to: 'purple' }}
                  style={{ 
                    position: 'absolute', 
                    top: -18, 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    fontSize: '14px',
                    fontWeight: 700,
                    height: '36px',
                    padding: '8px 24px',
                    minWidth: '150px',
                    width: 'auto',
                    maxWidth: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                    border: '2px solid var(--color-bg-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'visible'
                  }}
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
                    <Text size="sm" c="indigo.4" mt={8} fw={600}>
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
                    <Text size="xs" c="indigo.4">
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
                      <Text size="32px" fw={900} style={{ color: 'var(--mantine-color-gray-9)' }}>
                        ${isAnnual ? '149' : '199'}
                      </Text>
                      <Text size="sm" style={{ color: 'var(--mantine-color-gray-7)' }}>/month</Text>
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
              <Card shadow="lg" radius="xl" p={32} h="fit-content">
                <Stack gap={24}>
                  <div>
                    <Badge size="md" color="indigo" variant="light" mb={8}>
                      🏢 Enterprise
                    </Badge>
                    <Title order={3} size="h3" mb={8} style={{ color: 'var(--mantine-color-gray-8)' }}>Enterprise</Title>
                    <Group align="baseline" gap={8}>
                      <Text size="32px" fw={900} style={{ color: 'var(--mantine-color-indigo-6)' }}>
                        Custom
                      </Text>
                      <Text size="sm" style={{ color: 'var(--mantine-color-gray-6)' }}>pricing</Text>
                    </Group>
                    <Text size="sm" style={{ color: 'var(--mantine-color-gray-6)' }} mt={8}>
                      Tailored for large enterprises and PMO organizations
                    </Text>
                  </div>

                  <List spacing={8} size="sm" icon={<ThemeIcon size={20} radius="xl" color="indigo"><IconCheck size={12} /></ThemeIcon>}>
                    <List.Item>Everything in Scale</List.Item>
                    <List.Item><Text span fw={600}>Unlimited users and projects</Text></List.Item>
                    <List.Item><Text span fw={600}>Enterprise security & compliance</Text></List.Item>
                    <List.Item>Dedicated customer success manager</List.Item>
                    <List.Item>White-glove onboarding & training</List.Item>
                    <List.Item>Custom integrations & API access</List.Item>
                    <List.Item>24/7 priority support</List.Item>
                  </List>

                  <Button
                    component={Link}
                    href="/contact?inquiry=enterprise"
                    onClick={() => handleTrialClick('enterprise-contact')}
                    fullWidth
                    size="lg"
                    rightSection={<IconArrowRight size={16} />}
                    color="indigo"
                    variant="filled"
                  >
                    Contact Sales
                  </Button>
                </Stack>
              </Card>
            </SimpleGrid>

            {/* Trust Indicators */}
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32} mt={80}>
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
            <Card shadow="xl" radius="xl" p={48} mt={80} style={{ background: 'linear-gradient(135deg, var(--marketing-bg-secondary) 0%, var(--marketing-bg-primary) 100%)' }}>
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
                      <Text size="sm" fw={600} mb={8}>Annual PM Salary: ${roiInputs.currentPMSalary.toLocaleString()}</Text>
                      <Slider
                        value={roiInputs.currentPMSalary}
                        onChange={(value) => setRoiInputs({...roiInputs, currentPMSalary: value})}
                        min={60000}
                        max={250000}
                        step={10000}
                        marks={[
                          { value: 60000, label: '$60K' },
                          { value: 120000, label: '$120K' },
                          { value: 180000, label: '$180K' },
                          { value: 250000, label: '$250K' }
                        ]}
                        color="indigo"
                        mb={24}
                        style={{ paddingBottom: '8px' }}
                      />
                      <Text size="xs" c="dimmed" mt={8}>Monthly salary cost: ${Math.round(roiInputs.currentPMSalary/12).toLocaleString()}</Text>
                    </div>

                    <div>
                      <Text size="sm" fw={600} mb={8}>Time spent on busywork: {roiInputs.timeSpentOnBusywork}%</Text>
                      <Slider
                        value={roiInputs.timeSpentOnBusywork}
                        onChange={(value) => setRoiInputs({...roiInputs, timeSpentOnBusywork: value})}
                        min={20}
                        max={80}
                        step={5}
                        marks={[
                          { value: 20, label: '20%' },
                          { value: 40, label: '40%' },
                          { value: 60, label: '60%' },
                          { value: 80, label: '80%' }
                        ]}
                        color="orange"
                        mb={24}
                        style={{ paddingBottom: '8px' }}
                      />
                      <Text size="xs" c="dimmed" mt={8}>Monthly waste: ${Math.round(monthlyPMCost).toLocaleString()}</Text>
                    </div>

                    <div>
                      <Text size="sm" fw={600} mb={8}>Consultant hours per month: {roiInputs.consultantHours}</Text>
                      <Slider
                        value={roiInputs.consultantHours}
                        onChange={(value) => setRoiInputs({...roiInputs, consultantHours: value})}
                        min={0}
                        max={50}
                        step={5}
                        marks={[
                          { value: 0, label: '0' },
                          { value: 20, label: '20' },
                          { value: 40, label: '40' },
                          { value: 50, label: '50+' }
                        ]}
                        color="green"
                        mb={24}
                        style={{ paddingBottom: '8px' }}
                      />
                      <Text size="xs" c="dimmed" mt={8}>At $300/hour = ${consultantCost.toLocaleString()}/month</Text>
                    </div>

                    <Divider />

                    <div>
                      <Text size="sm" fw={600} mb={8} c="orange.6">Total Monthly Opportunity</Text>
                      <Text size="xl" fw={900} c="orange.6">${totalMonthlySavings.toLocaleString()}</Text>
                    </div>
                  </Stack>

                  <Stack gap={24}>
                    <Title order={3} size="h4">With PM33 Team Plan</Title>
                    
                    <div>
                      <Text size="sm" fw={600} mb={8}>PM33 Team Cost</Text>
                      <Text size="xl" fw={700}>$79/month</Text>
                      <Text size="xs" c="dimmed">Strategic AI teams included</Text>
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
            <Box mt={80}>
              <SocialProofMetrics
                segment="all"
                showTrustSignals={true}
                animated={true}
                maxColumns={3}
                pageContext="pricing_page"
              />
            </Box>

            {/* Customer Testimonials */}
            <Box mt={80}>
              <TestimonialShowcase
                format="grid"
                maxItems={3}
                showMetrics={true}
                autoRotate={false}
                pageContext="pricing_page"
              />
            </Box>

            {/* Final CTA */}
            <Card 
              shadow="xl" 
              radius="xl" 
              p={48} 
              mt={80} 
              style={{ 
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
                textAlign: 'center' 
              }}
            >
              <Stack align="center" gap={24}>
                <Badge 
                  size="lg" 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white' 
                  }} 
                  variant="light"
                >
                  ⚡ Limited Time: Join 2,500+ Product Managers
                </Badge>
                
                <Title order={2} size="h2" style={{ color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  Ready to Transform Your PM Work?
                </Title>
                
                <Text 
                  size="lg" 
                  maw={600}
                  style={{ color: '#e2e8f0', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
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
                      borderColor: '#e2e8f0', 
                      color: '#e2e8f0',
                      backgroundColor: 'rgba(226, 232, 240, 0.1)'
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