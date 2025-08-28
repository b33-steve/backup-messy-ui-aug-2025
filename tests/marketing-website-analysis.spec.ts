import { test, expect, Page } from '@playwright/test';
import { devices } from '@playwright/test';

// Marketing website analysis test for PM33
test.describe('PM33 Marketing Website Analysis', () => {
  const BASE_URL = 'http://localhost:3000';
  
  // Test different viewport sizes for responsive analysis
  const viewports = [
    { name: 'desktop', ...devices['Desktop Chrome'] },
    { name: 'tablet', ...devices['iPad Pro'] },
    { name: 'mobile', ...devices['iPhone 12'] }
  ];

  async function analyzeMarketingContent(page: Page) {
    const results = {
      title: '',
      h1: '',
      description: '',
      valueProps: [] as string[],
      ctaButtons: [] as string[],
      navigationLinks: [] as string[],
      pricing: [] as string[],
      testimonials: [] as string[],
      features: [] as string[]
    };

    // Page metadata
    results.title = await page.title();
    
    // Get main heading
    try {
      results.h1 = await page.locator('h1').first().textContent() || '';
    } catch {}

    // Get description
    try {
      results.description = await page.locator('meta[name="description"]').getAttribute('content') || '';
    } catch {}

    // Value propositions (headings and key messaging)
    try {
      const headings = await page.locator('h1, h2, h3, .hero-text, .tagline, .value-prop').allTextContents();
      results.valueProps = headings.filter(text => text && text.length > 10).slice(0, 5);
    } catch {}

    // CTA buttons
    try {
      const buttons = await page.locator('button, .btn, a[class*="button"], a[class*="cta"], a[href*="trial"], a[href*="signup"]').allTextContents();
      results.ctaButtons = buttons.filter(text => text && text.trim().length > 0);
    } catch {}

    // Navigation links
    try {
      const navLinks = await page.locator('nav a, header a').allTextContents();
      results.navigationLinks = navLinks.filter(text => text && text.trim().length > 0);
    } catch {}

    // Pricing elements
    try {
      const pricingElements = await page.locator('[class*="price"], [class*="plan"], .pricing, [class*="mrr"]').allTextContents();
      results.pricing = pricingElements.filter(text => text && text.includes('$')).slice(0, 3);
    } catch {}

    // Testimonials or social proof
    try {
      const testimonials = await page.locator('[class*="testimonial"], [class*="review"], .quote').allTextContents();
      results.testimonials = testimonials.slice(0, 3);
    } catch {}

    // Features list
    try {
      const features = await page.locator('[class*="feature"], .benefit, li').allTextContents();
      results.features = features.filter(text => text && text.length > 20).slice(0, 5);
    } catch {}

    return results;
  }

  async function checkTechnicalHealth(page: Page) {
    const issues = [];
    
    // Check for console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Check for broken images
    const brokenImages = await page.$$eval('img', imgs => 
      imgs.filter(img => !img.complete || img.naturalHeight === 0).length
    );
    
    if (brokenImages > 0) {
      issues.push(`Found ${brokenImages} broken images`);
    }

    // Check for missing alt text
    const imagesWithoutAlt = await page.$$eval('img', imgs => 
      imgs.filter(img => !img.alt || img.alt.trim() === '').length
    );
    
    if (imagesWithoutAlt > 0) {
      issues.push(`Found ${imagesWithoutAlt} images without alt text`);
    }

    // Check for performance metrics
    const performanceMetrics = await page.evaluate(() => {
      return {
        domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        loadComplete: performance.timing.loadEventEnd - performance.timing.navigationStart,
      };
    });

    return { issues, consoleErrors, performanceMetrics };
  }

  for (const viewport of viewports) {
    test(`Homepage Analysis - ${viewport.name}`, async ({ browser }) => {
      const context = await browser.newContext({
        ...viewport,
      });
      const page = await context.newPage();

      console.log(`\n🔍 Analyzing ${viewport.name} viewport...`);

      // Navigate to homepage
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      
      // Take homepage screenshot
      await page.screenshot({ 
        path: `marketing-${viewport.name}-homepage.png`, 
        fullPage: true 
      });
      console.log(`📸 Screenshot saved: marketing-${viewport.name}-homepage.png`);

      // Analyze marketing content
      const marketingContent = await analyzeMarketingContent(page);
      console.log(`📊 Marketing Content Analysis for ${viewport.name}:`, JSON.stringify(marketingContent, null, 2));

      // Check technical health
      const technicalHealth = await checkTechnicalHealth(page);
      console.log(`⚙️ Technical Health for ${viewport.name}:`, technicalHealth);

      // Basic assertions for marketing effectiveness
      expect(marketingContent.title).not.toBe('');
      expect(marketingContent.h1).not.toBe('');
      expect(marketingContent.ctaButtons.length).toBeGreaterThan(0);
      expect(marketingContent.valueProps.length).toBeGreaterThan(0);

      await context.close();
    });
  }

  test('Navigation and Page Coverage', async ({ page }) => {
    console.log('🔗 Testing navigation and page coverage...');
    
    await page.goto(BASE_URL);
    
    // Get all navigation links
    const navLinks = await page.locator('nav a, header a').evaluateAll(links => 
      links.map(link => ({ text: link.textContent?.trim(), href: link.href }))
        .filter(link => link.text && link.href)
    );

    console.log(`Found ${navLinks.length} navigation links:`, navLinks);

    // Test key pages
    const keyPages = ['/pricing', '/about', '/features', '/dashboard', '/strategic-intelligence'];
    const pageResults = {};

    for (const pagePath of keyPages) {
      try {
        console.log(`🔍 Testing page: ${pagePath}`);
        const response = await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle' });
        
        // Take screenshot of key pages
        await page.screenshot({ 
          path: `marketing-page-${pagePath.replace('/', '')}.png`, 
          fullPage: true 
        });

        const pageTitle = await page.title();
        const pageH1 = await page.locator('h1').first().textContent().catch(() => 'Not found');
        
        pageResults[pagePath] = {
          status: response?.status() || 'unknown',
          title: pageTitle,
          h1: pageH1,
          accessible: response?.ok() || false
        };

      } catch (error) {
        pageResults[pagePath] = {
          status: 'error',
          error: error.message,
          accessible: false
        };
      }
    }

    console.log('📄 Page Coverage Results:', JSON.stringify(pageResults, null, 2));
    
    // At least homepage should be accessible
    expect(await page.title()).not.toBe('');
  });

  test('Conversion Optimization Analysis', async ({ page }) => {
    console.log('💰 Analyzing conversion optimization...');
    
    await page.goto(BASE_URL);
    await page.screenshot({ path: 'conversion-analysis-homepage.png', fullPage: true });

    // Check for conversion elements
    const conversionElements = {
      ctaButtons: await page.locator('button, .btn, a[class*="button"]').count(),
      forms: await page.locator('form').count(),
      pricingMentions: await page.locator(':text("$"), :text("MRR"), :text("price")').count(),
      testimonials: await page.locator('[class*="testimonial"], .quote, [class*="review"]').count(),
      features: await page.locator('[class*="feature"], .benefit').count()
    };

    console.log('💰 Conversion Elements Found:', conversionElements);

    // Look for PM33's $100K MRR goal messaging
    const mrrMentions = await page.getByText(/100K.*MRR|MRR.*100K/i).count();
    const pmoMentions = await page.getByText(/PMO|Product Management Office/i).count();
    const aiTeamsMentions = await page.getByText(/AI.*team|agentic.*AI/i).count();

    console.log(`🎯 Key Messaging Check:`);
    console.log(`- MRR Goal mentions: ${mrrMentions}`);
    console.log(`- PMO mentions: ${pmoMentions}`);
    console.log(`- AI Teams mentions: ${aiTeamsMentions}`);

    // Basic conversion expectations
    expect(conversionElements.ctaButtons).toBeGreaterThan(0);
  });

  test('Mobile Responsiveness Deep Dive', async ({ browser }) => {
    console.log('📱 Deep mobile responsiveness analysis...');
    
    const mobileContext = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await mobileContext.newPage();

    await page.goto(BASE_URL);
    
    // Mobile-specific screenshots
    await page.screenshot({ path: 'mobile-homepage-portrait.png' });
    
    // Check mobile navigation
    const hasHamburgerMenu = await page.locator('[class*="hamburger"], [class*="menu-toggle"], .mobile-menu').count();
    console.log(`📱 Hamburger menu found: ${hasHamburgerMenu > 0}`);

    // Check text readability on mobile
    const smallText = await page.$$eval('*', elements => {
      return elements.filter(el => {
        const styles = window.getComputedStyle(el);
        const fontSize = parseFloat(styles.fontSize);
        return fontSize < 14 && el.textContent && el.textContent.trim().length > 20;
      }).length;
    });

    console.log(`📱 Elements with potentially too small text: ${smallText}`);

    // Test touch targets
    const buttonSizes = await page.$$eval('button, .btn, a[class*="button"]', buttons => {
      return buttons.map(btn => {
        const rect = btn.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      }).filter(size => size.width < 44 || size.height < 44);
    });

    console.log(`📱 Buttons with potentially too small touch targets: ${buttonSizes.length}`);

    await mobileContext.close();
  });

  test('Marketing Message Effectiveness', async ({ page }) => {
    console.log('🎯 Analyzing marketing message effectiveness...');
    
    await page.goto(BASE_URL);
    
    // Extract key marketing messages
    const heroText = await page.locator('.hero, [class*="hero"], h1').first().textContent() || '';
    const subheadlines = await page.locator('h2, h3, .tagline, .subtitle').allTextContents();
    
    console.log('🎯 Hero Message:', heroText);
    console.log('🎯 Key Subheadlines:', subheadlines.slice(0, 3));

    // Check for PM33-specific value props
    const keyTerms = [
      'PMO transformation',
      'agentic AI',
      '$100K MRR',
      'Product Manager',
      'strategic intelligence',
      'workflow execution'
    ];

    const termPresence = {};
    for (const term of keyTerms) {
      const count = await page.getByText(new RegExp(term, 'i')).count();
      termPresence[term] = count;
    }

    console.log('🎯 Key Term Presence:', termPresence);
    
    // Take screenshot for message analysis
    await page.screenshot({ path: 'marketing-message-analysis.png', fullPage: true });

    // Basic message clarity check
    expect(heroText).not.toBe('');
    expect(subheadlines.length).toBeGreaterThan(0);
  });

  // Generate final comprehensive report
  test('Generate Marketing Analysis Report', async ({ page }) => {
    console.log('📋 Generating comprehensive marketing analysis report...');
    
    // This test runs last and compiles all findings
    const reportData = {
      timestamp: new Date().toISOString(),
      analysis: {
        homepage: 'See marketing-desktop-homepage.png, marketing-tablet-homepage.png, marketing-mobile-homepage.png',
        navigation: 'Navigation links tested across key pages',
        conversion: 'CTA buttons and conversion elements analyzed',
        mobile: 'Mobile responsiveness and touch targets evaluated',
        messaging: 'PM33 value proposition and key terms assessed'
      },
      recommendations: [
        'Review mobile touch target sizes for buttons under 44px',
        'Ensure PM33 key messaging (PMO transformation, $100K MRR) is prominent',
        'Test conversion funnel from homepage to signup/trial',
        'Validate all navigation links work correctly',
        'Optimize page load performance if needed'
      ],
      screenshots: [
        'marketing-desktop-homepage.png',
        'marketing-tablet-homepage.png', 
        'marketing-mobile-homepage.png',
        'conversion-analysis-homepage.png',
        'mobile-homepage-portrait.png',
        'marketing-message-analysis.png'
      ]
    };

    console.log('📋 COMPREHENSIVE MARKETING ANALYSIS REPORT:', JSON.stringify(reportData, null, 2));
  });
});