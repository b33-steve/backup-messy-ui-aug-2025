'use client';

import React from 'react';
import { Container, Grid, Card, Title, Text, Button, Group, Stack, Badge, SimpleGrid, Box, Center, Anchor, ThemeIcon } from '@mantine/core';
import { IconArrowRight, IconCheck, IconBolt, IconBrain, IconClock, IconTrendingUp, IconSparkles, IconTarget, IconUsers, IconBulb, IconCircleCheck } from '@tabler/icons-react';
import Link from 'next/link';

export default function MarketingHomePage() {
  return (
    <div className="marketing-context">
      <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>

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
                        gradient={{ from: 'indigo', to: 'cyan' }}
                        style={{ display: 'block', marginTop: 8 }}
                      >
                        Make Them 10x Smarter
                      </Text>
                    </Title>
                    
                    <Text size="xl" c="dimmed" maw={500} lh={1.6}>
                      Transform Jira, Monday.com, and Asana into AI-powered strategic engines. 
                      <Text span fw={600} c="indigo.6">No migration headaches.</Text> Immediate productivity gains.
                    </Text>
                  </Stack>
                  
                  <Group gap={16}>
                    <Button 
                      component={Link}
                      href="/trial"
                      size="xl"
                      variant="gradient"
                      gradient={{ from: 'indigo', to: 'purple' }}
                      rightSection={<IconArrowRight size={20} />}
                      style={{ borderRadius: 16 }}
                    >
                      Start Free 14-Day Trial
                    </Button>
                    <Button 
                      component={Link}
                      href="/strategic-intelligence"
                      size="xl"
                      variant="outline"
                      c="indigo.7"
                      leftSection={<IconBulb size={20} />}
                      style={{ borderRadius: 16 }}
                    >
                      Try Live Demo
                    </Button>
                  </Group>
                  
                  <Group gap={24}>
                    <Group gap={8}>
                      <IconCheck size={16} color="var(--mantine-color-teal-6)" />
                      <Text size="sm" c="dimmed">No credit card required</Text>
                    </Group>
                    <Group gap={8}>
                      <IconCheck size={16} color="var(--mantine-color-teal-6)" />
                      <Text size="sm" c="dimmed">Setup in 5 minutes</Text>
                    </Group>
                  </Group>
                </Stack>
              </Grid.Col>
              
              {/* Right Column - Visual Element */}
              <Grid.Col span={{ base: 12, lg: 6 }}>
                <Box pos="relative">
                  <Card 
                    shadow="xl" 
                    radius="xl" 
                    p={32}
                    style={{ 
                      backgroundColor: 'white',
                      border: '1px solid var(--mantine-color-gray-2)'
                    }}
                  >
                    <Group mb={24}>
                      <ThemeIcon size={32} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                        <IconBrain size={18} />
                      </ThemeIcon>
                      <Text fw={600} size="lg">AI Strategy Assistant</Text>
                    </Group>
                    <Stack gap={16}>
                      <Card p={16} radius="lg" bg="indigo.0" style={{ border: '1px solid var(--mantine-color-indigo-2)' }}>
                        <Text size="sm" fw={600} c="indigo.6" mb={4}>Analysis Complete ✨</Text>
                        <Text size="sm" c="dimmed">Based on 847 support tickets, mobile performance optimization should be your #1 priority</Text>
                      </Card>
                      <Card p={16} radius="lg" bg="teal.0" style={{ border: '1px solid var(--mantine-color-teal-2)' }}>
                        <Text size="sm" fw={600} c="teal.6" mb={4}>Impact Prediction</Text>
                        <Text size="sm" c="dimmed">Projected 34% reduction in churn rate</Text>
                      </Card>
                      <Card p={16} radius="lg" bg="orange.0" style={{ border: '1px solid var(--mantine-color-orange-2)' }}>
                        <Text size="sm" fw={600} c="orange.6" mb={4}>PRD Generated</Text>
                        <Text size="sm" c="dimmed">Complete requirements doc ready for review</Text>
                      </Card>
                    </Stack>
                  </Card>
                  
                  {/* Floating Elements */}
                  <ThemeIcon 
                    size={56} 
                    variant="gradient" 
                    gradient={{ from: 'cyan', to: 'blue' }}
                    pos="absolute"
                    top={-16}
                    right={-16}
                    style={{ boxShadow: 'var(--mantine-shadow-lg)' }}
                  >
                    <IconTarget size={24} />
                  </ThemeIcon>
                  <ThemeIcon 
                    size={56} 
                    variant="gradient" 
                    gradient={{ from: 'teal', to: 'green' }}
                    pos="absolute"
                    bottom={-16}
                    left={-16}
                    style={{ boxShadow: 'var(--mantine-shadow-lg)' }}
                  >
                    <IconBrain size={24} />
                  </ThemeIcon>
                </Box>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>

        {/* Demo Navigation Section */}
        <Box py={64} bg="gradient-to-br from-indigo-50 via-white to-purple-50">
          <Container size="xl">
            <Stack align="center" gap={32} mb={48}>
              <Badge 
                size="xl" 
                variant="gradient" 
                gradient={{ from: 'indigo', to: 'cyan' }}
                leftSection={<IconSparkles size={18} />}
              >
                ✨ Live Demo Experience
              </Badge>
              
              <Stack align="center" gap={16}>
                <Title 
                  order={2} 
                  size="h2"
                  ta="center"
                  lh={1.2}
                >
                  See PM33 in Action
                </Title>
                <Text size="lg" c="dimmed" ta="center" maw={600} lh={1.6}>
                  Experience the full power of AI-driven product management. Try our live demo workflows.
                </Text>
              </Stack>
            </Stack>
            
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32}>
              {/* Strategic Intelligence Demo */}
              <Card 
                shadow="xl" 
                radius="xl" 
                p={32}
                component={Link}
                href="/strategic-intelligence"
                style={{ 
                  backgroundColor: 'white',
                  border: '1px solid var(--mantine-color-indigo-2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
                className="hover:shadow-2xl hover:translate-y-[-4px]"
              >
                <Group mb={20}>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                    <IconBrain size={24} />
                  </ThemeIcon>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Text fw={700} size="xl" c="dark">Strategic Intelligence Engine</Text>
                    <Badge color="green" variant="light" size="sm">✅ Ready to Try</Badge>
                  </Stack>
                </Group>
                <Text c="dimmed" mb={16} lh={1.6}>
                  Transform strategic questions into executable workflows with automated priority scoring and AI analysis
                </Text>
                <Group justify="space-between">
                  <Stack gap={4}>
                    <Text size="sm" fw={500} c="indigo.6">✨ Multi-framework analysis</Text>
                    <Text size="sm" fw={500} c="indigo.6">🎯 Confidence-scored recommendations</Text>
                    <Text size="sm" fw={500} c="indigo.6">⚡ Predictive outcome modeling</Text>
                  </Stack>
                  <Button 
                    variant="light"
                    size="sm"
                    rightSection={<IconArrowRight size={16} />}
                  >
                    Try Now
                  </Button>
                </Group>
              </Card>

              {/* Command Center Demo */}
              <Card 
                shadow="xl" 
                radius="xl" 
                p={32}
                component={Link}
                href="/command-center"
                style={{ 
                  backgroundColor: 'white',
                  border: '1px solid var(--mantine-color-cyan-2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
                className="hover:shadow-2xl hover:translate-y-[-4px]"
              >
                <Group mb={20}>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'cyan', to: 'blue' }}>
                    <IconTarget size={24} />
                  </ThemeIcon>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Text fw={700} size="xl" c="dark">Strategic Command Center</Text>
                    <Badge color="green" variant="light" size="sm">✅ Ready to Try</Badge>
                  </Stack>
                </Group>
                <Text c="dimmed" mb={16} lh={1.6}>
                  Real-time orchestration of 4 specialized AI teams transforming PM workflows with live metrics
                </Text>
                <Group justify="space-between">
                  <Stack gap={4}>
                    <Text size="sm" fw={500} c="cyan.6">🤖 4 AI teams coordination</Text>
                    <Text size="sm" fw={500} c="cyan.6">📊 Real-time strategic metrics</Text>
                    <Text size="sm" fw={500} c="cyan.6">🔄 End-to-end workflow automation</Text>
                  </Stack>
                  <Button 
                    variant="light"
                    size="sm"
                    rightSection={<IconArrowRight size={16} />}
                  >
                    Try Now
                  </Button>
                </Group>
              </Card>
            </SimpleGrid>
            
            {/* Coming Soon Features */}
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32} mt={32}>
              <Card 
                shadow="md" 
                radius="xl" 
                p={32}
                style={{ 
                  backgroundColor: 'white',
                  border: '1px solid var(--mantine-color-gray-2)',
                  opacity: 0.7
                }}
              >
                <Group mb={20}>
                  <ThemeIcon size={48} variant="light" color="gray">
                    <IconTrendingUp size={24} />
                  </ThemeIcon>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Text fw={700} size="xl" c="dark">Resource Optimizer</Text>
                    <Badge color="orange" variant="light" size="sm">🚧 Coming Soon</Badge>
                  </Stack>
                </Group>
                <Text c="dimmed" mb={16} lh={1.6}>
                  AI-powered resource allocation and team capacity optimization across your entire product portfolio
                </Text>
                <Text size="sm" c="dimmed">Available in Phase 2 release</Text>
              </Card>

              <Card 
                shadow="md" 
                radius="xl" 
                p={32}
                style={{ 
                  backgroundColor: 'white',
                  border: '1px solid var(--mantine-color-gray-2)',
                  opacity: 0.7
                }}
              >
                <Group mb={20}>
                  <ThemeIcon size={48} variant="light" color="gray">
                    <IconUsers size={24} />
                  </ThemeIcon>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Text fw={700} size="xl" c="dark">Strategic Dashboard</Text>
                    <Badge color="orange" variant="light" size="sm">🚧 Coming Soon</Badge>
                  </Stack>
                </Group>
                <Text c="dimmed" mb={16} lh={1.6}>
                  Executive-level strategic insights with competitive intelligence and predictive market analysis
                </Text>
                <Text size="sm" c="dimmed">Available in Phase 2 release</Text>
              </Card>
            </SimpleGrid>
          </Container>
        </Box>

        {/* Problem Section */}
        <Box py={96} bg="white">
          <Container size="xl">
            <Stack align="center" gap={48} mb={64}>
              <Badge 
                size="lg" 
                variant="filled" 
                color="red.1"
                c="red.7"
              >
                ⚠️ The Reality Check
              </Badge>
              
              <Stack align="center" gap={24}>
                <Title 
                  order={2} 
                  size="h2"
                  ta="center"
                  maw={800}
                  lh={1.2}
                >
                  The Problem Every Product Manager Faces
                </Title>
                <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6}>
                  You're drowning in admin work. <Text span fw={600} c="red.6">60-80% of your time</Text> goes to busywork instead of strategy.
                </Text>
              </Stack>
            </Stack>
            
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32} mb={64}>
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
                    radius="xl"
                    p={32}
                    pos="relative"
                    bg="red.0"
                    style={{ 
                      border: '1px solid var(--mantine-color-red-2)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    className="hover:shadow-xl hover:translate-y-[-4px]"
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
                    <IconComponent size={40} color="var(--mantine-color-red-6)" style={{ marginBottom: 24 }} />
                    <Title order={3} size="h4" mb={12}>
                      {item.title}
                    </Title>
                    <Text c="dimmed" lh={1.6}>
                      {item.description}
                    </Text>
                  </Card>
                );
              })}
            </SimpleGrid>

            <Center>
              <Card 
                shadow="xl" 
                radius="xl" 
                p={40}
                bg="orange.0"
                style={{ 
                  border: '2px solid var(--mantine-color-orange-2)',
                  maxWidth: 800
                }}
              >
                <Stack align="center" gap={24}>
                  <Text size="xl" style={{ fontSize: '64px' }}>⏰</Text>
                  <Title order={3} size="h3" ta="center" lh={1.3}>
                    Meanwhile, your competitors are shipping <Text span c="indigo.6">40% faster</Text> because their PMs focus on strategy, not busywork.
                  </Title>
                  <Text size="lg" c="dimmed" ta="center">
                    While you're writing docs, they're analyzing market opportunities.
                  </Text>
                </Stack>
              </Card>
            </Center>
          </Container>
        </Box>

        {/* CTA Section */}
        <section className="relative px-6 py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-cyan-600"></div>
          
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md text-white text-sm font-semibold rounded-full mb-8">
              ✨ Transform Your PM Work Today
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Ready to <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">10x Your PM Productivity</span>?
            </h2>
            
            <p className="text-xl md:text-2xl text-indigo-100 mb-12 leading-relaxed max-w-3xl mx-auto">
              Join <span className="font-bold text-cyan-300">2,500+ product teams</span> using PM33 to focus on strategy, not busywork.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link 
                href="/trial"
                className="group bg-white text-indigo-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-indigo-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:scale-105 flex items-center justify-center"
              >
                Start Your Free 14-Day Trial
                <IconArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/strategic-intelligence"
                className="group border-2 border-white/30 backdrop-blur-md text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center"
              >
                <IconBulb className="mr-3 h-6 w-6" />
                Try Strategic Intelligence
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {[
                { icon: IconCheck, text: "No credit card required" },
                { icon: IconBolt, text: "5-minute setup" },
                { icon: IconUsers, text: "Cancel anytime" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center text-indigo-100">
                  <item.icon className="w-5 h-5 mr-3 text-emerald-300" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
            
            <p className="text-indigo-200 text-lg">
              Stop doing busywork. <span className="font-bold text-white">Start doing strategy.</span>
            </p>
          </div>
        </section>

      </Box>
    </div>
  );
}