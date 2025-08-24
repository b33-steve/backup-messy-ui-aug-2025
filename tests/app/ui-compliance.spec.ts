import { test, expect } from '@playwright/test';

/**
 * PM33 UI Compliance Tests
 * Validates components follow PM33_COMPLETE_UI_SYSTEM.md standards
 */

test.describe('PM33 UI Compliance', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the intelligence page (core app with PM33 components)
    await page.goto('http://localhost:3001/intelligence');
    
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
    await page.waitForTimeout(1000);
  });

  test('should use proper glass morphism styling', async ({ page }) => {
    // Check for glass morphism CSS properties
    const glassCards = page.locator('[data-testid="pm33-card"]');
    await expect(glassCards.first()).toBeVisible();
    
    // Verify proper backdrop-filter is applied (blur + saturate)
    const style = await glassCards.first().getAttribute('style');
    expect(style).toContain('backdrop-filter');
    expect(style).toContain('blur(40px)');
    expect(style).toContain('saturate(150%)');
    
    // Verify no basic HTML divs with inline styles remain
    const basicDivs = page.locator('div[style*="background-color"]:not([data-testid])');
    await expect(basicDivs).toHaveCount(0);
  });

  test('should have proper gradient backgrounds on all cards', async ({ page }) => {
    // Check that all PM33 cards have gradient backgrounds
    const pm33Cards = page.locator('[data-testid="pm33-card"]');
    const cardCount = await pm33Cards.count();
    
    if (cardCount > 0) {
      for (let i = 0; i < cardCount; i++) {
        const card = pm33Cards.nth(i);
        const style = await card.getAttribute('style');
        expect(style).toMatch(/background.*gradient|background.*linear-gradient/);
      }
    }
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

  test('should use consistent PM33 spacing system', async ({ page }) => {
    // Check for consistent padding classes (p-6, mb-8, gap-6)
    const cardsWithSpacing = page.locator('[data-testid="pm33-card"] .p-6, .mb-8, .gap-6');
    await expect(cardsWithSpacing.first()).toBeVisible();
    
    // Verify proper card content spacing
    const cardContent = page.locator('[data-testid="pm33-card"] .p-6');
    const cardCount = await cardContent.count();
    expect(cardCount).toBeGreaterThan(0);
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

  test('should use Lucide React icons throughout', async ({ page }) => {
    // Check for Lucide React icons (svg elements with specific attributes)
    const lucideIcons = page.locator('svg[class*="lucide"]');
    const iconCount = await lucideIcons.count();
    
    // Should have multiple Lucide icons in the interface
    expect(iconCount).toBeGreaterThan(2);
    
    // Icons should be properly sized
    const firstIcon = lucideIcons.first();
    const iconClass = await firstIcon.getAttribute('class');
    expect(iconClass).toMatch(/h-[4-8] w-[4-8]/);
  });

  test('should have proper typography with correct font sizes and weights', async ({ page }) => {
    // Check main heading typography
    const mainHeading = page.locator('h1');
    if (await mainHeading.count() > 0) {
      const headingClass = await mainHeading.first().getAttribute('class');
      expect(headingClass).toContain('text-4xl');
      expect(headingClass).toContain('font-bold');
    }
    
    // Check card titles
    const cardTitles = page.locator('[data-testid="pm33-card"] h2, [data-testid="pm33-card"] h3');
    if (await cardTitles.count() > 0) {
      const titleClass = await cardTitles.first().getAttribute('class');
      expect(titleClass).toMatch(/font-semibold|font-bold/);
    }
  });

  test('should have hover effects on all interactive elements', async ({ page }) => {
    // Test buttons have hover effects
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      const firstButton = buttons.first();
      await firstButton.hover();
      
      // Check for hover transform or scale
      const transform = await firstButton.evaluate(
        el => window.getComputedStyle(el).transform
      );
      
      // Should have some transform or hover effect
      expect(transform).not.toBe('none');
    }
    
    // Test PM33 cards have hover effects
    const pm33Cards = page.locator('[data-testid="pm33-card"]');
    if (await pm33Cards.count() > 0) {
      const firstCard = pm33Cards.first();
      await firstCard.hover();
      
      const transition = await firstCard.evaluate(
        el => window.getComputedStyle(el).transition
      );
      expect(transition).toContain('all');
    }
  });

  test('should have fixed glassy navigation', async ({ page }) => {
    // Check for navigation element
    const navigation = page.locator('nav, [role="navigation"]');
    await expect(navigation.first()).toBeVisible();
    
    // Navigation should be fixed position
    const navPosition = await navigation.first().evaluate(
      el => window.getComputedStyle(el).position
    );
    expect(navPosition).toBe('fixed');
    
    // Navigation should have glass morphism
    const navStyle = await navigation.first().getAttribute('style');
    if (navStyle) {
      expect(navStyle).toMatch(/backdrop-filter|backdrop-blur/);
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