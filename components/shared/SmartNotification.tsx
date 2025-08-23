/**
 * File: app/frontend/components/shared/SmartNotification.tsx
 * Purpose: Smart notification system that reduces anxiety and provides contextual assistance
 * Why: Learns from user behavior to optimize notification timing and content
 * RELEVANT FILES: PM33UXProvider.tsx, CelebrationMoment.tsx, AIProcessingState.tsx
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Text,
  Button,
  Group,
  Stack,
  Badge,
  ActionIcon,
  Progress,
  Tooltip,
  Alert,
  Notification,
  ThemeIcon,
  Transition,
  Box,
  Anchor
} from '@mantine/core';
import {
  IconBrain,
  IconHeart,
  IconShield,
  IconBulb,
  IconClock,
  IconCheck,
  IconX,
  IconInfoCircle,
  IconAlertTriangle,
  IconStar,
  IconBolt,
  IconEye,
  IconSettings,
  IconBell,
  IconBellOff
} from '@tabler/icons-react';
import { usePM33UX } from './PM33UXProvider';

interface SmartNotificationProps {
  id: string;
  type: 'success' | 'insight' | 'reminder' | 'celebration' | 'warning' | 'ai_assistance';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  message: string;
  anxietyReducing?: boolean;
  actionable?: boolean;
  autoClose?: number;
  onAction?: () => void;
  onDismiss?: () => void;
  actionLabel?: string;
  learnFromResponse?: boolean;
}

export const SmartNotification: React.FC<SmartNotificationProps> = ({
  id,
  type,
  priority,
  title,
  message,
  anxietyReducing = false,
  actionable = false,
  autoClose,
  onAction,
  onDismiss,
  actionLabel = 'Take Action',
  learnFromResponse = true
}) => {
  const [visible, setVisible] = useState(true);
  const [interacted, setInteracted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { recordUserAction } = usePM33UX();

  // Auto-close logic
  useEffect(() => {
    if (autoClose && !interacted) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (learnFromResponse) {
          recordUserAction('notification_auto_closed', type);
        }
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [autoClose, interacted, type, recordUserAction, learnFromResponse]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    setVisible(false);
    setInteracted(true);
    
    if (learnFromResponse) {
      recordUserAction('notification_dismissed', type);
    }
    
    onDismiss?.();
  }, [onDismiss, type, recordUserAction, learnFromResponse]);

  const handleAction = useCallback(() => {
    setInteracted(true);
    
    if (learnFromResponse) {
      recordUserAction('notification_action_taken', type);
    }
    
    onAction?.();
  }, [onAction, type, recordUserAction, learnFromResponse]);

  const getNotificationConfig = () => {
    const configs = {
      success: {
        color: 'green',
        icon: <IconCheck size={20} />,
        bgGradient: 'linear-gradient(135deg, #51cf66, #40c057)',
        borderColor: '#51cf66'
      },
      insight: {
        color: 'blue',
        icon: <IconBulb size={20} />,
        bgGradient: 'linear-gradient(135deg, #339af0, #228be6)',
        borderColor: '#339af0'
      },
      reminder: {
        color: 'yellow',
        icon: <IconClock size={20} />,
        bgGradient: 'linear-gradient(135deg, #ffd43b, #fab005)',
        borderColor: '#ffd43b'
      },
      celebration: {
        color: 'violet',
        icon: <IconStar size={20} />,
        bgGradient: 'linear-gradient(135deg, #cc5de8, #be4bdb)',
        borderColor: '#cc5de8'
      },
      warning: {
        color: 'red',
        icon: <IconAlertTriangle size={20} />,
        bgGradient: 'linear-gradient(135deg, #ff8787, #ff6b6b)',
        borderColor: '#ff8787'
      },
      ai_assistance: {
        color: 'cyan',
        icon: <IconBrain size={20} />,
        bgGradient: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
        borderColor: '#22d3ee'
      }
    };

    return configs[type];
  };

  const config = getNotificationConfig();
  
  const getPriorityStyles = () => {
    const styles = {
      urgent: {
        animation: 'urgent-pulse 1s ease-in-out infinite',
        boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
        transform: 'scale(1.02)'
      },
      high: {
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        transform: 'scale(1.01)'
      },
      medium: {
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
      },
      low: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
      }
    };

    return styles[priority] || styles.medium;
  };

  return (
    <Transition
      mounted={visible}
      transition={{
        in: { opacity: 1, transform: 'translateX(0) scale(1)' },
        out: { opacity: 0, transform: 'translateX(100%) scale(0.95)' },
        common: { transformOrigin: 'right center' },
        transitionProperty: 'transform, opacity'
      }}
      duration={300}
      timingFunction="cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    >
      {(styles) => (
        <Card
          style={{
            ...styles,
            ...getPriorityStyles(),
            background: anxietyReducing 
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 248, 255, 0.95))'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderLeft: `4px solid ${config.borderColor}`,
            maxWidth: '400px',
            margin: '8px 0',
            position: 'relative',
            overflow: 'hidden'
          }}
          shadow="lg"
          radius="md"
          padding="md"
        >
          {/* Priority indicator */}
          {priority === 'urgent' && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #ff6b6b, #ff8787, #ff6b6b)',
                animation: 'urgent-flash 2s ease-in-out infinite'
              }}
            />
          )}

          <Stack gap="sm">
            <Group justify="space-between" align="flex-start">
              <Group gap="md" style={{ flex: 1 }}>
                <ThemeIcon
                  size="lg"
                  radius="xl"
                  variant="light"
                  color={config.color}
                  style={{
                    background: config.bgGradient,
                    color: 'white'
                  }}
                >
                  {config.icon}
                </ThemeIcon>
                
                <div style={{ flex: 1 }}>
                  <Group justify="space-between" align="flex-start">
                    <Text size="sm" fw={600} c="dark">
                      {title}
                    </Text>
                    
                    <Group gap={4}>
                      {anxietyReducing && (
                        <Tooltip label="Anxiety-reducing notification">
                          <ThemeIcon size="xs" variant="light" color="pink">
                            <IconHeart size={10} />
                          </ThemeIcon>
                        </Tooltip>
                      )}
                      
                      <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="gray"
                        onClick={handleDismiss}
                      >
                        <IconX size={14} />
                      </ActionIcon>
                    </Group>
                  </Group>
                  
                  <Text size="sm" c="dimmed" mt={2}>
                    {message}
                    {anxietyReducing && (
                      <Text span c="blue" fw={500}>
                        {' '}✨ PM33 is handling this for you - no stress needed!
                      </Text>
                    )}
                  </Text>
                </div>
              </Group>
            </Group>

            {/* Action button for actionable notifications */}
            {actionable && (
              <Group justify="flex-end" mt="xs">
                <Button
                  size="xs"
                  variant="light"
                  color={config.color}
                  leftSection={<IconBolt size={14} />}
                  onClick={handleAction}
                >
                  {actionLabel}
                </Button>
              </Group>
            )}

            {/* Progress bar for auto-close */}
            {autoClose && !interacted && (
              <Progress
                size="xs"
                value={100}
                color={config.color}
                style={{
                  animation: `countdown ${autoClose}ms linear forwards`
                }}
              />
            )}
          </Stack>
        </Card>
      )}
    </Transition>
  );
};

