'use client';

import React from 'react';
import { Container, Grid, Card, Badge, Title, Text, Group, Stack, Button, ActionIcon, Box } from '@mantine/core';
import { IconTarget, IconHome, IconBrain, IconDatabase } from '@tabler/icons-react';
import Link from 'next/link';

const CommandCenterWorking: React.FC = () => {
  return (
    <Container size={1200} px={24} py={48}>
      {/* Header */}
      <Box mb={48}>
        <Group justify="space-between">
          <Stack gap={4}>
            <Title order={1} size="h1" c="dark">
              🎯 PM33 Strategic Command Center
            </Title>
            <Text size="lg" c="dimmed">
              Real-time orchestration of 4 specialized AI teams transforming PM workflows
            </Text>
          </Stack>
          <Group>
            <ActionIcon 
              size="lg" 
              variant="light" 
              color="blue"
              aria-label="Refresh dashboard data"
              onClick={() => window.location.reload()}
            >
              <IconTarget size={20} />
            </ActionIcon>
            <Badge size="xl" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
              Day 3 Beta Demo
            </Badge>
          </Group>
        </Group>
      </Box>

      {/* Key Metrics Dashboard */}
      <Grid mb={48} role="region" aria-label="Key strategic metrics">
        <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Text size="xl" fw={700} c="dark">
              11,436
            </Text>
            <Text size="sm" c="dimmed">Total Work Items</Text>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Text size="xl" fw={700} c="green">
              10,842
            </Text>
            <Text size="sm" c="dimmed">Synced Items</Text>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Text size="xl" fw={700} c="yellow">
              87%
            </Text>
            <Text size="sm" c="dimmed">Strategic Optimization</Text>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Text size="xl" fw={700} c="blue">
              94%
            </Text>
            <Text size="sm" c="dimmed">Roadmap Health</Text>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Text size="xl" fw={700} c="violet">
              23
            </Text>
            <Text size="sm" c="dimmed">What-if Scenarios</Text>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Text size="xl" fw={700} c="teal">
              189
            </Text>
            <Text size="sm" c="dimmed">Jira Updates</Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Demo Banner */}
      <Card 
        shadow="lg" 
        padding={32} 
        radius={16} 
        mt={48}
        style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Group justify="space-between">
          <Stack gap={16}>
            <Title order={2} c="white">🚀 PM33: The Ultimate Product Agent</Title>
            <Text size="lg" style={{ opacity: 0.9 }}>
              Strategic Intelligence Platform - Transforming PMs into Strategic Superstars
            </Text>
            <Text size="sm" style={{ opacity: 0.8 }}>
              Day 3 Beta Demo: 4 AI teams orchestrating end-to-end strategic workflows
            </Text>
          </Stack>
          <Stack align="end" gap={12}>
            <Badge size="lg" color="white" variant="light">Live Demo Active</Badge>
            <Group gap={8}>
              <Badge size="sm" color="green" variant="filled">✅ MDM Sync</Badge>
              <Badge size="sm" color="blue" variant="filled">✅ AI Teams</Badge>
              <Badge size="sm" color="orange" variant="filled">✅ Strategic Intelligence</Badge>
            </Group>
          </Stack>
        </Group>
      </Card>
    </Container>
  );
};

export default CommandCenterWorking;