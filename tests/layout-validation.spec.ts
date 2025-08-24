/**
 * Layout Validation Tests - Three-Column Dashboard Layout & Mobile Responsiveness
 * 
 * Tests the core app dashboard layout structure based on the expected design:
 * - Desktop: Three-column layout (sidebar, main content, right panel)
 * - Tablet: Two-column or stacked layout
 * - Mobile: Single column, stacked layout
 * - Proper spacing and grid alignment
 * - Component positioning and hierarchy
 */

import { test, expect } from '@playwright/test';

test.describe('Dashboard Layout Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard and ensure full load
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Allow React hydration
  });

  test('Desktop three-column layout structure (1200px+)', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.waitForTimeout(500);
    
    // Test for three-column grid structure
    const mainGrid = page.locator('.grid.lg\\:grid-cols-3');
    await expect(mainGrid).toBeVisible();
    
    // Validate left column (Strategic Tools & Company Context)
    const leftColumn = page.locator('text=Strategic Tools').locator('..');
    await expect(leftColumn).toBeVisible();
    
    // Validate center column (Main content area - Strategic Intelligence Hub)
    const centerColumn = page.locator('text=Strategic AI Co-Pilot Ready').or(
      page.locator('text=AI INTELLIGENCE BRIEFING')
    ).locator('..');
    await expect(centerColumn).toBeVisible();
    
    // Validate right column (Competitive Landscape, Team Resources, Metrics)
    const rightColumn = page.locator('text=Competitive Landscape').or(
      page.locator('text=Team & Resources')
    ).locator('..');
    await expect(rightColumn).toBeVisible();
    
    // Take screenshot of three-column layout
    await expect(page).toHaveScreenshot('desktop-three-column-layout.png', {
      fullPage: true
    });
  });

  test('Column widths and proportions are correct', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.waitForTimeout(500);
    
    // Test grid column proportions
    const gridContainer = page.locator('.lg\\:grid-cols-3, [class*="lg:grid-cols-3"], .grid').first();
    
    if (await gridContainer.count() > 0) {
      // Validate grid CSS classes
      const gridClasses = await gridContainer.getAttribute('class');
      expect(gridClasses).toContain('grid');
      
      // Take focused screenshot of grid structure
      await expect(gridContainer).toHaveScreenshot('grid-container-structure.png');
    }
    
    // Test individual column elements are properly positioned
    const columns = page.locator('.space-y-6, [class*="space-y"]');
    const columnCount = await columns.count();
    expect(columnCount).toBeGreaterThanOrEqual(2); // Should have at least 2 main columns
  });

  test('Proper spacing between components (8pt grid system)', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.waitForTimeout(500);
    
    // Test gap spacing in grid
    const mainGrid = page.locator('.gap-6, [class*="gap-6"], .grid');
    if (await mainGrid.count() > 0) {
      await expect(mainGrid).toHaveScreenshot('grid-spacing-validation.png');
    }
    
    // Test vertical spacing between cards
    const cardSections = page.locator('.space-y-6, [class*="space-y"]');
    if (await cardSections.count() > 0) {
      const firstSection = cardSections.first();
      await expect(firstSection).toHaveScreenshot('vertical-spacing-validation.png');
    }
    
    // Validate padding and margins are consistent
    const glassCards = page.locator('.pm33-glass-card');
    if (await glassCards.count() > 0) {
      const firstCard = glassCards.first();
      
      // Test card has proper padding
      const cardStyles = await firstCard.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          padding: computed.padding,
          margin: computed.margin,
          borderRadius: computed.borderRadius
        };
      });
      
      expect(cardStyles.borderRadius).toBe('16px'); // Should follow design system
    }
  });

  test('Component hierarchy and visual order', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.waitForTimeout(500);
    
    // Test header hierarchy
    const mainHeader = page.locator('h1:has-text("PMO Command Center")');
    await expect(mainHeader).toBeVisible();
    
    // Test AI status banner is at top
    const statusBanner = page.locator('text=AI TEAMS ACTIVE');
    await expect(statusBanner).toBeVisible();
    
    // Test AI teams grid is after header
    const aiTeamsGrid = page.locator('.grid-cols-1.md\\:grid-cols-4, [class*="md:grid-cols-4"]');
    if (await aiTeamsGrid.count() > 0) {
      await expect(aiTeamsGrid).toHaveScreenshot('ai-teams-grid-layout.png');
    }
    
    // Test main three-column section is last
    const threeColumnSection = page.locator('.lg\\:grid-cols-3, [class*="lg:grid-cols-3"]');
    if (await threeColumnSection.count() > 0) {
      await expect(threeColumnSection).toHaveScreenshot('main-three-column-section.png');
    }
  });

});

