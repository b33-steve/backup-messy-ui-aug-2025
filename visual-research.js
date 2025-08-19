const { chromium } = require('playwright');

async function captureDesignSamples() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });

  const designSamples = [
    {
      name: 'linear-homepage',
      url: 'https://linear.app',
      description: 'Linear - Clean, minimal, intentional design'
    },
    {
      name: 'notion-homepage', 
      url: 'https://www.notion.so',
      description: 'Notion - Effortless, approachable AI workspace'
    },
    {
      name: 'stripe-homepage',
      url: 'https://stripe.com',
      description: 'Stripe - Professional, structured, calm complexity'
    },
    {
      name: 'figma-homepage',
      url: 'https://www.figma.com',
      description: 'Figma - Visual engagement, collaborative feel'
    },
    {
      name: 'claude-interface',
      url: 'https://claude.ai',
      description: 'Claude - AI interface with Artifacts workspace'
    },
    {
      name: 'openai-chatgpt',
      url: 'https://chatgpt.com',
      description: 'ChatGPT - Conversational AI with memory integration'
    }
  ];

  for (const sample of designSamples) {
    try {
      console.log(`\n📸 Capturing: ${sample.name}`);
      console.log(`🌐 URL: ${sample.url}`);
      console.log(`📝 Purpose: ${sample.description}`);
      
      const page = await context.newPage();
      
      // Navigate and wait for network idle
      await page.goto(sample.url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000); // Allow for animations/loading
      
      // Capture full page
      await page.screenshot({
        path: `./visual-research-samples/${sample.name}-full.png`,
        fullPage: true
      });
      
      // Capture hero/above-fold section
      await page.screenshot({
        path: `./visual-research-samples/${sample.name}-hero.png`,
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });
      
      // Capture navigation if visible
      const navSelector = 'nav, header, [role="navigation"]';
      const navElement = await page.$(navSelector);
      if (navElement) {
        await navElement.screenshot({
          path: `./visual-research-samples/${sample.name}-navigation.png`
        });
      }
      
      console.log(`✅ Successfully captured ${sample.name}`);
      
      await page.close();
      await new Promise(resolve => setTimeout(resolve, 2000)); // Rate limiting
      
    } catch (error) {
      console.log(`❌ Error capturing ${sample.name}: ${error.message}`);
    }
  }

  await browser.close();
  
  console.log(`\n🎨 Design Research Complete!`);
  console.log(`📁 Check ./visual-research-samples/ for captured designs`);
  console.log(`\n🔍 Next Steps:`);
  console.log(`1. Analyze visual patterns across captured samples`);
  console.log(`2. Extract design principles from best performers`);
  console.log(`3. Apply insights to PM33 design strategy`);
}

// Create output directory and run
const fs = require('fs');
const path = './visual-research-samples';
if (!fs.existsSync(path)) {
  fs.mkdirSync(path, { recursive: true });
}

captureDesignSamples().catch(console.error);