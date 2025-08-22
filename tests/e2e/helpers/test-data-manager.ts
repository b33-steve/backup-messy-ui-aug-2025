// tests/e2e/helpers/test-data-manager.ts
// Comprehensive test data management system for PM33 end-to-end tests
// Provides structured test data, fixtures, and mock data for different user personas and scenarios
// RELEVANT FILES: user-journey-helper.ts, startup-pm-journey.spec.ts, enterprise-pm-journey.spec.ts

import { Page } from '@playwright/test';

export interface StartupContext {
  company: {
    name: string;
    size: string;
    stage: string;
    industry: string;
    funding_round: string;
  };
  team: {
    size: number;
    roles: string[];
    experience_level: string;
  };
  challenges: string[];
  goals: string[];
  tools_in_use: string[];
  budget_constraints: {
    monthly_budget: number;
    tool_budget: number;
    hiring_budget: number;
  };
}

export interface EnterpriseContext {
  organization: {
    name: string;
    size: string;
    industry: string;
    market_cap: string;
    regions: string[];
  };
  structure: {
    departments: string[];
    reporting_levels: number;
    matrix_management: boolean;
    compliance_requirements: string[];
  };
  scale: {
    product_teams: number;
    total_employees: number;
    annual_revenue: string;
    complexity_score: number;
  };
  enterprise_tools: {
    pm_tools: string[];
    collaboration_tools: string[];
    analytics_tools: string[];
    security_tools: string[];
  };
}

export interface AnalysisScenario {
  question: string;
  framework: string;
  context: string;
  expected_processing_time: number;
  complexity_level: 'low' | 'medium' | 'high' | 'enterprise';
  success_indicators: string[];
}

export interface WorkflowScenario {
  name: string;
  type: 'epic' | 'feature' | 'sprint' | 'release';
  pm_tool: string;
  complexity: number;
  expected_items: number;
  automation_level: 'basic' | 'advanced' | 'enterprise';
}

export interface CommunicationScenario {
  type: 'executive_summary' | 'team_update' | 'stakeholder_report';
  audience: string[];
  formality: 'casual' | 'professional' | 'executive';
  length: 'brief' | 'detailed' | 'comprehensive';
  export_formats: string[];
}

export interface IntegrationScenario {
  tool: string;
  auth_method: 'api_key' | 'oauth' | 'sso';
  data_types: string[];
  sync_direction: 'import' | 'export' | 'bidirectional';
  expected_success_rate: number;
}

export class TestDataManager {
  private startupContexts: Map<string, StartupContext>;
  private enterpriseContexts: Map<string, EnterpriseContext>;
  private analysisScenarios: Map<string, AnalysisScenario>;
  private workflowScenarios: Map<string, WorkflowScenario>;
  private communicationScenarios: Map<string, CommunicationScenario>;
  private integrationScenarios: Map<string, IntegrationScenario>;

  constructor() {
    this.startupContexts = new Map();
    this.enterpriseContexts = new Map();
    this.analysisScenarios = new Map();
    this.workflowScenarios = new Map();
    this.communicationScenarios = new Map();
    this.integrationScenarios = new Map();
    
    this.initializeTestData();
  }