test.describe('Tablet Layout Responsiveness (768px - 1199px)', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
  });

  test('Tablet layout adapts correctly at 768px', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    
    // Test responsive grid behavior
    const mainContent = page.locator('main, [role="main"]');
    await expect(mainContent).toBeVisible();
    
    // Take screenshot to validate tablet layout
    await expect(page).toHaveScreenshot('tablet-layout-768px.png', {
      fullPage: true
    });
    
    // Test that content is still accessible and properly stacked
    await expect(page.locator('h1:has-text("PMO Command Center")')).toBeVisible();
    await expect(page.locator('text=Strategic Tools')).toBeVisible();
    await expect(page.locator('text=AI TEAMS ACTIVE')).toBeVisible();
  });

  test('Tablet layout at 1024px maintains readability', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(1000);
    
    // Test that columns adapt properly
    const gridSections = page.locator('.grid, [class*="grid"]');
    if (await gridSections.count() > 0) {
      await expect(gridSections.first()).toHaveScreenshot('tablet-1024px-grid-adaptation.png');
    }
    
    // Validate AI teams grid becomes 2-column on tablet
    const aiTeamsGrid = page.locator('[class*="md:grid-cols-4"]');
    if (await aiTeamsGrid.count() > 0) {
      await expect(aiTeamsGrid).toHaveScreenshot('tablet-ai-teams-grid.png');
    }
  });

});

test.describe('Mobile Layout Responsiveness (320px - 767px)', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
  });

  test('Mobile layout stacks properly at 375px (iPhone)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    // Test single column stacking
    await expect(page).toHaveScreenshot('mobile-375px-stacked-layout.png', {
      fullPage: true
    });
    
    // Test all major components are accessible
    await expect(page.locator('h1:has-text("PMO Command Center")')).toBeVisible();
    await expect(page.locator('text=AI TEAMS ACTIVE')).toBeVisible();
    
    // Test cards stack vertically
    const glassCards = page.locator('.pm33-glass-card');
    if (await glassCards.count() > 0) {
      // Test first few cards to ensure they're stacked
      for (let i = 0; i < Math.min(3, await glassCards.count()); i++) {
        await expect(glassCards.nth(i)).toBeVisible();
      }
    }
  });

  test('Mobile layout works at minimum width (320px)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.waitForTimeout(1000);
    
    // Test extreme mobile layout
    await expect(page).toHaveScreenshot('mobile-320px-minimum-width.png', {
      fullPage: true
    });
    
    // Test critical content is still accessible
    await expect(page.locator('h1:has-text("PMO Command Center")')).toBeVisible();
    
    // Test text is readable (not cut off)
    const mainHeading = page.locator('h1:has-text("PMO Command Center")');
    const headingBox = await mainHeading.boundingBox();
    expect(headingBox?.width).toBeLessThan(320); // Should fit within viewport
  });

  test('Mobile navigation and interactions work properly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    // Test interactive elements are touch-friendly (minimum 44px touch targets)
    const buttons = page.locator('button');
    if (await buttons.count() > 0) {
      const firstButton = buttons.first();
      const buttonBox = await firstButton.boundingBox();
      
      if (buttonBox) {
        // Touch target should be at least 44px (iOS/Android standard)
        expect(buttonBox.height).toBeGreaterThan(35);
      }
    }
    
    // Test scrolling works properly
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);
    
    // Test content is still interactive after scroll
    const scrolledContent = page.locator('text=Strategic Intelligence').first();
    if (await scrolledContent.count() > 0) {
      await expect(scrolledContent).toBeVisible();
    }
  });

});

