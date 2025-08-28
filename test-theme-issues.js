// Quick test script to identify theme issues without Playwright timeout
const puppeteer = require('puppeteer');

async function testThemeIssues() {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  
  try {
    console.log('Testing PM33 Theme Issues...');
    
    // Test 1: Default loading theme
    console.log('\n1. Testing default loading behavior...');
    await page.goto('http://localhost:3006', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000); // Let theme settle
    
    // Capture initial load state
    const initialTheme = await page.evaluate(() => {
      return {
        bodyClass: document.body.className,
        rootClass: document.documentElement.className,
        dataTheme: document.documentElement.getAttribute('data-theme'),
        backgroundColor: window.getComputedStyle(document.body).backgroundColor,
        color: window.getComputedStyle(document.body).color
      };
    });
    
    console.log('Initial theme state:', initialTheme);
    
    // Test 2: Theme toggle functionality
    console.log('\n2. Testing theme toggle...');
    const themeToggle = await page.$('[data-testid="theme-toggle"]');
    if (themeToggle) {
      await themeToggle.click();
      await page.waitForTimeout(500); // Theme transition time
      
      const afterToggleTheme = await page.evaluate(() => {
        return {
          bodyClass: document.body.className,
          rootClass: document.documentElement.className,
          dataTheme: document.documentElement.getAttribute('data-theme'),
          backgroundColor: window.getComputedStyle(document.body).backgroundColor,
          color: window.getComputedStyle(document.body).color
        };
      });
      
      console.log('After toggle theme state:', afterToggleTheme);
    } else {
      console.log('Theme toggle not found');
    }
    
    // Test 3: Check CSS variables
    console.log('\n3. Testing CSS variables...');
    const cssVariables = await page.evaluate(() => {
      const computedStyle = getComputedStyle(document.documentElement);
      return {
        pm33BgPrimary: computedStyle.getPropertyValue('--pm33-bg-primary'),
        pm33TextPrimary: computedStyle.getPropertyValue('--pm33-text-primary'),
        pm33Primary: computedStyle.getPropertyValue('--pm33-primary'),
        pm33MarketingBg: computedStyle.getPropertyValue('--pm33-marketingBg'),
        pm33MarketingText: computedStyle.getPropertyValue('--pm33-marketingText'),
        gradientText: computedStyle.getPropertyValue('--gradient-text')
      };
    });
    
    console.log('CSS Variables:', cssVariables);
    
    // Test 4: Check navigation background
    console.log('\n4. Testing navigation theme awareness...');
    const navStyles = await page.evaluate(() => {
      const nav = document.querySelector('nav');
      if (nav) {
        const style = getComputedStyle(nav);
        return {
          backgroundColor: style.backgroundColor,
          backdropFilter: style.backdropFilter,
          color: style.color
        };
      }
      return null;
    });
    
    console.log('Navigation styles:', navStyles);
    
    // Test 5: Navigate to About page and test CTA
    console.log('\n5. Testing About page CTA visibility...');
    await page.goto('http://localhost:3006/about', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    
    // Look for CTA sections
    const ctaSections = await page.evaluate(() => {
      const ctas = Array.from(document.querySelectorAll('[class*="cta"], [class*="CTA"], section'))
        .filter(el => el.textContent?.includes('Start') || el.textContent?.includes('Try') || el.textContent?.includes('Contact'))
        .map(el => {
          const style = getComputedStyle(el);
          return {
            text: el.textContent?.substring(0, 100),
            backgroundColor: style.backgroundColor,
            color: style.color,
            className: el.className
          };
        });
      return ctas;
    });
    
    console.log('CTA sections found:', ctaSections);
    
  } catch (error) {
    console.error('Test error:', error);
  } finally {
    await browser.close();
  }
}

testThemeIssues().catch(console.error);