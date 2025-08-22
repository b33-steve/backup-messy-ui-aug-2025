// lib/navigation/workflow-state-manager.ts
// Central workflow state management for PM33's contextual navigation system
// WHY: Enables intelligent navigation that adapts to user's current strategic context and ICP persona
// RELEVANT FILES: WorkflowNavigator.tsx, ProgressiveOnboarding.tsx, command-center/page.tsx

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * PM33 Workflow States based on strategic PM patterns
 * Each state determines what navigation options and features are relevant
 */
export type WorkflowState = 
  | 'planning'      // Strategic Brief, Roadmap, Resources, What-If
  | 'executing'     // Sprint Board, Blockers, Team Pulse, Quick Wins
  | 'reviewing'     // Metrics, Retro Prep, Insights, Next Sprint
  | 'firefighting'; // Crisis Mode, Impact Analysis, Stakeholder Comms, Recovery Plan

/**
 * User persona types based on PM33_PRODUCT_REQUIREMENTS_DOCUMENT.md
 * Determines onboarding flow and feature prioritization
 */
export type UserPersona = 
  | 'senior_pm'     // Senior PM at Scale-Up (5-12 years experience)
  | 'vp_product'    // VP Product/Enterprise Leader (8-15+ years)
  | 'founder';      // Early-Stage Founder/CPO (2-10 years)

/**
 * Onboarding completion status tracking
 * Progressive disclosure of features based on user mastery
 */
export type OnboardingStage =
  | 'persona_selection'    // Choose ICP path
  | 'strategic_setup'      // Configure strategic context
  | 'tool_connection'      // Connect PM tools (Jira, Linear, etc.)
  | 'first_analysis'       // Complete first strategic analysis
  | 'workflow_discovery'   // Learn workflow navigation
  | 'power_user'          // Full feature access unlocked
  | 'completed';          // Onboarding fully completed

/**
 * Navigation context for intelligent breadcrumbs and suggestions
 */
export interface NavigationContext {
  currentProject?: string;
  activeIntegration?: 'jira' | 'linear' | 'monday' | 'asana';
  lastStrategicAnalysis?: {
    id: string;
    framework: 'ICE' | 'RICE' | 'Porter' | 'Blue_Ocean';
    confidence: number;
    timestamp: Date;
  };
  urgentTasks?: number;
  teamPulseScore?: number;
}

/**
 * User engagement tracking for dopamine-driven UX
 * Based on "Quick Wins" pattern from PM33 system
 */
export interface EngagementMetrics {
  currentStreak: number;          // Days of consecutive usage
  totalAnalyses: number;          // Strategic analyses completed
  successfulSyncs: number;        // PM tool syncs completed
  powerUserActions: number;       // Keyboard shortcuts used
  lastEngagement: Date;
  weeklyGoal: number;            // Strategic analyses per week
}

/**
 * Command palette state for power user workflows
 * Cmd+K global command interface
 */
export interface CommandPaletteState {
  isOpen: boolean;
  searchQuery: string;
  recentCommands: string[];
  quickActions: Array<{
    id: string;
    label: string;
    shortcut?: string;
    category: 'strategic' | 'workflow' | 'tools' | 'navigation';
  }>;
}

/**
 * Main workflow state interface
 * Central source of truth for all navigation and UX decisions
 */
interface WorkflowStateManager {
  // Core workflow state
  currentWorkflow: WorkflowState;
  userPersona: UserPersona | null;
  onboardingStage: OnboardingStage;
  
  // Navigation context
  navigationContext: NavigationContext;
  breadcrumbs: Array<{ label: string; path: string; context?: string }>;
  
  // User engagement
  engagementMetrics: EngagementMetrics;
  
  // Command palette
  commandPalette: CommandPaletteState;
  
  // UI state
  sidebarCollapsed: boolean;
  notificationCount: number;
  criticalAlertsCount: number;
  
  // Actions for workflow transitions
  setWorkflowState: (state: WorkflowState) => void;
  setUserPersona: (persona: UserPersona) => void;
  advanceOnboarding: (stage: OnboardingStage) => void;
  updateNavigationContext: (context: Partial<NavigationContext>) => void;
  addBreadcrumb: (label: string, path: string, context?: string) => void;
  clearBreadcrumbs: () => void;
  
  // Engagement actions
  recordStrategicAnalysis: () => void;
  recordSuccessfulSync: () => void;
  recordPowerUserAction: () => void;
  updateStreak: () => void;
  
  // Command palette actions
  toggleCommandPalette: () => void;
  setCommandPaletteSearch: (query: string) => void;
  addRecentCommand: (command: string) => void;
  
  // UI actions
  toggleSidebar: () => void;
  clearNotifications: () => void;
  addCriticalAlert: () => void;
  
  // Smart navigation suggestions
  getContextualSuggestions: () => Array<{ label: string; path: string; reason: string }>;
  shouldShowFirefightingMode: () => boolean;
  getRelevantQuickActions: () => Array<{ label: string; action: () => void }>;
}

/**
 * Initial state based on new user experience
 * Optimized for immediate value delivery per PM33 philosophy
 */
