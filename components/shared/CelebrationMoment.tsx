/**
 * File: app/frontend/components/shared/CelebrationMoment.tsx
 * Purpose: Celebration moments for achievements and milestones - dopamine-driven engagement
 * Why: Creates delightful micro-interactions that make users feel accomplished
 * RELEVANT FILES: PM33UXProvider.tsx, QuickWinsDisplay.tsx, AchievementBadge.tsx
 */

'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  Text,
  Button,
  Group,
  Stack,
  Badge,
  Paper,
  Progress,
  Center,
  Transition,
  Box,
  ThemeIcon,
  RingProgress,
  Timeline,
  // Confetti component doesn't exist in Mantine
} from '@mantine/core';
import {
  IconTrophy,
  IconSparkles,
  IconRocket,
  IconTarget,
  IconBolt,
  IconHeart,
  IconStar
} from '@tabler/icons-react';
import { usePM33UX } from './PM33UXProvider';

interface CelebrationMomentProps {
  type: 'quick_win' | 'achievement' | 'milestone' | 'streak' | 'level_up';
  data: {
    title: string;
    description?: string;
    value?: number;
    impact?: 'low' | 'medium' | 'high' | 'critical';
    category?: string;
    xp?: number;
    level?: number;
  };
  onComplete?: () => void;
  autoHide?: boolean;
  duration?: number;
}

export const CelebrationMoment: React.FC<CelebrationMomentProps> = ({
  type,
  data,
  onComplete,
  autoHide = true,
  duration = 4000
}) => {
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(false);
  const { showConfetti, addQuickWin } = usePM33UX();

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (autoHide) {
      const hideTimer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, duration);

      return () => clearTimeout(hideTimer);
    }
  }, [autoHide, duration, onComplete]);

  // Configuration for different celebration types
  const celebrationConfigs = {
    quick_win: {
      icon: <IconBolt size={24} />,
      color: 'green',
      gradient: { from: 'green.6', to: 'teal.6' },
      title: '⚡ Quick Win!',
      subtitle: 'Efficiency boost achieved',
      confetti: false,
      pulse: true
    },
    achievement: {
      icon: <IconTrophy size={28} />,
      color: 'yellow',
      gradient: { from: 'yellow.6', to: 'orange.6' },
      title: '🏆 Achievement Unlocked!',
      subtitle: 'You\'re making great progress',
      confetti: true,
      pulse: true
    },
    milestone: {
      icon: <IconTarget size={26} />,
      color: 'violet',
      gradient: { from: 'violet.6', to: 'purple.6' },
      title: '🎯 Milestone Reached!',
      subtitle: 'Strategic progress achieved',
      confetti: true,
      pulse: false
    },
    streak: {
      icon: <IconRocket size={24} />,
      color: 'orange',
      gradient: { from: 'orange.6', to: 'red.6' },
      title: '🔥 Streak Power!',
      subtitle: 'Consistency is key to success',
      confetti: false,
      pulse: true
    },
    level_up: {
      icon: <IconStar size={30} />,
      color: 'blue',
      gradient: { from: 'blue.6', to: 'cyan.6' },
      title: '⭐ Level Up!',
      subtitle: 'Your PM skills are evolving',
      confetti: true,
      pulse: false
    }
  };

  const config = celebrationConfigs[type];

  useEffect(() => {
    if (config.confetti && animate) {
      showConfetti();
    }
  }, [config.confetti, animate, showConfetti]);

  const getImpactColor = (impact?: string) => {
    switch (impact) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <Transition
      mounted={visible}
      transition={{
        in: { opacity: 1, transform: 'translateY(0) scale(1)' },
        out: { opacity: 0, transform: 'translateY(-20px) scale(0.95)' },
        common: { transformOrigin: 'center' },
        transitionProperty: 'transform, opacity'
      }}
      duration={300}
      timingFunction="cubic-bezier(0.34, 1.56, 0.64, 1)"
    >
      {(styles) => (
        <Box
          style={{
            ...styles,
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            maxWidth: '400px',
            minWidth: '320px'
          }}
        >
          <Card
            shadow="xl"
            radius="lg"
            padding="lg"
            style={{
              background: `linear-gradient(135deg, ${config.gradient.from}, ${config.gradient.to})`,
              border: '2px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              animation: config.pulse && animate ? 'celebration-pulse 2s ease-in-out infinite' : undefined,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background sparkles animation */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                animation: animate ? 'sparkle-float 3s ease-in-out infinite' : undefined
              }}
            />
            
            <Stack gap="md" style={{ position: 'relative', zIndex: 1 }}>
              <Group justify="space-between" align="flex-start">
                <Group gap="md">
                  <ThemeIcon
                    size="xl"
                    radius="xl"
                    variant="white"
                    color={config.color}
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      animation: animate ? 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : undefined
                    }}
                  >
                    {config.icon}
                  </ThemeIcon>
                  
                  <div>
                    <Text 
                      size="lg" 
                      fw={700} 
                      c="white"
                      style={{
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        animation: animate ? 'slide-in-right 0.5s ease-out' : undefined
                      }}
                    >
                      {config.title}
                    </Text>
                    <Text 
                      size="sm" 
                      c="rgba(255, 255, 255, 0.8)"
                      style={{
                        animation: animate ? 'slide-in-right 0.5s ease-out 0.1s both' : undefined
                      }}
                    >
                      {config.subtitle}
                    </Text>
                  </div>
                </Group>

                {data.xp && (
                  <Badge
                    variant="white"
                    color={config.color}
                    size="lg"
                    style={{
                      fontWeight: 700,
                      animation: animate ? 'pop-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s both' : undefined
                    }}
                  >
                    +{data.xp} XP
                  </Badge>
                )}
              </Group>

              {/* Content based on celebration type */}
              <Paper
                radius="md"
                p="md"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(5px)',
                  animation: animate ? 'fade-in-up 0.6s ease-out 0.2s both' : undefined
                }}
              >
                <Stack gap="xs">
                  <Text 
                    size="md" 
                    fw={600} 
                    c="white"
                    style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
                  >
                    {data.title}
                  </Text>
                  
                  {data.description && (
                    <Text size="sm" c="rgba(255, 255, 255, 0.9)">
                      {data.description}
                    </Text>
                  )}

                  {/* Value and impact indicators */}
                  {(data.value || data.impact) && (
                    <Group gap="xs" mt="xs">
                      {data.value && (
                        <Badge variant="light" color="white" size="sm">
                          Value: {data.value}
                        </Badge>
                      )}
                      {data.impact && (
                        <Badge 
                          variant="filled" 
                          color={getImpactColor(data.impact)} 
                          size="sm"
                        >
                          {data.impact.toUpperCase()} IMPACT
                        </Badge>
                      )}
                    </Group>
                  )}

                  {/* Level progress for level up celebrations */}
                  {type === 'level_up' && data.level && (
                    <Group gap="md" mt="md">
                      <RingProgress
                        size={60}
                        thickness={6}
                        sections={[{ value: 100, color: 'white' }]}
                        label={
                          <Center>
                            <Text size="xs" fw={700} c="white">
                              {data.level}
                            </Text>
                          </Center>
                        }
                      />
                      <div>
                        <Text size="sm" fw={600} c="white">Level {data.level}</Text>
                        <Text size="xs" c="rgba(255, 255, 255, 0.8)">
                          PM Mastery Achieved
                        </Text>
                      </div>
                    </Group>
                  )}
                </Stack>
              </Paper>

              {/* Action button for manual dismiss */}
              {!autoHide && (
                <Button
                  variant="white"
                  color={config.color}
                  size="sm"
                  onClick={() => {
                    setVisible(false);
                    onComplete?.();
                  }}
                  style={{
                    animation: animate ? 'fade-in 0.5s ease-out 0.4s both' : undefined
                  }}
                >
                  Awesome! ✨
                </Button>
              )}
            </Stack>
          </Card>
        </Box>
      )}
    </Transition>
  );
};

