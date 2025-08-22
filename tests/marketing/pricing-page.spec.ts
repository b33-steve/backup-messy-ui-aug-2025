/**
 * File: tests/marketing/pricing-page.spec.ts
 * Tests the marketing pricing page functionality and design compliance
 * Tests PM33 marketing context with Mantine UI components
 * RELEVANT FILES: app/(marketing)/pricing/page.tsx, components/shared/Navigation.tsx, app/(marketing)/layout.tsx, app/globals.css
 */

import { test, expect } from '@playwright/test';

test.describe('PM33 Marketing - Pricing Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the marketing pricing page
    await page.goto('/pricing');
  });

  test('should display pricing page with correct marketing context', async ({ page }) => {
    // Check page title and basic structure
    await expect(page).toHaveTitle(/PM33/);
    await expect(page.locator('h1')).toContainText('Pricing That Scales with Value');
    
    // Verify marketing context styling
    const body = page.locator('body');
    await expect(body).toHaveClass(/marketing-context/);
  });

  test('should display all three pricing tiers', async ({ page }) => {
    // Check for all pricing plans
    await expect(page.locator('text=Starter')).toBeVisible();
    await expect(page.locator('text=Professional')).toBeVisible();
    await expect(page.locator('text=Enterprise')).toBeVisible();
    
    // Verify pricing information
    await expect(page.locator('text=$20')).toBeVisible();
    await expect(page.locator('text=$30')).toBeVisible();
    await expect(page.locator('text=Custom')).toBeVisible();
  });

  test('should highlight Professional plan as most popular', async ({ page }) => {
    const professionalCard = page.locator('[data-testid="professional-plan"]').first();
    const popularBadge = page.locator('text=Most Popular');
    
    await expect(popularBadge).toBeVisible();
    
    // Professional card should have special styling
    const cardStyle = await professionalCard.evaluate(el => getComputedStyle(el).border);
    expect(cardStyle).toContain('2px solid');
  });

  test('should have working CTA buttons', async ({ page }) => {
    // Test Starter plan CTA
    const starterCTA = page.locator('text=Start Free Trial').first();
    await expect(starterCTA).toBeVisible();
    await expect(starterCTA).toHaveAttribute('href', '/trial');
    
    // Test Professional plan CTA
    const professionalCTA = page.locator('text=Start Free Trial').nth(1);
    await expect(professionalCTA).toBeVisible();
    await expect(professionalCTA).toHaveAttribute('href', '/trial');
    
    // Test Enterprise CTA
    const enterpriseCTA = page.locator('text=Contact Sales');
    await expect(enterpriseCTA).toBeVisible();
    await expect(enterpriseCTA).toHaveAttribute('href', '/contact');
  });

  test('should display feature lists for each plan', async ({ page }) => {
    // Check Starter features
    await expect(page.locator('text=Connect up to 3 tools')).toBeVisible();
    await expect(page.locator('text=100 AI-generated documents per month')).toBeVisible();
    
    // Check Professional features
    await expect(page.locator('text=Unlimited tool integrations')).toBeVisible();
    await expect(page.locator('text=Unlimited AI documentation')).toBeVisible();
    
    // Check Enterprise features
    await expect(page.locator('text=White-label AI assistant')).toBeVisible();
    await expect(page.locator('text=Custom integrations and API access')).toBeVisible();
  });

  test('should use marketing design system colors', async ({ page }) => {
    // Check that marketing-specific color tokens are being used
    const button = page.locator('text=Start Free Trial').first();
    const buttonColor = await button.evaluate(el => getComputedStyle(el).backgroundColor);
    
    // Should use marketing-primary color (#1E40AF)
    expect(buttonColor).toBe('rgb(30, 64, 175)');
  });

  test('should have responsive design on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that content is still visible and properly laid out
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Starter')).toBeVisible();
    await expect(page.locator('text=Professional')).toBeVisible();
    await expect(page.locator('text=Enterprise')).toBeVisible();
    
    // No horizontal scroll should appear
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 20);
  });

  test('should have proper Mantine component styling', async ({ page }) => {
    // Check for Mantine Card components
    const cards = page.locator('.mantine-Card-root');
    await expect(cards.first()).toBeVisible();
    
    // Cards should have marketing context overrides
    const cardBackground = await cards.first().evaluate(el => getComputedStyle(el).backgroundColor);
    expect(cardBackground).toBe('rgb(255, 255, 255)'); // --marketing-bg-primary
  });

  test('should display navigation appropriate for marketing context', async ({ page }) => {
    // Should have marketing navigation, not app navigation
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Should have marketing-focused links
    await expect(page.locator('text=Pricing')).toBeVisible();
    await expect(page.locator('text=Features')).toBeVisible();
    
    // Should NOT have app-specific navigation
    await expect(page.locator('text=Dashboard')).not.toBeVisible();
    await expect(page.locator('text=Strategic Intelligence')).not.toBeVisible();
  });

  test('should have marketing-focused footer', async ({ page }) => {
    // Check for marketing footer
    const footer = page.locator('text=© 2025 PM33. Pricing That Scales with You.');
    await expect(footer).toBeVisible();
  });

  test('should load without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Should not have critical console errors
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('chunk') &&
      !error.includes('Warning')
    );
    expect(criticalErrors).toHaveLength(0);
  });
});