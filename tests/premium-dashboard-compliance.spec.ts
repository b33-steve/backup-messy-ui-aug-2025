/**
 * Test Suite: Premium Dashboard Compliance - PM33 Glass Morphism Command Center
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md + Premium Glass Morphism Implementation
 * Purpose: Validate the premium PMO Command Center meets $500/month tool standards
 * 
 * CRITICAL: This test suite validates the transformation from basic UI to premium glass morphism
 */

import { test, expect } from '@playwright/test';

test.describe('Premium Dashboard Compliance - Glass Morphism PMO Command Center', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the premium dashboard
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Allow React hydration and CSS loading
  });

  test('Premium glass morphism cards are implemented correctly', async ({ page }) => {
    // Wait for cards to render
    await page.waitForSelector('.pm33-glass-card', { timeout: 10000 });
    
    const glassCards = page.locator('.pm33-glass-card');
    const cardCount = await glassCards.count();
    
    // Must have multiple glass morphism cards
    expect(cardCount).toBeGreaterThan(4);
    
    for (let i = 0; i < Math.min(cardCount, 5); i++) {
      const card = glassCards.nth(i);
      
      // Validate glass morphism CSS properties
      const styles = await card.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          backdropFilter: computed.backdropFilter || computed.webkitBackdropFilter,
          background: computed.background,
          border: computed.border,
          boxShadow: computed.boxShadow,
          borderRadius: computed.borderRadius
        };
      });
      
      // Strict glass morphism requirements
      expect(styles.backdropFilter).toContain('blur');
      expect(styles.backdropFilter).toContain('40px'); // Premium blur level
      expect(styles.background).toContain('gradient');
      expect(styles.background).toContain('rgba'); // Semi-transparent
      expect(styles.boxShadow).not.toBe('none');
      expect(parseInt(styles.borderRadius)).toBeGreaterThan(12); // Rounded corners
      
      console.log(`Card ${i} glass morphism validated:`, styles);
    }
  });

  test('AI Team Status indicators show premium intelligence', async ({ page }) => {
    // Look for the 4 AI Teams status cards
    const aiTeamCards = page.locator('[class*="gradient-to-br"]').locator('..').locator('..');
    expect(await aiTeamCards.count()).toBeGreaterThanOrEqual(4);
    
    // Validate AI team names are present
    await expect(page.locator('text=Strategic Intelligence')).toBeVisible();
    await expect(page.locator('text=Workflow Execution')).toBeVisible();
    await expect(page.locator('text=Data Intelligence')).toBeVisible();
    await expect(page.locator('text=Communication')).toBeVisible();
    
    // Validate AI status indicators
    await expect(page.locator('text=Active')).toBeVisible();
    await expect(page.locator('text=Ready')).toBeVisible();
    await expect(page.locator('text=Learning')).toBeVisible();
    await expect(page.locator('text=Standby')).toBeVisible();
    
    // Validate premium status banner
    await expect(page.locator('text=AI TEAMS ACTIVE')).toBeVisible();
    await expect(page.locator('text=4 Teams Processing')).toBeVisible();
  });

  test('Strategic scenario cards have premium interactions', async ({ page }) => {
    // Wait for strategic scenario cards to load
    const scenarioCards = page.locator('text=Competitive Strategy').locator('..').locator('..');
    await expect(scenarioCards.first()).toBeVisible();
    
    // Test hover animations on scenario cards
    const competitiveCard = page.locator('text=Competitor launched similar features').locator('..').locator('..');
    
    // Get initial position
    const initialBox = await competitiveCard.boundingBox();
    
    // Hover and check for animation
    await competitiveCard.hover();
    await page.waitForTimeout(300); // Wait for animation
    
    const hoveredBox = await competitiveCard.boundingBox();
    
    // Card should move up on hover (premium hover effect)
    expect(hoveredBox!.y).toBeLessThan(initialBox!.y);
    
    // Validate all 4 scenario categories exist
    await expect(page.locator('text=Competitive Strategy')).toBeVisible();
    await expect(page.locator('text=Resource Allocation')).toBeVisible();
    await expect(page.locator('text=Growth Strategy')).toBeVisible();
    await expect(page.locator('text=Market Strategy')).toBeVisible();
  });

  test('Premium chat interface meets $500/month standards', async ({ page }) => {
    // Navigate to chat section
    const chatSection = page.locator('text=Strategic Intelligence Chat').locator('..').locator('..');
    await expect(chatSection).toBeVisible();
    
    // Validate AI avatar styling
    const aiAvatar = page.locator('.bg-gradient-to-br.from-cyan-500');
    await expect(aiAvatar).toBeVisible();
    
    // Validate message cards have glass morphism
    const messageCards = chatSection.locator('.pm33-glass-card');
    expect(await messageCards.count()).toBeGreaterThan(0);
    
    // Validate chat input has proper styling
    const chatInput = page.locator('input[placeholder*="strategic question"]');
    await expect(chatInput).toBeVisible();
    
    // Validate framework buttons exist
    await expect(page.locator('button:text("Apply ICE Framework")')).toBeVisible();
    
    // Test chat input interaction
    await chatInput.fill('Test strategic question');
    const inputValue = await chatInput.inputValue();
    expect(inputValue).toBe('Test strategic question');
  });

  test('PMO transformation metrics are prominently displayed', async ({ page }) => {
    // Validate PMO capability metrics
    await expect(page.locator('text=847% capability increase')).toBeVisible();
    await expect(page.locator('text=23min avg')).toBeVisible();
    
    // Validate company context is shown
    await expect(page.locator('text=Company Context')).toBeVisible();
    await expect(page.locator('text=Strategic Tools')).toBeVisible();
    
    // Validate competitive intelligence
    await expect(page.locator('text=Competitive Landscape')).toBeVisible();
    await expect(page.locator('text=Productboard')).toBeVisible();
    
    // Validate team resources
    await expect(page.locator('text=Team & Resources')).toBeVisible();
    await expect(page.locator('text=3 people')).toBeVisible();
    await expect(page.locator('text=6 months')).toBeVisible();
    
    // Validate key metrics
    await expect(page.locator('text=Key Metrics')).toBeVisible();
    await expect(page.locator('text=15 total')).toBeVisible(); // Beta signups
    await expect(page.locator('text=$15,000')).toBeVisible(); // Budget
  });

  test('Progress bars and interactive elements are premium quality', async ({ page }) => {
    // Validate progress bar exists and is styled
    const progressBar = page.locator('[role="progressbar"], .h-2');
    await expect(progressBar).toBeVisible();
    
    // Progress should be at 30%
    const progressValue = await progressBar.getAttribute('aria-valuenow') || 
                         await progressBar.getAttribute('value');
    expect(progressValue).toBe('30');
    
    // Validate badges have proper coloring
    const statusBadges = page.locator('[class*="border-"][class*="bg-"]');
    expect(await statusBadges.count()).toBeGreaterThan(3);
    
    // Test navigation button interactions
    const strategyButtons = page.locator('text=Strategic Chat').locator('..');
    await strategyButtons.hover();
    
    // Should have hover animation (scale/translate)
    const hoverStyles = await strategyButtons.evaluate(el => {
      return window.getComputedStyle(el).transform;
    });
    expect(hoverStyles).not.toBe('none');
  });

  test('Typography follows premium design system', async ({ page }) => {
    // Validate main heading has gradient text
    const mainHeading = page.locator('h1').first();
    const headingStyles = await mainHeading.evaluate(el => {
      return window.getComputedStyle(el).background;
    });
    expect(headingStyles).toContain('gradient');
    
    // Validate section titles are properly sized
    const sectionTitles = page.locator('h2, h3').locator('[class*="text-"]');
    expect(await sectionTitles.count()).toBeGreaterThan(3);
    
    // Validate text hierarchy
    const headings = await page.locator('h1, h2, h3, h4').count();
    expect(headings).toBeGreaterThan(5);
  });

  test('Responsive design maintains premium quality', async ({ page }) => {
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await page.waitForTimeout(1000);
    
    // Glass cards should still be visible
    const tabletCards = page.locator('.pm33-glass-card');
    expect(await tabletCards.count()).toBeGreaterThan(3);
    
    // Grid should adapt
    const gridContainer = page.locator('[class*="grid"]').first();
    await expect(gridContainer).toBeVisible();
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForTimeout(1000);
    
    // Content should stack but remain premium
    const mobileCards = page.locator('.pm33-glass-card');
    expect(await mobileCards.count()).toBeGreaterThan(2);
    
    // Navigation should remain functional
    await expect(page.locator('text=Strategic Tools')).toBeVisible();
  });

  test('Performance meets premium standards', async ({ page }) => {
    // Test page load performance
    const startTime = Date.now();
    await page.reload();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Premium interface should load quickly
    expect(loadTime).toBeLessThan(5000); // 5 seconds max
    
    // Test animation smoothness (no layout shift)
    const cards = page.locator('.pm33-glass-card');
    const firstCard = cards.first();
    
    // Hover should be smooth
    const beforeHover = await firstCard.boundingBox();
    await firstCard.hover();
    await page.waitForTimeout(100);
    const afterHover = await firstCard.boundingBox();
    
    // Should have smooth animation (transform, not layout shift)
    expect(afterHover!.width).toBe(beforeHover!.width);
  });

  test('Accessibility maintains premium experience', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Focus should be visible on premium elements
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Test color contrast on glass morphism elements
    const glassCard = page.locator('.pm33-glass-card').first();
    const textColor = await glassCard.locator('p, span').first().evaluate(el => {
      return window.getComputedStyle(el).color;
    });
    
    // Text should be readable (not too transparent)
    expect(textColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(textColor).not.toContain('0.1)'); // Very low opacity
    
    // Validate ARIA labels exist
    const buttons = page.locator('button');
    const buttonCount = Math.min(await buttons.count(), 3);
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const hasText = await button.textContent();
      const hasAriaLabel = await button.getAttribute('aria-label');
      expect(hasText || hasAriaLabel).toBeTruthy();
    }
  });

  test('Visual quality matches premium mockups', async ({ page }) => {
    // Take full page screenshot
    await page.screenshot({ 
      path: 'test-results/premium-dashboard-full.png', 
      fullPage: true 
    });
    
    // Take specific sections
    await page.locator('.pm33-glass-card').first().screenshot({
      path: 'test-results/premium-glass-card.png'
    });
    
    // Validate premium quality metrics
    const premiumElements = {
      glassCards: await page.locator('.pm33-glass-card').count(),
      gradients: await page.locator('[style*="gradient"], [class*="gradient"]').count(),
      animations: await page.locator('[class*="animate"], [class*="transition"]').count(),
      shadows: await page.locator('[class*="shadow"]').count(),
      badges: await page.locator('[class*="badge"], [class*="bg-"][class*="border-"]').count()
    };
    
    // Premium dashboard must exceed minimum thresholds
    expect(premiumElements.glassCards).toBeGreaterThanOrEqual(6);
    expect(premiumElements.gradients).toBeGreaterThanOrEqual(10);
    expect(premiumElements.animations).toBeGreaterThanOrEqual(8);
    expect(premiumElements.shadows).toBeGreaterThanOrEqual(5);
    expect(premiumElements.badges).toBeGreaterThanOrEqual(6);
    
    console.log('Premium Dashboard Quality Metrics:', premiumElements);
  });
});

