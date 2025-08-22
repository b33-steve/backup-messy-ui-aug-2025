// app/(app)/command-center/page.tsx
// Central hub for PM33 strategic intelligence - replaces demo version with production command center
// WHY: Single source of truth for strategic context, workflow coordination, and intelligent action prioritization
// RELEVANT FILES: WorkflowNavigator.tsx, workflow-state-manager.ts, ProgressiveOnboarding.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  Title, 
  Text, 
  Button, 
  Group, 
  Stack, 
  Badge, 
  ActionIcon, 
  Alert,
  Progress,
  SimpleGrid,
  Divider,
  Box,
  Tabs,
  ThemeIcon,
  Timeline,
  Skeleton
} from '@mantine/core';
import { 
  IconBrain, 
  IconTarget, 
  IconChartLine, 
  IconBolt, 
  IconTrendingUp,
  IconUsers,
  IconCalendar,
  IconClock,
  IconCheck,
  IconAlertTriangle,
  IconFlame,
  IconRefresh,
  IconPlus,
  IconExternalLink,
  IconArrowRight,
  IconSparkles,
  IconRocket,
  IconTrophy
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useWorkflowState } from '@/lib/navigation/workflow-state-manager';
import { PM33Card } from '@/components/PM33Card';
import WorkflowNavigator from '@/components/navigation/WorkflowNavigator';
import ProgressiveOnboarding from '@/components/onboarding/ProgressiveOnboarding';

/**
 * Strategic intelligence dashboard card interface
 * Each card represents actionable strategic intelligence with context
 */
interface StrategicIntelligenceCard {
  id: string;
  type: 'analysis' | 'action' | 'insight' | 'alert';
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  workflow: 'planning' | 'executing' | 'reviewing' | 'firefighting';
  confidence?: number; // AI confidence score
  timeAgo: string;
  actionText: string;
  actionUrl: string;
  metadata?: {
    framework?: string;
    impactScore?: number;
    stakeholders?: string[];
    deadline?: string;
  };
}

/**
 * Quick action interface for immediate strategic tasks
 * Optimized for different personas and workflow states
 */
interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  path: string;
  shortcut?: string;
  personas: ('senior_pm' | 'vp_product' | 'founder')[];
  estimatedTime: string;
  valueDelivered: string;
}

/**
 * Central Command Center Page Component
 * Intelligent hub that adapts to user context and strategic priorities
 */
