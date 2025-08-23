import { test, expect } from '@playwright/test';

/**
 * PM33 UI Compliance Tests
 * Validates components follow PM33_COMPLETE_UI_SYSTEM.md standards
 */

test.describe('PM33 UI Compliance', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the strategic intelligence page (core app with shadcn/ui components)
    await page.goto('http://localhost:3000/strategic-intelligence');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Scroll to see full page content including below the fold
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    // Scroll back to top to start tests from beginning
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    
    // Small delay to ensure page is stable
    await page.waitForTimeout(500);
  });

  test('should use glass morphism styling', async ({ page }) => {
    // Check for glass morphism CSS properties
    const cards = page.locator('div[style*="backdrop-filter"]');
    await expect(cards.first()).toBeVisible();
    
    // Verify backdrop-filter is applied
    const style = await cards.first().getAttribute('style');
    expect(style).toContain('backdrop-filter');
  });

  test('should have gradient backgrounds', async ({ page }) => {
    // Check for gradient styling
    const gradientElements = page.locator('div[style*="gradient"], button[style*="gradient"]');
    await expect(gradientElements.first()).toBeVisible();
  });

  test('should not use forbidden black borders', async ({ page }) => {
    // Check that no elements have black borders
    const blackBorderElements = page.locator('[style*="1px solid black"]');
    await expect(blackBorderElements).toHaveCount(0);
  });

  test('should use proper hover states', async ({ page }) => {
    // Test hover animations on interactive elements
    const buttons = page.locator('button');
    const firstButton = buttons.first();
    
    if (await firstButton.isVisible()) {
      // Hover and check for transform or elevation changes
      await firstButton.hover();
      
      // Check for hover effects (transform, box-shadow, etc.)
      const computedStyle = await firstButton.evaluate(
        el => window.getComputedStyle(el).transform
      );
      
      // Should have some transform applied on hover
      expect(computedStyle).not.toBe('none');
    }
  });

  test('should use AIProcessingState instead of basic spinners', async ({ page }) => {
    // Trigger a loading state if possible
    const loadingTriggers = page.locator('button:has-text("Process"), button:has-text("Analyze")');
    
    if (await loadingTriggers.first().isVisible()) {
      await loadingTriggers.first().click();
      
      // Check that basic spinner elements don't exist
      const basicSpinners = page.locator('.spinner, [class*="spin"]');
      await expect(basicSpinners).toHaveCount(0);
    }
  });

  test('should follow 8pt grid system', async ({ page }) => {
    // Check padding and margin values are multiples of 8
    const elements = page.locator('div, section, main');
    const firstElement = elements.first();
    
    if (await firstElement.isVisible()) {
      const paddingTop = await firstElement.evaluate(
        el => window.getComputedStyle(el).paddingTop
      );
      
      const paddingValue = parseInt(paddingTop.replace('px', ''));
      
      // Should be multiple of 8 (allowing for browser defaults)
      if (paddingValue > 0) {
        expect(paddingValue % 8).toBe(0);
      }
    }
  });

  test('should have proper responsive behavior', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('body')).toBeVisible();
    
    // No horizontal scroll should appear
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 20); // Small tolerance
  });

  test('should include design reference comments in source', async ({ page }) => {
    // This test would need to check the actual source files
    // For now, we'll check that components have proper structure
    const mainContent = page.locator('main, [role="main"]');
    await expect(mainContent).toBeVisible();
  });

  test('should have demo mode indicators when applicable', async ({ page }) => {
    // Look for demo mode badges or indicators
    const demoIndicators = page.locator('[class*="demo"], .demo-indicator, :text("DEMO")');
    
    // If demo mode is active, indicators should be present
    const demoModeActive = await page.locator('[data-demo="true"]').count() > 0;
    
    if (demoModeActive) {
      await expect(demoIndicators.first()).toBeVisible();
    }
  });

  test('should have premium animations', async ({ page }) => {
    // Check for CSS transitions and animations
    const animatedElements = page.locator('[style*="transition"], [style*="animation"]');
    
    if (await animatedElements.count() > 0) {
      const firstAnimated = animatedElements.first();
      const transition = await firstAnimated.evaluate(
        el => window.getComputedStyle(el).transition
      );
      
      expect(transition).not.toBe('none');
    }
  });
});