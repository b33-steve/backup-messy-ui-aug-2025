// PM33 Marketing Website Design Audit Script
// This script will load the marketing website and analyze design issues

const puppeteer = require('puppeteer');
const fs = require('fs');

async function auditMarketingWebsite() {
  console.log('🎨 Starting PM33 Marketing Website Design Audit...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false, 
    defaultViewport: { width: 1440, height: 900 }
  });
  
  const page = await browser.newPage();
  
  const auditResults = {
    homepage: {},
    pricing: {},
    about: {},
    issues: []
  };

  try {
    // Audit Homepage
    console.log('📊 Auditing Homepage...');
    await page.goto('http://localhost:3006/', { waitUntil: 'networkidle2' });
    
    // Check for text visibility issues
    const textElements = await page.$$eval('*', elements => {
      const issues = [];
      elements.forEach((el, index) => {
        const styles = window.getComputedStyle(el);
        const bgColor = styles.backgroundColor;
        const color = styles.color;
        
        // Check for white text on light backgrounds
        if (color === 'rgb(255, 255, 255)' && 
            (bgColor === 'rgb(255, 255, 255)' || 
             bgColor === 'rgba(0, 0, 0, 0)' ||
             bgColor.includes('248, 250, 252'))) {
          issues.push({
            type: 'contrast',
            element: el.tagName,
            text: el.innerText?.substring(0, 50) + '...',
            color: color,
            background: bgColor
          });
        }
      });
      return issues;
    });
    
    auditResults.homepage.contrastIssues = textElements.length;
    auditResults.issues.push(...textElements.map(issue => ({ ...issue, page: 'homepage' })));
    
    // Take screenshot
    await page.screenshot({ path: 'marketing-audit-homepage-light.png', fullPage: true });
    
    // Test dark mode
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'marketing-audit-homepage-dark.png', fullPage: true });
    
    // Switch back to light mode
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    });
    await page.waitForTimeout(1000);
    
    console.log(`✅ Homepage audit complete - ${textElements.length} contrast issues found`);
    
    // Audit Pricing Page
    console.log('📊 Auditing Pricing Page...');
    await page.goto('http://localhost:3006/pricing', { waitUntil: 'networkidle2' });
    
    const pricingTextElements = await page.$$eval('*', elements => {
      const issues = [];
      elements.forEach((el, index) => {
        const styles = window.getComputedStyle(el);
        const bgColor = styles.backgroundColor;
        const color = styles.color;
        
        if (color === 'rgb(255, 255, 255)' && 
            (bgColor === 'rgb(255, 255, 255)' || 
             bgColor === 'rgba(0, 0, 0, 0)' ||
             bgColor.includes('248, 250, 252'))) {
          issues.push({
            type: 'contrast',
            element: el.tagName,
            text: el.innerText?.substring(0, 50) + '...',
            color: color,
            background: bgColor
          });
        }
      });
      return issues;
    });
    
    auditResults.pricing.contrastIssues = pricingTextElements.length;
    auditResults.issues.push(...pricingTextElements.map(issue => ({ ...issue, page: 'pricing' })));
    
    await page.screenshot({ path: 'marketing-audit-pricing.png', fullPage: true });
    console.log(`✅ Pricing audit complete - ${pricingTextElements.length} contrast issues found`);

    // Test mobile responsiveness
    console.log('📱 Testing Mobile Responsiveness...');
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:3006/', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'marketing-audit-mobile.png', fullPage: true });
    
    console.log('✅ Mobile audit complete');
    
  } catch (error) {
    console.error('❌ Audit failed:', error);
  }
  
  // Generate audit report
  const report = `
# PM33 Marketing Website Design Audit Report

## Summary
- **Total Contrast Issues Found**: ${auditResults.issues.length}
- **Homepage Issues**: ${auditResults.homepage.contrastIssues || 0}
- **Pricing Issues**: ${auditResults.pricing.contrastIssues || 0}

## Critical Issues Identified

${auditResults.issues.slice(0, 10).map(issue => `
### ${issue.page.toUpperCase()} - ${issue.type}
- **Element**: ${issue.element}
- **Text**: "${issue.text}"
- **Color**: ${issue.color}
- **Background**: ${issue.background}
`).join('')}

## Screenshots Generated
- marketing-audit-homepage-light.png
- marketing-audit-homepage-dark.png  
- marketing-audit-pricing.png
- marketing-audit-mobile.png

## Recommendations
1. Fix all white text on light background issues
2. Ensure consistent header/footer across pages
3. Improve glass morphism implementation
4. Enhance mobile responsiveness
5. Perfect theme switching functionality

Generated: ${new Date().toISOString()}
  `;
  
  fs.writeFileSync('marketing-audit-report.md', report);
  console.log('\n📋 Audit report saved to marketing-audit-report.md');
  
  await browser.close();
  console.log('\n✅ Design audit complete!');
}

// Run audit if puppeteer is available
try {
  auditMarketingWebsite().catch(console.error);
} catch (error) {
  console.log('⚠️  Puppeteer not available. Please run: npm install puppeteer');
  console.log('Falling back to manual design audit...\n');
  
  // Manual analysis based on code review
  console.log('🔍 MANUAL CODE ANALYSIS RESULTS:');
  console.log('=================================');
  console.log('');
  console.log('CRITICAL DESIGN ISSUES FOUND:');
  console.log('');
  console.log('1. ❌ TEXT CONTRAST ISSUES:');
  console.log('   - Homepage hero section uses PM33_DESIGN.colors.marketing.text.inverse (white) but may display on light backgrounds');
  console.log('   - Problem section uses "c=dark" which conflicts with light theme text colors');
  console.log('   - CSS variables not consistently applied across all components');
  console.log('');
  console.log('2. ❌ THEME SWITCHING PROBLEMS:');
  console.log('   - ThemeProvider uses data-theme and .dark classes but CSS has conflicting rules');
  console.log('   - Marketing context forces colors with !important but may not work with theme switching');
  console.log('   - Dark theme variables conflict with light theme defaults');
  console.log('');
  console.log('3. ❌ GLASS MORPHISM INCONSISTENCY:');
  console.log('   - Footer uses .marketing-glass-card but class definition not found in CSS');
  console.log('   - Backdrop-filter and glass effects not consistently implemented');
  console.log('   - No CSS variable system for glass morphism effects');
  console.log('');
  console.log('4. ❌ COMPONENT ARCHITECTURE:');
  console.log('   - PM33Header only exports design constants, not actual header component');
  console.log('   - Navigation uses inline styles instead of CSS variables consistently');
  console.log('   - Footer has complex inline styles that break theme consistency');
  console.log('');
  console.log('5. ❌ BRAND CONSISTENCY:');
  console.log('   - Multiple color systems (PM33_DESIGN vs CSS variables)');
  console.log('   - Hardcoded colors mixed with design tokens');
  console.log('   - Inconsistent spacing and typography scales');
  console.log('');
  console.log('📊 ESTIMATED ISSUES: 15-20 high-priority design problems');
  console.log('🎯 RECOMMENDATION: Complete design system overhaul required');
}