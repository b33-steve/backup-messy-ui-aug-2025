/**
 * Marketing Navigation and Styling Validation Test
 * Tests proper navigation display, styling, and functionality
 * 
 * CRITICAL: Must pass for any navigation/styling changes
 */

import { test, expect } from '@playwright/test';

test.describe('Marketing Navigation & Styling Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Navigation displays correct marketing pages', async ({ page }) => {
    // Verify correct navigation items are visible in nav
    await expect(page.locator('nav a[href="/features"]')).toBeVisible();
    await expect(page.locator('nav a[href="/pricing"]')).toBeVisible();
    await expect(page.locator('nav a[href="/about"]')).toBeVisible();
    await expect(page.locator('nav a[href="/contact"]')).toBeVisible();
    await expect(page.locator('nav a[href="/command-center-demo"]')).toBeVisible();

    // Verify navigation has correct text
    await expect(page.locator('nav').locator('text=Features')).toBeVisible();
    await expect(page.locator('nav').locator('text=Pricing')).toBeVisible();
    await expect(page.locator('nav').locator('text=About')).toBeVisible();
    await expect(page.locator('nav').locator('text=Contact')).toBeVisible();
    await expect(page.locator('nav').locator('text=Demo')).toBeVisible();
  });

  test('Logo displays correctly with proper sizing', async ({ page }) => {
    const logo = page.locator('img[alt="PM33 Strategic Intelligence Platform Logo"]');
    
    // Verify logo is visible
    await expect(logo).toBeVisible();
    
    // Verify logo dimensions
    const logoBox = await logo.boundingBox();
    expect(logoBox?.height).toBeLessThanOrEqual(40);
    expect(logoBox?.height).toBeGreaterThan(30);
  });

  test('Header spacing and layout is correct', async ({ page }) => {
    const navigation = page.locator('nav');
    
    // Verify navigation exists and is properly positioned
    await expect(navigation).toBeVisible();
    
    // Check that navigation has proper styling
    const navStyles = await navigation.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        position: styles.position,
        zIndex: styles.zIndex,
        backgroundColor: styles.backgroundColor
      };
    });
    
    expect(navStyles.position).toBe('sticky');
    expect(parseInt(navStyles.zIndex)).toBeGreaterThan(10);
  });

  test('Badge displays with correct styling', async ({ page }) => {
    const badge = page.locator('nav').locator('.mantine-Badge-root');
    
    // Verify badge is visible
    await expect(badge).toBeVisible();
    
    // Verify badge has gradient styling
    const badgeElement = await badge.elementHandle();
    const hasGradient = await badgeElement?.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.background.includes('gradient') || styles.backgroundImage.includes('gradient');
    });
    
    expect(hasGradient).toBeTruthy();
  });

  test('All navigation links work correctly', async ({ page }) => {
    // Test Features link
    await page.click('text=Features');
    await expect(page).toHaveURL(/.*features/);
    await expect(page.locator('h1, h2')).toBeVisible(); // Should have content
    
    // Go back to home
    await page.goto('http://localhost:3003');
    
    // Test Pricing link  
    await page.click('text=Pricing');
    await expect(page).toHaveURL(/.*pricing/);
    await expect(page.locator('h1, h2')).toBeVisible();
    
    // Go back to home
    await page.goto('http://localhost:3003');
    
    // Test About link
    await page.click('text=About');
    await expect(page).toHaveURL(/.*about/);
    await expect(page.locator('h1, h2')).toBeVisible();
    
    // Go back to home
    await page.goto('http://localhost:3003');
    
    // Test Contact link
    await page.click('text=Contact');
    await expect(page).toHaveURL(/.*contact/);
    await expect(page.locator('h1, h2')).toBeVisible();
  });

  test('Marketing context styling is applied correctly', async ({ page }) => {
    // Verify marketing-context class is applied
    const marketingContext = page.locator('.marketing-context');
    await expect(marketingContext).toBeVisible();
    
    // Verify marketing color variables are working
    const bodyStyles = await page.locator('body').evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        fontFamily: styles.fontFamily,
        backgroundColor: styles.backgroundColor
      };
    });
    
    expect(bodyStyles.fontFamily).toContain('Inter');
  });

  test('Typography hierarchy is correct', async ({ page }) => {
    // Navigate to a content page to check typography
    await page.goto('/about');
    
    // Check that headings exist and have proper hierarchy
    const h1Elements = await page.locator('h1').count();
    expect(h1Elements).toBeGreaterThanOrEqual(1);
    
    // Verify font sizes are applied
    const h1Styles = await page.locator('h1').first().evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        lineHeight: styles.lineHeight
      };
    });
    
    expect(parseInt(h1Styles.fontSize)).toBeGreaterThan(24); // Should be larger than 24px
    expect(parseInt(h1Styles.fontWeight)).toBeGreaterThanOrEqual(600);
  });

  test('Responsive design on mobile', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Logo should still be visible on mobile
    const logo = page.locator('img[alt="PM33 Strategic Intelligence Platform Logo"]');
    await expect(logo).toBeVisible();
    
    // Mobile menu should be available
    const mobileMenuButton = page.locator('[aria-label="Open navigation"], button[aria-expanded]');
    if (await mobileMenuButton.count() > 0) {
      await expect(mobileMenuButton).toBeVisible();
    }
  });

  test('Company carousel displays and functions correctly', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Verify carousel section exists
    await expect(page.locator('text=Companies We Work With')).toBeVisible();
    await expect(page.locator('text=Trusted by leading product teams')).toBeVisible();
    
    // Wait for carousel to load
    await page.waitForTimeout(2000); // Give carousel animation time to start
    
    // Verify company logos are loaded
    const logos = page.locator('img[src^="/company-logos/"]');
    const logoCount = await logos.count();
    expect(logoCount).toBeGreaterThan(5); // Should have multiple logos
    
    // Verify first logo is visible and properly styled
    const firstLogo = logos.first();
    await expect(firstLogo).toBeVisible();
    
    // Check that logos are properly styled (grayscale filter)
    const logoStyle = await firstLogo.evaluate(el => {
      return window.getComputedStyle(el).filter;
    });
    expect(logoStyle).toContain('grayscale');
  });
});

test.describe('Page Content Validation', () => {
  const pages = [
    { path: '', name: 'Homepage' },
    { path: 'features', name: 'Features' },
    { path: 'blog', name: 'Blog' },
    { path: 'pricing', name: 'Pricing' },
    { path: 'about', name: 'About' },
    { path: 'contact', name: 'Contact' }
  ];

  pages.forEach(({ path, name }) => {
    test(`${name} page displays proper content and styling`, async ({ page }) => {
      await page.goto(`/${path}`);
      
      // Verify page loads successfully (use first to avoid strict mode)
      await expect(page.locator('h1, h2').first()).toBeVisible();
      
      // Verify navigation is present
      await expect(page.locator('nav')).toBeVisible();
      
      // Verify footer is present  
      await expect(page.locator('text=© 2025 PM33')).toBeVisible();
      
      // Verify no console errors
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      
      // Wait for any potential console errors
      await page.waitForTimeout(1000);
      expect(consoleErrors.length).toBe(0);
    });
  });
});