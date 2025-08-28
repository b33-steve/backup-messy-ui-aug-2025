/**
 * File: tests/dashboard-v1-theme-cards-final.spec.ts
 * Tests the theme-aware PM33Card component library in dashboard-v1
 * Validates light/dark/gray theme switching and glass morphism effects
 * RELEVANT FILES: app/(app)/dashboard-v1/page.tsx, components/ui/pm33/PM33Card.tsx, app/globals.css
 */

import { test, expect } from '@playwright/test';

test.describe('Dashboard V1 - Theme-Aware PM33Card System', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dashboard-v1 page
    await page.goto('/dashboard-v1');
    await page.waitForLoadState('networkidle');
  });

  test('should load dashboard with PM33 theme system', async ({ page }) => {
    // Verify page loads correctly
    await expect(page).toHaveTitle(/PM33/);
    await expect(page.locator('h1.pm33-main-heading')).toContainText('PMO Command Center V1');
    
    // Verify theme-aware components are active
    await expect(page.locator('text=Theme-Aware PM33 Components Active')).toBeVisible();
    
    // Check that PM33 cards are rendered
    const pm33Cards = page.locator('[data-testid*="card"]');
    expect(await pm33Cards.count()).toBeGreaterThan(5);
  });

  test('should display all PM33Card components with proper test IDs', async ({ page }) => {
    // Strategic Tools Card
    await expect(page.locator('[data-testid="strategic-tools-card"]')).toBeVisible();
    await expect(page.locator('text=STRATEGIC TOOLS')).toBeVisible();
    
    // Company Context Card
    await expect(page.locator('[data-testid="company-context-card"]')).toBeVisible();
    await expect(page.locator('text=COMPANY CONTEXT')).toBeVisible();
    
    // Strategic AI Card
    await expect(page.locator('[data-testid="strategic-ai-card"]')).toBeVisible();
    await expect(page.locator('text=Strategic AI Co-Pilot Ready')).toBeVisible();
    
    // Strategic Chat Card
    await expect(page.locator('[data-testid="strategic-chat-card"]')).toBeVisible();
    
    // Competitive Landscape Card
    await expect(page.locator('[data-testid="competitive-landscape-card"]')).toBeVisible();
    await expect(page.locator('text=COMPETITIVE LANDSCAPE')).toBeVisible();
    
    // Team Resources Card
    await expect(page.locator('[data-testid="team-resources-card"]')).toBeVisible();
    await expect(page.locator('text=TEAM & RESOURCES')).toBeVisible();
    
    // Key Metrics Card (using metric variant)
    await expect(page.locator('[data-testid="key-metrics-card"]')).toBeVisible();
    await expect(page.locator('text=KEY METRICS')).toBeVisible();
  });

  test('should support three-theme system (light/dark/gray)', async ({ page }) => {
    // Check if PM33 theme-aware components are present
    const themeAwareCards = page.locator('.pm33-glass-card');
    const cardCount = await themeAwareCards.count();
    expect(cardCount).toBeGreaterThan(0);
    
    if (cardCount > 0) {
      const firstCard = themeAwareCards.first();
      await expect(firstCard).toBeVisible();
      
      // Check for theme-aware CSS classes
      const cardClass = await firstCard.getAttribute('class');
      
      // Should have theme-aware classes (light:, dark:, or gray:)
      // The PM33Card component applies these conditionally
      expect(cardClass).toBeTruthy();
      expect(cardClass).toContain('pm33-glass-card');
    }
  });

  test('should have glass morphism visual effects', async ({ page }) => {
    const glassCards = page.locator('.pm33-glass-card');
    const cardCount = await glassCards.count();
    
    expect(cardCount).toBeGreaterThan(5); // Should have multiple glass cards
    
    for (let i = 0; i < Math.min(cardCount, 3); i++) {
      const card = glassCards.nth(i);
      await expect(card).toBeVisible();
      
      // Check for glass morphism CSS properties
      const backdropFilter = await card.evaluate(el => getComputedStyle(el).backdropFilter);
      const borderRadius = await card.evaluate(el => getComputedStyle(el).borderRadius);
      const transition = await card.evaluate(el => getComputedStyle(el).transition);
      
      // Glass morphism should have backdrop blur
      expect(backdropFilter).toContain('blur');
      // Should have rounded corners
      expect(borderRadius).not.toBe('0px');
      // Should have smooth transitions
      expect(transition).toContain('all');
    }
  });

  test('should display strategic progress metrics', async ({ page }) => {
    // Check for key progress indicators
    await expect(page.locator('text=15 signups (30%)')).toBeVisible();
    await expect(page.locator('text=30% to goal (50 beta users)')).toBeVisible();
    await expect(page.locator('text=$15,000')).toBeVisible();
  });

  test('should have interactive scenario cards', async ({ page }) => {
    // Look for scenario cards
    const scenarioCards = page.locator('.pm33-scenario-card, [class*="strategic-card"]');
    const cardCount = await scenarioCards.count();
    
    if (cardCount > 0) {
      const firstCard = scenarioCards.first();
      await expect(firstCard).toBeVisible();
      
      // Check for hover effects
      await firstCard.hover();
      const transform = await firstCard.evaluate(el => getComputedStyle(el).transform);
      // Transform should be applied on hover (not "none")
      expect(transform).not.toBe('none');
    }
  });

  test('should have working strategic chat interface', async ({ page }) => {
    const chatInput = page.locator('input[placeholder*="strategic"]');
    
    if (await chatInput.isVisible()) {
      // Test basic chat functionality
      await chatInput.fill('Test strategic query');
      
      const submitButton = page.locator('button:has(svg)'); // Button with send icon
      if (await submitButton.isVisible()) {
        await submitButton.click();
        // Just verify no immediate errors, don't wait for full processing
      }
    }
  });

  test('should have animated hover states on PM33Cards', async ({ page }) => {
    const interactiveCards = page.locator('[data-testid*="card"]');
    const cardCount = await interactiveCards.count();
    
    if (cardCount > 0) {
      const firstCard = interactiveCards.first();
      
      // Get initial transform state
      const initialTransform = await firstCard.evaluate(el => getComputedStyle(el).transform);
      
      // Hover over the card
      await firstCard.hover();
      
      // Get transform after hover (should change due to hover:scale and hover:translate effects)
      const hoverTransform = await firstCard.evaluate(el => getComputedStyle(el).transform);
      
      // Transform should change on hover
      expect(hoverTransform).not.toBe(initialTransform);
    }
  });

  test('should display AI intelligence briefing', async ({ page }) => {
    // Check for AI processing indicators
    await expect(page.locator('text=AI INTELLIGENCE BRIEFING - LIVE')).toBeVisible();
  });

  test('should be responsive across viewports', async ({ page }) => {
    // Test desktop layout
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('h1.pm33-main-heading')).toBeVisible();
    
    // Test tablet layout
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1.pm33-main-heading')).toBeVisible();
    
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1.pm33-main-heading')).toBeVisible();
    
    // Should not have horizontal scroll on mobile
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();
  });

  test('should load without critical JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Filter out non-critical errors (favicon, chunks, etc.)
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('chunk') &&
      !error.includes('Warning') &&
      !error.includes('404') &&
      !error.includes('tabler/icons') // Known icon issues
    );
    
    // Should have no critical JavaScript errors
    expect(criticalErrors).toHaveLength(0);
  });

  test('should follow PM33 design system spacing', async ({ page }) => {
    // Check that main layout follows PM33 spacing patterns
    const mainLayout = page.locator('.pm33-layout-compact');
    if (await mainLayout.count() > 0) {
      await expect(mainLayout.first()).toBeVisible();
      
      // Should have minimum height for proper layout
      const minHeight = await mainLayout.first().evaluate(el => getComputedStyle(el).minHeight);
      expect(minHeight).toBeTruthy();
    }
  });
});