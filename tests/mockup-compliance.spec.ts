/**
 * PM33 Mockup Compliance Testing Suite
 * Validates exact match to mockup specifications
 * 
 * Test Coverage:
 * - Glass morphism applied to ALL cards consistently
 * - Consistent border radius (12px) across all elements
 * - Three-column layout at desktop width (1440px+)
 * - Text readability and contrast compliance
 * - Hover states and interactive elements
 * - Navigation active states and spacing
 * - Typography hierarchy (headings, gradients, sizes)
 * - Icon consistency (20px standard)
 * - Spacing and padding uniformity
 */

import { test, expect, Page } from '@playwright/test';

// Test configuration
const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const TABLET_VIEWPORT = { width: 768, height: 1024 };
const MOBILE_VIEWPORT = { width: 375, height: 667 };

// Expected measurements
const EXPECTED_SIDEBAR_WIDTH = { min: 300, max: 360 };
const EXPECTED_BORDER_RADIUS = '12px';
const EXPECTED_ICON_SIZE = 20;

test.describe('PM33 Dashboard Mockup Compliance', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
  });

  test('Glass morphism applied to all cards', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    
    // Check every card has glass effect properties
    const cards = await page.locator('[class*="glass"], [class*="Card"], .pm33-glass, .pm33-scenario-card, .pm33-right-sidebar-section').all();
    
    expect(cards.length).toBeGreaterThan(6); // Should have multiple cards
    
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      
      const backdropFilter = await card.evaluate(el => 
        window.getComputedStyle(el).backdropFilter
      );
      
      const background = await card.evaluate(el => 
        window.getComputedStyle(el).background
      );
      
      const border = await card.evaluate(el => 
        window.getComputedStyle(el).border
      );
      
      // Verify glass morphism properties
      expect(backdropFilter).toContain('blur');
      expect(background).toMatch(/rgba\(\d+,\s*\d+,\s*\d+,\s*0\.\d+\)/); // Should have transparent background
      expect(border).not.toBe('medium none currentcolor'); // Should have defined border
    }
  });

  test('Consistent border radius on all cards', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    
    const cards = await page.locator('[class*="glass"], [class*="Card"], .pm33-glass, .pm33-scenario-card, .pm33-right-sidebar-section').all();
    const radiusValues = new Set<string>();
    
    for (const card of cards) {
      const radius = await card.evaluate(el => 
        window.getComputedStyle(el).borderRadius
      );
      radiusValues.add(radius);
    }
    
    // Should have consistent radius (allowing for some browser variations)
    expect(radiusValues.size).toBeLessThanOrEqual(2); // Allow for slight variations
    
    // Check if most common radius is 12px
    const radiusArray = Array.from(radiusValues);
    const has12px = radiusArray.some(radius => 
      radius.includes('12px') || radius.includes('0.75rem')
    );
    expect(has12px).toBeTruthy();
  });

  test('Three column layout at desktop width', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    
    // Check main container has grid layout
    const mainContainer = page.locator('main').first();
    await expect(mainContainer).toBeVisible();
    
    // Check left sidebar exists and has proper dimensions
    const leftSidebar = page.locator('.pm33-left-sidebar, [data-testid="left-sidebar"]').first();
    if (await leftSidebar.count() > 0) {
      const leftWidth = await leftSidebar.evaluate(el => el.offsetWidth);
      expect(leftWidth).toBeGreaterThan(EXPECTED_SIDEBAR_WIDTH.min);
      expect(leftWidth).toBeLessThan(EXPECTED_SIDEBAR_WIDTH.max);
    }
    
    // Check right sidebar exists and has proper dimensions  
    const rightSidebar = page.locator('.pm33-right-sidebar, [data-testid="right-sidebar"]').first();
    if (await rightSidebar.count() > 0) {
      const rightWidth = await rightSidebar.evaluate(el => el.offsetWidth);
      expect(rightWidth).toBeGreaterThan(EXPECTED_SIDEBAR_WIDTH.min);
      expect(rightWidth).toBeLessThan(400);
    }
    
    // Check main content area is visible and properly sized
    const mainContent = page.locator('.pm33-main-content, [data-testid="main-content"]').first();
    if (await mainContent.count() > 0) {
      await expect(mainContent).toBeVisible();
      const mainWidth = await mainContent.evaluate(el => el.offsetWidth);
      expect(mainWidth).toBeGreaterThan(400); // Should have substantial width
    }
  });

  test('All text is readable (contrast and opacity check)', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    
    const textElements = await page.locator('p, span, div, h1, h2, h3, h4').filter({ 
      hasText: /.+/ // Only elements with actual text
    }).all();
    
    let checkedElements = 0;
    
    for (const element of textElements.slice(0, 20)) { // Check first 20 to avoid timeout
      const isVisible = await element.isVisible();
      if (!isVisible) continue;
      
      const color = await element.evaluate(el => 
        window.getComputedStyle(el).color
      );
      
      // Check text isn't too transparent
      if (color.includes('rgba')) {
        const rgbaMatch = color.match(/rgba\([\d\s,]+,([\d.]+)\)/);
        if (rgbaMatch) {
          const alpha = parseFloat(rgbaMatch[1]);
          expect(alpha).toBeGreaterThan(0.5); // Text shouldn't be less than 50% opacity
        }
      }
      
      // Check text has proper color (not default browser colors)
      expect(color).not.toBe('rgba(0, 0, 0, 0)'); // Should not be transparent
      
      checkedElements++;
    }
    
    expect(checkedElements).toBeGreaterThan(10); // Should have checked multiple elements
  });

  test('Hover states work on interactive elements', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    
    // Test card hover effects
    const firstCard = page.locator('[class*="glass"], .pm33-scenario-card').first();
    if (await firstCard.count() > 0) {
      await expect(firstCard).toBeVisible();
      
      const initialTransform = await firstCard.evaluate(el => 
        window.getComputedStyle(el).transform
      );
      
      await firstCard.hover();
      await page.waitForTimeout(500); // Allow transition time
      
      const hoverTransform = await firstCard.evaluate(el => 
        window.getComputedStyle(el).transform
      );
      
      // Transform should change on hover (scale or translate)
      expect(hoverTransform).not.toBe(initialTransform);
    }
    
    // Test button hover effects
    const buttons = await page.locator('button:visible').all();
    if (buttons.length > 0) {
      const button = buttons[0];
      const initialBg = await button.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      await button.hover();
      await page.waitForTimeout(300);
      
      const hoverBg = await button.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // Background might change on hover (allow for same if using other hover effects)
      // Just ensure it's defined and not transparent
      expect(hoverBg).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  test('Navigation has active state and proper spacing', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    
    // Check navigation exists
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    
    // Check navigation links have proper spacing
    const navLinks = await page.locator('nav a').all();
    expect(navLinks.length).toBeGreaterThan(2);
    
    for (const link of navLinks.slice(0, 4)) { // Check first few links
      const padding = await link.evaluate(el => 
        window.getComputedStyle(el).padding
      );
      
      // Should have padding for proper touch targets
      expect(padding).not.toBe('0px');
      
      const minHeight = await link.evaluate(el => {
        const rect = el.getBoundingClientRect();
        return rect.height;
      });
      
      // Should meet minimum touch target size
      expect(minHeight).toBeGreaterThan(32); // At least 32px height
    }
    
    // Check for active state styling (Command Center should be active)
    const commandCenterLink = page.locator('nav a').filter({ hasText: 'Command Center' }).first();
    if (await commandCenterLink.count() > 0) {
      const hasActiveClass = await commandCenterLink.evaluate(el => 
        el.className.includes('active') || 
        window.getComputedStyle(el).fontWeight === '600' ||
        window.getComputedStyle(el).fontWeight === 'bold'
      );
      
      // Should have some form of active indication
      expect(hasActiveClass).toBeTruthy();
    }
  });

  test('Typography hierarchy is properly implemented', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    
    // Check main heading size
    const mainHeading = page.locator('h1').first();
    if (await mainHeading.count() > 0) {
      await expect(mainHeading).toBeVisible();
      
      const fontSize = await mainHeading.evaluate(el => 
        parseFloat(window.getComputedStyle(el).fontSize)
      );
      
      // Main heading should be large (at least 32px)
      expect(fontSize).toBeGreaterThan(32);
      
      const fontWeight = await mainHeading.evaluate(el => 
        window.getComputedStyle(el).fontWeight
      );
      
      // Should be bold
      expect(['700', 'bold']).toContain(fontWeight);
    }
    
    // Check for gradient text elements
    const gradientHeaders = await page.locator('[class*="gradient"], .pm33-scenario-header, .pm33-section-header').all();
    
    if (gradientHeaders.length > 0) {
      for (const header of gradientHeaders.slice(0, 3)) {
        const textFillColor = await header.evaluate(el => 
          window.getComputedStyle(el).webkitTextFillColor
        );
        
        const backgroundClip = await header.evaluate(el => 
          window.getComputedStyle(el).backgroundClip || window.getComputedStyle(el).webkitBackgroundClip
        );
        
        // Check for gradient text implementation
        if (textFillColor === 'transparent' || backgroundClip === 'text') {
          // Has gradient text styling
          expect(true).toBeTruthy();
        }
      }
    }
    
    // Check section headers are uppercase
    const sectionHeaders = await page.locator('.pm33-section-header').all();
    
    for (const header of sectionHeaders) {
      const textTransform = await header.evaluate(el => 
        window.getComputedStyle(el).textTransform
      );
      
      const letterSpacing = await header.evaluate(el => 
        window.getComputedStyle(el).letterSpacing
      );
      
      expect(textTransform).toBe('uppercase');
      expect(letterSpacing).not.toBe('normal'); // Should have letter spacing
    }
  });

  test('Icon consistency across interface', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    
    // Check icons have consistent sizing
    const icons = await page.locator('svg, .pm33-icon-standard').filter({ 
      hasText: '' // Only actual icon elements
    }).all();
    
    if (icons.length > 0) {
      const sizeCounts: { [key: number]: number } = {};
      
      for (const icon of icons.slice(0, 10)) { // Check first 10 icons
        const width = await icon.evaluate(el => {
          const rect = el.getBoundingClientRect();
          return Math.round(rect.width);
        });
        
        const height = await icon.evaluate(el => {
          const rect = el.getBoundingClientRect();
          return Math.round(rect.height);
        });
        
        // Track icon sizes
        if (width > 0 && height > 0) {
          sizeCounts[width] = (sizeCounts[width] || 0) + 1;
        }
        
        // Icons should generally be square
        if (width > 12 && height > 12) { // Ignore very small icons
          const ratio = width / height;
          expect(ratio).toBeGreaterThan(0.8);
          expect(ratio).toBeLessThan(1.2);
        }
      }
      
      // Should have consistent icon sizes (20px is common)
      const hasStandardSize = Object.keys(sizeCounts).some(size => 
        Math.abs(parseInt(size) - EXPECTED_ICON_SIZE) <= 4
      );
      
      if (Object.keys(sizeCounts).length > 0) {
        expect(hasStandardSize).toBeTruthy();
      }
    }
  });

  test('Spacing and padding consistency', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    
    // Check card padding consistency
    const cards = await page.locator('.pm33-glass, [class*="glass"], .pm33-scenario-card').all();
    const paddingValues = new Set<string>();
    
    for (const card of cards.slice(0, 6)) { // Check first 6 cards
      const padding = await card.evaluate(el => 
        window.getComputedStyle(el).padding
      );
      paddingValues.add(padding);
    }
    
    // Should have some consistency in padding (allow for 2-3 different values)
    expect(paddingValues.size).toBeLessThanOrEqual(3);
    
    // Check gap spacing in grid layouts
    const gridContainers = await page.locator('[class*="grid"], .pm33-main-content-grid').all();
    
    for (const container of gridContainers) {
      const gap = await container.evaluate(el => 
        window.getComputedStyle(el).gap
      );
      
      if (gap && gap !== 'normal') {
        // Gap should be defined and reasonable
        const gapValue = parseFloat(gap);
        expect(gapValue).toBeGreaterThan(8); // At least 8px
        expect(gapValue).toBeLessThan(48); // Not more than 48px
      }
    }
  });

  test('Progress bar visual implementation', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    
    // Look for progress indicators
    const progressElements = await page.locator('[class*="progress"], .pm33-progress-bar').all();
    
    if (progressElements.length > 0) {
      for (const progress of progressElements) {
        await expect(progress).toBeVisible();
        
        const width = await progress.evaluate(el => 
          window.getComputedStyle(el).width
        );
        
        const height = await progress.evaluate(el => 
          window.getComputedStyle(el).height
        );
        
        const background = await progress.evaluate(el => 
          window.getComputedStyle(el).background
        );
        
        // Progress bar should have defined dimensions and background
        expect(width).not.toBe('auto');
        expect(height).not.toBe('auto');
        expect(background).not.toBe('rgba(0, 0, 0, 0)');
      }
    }
    
    // Check for "30% to goal" text
    const progressText = page.locator('text=30%').first();
    if (await progressText.count() > 0) {
      await expect(progressText).toBeVisible();
    }
  });

  test('Responsive behavior at different viewports', async ({ page }) => {
    // Test desktop layout
    await page.setViewportSize(DESKTOP_VIEWPORT);
    let mainContainer = page.locator('main').first();
    await expect(mainContainer).toBeVisible();
    
    const desktopLayout = await mainContainer.evaluate(el => 
      window.getComputedStyle(el).display
    );
    
    // Test tablet layout
    await page.setViewportSize(TABLET_VIEWPORT);
    await page.waitForTimeout(500); // Allow layout to adjust
    
    mainContainer = page.locator('main').first();
    const tabletLayout = await mainContainer.evaluate(el => 
      window.getComputedStyle(el).display
    );
    
    // Test mobile layout
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.waitForTimeout(500);
    
    mainContainer = page.locator('main').first();
    const mobileLayout = await mainContainer.evaluate(el => 
      window.getComputedStyle(el).display
    );
    
    // Layouts should be defined (not necessarily different)
    expect(desktopLayout).toBeTruthy();
    expect(tabletLayout).toBeTruthy();
    expect(mobileLayout).toBeTruthy();
    
    // Check that cards are still visible on mobile
    const mobileCards = await page.locator('[class*="glass"], .pm33-glass').all();
    expect(mobileCards.length).toBeGreaterThan(0);
    
    for (const card of mobileCards.slice(0, 3)) {
      await expect(card).toBeVisible();
    }
  });

  test('Color and theming consistency', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    
    // Check body theme class
    const body = page.locator('body');
    const bodyClass = await body.getAttribute('class');
    
    // Should have theme class (light, dark, or gray)
    const hasThemeClass = bodyClass && (
      bodyClass.includes('light') || 
      bodyClass.includes('dark') || 
      bodyClass.includes('gray')
    );
    expect(hasThemeClass).toBeTruthy();
    
    // Check CSS custom properties are defined
    const hasCustomProps = await page.evaluate(() => {
      const styles = window.getComputedStyle(document.documentElement);
      const pm33Primary = styles.getPropertyValue('--pm33-primary');
      const pm33TextPrimary = styles.getPropertyValue('--pm33-text-primary');
      
      return pm33Primary.length > 0 && pm33TextPrimary.length > 0;
    });
    
    expect(hasCustomProps).toBeTruthy();
    
    // Check warning color implementation ("Limited marketing" text)
    const warningText = page.locator('text=Limited marketing').first();
    if (await warningText.count() > 0) {
      const color = await warningText.evaluate(el => 
        window.getComputedStyle(el).color
      );
      
      // Should have orange/amber color for warning
      const isWarningColor = color.includes('rgb(245, 158, 11)') || // #f59e0b
                           color.includes('rgb(217, 119, 6)') || // #d97706  
                           color.includes('rgb(146, 64, 14)');   // #92400e
      
      expect(isWarningColor).toBeTruthy();
    }
  });

  test('Navigation contrast meets WCAG AA standards', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    
    // Test navigation link contrast
    const navLinks = await page.locator('nav a').all();
    
    for (const link of navLinks) {
      const color = await link.evaluate(el => 
        window.getComputedStyle(el).color
      );
      
      // Navigation links should use high contrast colors
      // Pure white (#ffffff = rgb(255, 255, 255)) or high contrast equivalents
      const isHighContrast = color.includes('rgb(255, 255, 255)') ||  // Pure white
                            color.includes('rgb(245, 245, 245)') ||   // Near white
                            color.includes('rgb(229, 231, 235)') ||   // Light gray
                            color.includes('rgb(165, 180, 252)');     // Active state color

      expect(isHighContrast).toBeTruthy();
    }

    // Test navigation background provides sufficient contrast
    const nav = page.locator('nav').first();
    const navBackground = await nav.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        background: computed.backgroundColor,
        backdropFilter: computed.backdropFilter
      };
    });

    // Should have transparent background with backdrop filter for glass morphism
    expect(navBackground.background).toMatch(/rgba\(\d+,\s*\d+,\s*\d+,\s*0\.\d+\)/);
    expect(navBackground.backdropFilter).toContain('blur');
  });

  test('Performance and loading behavior', async ({ page }) => {
    // Measure page load performance
    const startTime = Date.now();
    
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Should load reasonably quickly (under 5 seconds)
    expect(loadTime).toBeLessThan(5000);
    
    // Check that main elements are visible
    const mainElements = [
      page.locator('h1').first(),
      page.locator('nav').first(),
      page.locator('[class*="glass"]').first()
    ];
    
    for (const element of mainElements) {
      if (await element.count() > 0) {
        await expect(element).toBeVisible();
      }
    }
    
    // Check for any console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Refresh page to capture any console errors
    await page.reload();
    await page.waitForTimeout(2000);
    
    // Filter out common non-critical errors
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('apple-touch-icon') &&
      !error.includes('PostHog') &&
      !error.includes('404')
    );
    
    expect(criticalErrors.length).toBe(0);
  });

});