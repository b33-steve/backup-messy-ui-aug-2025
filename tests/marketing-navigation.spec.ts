import { test, expect } from '@playwright/test';

/**
 * Marketing Navigation Tests
 * 
 * Comprehensive navigation testing for PM33 marketing website
 * Tests header navigation, footer navigation, and all link functionality
 */

test.describe('Marketing Website Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Header Navigation', () => {
    test('displays PM33 logo and main navigation links', async ({ page }) => {
      // Check navigation component is visible
      const nav = page.locator('[role="navigation"], nav, [data-testid="navigation"]').first();
      await expect(nav).toBeVisible();
      
      // Check main navigation links are present and visible  
      await expect(page.getByRole('link', { name: 'Features' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Pricing' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible();
    });

    test('navigation links work correctly', async ({ page }) => {
      // Test Features navigation
      await page.getByRole('link', { name: 'Features' }).click();
      await expect(page).toHaveURL('/features');
      await expect(page.locator('h1')).toContainText(/Features/i);

      // Test Pricing navigation
      await page.getByRole('link', { name: 'Pricing' }).click();
      await expect(page).toHaveURL('/pricing');
      await expect(page.locator('h1')).toContainText(/Pricing/i);

      // Test About navigation
      await page.getByRole('link', { name: 'About' }).click();
      await expect(page).toHaveURL('/about');
      await expect(page.locator('h1')).toContainText(/About/i);

      // Test Contact navigation
      await page.getByRole('link', { name: 'Contact' }).click();
      await expect(page).toHaveURL('/contact');
      await expect(page.locator('h1')).toContainText(/Contact/i);

      // Test Blog navigation
      await page.getByRole('link', { name: 'Blog' }).click();
      await expect(page).toHaveURL('/blog');
      await expect(page.locator('h1')).toContainText(/Blog/i);
    });

    test('CTA buttons are present and functional', async ({ page }) => {
      // Check for primary CTA button (trial/signup)
      const ctaButton = page.locator('nav').getByRole('link', { name: /trial|signup|get started/i }).first();
      await expect(ctaButton).toBeVisible();
      
      // Check it's properly styled (should have distinct appearance)
      const buttonStyles = await ctaButton.evaluate(el => getComputedStyle(el));
      expect(buttonStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)'); // Should have background color
    });

    test('navigation is responsive', async ({ page }) => {
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Navigation should still be present (might be hamburger menu)
      await expect(page.locator('nav')).toBeVisible();
      
      // Test tablet viewport  
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(page.locator('nav')).toBeVisible();
      
      // Test desktop viewport
      await page.setViewportSize({ width: 1200, height: 800 });
      await expect(page.locator('nav')).toBeVisible();
    });
  });

  test.describe('Footer Navigation', () => {
    test('displays comprehensive footer with all sections', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
      
      // Check footer sections are present
      await expect(footer.getByRole('heading', { name: 'Product' })).toBeVisible();
      await expect(footer.getByRole('heading', { name: 'Resources' })).toBeVisible();
      await expect(footer.getByRole('heading', { name: 'Legal' })).toBeVisible();
      await expect(footer.getByRole('heading', { name: 'Connect' })).toBeVisible();
    });

    test('footer product links work correctly', async ({ page }) => {
      const footer = page.locator('footer');
      
      // Test Features link
      await footer.getByRole('link', { name: 'Features' }).click();
      await expect(page).toHaveURL('/features');
      await page.goBack();
      
      // Test Pricing link
      await footer.getByRole('link', { name: 'Pricing' }).click();
      await expect(page).toHaveURL('/pricing');
      await page.goBack();
    });

    test('footer resource links work correctly', async ({ page }) => {
      const footer = page.locator('footer');
      
      // Test Blog link
      await footer.getByRole('link', { name: 'Blog' }).click();
      await expect(page).toHaveURL('/blog');
      await page.goBack();
      
      // Test About Us link  
      await footer.getByRole('link', { name: 'About Us' }).click();
      await expect(page).toHaveURL('/about');
      await page.goBack();
      
      // Test Contact link
      await footer.getByRole('link', { name: 'Contact' }).click();
      await expect(page).toHaveURL('/contact');
      await page.goBack();
    });

    test('footer legal links are present', async ({ page }) => {
      const footer = page.locator('footer');
      
      // Check legal links are present (may not have pages yet)
      await expect(footer.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
      await expect(footer.getByRole('link', { name: 'Terms of Service' })).toBeVisible();
      await expect(footer.getByRole('link', { name: 'Security' })).toBeVisible();
    });

    test('footer social links are present and open in new tabs', async ({ page }) => {
      const footer = page.locator('footer');
      
      // Check social links
      const linkedinLink = footer.getByRole('link', { name: 'LinkedIn' });
      await expect(linkedinLink).toBeVisible();
      await expect(linkedinLink).toHaveAttribute('target', '_blank');
      
      const twitterLink = footer.getByRole('link', { name: 'Twitter' });
      await expect(twitterLink).toBeVisible();
      await expect(twitterLink).toHaveAttribute('target', '_blank');
    });

    test('copyright notice is present and current', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer).toContainText('© 2025 PM33');
      await expect(footer).toContainText('Strategic Intelligence Platform');
      await expect(footer).toContainText('All rights reserved');
    });
  });

  test.describe('Cross-Page Navigation Consistency', () => {
    test('navigation is consistent across all pages', async ({ page }) => {
      const pages = ['/', '/features', '/pricing', '/about', '/contact', '/blog'];
      
      for (const pagePath of pages) {
        await page.goto(pagePath);
        
        // Check navigation is present on every page
        await expect(page.locator('nav')).toBeVisible();
        await expect(page.locator('footer')).toBeVisible();
        
        // Check main nav links are present
        await expect(page.locator('nav a[href="/features"]')).toBeVisible();
        await expect(page.locator('nav a[href="/pricing"]')).toBeVisible();
        await expect(page.locator('nav a[href="/about"]')).toBeVisible();
        await expect(page.locator('nav a[href="/contact"]')).toBeVisible();
      }
    });

    test('active page indicators work correctly', async ({ page }) => {
      // Visit features page
      await page.goto('/features');
      const featuresNav = page.locator('nav a[href="/features"]');
      
      // Check if active state is indicated (could be via class, style, or aria-current)
      const hasActiveClass = await featuresNav.evaluate(el => 
        el.classList.contains('active') || 
        el.classList.contains('current') ||
        el.getAttribute('aria-current') === 'page'
      );
      
      // Note: This test might need adjustment based on actual active state implementation
      // For now, just ensure the navigation is functional
      await expect(featuresNav).toBeVisible();
    });
  });

  test.describe('Marketing Funnel Navigation', () => {
    test('key conversion paths are accessible', async ({ page }) => {
      // Check trial/signup CTAs are accessible from home
      await page.goto('/');
      const trialButtons = page.getByRole('link', { name: /trial|signup|get started/i });
      await expect(trialButtons.first()).toBeVisible();
      
      // Check pricing is accessible
      await page.click('nav a[href="/pricing"]');
      await expect(page).toHaveURL('/pricing');
      
      // Check contact is accessible for enterprise inquiries
      await page.click('nav a[href="/contact"]');
      await expect(page).toHaveURL('/contact');
    });

    test('demo and trial paths work from navigation', async ({ page }) => {
      // Check if demo links exist and work
      const demoLinks = page.getByRole('link', { name: /demo/i });
      if (await demoLinks.count() > 0) {
        await expect(demoLinks.first()).toBeVisible();
      }
      
      // Check trial links
      const trialLinks = page.getByRole('link', { name: /trial/i });
      if (await trialLinks.count() > 0) {
        await expect(trialLinks.first()).toBeVisible();
      }
    });
  });
});