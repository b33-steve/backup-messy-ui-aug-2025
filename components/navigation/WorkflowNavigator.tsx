/**
 * File: /app/frontend/components/navigation/WorkflowNavigator.tsx
 * Purpose: Contextual navigation that adapts based on user's current workflow state and ICP path
 * Why: Reduces cognitive load by showing only relevant navigation options based on strategic context
 * Relevant Files: lib/navigation/workflow-state-manager.ts, components/onboarding/ProgressiveOnboarding.tsx, app/command-center/page.tsx
 */

'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Target, 
  AlertTriangle, 
  Command,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Activity,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  Flame,
  Home,
  CheckSquare,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useWorkflowState, useKeyboardShortcuts } from '@/lib/navigation/workflow-state-manager';

// =====================================
// TYPE DEFINITIONS
// =====================================

type WorkflowState = 'planning' | 'executing' | 'reviewing' | 'firefighting';
type UserPersona = 'senior_pm' | 'vp_product' | 'founder';

interface NavigationItem {
  key: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  badge?: {
    text: string;
    variant: 'default' | 'destructive' | 'outline' | 'secondary';
    urgent?: boolean;
  };
  workflows: WorkflowState[];
  personas?: UserPersona[];
  description: string;
  priority: number;
}

// =====================================
// WORKFLOW STATE CONFIGURATIONS
// =====================================

const workflowConfigs = {
  planning: {
    label: 'Strategic Planning',
    icon: Target,
    color: 'bg-blue-500',
    description: 'Define strategy and allocate resources',
    primaryActions: [
      { label: 'Strategic Brief', path: '/strategic-intelligence', icon: Brain },
      { label: 'Visual Roadmap', path: '/roadmap', icon: BarChart3 },
      { label: 'Resource Planning', path: '/data', icon: Activity },
      { label: 'What-If Analysis', path: '/strategic-intelligence?mode=what-if', icon: Sparkles }
    ]
  },
  executing: {
    label: 'Execution Mode',
    icon: Zap,
    color: 'bg-green-500',
    description: 'Drive execution and remove blockers',
    primaryActions: [
      { label: 'Sprint Board', path: '/tasks', icon: Target },
      { label: 'Clear Blockers', path: '/tasks?view=blockers', icon: AlertTriangle },
      { label: 'Team Pulse', path: '/dashboard', icon: Users },
      { label: 'Quick Wins', path: '/tasks?view=quick-wins', icon: Sparkles }
    ]
  },
  reviewing: {
    label: 'Strategic Review',
    icon: BarChart3,
    color: 'bg-purple-500',
    description: 'Analyze performance and extract insights',
    primaryActions: [
      { label: 'Performance Metrics', path: '/data', icon: BarChart3 },
      { label: 'Retrospective Prep', path: '/intelligence?mode=retro', icon: Brain },
      { label: 'Strategic Insights', path: '/intelligence', icon: Sparkles },
      { label: 'Next Sprint Planning', path: '/strategic-intelligence?mode=planning', icon: Target }
    ]
  },
  firefighting: {
    label: 'Crisis Response',
    icon: Flame,
    color: 'bg-red-500',
    description: 'Address critical issues immediately',
    primaryActions: [
      { label: 'Crisis Command Center', path: '/command-center?mode=crisis', icon: AlertTriangle },
      { label: 'Impact Analysis', path: '/strategic-intelligence?mode=crisis', icon: Brain },
      { label: 'Stakeholder Comms', path: '/communications', icon: Users },
      { label: 'Recovery Planning', path: '/strategic-intelligence?mode=recovery', icon: Target }
    ]
  }
};

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    key: 'command-center',
    label: 'Command Center',
    path: '/command-center',
    icon: Home,
    shortcut: 'Cmd+H',
    workflows: ['planning', 'executing', 'reviewing', 'firefighting'],
    description: 'Central hub for strategic intelligence and workflow coordination',
    priority: 1
  },
  {
    key: 'strategic-intelligence',
    label: 'Strategic Analysis',
    path: '/strategic-intelligence',
    icon: Brain,
    shortcut: 'Cmd+N',
    workflows: ['planning', 'firefighting'],
    personas: ['senior_pm', 'vp_product', 'founder'],
    description: 'AI-powered strategic decision intelligence and framework analysis',
    priority: 2
  },
  {
    key: 'chat',
    label: 'Strategic Chat',
    path: '/chat',
    icon: Target,
    workflows: ['planning', 'firefighting'],
    personas: ['founder'],
    description: 'Quick strategic questions and immediate AI guidance',
    priority: 3
  },
  {
    key: 'data',
    label: 'Resource Planning',
    path: '/data',
    icon: BarChart3,
    workflows: ['planning', 'reviewing'],
    personas: ['vp_product', 'senior_pm'],
    description: 'Data-driven resource allocation and performance analytics',
    priority: 4
  },
  {
    key: 'tasks',
    label: 'Sprint Execution',
    path: '/tasks',
    icon: CheckSquare,
    workflows: ['executing'],
    personas: ['senior_pm'],
    description: 'Task management with strategic context preservation',
    priority: 5
  },
  {
    key: 'dashboard',
    label: 'Team Pulse',
    path: '/dashboard',
    icon: Activity,
    workflows: ['executing', 'reviewing'],
    personas: ['vp_product', 'senior_pm'],
    description: 'Real-time team health and project status overview',
    priority: 6
  },
  {
    key: 'intelligence',
    label: 'Strategic Insights',
    path: '/intelligence',
    icon: TrendingUp,
    workflows: ['reviewing'],
    personas: ['vp_product'],
    description: 'Performance insights and strategic learning extraction',
    priority: 7
  },
  {
    key: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: Settings,
    workflows: ['planning', 'executing', 'reviewing', 'firefighting'],
    description: 'Account settings and integration management',
    priority: 10
  }
];

