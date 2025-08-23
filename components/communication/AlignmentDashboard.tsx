/**
 * Component: AlignmentDashboard
 * Location: app/frontend/components/communication/AlignmentDashboard.tsx
 * Purpose: Frontend component for cross-team alignment dashboard and collaboration insights
 * Features: Provides team coordination metrics, alignment visualization, and collaboration recommendations
 * RELEVANT FILES: communication_service.py, ExecutiveSummary.tsx, StakeholderUpdates.tsx, data_intelligence_service.py
 */

'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  Text,
  Button,
  Group,
  Stack,
  Select,
  MultiSelect,
  Badge,
  Paper,
  Title,
  Divider,
  LoadingOverlay,
  ActionIcon,
  Tooltip,
  Alert,
  Progress,
  SimpleGrid,
  RingProgress,
  Timeline,
  ThemeIcon,
  Tabs,
  Table,
  ScrollArea,
  Center,
  Anchor,
  List,
  Accordion,
  Menu
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import {
  IconUsers,
  IconTrendingUp,
  IconTarget,
  IconCalendar,
  IconClock,
  IconChartBar,
  IconNetwork,
  IconBulb,
  IconAlertCircle,
  IconCheck,
  IconArrowUp,
  IconArrowDown,
  IconMinus,
  IconRefresh,
  IconDownload,
  IconEye,
  IconSparkles,
  IconMessageCircle,
  IconShare,
  IconSettings,
  IconSearch,
  IconFilter,
  IconChartLine,
  IconActivity,
  IconHandStop,
  IconHandClick
} from '@tabler/icons-react';

// TypeScript interfaces for alignment dashboard
interface TeamAlignment {
  team_id: string;
  team_name: string;
  alignment_score: number;
  collaboration_frequency: number;
  shared_objectives: number;
  communication_health: number;
  blockers: number;
  dependencies: string[];
  performance_trend: 'up' | 'down' | 'stable';
}

interface AlignmentMetrics {
  team_alignment_score: number;
  communication_frequency: Record<string, number>;
  objective_alignment: Record<string, number>;
  collaboration_health: number;
  cross_team_dependencies: number;
  active_collaborations: number;
  resolution_time: number;
}

interface CollaborationInsight {
  type: 'opportunity' | 'risk' | 'recommendation';
  title: string;
  description: string;
  teams_involved: string[];
  priority: 'high' | 'medium' | 'low';
  action_required: boolean;
  timeline: string;
}

interface AlignmentDashboardData {
  dashboard_data: {
    alignment_metrics: AlignmentMetrics;
    team_performance: Record<string, TeamAlignment>;
    collaboration_patterns: Record<string, any>;
    communication_health: Record<string, any>;
  };
  insights: CollaborationInsight[];
  recommendations: string[];
  generated_at: string;
  timeframe: string;
  export_formats: string[];
}

interface DashboardRequest {
  company_id: string;
  team_ids: string[];
  timeframe: string;
  focus_areas: string[];
}