  private initializeTestData(): void {
    // Startup contexts for different scenarios
    this.startupContexts.set('pre_series_a', {
      company: {
        name: 'TechFlow Startup',
        size: '25 employees',
        stage: 'Pre-Series A',
        industry: 'SaaS',
        funding_round: 'Seed'
      },
      team: {
        size: 8,
        roles: ['Product Manager', 'Engineers', 'Designers', 'Marketing'],
        experience_level: '2-5 years'
      },
      challenges: [
        'Limited resources for PMO capabilities',
        'Need strategic frameworks without consultant costs',
        'Stakeholder alignment across small but growing team',
        'Data-driven decision making without dedicated analytics'
      ],
      goals: [
        'Secure Series A funding',
        'Achieve product-market fit',
        'Scale team efficiently',
        'Build systematic processes'
      ],
      tools_in_use: ['Notion', 'Linear', 'Slack', 'Figma', 'GitHub'],
      budget_constraints: {
        monthly_budget: 5000,
        tool_budget: 500,
        hiring_budget: 15000
      }
    });

    this.startupContexts.set('series_b', {
      company: {
        name: 'GrowthTech Inc',
        size: '85 employees',
        stage: 'Series B',
        industry: 'FinTech',
        funding_round: 'Series B'
      },
      team: {
        size: 12,
        roles: ['Senior PM', 'Product Managers', 'Engineers', 'Data Scientists'],
        experience_level: '3-8 years'
      },
      challenges: [
        'Scaling product management practices',
        'Cross-functional coordination complexity',
        'Multiple product lines management',
        'Enterprise client requirements'
      ],
      goals: [
        'Expand market share',
        'Build enterprise features',
        'Optimize team productivity',
        'Prepare for Series C'
      ],
      tools_in_use: ['Jira', 'Confluence', 'Slack', 'Tableau', 'Salesforce'],
      budget_constraints: {
        monthly_budget: 15000,
        tool_budget: 2000,
        hiring_budget: 50000
      }
    });

    // Enterprise contexts for complex scenarios
    this.enterpriseContexts.set('fortune_500', {
      organization: {
        name: 'GlobalCorp Industries',
        size: '50,000+ employees',
        industry: 'Technology',
        market_cap: '$50B+',
        regions: ['North America', 'Europe', 'Asia-Pacific']
      },
      structure: {
        departments: ['Product', 'Engineering', 'Sales', 'Marketing', 'Operations', 'Finance'],
        reporting_levels: 6,
        matrix_management: true,
        compliance_requirements: ['SOX', 'GDPR', 'SOC2', 'ISO27001']
      },
      scale: {
        product_teams: 25,
        total_employees: 52000,
        annual_revenue: '$10B+',
        complexity_score: 95
      },
      enterprise_tools: {
        pm_tools: ['Jira', 'Azure DevOps', 'Monday.com', 'Asana'],
        collaboration_tools: ['Microsoft Teams', 'Slack', 'Confluence', 'SharePoint'],
        analytics_tools: ['Tableau', 'Power BI', 'DataDog', 'Splunk'],
        security_tools: ['Okta', 'CyberArk', 'Qualys', 'SailPoint']
      }
    });

    // Analysis scenarios for different complexity levels
    this.analysisScenarios.set('startup_prioritization', {
      question: 'Should we prioritize user acquisition or product features for Series A?',
      framework: 'RICE',
      context: 'pre_series_a',
      expected_processing_time: 8000,
      complexity_level: 'medium',
      success_indicators: [
        'RICE scores calculated',
        'Reach estimates provided',
        'Impact analysis included',
        'Confidence levels shown'
      ]
    });

    this.analysisScenarios.set('enterprise_strategy', {
      question: 'Should we invest $2M in AI capabilities or expand to European markets?',
      framework: 'Porter Five Forces',
      context: 'fortune_500',
      expected_processing_time: 15000,
      complexity_level: 'enterprise',
      success_indicators: [
        'Competitive analysis completed',
        'Market forces evaluated',
        'Risk assessment included',
        'ROI projections provided'
      ]
    });

    // Workflow scenarios for different PM tools
    this.workflowScenarios.set('linear_sprint', {
      name: 'Q1 Feature Sprint',
      type: 'sprint',
      pm_tool: 'linear',
      complexity: 7,
      expected_items: 15,
      automation_level: 'advanced'
    });

    this.workflowScenarios.set('jira_epic', {
      name: 'Enterprise Authentication Epic',
      type: 'epic',
      pm_tool: 'jira',
      complexity: 9,
      expected_items: 35,
      automation_level: 'enterprise'
    });

    // Communication scenarios for different audiences
    this.communicationScenarios.set('investor_update', {
      type: 'executive_summary',
      audience: ['investors', 'board_members'],
      formality: 'executive',
      length: 'comprehensive',
      export_formats: ['pdf', 'powerpoint']
    });

    this.communicationScenarios.set('team_standup', {
      type: 'team_update',
      audience: ['product_team', 'engineering'],
      formality: 'professional',
      length: 'brief',
      export_formats: ['markdown', 'slack']
    });

    // Integration scenarios for common tools
    this.integrationScenarios.set('linear_sync', {
      tool: 'linear',
      auth_method: 'api_key',
      data_types: ['issues', 'projects', 'labels', 'teams'],
      sync_direction: 'bidirectional',
      expected_success_rate: 0.98
    });

    this.integrationScenarios.set('jira_enterprise', {
      tool: 'jira',
      auth_method: 'oauth',
      data_types: ['epics', 'stories', 'bugs', 'projects', 'users'],
      sync_direction: 'bidirectional',
      expected_success_rate: 0.95
    });
  }

  // Getter methods for test data
  getStartupContext(scenario: string = 'pre_series_a'): StartupContext {
    const context = this.startupContexts.get(scenario);
    if (!context) {
      throw new Error(`Startup context '${scenario}' not found`);
    }
    return { ...context }; // Return deep copy
  }

