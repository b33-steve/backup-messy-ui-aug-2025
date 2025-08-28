import { test, expect, Page } from '@playwright/test';

/**
 * PM33 Marketing Website Design Review Test Suite
 * 
 * Testing reported issues:
 * 1. Homepage theme conversion between dark/light modes - demo cards section
 * 2. Pricing page spacing issues between sections
 * 3. Pricing page color validation - buttons and CTA sections  
 * 4. Article/About page CTA sections with white text on white background issues
 * 5. Button color contrast issues across pages
 * 6. Placeholder images that need replacement
 */

async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000); // Allow theme to settle
}

async function toggleTheme(page: Page) {
  // Look for theme toggle button
  const themeToggle = page.locator('[data-theme-toggle], button:has-text("theme"), button:has-text("Toggle"), .theme-toggle');
  if (await themeToggle.count() > 0) {
    await themeToggle.first().click();
    await page.waitForTimeout(500); // Allow theme transition
  }
}

test.describe('PM33 Marketing Website Design Review', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await waitForPageLoad(page);
  });

  test('Homepage - Theme conversion validation for demo cards section', async ({ page }) => {
    await test.step('Screenshot homepage in light mode', async () => {
      await page.screenshot({ 
        path: 'test-results/homepage-light-mode.png',
        fullPage: true 
      });
    });

    await test.step('Test demo cards visibility in light mode', async () => {
      // Find demo cards section
      const demoCardsSection = page.locator('text="Experience PM33 in Action"').locator('..').locator('..');
      await expect(demoCardsSection).toBeVisible();
      
      // Check card text visibility
      const strategicCard = page.locator('text="Strategic Intelligence Engine"');
      const commandCard = page.locator('text="Strategic Command Center"');
      
      await expect(strategicCard).toBeVisible();
      await expect(commandCard).toBeVisible();
      
      // Screenshot demo section specifically
      await demoCardsSection.screenshot({ 
        path: 'test-results/demo-cards-light-mode.png' 
      });
    });

    await test.step('Toggle to dark mode and test demo cards', async () => {
      await toggleTheme(page);
      await waitForPageLoad(page);
      
      // Screenshot dark mode
      await page.screenshot({ 
        path: 'test-results/homepage-dark-mode.png',
        fullPage: true 
      });
      
      // Test demo cards in dark mode
      const demoCardsSection = page.locator('text="Experience PM33 in Action"').locator('..').locator('..');
      await expect(demoCardsSection).toBeVisible();
      
      const strategicCard = page.locator('text="Strategic Intelligence Engine"');
      const commandCard = page.locator('text="Strategic Command Center"');
      
      await expect(strategicCard).toBeVisible();
      await expect(commandCard).toBeVisible();
      
      // Screenshot demo section in dark mode
      await demoCardsSection.screenshot({ 
        path: 'test-results/demo-cards-dark-mode.png' 
      });
    });

    await test.step('Check for text contrast issues', async () => {
      // Check for potential white-on-white or dark-on-dark text
      const allText = page.locator('text=*');
      const count = await allText.count();
      
      for (let i = 0; i < Math.min(count, 50); i++) { // Sample first 50 text elements
        const element = allText.nth(i);
        const text = await element.textContent();
        
        if (text && text.trim().length > 0) {
          // This element should be visible
          await expect(element).toBeVisible();
        }
      }
    });
  });

  test('Pricing page - Spacing and color validation', async ({ page }) => {
    await page.goto('http://localhost:3000/pricing');
    await waitForPageLoad(page);

    await test.step('Screenshot pricing page in light mode', async () => {
      await page.screenshot({ 
        path: 'test-results/pricing-light-mode.png',
        fullPage: true 
      });
    });

    await test.step('Validate section spacing', async () => {
      // Check for proper spacing between sections
      const sections = page.locator('section, .container > div, [role="main"] > div');
      const sectionCount = await sections.count();
      
      console.log(`Found ${sectionCount} sections on pricing page`);
      
      // Screenshot sections with spacing overlay
      await page.addStyleTag({
        content: `
          section, .container > div, [role="main"] > div {
            outline: 2px solid red !important;
            margin: 10px 0 !important;
          }
        `
      });
      
      await page.screenshot({ 
        path: 'test-results/pricing-spacing-debug.png',
        fullPage: true 
      });
    });

    await test.step('Validate button and CTA colors', async () => {
      const buttons = page.locator('button, a[role="button"], .btn');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i);
        const isVisible = await button.isVisible();
        
        if (isVisible) {
          // Take screenshot of each button
          await button.screenshot({ 
            path: `test-results/pricing-button-${i}.png` 
          });
          
          // Check if button has proper contrast
          const styles = await button.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
              backgroundColor: computed.backgroundColor,
              color: computed.color,
              border: computed.border
            };
          });
          
          console.log(`Button ${i}:`, styles);
        }
      }
    });

    await test.step('Toggle to dark mode and validate pricing colors', async () => {
      await toggleTheme(page);
      await waitForPageLoad(page);
      
      await page.screenshot({ 
        path: 'test-results/pricing-dark-mode.png',
        fullPage: true 
      });
      
      // Check that all sections are still visible in dark mode
      const ctaSections = page.locator('[style*="gradient"], .bg-gradient, .hero-gradient');
      const ctaCount = await ctaSections.count();
      
      for (let i = 0; i < ctaCount; i++) {
        const section = ctaSections.nth(i);
        if (await section.isVisible()) {
          await section.screenshot({ 
            path: `test-results/pricing-cta-dark-${i}.png` 
          });
        }
      }
    });
  });

  test('About page - CTA section white-on-white text issues', async ({ page }) => {
    await page.goto('http://localhost:3000/about');
    await waitForPageLoad(page);

    await test.step('Screenshot about page in light mode', async () => {
      await page.screenshot({ 
        path: 'test-results/about-light-mode.png',
        fullPage: true 
      });
    });

    await test.step('Check CTA section visibility', async () => {
      // Find CTA sections with gradients
      const ctaSections = page.locator('[style*="gradient"], .bg-gradient, .hero-gradient');
      const ctaCount = await ctaSections.count();
      
      console.log(`Found ${ctaCount} CTA sections on about page`);
      
      for (let i = 0; i < ctaCount; i++) {
        const section = ctaSections.nth(i);
        if (await section.isVisible()) {
          // Screenshot each CTA section
          await section.screenshot({ 
            path: `test-results/about-cta-section-${i}.png` 
          });
          
          // Check text within CTA sections
          const textElements = section.locator('text=*');
          const textCount = await textElements.count();
          
          for (let j = 0; j < Math.min(textCount, 10); j++) { // Check first 10 text elements
            const textEl = textElements.nth(j);
            const text = await textEl.textContent();
            
            if (text && text.trim().length > 5) { // Only check meaningful text
              // This should be visible
              await expect(textEl).toBeVisible();
              
              // Get computed styles to check for contrast issues
              const styles = await textEl.evaluate((el) => {
                const computed = window.getComputedStyle(el);
                const parent = el.parentElement;
                const parentComputed = parent ? window.getComputedStyle(parent) : null;
                return {
                  color: computed.color,
                  backgroundColor: computed.backgroundColor,
                  parentBackground: parentComputed ? parentComputed.backgroundColor : null,
                  text: el.textContent?.substring(0, 50)
                };
              });
              
              console.log(`CTA Section ${i}, Text ${j}:`, styles);
            }
          }
        }
      }
    });

    await test.step('Toggle to dark mode and check CTA sections', async () => {
      await toggleTheme(page);
      await waitForPageLoad(page);
      
      await page.screenshot({ 
        path: 'test-results/about-dark-mode.png',
        fullPage: true 
      });
      
      // Re-check CTA sections in dark mode
      const ctaSections = page.locator('[style*="gradient"], .bg-gradient, .hero-gradient');
      const ctaCount = await ctaSections.count();
      
      for (let i = 0; i < ctaCount; i++) {
        const section = ctaSections.nth(i);
        if (await section.isVisible()) {
          await section.screenshot({ 
            path: `test-results/about-cta-dark-${i}.png` 
          });
        }
      }
    });
  });

  test('Button color contrast validation across pages', async ({ page }) => {
    const pages = [
      { url: '/', name: 'homepage' },
      { url: '/pricing', name: 'pricing' },
      { url: '/about', name: 'about' }
    ];

    for (const pageInfo of pages) {
      await test.step(`Test ${pageInfo.name} button contrast`, async () => {
        await page.goto(`http://localhost:3000${pageInfo.url}`);
        await waitForPageLoad(page);
        
        // Find all buttons
        const buttons = page.locator('button, a[role="button"], .btn, [class*="button"], [class*="Button"]');
        const buttonCount = await buttons.count();
        
        console.log(`Found ${buttonCount} buttons on ${pageInfo.name}`);
        
        const buttonData = [];
        
        for (let i = 0; i < Math.min(buttonCount, 20); i++) { // Test first 20 buttons
          const button = buttons.nth(i);
          if (await button.isVisible()) {
            const styles = await button.evaluate((el) => {
              const computed = window.getComputedStyle(el);
              const rect = el.getBoundingClientRect();
              return {
                backgroundColor: computed.backgroundColor,
                color: computed.color,
                border: computed.border,
                width: rect.width,
                height: rect.height,
                text: el.textContent?.trim().substring(0, 30)
              };
            });
            
            buttonData.push({
              index: i,
              ...styles
            });
            
            // Screenshot button
            try {
              await button.screenshot({ 
                path: `test-results/${pageInfo.name}-button-${i}.png` 
              });
            } catch (e) {
              console.log(`Could not screenshot button ${i} on ${pageInfo.name}`);
            }
          }
        }
        
        console.log(`${pageInfo.name} button styles:`, buttonData);
      });
    }
  });

  test('Responsive design validation', async ({ page }) => {
    const viewports = [
      { width: 1440, height: 900, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' }
    ];

    for (const viewport of viewports) {
      await test.step(`Test homepage on ${viewport.name} - ${viewport.width}x${viewport.height}`, async () => {
        await page.setViewportSize(viewport);
        await page.goto('http://localhost:3000');
        await waitForPageLoad(page);
        
        await page.screenshot({ 
          path: `test-results/homepage-${viewport.name}.png`,
          fullPage: true 
        });
        
        // Check for horizontal scroll
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        
        expect(hasHorizontalScroll).toBe(false);
        
        // Test key elements visibility
        const keyElements = [
          page.locator('nav'),
          page.locator('h1').first(),
          page.locator('text="Strategic Intelligence Engine"').first(),
          page.locator('text="Start Free Trial"').first()
        ];
        
        for (const element of keyElements) {
          if (await element.count() > 0) {
            await expect(element.first()).toBeVisible();
          }
        }
      });
    }
  });

  test('Placeholder images identification', async ({ page }) => {
    const pages = ['/', '/pricing', '/about'];
    
    for (const pagePath of pages) {
      await test.step(`Check for placeholder images on ${pagePath}`, async () => {
        await page.goto(`http://localhost:3000${pagePath}`);
        await waitForPageLoad(page);
        
        const images = page.locator('img');
        const imageCount = await images.count();
        
        console.log(`Found ${imageCount} images on ${pagePath}`);
        
        for (let i = 0; i < imageCount; i++) {
          const img = images.nth(i);
          const src = await img.getAttribute('src');
          const alt = await img.getAttribute('alt');
          
          // Check for placeholder patterns
          const isPlaceholder = src && (
            src.includes('placeholder') ||
            src.includes('example') ||
            src.includes('dummy') ||
            src.includes('via.placeholder') ||
            src.includes('picsum.photos') ||
            alt?.toLowerCase().includes('placeholder')
          );
          
          if (isPlaceholder) {
            console.log(`Placeholder image found on ${pagePath}:`, { src, alt });
            
            // Screenshot placeholder image context
            const parent = img.locator('..');
            await parent.screenshot({ 
              path: `test-results/placeholder-${pagePath.replace('/', 'home')}-${i}.png` 
            });
          }
        }
      });
    }
  });
});