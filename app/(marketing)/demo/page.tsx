/**
 * Component: Demo Page - Interactive PM33 Demo Experience
 * Purpose: Showcase PM33 capabilities through interactive demo
 * Context: Marketing funnel conversion page
 * RELEVANT FILES: components/shared/CommandCenterWorking.tsx, app/(marketing)/layout.tsx
 */

'use client';

import { Container, Title, Text, Card, Button, Grid, Stack, Badge, Group } from '@mantine/core';
import { IconRocket, IconBrain, IconTarget, IconChartLine, IconUsers } from '@tabler/icons-react';
import Link from 'next/link';

export default function DemoPage() {
  return (
    <Container size={1200} px={24} py={48}>
      {/* Header */}
      <Stack align="center" mb={60}>
        <Badge size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
          Interactive Demo
        </Badge>
        <Title order={1} size="48px" fw={700} ta="center">
          See PM33 in Action
        </Title>
        <Text size="xl" ta="center" maw={800} c="dimmed">
          Experience how PM33 transforms your PM workflow with AI-powered strategic intelligence
        </Text>
      </Stack>

      {/* Demo Options */}
      <Grid mb={60}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card padding="xl" shadow="md" h="100%">
            <IconBrain size={48} color="var(--marketing-primary)" />
            <Title order={3} mt="md" mb="sm">Strategic Intelligence Demo</Title>
            <Text c="dimmed" mb="lg">
              See how AI analyzes your strategic decisions using multiple frameworks (ICE, RICE, Porter's Five Forces)
            </Text>
            <Button 
              fullWidth 
              variant="gradient" 
              gradient={{ from: 'blue', to: 'cyan' }}
              component={Link}
              href="/strategic-intelligence"
            >
              Try Strategic Analysis
            </Button>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card padding="xl" shadow="md" h="100%">
            <IconTarget size={48} color="var(--marketing-success)" />
            <Title order={3} mt="md" mb="sm">Command Center Demo</Title>
            <Text c="dimmed" mb="lg">
              Explore the PM33 Command Center where 4 AI teams coordinate to optimize your entire PM workflow
            </Text>
            <Button 
              fullWidth 
              variant="gradient" 
              gradient={{ from: 'teal', to: 'green' }}
              component={Link}
              href="/command-center-demo"
            >
              View Command Center
            </Button>
          </Card>
        </Grid.Col>
      </Grid>

      {/* What You'll Experience */}
      <Card shadow="md" padding="xl" mb={60}>
        <Title order={2} mb="lg" ta="center">What You'll Experience</Title>
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="center" ta="center">
              <IconChartLine size={40} color="var(--marketing-primary)" />
              <Title order={4}>Real Strategic Analysis</Title>
              <Text size="sm" c="dimmed">
                Watch AI analyze real product scenarios using multiple strategic frameworks
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="center" ta="center">
              <IconUsers size={40} color="var(--marketing-success)" />
              <Title order={4}>AI Team Coordination</Title>
              <Text size="sm" c="dimmed">
                See how 4 specialized AI teams work together to solve complex PM challenges
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="center" ta="center">
              <IconRocket size={40} color="var(--marketing-cta)" />
              <Title order={4}>Instant Results</Title>
              <Text size="sm" c="dimmed">
                Get immediate insights and actionable recommendations for your product decisions
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Card>

      {/* CTA Section */}
      <Card shadow="xl" padding="xl" ta="center" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white' 
      }}>
        <Title order={2} mb="md">Ready to Transform Your PM Workflow?</Title>
        <Text size="lg" mb="lg" opacity={0.9}>
          Start your 14-day free trial and experience the full power of PM33's AI intelligence
        </Text>
        <Group justify="center">
          <Button 
            size="lg"
            variant="white"
            color="dark"
            component={Link}
            href="/trial"
            leftSection={<IconRocket size={20} />}
          >
            Start Free Trial
          </Button>
        </Group>
      </Card>
    </Container>
  );
}