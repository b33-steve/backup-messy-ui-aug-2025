/**
 * Debug test for dashboard-v1 page - checking what's actually rendering
 */

import { test, expect } from '@playwright/test';

test.describe('Dashboard V1 - Debug', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dashboard-v1 page
    await page.goto('/dashboard-v1');
    await page.waitForLoadState('networkidle');
  });

  test('should debug page rendering', async ({ page }) => {
    console.log('🔍 Debug Test: Starting dashboard-v1 analysis...');
    
    // Check page title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Check if navigation is present
    const navigation = page.locator('nav, header, .navigation');
    const navCount = await navigation.count();
    console.log('Navigation elements found:', navCount);
    
    // Check for main content areas
    const mainContent = page.locator('main, [role="main"], .pm33-layout-compact');
    const mainCount = await mainContent.count();
    console.log('Main content areas found:', mainCount);
    
    // Check for any h1 elements
    const h1Elements = page.locator('h1');
    const h1Count = await h1Elements.count();
    console.log('H1 elements found:', h1Count);
    
    if (h1Count > 0) {
      for (let i = 0; i < h1Count; i++) {
        const h1Text = await h1Elements.nth(i).textContent();
        const h1Class = await h1Elements.nth(i).getAttribute('class');
        console.log(`H1 ${i}: text="${h1Text}", class="${h1Class}"`);
      }
    }
    
    // Check for PM33Card elements
    const pm33Cards = page.locator('[data-testid*="card"]');
    const cardCount = await pm33Cards.count();
    console.log('PM33 cards found:', cardCount);
    
    // Check console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
        console.log('Console error:', msg.text());
      }
    });
    
    // Wait a bit for any async content to load
    await page.waitForTimeout(2000);
    
    // Log all errors found
    console.log('Total console errors:', errors.length);
    errors.forEach((error, index) => {
      console.log(`Error ${index + 1}:`, error);
    });
    
    // Take a screenshot for visual inspection
    await page.screenshot({ path: 'dashboard-v1-debug.png', fullPage: true });
    
    // Basic assertion - page should at least load
    expect(title).toBeTruthy();
  });

  test('should check specific dashboard content', async ({ page }) => {
    // Wait for any client-side rendering
    await page.waitForTimeout(3000);
    
    // Check if the page has the basic PM33 structure
    const pm33Layout = page.locator('.pm33-layout-compact, .pm33-gray-gradient-bg');
    if (await pm33Layout.count() > 0) {
      console.log('✅ PM33 layout container found');
      await expect(pm33Layout.first()).toBeVisible();
    } else {
      console.log('❌ No PM33 layout container found');
    }
    
    // Check for any text content that should be there
    const bodyText = await page.textContent('body');
    console.log('Body text length:', bodyText?.length || 0);
    
    if (bodyText?.includes('PMO Command Center')) {
      console.log('✅ PMO Command Center text found');
    } else {
      console.log('❌ PMO Command Center text not found');
    }
    
    if (bodyText?.includes('Strategic Tools')) {
      console.log('✅ Strategic Tools text found');
    } else {
      console.log('❌ Strategic Tools text not found');
    }
  });
});