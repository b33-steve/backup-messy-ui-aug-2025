'use client';

import React from 'react';
import { Container, Grid, Card, Title, Text, Button, Group, Stack, Badge, SimpleGrid, Box, Center, ThemeIcon } from '@mantine/core';
import { IconArrowRight, IconCheck, IconBolt, IconBrain, IconClock, IconTrendingUp, IconSparkles, IconTarget, IconUsers, IconBulb, IconCircleCheck } from '@tabler/icons-react';
import Link from 'next/link';
// Temporarily removed broken imports - will be fixed in next deployment
// import Navigation from '../components/Navigation';  
// import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <Box>
      {/* <Navigation /> */}

      {/* Hero Section - Clean, Professional, Inspired by Linear/Stripe */}
      <Box 
        py={120}
        style={{ 
          background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 100%)',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <Container size={1200}>
          <Stack align="center" gap={48}>
            <Badge 
              size="lg" 
              variant="light" 
              color="indigo"
              leftSection={<IconSparkles size={16} />}
            >
              Trusted by 2,500+ Product Managers
            </Badge>
            
            <Stack align="center" gap={24} maw={800}>
              <Title 
                order={1} 
                size="h1"
                ta="center"
                fw={700}
                lh={1.1}
                style={{ fontSize: '64px', letterSpacing: '-0.02em' }}
              >
                Don't Replace Your PM Tools—
                <Text 
                  span 
                  variant="gradient" 
                  gradient={{ from: 'indigo', to: 'cyan' }}
                  style={{ display: 'block', marginTop: 12 }}
                >
                  Make Them 10x Smarter
                </Text>
              </Title>
              
              <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6} style={{ fontSize: '22px' }}>
                Transform Jira, Monday.com, and Asana into AI-powered strategic engines. 
                <Text span fw={600} c="indigo.6"> No migration headaches.</Text> Immediate productivity gains.
              </Text>
            </Stack>
            
            <Group gap={24}>
              <Button 
                component={Link}
                href="/trial"
                size="xl"
                h={56}
                px={32}
                variant="gradient"
                gradient={{ from: 'indigo', to: 'purple' }}
                rightSection={<IconArrowRight size={20} />}
                style={{ borderRadius: 12, fontSize: '16px', fontWeight: 600 }}
              >
                Start Free 14-Day Trial
              </Button>
              <Button 
                component={Link}
                href="/strategic-intelligence"
                size="xl"
                h={56}
                px={32}
                variant="outline"
                color="indigo"
                leftSection={<IconBulb size={20} />}
                style={{ borderRadius: 12, fontSize: '16px', fontWeight: 600 }}
              >
                Try Live Demo
              </Button>
            </Group>
            
            <Group gap={40}>
              <Group gap={12}>
                <IconCheck size={18} color="var(--mantine-color-teal-6)" />
                <Text size="sm" c="dimmed" fw={500}>No credit card required</Text>
              </Group>
              <Group gap={12}>
                <IconCheck size={18} color="var(--mantine-color-teal-6)" />
                <Text size="sm" c="dimmed" fw={500}>Setup in 5 minutes</Text>
              </Group>
              <Group gap={12}>
                <IconCheck size={18} color="var(--mantine-color-teal-6)" />
                <Text size="sm" c="dimmed" fw={500}>Cancel anytime</Text>
              </Group>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* Demo Section - Clean Cards */}
      <Box py={96} bg="white">
        <Container size={1200}>
          <Stack align="center" gap={64}>
            <Stack align="center" gap={24} maw={700}>
              <Badge size="lg" color="indigo" variant="light">
                ✨ Live Demo Experience
              </Badge>
              <Title order={2} size="h2" ta="center" fw={700} style={{ fontSize: '48px' }}>
                See PM33 in Action
              </Title>
              <Text size="lg" c="dimmed" ta="center" lh={1.6}>
                Experience the full power of AI-driven product management with our interactive demo workflows.
              </Text>
            </Stack>
            
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32} w="100%">
              {/* Strategic Intelligence Demo */}
              <Card 
                shadow="lg" 
                radius={16}
                p={40}
                component={Link}
                href="/strategic-intelligence"
                style={{ 
                  backgroundColor: 'white',
                  border: '1px solid var(--mantine-color-gray-2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  height: '100%'
                }}
                className="hover:shadow-2xl hover:translate-y-[-4px]"
              >
                <Stack gap={24}>
                  <Group>
                    <ThemeIcon size={56} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }} radius={12}>
                      <IconBrain size={28} />
                    </ThemeIcon>
                    <Stack gap={4} style={{ flex: 1 }}>
                      <Text fw={700} size="xl">Strategic Intelligence Engine</Text>
                      <Badge color="green" variant="light" size="sm">✅ Ready to Try</Badge>
                    </Stack>
                  </Group>
                  
                  <Text c="dimmed" lh={1.6} size="md">
                    Transform strategic questions into executable workflows with automated priority scoring and AI analysis
                  </Text>
                  
                  <Stack gap={12}>
                    <Group gap={8}>
                      <IconCheck size={16} color="var(--mantine-color-indigo-6)" />
                      <Text size="sm" fw={500} c="indigo.6">Multi-framework analysis</Text>
                    </Group>
                    <Group gap={8}>
                      <IconCheck size={16} color="var(--mantine-color-indigo-6)" />
                      <Text size="sm" fw={500} c="indigo.6">Confidence-scored recommendations</Text>
                    </Group>
                    <Group gap={8}>
                      <IconCheck size={16} color="var(--mantine-color-indigo-6)" />
                      <Text size="sm" fw={500} c="indigo.6">Predictive outcome modeling</Text>
                    </Group>
                  </Stack>
                  
                  <Button 
                    variant="light"
                    fullWidth
                    rightSection={<IconArrowRight size={16} />}
                    style={{ marginTop: 'auto' }}
                  >
                    Try Strategic Intelligence
                  </Button>
                </Stack>
              </Card>

              {/* Command Center Demo */}
              <Card 
                shadow="lg" 
                radius={16}
                p={40}
                component={Link}
                href="/command-center"
                style={{ 
                  backgroundColor: 'white',
                  border: '1px solid var(--mantine-color-gray-2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  height: '100%'
                }}
                className="hover:shadow-2xl hover:translate-y-[-4px]"
              >
                <Stack gap={24}>
                  <Group>
                    <ThemeIcon size={56} variant="gradient" gradient={{ from: 'cyan', to: 'blue' }} radius={12}>
                      <IconTarget size={28} />
                    </ThemeIcon>
                    <Stack gap={4} style={{ flex: 1 }}>
                      <Text fw={700} size="xl">Strategic Command Center</Text>
                      <Badge color="green" variant="light" size="sm">✅ Ready to Try</Badge>
                    </Stack>
                  </Group>
                  
                  <Text c="dimmed" lh={1.6} size="md">
                    Real-time orchestration of 4 specialized AI teams transforming PM workflows with live metrics
                  </Text>
                  
                  <Stack gap={12}>
                    <Group gap={8}>
                      <IconCheck size={16} color="var(--mantine-color-cyan-6)" />
                      <Text size="sm" fw={500} c="cyan.6">4 AI teams coordination</Text>
                    </Group>
                    <Group gap={8}>
                      <IconCheck size={16} color="var(--mantine-color-cyan-6)" />
                      <Text size="sm" fw={500} c="cyan.6">Real-time strategic metrics</Text>
                    </Group>
                    <Group gap={8}>
                      <IconCheck size={16} color="var(--mantine-color-cyan-6)" />
                      <Text size="sm" fw={500} c="cyan.6">End-to-end workflow automation</Text>
                    </Group>
                  </Stack>
                  
                  <Button 
                    variant="light"
                    color="cyan"
                    fullWidth
                    rightSection={<IconArrowRight size={16} />}
                    style={{ marginTop: 'auto' }}
                  >
                    Try Command Center
                  </Button>
                </Stack>
              </Card>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Problem Section - Professional Layout */}
      <Box py={96} bg="gray.0">
        <Container size={1200}>
          <Stack align="center" gap={64}>
            <Stack align="center" gap={24} maw={700}>
              <Badge size="lg" color="red" variant="light">
                ⚠️ The Reality Check
              </Badge>
              <Title order={2} size="h2" ta="center" fw={700} style={{ fontSize: '48px' }}>
                The Problem Every Product Manager Faces
              </Title>
              <Text size="lg" c="dimmed" ta="center" lh={1.6}>
                You're drowning in admin work. <Text span fw={600} c="red.6">60-80% of your time</Text> goes to busywork instead of strategy.
              </Text>
            </Stack>
            
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32} w="100%">
              {[
                { 
                  icon: IconClock, 
                  title: "Writing PRDs manually", 
                  description: "4 hours per document",
                  stat: "32 hours/month"
                },
                { 
                  icon: IconTrendingUp, 
                  title: "Synthesizing feedback", 
                  description: "Scattered across tools",
                  stat: "24 hours/month"
                },
                { 
                  icon: IconBrain, 
                  title: "Creating presentations", 
                  description: "From scratch every time",
                  stat: "16 hours/month"
                }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card 
                    key={index}
                    shadow="md"
                    radius={16}
                    p={32}
                    bg="white"
                    style={{ 
                      border: '1px solid var(--mantine-color-red-2)',
                      position: 'relative'
                    }}
                  >
                    <Badge 
                      pos="absolute"
                      top={16}
                      right={16}
                      size="sm"
                      color="red"
                      variant="filled"
                    >
                      {item.stat}
                    </Badge>
                    
                    <Stack gap={24}>
                      <ThemeIcon size={48} color="red" variant="light" radius={12}>
                        <IconComponent size={24} />
                      </ThemeIcon>
                      
                      <Stack gap={12}>
                        <Title order={3} size="h4" fw={600}>
                          {item.title}
                        </Title>
                        <Text c="dimmed" lh={1.6}>
                          {item.description}
                        </Text>
                      </Stack>
                    </Stack>
                  </Card>
                );
              })}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Social Proof */}
      <Box py={96} bg="white">
        <Container size={1200}>
          <Stack align="center" gap={64}>
            <Stack align="center" gap={24} maw={700}>
              <Badge size="lg" color="green" variant="light">
                🏆 Customer Success Stories
              </Badge>
              <Title order={2} size="h2" ta="center" fw={700} style={{ fontSize: '48px' }}>
                Real Results from PM Teams
              </Title>
            </Stack>
            
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32} w="100%">
              {[
                {
                  metric: "40%",
                  label: "More Features Shipped",
                  description: "Without adding headcount",
                  author: "Sarah Chen, Head of Product",
                  company: "TechFlow (Series B)"
                },
                {
                  metric: "72h", 
                  label: "Time Saved Monthly",
                  description: "Per product manager",
                  author: "Marcus Rodriguez, VP Product",
                  company: "DataSync (Growth-stage)"
                },
                {
                  metric: "<5min",
                  label: "Average Setup Time", 
                  description: "From signup to insights",
                  author: "Jennifer Liu, Senior PM",
                  company: "CloudOps (Enterprise)"
                }
              ].map((stat, index) => (
                <Card 
                  key={index}
                  p={32}
                  radius={16}
                  shadow="md"
                  bg="white"
                  style={{ border: '1px solid var(--mantine-color-gray-2)' }}
                >
                  <Stack gap={24}>
                    <Text size="xl" fw={800} c="indigo.6" style={{ fontSize: '48px' }}>
                      {stat.metric}
                    </Text>
                    <Stack gap={8}>
                      <Text fw={600} size="lg">
                        {stat.label}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {stat.description}
                      </Text>
                    </Stack>
                    <Box pt={16} style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
                      <Text size="sm" fw={600}>{stat.author}</Text>
                      <Text size="xs" c="dimmed">{stat.company}</Text>
                    </Box>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        py={120}
        style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Container size={1200}>
          <Stack align="center" gap={48}>
            <Badge size="lg" color="white" variant="light">
              ✨ Transform Your PM Work Today
            </Badge>
            
            <Stack align="center" gap={24} maw={700}>
              <Title order={2} size="h1" ta="center" c="white" fw={700} style={{ fontSize: '56px' }}>
                Ready to 10x Your PM Productivity?
              </Title>
              <Text size="xl" c="rgba(255, 255, 255, 0.9)" ta="center" lh={1.6}>
                Join 2,500+ product teams using PM33 to focus on strategy, not busywork.
              </Text>
            </Stack>
            
            <Group gap={24}>
              <Button
                component={Link}
                href="/trial"
                size="xl"
                h={56}
                px={32}
                color="white"
                variant="white"
                c="indigo"
                rightSection={<IconArrowRight size={20} />}
                style={{ borderRadius: 12, fontSize: '16px', fontWeight: 600 }}
              >
                Start Your Free 14-Day Trial
              </Button>
              <Button
                component={Link}
                href="/strategic-intelligence" 
                size="xl"
                h={56}
                px={32}
                variant="outline"
                color="white"
                leftSection={<IconBulb size={20} />}
                style={{ borderRadius: 12, fontSize: '16px', fontWeight: 600 }}
              >
                Try Strategic Intelligence
              </Button>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* <Footer /> */}
    </Box>
  )
}