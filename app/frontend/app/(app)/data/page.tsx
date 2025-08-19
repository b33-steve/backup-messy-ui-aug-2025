'use client';

import React from 'react';
import { Container, Card, Title, Text, Group, Stack, Badge, Grid, RingProgress } from '@mantine/core';
import { IconTrendingUp, IconClock, IconTarget, IconBrain } from '@tabler/icons-react';
import { DemoBadge, DemoContent, useDemoMode } from '../../../components/shared/SimplifiedNavigation';

const DataPage: React.FC = () => {
  const { isDemoMode } = useDemoMode();

  // Demo data - enhanced but realistic
  const performanceMetrics = [
    {
      title: 'Decision Confidence',
      value: isDemoMode ? '94%' : '76%',
      change: isDemoMode ? '+12%' : '+6%',
      color: 'green',
      icon: <IconBrain size={24} />
    },
    {
      title: 'Resource Efficiency',
      value: isDemoMode ? '+23%' : '+11%',
      change: isDemoMode ? '+8%' : '+3%',
      color: 'blue',
      icon: <IconTrendingUp size={24} />
    },
    {
      title: 'Strategic Alignment',
      value: isDemoMode ? '87%' : '72%',
      change: isDemoMode ? '+15%' : '+5%',
      color: 'violet',
      icon: <IconTarget size={24} />
    },
    {
      title: 'Time to Decision',
      value: isDemoMode ? '8hr → 10min' : '8hr → 3hr',
      change: isDemoMode ? '47x improvement' : '3x improvement',
      color: 'orange',
      icon: <IconClock size={24} />
    }
  ];

  const questionCategories = isDemoMode ? [
    { category: 'Competitive Response', percentage: 34, count: 8, color: 'red' },
    { category: 'Resource Allocation', percentage: 28, count: 6, color: 'blue' },
    { category: 'Feature Prioritization', percentage: 22, count: 5, color: 'green' },
    { category: 'Market Positioning', percentage: 16, count: 4, color: 'violet' }
  ] : [
    { category: 'Feature Prioritization', percentage: 45, count: 2, color: 'green' },
    { category: 'Resource Allocation', percentage: 33, count: 1, color: 'blue' },
    { category: 'Competitive Response', percentage: 22, count: 1, color: 'red' }
  ];

  const roiMetrics = isDemoMode ? {
    timeSaved: '47 hours',
    costAvoidance: '$7,050',
    resourceOptimization: '$156K savings identified',
    decisionSpeed: '47x faster',
    confidence: '60% → 94%',
    taskCompletion: '91%',
    efficiency: '+23%'
  } : {
    timeSaved: '8 hours',
    costAvoidance: '$1,200',
    resourceOptimization: '$23K savings identified',
    decisionSpeed: '3x faster',
    confidence: '60% → 76%',
    taskCompletion: '78%',
    efficiency: '+11%'
  };

  const integrationHealth = [
    {
      name: 'Jira',
      reliability: isDemoMode ? '99.2%' : '95.1%',
      items: isDemoMode ? '156 tasks synced' : '23 tasks synced',
      status: 'healthy'
    },
    {
      name: 'Slack', 
      reliability: isDemoMode ? '96%' : '94%',
      items: isDemoMode ? '47 strategic updates sent' : '8 updates sent',
      status: 'healthy'
    },
    {
      name: 'Analytics',
      reliability: isDemoMode ? '99.8%' : '97.2%', 
      items: 'Real-time data',
      status: 'healthy'
    }
  ];

  return (
    <Container size={1200} px={24} py={48}>
      <Stack gap={32}>
        {/* Page Header */}
        <Group justify="space-between" align="flex-start">
          <Stack gap={8}>
            <Title order={1} size="h1" c="dark">
              Data
            </Title>
            <Text size="lg" c="dimmed">
              Analytics and insights
            </Text>
          </Stack>
          <Group gap={16}>
            <Badge size="lg" variant="light" color="blue">
              Last update: 30s ago
            </Badge>
          </Group>
        </Group>

        {/* Performance Overview */}
        <div>
          <Title order={3} size="h3" mb={16}>
            Performance Overview
          </Title>
          <Grid gutter={16}>
            {performanceMetrics.map((metric, index) => (
              <Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group gap={12} mb={12}>
                    <div style={{ color: `var(--mantine-color-${metric.color}-6)` }}>
                      {metric.icon}
                    </div>
                    <Text size="sm" c="dimmed">
                      {metric.title}
                    </Text>
                  </Group>
                  
                  <Text size="xl" fw={700} mb={4}>
                    {metric.value}
                  </Text>
                  
                  <Badge
                    size="sm"
                    color={metric.color}
                    variant="light"
                  >
                    ↑ {metric.change}
                  </Badge>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </div>

        {/* Question Categories */}
        <div>
          <Group justify="space-between" align="center" mb={16}>
            <Title order={3} size="h3">
              Question Categories (Last 30 Days)
            </Title>
            <DemoBadge />
          </Group>
          
          <DemoContent>
            <Card shadow="md" padding="xl" radius={12}>
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                    <RingProgress
                      size={200}
                      thickness={20}
                      sections={questionCategories.map(cat => ({
                        value: cat.percentage,
                        color: cat.color
                      }))}
                    />
                  </div>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Stack gap={12}>
                    {questionCategories.map((category, index) => (
                      <Group key={index} justify="space-between">
                        <Group gap={8}>
                          <div
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: `var(--mantine-color-${category.color}-6)`
                            }}
                          />
                          <Text size="sm">
                            {category.category}
                          </Text>
                        </Group>
                        <Group gap={16}>
                          <Text size="sm" c="dimmed">
                            {category.count} questions
                          </Text>
                          <Text size="sm" fw={600}>
                            {category.percentage}%
                          </Text>
                        </Group>
                      </Group>
                    ))}
                  </Stack>
                </Grid.Col>
              </Grid>
            </Card>
          </DemoContent>
        </div>

        {/* ROI Impact Measurement */}
        <div>
          <Group justify="space-between" align="center" mb={16}>
            <Title order={3} size="h3">
              ROI Impact Measurement
            </Title>
            <DemoBadge />
          </Group>
          
          <DemoContent>
            <Card shadow="md" padding="xl" radius={12}>
              <Stack gap={24}>
                <div>
                  <Title order={4} size="h4" mb={16}>
                    Value Delivered This Month
                  </Title>
                  
                  <Grid gutter={24}>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Stack gap={12}>
                        <Text>
                          <strong>Time Savings:</strong> {roiMetrics.timeSaved} saved (vs consultant analysis)
                        </Text>
                        <Text>
                          <strong>Cost Avoidance:</strong> {roiMetrics.costAvoidance} (consultant fees not paid)
                        </Text>
                        <Text>
                          <strong>Resource Optimization:</strong> {roiMetrics.resourceOptimization}
                        </Text>
                        <Text>
                          <strong>Decision Speed:</strong> {roiMetrics.decisionSpeed} strategic analysis
                        </Text>
                      </Stack>
                    </Grid.Col>
                    
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Stack gap={12}>
                        <Text>
                          <strong>Strategic Outcomes:</strong>
                        </Text>
                        <Text size="sm" pl={16}>
                          • Decision confidence: {roiMetrics.confidence} average
                        </Text>
                        <Text size="sm" pl={16}>
                          • Task completion rate: {roiMetrics.taskCompletion} strategic alignment
                        </Text>
                        <Text size="sm" pl={16}>
                          • Resource efficiency: {roiMetrics.efficiency} improvement
                        </Text>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </div>
              </Stack>
            </Card>
          </DemoContent>
        </div>

        {/* Integration Health */}
        <div>
          <Title order={3} size="h3" mb={16}>
            Integration Health
          </Title>
          <Grid gutter={16}>
            {integrationHealth.map((integration, index) => (
              <Grid.Col key={index} span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="md" radius="md" withBorder>
                  <Group justify="space-between" align="flex-start" mb={8}>
                    <Text fw={600} size="sm">
                      {integration.name}
                    </Text>
                    <Badge
                      size="xs"
                      color="green"
                      variant="filled"
                    >
                      🟢 {integration.status}
                    </Badge>
                  </Group>
                  <Text size="xs" c="dimmed" mb={4}>
                    {integration.reliability} reliability
                  </Text>
                  <Text size="xs" c="dimmed">
                    {integration.items}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </div>
      </Stack>
    </Container>
  );
};

export default DataPage;