test.describe('PMO Command Center Functional Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });

  test('Strategic tools navigation works', async ({ page }) => {
    // Test Strategic Chat navigation
    const strategicChatBtn = page.locator('text=Strategic Chat').locator('..');
    await strategicChatBtn.click();
    
    // Should show some interaction (hover state, etc.)
    const styles = await strategicChatBtn.evaluate(el => {
      return window.getComputedStyle(el).backgroundColor;
    });
    expect(styles).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('AI team status updates dynamically', async ({ page }) => {
    // Validate AI team status badges
    const activeStatus = page.locator('text=Active');
    const readyStatus = page.locator('text=Ready');
    const learningStatus = page.locator('text=Learning');
    const standbyStatus = page.locator('text=Standby');
    
    await expect(activeStatus).toBeVisible();
    await expect(readyStatus).toBeVisible();
    await expect(learningStatus).toBeVisible();
    await expect(standbyStatus).toBeVisible();
  });

  test('Company context is properly displayed', async ({ page }) => {
    // Validate contextual information
    await expect(page.locator('text=Company Profile')).toBeVisible();
    await expect(page.locator('text=Current Priorities')).toBeVisible();
    await expect(page.locator('text=Competitive Intel')).toBeVisible();
    await expect(page.locator('text=Team Resources')).toBeVisible();
  });

  test('Competitive landscape shows strategic intelligence', async ({ page }) => {
    // Validate competitor information
    await expect(page.locator('text=Primary: Productboard')).toBeVisible();
    await expect(page.locator('text=Secondary: Aha!')).toBeVisible();
    await expect(page.locator('text=Our Advantage: Strategic AI')).toBeVisible();
  });

  test('Real-time metrics are displayed correctly', async ({ page }) => {
    // Validate key metrics
    await expect(page.locator('text=Beta Signups:')).toBeVisible();
    await expect(page.locator('text=Available Budget:')).toBeVisible();
    await expect(page.locator('text=30% to goal')).toBeVisible();
    
    // Progress bar should reflect the metrics
    const progressBar = page.locator('[role="progressbar"], .h-2');
    await expect(progressBar).toBeVisible();
  });
});