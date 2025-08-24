// Debug script to check glass morphism classes
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Navigate to dashboard
  await page.goto('http://localhost:3005/dashboard');
  await page.waitForTimeout(3000);
  
  // Check for PM33 cards
  const pm33Cards = await page.locator('[data-testid="pm33-glass-card"]').count();
  console.log('PM33 Cards with data-testid:', pm33Cards);
  
  // Check for CSS class
  const glassCards = await page.locator('.pm33-glass-card').count();
  console.log('Cards with .pm33-glass-card class:', glassCards);
  
  // Check all elements with glass-related classes
  const allGlassElements = await page.locator('[class*="glass"]').count();
  console.log('All elements with "glass" in class:', allGlassElements);
  
  // Get actual class names and computed styles of PM33 cards
  const cardElements = await page.locator('[data-testid="pm33-glass-card"]').all();
  for (let i = 0; i < cardElements.length; i++) {
    const className = await cardElements[i].getAttribute('class');
    console.log(`Card ${i} classes:`, className);
    
    // Check computed backdrop-filter
    const backdropFilter = await cardElements[i].evaluate(el => {
      return window.getComputedStyle(el).backdropFilter || 
             window.getComputedStyle(el).webkitBackdropFilter || 'not-supported';
    });
    console.log(`Card ${i} backdrop-filter:`, backdropFilter);
  }
  
  await browser.close();
})();