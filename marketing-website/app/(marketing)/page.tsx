// PM33 Marketing Homepage - Restored from live Vercel deployment
'use client';

import React, { useState } from 'react';
import { Container, Grid, Title, Text, Group, Stack, Badge, SimpleGrid, Box, Button } from '@mantine/core';
import { IconArrowRight, IconCheck, IconBolt, IconBrain, IconClock, IconTrendingUp, IconSparkles, IconTarget, IconUsers, IconBulb, IconCircleCheck } from '@tabler/icons-react';
import Link from 'next/link';
import { PM33_DESIGN } from '../../components/marketing/PM33Header';

export default function PM33MarketingHomePage() {
  const [demoProcessing, setDemoProcessing] = useState(false);

  const handleDemoClick = () => {
    setDemoProcessing(true);
    setTimeout(() => setDemoProcessing(false), 3000);
  };

  return (
    <div className="marketing-context">
      {/* Hero Section - Theme-Aware Dark Background */}
      <Box 
        style={{ 
          position: 'relative',
          padding: '6rem 0',
          background: 'linear-gradient(135deg, #1E40AF 0%, #1e3a8a 100%)',
          color: 'var(--marketing-text-inverse)',
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
                  gradient={{ from: 'blue.4', to: 'indigo.6' }}
                  c="white"
                >
                  Trusted by 2,500+ Product Teams
                </Badge>
                
                <Stack gap={16}>
                  <Title 
                    order={1} 
                    size="h1"
                    lh={1.1}
                    className="marketing-text-inverse"
                    style={{ 
                      fontWeight: 800,
                      fontSize: '3.5rem'
                    }}
                  >
                    Don't Replace Your PM Tools—
                    <Text 
                      span 
                      className="marketing-gradient-text"
                      style={{ display: 'block', marginTop: '0.5rem' }}
                    >
                      Make Them 10x Smarter
                    </Text>
                  </Title>
                  
                  <Text 
                    size="xl" 
                    className="marketing-text-inverse"
                    lh={1.6}
                    maw={600}
                    style={{ opacity: 0.9 }}
                  >
                    Transform from Product Manager to Strategic PMO with 4 Agentic AI Teams. 
                    Achieve 10x productivity with AI-powered strategic intelligence, workflow automation, and data-driven insights.
                  </Text>
                </Stack>
                
                <Group gap={16}>
                  <Button 
                    component={Link} 
                    href="/trial" 
                    size="xl"
                    leftSection={<IconArrowRight size={20} />}
                    style={{
                      background: `linear-gradient(135deg, ${PM33_DESIGN.colors.app.primary} 0%, ${PM33_DESIGN.colors.app.secondary} 100%)`,
                      color: PM33_DESIGN.colors.marketing.text.inverse,
                      fontSize: '16px',
                      height: '56px',
                      padding: '0 32px'
                    }}
                  >
                    Start Free Trial
                  </Button>
                  
                  <Button 
                    component={Link} 
                    href="/demo" 
                    variant="outline" 
                    size="xl"
                    onClick={handleDemoClick}
                    leftSection={<IconBrain size={20} />}
                    className="marketing-text-inverse"
                    style={{
                      borderColor: 'rgba(255,255,255,0.3)',
                      height: '56px',
                      padding: '0 32px'
                    }}
                  >
                    Live Demo
                  </Button>
                </Group>

                {/* Social Proof */}
                <Group gap={32} mt={32}>
                  <Group gap={8}>
                    <IconCircleCheck size={16} color="#10b981" />
                    <Text size="sm" c="gray.4">No credit card required</Text>
                  </Group>
                  <Group gap={8}>
                    <IconCircleCheck size={16} color="#10b981" />
                    <Text size="sm" c="gray.4">14-day free trial</Text>
                  </Group>
                  <Group gap={8}>
                    <IconCircleCheck size={16} color="#10b981" />
                    <Text size="sm" c="gray.4">5-minute setup</Text>
                  </Group>
                </Group>
              </Stack>
            </Grid.Col>

            {/* Right Column - Live Demo */}
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Box
                className="marketing-glass-card"
                style={{
                  padding: '32px',
                  background: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <Stack gap={20}>
                  <Group gap={12} mb={16}>
                    <Box
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <IconBrain size={18} color="white" />
                    </Box>
                    <Text fw={700} size="lg" className="marketing-text-inverse">Live Demo Experience</Text>
                  </Group>
                  
                  <Text size="md" className="marketing-text-inverse" style={{ opacity: 0.8 }}>
                    "Should we prioritize mobile features or web optimization for Q4?"
                  </Text>
                  
                  {demoProcessing && (
                    <Box style={{ padding: '16px 0' }}>
                      <Text size="sm" className="marketing-text-inverse" mb={8} style={{ opacity: 0.9 }}>🧠 AI Processing...</Text>
                      <Text size="xs" className="marketing-text-inverse" style={{ opacity: 0.7 }}>Strategic Intelligence • Workflow Execution • Data Intelligence</Text>
                    </Box>
                  )}

                  {!demoProcessing && (
                    <Box
                      style={{
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                        padding: '20px',
                        borderRadius: '12px',
                        border: '1px solid rgba(102, 126, 234, 0.2)'
                      }}
                    >
                      <Text size="sm" fw={600} mb={12} className="marketing-text-inverse">🎯 AI Strategic Recommendation:</Text>
                      <Text size="sm" className="marketing-text-inverse" lh={1.5} style={{ opacity: 0.9 }}>
                        Based on your user data and market trends, <strong>prioritize mobile features</strong>. 
                        67% of your users access via mobile, and mobile conversion is 23% higher than web.
                      </Text>
                      <Text size="xs" className="marketing-text-inverse" mt={8} style={{ opacity: 0.7 }}>
                        ✓ Strategic Intelligence • ✓ Data Analysis • ✓ Workflow Recommendations
                      </Text>
                    </Box>
                  )}
                </Stack>
              </Box>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Trusted Companies Section */}
      <Container size="xl" py={60}>
        <Stack align="center" gap={32}>
          <Text size="sm" c="dimmed" ta="center" fw={600} tt="uppercase" ls={1}>
            Trusted by Product Teams at
          </Text>
          <Group justify="center" gap={48}>
            <Text size="lg" fw={700} c="gray.6">Microsoft</Text>
            <Text size="lg" fw={700} c="gray.6">Salesforce</Text>
            <Text size="lg" fw={700} c="gray.6">Shopify</Text>
            <Text size="lg" fw={700} c="gray.6">Stripe</Text>
            <Text size="lg" fw={700} c="gray.6">Notion</Text>
          </Group>
        </Stack>
      </Container>

      {/* Problem Section */}
      <Box style={{ background: 'var(--marketing-bg-secondary)', padding: '80px 0' }}>
        <Container size="xl">
          <Stack align="center" gap={48}>
            <Stack align="center" gap={16} maw={800}>
              <Badge size="lg" variant="light" color="orange">
                The PM Reality
              </Badge>
              <Title order={2} ta="center" lh={1.2} className="marketing-text-primary">
                Your PM Tools Are Data Silos. Your Strategy Suffers.
              </Title>
              <Text size="lg" className="marketing-text-secondary" ta="center">
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
              <Box 
                key={index}
                className="marketing-glass-card"
                style={{
                  padding: '24px',
                  textAlign: 'center',
                }}
              >
                <Stack align="center" gap={16}>
                  <problem.icon size={24} color="var(--marketing-primary)" />
                  <Text fw={600} size="lg" className="marketing-text-primary">{problem.title}</Text>
                  <Text size="sm" className="marketing-text-secondary" ta="center">
                    {problem.description}
                  </Text>
                </Stack>
              </Box>
            ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Solution Section - 4 AI Teams */}
      <Box style={{ backgroundColor: 'var(--marketing-bg-primary)' }}>
        <Container size="xl" py={80}>
          <Stack align="center" gap={48}>
            <Stack align="center" gap={16} maw={800}>
              <Badge size="md" variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                The PM33 Solution
              </Badge>
              <Title order={2} ta="center" lh={1.2}>
                Meet Your 4 AI Teams
              </Title>
              <Text size="lg" className="marketing-text-secondary" ta="center">
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
                <Box 
                  key={index}
                  className="marketing-glass-card"
                  style={{
                    padding: '32px',
                  }}
                >
                  <Stack gap={16}>
                    <Group gap={12}>
                      <team.icon size={24} color={`var(--mantine-color-${team.color}-6)`} />
                      <Text fw={600} size="lg" className="marketing-text-primary">{team.title}</Text>
                    </Group>
                    <Text size="sm" className="marketing-text-secondary">{team.description}</Text>
                    <Group gap={8}>
                      {team.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} size="sm" variant="light" color={team.color}>
                          {feature}
                        </Badge>
                      ))}
                    </Group>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        className="marketing-cta-section"
        style={{ 
          background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)', 
          padding: '80px 0',
          color: 'var(--marketing-text-inverse)'
        }}
      >
        <Container size="xl">
          <Stack align="center" gap={32}>
            <Stack align="center" gap={16} maw={700}>
              <Badge size="lg" variant="light" color="blue">
                Ready to Transform?
              </Badge>
              <Title order={2} ta="center" className="marketing-text-inverse" size="2.5rem">
                From Product Manager to Strategic PMO
              </Title>
              <Text size="xl" ta="center" className="marketing-text-inverse" lh={1.6} style={{ opacity: 0.9 }}>
                Join 2,500+ Product Managers using PM33's AI-powered strategic intelligence. 
                Start at $29/month with 14-day free trial.
              </Text>
            </Stack>
            
            <Group gap={20}>
              <Button 
                component={Link} 
                href="/trial" 
                size="xl"
                leftSection={<IconArrowRight size={20} />}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontSize: '16px',
                  height: '56px',
                  padding: '0 40px',
                  fontWeight: 600
                }}
              >
                Start Free Trial
              </Button>
              
              <Button 
                component={Link} 
                href="/demo" 
                variant="outline"
                size="xl"
                className="marketing-text-inverse"
                style={{
                  borderColor: 'rgba(255,255,255,0.3)',
                  height: '56px',
                  padding: '0 32px'
                }}
              >
                Live Demo
              </Button>
            </Group>

            <Group gap={40} mt={24}>
              <Group gap={8}>
                <IconCheck size={16} color="#10b981" />
                <Text size="sm" className="marketing-text-inverse" style={{ opacity: 0.8 }}>No credit card required</Text>
              </Group>
              <Group gap={8}>
                <IconCheck size={16} color="#10b981" />
                <Text size="sm" className="marketing-text-inverse" style={{ opacity: 0.8 }}>5-minute setup</Text>
              </Group>
              <Group gap={8}>
                <IconCheck size={16} color="#10b981" />
                <Text size="sm" className="marketing-text-inverse" style={{ opacity: 0.8 }}>Cancel anytime</Text>
              </Group>
            </Group>
          </Stack>
        </Container>
      </Box>
    </div>
  );
}