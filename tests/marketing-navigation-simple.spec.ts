import { test, expect } from '@playwright/test';

/**
 * Simplified Marketing Navigation Tests
 * 
 * Essential navigation testing for PM33 marketing website
 */

test.describe('Marketing Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('header navigation is present and functional', async ({ page }) => {
    // Check that navigation links are visible and working - use nav context to avoid footer conflicts
    const nav = page.locator('nav');
    await expect(nav.getByRole('link', { name: 'Features' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Pricing' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Blog' })).toBeVisible();
    
    // Check CTA button is present
    await expect(nav.getByRole('link', { name: /trial/i })).toBeVisible();
  });

  test('navigation links navigate to correct pages', async ({ page }) => {
    const nav = page.locator('nav');
    
    // Test Features page
    await nav.getByRole('link', { name: 'Features' }).click();
    await expect(page).toHaveURL('/features');
    // Note: Features page may not exist yet, so just check URL
    
    // Go back to home and test pricing
    await page.goto('/');
    await nav.getByRole('link', { name: 'Pricing' }).click();
    await expect(page).toHaveURL('/pricing');
    
    // Test About page
    await page.goto('/');
    await nav.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');
    
    // Test Contact page
    await page.goto('/');
    await nav.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL('/contact');
    
    // Test Blog page
    await page.goto('/');
    await nav.getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL('/blog');
  });

  test('footer navigation is present', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check footer has navigation sections
    await expect(footer).toContainText('Product');
    await expect(footer).toContainText('Resources');
    await expect(footer).toContainText('Legal');
    await expect(footer).toContainText('Connect');
    
    // Check copyright notice
    await expect(footer).toContainText('© 2025 PM33');
  });

  test('footer links work correctly', async ({ page }) => {
    const footer = page.locator('footer');
    
    // Test footer features link
    const footerFeaturesLink = footer.getByRole('link', { name: 'Features' });
    if (await footerFeaturesLink.count() > 0) {
      await footerFeaturesLink.click();
      await expect(page).toHaveURL('/features');
      await page.goBack();
    }
    
    // Test footer pricing link
    const footerPricingLink = footer.getByRole('link', { name: 'Pricing' });
    if (await footerPricingLink.count() > 0) {
      await footerPricingLink.click();
      await expect(page).toHaveURL('/pricing');
      await page.goBack();
    }
  });

  test('navigation is responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Should still have navigation (may be in hamburger menu)
    const hamburger = page.locator('[aria-label="Toggle navigation"], button[aria-expanded]').first();
    if (await hamburger.count() > 0) {
      await hamburger.click();
      // Check mobile menu appears
      await expect(page.getByRole('link', { name: 'Features' })).toBeVisible();
    } else {
      // If no hamburger, navigation should still be visible
      await expect(page.getByRole('link', { name: 'Features' })).toBeVisible();
    }
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByRole('link', { name: 'Features' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Pricing' })).toBeVisible();
  });

  test('all main pages return 200 status', async ({ page }) => {
    const pages = ['/', '/features', '/pricing', '/about', '/contact', '/blog'];
    
    for (const pagePath of pages) {
      const response = await page.goto(pagePath);
      expect(response?.status()).toBe(200);
      
      // Ensure footer is present on every page
      await expect(page.locator('footer')).toBeVisible();
    }
  });
});