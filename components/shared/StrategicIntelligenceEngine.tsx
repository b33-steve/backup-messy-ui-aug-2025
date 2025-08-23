// app/frontend/components/shared/StrategicIntelligenceEngine.tsx
// Strategic Intelligence Sync Layer demo showcasing PM tool integration and automated strategic sync
// WHY: Demonstrates PM33 as strategic intelligence layer that enhances existing PM tools rather than replacing them
// RELEVANT FILES: PM33_CORE_PAIN_POINTS.md, PM33_DEEP_WORKFLOW_ANALYSIS.md, APP_DESIGN_SYSTEM.md

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  Badge, 
  Title, 
  Text, 
  Progress, 
  Group, 
  Stack, 
  Button, 
  Alert, 
  ActionIcon, 
  Box,
  Select,
  Tabs
} from '@mantine/core';
import { 
  IconBrain, 
  IconTarget, 
  IconChartLine, 
  IconBulb, 
  IconChecklist, 
  IconClock, 
  IconTrendingUp, 
  IconArrowLeft, 
  IconHome,
  IconRefresh,
  IconExternalLink,
  IconCheck,
  IconGitBranch,
  IconDatabase
} from '@tabler/icons-react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

// PM Tool Integration Status
interface PMToolConnection {
  tool: 'jira' | 'linear' | 'monday' | 'asana';
  status: 'connected' | 'syncing' | 'updated';
  projects: number;
  lastSync: string;
  strategicTasks: number;
}

// Strategic Intelligence Sync Step
interface StrategicSyncStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  timeEstimate: string;
  toolIntegration?: string;
  output?: any;
}

// Strategic Sync Result
interface StrategicSyncResult {
  situationAssessment: string;
  strategicRecommendation: string;
  automatedActions: {
    newEpics: number;
    reorderedTasks: number;
    updatedPriorities: number;
    stakeholderUpdates: number;
  };
  toolUpdates: {
    tool: string;
    action: string;
    impact: string;
    confidence: number;
  }[];
  successMetrics: string[];
  confidenceScore: number;
  nextActions: string[];
}

