'use client';

import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, Badge, Title, Text, Progress, Group, Stack, Button, Alert, ActionIcon, Box } from '@mantine/core';
import { ThemeIcon } from '@mantine/core';
import { IconRefresh, IconTrendingUp, IconDatabase, IconMap, IconBrain, IconSend, IconTarget } from '@tabler/icons-react';

// Strategic AI Team Status
interface AITeamStatus {
  id: string;
  name: string;
  status: 'active' | 'processing' | 'idle' | 'error';
  health: number;
  currentTask?: string;
  lastUpdate: string;
  metrics: {
    tasksCompleted: number;
    accuracy: number;
    efficiency: number;
  };
  icon: React.ComponentType<any>;
}

// Strategic Metrics
interface StrategicMetrics {
  totalWorkItems: number;
  syncedItems: number;
  optimizationScore: number;
  roadmapHealth: number;
  whatIfScenariosRun: number;
  jiraUpdatesCompleted: number;
}

// End-to-End Workflow Step
interface WorkflowStep {
  id: string;
  name: string;
  status: 'completed' | 'processing' | 'pending' | 'error';
  progress: number;
  description: string;
  icon: React.ComponentType<any>;
}

const StrategicCommandCenterV2: React.FC = () => {
  const [aiTeams, setAITeams] = useState<AITeamStatus[]>([
    {
      id: 'data-intel',
      name: 'Data Intelligence AI',
      status: 'active',
      health: 95,
      currentTask: 'Processing Jira work items - MDM sync active',
      lastUpdate: '2 minutes ago',
      metrics: { tasksCompleted: 247, accuracy: 97, efficiency: 89 },
      icon: IconDatabase
    },
    {
      id: 'strategic-intel',
      name: 'Strategic Intelligence AI',
      status: 'processing',
      health: 88,
      currentTask: 'Running competitive analysis & roadmap optimization',
      lastUpdate: '5 minutes ago',
      metrics: { tasksCompleted: 156, accuracy: 94, efficiency: 92 },
      icon: IconBrain
    },
    {
      id: 'workflow-exec',
      name: 'Workflow Execution AI',
      status: 'active',
      health: 92,
      currentTask: 'Executing what-if scenario modeling for resource allocation',
      lastUpdate: '1 minute ago',
      metrics: { tasksCompleted: 89, accuracy: 96, efficiency: 87 },
      icon: IconTrendingUp
    },
    {
      id: 'communication',
      name: 'Communication AI',
      status: 'idle',
      health: 91,
      currentTask: 'Standing by for strategic updates to Jira & stakeholders',
      lastUpdate: '3 minutes ago',
      metrics: { tasksCompleted: 203, accuracy: 98, efficiency: 94 },
      icon: IconSend
    }
  ]);

  const [metrics, setMetrics] = useState<StrategicMetrics>({
    totalWorkItems: 11436,
    syncedItems: 10842,
    optimizationScore: 87,
    roadmapHealth: 94,
    whatIfScenariosRun: 23,
    jiraUpdatesCompleted: 189
  });

  // End-to-End Workflow Steps (From Killer Script)
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    {
      id: 'data-ingest',
      name: 'Data Ingest',
      status: 'completed',
      progress: 100,
      description: 'Work items & strategy data synchronized from Jira, integrated systems',
      icon: IconDatabase
    },
    {
      id: 'processing',
      name: 'Processing & Optimization',
      status: 'processing',
      progress: 67,
      description: 'Analyzing missing data, hierarchies, optimization opportunities via AI',
      icon: IconBrain
    },
    {
      id: 'roadmap',
      name: 'Strategic Roadmap Building',
      status: 'processing',
      progress: 45,
      description: 'Building strategic roadmap with competitive intelligence & frameworks',
      icon: IconMap
    },
    {
      id: 'scenarios',
      name: 'What-if Scenario Analysis',
      status: 'processing',
      progress: 30,
      description: 'Running strategic scenario modeling for optimal resource allocation',
      icon: IconTrendingUp
    },
    {
      id: 'jira-updates',
      name: 'Jira & Stakeholder Updates',
      status: 'pending',
      progress: 0,
      description: 'Pushing strategic updates to Jira via MDM, notifying stakeholders',
      icon: IconSend
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'processing': return 'blue';
      case 'idle': return 'gray';
      case 'error': return 'red';
      case 'completed': return 'teal';
      case 'pending': return 'orange';
      default: return 'gray';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'green';
    if (health >= 75) return 'yellow';
    return 'red';
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update processing progress for workflow steps
      setWorkflowSteps(prev => prev.map(step => {
        if (step.status === 'processing' && step.progress < 100) {
          return { ...step, progress: Math.min(step.progress + Math.random() * 5, 100) };
        }
        return step;
      }));

      // Update AI team metrics
      setAITeams(prev => prev.map(team => ({
        ...team,
        metrics: {
          ...team.metrics,
          tasksCompleted: team.metrics.tasksCompleted + Math.floor(Math.random() * 3)
        }
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
              <IconRefresh size={20} />
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
              {metrics.totalWorkItems.toLocaleString()}
            </Text>
            <Text size="sm" c="dimmed">Total Work Items</Text>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Text size="xl" fw={700} c="green">
              {metrics.syncedItems.toLocaleString()}
            </Text>
            <Text size="sm" c="dimmed">Synced Items</Text>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Text size="xl" fw={700} c="yellow">
              {metrics.optimizationScore}%
            </Text>
            <Text size="sm" c="dimmed">Strategic Optimization</Text>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Text size="xl" fw={700} c="blue">
              {metrics.roadmapHealth}%
            </Text>
            <Text size="sm" c="dimmed">Roadmap Health</Text>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Text size="xl" fw={700} c="violet">
              {metrics.whatIfScenariosRun}
            </Text>
            <Text size="sm" c="dimmed">What-if Scenarios</Text>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Text size="xl" fw={700} c="teal">
              {metrics.jiraUpdatesCompleted}
            </Text>
            <Text size="sm" c="dimmed">Jira Updates</Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* End-to-End Workflow (Killer Script Integration) */}
      <Card 
        shadow="md" 
        padding={24} 
        radius={16} 
        mb={48} 
        style={{ background: 'linear-gradient(45deg, #f8fafc 0%, #e2e8f0 100%)' }}
        role="region"
        aria-label="Strategic workflow progress"
      >
        <Group justify="space-between" mb={24}>
          <Title order={2}>🚀 Ultimate Product Agent Workflow</Title>
          <Badge color="blue" variant="light">Live Strategic Intelligence</Badge>
        </Group>
        
        <Text size="sm" c="dimmed" mb={32}>
          <strong>Strategic Intelligence Pipeline:</strong> Data ingest → Processing & Optimization → Strategic Roadmap → What-if Scenarios → Jira & Stakeholder Updates
        </Text>
        
        {/* Desktop Workflow View */}
        <Box visibleFrom="lg">
          <Grid>
            {workflowSteps.map((step, index) => {
              const IconComponent = step.icon;
              const nextStep = index < workflowSteps.length - 1;
              return (
                <React.Fragment key={step.id}>
                  <Grid.Col span={2.4}>
                    <Card shadow="sm" padding="md" radius="md" withBorder style={{ height: '100%' }}>
                      <Stack align="center" gap="xs" style={{ height: '100%' }}>
                        <Badge size="xl" color={getStatusColor(step.status)} variant="light">
                          <Group gap="xs">
                            <IconComponent size={18} />
                            <Text size="xs" fw={600}>{step.progress}%</Text>
                          </Group>
                        </Badge>
                        <Text fw={600} ta="center" size="sm">{step.name}</Text>
                        <Progress value={step.progress} size="md" w="100%" color={getStatusColor(step.status)} />
                        <Text size="xs" c="dimmed" ta="center" style={{ flexGrow: 1 }}>
                          {step.description}
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Col>
                  {nextStep && (
                    <Grid.Col span="auto" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Text c="dimmed" size="xl">→</Text>
                    </Grid.Col>
                  )}
                </React.Fragment>
              );
            })}
          </Grid>
        </Box>
        
        {/* Mobile Workflow View */}
        <Box hiddenFrom="lg">
          <Stack gap="md">
            {workflowSteps.map((step, index) => {
              const IconComponent = step.icon;
              const nextStep = index < workflowSteps.length - 1;
              return (
                <React.Fragment key={step.id}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Group gap="md" align="flex-start">
                      <ThemeIcon size={48} color={getStatusColor(step.status)} variant="light">
                        <IconComponent size={24} />
                      </ThemeIcon>
                      <Stack gap="xs" style={{ flex: 1 }}>
                        <Group justify="space-between">
                          <Text fw={600} size="sm">{step.name}</Text>
                          <Badge size="sm" color={getStatusColor(step.status)} variant="filled">
                            {step.progress}%
                          </Badge>
                        </Group>
                        <Progress value={step.progress} size="md" color={getStatusColor(step.status)} />
                        <Text size="xs" c="dimmed">
                          {step.description}
                        </Text>
                      </Stack>
                    </Group>
                  </Card>
                  {nextStep && (
                    <Group justify="center">
                      <Text c="dimmed" size="lg">↓</Text>
                    </Group>
                  )}
                </React.Fragment>
              );
            })}
          </Stack>
        </Box>
      </Card>

      {/* AI Teams Status */}
      <Grid mb={48}>
        {aiTeams.map((team) => {
          const IconComponent = team.icon;
          return (
            <Grid.Col key={team.id} span={{ base: 12, lg: 6 }}>
              <Card shadow="md" padding={24} radius={16} withBorder style={{ height: '100%' }}>
                <Group justify="apart" mb={24}>
                  <Stack gap="xs">
                    <Group gap="sm">
                      <IconComponent size={24} color="var(--mantine-color-blue-6)" />
                      <Title order={3} size="h4">{team.name}</Title>
                    </Group>
                    <Badge color={getStatusColor(team.status)} variant="light" size="sm">
                      {team.status.toUpperCase()}
                    </Badge>
                  </Stack>
                  <Stack align="center" gap={0}>
                    <Text size="xl" fw={700} c={getHealthColor(team.health)}>
                      {team.health}%
                    </Text>
                    <Text size="xs" c="dimmed">Health Score</Text>
                  </Stack>
                </Group>
                
                <Stack gap={24}>
                  <div>
                    <Text size="sm" c="dimmed" mb="xs">Current Strategic Task:</Text>
                    <Text size="sm" fw={500}>{team.currentTask}</Text>
                  </div>
                  
                  <Grid>
                    <Grid.Col span={4}>
                      <Stack align="center" gap={0}>
                        <Text size="lg" fw={700} c="blue">{team.metrics.tasksCompleted}</Text>
                        <Text size="xs" c="dimmed">Completed</Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Stack align="center" gap={0}>
                        <Text size="lg" fw={700} c="green">{team.metrics.accuracy}%</Text>
                        <Text size="xs" c="dimmed">Accuracy</Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Stack align="center" gap={0}>
                        <Text size="lg" fw={700} c="orange">{team.metrics.efficiency}%</Text>
                        <Text size="xs" c="dimmed">Efficiency</Text>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                  
                  <Text size="xs" c="dimmed">
                    Last updated: {team.lastUpdate}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>

      {/* Strategic Alerts & Activity */}
      <Grid>
        {/* Recent Activity */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card shadow="md" padding={24} radius={16} withBorder>
            <Group justify="apart" mb={24}>
              <Title order={3}>📊 Real-Time Strategic Activity</Title>
              <ActionIcon variant="subtle" color="blue">
                <IconRefresh size={16} />
              </ActionIcon>
            </Group>
            <Stack gap="xs">
              {[
                { time: '2 min ago', action: 'Strategic Intelligence AI completed competitive analysis - identified 3 strategic opportunities', status: 'completed' },
                { time: '5 min ago', action: 'Data Intelligence AI synchronized 189 Jira items via MDM - 95% accuracy', status: 'completed' },
                { time: '8 min ago', action: 'Workflow Execution AI executed scenario analysis - resource allocation optimized', status: 'completed' },
                { time: '12 min ago', action: 'Communication AI prepared stakeholder update - strategic wins identified', status: 'processing' },
                { time: '15 min ago', action: 'Strategic Intelligence AI detected market opportunity - competitive response needed', status: 'active' }
              ].map((activity, index) => (
                <Group key={index} gap="sm" p="sm" style={{ borderRadius: '8px', backgroundColor: 'var(--mantine-color-gray-0)' }}>
                  <Badge size="xs" color={getStatusColor(activity.status)} variant="filled" />
                  <Stack gap={0} style={{ flex: 1 }}>
                    <Text size="sm">{activity.action}</Text>
                    <Text size="xs" c="dimmed">{activity.time}</Text>
                  </Stack>
                </Group>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        {/* Strategic Alerts */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card shadow="md" padding={24} radius={16} withBorder>
            <Title order={3} mb={24}>🚨 Strategic Intelligence Alerts</Title>
            <Stack gap="sm">
              <Alert color="green" variant="light" radius="md">
                <Group>
                  <IconTarget size={20} />
                  <Stack gap={0} style={{ flex: 1 }}>
                    <Text fw={500} size="sm">All AI Teams Operational</Text>
                    <Text size="xs" c="dimmed">Strategic command center running at 91% efficiency</Text>
                  </Stack>
                </Group>
              </Alert>
              
              <Alert color="blue" variant="light" radius="md">
                <Group>
                  <IconBrain size={20} />
                  <Stack gap={0} style={{ flex: 1 }}>
                    <Text fw={500} size="sm">Strategic Opportunity Detected</Text>
                    <Text size="xs" c="dimmed">Competitive intelligence identified 3 strategic response opportunities</Text>
                  </Stack>
                </Group>
              </Alert>
              
              <Alert color="orange" variant="light" radius="md">
                <Group>
                  <IconTrendingUp size={20} />
                  <Stack gap={0} style={{ flex: 1 }}>
                    <Text fw={500} size="sm">What-if Scenario Analysis Ready</Text>
                    <Text size="xs" c="dimmed">23 scenarios modeled - resource optimization recommendations ready</Text>
                  </Stack>
                </Group>
              </Alert>
            </Stack>
            
            <Button 
              fullWidth 
              mt={24} 
              variant="filled" 
              leftSection={<IconSend size={16} />}
              aria-label="Execute strategic updates to Jira and notify stakeholders"
            >
              Execute Strategic Updates to Jira
            </Button>
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
          <Stack gap="sm">
            <Title order={2} c="white">🚀 PM33: The Ultimate Product Agent</Title>
            <Text size="lg" style={{ opacity: 0.9 }}>
              Strategic Intelligence Platform - Transforming PMs into Strategic Superstars
            </Text>
            <Text size="sm" style={{ opacity: 0.8 }}>
              Day 3 Beta Demo: 4 AI teams orchestrating end-to-end strategic workflows
            </Text>
          </Stack>
          <Stack align="end" gap="xs">
            <Badge size="lg" color="white" variant="light">Live Demo Active</Badge>
            <Group gap="xs">
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

export default StrategicCommandCenterV2;