const initialState = {
  currentWorkflow: 'planning' as WorkflowState,
  userPersona: null,
  onboardingStage: 'persona_selection' as OnboardingStage,
  
  navigationContext: {},
  breadcrumbs: [],
  
  engagementMetrics: {
    currentStreak: 0,
    totalAnalyses: 0,
    successfulSyncs: 0,
    powerUserActions: 0,
    lastEngagement: new Date(),
    weeklyGoal: 5, // Default: 5 strategic analyses per week
  },
  
  commandPalette: {
    isOpen: false,
    searchQuery: '',
    recentCommands: [],
    quickActions: [
      { id: 'new-analysis', label: 'New Strategic Analysis', shortcut: 'Cmd+N', category: 'strategic' as const },
      { id: 'sync-jira', label: 'Sync with Jira', shortcut: 'Cmd+J', category: 'tools' as const },
      { id: 'command-center', label: 'Command Center', shortcut: 'Cmd+H', category: 'navigation' as const },
      { id: 'what-if', label: 'What-If Analysis', shortcut: 'Cmd+W', category: 'strategic' as const },
    ]
  },
  
  sidebarCollapsed: false,
  notificationCount: 0,
  criticalAlertsCount: 0,
};

/**
 * Zustand store with persistence for workflow state
 * Maintains user context across sessions for continuity
 */
