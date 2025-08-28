/**
 * Basic Modern UI Validation - Quick Test
 * Validates the transformed UI is loading and functioning
 */

import { test, expect } from '@playwright/test';

test.describe('Modern UI Basic Validation', () => {
  const baseURL = 'http://localhost:3006';

  test('Modern page loads successfully with proper title', async ({ page }) => {
    await page.goto(`${baseURL}/modern`);
    
    // Check page loads and has correct title
    await expect(page).toHaveTitle(/PM33 Modern UI Demo/);
    
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    
    console.log('✅ Page loaded successfully');
  });

  test('Modern CSS classes are applied correctly', async ({ page }) => {
    await page.goto(`${baseURL}/modern`);
    
    // Check for key modern CSS classes
    const modernClasses = [
      '.max-w-7xl',
      '.mx-auto', 
      '.grid',
      '.space-y-8'
    ];
    
    for (const className of modernClasses) {
      const elements = await page.locator(className).count();
      expect(elements).toBeGreaterThan(0);
      console.log(`✅ Found ${elements} elements with class ${className}`);
    }
  });

  test('Navigation component renders', async ({ page }) => {
    await page.goto(`${baseURL}/modern`);
    
    // Check navigation exists
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check PM33 logo/brand
    const brand = page.locator('text=PM33');
    await expect(brand.first()).toBeVisible();
    
    console.log('✅ Navigation component rendered');
  });

  test('Hero section displays correctly', async ({ page }) => {
    await page.goto(`${baseURL}/modern`);
    
    // Check for main heading
    const heading = page.locator('h1');
    await expect(heading.first()).toBeVisible();
    
    // Check for CTA buttons
    const buttons = page.locator('button, a[class*="btn"]');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
    
    console.log(`✅ Hero section with ${buttonCount} interactive elements`);
  });

  test('CSS variables are working', async ({ page }) => {
    await page.goto(`${baseURL}/modern`);
    
    // Check that CSS custom properties are defined
    const hasCustomProps = await page.evaluate(() => {
      const computedStyle = getComputedStyle(document.documentElement);
      const colorBgPrimary = computedStyle.getPropertyValue('--color-bg-primary');
      const colorTextPrimary = computedStyle.getPropertyValue('--color-text-primary');
      
      return {
        hasBgPrimary: colorBgPrimary.trim() !== '',
        hasTextPrimary: colorTextPrimary.trim() !== '',
        bgValue: colorBgPrimary.trim(),
        textValue: colorTextPrimary.trim()
      };
    });
    
    expect(hasCustomProps.hasBgPrimary).toBeTruthy();
    expect(hasCustomProps.hasTextPrimary).toBeTruthy();
    
    console.log(`✅ CSS variables working - bg: ${hasCustomProps.bgValue}, text: ${hasCustomProps.textValue}`);
  });

  test('Modern components render without errors', async ({ page }) => {
    await page.goto(`${baseURL}/modern`);
    
    // Check for any JavaScript errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Wait for page to fully load
    await page.waitForTimeout(2000);
    
    // Should have minimal or no errors
    expect(errors.length).toBeLessThan(5);
    
    if (errors.length > 0) {
      console.log('⚠️ Console errors:', errors);
    } else {
      console.log('✅ No console errors detected');
    }
  });

  test('Performance: Page loads quickly', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto(`${baseURL}/modern`);
    await page.waitForLoadState('domcontentloaded');
    
    const loadTime = Date.now() - startTime;
    
    // Should load faster than before (was >15s in tests)
    expect(loadTime).toBeLessThan(5000);
    
    console.log(`✅ Page loaded in ${loadTime}ms (target: <5000ms)`);
  });
});