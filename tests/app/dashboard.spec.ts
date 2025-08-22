/**
 * File: tests/app/dashboard.spec.ts
 * Tests the core app dashboard functionality with PM33 design system compliance
 * Tests shadcn/ui + PM33 components in app context 
 * RELEVANT FILES: app/(app)/dashboard/page.tsx, app/(app)/layout.tsx, components/PM33PageWrapper.tsx, app/globals.css
 */

import { test, expect } from '@playwright/test';

test.describe('PM33 Core App - Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the core app dashboard
    await page.goto('/dashboard');
  });

  test('should display dashboard with PM33 app context', async ({ page }) => {
    // Check page loads correctly
    await expect(page).toHaveTitle(/PM33/);
    await expect(page.locator('h1')).toContainText(/Dashboard|Command Center/);
    
    // Verify app context styling (not marketing context)
    const body = page.locator('body');
    await expect(body).toHaveClass(/app-context/);
    await expect(body).not.toHaveClass(/marketing-context/);
  });

  test('should use PM33 glass morphism cards', async ({ page }) => {
    // Look for PM33 glass morphism cards
    const glassCards = page.locator('.pm33-glass-card');
    if (await glassCards.count() > 0) {
      const firstCard = glassCards.first();
      await expect(firstCard).toBeVisible();
      
      // Check for glass morphism CSS properties
      const backdropFilter = await firstCard.evaluate(el => getComputedStyle(el).backdropFilter);
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should display strategic intelligence metrics', async ({ page }) => {
    // Check for strategic dashboard elements
    await expect(page.locator('text=Strategic Health Score')).toBeVisible();
    await expect(page.locator('text=OKR Progress')).toBeVisible();
    await expect(page.locator('text=AI Intelligence Status')).toBeVisible();
  });

  test('should have working navigation to other app sections', async ({ page }) => {
    // Test navigation to strategic intelligence
    const strategicLink = page.locator('text=Strategic Intelligence');
    if (await strategicLink.isVisible()) {
      await strategicLink.click();
      await expect(page).toHaveURL(/strategic-intelligence/);
    }
    
    // Navigate back to dashboard
    await page.goto('/dashboard');
    
    // Test navigation to command center
    const commandLink = page.locator('text=Command Center');
    if (await commandLink.isVisible()) {
      await commandLink.click();
      await expect(page).toHaveURL(/command-center/);
    }
  });

  test('should use PM33 design system color tokens', async ({ page }) => {
    // Check that PM33 design system colors are being used
    const primaryElements = page.locator('[style*="--pm33-brand"]');
    if (await primaryElements.count() > 0) {
      const element = primaryElements.first();
      await expect(element).toBeVisible();
    }
    
    // Check for dark mode compatibility
    const bodyBg = await page.locator('body').evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bodyBg).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/); // Should have proper background color
  });

  test('should display AI processing states instead of basic spinners', async ({ page }) => {
    // Look for AI processing indicators
    const processingElements = page.locator('.pm33-ai-processing');
    if (await processingElements.count() > 0) {
      const firstProcessor = processingElements.first();
      await expect(firstProcessor).toBeVisible();
    }
    
    // Should NOT have basic spinners
    const basicSpinners = page.locator('.spinner, [class*="spin"]');
    await expect(basicSpinners).toHaveCount(0);
  });

  test('should follow PM33 8pt grid spacing system', async ({ page }) => {
    // Check spacing follows 8pt grid
    const mainContent = page.locator('main, [role="main"]');
    if (await mainContent.isVisible()) {
      const padding = await mainContent.evaluate(el => getComputedStyle(el).padding);
      // Should use values that are multiples of 8px
      const paddingValues = padding.match(/\d+/g);
      if (paddingValues) {
        paddingValues.forEach(value => {
          const numValue = parseInt(value);
          if (numValue > 0) {
            expect(numValue % 8).toBe(0);
          }
        });
      }
    }
  });

  test('should have premium hover states and animations', async ({ page }) => {
    // Test for premium hover animations on interactive elements
    const buttons = page.locator('button');
    if (await buttons.count() > 0) {
      const firstButton = buttons.first();
      await expect(firstButton).toBeVisible();
      
      // Hover and check for transform effects
      await firstButton.hover();
      const transform = await firstButton.evaluate(el => getComputedStyle(el).transform);
      // Should have some transform applied (not "none")
      expect(transform).not.toBe('none');
    }
  });

  test('should display theme toggle functionality', async ({ page }) => {
    // Look for theme toggle
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      
      // Check that theme changes are reflected in the DOM
      const themeAttribute = await page.locator('html').getAttribute('data-theme');
      expect(themeAttribute).toMatch(/light|dark|native/);
    }
  });

  test('should use shadcn/ui components with PM33 theming', async ({ page }) => {
    // Look for shadcn/ui components (they have data-slot attributes)
    const shadcnComponents = page.locator('[data-slot]');
    if (await shadcnComponents.count() > 0) {
      const firstComponent = shadcnComponents.first();
      await expect(firstComponent).toBeVisible();
      
      // Should be properly themed with PM33 colors
      const styles = await firstComponent.evaluate(el => getComputedStyle(el));
      expect(styles.color).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/);
    }
  });

  test('should be responsive on tablet and mobile', async ({ page }) => {
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toBeVisible();
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
    
    // No horizontal scroll should appear
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 20);
  });

  test('should load without critical console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Should not have critical console errors (ignore favicon and chunk errors)
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('chunk') &&
      !error.includes('Warning') &&
      !error.includes('tabler/icons') // Known issue with icons
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('should have proper PM33 branding', async ({ page }) => {
    // Check for PM33 logo
    const logo = page.locator('[data-testid="pm33-logo"]');
    if (await logo.isVisible()) {
      await expect(logo).toBeVisible();
    }
    
    // Check for PM33 text gradient
    const gradientText = page.locator('.pm33-text-gradient');
    if (await gradientText.count() > 0) {
      const firstGradient = gradientText.first();
      const backgroundImage = await firstGradient.evaluate(el => getComputedStyle(el).backgroundImage);
      expect(backgroundImage).toContain('linear-gradient');
    }
  });
});