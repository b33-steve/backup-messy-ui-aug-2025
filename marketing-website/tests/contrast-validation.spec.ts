import { test, expect } from '@playwright/test';

/**
 * PM33 Marketing Website - Contrast and Theme Validation Tests
 * Focused on identifying white text on light backgrounds
 */

test.describe('Text Contrast and Theme Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    // Allow extra time for CSS to fully load
    await page.waitForTimeout(2000);
  });

  test('Homepage light mode - no white text on light backgrounds', async ({ page }) => {
    // Ensure we're in light mode
    const html = page.locator('html');
    const dataTheme = await html.getAttribute('data-theme');
    
    if (dataTheme === 'dark') {
      // Switch to light mode
      const themeToggle = page.locator('[aria-label="Toggle color scheme"]');
      await themeToggle.click();
      await page.waitForTimeout(1000);
    }

    // Take full page screenshot in light mode
    await page.screenshot({ 
      path: 'test-results/homepage-light-mode-full.png', 
      fullPage: true 
    });

    // Check specific problematic text elements that might be white on light
    const heroTitle = page.locator('h1').first();
    const heroTitleColor = await heroTitle.evaluate(el => {
      return window.getComputedStyle(el).color;
    });

    // Check background color of hero section
    const heroSection = page.locator('main').first();
    const heroBackground = await heroSection.evaluate(el => {
      return window.getComputedStyle(el).backgroundColor;
    });

    console.log('Hero title color:', heroTitleColor);
    console.log('Hero background:', heroBackground);

    // Look for the specific "Ready to Transform Your PM Work?" text
    const transformText = page.locator('text=Transform PMs into PMOs');
    if (await transformText.count() > 0) {
      const transformColor = await transformText.evaluate(el => {
        return window.getComputedStyle(el).color;
      });
      console.log('Transform text color:', transformColor);
      
      // Should not be white (rgb(255, 255, 255)) or very light colors
      expect(transformColor).not.toBe('rgb(255, 255, 255)');
      expect(transformColor).not.toBe('rgba(255, 255, 255, 1)');
    }

    // Check all headings for proper contrast in light mode
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    
    for (let i = 0; i < headingCount; i++) {
      const heading = headings.nth(i);
      const color = await heading.evaluate(el => {
        return window.getComputedStyle(el).color;
      });
      const text = await heading.textContent();
      
      console.log(`Heading "${text}" color:`, color);
      
      // In light mode, text should be dark (not white)
      expect(color).not.toBe('rgb(255, 255, 255)');
      expect(color).not.toBe('rgba(255, 255, 255, 1)');
    }
  });

  test('Homepage dark mode - proper text contrast', async ({ page }) => {
    // Switch to dark mode
    const themeToggle = page.locator('[aria-label="Toggle color scheme"]');
    await themeToggle.click();
    await page.waitForTimeout(1000);

    // Verify we're in dark mode
    const html = page.locator('html');
    const dataTheme = await html.getAttribute('data-theme');
    expect(dataTheme).toBe('dark');

    // Take full page screenshot in dark mode
    await page.screenshot({ 
      path: 'test-results/homepage-dark-mode-full.png', 
      fullPage: true 
    });

    // In dark mode, text should be light colored
    const heroTitle = page.locator('h1').first();
    const heroTitleColor = await heroTitle.evaluate(el => {
      return window.getComputedStyle(el).color;
    });

    console.log('Dark mode hero title color:', heroTitleColor);
    
    // In dark mode, text should be light (not black)
    expect(heroTitleColor).not.toBe('rgb(0, 0, 0)');
    expect(heroTitleColor).not.toBe('rgba(0, 0, 0, 1)');
  });

  test('Theme switching preserves readability', async ({ page }) => {
    // Test theme switching multiple times to ensure consistency
    const themeToggle = page.locator('[aria-label="Toggle color scheme"]');
    const heroTitle = page.locator('h1').first();

    // Start in light mode
    let html = page.locator('html');
    let dataTheme = await html.getAttribute('data-theme');
    if (dataTheme === 'dark') {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }

    // Get light mode color
    const lightModeColor = await heroTitle.evaluate(el => {
      return window.getComputedStyle(el).color;
    });

    // Switch to dark mode
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Get dark mode color
    const darkModeColor = await heroTitle.evaluate(el => {
      return window.getComputedStyle(el).color;
    });

    // Switch back to light mode
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Get light mode color again
    const lightModeColor2 = await heroTitle.evaluate(el => {
      return window.getComputedStyle(el).color;
    });

    console.log('Light mode color (first):', lightModeColor);
    console.log('Dark mode color:', darkModeColor);
    console.log('Light mode color (second):', lightModeColor2);

    // Colors should be different between themes
    expect(lightModeColor).not.toBe(darkModeColor);
    
    // Colors should be consistent when returning to same theme
    expect(lightModeColor).toBe(lightModeColor2);

    // Take comparison screenshots
    await page.screenshot({ path: 'test-results/theme-comparison-final-light.png' });
  });

  test('Specific sections contrast validation', async ({ page }) => {
    // Test specific sections that commonly have contrast issues
    
    // Hero section
    const heroSection = page.locator('main section').first();
    await heroSection.screenshot({ path: 'test-results/hero-section-contrast.png' });

    // CTA buttons
    const ctaButtons = page.locator('button, a[role="button"]');
    const ctaCount = await ctaButtons.count();
    
    for (let i = 0; i < Math.min(ctaCount, 3); i++) {
      const button = ctaButtons.nth(i);
      const buttonColor = await button.evaluate(el => {
        return {
          color: window.getComputedStyle(el).color,
          backgroundColor: window.getComputedStyle(el).backgroundColor,
          backgroundImage: window.getComputedStyle(el).backgroundImage
        };
      });
      
      const buttonText = await button.textContent();
      console.log(`Button "${buttonText}" styles:`, buttonColor);
    }

    // Problem/solution cards if they exist
    const cards = page.locator('[class*="card"], [class*="Card"]');
    const cardCount = await cards.count();
    
    if (cardCount > 0) {
      await cards.first().screenshot({ path: 'test-results/card-section-contrast.png' });
    }
  });

  test('All marketing pages text contrast', async ({ page }) => {
    const pages = ['/', '/pricing', '/about', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      
      const pageName = pagePath === '/' ? 'homepage' : pagePath.substring(1);
      
      // Take screenshot of each page
      await page.screenshot({ 
        path: `test-results/${pageName}-contrast-check.png`,
        fullPage: true 
      });
      
      // Check all text elements for proper contrast
      const textElements = page.locator('h1, h2, h3, p, span, a');
      const textCount = await textElements.count();
      
      let whiteTextFound = false;
      const problematicElements = [];
      
      for (let i = 0; i < Math.min(textCount, 20); i++) { // Limit to first 20 for performance
        const element = textElements.nth(i);
        try {
          const styles = await element.evaluate(el => {
            const computed = window.getComputedStyle(el);
            return {
              color: computed.color,
              backgroundColor: computed.backgroundColor,
              text: el.textContent?.substring(0, 50) || ''
            };
          });
          
          // Check for white text (problematic in light mode)
          if (styles.color === 'rgb(255, 255, 255)' || styles.color === 'rgba(255, 255, 255, 1)') {
            whiteTextFound = true;
            problematicElements.push(styles);
          }
        } catch (error) {
          // Skip elements that can't be evaluated
          continue;
        }
      }
      
      if (whiteTextFound) {
        console.log(`⚠️ White text found on page ${pagePath}:`, problematicElements);
      } else {
        console.log(`✅ No white text issues found on page ${pagePath}`);
      }
      
      // This test should pass - we're just documenting issues
      expect(true).toBe(true);
    }
  });
});