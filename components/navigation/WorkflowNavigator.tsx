// components/navigation/WorkflowNavigator.tsx
// Contextual navigation system that adapts to user's current workflow state and reduces cognitive load
// WHY: Eliminates decision paralysis by showing only relevant navigation options for current strategic context
// RELEVANT FILES: workflow-state-manager.ts, ProgressiveOnboarding.tsx, command-center/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { 
  NavLink, 
  Tooltip, 
  ActionIcon, 
  Group, 
  Stack, 
  Text, 
  Badge, 
  Box, 
  Divider,
  Breadcrumbs,
  Anchor,
  Kbd,
  Alert
} from '@mantine/core';
import { Spotlight } from '@mantine/spotlight';
import { 
  IconTarget, 
  IconBrain, 
  IconDashboard, 
  IconChecklist, 
  IconChartLine, 
  IconUsers, 
  IconSettings, 
  IconCommand,
  IconSearch,
  IconHome,
  IconChevronRight,
  IconBolt,
  IconAlertTriangle,
  IconFlame,
  IconTrendingUp,
  IconCalendar,
  IconRefresh
} from '@tabler/icons-react';
import { useRouter, usePathname } from 'next/navigation';
import { useWorkflowState, WorkflowState, useKeyboardShortcuts } from '@/lib/navigation/workflow-state-manager';

/**
 * Navigation item interface with contextual metadata
 * Each item knows when it should be visible and prioritized
 */
interface NavigationItem {
  key: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  shortcut?: string;
  badge?: {
    text: string;
    color: string;
    urgent?: boolean;
  };
  workflows: WorkflowState[]; // Which workflows this item is relevant for
  personas?: ('senior_pm' | 'vp_product' | 'founder')[]; // Which personas prioritize this
  description: string; // For tooltips and command palette
  priority: number; // Display order priority (1 = highest)
}

/**
 * Workflow-specific navigation configuration
 * Intelligent routing based on strategic context
 */
const NAVIGATION_ITEMS: NavigationItem[] = [
  // Core Strategic Intelligence (always visible)
  {
    key: 'command-center',
    label: 'Command Center',
    path: '/command-center',
    icon: <IconHome size={20} />,
    shortcut: 'Cmd+H',
    workflows: ['planning', 'executing', 'reviewing', 'firefighting'],
    description: 'Central hub for strategic intelligence and workflow coordination',
    priority: 1
  },
  
  // Planning Workflow Items
  {
    key: 'strategic-intelligence',
    label: 'Strategic Analysis',
    path: '/strategic-intelligence',
    icon: <IconBrain size={20} />,
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
    icon: <IconTarget size={20} />,
    workflows: ['planning', 'firefighting'],
    personas: ['founder'],
    description: 'Quick strategic questions and immediate AI guidance',
    priority: 3
  },
  {
    key: 'data',
    label: 'Resource Planning',
    path: '/data',
    icon: <IconChartLine size={20} />,
    workflows: ['planning', 'reviewing'],
    personas: ['vp_product', 'senior_pm'],
    description: 'Data-driven resource allocation and performance analytics',
    priority: 4
  },
  
  // Executing Workflow Items
  {
    key: 'tasks',
    label: 'Sprint Execution',
    path: '/tasks',
    icon: <IconChecklist size={20} />,
    workflows: ['executing'],
    personas: ['senior_pm'],
    description: 'Task management with strategic context preservation',
    priority: 5
  },
  {
    key: 'dashboard',
    label: 'Team Pulse',
    path: '/dashboard',
    icon: <IconDashboard size={20} />,
    workflows: ['executing', 'reviewing'],
    personas: ['vp_product', 'senior_pm'],
    description: 'Real-time team health and project status overview',
    priority: 6
  },
  
  // Reviewing Workflow Items
  {
    key: 'intelligence',
    label: 'Strategic Insights',
    path: '/intelligence',
    icon: <IconTrendingUp size={20} />,
    workflows: ['reviewing'],
    personas: ['vp_product'],
    description: 'Performance insights and strategic learning extraction',
    priority: 7
  },
  
  // Settings (always available but lower priority)
  {
    key: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: <IconSettings size={20} />,
    workflows: ['planning', 'executing', 'reviewing', 'firefighting'],
    description: 'Account settings and integration management',
    priority: 10
  }
];

