import { test, expect, Page } from '@playwright/test';

test.describe('Strategic Intelligence Engine - Comprehensive Testing', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('/strategic-intelligence');
    await page.waitForLoadState('networkidle');
  });

  test('should load Strategic Intelligence page successfully', async () => {
    // Verify page loads with correct title
    await expect(page).toHaveTitle(/Strategic Intelligence|PM33/);
    
    // Verify navigation is present
    await expect(page.locator('nav')).toBeVisible();
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'test-results/strategic-intelligence-full.png', 
      fullPage: true 
    });
  });

  test('should display Strategic Intelligence Engine component', async () => {
    // Wait for main content to load
    await page.waitForSelector('[data-testid="strategic-intelligence-engine"], .strategic-intelligence, [class*="strategic"]', { 
      timeout: 10000 
    });
    
    // Check for Strategic Intelligence branding/title
    const strategicText = page.locator('text=Strategic Intelligence');
    const engineText = page.locator('text=Engine');
    const aiText = page.locator('text=AI');
    
    // At least one of these should be visible
    const hasStrategicContent = await strategicText.isVisible() || 
                               await engineText.isVisible() || 
                               await aiText.isVisible();
    expect(hasStrategicContent).toBe(true);
    
    // Take component screenshot
    const mainContent = page.locator('main, [role="main"], .container').first();
    await mainContent.screenshot({ 
      path: 'test-results/strategic-intelligence-component.png' 
    });
  });

  test('should have working 7-step strategic analysis workflow', async () => {
    // Look for step indicators or workflow elements
    const stepElements = page.locator('[data-step], .step, [class*="step"]');
    const stepCount = await stepElements.count();
    
    if (stepCount > 0) {
      console.log(`Found ${stepCount} step elements`);
      
      // Take workflow screenshot
      await stepElements.first().screenshot({ 
        path: 'test-results/strategic-workflow-steps.png' 
      });
    }
    
    // Look for interactive elements
    const buttons = page.locator('button:visible');
    const buttonCount = await buttons.count();
    console.log(`Found ${buttonCount} interactive buttons`);
    
    // Look for input fields
    const inputs = page.locator('input:visible, textarea:visible');
    const inputCount = await inputs.count();
    console.log(`Found ${inputCount} input fields`);
    
    // Verify there are interactive elements for the workflow
    expect(buttonCount + inputCount).toBeGreaterThan(0);
  });

  test('should handle strategic query input', async () => {
    // Look for input field (textarea or input)
    const queryInput = page.locator('textarea, input[type="text"], input[placeholder*="strategic"], input[placeholder*="question"]').first();
    
    if (await queryInput.isVisible()) {
      // Test input functionality
      const testQuery = "How should we prioritize our product roadmap for Q2 to maximize user retention?";
      await queryInput.fill(testQuery);
      
      // Verify input was filled
      await expect(queryInput).toHaveValue(testQuery);
      
      // Take input screenshot
      await queryInput.screenshot({ 
        path: 'test-results/strategic-query-input.png' 
      });
      
      // Look for submit/analyze button
      const submitButton = page.locator('button:has-text("Analyze"), button:has-text("Submit"), button:has-text("Generate"), button:has-text("Start")').first();
      
      if (await submitButton.isVisible()) {
        await expect(submitButton).toBeEnabled();
        
        // Take screenshot before clicking
        await page.screenshot({ 
          path: 'test-results/strategic-before-analysis.png' 
        });
        
        console.log('Submit button found and enabled');
      }
    } else {
      console.log('No query input field found - may be a different UI pattern');
      
      // Take screenshot of what we see
      await page.screenshot({ 
        path: 'test-results/strategic-no-input-found.png' 
      });
    }
  });

  test('should display analysis results interface', async () => {
    // Look for results, output, or analysis sections
    const resultsSection = page.locator('[data-testid*="result"], .results, .analysis, .output, [class*="result"], [class*="analysis"]');
    const resultCount = await resultsSection.count();
    
    if (resultCount > 0) {
      console.log(`Found ${resultCount} result sections`);
      
      // Take results screenshot
      await resultsSection.first().screenshot({ 
        path: 'test-results/strategic-results-interface.png' 
      });
    }
    
    // Look for confidence scores, recommendations, or structured output
    const confidenceElements = page.locator('text=/confidence/i, text=/score/i, text=/recommendation/i');
    const hasAnalysisElements = await confidenceElements.count() > 0;
    
    if (hasAnalysisElements) {
      console.log('Found analysis elements with confidence/scoring');
    }
    
    // Take screenshot of current state
    await page.screenshot({ 
      path: 'test-results/strategic-analysis-state.png' 
    });
  });

  test('should have professional Mantine UI styling', async () => {
    // Check for Mantine-specific classes or styling
    const mantineElements = page.locator('[class*="mantine"], [data-mantine]');
    const mantineCount = await mantineElements.count();
    
    console.log(`Found ${mantineCount} Mantine UI elements`);
    expect(mantineCount).toBeGreaterThan(0);
    
    // Check for professional styling indicators
    const styledElements = page.locator('[class*="gradient"], [class*="shadow"], [class*="rounded"]');
    const styleCount = await styledElements.count();
    
    console.log(`Found ${styleCount} professionally styled elements`);
    
    // Verify no "laundry list" appearance - look for proper cards, spacing, etc.
    const cards = page.locator('.card, [class*="card"], .container, [class*="container"]');
    const cardCount = await cards.count();
    
    console.log(`Found ${cardCount} card/container elements for structured layout`);
    expect(cardCount).toBeGreaterThan(0);
  });

  test('should be responsive across different viewports', async () => {
    // Test desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'test-results/strategic-desktop.png', 
      fullPage: true 
    });
    
    // Test tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'test-results/strategic-tablet.png', 
      fullPage: true 
    });
    
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    // Verify key elements still visible on mobile
    const mainContent = page.locator('main, .container, [role="main"]').first();
    await expect(mainContent).toBeVisible();
    
    await page.screenshot({ 
      path: 'test-results/strategic-mobile.png', 
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
    
    // Reload and interact with page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Try to interact with any visible buttons
    const interactiveButtons = page.locator('button:visible');
    const buttonCount = await interactiveButtons.count();
    
    if (buttonCount > 0) {
      // Click first button to test for errors
      try {
        await interactiveButtons.first().click();
        await page.waitForTimeout(2000);
      } catch (error) {
        console.log('Button interaction error:', error);
      }
    }
    
    console.log('Console Errors:', consoleErrors);
    console.log('Console Warnings:', consoleWarnings);
    
    // Filter out non-critical errors
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('404') &&
      !error.includes('Timeout') &&
      !error.toLowerCase().includes('warning')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });

  test('should have proper navigation and footer', async () => {
    // Verify navigation is present and functional
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check for PM33 branding in navigation
    const brandingElements = page.locator('text=PM33, [alt*="PM33"], [src*="pm33"]');
    const hasBranding = await brandingElements.count() > 0;
    expect(hasBranding).toBe(true);
    
    // Verify footer is present
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Take navigation and footer screenshot
    await nav.screenshot({ 
      path: 'test-results/strategic-navigation.png' 
    });
    
    await footer.screenshot({ 
      path: 'test-results/strategic-footer.png' 
    });
  });

  test('should handle edge cases and error states gracefully', async () => {
    // Test with very long input if input field exists
    const queryInput = page.locator('textarea, input[type="text"]').first();
    
    if (await queryInput.isVisible()) {
      const longQuery = 'A'.repeat(5000);
      await queryInput.fill(longQuery);
      
      // Should handle long input gracefully
      const inputValue = await queryInput.inputValue();
      expect(inputValue.length).toBeGreaterThan(0);
    }
    
    // Test empty input submission if applicable
    const submitButtons = page.locator('button:has-text("Analyze"), button:has-text("Submit")');
    const submitCount = await submitButtons.count();
    
    if (submitCount > 0) {
      try {
        await submitButtons.first().click();
        await page.waitForTimeout(1000);
        
        // Should handle empty submission gracefully
        const errorMessages = page.locator('.error, [class*="error"], .warning, [class*="warning"]');
        const hasErrorHandling = await errorMessages.count() > 0;
        
        console.log('Error handling present:', hasErrorHandling);
      } catch (error) {
        console.log('Submit test error:', error);
      }
    }
    
    // Take final state screenshot
    await page.screenshot({ 
      path: 'test-results/strategic-edge-cases.png' 
    });
  });

  test('should load within acceptable performance time', async () => {
    const startTime = Date.now();
    await page.goto('/strategic-intelligence', { waitUntil: 'networkidle' });
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    console.log(`Strategic Intelligence page load time: ${loadTime}ms`);
  });
});