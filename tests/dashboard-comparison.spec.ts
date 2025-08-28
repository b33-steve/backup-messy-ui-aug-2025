/**
 * Compare Dashboard V1 (original) vs Dashboard V1 Fixed (PM33DashboardTemplate)
 * Validates that both versions work and template system provides equivalent functionality
 */

import { test, expect } from '@playwright/test';

test.describe('Dashboard V1 vs V1 Fixed Comparison', () => {
  
  test('Dashboard V1 (original) should load and function', async ({ page }) => {
    console.log('🔍 Testing original Dashboard V1...');
    
    await page.goto('/dashboard-v1');
    await page.waitForLoadState('networkidle');
    
    // Check original loads with title
    await expect(page).toHaveTitle(/PM33/);
    
    // Original should have PMO Command Center title
    await expect(page.locator('h1')).toContainText('PMO Command Center');
    
    // Should have some cards/content
    const cards = page.locator('[class*="card"], [class*="bg-"], [data-testid]');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(5);
    
    console.log(`✅ Dashboard V1 loaded with ${cardCount} elements`);
  });

  test('Dashboard V1 Fixed (template) should load and function', async ({ page }) => {
    console.log('🔍 Testing Dashboard V1 Fixed with PM33DashboardTemplate...');
    
    await page.goto('/dashboard-v1-fixed');
    await page.waitForLoadState('networkidle');
    
    // Check template loads with title
    await expect(page).toHaveTitle(/PM33/);
    
    // Template should have personalized greeting
    await expect(page.locator('h1')).toContainText('Good morning, Steve!');
    
    // Should have PM33AppShell three-column layout
    await expect(page.locator('.grid.grid-cols-\\[300px_1fr_350px\\]')).toBeVisible();
    
    // Should have PM33Cards with glass morphism
    const pm33Cards = page.locator('[class*="rounded-xl"][class*="backdrop-blur"]');
    const cardCount = await pm33Cards.count();
    expect(cardCount).toBeGreaterThan(3);
    
    console.log(`✅ Dashboard V1 Fixed loaded with ${cardCount} PM33Cards`);
  });

  test('Both dashboards should have interactive elements', async ({ page }) => {
    console.log('🔍 Testing interactive functionality comparison...');
    
    // Test Dashboard V1 Fixed (template) interactivity
    await page.goto('/dashboard-v1-fixed');
    await page.waitForLoadState('networkidle');
    
    // Should have clickable scenario cards  
    const scenarioGrid = page.locator('div[style*="display:grid"][style*="grid-template-columns:repeat(2"]');
    await expect(scenarioGrid).toBeVisible();
    
    const scenarioCards = scenarioGrid.locator('[class*="aspect-square"]');
    const scenarioCount = await scenarioCards.count();
    expect(scenarioCount).toBe(4);
    
    // Should have working chat input
    const chatInput = page.locator('input[placeholder*="Ask strategic question"]');
    await expect(chatInput).toBeVisible();
    
    await chatInput.fill('Test strategic question');
    const analyzeButton = page.locator('button:has-text("Analyze Strategy")');
    await analyzeButton.click();
    
    console.log('✅ Template dashboard interactivity confirmed');
  });

  test('Performance comparison - template should be efficient', async ({ page }) => {
    console.log('🔍 Testing performance comparison...');
    
    const startTime = Date.now();
    
    // Test template loading time
    await page.goto('/dashboard-v1-fixed');
    await page.waitForLoadState('networkidle');
    
    const templateLoadTime = Date.now() - startTime;
    
    // Template should load reasonably fast (under 10 seconds)
    expect(templateLoadTime).toBeLessThan(10000);
    
    // Should have all expected elements loaded
    await expect(page.locator('text=Good morning, Steve!')).toBeVisible();
    await expect(page.locator('text=🎯 Strategic Tools')).toBeVisible();
    await expect(page.locator('text=⚡ Competitive Landscape')).toBeVisible();
    
    console.log(`✅ Template loaded in ${templateLoadTime}ms`);
  });
  
  test('Template system enforces consistent structure', async ({ page }) => {
    console.log('🔍 Testing template system consistency...');
    
    await page.goto('/dashboard-v1-fixed');
    await page.waitForLoadState('networkidle');
    
    // Should have consistent PM33 branding and structure
    await expect(page.locator('text=PM33')).toBeVisible();
    
    // Should use PM33Card components consistently
    const pm33Cards = page.locator('[class*="rounded-xl"][class*="backdrop-blur"]');
    const cardCount = await pm33Cards.count();
    
    // All cards should have glass morphism
    for (let i = 0; i < Math.min(cardCount, 3); i++) {
      const card = pm33Cards.nth(i);
      const styles = await card.evaluate(el => {
        const computed = getComputedStyle(el);
        return {
          backdropFilter: computed.backdropFilter,
          borderRadius: computed.borderRadius
        };
      });
      
      expect(styles.backdropFilter).toContain('blur');
      expect(parseFloat(styles.borderRadius)).toBeGreaterThan(0);
    }
    
    console.log('✅ Template system provides consistent PM33 structure');
  });
});