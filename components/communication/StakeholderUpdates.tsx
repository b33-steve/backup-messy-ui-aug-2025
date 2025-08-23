/**
 * Component: StakeholderUpdates
 * Location: app/frontend/components/communication/StakeholderUpdates.tsx
 * Purpose: Frontend component for creating AI-powered stakeholder updates and team communications
 * Features: Provides context-aware update templates, automated content generation, and multi-audience targeting
 * RELEVANT FILES: communication_service.py, ExecutiveSummary.tsx, AlignmentDashboard.tsx, workflow_execution_service.py
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
  Textarea,
  MultiSelect,
  Badge,
  Paper,
  Title,
  Divider,
  LoadingOverlay,
  ActionIcon,
  Modal,
  Tooltip,
  Alert,
  Menu,
  Progress,
  Timeline,
  List,
  Tabs,
  Switch,
  NumberInput,
  ThemeIcon,
  SimpleGrid,
  Accordion
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { DatePickerInput } from '@mantine/dates';
import {
  IconUsers,
  IconSend,
  IconEdit,
  IconEye,
  IconCopy,
  IconCheck,
  IconAlertCircle,
  IconSparkles,
  IconClock,
  IconTrendingUp,
  IconTarget,
  IconCalendar,
  IconFileText,
  IconBulb,
  IconChartBar,
  IconMessageCircle,
  IconShare,
  IconDownload,
  IconSettings,
  IconPlus,
  IconMinus,
  IconRefresh
} from '@tabler/icons-react';

// TypeScript interfaces for stakeholder updates
interface TeamContext {
  team_id: string;
  team_name: string;
  members: number;
  current_sprint: string;
  velocity: number;
  completion_rate: number;
  active_projects: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  date: string;
  team_members: string[];
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  mitigation: string;
  owner: string;
  due_date: string;
}

interface NextStep {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignee: string;
  due_date: string;
  dependencies: string[];
}

interface TeamUpdateRequest {
  company_id: string;
  team_context: TeamContext;
  achievements: Achievement[];
  challenges: Challenge[];
  next_steps: NextStep[];
  update_frequency: string;
  target_audience: string[];
  custom_sections: string[];
}

interface GeneratedUpdate {
  update: {
    title: string;
    content: string;
    structure: string[];
    metadata: {
      generated_at: string;
      audience: string;
      word_count: number;
    };
  };
  template_used: string;
  team_metrics: Record<string, any>;
  generated_at: string;
  next_update_due: string;
  export_formats: string[];
}

const StakeholderUpdates: React.FC = () => {
  // State management for stakeholder updates
  const [loading, setLoading] = useState(false);
  const [generatedUpdate, setGeneratedUpdate] = useState<GeneratedUpdate | null>(null);
  const [selectedTeams, setSelectedTeams] = useState<TeamContext[]>([]);
  const [availableTeams, setAvailableTeams] = useState<TeamContext[]>([]);
  const [activeTab, setActiveTab] = useState<string>('configuration');
  const [previewMode, setPreviewMode] = useState(false);
  const [autoSchedule, setAutoSchedule] = useState(false);

  // Form for team update configuration
  const updateForm = useForm<TeamUpdateRequest>({
    initialValues: {
      company_id: '',
      team_context: {
        team_id: '',
        team_name: '',
        members: 0,
        current_sprint: '',
        velocity: 0,
        completion_rate: 0,
        active_projects: 0
      },
      achievements: [],
      challenges: [],
      next_steps: [],
      update_frequency: 'weekly',
      target_audience: [],
      custom_sections: []
    },
    validate: {
      company_id: (value) => value.length === 0 ? 'Team selection is required' : null,
      update_frequency: (value) => !value ? 'Update frequency is required' : null,
      target_audience: (value) => value.length === 0 ? 'At least one audience must be selected' : null,
    }
  });

  // Available audience types for stakeholder updates
  const audienceOptions = [
    { value: 'team_members', label: 'Team Members' },
    { value: 'management', label: 'Management' },
    { value: 'stakeholders', label: 'Stakeholders' },
    { value: 'cross_functional', label: 'Cross-Functional Teams' },
    { value: 'executives', label: 'Executive Leadership' },
    { value: 'clients', label: 'External Clients' }
  ];

  // Update frequency options
  const frequencyOptions = [
    { value: 'daily', label: 'Daily Standups' },
    { value: 'weekly', label: 'Weekly Updates' },
    { value: 'bi_weekly', label: 'Bi-Weekly Reports' },
    { value: 'monthly', label: 'Monthly Summaries' },
    { value: 'quarterly', label: 'Quarterly Reviews' },
    { value: 'custom', label: 'Custom Schedule' }
  ];

  // Custom section options
  const customSectionOptions = [
    { value: 'team_health', label: 'Team Health Metrics' },
    { value: 'innovation_highlights', label: 'Innovation Highlights' },
    { value: 'customer_feedback', label: 'Customer Feedback' },
    { value: 'learning_development', label: 'Learning & Development' },
    { value: 'process_improvements', label: 'Process Improvements' },
    { value: 'technical_debt', label: 'Technical Debt Status' },
    { value: 'security_updates', label: 'Security Updates' },
    { value: 'compliance_status', label: 'Compliance Status' }
  ];

  // Load available teams on component mount
  useEffect(() => {
    const loadAvailableTeams = async () => {
      try {
        // Mock team data - would fetch from team management service
        const mockTeams: TeamContext[] = [
          {
            team_id: 'team_1',
            team_name: 'Product Development',
            members: 8,
            current_sprint: 'Sprint 24',
            velocity: 42,
            completion_rate: 87,
            active_projects: 3
          },
          {
            team_id: 'team_2',
            team_name: 'Engineering',
            members: 12,
            current_sprint: 'Sprint 15',
            velocity: 38,
            completion_rate: 92,
            active_projects: 5
          },
          {
            team_id: 'team_3',
            team_name: 'Design & UX',
            members: 5,
            current_sprint: 'Design Sprint 8',
            velocity: 28,
            completion_rate: 94,
            active_projects: 2
          }
        ];
        setAvailableTeams(mockTeams);
      } catch (error) {
        console.error('Failed to load teams:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to load available teams',
          color: 'red',
          icon: <IconAlertCircle size={16} />
        });
      }
    };

    loadAvailableTeams();
  }, []);

  // Handle team selection and context loading
  const handleTeamSelection = async (teamId: string) => {
    const selectedTeam = availableTeams.find(team => team.team_id === teamId);
    if (!selectedTeam) return;

    updateForm.setFieldValue('company_id', teamId);
    updateForm.setFieldValue('team_context', selectedTeam);

    // Load team achievements, challenges, and next steps
    await loadTeamData(teamId);
  };

  // Load team-specific data
  const loadTeamData = async (teamId: string) => {
    try {
      // Mock data - would fetch from team performance service
      const mockAchievements: Achievement[] = [
        {
          id: 'ach_1',
          title: 'Feature Release Success',
          description: 'Successfully deployed new user dashboard with 98% uptime',
          impact: 'high',
          date: '2024-01-15',
          team_members: ['John Doe', 'Jane Smith']
        },
        {
          id: 'ach_2',
          title: 'Performance Optimization',
          description: 'Reduced page load time by 40% through code optimization',
          impact: 'medium',
          date: '2024-01-12',
          team_members: ['Mike Johnson']
        }
      ];

      const mockChallenges: Challenge[] = [
        {
          id: 'ch_1',
          title: 'Database Performance',
          description: 'Query response times increasing during peak hours',
          severity: 'high',
          mitigation: 'Implementing database indexing and caching',
          owner: 'Tech Lead',
          due_date: '2024-01-25'
        }
      ];

      const mockNextSteps: NextStep[] = [
        {
          id: 'ns_1',
          title: 'API Integration',
          description: 'Complete integration with third-party analytics API',
          priority: 'high',
          assignee: 'Development Team',
          due_date: '2024-01-30',
          dependencies: ['Database optimization']
        }
      ];

      updateForm.setFieldValue('achievements', mockAchievements);
      updateForm.setFieldValue('challenges', mockChallenges);
      updateForm.setFieldValue('next_steps', mockNextSteps);

    } catch (error) {
      console.error('Failed to load team data:', error);
    }
  };

  // Generate stakeholder update using Communication AI Team
  const handleGenerateUpdate = async (values: TeamUpdateRequest) => {
    setLoading(true);
    try {
      const response = await fetch('/api/communication/team-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (!response.ok) throw new Error('Failed to generate team update');

      const updateData: GeneratedUpdate = await response.json();
      setGeneratedUpdate(updateData);
      setActiveTab('preview');
      
      notifications.show({
        title: 'Update Generated',
        message: `Successfully generated ${updateData.update.metadata.word_count} word team update`,
        color: 'green',
        icon: <IconCheck size={16} />
      });

    } catch (error) {
      console.error('Update generation failed:', error);
      notifications.show({
        title: 'Generation Failed',
        message: 'Failed to generate team update. Please try again.',
        color: 'red',
        icon: <IconAlertCircle size={16} />
      });
    } finally {
      setLoading(false);
    }
  };

  // Add new achievement
  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: `ach_${Date.now()}`,
      title: '',
      description: '',
      impact: 'medium',
      date: new Date().toISOString().split('T')[0],
      team_members: []
    };
    
    updateForm.setFieldValue('achievements', [...updateForm.values.achievements, newAchievement]);
  };

  // Add new challenge
  const addChallenge = () => {
    const newChallenge: Challenge = {
      id: `ch_${Date.now()}`,
      title: '',
      description: '',
      severity: 'medium',
      mitigation: '',
      owner: '',
      due_date: new Date().toISOString().split('T')[0]
    };
    
    updateForm.setFieldValue('challenges', [...updateForm.values.challenges, newChallenge]);
  };

  // Add new next step
  const addNextStep = () => {
    const newStep: NextStep = {
      id: `ns_${Date.now()}`,
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      due_date: new Date().toISOString().split('T')[0],
      dependencies: []
    };
    
    updateForm.setFieldValue('next_steps', [...updateForm.values.next_steps, newStep]);
  };

  // Render team selection and context
  const renderTeamConfiguration = () => (
    <Stack gap="md">
      <Select
        label="Select Team"
        placeholder="Choose team for update"
        description="Select the team to generate stakeholder updates for"
        data={availableTeams.map(team => ({
          value: team.team_id,
          label: `${team.team_name} (${team.members} members)`
        }))}
        searchable
        required
        leftSection={<IconUsers size={16} />}
        onChange={(value) => value && handleTeamSelection(value)}
      />

      {updateForm.values.team_context.team_name && (
        <Paper p="md" withBorder radius="md" style={{ backgroundColor: 'var(--mantine-color-blue-0)' }}>
          <Group justify="space-between" mb="md">
            <Title order={4}>
              <IconChartBar size={20} style={{ marginRight: 8 }} />
              Team Context: {updateForm.values.team_context.team_name}
            </Title>
          </Group>

          <SimpleGrid cols={4} spacing="md">
            <div>
              <Text size="sm" fw={500} c="dimmed">Team Members</Text>
              <Text size="lg" fw={700}>{updateForm.values.team_context.members}</Text>
            </div>
            <div>
              <Text size="sm" fw={500} c="dimmed">Current Sprint</Text>
              <Text size="lg" fw={700}>{updateForm.values.team_context.current_sprint}</Text>
            </div>
            <div>
              <Text size="sm" fw={500} c="dimmed">Velocity</Text>
              <Text size="lg" fw={700}>{updateForm.values.team_context.velocity}</Text>
            </div>
            <div>
              <Text size="sm" fw={500} c="dimmed">Completion Rate</Text>
              <Text size="lg" fw={700}>{updateForm.values.team_context.completion_rate}%</Text>
            </div>
          </SimpleGrid>
        </Paper>
      )}

      <Group grow>
        <Select
          label="Update Frequency"
          placeholder="Select frequency"
          data={frequencyOptions}
          required
          leftSection={<IconClock size={16} />}
          {...updateForm.getInputProps('update_frequency')}
        />
        
        <MultiSelect
          label="Target Audience"
          placeholder="Select audiences"
          data={audienceOptions}
          required
          searchable
          leftSection={<IconUsers size={16} />}
          {...updateForm.getInputProps('target_audience')}
        />
      </Group>

      <MultiSelect
        label="Custom Sections"
        placeholder="Add optional sections"
        description="Include additional sections in your update"
        data={customSectionOptions}
        searchable
        clearable
        leftSection={<IconPlus size={16} />}
        {...updateForm.getInputProps('custom_sections')}
      />

      <Group>
        <Switch
          label="Auto-schedule updates"
          description="Automatically generate and send updates based on frequency"
          checked={autoSchedule}
          onChange={(event) => setAutoSchedule(event.currentTarget.checked)}
        />
      </Group>
    </Stack>
  );

  // Render achievements section
  const renderAchievements = () => (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={4}>
          <IconTrendingUp size={20} style={{ marginRight: 8 }} />
          Team Achievements
        </Title>
        <Button
          leftSection={<IconPlus size={16} />}
          variant="light"
          onClick={addAchievement}
        >
          Add Achievement
        </Button>
      </Group>

      {updateForm.values.achievements.map((achievement, index) => (
        <Card key={achievement.id} withBorder padding="md">
          <Stack gap="sm">
            <Group justify="space-between">
              <Badge
                color={achievement.impact === 'high' ? 'green' : 
                       achievement.impact === 'medium' ? 'yellow' : 'blue'}
                variant="light"
              >
                {achievement.impact.toUpperCase()} IMPACT
              </Badge>
              
              <ActionIcon
                color="red"
                variant="light"
                onClick={() => {
                  const newAchievements = updateForm.values.achievements.filter((_, i) => i !== index);
                  updateForm.setFieldValue('achievements', newAchievements);
                }}
              >
                <IconMinus size={16} />
              </ActionIcon>
            </Group>

            <Textarea
              placeholder="Achievement title"
              value={achievement.title}
              onChange={(event) => {
                const newAchievements = [...updateForm.values.achievements];
                newAchievements[index].title = event.currentTarget.value;
                updateForm.setFieldValue('achievements', newAchievements);
              }}
            />

            <Textarea
              placeholder="Achievement description"
              value={achievement.description}
              onChange={(event) => {
                const newAchievements = [...updateForm.values.achievements];
                newAchievements[index].description = event.currentTarget.value;
                updateForm.setFieldValue('achievements', newAchievements);
              }}
            />
          </Stack>
        </Card>
      ))}

      {updateForm.values.achievements.length === 0 && (
        <Alert icon={<IconBulb size={16} />} color="blue" variant="light">
          <Text size="sm">
            Add team achievements to highlight successes and recognize contributions in your update.
          </Text>
        </Alert>
      )}
    </Stack>
  );

  // Render challenges section
  const renderChallenges = () => (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={4}>
          <IconAlertCircle size={20} style={{ marginRight: 8 }} />
          Current Challenges
        </Title>
        <Button
          leftSection={<IconPlus size={16} />}
          variant="light"
          onClick={addChallenge}
        >
          Add Challenge
        </Button>
      </Group>

      {updateForm.values.challenges.map((challenge, index) => (
        <Card key={challenge.id} withBorder padding="md">
          <Stack gap="sm">
            <Group justify="space-between">
              <Badge
                color={challenge.severity === 'critical' ? 'red' :
                       challenge.severity === 'high' ? 'orange' :
                       challenge.severity === 'medium' ? 'yellow' : 'blue'}
                variant="light"
              >
                {challenge.severity.toUpperCase()} SEVERITY
              </Badge>
              
              <ActionIcon
                color="red"
                variant="light"
                onClick={() => {
                  const newChallenges = updateForm.values.challenges.filter((_, i) => i !== index);
                  updateForm.setFieldValue('challenges', newChallenges);
                }}
              >
                <IconMinus size={16} />
              </ActionIcon>
            </Group>

            <Textarea
              placeholder="Challenge title"
              value={challenge.title}
              onChange={(event) => {
                const newChallenges = [...updateForm.values.challenges];
                newChallenges[index].title = event.currentTarget.value;
                updateForm.setFieldValue('challenges', newChallenges);
              }}
            />

            <Textarea
              placeholder="Challenge description"
              value={challenge.description}
              onChange={(event) => {
                const newChallenges = [...updateForm.values.challenges];
                newChallenges[index].description = event.currentTarget.value;
                updateForm.setFieldValue('challenges', newChallenges);
              }}
            />

            <Textarea
              placeholder="Mitigation strategy"
              value={challenge.mitigation}
              onChange={(event) => {
                const newChallenges = [...updateForm.values.challenges];
                newChallenges[index].mitigation = event.currentTarget.value;
                updateForm.setFieldValue('challenges', newChallenges);
              }}
            />
          </Stack>
        </Card>
      ))}
    </Stack>
  );

  // Render next steps section
  const renderNextSteps = () => (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={4}>
          <IconTarget size={20} style={{ marginRight: 8 }} />
          Next Steps & Priorities
        </Title>
        <Button
          leftSection={<IconPlus size={16} />}
          variant="light"
          onClick={addNextStep}
        >
          Add Next Step
        </Button>
      </Group>

      {updateForm.values.next_steps.map((step, index) => (
        <Card key={step.id} withBorder padding="md">
          <Stack gap="sm">
            <Group justify="space-between">
              <Badge
                color={step.priority === 'critical' ? 'red' :
                       step.priority === 'high' ? 'orange' :
                       step.priority === 'medium' ? 'yellow' : 'blue'}
                variant="light"
              >
                {step.priority.toUpperCase()} PRIORITY
              </Badge>
              
              <ActionIcon
                color="red"
                variant="light"
                onClick={() => {
                  const newSteps = updateForm.values.next_steps.filter((_, i) => i !== index);
                  updateForm.setFieldValue('next_steps', newSteps);
                }}
              >
                <IconMinus size={16} />
              </ActionIcon>
            </Group>

            <Textarea
              placeholder="Next step title"
              value={step.title}
              onChange={(event) => {
                const newSteps = [...updateForm.values.next_steps];
                newSteps[index].title = event.currentTarget.value;
                updateForm.setFieldValue('next_steps', newSteps);
              }}
            />

            <Textarea
              placeholder="Step description"
              value={step.description}
              onChange={(event) => {
                const newSteps = [...updateForm.values.next_steps];
                newSteps[index].description = event.currentTarget.value;
                updateForm.setFieldValue('next_steps', newSteps);
              }}
            />

            <Group grow>
              <Textarea
                placeholder="Assignee"
                value={step.assignee}
                onChange={(event) => {
                  const newSteps = [...updateForm.values.next_steps];
                  newSteps[index].assignee = event.currentTarget.value;
                  updateForm.setFieldValue('next_steps', newSteps);
                }}
              />
            </Group>
          </Stack>
        </Card>
      ))}
    </Stack>
  );

  // Render generated update preview
  const renderUpdatePreview = () => {
    if (!generatedUpdate) return null;

    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Title order={3}>
              <IconFileText size={24} style={{ marginRight: 8 }} />
              {generatedUpdate.update.title}
            </Title>
            
            <Group>
              <Badge variant="light" color="blue">
                {generatedUpdate.template_used.replace('_', ' ')}
              </Badge>
              <Badge variant="light" color="green">
                {generatedUpdate.update.metadata.word_count} words
              </Badge>
            </Group>
          </Group>

          <Group>
            <Text size="sm" c="dimmed">
              Generated: {new Date(generatedUpdate.generated_at).toLocaleDateString()}
            </Text>
            <Text size="sm" c="dimmed">
              Next update due: {new Date(generatedUpdate.next_update_due).toLocaleDateString()}
            </Text>
            <Text size="sm" c="dimmed">
              Audience: {generatedUpdate.update.metadata.audience}
            </Text>
          </Group>

          <Divider />

          <Paper p="md" withBorder radius="md">
            <div
              dangerouslySetInnerHTML={{ __html: generatedUpdate.update.content }}
              style={{ 
                lineHeight: 1.6,
                fontSize: '14px',
                whiteSpace: 'pre-wrap'
              }}
            />
          </Paper>

          <Group justify="flex-end" mt="md">
            <Button
              leftSection={<IconCopy size={16} />}
              variant="light"
              onClick={() => {
                navigator.clipboard.writeText(generatedUpdate.update.content);
                notifications.show({
                  title: 'Copied',
                  message: 'Update content copied to clipboard',
                  color: 'blue',
                  icon: <IconCheck size={16} />
                });
              }}
            >
              Copy Content
            </Button>
            
            <Button
              leftSection={<IconDownload size={16} />}
              variant="light"
            >
              Export
            </Button>
            
            <Button
              leftSection={<IconSend size={16} />}
            >
              Send Update
            </Button>
          </Group>
        </Stack>
      </Card>
    );
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
      <LoadingOverlay visible={loading} overlayProps={{ radius: "sm", blur: 2 }} />
      
      {/* Header */}
      <Stack gap="lg" mb="xl">
        <Group justify="space-between">
          <div>
            <Title order={1} mb="xs">
              <IconMessageCircle size={32} style={{ marginRight: 12 }} />
              Stakeholder Updates
            </Title>
            <Text c="dimmed" size="lg">
              Create AI-powered team updates and stakeholder communications
            </Text>
          </div>
          
          <Badge size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
            Communication AI Team
          </Badge>
        </Group>

        <Alert
          icon={<IconSparkles size={16} />}
          title="Context-Aware Team Communication"
          color="blue"
          variant="light"
        >
          Generate professional stakeholder updates that highlight achievements, address challenges, 
          and communicate next steps with AI-powered content generation.
        </Alert>
      </Stack>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="configuration" leftSection={<IconSettings size={16} />}>
            Configuration
          </Tabs.Tab>
          <Tabs.Tab value="achievements" leftSection={<IconTrendingUp size={16} />}>
            Achievements
          </Tabs.Tab>
          <Tabs.Tab value="challenges" leftSection={<IconAlertCircle size={16} />}>
            Challenges
          </Tabs.Tab>
          <Tabs.Tab value="next_steps" leftSection={<IconTarget size={16} />}>
            Next Steps
          </Tabs.Tab>
          <Tabs.Tab 
            value="preview" 
            leftSection={<IconEye size={16} />}
            disabled={!generatedUpdate}
          >
            Preview
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="configuration" pt="md">
          <form onSubmit={updateForm.onSubmit(handleGenerateUpdate)}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              {renderTeamConfiguration()}
              
              <Group justify="flex-end" mt="xl">
                <Button
                  type="submit"
                  leftSection={<IconSparkles size={16} />}
                  loading={loading}
                  disabled={!updateForm.values.company_id || updateForm.values.target_audience.length === 0}
                >
                  Generate Update
                </Button>
              </Group>
            </Card>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="achievements" pt="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            {renderAchievements()}
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="challenges" pt="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            {renderChallenges()}
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="next_steps" pt="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            {renderNextSteps()}
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="preview" pt="md">
          {renderUpdatePreview()}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default StakeholderUpdates;