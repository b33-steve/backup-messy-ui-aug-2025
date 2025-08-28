/**
 * White Text Detection Testing System
 * Automated testing to detect white/light text on white/light backgrounds
 * Validates contrast ratios and theme switching behavior
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3006';
const PAGES_TO_TEST = [
  { path: '/', name: 'homepage' },
  { path: '/pricing', name: 'pricing' },
  { path: '/about', name: 'about' },
  { path: '/blog', name: 'resources' },
  { path: '/contact', name: 'contact' },
  { path: '/features', name: 'features' }
];

const THEMES = ['light', 'dark'];

// Contrast ratio calculation
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1.r, color1.g, color1.b);
  const lum2 = getLuminance(color2.r, color2.g, color2.b);
  return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
}

function parseColor(colorStr) {
  if (colorStr.startsWith('rgb(')) {
    const match = colorStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
    }
  }
  if (colorStr.startsWith('rgba(')) {
    const match = colorStr.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
    if (match) {
      return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
    }
  }
  // Default colors
  if (colorStr === 'white' || colorStr === '#ffffff' || colorStr === '#fff') {
    return { r: 255, g: 255, b: 255 };
  }
  if (colorStr === 'black' || colorStr === '#000000' || colorStr === '#000') {
    return { r: 0, g: 0, b: 0 };
  }
  return { r: 128, g: 128, b: 128 }; // fallback
}

async function testWhiteTextIssues() {
  const browser = await chromium.launch({ headless: false });
  const results = {
    timestamp: new Date().toISOString(),
    issues: [],
    summary: {}
  };

  console.log('🔍 Starting White Text Detection Testing...\n');

  for (const page of PAGES_TO_TEST) {
    console.log(`📄 Testing ${page.name} page...`);
    
    for (const theme of THEMES) {
      console.log(`  🎨 Testing ${theme} theme...`);
      
      const context = await browser.newContext();
      const browserPage = await context.newPage();
      
      try {
        // Navigate to page
        await browserPage.goto(`${BASE_URL}${page.path}`);
        await browserPage.waitForLoadState('networkidle');
        
        // Set theme by adding class to body
        await browserPage.evaluate((themeClass) => {
          document.body.className = themeClass;
          // Also set data attribute for Mantine
          document.documentElement.setAttribute('data-mantine-color-scheme', themeClass);
        }, theme);
        
        // Wait for theme to apply
        await browserPage.waitForTimeout(500);
        
        // Take screenshot
        const screenshotDir = path.join(__dirname, '..', 'test-results', 'white-text-detection');
        if (!fs.existsSync(screenshotDir)) {
          fs.mkdirSync(screenshotDir, { recursive: true });
        }
        
        await browserPage.screenshot({
          path: path.join(screenshotDir, `${page.name}-${theme}-full.png`),
          fullPage: true
        });
        
        // Test specific elements that commonly have contrast issues
        const elementsToTest = [
          // CTA sections with gradients
          { selector: '[style*="background"][style*="linear-gradient"]', description: 'Gradient background sections' },
          // Final CTA sections
          { selector: '[style*="--marketing-primary"]', description: 'Marketing primary sections' },
          // Navigation elements
          { selector: 'nav *', description: 'Navigation elements' },
          // Footer elements
          { selector: 'footer *, [style*="footer"]', description: 'Footer elements' },
          // Text in cards
          { selector: '.mantine-Card-root *', description: 'Card content' },
          // Gradient text elements
          { selector: '[data-variant="gradient"]', description: 'Gradient text elements' },
          // Badge elements
          { selector: '.mantine-Badge-root', description: 'Badge elements' }
        ];
        
        for (const elementTest of elementsToTest) {
          const elements = await browserPage.$$(elementTest.selector);
          
          for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            
            try {
              const styles = await element.evaluate(el => {
                const computed = getComputedStyle(el);
                return {
                  color: computed.color,
                  backgroundColor: computed.backgroundColor,
                  backgroundImage: computed.backgroundImage,
                  textContent: el.textContent?.trim().substring(0, 100) || '',
                  tagName: el.tagName.toLowerCase()
                };
              });
              
              // Check for potential contrast issues
              if (styles.textContent && styles.color && styles.backgroundColor) {
                const textColor = parseColor(styles.color);
                const bgColor = parseColor(styles.backgroundColor);
                const contrastRatio = getContrastRatio(textColor, bgColor);
                
                // WCAG AA requires 4.5:1 for normal text, 3:1 for large text
                if (contrastRatio < 3) {
                  const issue = {
                    page: page.name,
                    theme: theme,
                    element: elementTest.description,
                    selector: elementTest.selector,
                    textContent: styles.textContent,
                    textColor: styles.color,
                    backgroundColor: styles.backgroundColor,
                    contrastRatio: Math.round(contrastRatio * 100) / 100,
                    severity: contrastRatio < 1.5 ? 'critical' : 'warning'
                  };
                  
                  results.issues.push(issue);
                  
                  // Take focused screenshot of problematic element
                  try {
                    await element.screenshot({
                      path: path.join(screenshotDir, `issue-${page.name}-${theme}-${i}.png`)
                    });
                  } catch (screenshotError) {
                    console.warn('    ⚠️ Could not capture element screenshot:', screenshotError.message);
                  }
                }
              }
              
            } catch (elementError) {
              console.warn('    ⚠️ Error testing element:', elementError.message);
            }
          }
        }
        
        // Test specific problematic text patterns
        const textPatterns = [
          'Ready to Transform Your PM Work',
          'Join 2,500+ product managers',
          'Built by the PM community',
          'Start Free Trial',
          'Get Started'
        ];
        
        for (const pattern of textPatterns) {
          try {
            const elements = await browserPage.getByText(pattern, { exact: false }).all();
            
            for (const element of elements) {
              const styles = await element.evaluate(el => {
                const computed = getComputedStyle(el);
                const rect = el.getBoundingClientRect();
                return {
                  color: computed.color,
                  backgroundColor: computed.backgroundColor,
                  visible: rect.width > 0 && rect.height > 0 && computed.opacity !== '0',
                  textContent: el.textContent?.trim() || ''
                };
              });
              
              if (styles.visible && styles.color) {
                const textColor = parseColor(styles.color);
                
                // Check for white text patterns
                if (textColor.r > 240 && textColor.g > 240 && textColor.b > 240 && theme === 'light') {
                  results.issues.push({
                    page: page.name,
                    theme: theme,
                    element: 'Text content',
                    pattern: pattern,
                    textContent: styles.textContent,
                    textColor: styles.color,
                    backgroundColor: styles.backgroundColor,
                    issue: 'White text in light mode',
                    severity: 'critical'
                  });
                }
              }
            }
          } catch (patternError) {
            console.warn(`    ⚠️ Error testing pattern "${pattern}":`, patternError.message);
          }
        }
        
      } catch (error) {
        console.error(`    ❌ Error testing ${page.name} in ${theme} theme:`, error.message);
        results.issues.push({
          page: page.name,
          theme: theme,
          error: error.message,
          severity: 'error'
        });
      }
      
      await context.close();
    }
  }
  
  await browser.close();
  
  // Generate summary
  results.summary = {
    totalIssues: results.issues.length,
    criticalIssues: results.issues.filter(i => i.severity === 'critical').length,
    warningIssues: results.issues.filter(i => i.severity === 'warning').length,
    errorIssues: results.issues.filter(i => i.severity === 'error').length,
    pageBreakdown: {}
  };
  
  for (const page of PAGES_TO_TEST) {
    const pageIssues = results.issues.filter(i => i.page === page.name);
    results.summary.pageBreakdown[page.name] = {
      total: pageIssues.length,
      critical: pageIssues.filter(i => i.severity === 'critical').length,
      warning: pageIssues.filter(i => i.severity === 'warning').length
    };
  }
  
  // Save results
  const resultsPath = path.join(__dirname, '..', 'test-results', 'white-text-detection-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  // Print summary
  console.log('\n📊 WHITE TEXT DETECTION RESULTS');
  console.log('================================');
  console.log(`Total Issues Found: ${results.summary.totalIssues}`);
  console.log(`Critical Issues: ${results.summary.criticalIssues}`);
  console.log(`Warning Issues: ${results.summary.warningIssues}`);
  console.log(`Error Issues: ${results.summary.errorIssues}`);
  
  console.log('\n📄 Issues by Page:');
  for (const [pageName, breakdown] of Object.entries(results.summary.pageBreakdown)) {
    console.log(`  ${pageName}: ${breakdown.total} issues (${breakdown.critical} critical, ${breakdown.warning} warnings)`);
  }
  
  if (results.summary.criticalIssues > 0) {
    console.log('\n🚨 CRITICAL ISSUES FOUND:');
    results.issues
      .filter(i => i.severity === 'critical')
      .slice(0, 5) // Show first 5 critical issues
      .forEach(issue => {
        console.log(`  - ${issue.page} (${issue.theme}): ${issue.element || issue.pattern}`);
        if (issue.textContent) {
          console.log(`    Text: "${issue.textContent.substring(0, 50)}..."`);
        }
        if (issue.contrastRatio) {
          console.log(`    Contrast Ratio: ${issue.contrastRatio}:1 (needs 3:1 minimum)`);
        }
        console.log('');
      });
  }
  
  console.log(`\nDetailed results saved to: ${resultsPath}`);
  console.log(`Screenshots saved to: ${path.join(__dirname, '..', 'test-results', 'white-text-detection')}`);
  
  return results;
}

// Run if called directly
if (require.main === module) {
  testWhiteTextIssues().catch(console.error);
}

module.exports = { testWhiteTextIssues };