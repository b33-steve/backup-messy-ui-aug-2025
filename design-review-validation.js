const puppeteer = require('puppeteer');
const fs = require('fs');

async function validateDesignCompliance() {
  console.log('🎯 PM33 Design Review - Starting Comprehensive Validation');
  
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const results = {
    timestamp: new Date().toISOString(),
    pages: {},
    issues: [],
    accessibility: {},
    responsiveDesign: {}
  };

  // Test all marketing pages
  const pagesToTest = [
    { url: 'http://localhost:3006/', name: 'Homepage' },
    { url: 'http://localhost:3006/pricing', name: 'Pricing' },
    { url: 'http://localhost:3006/about', name: 'About' },
    { url: 'http://localhost:3006/contact', name: 'Contact' },
    { url: 'http://localhost:3006/resources', name: 'Resources' }
  ];

  for (const testPage of pagesToTest) {
    console.log(`📋 Testing: ${testPage.name}`);
    
    try {
      await page.goto(testPage.url, { waitUntil: 'networkidle0' });
      
      // Capture screenshot
      await page.screenshot({ 
        path: `test-results/design-review-${testPage.name.toLowerCase()}.png`,
        fullPage: true 
      });
      
      // Check for console errors
      const consoleMessages = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleMessages.push(msg.text());
        }
      });
      
      // Check navigation presence
      const hasNavigation = await page.$('nav') !== null;
      const hasFooter = await page.$('footer') !== null || await page.$('.marketing-context footer') !== null;
      
      // Check PM33 logo
      const hasLogo = await page.$('img[alt*="PM33"]') !== null;
      
      // Test specific CTA section visibility
      let ctaTextVisible = false;
      try {
        const ctaElement = await page.$('*:contains("Ready to Transform Your PM Work?")');
        if (ctaElement) {
          const styles = await page.evaluate(el => {
            const computed = window.getComputedStyle(el);
            return {
              color: computed.color,
              backgroundColor: computed.backgroundColor,
              visibility: computed.visibility,
              display: computed.display
            };
          }, ctaElement);
          ctaTextVisible = styles.visibility !== 'hidden' && styles.display !== 'none';
        }
      } catch (e) {
        console.log('CTA text check failed:', e.message);
      }
      
      // Store results
      results.pages[testPage.name] = {
        url: testPage.url,
        status: 'success',
        hasNavigation,
        hasFooter,
        hasLogo,
        ctaTextVisible,
        consoleErrors: consoleMessages.length,
        screenshot: `design-review-${testPage.name.toLowerCase()}.png`
      };
      
    } catch (error) {
      console.error(`❌ Error testing ${testPage.name}:`, error.message);
      results.pages[testPage.name] = {
        url: testPage.url,
        status: 'error',
        error: error.message
      };
      results.issues.push(`${testPage.name}: ${error.message}`);
    }
  }
  
  // Test responsive design on homepage
  const viewports = [
    { width: 375, height: 667, name: 'Mobile' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 1440, height: 900, name: 'Desktop' }
  ];
  
  console.log('📱 Testing Responsive Design');
  await page.goto('http://localhost:3006/', { waitUntil: 'networkidle0' });
  
  for (const viewport of viewports) {
    try {
      await page.setViewport(viewport);
      await page.screenshot({ 
        path: `test-results/responsive-${viewport.name.toLowerCase()}.png`
      });
      
      results.responsiveDesign[viewport.name] = {
        viewport,
        screenshot: `responsive-${viewport.name.toLowerCase()}.png`,
        status: 'success'
      };
    } catch (error) {
      results.responsiveDesign[viewport.name] = {
        viewport,
        status: 'error',
        error: error.message
      };
    }
  }
  
  await browser.close();
  
  // Write results to file
  fs.writeFileSync('test-results/design-review-results.json', JSON.stringify(results, null, 2));
  
  console.log('✅ Design Review Complete');
  console.log('📊 Results Summary:');
  console.log(`- Pages tested: ${Object.keys(results.pages).length}`);
  console.log(`- Issues found: ${results.issues.length}`);
  console.log(`- Results saved to: test-results/design-review-results.json`);
  
  return results;
}

// Run validation
validateDesignCompliance().catch(console.error);