// Smart Notification Center Component
interface NotificationCenterProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  maxNotifications?: number;
}

export const SmartNotificationCenter: React.FC<NotificationCenterProps> = ({
  position = 'top-right',
  maxNotifications = 5
}) => {
  const [notifications, setNotifications] = useState<SmartNotificationProps[]>([]);
  const [paused, setPaused] = useState(false);
  const { recordUserAction } = usePM33UX();

  const addNotification = useCallback((notification: Omit<SmartNotificationProps, 'onDismiss'>) => {
    const newNotification: SmartNotificationProps = {
      ...notification,
      onDismiss: () => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }
    };

    setNotifications(prev => {
      const filtered = prev.filter(n => n.id !== notification.id);
      const limited = filtered.slice(0, maxNotifications - 1);
      return [newNotification, ...limited];
    });
  }, [maxNotifications]);

  const getPositionStyles = () => {
    const styles = {
      'top-right': { top: '20px', right: '20px' },
      'top-left': { top: '20px', left: '20px' },
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' }
    };

    return styles[position];
  };

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    recordUserAction('notifications_cleared_all', 'bulk_action');
  }, [recordUserAction]);

  const pauseNotifications = useCallback(() => {
    setPaused(!paused);
    recordUserAction(paused ? 'notifications_resumed' : 'notifications_paused', 'setting');
  }, [paused, recordUserAction]);

  return (
    <Box
      style={{
        position: 'fixed',
        ...getPositionStyles(),
        zIndex: 9999,
        maxWidth: '420px',
        pointerEvents: 'none'
      }}
    >
      {/* Controls */}
      {notifications.length > 0 && (
        <Card
          style={{
            pointerEvents: 'auto',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            marginBottom: '8px'
          }}
          shadow="sm"
          radius="md"
          padding="xs"
        >
          <Group justify="space-between" gap="xs">
            <Text size="xs" c="dimmed">
              {notifications.length} notification{notifications.length > 1 ? 's' : ''}
            </Text>
            
            <Group gap={4}>
              <Tooltip label={paused ? 'Resume notifications' : 'Pause notifications'}>
                <ActionIcon
                  size="sm"
                  variant="subtle"
                  color="gray"
                  onClick={pauseNotifications}
                >
                  {paused ? <IconBell size={14} /> : <IconBellOff size={14} />}
                </ActionIcon>
              </Tooltip>
              
              <Tooltip label="Clear all">
                <ActionIcon
                  size="sm"
                  variant="subtle"
                  color="gray"
                  onClick={clearAllNotifications}
                >
                  <IconX size={14} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        </Card>
      )}

      {/* Notifications */}
      <Stack gap={0} style={{ pointerEvents: 'auto' }}>
        {notifications.map((notification) => (
          <SmartNotification
            key={notification.id}
            {...notification}
          />
        ))}
      </Stack>
    </Box>
  );
};

