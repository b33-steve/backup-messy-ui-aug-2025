import { test, expect } from '@playwright/test';

/**
 * Pricing Toggle Visibility Test
 * Tests the pricing toggle button visibility across light/dark modes and monthly/annual states
 */

test.describe('Pricing Toggle Visibility', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to pricing page
    await page.goto('http://localhost:3001/pricing');
    await page.waitForLoadState('networkidle');
  });

  test('should have visible toggle button in light mode monthly state', async ({ page }) => {
    // Ensure we're in light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    
    // Wait for theme to apply
    await page.waitForTimeout(500);
    
    // Find the toggle switch
    const toggleSwitch = page.locator('[role="switch"]').first();
    await expect(toggleSwitch).toBeVisible();
    
    // Take screenshot for analysis
    await page.screenshot({ 
      path: 'test-results/pricing-toggle-light-monthly.png',
      clip: { x: 0, y: 0, width: 800, height: 400 }
    });
    
    // Get computed styles of the toggle thumb
    const thumbStyles = await page.evaluate(() => {
      const switchElement = document.querySelector('[role="switch"]');
      const thumbElement = switchElement?.querySelector('.mantine-Switch-thumb');
      if (thumbElement) {
        const styles = window.getComputedStyle(thumbElement);
        return {
          backgroundColor: styles.backgroundColor,
          border: styles.border,
          boxShadow: styles.boxShadow,
          opacity: styles.opacity,
          visibility: styles.visibility
        };
      }
      return null;
    });
    
    console.log('Light Mode Monthly - Thumb Styles:', thumbStyles);
    
    // Verify thumb is not transparent
    expect(thumbStyles?.opacity).not.toBe('0');
    expect(thumbStyles?.visibility).not.toBe('hidden');
  });

  test('should have visible toggle button in dark mode monthly state', async ({ page }) => {
    // Ensure we're in dark mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    });
    
    // Wait for theme to apply
    await page.waitForTimeout(500);
    
    // Find the toggle switch
    const toggleSwitch = page.locator('[role="switch"]').first();
    await expect(toggleSwitch).toBeVisible();
    
    // Take screenshot for analysis
    await page.screenshot({ 
      path: 'test-results/pricing-toggle-dark-monthly.png',
      clip: { x: 0, y: 0, width: 800, height: 400 }
    });
    
    // Get computed styles of the toggle thumb
    const thumbStyles = await page.evaluate(() => {
      const switchElement = document.querySelector('[role="switch"]');
      const thumbElement = switchElement?.querySelector('.mantine-Switch-thumb');
      if (thumbElement) {
        const styles = window.getComputedStyle(thumbElement);
        return {
          backgroundColor: styles.backgroundColor,
          border: styles.border,
          boxShadow: styles.boxShadow,
          opacity: styles.opacity,
          visibility: styles.visibility
        };
      }
      return null;
    });
    
    console.log('Dark Mode Monthly - Thumb Styles:', thumbStyles);
  });

  test('should have visible toggle button in light mode annual state', async ({ page }) => {
    // Ensure we're in light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    
    // Wait for theme to apply
    await page.waitForTimeout(500);
    
    // Click the toggle to switch to annual
    const toggleSwitch = page.locator('[role="switch"]').first();
    await toggleSwitch.click();
    await page.waitForTimeout(300);
    
    // Take screenshot for analysis
    await page.screenshot({ 
      path: 'test-results/pricing-toggle-light-annual.png',
      clip: { x: 0, y: 0, width: 800, height: 400 }
    });
    
    // Get computed styles of the toggle thumb
    const thumbStyles = await page.evaluate(() => {
      const switchElement = document.querySelector('[role="switch"]');
      const thumbElement = switchElement?.querySelector('.mantine-Switch-thumb');
      if (thumbElement) {
        const styles = window.getComputedStyle(thumbElement);
        return {
          backgroundColor: styles.backgroundColor,
          border: styles.border,
          boxShadow: styles.boxShadow,
          opacity: styles.opacity,
          visibility: styles.visibility
        };
      }
      return null;
    });
    
    console.log('Light Mode Annual - Thumb Styles:', thumbStyles);
  });

  test('should have visible toggle button in dark mode annual state', async ({ page }) => {
    // Ensure we're in dark mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    });
    
    // Wait for theme to apply
    await page.waitForTimeout(500);
    
    // Click the toggle to switch to annual
    const toggleSwitch = page.locator('[role="switch"]').first();
    await toggleSwitch.click();
    await page.waitForTimeout(300);
    
    // Take screenshot for analysis
    await page.screenshot({ 
      path: 'test-results/pricing-toggle-dark-annual.png',
      clip: { x: 0, y: 0, width: 800, height: 400 }
    });
    
    // Get computed styles of the toggle thumb
    const thumbStyles = await page.evaluate(() => {
      const switchElement = document.querySelector('[role="switch"]');
      const thumbElement = switchElement?.querySelector('.mantine-Switch-thumb');
      if (thumbElement) {
        const styles = window.getComputedStyle(thumbElement);
        return {
          backgroundColor: styles.backgroundColor,
          border: styles.border,
          boxShadow: styles.boxShadow,
          opacity: styles.opacity,
          visibility: styles.visibility
        };
      }
      return null;
    });
    
    console.log('Dark Mode Annual - Thumb Styles:', thumbStyles);
  });

  test('comprehensive toggle visibility analysis', async ({ page }) => {
    // Get the pricing toggle container styles and hierarchy
    const toggleAnalysis = await page.evaluate(() => {
      const switchElement = document.querySelector('[role="switch"]');
      if (!switchElement) return { error: 'Switch not found' };
      
      const trackElement = switchElement.querySelector('.mantine-Switch-track');
      const thumbElement = switchElement.querySelector('.mantine-Switch-thumb');
      
      const analysis = {
        switch: {
          element: switchElement.tagName,
          classes: Array.from(switchElement.classList),
          styles: window.getComputedStyle(switchElement)
        },
        track: trackElement ? {
          element: trackElement.tagName,
          classes: Array.from(trackElement.classList),
          styles: {
            backgroundColor: window.getComputedStyle(trackElement).backgroundColor,
            border: window.getComputedStyle(trackElement).border,
            width: window.getComputedStyle(trackElement).width,
            height: window.getComputedStyle(trackElement).height
          }
        } : null,
        thumb: thumbElement ? {
          element: thumbElement.tagName,
          classes: Array.from(thumbElement.classList),
          styles: {
            backgroundColor: window.getComputedStyle(thumbElement).backgroundColor,
            border: window.getComputedStyle(thumbElement).border,
            boxShadow: window.getComputedStyle(thumbElement).boxShadow,
            width: window.getComputedStyle(thumbElement).width,
            height: window.getComputedStyle(thumbElement).height,
            opacity: window.getComputedStyle(thumbElement).opacity,
            visibility: window.getComputedStyle(thumbElement).visibility,
            position: window.getComputedStyle(thumbElement).position,
            transform: window.getComputedStyle(thumbElement).transform
          }
        } : null
      };
      
      return analysis;
    });
    
    console.log('Toggle Analysis:', JSON.stringify(toggleAnalysis, null, 2));
    
    // Take a detailed screenshot
    await page.screenshot({ 
      path: 'test-results/pricing-toggle-detailed-analysis.png',
      fullPage: false,
      clip: { x: 400, y: 200, width: 600, height: 300 }
    });
  });
});