import { test, expect } from '@playwright/test';

test.describe('Pricing Toggle - Theme Tests', () => {
  test('should be visible and clickable in light mode', async ({ page }) => {
    // Navigate to pricing page
    await page.goto('http://localhost:3001/pricing');
    await page.waitForLoadState('networkidle');
    
    // Force light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    
    await page.waitForTimeout(1000);
    
    // Find the switch track and verify it's visible
    const switchTrack = page.locator('.mantine-Switch-track');
    await expect(switchTrack).toBeVisible();
    
    // Take screenshot in light mode
    await page.screenshot({ 
      path: 'test-results/pricing-toggle-light-mode.png',
      clip: { x: 300, y: 100, width: 800, height: 400 }
    });
    
    // Test clicking the toggle
    await switchTrack.click();
    await page.waitForTimeout(500);
    
    // Screenshot after toggle
    await page.screenshot({ 
      path: 'test-results/pricing-toggle-light-mode-annual.png',
      clip: { x: 300, y: 100, width: 800, height: 400 }
    });
    
    console.log('✅ Light mode test passed!');
  });

  test('should be visible and clickable in dark mode', async ({ page }) => {
    // Navigate to pricing page
    await page.goto('http://localhost:3001/pricing');
    await page.waitForLoadState('networkidle');
    
    // Force dark mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    });
    
    await page.waitForTimeout(1000);
    
    // Find the switch track and verify it's visible
    const switchTrack = page.locator('.mantine-Switch-track');
    await expect(switchTrack).toBeVisible();
    
    // Take screenshot in dark mode
    await page.screenshot({ 
      path: 'test-results/pricing-toggle-dark-mode.png',
      clip: { x: 300, y: 100, width: 800, height: 400 }
    });
    
    // Test clicking the toggle
    await switchTrack.click();
    await page.waitForTimeout(500);
    
    // Screenshot after toggle
    await page.screenshot({ 
      path: 'test-results/pricing-toggle-dark-mode-annual.png',
      clip: { x: 300, y: 100, width: 800, height: 400 }
    });
    
    console.log('✅ Dark mode test passed!');
  });
});