// Anxiety-Reducing Notification Helpers
export const AnxietyReducingNotifications = {
  processing: (message: string = "AI is working on your request") => ({
    id: `anxiety_processing_${Date.now()}`,
    type: 'ai_assistance' as const,
    priority: 'low' as const,
    title: '🧠 AI Processing',
    message: `${message}. Take a deep breath - everything is under control.`,
    anxietyReducing: true,
    autoClose: 0 // Don't auto-close anxiety-reducing notifications
  }),

  
  waiting: (task: string = "your task") => ({
    id: `anxiety_waiting_${Date.now()}`,
    type: 'insight' as const,
    priority: 'low' as const,
    title: '⏳ Please Wait',
    message: `We're carefully handling ${task}. Quality takes time, and you're in good hands.`,
    anxietyReducing: true,
    autoClose: 0
  }),

  error: (message: string = "something went wrong") => ({
    id: `anxiety_error_${Date.now()}`,
    type: 'warning' as const,
    priority: 'medium' as const,
    title: '🛡️ No Worries',
    message: `${message}, but PM33 has backup systems ready. We'll handle this automatically.`,
    anxietyReducing: true,
    actionable: true,
    actionLabel: 'Show Details',
    autoClose: 0
  }),

  success: (achievement: string) => ({
    id: `anxiety_success_${Date.now()}`,
    type: 'success' as const,
    priority: 'medium' as const,
    title: '✅ Perfect!',
    message: `${achievement}. You're making excellent progress - keep up the great work!`,
    anxietyReducing: true,
    autoClose: 5000
  })
};

// Add CSS animations
const styles = `
  @keyframes urgent-pulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 0, 0, 0.3); }
    50% { transform: scale(1.02); box-shadow: 0 0 30px rgba(255, 0, 0, 0.5); }
  }
  
  @keyframes urgent-flash {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes countdown {
    from { width: 100%; }
    to { width: 0%; }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}