// components/onboarding/ProgressiveOnboarding.tsx
// Progressive onboarding system that adapts to user persona and creates dopamine-driven engagement
// WHY: Reduces cognitive load while maximizing strategic value delivery from first interaction
// RELEVANT FILES: workflow-state-manager.ts, WorkflowNavigator.tsx, command-center/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Card, 
  Title, 
  Text, 
  Button, 
  Group, 
  Stack, 
  Progress, 
  Badge, 
  Alert,
  Modal,
  SimpleGrid,
  ActionIcon,
  Box,
  Stepper
} from '@mantine/core';
import { 
  IconTarget, 
  IconBrain, 
  IconRocket, 
  IconCheck, 
  IconChevronRight,
  IconStar,
  IconTrophy,
  IconX,
  IconHandClick,
  IconBolt,
  IconChartLine
} from '@tabler/icons-react';
import { useWorkflowState, UserPersona, OnboardingStage } from '@/lib/navigation/workflow-state-manager';
import { PM33Card } from '@/components/PM33Card';

/**
 * Persona selection cards based on PM33_PRODUCT_REQUIREMENTS_DOCUMENT.md
 * Each persona gets customized onboarding flow and feature prioritization
 */
interface PersonaOption {
  key: UserPersona;
  title: string;
  subtitle: string;
  description: string;
  timeToValue: string;
  primaryUseCase: string;
  icon: React.ReactNode;
  gradient: string;
  quickWins: string[];
}

const PERSONA_OPTIONS: PersonaOption[] = [
  {
    key: 'senior_pm',
    title: 'Senior Product Manager',
    subtitle: 'Scale-Up Companies (50-500 employees)',
    description: '5-12 years experience, need strategic depth with execution efficiency',
    timeToValue: '10 minutes',
    primaryUseCase: 'Strategic decision intelligence + automated task creation',
    icon: <IconTarget size={32} />,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    quickWins: [
      'Get strategic analysis in 10 minutes vs 8 hours',
      'Auto-generate Jira tasks with strategic context',
      'ICE/RICE framework automation'
    ]
  },
  {
    key: 'vp_product',
    title: 'VP Product / Product Leader',
    subtitle: 'Enterprise (500+ employees)',
    description: '8-15+ years experience, managing multiple PMs and strategic initiatives',
    timeToValue: '5 minutes',
    primaryUseCase: 'Executive dashboard + team coordination intelligence',
    icon: <IconChartLine size={32} />,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    quickWins: [
      'Executive-level strategic summaries',
      'Multi-team coordination insights',
      'Portfolio optimization recommendations'
    ]
  },
  {
    key: 'founder',
    title: 'Founder / Early-Stage CPO',
    subtitle: 'Startups (5-50 employees)',
    description: '2-10 years experience, wearing multiple hats with limited resources',
    timeToValue: '3 minutes',
    primaryUseCase: 'Quick strategic decisions + resource allocation optimization',
    icon: <IconRocket size={32} />,
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    quickWins: [
      'Should we hire engineers or invest in marketing?',
      'Quick competitive response strategies',
      'Resource ROI optimization'
    ]
  }
];

/**
 * Onboarding step definitions with contextual actions
 * Each step designed for immediate value delivery (dopamine hit)
 */
interface OnboardingStep {
  key: OnboardingStage;
  title: string;
  description: string;
  estimatedTime: string;
  valueDelivered: string;
  ctaText: string;
  isCompleted: boolean;
  showForPersonas?: UserPersona[];
}

/**
 * Progressive Onboarding Component
 * Implements "Quick Wins" pattern for immediate dopamine engagement
 */
