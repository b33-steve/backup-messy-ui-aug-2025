'use client';

import React from 'react';
import { Container, Card, Title, Text, Button, Stack, Badge, Group, Box, SimpleGrid, ThemeIcon } from '@mantine/core';
import { IconTarget, IconBrain, IconUsers, IconTrendingUp, IconSparkles, IconArrowRight, IconCheck } from '@tabler/icons-react';
import Link from 'next/link';

export default function CommandCenterPage() {
  return (
    <Box py={80} style={{ backgroundColor: 'var(--marketing-bg-primary)' }}>
      <Container size="xl">
        {/* Header */}
        <Stack align="center" gap={32} mb={64}>
          <Badge size="lg" variant="gradient" gradient={{ from: 'cyan', to: 'blue' }}>
            Command Center Demo
          </Badge>
          
          <Stack align="center" gap={16}>
            <Title order={1} size="h1" ta="center" lh={1.2}>
              Strategic Command Center
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              Real-time orchestration of 4 specialized AI teams transforming PM workflows
            </Text>
          </Stack>
        </Stack>

        {/* Coming Soon Notice */}
        <Card shadow="xl" radius="xl" p={48} mb={48} style={{ border: '2px solid var(--marketing-cta)' }}>
          <Stack align="center" gap={24}>
            <ThemeIcon size={80} variant="gradient" gradient={{ from: 'cyan', to: 'blue' }}>
              <IconTarget size={40} />
            </ThemeIcon>
            <Title order={2} ta="center" c="dark.8">Command Center Demo Coming Soon</Title>
            <Text size="lg" ta="center" c="dimmed" maw={600}>
              We're putting the finishing touches on our most advanced demo. The Command Center will showcase 
              all 4 AI teams working together in real-time.
            </Text>
            <Badge size="lg" variant="filled" color="orange">
              Available December 2024
            </Badge>
          </Stack>
        </Card>

        {/* 4 AI Teams Preview */}
        <Stack gap={32} mb={64}>
          <Title order={2} ta="center">Meet Your 4 AI Teams</Title>
          
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32}>
            {/* Strategic Intelligence AI */}
            <Card shadow="lg" radius="xl" p={32}>
              <Stack gap={20}>
                <Group>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                    <IconBrain size={24} />
                  </ThemeIcon>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Title order={4} c="indigo.7">Strategic Intelligence AI</Title>
                    <Badge variant="light" color="indigo" size="sm">Available Now</Badge>
                  </Stack>
                </Group>
                <Text c="dimmed" size="sm">
                  Multi-framework strategic analysis using ICE/RICE, Porter's Five Forces, and competitive intelligence. 
                  Provides CPO-level insights for product direction.
                </Text>
                <Button 
                  component={Link}
                  href="/strategic-intelligence"
                  variant="light"
                  color="indigo"
                  size="sm"
                  rightSection={<IconArrowRight size={16} />}
                >
                  Try Demo Now
                </Button>
              </Stack>
            </Card>

            {/* Workflow Execution AI */}
            <Card shadow="lg" radius="xl" p={32}>
              <Stack gap={20}>
                <Group>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'teal', to: 'cyan' }}>
                    <IconTrendingUp size={24} />
                  </ThemeIcon>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Title order={4} c="teal.7">Workflow Execution AI</Title>
                    <Badge variant="light" color="orange" size="sm">Coming Soon</Badge>
                  </Stack>
                </Group>
                <Text c="dimmed" size="sm">
                  Automated task creation, cross-functional coordination, and PM tool integration. 
                  Transforms strategic insights into executable workflows.
                </Text>
                <Button variant="light" color="gray" size="sm" disabled>
                  Demo Available Dec 2024
                </Button>
              </Stack>
            </Card>

            {/* Data Intelligence AI */}
            <Card shadow="lg" radius="xl" p={32}>
              <Stack gap={20}>
                <Group>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                    <IconTarget size={24} />
                  </ThemeIcon>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Title order={4} c="orange.7">Data Intelligence AI</Title>
                    <Badge variant="light" color="orange" size="sm">Coming Soon</Badge>
                  </Stack>
                </Group>
                <Text c="dimmed" size="sm">
                  Company-specific context learning, historical pattern recognition, and predictive analytics. 
                  Learns from your unique product and customer data.
                </Text>
                <Button variant="light" color="gray" size="sm" disabled>
                  Demo Available Dec 2024
                </Button>
              </Stack>
            </Card>

            {/* Communication AI */}
            <Card shadow="lg" radius="xl" p={32}>
              <Stack gap={20}>
                <Group>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'purple', to: 'pink' }}>
                    <IconUsers size={24} />
                  </ThemeIcon>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Title order={4} c="purple.7">Communication AI</Title>
                    <Badge variant="light" color="orange" size="sm">Coming Soon</Badge>
                  </Stack>
                </Group>
                <Text c="dimmed" size="sm">
                  Stakeholder communication, executive summaries, and cross-team alignment. 
                  Ensures perfect communication across all levels of your organization.
                </Text>
                <Button variant="light" color="gray" size="sm" disabled>
                  Demo Available Dec 2024
                </Button>
              </Stack>
            </Card>
          </SimpleGrid>
        </Stack>

        {/* What to Expect */}
        <Card shadow="lg" radius="xl" p={40} mb={48} bg="gray.0">
          <Stack gap={24}>
            <Title order={3} ta="center">What to Expect in the Command Center</Title>
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={24}>
              <Stack align="center" gap={12}>
                <IconBrain size={32} color="var(--mantine-color-indigo-6)" />
                <Text fw={600} ta="center">Real-Time Coordination</Text>
                <Text size="sm" c="dimmed" ta="center">
                  Watch all 4 AI teams work together on complex product decisions
                </Text>
              </Stack>
              <Stack align="center" gap={12}>
                <IconTarget size={32} color="var(--mantine-color-teal-6)" />
                <Text fw={600} ta="center">Live Metrics</Text>
                <Text size="sm" c="dimmed" ta="center">
                  See real-time strategic metrics and AI processing indicators
                </Text>
              </Stack>
              <Stack align="center" gap={12}>
                <IconTrendingUp size={32} color="var(--mantine-color-orange-6)" />
                <Text fw={600} ta="center">Workflow Automation</Text>
                <Text size="sm" c="dimmed" ta="center">
                  Experience end-to-end automation from strategy to execution
                </Text>
              </Stack>
            </SimpleGrid>
          </Stack>
        </Card>

        {/* CTA Section */}
        <Card shadow="xl" radius="xl" p={48} style={{ 
          background: 'linear-gradient(135deg, var(--marketing-primary) 0%, var(--marketing-cta) 100%)',
          textAlign: 'center'
        }}>
          <Stack align="center" gap={32}>
            <Badge size="lg" color="white" variant="light" leftSection={<IconSparkles size={16} />}>
              Get Early Access
            </Badge>
            
            <Title order={2} c="white" size="h1" maw={600} lh={1.1}>
              Be First to Experience
              <Text span style={{ display: 'block', marginTop: 8 }}>
                4-Team AI Coordination
              </Text>
            </Title>
            
            <Text size="xl" c="rgba(255, 255, 255, 0.9)" maw={500} lh={1.6}>
              Start with Strategic Intelligence now, get Command Center access when it launches.
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
                Start Free Trial Now
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
                Try Strategic Intelligence
              </Button>
            </Group>
            
            <Group gap={32} justify="center">
              {[
                { icon: IconCheck, text: "Early access included" },
                { icon: IconBrain, text: "Strategic Intelligence ready now" },
                { icon: IconTarget, text: "Command Center access when available" }
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
      </Container>
    </Box>
  );
}