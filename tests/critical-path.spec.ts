/**
 * Test Suite: Critical Path Premium Experience Validation
 * Purpose: End-to-end validation of core user journeys with premium standards
 * Runs: Before every deployment to production
 * 
 * This test suite validates the complete user experience from landing to conversion,
 * ensuring every touchpoint meets PM33's premium experience standards.
 */

import { test, expect } from '@playwright/test';

test.describe('PM33 Critical Path - Premium Experience', () => {
  
  test.beforeEach(async ({ page }) => {
    // Ensure clean state for each test
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Allow for dynamic content
  });

  test('Homepage to Demo Flow - Premium Experience', async ({ page }) => {
    // STEP 1: Homepage loads with premium elements
    await expect(page.locator('h1')).toContainText('Don\'t Replace Your PM Tools');
    
    // Validate premium hero section
    const heroSection = page.locator('[class*="hero"], section').first();
    await expect(heroSection).toBeVisible();
    
    // Check for premium gradients in hero
    const gradientElements = page.locator('[style*="gradient"]');
    const gradientCount = await gradientElements.count();
    expect(gradientCount).toBeGreaterThan(3); // Hero should have multiple gradients
    
    // STEP 2: Navigate to Strategic Intelligence Demo  
    const demoButton = page.locator('text=Try Live Demo, text=Strategic Intelligence');
    await expect(demoButton.first()).toBeVisible();
    await demoButton.first().click();
    
    // Wait for demo page to load
    await page.waitForLoadState('networkidle');
    
    // Validate demo interface is premium
    const demoInterface = page.locator('[data-testid="demo-interface"], .demo-container');
    if (await demoInterface.count() > 0) {
      await expect(demoInterface.first()).toBeVisible();
      
      // Should have AI processing elements (not basic spinners)
      const aiElements = page.locator('[class*="ai-"], [class*="processing"]');
      const hasAIElements = await aiElements.count();
      expect(hasAIElements).toBeGreaterThan(0);
    }
  });

  test('Pricing to Trial Flow - Conversion Optimization', async ({ page }) => {
    // STEP 1: Navigate to pricing
    await page.goto('/pricing');
    await page.waitForLoadState('networkidle');
    
    // Validate pricing page loads
    await expect(page.locator('h1')).toContainText('Scale Your PMO Impact');
    
    // Check for ROI calculator (conversion optimization)
    const roiCalculator = page.locator('[class*="roi"], [data-testid*="calculator"]');
    if (await roiCalculator.count() > 0) {
      await expect(roiCalculator.first()).toBeVisible();
    }
    
    // STEP 2: Interact with pricing tiers
    const pricingTiers = page.locator('[class*="card"]');
    const tierCount = await pricingTiers.count();
    expect(tierCount).toBeGreaterThan(2); // Should have multiple pricing options
    
    // Find and click "Start Free Trial" button
    const trialButton = page.locator('text=Start Free Trial').first();
    if (await trialButton.isVisible()) {
      await trialButton.click();
      
      // Wait for navigation or modal
      await page.waitForTimeout(2000);
      
      // Should navigate to trial signup or show trial form
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/trial|signup|register/);
    }
  });

  test('Mobile Experience - Premium on All Devices', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Mobile navigation should be accessible
    const mobileNav = page.locator('nav, [class*="nav"]');
    await expect(mobileNav.first()).toBeVisible();
    
    // Content should not overflow horizontally
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
    
    // CTAs should be easily tappable (minimum 44px)
    const ctaButtons = page.locator('text=Start Free Trial, text=Try Live Demo');
    if (await ctaButtons.count() > 0) {
      const buttonHeight = await ctaButtons.first().evaluate(el => 
        el.getBoundingClientRect().height
      );
      expect(buttonHeight).toBeGreaterThanOrEqual(44); // iOS touch target minimum
    }
    
    // Take mobile screenshot for visual validation
    await page.screenshot({ 
      path: 'test-results/critical-path-mobile.png',
      fullPage: true 
    });
  });

  test('Performance Benchmarks - Premium Speed', async ({ page }) => {
    // Measure page load performance
    const startTime = Date.now();
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const loadTime = Date.now() - startTime;
    
    // Premium experience requires fast loading
    expect(loadTime).toBeLessThan(3000); // 3 second maximum
    
    // Validate Core Web Vitals elements exist
    const images = page.locator('img');
    const imageCount = await images.count();
    
    // All images should have proper loading attributes
    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const img = images.nth(i);
      const loading = await img.getAttribute('loading');
      const hasLoading = loading === 'lazy' || loading === 'eager';
      // Images should have loading attribute for LCP optimization
      if (await img.isVisible()) {
        expect(hasLoading || await img.getAttribute('priority')).toBeTruthy();
      }
    }
    
    console.log(`Homepage load time: ${loadTime}ms`);
  });

  test('Accessibility - Premium Inclusive Experience', async ({ page }) => {
    await page.goto('/');
    
    // Keyboard navigation should work
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['BUTTON', 'A', 'INPUT'].includes(focusedElement || '')).toBeTruthy();
    
    // Should have proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1); // Exactly one H1 for accessibility
    
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(0); // Should have section headers
    
    // Images should have alt text
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < Math.min(imageCount, 3); i++) {
      const img = images.nth(i);
      if (await img.isVisible()) {
        const alt = await img.getAttribute('alt');
        const ariaLabel = await img.getAttribute('aria-label');
        expect(alt || ariaLabel).toBeTruthy(); // Must have alt text or aria-label
      }
    }
  });

  test('Premium UI Elements - Glass Morphism & Animations', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Allow for animations
    
    // Should NOT have basic UI elements
    const blackBorders = await page.locator('[style*="border: 1px solid black"]').count();
    expect(blackBorders).toBe(0);
    
    const basicButtons = await page.locator('button:not([class*="mantine"]):not([class*="pm33"]):not([style*="background"])').count();
    expect(basicButtons).toBe(0);
    
    // Should have premium glass morphism cards
    const cards = page.locator('.pm33-glass-card, [class*="glass"]');
    if (await cards.count() > 0) {
      const firstCard = cards.first();
      
      // Check for backdrop filter (glass effect)
      const backdropFilter = await firstCard.evaluate(el => 
        window.getComputedStyle(el).backdropFilter || 
        (window.getComputedStyle(el) as any).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
      
      // Check for box shadow (depth)
      const boxShadow = await firstCard.evaluate(el => 
        window.getComputedStyle(el).boxShadow
      );
      expect(boxShadow).not.toBe('none');
    }
    
    // Interactive elements should have hover effects
    const buttons = page.locator('button, [role="button"]');
    if (await buttons.count() > 0) {
      const firstButton = buttons.first();
      
      // Get initial state
      const initialTransform = await firstButton.evaluate(el => 
        window.getComputedStyle(el).transform
      );
      
      // Hover and check for change
      await firstButton.hover();
      await page.waitForTimeout(200);
      
      const hoverTransform = await firstButton.evaluate(el => 
        window.getComputedStyle(el).transform
      );
      
      // Should have hover effect (transform change or other visual feedback)
      const hasHoverEffect = hoverTransform !== initialTransform || 
                           hoverTransform.includes('scale') ||
                           hoverTransform.includes('translate');
      
      expect(hasHoverEffect).toBeTruthy();
    }
  });

  test('Error Handling - Graceful Degradation', async ({ page }) => {
    // Monitor console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Test navigation to non-existent page
    await page.goto('/non-existent-page');
    
    // Should show proper 404 or redirect
    const is404 = page.url().includes('404') || 
                  await page.locator('text=404, text=Not Found').count() > 0;
    const isRedirected = page.url() === 'http://localhost:3005/' || 
                        page.url().includes('home');
    
    expect(is404 || isRedirected).toBeTruthy();
    
    // Should not have critical JavaScript errors
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('404') &&
      !error.includes('DevTools')
    );
    
    expect(criticalErrors.length).toBe(0);
  });

  test('Cross-Browser Consistency - Premium Everywhere', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take browser-specific screenshot
    await page.screenshot({ 
      path: `test-results/critical-path-${browserName}.png`,
      fullPage: false 
    });
    
    // Core elements should be visible across all browsers
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    
    // CTAs should be interactive
    const ctaButton = page.locator('text=Start Free Trial, text=Try Live Demo').first();
    if (await ctaButton.isVisible()) {
      await expect(ctaButton).toBeEnabled();
    }
    
    // No browser-specific console errors
    const browserErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('favicon')) {
        browserErrors.push(msg.text());
      }
    });
    
    await page.waitForTimeout(3000); // Allow time for any async errors
    
    // Filter out non-critical errors
    const criticalBrowserErrors = browserErrors.filter(error =>
      !error.includes('404') &&
      !error.includes('DevTools') &&
      !error.includes('favicon')
    );
    
    expect(criticalBrowserErrors.length).toBeLessThanOrEqual(1); // Allow 1 minor error
    
    console.log(`${browserName} validation complete - ${criticalBrowserErrors.length} errors`);
  });
});