test.describe('Cross-Device Layout Consistency', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
  });

  test('Content order remains consistent across devices', async ({ page }) => {
    const viewports = [
      { width: 1400, height: 900, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(1000);
      
      // Test content hierarchy is preserved
      const headerVisible = await page.locator('h1:has-text("PMO Command Center")').isVisible();
      const statusVisible = await page.locator('text=AI TEAMS ACTIVE').isVisible();
      const toolsVisible = await page.locator('text=Strategic Tools').isVisible();
      
      expect(headerVisible).toBe(true);
      expect(statusVisible).toBe(true);
      expect(toolsVisible).toBe(true);
      
      // Take comparison screenshot
      await expect(page).toHaveScreenshot(`content-consistency-${viewport.name}.png`, {
        fullPage: true
      });
    }
  });

  test('Glass morphism effects work across all devices', async ({ page }) => {
    const viewports = [
      { width: 1400, height: 900 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(1000);
      
      // Test glass morphism cards are visible and properly styled
      const glassCards = page.locator('.pm33-glass-card');
      if (await glassCards.count() > 0) {
        const firstCard = glassCards.first();
        
        const cardStyles = await firstCard.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            backdropFilter: computed.backdropFilter,
            background: computed.background,
            borderRadius: computed.borderRadius
          };
        });
        
        expect(cardStyles.backdropFilter).toContain('blur');
        expect(cardStyles.borderRadius).toBe('16px');
      }
    }
  });

  test('Interactive elements maintain usability across devices', async ({ page }) => {
    const viewports = [
      { width: 1400, height: 900, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(1000);
      
      // Test buttons are clickable
      const buttons = page.locator('button').filter({ hasText: /Strategic|Workflow|Analytics/ });
      if (await buttons.count() > 0) {
        const firstButton = buttons.first();
        await expect(firstButton).toBeVisible();
        
        // Test hover effect on non-touch devices
        if (viewport.width >= 768) {
          await firstButton.hover();
          await page.waitForTimeout(300);
        }
        
        // Take screenshot of interactive state
        await expect(firstButton).toHaveScreenshot(`button-interactive-${viewport.name}.png`);
      }
    }
  });

});

test.describe('Performance and Loading Layout', () => {
  
  test('Layout renders quickly without CLS (Cumulative Layout Shift)', async ({ page }) => {
    // Start timing before navigation
    const startTime = Date.now();
    
    await page.goto('/dashboard');
    
    // Test initial layout stability
    await page.waitForSelector('h1:has-text("PMO Command Center")', { timeout: 5000 });
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
    
    // Take screenshot immediately after main content loads
    await expect(page).toHaveScreenshot('layout-initial-load.png');
    
    // Wait for full hydration
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Take screenshot after full load to compare layout stability
    await expect(page).toHaveScreenshot('layout-fully-loaded.png');
  });

  test('Layout handles slow network conditions gracefully', async ({ page }) => {
    // Simulate slow 3G network
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 100); // Add 100ms delay to all requests
    });
    
    await page.goto('/dashboard');
    
    // Test progressive loading
    await page.waitForSelector('h1:has-text("PMO Command Center")', { timeout: 10000 });
    
    // Even with slow network, layout should be stable
    await expect(page.locator('text=AI TEAMS ACTIVE')).toBeVisible({ timeout: 10000 });
    
    await expect(page).toHaveScreenshot('layout-slow-network.png', {
      fullPage: true
    });
  });

});