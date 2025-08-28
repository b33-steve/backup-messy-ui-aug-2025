'use client';

import React from 'react';
import { Container, Card, Title, Text, Button, Stack, Badge, SimpleGrid, Box, Group, ThemeIcon, List } from '@mantine/core';
import { IconArrowRight, IconBolt, IconTarget, IconTrendingUp, IconCheck, IconRocket, IconBrain } from '@tabler/icons-react';
import Link from 'next/link';
import Navigation from '../../../components/marketing/IsolatedMarketingNavigation';
import Footer from '../../../components/marketing/IsolatedMarketingFooter';
import TestimonialShowcase from '../../../components/marketing/TestimonialShowcase';
import SocialProofMetrics from '../../../components/marketing/SocialProofMetrics';
import { analytics } from '../../../lib/analytics';

/**
 * Component: SeniorPMScaleUpLandingPage
 * Target ICP: Senior Product Manager at Scale-Up Companies (Series A-C, 50-500 employees)
 * Core Pain Points Addressed: Strategy-to-Backlog Gap, Stale Business Priorities, Manual Roadmap Hell
 * Value Proposition: PM33 Automation Bridges that eliminate manual strategic-to-execution translation
 */

export default function SeniorPMScaleUpLandingPage() {
  
  React.useEffect(() => {
    analytics.track('senior_pm_scaleup_page_viewed', {
      segment: 'senior-pm',
      company_stage: 'scale-up',
      page_source: 'direct'
    });
  }, []);

  const handleTrialClick = (location: string) => {
    analytics.track('trial_click', {
      segment: 'senior-pm',
      source_page: 'senior_pm_scaleup',
      cta_location: location,
      tier_interest: 'team'
    });
  };

  return (
    <>
      <Navigation />
      
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        
        {/* Hero Section */}
        <Container size="xl" py={80}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            
            {/* Hero Content */}
            <Stack gap={32}>
              
              <Badge size="xl" variant="gradient" gradient={{ from: 'indigo', to: 'purple' }} px={20} py={10}>
                🎯 For Senior PMs at Scale-Up Companies
              </Badge>
              
              <Stack gap={16}>
                <Title order={1} size="48px" lh={1.1}>
                  Stop Losing Strategy in{' '}
                  <Text span variant="gradient" gradient={{ from: 'red', to: 'orange' }}>
                    Translation
                  </Text>
                </Title>
                <Text size="xl" c="dimmed" lh={1.6}>
                  You make brilliant strategic decisions, but they die in manual translation to execution. 
                  <Text span fw={600} c="indigo.6"> PM33's automation bridges preserve strategic context all the way to Jira tasks.</Text>
                </Text>
              </Stack>

              <Stack gap={16}>
                <Group gap={20}>
                  <Group gap={8}>
                    <ThemeIcon size={24} color="red" variant="light">
                      <IconTarget size={16} />
                    </ThemeIcon>
                    <Text fw={600} c="red.7">Strategy-to-Backlog Gap</Text>
                  </Group>
                  <Group gap={8}>
                    <ThemeIcon size={24} color="orange" variant="light">
                      <IconTrendingUp size={16} />
                    </ThemeIcon>
                    <Text fw={600} c="orange.7">Stale Business Priorities</Text>
                  </Group>
                  <Group gap={8}>
                    <ThemeIcon size={24} color="yellow" variant="light">
                      <IconRocket size={16} />
                    </ThemeIcon>
                    <Text fw={600} c="yellow.8">Manual Roadmap Hell</Text>
                  </Group>
                </Group>
                <Text size="sm" c="dimmed">
                  The 3 core pain points PM33 eliminates with intelligent automation bridges
                </Text>
              </Stack>

              <Group gap={16}>
                <Button 
                  component={Link}
                  href="/trial?utm_source=senior_pm_page&tier=team"
                  onClick={() => handleTrialClick('hero')}
                  rightSection={<IconArrowRight size={20} />}
                  size="lg"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'purple' }}
                >
                  Start Free Trial
                </Button>
                
                <Button 
                  component={Link}
                  href="/dashboard-demo"
                  variant="outline"
                  size="lg"
                  color="indigo"
                  rightSection={<IconBrain size={18} />}
                >
                  See Automation Bridges
                </Button>
              </Group>

            </Stack>

            {/* Hero Visual */}
            <Card shadow="xl" radius="xl" p={32} style={{ backgroundColor: 'var(--pm33-bg-secondary)', color: 'var(--pm33-text-primary)' }}>
              <Stack gap={20}>
                <Group justify="space-between">
                  <Text fw={700} size="lg" style={{ color: 'var(--pm33-text-primary)' }}>PM33 Automation Bridge</Text>
                  <Badge color="green" variant="filled">LIVE</Badge>
                </Group>
                
                <Stack gap={12}>
                  <Box p={12} style={{ backgroundColor: 'rgba(99, 102, 241, 0.2)', borderRadius: 8, border: '1px solid #6366f1' }}>
                    <Text size="sm" c="#a5b4fc">Strategic Decision Input</Text>
                    <Text fw={600} c="white">"Should we prioritize mobile app or API v2?"</Text>
                  </Box>
                  
                  <Group justify="center">
                    <IconArrowRight size={20} style={{ color: '#22c55e' }} />
                    <Text size="xs" c="#10b981" fw={600}>AI Analysis + Framework Application</Text>
                    <IconArrowRight size={20} style={{ color: '#22c55e' }} />
                  </Group>
                  
                  <Box p={12} style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', borderRadius: 8, border: '1px solid #22c55e' }}>
                    <Text size="sm" c="#86efac">Automated Jira Epic Generation</Text>
                    <Text fw={600} c="white" size="sm">Epic: "API v2 Development" (ICE: 8.2, Timeline: Q2, Context: Strategic priority shift)</Text>
                  </Box>
                </Stack>
                
                <Text size="xs" c="#94a3b8" ta="center">
                  ⚡ Strategic context preserved through entire execution chain
                </Text>
              </Stack>
            </Card>

          </div>
        </Container>

        {/* Core Pain Points Section */}
        <Container size="xl" py={80}>
          <Stack align="center" gap={48}>
            
            <Stack align="center" gap={16} maw={800}>
              <Title order={2} size="36px" ta="center">
                The Scale-Up PM Reality Check
              </Title>
              <Text size="lg" c="dimmed" ta="center">
                You're doing the work of 5 people but have budget for 0.5. Every strategic decision gets lost in manual translation, 
                while your backlog reflects last quarter's priorities.
              </Text>
            </Stack>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32}>
              
              {/* Pain Point 1: Strategy-to-Backlog Gap */}
              <Card shadow="lg" radius="xl" p={32} h="fit-content" style={{ border: '2px solid #ef4444' }}>
                <Stack gap={20}>
                  <Group>
                    <ThemeIcon size={40} color="red" variant="light">
                      <IconTarget size={24} />
                    </ThemeIcon>
                    <div>
                      <Title order={3} size="h4" c="red.7">Strategy-to-Backlog Gap</Title>
                      <Text size="sm" c="dimmed">Your #1 strategic killer</Text>
                    </div>
                  </Group>
                  
                  <List spacing={8} size="sm" c="dark">
                    <List.Item>Strategic decisions don't automatically flow into executable work</List.Item>
                    <List.Item>Manual translation from strategic insights to Jira tasks</List.Item>
                    <List.Item>Context loss between strategic planning and sprint execution</List.Item>
                    <List.Item>Misalignment between strategic priorities and daily work</List.Item>
                  </List>
                  
                  <Box p={16} style={{ backgroundColor: 'var(--pm33-bg-tertiary)', borderRadius: 8, border: '1px solid var(--pm33-danger)' }}>
                    <Text size="sm" fw={600} c="red.7">
                      💸 Cost: 40% of your PM time spent on alignment activities
                    </Text>
                  </Box>
                </Stack>
              </Card>

              {/* Pain Point 2: Stale Business Priorities */}
              <Card shadow="lg" radius="xl" p={32} h="fit-content" style={{ border: '2px solid #f97316' }}>
                <Stack gap={20}>
                  <Group>
                    <ThemeIcon size={40} color="orange" variant="light">
                      <IconTrendingUp size={24} />
                    </ThemeIcon>
                    <div>
                      <Title order={3} size="h4" c="orange.7">Stale Business Priorities</Title>
                      <Text size="sm" c="dimmed">Working on yesterday's strategy</Text>
                    </div>
                  </Group>
                  
                  <List spacing={8} size="sm" c="dark">
                    <List.Item>Business priorities change but backlogs remain static</List.Item>
                    <List.Item>Manual backlog grooming can't keep pace with strategic shifts</List.Item>
                    <List.Item>Teams work on outdated priorities while new opportunities emerge</List.Item>
                    <List.Item>Resource allocation stuck on yesterday's strategy</List.Item>
                  </List>
                  
                  <Box p={16} style={{ backgroundColor: 'var(--pm33-bg-tertiary)', borderRadius: 8, border: '1px solid var(--pm33-warning)' }}>
                    <Text size="sm" fw={600} c="orange.7">
                      ⏰ Reality: Market changes faster than manual updates
                    </Text>
                  </Box>
                </Stack>
              </Card>

              {/* Pain Point 3: Manual Roadmap Hell */}
              <Card shadow="lg" radius="xl" p={32} h="fit-content" style={{ border: '2px solid #eab308' }}>
                <Stack gap={20}>
                  <Group>
                    <ThemeIcon size={40} color="yellow" variant="light">
                      <IconRocket size={24} />
                    </ThemeIcon>
                    <div>
                      <Title order={3} size="h4" c="yellow.8">Manual Roadmap Hell</Title>
                      <Text size="sm" c="dimmed">Error-prone and exhausting</Text>
                    </div>
                  </Group>
                  
                  <List spacing={8} size="sm" c="dark">
                    <List.Item>ICE/RICE scoring done in spreadsheets with human error</List.Item>
                    <List.Item>Roadmap changes require manual cascade updates</List.Item>
                    <List.Item>No automated impact analysis for priority changes</List.Item>
                    <List.Item>Stakeholder alignment requires constant manual communication</List.Item>
                  </List>
                  
                  <Box p={16} style={{ backgroundColor: 'var(--pm33-bg-tertiary)', borderRadius: 8, border: '1px solid var(--pm33-warning)' }}>
                    <Text size="sm" fw={600} c="yellow.8">
                      📊 Truth: 2-3 hours per initiative for manual RICE scoring
                    </Text>
                  </Box>
                </Stack>
              </Card>

            </SimpleGrid>
          </Stack>
        </Container>

        {/* PM33 Automation Bridges Section */}
        <Container size="xl" py={80} style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}>
          <Stack align="center" gap={48}>
            
            <Stack align="center" gap={16} maw={900}>
              <Badge size="xl" color="indigo" variant="filled" px={20}>
                🤖 PM33 Automation Bridges
              </Badge>
              <Title order={2} size="36px" ta="center">
                Eliminate Manual Overhead Forever
              </Title>
              <Text size="lg" c="dimmed" ta="center">
                PM33's intelligent automation bridges ensure your strategic decisions flow seamlessly into execution, 
                with real-time priority sync and strategic context preservation.
              </Text>
            </Stack>

            <SimpleGrid cols={{ base: 1, lg: 3 }} spacing={32}>
              
              {/* Bridge 1: Strategy → Backlog Automation */}
              <Card shadow="xl" radius="xl" p={32} h="fit-content" style={{ backgroundColor: 'var(--pm33-bg-elevated)', border: '2px solid var(--pm33-primary)' }}>
                <Stack gap={24}>
                  <Group>
                    <ThemeIcon size={48} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                      <IconBolt size={28} />
                    </ThemeIcon>
                    <div>
                      <Title order={3} size="h4" c="indigo.7">Strategy → Backlog</Title>
                      <Text size="sm" c="dimmed">Automated Execution Bridge</Text>
                    </div>
                  </Group>
                  
                  <Box p={16} style={{ backgroundColor: 'var(--pm33-bg-tertiary)', borderRadius: 8, border: '1px solid var(--pm33-secondary)' }}>
                    <Text size="sm" fw={600} c="sky.7" mb={8}>Automation Flow:</Text>
                    <Text size="xs" c="dark">
                      Strategic Decision → AI Analysis → Task Generation → Jira Sync → Sprint Planning
                    </Text>
                  </Box>
                  
                  <List spacing={6} size="sm" icon={<ThemeIcon size={16} radius="xl" color="green"><IconCheck size={10} /></ThemeIcon>}>
                    <List.Item>Strategic Intelligence Engine analyzes decisions using proven frameworks</List.Item>
                    <List.Item>Automatic task breakdown with strategic context preservation</List.Item>
                    <List.Item>Jira integration creates epics/stories with strategic rationale</List.Item>
                    <List.Item>Sprint alignment ensures backlog reflects current strategy</List.Item>
                  </List>
                  
                  <Badge variant="light" color="green" fullWidth>
                    ⚡ 25-40% faster time-to-market
                  </Badge>
                </Stack>
              </Card>

              {/* Bridge 2: Dynamic Priority Sync */}
              <Card shadow="xl" radius="xl" p={32} h="fit-content" style={{ backgroundColor: 'var(--pm33-bg-elevated)', border: '2px solid var(--pm33-success)' }}>
                <Stack gap={24}>
                  <Group>
                    <ThemeIcon size={48} variant="gradient" gradient={{ from: 'green', to: 'teal' }}>
                      <IconBolt size={28} />
                    </ThemeIcon>
                    <div>
                      <Title order={3} size="h4" c="green.7">Dynamic Priority Sync</Title>
                      <Text size="sm" c="dimmed">Real-time Strategic Alignment</Text>
                    </div>
                  </Group>
                  
                  <Box p={16} style={{ backgroundColor: 'var(--pm33-bg-tertiary)', borderRadius: 8, border: '1px solid var(--pm33-success)' }}>
                    <Text size="sm" fw={600} c="green.7" mb={8}>Automation Flow:</Text>
                    <Text size="xs" c="dark">
                      Business Change → Priority Analysis → Backlog Reorder → Team Notification
                    </Text>
                  </Box>
                  
                  <List spacing={6} size="sm" icon={<ThemeIcon size={16} radius="xl" color="green"><IconCheck size={10} /></ThemeIcon>}>
                    <List.Item>Real-time priority intelligence tracks business condition changes</List.Item>
                    <List.Item>Automated backlog reordering based on strategic priority shifts</List.Item>
                    <List.Item>Impact analysis shows cascading effects of priority changes</List.Item>
                    <List.Item>Team communication explains priority changes with strategic context</List.Item>
                  </List>
                  
                  <Badge variant="light" color="green" fullWidth>
                    🎯 50-100% faster strategic responsiveness
                  </Badge>
                </Stack>
              </Card>

              {/* Bridge 3: Intelligent Roadmap Management */}
              <Card shadow="xl" radius="xl" p={32} h="fit-content" style={{ backgroundColor: 'var(--pm33-bg-elevated)', border: '2px solid var(--pm33-warning)' }}>
                <Stack gap={24}>
                  <Group>
                    <ThemeIcon size={48} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                      <IconBrain size={28} />
                    </ThemeIcon>
                    <div>
                      <Title order={3} size="h4" c="orange.7">Intelligent Roadmap</Title>
                      <Text size="sm" c="dimmed">Automated Strategic Planning</Text>
                    </div>
                  </Group>
                  
                  <Box p={16} style={{ backgroundColor: 'var(--pm33-bg-tertiary)', borderRadius: 8, border: '1px solid var(--pm33-warning)' }}>
                    <Text size="sm" fw={600} c="orange.7" mb={8}>Automation Flow:</Text>
                    <Text size="xs" c="dark">
                      Strategic Input → Framework Analysis → Priority Scoring → Timeline Optimization → Stakeholder Sync
                    </Text>
                  </Box>
                  
                  <List spacing={6} size="sm" icon={<ThemeIcon size={16} radius="xl" color="green"><IconCheck size={10} /></ThemeIcon>}>
                    <List.Item>Multi-framework prioritization (ICE/RICE/strategic fit) with confidence scoring</List.Item>
                    <List.Item>Resource-aware timeline projection based on team capacity</List.Item>
                    <List.Item>What-if scenario modeling for roadmap changes</List.Item>
                    <List.Item>Automated stakeholder updates with data-driven justifications</List.Item>
                  </List>
                  
                  <Badge variant="light" color="orange" fullWidth>
                    ⚙️ 15-30% resource optimization efficiency
                  </Badge>
                </Stack>
              </Card>

            </SimpleGrid>
          </Stack>
        </Container>

        {/* Social Proof */}
        <Container size="xl" py={60}>
          <SocialProofMetrics segment="senior-pm" />
        </Container>

        {/* Testimonials */}
        <Container size="xl" py={60}>
          <TestimonialShowcase format="grid" segment="senior-pm" />
        </Container>

        {/* CTA Section */}
        <Container size="xl" py={80}>
          <Card 
            shadow="xl" 
            radius="xl" 
            p={48}
            style={{ 
              background: 'linear-gradient(135deg, var(--marketing-primary) 0%, #667eea 100%)',
              color: 'white'
            }}
          >
            <Stack align="center" gap={24}>
              
              <Badge size="xl" color="orange" variant="filled" px={20}>
                🚀 Ready for Strategic Automation?
              </Badge>
              
              <Stack align="center" gap={16}>
                <Title order={2} size="36px" ta="center" c="white">
                  Stop losing strategy in translation
                </Title>
                <Text size="lg" ta="center" c="white" opacity={0.9} maw={600}>
                  Join 1,043 senior PMs who've eliminated manual strategic-to-execution overhead with PM33's automation bridges. 
                  <Text span fw={600}>Team tier: $79/month.</Text>
                </Text>
              </Stack>

              <Group gap={16}>
                <Button
                  size="lg"
                  color="white"
                  variant="filled"
                  rightSection={<IconArrowRight size={18} />}
                  component={Link}
                  href="/trial?utm_source=senior_pm_scaleup&utm_medium=cta&utm_campaign=automation_bridges&tier=team"
                  onClick={() => handleTrialClick('bottom_cta')}
                  radius="xl"
                  px={32}
                >
                  Start Free Trial - Team Tier
                </Button>
                
                <Button
                  size="lg"
                  color="white"
                  variant="outline"
                  component={Link}
                  href="/dashboard-demo?utm_source=senior_pm_scaleup"
                  radius="xl"
                  px={24}
                  style={{ borderColor: 'white', color: 'white' }}
                >
                  See Live Demo
                </Button>
              </Group>

              <Text size="sm" ta="center" c="white" opacity={0.8}>
                ✅ 14-day free trial • ✅ No credit card required • ✅ Automation bridges active in 5 minutes
              </Text>
              
            </Stack>
          </Card>
        </Container>

      </div>
      
      <Footer />
    </>
  );
}