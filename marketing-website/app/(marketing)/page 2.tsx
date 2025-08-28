/**
 * Component: PM33 Marketing Homepage
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Section 1.1
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Section 1.1
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied with backdrop-filter: blur(40px) saturate(150%)
 * - [x] Animations implemented (entrance, hover, scroll animations)
 * - [x] Hover states added with transform and glow effects
 * - [x] AI intelligence visible through AI processing demos
 * - [x] Progress indicators present (feature showcases)
 * - [x] Follows 8pt grid spacing system
 * - [x] PM33 component library integration
 * - [x] Mantine compatibility maintained
 */

'use client';

import React, { useState } from 'react';
import { Container, Grid, Title, Text, Group, Stack, Badge, SimpleGrid, Box, Anchor } from '@mantine/core';
import { IconArrowRight, IconCheck, IconBolt, IconBrain, IconClock, IconTrendingUp, IconSparkles, IconTarget, IconUsers, IconBulb, IconCircleCheck } from '@tabler/icons-react';
import Link from 'next/link';
import { 
  PM33PageWrapper, 
  PM33Button, 
  PM33Card, 
  PM33AIProcessing 
} from '../../components/pm33-ui';

export default function PM33MarketingHomePage() {
  const [demoProcessing, setDemoProcessing] = useState(false);

  const handleDemoClick = () => {
    setDemoProcessing(true);
    setTimeout(() => setDemoProcessing(false), 3000);
  };

  return (
    <PM33PageWrapper 
      variant="marketing" 
      size="xl" 
      padding="none"
      animate={true}
      backgroundGradient={true}
    >
      {/* Hero Section */}
      <Box 
        style={{ 
          position: 'relative',
          padding: '6rem 0',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
          overflow: 'hidden'
        }}
      >
        <Container size="xl">
          <Grid gutter={48} align="center">
            {/* Left Column - Main Content */}
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Stack gap={24}>
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'indigo.1', to: 'purple.1' }}
                  c="indigo.7"
                  leftSection={<IconSparkles size={16} />}
                >
                  Join 2,500+ Product Managers
                </Badge>
                
                <Stack gap={16}>
                  <Title 
                    order={1} 
                    size="h1"
                    lh={1.1}
                    style={{ 
                      fontWeight: 800,
                      color: 'var(--mantine-color-dark-8)'
                    }}
                  >
                    Don't Replace Your PM Tools—
                    <Text 
                      span 
                      variant="gradient" 
                      gradient={{ from: 'indigo', to: 'purple' }}
                      style={{ display: 'block', marginTop: '0.5rem' }}
                    >
                      Make Them 10x Smarter
                    </Text>
                  </Title>
                  
                  <Text 
                    size="xl" 
                    c="dimmed" 
                    lh={1.6}
                    maw={600}
                  >
                    PM33 is the AI brain that supercharges your existing PM stack without migration headaches. 
                    Keep using Jira, Linear, Monday—just add strategic intelligence.
                  </Text>
                </Stack>
                
                <Group gap={16}>
                  <PM33Button 
                    component={Link} 
                    href="/trial" 
                    variant="primary" 
                    size="lg"
                    glowEffect
                    leftIcon={<IconBolt size={20} />}
                  >
                    Start Free Trial
                  </PM33Button>
                  
                  <PM33Button 
                    component={Link} 
                    href="/strategic-intelligence" 
                    variant="glass" 
                    size="lg"
                    onClick={handleDemoClick}
                    leftIcon={<IconBrain size={20} />}
                  >
                    See AI Demo
                  </PM33Button>
                </Group>

                {/* Social Proof */}
                <Group gap={24} mt={32}>
                  <Group gap={8}>
                    <IconCircleCheck size={20} color="var(--mantine-color-green-6)" />
                    <Text size="sm" c="dimmed">No migration required</Text>
                  </Group>
                  <Group gap={8}>
                    <IconCircleCheck size={20} color="var(--mantine-color-green-6)" />
                    <Text size="sm" c="dimmed">14-day free trial</Text>
                  </Group>
                  <Group gap={8}>
                    <IconCircleCheck size={20} color="var(--mantine-color-green-6)" />
                    <Text size="sm" c="dimmed">Setup in 5 minutes</Text>
                  </Group>
                </Group>
              </Stack>
            </Grid.Col>

            {/* Right Column - AI Demo */}
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <PM33Card 
                variant="glass" 
                size="lg" 
                hover={true}
                glowEffect={demoProcessing}
                headerTitle="Strategic Intelligence Demo"
                headerSubtitle="Watch PM33 analyze your product strategy"
                headerIcon={<IconBrain size={20} />}
              >
                <Stack gap={16}>
                  <Text size="sm" c="dimmed">
                    Ask: "Should we prioritize mobile features or web optimization for Q4?"
                  </Text>
                  
                  <PM33AIProcessing 
                    variant="detailed"
                    isProcessing={demoProcessing}
                    showEngineDetails={true}
                    showConfidenceScores={true}
                    processingText="Analyzing strategic options..."
                    completedText="Strategic analysis complete"
                  />

                  {!demoProcessing && (
                    <Box
                      style={{
                        background: 'var(--mantine-color-blue-0)',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid var(--mantine-color-blue-2)'
                      }}
                    >
                      <Text size="sm" fw={600} mb={8}>AI Recommendation:</Text>
                      <Text size="sm" c="dimmed">
                        Based on your user data and market trends, prioritize mobile features. 
                        67% of your users access via mobile, and mobile conversion is 23% higher.
                      </Text>
                    </Box>
                  )}
                </Stack>
              </PM33Card>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Problem Section */}
      <Container size="xl" py={80}>
        <Stack align="center" gap={48}>
          <Stack align="center" gap={16} maw={800}>
            <Badge size="md" variant="outline" color="orange">
              The PM Reality
            </Badge>
            <Title order={2} ta="center" lh={1.2}>
              Your PM Tools Are Data Silos. Your Strategy Suffers.
            </Title>
            <Text size="lg" c="dimmed" ta="center">
              You're drowning in tickets, metrics, and stakeholder requests. 
              Meanwhile, strategic decisions get made on gut feel because connecting the dots is impossible.
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={24}>
            {[
              {
                icon: IconClock,
                title: "3+ Hours Daily",
                description: "Spent switching between PM tools, losing context every time"
              },
              {
                icon: IconTrendingUp,
                title: "70% Gut-Based",
                description: "Strategic decisions made without proper data analysis"
              },
              {
                icon: IconUsers,
                title: "5-10 Stakeholders", 
                description: "All asking different questions about the same data"
              }
            ].map((problem, index) => (
              <PM33Card 
                key={index} 
                variant="minimal" 
                size="md" 
                hover={true}
                headerIcon={<problem.icon size={24} />}
                headerTitle={problem.title}
              >
                <Stack align="center" gap={16}>
                  <Text size="sm" c="dimmed" ta="center">
                    {problem.description}
                  </Text>
                </Stack>
              </PM33Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>

      {/* Solution Section - 4 AI Teams */}
      <Box style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
        <Container size="xl" py={80}>
          <Stack align="center" gap={48}>
            <Stack align="center" gap={16} maw={800}>
              <Badge size="md" variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                The PM33 Solution
              </Badge>
              <Title order={2} ta="center" lh={1.2}>
                Meet Your 4 AI Teams
              </Title>
              <Text size="lg" c="dimmed" ta="center">
                PM33 gives you a full PMO worth of strategic capabilities. 
                Each AI team specializes in a core PM function, working together seamlessly.
              </Text>
            </Stack>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32}>
              {[
                {
                  title: "Strategic Intelligence AI",
                  description: "Multi-framework analysis (ICE/RICE/SWOT), competitive intelligence, strategic recommendations",
                  features: ["Framework Selection", "Competitive Analysis", "Strategic Planning"],
                  icon: IconBrain,
                  color: "indigo"
                },
                {
                  title: "Workflow Execution AI", 
                  description: "Task automation, cross-functional coordination, PM tool integration and synchronization",
                  features: ["Task Automation", "Tool Integration", "Workflow Optimization"],
                  icon: IconBolt,
                  color: "orange"
                },
                {
                  title: "Data Intelligence AI",
                  description: "Company-specific learning, performance analytics, predictive insights and trend analysis",
                  features: ["Data Analysis", "Predictive Insights", "Performance Tracking"],
                  icon: IconTrendingUp,
                  color: "green"
                },
                {
                  title: "Communication AI",
                  description: "Stakeholder updates, executive summaries, cross-team alignment and presentation generation",
                  features: ["Executive Summaries", "Stakeholder Updates", "Team Alignment"],
                  icon: IconUsers,
                  color: "purple"
                }
              ].map((team, index) => (
                <PM33Card 
                  key={index} 
                  variant="premium" 
                  size="lg" 
                  hover={true}
                  glowEffect
                  headerIcon={<team.icon size={24} />}
                  headerTitle={team.title}
                  headerSubtitle={team.description}
                >
                  <Stack gap={12}>
                    <Group gap={8}>
                      {team.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} size="sm" variant="light" color={team.color}>
                          {feature}
                        </Badge>
                      ))}
                    </Group>
                  </Stack>
                </PM33Card>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container size="xl" py={80}>
        <PM33Card 
          variant="ai" 
          size="xl" 
          headerTitle="Ready to 10x Your PM Productivity?"
          headerSubtitle="Join 2,500+ Product Managers using PM33"
          headerIcon={<IconTarget size={24} />}
        >
          <Stack align="center" gap={24}>
            <Text size="lg" ta="center" maw={600}>
              Start your 14-day free trial. No credit card required. 
              Setup takes 5 minutes and works with your existing PM tools.
            </Text>
            
            <Group gap={16}>
              <PM33Button 
                component={Link} 
                href="/trial" 
                variant="primary" 
                size="xl"
                glowEffect
                pulseOnHover
                leftIcon={<IconArrowRight size={20} />}
              >
                Start Free Trial
              </PM33Button>
              
              <PM33Button 
                component={Link} 
                href="/pricing" 
                variant="outline" 
                size="xl"
              >
                View Pricing
              </PM33Button>
            </Group>

            <Group gap={32} mt={16}>
              <Group gap={8}>
                <IconCheck size={16} color="var(--mantine-color-green-6)" />
                <Text size="sm" c="dimmed">14-day free trial</Text>
              </Group>
              <Group gap={8}>
                <IconCheck size={16} color="var(--mantine-color-green-6)" />
                <Text size="sm" c="dimmed">No setup fees</Text>
              </Group>
              <Group gap={8}>
                <IconCheck size={16} color="var(--mantine-color-green-6)" />
                <Text size="sm" c="dimmed">Cancel anytime</Text>
              </Group>
            </Group>
          </Stack>
        </PM33Card>
      </Container>
    </PM33PageWrapper>
  );
}