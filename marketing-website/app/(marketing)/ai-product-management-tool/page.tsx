'use client';

import React from 'react';
import { Container, Card, Title, Text, Button, Stack, Badge, Group, Box, Divider, List, ThemeIcon } from '@mantine/core';
import { IconArrowRight, IconCheck, IconBrain, IconTarget, IconTrendingUp, IconUsers, IconClock, IconBolt, IconSparkles } from '@tabler/icons-react';
import Link from 'next/link';

export default function AIProductManagementToolPage() {
  return (
    <Box py={80} style={{ backgroundColor: 'var(--marketing-bg-primary)' }}>
      <Container size="lg">
        {/* Article Header */}
        <Stack align="center" gap={32} mb={64}>
          <Badge size="lg" variant="gradient" gradient={{ from: 'teal', to: 'cyan' }}>
            Strategic Guide
          </Badge>
          
          <Stack align="center" gap={16}>
            <Title order={1} size="h1" ta="center" lh={1.2} maw={800}>
              PM33: The AI Product Management Tool That Supercharges Your Existing Stack
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={600}>
              Don't Replace Your PM Tools - Make Them 10x Smarter
            </Text>
          </Stack>

          <Group gap={24}>
            <Text size="sm" c="dimmed">5-minute read</Text>
            <Text size="sm" c="dimmed">•</Text>
            <Text size="sm" c="dimmed">Updated January 2025</Text>
          </Group>
        </Stack>

        {/* Article Content */}
        <Stack gap={48}>
          {/* Introduction */}
          <Card shadow="lg" radius="xl" p={40}>
            <Text size="lg" lh={1.6} style={{ fontWeight: 500 }}>
              Transform Jira, Monday.com, and Asana into AI-powered strategic engines. 
              <Text span c="teal.6" fw={600}> No migration headaches. Immediate productivity gains.</Text>
            </Text>
          </Card>

          {/* The Problem Section */}
          <Stack gap={24}>
            <Title order={2} size="h2">The Problem Every Product Manager Faces</Title>
            <Text size="lg" lh={1.6}>
              You're drowning in admin work. 60-80% of your time goes to:
            </Text>
            <List spacing="md" size="md">
              <List.Item icon={<ThemeIcon size={24} variant="light" color="red"><IconClock size={16} /></ThemeIcon>}>
                Writing PRDs and user stories manually
              </List.Item>
              <List.Item icon={<ThemeIcon size={24} variant="light" color="red"><IconClock size={16} /></ThemeIcon>}>
                Synthesizing scattered customer feedback
              </List.Item>
              <List.Item icon={<ThemeIcon size={24} variant="light" color="red"><IconClock size={16} /></ThemeIcon>}>
                Creating roadmap presentations from scratch
              </List.Item>
              <List.Item icon={<ThemeIcon size={24} variant="light" color="red"><IconClock size={16} /></ThemeIcon>}>
                Tracking feature requests across multiple tools
              </List.Item>
              <List.Item icon={<ThemeIcon size={24} variant="light" color="red"><IconClock size={16} /></ThemeIcon>}>
                Generating status reports for stakeholders
              </List.Item>
            </List>
            <Card p={24} radius="lg" bg="red.0" style={{ border: '1px solid var(--mantine-color-red-2)' }}>
              <Text fw={600} c="red.7">
                Meanwhile, your competitors are shipping faster because their PMs focus on strategy, not busywork.
              </Text>
            </Card>
          </Stack>

          <Divider size="md" />

          {/* Why PM33 is Different */}
          <Stack gap={24}>
            <Title order={2} size="h2">Why PM33 is Different: Enhancement, Not Replacement</Title>
            
            {/* Traditional Approach */}
            <Card p={32} radius="lg" bg="red.0" style={{ border: '2px solid var(--mantine-color-red-2)' }}>
              <Stack gap={16}>
                <Group>
                  <Text size="xl" fw={700} c="red.7">❌ Traditional Approach: Replace Everything</Text>
                </Group>
                <List spacing="sm">
                  <List.Item>Migrate all your data and workflows</List.Item>
                  <List.Item>Re-train your entire team on new tools</List.Item>
                  <List.Item>Lose months of productivity during transition</List.Item>
                  <List.Item>Pay $25-74/user/month for "comprehensive" platforms</List.Item>
                </List>
              </Stack>
            </Card>

            {/* PM33 Approach */}
            <Card p={32} radius="lg" bg="teal.0" style={{ border: '2px solid var(--mantine-color-teal-2)' }}>
              <Stack gap={16}>
                <Group>
                  <Text size="xl" fw={700} c="teal.7">✅ PM33 Approach: Supercharge What Works</Text>
                </Group>
                <List spacing="sm">
                  <List.Item><Text span fw={600}>Plug into your existing tools</Text> (Jira, Monday, Asana, Slack)</List.Item>
                  <List.Item><Text span fw={600}>AI brain analyzes everything</Text> across your current stack</List.Item>
                  <List.Item><Text span fw={600}>Automate strategic work</Text> while keeping familiar workflows</List.Item>
                  <List.Item><Text span fw={600}>Pay for results, not seats</Text> - usage-based pricing starting at $20/user</List.Item>
                </List>
              </Stack>
            </Card>
          </Stack>

          <Divider size="md" />

          {/* How PM33's AI Transforms Your PM Work */}
          <Stack gap={32}>
            <Title order={2} size="h2">How PM33's AI Transforms Your PM Work</Title>

            {/* Strategic Intelligence */}
            <Card shadow="md" radius="xl" p={32}>
              <Stack gap={20}>
                <Group>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                    <IconBrain size={24} />
                  </ThemeIcon>
                  <Title order={3} size="h3" c="indigo.7">🧠 Strategic Intelligence Layer</Title>
                </Group>
                <Stack gap={12}>
                  <Text fw={600}>Problem:</Text>
                  <Text c="dimmed">You have data scattered across tools but no unified insights</Text>
                  <Text fw={600}>PM33 Solution:</Text>
                  <Text c="dimmed">
                    AI analyzes patterns across Jira tickets, Slack discussions, customer feedback, and market research 
                    to generate strategic recommendations
                  </Text>
                </Stack>
                <Card p={16} radius="lg" bg="indigo.0" style={{ border: '1px solid var(--mantine-color-indigo-2)' }}>
                  <Text size="sm" fw={500} c="indigo.6" style={{ fontStyle: 'italic' }}>
                    Example: "Based on 847 support tickets and 23 customer interviews, AI recommends prioritizing 
                    mobile performance optimization - projected 34% reduction in churn"
                  </Text>
                </Card>
              </Stack>
            </Card>

            {/* Automated Documentation */}
            <Card shadow="md" radius="xl" p={32}>
              <Stack gap={20}>
                <Group>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'teal', to: 'cyan' }}>
                    <IconTarget size={24} />
                  </ThemeIcon>
                  <Title order={3} size="h3" c="teal.7">📝 Automated Documentation</Title>
                </Group>
                <Stack gap={12}>
                  <Text fw={600}>Problem:</Text>
                  <Text c="dimmed">Writing PRDs, user stories, and requirements takes hours</Text>
                  <Text fw={600}>PM33 Solution:</Text>
                  <Text c="dimmed">
                    AI generates comprehensive documentation from brief descriptions, automatically formatted 
                    for your team's standards
                  </Text>
                </Stack>
                <Card p={16} radius="lg" bg="teal.0" style={{ border: '1px solid var(--mantine-color-teal-2)' }}>
                  <Text size="sm" fw={500} c="teal.6" style={{ fontStyle: 'italic' }}>
                    Input: "Mobile app slow on Android" → Output: Complete PRD with user stories, acceptance criteria, 
                    technical requirements, and success metrics
                  </Text>
                </Card>
              </Stack>
            </Card>
          </Stack>
        </Stack>

        {/* Landing Page CTA Section */}
        <Box mt={80}>
          <Card shadow="xl" radius="xl" p={48} style={{ 
            background: 'linear-gradient(135deg, var(--marketing-primary) 0%, var(--marketing-cta) 100%)',
            textAlign: 'center'
          }}>
            <Stack align="center" gap={32}>
              <Badge size="lg" color="white" variant="light" leftSection={<IconSparkles size={16} />}>
                Ready to Transform Your PM Work?
              </Badge>
              
              <Title order={2} c="white" size="h1" maw={600} lh={1.1}>
                Stop Drowning in Busywork.
                <Text span style={{ display: 'block', marginTop: 8 }}>
                  Start Doing Strategy.
                </Text>
              </Title>
              
              <Text size="xl" c="rgba(255, 255, 255, 0.9)" maw={500} lh={1.6}>
                Join 2,500+ product managers using PM33 to focus on what matters most.
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
                  leftSection={<IconBolt size={20} />}
                >
                  See PM33 in Action
                </Button>
              </Group>
              
              <Group gap={32} justify="center">
                {[
                  { icon: IconCheck, text: "No credit card required" },
                  { icon: IconBolt, text: "5-minute setup" },
                  { icon: IconUsers, text: "Cancel anytime" }
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