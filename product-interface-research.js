const { chromium } = require('playwright');

async function captureProductInterfaces() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });

  const productSamples = [
    {
      name: 'linear-product',
      url: 'https://linear.app/features',
      description: 'Linear - Product interface and demo screenshots',
      selectors: ['[data-testid="screenshot"]', '.screenshot', '[alt*="screenshot"]', '[alt*="interface"]']
    },
    {
      name: 'notion-product',
      url: 'https://www.notion.so/product',
      description: 'Notion - Product workspace interfaces',
      selectors: ['[alt*="workspace"]', '[alt*="interface"]', '.product-screenshot', '[src*="screenshot"]']
    },
    {
      name: 'figma-product',
      url: 'https://www.figma.com/design/',
      description: 'Figma - Design tool interface',
      selectors: ['[alt*="figma"]', '[alt*="design"]', '.hero-image', '[src*="product"]']
    },
    {
      name: 'stripe-dashboard',
      url: 'https://stripe.com/dashboard',
      description: 'Stripe - Dashboard interface examples',
      selectors: ['[alt*="dashboard"]', '[alt*="interface"]', '.dashboard-screenshot']
    },
    {
      name: 'monday-product',
      url: 'https://monday.com/product',
      description: 'Monday.com - PM tool interface',
      selectors: ['[alt*="monday"]', '[alt*="board"]', '[alt*="dashboard"]', '.product-image']
    },
    {
      name: 'asana-product',
      url: 'https://asana.com/product',
      description: 'Asana - Project management interface',
      selectors: ['[alt*="asana"]', '[alt*="project"]', '[alt*="dashboard"]', '.hero-visual']
    },
    {
      name: 'jira-product',
      url: 'https://www.atlassian.com/software/jira',
      description: 'Jira - Issue tracking interface',
      selectors: ['[alt*="jira"]', '[alt*="interface"]', '[alt*="dashboard"]', '.product-hero-image']
    },
    {
      name: 'productboard-interface',
      url: 'https://www.productboard.com/product-management-platform/',
      description: 'ProductBoard - PM platform interface',
      selectors: ['[alt*="productboard"]', '[alt*="roadmap"]', '[alt*="dashboard"]', '.screenshot']
    }
  ];

  for (const sample of productSamples) {
    try {
      console.log(`\n📸 Capturing: ${sample.name}`);
      console.log(`🌐 URL: ${sample.url}`);
      console.log(`📝 Purpose: ${sample.description}`);
      
      const page = await context.newPage();
      
      // Navigate and wait for content
      await page.goto(sample.url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(5000); // Allow for animations/loading
      
      // Capture full page first
      await page.screenshot({
        path: `./product-interface-samples/${sample.name}-full.png`,
        fullPage: true
      });
      
      // Look for product screenshots/interfaces
      let capturedProducts = 0;
      for (const selector of sample.selectors) {
        try {
          const elements = await page.$$(selector);
          for (let i = 0; i < Math.min(elements.length, 3); i++) {
            const element = elements[i];
            const boundingBox = await element.boundingBox();
            if (boundingBox && boundingBox.width > 200 && boundingBox.height > 150) {
              await element.screenshot({
                path: `./product-interface-samples/${sample.name}-interface-${capturedProducts + 1}.png`
              });
              capturedProducts++;
              console.log(`  📱 Captured product interface ${capturedProducts}`);
            }
          }
        } catch (e) {
          // Continue to next selector if this one fails
        }
      }
      
      // Also capture any large images that might be product screenshots
      try {
        const images = await page.$$('img');
        let imageCount = 0;
        for (const img of images) {
          const src = await img.getAttribute('src');
          const alt = await img.getAttribute('alt');
          const boundingBox = await img.boundingBox();
          
          if (boundingBox && 
              boundingBox.width > 400 && 
              boundingBox.height > 300 &&
              (alt?.toLowerCase().includes('product') || 
               alt?.toLowerCase().includes('dashboard') ||
               alt?.toLowerCase().includes('interface') ||
               alt?.toLowerCase().includes('screenshot') ||
               src?.toLowerCase().includes('product') ||
               src?.toLowerCase().includes('dashboard'))) {
            
            await img.screenshot({
              path: `./product-interface-samples/${sample.name}-product-${imageCount + 1}.png`
            });
            imageCount++;
            console.log(`  🖼️  Captured product image: ${alt || 'no alt text'}`);
            
            if (imageCount >= 3) break; // Limit to 3 product images per site
          }
        }
      } catch (e) {
        console.log(`  ⚠️  Could not capture product images: ${e.message}`);
      }
      
      // Capture hero section which often contains product demos
      await page.screenshot({
        path: `./product-interface-samples/${sample.name}-hero.png`,
        clip: { x: 0, y: 0, width: 1440, height: 800 }
      });
      
      console.log(`✅ Successfully captured ${sample.name}`);
      
      await page.close();
      await new Promise(resolve => setTimeout(resolve, 3000)); // Rate limiting
      
    } catch (error) {
      console.log(`❌ Error capturing ${sample.name}: ${error.message}`);
    }
  }

  await browser.close();
  
  console.log(`\n🎨 Product Interface Research Complete!`);
  console.log(`📁 Check ./product-interface-samples/ for captured interfaces`);
  console.log(`\n🔍 Analysis Focus:`);
  console.log(`1. Dashboard layouts and information hierarchy`);
  console.log(`2. Navigation patterns and menu structures`);
  console.log(`3. Data visualization and metrics display`);
  console.log(`4. Color schemes and visual branding`);
  console.log(`5. Interactive elements and user controls`);
}

// Create output directory and run
const fs = require('fs');
const path = './product-interface-samples';
if (!fs.existsSync(path)) {
  fs.mkdirSync(path, { recursive: true });
}

captureProductInterfaces().catch(console.error);