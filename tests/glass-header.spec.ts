import { test, expect } from '@playwright/test';

test.describe('Glass Morphism Header', () => {
  test('should stay fixed at top while scrolling', async ({ page }) => {
    // Navigate to a page with lots of content (homepage)
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    // Get initial header position
    const header = page.locator('nav.glass-header');
    await expect(header).toBeVisible();
    
    const initialHeaderBox = await header.boundingBox();
    expect(initialHeaderBox?.y).toBe(0); // Should be at top
    
    // Scroll down significantly
    await page.evaluate(() => {
      window.scrollTo(0, 1000);
    });
    
    // Wait for scroll to complete
    await page.waitForTimeout(500);
    
    // Header should still be at the top
    const scrolledHeaderBox = await header.boundingBox();
    expect(scrolledHeaderBox?.y).toBe(0); // Still at top
    
    // Take screenshot to verify glass effect
    await page.screenshot({ 
      path: 'test-results/glass-header-scrolled.png',
      clip: { x: 0, y: 0, width: 1200, height: 200 }
    });
    
    console.log('✅ Header stays fixed while scrolling');
  });

  test('should have proper glass morphism styling', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    // Check header has glass morphism properties
    const headerStyles = await page.evaluate(() => {
      const header = document.querySelector('nav.glass-header');
      if (header) {
        const styles = window.getComputedStyle(header);
        return {
          position: styles.position,
          backdropFilter: styles.backdropFilter,
          webkitBackdropFilter: styles.webkitBackdropFilter,
          backgroundColor: styles.backgroundColor,
          zIndex: styles.zIndex
        };
      }
      return null;
    });
    
    expect(headerStyles?.position).toBe('fixed');
    expect(headerStyles?.backdropFilter).toContain('blur');
    expect(headerStyles?.zIndex).toBe('1000');
    
    console.log('Glass Header Styles:', headerStyles);
    console.log('✅ Header has proper glass morphism styling');
  });

  test('should work in both light and dark modes', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    // Test light mode
    await page.evaluate(() => {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    });
    
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'test-results/glass-header-light.png',
      clip: { x: 0, y: 0, width: 1200, height: 200 }
    });
    
    // Test dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    });
    
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'test-results/glass-header-dark.png',
      clip: { x: 0, y: 0, width: 1200, height: 200 }
    });
    
    // Header should still be visible in both modes
    const header = page.locator('nav.glass-header');
    await expect(header).toBeVisible();
    
    console.log('✅ Header works in both light and dark modes');
  });
});