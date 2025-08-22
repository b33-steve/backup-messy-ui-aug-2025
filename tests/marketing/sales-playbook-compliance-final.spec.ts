import { test, expect } from '@playwright/test';

/**
 * Final Sales Playbook Compliance Tests for PM33 Marketing Pages
 * Fixed strict mode violations with more precise selectors
 * Validates that systematic non-landing page optimization worked correctly
 */

test.describe('PM33 Sales Playbook Compliance - Final Validation', () => {
  
  test('Homepage should have complete optimized Sales Playbook content', async ({ page }) => {
    await page.goto('http://localhost:3003/');
    
    // Main value proposition - check for unique h1
    await expect(page.locator('h1').first()).toContainText('Transform from Reactive Product Manager');
    
    // Sales Playbook messaging - use more specific selector
    await expect(page.locator('h2').filter({ hasText: 'Think McKinsey + PM mentor + Data scientist' })).toBeVisible();
    
    // Primary CTA buttons
    await expect(page.locator('a[href="/trial"]').filter({ hasText: 'Start Free 14-Day Trial' })).toBeVisible();
    await expect(page.locator('a[href="/strategic-intelligence"]').filter({ hasText: 'See Live Demo' })).toBeVisible();
    
    // ROI section
    await expect(page.locator('text=207x return on investment')).toBeVisible();
    
    // Risk reversal section 
    await expect(page.locator('text=30-Day Transformation Guarantee')).toBeVisible();
    
    // Marketing context (first occurrence)
    await expect(page.locator('div.marketing-context').first()).toBeVisible();
  });

  test('Pricing page should display optimized template content', async ({ page }) => {
    await page.goto('http://localhost:3003/pricing');
    
    // Page title
    await expect(page.locator('h1').first()).toContainText('Pricing: Strategic Intelligence Platform');
    
    // Value proposition
    await expect(page.locator('text=Transform your Product Management with AI-powered strategic capabilities')).toBeVisible();
    
    // CTAs present
    await expect(page.locator('a[href="/trial"]').filter({ hasText: 'Start Free Trial' })).toBeVisible();
    await expect(page.locator('a[href="/strategic-intelligence"]').filter({ hasText: 'See Demo' })).toBeVisible();
    
    // Risk reversal
    await expect(page.locator('text=30-Day Transformation Guarantee')).toBeVisible();
    
    // Marketing context wrapper
    await expect(page.locator('div.marketing-context').first()).toBeVisible();
  });

  test('Contact page should have optimized content structure', async ({ page }) => {
    await page.goto('http://localhost:3003/contact');
    
    // Page title
    await expect(page.locator('h1').first()).toContainText('Contact: Strategic Intelligence Platform');
    
    // Risk reversal section
    await expect(page.locator('text=30-Day Transformation Guarantee')).toBeVisible();
    
    // Marketing context wrapper
    await expect(page.locator('div.marketing-context').first()).toBeVisible();
  });

  test('Features page should have optimized content structure', async ({ page }) => {
    await page.goto('http://localhost:3003/features');
    
    // Page title
    await expect(page.locator('h1').first()).toContainText('Features: Strategic Intelligence Platform');
    
    // Risk reversal section
    await expect(page.locator('text=30-Day Transformation Guarantee')).toBeVisible();
    
    // Marketing context wrapper
    await expect(page.locator('div.marketing-context').first()).toBeVisible();
  });

  test('All pages should have proper Mantine UI marketing design system', async ({ page }) => {
    const pages = [
      { url: 'http://localhost:3003/', name: 'Homepage' },
      { url: 'http://localhost:3003/pricing', name: 'Pricing' },
      { url: 'http://localhost:3003/contact', name: 'Contact' },
      { url: 'http://localhost:3003/features', name: 'Features' }
    ];
    
    for (const pageInfo of pages) {
      await page.goto(pageInfo.url);
      
      // Marketing context class (first occurrence)
      await expect(page.locator('div.marketing-context').first()).toBeVisible();
      
      // Mantine UI components present
      await expect(page.locator('[class*="mantine"]').first()).toBeVisible();
      
      // Container structure
      await expect(page.locator('[class*="Container"]').first()).toBeVisible();
      
      // Card components
      await expect(page.locator('[class*="Card"]').first()).toBeVisible();
      
      console.log(`✅ ${pageInfo.name} has proper Mantine marketing design system`);
    }
  });

  test('Sales Playbook content validation across all pages', async ({ page }) => {
    const pages = [
      'http://localhost:3003/',
      'http://localhost:3003/pricing', 
      'http://localhost:3003/contact',
      'http://localhost:3003/features'
    ];
    
    for (const url of pages) {
      await page.goto(url);
      
      // Check response status is 200
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      
      // Page should have main heading
      await expect(page.locator('h1').first()).toBeVisible();
      
      // Should have risk reversal section
      await expect(page.locator('text=30-Day Transformation Guarantee')).toBeVisible();
      
      // Should have marketing context
      await expect(page.locator('div.marketing-context').first()).toBeVisible();
      
      // Should have at least one CTA button
      await expect(page.locator('a[href="/trial"]').first()).toBeVisible();
    }
  });

  test('Systematic optimization completion validation', async ({ page }) => {
    // Test that our systematic create > test > review > iterate > deploy process worked
    
    // 1. Homepage - Full Sales Playbook optimization
    await page.goto('http://localhost:3003/');
    await expect(page.locator('text=Transform from Reactive Product Manager')).toBeVisible();
    await expect(page.locator('text=207x return on investment')).toBeVisible();
    
    // 2. Non-landing pages - Generic optimized templates
    const nonLandingPages = ['/pricing', '/contact', '/features'];
    
    for (const pagePath of nonLandingPages) {
      await page.goto(`http://localhost:3003${pagePath}`);
      
      // Should have optimized title structure
      await expect(page.locator('h1').first()).toBeVisible();
      
      // Should have PM33 value proposition messaging
      await expect(page.locator('text=Strategic Intelligence Platform')).toBeVisible();
      
      // Should have risk reversal
      await expect(page.locator('text=30-Day Transformation Guarantee')).toBeVisible();
      
      // Should have optimized CTA
      await expect(page.locator('a[href="/trial"]').first()).toBeVisible();
    }
    
    console.log('✅ Systematic non-landing page optimization completed successfully');
  });
});