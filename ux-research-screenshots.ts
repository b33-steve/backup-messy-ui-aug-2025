import { chromium, type Browser, type Page } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * UX Research Screenshot Tool
 * Captures screenshots of leading SaaS platforms for design pattern analysis
 * Focus: Navigation, layout, spacing, typography, and responsive design
 */

interface ScreenshotTarget {
  name: string;
  url: string;
  description: string;
  waitForSelector?: string;
  additionalSelectors?: string[];
}

const targets: ScreenshotTarget[] = [
  {
    name: 'monday-homepage',
    url: 'https://monday.com',
    description: 'Monday.com homepage - Navigation and hero section',
    waitForSelector: 'header, nav, [data-testid="header"]',
  },
  {
    name: 'monday-dashboard',
    url: 'https://monday.com/product',
    description: 'Monday.com product/dashboard view',
    waitForSelector: 'main, .product-hero, [data-testid="product"]',
  },
  {
    name: 'linear-homepage',
    url: 'https://linear.app',
    description: 'Linear homepage - Clean design patterns',
    waitForSelector: 'header, nav, main',
  },
  {
    name: 'linear-product',
    url: 'https://linear.app/product',
    description: 'Linear product interface showcase',
    waitForSelector: 'main, .product-section',
  },
  {
    name: 'notion-homepage',
    url: 'https://notion.so',
    description: 'Notion homepage - Typography and layout',
    waitForSelector: 'header, nav, main',
  },
  {
    name: 'stripe-homepage',
    url: 'https://stripe.com',
    description: 'Stripe homepage - UX excellence reference',
    waitForSelector: 'header, nav, main',
  },
  {
    name: 'figma-homepage',
    url: 'https://figma.com',
    description: 'Figma homepage - Design tool UX patterns',
    waitForSelector: 'header, nav, main',
  }
];

class UXResearchCapture {
  private browser: Browser | null = null;
  private outputDir: string;

  constructor() {
    this.outputDir = path.join(__dirname, 'ux-research-screenshots');
  }

  async initialize(): Promise<void> {
    // Create output directory
    await fs.mkdir(this.outputDir, { recursive: true });
    
    // Launch browser with desktop viewport
    this.browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async captureScreenshots(): Promise<void> {
    if (!this.browser) {
      throw new Error('Browser not initialized');
    }

    console.log(`🎯 Starting UX research screenshot capture...`);
    console.log(`📁 Output directory: ${this.outputDir}`);

    for (const target of targets) {
      await this.captureTarget(target);
      // Wait between requests to be respectful
      await this.wait(2000);
    }
  }

  private async captureTarget(target: ScreenshotTarget): Promise<void> {
    if (!this.browser) return;

    const page = await this.browser.newPage();
    
    try {
      console.log(`📸 Capturing: ${target.name} (${target.url})`);

      // Set desktop viewport - 1440px wide as requested
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Navigate to target
      await page.goto(target.url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });

      // Wait for key elements to load
      if (target.waitForSelector) {
        try {
          await page.waitForSelector(target.waitForSelector, { timeout: 10000 });
        } catch (error) {
          console.log(`⚠️  Primary selector not found for ${target.name}, continuing...`);
        }
      }

      // Additional wait for dynamic content
      await this.wait(3000);

      // Capture full page screenshot
      const fullPagePath = path.join(this.outputDir, `${target.name}-full-page.png`);
      await page.screenshot({
        path: fullPagePath,
        fullPage: true,
        type: 'png'
      });

      // Capture viewport screenshot (above fold)
      const viewportPath = path.join(this.outputDir, `${target.name}-viewport.png`);
      await page.screenshot({
        path: viewportPath,
        fullPage: false,
        type: 'png'
      });

      // Capture navigation area specifically
      try {
        const navSelector = 'header, nav, [role="banner"], [data-testid="header"], .header, .navigation';
        const navigationElement = await page.$(navSelector);
        if (navigationElement) {
          const navPath = path.join(this.outputDir, `${target.name}-navigation.png`);
          await navigationElement.screenshot({ path: navPath, type: 'png' });
        }
      } catch (error) {
        console.log(`⚠️  Could not capture navigation for ${target.name}`);
      }

      console.log(`✅ Successfully captured ${target.name}`);

    } catch (error) {
      console.error(`❌ Error capturing ${target.name}:`, error);
    } finally {
      await page.close();
    }
  }

  private async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async cleanup(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async generateReport(): Promise<void> {
    const reportPath = path.join(this.outputDir, 'capture-report.md');
    const timestamp = new Date().toISOString();
    
    let report = `# UX Research Screenshot Capture Report\n\n`;
    report += `**Generated:** ${timestamp}\n`;
    report += `**Viewport:** 1440x900 (Desktop)\n`;
    report += `**Purpose:** Analyze navigation patterns, spacing, typography, and responsive design\n\n`;
    report += `## Captured Platforms\n\n`;

    for (const target of targets) {
      report += `### ${target.name}\n`;
      report += `- **URL:** ${target.url}\n`;
      report += `- **Description:** ${target.description}\n`;
      report += `- **Files:**\n`;
      report += `  - \`${target.name}-full-page.png\` - Complete page capture\n`;
      report += `  - \`${target.name}-viewport.png\` - Above-the-fold view\n`;
      report += `  - \`${target.name}-navigation.png\` - Navigation area focus\n\n`;
    }

    report += `## Analysis Focus Areas\n\n`;
    report += `1. **Desktop Navigation Patterns** - How leading platforms handle desktop navigation without hamburger menus\n`;
    report += `2. **Hero Section Design** - Professional spacing, typography, and layout patterns\n`;
    report += `3. **Content Layout Systems** - Grid systems, spacing, and visual hierarchy\n`;
    report += `4. **Color Schemes & Gradients** - Professional color palettes and visual treatments\n`;
    report += `5. **Responsive Design Principles** - How they adapt layouts for different screen sizes\n\n`;
    report += `## Next Steps\n\n`;
    report += `- Review captured screenshots for UX patterns\n`;
    report += `- Identify common navigation structures\n`;
    report += `- Analyze spacing and typography systems\n`;
    report += `- Document best practices for PM33 implementation\n`;

    await fs.writeFile(reportPath, report, 'utf-8');
    console.log(`📋 Report generated: ${reportPath}`);
  }
}

// Main execution
async function main(): Promise<void> {
  const capture = new UXResearchCapture();
  
  try {
    await capture.initialize();
    await capture.captureScreenshots();
    await capture.generateReport();
    console.log(`\n🎉 UX research screenshot capture completed successfully!`);
    console.log(`📁 Check the 'ux-research-screenshots' directory for all captured images`);
  } catch (error) {
    console.error('❌ Error during capture:', error);
    process.exit(1);
  } finally {
    await capture.cleanup();
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { UXResearchCapture };