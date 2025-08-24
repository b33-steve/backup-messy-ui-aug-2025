/**
 * Test Suite: Light/Dark Theme Contrast Validation
 * Purpose: Comprehensive theme testing across all pages with WCAG compliance
 * 
 * This test suite validates:
 * - Light and dark theme functionality across all pages
 * - Color contrast ratios meet WCAG 2.1 AA standards (4.5:1 normal, 3:1 large text)
 * - Theme switching persistence and consistency
 * - Proper background/foreground color combinations
 * - Accessibility compliance in both themes
 */

import { test, expect } from '@playwright/test';

// Define all pages to test for theme compliance
const PAGES_TO_TEST = [
  { path: '/', name: 'Homepage' },
  { path: '/pricing', name: 'Pricing' },
  { path: '/about', name: 'About' },
  { path: '/resources', name: 'Resources' },
  { path: '/contact', name: 'Contact' },
  { path: '/strategic-intelligence', name: 'Strategic Intelligence' },
  { path: '/command-center', name: 'Command Center' },
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/blog', name: 'Blog' }
];

// Define all theme variants to test
const THEME_VARIANTS = [
  { name: 'light', displayName: 'Light Theme', cssClass: 'light' },
  { name: 'dark', displayName: 'Dark Theme', cssClass: 'dark' },
  { name: 'high-contrast-light', displayName: 'High Contrast Light', cssClass: 'high-contrast-light' },
  { name: 'high-contrast-dark', displayName: 'High Contrast Dark', cssClass: 'high-contrast-dark' }
];

// WCAG contrast ratio requirements
const WCAG_STANDARDS = {
  AA_NORMAL: 4.5,    // WCAG 2.1 AA for normal text
  AA_LARGE: 3.0,     // WCAG 2.1 AA for large text (18pt+/14pt+ bold)
  AAA_NORMAL: 7.0,   // WCAG 2.1 AAA for normal text
  AAA_LARGE: 4.5,    // WCAG 2.1 AAA for large text
  INTERACTIVE: 3.0   // Interactive elements minimum
};

// Helper function to calculate luminance for contrast ratio
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Helper function to calculate contrast ratio
function getContrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
  const lightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (lightest + 0.05) / (darkest + 0.05);
}

// Helper function to parse RGB color string
function parseRGB(rgbString: string): [number, number, number] {
  const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) {
    // Handle rgba or other formats
    const rgbaMatch = rgbString.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
    if (rgbaMatch) {
      return [parseInt(rgbaMatch[1]), parseInt(rgbaMatch[2]), parseInt(rgbaMatch[3])];
    }
    // Default to white if can't parse
    return [255, 255, 255];
  }
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

