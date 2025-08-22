// tests/e2e/user-journeys/startup-pm-journey.spec.ts
// End-to-end testing for Startup PM user journey - from onboarding to PMO transformation
// Tests the complete workflow for early-stage startup Product Managers
// RELEVANT FILES: onboarding-flow.spec.ts, strategic-intelligence.spec.ts, communication-ai-team.spec.ts

import { test, expect } from '@playwright/test';
import { UserJourneyHelper } from '../helpers/user-journey-helper';
import { TestDataManager } from '../helpers/test-data-manager';
import { PerformanceMonitor } from '../helpers/performance-monitor';
import { AccessibilityChecker } from '../helpers/accessibility-checker';

test.describe('Startup PM User Journey', () => {
  let journeyHelper: UserJourneyHelper;
  let testData: TestDataManager;
  let perfMonitor: PerformanceMonitor;
  let a11yChecker: AccessibilityChecker;

  test.beforeEach(async ({ page }) => {
    journeyHelper = new UserJourneyHelper(page);
    testData = new TestDataManager();
    perfMonitor = new PerformanceMonitor(page);
    a11yChecker = new AccessibilityChecker(page);

    // Start performance monitoring
    await perfMonitor.startMonitoring();
    
    // Navigate to application
    await page.goto('/');
    
    // Verify page loads within performance budget
    await perfMonitor.assertPageLoadTime(2000); // 2s max
  });

  test.afterEach(async () => {
    await perfMonitor.generateReport();
  });

  test('Complete startup PM transformation journey', async ({ page }) => {
    // Test covers the full user journey from discovery to PMO capabilities
    test.slow(); // Mark as slow test due to comprehensive coverage

    // === PHASE 1: DISCOVERY & ONBOARDING ===
    await test.step('Phase 1: Discovery and Initial Setup', async () => {
      // Landing page engagement
      await expect(page.locator('h1')).toContainText('PM33');
      await a11yChecker.checkPageCompliance();
      
      // Value proposition resonance for startup PMs
      await expect(page.locator('[data-testid="startup-pm-value-prop"]')).toBeVisible();
      await journeyHelper.takeScreenshot('startup-landing-page');
      
      // Demo interaction
      await page.click('[data-testid="interactive-demo"]');
      await perfMonitor.assertInteractionTime('demo-load', 1500);
      
      // Pricing validation for startup budget
      await page.click('[data-testid="pricing-link"]');
      await expect(page.locator('[data-testid="startup-pricing"]')).toBeVisible();
      await expect(page.locator('[data-testid="pricing-startup"]')).toContainText('$99');
      
      // Sign up flow
      await page.click('[data-testid="signup-startup"]');
      await journeyHelper.fillOnboardingForm({
        role: 'Product Manager',
        company_size: 'Startup (1-50)',
        experience_level: '2-5 years',
        primary_challenge: 'Need PMO capabilities without budget for team',
        tools_used: ['Notion', 'Linear', 'Slack']
      });
    });

    // === PHASE 2: STRATEGIC INTELLIGENCE DISCOVERY ===
    await test.step('Phase 2: Strategic Intelligence Adoption', async () => {
      // Dashboard first impression
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
      await a11yChecker.checkPageCompliance();
      
      // Guided tour for startup context
      await page.click('[data-testid="guided-tour"]');
      await journeyHelper.completeTour(['strategic-analysis', 'ai-teams', 'workflow-automation']);
      
      // First strategic analysis (critical moment)
      await page.click('[data-testid="strategic-intelligence"]');
      await perfMonitor.assertPageLoadTime(1500);
      
      await journeyHelper.createStrategicAnalysis({
        question: 'Should we prioritize user acquisition or product features for Series A?',
        framework: 'RICE',
        context: await testData.getStartupContext(),
        urgency: 'high'
      });
      
      // AI processing experience
      await journeyHelper.waitForAIProcessing();
      await expect(page.locator('[data-testid="analysis-results"]')).toBeVisible();
      
      // Value realization moment
      await expect(page.locator('[data-testid="quick-win-notification"]')).toBeVisible();
      await journeyHelper.verifyQuickWin({
        title: 'Strategic Analysis Complete',
        time_saved: '4.5 hours',
        confidence: '85%'
      });
    });

    // === PHASE 3: AI TEAMS UTILIZATION ===
    await test.step('Phase 3: Multi-AI Team Coordination', async () => {
      // Communication AI Team adoption
      await page.click('[data-testid="communication-ai"]');
      
      // Executive summary for investor updates
      await journeyHelper.generateExecutiveSummary({
        analysis_source: 'Series A Prioritization Analysis',
        timeframe: 'monthly',
        audience: 'investors',
        focus_areas: ['traction_metrics', 'product_roadmap', 'market_opportunity']
      });
      
      await perfMonitor.assertProcessingTime('executive-summary', 8000);
      
      // Team update for startup team alignment
      await journeyHelper.createTeamUpdate({
        team: 'Product Team',
        achievements: ['Completed user research', 'Shipped 3 key features'],
        challenges: ['Limited resources', 'Technical debt'],
        next_steps: ['Focus on Series A metrics', 'Hire senior engineer']
      });
      
      // Workflow automation setup
      await page.click('[data-testid="workflow-execution"]');
      await journeyHelper.setupWorkflowAutomation({
        pm_tool: 'Linear',
        integration_type: 'api_sync',
        automation_level: 'high'
      });
    });

    // === PHASE 4: PMO TRANSFORMATION VALIDATION ===
    await test.step('Phase 4: PMO Capabilities Demonstration', async () => {
      // Cross-team alignment dashboard
      await page.click('[data-testid="alignment-dashboard"]');
      await expect(page.locator('[data-testid="alignment-score"]')).toBeVisible();
      
      // Verify PMO-level insights
      const alignmentScore = await page.locator('[data-testid="alignment-percentage"]').textContent();
      expect(parseInt(alignmentScore!)).toBeGreaterThan(75); // PMO-level coordination
      
      // Data intelligence utilization
      await journeyHelper.reviewDataIntelligence({
        metrics: ['user_growth', 'feature_adoption', 'team_velocity'],
        insights: ['user_growth_trend', 'feature_success_correlation'],
        predictions: ['next_quarter_growth', 'resource_needs']
      });
      
      // Export capabilities for stakeholder communication
      await journeyHelper.exportAnalysis({
        format: 'pdf',
        audience: 'investors',
        branding: true
      });
      
      await perfMonitor.assertExportTime('pdf-generation', 5000);
    });

    // === PHASE 5: SUCCESS METRICS & RETENTION ===
    await test.step('Phase 5: Value Realization and Retention', async () => {
      // Achievement system validation
      await page.click('[data-testid="achievements"]');
      await expect(page.locator('[data-testid="pmo-transformation-achievement"]')).toBeVisible();
      
      // Time savings calculation
      const timeSaved = await page.locator('[data-testid="total-time-saved"]').textContent();
      expect(parseInt(timeSaved!.split(' ')[0])).toBeGreaterThan(10); // >10 hours saved
      
      // Strategic impact metrics
      await journeyHelper.verifyImpactMetrics({
        strategic_alignment: 85,
        team_efficiency: 40,
        decision_confidence: 90,
        stakeholder_satisfaction: 80
      });
      
      // Subscription upgrade consideration
      await page.click('[data-testid="upgrade-prompt"]');
      await expect(page.locator('[data-testid="growth-plan"]')).toBeVisible();
      
      // Feature adoption tracking
      await journeyHelper.verifyFeatureAdoption({
        strategic_intelligence: 'daily',
        communication_ai: 'weekly',
        workflow_automation: 'continuous',
        data_intelligence: 'weekly'
      });
      
      // NPS survey completion
      await journeyHelper.completeNPSSurvey({
        score: 9,
        feedback: 'PM33 gave me PMO superpowers without hiring a team',
        feature_requests: ['Slack integration', 'Mobile app']
      });
    });

    // === PERFORMANCE & ACCESSIBILITY VALIDATION ===
    await test.step('Performance and Accessibility Validation', async () => {
      // Overall performance metrics
      const performanceReport = await perfMonitor.getMetrics();
      expect(performanceReport.averagePageLoad).toBeLessThan(2000);
      expect(performanceReport.averageInteractionTime).toBeLessThan(1000);
      
      // Accessibility compliance
      const a11yResults = await a11yChecker.getComplianceReport();
      expect(a11yResults.score).toBeGreaterThan(95);
      expect(a11yResults.violations).toHaveLength(0);
      
      // Core Web Vitals
      const webVitals = await perfMonitor.getCoreWebVitals();
      expect(webVitals.LCP).toBeLessThan(2.5); // Largest Contentful Paint
      expect(webVitals.FID).toBeLessThan(100); // First Input Delay
      expect(webVitals.CLS).toBeLessThan(0.1); // Cumulative Layout Shift
    });
  });

  test('Startup PM quick value realization path', async ({ page }) => {
    // Focused test for the critical "aha moment" within first session
    
    await test.step('Rapid onboarding to first value', async () => {
      // Skip tour, go straight to strategic analysis
      await page.click('[data-testid="skip-tour"]');
      await page.click('[data-testid="strategic-intelligence"]');
      
      // Use quick start template
      await page.click('[data-testid="startup-template"]');
      await journeyHelper.usePrebuiltTemplate({
        template: 'startup_prioritization',
        context: 'pre_series_a'
      });
      
      // Generate analysis in under 30 seconds
      const startTime = Date.now();
      await page.click('[data-testid="generate-analysis"]');
      await journeyHelper.waitForAIProcessing();
      
      const processingTime = Date.now() - startTime;
      expect(processingTime).toBeLessThan(30000); // Under 30 seconds for quick value
      
      // Verify immediate value
      await expect(page.locator('[data-testid="strategic-recommendations"]')).toBeVisible();
      await expect(page.locator('[data-testid="quick-win-badge"]')).toContainText('4.5 hours saved');
      
      // First celebration moment
      await expect(page.locator('[data-testid="celebration-modal"]')).toBeVisible();
      await journeyHelper.completeCelebration('first_analysis');
    });
  });

  test('Startup PM mobile experience', async ({ page }) => {
    // Test mobile-specific user journey for on-the-go startup PMs
    
    await page.setViewportSize({ width: 375, height: 667 });
    
    await test.step('Mobile dashboard experience', async () => {
      await expect(page.locator('[data-testid="mobile-nav"]')).toBeVisible();
      await a11yChecker.checkMobileCompliance();
      
      // Swipe navigation
      await journeyHelper.testSwipeNavigation(['dashboard', 'strategic', 'communication', 'workflow']);
      
      // Mobile-optimized strategic analysis
      await page.click('[data-testid="quick-analysis-mobile"]');
      await journeyHelper.completeMobileAnalysis({
        question: 'Feature priority for next sprint?',
        context: 'mobile_optimized'
      });
      
      // Mobile notification experience
      await journeyHelper.verifyMobileNotifications({
        push_enabled: true,
        in_app_frequency: 'optimal',
        do_not_disturb: 'evening_hours'
      });
    });
  });

  test('Startup PM integration workflows', async ({ page }) => {
    // Test integration with common startup tools
    
    await test.step('Linear integration workflow', async () => {
      await page.click('[data-testid="integrations"]');
      await page.click('[data-testid="linear-integration"]');
      
      await journeyHelper.setupIntegration({
        tool: 'Linear',
        auth_method: 'api_key',
        sync_frequency: 'real_time',
        field_mapping: 'automatic'
      });
      
      // Sync validation
      await journeyHelper.validateSync({
        direction: 'bidirectional',
        data_types: ['issues', 'projects', 'labels'],
        success_rate: 0.99
      });
    });
    
    await test.step('Slack notification integration', async () => {
      await journeyHelper.setupSlackIntegration({
        channels: ['#product', '#leadership'],
        notification_types: ['strategic_insights', 'team_updates', 'celebrations'],
        frequency: 'important_only'
      });
    });
  });
});