  getEnterpriseContext(scenario: string = 'fortune_500'): EnterpriseContext {
    const context = this.enterpriseContexts.get(scenario);
    if (!context) {
      throw new Error(`Enterprise context '${scenario}' not found`);
    }
    return { ...context }; // Return deep copy
  }

  getAnalysisScenario(scenario: string): AnalysisScenario {
    const analysisScenario = this.analysisScenarios.get(scenario);
    if (!analysisScenario) {
      throw new Error(`Analysis scenario '${scenario}' not found`);
    }
    return { ...analysisScenario };
  }

  getWorkflowScenario(scenario: string): WorkflowScenario {
    const workflowScenario = this.workflowScenarios.get(scenario);
    if (!workflowScenario) {
      throw new Error(`Workflow scenario '${scenario}' not found`);
    }
    return { ...workflowScenario };
  }

  getCommunicationScenario(scenario: string): CommunicationScenario {
    const communicationScenario = this.communicationScenarios.get(scenario);
    if (!communicationScenario) {
      throw new Error(`Communication scenario '${scenario}' not found`);
    }
    return { ...communicationScenario };
  }

  getIntegrationScenario(scenario: string): IntegrationScenario {
    const integrationScenario = this.integrationScenarios.get(scenario);
    if (!integrationScenario) {
      throw new Error(`Integration scenario '${scenario}' not found`);
    }
    return { ...integrationScenario };
  }

  // Dynamic test data generation methods
  generateRandomQuery(complexity: 'low' | 'medium' | 'high' = 'medium'): string {
    const queries = {
      low: [
        'What should we build next?',
        'How do we prioritize features?',
        'What metrics should we track?'
      ],
      medium: [
        'Should we focus on user acquisition or retention this quarter?',
        'How should we approach the competitive threat from Company X?',
        'What\'s the best pricing strategy for our enterprise tier?'
      ],
      high: [
        'Should we pivot to a platform strategy or double down on our core product?',
        'How do we balance technical debt reduction with new feature development?',
        'What\'s our go-to-market strategy for international expansion?'
      ]
    };

    const queryList = queries[complexity];
    return queryList[Math.floor(Math.random() * queryList.length)];
  }

  generateTestUser(persona: 'startup_pm' | 'enterprise_pm' | 'growth_pm') {
    const users = {
      startup_pm: {
        name: 'Alex Thompson',
        email: 'alex@techflow.com',
        role: 'Product Manager',
        experience: '3 years',
        goals: ['Series A preparation', 'Team scaling', 'Process optimization']
      },
      enterprise_pm: {
        name: 'Sarah Chen',
        email: 'sarah.chen@globalcorp.com',
        role: 'Senior Product Manager',
        experience: '8 years',
        goals: ['Stakeholder alignment', 'Cross-functional coordination', 'Strategic planning']
      },
      growth_pm: {
        name: 'Marcus Rodriguez',
        email: 'marcus@growthtech.com',
        role: 'Growth Product Manager',
        experience: '5 years',
        goals: ['User acquisition', 'Conversion optimization', 'Data-driven growth']
      }
    };

    return users[persona];
  }

  // Test fixture management
  async setupTestFixtures(page: Page): Promise<void> {
    // Set up common test fixtures like localStorage, sessionStorage, cookies
    await page.addInitScript(() => {
      // Mock localStorage with test data
      localStorage.setItem('pm33_onboarding_completed', 'true');
      localStorage.setItem('pm33_demo_mode', 'true');
      localStorage.setItem('pm33_user_preferences', JSON.stringify({
        theme: 'default',
        notifications: true,
        auto_save: true
      }));
    });

    // Set up API mocking for consistent test results
    await page.route('/api/strategic/analyze', route => {
      route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysis_id: 'test-analysis-123',
          status: 'processing',
          estimated_completion: 8000
        })
      });
    });

    await page.route('/api/workflows/create', route => {
      route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflow_id: 'test-workflow-456',
          items_created: 15,
          success_rate: 0.98
        })
      });
    });
  }

  async cleanupTestFixtures(page: Page): Promise<void> {
    // Clean up test data after each test
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    // Clear any persistent test data
    await page.unroute('/api/**');
  }

  // Performance test data
  getPerformanceThresholds() {
    return {
      page_load: 2000, // 2 seconds
      interaction_response: 1000, // 1 second
      api_response: 3000, // 3 seconds
      animation_duration: 500, // 0.5 seconds
      form_validation: 200, // 0.2 seconds
    };
  }

  // Accessibility test configuration
  getAccessibilityConfig() {
    return {
      wcag_level: 'AA',
      color_contrast_ratio: 4.5,
      keyboard_navigation: true,
      screen_reader_support: true,
      focus_indicators: true
    };
  }
}