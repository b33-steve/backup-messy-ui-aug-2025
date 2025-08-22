// tests/e2e/helpers/user-journey-helper.ts
// Comprehensive helper class for user journey testing with PM33-specific workflows
// Provides reusable methods for onboarding, strategic analysis, AI team interactions
// RELEVANT FILES: test-data-manager.ts, performance-monitor.ts, accessibility-checker.ts

import { Page, expect } from '@playwright/test';
import { TestDataManager } from './test-data-manager';

interface OnboardingData {
  role: string;
  company_size: string;
  experience_level: string;
  primary_challenge: string;
  tools_used: string[];
}

interface EnterpriseOnboardingData {
  role: string;
  department: string;
  company_size: string;
  team_size: string;
  stakeholder_complexity: string;
  compliance_requirements: string[];
  existing_tools: string[];
}

interface StrategicAnalysisData {
  question: string;
  framework: string;
  context: any;
  urgency: string;
}

interface ComplexAnalysisData {
  question: string;
  frameworks: string[];
  stakeholders: Array<{
    role: string;
    priorities: string[];
  }>;
  compliance_frameworks: string[];
  budget_parameters: {
    total_budget: number;
    quarterly_allocation: number;
    approval_threshold: number;
  };
}

interface ExecutiveSummaryData {
  analysis_source: string;
  timeframe: string;
  audience: string;
  focus_areas: string[];
}

interface TeamUpdateData {
  team: string;
  achievements: string[];
  challenges: string[];
  next_steps: string[];
}

interface IntegrationData {
  tool: string;
  auth_method: string;
  sync_frequency: string;
  field_mapping: string;
}

interface QuickWin {
  title: string;
  time_saved: string;
  confidence: string;
}

interface ImpactMetrics {
  strategic_alignment: number;
  team_efficiency: number;
  decision_confidence: number;
  stakeholder_satisfaction: number;
}

interface NPSSurvey {
  score: number;
  feedback: string;
  feature_requests: string[];
}

export class UserJourneyHelper {
  private page: Page;
  private testData: TestDataManager;

  constructor(page: Page) {
    this.page = page;
    this.testData = new TestDataManager();
  }

  // === ONBOARDING HELPERS ===
  
  async fillOnboardingForm(data: OnboardingData): Promise<void> {
    await this.page.click('[data-testid="onboarding-start"]');
    
    // Role selection
    await this.page.selectOption('[data-testid="role-select"]', data.role);
    await this.page.click('[data-testid="next-step"]');
    
    // Company size
    await this.page.selectOption('[data-testid="company-size"]', data.company_size);
    await this.page.click('[data-testid="next-step"]');
    
    // Experience level
    await this.page.selectOption('[data-testid="experience-level"]', data.experience_level);
    await this.page.click('[data-testid="next-step"]');
    
    // Primary challenge
    await this.page.fill('[data-testid="primary-challenge"]', data.primary_challenge);
    
    // Tools selection
    for (const tool of data.tools_used) {
      await this.page.check(`[data-testid="tool-${tool.toLowerCase()}"]`);
    }
    
    await this.page.click('[data-testid="complete-onboarding"]');
    
    // Wait for dashboard to load
    await expect(this.page.locator('[data-testid="dashboard"]')).toBeVisible({ timeout: 10000 });
  }

  async fillEnterpriseOnboarding(data: EnterpriseOnboardingData): Promise<void> {
    await this.page.click('[data-testid="enterprise-onboarding-start"]');
    
    // Enhanced form with enterprise-specific fields
    await this.page.selectOption('[data-testid="role-select"]', data.role);
    await this.page.selectOption('[data-testid="department-select"]', data.department);
    await this.page.selectOption('[data-testid="company-size"]', data.company_size);
    await this.page.fill('[data-testid="team-size"]', data.team_size);
    await this.page.selectOption('[data-testid="stakeholder-complexity"]', data.stakeholder_complexity);
    
    // Compliance requirements
    for (const requirement of data.compliance_requirements) {
      await this.page.check(`[data-testid="compliance-${requirement.toLowerCase()}"]`);
    }
    
    // Existing tools
    for (const tool of data.existing_tools) {
      await this.page.check(`[data-testid="enterprise-tool-${tool.toLowerCase().replace(/\s+/g, '-')}"]`);
    }
    
    await this.page.click('[data-testid="complete-enterprise-onboarding"]');
    await expect(this.page.locator('[data-testid="enterprise-dashboard"]')).toBeVisible({ timeout: 15000 });
  }

