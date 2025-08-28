/**
 * Test Dashboard V1 Fixed using PM33DashboardTemplate:
 * - Glass morphism on all PM33Cards
 * - Equal height scenario cards (squares)  
 * - Complete sidebar content with PM33AppShell layout
 * - Responsive breakpoints
 * - Hover effects and transitions
 * - Template system functionality
 */

import { test, expect } from '@playwright/test';

test.describe('Dashboard V1 Fixed - PM33DashboardTemplate System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard-v1-fixed');
    await page.waitForLoadState('networkidle');
  });

  test('should load PM33DashboardTemplate with proper structure', async ({ page }) => {
    console.log('🔍 Testing PM33DashboardTemplate structure...');
    
    // Check page loads with PM33 title
    await expect(page).toHaveTitle(/PM33/);
    
    // Template uses "Good morning, Steve!" header instead of "PMO Command Center V1"
    await expect(page.locator('h1')).toContainText('Good morning, Steve!');
    
    // Check PM33AppShell three-column layout is present
    await expect(page.locator('.grid.grid-cols-\\[300px_1fr_350px\\]')).toBeVisible();
    console.log('✅ PM33AppShell three-column layout detected');
    
    // Test PM33Cards with glass morphism
    const pm33Cards = page.locator('[class*="rounded-xl"][class*="backdrop-blur"]');
    const cardCount = await pm33Cards.count();
    
    console.log(`📊 Found ${cardCount} PM33Cards with glass morphism`);
    expect(cardCount).toBeGreaterThan(3); // Should have multiple cards
    
    // Test a PM33Card for glass morphism properties
    const firstCard = pm33Cards.first();
    await expect(firstCard).toBeVisible();
    
    // Check for glass morphism properties
    const styles = await firstCard.evaluate(el => {
      const computed = getComputedStyle(el);
      return {
        backdropFilter: computed.backdropFilter,
        background: computed.background || computed.backgroundColor,
        borderRadius: computed.borderRadius,
        border: computed.border
      };
    });
    
    console.log('🔍 PM33Card styles:', styles);
    
    // Should have backdrop blur (glass effect)
    expect(styles.backdropFilter).toContain('blur');
    
    // Should have rounded corners
    expect(parseFloat(styles.borderRadius)).toBeGreaterThan(0);
    
    // Should have semi-transparent background
    expect(styles.background).toMatch(/rgba|transparent/);
    
    console.log('✅ PM33Card glass morphism working properly');
  });

  test('should have ScenarioCards in 2x2 grid with square aspect ratio', async ({ page }) => {
    console.log('🔍 Testing ScenarioCard layout in template...');
    
    // Look for the 2x2 grid container with inline style (allowing for space variations)
    const gridContainer = page.locator('div[style*="display:grid"][style*="grid-template-columns:repeat(2"]');
    await expect(gridContainer).toBeVisible();
    console.log('✅ Found 2x2 grid container with inline styles');
    
    // Find the 4 scenario cards within the grid
    const scenarioCards = gridContainer.locator('[class*="aspect-square"][class*="rounded-xl"]');
    const scenarioCount = await scenarioCards.count();
    
    expect(scenarioCount).toBe(4); // Should have exactly 4 scenario cards
    console.log(`📐 Found ${scenarioCount} ScenarioCards in grid`);
    
    // Test first card dimensions and aspect ratio
    const firstCard = scenarioCards.first();
    await expect(firstCard).toBeVisible();
    
    // Check that it has square styles applied
    const cardStyles = await firstCard.evaluate(el => {
      const computed = getComputedStyle(el);
      return {
        aspectRatio: computed.aspectRatio,
        height: computed.height,
        width: computed.width,
      };
    });
    
    console.log('🔍 ScenarioCard styles:', cardStyles);
    
    // Check dimensions for square aspect ratio
    const cardBox = await firstCard.boundingBox();
    if (cardBox) {
      const aspectRatio = cardBox.width / cardBox.height;
      expect(aspectRatio).toBeGreaterThan(0.9); // Should be close to square
      expect(aspectRatio).toBeLessThan(1.1);
      console.log(`✅ ScenarioCard aspect ratio: ${aspectRatio.toFixed(2)} (square)`);
    }
    
    // Test that scenario cards are clickable and have proper content
    await expect(firstCard.locator('text=COMPETITIVE')).toBeVisible();
    await expect(firstCard.locator('text=Market Position')).toBeVisible();
    console.log('✅ ScenarioCards have proper content structure');
  });

  test('should display PM33AppShell layout with three columns', async ({ page }) => {
    console.log('🔍 Testing PM33AppShell layout structure...');
    
    // Check for the three-column grid layout
    const threeColGrid = page.locator('.grid.grid-cols-\\[300px_1fr_350px\\]');
    await expect(threeColGrid).toBeVisible();
    console.log('✅ Three-column grid layout present');
    
    // Left Column - Strategic Tools
    await expect(page.locator('text=🎯 Strategic Tools')).toBeVisible();
    await expect(page.locator('text=Strategic Chat')).toBeVisible();
    console.log('✅ Left sidebar - Strategic Tools section present');
    
    // Left Column - Company Context  
    await expect(page.locator('text=🏢 Company Context')).toBeVisible();
    await expect(page.locator('text=PM33 Inc.')).toBeVisible();
    console.log('✅ Left sidebar - Company Context section present');
    
    // Center Column - AI Briefing
    await expect(page.locator('text=🤖 AI Intelligence Briefing')).toBeVisible();
    await expect(page.locator('text=STRATEGIC AI READY')).toBeVisible();
    console.log('✅ Center column - AI Intelligence Briefing present');
    
    // Center Column - Strategic Scenarios
    await expect(page.locator('text=Strategic Scenarios')).toBeVisible();
    console.log('✅ Center column - Strategic Scenarios present');
    
    // Right Column - Competitive Landscape & Metrics
    await expect(page.locator('text=⚡ Competitive Landscape')).toBeVisible();
    await expect(page.locator('text=📊 Key Metrics')).toBeVisible();
    await expect(page.locator('text=Linear')).toBeVisible(); // Competitor
    await expect(page.locator('text=Monday.com')).toBeVisible(); // Competitor
    console.log('✅ Right sidebar - Competitive & Metrics sections present');
  });

  test('should have working hover effects on PM33Cards', async ({ page }) => {
    console.log('🔍 Testing PM33Card hover effects...');
    
    // Find any PM33Card with glass morphism
    const pm33Card = page.locator('[class*="rounded-xl"][class*="backdrop-blur"]').first();
    await expect(pm33Card).toBeVisible();
    
    // Get initial transform
    const initialTransform = await pm33Card.evaluate(el => {
      return getComputedStyle(el).transform;
    });
    
    console.log('🔍 Initial transform:', initialTransform);
    
    // Hover over card
    await pm33Card.hover();
    await page.waitForTimeout(500); // Wait for transition
    
    // Get hover transform
    const hoverTransform = await pm33Card.evaluate(el => {
      return getComputedStyle(el).transform;
    });
    
    console.log('🔍 Hover transform:', hoverTransform);
    
    // PM33Cards should have hover:scale-[1.02] effect
    const hasHoverEffect = hoverTransform !== initialTransform && 
                          (hoverTransform.includes('scale') || hoverTransform.includes('matrix'));
    
    expect(hasHoverEffect).toBeTruthy();
    console.log('✅ PM33Card hover effects working (scale transform detected)');
  });

  test('should have working AI chat interface', async ({ page }) => {
    console.log('🔍 Testing AI Intelligence Briefing chat...');
    
    // Find the chat input in AI Intelligence Briefing
    const chatInput = page.locator('input[placeholder*="Ask strategic question"]');
    await expect(chatInput).toBeVisible();
    
    const analyzeButton = page.locator('button:has-text("Analyze Strategy")');
    await expect(analyzeButton).toBeVisible();
    
    // Test interaction
    await chatInput.fill('How can we scale to 50 users?');
    await analyzeButton.click();
    
    // Should show processing state
    await expect(page.locator('text=Processing')).toBeVisible();
    console.log('✅ AI Intelligence Briefing chat interface working');
  });

  test('should be responsive across different screen sizes', async ({ page }) => {
    console.log('🔍 Testing responsive design...');
    
    // Test desktop layout (3 columns)
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('h1')).toBeVisible();
    console.log('✅ Desktop layout working');
    
    // Test tablet layout (2 columns)  
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toBeVisible();
    
    // Check that scenario cards still work
    const scenarioCards = page.locator('[data-testid*="scenario"]');
    const visibleCount = await scenarioCards.count();
    expect(visibleCount).toBe(4);
    console.log('✅ Tablet layout working');
    
    // Test mobile layout (1 column)
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
    
    // Should not have horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();
    console.log('✅ Mobile layout working, no horizontal scroll');
  });

  test('should have working strategic chat interface', async ({ page }) => {
    console.log('🔍 Testing strategic chat...');
    
    const chatInput = page.locator('input[placeholder*="strategic"]');
    await expect(chatInput).toBeVisible();
    
    const analyzeButton = page.locator('button:has-text("Analyze Strategy")');
    await expect(analyzeButton).toBeVisible();
    
    // Test interaction
    await chatInput.fill('How can we scale to 50 users?');
    await analyzeButton.click();
    
    // Should show processing state
    await expect(page.locator('text=Processing')).toBeVisible();
    console.log('✅ Strategic chat working');
  });

  test('should display all key metrics and progress indicators', async ({ page }) => {
    console.log('🔍 Testing metrics and progress...');
    
    // Header metrics
    await expect(page.locator('text=15 signups (30%)')).toBeVisible();
    await expect(page.locator('text=Theme-Aware PM33 Components Active')).toBeVisible();
    
    // Progress bars should be present
    const progressBars = page.locator('[style*="width:"]');
    const progressCount = await progressBars.count();
    expect(progressCount).toBeGreaterThan(3); // Should have multiple progress bars
    
    // Metric values
    await expect(page.locator('text=+5 this week')).toBeVisible();
    await expect(page.locator('text=$8,000')).toBeVisible(); // Development budget
    await expect(page.locator('text=$5,000')).toBeVisible(); // Marketing budget
    
    console.log(`✅ Found ${progressCount} progress indicators`);
  });

  test('should have AI intelligence briefing active', async ({ page }) => {
    console.log('🔍 Testing AI intelligence features...');
    
    // AI Co-Pilot card
    await expect(page.locator('[data-testid="strategic-ai-card"]')).toBeVisible();
    await expect(page.locator('text=Strategic AI Co-Pilot Ready')).toBeVisible();
    await expect(page.locator('text=AI INTELLIGENCE BRIEFING - LIVE')).toBeVisible();
    
    console.log('✅ AI intelligence briefing active');
  });
  
  test('should load without critical errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Filter out non-critical errors
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('chunk') &&
      !error.includes('Warning')
    );
    
    expect(criticalErrors).toHaveLength(0);
    console.log('✅ No critical errors found');
  });
});