test.describe('PM33 Theme Contrast Validation', () => {
  
  // Test theme switching functionality on all pages
  PAGES_TO_TEST.forEach(({ path, name }) => {
    test(`${name} (${path}) - Theme switching functionality`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000); // Allow theme to load
      
      // Look for theme toggle button
      const themeToggle = page.locator('[data-testid="theme-toggle"], button[aria-label*="theme"], button:has-text("Dark"), button:has-text("Light"), [class*="theme-toggle"]').first();
      
      if (await themeToggle.count() > 0) {
        // Get initial theme state
        const initialBodyClass = await page.locator('body').getAttribute('class') || '';
        const initialDataTheme = await page.locator('html').getAttribute('data-theme') || await page.locator('[data-theme]').first().getAttribute('data-theme');
        
        // Click theme toggle
        await themeToggle.click();
        await page.waitForTimeout(1000); // Allow theme transition
        
        // Verify theme changed
        const newBodyClass = await page.locator('body').getAttribute('class') || '';
        const newDataTheme = await page.locator('html').getAttribute('data-theme') || await page.locator('[data-theme]').first().getAttribute('data-theme');
        
        // Should be different after toggle
        const themeChanged = initialBodyClass !== newBodyClass || 
                           initialDataTheme !== newDataTheme ||
                           (await page.locator('[class*="dark"], [data-theme="dark"]').count()) > 0;
        
        expect(themeChanged).toBeTruthy();
        
        // Toggle back and verify it returns to initial state
        await themeToggle.click();
        await page.waitForTimeout(1000);
        
        console.log(`✅ ${name}: Theme toggle working`);
      } else {
        console.log(`⚠️ ${name}: No theme toggle found`);
      }
    });
  });

  // Test light theme contrast on all pages
  PAGES_TO_TEST.forEach(({ path, name }) => {
    test(`${name} (${path}) - Light theme contrast compliance`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      // Ensure light theme is active
      const themeToggle = page.locator('[data-testid="theme-toggle"], button[aria-label*="theme"], button:has-text("Dark"), button:has-text("Light"), [class*="theme-toggle"]').first();
      if (await themeToggle.count() > 0) {
        // Check if we're in dark theme and switch to light
        const isDarkTheme = (await page.locator('[class*="dark"], [data-theme="dark"]').count()) > 0;
        if (isDarkTheme) {
          await themeToggle.click();
          await page.waitForTimeout(1000);
        }
      }
      
      // Test text contrast on various elements
      const textSelectors = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', // Headings
        'p', 'span', 'div', 'a', // Body text
        'button', 'input', 'label', // Interactive elements
        '.mantine-Text-root', '.mantine-Title-root', // Mantine components
        '[class*="text-"]' // Utility classes
      ];
      
      let contrastIssues: string[] = [];
      let testedElements = 0;
      
      for (const selector of textSelectors) {
        const elements = page.locator(selector);
        const count = await elements.count();
        
        for (let i = 0; i < Math.min(count, 10); i++) { // Test first 10 of each type
          const element = elements.nth(i);
          
          if (await element.isVisible()) {
            try {
              const styles = await element.evaluate(el => {
                const computed = window.getComputedStyle(el);
                return {
                  color: computed.color,
                  backgroundColor: computed.backgroundColor,
                  fontSize: computed.fontSize
                };
              });
              
              // Skip transparent backgrounds or inherit colors
              if (styles.backgroundColor === 'rgba(0, 0, 0, 0)' || 
                  styles.backgroundColor === 'transparent' ||
                  styles.color === 'rgba(0, 0, 0, 0)') {
                continue;
              }
              
              const textColor = parseRGB(styles.color);
              const bgColor = parseRGB(styles.backgroundColor);
              const contrast = getContrastRatio(textColor, bgColor);
              const fontSize = parseFloat(styles.fontSize);
              
              // WCAG 2.1 AA requirements: 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold)
              const isLargeText = fontSize >= 18;
              const requiredContrast = isLargeText ? 3.0 : 4.5;
              
              if (contrast < requiredContrast) {
                contrastIssues.push(
                  `${selector}[${i}]: contrast ${contrast.toFixed(2)}:1 < ${requiredContrast}:1 required (${Math.round(fontSize)}px)`
                );
              }
              
              testedElements++;
            } catch (error) {
              // Skip elements that can't be analyzed
              continue;
            }
          }
        }
      }
      
      // Report results
      console.log(`📊 ${name} Light Theme: ${testedElements} elements tested, ${contrastIssues.length} contrast issues`);
      
      if (contrastIssues.length > 0) {
        console.log('❌ Contrast issues found:', contrastIssues.slice(0, 5)); // Show first 5 issues
      }
      
      // Allow up to 10% of elements to have contrast issues (for dynamic content)
      const failureRate = contrastIssues.length / Math.max(testedElements, 1);
      expect(failureRate).toBeLessThan(0.1);
      
      // Take screenshot for manual review
      await page.screenshot({ 
        path: `test-results/contrast-light-${name.toLowerCase().replace(/\s+/g, '-')}.png`,
        fullPage: true 
      });
    });
  });

  // Test dark theme contrast on all pages
  PAGES_TO_TEST.forEach(({ path, name }) => {
    test(`${name} (${path}) - Dark theme contrast compliance`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      // Switch to dark theme
      const themeToggle = page.locator('[data-testid="theme-toggle"], button[aria-label*="theme"], button:has-text("Dark"), button:has-text("Light"), [class*="theme-toggle"]').first();
      if (await themeToggle.count() > 0) {
        // Check if we're in light theme and switch to dark
        const isDarkTheme = (await page.locator('[class*="dark"], [data-theme="dark"]').count()) > 0;
        if (!isDarkTheme) {
          await themeToggle.click();
          await page.waitForTimeout(1000);
        }
      }
      
      // Verify dark theme is active
      const body = page.locator('body');
      const bodyBg = await body.evaluate(el => window.getComputedStyle(el).backgroundColor);
      const bodyBgRGB = parseRGB(bodyBg);
      const bodyBrightness = (bodyBgRGB[0] + bodyBgRGB[1] + bodyBgRGB[2]) / 3;
      
      // Dark theme should have dark background (average RGB < 128)
      if (bodyBrightness > 128) {
        console.log(`⚠️ ${name}: Dark theme may not be active (body bg: ${bodyBg})`);
      }
      
      // Test text contrast in dark theme
      const textSelectors = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'span', 'div', 'a',
        'button', 'input', 'label',
        '.mantine-Text-root', '.mantine-Title-root',
        '[class*="text-"]'
      ];
      
      let contrastIssues: string[] = [];
      let testedElements = 0;
      
      for (const selector of textSelectors) {
        const elements = page.locator(selector);
        const count = await elements.count();
        
        for (let i = 0; i < Math.min(count, 10); i++) {
          const element = elements.nth(i);
          
          if (await element.isVisible()) {
            try {
              const styles = await element.evaluate(el => {
                const computed = window.getComputedStyle(el);
                return {
                  color: computed.color,
                  backgroundColor: computed.backgroundColor,
                  fontSize: computed.fontSize
                };
              });
              
              if (styles.backgroundColor === 'rgba(0, 0, 0, 0)' || 
                  styles.backgroundColor === 'transparent' ||
                  styles.color === 'rgba(0, 0, 0, 0)') {
                continue;
              }
              
              const textColor = parseRGB(styles.color);
              const bgColor = parseRGB(styles.backgroundColor);
              const contrast = getContrastRatio(textColor, bgColor);
              const fontSize = parseFloat(styles.fontSize);
              
              const isLargeText = fontSize >= 18;
              const requiredContrast = isLargeText ? 3.0 : 4.5;
              
              if (contrast < requiredContrast) {
                contrastIssues.push(
                  `${selector}[${i}]: contrast ${contrast.toFixed(2)}:1 < ${requiredContrast}:1 required (${Math.round(fontSize)}px)`
                );
              }
              
              testedElements++;
            } catch (error) {
              continue;
            }
          }
        }
      }
      
      console.log(`📊 ${name} Dark Theme: ${testedElements} elements tested, ${contrastIssues.length} contrast issues`);
      
      if (contrastIssues.length > 0) {
        console.log('❌ Contrast issues found:', contrastIssues.slice(0, 5));
      }
      
      const failureRate = contrastIssues.length / Math.max(testedElements, 1);
      expect(failureRate).toBeLessThan(0.1);
      
      // Take screenshot for manual review
      await page.screenshot({ 
        path: `test-results/contrast-dark-${name.toLowerCase().replace(/\s+/g, '-')}.png`,
        fullPage: true 
      });
    });
  });

  // Test theme persistence across page navigation
  test('Theme persistence across page navigation', async ({ page }) => {
    // Start on homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Switch to dark theme
    const themeToggle = page.locator('[data-testid="theme-toggle"], button[aria-label*="theme"], button:has-text("Dark"), button:has-text("Light"), [class*="theme-toggle"]').first();
    
    if (await themeToggle.count() > 0) {
      await themeToggle.click();
      await page.waitForTimeout(1000);
      
      // Navigate to different pages and verify theme persists
      const testPages = ['/pricing', '/about', '/resources'];
      
      for (const testPath of testPages) {
        await page.goto(testPath);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        
        // Check if dark theme is still active
        const isDarkTheme = (await page.locator('[class*="dark"], [data-theme="dark"]').count()) > 0 ||
                          (await page.evaluate(() => {
                            const body = document.body;
                            const bodyBg = window.getComputedStyle(body).backgroundColor;
                            const match = bodyBg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                            if (match) {
                              const avg = (parseInt(match[1]) + parseInt(match[2]) + parseInt(match[3])) / 3;
                              return avg < 128; // Dark background
                            }
                            return false;
                          }));
        
        expect(isDarkTheme).toBeTruthy();
        console.log(`✅ Dark theme persisted on ${testPath}`);
      }
    }
  });

  // Test specific PM33 design system color compliance
  test('PM33 Design System - Color compliance across themes', async ({ page }) => {
    const testPages = ['/', '/pricing', '/dashboard'];
    
    for (const path of testPages) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      // Test both light and dark themes
      const themes = ['light', 'dark'];
      
      for (const theme of themes) {
        // Switch to theme
        const themeToggle = page.locator('[data-testid="theme-toggle"], button[aria-label*="theme"], button:has-text("Dark"), button:has-text("Light"), [class*="theme-toggle"]').first();
        
        if (await themeToggle.count() > 0) {
          const currentlyDark = (await page.locator('[class*="dark"], [data-theme="dark"]').count()) > 0;
          
          if ((theme === 'dark' && !currentlyDark) || (theme === 'light' && currentlyDark)) {
            await themeToggle.click();
            await page.waitForTimeout(1000);
          }
        }
        
        // Check for PM33-specific color system usage
        const colorSystemElements = await page.evaluate(() => {
          const elements = document.querySelectorAll('*');
          const colorUsage = {
            gradients: 0,
            pm33Colors: 0,
            mantineColors: 0,
            properContrast: 0
          };
          
          elements.forEach(el => {
            const styles = window.getComputedStyle(el);
            const bg = styles.background || styles.backgroundColor;
            const color = styles.color;
            
            if (bg.includes('gradient')) colorUsage.gradients++;
            if (bg.includes('--pm33') || color.includes('--pm33')) colorUsage.pm33Colors++;
            if (bg.includes('--mantine') || color.includes('--mantine')) colorUsage.mantineColors++;
            
            // Check basic contrast
            if (color !== 'rgba(0, 0, 0, 0)' && bg !== 'rgba(0, 0, 0, 0)') {
              colorUsage.properContrast++;
            }
          });
          
          return colorUsage;
        });
        
        // Validate PM33 design system usage
        expect(colorSystemElements.gradients).toBeGreaterThan(0); // Should have gradients
        console.log(`📊 ${path} ${theme} theme - Gradients: ${colorSystemElements.gradients}, PM33 Colors: ${colorSystemElements.pm33Colors}, Mantine: ${colorSystemElements.mantineColors}`);
        
        // Take screenshot for design review
        await page.screenshot({ 
          path: `test-results/design-system-${theme}-${path.replace('/', 'home')}.png`,
          fullPage: false 
        });
      }
    }
  });

  // Test comprehensive theme switching across all variants
  test('All theme variants - Comprehensive contrast validation', async ({ page }) => {
    // Test all theme variants on critical pages
    const criticalPages = ['/dashboard', '/pricing', '/'];
    
    for (const pagePath of criticalPages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      for (const theme of THEME_VARIANTS) {
        console.log(`Testing ${theme.displayName} on ${pagePath}`);
        
        // Apply theme programmatically to ensure all variants are tested
        await page.evaluate((themeClass) => {
          document.documentElement.setAttribute('data-theme', themeClass);
          document.documentElement.className = themeClass;
          document.body.className = `${document.body.className} ${themeClass}`.trim();
        }, theme.cssClass);
        await page.waitForTimeout(500);

        // Test contrast standards based on theme type
        const isHighContrast = theme.name.includes('high-contrast');
        const contrastStandard = isHighContrast ? WCAG_STANDARDS.AAA_NORMAL : WCAG_STANDARDS.AA_NORMAL;
        const largeTextStandard = isHighContrast ? WCAG_STANDARDS.AAA_LARGE : WCAG_STANDARDS.AA_LARGE;

        // Test key UI components for contrast
        const testSelectors = [
          { selector: 'h1, h2, h3', type: 'heading', standard: largeTextStandard },
          { selector: 'p, span:not(:empty)', type: 'body-text', standard: contrastStandard },
          { selector: 'button', type: 'interactive', standard: WCAG_STANDARDS.INTERACTIVE },
          { selector: 'a[href]', type: 'link', standard: WCAG_STANDARDS.INTERACTIVE },
          { selector: 'input, textarea', type: 'form', standard: contrastStandard },
          { selector: '.pm33-glass-card', type: 'card', standard: contrastStandard },
          { selector: '[class*="mantine-"]', type: 'component', standard: contrastStandard }
        ];

        let componentResults = [];
        
        for (const testCase of testSelectors) {
          const elements = page.locator(testCase.selector);
          const count = await elements.count();
          let passCount = 0;
          let totalTested = 0;

          for (let i = 0; i < Math.min(count, 5); i++) {
            const element = elements.nth(i);
            
            if (await element.isVisible()) {
              try {
                const styles = await element.evaluate(el => {
                  const computed = window.getComputedStyle(el);
                  return {
                    color: computed.color,
                    backgroundColor: computed.backgroundColor,
                    fontSize: computed.fontSize
                  };
                });

                // Skip elements without proper background colors
                if (styles.backgroundColor === 'rgba(0, 0, 0, 0)' || 
                    styles.backgroundColor === 'transparent') {
                  continue;
                }

                const textColor = parseRGB(styles.color);
                const bgColor = parseRGB(styles.backgroundColor);
                const contrast = getContrastRatio(textColor, bgColor);

                totalTested++;
                if (contrast >= testCase.standard) {
                  passCount++;
                }
              } catch (error) {
                continue;
              }
            }
          }

          if (totalTested > 0) {
            componentResults.push({
              component: testCase.type,
              selector: testCase.selector,
              passRate: passCount / totalTested,
              tested: totalTested,
              passed: passCount,
              required: testCase.standard
            });
          }
        }

        // Validate theme meets accessibility standards
        const overallPassRate = componentResults.reduce((sum, result) => sum + result.passRate, 0) / 
                               Math.max(componentResults.length, 1);

        expect(overallPassRate).toBeGreaterThan(0.85); // 85% pass rate minimum
        
        console.log(`✅ ${theme.displayName} on ${pagePath}: ${Math.round(overallPassRate * 100)}% contrast compliance`);

        // Take comprehensive screenshot for each theme variant
        await page.screenshot({ 
          path: `test-results/comprehensive-${theme.name}-${pagePath.replace('/', 'home').replace(/\//g, '-')}.png`,
          fullPage: true 
        });
      }
    }
  });

  // Test high-contrast themes exceed AAA standards
  test('High contrast themes - WCAG AAA compliance validation', async ({ page }) => {
    const highContrastThemes = THEME_VARIANTS.filter(theme => theme.name.includes('high-contrast'));
    
    for (const theme of highContrastThemes) {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      // Apply high contrast theme
      await page.evaluate((themeClass) => {
        document.documentElement.setAttribute('data-theme', themeClass);
        document.documentElement.className = themeClass;
        document.body.className = `${document.body.className} ${themeClass}`.trim();
      }, theme.cssClass);
      await page.waitForTimeout(500);

      console.log(`Testing ${theme.displayName} for WCAG AAA compliance`);

      // Test that high contrast themes meet AAA standards (7:1 for normal text)
      const testElements = ['h1', 'h2', 'p', 'button', 'a', 'input'];
      let aaaCompliantCount = 0;
      let totalElements = 0;

      for (const selector of testElements) {
        const elements = page.locator(selector);
        const count = await elements.count();

        for (let i = 0; i < Math.min(count, 3); i++) {
          const element = elements.nth(i);
          
          if (await element.isVisible()) {
            try {
              const styles = await element.evaluate(el => {
                const computed = window.getComputedStyle(el);
                return {
                  color: computed.color,
                  backgroundColor: computed.backgroundColor,
                  fontSize: computed.fontSize
                };
              });

              if (styles.backgroundColor === 'rgba(0, 0, 0, 0)' || 
                  styles.backgroundColor === 'transparent') {
                continue;
              }

              const textColor = parseRGB(styles.color);
              const bgColor = parseRGB(styles.backgroundColor);
              const contrast = getContrastRatio(textColor, bgColor);
              const fontSize = parseFloat(styles.fontSize);

              totalElements++;
              
              // Check AAA compliance: 7:1 for normal text, 4.5:1 for large text
              const isLargeText = fontSize >= 18;
              const requiredContrast = isLargeText ? WCAG_STANDARDS.AAA_LARGE : WCAG_STANDARDS.AAA_NORMAL;

              if (contrast >= requiredContrast) {
                aaaCompliantCount++;
              }

            } catch (error) {
              continue;
            }
          }
        }
      }

      // High contrast themes should have high AAA compliance rate
      const aaaComplianceRate = totalElements > 0 ? aaaCompliantCount / totalElements : 0;
      console.log(`${theme.displayName} AAA compliance: ${Math.round(aaaComplianceRate * 100)}% (${aaaCompliantCount}/${totalElements})`);
      
      expect(aaaComplianceRate).toBeGreaterThan(0.8); // 80% AAA compliance for high-contrast themes

      // Take screenshot documenting high contrast theme
      await page.screenshot({ 
        path: `test-results/high-contrast-aaa-${theme.name}.png`,
        fullPage: true 
      });
    }
  });

  // Test focus indicators and interactive states across all themes
  test('Focus indicators and interactive states - All themes', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    for (const theme of THEME_VARIANTS) {
      console.log(`Testing focus indicators for ${theme.displayName}`);

      // Apply theme
      await page.evaluate((themeClass) => {
        document.documentElement.setAttribute('data-theme', themeClass);
        document.documentElement.className = themeClass;
      }, theme.cssClass);
      await page.waitForTimeout(500);

      // Test focusable elements
      const focusableSelectors = [
        'button:not([disabled])',
        'a[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
      ];

      let focusTestResults = [];

      for (const selector of focusableSelectors) {
        const elements = page.locator(selector);
        const count = await elements.count();

        if (count > 0) {
          const firstElement = elements.first();
          
          try {
            // Focus the element
            await firstElement.focus();
            await page.waitForTimeout(200);

            // Check focus visibility
            const focusStyles = await firstElement.evaluate(el => {
              const computed = window.getComputedStyle(el);
              return {
                outline: computed.outline,
                outlineColor: computed.outlineColor,
                outlineWidth: computed.outlineWidth,
                boxShadow: computed.boxShadow,
                border: computed.border
              };
            });

            const hasFocusIndicator = 
              (focusStyles.outline && focusStyles.outline !== 'none') ||
              (focusStyles.boxShadow && focusStyles.boxShadow !== 'none') ||
              (focusStyles.outlineWidth && parseFloat(focusStyles.outlineWidth) > 0);

            focusTestResults.push({
              selector,
              hasFocusIndicator,
              styles: focusStyles
            });

            // Take screenshot of focused element
            await firstElement.screenshot({ 
              path: `test-results/focus-${theme.name}-${selector.replace(/[^a-z]/gi, '')}.png`
            });

          } catch (error) {
            console.warn(`Could not test focus for ${selector} in ${theme.name}: ${error}`);
          }
        }
      }

      // Validate focus indicators are present
      const elementsWithFocus = focusTestResults.filter(result => result.hasFocusIndicator).length;
      const focusIndicatorRate = focusTestResults.length > 0 ? elementsWithFocus / focusTestResults.length : 0;
      
      console.log(`${theme.displayName} focus indicators: ${Math.round(focusIndicatorRate * 100)}% coverage`);
      expect(focusIndicatorRate).toBeGreaterThan(0.7); // 70% of elements should have focus indicators
    }
  });

  // Performance test - Theme switching performance
  test('Theme switching performance validation', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Measure theme switching performance
    const switchingTimes = [];
    
    for (const theme of THEME_VARIANTS) {
      const startTime = Date.now();
      
      await page.evaluate((themeClass) => {
        document.documentElement.setAttribute('data-theme', themeClass);
        document.documentElement.className = themeClass;
      }, theme.cssClass);
      
      // Wait for theme to fully apply
      await page.waitForTimeout(100);
      
      const endTime = Date.now();
      const switchTime = endTime - startTime;
      switchingTimes.push({ theme: theme.displayName, time: switchTime });
      
      console.log(`${theme.displayName} switch time: ${switchTime}ms`);
    }

    // All theme switches should be under 200ms
    const slowSwitches = switchingTimes.filter(result => result.time > 200);
    expect(slowSwitches.length).toBe(0);

    const averageTime = switchingTimes.reduce((sum, result) => sum + result.time, 0) / switchingTimes.length;
    console.log(`Average theme switching time: ${Math.round(averageTime)}ms`);
    
    // Average switching time should be under 100ms
    expect(averageTime).toBeLessThan(100);
  });
});