const StrategicIntelligenceEngine: React.FC = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [syncResult, setSyncResult] = useState<StrategicSyncResult | null>(null);
  const [strategicQuery, setStrategicQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<'jira' | 'linear' | 'monday' | 'asana'>('jira');
  const [connectedTools, setConnectedTools] = useState<PMToolConnection[]>([
    { tool: 'jira', status: 'connected', projects: 3, lastSync: '2 min ago', strategicTasks: 47 },
    { tool: 'linear', status: 'connected', projects: 2, lastSync: '5 min ago', strategicTasks: 23 },
    { tool: 'monday', status: 'connected', projects: 1, lastSync: '1 min ago', strategicTasks: 15 }
  ]);

  const [syncSteps, setSyncSteps] = useState<StrategicSyncStep[]>([
    {
      id: 'tool-context',
      name: 'PM Tool Context Integration',
      description: 'Reading current sprint capacity, roadmap, and priorities from your connected tools',
      status: 'pending',
      progress: 0,
      timeEstimate: '30 seconds',
      toolIntegration: 'Jira + Linear + Monday',
      output: null
    },
    {
      id: 'strategic-analysis',
      name: 'Strategic Intelligence Processing',
      description: '4 AI teams analyzing with multi-framework approach (ICE/RICE/Blue Ocean)',
      status: 'pending',
      progress: 0,
      timeEstimate: '45 seconds',
      toolIntegration: 'AI Strategic Intelligence',
      output: null
    },
    {
      id: 'sync-generation',
      name: 'Automated Tool Sync Generation',
      description: 'Creating strategic task breakdowns and priority adjustments for your tools',
      status: 'pending',
      progress: 0,
      timeEstimate: '1 minute',
      toolIntegration: 'Epic/Story Generation',
      output: null
    },
    {
      id: 'tool-sync',
      name: 'Strategic Context Sync to Tools',
      description: 'Syncing strategic recommendations back to Jira/Linear with full context',
      status: 'pending',
      progress: 0,
      timeEstimate: '45 seconds',
      toolIntegration: 'Bidirectional API Sync',
      output: null
    },
    {
      id: 'execution-monitoring',
      name: 'Execution Intelligence Setup',
      description: 'Setting up strategic alignment monitoring and automated progress tracking',
      status: 'pending',
      progress: 0,
      timeEstimate: '30 seconds',
      toolIntegration: 'Strategic Monitoring',
      output: null
    }
  ]);

  const startStrategicSync = async (query: string, tool: string) => {
    setActiveWorkflow('strategic-sync');
    setStrategicQuery(query);
    setCurrentStep(0);
    
    // Reset sync steps
    setSyncSteps(steps => steps.map(step => ({
      ...step,
      status: 'pending',
      progress: 0,
      output: null
    })));

    // Update tool connection status
    setConnectedTools(tools => tools.map(t => 
      t.tool === selectedTool 
        ? { ...t, status: 'syncing' }
        : t
    ));

    // Simulate the strategic sync workflow
    for (let i = 0; i < syncSteps.length; i++) {
      await processSyncStep(i);
    }
  };

  const processSyncStep = async (stepIndex: number) => {
    return new Promise<void>((resolve) => {
      setCurrentStep(stepIndex);
      
      // Set step to processing
      setSyncSteps(steps => steps.map((step, index) => 
        index === stepIndex 
          ? { ...step, status: 'processing', progress: 0 }
          : step
      ));

      // Simulate progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 12 + 8;
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);
          
          // Complete the step with mock output
          setSyncSteps(steps => steps.map((step, index) => 
            index === stepIndex 
              ? { 
                  ...step, 
                  status: 'completed', 
                  progress: 100,
                  output: getMockSyncOutput(step.id)
                }
              : step
          ));
          
          // If final step, generate complete sync result
          if (stepIndex === syncSteps.length - 1) {
            generateStrategicSyncResult();
            // Update tool status to completed
            setConnectedTools(tools => tools.map(t => 
              t.tool === selectedTool 
                ? { ...t, status: 'updated', lastSync: 'just now', strategicTasks: t.strategicTasks + 8 }
                : t
            ));
          }
          
          resolve();
        } else {
          setSyncSteps(steps => steps.map((step, index) => 
            index === stepIndex 
              ? { ...step, progress }
              : step
          ));
        }
      }, 180);
    });
  };

  const getMockSyncOutput = (stepId: string) => {
    const outputs = {
      'tool-context': {
        jira_projects: 3,
        active_sprints: 2,
        current_capacity: '85% utilized',
        existing_priorities: 'Product launch (P0), Feature enhancement (P1), Tech debt (P2)',
        strategic_alignment_score: 67
      },
      'strategic-analysis': {
        ice_score: 8.4,
        rice_score: 168,
        frameworks_applied: ['ICE', 'RICE', 'Competitive Response', 'Blue Ocean'],
        ai_teams_consensus: 'Strong strategic opportunity with medium execution complexity',
        confidence_score: 89
      },
      'sync-generation': {
        new_epics_created: 2,
        stories_generated: 8,
        priority_adjustments: 12,
        strategic_context_preserved: '100%',
        resource_optimization: 'Engineering focus shifted 30% to competitive response'
      },
      'tool-sync': {
        jira_updates: '2 new epics, 8 stories, 12 priority changes',
        strategic_rationale: 'All tasks include strategic reasoning and success criteria',
        stakeholder_visibility: 'Executive dashboard updated with competitive response timeline',
        sync_success_rate: '100%'
      },
      'execution-monitoring': {
        strategic_kpis_setup: 'Competitive feature gap closure, Market response speed',
        automated_tracking: 'Progress monitoring every 4 hours',
        alignment_scoring: 'Real-time strategic alignment measurement active',
        next_review: 'Strategic checkpoint scheduled for 72 hours'
      }
    };
    
    return outputs[stepId as keyof typeof outputs] || {};
  };

  const generateStrategicSyncResult = () => {
    const mockSyncResult: StrategicSyncResult = {
      situationAssessment: "Competitor feature launch detected. Current roadmap has 67% strategic alignment. Opportunity for 48-hour competitive response with strategic priority reallocation. Your existing tools now have full strategic context for execution.",
      strategicRecommendation: "Accelerate competitive differentiation through strategic intelligence capabilities. PM33 automation bridges ensure strategic decisions flow directly into prioritized execution with preserved context in your existing PM tools.",
      automatedActions: {
        newEpics: 2,
        reorderedTasks: 12,
        updatedPriorities: 8,
        stakeholderUpdates: 4
      },
      toolUpdates: [
        {
          tool: 'Jira',
          action: 'Created 2 strategic epics with competitive response framework',
          impact: '8 new stories with strategic rationale in task descriptions',
          confidence: 94
        },
        {
          tool: 'Linear',
          action: 'Reordered 12 existing issues based on strategic priority analysis',
          impact: 'Sprint capacity reallocated for competitive response (30% shift)',
          confidence: 91
        },
        {
          tool: 'Stakeholder Dashboard',
          action: 'Generated executive briefing with strategic timeline',
          impact: 'Automated progress tracking setup for strategic KPIs',
          confidence: 97
        }
      ],
      successMetrics: [
        "Competitive response execution: <48 hours (automated workflow)",
        "Strategic context preservation: 100% in tool sync", 
        "Team alignment: Strategic rationale visible in all tasks",
        "Execution intelligence: Real-time strategic alignment monitoring",
        "PMO-level capability: Automated strategic oversight across tools"
      ],
      confidenceScore: 91,
      nextActions: [
        "Monitor strategic execution progress in your connected tools",
        "Receive automated strategic alignment alerts",
        "Access strategic decision audit trail for learning",
        "Continue using Jira/Linear - now with strategic intelligence"
      ]
    };

    setSyncResult(mockSyncResult);
  };

  const predefinedQueries = [
    "Our competitor just launched AI features. How should this reprioritize our Jira backlog and sprint planning?",
    "We have budget for 3 engineers OR $150K marketing spend. Sync the optimal choice into our roadmap.",
    "User retention dropped to 65%. What strategic initiatives should auto-promote to P0 in our PM tools?",
    "Engineering velocity is 20% below target. Rebalance our Linear/Jira priorities with strategic context.",
    "Sales wants 5 features but we can deliver 2. Auto-score and sync strategic priorities to our tools."
  ];

  return (
    <div style={{ 
      backgroundColor: 'var(--app-bg-secondary)', 
      minHeight: '100vh',
      color: 'var(--app-text-secondary)'
    }}>
      <Container size={1200} px={24} py={48}>
        {/* Header with PM33 Logo and Theme Toggle */}
        <Box mb={48}>
          <Group justify="space-between" align="center">
            <Group>
              <ActionIcon
                component={Link}
                href="/"
                size="lg"
                variant="subtle"
                style={{
                  backgroundColor: 'var(--app-bg-tertiary)',
                  color: 'var(--app-text-secondary)',
                  border: '1px solid var(--app-border-muted)'
                }}
                aria-label="Back to homepage"
              >
                <IconHome size={18} />
              </ActionIcon>
              <img 
                src="/PM 33 New Logo Horizontal V1.2 WHITE.png" 
                alt="PM33 Strategic Intelligence Platform" 
                style={{ height: '32px' }} 
              />
              <Stack gap={4}>
                <Title 
                  order={1} 
                  size="h1" 
                  style={{ 
                    color: 'var(--app-text-primary)',
                    fontSize: '2rem',
                    fontWeight: 700,
                    letterSpacing: '-0.025em'
                  }}
                >
                  Strategic Intelligence Platform
                </Title>
                <Text 
                  size="lg" 
                  style={{ 
                    color: 'var(--app-text-tertiary)',
                    fontSize: '1.125rem'
                  }}
                >
                  Tactical data + Strategic data → AI optimization → Detailed execution instructions
                </Text>
              </Stack>
            </Group>
            <Group gap={16}>
              <ThemeToggle size="md" showTooltip={true} />
              <Badge 
                size="lg" 
                variant="outline"
                style={{
                  backgroundColor: 'var(--app-bg-tertiary)',
                  color: 'var(--app-primary)',
                  borderColor: 'var(--app-primary)'
                }}
              >
                Live Demo
              </Badge>
              <Button
                component={Link}
                href="/command-center"
                variant="filled"
                leftSection={<IconTarget size={16} />}
                style={{
                  backgroundColor: 'var(--app-primary)',
                  color: 'white',
                  border: 'none'
                }}
              >
                Command Center
              </Button>
            </Group>
          </Group>
        </Box>

        {!activeWorkflow ? (
          /* Strategic Query Input */
          <Card 
            shadow="lg" 
            padding={32} 
            radius={16}
            style={{
              backgroundColor: 'var(--app-bg-primary)',
              border: '1px solid var(--app-border-muted)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          >
            <Stack gap={32}>
              <Stack gap={16}>
                <Title 
                  order={2} 
                  size="h2"
                  style={{
                    color: 'var(--app-text-primary)',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    letterSpacing: '-0.02em'
                  }}
                >
                  🎯 Strategic Intelligence Input
                </Title>
                <Text 
                  size="lg"
                  style={{
                    color: 'var(--app-text-tertiary)',
                    fontSize: '1.125rem',
                    lineHeight: 1.6
                  }}
                >
                  Transform tactical and strategic data into AI-optimized execution plans with detailed implementation instructions
                </Text>
              </Stack>

              <textarea
                value={strategicQuery}
                onChange={(e) => setStrategicQuery(e.target.value)}
                placeholder="Enter your strategic challenge or decision..."
                rows={4}
                aria-label="Strategic question input"
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid var(--app-border-default)',
                  backgroundColor: 'var(--app-bg-tertiary)',
                  color: 'var(--app-text-secondary)',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  lineHeight: 1.6,
                  transition: 'border-color 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--app-border-focus)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--app-border-default)';
                }}
              />

              <Group justify="space-between" align="center">
                <Button
                  size="lg"
                  leftSection={<IconBrain size={20} />}
                  onClick={() => startStrategicSync(strategicQuery, selectedTool)}
                  disabled={!strategicQuery.trim()}
                  style={{
                    backgroundColor: 'var(--app-primary)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: strategicQuery.trim() ? 'pointer' : 'not-allowed',
                    opacity: strategicQuery.trim() ? 1 : 0.5,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (strategicQuery.trim()) {
                      e.currentTarget.style.backgroundColor = 'var(--app-primary-hover)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (strategicQuery.trim()) {
                      e.currentTarget.style.backgroundColor = 'var(--app-primary)';
                    }
                  }}
                >
                  Generate Strategic Intelligence
                </Button>
                <Text 
                  style={{ 
                    color: 'var(--app-text-muted)',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}
                >
                  ⚡ AI-optimized tactical → strategic → execution workflow
                </Text>
              </Group>

            <Stack gap={16}>
              <Text  fw={600}>💡 Strategic automation scenarios:</Text>
              <Stack gap={8}>
                {predefinedQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="light"
                    
                    onClick={() => setStrategicQuery(query)}
                    style={{ height: 'auto', padding: '12px 16px', textAlign: 'left' }}
                  >
                    <Text  style={{ whiteSpace: 'normal' }}>
                      {query}
                    </Text>
                  </Button>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Card>
      ) : (
        /* Active Strategic Analysis Workflow */
        <Grid gutter={32}>
          <Grid.Col span={{ base: 12, md: 4 }}>
            {/* Workflow Progress */}
            <Card shadow="md" padding={24} radius={16} style={{ position: 'sticky', top: '20px' }}>
              <Title order={3} size="h3" mb={24}>🧠 Analysis Progress</Title>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {syncSteps.map((step, index) => (
                  <Card key={step.id} padding={16} withBorder>
                    <Group justify="space-between" align="center">
                      <Group gap={8}>
                        <Badge 
                          color={
                            step.status === 'completed' ? 'green' :
                            step.status === 'processing' ? 'blue' :
                            step.status === 'error' ? 'red' : 'gray'
                          }
                          variant={step.status === 'processing' ? 'filled' : 'light'}
                        >
                          {step.status === 'completed' ? '✓' : step.status === 'processing' ? '⏳' : '⏸'}
                        </Badge>
                        <Stack gap={0}>
                          <Text  fw={600}>{step.name}</Text>
                          <Text size="xs" c="dimmed">Est: {step.timeEstimate}</Text>
                        </Stack>
                      </Group>
                    </Group>
                    {step.status === 'processing' && (
                      <Stack gap={8} mt={8}>
                        <Progress value={step.progress}  />
                        <Text size="xs" c="dimmed">
                          {Math.round(step.progress)}% complete
                        </Text>
                      </Stack>
                    )}
                  </Card>
                ))}
              </div>

              {syncResult && (
                <Alert color="green" title="Analysis Complete" mt={24}>
                  <Stack gap={16}>
                    <Text >
                      Strategic analysis completed with {syncResult.confidenceScore}% confidence score
                    </Text>
                    <Group>
                      <Button
                        component={Link}
                        href="/command-center"
                        variant="light"
                        color="green"
                        leftSection={<IconTarget size={16} />}
                        
                      >
                        Execute in Command Center
                      </Button>
                      <Button
                        variant="light"
                        color="blue"
                        
                        onClick={() => {
                          setActiveWorkflow(null);
                          setSyncResult(null);
                          setStrategicQuery('');
                        }}
                      >
                        Try Another Analysis
                      </Button>
                    </Group>
                  </Stack>
                </Alert>
              )}
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 8 }}>
            {/* Real-time Analysis Results */}
            <Card shadow="md" padding={24} radius={16}>
              <Title order={3} size="h3" mb={24}>📋 Strategic Analysis: {strategicQuery}</Title>
              
              {syncResult ? (
                <Stack gap={32}>
                  <Card padding={24} withBorder>
                    <Title order={4} size="h4" mb={16}>📊 Strategic Overview</Title>
                    <Stack gap={24}>
                      <Stack gap={8}>
                        <Text fw={600} >📊 Situation Assessment</Text>
                        <Text  c="dimmed">{syncResult.situationAssessment}</Text>
                      </Stack>
                      
                      <Group>
                        <Badge size="lg" color="blue" variant="light">
                          Confidence Score: {syncResult.confidenceScore}%
                        </Badge>
                        <Badge size="lg" color="green" variant="light">
                          {syncResult.toolUpdates.length} Tool Updates
                        </Badge>
                      </Group>

                      <Stack gap={8}>
                        <Text fw={600} >🎯 Success Metrics</Text>
                        <Group gap={8}>
                          {syncResult.successMetrics.map((metric, index) => (
                            <Badge key={index} variant="outline" >
                              {metric}
                            </Badge>
                          ))}
                        </Group>
                      </Stack>
                    </Stack>
                  </Card>
                  
                  <Card padding={24} withBorder>
                    <Title order={4} size="h4" mb={16}>💡 Recommendations</Title>
                    <Stack gap={24}>
                      <Stack gap={8}>
                        <Text fw={600} >💡 Strategic Recommendation</Text>
                        <Text >{syncResult.strategicRecommendation}</Text>
                      </Stack>
                      
                      <Stack gap={8}>
                        <Text fw={600} >🎯 Next Actions</Text>
                        <Stack gap={8}>
                          {syncResult.nextActions.map((action, index) => (
                            <Alert key={index} color="blue" variant="light" >
                              {action}
                            </Alert>
                          ))}
                        </Stack>
                      </Stack>

                      <Stack gap={8}>
                        <Text fw={600} >📊 Situation Assessment</Text>
                        <Text  c="dimmed">{syncResult.situationAssessment}</Text>
                      </Stack>
                    </Stack>
                  </Card>
                  
                  <Card padding={24} withBorder>
                    <Title order={4} size="h4" mb={16}>🎯 Success Metrics</Title>
                    <Stack gap={16}>
                      <Text fw={600} >🎯 Success Metrics</Text>
                      <Stack gap={12}>
                        {syncResult.successMetrics.map((metric, index) => (
                          <Card key={index} padding={16} withBorder>
                            <Text >{metric}</Text>
                          </Card>
                        ))}
                      </Stack>
                    </Stack>
                  </Card>
                </Stack>
              ) : (
                <Stack gap={16}>
                  <Text c="dimmed">Strategic analysis in progress...</Text>
                  {syncSteps.map((step, index) => (
                    step.status === 'completed' && step.output ? (
                      <Card key={step.id} padding={16} withBorder>
                        <Text fw={600}  mb={8}>✓ {step.name}</Text>
                        <Text size="xs" c="dimmed">
                          {JSON.stringify(step.output, null, 2)}
                        </Text>
                      </Card>
                    ) : null
                  ))}
                </Stack>
              )}
            </Card>
          </Grid.Col>
        </Grid>
      )}
    </Container>
    </div>
  );
};

export default StrategicIntelligenceEngine;