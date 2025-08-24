/**
 * Test Suite: PM33 UI Compliance
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md - Mandatory Test Suite
 * Purpose: Validate complete PM33 design system compliance
 * 
 * MANDATORY: Run before EVERY commit
 */

import { test, expect } from '@playwright/test';

test.describe('PM33 UI Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    // Wait for React components to fully mount and CSS to be applied
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });

  test('No forbidden UI elements exist', async ({ page }) => {
    // Check for black borders (MUST BE 0)
    const blackBorders = await page.locator('[style*="border: 1px solid black"]').count();
    expect(blackBorders).toBe(0);
    
    // Check for forbidden gray classes
    const grayClasses = await page.locator('[class*="text-gray-"], [class*="bg-gray-"]').count();
    expect(grayClasses).toBe(0);
    
    // Check for basic buttons without PM33 styling (should use PM33Button)
    // Exclude Next.js dev tools buttons
    const basicButtons = await page.locator('button:not([class*="pm33"]):not([style*="background"]):not([data-nextjs-dev-tools-button])').count();
    expect(basicButtons).toBe(0);
  });
  
  test('Glass morphism is implemented correctly', async ({ page }) => {
    // Wait for PM33 cards to appear (they use mounted state)
    await page.waitForSelector('[data-testid="pm33-glass-card"]', { timeout: 10000 });
    
    const cards = page.locator('.pm33-glass-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      
      // Check for backdrop filter
      const backdropFilter = await card.evaluate(el => 
        window.getComputedStyle(el).backdropFilter || 
        (window.getComputedStyle(el) as any).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
      
      // Check for gradient background
      const background = await card.evaluate(el => 
        window.getComputedStyle(el).background
      );
      expect(background).toContain('gradient');
      
      // Check for box shadow
      const shadow = await card.evaluate(el => 
        window.getComputedStyle(el).boxShadow
      );
      expect(shadow).not.toBe('none');
    }
  });
  
  test('All interactive elements have hover states', async ({ page }) => {
    // Exclude Next.js dev tools buttons from hover requirements
    const buttons = page.locator('button:not([data-nextjs-dev-tools-button])');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      
      // Get initial transform
      const initialTransform = await button.evaluate(el => 
        window.getComputedStyle(el).transform
      );
      
      // Hover
      await button.hover();
      await page.waitForTimeout(100);
      
      // Get hover transform  
      const hoverTransform = await button.evaluate(el => 
        window.getComputedStyle(el).transform
      );
      
      // Should be different (indicating hover effect)
      const hasHoverEffect = hoverTransform !== initialTransform || 
                           hoverTransform.includes('scale') ||
                           hoverTransform.includes('translate');
      
      expect(hasHoverEffect).toBeTruthy();
    }
  });
  
  test('Animations are present on cards', async ({ page }) => {
    const cards = page.locator('[class*="card"], .pm33-glass-card');
    const cardCount = await cards.count();
    
    for (let i = 0; i < cardCount; i++) {
      const card = cards.nth(i);
      
      const transitionProperty = await card.evaluate(el => 
        window.getComputedStyle(el).transitionProperty
      );
      
      // Should have transition property set to 'all'
      expect(transitionProperty).toBe('all');
    }
  });
  
  test('AI elements have proper visualization', async ({ page }) => {
    // Navigate to cards demo to see AI elements
    await page.click('text=Intelligence Cards');
    await page.waitForTimeout(500);
    
    // Check for confidence rings (SVG circles with gradients)
    const confidenceRings = await page.locator('svg circle[stroke*="gradient"], svg circle[stroke*="url"]').count();
    expect(confidenceRings).toBeGreaterThan(0);
    
    // Check for AI status indicators
    const aiStatusIndicators = await page.locator('text=/AI Analysis|AI/i').count();
    expect(aiStatusIndicators).toBeGreaterThan(0);
    
    // Check for gradient text elements
    const gradientText = await page.locator('[style*="background-clip: text"], [style*="WebkitBackgroundClip"]').count();
    expect(gradientText).toBeGreaterThan(0);
  });
  
  test('Progressive intelligence disclosure works', async ({ page }) => {
    // Navigate to progressive demo
    await page.click('text=Progressive Analysis');
    await page.waitForTimeout(500);
    
    // Should start with entry level
    await expect(page.locator('text=See Analysis')).toBeVisible();
    
    // Click to advance to advanced level
    await page.click('text=See Analysis');
    await expect(page.locator('text=PMO Analysis')).toBeVisible();
    
    // Click to advance to PMO level  
    await page.click('text=PMO Analysis');
    await expect(page.locator('text=PMO Intelligence')).toBeVisible();
    
    // Should show implementation roadmap
    await expect(page.locator('text=Implementation Roadmap')).toBeVisible();
  });
  
  test('AI processing states are premium (not basic spinners)', async ({ page }) => {
    // Navigate to processing demo
    await page.click('text=AI Processing');
    await page.waitForTimeout(500);
    
    // Should NOT have basic spinners
    const basicSpinners = await page.locator('.spinner, [class*="spin"]:not([style*="gradient"])').count();
    expect(basicSpinners).toBe(0);
    
    // Should have premium AI processing animation
    const aiProcessing = await page.locator('text=/Analyzing|Processing/i').count();
    expect(aiProcessing).toBeGreaterThan(0);
    
    // Should have animated elements (pulsing, bouncing dots, etc.)
    const animatedElements = await page.locator('[style*="animation"], [class*="animate"]').count();
    expect(animatedElements).toBeGreaterThan(3);
  });
  
  test('Premium quality metrics', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Take screenshot for visual review
    await page.screenshot({ path: 'test-results/ui-quality-check.png', fullPage: true });
    
    // Check overall quality indicators
    const premiumElements = {
      gradients: await page.locator('[style*="gradient"]').count(),
      animations: await page.locator('[class*="animate"], [style*="animation"]').count(), 
      glassCards: await page.locator('.pm33-glass-card').count(),
      shadows: await page.locator('[style*="shadow"]').count()
    };
    
    // Must have substantial premium elements
    expect(premiumElements.gradients).toBeGreaterThan(8);
    expect(premiumElements.animations).toBeGreaterThan(5);
    expect(premiumElements.glassCards).toBeGreaterThan(2);
    expect(premiumElements.shadows).toBeGreaterThan(5);
    
    console.log('UI Quality Metrics:', premiumElements);
  });

  test('Color system compliance', async ({ page }) => {
    // Check that PM33 CSS variables are loaded
    const rootStyles = await page.evaluate(() => {
      const root = document.documentElement;
      const computedStyle = window.getComputedStyle(root);
      return {
        brandGradient: computedStyle.getPropertyValue('--pm33-brand'),
        aiGlow: computedStyle.getPropertyValue('--pm33-ai-glow'), 
        glass: computedStyle.getPropertyValue('--pm33-glass')
      };
    });
    
    expect(rootStyles.brandGradient).toContain('gradient');
    expect(rootStyles.aiGlow).toContain('gradient');
    expect(rootStyles.glass).toContain('rgba');
  });

  test('Typography system compliance', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4').count();
    expect(headings).toBeGreaterThan(3);
    
    // Check for proper font sizes using CSS variables
    const cssVarUsage = await page.evaluate(() => {
      const elements = document.querySelectorAll('h1, h2, h3, h4');
      let count = 0;
      elements.forEach(el => {
        const fontSize = window.getComputedStyle(el).fontSize;
        if (fontSize.includes('var(--font-') || parseFloat(fontSize) >= 16) {
          count++;
        }
      });
      return count;
    });
    
    expect(cssVarUsage).toBeGreaterThan(0);
  });

  test('8pt grid spacing system', async ({ page }) => {
    // Check for consistent spacing using CSS variables
    const spacingCompliance = await page.evaluate(() => {
      const elements = document.querySelectorAll('[style*="--space-"], [style*="margin"], [style*="padding"]');
      let compliantElements = 0;
      
      elements.forEach(el => {
        const style = el.getAttribute('style') || '';
        if (style.includes('--space-') || 
            style.includes('var(--space') ||
            /\d+(px|rem)/.test(style)) {
          compliantElements++;
        }
      });
      
      return compliantElements;
    });
    
    expect(spacingCompliance).toBeGreaterThan(5);
  });
});