const ProgressiveOnboarding: React.FC = () => {
  // Workflow state management
  const { 
    userPersona, 
    onboardingStage, 
    engagementMetrics,
    setUserPersona, 
    advanceOnboarding,
    recordStrategicAnalysis,
    recordSuccessfulSync
  } = useWorkflowState();
  
  // Local component state
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<UserPersona | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  /**
   * Check if onboarding should be shown
   * Show for new users or if explicitly triggered
   */
  useEffect(() => {
    const shouldShow = 
      !userPersona || 
      onboardingStage === 'persona_selection' ||
      onboardingStage === 'strategic_setup';
      
    setShowOnboarding(shouldShow);
  }, [userPersona, onboardingStage]);
  
  /**
   * Generate persona-specific onboarding steps
   * Different paths for different user types to reduce cognitive load
   */
  const getOnboardingSteps = (persona: UserPersona | null): OnboardingStep[] => {
    if (!persona) return [];
    
    const baseSteps: OnboardingStep[] = [
      {
        key: 'strategic_setup',
        title: 'Strategic Context Setup',
        description: 'Tell us about your strategic priorities and current challenges',
        estimatedTime: '2 minutes',
        valueDelivered: 'Personalized AI intelligence',
        ctaText: 'Set Strategic Context',
        isCompleted: false
      },
      {
        key: 'first_analysis',
        title: 'Your First Strategic Analysis',
        description: 'Get immediate strategic intelligence on a real business decision',
        estimatedTime: '3 minutes',
        valueDelivered: '10-minute strategic insight vs 8-hour research',
        ctaText: 'Analyze Strategic Decision',
        isCompleted: false
      },
      {
        key: 'workflow_discovery',
        title: 'Discover Your Workflow',
        description: 'Learn how PM33 adapts to your strategic workflow patterns',
        estimatedTime: '2 minutes',
        valueDelivered: 'Contextual navigation intelligence',
        ctaText: 'Explore Workflows',
        isCompleted: false
      }
    ];
    
    // Add persona-specific steps
    if (persona === 'senior_pm' || persona === 'vp_product') {
      baseSteps.splice(1, 0, {
        key: 'tool_connection',
        title: 'Connect Your PM Tools',
        description: 'Link Jira, Linear, or other PM tools for strategic-to-execution bridge',
        estimatedTime: '2 minutes',
        valueDelivered: 'Automated task creation with strategic context',
        ctaText: 'Connect Tools',
        isCompleted: false
      });
    }
    
    baseSteps.push({
      key: 'completed',
      title: 'Power User Unlocked!',
      description: 'Access all strategic intelligence features and advanced workflows',
      estimatedTime: 'Ongoing',
      valueDelivered: 'Full PMO-level capabilities',
      ctaText: 'Start Strategic Work',
      isCompleted: false
    });
    
    return baseSteps;
  };
  
  /**
   * Handle persona selection with immediate value preview
   * Shows quick wins specific to their role
   */
  const handlePersonaSelection = (persona: UserPersona) => {
    setSelectedPersona(persona);
    setUserPersona(persona);
    
    // Trigger celebration for dopamine hit
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
    
    // Auto-advance to next step after brief delay
    setTimeout(() => {
      advanceOnboarding('strategic_setup');
      setCurrentStepIndex(0);
    }, 1500);
  };
  
  /**
   * Handle step completion with engagement tracking
   * Each completion triggers dopamine-driven feedback
   */
  const handleStepCompletion = (step: OnboardingStage) => {
    advanceOnboarding(step);
    
    // Track engagement metrics for different step types
    if (step === 'first_analysis') {
      recordStrategicAnalysis();
    } else if (step === 'tool_connection') {
      recordSuccessfulSync();
    }
    
    // Show celebration for major milestones
    if (step === 'completed') {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        setShowOnboarding(false);
      }, 3000);
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };
  
  /**
   * Skip onboarding for power users
   * Immediate access to full platform
   */
  const handleSkipOnboarding = () => {
    if (userPersona) {
      advanceOnboarding('power_user');
    }
    setShowOnboarding(false);
  };
  
  /**
   * Get completion progress for progress bar
   */
  const getCompletionProgress = () => {
    const steps = getOnboardingSteps(userPersona);
    const completedSteps = steps.filter(step => 
      step.key === onboardingStage || 
      (onboardingStage === 'completed' && step.key !== 'completed') ||
      (onboardingStage === 'power_user')
    ).length;
    
    return Math.min(100, (completedSteps / steps.length) * 100);
  };
  
  // Don't render if onboarding is not needed
  if (!showOnboarding) return null;
  
  return (
    <>
      {/* Main Onboarding Modal */}
      <Modal
        opened={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        size="xl"
        centered
        withCloseButton={false}
        styles={{
          modal: {
            background: 'var(--pm33-bg-elevated)',
            border: '1px solid var(--pm33-border-subtle)',
          }
        }}
      >
        <Container size="md" px={0}>
          {/* Progress Header */}
          <Box mb={32}>
            <Group justify="space-between" align="center" mb={16}>
              <Title order={2} size="h3" c="var(--pm33-text-primary)">
                Welcome to PM33
              </Title>
              <Group gap={12}>
                <Text size="sm" c="dimmed">
                  {Math.round(getCompletionProgress())}% Complete
                </Text>
                <ActionIcon 
                  variant="subtle" 
                  c="dimmed"
                  onClick={handleSkipOnboarding}
                >
                  <IconX size={16} />
                </ActionIcon>
              </Group>
            </Group>
            
            <Progress 
              value={getCompletionProgress()} 
              size="sm" 
              color="var(--pm33-brand)"
              style={{ background: 'var(--pm33-bg-tertiary)' }}
            />
          </Box>
          
          {/* Persona Selection Stage */}
          {onboardingStage === 'persona_selection' && (
            <Stack gap={24}>
              <Box ta="center" mb={16}>
                <Title order={3} size="h4" mb={8}>
                  What describes you best?
                </Title>
                <Text size="md" c="dimmed">
                  We'll customize your strategic intelligence experience
                </Text>
              </Box>
              
              <SimpleGrid cols={{ base: 1, sm: 1, md: 3 }} spacing={16}>
                {PERSONA_OPTIONS.map((persona) => (
                  <PM33Card
                    key={persona.key}
                    onClick={() => handlePersonaSelection(persona.key)}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      transform: selectedPersona === persona.key ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: selectedPersona === persona.key ? '0 8px 32px rgba(102, 126, 234, 0.3)' : undefined
                    }}
                  >
                    <Stack gap={16} ta="center" p={20}>
                      <Box
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 32,
                          background: persona.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          margin: '0 auto'
                        }}
                      >
                        {persona.icon}
                      </Box>
                      
                      <Box>
                        <Title order={4} size="h5" mb={4}>
                          {persona.title}
                        </Title>
                        <Text size="sm" c="dimmed" mb={8}>
                          {persona.subtitle}
                        </Text>
                        <Badge size="sm" color="gray" variant="light">
                          {persona.timeToValue} to value
                        </Badge>
                      </Box>
                      
                      <Text size="sm" ta="left">
                        {persona.description}
                      </Text>
                      
                      <Stack gap={4} ta="left">
                        <Text size="xs" fw={600} c="dimmed" tt="uppercase">
                          Quick Wins:
                        </Text>
                        {persona.quickWins.map((win, index) => (
                          <Group key={index} gap={8}>
                            <IconCheck size={12} color="var(--pm33-success)" />
                            <Text size="xs" c="dimmed">{win}</Text>
                          </Group>
                        ))}
                      </Stack>
                    </Stack>
                  </PM33Card>
                ))}
              </SimpleGrid>
            </Stack>
          )}
          
          {/* Onboarding Steps */}
          {userPersona && onboardingStage !== 'persona_selection' && onboardingStage !== 'completed' && (
            <Stack gap={24}>
              <Stepper 
                active={currentStepIndex} 
                size="sm"
                color="var(--pm33-brand)"
              >
                {getOnboardingSteps(userPersona).slice(0, -1).map((step, index) => (
                  <Stepper.Step
                    key={step.key}
                    label={step.title}
                    description={step.estimatedTime}
                    icon={index === currentStepIndex ? <IconHandClick size={18} /> : undefined}
                  />
                ))}
              </Stepper>
              
              {/* Current Step Content */}
              {(() => {
                const currentStep = getOnboardingSteps(userPersona)[currentStepIndex];
                if (!currentStep) return null;
                
                return (
                  <PM33Card p={32}>
                    <Stack gap={20}>
                      <Group justify="space-between" align="flex-start">
                        <Box>
                          <Title order={3} size="h4" mb={8}>
                            {currentStep.title}
                          </Title>
                          <Text size="md" c="dimmed" mb={12}>
                            {currentStep.description}
                          </Text>
                          <Group gap={16}>
                            <Badge size="sm" color="blue" variant="light">
                              <Group gap={4}>
                                <IconBolt size={12} />
                                {currentStep.estimatedTime}
                              </Group>
                            </Badge>
                            <Badge size="sm" color="green" variant="light">
                              <Group gap={4}>
                                <IconTrophy size={12} />
                                {currentStep.valueDelivered}
                              </Group>
                            </Badge>
                          </Group>
                        </Box>
                      </Group>
                      
                      {/* Step-specific content and actions */}
                      {currentStep.key === 'strategic_setup' && (
                        <Alert 
                          icon={<IconTarget size={16} />}
                          title="Strategic Intelligence Preview"
                          color="blue"
                          variant="light"
                        >
                          AI will learn your strategic context to provide personalized insights for decisions like:
                          "Should we prioritize Feature A or Feature B for Q2?" or "How should we respond to Competitor X's new launch?"
                        </Alert>
                      )}
                      
                      {currentStep.key === 'tool_connection' && (
                        <SimpleGrid cols={2} spacing={12}>
                          <Button variant="outline" leftSection={<IconCheck size={16} />}>
                            Connect Jira
                          </Button>
                          <Button variant="outline" leftSection={<IconCheck size={16} />}>
                            Connect Linear
                          </Button>
                        </SimpleGrid>
                      )}
                      
                      {currentStep.key === 'first_analysis' && (
                        <Alert 
                          icon={<IconBrain size={16} />}
                          title="Ready for Strategic Intelligence"
                          color="green"
                          variant="light"
                        >
                          You're about to experience 10-minute strategic analysis that typically takes hours of research. 
                          Ask about prioritization, competitive response, or resource allocation.
                        </Alert>
                      )}
                      
                      {currentStep.key === 'workflow_discovery' && (
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">
                            PM33 adapts navigation based on your current workflow: Planning → Executing → Reviewing → Firefighting
                          </Text>
                        </Group>
                      )}
                      
                      <Group justify="space-between" mt={16}>
                        <Text size="sm" c="dimmed">
                          Step {currentStepIndex + 1} of {getOnboardingSteps(userPersona).length - 1}
                        </Text>
                        
                        <Group gap={12}>
                          <Button 
                            variant="outline" 
                            onClick={handleSkipOnboarding}
                            size="sm"
                          >
                            Skip for now
                          </Button>
                          <Button 
                            rightSection={<IconChevronRight size={16} />}
                            onClick={() => handleStepCompletion(currentStep.key)}
                            size="sm"
                          >
                            {currentStep.ctaText}
                          </Button>
                        </Group>
                      </Group>
                    </Stack>
                  </PM33Card>
                );
              })()}
            </Stack>
          )}
        </Container>
      </Modal>
      
      {/* Celebration Modal for Dopamine Hits */}
      <Modal
        opened={showCelebration}
        onClose={() => setShowCelebration(false)}
        withCloseButton={false}
        centered
        size="sm"
        styles={{
          modal: {
            background: 'linear-gradient(135deg, var(--pm33-success) 0%, var(--pm33-brand) 100%)',
            border: 'none',
            color: 'white'
          }
        }}
      >
        <Stack align="center" ta="center" p={20} c="white">
          <IconTrophy size={48} />
          <Title order={2} c="white">
            Excellent Choice!
          </Title>
          <Text size="lg" c="white">
            {userPersona === 'senior_pm' && "Strategic intelligence optimized for scale-up execution"}
            {userPersona === 'vp_product' && "Executive-level portfolio intelligence activated"}
            {userPersona === 'founder' && "Resource optimization intelligence ready"}
          </Text>
          <Badge size="lg" color="white" c="dark">
            +{engagementMetrics.currentStreak} day streak
          </Badge>
        </Stack>
      </Modal>
    </>
  );
};

export default ProgressiveOnboarding;