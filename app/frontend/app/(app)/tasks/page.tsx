'use client';

import React from 'react';
import { Container, Card, Title, Text, Badge, Group, Stack, Button, Grid, Divider } from '@mantine/core';
import { IconCheck, IconClock, IconAlertCircle, IconRefresh, IconPlus, IconChartBar } from '@tabler/icons-react';
import { DemoBadge, DemoContent, useDemoMode } from '../../../components/shared/SimplifiedNavigation';

const TasksPage: React.FC = () => {
  const { isDemoMode } = useDemoMode();

  // Demo data - enhanced but realistic
  const activeTasks = isDemoMode ? [
    {
      id: 1,
      priority: 'HIGH',
      title: 'Feature X Competitive Response',
      context: 'Fast-follower with differentiation',
      subtasks: [
        { name: 'Define differentiation strategy', status: 'in_progress' },
        { name: 'Analyze competitor feature gaps', status: 'pending' },
        { name: 'Create engineering requirements', status: 'pending' },
        { name: 'Design competitive advantage features', status: 'not_started' }
      ],
      timeline: '6 weeks',
      confidence: 94,
      impact: 'High',
      color: 'red'
    },
    {
      id: 2,
      priority: 'MED',
      title: 'Q4 Resource Optimization',
      context: '60% engineering, 40% marketing',
      subtasks: [
        { name: 'Audit current resource allocation', status: 'completed' },
        { name: 'Model engineering capacity scenarios', status: 'in_progress' },
        { name: 'Calculate marketing ROI projections', status: 'in_progress' },
        { name: 'Present recommendations to leadership', status: 'not_started' }
      ],
      timeline: '3 weeks',
      confidence: 87,
      impact: '$89K',
      color: 'yellow'
    }
  ] : [];

  const integrationStatus = [
    {
      name: 'Jira',
      status: 'synced',
      items: isDemoMode ? '156 items' : '12 items',
      reliability: isDemoMode ? '99.2%' : '95.1%',
      color: 'green'
    },
    {
      name: 'Slack',
      status: 'active', 
      items: isDemoMode ? '47 msgs' : '8 msgs',
      reliability: isDemoMode ? '100%' : '98.3%',
      color: 'green'
    },
    {
      name: 'Linear',
      status: isDemoMode ? 'setup' : 'pending',
      items: 'pending',
      reliability: '—',
      color: 'gray'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <IconCheck size={16} color="green" />;
      case 'in_progress':
        return <IconClock size={16} color="blue" />;
      case 'pending':
        return <IconAlertCircle size={16} color="orange" />;
      default:
        return <IconClock size={16} color="gray" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      default:
        return 'Not Started';
    }
  };

  return (
    <Container size={1200} px={24} py={48}>
      <Stack gap={32}>
        {/* Page Header */}
        <Group justify="space-between" align="flex-start">
          <Stack gap={8}>
            <Title order={1} size="h1" c="dark">
              Tasks
            </Title>
            <Text size="lg" c="dimmed">
              Workflow execution and progress
            </Text>
          </Stack>
          <Group gap={16}>
            <Badge size="lg" variant="light" color="blue">
              Generated: {isDemoMode ? '156' : '23'} total
            </Badge>
          </Group>
        </Group>

        {/* Filters */}
        <Group gap={16}>
          <Button variant="subtle" size="sm">
            All Status ▼
          </Button>
          <Button variant="subtle" size="sm">
            All Priority ▼
          </Button>
          <Button variant="subtle" size="sm">
            All Projects ▼
          </Button>
        </Group>

        {/* Active Tasks */}
        <div>
          <Group justify="space-between" align="center" mb={16}>
            <Title order={3} size="h3">
              Active Tasks ({isDemoMode ? '23' : '5'})
            </Title>
            <DemoBadge />
          </Group>

          <Stack gap={16}>
            {activeTasks.map((task) => (
              <DemoContent key={task.id}>
                <Card shadow="md" padding="xl" radius={12}>
                  <Stack gap={20}>
                    {/* Task Header */}
                    <Group justify="space-between" align="flex-start">
                      <Group gap={12}>
                        <Badge
                          size="sm"
                          color={task.color}
                          variant="filled"
                        >
                          🔴 {task.priority}
                        </Badge>
                        <div>
                          <Title order={4} size="h4">
                            {task.title}
                          </Title>
                          <Text size="sm" c="dimmed">
                            Strategic Context: {task.context}
                          </Text>
                        </div>
                      </Group>
                    </Group>

                    {/* Subtasks */}
                    <div>
                      <Stack gap={8}>
                        {task.subtasks.map((subtask, index) => (
                          <Group key={index} gap={12}>
                            {getStatusIcon(subtask.status)}
                            <Text 
                              size="sm" 
                              style={{ 
                                flex: 1,
                                textDecoration: subtask.status === 'completed' ? 'line-through' : 'none',
                                opacity: subtask.status === 'completed' ? 0.7 : 1
                              }}
                            >
                              {subtask.name}
                            </Text>
                            <Badge
                              size="xs"
                              variant="light"
                              color={
                                subtask.status === 'completed' ? 'green' :
                                subtask.status === 'in_progress' ? 'blue' :
                                subtask.status === 'pending' ? 'orange' : 'gray'
                              }
                            >
                              {getStatusLabel(subtask.status)}
                            </Badge>
                          </Group>
                        ))}
                      </Stack>
                    </div>

                    <Divider />

                    {/* Task Footer */}
                    <Group justify="space-between" align="center">
                      <Group gap={24}>
                        <Text size="sm">
                          <strong>Timeline:</strong> {task.timeline}
                        </Text>
                        <Text size="sm">
                          <strong>Confidence:</strong> {task.confidence}%
                        </Text>
                        <Text size="sm">
                          <strong>Impact:</strong> {task.impact}
                        </Text>
                      </Group>
                      <Group gap={8}>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Update Status
                        </Button>
                      </Group>
                    </Group>
                  </Stack>
                </Card>
              </DemoContent>
            ))}
          </Stack>
        </div>

        {/* Integration Status */}
        <div>
          <Title order={3} size="h3" mb={16}>
            Integration Health
          </Title>
          <Grid gutter={16}>
            {integrationStatus.map((integration, index) => (
              <Grid.Col key={index} span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="md" radius="md" withBorder>
                  <Group justify="space-between" align="flex-start">
                    <div>
                      <Group gap={8} mb={4}>
                        <Text fw={600} size="sm">
                          {integration.name}
                        </Text>
                        <Badge
                          size="xs"
                          color={integration.color}
                          variant="filled"
                        >
                          🟢 {integration.status}
                        </Badge>
                      </Group>
                      <Text size="xs" c="dimmed">
                        {integration.items}
                      </Text>
                      <Text size="xs" c="dimmed">
                        Reliability: {integration.reliability}
                      </Text>
                    </div>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </div>

        {/* Quick Actions */}
        <div>
          <Title order={3} size="h3" mb={16}>
            Quick Actions
          </Title>
          <Grid gutter={16}>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Button
                fullWidth
                variant="outline"
                leftSection={<IconPlus size={18} />}
                size="lg"
              >
                Create Task
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Button
                fullWidth
                variant="outline"
                leftSection={<IconRefresh size={18} />}
                size="lg"
              >
                Sync Tools
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Button
                fullWidth
                variant="outline"
                leftSection={<IconChartBar size={18} />}
                size="lg"
              >
                View Progress
              </Button>
            </Grid.Col>
          </Grid>
        </div>
      </Stack>
    </Container>
  );
};

export default TasksPage;