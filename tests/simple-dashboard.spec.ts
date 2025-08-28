/**
 * Test the simplified PM33 dashboard
 * Validates that the simplified components render correctly
 */

import { test, expect } from '@playwright/test';

test.describe('Simple PM33 Dashboard', () => {
  test('should load simplified dashboard successfully', async ({ page }) => {
    console.log('🧪 Testing simplified dashboard...');
    
    await page.goto('/dashboard-simple');
    await page.waitForLoadState('networkidle');
    
    // Check page title loads
    await expect(page).toHaveTitle(/PM33/);
    console.log('✅ Page title loaded');
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('PM33 Command Center');
    console.log('✅ Main heading found');
    
    // Check simplified cards are present
    const strategicCard = page.locator('[data-testid="strategic-tools-card"]');
    await expect(strategicCard).toBeVisible();
    console.log('✅ Strategic tools card visible');
    
    const contextCard = page.locator('[data-testid="company-context-card"]');
    await expect(contextCard).toBeVisible();
    console.log('✅ Company context card visible');
    
    const aiCard = page.locator('[data-testid="strategic-ai-card"]');
    await expect(aiCard).toBeVisible();
    console.log('✅ Strategic AI card visible');
    
    // Check metrics
    const signupsMetric = page.locator('[data-testid="signups-metric"]');
    await expect(signupsMetric).toBeVisible();
    console.log('✅ Signups metric visible');
    
    // Check strategic chat
    const chatInput = page.locator('input[placeholder*="strategic"]');
    await expect(chatInput).toBeVisible();
    console.log('✅ Strategic chat input visible');
    
    // Test basic interaction
    await chatInput.fill('Test query');
    const inputValue = await chatInput.inputValue();
    expect(inputValue).toBe('Test query');
    console.log('✅ Chat input interaction working');
    
    console.log('🎉 Simplified dashboard test PASSED!');
  });

  test('should display key metrics and progress', async ({ page }) => {
    await page.goto('/dashboard-simple');
    await page.waitForLoadState('networkidle');
    
    // Check for key metrics in header
    await expect(page.locator('text=15 signups (30% to goal)')).toBeVisible();
    await expect(page.locator('text=$15,000 budget')).toBeVisible();
    
    // Check metric cards
    await expect(page.locator('text=Beta Signups')).toBeVisible();
    await expect(page.locator('text=Budget Available')).toBeVisible(); 
    await expect(page.locator('text=Progress to Goal')).toBeVisible();
    
    console.log('✅ All key metrics displayed correctly');
  });
  
  test('should have working glass morphism cards', async ({ page }) => {
    await page.goto('/dashboard-simple');
    await page.waitForLoadState('networkidle');
    
    const glassCards = page.locator('.pm33-glass-card, [data-testid*="card"]');
    const cardCount = await glassCards.count();
    
    console.log(`Found ${cardCount} cards with theme support`);
    expect(cardCount).toBeGreaterThan(3);
    
    // Test hover effect on first card
    if (cardCount > 0) {
      const firstCard = glassCards.first();
      
      // Get initial transform
      const initialTransform = await firstCard.evaluate(el => getComputedStyle(el).transform);
      
      // Hover
      await firstCard.hover();
      
      // Get hover transform
      const hoverTransform = await firstCard.evaluate(el => getComputedStyle(el).transform);
      
      // Should have changed
      expect(hoverTransform).not.toBe(initialTransform);
      console.log('✅ Hover animations working');
    }
  });
});