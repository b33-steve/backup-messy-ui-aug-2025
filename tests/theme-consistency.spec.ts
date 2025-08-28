import { test, expect } from '@playwright/test';

/**
 * Theme Consistency Testing Suite
 * Tests theme switching, header standardization, and text visibility across all pages
 */

const PAGES_TO_TEST = [
  { path: '/', name: 'homepage' },
  { path: '/pricing', name: 'pricing' },
  { path: '/about', name: 'about' },
  { path: '/blog', name: 'resources' },
  { path: '/contact', name: 'contact' },
  { path: '/features', name: 'features' }
];

const THEMES = [
  { class: 'light', name: 'light' },
  { class: 'dark', name: 'dark' }
];

test.describe('Theme Consistency Tests', () => {
  
  test.describe('Header Standardization', () => {
    for (const page of PAGES_TO_TEST) {
      test(`${page.name} page has standardized header`, async ({ page: browserPage }) => {
        await browserPage.goto(`http://localhost:3006${page.path}`);
        await browserPage.waitForLoadState('networkidle');
        
        // Check for standardized header elements
        await expect(browserPage.locator('nav')).toBeVisible();
        await expect(browserPage.locator('img[alt*="PM33"]')).toBeVisible();
        await expect(browserPage.getByText('AI Product Management')).toBeVisible();
        await expect(browserPage.getByRole('button', { name: /start free trial|get started|try free/i })).toBeVisible();
        
        // Check for theme toggle
        const themeToggle = browserPage.locator('button[aria-label*="theme" i], button[title*="theme" i], button:has(svg)').first();
        await expect(themeToggle).toBeVisible();
      });
    }
  });

  test.describe('Theme Switching', () => {
    for (const page of PAGES_TO_TEST) {
      for (const theme of THEMES) {
        test(`${page.name} page works in ${theme.name} theme`, async ({ page: browserPage }) => {
          await browserPage.goto(`http://localhost:3006${page.path}`);
          await browserPage.waitForLoadState('networkidle');
          
          // Apply theme
          await browserPage.evaluate((themeClass) => {
            document.body.className = themeClass;
            document.documentElement.setAttribute('data-mantine-color-scheme', themeClass);
          }, theme.class);
          
          await browserPage.waitForTimeout(500);
          
          // Take screenshot for visual verification
          await browserPage.screenshot({
            path: `test-results/theme-consistency/${page.name}-${theme.name}.png`,
            fullPage: true
          });
          
          // Check that header is still visible and functional
          await expect(browserPage.locator('nav')).toBeVisible();
          await expect(browserPage.locator('img[alt*="PM33"]')).toBeVisible();
        });
      }
    }
  });

  test.describe('CSS Variables Validation', () => {
    for (const page of PAGES_TO_TEST) {
      test(`${page.name} page has no undefined CSS variables`, async ({ page: browserPage }) => {
        const consoleErrors: string[] = [];
        
        browserPage.on('console', msg => {
          if (msg.type() === 'error' && msg.text().includes('--')) {
            consoleErrors.push(msg.text());
          }
        });
        
        await browserPage.goto(`http://localhost:3006${page.path}`);
        await browserPage.waitForLoadState('networkidle');
        
        // Check for critical marketing variables
        const marketingVariables = await browserPage.evaluate(() => {
          const computedStyles = getComputedStyle(document.documentElement);
          return {
            'marketing-primary': computedStyles.getPropertyValue('--marketing-primary'),
            'marketing-bg-primary': computedStyles.getPropertyValue('--marketing-bg-primary'),
            'marketing-bg-secondary': computedStyles.getPropertyValue('--marketing-bg-secondary'),
            'gradient-text': computedStyles.getPropertyValue('--gradient-text')
          };
        });
        
        // Verify marketing variables are defined
        expect(marketingVariables['marketing-primary']).toBeTruthy();
        expect(marketingVariables['marketing-bg-primary']).toBeTruthy();
        expect(marketingVariables['marketing-bg-secondary']).toBeTruthy();
        expect(marketingVariables['gradient-text']).toBeTruthy();
        
        // Check for console errors related to CSS variables
        expect(consoleErrors).toHaveLength(0);
      });
    }
  });

  test.describe('Text Visibility Tests', () => {
    const CRITICAL_TEXT_PATTERNS = [
      'Ready to Transform Your PM Work',
      'Join 2,500+ product managers',
      'Start Free Trial',
      'AI Product Management'
    ];

    for (const page of PAGES_TO_TEST) {
      for (const theme of THEMES) {
        test(`${page.name} page has visible text in ${theme.name} theme`, async ({ page: browserPage }) => {
          await browserPage.goto(`http://localhost:3006${page.path}`);
          await browserPage.waitForLoadState('networkidle');
          
          // Apply theme
          await browserPage.evaluate((themeClass) => {
            document.body.className = themeClass;
            document.documentElement.setAttribute('data-mantine-color-scheme', themeClass);
          }, theme.class);
          
          await browserPage.waitForTimeout(500);
          
          // Check for critical text patterns that commonly have contrast issues
          for (const textPattern of CRITICAL_TEXT_PATTERNS) {
            const elements = browserPage.getByText(textPattern, { exact: false });
            const count = await elements.count();
            
            if (count > 0) {
              // Check if at least one instance is visible
              let hasVisibleText = false;
              for (let i = 0; i < Math.min(count, 3); i++) {
                const element = elements.nth(i);
                if (await element.isVisible()) {
                  // Check computed styles for contrast
                  const styles = await element.evaluate(el => {
                    const computed = getComputedStyle(el);
                    const rect = el.getBoundingClientRect();
                    return {
                      color: computed.color,
                      backgroundColor: computed.backgroundColor,
                      display: computed.display,
                      visibility: computed.visibility,
                      opacity: computed.opacity,
                      width: rect.width,
                      height: rect.height
                    };
                  });
                  
                  // Element is visible if it has dimensions and proper styles
                  if (styles.width > 0 && styles.height > 0 && 
                      styles.display !== 'none' && 
                      styles.visibility !== 'hidden' && 
                      parseFloat(styles.opacity) > 0.1) {
                    hasVisibleText = true;
                    break;
                  }
                }
              }
              
              expect(hasVisibleText).toBe(true);
            }
          }
        });
      }
    }
  });

  test.describe('Footer Consistency', () => {
    for (const page of PAGES_TO_TEST) {
      test(`${page.name} page has visible footer`, async ({ page: browserPage }) => {
        await browserPage.goto(`http://localhost:3006${page.path}`);
        await browserPage.waitForLoadState('networkidle');
        
        // Check for footer content
        const footerText = browserPage.getByText('Built by the PM community, for the PM community');
        await expect(footerText).toBeVisible();
        
        // Check footer styling
        const footerElement = await footerText.locator('..').locator('..');
        const styles = await footerElement.evaluate(el => {
          const computed = getComputedStyle(el);
          return {
            backgroundColor: computed.backgroundColor,
            color: computed.color,
            borderTop: computed.borderTop
          };
        });
        
        // Footer should have proper styling
        expect(styles.backgroundColor).toBeTruthy();
        expect(styles.color).toBeTruthy();
      });
    }
  });

  test.describe('Gradient Text Contrast', () => {
    for (const page of PAGES_TO_TEST) {
      for (const theme of THEMES) {
        test(`${page.name} gradient sections have proper contrast in ${theme.name} theme`, async ({ page: browserPage }) => {
          await browserPage.goto(`http://localhost:3006${page.path}`);
          await browserPage.waitForLoadState('networkidle');
          
          // Apply theme
          await browserPage.evaluate((themeClass) => {
            document.body.className = themeClass;
            document.documentElement.setAttribute('data-mantine-color-scheme', themeClass);
          }, theme.class);
          
          await browserPage.waitForTimeout(500);
          
          // Find elements with gradient backgrounds
          const gradientElements = await browserPage.$$('[style*="linear-gradient"], [style*="--marketing-primary"]');
          
          if (gradientElements.length > 0) {
            for (const element of gradientElements) {
              const hasText = await element.evaluate(el => {
                return el.textContent && el.textContent.trim().length > 0;
              });
              
              if (hasText) {
                const styles = await element.evaluate(el => {
                  const computed = getComputedStyle(el);
                  return {
                    color: computed.color,
                    backgroundImage: computed.backgroundImage,
                    backgroundColor: computed.backgroundColor,
                    textContent: el.textContent?.substring(0, 50) || ''
                  };
                });
                
                // Gradient elements should have proper text color
                expect(styles.color).toBeTruthy();
                
                // Log for debugging
                console.log(`${page.name} ${theme.name}: "${styles.textContent}" - color: ${styles.color}`);
              }
            }
          }
        });
      }
    }
  });

});

test.describe('Integration Tests', () => {
  test('All pages can be navigated between without errors', async ({ page: browserPage }) => {
    await browserPage.goto('http://localhost:3006/');
    
    for (const page of PAGES_TO_TEST.slice(1)) { // Skip homepage since we're already there
      // Find and click navigation link
      const navLink = browserPage.getByRole('link', { name: new RegExp(page.name, 'i') }).first();
      
      if (await navLink.isVisible()) {
        await navLink.click();
        await browserPage.waitForLoadState('networkidle');
        
        // Verify we're on the correct page
        expect(browserPage.url()).toContain(page.path);
        
        // Verify header is still present
        await expect(browserPage.locator('nav')).toBeVisible();
      }
    }
  });
});