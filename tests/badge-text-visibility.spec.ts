import { test, expect } from '@playwright/test';

test('Most Popular badge full text visibility', async ({ page }) => {
  await page.goto('http://localhost:3001/pricing');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  // Find the exact text to ensure it's fully visible
  const fullBadgeText = page.locator('text=🔥 Most Popular');
  await expect(fullBadgeText).toBeVisible();
  
  // Check if we can find the complete text (not truncated)
  const badgeTextContent = await fullBadgeText.textContent();
  expect(badgeTextContent).toBe('🔥 Most Popular');
  
  // Get badge dimensions to ensure it has enough width
  const badgeBox = await fullBadgeText.boundingBox();
  console.log('Badge dimensions:', badgeBox);
  
  // Badge should be wide enough for the full text (at least 140px)
  expect(badgeBox?.width).toBeGreaterThan(140);
  
  // Take screenshot to verify visually
  await page.screenshot({ 
    path: 'test-results/badge-full-text.png',
    clip: { 
      x: Math.max(0, (badgeBox?.x || 0) - 50), 
      y: Math.max(0, (badgeBox?.y || 0) - 20), 
      width: (badgeBox?.width || 0) + 100, 
      height: (badgeBox?.height || 0) + 40 
    }
  });
  
  console.log(`✅ Badge shows full text: "${badgeTextContent}"`);
  console.log(`✅ Badge width: ${badgeBox?.width}px`);
});