'use client';

import { Container, Title, Text, Button, Card, Group, List, Stack, Badge, Grid, Divider } from '@mantine/core';
import { IconRocket, IconBrain, IconShield, IconTarget, IconTrendingUp, IconUsers, IconClock, IconSettings, IconCheck, IconArrowRight, IconSparkles } from '@tabler/icons-react';
import Link from 'next/link';

/**
 * Component: Features - Comprehensive Product Capabilities
 * Route: /features  
 * Purpose: Showcase PM33's strategic intelligence features and capabilities
 * Target: Product Managers seeking PMO-level strategic enhancement
 */

export default function FeaturesPage() {
  const coreFeatures = [
    {
      icon: IconBrain,
      title: "Strategic Intelligence Engine",
      description: "Multi-framework analysis using ICE, RICE, Porter's Five Forces, and custom strategic models to guide product decisions.",
      benefits: [
        "85% more confident strategic decisions",
        "3x faster competitive analysis",
        "Automated market positioning insights"
      ]
    },
    {
      icon: IconTarget,
      title: "AI Workflow Orchestration", 
      description: "Intelligent automation that connects your existing PM tools and creates seamless workflows across your entire stack.",
      benefits: [
        "70+ hours saved monthly per PM",
        "Seamless tool integration",
        "Automated task prioritization"
      ]
    },
    {
      icon: IconTrendingUp,
      title: "Predictive Analytics & Intelligence",
      description: "Advanced data analysis that learns your company patterns and predicts outcomes before you ship.",
      benefits: [
        "40% improvement in feature success rate", 
        "Early risk detection and mitigation",
        "Data-driven roadmap optimization"
      ]
    },
    {
      icon: IconUsers,
      title: "Stakeholder Communication AI",
      description: "Professional communication generation for executives, teams, and clients with context-aware messaging.",
      benefits: [
        "89% stakeholder satisfaction improvement",
        "Automated status reports and updates",
        "Executive-level strategic presentations"
      ]
    }
  ];

  const integrations = [
    { name: "Jira", icon: IconSettings, status: "Full Integration" },
    { name: "Linear", icon: IconTarget, status: "Full Integration" },
    { name: "Monday.com", icon: IconCheck, status: "Full Integration" },
    { name: "Asana", icon: IconCheck, status: "Full Integration" },
    { name: "Slack", icon: IconUsers, status: "Native Integration" },
    { name: "Notion", icon: IconBrain, status: "Native Integration" }
  ];

  const aiTeams = [
    {
      team: "Strategic Intelligence AI",
      lead: "Claude (Anthropic)",
      focus: "Complex strategic analysis, competitive intelligence, multi-framework decision support",
      output: "Strategic recommendations, market analysis, competitive response strategies"
    },
    {
      team: "Workflow Execution AI", 
      lead: "OpenAI GPT-4",
      focus: "Task automation, cross-functional coordination, PM tool orchestration", 
      output: "Automated workflows, timeline management, progress tracking dashboards"
    },
    {
      team: "Data Intelligence AI",
      lead: "Together AI", 
      focus: "Pattern recognition, predictive analytics, company-specific learning",
      output: "Performance predictions, optimization opportunities, risk assessments"
    },
    {
      team: "Communication AI",
      lead: "Claude + OpenAI",
      focus: "Professional communication, stakeholder alignment, executive reporting",
      output: "Strategic presentations, status updates, cross-team alignment materials"
    }
  ];

  return (
    <Container size={1400} px={24} py={40}>
      
      {/* Hero Section */}
      <Stack gap={32} ta="center" mb={80}>
        <Badge
          size="lg"
          radius="xl"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none'
          }}
        >
          ⚡ PMO-Level Strategic Capabilities
        </Badge>
        
        <Title order={1} size="h1" fw={700} maw={900} mx="auto">
          Transform from PM to Strategic PMO with
          <Text
            component="span"
            inherit
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            display="block"
            mt={8}
          >
            4 Agentic AI Teams
          </Text>
        </Title>
        
        <Text size="xl" c="dimmed" maw={700} mx="auto" mb={32}>
          Stop managing features. Start strategically dominating your market with AI teams that deliver 
          PMO-level intelligence, workflow automation, and strategic execution.
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
            href="/trial"
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

      {/* 4 AI Teams Overview */}
      <Card shadow="xl" padding={64} radius={20} mb={80}
            style={{ 
              background: 'linear-gradient(135deg, var(--marketing-primary-light) 0%, var(--marketing-bg-primary) 50%, var(--marketing-success-light) 100%)'
            }}>
        <Title order={2} ta="center" mb={48} size="h1" fw={700}>
          🤖 Meet Your 4 AI Teams
        </Title>
        
        <Text size="xl" ta="center" mb={48} maw={800} mx="auto">
          Each AI team is powered by the best models for their specific domain, working together 
          to transform you into a strategic PMO leader.
        </Text>

        <Grid>
          {aiTeams.map((team, index) => (
            <Grid.Col key={index} span={{ base: 12, lg: 6 }}>
              <Card padding="xl" radius="lg" shadow="md" style={{ height: '100%' }}>
                <Stack gap={16}>
                  <Group justify="space-between">
                    <Title order={3} size="h3" fw={700}>
                      {team.team}
                    </Title>
                    <Badge size="sm" color="blue">{team.lead}</Badge>
                  </Group>
                  <Text c="dimmed" mb={12}>
                    <strong>Focus:</strong> {team.focus}
                  </Text>
                  <Text>
                    <strong>Delivers:</strong> {team.output}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Card>

      {/* Core Features Grid */}
      <Title order={2} ta="center" mb={64} size="h1" fw={700}>
        🎯 Strategic Intelligence Platform Features
      </Title>
      
      <Grid mb={80}>
        {coreFeatures.map((feature, index) => (
          <Grid.Col key={index} span={{ base: 12, lg: 6 }}>
            <Card padding="xl" radius="lg" shadow="lg" style={{ height: '100%' }}>
              <Stack gap={24}>
                <Group>
                  <div style={{ 
                    background: 'linear-gradient(45deg, var(--marketing-primary) 0%, purple 100%)',
                    width: 56, 
                    height: 56, 
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <feature.icon size={28} color="white" />
                  </div>
                  <Title order={3} fw={700}>{feature.title}</Title>
                </Group>
                
                <Text c="dimmed" size="lg" style={{ lineHeight: 1.6 }}>
                  {feature.description}
                </Text>
                
                <Stack gap={8}>
                  <Text fw={600} c="var(--marketing-primary)">Key Benefits:</Text>
                  {feature.benefits.map((benefit, idx) => (
                    <Group key={idx} gap={8}>
                      <IconCheck size={16} color="var(--marketing-success)" />
                      <Text size="sm">{benefit}</Text>
                    </Group>
                  ))}
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Tool Integrations */}
      <Card shadow="md" padding={48} radius={16} mb={80}>
        <Title order={2} ta="center" mb={32} fw={700}>
          🔗 Seamless Tool Integration
        </Title>
        
        <Text size="lg" ta="center" mb={48} c="dimmed" maw={700} mx="auto">
          PM33 enhances your existing PM tools instead of replacing them. No migration headaches, 
          just instant intelligence across your entire stack.
        </Text>
        
        <Grid>
          {integrations.map((integration, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
              <Card padding="lg" radius="lg" shadow="sm" style={{ textAlign: 'center' }}>
                <integration.icon size={40} style={{ marginBottom: 16 }} />
                <Title order={4} mb={8}>{integration.name}</Title>
                <Badge size="sm" color="green" variant="light">{integration.status}</Badge>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Card>

      {/* Success Metrics */}
      <Card shadow="md" padding={48} radius={16} mb={80} 
            style={{ backgroundColor: 'var(--marketing-bg-secondary)' }}>
        <Title order={2} ta="center" mb={48} fw={700}>
          📊 Proven Results from 2,500+ Product Managers
        </Title>
        
        <Grid>
          {[
            { metric: "300%", label: "Increase in strategic decision confidence", icon: IconTrendingUp },
            { metric: "72hrs", label: "Monthly time saved per PM", icon: IconClock },
            { metric: "40%", label: "Improvement in feature success rate", icon: IconTarget },
            { metric: "89%", label: "Stakeholder satisfaction increase", icon: IconUsers }
          ].map((stat, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }}>
              <Stack align="center" ta="center">
                <stat.icon size={48} color="var(--marketing-primary)" style={{ marginBottom: 16 }} />
                <Text size="3xl" fw={900} c="var(--marketing-primary)">{stat.metric}</Text>
                <Text c="dimmed" fw={600}>{stat.label}</Text>
              </Stack>
            </Grid.Col>
          ))}
        </Grid>
      </Card>

      {/* Risk Reversal Guarantee */}
      <Card shadow="xl" padding={48} radius={20} mb={80}
            style={{ borderLeft: '8px solid var(--marketing-success)' }}>
        <Group align="center" mb={32}>
          <IconShield size={48} color="var(--marketing-success)" />
          <div>
            <Title order={2} fw={700} mb={8}>
              Zero-Risk PMO Transformation Guarantee
            </Title>
            <Text c="dimmed" size="lg">
              We're so confident PM33 will transform your strategic capabilities
            </Text>
          </div>
        </Group>
        
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="center" ta="center">
              <Text size="xl" fw={700} c="var(--marketing-success)">14 Days Free</Text>
              <Text>No credit card required</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="center" ta="center">
              <Text size="xl" fw={700} c="var(--marketing-success)">30-Day Guarantee</Text>
              <Text>Full refund if not satisfied</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="center" ta="center">
              <Text size="xl" fw={700} c="var(--marketing-success)">Keep Everything</Text>
              <Text>All generated strategic documents</Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Card>

      {/* Final CTA */}
      <Card shadow="xl" padding={64} radius={20} 
            style={{ 
              background: 'linear-gradient(135deg, var(--marketing-primary) 0%, purple 100%)',
              color: 'white',
              textAlign: 'center'
            }}>
        <IconSparkles size={64} style={{ marginBottom: 32 }} />
        <Title order={1} size="h1" fw={700} mb={24} style={{ color: 'white' }}>
          Ready to Transform from PM to Strategic PMO?
        </Title>
        
        <Text size="xl" mb={48} maw={800} mx="auto" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          Join 2,500+ product managers who've already transformed their strategic capabilities. 
          Start your PMO transformation today.
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
            Start Free Trial - No Credit Card
          </Button>
          <Button 
            component={Link}
            href="/trial"
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
            See Live Demo
          </Button>
        </Group>
        
        <Text mt={32} style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          🚀 Transform in 14 days or less — Guaranteed
        </Text>
      </Card>
      
    </Container>
  );
}