  async completeSSOFlow(ssoData: { provider: string; domain: string; user_attributes: string[] }): Promise<void> {
    await this.page.click('[data-testid="sso-provider-' + ssoData.provider + '"]');
    await this.page.fill('[data-testid="sso-domain"]', ssoData.domain);
    
    // Mock SSO authentication
    await this.page.click('[data-testid="authenticate-sso"]');
    await expect(this.page.locator('[data-testid="sso-success"]')).toBeVisible({ timeout: 5000 });
    
    // Verify user attributes are populated
    for (const attribute of ssoData.user_attributes) {
      await expect(this.page.locator(`[data-testid="user-${attribute}"]`)).toBeVisible();
    }
  }

  // === GUIDED TOUR AND TUTORIALS ===

  async completeTour(tourSteps: string[]): Promise<void> {
    for (const step of tourSteps) {
      await this.page.click(`[data-testid="tour-${step}"]`);
      await this.page.click('[data-testid="tour-next"]');
    }
    await this.page.click('[data-testid="tour-complete"]');
    
    // Verify tour completion achievement
    await expect(this.page.locator('[data-testid="tour-completion-badge"]')).toBeVisible();
  }

  // === STRATEGIC ANALYSIS HELPERS ===

  async createStrategicAnalysis(data: StrategicAnalysisData): Promise<void> {
    await this.page.click('[data-testid="new-analysis"]');
    
    // Fill strategic question
    await this.page.fill('[data-testid="strategic-question"]', data.question);
    
    // Select framework
    await this.page.selectOption('[data-testid="framework-select"]', data.framework);
    
    // Set urgency
    await this.page.selectOption('[data-testid="urgency-select"]', data.urgency);
    
    // Add context if provided
    if (data.context) {
      await this.page.fill('[data-testid="context-input"]', JSON.stringify(data.context));
    }
    
    // Start analysis
    await this.page.click('[data-testid="start-analysis"]');
  }

  async createComplexAnalysis(data: ComplexAnalysisData): Promise<void> {
    await this.page.click('[data-testid="new-complex-analysis"]');
    
    await this.page.fill('[data-testid="strategic-question"]', data.question);
    
    // Select multiple frameworks
    for (const framework of data.frameworks) {
      await this.page.check(`[data-testid="framework-${framework.toLowerCase().replace(/\s+/g, '-')}"]`);
    }
    
    // Configure stakeholders
    for (const stakeholder of data.stakeholders) {
      await this.page.click('[data-testid="add-stakeholder"]');
      await this.page.selectOption('[data-testid="stakeholder-role"]', stakeholder.role);
      
      for (const priority of stakeholder.priorities) {
        await this.page.check(`[data-testid="priority-${priority}"]`);
      }
    }
    
    // Set budget parameters
    await this.page.fill('[data-testid="total-budget"]', data.budget_parameters.total_budget.toString());
    await this.page.fill('[data-testid="quarterly-allocation"]', data.budget_parameters.quarterly_allocation.toString());
    
    await this.page.click('[data-testid="start-complex-analysis"]');
  }

  async waitForAIProcessing(): Promise<void> {
    // Wait for AI processing to complete
    await expect(this.page.locator('[data-testid="ai-processing"]')).toBeVisible();
    await expect(this.page.locator('[data-testid="ai-processing"]')).not.toBeVisible({ timeout: 30000 });
    await expect(this.page.locator('[data-testid="analysis-complete"]')).toBeVisible();
  }

  // === COMMUNICATION AI HELPERS ===

  async generateExecutiveSummary(data: ExecutiveSummaryData): Promise<void> {
    await this.page.click('[data-testid="generate-executive-summary"]');
    await this.page.selectOption('[data-testid="analysis-source"]', data.analysis_source);
    await this.page.selectOption('[data-testid="timeframe"]', data.timeframe);
    await this.page.selectOption('[data-testid="audience"]', data.audience);
    
    // Select focus areas
    for (const area of data.focus_areas) {
      await this.page.check(`[data-testid="focus-${area}"]`);
    }
    
    await this.page.click('[data-testid="generate-summary"]');
    await this.waitForAIProcessing();
  }

