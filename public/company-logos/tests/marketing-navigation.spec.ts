import { test, expect } from '@playwright/test';

test.describe('Marketing Navigation & Styling Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Navigation displays correct marketing pages', async ({ page }) => {
    // Verify correct navigation items are visible in nav
    await expect(page.locator('nav a[href="/features"]')).toBeVisible();
    await expect(page.locator('nav a[href="/blog"]')).toBeVisible();
    await expect(page.locator('nav a[href="/pricing"]')).toBeVisible();
    await expect(page.locator('nav a[href="/about"]')).toBeVisible();
    await expect(page.locator('nav a[href="/contact"]')).toBeVisible();
    await expect(page.locator('nav a[href="/command-center-demo"]')).toBeVisible();
  });

  test('Logo displays correctly with proper sizing', async ({ page }) => {
    const logo = page.locator('img[alt="PM33 Strategic Intelligence Platform Logo"]');
    
    // Verify logo is visible
    await expect(logo).toBeVisible();
    
    // Verify logo dimensions
    const logoBox = await logo.boundingBox();
    expect(logoBox?.height).toBeLessThanOrEqual(50);
    expect(logoBox?.height).toBeGreaterThan(30);
  });

  test('All navigation pages return 200 status', async ({ page }) => {
    const pages = ['/', '/features', '/blog', '/pricing', '/about', '/contact'];
    
    for (const pagePath of pages) {
      const response = await page.goto(pagePath);
      expect(response?.status()).toBe(200);
    }
  });

  test('Company carousel displays correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check for company logos section
    const carouselSection = page.locator('text=Companies We Work With');
    await expect(carouselSection).toBeVisible();
  });
});
