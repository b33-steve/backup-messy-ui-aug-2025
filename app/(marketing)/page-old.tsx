'use client';

import React from 'react';
import { Container, Grid, Card, Title, Text, Button, Group, Stack, Badge, SimpleGrid, Box, Center, Anchor, ThemeIcon } from '@mantine/core';
import { IconArrowRight, IconCheck, IconBolt, IconBrain, IconClock, IconTrendingUp, IconSparkles, IconTarget, IconUsers, IconBulb, IconCircleCheck } from '@tabler/icons-react';
import Link from 'next/link';
import Navigation from '../../components/marketing/Navigation';
import Footer from '../../components/marketing/Footer';

export default function HomePage() {
  return (
    <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <Navigation />

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

      {/* Solution Section */}
      <Box 
        py={96} 
        style={{ 
          background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4ff 100%)'
        }}
      >
        <Container size="xl">
          <Stack align="center" gap={48} mb={64}>
            <Badge 
              size="lg" 
              variant="gradient" 
              gradient={{ from: 'indigo.1', to: 'purple.1' }}
              c="indigo.7"
            >
              ✨ The PM33 Difference
            </Badge>
            
            <Stack align="center" gap={24}>
              <Title 
                order={2} 
                size="h2"
                ta="center"
                maw={800}
                lh={1.2}
              >
                Enhancement, Not Replacement
              </Title>
              <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6}>
                Stop forcing your team to abandon tools they love. Start making them smarter.
              </Text>
            </Stack>
          </Stack>

          <Grid gutter={32} mb={64}>
            {/* Traditional Approach */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card 
                shadow="xl" 
                radius="xl" 
                p={40}
                bg="white"
                h="100%"
                style={{ 
                  border: '1px solid var(--mantine-color-gray-2)',
                  transition: 'all 0.3s ease'
                }}
                className="hover:shadow-2xl"
              >
                <Group mb={24}>
                  <Text size="xl" style={{ fontSize: '32px' }}>❌</Text>
                  <Stack gap={4}>
                    <Text fw={700} size="lg" c="red.6">Traditional Approach</Text>
                    <Text size="sm" c="dimmed">The painful way everyone else does it</Text>
                  </Stack>
                </Group>
                
                <Title order={3} size="h4" mb={24}>Replace Everything</Title>
                
                <Stack gap={16}>
                  {[
                    { icon: "📦", text: "Migrate all your data and workflows", pain: "3-6 months" },
                    { icon: "📚", text: "Re-train your entire team on new tools", pain: "Weeks of training" },
                    { icon: "📉", text: "Lose months of productivity during transition", pain: "40% productivity drop" },
                    { icon: "💸", text: "Pay $25-74/user/month for 'comprehensive' platforms", pain: "$50K+ annually" }
                  ].map((item, index) => (
                    <Card 
                      key={index}
                      p={16}
                      bg="red.0"
                      radius="lg"
                      style={{ border: '1px solid var(--mantine-color-red-2)' }}
                    >
                      <Group align="flex-start" gap={12}>
                        <Text size="xl" style={{ fontSize: '20px' }}>{item.icon}</Text>
                        <Stack gap={4} style={{ flex: 1 }}>
                          <Text fw={500}>{item.text}</Text>
                          <Text size="sm" fw={600} c="red.6">{item.pain}</Text>
                        </Stack>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              </Card>
            </Grid.Col>

            {/* PM33 Approach */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card 
                shadow="xl" 
                radius="xl" 
                p={40}
                bg="white"
                h="100%"
                style={{ 
                  border: '1px solid var(--mantine-color-gray-2)',
                  transition: 'all 0.3s ease'
                }}
                className="hover:shadow-2xl"
              >
                <Group mb={24}>
                  <Text size="xl" style={{ fontSize: '32px' }}>✨</Text>
                  <Stack gap={4}>
                    <Text fw={700} size="lg" c="teal.6">PM33 Approach</Text>
                    <Text size="sm" c="dimmed">The smart way that actually works</Text>
                  </Stack>
                </Group>
                
                <Title order={3} size="h4" mb={24}>Supercharge What Works</Title>
                
                <Stack gap={16}>
                  {[
                    { icon: "🔗", text: "Plug into your existing tools (Jira, Monday, Asana)", benefit: "5-minute setup" },
                    { icon: "🤖", text: "AI brain analyzes everything across your current stack", benefit: "Instant insights" },
                    { icon: "⚡", text: "Automate strategic work while keeping familiar workflows", benefit: "Zero disruption" },
                    { icon: "🎯", text: "Pay for results, not seats - starting at $20/user", benefit: "60% cost savings" }
                  ].map((item, index) => (
                    <Card 
                      key={index}
                      p={16}
                      bg="teal.0"
                      radius="lg"
                      style={{ border: '1px solid var(--mantine-color-teal-2)' }}
                    >
                      <Group align="flex-start" gap={12}>
                        <Text size="xl" style={{ fontSize: '20px' }}>{item.icon}</Text>
                        <Stack gap={4} style={{ flex: 1 }}>
                          <Text fw={500}>{item.text}</Text>
                          <Text size="sm" fw={600} c="teal.6">{item.benefit}</Text>
                        </Stack>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
          
          {/* Results Comparison */}
          <Card 
            shadow="xl" 
            radius="xl" 
            p={40}
            bg="white"
            style={{ border: '1px solid var(--mantine-color-gray-2)' }}
          >
            <Stack align="center" gap={32} mb={32}>
              <Title order={3} size="h3" ta="center">
                The Results Speak for Themselves
              </Title>
              <Text c="dimmed" ta="center">
                Real data from 2,500+ product managers using PM33
              </Text>
            </Stack>
            
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32}>
              {[
                { metric: "40%", label: "More Features Shipped", description: "Without adding headcount" },
                { metric: "72h", label: "Time Saved Monthly", description: "Per product manager" },
                { metric: "<5min", label: "Average Setup Time", description: "From signup to insights" }
              ].map((stat, index) => (
                <Card 
                  key={index}
                  p={24}
                  ta="center"
                  bg="gradient-to-br"
                  style={{
                    background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
                    border: '1px solid var(--mantine-color-indigo-2)'
                  }}
                  radius="lg"
                >
                  <Text size="xl" fw={800} c="indigo.6" mb={8} style={{ fontSize: '40px' }}>
                    {stat.metric}
                  </Text>
                  <Text fw={600} size="lg" mb={4}>
                    {stat.label}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {stat.description}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          </Card>
        </Container>
      </Box>

      {/* Features Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full mb-6">
              🤖 AI-Powered Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How PM33's AI Transforms Your PM Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See exactly how AI eliminates the busywork that's keeping you from strategic thinking.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                icon: IconBrain,
                color: "from-purple-400 to-pink-400",
                bgColor: "from-purple-50 to-pink-50",
                borderColor: "border-purple-200",
                iconBg: "bg-gradient-to-r from-purple-500 to-pink-500",
                title: "Strategic Intelligence Layer",
                subtitle: "Turn scattered data into strategic insights",
                problem: "You have data scattered across tools but no unified insights",
                solution: "AI analyzes patterns across Jira tickets, Slack discussions, customer feedback, and market research to generate strategic recommendations",
                example: "Based on 847 support tickets and 23 customer interviews, AI recommends prioritizing mobile performance optimization - projected 34% reduction in churn",
                features: ["Cross-platform data analysis", "Predictive impact scoring", "Strategic recommendations", "Competitive intelligence"]
              },
              {
                icon: IconBolt,
                color: "from-cyan-400 to-blue-400",
                bgColor: "from-cyan-50 to-blue-50",
                borderColor: "border-cyan-200",
                iconBg: "bg-gradient-to-r from-cyan-500 to-blue-500",
                title: "Automated Documentation",
                subtitle: "From idea to complete PRD in minutes",
                problem: "Writing PRDs, user stories, and requirements takes hours",
                solution: "AI generates comprehensive documentation from brief descriptions, automatically formatted for your team's standards",
                example: "Input: 'Improve checkout flow' → Output: Complete PRD with user stories, acceptance criteria, technical requirements, and success metrics",
                features: ["Smart PRD generation", "User story creation", "Acceptance criteria", "Technical specifications"]
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} group-hover:${index % 2 === 0 ? 'rotate-2' : '-rotate-2'} transition-transform opacity-20`}></div>
                <div className="relative bg-white p-10 rounded-3xl shadow-xl border border-gray-200 h-full">
                  {/* Icon and Title */}
                  <div className="flex items-start mb-8">
                    <div className={`${feature.iconBg} p-4 rounded-2xl mr-6 shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-lg text-gray-600">{feature.subtitle}</p>
                    </div>
                  </div>
                  
                  {/* Problem/Solution Flow */}
                  <div className="space-y-6 mb-8">
                    <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                      <div className="text-red-600 font-bold text-sm mb-2 uppercase tracking-wide">The Problem</div>
                      <p className="text-gray-700 font-medium">{feature.problem}</p>
                    </div>
                    
                    <div className={`bg-gradient-to-r ${feature.bgColor} p-6 rounded-2xl border ${feature.borderColor}`}>
                      <div className="text-indigo-600 font-bold text-sm mb-2 uppercase tracking-wide">PM33 Solution</div>
                      <p className="text-gray-700 font-medium mb-4">{feature.solution}</p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {feature.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <IconCircleCheck className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Example */}
                  <div className="bg-gray-900 p-6 rounded-2xl">
                    <div className="text-emerald-400 font-bold text-xs mb-2 uppercase tracking-wide">Real Example</div>
                    <p className="text-gray-300 text-sm font-mono leading-relaxed">{feature.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Features Grid */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Plus Everything Else You Need</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: IconUsers, title: "Team Collaboration", description: "Real-time commenting and feedback" },
                { icon: IconTarget, title: "Impact Scoring", description: "AI-powered feature prioritization" },
                { icon: IconTrendingUp, title: "Performance Analytics", description: "Track what's actually working" },
                { icon: IconBulb, title: "Smart Insights", description: "Proactive recommendations" }
              ].map((item, index) => (
                <div key={index} className="group p-6 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="bg-white p-3 rounded-xl shadow-lg inline-block mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-6">
              🏆 Customer Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Real Results from PM Teams Using PM33
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Don't take our word for it. Here's what product teams are saying about their results.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote: "We shipped 40% more features without hiring additional PMs",
                detail: "PM33's AI handles all our routine documentation and analysis. Our PMs now spend 3x more time on customer research and strategic planning. Game-changer for our product velocity.",
                author: "Sarah Chen",
                title: "Head of Product at TechFlow",
                company: "Series B SaaS",
                avatar: "SC",
                bgColor: "from-purple-400 to-pink-400",
                metric: "40% more features",
                timeframe: "Without adding headcount"
              },
              {
                quote: "ROI paid for itself in the first month",
                detail: "The AI insights helped us identify our #1 churn driver within weeks. Fixing it reduced churn by 28%. PM33's cost became irrelevant compared to the revenue impact.",
                author: "Marcus Rodriguez",
                title: "VP Product at DataSync",
                company: "Growth-stage startup",
                avatar: "MR",
                bgColor: "from-cyan-400 to-blue-400",
                metric: "28% churn reduction",
                timeframe: "First month ROI"
              },
              {
                quote: "Finally, a tool that makes our existing stack smarter",
                detail: "We've tried 5 different PM platforms. PM33 is the first that enhanced our Jira workflow instead of forcing us to abandon it. Team adoption was instant.",
                author: "Jennifer Liu",
                title: "Senior PM at CloudOps",
                company: "Enterprise SaaS",
                avatar: "JL",
                bgColor: "from-emerald-400 to-teal-400",
                metric: "100% team adoption",
                timeframe: "Day one"
              }
            ].map((testimonial, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.bgColor} rounded-3xl transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} group-hover:${index % 2 === 0 ? 'rotate-2' : '-rotate-2'} transition-transform opacity-10`}></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-200 h-full">
                  {/* Quote Mark */}
                  <div className="text-4xl text-indigo-600 mb-4 font-serif">“</div>
                  
                  {/* Main Quote */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">{testimonial.quote}</h3>
                  
                  {/* Detail */}
                  <p className="text-gray-600 mb-6 leading-relaxed">{testimonial.detail}</p>
                  
                  {/* Metrics */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-200 mb-6">
                    <div className="text-2xl font-bold text-indigo-600">{testimonial.metric}</div>
                    <div className="text-sm text-gray-600">{testimonial.timeframe}</div>
                  </div>
                  
                  {/* Author */}
                  <div className="flex items-center pt-4 border-t border-gray-200">
                    <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.bgColor} rounded-full flex items-center justify-center text-white font-bold mr-4`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-gray-600 text-sm">{testimonial.title}</div>
                      <div className="text-gray-500 text-xs">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Company Logos */}
          <div className="text-center">
            <p className="text-gray-600 mb-8">Trusted by product teams at companies like:</p>
            <div className="flex flex-wrap justify-center items-center gap-8 grayscale opacity-60">
              {['TechFlow', 'DataSync', 'CloudOps', 'StartupX', 'ScaleUp', 'GrowthCo'].map((company, index) => (
                <div key={index} className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-200">
                  <div className="text-gray-800 font-semibold text-lg">{company}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-cyan-600"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md text-white text-sm font-semibold rounded-full mb-8">
            ✨ Transform Your PM Work Today
          </div>
          
          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">10x Your PM Productivity</span>?
          </h2>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-indigo-100 mb-12 leading-relaxed max-w-3xl mx-auto">
            Join <span className="font-bold text-cyan-300">2,500+ product teams</span> using PM33 to focus on strategy, not busywork.
          </p>
          
          {/* CTAs */}
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
          
          {/* Trust Signals */}
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
          
          {/* Final Message */}
          <p className="text-indigo-200 text-lg">
            Stop doing busywork. <span className="font-bold text-white">Start doing strategy.</span>
          </p>
        </div>
      </section>

      <Footer />
    </Box>
  )
}