  async generateEnterpriseExecutiveSummary(data: any): Promise<void> {
    await this.page.click('[data-testid="generate-enterprise-summary"]');
    await this.page.selectOption('[data-testid="analysis-source"]', data.analysis_source);
    await this.page.selectOption('[data-testid="timeframe"]', data.timeframe);
    
    // Multiple audience selection
    for (const audience of data.audiences) {
      await this.page.check(`[data-testid="audience-${audience}"]`);
    }
    
    // Custom branding configuration
    if (data.custom_branding) {
      await this.page.click('[data-testid="enable-branding"]');
      await this.page.fill('[data-testid="primary-color"]', data.custom_branding.colors.primary);
      await this.page.selectOption('[data-testid="template-style"]', data.custom_branding.templates);
    }
    
    // Compliance settings
    for (const disclaimer of data.compliance_disclaimers) {
      await this.page.check(`[data-testid="disclaimer-${disclaimer}"]`);
    }
    
    await this.page.selectOption('[data-testid="confidentiality"]', data.confidentiality_level);
    await this.page.click('[data-testid="generate-enterprise-summary"]');
    await this.waitForAIProcessing();
  }

  async createTeamUpdate(data: TeamUpdateData): Promise<void> {
    await this.page.click('[data-testid="create-team-update"]');
    await this.page.selectOption('[data-testid="team-select"]', data.team);
    
    // Add achievements
    for (const achievement of data.achievements) {
      await this.page.click('[data-testid="add-achievement"]');
      await this.page.fill('[data-testid="achievement-input"]', achievement);
    }
    
    // Add challenges
    for (const challenge of data.challenges) {
      await this.page.click('[data-testid="add-challenge"]');
      await this.page.fill('[data-testid="challenge-input"]', challenge);
    }
    
    // Add next steps
    for (const step of data.next_steps) {
      await this.page.click('[data-testid="add-next-step"]');
      await this.page.fill('[data-testid="next-step-input"]', step);
    }
    
    await this.page.click('[data-testid="generate-update"]');
    await this.waitForAIProcessing();
  }

  // === INTEGRATION HELPERS ===

  async setupIntegration(data: IntegrationData): Promise<void> {
    await this.page.click(`[data-testid="setup-${data.tool.toLowerCase()}"]`);
    
    if (data.auth_method === 'api_key') {
      await this.page.fill('[data-testid="api-key"]', await this.testData.getAPIKey(data.tool));
    } else if (data.auth_method === 'oauth') {
      await this.page.click('[data-testid="oauth-connect"]');
      // Handle OAuth flow
    }
    
    await this.page.selectOption('[data-testid="sync-frequency"]', data.sync_frequency);
    await this.page.selectOption('[data-testid="field-mapping"]', data.field_mapping);
    
    await this.page.click('[data-testid="save-integration"]');
    await expect(this.page.locator('[data-testid="integration-success"]')).toBeVisible();
  }

  async setupWorkflowAutomation(automationData: any): Promise<void> {
    await this.page.click('[data-testid="workflow-automation"]');
    await this.page.selectOption('[data-testid="pm-tool"]', automationData.pm_tool);
    await this.page.selectOption('[data-testid="integration-type"]', automationData.integration_type);
    await this.page.selectOption('[data-testid="automation-level"]', automationData.automation_level);
    
    await this.page.click('[data-testid="setup-automation"]');
    await expect(this.page.locator('[data-testid="automation-active"]')).toBeVisible();
  }

  // === VALIDATION HELPERS ===

  async verifyQuickWin(expected: QuickWin): Promise<void> {
    await expect(this.page.locator('[data-testid="quick-win-title"]')).toContainText(expected.title);
    await expect(this.page.locator('[data-testid="time-saved"]')).toContainText(expected.time_saved);
    await expect(this.page.locator('[data-testid="confidence-score"]')).toContainText(expected.confidence);
  }

  async verifyImpactMetrics(metrics: ImpactMetrics): Promise<void> {
    const alignmentText = await this.page.locator('[data-testid="strategic-alignment"]').textContent();
    expect(parseInt(alignmentText!)).toBeGreaterThanOrEqual(metrics.strategic_alignment);
    
    const efficiencyText = await this.page.locator('[data-testid="team-efficiency"]').textContent();
    expect(parseInt(efficiencyText!)).toBeGreaterThanOrEqual(metrics.team_efficiency);
    
    const confidenceText = await this.page.locator('[data-testid="decision-confidence"]').textContent();
    expect(parseInt(confidenceText!)).toBeGreaterThanOrEqual(metrics.decision_confidence);
    
    const satisfactionText = await this.page.locator('[data-testid="stakeholder-satisfaction"]').textContent();
    expect(parseInt(satisfactionText!)).toBeGreaterThanOrEqual(metrics.stakeholder_satisfaction);
  }

