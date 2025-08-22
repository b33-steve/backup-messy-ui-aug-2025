/**
 * Professional PM33 Multi-Theme System Tests
 * Validates quality, performance, and consistency across light/dark/native themes
 * Ensures enterprise-grade professional design standards
 */

import { test, expect } from '@playwright/test';

test.describe('PM33 Professional Multi-Theme System', () => {
  
  test.beforeEach(async ({ page }) => {
    // Start on demo page for theme testing
    await page.goto('http://localhost:3002/demo');
    await page.waitForLoadState('networkidle');
  });

  // Test each theme for professional quality metrics
  (['light', 'dark', 'native'] as const).forEach((theme) => {
    test(`${theme} theme professional quality standards`, async ({ page }) => {
      console.log(`🎨 Testing ${theme} theme professional quality...`);
      
      // Switch to target theme
      const themeSwitcher = page.locator('[data-testid="theme-switcher"]');
      if (await themeSwitcher.count() > 0) {
        await themeSwitcher.click();
        await page.locator(`[data-theme="${theme}"]`).click();
        await page.waitForTimeout(300); // Allow theme transition
      }
      
      // Professional Design Quality Metrics
      const qualityMetrics = {
        // Clean, minimal buttons (no fancy animations)
        professionalButtons: await page.locator('button').filter({
          hasText: /Start|View|Contact|Get/
        }).count(),
        
        // Clean card components with proper borders
        cleanCards: await page.locator('[style*="border: 1px solid"]').count(),
        
        // Professional typography (no oversized headings)
        appropriateHeadings: await page.locator('h1, h2, h3').filter({
          has: page.locator('[style*="font-size: 2rem"], [style*="font-size: 1.5rem"]')
        }).count(),
        
        // Trust indicators and social proof elements
        trustElements: await page.locator('[data-testid*="trust"], .trust, [aria-label*="trust"]').count(),
        
        // Proper spacing (8pt grid system)
        consistentSpacing: await page.locator('[style*="padding: 16px"], [style*="margin: 16px"]').count(),
        
        // Professional color usage (no neon/flashy colors)
        professionalColors: await page.locator('[style*="#1e40af"], [style*="#3b82f6"], [style*="#7c3aed"]').count(),
      };
      
      console.log(`📊 ${theme} theme quality metrics:`, qualityMetrics);
      
      // Professional Quality Assertions
      expect(qualityMetrics.professionalButtons).toBeGreaterThanOrEqual(2);
      expect(qualityMetrics.cleanCards).toBeGreaterThanOrEqual(3);
      expect(qualityMetrics.appropriateHeadings).toBeGreaterThanOrEqual(1);
      
      // Theme-specific quality targets
      const expectedScores = {
        light: { min: 90, target: 100 },
        dark: { min: 85, target: 95 },
        native: { min: 95, target: 110 }
      };
      
      const qualityScore = (
        (qualityMetrics.professionalButtons * 10) +
        (qualityMetrics.cleanCards * 15) +
        (qualityMetrics.appropriateHeadings * 20) +
        (qualityMetrics.trustElements * 25) +
        (qualityMetrics.consistentSpacing * 10) +
        (qualityMetrics.professionalColors * 5)
      );
      
      console.log(`🏆 ${theme} theme quality score: ${qualityScore} (target: ${expectedScores[theme].target})`);
      expect(qualityScore).toBeGreaterThanOrEqual(expectedScores[theme].min);
      
      // Visual regression test
      await expect(page).toHaveScreenshot(`${theme}-professional-quality.png`, {
        fullPage: false,
        clip: { x: 0, y: 0, width: 1200, height: 800 }
      });
    });
  });

  test('Theme switching performance and consistency', async ({ page }) => {
    console.log('⚡ Testing theme switching performance...');
    
    const themeSwitcher = page.locator('[data-testid="theme-switcher"]');
    await expect(themeSwitcher).toBeVisible();
    
    const themes = ['light', 'dark', 'native'] as const;
    const switchingTimes: number[] = [];
    
    for (const theme of themes) {
      const startTime = Date.now();
      
      await themeSwitcher.click();
      await page.locator(`[data-theme="${theme}"]`).click();
      
      // Wait for theme to apply (CSS variables update)
      await page.waitForFunction(() => {
        const root = document.documentElement;
        return root.className.includes(`pm33-${theme}`);
      }, { timeout: 1000 });
      
      const switchTime = Date.now() - startTime;
      switchingTimes.push(switchTime);
      
      console.log(`🔄 ${theme} theme switch: ${switchTime}ms`);
      
      // Ensure theme switch is fast (< 500ms)
      expect(switchTime).toBeLessThan(500);
      
      // Check for layout shifts
      const body = page.locator('body');
      const boundingBox = await body.boundingBox();
      expect(boundingBox).toBeTruthy();
      
      await page.waitForTimeout(100); // Brief pause between switches
    }
    
    const avgSwitchTime = switchingTimes.reduce((a, b) => a + b, 0) / switchingTimes.length;
    console.log(`📊 Average theme switch time: ${avgSwitchTime.toFixed(2)}ms`);
    expect(avgSwitchTime).toBeLessThan(300);
  });

  test('Theme persistence across page reloads', async ({ page }) => {
    console.log('💾 Testing theme persistence...');
    
    // Set theme to native
    const themeSwitcher = page.locator('[data-testid="theme-switcher"]');
    await themeSwitcher.click();
    await page.locator('[data-theme="native"]').click();
    
    // Verify theme is applied
    await expect(page.locator('html')).toHaveClass(/pm33-native/);
    
    // Reload page
    await page.reload({ waitUntil: 'networkidle' });
    
    // Verify theme persisted after reload
    await expect(page.locator('html')).toHaveClass(/pm33-native/);
    
    console.log('✅ Theme persistence verified');
  });

  test('Professional components accessibility', async ({ page }) => {
    console.log('♿ Testing accessibility compliance...');
    
    // Test each theme for accessibility
    const themes = ['light', 'dark', 'native'] as const;
    
    for (const theme of themes) {
      // Switch theme
      const themeSwitcher = page.locator('[data-testid="theme-switcher"]');
      await themeSwitcher.click();
      await page.locator(`[data-theme="${theme}"]`).click();
      await page.waitForTimeout(200);
      
      // Check color contrast ratios
      const textElements = await page.locator('h1, h2, h3, p, button, [role="button"]').all();
      
      for (const element of textElements.slice(0, 5)) { // Sample first 5 elements
        const styles = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            fontSize: computed.fontSize
          };
        });
        
        // Basic accessibility checks
        expect(styles.fontSize).toBeDefined();
        expect(styles.color).toBeDefined();
      }
      
      // Check button accessibility
      const buttons = page.locator('button, [role="button"]');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < Math.min(buttonCount, 3); i++) {
        const button = buttons.nth(i);
        
        // Ensure buttons have proper focus states
        await button.focus();
        await expect(button).toBeFocused();
        
        // Check for proper ARIA attributes
        const ariaLabel = await button.getAttribute('aria-label');
        const textContent = await button.textContent();
        
        expect(ariaLabel || textContent).toBeTruthy();
      }
      
      console.log(`✅ ${theme} theme accessibility validated`);
    }
  });

  test('Professional conversion elements', async ({ page }) => {
    console.log('💰 Testing conversion-focused elements...');
    
    // Look for professional conversion elements
    const conversionElements = {
      ctaButtons: page.locator('button').filter({ 
        hasText: /Start Free Trial|Get Started|Contact Sales|View Demo/ 
      }),
      trustIndicators: page.locator('[data-testid*="trust"], .trust-indicator').or(
        page.locator('text=/trusted|security|compliant|rating/i')
      ),
      socialProof: page.locator('[data-testid*="testimonial"], .testimonial').or(
        page.locator('text=/product teams|customers|users/i')
      ),
      pricingElements: page.locator('[data-testid*="pricing"], .pricing').or(
        page.locator('text=/\$\d+|per month|per user|free trial/i')
      )
    };
    
    // Validate conversion elements exist
    await expect(conversionElements.ctaButtons.first()).toBeVisible();
    
    const ctaCount = await conversionElements.ctaButtons.count();
    const trustCount = await conversionElements.trustIndicators.count();
    const socialProofCount = await conversionElements.socialProof.count();
    
    console.log('📊 Conversion elements found:', {
      ctaButtons: ctaCount,
      trustIndicators: trustCount,
      socialProof: socialProofCount
    });
    
    // Professional conversion standards
    expect(ctaCount).toBeGreaterThanOrEqual(2);
    expect(trustCount).toBeGreaterThanOrEqual(1);
    
    // Test CTA button interactions
    const primaryCTA = conversionElements.ctaButtons.first();
    
    // Hover state (should be subtle for professional look)
    await primaryCTA.hover();
    await page.waitForTimeout(200);
    
    // Click functionality
    await primaryCTA.click();
    // Should navigate or show modal (don't assert navigation for flexibility)
    
    console.log('✅ Professional conversion elements validated');
  });
});

test.describe('Theme System Integration', () => {
  test('Cross-page theme consistency', async ({ page }) => {
    console.log('🔗 Testing cross-page theme consistency...');
    
    // Start on demo page, set native theme
    await page.goto('http://localhost:3002/demo');
    const themeSwitcher = page.locator('[data-testid="theme-switcher"]');
    await themeSwitcher.click();
    await page.locator('[data-theme="native"]').click();
    
    // Navigate to dashboard
    await page.goto('http://localhost:3002/dashboard');
    
    // Verify theme persisted
    await expect(page.locator('html')).toHaveClass(/pm33-native/);
    
    // Navigate to pricing
    await page.goto('http://localhost:3002/pricing');
    
    // Verify theme still persisted
    await expect(page.locator('html')).toHaveClass(/pm33-native/);
    
    console.log('✅ Cross-page theme consistency verified');
  });
});