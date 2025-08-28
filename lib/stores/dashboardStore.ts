/**
 * File: lib/stores/dashboardStore.ts
 * Purpose: Centralized data store for PM33 dashboard with PM tool integration
 * Context: Replaces hardcoded useState calls with professional data architecture
 * Integration: Designed for future Supabase/Firebase connection
 */

// ===============================
// Core Data Interfaces
// ===============================

export interface User {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface DashboardMetrics {
  // Current metrics from dashboard
  signups: number;
  mrr: number;
  activeUsers: number;
  conversion: number;
  decisionsToday: number;
  decisionsTotal: number;
  teamAlignment: number;
  strategicScore: string;
  betaSignups: number;
  progressPercent: number;
}

export interface PMTool {
  id: string;
  name: 'Jira' | 'Linear' | 'Monday' | 'Asana';
  status: 'connected' | 'syncing' | 'setup' | 'disconnected' | 'error';
  health: 'healthy' | 'degraded' | 'error' | 'syncing' | 'pending';
  taskCount: number;
  lastSync: string | null;
  syncProgress?: number; // 0-100 for syncing status
  connectionData?: {
    workspace?: string;
    project?: string;
    apiEndpoint?: string;
  };
  capabilities: string[];
  integrationDate?: Date;
}

export interface Competitor {
  id: string;
  name: string;
  funding: string;
  status: 'primary' | 'secondary' | 'emerging' | 'declining';
  marketShare: string;
  lastUpdate: Date;
  keyMetrics?: {
    employees?: number;
    valuation?: string;
    recentNews?: string;
  };
}

export interface StrategicScenario {
  id: string;
  type: 'competitive' | 'resource' | 'growth' | 'fundraising' | 'market' | 'product';
  title: string;
  description?: string;
  status: 'active' | 'pending' | 'completed' | 'draft' | 'archived';
  priority: 'critical' | 'high' | 'medium' | 'low';
  createdAt: Date;
  updatedAt: Date;
  assignee?: string;
  dueDate?: Date;
  tags?: string[];
}

export interface IntelligenceOperations {
  competitorUpdates: number;
  customerTickets: number;
  recommendations: number;
  aiTeamsHealth: {
    strategic: 'active' | 'standby' | 'error' | 'maintenance';
    workflow: 'ready' | 'busy' | 'error' | 'offline';
    data: 'learning' | 'processing' | 'idle' | 'error';
    communication: 'standby' | 'active' | 'error' | 'updating';
  };
  lastUpdated: Date;
}

export interface DashboardData {
  user: User;
  metrics: DashboardMetrics;
  pmTools: PMTool[];
  competitors: Competitor[];
  scenarios: StrategicScenario[];
  intelligenceOps: IntelligenceOperations;
  lastRefresh: Date;
}

// ===============================
// Mock Data Store
// ===============================

export const dashboardData: DashboardData = {
  user: {
    id: 'user-001',
    name: 'Sarah Chen',
    role: 'Senior Product Manager',
    company: 'TechCorp (Series B)',
    avatar: '/avatars/sarah-chen.jpg'
  },

  metrics: {
    signups: 15,
    mrr: 2400,
    activeUsers: 38,
    conversion: 12.5,
    decisionsToday: 4,
    decisionsTotal: 5,
    teamAlignment: 92,
    strategicScore: 'A+',
    betaSignups: 15,
    progressPercent: 80
  },

  pmTools: [
    {
      id: 'tool-jira-001',
      name: 'Jira',
      status: 'connected',
      health: 'healthy',
      taskCount: 47,
      lastSync: '2 mins ago',
      connectionData: {
        workspace: 'techcorp-workspace',
        project: 'TECH',
        apiEndpoint: 'https://techcorp.atlassian.net'
      },
      capabilities: ['Issues', 'Epics', 'Sprints', 'Reports'],
      integrationDate: new Date('2024-01-15')
    },
    {
      id: 'tool-linear-001', 
      name: 'Linear',
      status: 'setup',
      health: 'pending',
      taskCount: 0,
      lastSync: null,
      connectionData: {
        workspace: 'techcorp',
      },
      capabilities: ['Issues', 'Projects', 'Roadmaps', 'Cycles'],
      integrationDate: undefined
    },
    {
      id: 'tool-monday-001',
      name: 'Monday',
      status: 'disconnected', 
      health: 'error',
      taskCount: 0,
      lastSync: '3 days ago',
      connectionData: {
        workspace: 'techcorp-monday',
      },
      capabilities: ['Boards', 'Items', 'Workflows', 'Dashboards'],
      integrationDate: new Date('2024-02-01')
    },
    {
      id: 'tool-asana-001',
      name: 'Asana',
      status: 'syncing',
      health: 'syncing',
      taskCount: 23,
      lastSync: '1 hour ago',
      syncProgress: 67,
      connectionData: {
        workspace: 'TechCorp Team',
        project: 'Product Roadmap'
      },
      capabilities: ['Tasks', 'Projects', 'Goals', 'Portfolios'],
      integrationDate: new Date('2024-02-10')
    }
  ],

  competitors: [
    {
      id: 'comp-001',
      name: 'Productboard',
      funding: '$100M Series C',
      status: 'primary',
      marketShare: '15%',
      lastUpdate: new Date('2024-08-20'),
      keyMetrics: {
        employees: 500,
        valuation: '$1.2B',
        recentNews: 'Launched AI-powered roadmap prioritization'
      }
    },
    {
      id: 'comp-002', 
      name: 'Aha!',
      funding: 'Profitable (Bootstrapped)',
      status: 'secondary',
      marketShare: '12%',
      lastUpdate: new Date('2024-08-18'),
      keyMetrics: {
        employees: 200,
        valuation: 'Private',
        recentNews: 'Expanded enterprise features'
      }
    },
    {
      id: 'comp-003',
      name: 'ProdPad',
      funding: '$8M Series A',
      status: 'emerging',
      marketShare: '3%',
      lastUpdate: new Date('2024-08-15'),
      keyMetrics: {
        employees: 85,
        valuation: '$40M',
        recentNews: 'Partnership with Slack announced'
      }
    }
  ],

  scenarios: [
    {
      id: 'scenario-001',
      type: 'competitive',
      title: 'Competitor Market Entry Response',
      description: 'Major competitor launched similar features to our core product',
      status: 'active',
      priority: 'high',
      createdAt: new Date('2024-08-20'),
      updatedAt: new Date('2024-08-25'),
      assignee: 'Strategy Team',
      dueDate: new Date('2024-08-28'),
      tags: ['urgent', 'competitive-analysis', 'product-strategy']
    },
    {
      id: 'scenario-002',
      type: 'resource',
      title: 'Hiring vs Marketing Investment ROI',
      description: 'Optimize resource allocation between engineering hiring and marketing spend',
      status: 'pending',
      priority: 'medium',
      createdAt: new Date('2024-08-22'),
      updatedAt: new Date('2024-08-24'),
      assignee: 'Finance Team',
      tags: ['resource-allocation', 'roi-analysis']
    },
    {
      id: 'scenario-003',
      type: 'growth',
      title: 'Growth Strategy Analysis',
      description: 'User growth slowing to 5% monthly - strategic pivot evaluation',
      status: 'completed',
      priority: 'high',
      createdAt: new Date('2024-08-18'),
      updatedAt: new Date('2024-08-23'),
      assignee: 'Growth Team',
      tags: ['growth-strategy', 'metrics-analysis']
    },
    {
      id: 'scenario-004',
      type: 'fundraising',
      title: 'Series B Positioning Strategy',
      description: 'Prepare strategic positioning for Series B fundraising in 6 months',
      status: 'draft',
      priority: 'critical',
      createdAt: new Date('2024-08-25'),
      updatedAt: new Date('2024-08-25'),
      assignee: 'Executive Team',
      dueDate: new Date('2025-02-25'),
      tags: ['fundraising', 'series-b', 'strategic-planning']
    }
  ],

  intelligenceOps: {
    competitorUpdates: 3,
    customerTickets: 12,
    recommendations: 2,
    aiTeamsHealth: {
      strategic: 'active',
      workflow: 'ready', 
      data: 'learning',
      communication: 'standby'
    },
    lastUpdated: new Date()
  },

  lastRefresh: new Date()
};

// ===============================
// Data Utilities
// ===============================

export const getToolByName = (toolName: string): PMTool | undefined => {
  return dashboardData.pmTools.find(tool => tool.name.toLowerCase() === toolName.toLowerCase());
};

export const getActiveScenarios = (): StrategicScenario[] => {
  return dashboardData.scenarios.filter(scenario => scenario.status === 'active');
};

export const getConnectedTools = (): PMTool[] => {
  return dashboardData.pmTools.filter(tool => tool.status === 'connected');
};

export const getTotalTaskCount = (): number => {
  return dashboardData.pmTools.reduce((total, tool) => total + tool.taskCount, 0);
};

export const getToolHealthSummary = () => {
  const tools = dashboardData.pmTools;
  return {
    total: tools.length,
    healthy: tools.filter(t => t.health === 'healthy').length,
    connected: tools.filter(t => t.status === 'connected').length,
    needsAttention: tools.filter(t => t.health === 'error' || t.status === 'disconnected').length
  };
};

// Future: Replace with API calls
export const refreshDashboardData = async (): Promise<DashboardData> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Update timestamps
  dashboardData.lastRefresh = new Date();
  dashboardData.intelligenceOps.lastUpdated = new Date();
  
  return { ...dashboardData };
};