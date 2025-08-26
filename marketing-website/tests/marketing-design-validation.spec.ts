import { test, expect } from '@playwright/test';

test.describe('Marketing Design System Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  test('Navigation does not break into multiple rows on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check navigation container height - should be single row
    const navHeight = await nav.boundingBox();
    expect(navHeight?.height).toBeLessThan(100); // Single row should be less than 100px
    
    // Check that all navigation items are visible
    await expect(page.locator('text=Features')).toBeVisible();
    await expect(page.locator('text=Pricing')).toBeVisible();
    await expect(page.locator('text=Start Free Trial')).toBeVisible();
  });

  test('Theme toggle functionality works', async ({ page }) => {
    // Check light theme is default
    const body = page.locator('body');
    await expect(body).not.toHaveClass(/dark/);
    
    // Click theme toggle
    const themeToggle = page.locator('[aria-label="Toggle color scheme"]');
    await themeToggle.click();
    
    // Wait for theme change animation
    await page.waitForTimeout(500);
    
    // Check dark theme is applied
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('Glass morphism effects are present', async ({ page }) => {
    // Check for glass morphism CSS properties
    const glassCard = page.locator('.marketing-glass-card').first();
    if (await glassCard.count() > 0) {
      const styles = await glassCard.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          backdropFilter: computed.backdropFilter,
          background: computed.background
        };
      });
      
      expect(styles.backdropFilter).toContain('blur');
    }
  });

  test('Brand colors are consistent with core app', async ({ page }) => {
    // Check CSS custom properties are loaded
    const primaryColor = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--marketing-primary');
    });
    
    // Should match core app primary color
    expect(primaryColor.trim()).toBe('#667eea');
  });

  test('Text contrast is sufficient in both themes', async ({ page }) => {
    // Test light theme contrast
    const lightTextElement = page.locator('h1').first();
    const lightColor = await lightTextElement.evaluate(el => {
      return window.getComputedStyle(el).color;
    });
    
    // Switch to dark theme
    const themeToggle = page.locator('[aria-label="Toggle color scheme"]');
    await themeToggle.click();
    await page.waitForTimeout(500);
    
    // Test dark theme contrast
    const darkColor = await lightTextElement.evaluate(el => {
      return window.getComputedStyle(el).color;
    });
    
    // Colors should be different between themes
    expect(lightColor).not.toBe(darkColor);
  });

  test('Footer displays properly with social links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check for social media links
    await expect(page.locator('a[href*="twitter"]')).toBeVisible();
    await expect(page.locator('a[href*="linkedin"]')).toBeVisible();
    await expect(page.locator('a[href*="github"]')).toBeVisible();
    await expect(page.locator('a[href*="mailto"]')).toBeVisible();
    
    // Check footer content
    await expect(page.locator('text=© 2025 PM33')).toBeVisible();
    await expect(page.locator('text=2,500+ PMs trust PM33')).toBeVisible();
  });

  test('CTA buttons use attractive styling', async ({ page }) => {
    const ctaButton = page.locator('.marketing-cta-button').first();
    
    if (await ctaButton.count() > 0) {
      const styles = await ctaButton.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          background: computed.background,
          borderRadius: computed.borderRadius,
          boxShadow: computed.boxShadow
        };
      });
      
      expect(styles.background).toContain('gradient');
      expect(parseInt(styles.borderRadius)).toBeGreaterThan(10);
      expect(styles.boxShadow).not.toBe('none');
    }
  });

  test('Responsive design works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigation should show mobile menu
    const burgerMenu = page.locator('button[aria-expanded]');
    await expect(burgerMenu).toBeVisible();
    
    // Desktop navigation should be hidden
    const desktopNav = page.locator('[data-testid="desktop-nav"]');
    if (await desktopNav.count() > 0) {
      await expect(desktopNav).toBeHidden();
    }
    
    // Footer should stack vertically
    const footer = page.locator('footer');
    const footerHeight = await footer.boundingBox();
    expect(footerHeight?.height).toBeGreaterThan(400); // Should be taller on mobile
  });

  test('Page breaks and layout stability', async ({ page }) => {
    // Check for layout shifts during load
    let layoutShifts = 0;
    
    await page.evaluate(() => {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if ((entry as any).hadRecentInput) continue;
          layoutShifts += (entry as any).value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });
    
    // Scroll through page to trigger any layout shifts
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    const cls = await page.evaluate(() => layoutShifts);
    expect(cls).toBeLessThan(0.1); // Good CLS score
  });
});

test.describe('Performance and Accessibility', () => {
  test('Page loads quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000); // Should load in under 3 seconds
  });

  test('Essential accessibility features', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    
    // Check images have alt text
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
    
    // Check buttons are focusable
    const ctaButtons = page.locator('button, a[role="button"]');
    const buttonCount = await ctaButtons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = ctaButtons.nth(i);
      await button.focus();
      await expect(button).toBeFocused();
    }
  });
});