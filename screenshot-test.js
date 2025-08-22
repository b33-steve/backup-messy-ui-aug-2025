const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('Navigating to localhost:3000...');
  await page.goto('http://localhost:3000');
  
  // Wait for page to load
  await page.waitForTimeout(3000);
  
  // Take screenshot
  await page.screenshot({ path: 'current-ui-state.png', fullPage: true });
  
  console.log('Screenshot saved as current-ui-state.png');
  console.log('Page title:', await page.title());
  
  // Check what we actually have
  const hasGlassCard = await page.locator('.pm33-glass-card').count();
  const hasGradientButton = await page.locator('.pm33-gradient-button').count();
  const hasPM33Card = await page.locator('.PM33Card').count();
  
  console.log('Glass cards found:', hasGlassCard);
  console.log('Gradient buttons found:', hasGradientButton);
  console.log('PM33Cards found:', hasPM33Card);
  
  // Check for our CSS variables
  const styles = await page.evaluate(() => {
    const computedStyle = getComputedStyle(document.documentElement);
    return {
      pm33Brand: computedStyle.getPropertyValue('--pm33-brand'),
      pm33Glass: computedStyle.getPropertyValue('--pm33-glass')
    };
  });
  
  console.log('CSS Variables:', styles);
  
  await browser.close();
})();