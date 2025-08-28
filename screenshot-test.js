const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3006', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'homepage-validation-full.png', fullPage: true });
    
    // Find the "Ready to Transform" text and take a focused screenshot
    const ctaSection = await page.locator('text=Ready to Transform Your PM Work?').first();
    if (await ctaSection.isVisible()) {
      await ctaSection.scrollIntoViewIfNeeded();
      await page.screenshot({ path: 'homepage-cta-section.png' });
      console.log('✅ "Ready to Transform Your PM Work?" text found and screenshot captured');
    } else {
      console.log('❌ "Ready to Transform Your PM Work?" text NOT found');
    }
    
    // Check all pages consistency
    const pages = ['/pricing', '/about', '/contact', '/resources'];
    for (const pagePath of pages) {
      try {
        await page.goto(`http://localhost:3006${pagePath}`, { waitUntil: 'networkidle' });
        await page.screenshot({ path: `page-${pagePath.replace('/', '')}-validation.png`, fullPage: true });
        
        // Check for header/footer consistency
        const header = await page.locator('nav').first();
        const footer = await page.locator('footer, [data-testid="footer"]').first();
        
        console.log(`Page ${pagePath}:`);
        console.log(`  Header present: ${await header.isVisible()}`);
        console.log(`  Footer present: ${await footer.isVisible()}`);
      } catch (error) {
        console.log(`❌ Error loading ${pagePath}:`, error.message);
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();