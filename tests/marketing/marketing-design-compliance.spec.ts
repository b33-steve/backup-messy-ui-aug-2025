/**
 * File: tests/marketing/marketing-design-compliance.spec.ts
 * Tests marketing pages follow marketing design system and Mantine integration
 * Validates marketing color tokens, typography, and component usage
 * RELEVANT FILES: app/(marketing)/layout.tsx, components/marketing/DesignSystemProvider.tsx, app/globals.css
 */

import { test, expect } from '@playwright/test';

test.describe('PM33 Marketing Design Compliance', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to a marketing page (pricing as test page)
    await page.goto('/pricing');
    
    // Scroll to bottom of page for comprehensive testing per user requirements
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000);
    
    // Scroll back to top for consistent test starting point
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
  });

  test('should use marketing-specific color tokens', async ({ page }) => {
    // Check marketing context class
    const body = page.locator('body');
    await expect(body).toHaveClass(/marketing-context/);
    
    // Check that marketing color variables are available
    const primaryColor = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--marketing-primary').trim();
    });
    expect(primaryColor).toBe('#1E40AF');
  });

  test('should use Mantine components with marketing overrides', async ({ page }) => {
    // Check for Mantine Button components
    const buttons = page.locator('.mantine-Button-root');
    if (await buttons.count() > 0) {
      const firstButton = buttons.first();
      await expect(firstButton).toBeVisible();
      
      // Should use marketing primary color
      const backgroundColor = await firstButton.evaluate(el => getComputedStyle(el).backgroundColor);
      expect(backgroundColor).toBe('rgb(30, 64, 175)'); // --marketing-primary
    }
    
    // Check for Mantine Cards
    const cards = page.locator('.mantine-Card-root');
    if (await cards.count() > 0) {
      const firstCard = cards.first();
      const cardBackground = await firstCard.evaluate(el => getComputedStyle(el).backgroundColor);
      expect(cardBackground).toBe('rgb(255, 255, 255)'); // --marketing-bg-primary
    }
  });

  test('should NOT use PM33 glass morphism in marketing context', async ({ page }) => {
    // Marketing pages should use clean design, not glass morphism
    const glassCards = page.locator('.pm33-glass-card');
    await expect(glassCards).toHaveCount(0);
    
    // Should not have backdrop-filter
    const elementsWithBackdrop = page.locator('[style*="backdrop-filter"]');
    await expect(elementsWithBackdrop).toHaveCount(0);
  });

  test('should use marketing typography hierarchy', async ({ page }) => {
    // Check headline typography
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    const h1Styles = await h1.evaluate(el => getComputedStyle(el));
    expect(h1Styles.fontWeight).toBe('700'); // Bold for marketing headlines
    expect(h1Styles.color).toBe('rgb(30, 41, 59)'); // --marketing-text-primary
  });

  test('should have conversion-focused CTA styling', async ({ page }) => {
    // CTAs should use marketing-cta colors
    const ctaButtons = page.locator('text=Start Free Trial, text=Contact Sales');
    if (await ctaButtons.count() > 0) {
      const firstCTA = ctaButtons.first();
      await expect(firstCTA).toBeVisible();
      
      // Should have marketing button styling
      await firstCTA.hover();
      const hoverColor = await firstCTA.evaluate(el => getComputedStyle(el).backgroundColor);
      expect(hoverColor).toBe('rgb(30, 58, 138)'); // --marketing-primary-hover
    }
  });

  test('should use clean borders and shadows', async ({ page }) => {
    // Marketing should use subtle shadows, not dramatic glass effects
    const cards = page.locator('.mantine-Card-root');
    if (await cards.count() > 0) {
      const firstCard = cards.first();
      const boxShadow = await firstCard.evaluate(el => getComputedStyle(el).boxShadow);
      
      // Should have clean, subtle shadow
      expect(boxShadow).toContain('rgba(0, 0, 0, 0.12)');
      expect(boxShadow).not.toContain('rgba(31, 38, 135'); // No PM33 glass shadows
    }
  });

  test('should have marketing-appropriate layout', async ({ page }) => {
    // Should use clean white background
    const body = page.locator('body');
    const backgroundColor = await body.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(backgroundColor).toBe('rgb(255, 255, 255)'); // --marketing-bg-primary
    
    // Should use professional neutrals for text
    const textColor = await body.evaluate(el => getComputedStyle(el).color);
    expect(textColor).toBe('rgb(30, 41, 59)'); // --marketing-text-primary
  });

  test('should use proper Mantine Container sizing', async ({ page }) => {
    // Check for proper container usage
    const containers = page.locator('.mantine-Container-root');
    if (await containers.count() > 0) {
      const firstContainer = containers.first();
      const maxWidth = await firstContainer.evaluate(el => getComputedStyle(el).maxWidth);
      expect(maxWidth).toBe('1200px'); // Standard marketing layout width
    }
  });

  test('should have conversion-optimized spacing', async ({ page }) => {
    // Marketing pages should use generous spacing for readability
    const sections = page.locator('section, .mantine-Container-root');
    if (await sections.count() > 0) {
      const firstSection = sections.first();
      const paddingY = await firstSection.evaluate(el => {
        const styles = getComputedStyle(el);
        return parseInt(styles.paddingTop) || parseInt(styles.paddingBottom);
      });
      
      // Should have substantial padding (marketing pages need breathing room)
      expect(paddingY).toBeGreaterThan(32);
    }
  });

  test('should not have AI processing animations in marketing', async ({ page }) => {
    // Marketing pages should not show AI processing states
    const aiProcessing = page.locator('.pm33-ai-processing');
    await expect(aiProcessing).toHaveCount(0);
    
    // No glow animations
    const glowElements = page.locator('.pm33-animate-glow');
    await expect(glowElements).toHaveCount(0);
  });

  test('should use marketing navigation structure', async ({ page }) => {
    // Should have marketing-focused navigation
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Should have marketing links
    await expect(page.locator('text=Pricing')).toBeVisible();
    await expect(page.locator('text=Features')).toBeVisible();
    
    // Should NOT have app navigation
    await expect(page.locator('text=Dashboard')).not.toBeVisible();
    await expect(page.locator('text=Strategic Intelligence')).not.toBeVisible();
    await expect(page.locator('text=Command Center')).not.toBeVisible();
  });

  test('should be optimized for conversion tracking', async ({ page }) => {
    // Check for proper semantic structure for analytics
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
    
    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1); // Should have exactly one H1 for SEO
    
    // Check for proper CTA structure
    const ctaButtons = page.locator('a[href="/trial"], a[href="/contact"]');
    await expect(ctaButtons.first()).toBeVisible();
  });

  test('should maintain consistent Mantine theme', async ({ page }) => {
    // Check Mantine theme consistency
    const mantineElements = page.locator('[class*="mantine-"]');
    if (await mantineElements.count() > 0) {
      // All Mantine elements should inherit marketing context styling
      const firstElement = mantineElements.first();
      await expect(firstElement).toBeVisible();
      
      // Should not use PM33 app-specific styling
      await expect(firstElement).not.toHaveClass(/pm33-glass/);
      await expect(firstElement).not.toHaveClass(/pm33-animate/);
    }
  });
});