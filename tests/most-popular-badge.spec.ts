import { test, expect } from '@playwright/test';

test('Most Popular badge visibility test', async ({ page }) => {
  // Navigate to pricing page
  await page.goto('http://localhost:3001/pricing');
  await page.waitForLoadState('networkidle');
  
  // Wait for content to load
  await page.waitForTimeout(1000);
  
  // Find the "Most Popular" badge
  const mostPopularBadge = page.locator('text=🔥 Most Popular');
  
  // Check if the badge is visible
  await expect(mostPopularBadge).toBeVisible();
  
  // Get badge position and dimensions
  const badgeBox = await mostPopularBadge.boundingBox();
  
  console.log('Most Popular Badge Position:', badgeBox);
  
  // Badge should be fully visible (y position should be >= 0)
  expect(badgeBox?.y).toBeGreaterThanOrEqual(0);
  
  // Take screenshot of the pricing section
  await page.screenshot({ 
    path: 'test-results/most-popular-badge-fixed.png',
    clip: { x: 0, y: 100, width: 1200, height: 800 }
  });
  
  // Test in both light and dark modes
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  });
  
  await page.waitForTimeout(500);
  
  // Badge should still be visible in dark mode
  await expect(mostPopularBadge).toBeVisible();
  
  await page.screenshot({ 
    path: 'test-results/most-popular-badge-dark.png',
    clip: { x: 0, y: 100, width: 1200, height: 800 }
  });
  
  console.log('✅ Most Popular badge is fully visible in both themes');
});