/**
 * Three-Column Layout Validation - Visual Structure Testing
 * 
 * Tests that the dashboard actually displays as a three-column layout at desktop sizes
 * and validates that the global CSS system is applied across all pages.
 * 
 * This test validates the VISUAL appearance, not just the presence of CSS classes.
 */

import { test, expect } from '@playwright/test';

test.describe('Three-Column Layout Visual Validation', () => {
  
  test('Dashboard shows three distinct columns at desktop size', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Allow animations to complete
    
    // Check that the three-column grid exists
    const threeColumnGrid = page.locator('.lg\\:grid-cols-3');
    await expect(threeColumnGrid).toBeVisible();
    
    // Get the computed style of the grid container
    const gridStyles = await threeColumnGrid.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        gridTemplateColumns: computed.gridTemplateColumns,
        gap: computed.gap
      };
    });
    
    // Validate it's actually displaying as a grid with three columns
    expect(gridStyles.display).toBe('grid');
    expect(gridStyles.gridTemplateColumns).toBeTruthy(); // Should have column definitions
    expect(gridStyles.gridTemplateColumns.split(' ').length).toBe(3); // Should have 3 columns
    console.log('✅ Grid styles:', gridStyles);
    
    // Test that we can actually see three distinct column areas by measuring positions
    const leftColumn = page.locator('text=Strategic Tools').first();
    const centerColumn = page.locator('text=Strategic AI Co-Pilot Ready').first();
    const rightColumn = page.locator('text=Competitive Landscape').first();
    
    // All three columns should be visible
    await expect(leftColumn).toBeVisible();
    await expect(centerColumn).toBeVisible(); 
    await expect(rightColumn).toBeVisible();
    
    // Get the bounding boxes to verify horizontal positioning
    const leftBox = await leftColumn.boundingBox();
    const centerBox = await centerColumn.boundingBox();
    const rightBox = await rightColumn.boundingBox();
    
    // Verify three columns are horizontally arranged (left < center < right)
    if (leftBox && centerBox && rightBox) {
      expect(leftBox.x).toBeLessThan(centerBox.x);
      expect(centerBox.x).toBeLessThan(rightBox.x);
      
      console.log('✅ Column positions:', {
        left: leftBox.x,
        center: centerBox.x, 
        right: rightBox.x
      });
    }
    
    // Take screenshot to validate visual layout
    await expect(page).toHaveScreenshot('three-column-desktop-layout.png', {
      fullPage: true
    });
  });
  
  test('Mobile view shows single column (responsive behavior)', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // On mobile, content should stack vertically
    const threeColumnGrid = page.locator('.lg\\:grid-cols-3');
    const gridStyles = await threeColumnGrid.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        gridTemplateColumns: computed.gridTemplateColumns
      };
    });
    
    // Should be single column on mobile (width matches viewport or 1fr)
    expect(gridStyles.gridTemplateColumns).toMatch(/^(1fr|375px)$/);
    
    // Take screenshot to validate mobile layout
    await expect(page).toHaveScreenshot('single-column-mobile-layout.png', {
      fullPage: true
    });
    
    console.log('✅ Mobile layout verified - single column');
  });
  
  test('Glass morphism cards are visually styled with backdrop blur', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Find glass morphism cards
    const glassCards = page.locator('.pm33-glass-card');
    const cardCount = await glassCards.count();
    expect(cardCount).toBeGreaterThan(0);
    
    // Check the first few cards have proper glass morphism styling
    for (let i = 0; i < Math.min(3, cardCount); i++) {
      const card = glassCards.nth(i);
      
      const cardStyles = await card.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          backdropFilter: computed.backdropFilter,
          background: computed.background,
          borderRadius: computed.borderRadius,
          border: computed.border
        };
      });
      
      // Validate glass morphism properties
      expect(cardStyles.backdropFilter).toContain('blur');
      expect(cardStyles.borderRadius).toBe('16px'); // Should follow design system
      
      console.log(`✅ Glass card ${i + 1} styling:`, cardStyles);
    }
    
    // Take screenshot of glass cards
    await glassCards.first().screenshot({ 
      path: `test-results/glass-morphism-card-styling.png`
    });
  });
  
});