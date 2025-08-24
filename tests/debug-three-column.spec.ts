/**
 * Debug Three-Column Layout - Find the Real Issue
 * 
 * This test will help us understand why the three-column layout isn't working visually.
 */

import { test, expect } from '@playwright/test';

test('Debug dashboard three-column layout issue', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto('/dashboard');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  console.log('🔍 DEBUGGING THREE-COLUMN LAYOUT');
  
  // 1. Check if the grid container exists and get its computed styles
  const gridContainer = page.locator('.lg\\:grid-cols-3').first();
  const exists = await gridContainer.count() > 0;
  console.log('✅ Grid container exists:', exists);
  
  if (exists) {
    const styles = await gridContainer.evaluate(el => {
      const computed = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        display: computed.display,
        gridTemplateColumns: computed.gridTemplateColumns,
        gap: computed.gap,
        width: rect.width,
        height: rect.height,
        classList: Array.from(el.classList),
        tagName: el.tagName,
        innerHTML: el.innerHTML.substring(0, 200) + '...'
      };
    });
    
    console.log('🎯 Grid container details:', styles);
  }
  
  // 2. Check all elements with grid classes
  const allGridElements = await page.evaluate(() => {
    const gridElements = document.querySelectorAll('[class*="grid"], .lg\\:grid-cols-3, .grid');
    return Array.from(gridElements).map(el => {
      const computed = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tagName: el.tagName,
        classes: el.className,
        display: computed.display,
        gridTemplateColumns: computed.gridTemplateColumns,
        width: rect.width,
        height: rect.height,
        text: el.textContent?.substring(0, 50) + '...'
      };
    });
  });
  
  console.log('📊 All grid elements found:', allGridElements.length);
  allGridElements.forEach((el, i) => {
    console.log(`Grid element ${i + 1}:`, el);
  });
  
  // 3. Check the main content structure
  const mainStructure = await page.evaluate(() => {
    const main = document.querySelector('main');
    if (main) {
      const computed = window.getComputedStyle(main);
      const rect = main.getBoundingClientRect();
      return {
        tagName: main.tagName,
        classes: main.className,
        display: computed.display,
        width: rect.width,
        height: rect.height,
        childrenCount: main.children.length,
        firstChildClasses: main.children[0]?.className || 'none',
        innerHTML: main.innerHTML.substring(0, 300) + '...'
      };
    }
    return null;
  });
  
  console.log('🏗️ Main element structure:', mainStructure);
  
  // 4. Check specific content elements we expect in three columns
  const contentCheck = await page.evaluate(() => {
    const strategicTools = document.querySelector('text=Strategic Tools, [data-testid="strategic-tools"]') || 
                          Array.from(document.querySelectorAll('*')).find(el => el.textContent?.includes('Strategic Tools'));
    const strategicIntelligence = document.querySelector('text=Strategic AI Co-Pilot Ready, [data-testid="strategic-intelligence"]') ||
                                  Array.from(document.querySelectorAll('*')).find(el => el.textContent?.includes('Strategic AI Co-Pilot'));
    const competitiveLandscape = document.querySelector('text=Competitive Landscape, [data-testid="competitive-landscape"]') ||
                                Array.from(document.querySelectorAll('*')).find(el => el.textContent?.includes('Competitive Landscape'));
    
    const getElementInfo = (el) => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const parent = el.parentElement;
      const parentRect = parent?.getBoundingClientRect();
      return {
        text: el.textContent?.substring(0, 30),
        x: rect.x,
        y: rect.y,
        width: rect.width,
        parentTag: parent?.tagName,
        parentClasses: parent?.className,
        parentWidth: parentRect?.width,
        parentDisplay: parent ? window.getComputedStyle(parent).display : null
      };
    };
    
    return {
      strategicTools: getElementInfo(strategicTools),
      strategicIntelligence: getElementInfo(strategicIntelligence),
      competitiveLandscape: getElementInfo(competitiveLandscape)
    };
  });
  
  console.log('📍 Content element positions:', contentCheck);
  
  // 5. Take a screenshot for visual reference
  await page.screenshot({ 
    path: 'debug-dashboard-layout.png', 
    fullPage: true 
  });
  
  console.log('📸 Screenshot saved as debug-dashboard-layout.png');
  
  // 6. Check Tailwind CSS classes are working
  const tailwindTest = await page.evaluate(() => {
    // Create a test element to see if Tailwind is working
    const testEl = document.createElement('div');
    testEl.className = 'grid grid-cols-3 gap-6';
    document.body.appendChild(testEl);
    
    const computed = window.getComputedStyle(testEl);
    const result = {
      display: computed.display,
      gridTemplateColumns: computed.gridTemplateColumns,
      gap: computed.gap
    };
    
    document.body.removeChild(testEl);
    return result;
  });
  
  console.log('🎨 Tailwind CSS test (grid grid-cols-3):', tailwindTest);
  
  // This test is for debugging only - always pass
  expect(true).toBe(true);
});