  async completeNPSSurvey(survey: NPSSurvey): Promise<void> {
    await this.page.click('[data-testid="nps-survey"]');
    await this.page.click(`[data-testid="nps-score-${survey.score}"]`);
    await this.page.fill('[data-testid="nps-feedback"]', survey.feedback);
    
    for (const request of survey.feature_requests) {
      await this.page.check(`[data-testid="feature-request-${request.toLowerCase().replace(/\s+/g, '-')}"]`);
    }
    
    await this.page.click('[data-testid="submit-nps"]');
    await expect(this.page.locator('[data-testid="nps-success"]')).toBeVisible();
  }

  // === ENTERPRISE-SPECIFIC HELPERS ===

  async verifyRoleBasedAccess(role: string): Promise<void> {
    const roleElements = await this.page.locator(`[data-testid="${role}-access"]`).count();
    expect(roleElements).toBeGreaterThan(0);
    
    // Verify restricted areas are not accessible
    const restrictedElements = await this.page.locator('[data-testid="admin-only"]').count();
    if (role !== 'admin') {
      expect(restrictedElements).toBe(0);
    }
  }

  async validateStakeholderViews(stakeholders: Array<{ stakeholder: string; focus: string; metrics: string }>): Promise<void> {
    for (const stakeholder of stakeholders) {
      await this.page.click(`[data-testid="view-${stakeholder.stakeholder.toLowerCase()}"]`);
      await expect(this.page.locator(`[data-testid="${stakeholder.focus}"]`)).toBeVisible();
      await expect(this.page.locator(`[data-testid="${stakeholder.metrics}"]`)).toBeVisible();
    }
  }

  // === UTILITY METHODS ===

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  async completeCelebration(celebrationType: string): Promise<void> {
    await expect(this.page.locator(`[data-testid="celebration-${celebrationType}"]`)).toBeVisible();
    await this.page.click('[data-testid="celebration-acknowledge"]');
    await expect(this.page.locator(`[data-testid="celebration-${celebrationType}"]`)).not.toBeVisible();
  }

  async usePrebuiltTemplate(templateData: { template: string; context: string }): Promise<void> {
    await this.page.click('[data-testid="use-template"]');
    await this.page.click(`[data-testid="template-${templateData.template}"]`);
    await this.page.selectOption('[data-testid="template-context"]', templateData.context);
    await this.page.click('[data-testid="apply-template"]');
  }

  // === MOBILE HELPERS ===

  async testSwipeNavigation(sections: string[]): Promise<void> {
    for (let i = 0; i < sections.length - 1; i++) {
      await this.page.touchscreen.swipe(200, 300, 50, 300);
      await expect(this.page.locator(`[data-testid="${sections[i + 1]}-section"]`)).toBeVisible();
    }
  }

  async completeMobileAnalysis(data: { question: string; context: string }): Promise<void> {
    await this.page.fill('[data-testid="mobile-question"]', data.question);
    await this.page.tap('[data-testid="mobile-generate"]');
    await this.waitForAIProcessing();
  }

  async verifyMobileNotifications(settings: any): Promise<void> {
    await expect(this.page.locator('[data-testid="push-notifications"]')).toBeChecked();
    await expect(this.page.locator('[data-testid="in-app-frequency"]')).toHaveValue(settings.in_app_frequency);
  }

  // === VALIDATION HELPERS ===

  async validateSync(syncData: any): Promise<void> {
    await expect(this.page.locator('[data-testid="sync-status"]')).toContainText('Active');
    await expect(this.page.locator('[data-testid="sync-success-rate"]')).toContainText('99%');
  }

  async setupSlackIntegration(slackData: any): Promise<void> {
    await this.page.click('[data-testid="setup-slack"]');
    
    for (const channel of slackData.channels) {
      await this.page.fill('[data-testid="slack-channel"]', channel);
      await this.page.click('[data-testid="add-channel"]');
    }
    
    await this.page.click('[data-testid="save-slack-integration"]');
    await expect(this.page.locator('[data-testid="slack-connected"]')).toBeVisible();
  }
}