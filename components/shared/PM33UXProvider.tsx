/**
 * File: app/frontend/components/shared/PM33UXProvider.tsx
 * Purpose: PM33 UX Enhancement Provider - Creates delightful, sticky product experiences
 * Why: Provides dopamine-driven engagement, smart notifications, celebrations, and AI assistance
 * RELEVANT FILES: PM33Card.tsx, AIProcessingState.tsx, CelebrationMoment.tsx, SmartNotification.tsx
 */

'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { notifications, NotificationData } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { useHotkeys } from '@mantine/hooks';
import {
  IconSparkles,
  IconTrophy,
  IconCheck,
  IconBolt,
  IconRocket,
  IconTarget,
  IconHeart,
  IconSparkles as IconConfetti,
  IconWand,
  IconBrain
} from '@tabler/icons-react';

// PM33 UX Context Types
interface QuickWin {
  id: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  category: 'time_saved' | 'efficiency_gained' | 'insight_discovered' | 'goal_achieved';
  value: number; // numerical value for progress tracking
  timestamp: Date;
  celebrated: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'milestone' | 'streak' | 'efficiency' | 'innovation';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  xp_value: number;
  unlocked_at: Date;
}

interface SmartNotificationConfig {
  id: string;
  type: 'success' | 'insight' | 'reminder' | 'celebration' | 'warning';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timing: 'immediate' | 'contextual' | 'optimal' | 'scheduled';
  anxiety_reducing: boolean;
  actionable: boolean;
}

interface ImpactPreview {
  action: string;
  estimated_time_saved: number;
  efficiency_gain: number;
  strategic_alignment: number;
  risk_level: 'low' | 'medium' | 'high';
  confidence: number;
  preview_data: Record<string, any>;
}

interface PM33UXContextType {
  // Quick Wins & Dopamine Triggers
  quickWins: QuickWin[];
  addQuickWin: (win: Omit<QuickWin, 'id' | 'timestamp' | 'celebrated'>) => void;
  celebrateWin: (winId: string) => void;
  getTotalValue: () => number;
  getStreakCount: () => number;

  // Achievements & Gamification
  achievements: Achievement[];
  userXP: number;
  userLevel: number;
  unlockAchievement: (achievementId: string) => void;
  getNextLevelProgress: () => number;

  // Smart Notifications
  showSmartNotification: (config: SmartNotificationConfig, data: NotificationData) => void;
  scheduleContextualNotification: (config: SmartNotificationConfig, triggerCondition: () => boolean) => void;
  reduceAnxiety: (message: string, reassurance?: string) => void;

  // AI-Powered Assistance
  isAIThinking: boolean;
  setAIThinking: (thinking: boolean) => void;
  getAISuggestion: (context: string, field: string) => Promise<string>;
  previewImpact: (action: string, context: Record<string, any>) => Promise<ImpactPreview>;

  // Power User Features
  shortcuts: Record<string, () => void>;
  registerShortcut: (key: string, action: () => void, description: string) => void;
  showCommandPalette: () => void;

  // Predictive Navigation
  predictNextAction: (currentContext: string) => string[];
  recordUserAction: (action: string, context: string) => void;
  getNavigationSuggestions: () => Array<{ label: string; path: string; confidence: number }>;

  // Celebration System
  triggerCelebration: (type: 'success' | 'milestone' | 'achievement' | 'streak', data?: any) => void;
  showConfetti: () => void;
  
  // Form Intelligence
  getSmartDefaults: (formType: string, context?: Record<string, any>) => Promise<Record<string, any>>;
  validateWithAI: (field: string, value: any, context: Record<string, any>) => Promise<{ valid: boolean; suggestion?: string; confidence: number }>;
}

const PM33UXContext = createContext<PM33UXContextType | null>(null);

export const usePM33UX = () => {
  const context = useContext(PM33UXContext);
  if (!context) {
    throw new Error('usePM33UX must be used within PM33UXProvider');
  }
  return context;
};

interface PM33UXProviderProps {
  children: React.ReactNode;
  userId?: string;
  companyId?: string;
}

