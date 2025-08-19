/**
 * Component: PMCommandCenter (Dashboard)
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md - Section 3.1 Glass Morphism Cards
 * UX Pattern: PM33_ Complete _UX_System.md - Section 2.1 PM Command Center
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied
 * - [x] Animations implemented
 * - [x] Hover states added
 * - [x] AI intelligence visible
 * - [x] Progress indicators present
 * - [x] Follows 8pt grid spacing
 */

'use client';

import React, { useState, useEffect } from 'react';
import { PM33PageWrapper } from '@/components/PM33PageWrapper';
import { PM33Navigation } from '@/components/PM33Navigation';
import { PM33Card } from '@/components/PM33Card';
import { PM33Button } from '@/components/PM33Button';
import { PM33AIProcessing } from '@/components/PM33AIProcessing';
import {
  Container,
  Title,
  Text,
  Group,
  Stack,
  Badge,
  Progress,
  Alert,
  Box
} from '@mantine/core';
import {
  IconBrain,
  IconSparkles,
  IconTarget,
  IconCheck,
  IconStar
} from '@tabler/icons-react';
import Link from 'next/link';

// Types following Intelligence Operations model
interface UserContext {
  name: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  completedToday: number;
  totalToday: number;
  strategicScore: 'A+' | 'A' | 'B+' | 'B' | 'C';
  teamAlignment: number;
}

interface PMSkill {
  level: number;
  name: string;
  progress: number;
  nextUnlock: string;
  recentAchievement: string;
}

interface StrategicRecommendation {
  id: string;
  title: string;
  confidence: number;
  type: 'competitor_response' | 'feature_priority' | 'resource_allocation';
  urgency: 'high' | 'medium' | 'low';
  estimatedTime: string;
}

