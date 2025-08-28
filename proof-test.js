const { chromium } = require('playwright');

async function proofTest() {
  console.log('🔍 Taking proof screenshot...');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:3006', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    // Ensure we're in light mode
    const themeToggle = page.locator('[data-testid="theme-toggle"], .theme-toggle, button[aria-label*="theme"], button[title*="theme"]').first();
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(1000);
    }

    // Scroll to the new section
    await page.evaluate(() => {
      const element = document.querySelector('h2, [style*="Ready to Transform"]');
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    
    await page.waitForTimeout(2000);

    // Take full page screenshot
    await page.screenshot({ 
      path: '/Users/ssaper/Desktop/my-projects/pm33-claude-execution/app/frontend/PROOF-VISIBLE-TEXT.png',
      fullPage: true 
    });

    console.log('📸 PROOF screenshot saved: PROOF-VISIBLE-TEXT.png');
    console.log('✅ "Ready to Transform Your PM Work?" should now be clearly visible!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

proofTest();