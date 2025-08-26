'use client';

import React from 'react';
import { Container, Card, Title, Text, Button, Stack, Badge, Group, Box, Divider, List, ThemeIcon, SimpleGrid, Anchor } from '@mantine/core';
import { IconArrowRight, IconCheck, IconBrain, IconTarget, IconTrendingUp, IconUsers, IconClock, IconBolt, IconSparkles, IconBookmark } from '@tabler/icons-react';
import Link from 'next/link';

export default function AIProjectManagementSoftwareGuidePage() {
  return (
    <Box py={80} style={{ backgroundColor: 'var(--marketing-bg-primary)' }}>
      <Container size="lg">
        {/* Article Header */}
        <Stack align="center" gap={32} mb={64}>
          <Badge size="lg" variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
            Comprehensive Analysis
          </Badge>
          
          <Stack align="center" gap={16}>
            <Title order={1} size="h1" ta="center" lh={1.2} maw={900}>
              AI Project Management Software: The Complete 2025 Guide
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              Traditional PM vs AI-Enhanced Approaches Analyzed
            </Text>
          </Stack>

          <Group gap={24}>
            <Text size="sm" c="dimmed">12-minute read</Text>
            <Text size="sm" c="dimmed">•</Text>
            <Text size="sm" c="dimmed">Last updated: January 2025</Text>
          </Group>
        </Stack>

        {/* Key Stats */}
        <Card shadow="lg" radius="xl" p={40} mb={48} style={{ border: '2px solid var(--marketing-primary)' }}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32}>
            <Stack align="center" gap={8}>
              <Text size="32px" fw={900} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                $14.11B
              </Text>
              <Text ta="center" c="dimmed" size="sm">Projected AI PM market by 2030</Text>
            </Stack>
            <Stack align="center" gap={8}>
              <Text size="32px" fw={900} variant="gradient" gradient={{ from: 'teal', to: 'cyan' }}>
                92%
              </Text>
              <Text ta="center" c="dimmed" size="sm">Fortune 500 companies adopting AI</Text>
            </Stack>
            <Stack align="center" gap={8}>
              <Text size="32px" fw={900} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                21.6%
              </Text>
              <Text ta="center" c="dimmed" size="sm">CAGR growth rate (2024-2030)</Text>
            </Stack>
          </SimpleGrid>
        </Card>

        {/* Table of Contents */}
        <Card shadow="md" radius="xl" p={32} mb={48} bg="gray.0">
          <Title order={3} size="h4" mb={16}>Table of Contents</Title>
          <List spacing="xs" size="sm">
            <List.Item><Anchor href="#understanding-ai" c="indigo.6">Understanding AI in Project Management</Anchor></List.Item>
            <List.Item><Anchor href="#market-landscape" c="indigo.6">Market Landscape: AI-First vs Traditional+AI</Anchor></List.Item>
            <List.Item><Anchor href="#platform-analysis" c="indigo.6">Complete Platform Analysis</Anchor></List.Item>
            <List.Item><Anchor href="#implementation-approaches" c="indigo.6">Implementation Approaches Compared</Anchor></List.Item>
            <List.Item><Anchor href="#roi-analysis" c="indigo.6">ROI Analysis & Productivity Metrics</Anchor></List.Item>
            <List.Item><Anchor href="#decision-framework" c="indigo.6">Decision Framework</Anchor></List.Item>
            <List.Item><Anchor href="#future-trends" c="indigo.6">Future Trends</Anchor></List.Item>
          </List>
        </Card>

        {/* Article Content */}
        <Stack gap={48}>
          {/* Understanding AI in PM */}
          <Stack gap={24} id="understanding-ai">
            <Title order={2} size="h2">Understanding AI in Project Management</Title>
            
            <Text size="lg" lh={1.6}>
              AI project management isn't about robots running your sprints. It's about intelligent automation 
              that handles the busywork so PMs can focus on strategy. Here's what AI excels at:
            </Text>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={24}>
              <Card p={24} radius="lg" bg="indigo.0" style={{ border: '1px solid var(--mantine-color-indigo-2)' }}>
                <Stack gap={12}>
                  <Text fw={600} c="indigo.7">Document Generation</Text>
                  <Text size="sm" c="dimmed">Transform brief descriptions into comprehensive PRDs, user stories, and technical requirements</Text>
                </Stack>
              </Card>

              <Card p={24} radius="lg" bg="teal.0" style={{ border: '1px solid var(--mantine-color-teal-2)' }}>
                <Stack gap={12}>
                  <Text fw={600} c="teal.7">Data Synthesis</Text>
                  <Text size="sm" c="dimmed">Analyze scattered feedback, support tickets, and user research to extract actionable insights</Text>
                </Stack>
              </Card>

              <Card p={24} radius="lg" bg="orange.0" style={{ border: '1px solid var(--mantine-color-orange-2)' }}>
                <Stack gap={12}>
                  <Text fw={600} c="orange.7">Predictive Planning</Text>
                  <Text size="sm" c="dimmed">Forecast project timelines, resource needs, and potential risks based on historical patterns</Text>
                </Stack>
              </Card>

              <Card p={24} radius="lg" bg="purple.0" style={{ border: '1px solid var(--mantine-color-purple-2)' }}>
                <Stack gap={12}>
                  <Text fw={600} c="purple.7">Intelligent Prioritization</Text>
                  <Text size="sm" c="dimmed">Score features using customer impact, business value, development effort, and strategic alignment</Text>
                </Stack>
              </Card>
            </SimpleGrid>
          </Stack>

          <Divider size="md" />

          {/* The Three Approaches */}
          <Stack gap={24}>
            <Title order={3} size="h3">The Three Approaches to AI in PM</Title>
            
            <Stack gap={20}>
              {/* Replace Everything */}
              <Card p={32} radius="lg" bg="red.0" style={{ border: '2px solid var(--mantine-color-red-2)' }}>
                <Stack gap={16}>
                  <Group>
                    <Text size="lg" fw={700} c="red.7">1. Replace Everything (Traditional AI PM Platforms)</Text>
                  </Group>
                  <Text c="dimmed">Migrate entire workflow to new AI-powered platform</Text>
                  <Group gap={32}>
                    <Stack gap={4}>
                      <Text size="sm" fw={600} c="green.7">Pros:</Text>
                      <Text size="sm" c="dimmed">• Comprehensive feature set</Text>
                      <Text size="sm" c="dimmed">• Unified interface</Text>
                    </Stack>
                    <Stack gap={4}>
                      <Text size="sm" fw={600} c="red.7">Cons:</Text>
                      <Text size="sm" c="dimmed">• Months of migration</Text>
                      <Text size="sm" c="dimmed">• Team retraining required</Text>
                      <Text size="sm" c="dimmed">• Productivity loss during transition</Text>
                    </Stack>
                  </Group>
                  <Text size="sm" c="dimmed" fw={500}>Examples: Notion AI, ClickUp AI, Monday.com AI</Text>
                </Stack>
              </Card>

              {/* Add AI Features */}
              <Card p={32} radius="lg" bg="yellow.0" style={{ border: '2px solid var(--mantine-color-yellow-2)' }}>
                <Stack gap={16}>
                  <Group>
                    <Text size="lg" fw={700} c="yellow.8">2. Add AI Features (Traditional Tools + AI)</Text>
                  </Group>
                  <Text c="dimmed">Your current PM tool adds AI capabilities</Text>
                  <Group gap={32}>
                    <Stack gap={4}>
                      <Text size="sm" fw={600} c="green.7">Pros:</Text>
                      <Text size="sm" c="dimmed">• Familiar interface</Text>
                      <Text size="sm" c="dimmed">• Incremental adoption</Text>
                    </Stack>
                    <Stack gap={4}>
                      <Text size="sm" fw={600} c="red.7">Cons:</Text>
                      <Text size="sm" c="dimmed">• Limited AI integration</Text>
                      <Text size="sm" c="dimmed">• Bolt-on feel</Text>
                      <Text size="sm" c="dimmed">• Feature gaps</Text>
                    </Stack>
                  </Group>
                  <Text size="sm" c="dimmed" fw={500}>Examples: Productboard AI, Jira Intelligence, Asana AI</Text>
                </Stack>
              </Card>

              {/* PM33 Approach */}
              <Card p={32} radius="lg" bg="teal.0" style={{ border: '2px solid var(--mantine-color-teal-2)' }}>
                <Stack gap={16}>
                  <Group>
                    <Text size="lg" fw={700} c="teal.7">3. AI Enhancement Layer (PM33 Approach)</Text>
                  </Group>
                  <Text c="dimmed">AI brain connects to existing tools without replacing them</Text>
                  <Group gap={32}>
                    <Stack gap={4}>
                      <Text size="sm" fw={600} c="green.7">Pros:</Text>
                      <Text size="sm" c="dimmed">• No migration required</Text>
                      <Text size="sm" c="dimmed">• Immediate productivity gains</Text>
                      <Text size="sm" c="dimmed">• Strategic focus maintained</Text>
                    </Stack>
                    <Stack gap={4}>
                      <Text size="sm" fw={600} c="yellow.8">Cons:</Text>
                      <Text size="sm" c="dimmed">• Newer approach</Text>
                      <Text size="sm" c="dimmed">• Requires integration setup</Text>
                    </Stack>
                  </Group>
                  <Text size="sm" c="dimmed" fw={500}>Example: PM33 integrates with Jira, Monday, Asana, Slack</Text>
                </Stack>
              </Card>
            </Stack>
          </Stack>

          <Divider size="md" />

          {/* Market Landscape */}
          <Stack gap={24} id="market-landscape">
            <Title order={2} size="h2">Market Landscape: AI-First vs Traditional+AI</Title>
            
            <Title order={3} size="h4">Pure AI-First PM Platforms</Title>
            
            {/* PM33 Platform Card */}
            <Card shadow="lg" radius="xl" p={32} style={{ border: '2px solid var(--marketing-primary)' }}>
              <Stack gap={20}>
                <Group>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                    <IconBrain size={24} />
                  </ThemeIcon>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Title order={4} size="h4" c="indigo.7">PM33: The AI Brain for Existing Tools</Title>
                    <Badge variant="filled" color="indigo" size="sm">FEATURED</Badge>
                  </Stack>
                </Group>
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing={20}>
                  <Stack gap={8}>
                    <Text size="sm" fw={600}>Approach:</Text>
                    <Text size="sm" c="dimmed">Enhancement layer that supercharges current tools</Text>
                    <Text size="sm" fw={600}>Core Strength:</Text>
                    <Text size="sm" c="dimmed">Cross-platform intelligence and strategic insights</Text>
                  </Stack>
                  <Stack gap={8}>
                    <Text size="sm" fw={600}>Pricing:</Text>
                    <Text size="sm" c="dimmed">$20-30/user/month, usage-based</Text>
                    <Text size="sm" fw={600}>Best For:</Text>
                    <Text size="sm" c="dimmed">Teams wanting AI enhancement without workflow disruption</Text>
                  </Stack>
                </SimpleGrid>
              </Stack>
            </Card>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={24}>
              {/* ChatPRD */}
              <Card p={24} radius="lg" style={{ border: '1px solid var(--mantine-color-gray-3)' }}>
                <Stack gap={12}>
                  <Title order={5} size="h6">ChatPRD: AI-Powered Documentation</Title>
                  <Text size="xs" c="dimmed">$29/user/month</Text>
                  <Text size="sm" c="dimmed">Specialized AI for product requirement documents</Text>
                  <Text size="xs" fw={500} c="teal.6">Best for: Documentation-heavy teams</Text>
                </Stack>
              </Card>

              {/* Zeda.io */}
              <Card p={24} radius="lg" style={{ border: '1px solid var(--mantine-color-gray-3)' }}>
                <Stack gap={12}>
                  <Title order={5} size="h6">Zeda.io: Voice of Customer AI</Title>
                  <Text size="xs" c="dimmed">$25/user/month</Text>
                  <Text size="sm" c="dimmed">Customer feedback analysis and product discovery</Text>
                  <Text size="xs" fw={500} c="teal.6">Best for: Customer-centric feedback analysis</Text>
                </Stack>
              </Card>
            </SimpleGrid>
          </Stack>
        </Stack>

        {/* Implementation Reality Comparison */}
        <Box mt={64}>
          <Title order={2} ta="center" mb={32}>Implementation Reality Check</Title>
          <SimpleGrid cols={{ base: 1, lg: 3 }} spacing={24} mb={48}>
            <Card p={24} radius="lg" bg="red.0" style={{ border: '1px solid var(--mantine-color-red-3)' }}>
              <Stack gap={16} ta="center">
                <Title order={4} size="h5" c="red.7">Replace Everything</Title>
                <Stack gap={8}>
                  <Text size="sm"><Text span fw={600}>Setup:</Text> 3-6 months</Text>
                  <Text size="sm"><Text span fw={600}>Migration:</Text> Required</Text>
                  <Text size="sm"><Text span fw={600}>Training:</Text> Extensive</Text>
                  <Text size="sm"><Text span fw={600}>Time to Value:</Text> Months</Text>
                </Stack>
              </Stack>
            </Card>

            <Card p={24} radius="lg" bg="yellow.0" style={{ border: '1px solid var(--mantine-color-yellow-3)' }}>
              <Stack gap={16} ta="center">
                <Title order={4} size="h5" c="yellow.8">Add AI Features</Title>
                <Stack gap={8}>
                  <Text size="sm"><Text span fw={600}>Setup:</Text> 2-4 weeks</Text>
                  <Text size="sm"><Text span fw={600}>Migration:</Text> None</Text>
                  <Text size="sm"><Text span fw={600}>Training:</Text> Moderate</Text>
                  <Text size="sm"><Text span fw={600}>Time to Value:</Text> Weeks</Text>
                </Stack>
              </Stack>
            </Card>

            <Card p={24} radius="lg" bg="teal.0" style={{ border: '1px solid var(--mantine-color-teal-3)' }}>
              <Stack gap={16} ta="center">
                <Title order={4} size="h5" c="teal.7">PM33 Enhancement</Title>
                <Stack gap={8}>
                  <Text size="sm"><Text span fw={600}>Setup:</Text> Same day</Text>
                  <Text size="sm"><Text span fw={600}>Migration:</Text> None</Text>
                  <Text size="sm"><Text span fw={600}>Training:</Text> Minimal</Text>
                  <Text size="sm"><Text span fw={600}>Time to Value:</Text> Hours</Text>
                </Stack>
              </Stack>
            </Card>
          </SimpleGrid>
        </Box>

        {/* Landing Page CTA Section */}
        <Box mt={80}>
          <Card shadow="xl" radius="xl" p={48} style={{ 
            background: 'linear-gradient(135deg, var(--marketing-primary) 0%, var(--marketing-cta) 100%)',
            textAlign: 'center'
          }}>
            <Stack align="center" gap={32}>
              <Badge size="lg" color="white" variant="light" leftSection={<IconSparkles size={16} />}>
                Ready to Choose Your AI PM Strategy?
              </Badge>
              
              <Title order={2} c="white" size="h1" maw={700} lh={1.1}>
                Skip the Migration Headaches.
                <Text span style={{ display: 'block', marginTop: 8 }}>
                  Supercharge Your Current Stack.
                </Text>
              </Title>
              
              <Text size="xl" c="rgba(255, 255, 255, 0.9)" maw={600} lh={1.6}>
                See why PM33's enhancement approach beats replacement for 92% of product teams.
              </Text>
              
              <Group gap={24} justify="center">
                <Button 
                  component={Link}
                  href="/trial"
                  size="xl"
                  variant="white"
                  color="dark"
                  rightSection={<IconArrowRight size={20} />}
                  style={{ borderRadius: 16, fontWeight: 700 }}
                >
                  Start Your Free 14-Day Trial
                </Button>
                <Button 
                  component={Link}
                  href="/strategic-intelligence"
                  size="xl"
                  variant="outline"
                  style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: 'white',
                    borderRadius: 16 
                  }}
                  leftSection={<IconBrain size={20} />}
                >
                  See Strategic Intelligence Demo
                </Button>
              </Group>
              
              <Group gap={32} justify="center">
                {[
                  { icon: IconCheck, text: "No migration required" },
                  { icon: IconBolt, text: "Same-day productivity" },
                  { icon: IconUsers, text: "Works with existing tools" }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Group key={index} gap={8}>
                      <IconComponent size={20} color="rgba(167, 243, 208, 1)" />
                      <Text c="rgba(255, 255, 255, 0.9)" fw={500} size="sm">
                        {item.text}
                      </Text>
                    </Group>
                  );
                })}
              </Group>
            </Stack>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}