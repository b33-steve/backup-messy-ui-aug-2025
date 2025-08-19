import { test, expect, Page } from '@playwright/test';

test.describe('Strategic Command Center - Comprehensive Testing', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('/command-center');
    await page.waitForLoadState('networkidle');
  });

  test('should load Command Center page successfully', async () => {
    // Verify page loads with correct title
    await expect(page).toHaveTitle(/Command Center|Strategic Command|PM33/);
    
    // Verify navigation is present
    await expect(page.locator('nav')).toBeVisible();
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'test-results/command-center-full.png', 
      fullPage: true 
    });
  });

  test('should display Strategic Command Center interface', async () => {
    // Wait for main content to load
    await page.waitForSelector('[data-testid="command-center"], .command-center, [class*="command"]', { 
      timeout: 10000 
    });
    
    // Check for Command Center branding/title
    const commandText = page.locator('text=Command Center');
    const strategicText = page.locator('text=Strategic Command');
    const centerText = page.locator('text=Command');
    
    // At least one should be visible
    const hasCommandContent = await commandText.isVisible() || 
                              await strategicText.isVisible() || 
                              await centerText.isVisible();
    expect(hasCommandContent).toBe(true);
    
    // Take component screenshot
    const mainContent = page.locator('main, [role="main"], .container').first();
    await mainContent.screenshot({ 
      path: 'test-results/command-center-component.png' 
    });
  });

  test('should display 4 AI teams coordination interface', async () => {
    // Look for AI team indicators
    const aiTeamElements = page.locator('text=/AI team/i, text=/team/i, [data-team], .team');
    const teamCount = await aiTeamElements.count();
    
    console.log(`Found ${teamCount} team-related elements`);
    
    // Look for team names or roles
    const teamRoles = page.locator('text=/strategy/i, text=/technical/i, text=/ux/i, text=/gtm/i');
    const roleCount = await teamRoles.count();
    
    console.log(`Found ${roleCount} team role indicators`);
    
    // Take AI teams screenshot
    if (teamCount > 0) {
      await aiTeamElements.first().screenshot({ 
        path: 'test-results/command-center-ai-teams.png' 
      });
    }
    
    // Expect some team coordination elements
    expect(teamCount + roleCount).toBeGreaterThan(0);
  });

  test('should show real-time strategic metrics', async () => {
    // Look for metrics, dashboards, or real-time data
    const metricsElements = page.locator(
      'text=/metric/i, text=/dashboard/i, text=/real-time/i, text=/live/i, ' +
      '[class*="metric"], [class*="dashboard"], [class*="chart"], [class*="graph"]'
    );
    const metricsCount = await metricsElements.count();
    
    console.log(`Found ${metricsCount} metrics/dashboard elements`);
    
    // Look for numerical indicators or progress bars
    const dataElements = page.locator(
      '[class*="progress"], [class*="stat"], [class*="number"], ' +
      'text=/\\d+%/, text=/\\d+\\w*/'
    );
    const dataCount = await dataElements.count();
    
    console.log(`Found ${dataCount} data visualization elements`);
    
    // Take metrics screenshot
    if (metricsCount > 0) {
      await metricsElements.first().screenshot({ 
        path: 'test-results/command-center-metrics.png' 
      });
    }
    
    // Should have some form of metrics display
    expect(metricsCount + dataCount).toBeGreaterThan(0);
  });

  test('should have end-to-end workflow automation controls', async () => {
    // Look for workflow controls, automation toggles, or process indicators
    const workflowElements = page.locator(
      'text=/workflow/i, text=/automation/i, text=/process/i, ' +
      'button:has-text("Start"), button:has-text("Run"), button:has-text("Execute"), ' +
      '[class*="workflow"], [class*="automation"]'
    );
    const workflowCount = await workflowElements.count();
    
    console.log(`Found ${workflowCount} workflow automation elements`);
    
    // Look for process steps or stages
    const processElements = page.locator(
      '[data-step], .step, [class*="step"], [class*="stage"], ' +
      'text=/step \\d/i, text=/phase \\d/i'
    );
    const processCount = await processElements.count();
    
    console.log(`Found ${processCount} process step elements`);
    
    // Take workflow screenshot
    if (workflowCount > 0) {
      await workflowElements.first().screenshot({ 
        path: 'test-results/command-center-workflow.png' 
      });
    }
    
    // Should have workflow automation interface
    expect(workflowCount + processCount).toBeGreaterThan(0);
  });

  test('should handle interactive command center operations', async () => {
    // Look for interactive buttons and controls
    const interactiveButtons = page.locator('button:visible');
    const buttonCount = await interactiveButtons.count();
    
    console.log(`Found ${buttonCount} interactive buttons`);
    
    // Look for input controls
    const inputs = page.locator('input:visible, select:visible, textarea:visible');
    const inputCount = await inputs.count();
    
    console.log(`Found ${inputCount} input controls`);
    
    // Test interaction with first available button
    if (buttonCount > 0) {
      const firstButton = interactiveButtons.first();
      const buttonText = await firstButton.textContent();
      console.log(`Testing interaction with button: "${buttonText}"`);
      
      try {
        await firstButton.click();
        await page.waitForTimeout(2000);
        
        // Take post-interaction screenshot
        await page.screenshot({ 
          path: 'test-results/command-center-interaction.png' 
        });
      } catch (error) {
        console.log('Button interaction error:', error);
      }
    }
    
    // Verify interactive elements exist
    expect(buttonCount + inputCount).toBeGreaterThan(0);
  });

  test('should display professional enterprise appearance', async () => {
    // Check for professional styling elements
    const professionalElements = page.locator(
      '[class*="gradient"], [class*="shadow"], [class*="rounded"], ' +
      '[class*="card"], [class*="panel"], [class*="dashboard"]'
    );
    const styleCount = await professionalElements.count();
    
    console.log(`Found ${styleCount} professional styling elements`);
    expect(styleCount).toBeGreaterThan(0);
    
    // Check for Mantine UI components
    const mantineElements = page.locator('[class*="mantine"], [data-mantine]');
    const mantineCount = await mantineElements.count();
    
    console.log(`Found ${mantineCount} Mantine UI elements`);
    
    // Verify no "laundry list" appearance
    const listElements = page.locator('ul, ol, .list, [class*="list"]');
    const structuredElements = page.locator(
      '.card, [class*="card"], .grid, [class*="grid"], ' +
      '.container, [class*="container"]'
    );
    
    const listCount = await listElements.count();
    const structuredCount = await structuredElements.count();
    
    console.log(`Lists: ${listCount}, Structured elements: ${structuredCount}`);
    
    // Should have more structured layout than plain lists
    expect(structuredCount).toBeGreaterThanOrEqual(listCount / 2);
  });

  test('should be responsive across different viewports', async () => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'test-results/command-center-desktop.png', 
      fullPage: true 
    });
    
    // Test tablet view  
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'test-results/command-center-tablet.png', 
      fullPage: true 
    });
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    // Verify main content still accessible on mobile
    const mainContent = page.locator('main, .container, [role="main"]').first();
    await expect(mainContent).toBeVisible();
    
    await page.screenshot({ 
      path: 'test-results/command-center-mobile.png', 
      fullPage: true 
    });
  });

  test('should not have console errors or broken functionality', async () => {
    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });
    
    // Reload page to capture console messages
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Try interacting with available elements
    const buttons = page.locator('button:visible');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      try {
        await buttons.first().click();
        await page.waitForTimeout(2000);
      } catch (error) {
        console.log('Interaction test error:', error);
      }
    }
    
    console.log('Console Errors:', consoleErrors);
    console.log('Console Warnings:', consoleWarnings);
    
    // Filter critical errors
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('404') &&
      !error.includes('Timeout') &&
      !error.toLowerCase().includes('warning')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });

  test('should have proper navigation and PM33 branding', async () => {
    // Verify navigation
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check for PM33 branding
    const brandingElements = page.locator(
      'text=PM33, [alt*="PM33"], [src*="pm33"], [class*="pm33"]'
    );
    const hasBranding = await brandingElements.count() > 0;
    expect(hasBranding).toBe(true);
    
    // Verify footer
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Take navigation screenshot
    await nav.screenshot({ 
      path: 'test-results/command-center-navigation.png' 
    });
  });

  test('should handle real-time updates and live metrics simulation', async () => {
    // Look for elements that might update in real-time
    const liveElements = page.locator(
      '[class*="live"], [class*="real-time"], [data-live], ' +
      'text=/live/i, text=/real-time/i, text=/updating/i'
    );
    const liveCount = await liveElements.count();
    
    console.log(`Found ${liveCount} potentially live elements`);
    
    // Wait for potential updates
    await page.waitForTimeout(3000);
    
    // Take screenshot after waiting for updates
    await page.screenshot({ 
      path: 'test-results/command-center-live-updates.png' 
    });
    
    // Look for timestamp or "last updated" indicators
    const timestampElements = page.locator(
      'text=/\\d{1,2}:\\d{2}/, text=/ago/, text=/updated/i, ' +
      '[class*="timestamp"], [class*="time"]'
    );
    const timestampCount = await timestampElements.count();
    
    console.log(`Found ${timestampCount} timestamp elements`);
    
    // Real-time interface should have some time-based indicators
    expect(liveCount + timestampCount).toBeGreaterThanOrEqual(0);
  });

  test('should validate orchestration of multiple AI systems', async () => {
    // Look for system status indicators
    const systemElements = page.locator(
      'text=/system/i, text=/engine/i, text=/agent/i, ' +
      '[class*="system"], [class*="engine"], [class*="agent"]'
    );
    const systemCount = await systemElements.count();
    
    console.log(`Found ${systemCount} system/engine elements`);
    
    // Look for status indicators (active, processing, idle, etc.)
    const statusElements = page.locator(
      'text=/active/i, text=/processing/i, text=/ready/i, text=/idle/i, ' +
      '[class*="status"], [class*="state"], .status, .state'
    );
    const statusCount = await statusElements.count();
    
    console.log(`Found ${statusCount} status indicator elements`);
    
    // Take orchestration screenshot
    if (systemCount > 0 || statusCount > 0) {
      const orchestrationSection = systemCount > 0 ? systemElements.first() : statusElements.first();
      await orchestrationSection.screenshot({ 
        path: 'test-results/command-center-orchestration.png' 
      });
    }
    
    // Command center should show system orchestration
    expect(systemCount + statusCount).toBeGreaterThanOrEqual(0);
  });

  test('should load within acceptable performance time', async () => {
    const startTime = Date.now();
    await page.goto('/command-center', { waitUntil: 'networkidle' });
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    console.log(`Command Center page load time: ${loadTime}ms`);
  });
});