/**
 * File: tests/marketing/full-page-scroll-validation.spec.ts
 * Tests that all marketing pages can be scrolled completely to bottom
 * Validates footer structure and page completeness per user requirements
 * RELEVANT FILES: app/(marketing)/layout.tsx, app/(marketing)/page.tsx
 */

import { test, expect } from '@playwright/test';

test.describe('PM33 Marketing Full Page Scroll Validation', () => {
  
  const marketingPages = [
    { path: '/', name: 'Homepage' },
    { path: '/about', name: 'About' },
    { path: '/features', name: 'Features' },
    { path: '/pricing', name: 'Pricing' },
    { path: '/blog', name: 'Blog' },
    { path: '/contact', name: 'Contact' },
    { path: '/trial', name: 'Trial' },
    { path: '/command-center-demo', name: 'Command Center Demo' }
  ];

  for (const page of marketingPages) {
    test(`${page.name} should scroll completely to bottom and show footer`, async ({ page: browserPage }) => {
      await browserPage.goto(page.path, { waitUntil: 'networkidle' });
      
      // Wait for page to load completely
      await browserPage.waitForLoadState('domcontentloaded');
      
      // Get initial scroll position
      const initialScrollY = await browserPage.evaluate(() => window.scrollY);
      expect(initialScrollY).toBe(0);
      
      // Get page height before scrolling
      const pageHeight = await browserPage.evaluate(() => document.body.scrollHeight);
      
      // Scroll to the very bottom of the page
      await browserPage.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      
      // Wait for scroll to complete
      await browserPage.waitForTimeout(1000);
      
      // Verify we're at the bottom
      const finalScrollY = await browserPage.evaluate(() => window.scrollY);
      expect(finalScrollY).toBeGreaterThan(initialScrollY);
      
      // Verify footer is visible at bottom
      const footer = browserPage.locator('footer');
      await expect(footer).toBeVisible();
      
      // Verify comprehensive footer structure per user requirements
      // User specified: "Demo Pricing Integrations Community Blog PM Community Resources Company About Contact Privacy"
      await expect(footer.locator('text=Product')).toBeVisible();
      await expect(footer.locator('text=Demo')).toBeVisible();
      await expect(footer.locator('text=Pricing')).toBeVisible();
      await expect(footer.locator('text=Integrations')).toBeVisible();
      
      await expect(footer.locator('text=Community')).toBeVisible();
      await expect(footer.locator('text=Blog')).toBeVisible();
      await expect(footer.locator('text=PM Community')).toBeVisible();
      
      await expect(footer.locator('text=Resources')).toBeVisible();
      
      await expect(footer.locator('text=Company')).toBeVisible();
      await expect(footer.locator('text=About')).toBeVisible();
      await expect(footer.locator('text=Contact')).toBeVisible();
      await expect(footer.locator('text=Privacy')).toBeVisible();
      
      // Verify copyright notice
      await expect(footer.locator('text=© 2025 PM33')).toBeVisible();
      
      // Verify page has substantial content (not empty)
      expect(pageHeight).toBeGreaterThan(500);
      
      // Take screenshot of bottom of page for visual validation
      await browserPage.screenshot({
        path: `test-results/full-page-scroll/${page.name.toLowerCase().replace(' ', '-')}-bottom.png`,
        fullPage: false // Only current viewport at bottom
      });
      
      // Scroll back to top to verify page navigation
      await browserPage.evaluate(() => window.scrollTo(0, 0));
      await browserPage.waitForTimeout(500);
      
      const backToTopScrollY = await browserPage.evaluate(() => window.scrollY);
      expect(backToTopScrollY).toBe(0);
    });
    
    test(`${page.name} should have proper responsive footer on mobile`, async ({ page: browserPage }) => {
      // Set mobile viewport
      await browserPage.setViewportSize({ width: 375, height: 667 });
      await browserPage.goto(page.path, { waitUntil: 'networkidle' });
      
      // Scroll to bottom on mobile
      await browserPage.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      
      await browserPage.waitForTimeout(1000);
      
      // Verify footer is still visible and properly formatted on mobile
      const footer = browserPage.locator('footer');
      await expect(footer).toBeVisible();
      
      // Footer should stack vertically on mobile
      const footerGrid = footer.locator('.mantine-Grid-root');
      await expect(footerGrid).toBeVisible();
      
      // Take mobile screenshot
      await browserPage.screenshot({
        path: `test-results/full-page-scroll/${page.name.toLowerCase().replace(' ', '-')}-mobile-bottom.png`,
        fullPage: false
      });
    });
  }
  
  test('All marketing pages should be scrollable without horizontal overflow', async ({ page }) => {
    for (const marketingPage of marketingPages) {
      await page.goto(marketingPage.path, { waitUntil: 'networkidle' });
      
      // Check for horizontal scroll
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.body.scrollWidth > window.innerWidth;
      });
      
      expect(hasHorizontalScroll).toBeFalsy();
      
      // Scroll through page and ensure no horizontal overflow occurs
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight / 2);
      });
      await page.waitForTimeout(200);
      
      const midPageHorizontalScroll = await page.evaluate(() => {
        return document.body.scrollWidth > window.innerWidth;
      });
      
      expect(midPageHorizontalScroll).toBeFalsy();
    }
  });
});