// =====================================
// MAIN WORKFLOW NAVIGATOR COMPONENT
// =====================================

export interface WorkflowNavigatorProps {
  className?: string;
}

export const WorkflowNavigator: React.FC<WorkflowNavigatorProps> = ({ className }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const [showContextMenu, setShowContextMenu] = useState(false);

  // Workflow state management
  const {
    currentWorkflow,
    userPersona,
    onboardingStage,
    sidebarCollapsed,
    engagementMetrics,
    navigationContext,
    breadcrumbs,
    setWorkflowState,
    toggleSidebar,
    getContextualSuggestions,
    shouldShowFirefightingMode,
    recordPowerUserAction
  } = useWorkflowState();

  // Keyboard shortcuts integration
  useKeyboardShortcuts();

  // Auto-switch to firefighting mode when critical issues detected
  useEffect(() => {
    if (shouldShowFirefightingMode() && currentWorkflow !== 'firefighting') {
      setWorkflowState('firefighting');
    }
  }, [shouldShowFirefightingMode, currentWorkflow, setWorkflowState]);

  const currentConfig = workflowConfigs[currentWorkflow];
  const suggestions = getContextualSuggestions();
  
  // =====================================
  // NAVIGATION HANDLERS
  // =====================================

  const handleNavigate = (path: string, label: string) => {
    router.push(path);
    recordPowerUserAction();
    
    // Analytics for navigation tracking
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('workflow_navigation', {
        from_workflow: currentWorkflow,
        to_path: path,
        action_label: label,
        user_persona: userPersona
      });
    }
  };

  const handleWorkflowSwitch = (newWorkflow: string) => {
    setWorkflowState(newWorkflow as any);
    setShowContextMenu(false);
    recordPowerUserAction();
  };

  const getContextualNavigation = (): NavigationItem[] => {
    let relevantItems = NAVIGATION_ITEMS.filter(item => {
      if (item.workflows.includes(currentWorkflow)) return true;
      if (item.key === 'command-center' || item.key === 'settings') return true;
      if (userPersona && item.personas?.includes(userPersona)) return true;
      return false;
    });
    
    if (userPersona) {
      relevantItems = relevantItems.sort((a, b) => {
        const aHasPersona = a.personas?.includes(userPersona);
        const bHasPersona = b.personas?.includes(userPersona);
        
        if (aHasPersona && !bHasPersona) return -1;
        if (!aHasPersona && bHasPersona) return 1;
        
        return a.priority - b.priority;
      });
    }
    
    return relevantItems.slice(0, sidebarCollapsed ? 5 : 8);
  };
  
  const getItemBadge = (item: NavigationItem) => {
    switch (item.key) {
      case 'tasks':
        if (navigationContext?.urgentTasks && navigationContext.urgentTasks > 0) {
          return { 
            text: navigationContext.urgentTasks.toString(), 
            variant: 'destructive' as const, 
            urgent: true 
          };
        }
        break;
      case 'dashboard':
        if (navigationContext?.teamPulseScore && navigationContext.teamPulseScore < 70) {
          return { 
            text: 'Low', 
            variant: 'secondary' as const, 
            urgent: true 
          };
        }
        break;
      case 'strategic-intelligence':
        if (navigationContext?.lastStrategicAnalysis) {
          const hoursAgo = Math.floor(
            (new Date().getTime() - new Date(navigationContext.lastStrategicAnalysis.timestamp).getTime()) / (1000 * 3600)
          );
          if (hoursAgo > 24) {
            return { 
              text: 'Stale', 
              variant: 'outline' as const
            };
          }
        }
        break;
    }
    return item.badge;
  };
  
  // =====================================
  // BREADCRUMBS COMPONENT
  // =====================================

  const StrategicBreadcrumbs = () => {
    if (breadcrumbs.length === 0) return null;
    
    return (
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
        <span className="text-pm33-primary font-medium">PM33</span>
        <span>/</span>
        <span className={cn("px-2 py-1 rounded-md text-xs font-medium", currentConfig.color, "text-white")}>
          {currentConfig.label}
        </span>
        {breadcrumbs.length > 0 && (
          <>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <span>/</span>
                <button
                  onClick={() => handleNavigate(crumb.path, crumb.label)}
                  className="hover:text-pm33-primary transition-colors cursor-pointer"
                >
                  {crumb.label}
                  {crumb.context && (
                    <span className="ml-1 text-xs opacity-70">({crumb.context})</span>
                  )}
                </button>
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    );
  };
  
  /**
   * Render workflow status indicator
   * Visual feedback on current strategic phase
   */
  const renderWorkflowStatus = () => {
    const workflowConfig = {
      planning: { color: 'blue', icon: <Target size={16} />, label: 'Planning Phase' },
      executing: { color: 'green', icon: <Zap size={16} />, label: 'Execution Mode' },
      reviewing: { color: 'purple', icon: <Brain size={16} />, label: 'Review & Analysis' },
      firefighting: { color: 'red', icon: <AlertTriangle size={16} />, label: 'Crisis Response' }
    };
    
    const config = workflowConfig[currentWorkflow];
    
    return (
      <div className={cn("mb-4", sidebarCollapsed ? "px-3" : "px-4")}>
        <Badge 
          variant="secondary"
          className={cn(
            "text-xs font-medium",
            !sidebarCollapsed && "w-full justify-start"
          )}
        >
          {!sidebarCollapsed && config.label}
        </Badge>
        
        {shouldShowFirefightingMode() && currentWorkflow !== 'firefighting' && (
          <div
            className="mt-2 p-2 bg-red-50 border border-red-200 rounded cursor-pointer hover:bg-red-100"
            onClick={() => router.push('/command-center?mode=firefighting')}
          >
            <div className="flex items-center space-x-2">
              <AlertTriangle size={16} className="text-red-500" />
              {!sidebarCollapsed && (
                <div>
                  <div className="text-sm font-medium text-red-700">Crisis Mode Available</div>
                  <div className="text-xs text-red-600">Critical issues detected. Switch to crisis response?</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  /**
   * Command palette integration
   * Quick access to all navigation and actions
   */
  const renderCommandPalette = () => (
    <div className="hidden">
      {/* Command palette functionality disabled for build */}
    </div>
  );
  
  // Main render with updated shadcn/ui architecture
  if (!sidebarCollapsed) {
    return (
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={cn(
          "fixed left-0 top-0 h-full w-80 bg-background/95 backdrop-blur-sm border-r z-40",
          "flex flex-col p-6 overflow-y-auto",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pm33-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">PM33</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="hover:bg-accent"
          >
            <ChevronDown className="w-4 h-4 rotate-90" />
          </Button>
        </div>

        <StrategicBreadcrumbs />
        
        {/* Workflow Status */}
        {renderWorkflowStatus()}
        
        {/* Current Workflow Display */}
        <div className="mb-6">
          <div className="p-4 rounded-lg border">
            <div className="flex items-center space-x-3">
              <div className={cn("p-2 rounded-md", currentConfig.color)}>
                <currentConfig.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">
                  {currentConfig.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentConfig.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation items */}
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
            Navigation
          </h4>
          {getContextualNavigation().map((item) => {
            const isActive = pathname === item.path;
            const badge = getItemBadge(item);
            const Icon = item.icon;
            
            return (
              <motion.button
                key={item.key}
                onClick={() => handleNavigate(item.path, item.label)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg transition-all",
                  isActive 
                    ? "bg-pm33-primary text-white" 
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {badge && (
                  <Badge variant={badge.variant}>
                    {badge.text}
                  </Badge>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Quick actions at bottom */}
        <div className="mt-auto pt-4">
          <Separator className="mb-4" />
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => handleNavigate('/command-center', 'Command Center')}
            >
              <Command className="w-4 h-4 mr-2" />
              Command Center
              <Badge variant="secondary" className="ml-auto text-xs">⌘H</Badge>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => handleNavigate('/settings', 'Settings')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </motion.aside>
    );
  }

  // Collapsed sidebar
  return (
    <motion.aside
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      className={cn(
        "fixed left-0 top-0 h-full w-16 bg-background/95 backdrop-blur-sm border-r z-40",
        "flex flex-col items-center py-6 space-y-4",
        className
      )}
    >
      <button onClick={toggleSidebar} className="w-10 h-10 bg-pm33-primary rounded-lg flex items-center justify-center">
        <Brain className="w-6 h-6 text-white" />
      </button>

      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", currentConfig.color)}>
        <currentConfig.icon className="w-5 h-5 text-white" />
      </div>

      {currentConfig.primaryActions.slice(0, 4).map((action) => {
        const Icon = action.icon;
        const isActive = pathname === action.path;
        
        return (
          <button
            key={action.path}
            onClick={() => handleNavigate(action.path, action.label)}
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
              isActive 
                ? "bg-pm33-primary text-white" 
                : "hover:bg-accent"
            )}
            title={action.label}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </motion.aside>
  );
};

export default WorkflowNavigator;