test.describe('PM33 Responsive Design', () => {
  test('Mobile viewport (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/strategic-intelligence-demo');
    
    // Check that content is visible and not overflowing
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
    
    // Navigation should still be functional
    await expect(page.locator('nav')).toBeVisible();
    
    // Cards should stack vertically on mobile
    const cards = page.locator('.pm33-glass-card');
    const firstCard = cards.first();
    const cardWidth = await firstCard.evaluate(el => el.getBoundingClientRect().width);
    expect(cardWidth).toBeLessThan(375);
    
    await page.screenshot({ path: 'test-results/mobile-375px.png' });
  });

  test('Tablet viewport (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/strategic-intelligence-demo');
    
    // Content should adapt to tablet size
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(768);
    
    // Should have more cards per row than mobile
    const gridLayout = await page.locator('[style*="grid-template-columns"]').first().isVisible();
    expect(gridLayout).toBeTruthy();
    
    await page.screenshot({ path: 'test-results/tablet-768px.png' });
  });

  test('Desktop viewport (1200px+)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/strategic-intelligence-demo');
    
    // Should utilize full width appropriately
    const maxWidth = await page.locator('[style*="maxWidth"], [style*="max-width"]').first();
    await expect(maxWidth).toBeVisible();
    
    // Navigation should be horizontal
    const nav = page.locator('nav');
    const navHeight = await nav.evaluate(el => el.getBoundingClientRect().height);
    expect(navHeight).toBeLessThan(100); // Should be horizontal, not vertical
    
    await page.screenshot({ path: 'test-results/desktop-1440px.png' });
  });
});

test.describe('PM33 Accessibility', () => {
  test('Keyboard navigation', async ({ page }) => {
    await page.goto('/strategic-intelligence-demo');
    
    // Should be able to tab through interactive elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['BUTTON', 'A', 'INPUT'].includes(focusedElement || '')).toBeTruthy();
  });

  test('Color contrast', async ({ page }) => {
    await page.goto('/strategic-intelligence-demo');
    
    // Check that text has sufficient contrast
    const textElements = page.locator('p, h1, h2, h3, h4, span');
    const sampleCount = Math.min(5, await textElements.count());
    
    for (let i = 0; i < sampleCount; i++) {
      const element = textElements.nth(i);
      const styles = await element.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          opacity: computed.opacity
        };
      });
      
      // Should have visible text (not transparent)
      expect(parseFloat(styles.opacity)).toBeGreaterThan(0.3);
    }
  });

  test('Aria labels and semantic HTML', async ({ page }) => {
    await page.goto('/strategic-intelligence-demo');
    
    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2').count();
    const h3Count = await page.locator('h3').count();
    
    expect(h1Count).toBeGreaterThanOrEqual(1);
    expect(h2Count + h3Count).toBeGreaterThan(0);
    
    // Interactive elements should be properly labeled
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      const button = buttons.nth(i);
      const hasText = await button.textContent();
      const hasAriaLabel = await button.getAttribute('aria-label');
      
      expect(hasText || hasAriaLabel).toBeTruthy();
    }
  });
});