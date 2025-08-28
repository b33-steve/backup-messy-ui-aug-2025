/**
 * Specific White Text Issue Validation
 * Tests the exact issues reported by the user
 */

const { chromium } = require('playwright');

async function testSpecificIssues() {
  console.log('🔍 Testing Specific White Text Issues Reported by User...\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Test 1: "Ready to Transform Your PM Work?" text in pricing page
    console.log('📄 Testing pricing page - "Ready to Transform Your PM Work?" text...');
    await page.goto('http://localhost:3006/pricing');
    await page.waitForLoadState('networkidle');
    
    // Test in light mode
    console.log('  🌞 Testing in light mode...');
    await page.evaluate(() => {
      document.body.className = 'light';
      document.documentElement.setAttribute('data-mantine-color-scheme', 'light');
    });
    await page.waitForTimeout(1000);
    
    // Find the specific text
    const readyTransformText = page.getByText('Ready to Transform Your PM Work?');
    
    if (await readyTransformText.count() > 0) {
      const element = readyTransformText.first();
      const isVisible = await element.isVisible();
      const styles = await element.evaluate(el => {
        const computed = getComputedStyle(el);
        const parentStyles = getComputedStyle(el.parentElement || el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          parentBackground: parentStyles.background,
          parentBackgroundColor: parentStyles.backgroundColor,
          textContent: el.textContent
        };
      });
      
      console.log(`    ✅ Text found: "${styles.textContent}"`);
      console.log(`    ✅ Visible: ${isVisible}`);
      console.log(`    ✅ Text Color: ${styles.color}`);
      console.log(`    ✅ Background: ${styles.backgroundColor || styles.parentBackground}`);
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/specific-issue-pricing-light.png',
        fullPage: false 
      });
      
    } else {
      console.log('    ❌ Text "Ready to Transform Your PM Work?" not found');
    }
    
    // Test in dark mode
    console.log('  🌙 Testing in dark mode...');
    await page.evaluate(() => {
      document.body.className = 'dark';
      document.documentElement.setAttribute('data-mantine-color-scheme', 'dark');
    });
    await page.waitForTimeout(1000);
    
    if (await readyTransformText.count() > 0) {
      const element = readyTransformText.first();
      const styles = await element.evaluate(el => {
        const computed = getComputedStyle(el);
        const parentStyles = getComputedStyle(el.parentElement || el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          parentBackground: parentStyles.background,
          textContent: el.textContent
        };
      });
      
      console.log(`    ✅ Text Color: ${styles.color}`);
      console.log(`    ✅ Background: ${styles.backgroundColor || styles.parentBackground}`);
      
      await page.screenshot({ 
        path: 'test-results/specific-issue-pricing-dark.png',
        fullPage: false 
      });
    }
    
    // Test 2: Navigation consistency
    console.log('\n🧭 Testing header consistency across pages...');
    const testPages = [
      { path: '/pricing', name: 'pricing' },
      { path: '/about', name: 'about' },
      { path: '/blog', name: 'resources' },
      { path: '/contact', name: 'contact' }
    ];
    
    for (const testPage of testPages) {
      await page.goto(`http://localhost:3006${testPage.path}`);
      await page.waitForLoadState('networkidle');
      
      // Check for consistent header elements
      const hasNav = await page.locator('nav').isVisible();
      const hasLogo = await page.locator('img[alt*="PM33"]').isVisible();
      const hasCTA = await page.getByRole('button', { name: /start free trial|get started|try free/i }).isVisible();
      
      console.log(`  ${testPage.name}: Nav=${hasNav}, Logo=${hasLogo}, CTA=${hasCTA}`);
    }
    
    // Test 3: Footer visibility
    console.log('\n🦶 Testing footer visibility...');
    await page.goto('http://localhost:3006/pricing');
    await page.waitForLoadState('networkidle');
    
    const footerText = page.getByText('Built by the PM community');
    const footerVisible = await footerText.isVisible();
    
    if (footerVisible) {
      const footerStyles = await footerText.evaluate(el => {
        const container = el.closest('div, footer, section');
        const computed = getComputedStyle(container || el);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          borderTop: computed.borderTop,
          position: computed.position
        };
      });
      
      console.log(`  ✅ Footer visible: ${footerVisible}`);
      console.log(`  ✅ Footer styles:`, footerStyles);
    } else {
      console.log(`  ❌ Footer not visible`);
    }
    
    // Test 4: Check CSS variables
    console.log('\n🎨 Testing CSS variables...');
    const variables = await page.evaluate(() => {
      const computedStyles = getComputedStyle(document.documentElement);
      return {
        'marketing-primary': computedStyles.getPropertyValue('--marketing-primary').trim(),
        'marketing-bg-primary': computedStyles.getPropertyValue('--marketing-bg-primary').trim(),
        'gradient-text': computedStyles.getPropertyValue('--gradient-text').trim(),
        'color-text-primary': computedStyles.getPropertyValue('--color-text-primary').trim()
      };
    });
    
    console.log('  ✅ CSS Variables:');
    Object.entries(variables).forEach(([name, value]) => {
      console.log(`    ${name}: ${value || 'UNDEFINED'}`);
    });
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
  
  console.log('\n✅ Specific issue testing complete!');
  console.log('Screenshots saved to test-results/specific-issue-*.png');
}

// Run if called directly
if (require.main === module) {
  testSpecificIssues().catch(console.error);
}

module.exports = { testSpecificIssues };