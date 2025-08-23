'use client';

import React from 'react';
import { Container, Title, Text, Button, Card, Stack, Badge, Group, SimpleGrid, ThemeIcon, Progress, Alert } from '@mantine/core';
import { IconTrendingUp, IconUsers, IconTarget, IconBrain, IconRocket, IconMail } from '@tabler/icons-react';
import Link from 'next/link';

export default function ResourceOptimizerPage() {
  return (
    <div className="marketing-context">
      <Container size="xl" px="md" py="xl">
        {/* Header Section */}
        <Stack align="center" gap={32} mb={64}>
          <ThemeIcon size={80} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
            <IconTrendingUp size={40} />
          </ThemeIcon>
          
          <Stack align="center" gap={16}>
            <Badge size="xl" color="orange" variant="light">
              🚧 Coming Soon
            </Badge>
            <Title order={1} size={48} ta="center" lh={1.2}>
              Resource Optimizer
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6}>
              AI-powered resource allocation and team capacity optimization across your entire product portfolio
            </Text>
          </Stack>
          
          <Progress value={65} size="xl" w="100%" maw={400} color="orange" />
          <Text size="sm" c="dimmed">Development Progress: 65% Complete</Text>
        </Stack>

        {/* Feature Preview */}
        <Card shadow="xl" padding="xl" radius="xl" mb={48}>
          <Stack gap={32}>
            <Group justify="space-between">
              <Title order={2}>What's Coming</Title>
              <Badge color="blue" variant="light">Phase 2 Release</Badge>
            </Group>
            
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing={24}>
              <Card padding="lg" withBorder>
                <ThemeIcon size={48} variant="light" color="blue" mb="md">
                  <IconUsers size={24} />
                </ThemeIcon>
                <Text fw={600} mb="xs">Team Capacity Analysis</Text>
                <Text size="sm" c="dimmed">
                  AI analyzes team velocity, skills, and availability to optimize resource allocation
                </Text>
              </Card>
              
              <Card padding="lg" withBorder>
                <ThemeIcon size={48} variant="light" color="green" mb="md">
                  <IconTarget size={24} />
                </ThemeIcon>
                <Text fw={600} mb="xs">Smart Resource Matching</Text>
                <Text size="sm" c="dimmed">
                  Automatically match the right people to the right projects based on skills and workload
                </Text>
              </Card>
              
              <Card padding="lg" withBorder>
                <ThemeIcon size={48} variant="light" color="purple" mb="md">
                  <IconBrain size={24} />
                </ThemeIcon>
                <Text fw={600} mb="xs">Predictive Planning</Text>
                <Text size="sm" c="dimmed">
                  Forecast resource needs and identify bottlenecks before they impact delivery
                </Text>
              </Card>
            </SimpleGrid>
          </Stack>
        </Card>

        {/* Expected Features */}
        <Card shadow="md" padding="xl" radius="xl" mb={48} bg="gradient-to-br from-orange-50 to-red-50">
          <Stack gap={24}>
            <Title order={3}>Expected Features</Title>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={16}>
              {[
                "Real-time team capacity dashboard",
                "AI-powered workload balancing",
                "Cross-project resource optimization",
                "Skills gap analysis and recommendations",
                "Automated resource allocation suggestions",
                "Integration with existing project management tools",
                "Resource utilization forecasting",
                "Team burnout prevention alerts"
              ].map((feature, index) => (
                <Group key={index} gap="sm">
                  <ThemeIcon size={20} variant="light" color="orange">
                    <Text size="xs" fw={600}>✓</Text>
                  </ThemeIcon>
                  <Text size="sm">{feature}</Text>
                </Group>
              ))}
            </SimpleGrid>
          </Stack>
        </Card>

        {/* Try Current Features */}
        <Alert 
          color="blue" 
          title="While You Wait..." 
          icon={<IconRocket size={20} />}
          radius="xl"
          mb={48}
        >
          <Stack gap={16}>
            <Text>
              Explore our live Strategic Intelligence Engine and Command Center while we complete the Resource Optimizer.
            </Text>
            <Group>
              <Button 
                component={Link}
                href="/strategic-intelligence"
                variant="light"
                leftSection={<IconBrain size={16} />}
              >
                Try Strategic Intelligence
              </Button>
              <Button 
                component={Link}
                href="/command-center"
                variant="light"
                leftSection={<IconTarget size={16} />}
              >
                Try Command Center
              </Button>
            </Group>
          </Stack>
        </Alert>

        {/* Notify Section */}
        <Card shadow="xl" padding="xl" radius="xl" bg="gradient-to-br from-indigo-600 to-purple-600" style={{ color: 'white' }}>
          <Stack align="center" gap={24}>
            <ThemeIcon size={64} variant="white">
              <IconMail size={32} color="var(--mantine-color-indigo-6)" />
            </ThemeIcon>
            <Title order={2} ta="center" c="white">Get Notified When It's Ready</Title>
            <Text ta="center" size="lg" style={{ opacity: 0.9 }}>
              Be the first to know when the Resource Optimizer launches. We'll send you an exclusive preview.
            </Text>
            <Button 
              component={Link}
              href="/trial"
              size="xl"
              variant="white"
              color="indigo"
            >
              Join the Waitlist
            </Button>
          </Stack>
        </Card>
      </Container>
    </div>
  );
}