export const PM33UXProvider: React.FC<PM33UXProviderProps> = ({ 
  children, 
  userId = 'demo_user', 
  companyId = 'demo_company' 
}) => {
  // State management for UX enhancement
  const [quickWins, setQuickWins] = useState<QuickWin[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [isAIThinking, setAIThinking] = useState(false);
  const [shortcuts, setShortcuts] = useState<Record<string, () => void>>({});
  const [userActionHistory, setUserActionHistory] = useState<Array<{ action: string; context: string; timestamp: Date }>>([]);

  // Quick Wins System - Dopamine-Driven Engagement
  const addQuickWin = useCallback((win: Omit<QuickWin, 'id' | 'timestamp' | 'celebrated'>) => {
    const newWin: QuickWin = {
      ...win,
      id: `qw_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      celebrated: false
    };

    setQuickWins(prev => [...prev, newWin]);
    setUserXP(prev => prev + (win.value * 10)); // XP reward

    // Immediate dopamine hit
    showSmartNotification(
      {
        id: `qw_notif_${newWin.id}`,
        type: 'success',
        priority: 'medium',
        timing: 'immediate',
        anxiety_reducing: false,
        actionable: true
      },
      {
        title: `🎉 Quick Win: ${win.title}`,
        message: win.description,
        color: 'green',
        icon: <IconTrophy size={16} />,
        autoClose: 4000
      }
    );

    // Auto-celebrate high-impact wins
    if (win.impact === 'high' || win.impact === 'critical') {
      setTimeout(() => celebrateWin(newWin.id), 1000);
    }
  }, []);

  const celebrateWin = useCallback((winId: string) => {
    setQuickWins(prev => prev.map(win => 
      win.id === winId ? { ...win, celebrated: true } : win
    ));

    const win = quickWins.find(w => w.id === winId);
    if (win) {
      triggerCelebration('success', { 
        title: win.title,
        value: win.value,
        impact: win.impact
      });
    }
  }, [quickWins]);

  const getTotalValue = useCallback(() => {
    return quickWins.reduce((total, win) => total + win.value, 0);
  }, [quickWins]);

  const getStreakCount = useCallback(() => {
    // Calculate consecutive days with quick wins
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    const todayWins = quickWins.filter(win => win.timestamp.toDateString() === today);
    const yesterdayWins = quickWins.filter(win => win.timestamp.toDateString() === yesterday);
    
    return todayWins.length > 0 && yesterdayWins.length > 0 ? 2 : 1; // Simplified streak logic
  }, [quickWins]);

  // Achievement System
  const unlockAchievement = useCallback((achievementId: string) => {
    const achievementTemplates = {
      first_analysis: {
        id: 'first_analysis',
        title: '🎯 Strategic Thinker',
        description: 'Completed your first strategic analysis',
        icon: <IconBrain size={20} />,
        category: 'milestone' as const,
        rarity: 'common' as const,
        xp_value: 100
      },
      efficiency_master: {
        id: 'efficiency_master',
        title: '⚡ Efficiency Master',
        description: 'Saved 2+ hours through PM33 automation',
        icon: <IconBolt size={20} />,
        category: 'efficiency' as const,
        rarity: 'uncommon' as const,
        xp_value: 250
      },
      streak_champion: {
        id: 'streak_champion',
        title: '🔥 Streak Champion',
        description: '7-day consecutive productivity streak',
        icon: <IconRocket size={20} />,
        category: 'streak' as const,
        rarity: 'rare' as const,
        xp_value: 500
      }
    };

    const template = achievementTemplates[achievementId as keyof typeof achievementTemplates];
    if (!template) return;

    const achievement: Achievement = {
      ...template,
      unlocked_at: new Date()
    };

    setAchievements(prev => [...prev, achievement]);
    setUserXP(prev => prev + achievement.xp_value);

    // Epic celebration for achievements
    triggerCelebration('achievement', achievement);
  }, []);

  const getNextLevelProgress = useCallback(() => {
    const xpForCurrentLevel = userLevel * 1000;
    const xpForNextLevel = (userLevel + 1) * 1000;
    const progress = (userXP - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel);
    return Math.max(0, Math.min(100, progress * 100));
  }, [userXP, userLevel]);

  // Smart Notifications - Anxiety Reducing
  const showSmartNotification = useCallback((config: SmartNotificationConfig, data: NotificationData) => {
    // Apply PM33 styling and anxiety-reducing patterns
    const enhancedData = {
      ...data,
      styles: {
        root: {
          borderLeft: `4px solid ${
            config.type === 'success' ? '#51cf66' : 
            config.type === 'celebration' ? '#ffd43b' :
            config.type === 'insight' ? '#339af0' :
            config.type === 'warning' ? '#ff8787' : '#868e96'
          }`,
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.95)',
        }
      },
      autoClose: config.anxiety_reducing ? false : data.autoClose,
    };

    if (config.anxiety_reducing) {
      enhancedData.message = `${data.message}\n\n✨ PM33 is handling this for you - no stress needed!`;
    }

    notifications.show(enhancedData);

    // Analytics tracking
    recordUserAction('notification_received', config.type);
  }, []);

  const reduceAnxiety = useCallback((message: string, reassurance?: string) => {
    showSmartNotification(
      {
        id: `anxiety_reducer_${Date.now()}`,
        type: 'insight',
        priority: 'medium',
        timing: 'immediate',
        anxiety_reducing: true,
        actionable: false
      },
      {
        title: '🧘‍♀️ Stay Calm',
        message: reassurance || "PM33's AI is working on this. You can focus on strategy while we handle the details.",
        color: 'blue',
        icon: <IconHeart size={16} />,
        autoClose: 6000
      }
    );
  }, [showSmartNotification]);

  // AI-Powered Form Assistance
  const getAISuggestion = useCallback(async (context: string, field: string): Promise<string> => {
    setAIThinking(true);
    
    try {
      // Simulate AI processing with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
      
      // Mock AI suggestions based on context and field
      const suggestions: Record<string, Record<string, string>> = {
        strategic_analysis: {
          question: "What market opportunities should we prioritize for Q2 expansion?",
          focus_areas: "Market expansion, competitive positioning, customer acquisition",
          success_criteria: "25% market share increase, improved customer satisfaction, cost optimization"
        },
        team_update: {
          achievements: "Completed sprint 24 with 95% velocity, deployed new user dashboard",
          challenges: "Database performance bottleneck during peak hours",
          next_steps: "Optimize database queries, implement caching layer, scale infrastructure"
        },
        executive_summary: {
          key_insights: "Strategic initiative shows 40% growth potential with strong market alignment",
          recommendations: "Accelerate investment in AI capabilities, expand enterprise sales team"
        }
      };

      const contextSuggestions = suggestions[context] || {};
      const suggestion = contextSuggestions[field] || `AI-generated suggestion for ${field} in ${context}`;
      
      // Add quick win for AI assistance
      addQuickWin({
        title: 'AI Assisted Input',
        description: `AI suggested content for ${field}`,
        impact: 'medium',
        category: 'efficiency_gained',
        value: 3
      });
      
      return suggestion;
    } finally {
      setAIThinking(false);
    }
  }, [addQuickWin]);

  // Impact Preview System
  const previewImpact = useCallback(async (action: string, context: Record<string, any>): Promise<ImpactPreview> => {
    setAIThinking(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock impact calculations
      const impacts: Record<string, ImpactPreview> = {
        generate_analysis: {
          action: 'Generate Strategic Analysis',
          estimated_time_saved: 4.5,
          efficiency_gain: 85,
          strategic_alignment: 92,
          risk_level: 'low',
          confidence: 88,
          preview_data: {
            insights_generated: 6,
            recommendations: 4,
            frameworks_applied: 2,
            stakeholder_impact: 'high'
          }
        },
        create_update: {
          action: 'Create Team Update',
          estimated_time_saved: 1.2,
          efficiency_gain: 70,
          strategic_alignment: 78,
          risk_level: 'low',
          confidence: 95,
          preview_data: {
            sections_generated: 5,
            stakeholders_reached: 12,
            communication_clarity: 'high'
          }
        }
      };

      return impacts[action] || {
        action,
        estimated_time_saved: 2.0,
        efficiency_gain: 75,
        strategic_alignment: 80,
        risk_level: 'medium',
        confidence: 82,
        preview_data: {}
      };
    } finally {
      setAIThinking(false);
    }
  }, []);

  // Keyboard Shortcuts for Power Users
  const registerShortcut = useCallback((key: string, action: () => void, description: string) => {
    setShortcuts(prev => ({ ...prev, [key]: action }));
  }, []);

  const showCommandPalette = useCallback(() => {
    modals.open({
      title: '⌨️ Command Palette',
      size: 'lg',
      children: (
        <div style={{ padding: '20px' }}>
          <h3>Available Shortcuts:</h3>
          {Object.entries(shortcuts).map(([key, action]) => (
            <div key={key} style={{ 
              padding: '8px 12px', 
              margin: '4px 0',
              background: 'rgba(0, 0, 0, 0.05)',
              borderRadius: '6px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>{key}</span>
              <kbd style={{ 
                padding: '2px 6px',
                background: '#f1f3f4',
                borderRadius: '3px',
                fontSize: '12px'
              }}>
                {key}
              </kbd>
            </div>
          ))}
        </div>
      )
    });
  }, [shortcuts]);

  // Predictive Navigation
  const recordUserAction = useCallback((action: string, context: string) => {
    setUserActionHistory(prev => [
      ...prev,
      { action, context, timestamp: new Date() }
    ].slice(-50)); // Keep last 50 actions
  }, []);

  const predictNextAction = useCallback((currentContext: string): string[] => {
    // Analyze user patterns to predict next likely actions
    const recentActions = userActionHistory
      .filter(h => h.context === currentContext)
      .slice(-10);
    
    // Simple pattern matching - in production would use ML
    const actionCounts = recentActions.reduce((acc, action) => {
      acc[action.action] = (acc[action.action] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(actionCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([action]) => action)
      .slice(0, 3);
  }, [userActionHistory]);

  const getNavigationSuggestions = useCallback(() => {
    const suggestions = [
      { label: '📊 Strategic Analysis', path: '/strategic-intelligence', confidence: 85 },
      { label: '👥 Team Updates', path: '/communication/updates', confidence: 70 },
      { label: '🎯 Alignment Dashboard', path: '/communication/alignment', confidence: 65 },
    ];

    return suggestions.sort((a, b) => b.confidence - a.confidence);
  }, []);

  // Celebration System
  const triggerCelebration = useCallback((type: 'success' | 'milestone' | 'achievement' | 'streak', data?: any) => {
    const celebrationConfigs = {
      success: {
        title: '🎉 Success!',
        message: data?.title || 'Great job!',
        color: 'green',
        icon: <IconCheck size={20} />,
        showConfetti: false
      },
      milestone: {
        title: '🏆 Milestone Reached!',
        message: data?.title || 'You\'ve hit an important milestone!',
        color: 'yellow',
        icon: <IconTrophy size={20} />,
        showConfetti: true
      },
      achievement: {
        title: '⭐ Achievement Unlocked!',
        message: `${data?.title}: ${data?.description}`,
        color: 'violet',
        icon: data?.icon || <IconSparkles size={20} />,
        showConfetti: true
      },
      streak: {
        title: '🔥 Streak Power!',
        message: data?.message || 'Your productivity streak continues!',
        color: 'orange',
        icon: <IconRocket size={20} />,
        showConfetti: true
      }
    };

    const config = celebrationConfigs[type];
    
    notifications.show({
      title: config.title,
      message: config.message,
      color: config.color,
      icon: config.icon,
      autoClose: 5000,
      styles: {
        root: {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(240, 248, 255, 0.9))',
          border: '2px solid #ffd43b',
          transform: 'scale(1.02)',
          boxShadow: '0 8px 32px rgba(255, 212, 59, 0.3)',
        }
      }
    });

    if (config.showConfetti) {
      showConfetti();
    }
  }, []);

  const showConfetti = useCallback(() => {
    // Confetti animation - would integrate with canvas confetti library
    console.log('🎊 CONFETTI! 🎊');
  }, []);

  // Smart Form Defaults
  const getSmartDefaults = useCallback(async (formType: string, context?: Record<string, any>): Promise<Record<string, any>> => {
    setAIThinking(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const defaults: Record<string, Record<string, any>> = {
        strategic_analysis: {
          framework: 'RICE',
          timeframe: 'quarterly',
          focus_areas: ['strategic_initiatives', 'market_position'],
          audience_level: 'executive'
        },
        team_update: {
          update_frequency: 'weekly',
          target_audience: ['team_members', 'management'],
          include_metrics: true,
          auto_schedule: false
        },
        executive_summary: {
          timeframe: 'monthly',
          audience_level: 'executive',
          focus_areas: ['strategic_initiatives', 'performance_metrics'],
          export_format: 'pdf'
        }
      };

      return defaults[formType] || {};
    } finally {
      setAIThinking(false);
    }
  }, []);

  const validateWithAI = useCallback(async (field: string, value: any, context: Record<string, any>) => {
    // Quick validation with AI suggestions
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      valid: true,
      suggestion: `AI suggests optimizing "${field}" for better impact`,
      confidence: 85
    };
  }, []);

  // Initialize default shortcuts
  useEffect(() => {
    const defaultShortcuts = {
      'mod+k': showCommandPalette,
      'mod+1': () => recordUserAction('navigate_dashboard', 'navigation'),
      'mod+2': () => recordUserAction('navigate_chat', 'navigation'),
      'mod+3': () => recordUserAction('navigate_tasks', 'navigation'),
      'g d': () => recordUserAction('quick_nav_dashboard', 'keyboard'),
      'g c': () => recordUserAction('quick_nav_communication', 'keyboard'),
      'g a': () => recordUserAction('quick_nav_analysis', 'keyboard'),
    };

    setShortcuts(defaultShortcuts);
  }, [showCommandPalette]);

  // Register global shortcuts
  useHotkeys([
    ['mod+K', showCommandPalette],
    ['mod+1', () => recordUserAction('shortcut_dashboard', 'keyboard')],
    ['mod+2', () => recordUserAction('shortcut_communication', 'keyboard')],
    ['/', () => recordUserAction('search_focus', 'keyboard')],
  ]);

  // Level up logic
  useEffect(() => {
    const newLevel = Math.floor(userXP / 1000) + 1;
    if (newLevel > userLevel) {
      setUserLevel(newLevel);
      triggerCelebration('milestone', { 
        title: `Level ${newLevel} Reached!`,
        message: `Your PM skills are evolving! 🚀` 
      });
    }
  }, [userXP, userLevel, triggerCelebration]);

  const contextValue: PM33UXContextType = {
    // Quick Wins & Dopamine
    quickWins,
    addQuickWin,
    celebrateWin,
    getTotalValue,
    getStreakCount,

    // Achievements
    achievements,
    userXP,
    userLevel,
    unlockAchievement,
    getNextLevelProgress,

    // Smart Notifications
    showSmartNotification,
    scheduleContextualNotification: () => {}, // Placeholder
    reduceAnxiety,

    // AI Assistance
    isAIThinking,
    setAIThinking,
    getAISuggestion,
    previewImpact,

    // Power User Features
    shortcuts,
    registerShortcut,
    showCommandPalette,

    // Predictive Navigation
    predictNextAction,
    recordUserAction,
    getNavigationSuggestions,

    // Celebrations
    triggerCelebration,
    showConfetti,

    // Form Intelligence
    getSmartDefaults,
    validateWithAI,
  };

  return (
    <PM33UXContext.Provider value={contextValue}>
      {children}
    </PM33UXContext.Provider>
  );
};