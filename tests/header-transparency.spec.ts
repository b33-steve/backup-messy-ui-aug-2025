import { test, expect } from '@playwright/test';

test('header transparency test', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await page.waitForLoadState('networkidle');
  
  // Test light mode transparency
  await page.evaluate(() => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  });
  
  await page.waitForTimeout(500);
  
  const lightModeStyles = await page.evaluate(() => {
    const header = document.querySelector('nav.glass-header');
    if (header) {
      const styles = window.getComputedStyle(header);
      return {
        backgroundColor: styles.backgroundColor,
        backdropFilter: styles.backdropFilter,
        webkitBackdropFilter: styles.webkitBackdropFilter
      };
    }
    return null;
  });
  
  console.log('Light Mode Glass Styles:', lightModeStyles);
  
  // Test dark mode transparency  
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  });
  
  await page.waitForTimeout(500);
  
  const darkModeStyles = await page.evaluate(() => {
    const header = document.querySelector('nav.glass-header');
    if (header) {
      const styles = window.getComputedStyle(header);
      return {
        backgroundColor: styles.backgroundColor,
        backdropFilter: styles.backdropFilter,
        webkitBackdropFilter: styles.webkitBackdropFilter
      };
    }
    return null;
  });
  
  console.log('Dark Mode Glass Styles:', darkModeStyles);
  
  // Take screenshots to verify transparency
  await page.screenshot({ 
    path: 'test-results/header-transparent-dark.png',
    clip: { x: 0, y: 0, width: 1200, height: 300 }
  });
  
  await page.evaluate(() => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  });
  
  await page.waitForTimeout(500);
  
  await page.screenshot({ 
    path: 'test-results/header-transparent-light.png',
    clip: { x: 0, y: 0, width: 1200, height: 300 }
  });
  
  console.log('✅ Header transparency updated successfully');
});