test.describe('PM33 Premium Experience Validation', () => {
  
  test('Complete User Journey - Landing to Conversion', async ({ page }) => {
    // PHASE 1: Landing page impact
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should immediately convey value proposition
    const headline = page.locator('h1');
    await expect(headline).toBeVisible();
    await expect(headline).toContainText(/PM|Product|Transform/i);
    
    // PHASE 2: Explore features
    const demoButton = page.locator('text=Try Live Demo, text=Strategic Intelligence, text=Demo');
    if (await demoButton.count() > 0) {
      await demoButton.first().click();
      await page.waitForLoadState('networkidle');
      
      // Should show interactive demo
      const demoContent = page.locator('[data-testid*="demo"], .demo, [class*="strategic"]');
      if (await demoContent.count() > 0) {
        await expect(demoContent.first()).toBeVisible();
      }
    }
    
    // PHASE 3: Check pricing  
    await page.goto('/pricing');
    await page.waitForLoadState('networkidle');
    
    // Should have clear pricing tiers
    const pricingCards = page.locator('[class*="card"], .mantine-Card-root');
    const cardCount = await pricingCards.count();
    expect(cardCount).toBeGreaterThan(1);
    
    // PHASE 4: Conversion action
    const trialCTA = page.locator('text=Start Free Trial, text=Free Trial').first();
    if (await trialCTA.isVisible()) {
      await expect(trialCTA).toBeEnabled();
      
      // Click should navigate or show signup
      await trialCTA.click();
      await page.waitForTimeout(2000);
      
      // Should either navigate to trial page or show signup form
      const isTrialPage = page.url().includes('trial') || 
                         page.url().includes('signup') ||
                         await page.locator('text=Sign Up, text=Create Account').count() > 0;
      
      expect(isTrialPage).toBeTruthy();
    }
  });
});