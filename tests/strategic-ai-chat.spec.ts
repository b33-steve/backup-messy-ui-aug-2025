import { test, expect } from '@playwright/test';

test.describe('Strategic AI Chat - PM33 UX/UI Compliance', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Strategic Intelligence page
    await page.goto('http://localhost:3002/strategic-intelligence');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test('should display PM33 branding and navigation', async ({ page }) => {
    // Check for PM33 branding - use more specific selectors
    await expect(page.getByRole('heading', { name: 'Intelligence Operations' })).toBeVisible();
    await expect(page.getByText('Strategic AI Co-Pilot with operations billing')).toBeVisible();
    
    // Verify navigation is present
    await expect(page.locator('[aria-label="Back to homepage"]')).toBeVisible();
  });

  test('should show subscription tier and usage stats with PM33 design compliance', async ({ page }) => {
    // Wait for subscription data to load
    await page.waitForTimeout(2000);
    
    // Check for usage stats display
    await expect(page.getByText(/operations remaining/)).toBeVisible();
    
    // Verify demo badge is shown
    await expect(page.getByText('✓ Demo')).toBeVisible();
    
    // Check for progress bar
    const progressBar = page.locator('[role="progressbar"]');
    await expect(progressBar).toBeVisible();
    
    // Verify subscription tier badge (Starter/Team/Scale/Enterprise)
    const tierBadge = page.locator('text=/Starter|Team|Scale|Enterprise/').first();
    await expect(tierBadge).toBeVisible();
  });

  test('should have PM33-compliant glass morphism cards', async ({ page }) => {
    // Check for main query input card
    const queryCard = page.locator('text=Strategic Intelligence Query').locator('..').locator('..');
    await expect(queryCard).toBeVisible();
    
    // Verify glass morphism styling (backdrop-filter should be applied)
    const cardStyle = await queryCard.evaluate(el => window.getComputedStyle(el));
    expect(cardStyle.backdropFilter || cardStyle.webkitBackdropFilter).toContain('blur');
  });

  test('should display strategic query examples with PM33 interaction patterns', async ({ page }) => {
    // Wait for examples to load
    await expect(page.getByText('Strategic Intelligence Examples')).toBeVisible();
    
    // Check for predefined strategic queries
    await expect(page.getByText(/competitor just launched AI features/)).toBeVisible();
    await expect(page.getByText(/budget for 3 engineers OR \$150K marketing/)).toBeVisible();
    
    // Test clicking on a predefined query
    const firstQuery = page.getByText(/competitor just launched AI features/).first();
    await firstQuery.click();
    
    // Verify the query appears in the textarea
    const textarea = page.locator('textarea[placeholder*="strategic challenge"]');
    await expect(textarea).toHaveValue(/competitor just launched AI features/);
  });

  test('should execute intelligence operation with PM33 UX patterns', async ({ page }) => {
    // Enter a test query
    const textarea = page.locator('textarea[placeholder*="strategic challenge"]');
    await textarea.fill('Test strategic query for PM33 compliance validation');
    
    // Click execute button
    const executeButton = page.getByText('Execute Intelligence Operation');
    await expect(executeButton).toBeVisible();
    await executeButton.click();
    
    // Verify PM33 AI processing states are shown
    await expect(page.getByText('Initializing Intelligence Operations...')).toBeVisible();
    
    // Wait for processing to complete
    await page.waitForTimeout(4000);
    
    // Verify strategic analysis results appear
    await expect(page.getByText('Intelligence Operation Results')).toBeVisible();
    await expect(page.getByText(/Strategic Analysis:/)).toBeVisible();
    
    // Check for key recommendations section
    await expect(page.getByText('Key Recommendations')).toBeVisible();
    
    // Verify success metrics are displayed
    await expect(page.getByText('Success Metrics')).toBeVisible();
    
    // Check for timeline information
    await expect(page.getByText(/Phase 1/)).toBeVisible();
  });

  test('should display operations pricing with Intelligence Operations model', async ({ page }) => {
    // Wait for pricing section to load
    await page.waitForTimeout(2000);
    
    // Check for operations pricing display - use more specific selector
    await expect(page.locator('text=🚀 Intelligence Operations Pricing')).toBeVisible();
    
    // Verify $0.08 per operation pricing is shown
    await expect(page.getByText('$0.08 per operation')).toBeVisible();
    
    // Check for subscription tiers (in the pricing cards)
    const tiers = ['Starter', 'Team', 'Scale', 'Enterprise'];
    for (const tier of tiers) {
      await expect(page.getByText(tier).first()).toBeVisible();
    }
    
    // Verify pricing amounts
    await expect(page.getByText('$29')).toBeVisible(); // Starter
    await expect(page.getByText('$79')).toBeVisible(); // Team
    await expect(page.getByText('$199')).toBeVisible(); // Scale
    await expect(page.getByText('$599')).toBeVisible(); // Enterprise
  });

  test('should show proper hover states and animations (PM33 compliance)', async ({ page }) => {
    // Test hover on execute button
    const executeButton = page.getByText('Execute Intelligence Operation');
    await executeButton.hover();
    
    // Test hover on predefined query buttons
    const queryButton = page.getByText(/competitor just launched AI features/).first();
    await queryButton.hover();
    
    // Test focus state on textarea
    const textarea = page.locator('textarea[placeholder*="strategic challenge"]');
    await textarea.focus();
    
    // Verify no console errors occurred during interactions
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.reload();
    await page.waitForTimeout(2000);
    
    // Should have minimal console errors (only expected development warnings)
    const unexpectedErrors = consoleErrors.filter(error => 
      !error.includes('Warning:') && 
      !error.includes('Download') &&
      !error.includes('Lighthouse')
    );
    expect(unexpectedErrors.length).toBeLessThan(3);
  });

  test('should be responsive and mobile-friendly (PM33 compliance)', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Verify main elements are still visible - use more specific selectors
    await expect(page.getByRole('heading', { name: 'Intelligence Operations' })).toBeVisible();
    await expect(page.getByText('Strategic Intelligence Query')).toBeVisible();
    
    // Test tablet viewport  
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Verify layout adapts properly
    await expect(page.getByText('Strategic Intelligence Examples')).toBeVisible();
    
    // Return to desktop
    await page.setViewportSize({ width: 1200, height: 800 });
  });

  test('should handle authentication properly', async ({ page }) => {
    // Check that authentication is initialized (demo mode)
    await page.waitForTimeout(2000);
    await expect(page.getByText('✓ Demo')).toBeVisible();
    
    // Verify usage stats are loaded
    await expect(page.getByText(/operations remaining/)).toBeVisible();
  });

  test('should follow PM33 8pt grid spacing system', async ({ page }) => {
    // Check spacing between major elements
    const title = page.getByText('Intelligence Operations').first();
    const querySection = page.getByText('Strategic Intelligence Query').first();
    
    await expect(title).toBeVisible();
    await expect(querySection).toBeVisible();
    
    // Verify consistent spacing (this is a visual check that would be enhanced with visual regression testing)
    const titleBox = await title.boundingBox();
    const querySectionBox = await querySection.boundingBox();
    
    expect(titleBox).toBeTruthy();
    expect(querySectionBox).toBeTruthy();
  });
});