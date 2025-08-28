const { chromium } = require('playwright');

async function checkContrast() {
  console.log('🔍 Starting Simple Contrast Check...');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Test homepage
    console.log('📄 Testing homepage...');
    await page.goto('http://localhost:3006', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Toggle to light mode
    const themeToggle = page.locator('[data-testid="theme-toggle"], .theme-toggle, button[aria-label*="theme"], button[title*="theme"]').first();
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(1000);
      console.log('  ✅ Switched to light mode');
    }

    // Take screenshot in light mode
    await page.screenshot({ 
      path: '/Users/ssaper/Desktop/my-projects/pm33-claude-execution/app/frontend/contrast-check-light.png',
      fullPage: true 
    });
    console.log('  📸 Screenshot saved: contrast-check-light.png');

    // Test pricing page
    console.log('📄 Testing pricing page...');
    await page.goto('http://localhost:3006/pricing', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: '/Users/ssaper/Desktop/my-projects/pm33-claude-execution/app/frontend/pricing-contrast-check-light.png',
      fullPage: true 
    });
    console.log('  📸 Screenshot saved: pricing-contrast-check-light.png');

    console.log('✅ Manual contrast check complete. Please review screenshots for white text on light backgrounds.');

  } catch (error) {
    console.error('❌ Error during contrast check:', error.message);
  } finally {
    await browser.close();
  }
}

checkContrast();