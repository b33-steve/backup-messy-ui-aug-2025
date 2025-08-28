/**
 * Marketing App UI Configuration Debug Test
 * Based on core app debugging approach to resolve marketing UI issues
 * 
 * Checks specific marketing UI configuration issues:
 * 1. Tailwind CSS configuration for marketing context
 * 2. Global CSS imports and marketing-specific styles
 * 3. Conflicting styles between Mantine and Tailwind
 * 4. Marketing layout wrapper interference
 * 5. Actual HTML and computed styles validation
 */

import { test, expect } from '@playwright/test';

test.describe('Marketing App UI Configuration Debug', () => {
  
  test('1. Tailwind CSS Configuration Check', async ({ page }) => {
    console.log('🔍 CHECKING TAILWIND CSS CONFIGURATION...');
    
    await page.goto('http://localhost:8080');
    await page.waitForTimeout(3000);
    
    // Check if Tailwind utilities are working
    const tailwindElements = await page.evaluate(() => {
      const results = {
        flexUtilities: [],
        gridUtilities: [],
        spacingUtilities: [],
        colorUtilities: [],
        responsiveUtilities: []
      };
      
      // Check for flex utilities
      const flexElements = document.querySelectorAll('[class*="flex"], [class*="grid"]');
      results.flexUtilities = Array.from(flexElements).slice(0, 5).map(el => el.className);
      
      // Check for grid utilities  
      const gridElements = document.querySelectorAll('[class*="grid-cols"], [class*="md:grid"], [class*="lg:grid"]');
      results.gridUtilities = Array.from(gridElements).slice(0, 5).map(el => el.className);
      
      // Check for spacing utilities
      const spacingElements = document.querySelectorAll('[class*="p-"], [class*="m-"], [class*="gap-"]');
      results.spacingUtilities = Array.from(spacingElements).slice(0, 5).map(el => el.className);
      
      // Check for responsive utilities
      const responsiveElements = document.querySelectorAll('[class*="md:"], [class*="lg:"], [class*="sm:"]');
      results.responsiveUtilities = Array.from(responsiveElements).slice(0, 5).map(el => el.className);
      
      return results;
    });
    
    console.log('✅ Tailwind Flex Utilities Found:', tailwindElements.flexUtilities);
    console.log('✅ Tailwind Grid Utilities Found:', tailwindElements.gridUtilities);
    console.log('✅ Tailwind Spacing Utilities Found:', tailwindElements.spacingUtilities);
    console.log('✅ Tailwind Responsive Utilities Found:', tailwindElements.responsiveUtilities);
    
    // Verify Tailwind is working by checking computed styles
    const tailwindWorking = await page.evaluate(() => {
      // Create test element with Tailwind classes
      const testElement = document.createElement('div');
      testElement.className = 'flex justify-center items-center p-4 bg-blue-500';
      document.body.appendChild(testElement);
      
      const styles = window.getComputedStyle(testElement);
      const isFlexWorking = styles.display === 'flex';
      const isPaddingWorking = styles.padding === '16px' || styles.paddingTop === '16px';
      
      document.body.removeChild(testElement);
      
      return {
        display: styles.display,
        justifyContent: styles.justifyContent,
        alignItems: styles.alignItems,
        padding: styles.padding || styles.paddingTop,
        isFlexWorking,
        isPaddingWorking
      };
    });
    
    console.log('🎯 Tailwind CSS Test Results:', tailwindWorking);
    expect(tailwindWorking.isFlexWorking).toBe(true);
    console.log('✅ Tailwind CSS configuration is working');
  });

  test('2. Global CSS and Marketing Context Styles Check', async ({ page }) => {
    console.log('🔍 CHECKING GLOBAL CSS AND MARKETING STYLES...');
    
    await page.goto('http://localhost:8080');
    await page.waitForTimeout(2000);
    
    // Check for global CSS variables and marketing context
    const cssVariables = await page.evaluate(() => {
      const root = document.documentElement;
      const body = document.body;
      const marketingContext = document.querySelector('.marketing-context');
      
      const rootStyles = window.getComputedStyle(root);
      const bodyStyles = window.getComputedStyle(body);
      const marketingStyles = marketingContext ? window.getComputedStyle(marketingContext) : null;
      
      return {
        // PM33 CSS Variables
        pm33Primary: rootStyles.getPropertyValue('--pm33-primary'),
        pm33Background: rootStyles.getPropertyValue('--pm33-background'),
        pm33Text: rootStyles.getPropertyValue('--pm33-text'),
        
        // Mantine CSS Variables
        mantineColorScheme: rootStyles.getPropertyValue('--mantine-color-scheme'),
        mantinePrimary: rootStyles.getPropertyValue('--mantine-primary-color'),
        
        // Body styles
        bodyBackground: bodyStyles.backgroundColor,
        bodyColor: bodyStyles.color,
        bodyFontFamily: bodyStyles.fontFamily,
        
        // Marketing context
        hasMarketingContext: !!marketingContext,
        marketingBackground: marketingStyles?.backgroundColor,
        marketingColor: marketingStyles?.color,
        
        // Check for conflicting styles
        conflictingStyles: {
          bodyMinHeight: bodyStyles.minHeight,
          bodyDisplay: bodyStyles.display,
          bodyPosition: bodyStyles.position
        }
      };
    });
    
    console.log('🎨 PM33 CSS Variables:', {
      primary: cssVariables.pm33Primary,
      background: cssVariables.pm33Background,
      text: cssVariables.pm33Text
    });
    
    console.log('🎨 Mantine CSS Variables:', {
      colorScheme: cssVariables.mantineColorScheme,
      primary: cssVariables.mantinePrimary
    });
    
    console.log('📄 Marketing Context:', {
      hasContext: cssVariables.hasMarketingContext,
      background: cssVariables.marketingBackground,
      color: cssVariables.marketingColor
    });
    
    console.log('⚠️ Potential Conflicting Styles:', cssVariables.conflictingStyles);
    
    // Verify marketing context exists
    expect(cssVariables.hasMarketingContext).toBe(true);
    console.log('✅ Marketing context is properly applied');
  });

  test('3. Mantine vs Tailwind Style Conflicts Check', async ({ page }) => {
    console.log('🔍 CHECKING MANTINE VS TAILWIND CONFLICTS...');
    
    await page.goto('http://localhost:8080');
    await page.waitForTimeout(2000);
    
    // Check for style conflicts on key elements
    const styleConflicts = await page.evaluate(() => {
      const conflicts = [];
      
      // Check navigation/header elements
      const navElements = document.querySelectorAll('nav, [role="navigation"], header');
      navElements.forEach((el, index) => {
        const styles = window.getComputedStyle(el);
        conflicts.push({
          element: `navigation-${index}`,
          display: styles.display,
          position: styles.position,
          zIndex: styles.zIndex,
          backgroundColor: styles.backgroundColor,
          classes: el.className
        });
      });
      
      // Check container elements
      const containers = document.querySelectorAll('[class*="container"], [class*="Container"]');
      containers.forEach((el, index) => {
        const styles = window.getComputedStyle(el);
        conflicts.push({
          element: `container-${index}`,
          maxWidth: styles.maxWidth,
          margin: styles.margin,
          padding: styles.padding,
          classes: el.className
        });
      });
      
      // Check grid/flex elements
      const layoutElements = document.querySelectorAll('[class*="Grid"], [class*="SimpleGrid"], [class*="flex"], [class*="grid"]');
      layoutElements.forEach((el, index) => {
        if (index < 3) { // Limit to first 3 to avoid spam
          const styles = window.getComputedStyle(el);
          conflicts.push({
            element: `layout-${index}`,
            display: styles.display,
            flexDirection: styles.flexDirection,
            gridTemplateColumns: styles.gridTemplateColumns,
            gap: styles.gap,
            classes: el.className
          });
        }
      });
      
      return conflicts;
    });
    
    console.log('🎯 Style Analysis Results:');
    styleConflicts.forEach(conflict => {
      console.log(`📦 ${conflict.element}:`, conflict);
    });
    
    // Check for common conflict indicators
    const hasDisplayConflicts = styleConflicts.some(c => 
      c.display && c.display !== 'block' && c.display !== 'flex' && c.display !== 'grid'
    );
    
    console.log('⚠️ Display Conflicts Detected:', hasDisplayConflicts);
    console.log('✅ Style conflict analysis completed');
  });

  test('4. Marketing Layout Wrapper Interference Check', async ({ page }) => {
    console.log('🔍 CHECKING MARKETING LAYOUT WRAPPER INTERFERENCE...');
    
    await page.goto('http://localhost:8080');
    await page.waitForTimeout(2000);
    
    // Analyze layout wrapper hierarchy
    const layoutAnalysis = await page.evaluate(() => {
      const body = document.body;
      const wrappers = [];
      
      // Find all potential layout wrappers
      const selectors = [
        '.marketing-context',
        '[class*="Layout"]',
        '[class*="wrapper"]',
        '[class*="container"]',
        'main',
        '[role="main"]'
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
          const styles = window.getComputedStyle(el);
          wrappers.push({
            selector: `${selector}-${index}`,
            tagName: el.tagName.toLowerCase(),
            display: styles.display,
            position: styles.position,
            width: styles.width,
            maxWidth: styles.maxWidth,
            margin: styles.margin,
            padding: styles.padding,
            overflow: styles.overflow,
            classes: el.className,
            childCount: el.children.length
          });
        });
      });
      
      // Check body styles that might interfere
      const bodyStyles = window.getComputedStyle(body);
      
      return {
        bodyStyles: {
          display: bodyStyles.display,
          minHeight: bodyStyles.minHeight,
          margin: bodyStyles.margin,
          padding: bodyStyles.padding,
          overflow: bodyStyles.overflow
        },
        wrappers,
        totalWrappers: wrappers.length
      };
    });
    
    console.log('📄 Body Styles:', layoutAnalysis.bodyStyles);
    console.log('📦 Layout Wrappers Found:', layoutAnalysis.totalWrappers);
    
    layoutAnalysis.wrappers.forEach(wrapper => {
      console.log(`🎯 ${wrapper.selector}:`, {
        tag: wrapper.tagName,
        display: wrapper.display,
        width: wrapper.width,
        maxWidth: wrapper.maxWidth,
        children: wrapper.childCount
      });
    });
    
    // Check for problematic wrapper patterns
    const problematicWrappers = layoutAnalysis.wrappers.filter(w => 
      w.overflow === 'hidden' || 
      w.position === 'absolute' || 
      (w.width && w.width !== 'auto' && !w.width.includes('%'))
    );
    
    if (problematicWrappers.length > 0) {
      console.log('⚠️ Potentially Problematic Wrappers:', problematicWrappers);
    }
    
    console.log('✅ Layout wrapper analysis completed');
  });

  test('5. Actual HTML and Computed Styles Validation', async ({ page }) => {
    console.log('🔍 CHECKING ACTUAL HTML AND COMPUTED STYLES...');
    
    await page.goto('http://localhost:8080');
    await page.waitForTimeout(3000);
    
    // Get detailed HTML structure and computed styles
    const htmlAnalysis = await page.evaluate(() => {
      // Find main content areas
      const mainContent = document.querySelector('main') || document.body;
      const navigation = document.querySelector('nav');
      const hero = document.querySelector('[class*="hero"], [class*="Hero"]') || 
                   document.querySelector('h1')?.closest('div');
      
      const analyzeElement = (element, name) => {
        if (!element) return null;
        
        const styles = window.getComputedStyle(element);
        return {
          name,
          tagName: element.tagName,
          classes: element.className,
          computedStyles: {
            display: styles.display,
            position: styles.position,
            width: styles.width,
            height: styles.height,
            margin: styles.margin,
            padding: styles.padding,
            flexDirection: styles.flexDirection,
            justifyContent: styles.justifyContent,
            alignItems: styles.alignItems,
            gridTemplateColumns: styles.gridTemplateColumns,
            gap: styles.gap,
            backgroundColor: styles.backgroundColor,
            zIndex: styles.zIndex
          },
          childrenCount: element.children.length,
          innerHTML: element.innerHTML.substring(0, 200) + '...'
        };
      };
      
      return {
        navigation: analyzeElement(navigation, 'Navigation'),
        mainContent: analyzeElement(mainContent, 'Main Content'),
        hero: analyzeElement(hero, 'Hero Section'),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        documentReady: document.readyState
      };
    });
    
    console.log('🌐 Viewport:', htmlAnalysis.viewport);
    console.log('📄 Document State:', htmlAnalysis.documentReady);
    
    if (htmlAnalysis.navigation) {
      console.log('🧭 Navigation Analysis:', {
        tag: htmlAnalysis.navigation.tagName,
        display: htmlAnalysis.navigation.computedStyles.display,
        position: htmlAnalysis.navigation.computedStyles.position,
        zIndex: htmlAnalysis.navigation.computedStyles.zIndex
      });
    }
    
    if (htmlAnalysis.mainContent) {
      console.log('📄 Main Content Analysis:', {
        tag: htmlAnalysis.mainContent.tagName,
        display: htmlAnalysis.mainContent.computedStyles.display,
        width: htmlAnalysis.mainContent.computedStyles.width,
        children: htmlAnalysis.mainContent.childrenCount
      });
    }
    
    if (htmlAnalysis.hero) {
      console.log('🦸 Hero Section Analysis:', {
        tag: htmlAnalysis.hero.tagName,
        display: htmlAnalysis.hero.computedStyles.display,
        margin: htmlAnalysis.hero.computedStyles.margin,
        padding: htmlAnalysis.hero.computedStyles.padding
      });
    }
    
    // Validate key layout expectations
    expect(htmlAnalysis.documentReady).toBe('complete');
    
    if (htmlAnalysis.navigation) {
      expect(htmlAnalysis.navigation.computedStyles.display).not.toBe('none');
    }
    
    console.log('✅ HTML and computed styles validation completed');
  });

  test('6. Marketing-Specific UI Issues Check', async ({ page }) => {
    console.log('🔍 CHECKING MARKETING-SPECIFIC UI ISSUES...');
    
    await page.goto('http://localhost:8080');
    await page.waitForTimeout(2000);
    
    // Check marketing-specific elements and their layouts
    const marketingUICheck = await page.evaluate(() => {
      const issues = {
        logoIssues: [],
        themeToggleIssues: [],
        ctaButtonIssues: [],
        cardLayoutIssues: [],
        responsiveIssues: []
      };
      
      // Check logo visibility and styling
      const logos = document.querySelectorAll('img[alt*="PM33"], img[src*="logo"]');
      logos.forEach((logo, index) => {
        const styles = window.getComputedStyle(logo);
        const rect = logo.getBoundingClientRect();
        
        issues.logoIssues.push({
          index,
          visible: rect.width > 0 && rect.height > 0,
          src: logo.src,
          styles: {
            height: styles.height,
            width: styles.width,
            objectFit: styles.objectFit
          },
          boundingRect: {
            width: rect.width,
            height: rect.height,
            top: rect.top
          }
        });
      });
      
      // Check theme toggle functionality
      const themeToggle = document.querySelector('[data-testid="theme-toggle"]');
      if (themeToggle) {
        const styles = window.getComputedStyle(themeToggle);
        issues.themeToggleIssues.push({
          visible: styles.display !== 'none',
          styles: {
            display: styles.display,
            opacity: styles.opacity,
            cursor: styles.cursor
          }
        });
      }
      
      // Check CTA buttons
      const ctaButtons = document.querySelectorAll('a[href*="trial"], button[class*="cta"]');
      ctaButtons.forEach((button, index) => {
        const styles = window.getComputedStyle(button);
        const rect = button.getBoundingClientRect();
        
        issues.ctaButtonIssues.push({
          index,
          text: button.textContent,
          visible: rect.width > 0 && rect.height > 0,
          styles: {
            background: styles.background,
            color: styles.color,
            padding: styles.padding,
            borderRadius: styles.borderRadius
          }
        });
      });
      
      // Check card layouts (pricing, features, etc.)
      const cards = document.querySelectorAll('[class*="Card"], [class*="card"]');
      cards.forEach((card, index) => {
        if (index < 5) { // Limit to prevent spam
          const styles = window.getComputedStyle(card);
          issues.cardLayoutIssues.push({
            index,
            styles: {
              display: styles.display,
              flexDirection: styles.flexDirection,
              padding: styles.padding,
              margin: styles.margin,
              borderRadius: styles.borderRadius,
              backgroundColor: styles.backgroundColor
            }
          });
        }
      });
      
      return issues;
    });
    
    console.log('🖼️ Logo Analysis:', marketingUICheck.logoIssues);
    console.log('🎨 Theme Toggle Analysis:', marketingUICheck.themeToggleIssues);
    console.log('🎯 CTA Button Analysis:', marketingUICheck.ctaButtonIssues);
    console.log('🃏 Card Layout Analysis:', marketingUICheck.cardLayoutIssues);
    
    // Validate key marketing elements
    expect(marketingUICheck.logoIssues.length).toBeGreaterThan(0);
    expect(marketingUICheck.logoIssues[0]?.visible).toBe(true);
    
    console.log('✅ Marketing-specific UI issues check completed');
  });

});