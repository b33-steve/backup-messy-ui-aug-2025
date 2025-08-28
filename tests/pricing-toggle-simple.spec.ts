import { test, expect } from '@playwright/test';

test('pricing toggle button visibility test', async ({ page }) => {
  // Navigate to pricing page
  await page.goto('http://localhost:3001/pricing');
  await page.waitForLoadState('networkidle');
  
  // Wait for the pricing toggle to be visible
  await page.waitForTimeout(1000);
  
  // Take screenshot of the pricing toggle area
  await page.screenshot({ 
    path: 'test-results/pricing-toggle-fixed.png',
    clip: { x: 300, y: 100, width: 800, height: 400 }
  });
  
  // Try to find and click the switch - this should work if it's visible
  const switchTrack = page.locator('.mantine-Switch-track');
  await expect(switchTrack).toBeVisible();
  
  console.log('✅ Pricing toggle is now visible!');
  
  // Test clicking the toggle
  await switchTrack.click();
  await page.waitForTimeout(500);
  
  // Take screenshot after clicking
  await page.screenshot({ 
    path: 'test-results/pricing-toggle-clicked.png',
    clip: { x: 300, y: 100, width: 800, height: 400 }
  });
  
  console.log('✅ Pricing toggle click test passed!');
});