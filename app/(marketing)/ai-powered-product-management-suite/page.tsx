'use client';

import React from 'react';
import { Container, Title, Text, Stack, Box, Badge, Button, Group, Card, SimpleGrid, ThemeIcon, List } from '@mantine/core';
import { IconRocket, IconBrain, IconTarget, IconTrendingUp, IconUsers, IconArrowRight, IconCheck, IconSparkles, IconBolt } from '@tabler/icons-react';
import Link from 'next/link';

export default function AiPoweredProductManagementSuitePage() {
  return (
    <div className="marketing-context">
      <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>

        {/* Hero Section */}
        <Box 
          style={{ 
            position: 'relative',
            padding: '6rem 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            overflow: 'hidden',
            color: 'white'
          }}
        >
          <Container size="xl">
            <Stack align="center" gap={32}>
              <Badge 
                size="lg" 
                variant="light"
                color="white"
                leftSection={<IconRocket size={16} />}
              >
                AI-Powered Product Management
              </Badge>
              
              <Stack align="center" gap={24}>
                <Title 
                  order={1} 
                  size="3.5rem"
                  ta="center"
                  lh={1.1}
                  style={{ 
                    fontWeight: 900,
                    color: 'white',
                    maxWidth: 900,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  Transform Your PM Workflow
                  <Text 
                    span 
                    style={{ 
                      display: 'block', 
                      marginTop: 16,
                      opacity: 0.9,
                      fontSize: '2.8rem'
                    }}
                  >
                    with AI-Powered Intelligence
                  </Text>
                </Title>
                
                <Text size="xl" ta="center" maw={700} lh={1.6} style={{ opacity: 0.95 }}>
                  From scattered feedback to strategic insights in minutes. PM33's AI suite transforms chaotic product data into actionable intelligence that drives results.
                </Text>

                <Group gap={24} mt={32}>
                  <Button 
                    component={Link}
                    href="/pricing"
                    size="xl"
                    variant="white"
                    color="dark"
                    rightSection={<IconArrowRight size={20} />}
                    style={{ 
                      minWidth: 200,
                      fontWeight: 600
                    }}
                  >
                    Start Free Trial
                  </Button>
                  <Button 
                    component={Link}
                    href="/command-center-demo"
                    size="xl"
                    variant="outline"
                    color="white"
                    rightSection={<IconSparkles size={20} />}
                    style={{ minWidth: 180 }}
                  >
                    Watch Demo
                  </Button>
                </Group>
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* Value Proposition */}
        <Box py={96} bg="white">
          <Container size="xl">
            <Stack align="center" gap={64}>
              <Stack align="center" gap={24}>
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'indigo.1', to: 'purple.1' }}
                  c="indigo.7"
                >
                  🎯 The PM33 Advantage
                </Badge>
                
                <Title 
                  order={2} 
                  size="h2"
                  ta="center"
                  maw={800}
                  lh={1.2}
                  c="dark"
                >
                  From Reactive Task Management to Strategic Intelligence
                </Title>

                <Text size="lg" c="dimmed" ta="center" maw={600} lh={1.6}>
                  Stop drowning in feedback, feature requests, and conflicting priorities. PM33's AI transforms chaos into clarity with strategic frameworks you can trust.
                </Text>
              </Stack>

              <SimpleGrid cols={{ base: 1, md: 3 }} spacing={48}>
                {[
                  {
                    icon: IconBrain,
                    title: 'Strategic Analysis AI',
                    description: 'Automatically analyze market opportunities, competitive threats, and product-market fit using proven frameworks like ICE scoring and Porter\'s Five Forces.',
                    color: 'blue'
                  },
                  {
                    icon: IconTarget,
                    title: 'Workflow Automation',
                    description: 'Transform scattered feedback into structured roadmaps. AI processes customer interviews, support tickets, and feature requests into actionable insights.',
                    color: 'green'
                  },
                  {
                    icon: IconTrendingUp,
                    title: 'Data Intelligence',
                    description: 'Connect fragmented data sources to uncover hidden patterns. Get predictive insights on feature performance and user behavior trends.',
                    color: 'orange'
                  }
                ].map((feature, index) => (
                  <Card 
                    key={index}
                    shadow="lg" 
                    radius="xl" 
                    p={32}
                    style={{ 
                      backgroundColor: 'white',
                      border: '1px solid var(--mantine-color-gray-2)',
                      height: '100%',
                      transition: 'all 0.3s ease'
                    }}
                    className="hover:shadow-xl hover:translate-y-[-4px]"
                  >
                    <Stack gap={24}>
                      <ThemeIcon 
                        size={64} 
                        variant="gradient" 
                        gradient={{ from: feature.color, to: `${feature.color}.7` }}
                      >
                        <feature.icon size={32} />
                      </ThemeIcon>
                      
                      <Stack gap={12}>
                        <Title order={3} size="h4" c="dark">
                          {feature.title}
                        </Title>
                        
                        <Text c="dimmed" lh={1.6}>
                          {feature.description}
                        </Text>
                      </Stack>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>

        {/* Key Features */}
        <Box py={96} style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4ff 100%)' }}>
          <Container size="xl">
            <Stack gap={64}>
              <Stack align="center" gap={24}>
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'cyan.1', to: 'blue.1' }}
                  c="blue.7"
                >
                  ⚡ Core Features
                </Badge>
                
                <Title 
                  order={2} 
                  size="h2"
                  ta="center"
                  maw={800}
                  lh={1.2}
                  c="dark"
                >
                  Everything You Need for Strategic Product Management
                </Title>
              </Stack>

              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32}>
                <Card shadow="lg" radius="xl" p={40} bg="white">
                  <Stack gap={24}>
                    <Group>
                      <ThemeIcon size={48} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                        <IconBolt size={24} />
                      </ThemeIcon>
                      <Title order={3} size="h3" c="dark">
                        AI Strategic Analysis
                      </Title>
                    </Group>
                    
                    <List spacing={12} icon={<IconCheck size={16} color="green" />}>
                      <List.Item>
                        <Text fw={500}>ICE & RICE Scoring Automation</Text>
                        <Text size="sm" c="dimmed">Automatically score features using Impact, Confidence, and Effort frameworks</Text>
                      </List.Item>
                      <List.Item>
                        <Text fw={500}>Competitive Intelligence</Text>
                        <Text size="sm" c="dimmed">Real-time analysis of competitor moves and market positioning</Text>
                      </List.Item>
                      <List.Item>
                        <Text fw={500}>Market Opportunity Assessment</Text>
                        <Text size="sm" c="dimmed">AI-powered evaluation of market trends and user behavior patterns</Text>
                      </List.Item>
                    </List>
                  </Stack>
                </Card>

                <Card shadow="lg" radius="xl" p={40} bg="white">
                  <Stack gap={24}>
                    <Group>
                      <ThemeIcon size={48} variant="gradient" gradient={{ from: 'cyan', to: 'blue' }}>
                        <IconUsers size={24} />
                      </ThemeIcon>
                      <Title order={3} size="h3" c="dark">
                        Workflow Intelligence
                      </Title>
                    </Group>
                    
                    <List spacing={12} icon={<IconCheck size={16} color="green" />}>
                      <List.Item>
                        <Text fw={500}>Feedback Processing Engine</Text>
                        <Text size="sm" c="dimmed">Transform customer interviews and support tickets into structured insights</Text>
                      </List.Item>
                      <List.Item>
                        <Text fw={500}>Automated PRD Generation</Text>
                        <Text size="sm" c="dimmed">Generate comprehensive Product Requirements Documents from brief descriptions</Text>
                      </List.Item>
                      <List.Item>
                        <Text fw={500}>Cross-Team Alignment</Text>
                        <Text size="sm" c="dimmed">Automatic stakeholder updates and progress synchronization</Text>
                      </List.Item>
                    </List>
                  </Stack>
                </Card>

                <Card shadow="lg" radius="xl" p={40} bg="white">
                  <Stack gap={24}>
                    <Group>
                      <ThemeIcon size={48} variant="gradient" gradient={{ from: 'teal', to: 'green' }}>
                        <IconTrendingUp size={24} />
                      </ThemeIcon>
                      <Title order={3} size="h3" c="dark">
                        Data Intelligence
                      </Title>
                    </Group>
                    
                    <List spacing={12} icon={<IconCheck size={16} color="green" />}>
                      <List.Item>
                        <Text fw={500}>Predictive Analytics</Text>
                        <Text size="sm" c="dimmed">Forecast feature adoption and user behavior patterns</Text>
                      </List.Item>
                      <List.Item>
                        <Text fw={500}>Performance Optimization</Text>
                        <Text size="sm" c="dimmed">Identify bottlenecks and optimization opportunities in real-time</Text>
                      </List.Item>
                      <List.Item>
                        <Text fw={500}>ROI Tracking</Text>
                        <Text size="sm" c="dimmed">Measure and optimize the business impact of product decisions</Text>
                      </List.Item>
                    </List>
                  </Stack>
                </Card>

                <Card shadow="lg" radius="xl" p={40} bg="white">
                  <Stack gap={24}>
                    <Group>
                      <ThemeIcon size={48} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                        <IconSparkles size={24} />
                      </ThemeIcon>
                      <Title order={3} size="h3" c="dark">
                        Strategic Command Center
                      </Title>
                    </Group>
                    
                    <List spacing={12} icon={<IconCheck size={16} color="green" />}>
                      <List.Item>
                        <Text fw={500}>Executive Dashboard</Text>
                        <Text size="sm" c="dimmed">High-level metrics and KPIs for strategic decision making</Text>
                      </List.Item>
                      <List.Item>
                        <Text fw={500}>Risk Assessment</Text>
                        <Text size="sm" c="dimmed">Proactive identification of product and market risks</Text>
                      </List.Item>
                      <List.Item>
                        <Text fw={500}>Strategic Recommendations</Text>
                        <Text size="sm" c="dimmed">AI-powered suggestions for product strategy and roadmap prioritization</Text>
                      </List.Item>
                    </List>
                  </Stack>
                </Card>
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box py={96} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Container size="md">
            <Card 
              shadow="xl" 
              radius="xl" 
              p={64}
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                textAlign: 'center'
              }}
            >
              <Stack align="center" gap={32}>
                <Stack align="center" gap={16}>
                  <Badge size="lg" color="indigo" variant="light">
                    🚀 Ready to Transform?
                  </Badge>
                  <Title order={2} size="h2" c="dark">
                    Start Your AI-Powered PM Journey Today
                  </Title>
                  <Text size="lg" c="dimmed" maw={500}>
                    Join 500+ product managers who've transformed their workflow with PM33's AI suite. Start your free trial and experience strategic intelligence in action.
                  </Text>
                </Stack>
                
                <Group gap={24}>
                  <Button
                    component={Link}
                    href="/pricing"
                    size="xl"
                    rightSection={<IconArrowRight size={20} />}
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      minWidth: 220,
                      fontWeight: 600
                    }}
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    component={Link}
                    href="/command-center-demo"
                    size="xl"
                    variant="outline"
                    color="dark"
                    rightSection={<IconSparkles size={20} />}
                    style={{ minWidth: 180 }}
                  >
                    See Demo
                  </Button>
                </Group>
                
                <Text size="sm" c="dimmed">
                  14-day free trial • No credit card required • Cancel anytime
                </Text>
              </Stack>
            </Card>
          </Container>
        </Box>

      </Box>
    </div>
  );
}