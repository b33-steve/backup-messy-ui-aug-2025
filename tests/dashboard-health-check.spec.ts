/**
 * Dashboard Health Check - Simplified UI Validation
 * 
 * Quick validation test to ensure dashboard loads and core elements are present.
 * This test focuses on essential functionality rather than strict element matching.
 */

import { test, expect } from '@playwright/test';

test.describe('Dashboard Health Check', () => {
  
  test('Dashboard loads successfully with core content', async ({ page }) => {
    // Navigate to dashboard
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Verify page loads (not 404/500)
    expect(page.url()).toContain('/dashboard');
    
    // Check for main heading
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    const headingText = await heading.textContent();
    expect(headingText).toContain('PMO Command Center');
    
    // Verify three-column layout exists
    const threeColumnGrid = page.locator('.lg\\:grid-cols-3').first();
    await expect(threeColumnGrid).toBeVisible();
    
    // Check for key content sections
    await expect(page.locator('text=Strategic Tools')).toBeVisible();
    await expect(page.locator('text=AI TEAMS ACTIVE')).toBeVisible();
    await expect(page.locator('text=Strategic Intelligence')).toBeVisible();
    
    console.log('✅ Dashboard health check passed - all core elements present');
  });
  
  test('Dashboard three-column layout structure', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Test main three-column grid
    const mainGrid = page.locator('.grid.lg\\:grid-cols-3');
    await expect(mainGrid).toBeVisible();
    
    // Test AI teams grid (4 columns on desktop)
    const aiTeamsGrid = page.locator('.grid.md\\:grid-cols-4');
    await expect(aiTeamsGrid).toBeVisible();
    
    // Test strategic scenarios grid (2 columns)
    const scenariosGrid = page.locator('.grid.md\\:grid-cols-2');
    await expect(scenariosGrid).toBeVisible();
    
    console.log('✅ All three dashboard grid systems are working correctly');
  });
  
  test('Dashboard responsive behavior', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Should still have core content
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=AI TEAMS ACTIVE')).toBeVisible();
    
    // Test desktop view
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.waitForTimeout(500);
    
    // Three-column layout should be active
    const threeColumnGrid = page.locator('.lg\\:grid-cols-3');
    await expect(threeColumnGrid).toBeVisible();
    
    console.log('✅ Dashboard responsive behavior working correctly');
  });
  
});