/**
 * Smart breadcrumb generation with strategic context
 * Shows user's navigation path with business context
 */
interface SmartBreadcrumb {
  label: string;
  path: string;
  context?: string; // Strategic context for the navigation decision
}

/**
 * Contextual Workflow Navigator Component
 * Adapts navigation based on user persona, workflow state, and current context
 */
interface WorkflowNavigatorProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const WorkflowNavigator: React.FC<WorkflowNavigatorProps> = ({
  collapsed = false,
  onToggleCollapse
}) => {
  // Workflow state management
  const { 
    currentWorkflow, 
    userPersona, 
    navigationContext,
    breadcrumbs,
    commandPalette,
    notificationCount,
    criticalAlertsCount,
    toggleCommandPalette,
    getContextualSuggestions,
    shouldShowFirefightingMode
  } = useWorkflowState();
  
  // Navigation hooks
  const router = useRouter();
  const pathname = usePathname();
  
  // Local state
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(false);
  
  // Initialize keyboard shortcuts
  useKeyboardShortcuts();
  
  /**
   * Filter navigation items based on current context
   * Shows only relevant items to reduce cognitive load
   */
  const getContextualNavigation = (): NavigationItem[] => {
    let relevantItems = NAVIGATION_ITEMS.filter(item => {
      // Always show items that match current workflow
      if (item.workflows.includes(currentWorkflow)) return true;
      
      // Always show core items (Command Center, Settings)
      if (item.key === 'command-center' || item.key === 'settings') return true;
      
      // Show persona-specific items
      if (userPersona && item.personas?.includes(userPersona)) return true;
      
      return false;
    });
    
    // Prioritize items for current persona
    if (userPersona) {
      relevantItems = relevantItems.sort((a, b) => {
        const aHasPersona = a.personas?.includes(userPersona);
        const bHasPersona = b.personas?.includes(userPersona);
        
        if (aHasPersona && !bHasPersona) return -1;
        if (!aHasPersona && bHasPersona) return 1;
        
        return a.priority - b.priority;
      });
    }
    
    return relevantItems.slice(0, collapsed ? 5 : 8); // Limit items based on space
  };
  
  /**
   * Add dynamic badges based on context
   * Real-time status indicators for navigation items
   */
  const getItemBadge = (item: NavigationItem) => {
    switch (item.key) {
      case 'tasks':
        if (navigationContext.urgentTasks && navigationContext.urgentTasks > 0) {
          return { 
            text: navigationContext.urgentTasks.toString(), 
            color: 'red', 
            urgent: true 
          };
        }
        break;
      case 'dashboard':
        if (navigationContext.teamPulseScore && navigationContext.teamPulseScore < 70) {
          return { 
            text: 'Low', 
            color: 'orange', 
            urgent: true 
          };
        }
        break;
      case 'strategic-intelligence':
        if (navigationContext.lastStrategicAnalysis) {
          const hoursAgo = Math.floor(
            (new Date().getTime() - navigationContext.lastStrategicAnalysis.timestamp.getTime()) / (1000 * 3600)
          );
          if (hoursAgo > 24) {
            return { 
              text: 'Stale', 
              color: 'yellow' 
            };
          }
        }
        break;
    }
    return item.badge;
  };
  
  /**
   * Generate smart breadcrumbs with strategic context
   */
  const renderSmartBreadcrumbs = () => {
    if (breadcrumbs.length === 0) return null;
    
    const breadcrumbItems = breadcrumbs.map((crumb, index) => (
      <Anchor 
        key={index}
        href={crumb.path}
        size="sm"
        c={index === breadcrumbs.length - 1 ? 'var(--pm33-text-primary)' : 'dimmed'}
      >
        <Group gap={4}>
          <Text size="sm">{crumb.label}</Text>
          {crumb.context && (
            <Tooltip label={`Context: ${crumb.context}`}>
              <IconBrain size={12} color="var(--pm33-brand)" />
            </Tooltip>
          )}
        </Group>
      </Anchor>
    ));
    
    return (
      <Box mb={16} px={collapsed ? 12 : 16}>
        <Breadcrumbs separator={<IconChevronRight size={12} color="var(--pm33-text-tertiary)" />}>
          {breadcrumbItems}
        </Breadcrumbs>
      </Box>
    );
  };
  
  /**
   * Render workflow status indicator
   * Visual feedback on current strategic phase
   */
  const renderWorkflowStatus = () => {
    const workflowConfig = {
      planning: { color: 'blue', icon: <IconTarget size={16} />, label: 'Planning Phase' },
      executing: { color: 'green', icon: <IconBolt size={16} />, label: 'Execution Mode' },
      reviewing: { color: 'purple', icon: <IconChartLine size={16} />, label: 'Review & Analysis' },
      firefighting: { color: 'red', icon: <IconFlame size={16} />, label: 'Crisis Response' }
    };
    
    const config = workflowConfig[currentWorkflow];
    
    return (
      <Box px={collapsed ? 12 : 16} mb={16}>
        <Badge 
          size="md" 
          color={config.color}
          variant="light"
          leftSection={config.icon}
          fullWidth={!collapsed}
          style={{ 
            justifyContent: collapsed ? 'center' : 'flex-start' 
          }}
        >
          {!collapsed && config.label}
        </Badge>
        
        {shouldShowFirefightingMode() && currentWorkflow !== 'firefighting' && (
          <Alert
            icon={<IconAlertTriangle size={16} />}
            title={collapsed ? '' : 'Crisis Mode Available'}
            color="red"
            size="sm"
            mt={8}
            style={{ 
              cursor: 'pointer' 
            }}
            onClick={() => router.push('/command-center?mode=firefighting')}
          >
            {!collapsed && 'Critical issues detected. Switch to crisis response?'}
          </Alert>
        )}
      </Box>
    );
  };
  
  /**
   * Command palette integration
   * Quick access to all navigation and actions
   */
  const renderCommandPalette = () => (
    <Spotlight
      opened={commandPalette.isOpen}
      onClose={toggleCommandPalette}
      onSpotlightClose={toggleCommandPalette}
      shortcut={['mod + K']}
      searchPlaceholder="Search commands, navigate, or ask strategic questions..."
      nothingFound="No commands found"
      highlightQuery
      actions={[
        // Navigation actions
        ...getContextualNavigation().map(item => ({
          id: item.key,
          label: item.label,
          description: item.description,
          leftSection: item.icon,
          rightSection: item.shortcut ? <Kbd>{item.shortcut.replace('Cmd+', '⌘')}</Kbd> : undefined,
          onClick: () => router.push(item.path)
        })),
        
        // Quick actions
        {
          id: 'new-strategic-analysis',
          label: 'New Strategic Analysis',
          description: 'Start strategic decision intelligence workflow',
          leftSection: <IconBrain size={20} />,
          rightSection: <Kbd>⌘N</Kbd>,
          onClick: () => router.push('/strategic-intelligence')
        },
        {
          id: 'what-if-analysis',
          label: 'What-If Analysis',
          description: 'Resource allocation and scenario planning',
          leftSection: <IconChartLine size={20} />,
          rightSection: <Kbd>⌘W</Kbd>,
          onClick: () => router.push('/strategic-intelligence?mode=what-if')
        },
        {
          id: 'sync-pm-tools',
          label: 'Sync PM Tools',
          description: 'Synchronize with connected PM tools',
          leftSection: <IconRefresh size={20} />,
          rightSection: <Kbd>⌘J</Kbd>,
          onClick: () => console.log('Sync PM tools')
        }
      ]}
    />
  );
  
  return (
    <>
      {/* Command Palette */}
      {renderCommandPalette()}
      
      {/* Main Navigation */}
      <Box
        style={{
          width: collapsed ? 64 : 280,
          height: '100vh',
          background: 'var(--pm33-bg-secondary)',
          borderRight: '1px solid var(--pm33-border-subtle)',
          transition: 'width 0.2s ease',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header with Command Palette Trigger */}
        <Box p={collapsed ? 8 : 16} style={{ borderBottom: '1px solid var(--pm33-border-subtle)' }}>
          <Group justify="space-between" align="center">
            {!collapsed && (
              <Text size="sm" fw={600} c="var(--pm33-text-primary)">
                PM33 Intelligence
              </Text>
            )}
            
            <ActionIcon
              variant="subtle"
              size="sm"
              onClick={toggleCommandPalette}
              title="Open Command Palette (Cmd+K)"
            >
              <IconCommand size={16} />
            </ActionIcon>
          </Group>
        </Box>
        
        {/* Smart Breadcrumbs */}
        {renderSmartBreadcrumbs()}
        
        {/* Workflow Status */}
        {renderWorkflowStatus()}
        
        {/* Contextual Suggestions */}
        {!collapsed && (
          <Box px={16} mb={16}>
            <Text size="xs" c="dimmed" mb={8} tt="uppercase" fw={600}>
              Suggested Actions
            </Text>
            <Stack gap={4}>
              {getContextualSuggestions().slice(0, 2).map((suggestion, index) => (
                <Box
                  key={index}
                  onClick={() => router.push(suggestion.path)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 6,
                    background: 'var(--pm33-bg-tertiary)',
                    border: '1px solid var(--pm33-border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Text size="xs" fw={500} mb={2}>
                    {suggestion.label}
                  </Text>
                  <Text size="xs" c="dimmed" style={{ lineHeight: 1.3 }}>
                    {suggestion.reason}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
        
        {/* Main Navigation Items */}
        <Box style={{ flex: 1, overflowY: 'auto' }}>
          <Stack gap={0} px={collapsed ? 4 : 8}>
            {getContextualNavigation().map((item) => {
              const isActive = pathname === item.path;
              const badge = getItemBadge(item);
              
              return (
                <Tooltip
                  key={item.key}
                  label={collapsed ? `${item.label} ${item.shortcut ? `(${item.shortcut})` : ''}` : ''}
                  position="right"
                  disabled={!collapsed}
                >
                  <NavLink
                    href={item.path}
                    label={collapsed ? '' : item.label}
                    leftSection={item.icon}
                    rightSection={
                      badge ? (
                        <Badge 
                          size="xs" 
                          color={badge.color}
                          variant={badge.urgent ? 'filled' : 'light'}
                        >
                          {badge.text}
                        </Badge>
                      ) : (
                        !collapsed && item.shortcut && (
                          <Kbd size="xs">{item.shortcut.replace('Cmd+', '⌘')}</Kbd>
                        )
                      )
                    }
                    active={isActive}
                    style={{
                      borderRadius: 8,
                      margin: '2px 0',
                      justifyContent: collapsed ? 'center' : 'flex-start'
                    }}
                  />
                </Tooltip>
              );
            })}
          </Stack>
        </Box>
        
        {/* Footer with Notifications */}
        <Box p={collapsed ? 8 : 16} style={{ borderTop: '1px solid var(--pm33-border-subtle)' }}>
          <Group justify={collapsed ? 'center' : 'space-between'} align="center">
            {!collapsed && (
              <Text size="xs" c="dimmed">
                {userPersona === 'senior_pm' && 'Scale-Up PM'}
                {userPersona === 'vp_product' && 'Product Leader'}
                {userPersona === 'founder' && 'Founder Mode'}
              </Text>
            )}
            
            <Group gap={8}>
              {notificationCount > 0 && (
                <Badge size="xs" color="blue" variant="filled">
                  {notificationCount}
                </Badge>
              )}
              {criticalAlertsCount > 0 && (
                <Badge size="xs" color="red" variant="filled">
                  {criticalAlertsCount}
                </Badge>
              )}
              
              {onToggleCollapse && (
                <ActionIcon
                  variant="subtle"
                  size="sm"
                  onClick={onToggleCollapse}
                  title={collapsed ? 'Expand Navigation' : 'Collapse Navigation'}
                >
                  <IconChevronRight 
                    size={16} 
                    style={{ 
                      transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                      transition: 'transform 0.2s ease'
                    }} 
                  />
                </ActionIcon>
              )}
            </Group>
          </Group>
        </Box>
      </Box>
    </>
  );
};

export default WorkflowNavigator;