const AlignmentDashboard: React.FC = () => {
  // State management for alignment dashboard
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<AlignmentDashboardData | null>(null);
  const [availableTeams, setAvailableTeams] = useState<Array<{ value: string; label: string }>>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [refreshing, setRefreshing] = useState(false);

  // Form for dashboard configuration
  const dashboardForm = useForm<DashboardRequest>({
    initialValues: {
      company_id: '',
      team_ids: [],
      timeframe: 'monthly',
      focus_areas: []
    },
    validate: {
      team_ids: (value) => value.length < 2 ? 'Select at least 2 teams for alignment analysis' : null,
      timeframe: (value) => !value ? 'Timeframe is required' : null,
    }
  });

  // Available timeframe options
  const timeframeOptions = [
    { value: 'weekly', label: 'Weekly View' },
    { value: 'monthly', label: 'Monthly Analysis' },
    { value: 'quarterly', label: 'Quarterly Review' },
    { value: 'custom', label: 'Custom Period' }
  ];

  // Focus area options for alignment analysis
  const focusAreaOptions = [
    { value: 'objectives', label: 'Objective Alignment' },
    { value: 'communication', label: 'Communication Patterns' },
    { value: 'dependencies', label: 'Cross-Team Dependencies' },
    { value: 'performance', label: 'Performance Correlation' },
    { value: 'blockers', label: 'Blocker Resolution' },
    { value: 'collaboration', label: 'Collaboration Quality' }
  ];

  // Load available teams on component mount
  useEffect(() => {
    const loadAvailableTeams = async () => {
      try {
        // Mock team data - would fetch from team management service
        const mockTeams = [
          { value: 'team_1', label: 'Product Development (8 members)' },
          { value: 'team_2', label: 'Engineering (12 members)' },
          { value: 'team_3', label: 'Design & UX (5 members)' },
          { value: 'team_4', label: 'Marketing (6 members)' },
          { value: 'team_5', label: 'Sales (10 members)' },
          { value: 'team_6', label: 'Customer Success (7 members)' }
        ];
        setAvailableTeams(mockTeams);
      } catch (error) {
        console.error('Failed to load teams:', error);
      }
    };

    loadAvailableTeams();
  }, []);

  // Generate alignment dashboard using Communication AI Team
  const handleGenerateDashboard = async (values: DashboardRequest) => {
    setLoading(true);
    try {
      const response = await fetch('/api/communication/alignment-dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (!response.ok) throw new Error('Failed to generate alignment dashboard');

      const dashboardResult: AlignmentDashboardData = await response.json();
      setDashboardData(dashboardResult);
      
      notifications.show({
        title: 'Dashboard Generated',
        message: `Generated alignment dashboard for ${values.team_ids.length} teams`,
        color: 'green',
        icon: <IconCheck size={16} />
      });

    } catch (error) {
      console.error('Dashboard generation failed:', error);
      notifications.show({
        title: 'Generation Failed',
        message: 'Failed to generate alignment dashboard. Please try again.',
        color: 'red',
        icon: <IconAlertCircle size={16} />
      });
    } finally {
      setLoading(false);
    }
  };

  // Refresh dashboard data
  const handleRefreshDashboard = async () => {
    if (!dashboardForm.values.team_ids.length) return;
    
    setRefreshing(true);
    try {
      await handleGenerateDashboard(dashboardForm.values);
    } finally {
      setRefreshing(false);
    }
  };

  // Mock dashboard data for demonstration
  useEffect(() => {
    if (dashboardForm.values.team_ids.length >= 2) {
      const mockDashboardData: AlignmentDashboardData = {
        dashboard_data: {
          alignment_metrics: {
            team_alignment_score: 82,
            communication_frequency: { daily: 15, weekly: 8, monthly: 3 },
            objective_alignment: { 
              team_1: 0.92, 
              team_2: 0.87, 
              team_3: 0.95,
              team_4: 0.78 
            },
            collaboration_health: 85,
            cross_team_dependencies: 12,
            active_collaborations: 8,
            resolution_time: 2.3
          },
          team_performance: {
            team_1: {
              team_id: 'team_1',
              team_name: 'Product Development',
              alignment_score: 92,
              collaboration_frequency: 85,
              shared_objectives: 6,
              communication_health: 88,
              blockers: 2,
              dependencies: ['team_2', 'team_3'],
              performance_trend: 'up'
            },
            team_2: {
              team_id: 'team_2',
              team_name: 'Engineering',
              alignment_score: 87,
              collaboration_frequency: 78,
              shared_objectives: 8,
              communication_health: 82,
              blockers: 1,
              dependencies: ['team_1', 'team_4'],
              performance_trend: 'stable'
            },
            team_3: {
              team_id: 'team_3',
              team_name: 'Design & UX',
              alignment_score: 95,
              collaboration_frequency: 90,
              shared_objectives: 4,
              communication_health: 93,
              blockers: 0,
              dependencies: ['team_1'],
              performance_trend: 'up'
            }
          },
          collaboration_patterns: {},
          communication_health: {}
        },
        insights: [
          {
            type: 'opportunity',
            title: 'Enhanced Product-Engineering Sync',
            description: 'Product Development and Engineering teams show high alignment potential with increased daily standups',
            teams_involved: ['Product Development', 'Engineering'],
            priority: 'high',
            action_required: true,
            timeline: '1 week'
          },
          {
            type: 'risk',
            title: 'Marketing-Sales Communication Gap',
            description: 'Decreased communication frequency between Marketing and Sales may impact lead handoff quality',
            teams_involved: ['Marketing', 'Sales'],
            priority: 'medium',
            action_required: true,
            timeline: '2 weeks'
          },
          {
            type: 'recommendation',
            title: 'Cross-Team Sprint Reviews',
            description: 'Implement monthly cross-team sprint reviews to improve alignment and knowledge sharing',
            teams_involved: ['All Teams'],
            priority: 'medium',
            action_required: false,
            timeline: '1 month'
          }
        ],
        recommendations: [
          'Implement weekly cross-team alignment meetings',
          'Establish shared OKRs for collaborative projects',
          'Create cross-functional communication channels',
          'Set up automated dependency tracking'
        ],
        generated_at: new Date().toISOString(),
        timeframe: 'monthly',
        export_formats: ['html', 'pdf', 'powerpoint']
      };

      setDashboardData(mockDashboardData);
    }
  }, [dashboardForm.values.team_ids]);

  // Render alignment metrics overview
  const renderMetricsOverview = () => {
    if (!dashboardData) return null;

    const metrics = dashboardData.dashboard_data.alignment_metrics;
    
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        <Card withBorder padding="md">
          <Group justify="space-between">
            <div>
              <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                Overall Alignment
              </Text>
              <Text size="xl" fw={700}>
                {metrics.team_alignment_score}%
              </Text>
            </div>
            <RingProgress
              size={60}
              thickness={8}
              sections={[{ value: metrics.team_alignment_score, color: 'blue' }]}
            />
          </Group>
          
          <Group mt="xs">
            <IconArrowUp size={16} color="green" />
            <Text size="sm" c="dimmed">+5% from last period</Text>
          </Group>
        </Card>

        <Card withBorder padding="md">
          <Group justify="space-between">
            <div>
              <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                Collaboration Health
              </Text>
              <Text size="xl" fw={700}>
                {metrics.collaboration_health}%
              </Text>
            </div>
            <RingProgress
              size={60}
              thickness={8}
              sections={[{ value: metrics.collaboration_health, color: 'green' }]}
            />
          </Group>
          
          <Group mt="xs">
            <IconArrowUp size={16} color="green" />
            <Text size="sm" c="dimmed">+3% from last period</Text>
          </Group>
        </Card>

        <Card withBorder padding="md">
          <Group justify="space-between">
            <div>
              <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                Active Collaborations
              </Text>
              <Text size="xl" fw={700}>
                {metrics.active_collaborations}
              </Text>
            </div>
            <ThemeIcon size={50} radius="md" variant="light" color="orange">
              <IconNetwork size={24} />
            </ThemeIcon>
          </Group>
          
          <Group mt="xs">
            <IconMinus size={16} color="gray" />
            <Text size="sm" c="dimmed">Stable</Text>
          </Group>
        </Card>

        <Card withBorder padding="md">
          <Group justify="space-between">
            <div>
              <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                Avg Resolution Time
              </Text>
              <Text size="xl" fw={700}>
                {metrics.resolution_time} days
              </Text>
            </div>
            <ThemeIcon size={50} radius="md" variant="light" color="red">
              <IconClock size={24} />
            </ThemeIcon>
          </Group>
          
          <Group mt="xs">
            <IconArrowDown size={16} color="green" />
            <Text size="sm" c="dimmed">-0.5 days improved</Text>
          </Group>
        </Card>
      </SimpleGrid>
    );
  };

  // Render team alignment details
  const renderTeamAlignment = () => {
    if (!dashboardData) return null;

    const teamData = Object.values(dashboardData.dashboard_data.team_performance);
    
    return (
      <Card withBorder padding="lg">
        <Title order={4} mb="md">
          <IconUsers size={20} style={{ marginRight: 8 }} />
          Team Alignment Details
        </Title>
        
        <ScrollArea>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Team</Table.Th>
                <Table.Th>Alignment Score</Table.Th>
                <Table.Th>Collaboration</Table.Th>
                <Table.Th>Communication</Table.Th>
                <Table.Th>Blockers</Table.Th>
                <Table.Th>Trend</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {teamData.map((team) => (
                <Table.Tr key={team.team_id}>
                  <Table.Td>
                    <Group>
                      <div>
                        <Text fw={500}>{team.team_name}</Text>
                        <Text size="sm" c="dimmed">
                          {team.shared_objectives} shared objectives
                        </Text>
                      </div>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group>
                      <Progress
                        value={team.alignment_score}
                        size="sm"
                        color={team.alignment_score >= 90 ? 'green' : 
                               team.alignment_score >= 80 ? 'yellow' : 'red'}
                        style={{ flex: 1 }}
                      />
                      <Text size="sm" fw={500}>
                        {team.alignment_score}%
                      </Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      variant="light"
                      color={team.collaboration_frequency >= 85 ? 'green' :
                             team.collaboration_frequency >= 70 ? 'yellow' : 'red'}
                    >
                      {team.collaboration_frequency}%
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      variant="light"
                      color={team.communication_health >= 85 ? 'green' :
                             team.communication_health >= 70 ? 'yellow' : 'red'}
                    >
                      {team.communication_health}%
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group>
                      {team.blockers > 0 ? (
                        <Badge variant="light" color="red">
                          {team.blockers} blocker{team.blockers > 1 ? 's' : ''}
                        </Badge>
                      ) : (
                        <Badge variant="light" color="green">
                          No blockers
                        </Badge>
                      )}
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group>
                      {team.performance_trend === 'up' ? (
                        <IconArrowUp size={16} color="green" />
                      ) : team.performance_trend === 'down' ? (
                        <IconArrowDown size={16} color="red" />
                      ) : (
                        <IconMinus size={16} color="gray" />
                      )}
                      <Text size="sm" c="dimmed">
                        {team.performance_trend}
                      </Text>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Card>
    );
  };

  // Render collaboration insights
  const renderCollaborationInsights = () => {
    if (!dashboardData) return null;

    return (
      <Card withBorder padding="lg">
        <Title order={4} mb="md">
          <IconBulb size={20} style={{ marginRight: 8 }} />
          Collaboration Insights
        </Title>
        
        <Stack gap="md">
          {dashboardData.insights.map((insight, index) => (
            <Alert
              key={index}
              icon={insight.type === 'opportunity' ? <IconTrendingUp size={16} /> :
                    insight.type === 'risk' ? <IconAlertCircle size={16} /> :
                    <IconBulb size={16} />}
              title={insight.title}
              color={insight.type === 'opportunity' ? 'green' :
                     insight.type === 'risk' ? 'red' : 'blue'}
              variant="light"
            >
              <Stack gap="xs">
                <Text size="sm">{insight.description}</Text>
                
                <Group>
                  <Badge
                    variant="outline"
                    color={insight.priority === 'high' ? 'red' :
                           insight.priority === 'medium' ? 'yellow' : 'blue'}
                  >
                    {insight.priority} priority
                  </Badge>
                  
                  <Badge variant="outline" color="gray">
                    {insight.timeline}
                  </Badge>
                  
                  {insight.action_required && (
                    <Badge variant="filled" color="orange">
                      Action Required
                    </Badge>
                  )}
                </Group>
                
                <Text size="sm" c="dimmed">
                  Teams: {insight.teams_involved.join(', ')}
                </Text>
              </Stack>
            </Alert>
          ))}
        </Stack>
      </Card>
    );
  };

  // Render recommendations
  const renderRecommendations = () => {
    if (!dashboardData) return null;

    return (
      <Card withBorder padding="lg">
        <Title order={4} mb="md">
          <IconTarget size={20} style={{ marginRight: 8 }} />
          Alignment Recommendations
        </Title>
        
        <List spacing="md">
          {dashboardData.recommendations.map((recommendation, index) => (
            <List.Item
              key={index}
              icon={
                <ThemeIcon color="blue" size={24} radius="xl">
                  <IconCheck size={16} />
                </ThemeIcon>
              }
            >
              <Text>{recommendation}</Text>
            </List.Item>
          ))}
        </List>
        
        <Group justify="flex-end" mt="md">
          <Button leftSection={<IconDownload size={16} />} variant="light">
            Export Action Plan
          </Button>
        </Group>
      </Card>
    );
  };

  // Render dashboard configuration
  const renderDashboardConfiguration = () => (
    <form onSubmit={dashboardForm.onSubmit(handleGenerateDashboard)}>
      <Card withBorder padding="lg">
        <Title order={4} mb="md">
          <IconSettings size={20} style={{ marginRight: 8 }} />
          Dashboard Configuration
        </Title>
        
        <Stack gap="md">
          <MultiSelect
            label="Select Teams"
            placeholder="Choose teams for alignment analysis"
            description="Select at least 2 teams to analyze cross-team alignment"
            data={availableTeams}
            searchable
            required
            leftSection={<IconUsers size={16} />}
            {...dashboardForm.getInputProps('team_ids')}
          />

          <Group grow>
            <Select
              label="Analysis Timeframe"
              placeholder="Select timeframe"
              data={timeframeOptions}
              required
              leftSection={<IconCalendar size={16} />}
              {...dashboardForm.getInputProps('timeframe')}
            />
            
            <MultiSelect
              label="Focus Areas"
              placeholder="Optional focus areas"
              data={focusAreaOptions}
              searchable
              clearable
              leftSection={<IconTarget size={16} />}
              {...dashboardForm.getInputProps('focus_areas')}
            />
          </Group>

          <Group justify="space-between" mt="xl">
            <Group>
              {dashboardData && (
                <Button
                  leftSection={<IconRefresh size={16} />}
                  variant="light"
                  loading={refreshing}
                  onClick={handleRefreshDashboard}
                >
                  Refresh Data
                </Button>
              )}
            </Group>
            
            <Button
              type="submit"
              leftSection={<IconSparkles size={16} />}
              loading={loading}
              disabled={dashboardForm.values.team_ids.length < 2}
            >
              Generate Dashboard
            </Button>
          </Group>
        </Stack>
      </Card>
    </form>
  );

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '20px' }}>
      <LoadingOverlay visible={loading} overlayProps={{ radius: "sm", blur: 2 }} />
      
      {/* Header */}
      <Stack gap="lg" mb="xl">
        <Group justify="space-between">
          <div>
            <Title order={1} mb="xs">
              <IconNetwork size={32} style={{ marginRight: 12 }} />
              Team Alignment Dashboard
            </Title>
            <Text c="dimmed" size="lg">
              Monitor cross-team collaboration and identify alignment opportunities
            </Text>
          </div>
          
          <Badge size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
            Communication AI Team
          </Badge>
        </Group>

        <Alert
          icon={<IconSparkles size={16} />}
          title="Cross-Team Collaboration Intelligence"
          color="blue"
          variant="light"
        >
          Analyze team alignment patterns, collaboration health, and communication effectiveness 
          to optimize cross-functional coordination and productivity.
        </Alert>
      </Stack>

      {/* Configuration */}
      {renderDashboardConfiguration()}

      {/* Dashboard Content */}
      {dashboardData && (
        <Stack gap="xl" mt="xl">
          {/* Metrics Overview */}
          <div>
            <Title order={3} mb="md">Overview</Title>
            {renderMetricsOverview()}
          </div>

          {/* Detailed Views */}
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab value="teams" leftSection={<IconUsers size={16} />}>
                Team Details
              </Tabs.Tab>
              <Tabs.Tab value="insights" leftSection={<IconBulb size={16} />}>
                Insights
              </Tabs.Tab>
              <Tabs.Tab value="recommendations" leftSection={<IconTarget size={16} />}>
                Recommendations
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="teams" pt="md">
              {renderTeamAlignment()}
            </Tabs.Panel>

            <Tabs.Panel value="insights" pt="md">
              {renderCollaborationInsights()}
            </Tabs.Panel>

            <Tabs.Panel value="recommendations" pt="md">
              {renderRecommendations()}
            </Tabs.Panel>
          </Tabs>

          {/* Dashboard Actions */}
          <Card withBorder padding="md">
            <Group justify="space-between">
              <Group>
                <Text size="sm" c="dimmed">
                  Generated: {new Date(dashboardData.generated_at).toLocaleString()}
                </Text>
                <Text size="sm" c="dimmed">
                  Timeframe: {dashboardData.timeframe}
                </Text>
              </Group>
              
              <Group>
                <Button
                  leftSection={<IconShare size={16} />}
                  variant="light"
                >
                  Share Dashboard
                </Button>
                
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Button leftSection={<IconDownload size={16} />} variant="light">
                      Export
                    </Button>
                  </Menu.Target>
                  
                  <Menu.Dropdown>
                    <Menu.Item>Export as PDF</Menu.Item>
                    <Menu.Item>Export as HTML</Menu.Item>
                    <Menu.Item>Export as PowerPoint</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          </Card>
        </Stack>
      )}
    </div>
  );
};

export default AlignmentDashboard;