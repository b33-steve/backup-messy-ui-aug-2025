const { chromium } = require('playwright');

async function testAllLinks() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const pagesToTest = [
    'http://localhost:3000',
    'http://localhost:3000/strategic-intelligence',
    'http://localhost:3000/command-center',
    'http://localhost:3000/pricing',
    'http://localhost:3000/about',
    'http://localhost:3000/trial'
  ];

  const results = [];

  for (const pageUrl of pagesToTest) {
    console.log(`\n🔍 Testing page: ${pageUrl}`);
    
    try {
      // Go to page
      const response = await page.goto(pageUrl);
      const status = response.status();
      
      console.log(`Status: ${status}`);
      
      if (status >= 400) {
        results.push({ url: pageUrl, status, error: `HTTP ${status}` });
        continue;
      }

      // Find all links
      const links = await page.locator('a[href]').all();
      console.log(`Found ${links.length} links`);

      // Test each link
      for (let i = 0; i < Math.min(links.length, 20); i++) { // Limit to first 20 links
        try {
          const href = await links[i].getAttribute('href');
          const text = await links[i].textContent();
          
          if (href && href.startsWith('/')) {
            // Internal link - test it
            console.log(`  Testing: ${href} ("${text?.slice(0, 30) || 'No text'}")`);
            
            const linkResponse = await page.request.get(`http://localhost:3000${href}`);
            const linkStatus = linkResponse.status();
            
            if (linkStatus >= 400) {
              results.push({ 
                url: pageUrl, 
                link: href, 
                text: text?.slice(0, 50), 
                status: linkStatus, 
                error: `Link returned HTTP ${linkStatus}` 
              });
              console.log(`    ❌ HTTP ${linkStatus}`);
            } else {
              console.log(`    ✅ HTTP ${linkStatus}`);
            }
          }
        } catch (error) {
          console.log(`    ⚠️  Error testing link: ${error.message}`);
        }
      }

      results.push({ url: pageUrl, status: 'OK', linksCount: links.length });

    } catch (error) {
      console.log(`❌ Error loading page: ${error.message}`);
      results.push({ url: pageUrl, error: error.message });
    }
  }

  await browser.close();

  console.log('\n📊 SUMMARY:');
  console.log('=' * 50);
  
  const errors = results.filter(r => r.error || r.status >= 400);
  if (errors.length === 0) {
    console.log('✅ All pages and links working correctly!');
  } else {
    console.log(`❌ Found ${errors.length} issues:`);
    errors.forEach((error, i) => {
      console.log(`${i + 1}. ${error.url}${error.link ? ` -> ${error.link}` : ''}: ${error.error || error.status}`);
    });
  }

  console.log('\n📈 Page Status:');
  results.filter(r => !r.link).forEach(r => {
    console.log(`${r.url}: ${r.error ? '❌ ' + r.error : '✅ OK'} ${r.linksCount ? `(${r.linksCount} links)` : ''}`);
  });
}

testAllLinks().catch(console.error);