import { test, expect } from '@playwright/test';

// Post-deployment validation tests that MUST run after every deploy
test.describe('Post-Deploy Validation - Critical Pages', () => {
  test.beforeEach(async ({ page }) => {
    // Set timeout for network requests
    page.setDefaultTimeout(10000);
  });

  test('Homepage should load successfully', async ({ page }) => {
    await page.goto('https://pm33-website.vercel.app');
    
    // Should not be a 404 page
    await expect(page.locator('h1')).not.toContainText('404');
    await expect(page.locator('h2')).not.toContainText('This page could not be found');
    
    // Should have navigation
    await expect(page.locator('nav')).toBeVisible();
    
    // Should have main content
    await expect(page.locator('main')).toBeVisible();
  });

  test('Pricing page should load with navigation', async ({ page }) => {
    await page.goto('https://pm33-website.vercel.app/pricing');
    
    // Should not be a 404 page
    await expect(page.locator('h1')).not.toContainText('404');
    await expect(page.locator('h2')).not.toContainText('This page could not be found');
    
    // Should have pricing content
    await expect(page.locator('h1')).toContainText('Pricing');
    
    // Should have navigation (from marketing layout)
    await expect(page.locator('nav')).toBeVisible();
    
    // Should have pricing plans
    await expect(page.getByText('$29')).toBeVisible();
    await expect(page.getByText('$79')).toBeVisible();
    await expect(page.getByText('$599')).toBeVisible();
  });

  test('About page should load with navigation', async ({ page }) => {
    await page.goto('https://pm33-website.vercel.app/about');
    
    // Should not be a 404 page
    await expect(page.locator('h1')).not.toContainText('404');
    await expect(page.locator('h2')).not.toContainText('This page could not be found');
    
    // Should have about content
    await expect(page.locator('h1')).toContainText('About PM33');
    
    // Should have navigation (from marketing layout)
    await expect(page.locator('nav')).toBeVisible();
  });

  test('Contact page should load with navigation', async ({ page }) => {
    await page.goto('https://pm33-website.vercel.app/contact');
    
    // Should not be a 404 page
    await expect(page.locator('h1')).not.toContainText('404');
    await expect(page.locator('h2')).not.toContainText('This page could not be found');
    
    // Should have contact content
    await expect(page.locator('h1')).toContainText('Get in Touch');
    
    // Should have navigation (from marketing layout)
    await expect(page.locator('nav')).toBeVisible();
    
    // Should have contact information
    await expect(page.getByText('hello@pm33.ai')).toBeVisible();
  });

  test('All marketing pages should have consistent navigation', async ({ page }) => {
    const pages = ['/', '/pricing', '/about', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(`https://pm33-website.vercel.app${pagePath}`);
      
      // Every page should have navigation
      await expect(page.locator('nav')).toBeVisible({ timeout: 5000 });
      
      // Navigation should have key links
      await expect(page.getByRole('link', { name: 'Pricing' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
    }
  });

  test('Marketing layout should be applied to all marketing pages', async ({ page }) => {
    const marketingPages = ['/pricing', '/about', '/contact'];
    
    for (const pagePath of marketingPages) {
      await page.goto(`https://pm33-website.vercel.app${pagePath}`);
      
      // Should have marketing-context class (indicating marketing layout is applied)
      await expect(page.locator('.marketing-context')).toBeVisible();
      
      // Should have both navigation and footer (from marketing layout)
      await expect(page.locator('nav')).toBeVisible();
      // Footer might be at bottom, so scroll to check
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await expect(page.locator('footer')).toBeVisible();
    }
  });

  test('Navigation links should work correctly', async ({ page }) => {
    await page.goto('https://pm33-website.vercel.app');
    
    // Test pricing link
    await page.getByRole('link', { name: 'Pricing' }).click();
    await expect(page).toHaveURL(/\/pricing/);
    await expect(page.locator('h1')).toContainText('Pricing');
    
    // Test about link
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.locator('h1')).toContainText('About');
    
    // Test contact link
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1')).toContainText('Contact');
  });

  test('Pages should load without console errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    const pages = ['/', '/pricing', '/about', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(`https://pm33-website.vercel.app${pagePath}`);
      await page.waitForLoadState('networkidle');
      
      // Check that we don't have critical console errors
      const criticalErrors = errors.filter(error => 
        error.includes('TypeError') || 
        error.includes('ReferenceError') ||
        error.includes('Failed to load resource') && error.includes('404')
      );
      
      expect(criticalErrors).toHaveLength(0);
    }
  });
});

test.describe('Post-Deploy Performance Validation', () => {
  test('Pages should load within acceptable time', async ({ page }) => {
    const pages = ['/', '/pricing', '/about', '/contact'];
    
    for (const pagePath of pages) {
      const startTime = Date.now();
      await page.goto(`https://pm33-website.vercel.app${pagePath}`);
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Pages should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    }
  });

  test('Pages should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const pages = ['/', '/pricing', '/about', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(`https://pm33-website.vercel.app${pagePath}`);
      
      // Should not have horizontal scroll
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const clientWidth = await page.evaluate(() => document.body.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 10); // Allow 10px tolerance
      
      // Navigation should be visible (might be hamburger menu)
      await expect(page.locator('nav')).toBeVisible();
    }
  });
});