// Quick Wins Display Component
interface QuickWinsDisplayProps {
  limit?: number;
  showProgress?: boolean;
}

export const QuickWinsDisplay: React.FC<QuickWinsDisplayProps> = ({ 
  limit = 5, 
  showProgress = true 
}) => {
  const { quickWins, getTotalValue, getStreakCount, celebrateWin } = usePM33UX();
  
  const recentWins = quickWins
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit);

  const totalValue = getTotalValue();
  const streakCount = getStreakCount();

  if (recentWins.length === 0) {
    return (
      <Card withBorder padding="md" radius="md">
        <Center py="xl">
          <Stack align="center" gap="md">
            <ThemeIcon size="xl" variant="light" color="gray">
              <IconTarget size={24} />
            </ThemeIcon>
            <Text c="dimmed" ta="center">
              Start achieving quick wins!<br />
              Complete tasks to see your progress here.
            </Text>
          </Stack>
        </Center>
      </Card>
    );
  }

  return (
    <Card withBorder padding="lg" radius="md">
      <Stack gap="md">
        <Group justify="space-between">
          <Text size="lg" fw={600}>⚡ Recent Quick Wins</Text>
          {showProgress && (
            <Group gap="md">
              <Badge variant="light" color="green" size="lg">
                {totalValue} Points
              </Badge>
              <Badge variant="light" color="orange" size="lg">
                {streakCount} Day Streak
              </Badge>
            </Group>
          )}
        </Group>

        <Timeline bulletSize={20} lineWidth={2}>
          {recentWins.map((win, index) => (
            <Timeline.Item
              key={win.id}
              bullet={
                <ThemeIcon
                  size={20}
                  radius="xl"
                  color={
                    win.impact === 'critical' ? 'red' :
                    win.impact === 'high' ? 'orange' :
                    win.impact === 'medium' ? 'yellow' : 'blue'
                  }
                >
                  <IconBolt size={12} />
                </ThemeIcon>
              }
              title={
                <Group justify="space-between">
                  <Text fw={500}>{win.title}</Text>
                  <Group gap="xs">
                    <Badge size="xs" color="gray">
                      +{win.value}
                    </Badge>
                    {!win.celebrated && (
                      <Button
                        size="xs"
                        variant="light"
                        color="yellow"
                        onClick={() => celebrateWin(win.id)}
                      >
                        🎉 Celebrate
                      </Button>
                    )}
                  </Group>
                </Group>
              }
            >
              <Text size="sm" c="dimmed" mb="xs">
                {win.description}
              </Text>
              <Text size="xs" c="dimmed">
                {win.timestamp.toLocaleDateString()} • {win.category.replace('_', ' ')}
              </Text>
            </Timeline.Item>
          ))}
        </Timeline>
      </Stack>
    </Card>
  );
};

// Add CSS animations
const styles = `
  @keyframes celebration-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  
  @keyframes sparkle-float {
    0%, 100% { opacity: 0.3; transform: translateY(0); }
    50% { opacity: 0.6; transform: translateY(-5px); }
  }
  
  @keyframes bounce-in {
    0% { transform: scale(0) rotate(-360deg); opacity: 0; }
    50% { transform: scale(1.1) rotate(-180deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  
  @keyframes slide-in-right {
    0% { transform: translateX(30px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes pop-in {
    0% { transform: scale(0); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  
  @keyframes fade-in-up {
    0% { transform: translateY(20px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}