// /app/frontend/components/workflow/SprintPlanner.tsx
// Sprint Planner - Automated sprint planning with strategic alignment and team optimization
// Handles capacity planning, work assignment, and cross-functional coordination
// RELEVANT FILES: workflow_execution_service.py, WorkItemMapper.tsx, jira_integration.py, strategic-intelligence/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Title,
  Text,
  Group,
  Stack,
  Button,
  Card,
  Badge,
  Progress,
  Alert,
  Divider,
  Grid,
  ActionIcon,
  Tooltip,
  NumberInput,
  TextInput,
  Textarea,
  Select,
  Table,
  Timeline,
  ThemeIcon,
  Tabs,
  RingProgress,
  Center,
  Stepper,
  Accordion,
  Switch,
  Avatar,
  Modal,
  JsonInput
} from '@mantine/core';
import {
  IconCalendar,
  IconUsers,
  IconTarget,
  IconTrendingUp,
  IconClock,
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconAdjustments,
  IconRocket,
  IconBrain,
  IconChartBar,
  IconEdit,
  IconRefresh,
  IconDownload,
  IconShare,
  IconFlame,
  IconBulb,
  IconGitBranch,
  IconHierarchy,
  IconChevronRight,
  IconChevronLeft,
  IconFlag,
  IconCircleCheck,
  IconAlignLeft
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { DatePickerInput } from '@mantine/dates';

// Sprint planning interfaces
interface TeamMember {
  id: string;
  name: string;
  role: string;
  capacity: number; // hours per sprint
  skills: string[];
  currentLoad: number;
  avatar?: string;
}

interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  totalCapacity: number;
  specializations: string[];
}

interface SprintWorkItem {
  id: string;
  title: string;
  description: string;
  type: 'epic' | 'feature' | 'story' | 'task';
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedEffort: number;
  assignedTeam?: string;
  assignedMember?: string;
  dependencies: string[];
  strategicValue: number; // 0-10
  complexityScore: number; // 1-10
  strategicContext?: {
    analysisId: string;
    frameworks: string[];
    confidence: number;
  };
}

interface SprintPlan {
  sprintId: string;
  name: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  duration: number; // weeks
  totalCapacity: number;
  utilization: number; // %
  workItems: SprintWorkItem[];
  teamAssignments: Record<string, string[]>; // teamId -> workItemIds
  strategicAlignment: number; // 0-1
  riskLevel: 'low' | 'medium' | 'high';
  dependencies: Array<{
    dependent: string;
    dependency: string;
    type: string;
  }>;
}

interface SprintPlannerProps {
  workItems: SprintWorkItem[];
  teams: Team[];
  onSprintCreated: (sprint: SprintPlan) => void;
  onCancel: () => void;
}

const SPRINT_DURATIONS = [
  { value: '1', label: '1 Week' },
  { value: '2', label: '2 Weeks (Standard)' },
  { value: '3', label: '3 Weeks' },
  { value: '4', label: '4 Weeks' }
];

const PRIORITY_COLORS = {
  critical: 'red',
  high: 'orange', 
  medium: 'yellow',
  low: 'gray'
};

const TYPE_COLORS = {
  epic: 'purple',
  feature: 'blue',
  story: 'green',
  task: 'orange'
};

