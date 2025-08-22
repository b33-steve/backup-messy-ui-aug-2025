/**
 * Test: PM33 Pricing Page - Premium Design System Compliance
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md - Section 1-3
 * UX Pattern: PM33_COMPLETE_UX_SYSTEM.md - Validation Requirements
 * 
 * Purpose: Validate PM33 signature components and premium design compliance
 * Covers: Glass morphism, gradients, AI processing states, strategic intelligence
 */

import { test, expect } from '@playwright/test';

test.describe('PM33 Pricing Page - Premium Design Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing');
  });

  test('displays premium PM33 signature components', async ({ page }) => {
    // Test page loads successfully
    await expect(page).toHaveTitle(/PM33 Pricing.*Intelligence Operations/);
    
    // Test gradient title is visible
    await expect(page.locator('text=Intelligence Operations Pricing')).toBeVisible();
    
    // Test intelligence indicators are present
    await expect(page.locator('text=Analysis Complete')).toBeVisible();
    
    // Test all 4 pricing tiers are displayed
    await expect(page.locator('text=Starter')).toBeVisible();
    await expect(page.locator('text=Team')).toBeVisible();
    await expect(page.locator('text=Scale')).toBeVisible();
    await expect(page.locator('text=Enterprise')).toBeVisible();
  });

  test('validates PM33 glass morphism cards', async ({ page }) => {
    // Check for PM33 signature card styling
    const pricingCards = page.locator('.pm33-glass-card');
    await expect(pricingCards.first()).toBeVisible();
    
    // Verify glass morphism properties are applied
    const cardStyles = await pricingCards.first().evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backdropFilter: styles.backdropFilter,
        background: styles.background,
        borderRadius: styles.borderRadius
      };
    });
    
    expect(cardStyles.backdropFilter).toContain('blur');
    expect(cardStyles.borderRadius).toBe('16px');
  });

  test('confirms premium gradient buttons work', async ({ page }) => {
    // Test gradient buttons are present
    const gradientButtons = page.locator('text=Start Free Trial');
    await expect(gradientButtons.first()).toBeVisible();
    
    // Test button interactions
    await gradientButtons.first().hover();
    
    // Verify CTA buttons have proper styling
    const buttonStyles = await gradientButtons.first().evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        background: styles.background,
        transition: styles.transition
      };
    });
    
    expect(buttonStyles.transition).toContain('0.3s');
  });

  test('validates strategic intelligence indicators', async ({ page }) => {
    // Test confidence percentages are displayed
    await expect(page.locator('text=98%')).toBeVisible();
    await expect(page.locator('text=96%')).toBeVisible();
    
    // Test AI status indicators
    await expect(page.locator('text=Analysis Complete')).toHaveCount(1, { timeout: 5000 });
    
    // Test impact indicators show revenue increase
    await expect(page.locator('text=revenue increase')).toBeVisible();
  });

  test('confirms pricing functionality works', async ({ page }) => {
    // Test annual/monthly toggle
    const annualToggle = page.locator('text=Annual').first();
    await annualToggle.click();
    
    // Verify pricing updates (should show savings)
    await expect(page.locator('text=Save up to 18%')).toBeVisible();
    
    // Test pricing tiers show correct amounts
    await expect(page.locator('text=$29')).toBeVisible();
    await expect(page.locator('text=$79')).toBeVisible();
    await expect(page.locator('text=$199')).toBeVisible();
    await expect(page.locator('text=$599')).toBeVisible();
  });

  test('validates trust and FAQ sections', async ({ page }) => {
    // Test trust section with animated elements
    await expect(page.locator('text=Trusted by 500+ Product Teams')).toBeVisible();
    await expect(page.locator('text=Enterprise Security')).toBeVisible();
    await expect(page.locator('text=10x Faster Analysis')).toBeVisible();
    await expect(page.locator('text=No Usage Limits')).toBeVisible();
    
    // Test FAQ section
    await expect(page.locator('text=Frequently Asked Questions')).toBeVisible();
    await expect(page.locator('text=How is PM33 different from other PM tools?')).toBeVisible();
  });

  test('validates final CTA premium design', async ({ page }) => {
    // Test final CTA section
    await expect(page.locator('text=Ready to Transform into a PMO?')).toBeVisible();
    
    // Test both CTA buttons are present
    await expect(page.locator('button:has-text("Start Free Trial")')).toBeVisible();
    await expect(page.locator('button:has-text("Watch Demo")')).toBeVisible();
    
    // Test premium background effects
    const ctaSection = page.locator('text=Ready to Transform into a PMO?').locator('..');
    await expect(ctaSection).toBeVisible();
  });

  test('validates mobile responsiveness', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    
    // Verify mobile layout works
    await expect(page.locator('text=Intelligence Operations Pricing')).toBeVisible();
    await expect(page.locator('text=Starter')).toBeVisible();
    
    // Test tablet viewport  
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    
    await expect(page.locator('text=Intelligence Operations Pricing')).toBeVisible();
    await expect(page.locator('text=Start Free Trial')).toBeVisible();
  });

  test('validates structured data and SEO elements', async ({ page }) => {
    // Test structured data scripts are present
    const structuredData = page.locator('script[type="application/ld+json"]');
    await expect(structuredData).toHaveCount(3); // Organization, Product, FAQ schemas
    
    // Verify meta tags are present
    const title = await page.title();
    expect(title).toContain('PM33 Pricing');
    expect(title).toContain('Intelligence Operations');
  });

  test('PM33 design system wow factor validation', async ({ page }) => {
    // Test that page creates "wow" factor within 5 seconds
    const startTime = Date.now();
    
    // Wait for key visual elements to be visible
    await expect(page.locator('.pm33-glass-card')).toBeVisible();
    await expect(page.locator('text=Intelligence Operations Pricing')).toBeVisible();
    await expect(page.locator('text=Analysis Complete')).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000); // Must wow users within 5 seconds
    
    // Verify premium visual elements are present
    await expect(page.locator('.pm33-gradient-text, [class*="gradient"]')).toHaveCount(1, { timeout: 2000 });
  });

  test('validates PM33 vs competitors differentiation', async ({ page }) => {
    // Verify page doesn't look like Jira, Asana, or Monday
    // Test for PM33 signature elements that differentiate us
    
    // Glass morphism (unique to PM33)
    const glassCards = page.locator('.pm33-glass-card');
    await expect(glassCards).toHaveCount(1, { timeout: 3000 });
    
    // AI intelligence indicators (unique positioning)
    await expect(page.locator('text=Analysis Complete')).toBeVisible();
    await expect(page.locator('text=98%')).toBeVisible();
    
    // Premium gradients (not basic flat design)
    const gradientElements = page.locator('[style*="gradient"]');
    await expect(gradientElements.first()).toBeVisible();
    
    // Strategic intelligence focus (PMO transformation)
    await expect(page.locator('text=PMO transformation')).toBeVisible();
    await expect(page.locator('text=strategic intelligence')).toBeVisible();
  });
});