export default function PMCommandCenter() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [userContext, setUserContext] = useState<UserContext>({
    name: 'Sarah',
    timeOfDay: 'morning',
    completedToday: 4,
    totalToday: 5,
    strategicScore: 'A+',
    teamAlignment: 92
  });

  const [skills] = useState<Record<string, PMSkill>>({
    strategic: {
      level: 7,
      name: "Strategic Thinking",
      progress: 73,
      nextUnlock: "Blue Ocean Analysis",
      recentAchievement: "Made 10 data-driven decisions"
    },
    execution: {
      level: 5,
      name: "Execution Excellence", 
      progress: 45,
      nextUnlock: "Automated Sprint Planning",
      recentAchievement: "Shipped 3 features on time"
    },
    leadership: {
      level: 6,
      name: "Team Leadership",
      progress: 60,
      nextUnlock: "AI Team Coaching",
      recentAchievement: "Team happiness at 95%"
    }
  });

  const [recommendations] = useState<StrategicRecommendation[]>([
    {
      id: 'rec_1',
      title: 'Competitor launched AI features - Strategic response needed',
      confidence: 94,
      type: 'competitor_response',
      urgency: 'high',
      estimatedTime: '3 min review'
    },
    {
      id: 'rec_2', 
      title: 'Reallocate engineering resources for Q4 impact',
      confidence: 87,
      type: 'resource_allocation',
      urgency: 'medium',
      estimatedTime: '5 min review'
    }
  ]);

  const getContextualGreeting = () => {
    const { name, timeOfDay, completedToday, totalToday } = userContext;
    const completionRate = Math.round((completedToday / totalToday) * 100);
    
    if (timeOfDay === 'morning') {
      return `Good morning, ${name}! Here's your strategic focus for today.`;
    } else if (timeOfDay === 'afternoon') {
      return `Afternoon check-in: You're ${completionRate}% through today's priorities.`;
    } else {
      return `Evening review: Strong progress on strategic initiatives today.`;
    }
  };

  return (
    <PM33PageWrapper>
      <PM33Navigation currentPage="dashboard" />
      <Container size={1200} style={{ padding: '48px 24px', color: 'white' }}>
        <Stack gap={32}>
          {/* Contextual Header */}
          <Box mb={32}>
            <Title
              order={1}
              size="h1"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '2.5rem',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                marginBottom: '8px'
              }}
            >
              {getContextualGreeting()}
            </Title>
            <Text size="lg" c="dimmed">
              Strategic Intelligence Operations - {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </Box>

          {/* The Magic Moment - AI Already Did The Work */}
          <PM33Card style={{ marginBottom: '32px' }}>
            <Alert 
              color="green" 
              title="Intelligence Operations Summary"
              icon={<IconSparkles size={20} />}
              styles={{
                root: {
                  background: 'linear-gradient(135deg, rgba(81, 207, 102, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)',
                  border: '1px solid rgba(81, 207, 102, 0.3)'
                }
              }}
            >
              <Text size="md">
                While you were away, PM33 analyzed <strong>3 competitor updates</strong>, 
                reviewed <strong>12 customer tickets</strong>, and prepared <strong>2 strategic recommendations</strong>.
              </Text>
            </Alert>
          </PM33Card>

          {/* Clear Next Action */}
          <PM33Card style={{ marginBottom: '32px' }}>
            <Stack gap={24}>
              <Group justify="space-between" align="center">
                <Stack gap={8}>
                  <Title order={2} size="h3">
                    🎯 Priority Action
                  </Title>
                  <Text c="dimmed">
                    Your highest-impact next step
                  </Text>
                </Stack>
                <Badge size="lg" color="red" variant="filled">
                  High Priority
                </Badge>
              </Group>

              <Box>
                <Link href="/strategic-intelligence" style={{ textDecoration: 'none', display: 'block' }}>
                  <PM33Button
                    variant="primary"
                    size="lg"
                    icon={<IconBrain size={20} />}
                    style={{
                      width: '100%',
                      height: '60px',
                      fontSize: '18px',
                      fontWeight: 600
                    }}
                    onClick={() => setIsProcessing(true)}
                  >
                    Review Strategic Recommendations (3 min)
                  </PM33Button>
                </Link>
                <Text size="sm" c="dimmed" mt={8}>
                  Then: Team standup prep (2 min)
                </Text>
              </Box>
            </Stack>
          </PM33Card>

          {/* Progress Dopamine Hit */}
          <PM33Card style={{ marginBottom: '32px' }}>
            <Stack gap={24}>
              <Title order={2} size="h3">
                📊 Today's Progress
              </Title>
              
              <Group gap={32}>
                {/* Daily Progress Ring */}
                <Box style={{ position: 'relative', width: '120px', height: '120px' }}>
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="url(#progress-gradient)"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * (1 - (userContext.completedToday / userContext.totalToday))}`}
                      className="transition-all duration-1000 ease-out"
                      style={{ filter: 'drop-shadow(0 0 10px rgba(102, 126, 234, 0.8))' }}
                    />
                    <defs>
                      <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d2ff" />
                        <stop offset="100%" stopColor="#3a7bd5" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {Math.round((userContext.completedToday / userContext.totalToday) * 100)}%
                    </span>
                    <span className="text-xs text-gray-300">Complete</span>
                  </div>
                </Box>

                {/* Metrics */}
                <Stack gap={16} style={{ flex: 1 }}>
                  <Group gap={32}>
                    <Box>
                      <Text size="xl" fw={700} c="white">
                        {userContext.completedToday}/{userContext.totalToday}
                      </Text>
                      <Text size="sm" c="dimmed">Decisions Made</Text>
                    </Box>
                    <Box>
                      <Text size="xl" fw={700} c="green.4">
                        {userContext.teamAlignment}%
                      </Text>
                      <Text size="sm" c="dimmed">Team Aligned</Text>
                    </Box>
                    <Box>
                      <Group gap={8} align="center">
                        <Text size="xl" fw={700} c="yellow.4">
                          {userContext.strategicScore}
                        </Text>
                        <Badge size="sm" color="yellow" variant="light">
                          improved
                        </Badge>
                      </Group>
                      <Text size="sm" c="dimmed">Strategic Score</Text>
                    </Box>
                  </Group>
                </Stack>
              </Group>
            </Stack>
          </PM33Card>

          {/* PM Skill Tree */}
          <PM33Card style={{ marginBottom: '32px' }}>
            <Stack gap={24}>
              <Group justify="space-between" align="center">
                <Title order={2} size="h3">
                  🚀 PM Skill Tree
                </Title>
                <Text size="sm" c="dimmed">
                  Level up your product management expertise
                </Text>
              </Group>

              <Stack gap={16}>
                {Object.entries(skills).map(([key, skill]) => (
                  <div
                    key={key}
                    style={{
                      padding: '20px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      marginBottom: '16px'
                    }}
                  >
                    <Group gap={16} align="center">
                      <Badge size="lg" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                        Lvl {skill.level}
                      </Badge>
                      
                      <Stack gap={4} style={{ flex: 1 }}>
                        <Group justify="space-between" align="center">
                          <Text fw={600} size="md">{skill.name}</Text>
                          <Text size="sm" c="dimmed">{skill.progress}%</Text>
                        </Group>
                        <Progress 
                          value={skill.progress} 
                          color="blue"
                          size="sm"
                          radius="xl"
                        />
                        <Group gap={16}>
                          <Text size="xs" c="blue.4">
                            <IconStar size={12} style={{ display: 'inline', marginRight: '4px' }} />
                            Next: {skill.nextUnlock}
                          </Text>
                          <Text size="xs" c="green.4">
                            <IconCheck size={12} style={{ display: 'inline', marginRight: '4px' }} />
                            {skill.recentAchievement}
                          </Text>
                        </Group>
                      </Stack>
                    </Group>
                  </div>
                ))}
              </Stack>
            </Stack>
          </PM33Card>

          {/* Quick Actions */}
          <Group gap={24}>
            <Link href="/strategic-intelligence" style={{ textDecoration: 'none', flex: 1 }}>
              <PM33Button
                variant="primary"
                size="lg"
                icon={<IconBrain size={20} />}
                style={{ width: '100%' }}
              >
                Strategic Intelligence
              </PM33Button>
            </Link>
            <Link href="/command-center" style={{ textDecoration: 'none', flex: 1 }}>
              <PM33Button
                variant="secondary"
                size="lg"
                icon={<IconTarget size={20} />}
                style={{ width: '100%' }}
              >
                Command Center
              </PM33Button>
            </Link>
          </Group>
          
          {/* AI Processing State */}
          {isProcessing && (
            <PM33Card style={{ marginTop: '32px' }}>
              <PM33AIProcessing 
                message="Analyzing strategic intelligence..."
                subMessage="Preparing your customized recommendations"
              />
            </PM33Card>
          )}
        </Stack>
      </Container>
    </PM33PageWrapper>
  );
}