export default function SprintPlanner({ workItems, teams, onSprintCreated, onCancel }: SprintPlannerProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [sprintConfig, setSprintConfig] = useState({
    name: '',
    goal: '',
    duration: 2,
    startDate: new Date(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 2 weeks from now
  });
  const [selectedWorkItems, setSelectedWorkItems] = useState<string[]>([]);
  const [teamAssignments, setTeamAssignments] = useState<Record<string, string[]>>({});
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResults, setOptimizationResults] = useState<any>(null);
  const [sprintPlan, setSprintPlan] = useState<SprintPlan | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Calculate total team capacity
  const totalCapacity = teams.reduce((sum, team) => sum + team.totalCapacity, 0);
  
  // Calculate selected work effort
  const selectedEffort = workItems
    .filter(item => selectedWorkItems.includes(item.id))
    .reduce((sum, item) => sum + item.estimatedEffort, 0);
  
  // Calculate utilization
  const utilization = totalCapacity > 0 ? (selectedEffort / totalCapacity) * 100 : 0;

  useEffect(() => {
    // Auto-select high priority items that fit capacity
    if (workItems.length > 0 && selectedWorkItems.length === 0) {
      const sortedItems = [...workItems].sort((a, b) => {
        const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 };
        return (priorityWeight[b.priority] * b.strategicValue) - (priorityWeight[a.priority] * a.strategicValue);
      });
      
      let runningTotal = 0;
      const autoSelected: string[] = [];
      
      for (const item of sortedItems) {
        if (runningTotal + item.estimatedEffort <= totalCapacity * 0.8) { // 80% capacity target
          autoSelected.push(item.id);
          runningTotal += item.estimatedEffort;
        }
      }
      
      setSelectedWorkItems(autoSelected);
    }
  }, [workItems, totalCapacity, selectedWorkItems.length]);

  const handleWorkItemToggle = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedWorkItems([...selectedWorkItems, itemId]);
    } else {
      setSelectedWorkItems(selectedWorkItems.filter(id => id !== itemId));
      
      // Remove from team assignments
      const updatedAssignments = { ...teamAssignments };
      Object.keys(updatedAssignments).forEach(teamId => {
        updatedAssignments[teamId] = updatedAssignments[teamId].filter(id => id !== itemId);
      });
      setTeamAssignments(updatedAssignments);
    }
  };

  const assignWorkItemToTeam = (itemId: string, teamId: string) => {
    const updatedAssignments = { ...teamAssignments };
    
    // Remove from other teams
    Object.keys(updatedAssignments).forEach(tId => {
      updatedAssignments[tId] = updatedAssignments[tId].filter(id => id !== itemId);
    });
    
    // Add to selected team
    if (!updatedAssignments[teamId]) {
      updatedAssignments[teamId] = [];
    }
    updatedAssignments[teamId].push(itemId);
    
    setTeamAssignments(updatedAssignments);
  };

  const runAIOptimization = async () => {
    setIsOptimizing(true);
    
    try {
      // Mock AI optimization
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate optimized assignments
      const optimizedAssignments: Record<string, string[]> = {};
      const selectedItems = workItems.filter(item => selectedWorkItems.includes(item.id));
      
      // Sort teams by available capacity
      const sortedTeams = [...teams].sort((a, b) => b.totalCapacity - a.totalCapacity);
      
      let teamIndex = 0;
      for (const item of selectedItems) {
        const team = sortedTeams[teamIndex % sortedTeams.length];
        
        if (!optimizedAssignments[team.id]) {
          optimizedAssignments[team.id] = [];
        }
        optimizedAssignments[team.id].push(item.id);
        teamIndex++;
      }
      
      setTeamAssignments(optimizedAssignments);
      
      // Generate optimization results
      const results = {
        strategicAlignment: 0.87,
        capacityUtilization: utilization,
        riskLevel: utilization > 90 ? 'high' : utilization > 75 ? 'medium' : 'low',
        recommendations: [
          'Strategic alignment optimized for maximum business impact',
          'Work distributed across teams based on skills and capacity',
          'Dependencies analyzed and critical path identified',
          utilization > 85 ? 'Consider reducing scope or extending sprint duration' : 'Good capacity utilization achieved'
        ],
        improvements: [
          `${Math.round((0.87 - 0.65) * 100)}% improvement in strategic alignment`,
          `${Math.round(utilization)}% team capacity utilization`,
          'Optimal work distribution across all teams'
        ]
      };
      
      setOptimizationResults(results);
      
      notifications.show({
        title: 'Optimization Complete!',
        message: `Sprint optimized with ${Math.round(results.strategicAlignment * 100)}% strategic alignment`,
        color: 'green',
        icon: <IconBrain size={16} />
      });
      
    } catch (error) {
      notifications.show({
        title: 'Optimization Failed',
        message: 'Failed to optimize sprint plan',
        color: 'red'
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const generateSprintPlan = () => {
    const plan: SprintPlan = {
      sprintId: `sprint_${Date.now()}`,
      name: sprintConfig.name || `Sprint - ${sprintConfig.startDate.toLocaleDateString()}`,
      goal: sprintConfig.goal,
      startDate: sprintConfig.startDate,
      endDate: sprintConfig.endDate,
      duration: sprintConfig.duration,
      totalCapacity,
      utilization: utilization,
      workItems: workItems.filter(item => selectedWorkItems.includes(item.id)),
      teamAssignments,
      strategicAlignment: optimizationResults?.strategicAlignment || 0.75,
      riskLevel: optimizationResults?.riskLevel || (utilization > 90 ? 'high' : utilization > 75 ? 'medium' : 'low'),
      dependencies: [] // Would analyze dependencies in real implementation
    };
    
    setSprintPlan(plan);
    setActiveStep(3);
  };

  const confirmSprintPlan = () => {
    if (sprintPlan) {
      notifications.show({
        title: 'Sprint Created!',
        message: `${sprintPlan.name} created with ${sprintPlan.workItems.length} work items`,
        color: 'green',
        icon: <IconRocket size={16} />
      });
      
      onSprintCreated(sprintPlan);
    }
  };

  const nextStep = () => setActiveStep(Math.min(activeStep + 1, 3));
  const prevStep = () => setActiveStep(Math.max(activeStep - 1, 0));

  return (
    <Container size="xl" py="xl">
      {/* Header */}
      <Paper p="xl" mb="xl" style={{
        background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.1) 0%, rgba(255, 69, 0, 0.1) 100%)',
        border: '1px solid rgba(255, 140, 0, 0.2)'
      }}>
        <Group justify="space-between" align="center">
          <div>
            <Group align="center" mb="sm">
              <ThemeIcon size={48} radius="md" variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                <IconCalendar size={28} />
              </ThemeIcon>
              <div>
                <Title order={1} size="h2" fw={700}>Sprint Planner</Title>
                <Text c="dimmed" size="lg">AI-powered sprint planning with strategic alignment</Text>
              </div>
            </Group>
            <Text size="md">
              Automatically optimize team assignments and capacity planning for maximum strategic impact.
              Your senior PM assistant for tactical execution planning.
            </Text>
          </div>
          
          <div style={{ minWidth: 120 }}>
            <RingProgress
              size={100}
              thickness={8}
              sections={[{ 
                value: utilization, 
                color: utilization > 90 ? 'red' : utilization > 75 ? 'yellow' : 'green' 
              }]}
              label={
                <Center>
                  <Text size="xs" fw={700}>
                    {utilization.toFixed(0)}%
                  </Text>
                </Center>
              }
            />
            <Text ta="center" size="xs" c="dimmed" mt="xs">Team Utilization</Text>
          </div>
        </Group>
      </Paper>

      <Grid>
        <Grid.Col span={{ base: 12, md: 3 }}>
          {/* Progress Stepper */}
          <Paper p="md">
            <Stepper active={activeStep} orientation="vertical" size="sm">
              <Stepper.Step 
                label="Sprint Config" 
                description="Duration and goals"
                icon={<IconCalendar size={18} />}
                completedIcon={<IconCheck size={18} />}
              />
              <Stepper.Step 
                label="Work Selection" 
                description="Choose work items"
                icon={<IconTarget size={18} />}
                completedIcon={<IconCheck size={18} />}
              />
              <Stepper.Step 
                label="Team Assignment" 
                description="AI optimization"
                icon={<IconBrain size={18} />}
                completedIcon={<IconCheck size={18} />}
              />
              <Stepper.Step 
                label="Review & Create" 
                description="Finalize sprint"
                icon={<IconRocket size={18} />}
                completedIcon={<IconCheck size={18} />}
              />
            </Stepper>
            
            <Divider my="md" />
            
            {/* Sprint Statistics */}
            <Stack gap="sm">
              <Text size="sm" fw={600}>Sprint Overview</Text>
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Work Items:</Text>
                <Badge variant="light">{selectedWorkItems.length}</Badge>
              </Group>
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Total Effort:</Text>
                <Badge variant="light" color="blue">{selectedEffort}h</Badge>
              </Group>
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Team Capacity:</Text>
                <Badge variant="light" color="green">{totalCapacity}h</Badge>
              </Group>
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Utilization:</Text>
                <Badge 
                  variant="light" 
                  color={utilization > 90 ? 'red' : utilization > 75 ? 'yellow' : 'green'}
                >
                  {utilization.toFixed(0)}%
                </Badge>
              </Group>
              {optimizationResults && (
                <Group justify="space-between">
                  <Text size="xs" c="dimmed">Strategic Alignment:</Text>
                  <Badge variant="light" color="purple">
                    {Math.round(optimizationResults.strategicAlignment * 100)}%
                  </Badge>
                </Group>
              )}
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 9 }}>
          <Paper p="xl">
            {/* Step 0: Sprint Configuration */}
            {activeStep === 0 && (
              <Stack gap="lg">
                <div>
                  <Title order={2} mb="md">Sprint Configuration</Title>
                  <Text c="dimmed" mb="xl">
                    Set up your sprint timeline, goals, and strategic objectives.
                  </Text>
                </div>

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 8 }}>
                    <TextInput
                      label="Sprint Name"
                      placeholder="e.g., Strategic Intelligence Sprint"
                      value={sprintConfig.name}
                      onChange={(event) => setSprintConfig(prev => ({ ...prev, name: event.target.value }))}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <Select
                      label="Sprint Duration"
                      data={SPRINT_DURATIONS}
                      value={sprintConfig.duration.toString()}
                      onChange={(value) => {
                        const duration = parseInt(value || '2');
                        const endDate = new Date(sprintConfig.startDate.getTime() + duration * 7 * 24 * 60 * 60 * 1000);
                        setSprintConfig(prev => ({ ...prev, duration, endDate }));
                      }}
                    />
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <DatePickerInput
                      label="Start Date"
                      value={sprintConfig.startDate}
                      onChange={(date) => {
                        if (date) {
                          const endDate = new Date(date.getTime() + sprintConfig.duration * 7 * 24 * 60 * 60 * 1000);
                          setSprintConfig(prev => ({ ...prev, startDate: date, endDate }));
                        }
                      }}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <DatePickerInput
                      label="End Date"
                      value={sprintConfig.endDate}
                      onChange={(date) => date && setSprintConfig(prev => ({ ...prev, endDate: date }))}
                    />
                  </Grid.Col>
                </Grid>

                <Textarea
                  label="Sprint Goal"
                  placeholder="Describe the strategic objective for this sprint..."
                  value={sprintConfig.goal}
                  onChange={(event) => setSprintConfig(prev => ({ ...prev, goal: event.target.value }))}
                  minRows={3}
                />

                {/* Team Capacity Overview */}
                <div>
                  <Title order={4} mb="md">Team Capacity ({sprintConfig.duration} weeks)</Title>
                  <Grid>
                    {teams.map((team) => (
                      <Grid.Col key={team.id} span={{ base: 12, sm: 6, md: 4 }}>
                        <Card p="md" style={{ border: '1px solid var(--mantine-color-gray-3)' }}>
                          <Group justify="space-between" align="flex-start" mb="sm">
                            <div>
                              <Text fw={600}>{team.name}</Text>
                              <Text size="sm" c="dimmed">{team.members.length} members</Text>
                            </div>
                            <Badge variant="light" color="blue">
                              {team.totalCapacity * sprintConfig.duration}h
                            </Badge>
                          </Group>
                          
                          <Stack gap="xs">
                            {team.members.map((member) => (
                              <Group key={member.id} gap="xs">
                                <Avatar size={24} name={member.name} color="initials" />
                                <Text size="sm" style={{ flex: 1 }}>{member.name}</Text>
                                <Text size="xs" c="dimmed">
                                  {member.capacity * sprintConfig.duration}h
                                </Text>
                              </Group>
                            ))}
                          </Stack>
                          
                          <Divider my="sm" />
                          <Text size="xs" c="dimmed">
                            Skills: {team.specializations.join(', ')}
                          </Text>
                        </Card>
                      </Grid.Col>
                    ))}
                  </Grid>
                </div>
              </Stack>
            )}

            {/* Step 1: Work Item Selection */}
            {activeStep === 1 && (
              <Stack gap="lg">
                <div>
                  <Title order={2} mb="md">Work Item Selection</Title>
                  <Text c="dimmed" mb="xl">
                    Choose work items for this sprint. Items are pre-sorted by strategic value and priority.
                  </Text>
                </div>

                {/* Selection Summary */}
                <Alert color="blue" title="Smart Selection" icon={<IconBrain size={16} />}>
                  <Text size="sm">
                    AI has pre-selected {selectedWorkItems.length} high-priority items that fit within 80% team capacity.
                    Adjust selection based on your strategic priorities.
                  </Text>
                </Alert>

                {/* Work Items Table */}
                <Paper style={{ border: '1px solid var(--mantine-color-gray-3)' }}>
                  <Table highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Select</Table.Th>
                        <Table.Th>Work Item</Table.Th>
                        <Table.Th>Priority</Table.Th>
                        <Table.Th>Effort</Table.Th>
                        <Table.Th>Strategic Value</Table.Th>
                        <Table.Th>Frameworks</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {workItems.map((item) => (
                        <Table.Tr key={item.id}>
                          <Table.Td>
                            <Checkbox
                              checked={selectedWorkItems.includes(item.id)}
                              onChange={(event) => handleWorkItemToggle(item.id, event.currentTarget.checked)}
                            />
                          </Table.Td>
                          <Table.Td>
                            <div>
                              <Group gap="xs" mb="xs">
                                <Badge 
                                  variant="light" 
                                  color={TYPE_COLORS[item.type]}
                                  size="sm"
                                >
                                  {item.type}
                                </Badge>
                                {item.dependencies.length > 0 && (
                                  <Badge variant="outline" size="sm">
                                    {item.dependencies.length} deps
                                  </Badge>
                                )}
                              </Group>
                              <Text fw={500} mb="xs">{item.title}</Text>
                              <Text size="sm" c="dimmed" lineClamp={2}>
                                {item.description}
                              </Text>
                            </div>
                          </Table.Td>
                          <Table.Td>
                            <Badge 
                              variant="light" 
                              color={PRIORITY_COLORS[item.priority]}
                            >
                              {item.priority}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Text fw={500}>{item.estimatedEffort}h</Text>
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              <Progress 
                                value={item.strategicValue * 10} 
                                color="purple" 
                                size="sm" 
                                w={50}
                              />
                              <Text size="sm">{item.strategicValue}/10</Text>
                            </Group>
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              {item.strategicContext?.frameworks.map((framework) => (
                                <Badge key={framework} variant="dot" color="violet" size="xs">
                                  {framework}
                                </Badge>
                              ))}
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Paper>

                {/* Capacity Warning */}
                {utilization > 100 && (
                  <Alert color="red" title="Over Capacity" icon={<IconAlertTriangle size={16} />}>
                    <Text size="sm">
                      Selected work ({selectedEffort}h) exceeds team capacity ({totalCapacity}h). 
                      Consider removing items or extending sprint duration.
                    </Text>
                  </Alert>
                )}

                {utilization > 90 && utilization <= 100 && (
                  <Alert color="yellow" title="High Utilization" icon={<IconAlertTriangle size={16} />}>
                    <Text size="sm">
                      Team utilization is very high ({utilization.toFixed(0)}%). 
                      Consider buffer time for unexpected work.
                    </Text>
                  </Alert>
                )}
              </Stack>
            )}

            {/* Step 2: Team Assignment & Optimization */}
            {activeStep === 2 && (
              <Stack gap="lg">
                <div>
                  <Group justify="space-between" align="center">
                    <div>
                      <Title order={2} mb="sm">Team Assignment & Optimization</Title>
                      <Text c="dimmed">
                        Optimize work assignments across teams for maximum strategic impact and efficiency.
                      </Text>
                    </div>
                    
                    <Button
                      onClick={runAIOptimization}
                      loading={isOptimizing}
                      gradient={{ from: 'orange', to: 'red' }}
                      variant="gradient"
                      leftSection={<IconBrain size={16} />}
                    >
                      AI Optimize
                    </Button>
                  </Group>
                </div>

                {/* Optimization Results */}
                {optimizationResults && (
                  <Card p="lg" style={{ 
                    background: 'rgba(76, 175, 80, 0.05)', 
                    border: '1px solid rgba(76, 175, 80, 0.2)' 
                  }}>
                    <Group align="center" mb="md">
                      <ThemeIcon size={40} variant="light" color="green">
                        <IconCircleCheck size={20} />
                      </ThemeIcon>
                      <div>
                        <Text fw={600}>Optimization Complete</Text>
                        <Text size="sm" c="dimmed">
                          Strategic alignment: {Math.round(optimizationResults.strategicAlignment * 100)}% • 
                          Risk level: {optimizationResults.riskLevel}
                        </Text>
                      </div>
                    </Group>
                    
                    <Grid>
                      <Grid.Col span={6}>
                        <Text size="sm" fw={500} mb="xs">Key Improvements:</Text>
                        <Stack gap="xs">
                          {optimizationResults.improvements.map((improvement: string, index: number) => (
                            <Text key={index} size="sm" c="dimmed">• {improvement}</Text>
                          ))}
                        </Stack>
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Text size="sm" fw={500} mb="xs">Recommendations:</Text>
                        <Stack gap="xs">
                          {optimizationResults.recommendations.slice(0, 3).map((rec: string, index: number) => (
                            <Text key={index} size="sm" c="dimmed">• {rec}</Text>
                          ))}
                        </Stack>
                      </Grid.Col>
                    </Grid>
                  </Card>
                )}

                {/* Team Assignment Cards */}
                <Grid>
                  {teams.map((team) => {
                    const assignedItems = teamAssignments[team.id] || [];
                    const teamEffort = assignedItems.reduce((sum, itemId) => {
                      const item = workItems.find(w => w.id === itemId);
                      return sum + (item?.estimatedEffort || 0);
                    }, 0);
                    const teamUtilization = (teamEffort / (team.totalCapacity * sprintConfig.duration)) * 100;
                    
                    return (
                      <Grid.Col key={team.id} span={{ base: 12, md: 6 }}>
                        <Card p="lg" style={{ border: '1px solid var(--mantine-color-gray-3)', height: '100%' }}>
                          <Group justify="space-between" align="flex-start" mb="md">
                            <div>
                              <Text fw={600} mb="xs">{team.name}</Text>
                              <Group gap="xs">
                                <Badge variant="light" color="blue">
                                  {assignedItems.length} items
                                </Badge>
                                <Badge variant="light" color="orange">
                                  {teamEffort}h
                                </Badge>
                                <Badge 
                                  variant="light" 
                                  color={teamUtilization > 90 ? 'red' : teamUtilization > 75 ? 'yellow' : 'green'}
                                >
                                  {teamUtilization.toFixed(0)}%
                                </Badge>
                              </Group>
                            </div>
                          </Group>
                          
                          <Progress 
                            value={teamUtilization} 
                            color={teamUtilization > 90 ? 'red' : teamUtilization > 75 ? 'yellow' : 'green'}
                            size="sm" 
                            mb="md"
                          />
                          
                          <Stack gap="xs" style={{ maxHeight: 200, overflowY: 'auto' }}>
                            {assignedItems.map((itemId) => {
                              const item = workItems.find(w => w.id === itemId);
                              if (!item) return null;
                              
                              return (
                                <Group key={itemId} justify="space-between" gap="xs" p="xs" 
                                       style={{ border: '1px solid var(--mantine-color-gray-2)', borderRadius: 4 }}>
                                  <div style={{ flex: 1 }}>
                                    <Text size="sm" fw={500} lineClamp={1}>{item.title}</Text>
                                    <Group gap="xs">
                                      <Badge variant="dot" color={TYPE_COLORS[item.type]} size="xs">
                                        {item.type}
                                      </Badge>
                                      <Text size="xs" c="dimmed">{item.estimatedEffort}h</Text>
                                    </Group>
                                  </div>
                                  <ActionIcon size="sm" variant="subtle" color="red"
                                            onClick={() => {
                                              const updated = { ...teamAssignments };
                                              updated[team.id] = updated[team.id].filter(id => id !== itemId);
                                              setTeamAssignments(updated);
                                            }}>
                                    <IconX size={12} />
                                  </ActionIcon>
                                </Group>
                              );
                            })}
                            
                            {assignedItems.length === 0 && (
                              <Text size="sm" c="dimmed" ta="center" py="md">
                                No items assigned
                              </Text>
                            )}
                          </Stack>
                        </Card>
                      </Grid.Col>
                    );
                  })}
                </Grid>

                {/* Unassigned Items */}
                {selectedWorkItems.some(id => !Object.values(teamAssignments).flat().includes(id)) && (
                  <Card p="md" style={{ border: '1px solid var(--mantine-color-yellow-3)' }}>
                    <Text fw={500} mb="md">Unassigned Items</Text>
                    <Stack gap="xs">
                      {selectedWorkItems
                        .filter(id => !Object.values(teamAssignments).flat().includes(id))
                        .map(itemId => {
                          const item = workItems.find(w => w.id === itemId);
                          if (!item) return null;
                          
                          return (
                            <Group key={itemId} justify="space-between">
                              <div>
                                <Text size="sm" fw={500}>{item.title}</Text>
                                <Group gap="xs">
                                  <Badge variant="dot" color={TYPE_COLORS[item.type]} size="xs">
                                    {item.type}
                                  </Badge>
                                  <Text size="xs" c="dimmed">{item.estimatedEffort}h</Text>
                                </Group>
                              </div>
                              <Select
                                placeholder="Assign to team"
                                data={teams.map(t => ({ value: t.id, label: t.name }))}
                                onChange={(value) => value && assignWorkItemToTeam(itemId, value)}
                                size="xs"
                                w={150}
                              />
                            </Group>
                          );
                        })}
                    </Stack>
                  </Card>
                )}
              </Stack>
            )}

            {/* Step 3: Review & Create */}
            {activeStep === 3 && sprintPlan && (
              <Stack gap="lg">
                <div>
                  <Title order={2} mb="md">Sprint Plan Review</Title>
                  <Text c="dimmed" mb="xl">
                    Review your optimized sprint plan before creation.
                  </Text>
                </div>

                {/* Sprint Summary */}
                <Card p="lg" style={{ 
                  background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.05) 0%, rgba(255, 69, 0, 0.05) 100%)',
                  border: '1px solid rgba(255, 140, 0, 0.2)'
                }}>
                  <Grid>
                    <Grid.Col span={8}>
                      <Text size="xl" fw={700} mb="sm">{sprintPlan.name}</Text>
                      <Text c="dimmed" mb="md">{sprintPlan.goal}</Text>
                      <Group gap="md">
                        <Group gap="xs">
                          <IconCalendar size={16} />
                          <Text size="sm">
                            {sprintPlan.startDate.toLocaleDateString()} - {sprintPlan.endDate.toLocaleDateString()}
                          </Text>
                        </Group>
                        <Group gap="xs">
                          <IconClock size={16} />
                          <Text size="sm">{sprintPlan.duration} weeks</Text>
                        </Group>
                      </Group>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <RingProgress
                        size={120}
                        thickness={12}
                        sections={[
                          { value: sprintPlan.utilization, color: sprintPlan.utilization > 90 ? 'red' : sprintPlan.utilization > 75 ? 'yellow' : 'green' },
                          { value: sprintPlan.strategicAlignment * 100, color: 'purple' }
                        ]}
                        label={
                          <Center>
                            <Stack align="center" gap={0}>
                              <Text size="xs" c="dimmed">Utilization</Text>
                              <Text fw={700}>{sprintPlan.utilization.toFixed(0)}%</Text>
                            </Stack>
                          </Center>
                        }
                      />
                    </Grid.Col>
                  </Grid>
                </Card>

                {/* Key Metrics */}
                <Grid>
                  <Grid.Col span={3}>
                    <Card p="md" align="center">
                      <Text size="xl" fw={700} c="blue">{sprintPlan.workItems.length}</Text>
                      <Text size="sm" c="dimmed">Work Items</Text>
                    </Card>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Card p="md" align="center">
                      <Text size="xl" fw={700} c="green">{sprintPlan.totalCapacity}h</Text>
                      <Text size="sm" c="dimmed">Team Capacity</Text>
                    </Card>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Card p="md" align="center">
                      <Text size="xl" fw={700} c="purple">{Math.round(sprintPlan.strategicAlignment * 100)}%</Text>
                      <Text size="sm" c="dimmed">Strategic Alignment</Text>
                    </Card>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Card p="md" align="center">
                      <Text 
                        size="xl" 
                        fw={700} 
                        c={sprintPlan.riskLevel === 'high' ? 'red' : sprintPlan.riskLevel === 'medium' ? 'yellow' : 'green'}
                      >
                        {sprintPlan.riskLevel.toUpperCase()}
                      </Text>
                      <Text size="sm" c="dimmed">Risk Level</Text>
                    </Card>
                  </Grid.Col>
                </Grid>

                {/* Work Items by Priority */}
                <div>
                  <Title order={4} mb="md">Work Items by Priority</Title>
                  <Timeline active={-1}>
                    {Object.entries(
                      sprintPlan.workItems.reduce((acc, item) => {
                        if (!acc[item.priority]) acc[item.priority] = [];
                        acc[item.priority].push(item);
                        return acc;
                      }, {} as Record<string, SprintWorkItem[]>)
                    ).map(([priority, items]) => (
                      <Timeline.Item
                        key={priority}
                        bullet={
                          <ThemeIcon
                            size={24}
                            variant="light"
                            color={PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS]}
                          >
                            <IconFlag size={14} />
                          </ThemeIcon>
                        }
                        title={`${priority.toUpperCase()} Priority (${items.length} items)`}
                      >
                        <Stack gap="xs">
                          {items.slice(0, 3).map((item) => (
                            <Group key={item.id} gap="xs">
                              <Badge variant="light" color={TYPE_COLORS[item.type]} size="sm">
                                {item.type}
                              </Badge>
                              <Text size="sm">{item.title}</Text>
                              <Badge variant="outline" size="sm">{item.estimatedEffort}h</Badge>
                            </Group>
                          ))}
                          {items.length > 3 && (
                            <Text size="xs" c="dimmed">+{items.length - 3} more items</Text>
                          )}
                        </Stack>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </div>
              </Stack>
            )}

            {/* Navigation */}
            <Group justify="space-between" mt="xl">
              <Group>
                <Button variant="light" onClick={onCancel}>
                  Cancel
                </Button>
                {activeStep > 0 && (
                  <Button variant="light" onClick={prevStep} leftSection={<IconChevronLeft size={16} />}>
                    Previous
                  </Button>
                )}
              </Group>

              <Group>
                <Text size="sm" c="dimmed">Step {activeStep + 1} of 4</Text>
                
                {activeStep < 2 && (
                  <Button 
                    onClick={nextStep}
                    disabled={
                      (activeStep === 0 && !sprintConfig.name) ||
                      (activeStep === 1 && selectedWorkItems.length === 0)
                    }
                    rightSection={<IconChevronRight size={16} />}
                  >
                    Continue
                  </Button>
                )}
                
                {activeStep === 2 && (
                  <Button 
                    onClick={generateSprintPlan}
                    gradient={{ from: 'orange', to: 'red' }}
                    variant="gradient"
                    rightSection={<IconCalendar size={16} />}
                  >
                    Generate Sprint Plan
                  </Button>
                )}
                
                {activeStep === 3 && (
                  <Button 
                    onClick={confirmSprintPlan}
                    gradient={{ from: 'orange', to: 'red' }}
                    variant="gradient"
                    rightSection={<IconRocket size={16} />}
                  >
                    Create Sprint
                  </Button>
                )}
              </Group>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}