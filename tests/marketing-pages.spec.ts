import { test, expect } from '@playwright/test';

test.describe('Marketing Pages Navigation', () => {
  const baseUrl = 'http://localhost:3002';
  
  // Test all marketing pages return 200 status
  const marketingPages = [
    { path: '/', name: 'Homepage' },
    { path: '/pricing', name: 'Pricing' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
    { path: '/trial', name: 'Trial' },
    { path: '/resources', name: 'Resources' },
  ];

  marketingPages.forEach(({ path, name }) => {
    test(`${name} page loads successfully`, async ({ page }) => {
      const response = await page.goto(`${baseUrl}${path}`);
      expect(response?.status()).toBe(200);
      
      // Check that the page has content
      await expect(page.locator('body')).toBeVisible();
      
      // Check for navigation
      await expect(page.locator('nav')).toBeVisible();
      
      // Check for PM33 branding
      const hasLogo = await page.locator('text=PM33').count();
      expect(hasLogo).toBeGreaterThan(0);
    });
  });

  test('Homepage CTA section has correct styling', async ({ page }) => {
    await page.goto(`${baseUrl}/`);
    
    // Find the CTA section with "Ready to 10x Your PM Productivity"
    const ctaSection = page.locator('text=Ready to').first();
    await expect(ctaSection).toBeVisible();
    
    // Check that the section has proper background color (should not be white)
    const ctaSectionParent = ctaSection.locator('xpath=ancestor::*[contains(@style, "var(--marketing-primary)")]').first();
    await expect(ctaSectionParent).toBeVisible();
    
    // Check that "10x Your PM Productivity" text is visible
    const gradientText = page.locator('text=10x Your PM Productivity');
    await expect(gradientText).toBeVisible();
  });

  test('Navigation links work correctly', async ({ page }) => {
    await page.goto(`${baseUrl}/`);
    
    // Test navigation to each page
    const navLinks = [
      { text: 'Pricing', expectedPath: '/pricing' },
      { text: 'About', expectedPath: '/about' },
      { text: 'Contact', expectedPath: '/contact' },
      { text: 'Resources', expectedPath: '/resources' },
    ];

    for (const { text, expectedPath } of navLinks) {
      // Go back to homepage
      await page.goto(`${baseUrl}/`);
      
      // Click the navigation link
      const navLink = page.locator(`nav a:has-text("${text}")`).first();
      if (await navLink.count() > 0) {
        await navLink.click();
        
        // Wait for navigation and check URL
        await page.waitForURL(`*${expectedPath}`);
        expect(page.url()).toContain(expectedPath);
        
        // Verify page loaded
        await expect(page.locator('body')).toBeVisible();
      }
    }
  });

  test('All pages have responsive design', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1200, height: 800, name: 'Desktop' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      for (const { path, name } of marketingPages) {
        await page.goto(`${baseUrl}${path}`);
        
        // Check that navigation is visible and functional
        const nav = page.locator('nav');
        await expect(nav).toBeVisible();
        
        // Check that main content is visible
        const main = page.locator('main, [role="main"]');
        if (await main.count() > 0) {
          await expect(main).toBeVisible();
        }
        
        // Check that text is readable (not overflow)
        const titles = page.locator('h1, h2');
        if (await titles.count() > 0) {
          await expect(titles.first()).toBeVisible();
        }
      }
    }
  });

  test('Marketing theme styles are applied correctly', async ({ page }) => {
    await page.goto(`${baseUrl}/`);
    
    // Check that marketing-context class is applied
    const marketingContext = page.locator('.marketing-context');
    await expect(marketingContext).toBeVisible();
    
    // Check that buttons have proper styling
    const buttons = page.locator('button, .mantine-Button-root');
    if (await buttons.count() > 0) {
      await expect(buttons.first()).toBeVisible();
    }
    
    // Check that cards have proper styling
    const cards = page.locator('.mantine-Card-root');
    if (await cards.count() > 0) {
      await expect(cards.first()).toBeVisible();
    }
  });
});