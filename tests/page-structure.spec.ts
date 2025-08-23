import { test, expect } from '@playwright/test';

test.describe('Page Structure Investigation', () => {
  test('investigate what elements are on the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Wait for basic load instead of networkidle 
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000); // Give React time to render
    
    // Check if navigation exists in any form
    const navExists = await page.locator('nav, [role="navigation"], header').count();
    console.log('Navigation elements found:', navExists);
    
    // Check if footer exists
    const footerExists = await page.locator('footer').count();
    console.log('Footer elements found:', footerExists);
    
    // Check for any Mantine components
    const mantineElements = await page.locator('[class*="mantine"]').count();
    console.log('Mantine elements found:', mantineElements);
    
    // Check page title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Log current URL
    console.log('Current URL:', page.url());
    
    // Log specific navigation content if it exists
    if (navExists > 0) {
      const navText = await page.locator('nav').first().textContent();
      console.log('Navigation content:', navText?.slice(0, 200));
    }
    
    // The test should pass regardless to see the debug info
    expect(true).toBe(true);
  });
});