export const useWorkflowState = create<WorkflowStateManager>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Workflow state transitions
      setWorkflowState: (state: WorkflowState) => {
        set({ currentWorkflow: state });
        
        // Auto-update navigation context based on workflow
        const context: Partial<NavigationContext> = {};
        if (state === 'firefighting') {
          context.urgentTasks = get().navigationContext.urgentTasks || 0;
        }
        
        get().updateNavigationContext(context);
      },
      
      setUserPersona: (persona: UserPersona) => {
        set({ userPersona: persona });
        
        // Customize onboarding based on persona
        const nextStage: OnboardingStage = 
          persona === 'founder' ? 'strategic_setup' :
          persona === 'vp_product' ? 'tool_connection' :
          'strategic_setup'; // senior_pm default
          
        get().advanceOnboarding(nextStage);
      },
      
      advanceOnboarding: (stage: OnboardingStage) => {
        set({ onboardingStage: stage });
        
        // Update engagement metrics for onboarding progress
        if (stage === 'completed') {
          get().recordPowerUserAction();
        }
      },
      
      // Navigation context management
      updateNavigationContext: (context: Partial<NavigationContext>) => {
        set(state => ({
          navigationContext: { ...state.navigationContext, ...context }
        }));
      },
      
      addBreadcrumb: (label: string, path: string, context?: string) => {
        set(state => {
          const newBreadcrumb = { label, path, context };
          const breadcrumbs = [...state.breadcrumbs, newBreadcrumb];
          
          // Keep only last 5 breadcrumbs for clean UI
          return { breadcrumbs: breadcrumbs.slice(-5) };
        });
      },
      
      clearBreadcrumbs: () => set({ breadcrumbs: [] }),
      
      // Engagement tracking for dopamine-driven UX
      recordStrategicAnalysis: () => {
        set(state => ({
          engagementMetrics: {
            ...state.engagementMetrics,
            totalAnalyses: state.engagementMetrics.totalAnalyses + 1,
            lastEngagement: new Date(),
          }
        }));
        get().updateStreak();
      },
      
      recordSuccessfulSync: () => {
        set(state => ({
          engagementMetrics: {
            ...state.engagementMetrics,
            successfulSyncs: state.engagementMetrics.successfulSyncs + 1,
            lastEngagement: new Date(),
          }
        }));
      },
      
      recordPowerUserAction: () => {
        set(state => ({
          engagementMetrics: {
            ...state.engagementMetrics,
            powerUserActions: state.engagementMetrics.powerUserActions + 1,
            lastEngagement: new Date(),
          }
        }));
      },
      
      updateStreak: () => {
        const now = new Date();
        const lastEngagement = get().engagementMetrics.lastEngagement;
        const timeDiff = now.getTime() - lastEngagement.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        set(state => ({
          engagementMetrics: {
            ...state.engagementMetrics,
            currentStreak: daysDiff <= 1 ? state.engagementMetrics.currentStreak + 1 : 1,
            lastEngagement: now,
          }
        }));
      },
      
      // Command palette management
      toggleCommandPalette: () => {
        set(state => ({
          commandPalette: {
            ...state.commandPalette,
            isOpen: !state.commandPalette.isOpen,
            searchQuery: '', // Reset search when toggling
          }
        }));
        
        if (get().commandPalette.isOpen) {
          get().recordPowerUserAction();
        }
      },
      
      setCommandPaletteSearch: (query: string) => {
        set(state => ({
          commandPalette: {
            ...state.commandPalette,
            searchQuery: query,
          }
        }));
      },
      
      addRecentCommand: (command: string) => {
        set(state => {
          const recentCommands = [command, ...state.commandPalette.recentCommands]
            .slice(0, 10); // Keep only 10 most recent
            
          return {
            commandPalette: {
              ...state.commandPalette,
              recentCommands,
            }
          };
        });
      },
      
      // UI state management
      toggleSidebar: () => {
        set(state => ({ sidebarCollapsed: !state.sidebarCollapsed }));
        get().recordPowerUserAction();
      },
      
      clearNotifications: () => set({ notificationCount: 0 }),
      
      addCriticalAlert: () => {
        set(state => ({ criticalAlertsCount: state.criticalAlertsCount + 1 }));
      },
      
      // Smart navigation intelligence
      getContextualSuggestions: () => {
        const state = get();
        const suggestions: Array<{ label: string; path: string; reason: string }> = [];
        
        // Workflow-based suggestions
        switch (state.currentWorkflow) {
          case 'planning':
            suggestions.push(
              { label: 'Strategic Analysis', path: '/strategic-intelligence', reason: 'Start with strategic context' },
              { label: 'Resource Planning', path: '/data', reason: 'Plan resource allocation' }
            );
            break;
            
          case 'executing':
            suggestions.push(
              { label: 'Sprint Dashboard', path: '/tasks', reason: 'Monitor execution progress' },
              { label: 'Team Pulse', path: '/dashboard', reason: 'Check team health' }
            );
            break;
            
          case 'reviewing':
            suggestions.push(
              { label: 'Performance Metrics', path: '/data', reason: 'Review outcome data' },
              { label: 'Strategic Insights', path: '/intelligence', reason: 'Extract learnings' }
            );
            break;
            
          case 'firefighting':
            suggestions.push(
              { label: 'Impact Analysis', path: '/strategic-intelligence', reason: 'Assess crisis impact' },
              { label: 'Command Center', path: '/command-center', reason: 'Coordinate response' }
            );
            break;
        }
        
        // Persona-based suggestions
        if (state.userPersona === 'vp_product') {
          suggestions.push(
            { label: 'Executive Dashboard', path: '/dashboard', reason: 'Strategic overview' }
          );
        } else if (state.userPersona === 'founder') {
          suggestions.push(
            { label: 'Quick Analysis', path: '/chat', reason: 'Fast strategic decisions' }
          );
        }
        
        return suggestions.slice(0, 3); // Return top 3 suggestions
      },
      
      shouldShowFirefightingMode: () => {
        const state = get();
        return (
          state.criticalAlertsCount > 0 ||
          (state.navigationContext.urgentTasks || 0) > 5 ||
          (state.navigationContext.teamPulseScore || 100) < 60
        );
      },
      
      getRelevantQuickActions: () => {
        const state = get();
        const actions: Array<{ label: string; action: () => void }> = [];
        
        // Always available core actions
        actions.push(
          { 
            label: 'New Strategic Analysis', 
            action: () => window.location.href = '/strategic-intelligence'
          },
          { 
            label: 'Command Center', 
            action: () => window.location.href = '/command-center'
          }
        );
        
        // Workflow-specific actions
        if (state.currentWorkflow === 'firefighting') {
          actions.push({
            label: 'Crisis Response Plan',
            action: () => window.location.href = '/strategic-intelligence?mode=crisis'
          });
        }
        
        // Integration-specific actions
        if (state.navigationContext.activeIntegration) {
          actions.push({
            label: `Sync ${state.navigationContext.activeIntegration}`,
            action: () => console.log(`Syncing ${state.navigationContext.activeIntegration}`)
          });
        }
        
        return actions;
      },
    }),
    {
      name: 'pm33-workflow-state',
      storage: createJSONStorage(() => localStorage),
      
      // Only persist certain parts of the state
      partialize: (state) => ({
        userPersona: state.userPersona,
        onboardingStage: state.onboardingStage,
        engagementMetrics: state.engagementMetrics,
        sidebarCollapsed: state.sidebarCollapsed,
        commandPalette: {
          ...state.commandPalette,
          isOpen: false, // Don't persist open state
          searchQuery: '', // Don't persist search
        }
      }),
    }
  )
);

/**
 * Hook for keyboard shortcuts integration
 * Enables power user workflows with global shortcuts
 */
export const useKeyboardShortcuts = () => {
  const toggleCommandPalette = useWorkflowState(state => state.toggleCommandPalette);
  const recordPowerUserAction = useWorkflowState(state => state.recordPowerUserAction);
  
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Command palette (Cmd+K or Ctrl+K)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        toggleCommandPalette();
      }
      
      // Quick navigation shortcuts
      if ((event.metaKey || event.ctrlKey) && !event.shiftKey) {
        switch (event.key) {
          case 'h':
            event.preventDefault();
            window.location.href = '/command-center';
            recordPowerUserAction();
            break;
          case 'n':
            event.preventDefault();
            window.location.href = '/strategic-intelligence';
            recordPowerUserAction();
            break;
          case 'j':
            event.preventDefault();
            // Trigger Jira sync
            recordPowerUserAction();
            break;
          case 'w':
            event.preventDefault();
            window.location.href = '/strategic-intelligence?mode=what-if';
            recordPowerUserAction();
            break;
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleCommandPalette, recordPowerUserAction]);
};

// React import for useEffect in keyboard shortcuts
import React from 'react';