const CommandCenterPage: React.FC = () => {
  // Workflow state management
  const { 
    currentWorkflow, 
    userPersona, 
    navigationContext,
    engagementMetrics,
    onboardingStage,
    setWorkflowState,
    updateNavigationContext,
    addBreadcrumb,
    shouldShowFirefightingMode
  } = useWorkflowState();
  
  const router = useRouter();
  
  // Local state for dashboard data
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [strategicCards, setStrategicCards] = useState<StrategicIntelligenceCard[]>([]);
  
  /**
   * Initialize command center data and context
   * Sets up strategic intelligence based on user persona and current state
   */
  useEffect(() => {
    // Add breadcrumb for navigation context
    addBreadcrumb('Command Center', '/command-center', 'Strategic intelligence hub');
    
    // Update navigation context
    updateNavigationContext({
      currentProject: 'Strategic Overview',
      urgentTasks: 3, // Mock data - would come from PM tools
      teamPulseScore: 85 // Mock data - would come from analytics
    });
    
    // Load strategic intelligence cards based on context
    loadStrategicIntelligence();
  }, [userPersona, currentWorkflow]);
  
  /**
   * Load contextual strategic intelligence
   * Adapts content based on user persona and workflow state
   */
  const loadStrategicIntelligence = async () => {
    setLoading(true);
    
    // Simulate AI-powered strategic intelligence generation
    const mockCards: StrategicIntelligenceCard[] = [
      {
        id: '1',
        type: 'analysis',
        title: 'Q4 Feature Prioritization Analysis',
        description: 'ICE framework analysis suggests Feature A has 3x higher strategic value than Feature B',
        priority: 'high',
        workflow: 'planning',
        confidence: 92,
        timeAgo: '2 hours ago',
        actionText: 'View Full Analysis',
        actionUrl: '/strategic-intelligence?analysis=q4-prioritization',
        metadata: {
          framework: 'ICE Score',
          impactScore: 8.5,
          stakeholders: ['Engineering', 'Design', 'Sales'],
          deadline: '2025-09-01'
        }
      },
      {
        id: '2',
        type: 'alert',
        title: 'Competitor X Product Launch Impact',
        description: 'Strategic response required: Their new feature could impact our Q4 user acquisition by 15%',
        priority: 'critical',
        workflow: 'firefighting',
        confidence: 87,
        timeAgo: '4 hours ago',
        actionText: 'Plan Response',
        actionUrl: '/strategic-intelligence?mode=competitive-response',
        metadata: {
          impactScore: 7.2,
          stakeholders: ['Product', 'Marketing', 'Executive'],
        }
      },
      {
        id: '3',
        type: 'action',
        title: 'Engineering Resource Allocation',
        description: 'Data suggests hiring 2 senior engineers will deliver 40% higher ROI than 3 junior engineers',
        priority: 'medium',
        workflow: 'planning',
        confidence: 78,
        timeAgo: '1 day ago',
        actionText: 'View Resource Plan',
        actionUrl: '/data?view=resource-allocation',
        metadata: {
          impactScore: 6.8,
          stakeholders: ['Engineering', 'HR', 'Finance'],
        }
      },
      {
        id: '4',
        type: 'insight',
        title: 'Sprint Velocity Optimization',
        description: 'Team velocity could increase 25% with improved story point estimation accuracy',
        priority: 'medium',
        workflow: 'reviewing',
        confidence: 84,
        timeAgo: '3 days ago',
        actionText: 'Optimize Process',
        actionUrl: '/tasks?mode=velocity-optimization',
        metadata: {
          impactScore: 5.5,
          stakeholders: ['Engineering', 'Scrum Master'],
        }
      }
    ];
    
    // Filter cards based on user persona and workflow
    const relevantCards = mockCards.filter(card => {
      if (currentWorkflow === 'firefighting') {
        return card.priority === 'critical' || card.workflow === 'firefighting';
      }
      
      if (userPersona === 'founder') {
        return ['analysis', 'alert'].includes(card.type);
      }
      
      if (userPersona === 'vp_product') {
        return card.metadata?.stakeholders?.includes('Executive') || card.priority === 'high';
      }
      
      return true;
    });
    
    setStrategicCards(relevantCards);
    setLoading(false);
  };
  
  /**
   * Quick actions based on user persona and context
   * Immediate value delivery for common strategic tasks
   */
  const getQuickActions = (): QuickAction[] => {
    const baseActions: QuickAction[] = [
      {
        id: 'new-analysis',
        title: 'Strategic Analysis',
        description: 'Get AI-powered strategic intelligence in 10 minutes',
        icon: <IconBrain size={24} />,
        color: 'var(--pm33-brand)',
        path: '/strategic-intelligence',
        shortcut: 'Cmd+N',
        personas: ['senior_pm', 'vp_product', 'founder'],
        estimatedTime: '10 min',
        valueDelivered: 'Strategic decision confidence'
      },
      {
        id: 'what-if',
        title: 'What-If Analysis',
        description: 'Model scenarios and resource allocation decisions',
        icon: <IconChartLine size={24} />,
        color: 'var(--pm33-ai-glow)',
        path: '/strategic-intelligence?mode=what-if',
        shortcut: 'Cmd+W',
        personas: ['vp_product', 'founder'],
        estimatedTime: '15 min',
        valueDelivered: 'Resource optimization'
      },
      {
        id: 'quick-chat',
        title: 'Strategic Question',
        description: 'Ask immediate strategic questions to AI advisor',
        icon: <IconTarget size={24} />,
        color: 'var(--pm33-success)',
        path: '/chat',
        personas: ['founder'],
        estimatedTime: '5 min',
        valueDelivered: 'Quick strategic guidance'
      },
      {
        id: 'sync-tools',
        title: 'Sync PM Tools',
        description: 'Update strategic context from Jira, Linear, etc.',
        icon: <IconRefresh size={24} />,
        color: 'var(--pm33-warning)',
        path: '/settings?tab=integrations',
        shortcut: 'Cmd+J',
        personas: ['senior_pm', 'vp_product'],
        estimatedTime: '2 min',
        valueDelivered: 'Real-time strategic context'
      }
    ];
    
    // Filter actions based on persona
    return baseActions.filter(action => 
      !userPersona || action.personas.includes(userPersona)
    ).slice(0, 4);
  };
  
  /**
   * Render strategic intelligence card with contextual information
   */
  const renderStrategicCard = (card: StrategicIntelligenceCard) => {
    const priorityColors = {
      critical: 'red',
      high: 'orange',
      medium: 'blue',
      low: 'gray'
    };
    
    const typeIcons = {
      analysis: <IconBrain size={20} />,
      action: <IconBolt size={20} />,
      insight: <IconTrendingUp size={20} />,
      alert: <IconAlertTriangle size={20} />
    };
    
    return (
      <PM33Card key={card.id} p={20}>
        <Stack gap={12}>
          <Group justify="space-between" align="flex-start">
            <Group gap={12}>
              <ThemeIcon
                size={40}
                radius={8}
                color={priorityColors[card.priority]}
                variant="light"
              >
                {typeIcons[card.type]}
              </ThemeIcon>
              <Box>
                <Title order={4} size="h5" mb={4}>
                  {card.title}
                </Title>
                <Text size="sm" c="dimmed">
                  {card.timeAgo}
                </Text>
              </Box>
            </Group>
            
            <Group gap={8}>
              <Badge 
                size="sm" 
                color={priorityColors[card.priority]}
                variant="light"
              >
                {card.priority}
              </Badge>
              {card.confidence && (
                <Badge size="sm" color="green" variant="light">
                  {card.confidence}% confident
                </Badge>
              )}
            </Group>
          </Group>
          
          <Text size="sm" style={{ lineHeight: 1.5 }}>
            {card.description}
          </Text>
          
          {card.metadata && (
            <Group gap={16} mt={8}>
              {card.metadata.framework && (
                <Text size="xs" c="dimmed">
                  <strong>Framework:</strong> {card.metadata.framework}
                </Text>
              )}
              {card.metadata.impactScore && (
                <Text size="xs" c="dimmed">
                  <strong>Impact:</strong> {card.metadata.impactScore}/10
                </Text>
              )}
            </Group>
          )}
          
          <Group justify="space-between" mt={12}>
            {card.metadata?.stakeholders && (
              <Group gap={4}>
                {card.metadata.stakeholders.slice(0, 3).map((stakeholder, index) => (
                  <Badge key={index} size="xs" variant="outline">
                    {stakeholder}
                  </Badge>
                ))}
              </Group>
            )}
            
            <Button 
              size="sm" 
              variant="light"
              rightSection={<IconArrowRight size={14} />}
              onClick={() => router.push(card.actionUrl)}
            >
              {card.actionText}
            </Button>
          </Group>
        </Stack>
      </PM33Card>
    );
  };
  
  /**
   * Render quick action card with persona optimization
   */
  const renderQuickAction = (action: QuickAction) => (
    <PM33Card 
      key={action.id}
      onClick={() => router.push(action.path)}
      style={{ cursor: 'pointer' }}
      p={20}
    >
      <Stack gap={12} ta="center">
        <ThemeIcon
          size={56}
          radius={12}
          style={{ background: action.color }}
        >
          {action.icon}
        </ThemeIcon>
        
        <Box>
          <Title order={5} size="h6" mb={4}>
            {action.title}
          </Title>
          {action.shortcut && (
            <Badge size="xs" variant="outline" mb={8}>
              {action.shortcut}
            </Badge>
          )}
          <Text size="sm" c="dimmed" style={{ lineHeight: 1.4 }}>
            {action.description}
          </Text>
        </Box>
        
        <Group justify="space-between" w="100%">
          <Text size="xs" c="dimmed">
            {action.estimatedTime}
          </Text>
          <Text size="xs" c={action.color} fw={600}>
            {action.valueDelivered}
          </Text>
        </Group>
      </Stack>
    </PM33Card>
  );
  
  /**
   * Render engagement metrics for dopamine-driven UX
   */
  const renderEngagementMetrics = () => (
    <PM33Card p={20}>
      <Stack gap={16}>
        <Group justify="space-between" align="center">
          <Title order={4} size="h5">
            Strategic Intelligence Progress
          </Title>
          <Badge size="sm" color="green" variant="light">
            <Group gap={4}>
              <IconTrophy size={12} />
              {engagementMetrics.currentStreak} day streak
            </Group>
          </Badge>
        </Group>
        
        <SimpleGrid cols={3} spacing={16}>
          <Box ta="center">
            <Text size="xl" fw={700} c="var(--pm33-brand)">
              {engagementMetrics.totalAnalyses}
            </Text>
            <Text size="xs" c="dimmed">
              Analyses Complete
            </Text>
          </Box>
          
          <Box ta="center">
            <Text size="xl" fw={700} c="var(--pm33-success)">
              {engagementMetrics.successfulSyncs}
            </Text>
            <Text size="xs" c="dimmed">
              Successful Syncs
            </Text>
          </Box>
          
          <Box ta="center">
            <Text size="xl" fw={700} c="var(--pm33-warning)">
              {engagementMetrics.powerUserActions}
            </Text>
            <Text size="xs" c="dimmed">
              Power User Actions
            </Text>
          </Box>
        </SimpleGrid>
        
        <Box>
          <Group justify="space-between" mb={8}>
            <Text size="sm">Weekly Goal</Text>
            <Text size="sm" c="dimmed">
              {engagementMetrics.totalAnalyses} / {engagementMetrics.weeklyGoal}
            </Text>
          </Group>
          <Progress 
            value={(engagementMetrics.totalAnalyses / engagementMetrics.weeklyGoal) * 100}
            color="var(--pm33-brand)"
            size="sm"
          />
        </Box>
      </Stack>
    </PM33Card>
  );
  
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Progressive Onboarding */}
      <ProgressiveOnboarding />
      
      {/* Contextual Navigation */}
      <WorkflowNavigator 
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Main Command Center Content */}
      <Box style={{ flex: 1, background: 'var(--pm33-bg-primary)' }}>
        <Container size="xl" py={32} px={24}>
          {/* Header Section */}
          <Group justify="space-between" align="center" mb={32}>
            <Box>
              <Title order={1} size="h2" mb={8}>
                Command Center
              </Title>
              <Text size="lg" c="dimmed">
                Strategic intelligence hub for {userPersona === 'founder' ? 'founders' : userPersona === 'vp_product' ? 'product leaders' : 'product managers'}
              </Text>
            </Box>
            
            <Group gap={12}>
              <Button 
                leftSection={<IconSparkles size={16} />}
                onClick={() => router.push('/strategic-intelligence')}
                size="sm"
              >
                New Analysis
              </Button>
              
              {shouldShowFirefightingMode() && (
                <Button 
                  color="red"
                  leftSection={<IconFlame size={16} />}
                  onClick={() => setWorkflowState('firefighting')}
                  size="sm"
                >
                  Crisis Mode
                </Button>
              )}
            </Group>
          </Group>
          
          {/* Workflow Status Alert */}
          {currentWorkflow === 'firefighting' && (
            <Alert
              icon={<IconFlame size={16} />}
              title="Crisis Response Mode Active"
              color="red"
              mb={24}
            >
              Prioritizing critical issues and urgent strategic responses. 
              Non-essential features temporarily hidden for focus.
            </Alert>
          )}
          
          {/* Main Dashboard Grid */}
          <Grid gutter={24}>
            {/* Strategic Intelligence Cards - Main Content */}
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <Stack gap={24}>
                <Group justify="space-between" align="center">
                  <Title order={3} size="h4">
                    Strategic Intelligence
                  </Title>
                  <Button 
                    variant="light" 
                    size="sm"
                    leftSection={<IconRefresh size={16} />}
                    onClick={loadStrategicIntelligence}
                    loading={loading}
                  >
                    Refresh
                  </Button>
                </Group>
                
                <Stack gap={16}>
                  {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <Skeleton key={index} height={140} radius={16} />
                    ))
                  ) : strategicCards.length > 0 ? (
                    strategicCards.map(renderStrategicCard)
                  ) : (
                    <PM33Card p={40} ta="center">
                      <Stack gap={16} align="center">
                        <IconTarget size={48} color="var(--pm33-text-tertiary)" />
                        <Title order={4} c="dimmed">
                          No Strategic Intelligence Available
                        </Title>
                        <Text size="sm" c="dimmed">
                          Connect your PM tools or run your first strategic analysis to see intelligent recommendations
                        </Text>
                        <Button 
                          onClick={() => router.push('/strategic-intelligence')}
                          leftSection={<IconBrain size={16} />}
                        >
                          Run Strategic Analysis
                        </Button>
                      </Stack>
                    </PM33Card>
                  )}
                </Stack>
              </Stack>
            </Grid.Col>
            
            {/* Sidebar - Quick Actions and Metrics */}
            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Stack gap={24}>
                {/* Quick Actions */}
                <Box>
                  <Title order={4} size="h5" mb={16}>
                    Quick Actions
                  </Title>
                  <SimpleGrid cols={{ base: 2, sm: 2, lg: 1 }} spacing={12}>
                    {getQuickActions().map(renderQuickAction)}
                  </SimpleGrid>
                </Box>
                
                {/* Engagement Metrics */}
                {renderEngagementMetrics()}
                
                {/* Recent Activity Timeline */}
                <PM33Card p={20}>
                  <Stack gap={16}>
                    <Title order={4} size="h5">
                      Recent Activity
                    </Title>
                    
                    <Timeline active={2} bulletSize={24} lineWidth={2}>
                      <Timeline.Item
                        bullet={<IconBrain size={12} />}
                        title="Strategic Analysis Completed"
                        c="dimmed"
                      >
                        <Text c="dimmed" size="sm">Q4 Feature Prioritization</Text>
                        <Text size="xs" c="dimmed">2 hours ago</Text>
                      </Timeline.Item>
                      
                      <Timeline.Item
                        bullet={<IconRefresh size={12} />}
                        title="Jira Sync Successful"
                        c="dimmed"
                      >
                        <Text c="dimmed" size="sm">47 strategic tasks updated</Text>
                        <Text size="xs" c="dimmed">4 hours ago</Text>
                      </Timeline.Item>
                      
                      <Timeline.Item
                        bullet={<IconTrophy size={12} />}
                        title="Weekly Goal Achieved"
                        c="green"
                      >
                        <Text c="dimmed" size="sm">5 strategic analyses completed</Text>
                        <Text size="xs" c="dimmed">1 day ago</Text>
                      </Timeline.Item>
                    </Timeline>
                  </Stack>
                </PM33Card>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default CommandCenterPage;