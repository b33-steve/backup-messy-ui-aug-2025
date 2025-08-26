/**
 * File: /app/frontend/app/(app)/command-center/page.tsx
 * Purpose: Central hub for PM33 strategic intelligence - production command center with intelligent navigation
 * Why: Single source of truth for strategic context, workflow coordination, and intelligent action prioritization
 * Relevant Files: components/navigation/WorkflowNavigator.tsx, lib/navigation/workflow-state-manager.ts, components/onboarding/ProgressiveOnboarding.tsx
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Brain, 
  Target, 
  BarChart3, 
  Zap, 
  TrendingUp,
  Users,
  Calendar,
  Clock,
  Check,
  AlertTriangle,
  Flame,
  RefreshCw,
  Plus,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Rocket,
  Trophy,
  Activity,
  Command,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useWorkflowState, useKeyboardShortcuts } from '@/lib/navigation/workflow-state-manager';

// =====================================
// TYPE DEFINITIONS
// =====================================

type WorkflowState = 'planning' | 'executing' | 'reviewing' | 'firefighting';
type UserPersona = 'senior_pm' | 'vp_product' | 'founder';

interface StrategicIntelligenceCard {
  id: string;
  type: 'analysis' | 'action' | 'insight' | 'alert';
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  workflow: WorkflowState;
  confidence?: number;
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

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  path: string;
  shortcut?: string;
  personas: UserPersona[];
  estimatedTime: string;
  valueDelivered: string;
}

// =====================================
// MAIN COMMAND CENTER COMPONENT
// =====================================

const CommandCenterPage: React.FC = () => {
  const router = useRouter();
  
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
    shouldShowFirefightingMode,
    sidebarCollapsed,
    toggleCommandPalette
  } = useWorkflowState();
  
  // Initialize keyboard shortcuts
  useKeyboardShortcuts();
  
  // Local state for dashboard data
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [strategicCards, setStrategicCards] = useState<StrategicIntelligenceCard[]>([]);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  
  // Initialize command center data and context
  useEffect(() => {
    // Determine time of day for contextual greetings
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 18) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
    
    // Add breadcrumb for navigation context
    addBreadcrumb('Command Center', '/command-center', 'Strategic intelligence hub');
    
    // Update navigation context
    updateNavigationContext({
      currentProject: 'Strategic Overview',
      urgentTasks: shouldShowFirefightingMode() ? 5 : 2,
      teamPulseScore: currentWorkflow === 'firefighting' ? 45 : 85
    });
    
    // Load strategic intelligence cards based on context
    loadStrategicIntelligence();
  }, [userPersona, currentWorkflow]);
  
  // Load contextual strategic intelligence based on user persona and workflow state
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
  
  // Get contextual greeting based on time of day and workflow
  const getContextualGreeting = () => {
    const personaName = {
      'founder': 'Founder',
      'vp_product': 'Product Leader', 
      'senior_pm': 'Product Manager'
    }[userPersona || 'senior_pm'];
    
    const timeGreeting = {
      'morning': 'Good morning',
      'afternoon': 'Good afternoon',
      'evening': 'Good evening'
    }[timeOfDay];
    
    if (currentWorkflow === 'firefighting') {
      return `Crisis mode active. Here's your strategic intelligence to resolve critical issues.`;
    }
    
    return `${timeGreeting}! Here's your strategic intelligence for today.`;
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
        icon: Brain,
        color: 'hsl(var(--primary))',
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
        icon: BarChart3,
        color: 'hsl(var(--chart-1))',
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
        icon: Target,
        color: 'hsl(var(--chart-2))',
        path: '/chat',
        personas: ['founder'],
        estimatedTime: '5 min',
        valueDelivered: 'Quick strategic guidance'
      },
      {
        id: 'sync-tools',
        title: 'Sync PM Tools',
        description: 'Update strategic context from Jira, Linear, etc.',
        icon: RefreshCw,
        color: 'hsl(var(--chart-3))',
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
  
  // Render strategic intelligence card with contextual information using shadcn/ui
  const renderStrategicCard = (card: StrategicIntelligenceCard) => {
    const priorityColors = {
      critical: 'border-red-200 bg-red-50',
      high: 'border-orange-200 bg-orange-50',
      medium: 'border-blue-200 bg-blue-50',
      low: 'border-gray-200 bg-gray-50'
    };
    
    const priorityBadgeColors = {
      critical: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-blue-100 text-blue-800',
      low: 'bg-gray-100 text-gray-800'
    };
    
    const typeIcons = {
      analysis: <Brain className="w-5 h-5" />,
      action: <Zap className="w-5 h-5" />,
      insight: <TrendingUp className="w-5 h-5" />,
      alert: <AlertTriangle className="w-5 h-5" />
    };
    
    return (
      <motion.div
        key={card.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className={cn("pm33-glass-card cursor-pointer transition-all", priorityColors[card.priority])}
              onClick={() => router.push(card.actionUrl)}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                  {typeIcons[card.type]}
                </div>
                <div>
                  <h3 className="font-semibold text-pm33-text-primary mb-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.timeAgo}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge className={cn("text-xs", priorityBadgeColors[card.priority])}>
                  {card.priority}
                </Badge>
                {card.confidence && (
                  <Badge className="text-xs bg-green-100 text-green-800">
                    {card.confidence}% confident
                  </Badge>
                )}
              </div>
            </div>
            
            <p className="text-sm text-pm33-text-secondary leading-relaxed mb-4">
              {card.description}
            </p>
            
            {card.metadata && (
              <div className="flex flex-wrap gap-4 mb-4 text-xs text-muted-foreground">
                {card.metadata.framework && (
                  <span>
                    <strong>Framework:</strong> {card.metadata.framework}
                  </span>
                )}
                {card.metadata.impactScore && (
                  <span>
                    <strong>Impact:</strong> {card.metadata.impactScore}/10
                  </span>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              {card.metadata?.stakeholders && (
                <div className="flex flex-wrap gap-1">
                  {card.metadata.stakeholders.slice(0, 3).map((stakeholder, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {stakeholder}
                    </Badge>
                  ))}
                </div>
              )}
              
              <Button 
                size="sm" 
                variant="outline"
                className="ml-auto flex items-center gap-2"
              >
                {card.actionText}
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };
  
  // Render quick action card with persona optimization using shadcn/ui
  const renderQuickAction = (action: QuickAction) => {
    const IconComponent = action.icon;
    
    return (
      <motion.div
        key={action.id}
        whileHover={{ scale: 1.05, y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <Card 
          className="pm33-glass-card cursor-pointer transition-all hover:border-pm33-primary/30"
          onClick={() => router.push(action.path)}
        >
          <CardContent className="p-6 text-center space-y-4">
            <div 
              className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center text-white"
              style={{ background: action.color }}
            >
              <IconComponent className="w-7 h-7" />
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-pm33-text-primary">
                {action.title}
              </h4>
              {action.shortcut && (
                <Badge variant="outline" className="text-xs mb-2">
                  {action.shortcut}
                </Badge>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {action.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between w-full text-xs pt-2">
              <span className="text-muted-foreground">
                {action.estimatedTime}
              </span>
              <span 
                className="font-medium"
                style={{ color: action.color }}
              >
                {action.valueDelivered}
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };
  
  // Render engagement metrics for dopamine-driven UX using shadcn/ui
  const renderEngagementMetrics = () => (
    <Card className="pm33-glass-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Strategic Intelligence Progress</CardTitle>
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            {engagementMetrics.currentStreak} day streak
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-pm33-brand">
              {engagementMetrics.totalAnalyses}
            </div>
            <div className="text-xs text-muted-foreground">
              Analyses Complete
            </div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-green-600">
              {engagementMetrics.successfulSyncs}
            </div>
            <div className="text-xs text-muted-foreground">
              Successful Syncs
            </div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {engagementMetrics.powerUserActions}
            </div>
            <div className="text-xs text-muted-foreground">
              Power User Actions
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Weekly Goal</span>
            <span className="text-muted-foreground">
              {engagementMetrics.totalAnalyses} / {engagementMetrics.weeklyGoal}
            </span>
          </div>
          <Progress 
            value={(engagementMetrics.totalAnalyses / engagementMetrics.weeklyGoal) * 100}
            className="w-full h-2"
          />
        </div>
      </CardContent>
    </Card>
  );
  


  // Main render with updated shadcn/ui components
  return (
    <div className="flex min-h-screen bg-background">
      
      {/* Main Command Center Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        sidebarCollapsed ? "ml-16" : "ml-80"
      )}>
        <div className="container max-w-7xl mx-auto py-8 px-6">
          {/* Contextual Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-pm33-text-primary mb-2">
                Command Center
              </h1>
              <p className="text-lg text-muted-foreground">
                {getContextualGreeting()}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                onClick={toggleCommandPalette}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Command className="w-4 h-4" />
                <span className="hidden sm:inline">Command</span>
                <Badge variant="secondary" className="text-xs">⌘K</Badge>
              </Button>
              
              <Button 
                onClick={() => router.push('/strategic-intelligence')}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                New Analysis
              </Button>
              
              {shouldShowFirefightingMode() && (
                <Button 
                  variant="destructive"
                  onClick={() => setWorkflowState('firefighting')}
                  className="flex items-center gap-2"
                >
                  <Flame className="w-4 h-4" />
                  Crisis Mode
                </Button>
              )}
            </div>
          </motion.div>
          
          {/* Crisis Mode Alert */}
          <AnimatePresence>
            {currentWorkflow === 'firefighting' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-6"
              >
                <Alert className="border-red-200 bg-red-50">
                  <Flame className="w-4 h-4 text-red-600" />
                  <AlertTitle className="text-red-800">Crisis Response Mode Active</AlertTitle>
                  <AlertDescription className="text-red-700">
                    Prioritizing critical issues and urgent strategic responses. 
                    Non-essential features temporarily hidden for focus.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Strategic Intelligence Cards - Main Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Strategic Intelligence</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={loadStrategicIntelligence}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
                  Refresh
                </Button>
              </div>
              
              <div className="space-y-4">
                {loading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-32 w-full rounded-lg" />
                  ))
                ) : strategicCards.length > 0 ? (
                  strategicCards.map(renderStrategicCard)
                ) : (
                  <Card className="pm33-glass-card">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                      <Target className="w-12 h-12 text-muted-foreground" />
                      <h3 className="text-lg font-semibold text-muted-foreground">
                        No Strategic Intelligence Available
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Connect your PM tools or run your first strategic analysis to see intelligent recommendations
                      </p>
                      <Button 
                        onClick={() => router.push('/strategic-intelligence')}
                        className="flex items-center gap-2"
                      >
                        <Brain className="w-4 h-4" />
                        Run Strategic Analysis
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>
            
            {/* Sidebar - Quick Actions and Metrics */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {getQuickActions().map(renderQuickAction)}
                </div>
              </div>
              
              {/* Engagement Metrics */}
              {renderEngagementMetrics()}
              
              {/* Recent Activity */}
              <Card className="pm33-glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Strategic Analysis Completed</p>
                      <p className="text-xs text-muted-foreground">Q4 Feature Prioritization • 2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Jira Sync Successful</p>
                      <p className="text-xs text-muted-foreground">47 strategic tasks updated • 4 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Weekly Goal Achieved</p>
                      <p className="text-xs text-muted-foreground">5 strategic analyses completed • 1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommandCenterPage;