import { test, expect } from '@playwright/test';

/**
 * Sales Playbook Compliance Tests for PM33 Marketing Pages
 * Validates that all optimized pages follow Sales Playbook messaging
 * Tests for value proposition, ROI, risk reversal, and conversion elements
 */

test.describe('PM33 Sales Playbook Compliance', () => {
  
  test('Homepage should have complete Sales Playbook integration', async ({ page }) => {
    await page.goto('/');
    
    // Value Proposition
    await expect(page.locator('text=PM33: Your AI Strategy Copilot')).toBeVisible();
    
    // Strategic positioning 
    await expect(page.locator('text=Transform from reactive')).toBeVisible();
    
    // ROI elements
    await expect(page.locator('text=207x return')).toBeVisible();
    
    // Risk reversal
    await expect(page.locator('text=30-Day Transformation Guarantee')).toBeVisible();
    
    // CTA buttons
    await expect(page.locator('text=Start Free 14-Day Trial')).toBeVisible();
    const trialButton = page.locator('a[href="/trial"]').first();
    await expect(trialButton).toBeVisible();
  });

  test('Pricing page should have Sales Playbook pricing strategy', async ({ page }) => {
    await page.goto('/pricing');
    
    // Value proposition
    await expect(page.locator('text=PM33: Your AI Strategy Copilot')).toBeVisible();
    
    // Pricing tiers with ROI
    await expect(page.locator('text=Individual PM')).toBeVisible();
    await expect(page.locator('text=Small Teams')).toBeVisible();
    await expect(page.locator('text=Enterprise')).toBeVisible();
    
    // ROI calculations
    await expect(page.locator('text=207x')).toBeVisible();
    await expect(page.locator('text=76x')).toBeVisible();
    await expect(page.locator('text=10x')).toBeVisible();
    
    // Risk reversal
    await expect(page.locator('text=30-Day Transformation Guarantee')).toBeVisible();
    
    // Intelligence Operations value
    await expect(page.locator('text=Intelligence Operations')).toBeVisible();
  });

  test('Contact page should have Sales Playbook messaging', async ({ page }) => {
    await page.goto('/contact');
    
    // Value proposition
    await expect(page.locator('text=PM33: Your AI Strategy Copilot')).toBeVisible();
    
    // Strategic positioning
    await expect(page.locator('text=strategic')).toBeVisible();
    
    // Risk reversal
    await expect(page.locator('text=30-Day Transformation Guarantee')).toBeVisible();
  });

  test('Features page should have Sales Playbook positioning', async ({ page }) => {
    await page.goto('/features');
    
    // Value proposition
    await expect(page.locator('text=PM33: Your AI Strategy Copilot')).toBeVisible();
    
    // Strategic positioning
    await expect(page.locator('text=strategic')).toBeVisible();
    
    // Risk reversal
    await expect(page.locator('text=30-Day Transformation Guarantee')).toBeVisible();
  });
});