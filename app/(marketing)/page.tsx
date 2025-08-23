'use client';

import { Container, Title, Text, Button, Card, Group, List, Stack, Badge, Grid, Divider } from '@mantine/core';
import { IconRocket, IconBrain, IconTarget, IconShield, IconClock, IconTrendingUp, IconUsers, IconChartLine } from '@tabler/icons-react';
import Link from 'next/link';
// import CompanyCarousel from '../../components/shared/CompanyCarousel';
// import { trackCAC } from '../../lib/posthog'; // Temporarily disabled for compatibility

/**
 * Component: PM33 Homepage - Optimized for Maximum Conversion
 * Design Reference: PM33 Sales Playbook integration with Marketing Design System
 * Sales Strategy: Hook > Problem > Solution > Demo > ROI > Risk Reversal > CTA
 * 
 * Optimization Focus:
 * - [ ] Sales Playbook messaging integration
 * - [ ] Multi-audience value propositions
 * - [ ] Strategic transformation positioning
 * - [ ] Demo funnel integration
 * - [ ] Conversion rate optimization
 */

export default function OptimizedHomepage() {
  return (
    <Container size={1400} px={24} py={40}>
      <div className="marketing-context">
        
        {/* HERO SECTION: Sales Playbook Hook */}
        <Card shadow="xl" padding={64} radius={20} mb={60} 
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textAlign: 'center'
              }}>
          <Title order={1} size="64px" fw={900} mb={32}>
            Transform from Reactive Product Manager to Strategic PMO Leader in 30 Days
          </Title>
          
          <Text size="xl" mb={40} maw={800} mx="auto">
            PM33: Your AI Strategy Copilot - Think McKinsey + PM mentor + Data scientist in one platform
          </Text>
          
          <Group justify="center" gap={32} mt={48}>
            <Button 
              component={Link}
              href="/trial"
              size="xl"
              radius="xl"
              style={{ 
                backgroundColor: 'var(--marketing-cta)',
                fontSize: '20px',
                padding: '20px 48px',
                height: 'auto'
              }}
              leftSection={<IconRocket size={24} />}
              onClick={() => {
                // Track trial signup initiation for $100K MRR funnel
                console.log('Trial signup started from homepage hero');
              }}
            >
              Start Free 14-Day Trial
            </Button>
            
            <Button 
              component={Link}
              href="/trial"
              size="xl"
              variant="outline"
              radius="xl"
              style={{ 
                borderColor: 'rgba(255, 255, 255, 0.8)',
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                fontSize: '18px',
                padding: '18px 40px',
                height: 'auto'
              }}
              leftSection={<IconBrain size={20} />}
              onClick={() => {
                // Track demo interest for conversion analysis
                console.log('Demo interest from homepage');
              }}
            >
              See Live Demo
            </Button>
          </Group>
          
          <Text size="sm" mt={24} opacity={0.9}>
            No credit card required • 2-minute setup • Instant strategic value
          </Text>
        </Card>

        {/* PROBLEM AGITATION: Weekly PM Pain Points */}
        <Card shadow="md" padding={48} radius={16} mb={60}>
          <Title order={2} size="48px" fw={700} mb={32} ta="center">
            Are You Stuck in the Tactical Trap?
          </Title>
          
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="lg">
                <Group>
                  <IconClock color="var(--marketing-cta)" size={32} />
                  <Text size="lg">16+ hours/week on "strategic" analysis that competitors ignore</Text>
                </Group>
                <Group>
                  <IconUsers color="var(--marketing-cta)" size={32} />
                  <Text size="lg">Arguing about resource allocation with gut feelings, not data</Text>
                </Group>
                <Group>
                  <IconChartLine color="var(--marketing-cta)" size={32} />
                  <Text size="lg">Building roadmaps that competitors outmaneuver in weeks</Text>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card padding="xl" style={{ backgroundColor: 'var(--marketing-cta)', color: 'white' }}>
                <Title order={3} mb={16}>The Strategic Reality:</Title>
                <Text size="lg" mb={16}>
                  While you spend 40% of your time on analysis, your competitors are using AI to make strategic decisions in minutes.
                </Text>
                <Badge size="xl" variant="white" color="orange">
                  You're fighting 2025 battles with 1990s tools
                </Badge>
              </Card>
            </Grid.Col>
          </Grid>
        </Card>

        {/* SOLUTION: PM33 AI Strategy Copilot */}
        <Card shadow="md" padding={48} radius={16} mb={60}>
          <Title order={2} size="48px" fw={700} mb={32} ta="center">
            PM33: Your AI Strategy Copilot - Think McKinsey + PM mentor + Data scientist in one platform
          </Title>
          
          <Text size="xl" ta="center" mb={48} maw={1000} mx="auto">
            4 specialized AI teams working together to transform you from reactive Product Manager 
            into strategic PMO leader with McKinsey-level analysis capabilities.
          </Text>
          
          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card padding="lg" shadow="sm" h="100%">
                <IconBrain size={48} color="var(--marketing-primary)" />
                <Title order={4} mt="sm">Strategic Intelligence AI</Title>
                <Text size="sm" c="dimmed">
                  Multi-framework analysis (ICE, RICE, Porter's Five Forces) with competitive intelligence
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card padding="lg" shadow="sm" h="100%">
                <IconTarget size={48} color="var(--marketing-primary)" />
                <Title order={4} mt="sm">Workflow Execution AI</Title>
                <Text size="sm" c="dimmed">
                  Automated task creation and cross-functional coordination with PM tool integration
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card padding="lg" shadow="sm" h="100%">
                <IconChartLine size={48} color="var(--marketing-primary)" />
                <Title order={4} mt="sm">Data Intelligence AI</Title>
                <Text size="sm" c="dimmed">
                  Company-specific learning and predictive analytics with performance optimization
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card padding="lg" shadow="sm" h="100%">
                <IconUsers size={48} color="var(--marketing-primary)" />
                <Title order={4} mt="sm">Communication AI</Title>
                <Text size="sm" c="dimmed">
                  Stakeholder communication and executive summaries with alignment facilitation
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Card>

        {/* ROI JUSTIFICATION */}
        <Card shadow="md" padding={48} radius={16} mb={60} 
              style={{ backgroundColor: 'var(--marketing-success)', color: 'white' }}>
          <Title order={2} size="48px" fw={700} mb={32} ta="center">
            The ROI Math is Simple
          </Title>
          
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack align="center">
                <IconClock size={64} />
                <Text size="lg" fw={600}>Current Reality</Text>
                <Text ta="center">16 hours/week on strategic analysis = 64 hours/month</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack align="center">
                <IconTrendingUp size={64} />
                <Text size="lg" fw={600}>With PM33</Text>
                <Text ta="center">Reduced to 4 hours/month = 60 hours saved</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack align="center">
                <IconShield size={64} />
                <Text size="lg" fw={600}>Value Created</Text>
                <Text ta="center">At $100/hour PM value = $6,000 monthly value</Text>
              </Stack>
            </Grid.Col>
          </Grid>
          
          <Divider my="xl" />
          
          <Text size="48px" ta="center" fw={900} mb={16}>
            PM33 costs $29/month → 207x return on investment
          </Text>
          
          <Text size="xl" ta="center">
            Plus: 85% decision confidence vs 60% • Respond in hours, not weeks
          </Text>
        </Card>

        {/* RISK REVERSAL */}
        <Card shadow="md" padding={48} radius={16} mb={60} 
              style={{ borderLeft: '8px solid var(--marketing-success)' }}>
          <Title order={2} size="42px" fw={700} mb={32} ta="center">
            30-Day Transformation Guarantee
          </Title>
          
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <List spacing="md" size="lg">
                <List.Item icon={<IconShield color="var(--marketing-success)" />}>
                  <Text>No credit card required for 14-day full access</Text>
                </List.Item>
                <List.Item icon={<IconShield color="var(--marketing-success)" />}>
                  <Text>Keep all generated strategic documents even if you cancel</Text>
                </List.Item>
                <List.Item icon={<IconShield color="var(--marketing-success)" />}>
                  <Text>Free migration assistance from current tools</Text>
                </List.Item>
              </List>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <List spacing="md" size="lg">
                <List.Item icon={<IconShield color="var(--marketing-success)" />}>
                  <Text>30-day money-back guarantee after purchase</Text>
                </List.Item>
                <List.Item icon={<IconShield color="var(--marketing-success)" />}>
                  <Text>Grandfather pricing: Lock in launch rates forever</Text>
                </List.Item>
                <List.Item icon={<IconShield color="var(--marketing-success)" />}>
                  <Text>Dedicated PMO transformation consultant included</Text>
                </List.Item>
              </List>
            </Grid.Col>
          </Grid>
        </Card>

        {/* FINAL CTA */}
        <Card shadow="xl" padding={64} radius={20} 
              style={{ 
                background: 'linear-gradient(135deg, #EA580C 0%, #DC2626 100%)',
                color: 'white',
                textAlign: 'center'
              }}>
          <Title order={2} size="42px" fw={700} mb={32}>
            Every day without strategic intelligence is a day your competitors pull ahead
          </Title>
          
          <Text size="xl" mb={48} maw={800} mx="auto">
            Every day without strategic intelligence is market position you'll never recover. 
            Start your PMO transformation today.
          </Text>
          
          <Group justify="center" gap={32}>
            <Button 
              component={Link}
              href="/trial"
              size="xl"
              variant="white"
              radius="xl"
              style={{ 
                fontSize: '22px', 
                padding: '20px 56px',
                height: 'auto',
                color: 'var(--marketing-cta)'
              }}
              onClick={() => {
                // Track final CTA conversion for urgency messaging effectiveness
                console.log('Final CTA conversion from homepage');
              }}
            >
              Transform Now - Free Trial
            </Button>
          </Group>
          
          <Text size="lg" mt={24} opacity={0.9}>
            No credit card required • 2-minute setup • Instant PMO capabilities
          </Text>
        </Card>

        {/* Companies We Work With Section - Temporarily disabled for debugging */}
        {/* <CompanyCarousel 
          title="Companies We Work With"
          subtitle="Trusted by leading product teams who've transformed from reactive PMs to strategic PMO leaders"
        /> */}
        
        {/* Sales Playbook Integration Tracking */}
        {/* Generated by PM33 Non-Landing Optimization System */}
        {/* Sales strategy: Complete Sales Playbook integration */}
        {/* Optimized: 2025-08-21 */}
        
      </div>
    </Container>
  );
}