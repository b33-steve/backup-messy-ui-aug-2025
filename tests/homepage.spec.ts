import { test, expect, Page } from '@playwright/test';

test.describe('PM33 Homepage - Comprehensive Quality Testing', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display homepage with correct title and branding', async () => {
    // Check page title
    await expect(page).toHaveTitle(/PM33/);
    
    // Verify PM33 branding is present
    await expect(page.locator('text=PM33')).toBeVisible();
    
    // Take homepage screenshot
    await page.screenshot({ 
      path: 'test-results/homepage-full.png', 
      fullPage: true 
    });
  });

  test('should render hero section with professional layout', async () => {
    // Verify main headline is visible
    await expect(page.locator('text=Don\'t Replace Your PM Tools')).toBeVisible();
    await expect(page.locator('text=Make Them 10x Smarter')).toBeVisible();
    
    // Verify call-to-action buttons
    await expect(page.getByRole('link', { name: /Start Free 14-Day Trial/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Try Live Demo/i })).toBeVisible();
    
    // Check for professional visual elements
    await expect(page.locator('[class*="gradient"]')).toBeVisible();
    
    // Take hero section screenshot
    await page.locator('.hero-section, [style*="padding: 6rem 0"]').first().screenshot({ 
      path: 'test-results/homepage-hero.png' 
    });
  });

  test('should display demo navigation cards correctly', async () => {
    // Verify Strategic Intelligence Engine card
    const strategicCard = page.locator('text=Strategic Intelligence Engine').locator('..');
    await expect(strategicCard).toBeVisible();
    await expect(strategicCard.locator('text=Ready to Try')).toBeVisible();
    
    // Verify Strategic Command Center card
    const commandCard = page.locator('text=Strategic Command Center').locator('..');
    await expect(commandCard).toBeVisible();
    await expect(commandCard.locator('text=Ready to Try')).toBeVisible();
    
    // Take demo cards screenshot
    await page.locator('text=Live Demo Experience').locator('..').screenshot({ 
      path: 'test-results/homepage-demo-cards.png' 
    });
  });

  test('should have working navigation links', async () => {
    // Test Strategic Intelligence link
    const strategicLink = page.getByRole('link', { name: /Try Live Demo/i });
    await expect(strategicLink).toHaveAttribute('href', '/strategic-intelligence');
    
    // Test Command Center link
    const commandLink = page.locator('text=Strategic Command Center').locator('..').getByRole('link');
    await expect(commandLink).toHaveAttribute('href', '/command-center');
    
    // Test trial link
    const trialLink = page.getByRole('link', { name: /Start Free 14-Day Trial/i });
    await expect(trialLink).toHaveAttribute('href', '/trial');
  });

  test('should display problem/solution comparison professionally', async () => {
    // Verify problem section
    await expect(page.locator('text=The Reality Check')).toBeVisible();
    await expect(page.locator('text=60-80% of your time')).toBeVisible();
    
    // Verify solution section with PM33 approach
    await expect(page.locator('text=Enhancement, Not Replacement')).toBeVisible();
    await expect(page.locator('text=PM33 Approach')).toBeVisible();
    
    // Check for metrics and stats
    await expect(page.locator('text=40%')).toBeVisible();
    await expect(page.locator('text=72h')).toBeVisible();
    
    // Take comparison section screenshot
    await page.locator('text=Enhancement, Not Replacement').locator('..').screenshot({ 
      path: 'test-results/homepage-comparison.png' 
    });
  });

  test('should display customer testimonials and social proof', async () => {
    // Verify testimonials section
    await expect(page.locator('text=Customer Success Stories')).toBeVisible();
    await expect(page.locator('text=Sarah Chen')).toBeVisible();
    await expect(page.locator('text=Marcus Rodriguez')).toBeVisible();
    
    // Verify metrics in testimonials
    await expect(page.locator('text=40% more features')).toBeVisible();
    await expect(page.locator('text=28% churn reduction')).toBeVisible();
    
    // Take testimonials screenshot
    await page.locator('text=Customer Success Stories').locator('..').screenshot({ 
      path: 'test-results/homepage-testimonials.png' 
    });
  });

  test('should have professional CTA section', async () => {
    // Verify final CTA section
    await expect(page.locator('text=10x Your PM Productivity')).toBeVisible();
    await expect(page.locator('text=2,500+ product teams')).toBeVisible();
    
    // Verify CTA buttons work
    const finalTrialButton = page.locator('text=Start Your Free 14-Day Trial').last();
    await expect(finalTrialButton).toBeVisible();
    
    const finalDemoButton = page.locator('text=Try Strategic Intelligence').last();
    await expect(finalDemoButton).toBeVisible();
    
    // Take CTA section screenshot
    await page.locator('text=10x Your PM Productivity').locator('..').screenshot({ 
      path: 'test-results/homepage-cta.png' 
    });
  });

  test('should be responsive on mobile devices', async () => {
    // Test mobile responsiveness
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.waitForTimeout(1000);
    
    // Verify key elements still visible on mobile
    await expect(page.locator('text=Don\'t Replace Your PM Tools')).toBeVisible();
    await expect(page.getByRole('link', { name: /Start Free 14-Day Trial/i })).toBeVisible();
    
    // Take mobile screenshot
    await page.screenshot({ 
      path: 'test-results/homepage-mobile.png', 
      fullPage: true 
    });
    
    // Test tablet responsiveness
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'test-results/homepage-tablet.png', 
      fullPage: true 
    });
  });

  test('should not have console errors', async () => {
    const consoleLogs: string[] = [];
    const consoleErrors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else {
        consoleLogs.push(`${msg.type()}: ${msg.text()}`);
      }
    });
    
    // Reload page to capture all console messages
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Log console messages for debugging
    console.log('Console Logs:', consoleLogs);
    if (consoleErrors.length > 0) {
      console.log('Console Errors:', consoleErrors);
    }
    
    // Fail test if there are critical console errors
    expect(consoleErrors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('404') &&
      !error.includes('warning')
    )).toHaveLength(0);
  });

  test('should have proper accessibility attributes', async () => {
    // Check for proper heading hierarchy
    const h1Elements = await page.locator('h1').count();
    expect(h1Elements).toBeGreaterThanOrEqual(1);
    
    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const ariaLabel = await img.getAttribute('aria-label');
      expect(alt || ariaLabel).toBeTruthy();
    }
    
    // Check for button accessibility
    const buttons = page.locator('button, [role="button"]');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const text = await button.textContent();
      expect(ariaLabel || (text && text.trim().length > 0)).toBeTruthy();
    }
  });

  test('should load page performance within acceptable time', async () => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'networkidle' });
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    console.log(`Homepage load time: ${loadTime}ms`);
  });
});