export * from './PM33DashboardTemplate';

// Template Registry with metadata
export const PM33Templates = {
  dashboard: {
    name: 'Dashboard',
    component: 'PM33DashboardTemplate',
    description: 'Main command center with 3-column layout',
    requiredData: ['user', 'metrics', 'scenarios', 'tools']
  },
  analytics: {
    name: 'Analytics', 
    component: 'PM33AnalyticsTemplate',
    description: 'Data visualization and metrics',
    requiredData: ['revenue', 'users', 'funnel', 'kpis']
  },
  project: {
    name: 'Project',
    component: 'PM33ProjectTemplate', 
    description: 'Kanban board and task management',
    requiredData: ['projects', 'tasks', 'team']
  },
  settings: {
    name: 'Settings',
    component: 'PM33SettingsTemplate',
    description: 'Configuration and preferences', 
    requiredData: ['settings', 'user']
  },
  chat: {
    name: 'Chat',
    component: 'PM33ChatTemplate',
    description: 'AI chat interface',
    requiredData: ['messages', 'context']
  }
};