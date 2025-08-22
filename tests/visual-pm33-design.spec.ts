import { test, expect } from '@playwright/test';

/**
 * MANDATORY PM33 Visual Design Tests
 * These tests validate the ACTUAL visual appearance matches PM33 standards
 * NO CODE CHANGES without these tests passing
 */

test.describe('PM33 Visual Design Standards', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('Page has correct PM33 gradient background with animated orbs', async ({ page }) => {
    // Take full page screenshot
    await expect(page).toHaveScreenshot('pm33-full-page.png');
    
    // Verify gradient background is visible
    const gradientBg = page.locator('div[style*="linear-gradient"]').first();
    await expect(gradientBg).toBeVisible();
    
    // Verify animated orbs are present
    const orb = page.locator('[style*="radial-gradient"]');
    await expect(orb).toBeVisible();
  });

  test('Glass morphism cards have correct visual appearance', async ({ page }) => {
    const cards = page.locator('.glass-card');
    if (await cards.count() > 0) {
      const firstCard = cards.first();
      
      // Take screenshot of card
      await expect(firstCard).toHaveScreenshot('pm33-glass-card.png');
      
      // Verify glass effects are applied
      const cardStyle = await firstCard.getAttribute('style');
      expect(cardStyle).toContain('backdrop-filter');
      expect(cardStyle).toContain('blur');
    }
  });

  test('Command Center has proper PM33 visual design', async ({ page }) => {
    const commandCenter = page.locator('.pm-command-center');
    if (await commandCenter.isVisible()) {
      // Take screenshot of command center
      await expect(commandCenter).toHaveScreenshot('pm33-command-center.png');
      
      // Verify gradient stats are visible
      const gradientStats = page.locator('[style*="gradient-to-br"]');
      expect(await gradientStats.count()).toBeGreaterThan(0);
    }
  });

  test('Buttons have gradient styling with proper hover effects', async ({ page }) => {
    const buttons = page.locator('.gradient-button');
    if (await buttons.count() > 0) {
      const firstButton = buttons.first();
      
      // Screenshot of button
      await expect(firstButton).toHaveScreenshot('pm33-gradient-button.png');
      
      // Test hover effect
      await firstButton.hover();
      await expect(firstButton).toHaveScreenshot('pm33-gradient-button-hover.png');
    }
  });

  test('AI Processing uses brain animation not spinner', async ({ page }) => {
    // Look for AI processing elements
    const aiElements = page.locator('.ai-processing');
    if (await aiElements.count() > 0) {
      const firstAi = aiElements.first();
      await expect(firstAi).toHaveScreenshot('pm33-ai-processing.png');
    }
    
    // Ensure no basic spinners exist
    const spinner = page.locator('.spinner, .loading-spinner, [class*="spin"]');
    await expect(spinner).toHaveCount(0);
  });

  test('Color scheme uses proper neutral colors not gray', async ({ page }) => {
    // Take screenshot for color analysis
    await expect(page).toHaveScreenshot('pm33-color-scheme.png');
    
    // Check that we're not using forbidden gray colors
    const bodyHTML = await page.locator('body').innerHTML();
    expect(bodyHTML).not.toContain('text-gray-');
    expect(bodyHTML).not.toContain('bg-gray-');
  });

  test('Mobile responsive design maintains PM33 aesthetics', async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');
    
    // Take mobile screenshot
    await expect(page).toHaveScreenshot('pm33-mobile-layout.png');
    
    // Verify glass cards still work on mobile
    const cards = page.locator('.glass-card');
    if (await cards.count() > 0) {
      const firstCard = cards.first();
      await expect(firstCard).toHaveScreenshot('pm33-mobile-card.png');
    }
  });

  test('Typography follows PM33 standards', async ({ page }) => {
    // Check headings
    const h1 = page.locator('h1').first();
    if (await h1.isVisible()) {
      await expect(h1).toHaveScreenshot('pm33-heading.png');
    }
    
    // Check that text is white/neutral on dark background
    const headingColor = await h1.evaluate(el => getComputedStyle(el).color);
    expect(headingColor).not.toBe('rgb(0, 0, 0)'); // Should not be black
  });

  test('No forbidden UI elements present', async ({ page }) => {
    // Take screenshot for manual review
    await expect(page).toHaveScreenshot('pm33-no-forbidden-elements.png');
    
    // Check for solid black borders
    const allElements = page.locator('*');
    const count = await allElements.count();
    
    // Sample check elements for forbidden patterns
    for (let i = 0; i < Math.min(count, 20); i++) {
      const element = allElements.nth(i);
      const style = await element.getAttribute('style');
      
      if (style) {
        expect(style).not.toContain('border: 1px solid black');
        expect(style).not.toContain('border: solid black');
      }
    }
  });

  test('Performance - visual elements load quickly', async ({ page }) => {
    const startTime = Date.now();
    
    // Wait for key visual elements
    await page.waitForSelector('.glass-card', { timeout: 5000 });
    await page.waitForSelector('[style*="linear-gradient"]', { timeout: 5000 });
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000); // Should load visual elements in 5s
    
    // Take performance screenshot
    await expect(page).toHaveScreenshot('pm33-performance-loaded.png');
  });
});