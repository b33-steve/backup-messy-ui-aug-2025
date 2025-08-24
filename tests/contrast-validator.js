/**
 * PM33 Contrast Validator
 * Lightweight utility for validating WCAG contrast compliance
 * Can be run in browser console or as a standalone script
 */

class ContrastValidator {
  constructor() {
    this.WCAG_STANDARDS = {
      AA_NORMAL: 4.5,
      AA_LARGE: 3.0,
      AAA_NORMAL: 7.0,
      AAA_LARGE: 4.5
    };
    
    this.results = [];
  }

  /**
   * Convert RGB color string to relative luminance
   */
  getRGBFromString(colorStr) {
    const match = colorStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return null;
    
    return [
      parseInt(match[1]),
      parseInt(match[2]),
      parseInt(match[3])
    ];
  }

  /**
   * Calculate relative luminance for RGB values
   */
  getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  /**
   * Calculate contrast ratio between two colors
   */
  getContrastRatio(color1, color2) {
    const rgb1 = this.getRGBFromString(color1);
    const rgb2 = this.getRGBFromString(color2);
    
    if (!rgb1 || !rgb2) return 0;
    
    const lum1 = this.getLuminance(...rgb1);
    const lum2 = this.getLuminance(...rgb2);
    
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Get effective background color (including inherited backgrounds)
   */
  getEffectiveBackgroundColor(element) {
    let current = element;
    
    while (current && current !== document.body) {
      const styles = window.getComputedStyle(current);
      const bgColor = styles.backgroundColor;
      
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        return bgColor;
      }
      
      current = current.parentElement;
    }
    
    return 'rgb(255, 255, 255)'; // Default to white
  }

  /**
   * Test contrast for a specific element
   */
  testElement(element, label = '') {
    const styles = window.getComputedStyle(element);
    const textColor = styles.color;
    const bgColor = this.getEffectiveBackgroundColor(element);
    
    const contrastRatio = this.getContrastRatio(textColor, bgColor);
    const fontSize = parseFloat(styles.fontSize);
    const isLarge = fontSize >= 18; // 18px+ is considered large text
    
    const result = {
      element: element,
      label: label || element.tagName + (element.className ? '.' + element.className : ''),
      textColor: textColor,
      backgroundColor: bgColor,
      contrastRatio: Math.round(contrastRatio * 100) / 100,
      fontSize: fontSize,
      isLarge: isLarge,
      passes: {
        AA: contrastRatio >= (isLarge ? this.WCAG_STANDARDS.AA_LARGE : this.WCAG_STANDARDS.AA_NORMAL),
        AAA: contrastRatio >= (isLarge ? this.WCAG_STANDARDS.AAA_LARGE : this.WCAG_STANDARDS.AAA_NORMAL)
      }
    };
    
    this.results.push(result);
    return result;
  }

  /**
   * Test all PM33 critical components
   */
  testPM33Components() {
    console.log('🔍 PM33 Contrast Validation Starting...\n');
    
    const criticalSelectors = [
      // Strategic Tools Section
      { selector: '[class*="CardTitle"]:contains("Strategic Tools")', label: 'Strategic Tools Header' },
      { selector: 'button:has-text("Strategic Chat")', label: 'Strategic Chat Button' },
      { selector: 'button:has-text("Workflow Execution")', label: 'Workflow Execution Button' },
      { selector: 'button:has-text("Analytics")', label: 'Analytics Button' },
      { selector: 'button:has-text("OKR Planning")', label: 'OKR Planning Button' },
      
      // Company Context Section
      { selector: '[class*="CardTitle"]:contains("Company Context")', label: 'Company Context Header' },
      { selector: 'span:contains("Company Profile")', label: 'Company Profile Item' },
      { selector: 'span:contains("Current Priorities")', label: 'Current Priorities Item' },
      { selector: 'span:contains("Competitive Intel")', label: 'Competitive Intel Item' },
      { selector: 'span:contains("Team Resources")', label: 'Team Resources Item' },
      
      // AI Teams Section
      { selector: '.text-blue-600:contains("Active")', label: 'Strategic Intelligence Status' },
      { selector: '.text-green-600:contains("Ready")', label: 'Workflow Execution Status' },
      { selector: '.text-purple-600:contains("Learning")', label: 'Data Intelligence Status' },
      { selector: '.text-orange-600:contains("Standby")', label: 'Communication Status' },
      
      // Navigation
      { selector: 'nav a', label: 'Navigation Links' },
      { selector: 'button:contains("Steve Saper")', label: 'User Info Button' },
      
      // Main Content
      { selector: 'h1:contains("PMO Command Center")', label: 'Main Heading' },
      { selector: '.text-muted-foreground', label: 'Secondary Text' }
    ];

    this.results = [];
    let passCount = 0;
    let totalCount = 0;

    criticalSelectors.forEach(({ selector, label }) => {
      // Use modern querySelector that works with pseudo-selectors
      let elements;
      
      if (selector.includes(':contains(')) {
        // Handle :contains pseudo-selector manually
        const [baseSelector, containsText] = selector.split(':contains(');
        const text = containsText.replace(/[()'"]/g, '');
        elements = Array.from(document.querySelectorAll(baseSelector)).filter(el => 
          el.textContent && el.textContent.includes(text)
        );
      } else {
        elements = Array.from(document.querySelectorAll(selector));
      }

      elements.forEach((element, index) => {
        const elementLabel = elements.length > 1 ? `${label} ${index + 1}` : label;
        const result = this.testElement(element, elementLabel);
        
        totalCount++;
        if (result.passes.AA) passCount++;
        
        // Log result with color coding
        const status = result.passes.AAA ? '🟢' : result.passes.AA ? '🟡' : '🔴';
        console.log(`${status} ${elementLabel}: ${result.contrastRatio}:1 (AA: ${result.passes.AA ? 'PASS' : 'FAIL'}, AAA: ${result.passes.AAA ? 'PASS' : 'FAIL'})`);
        
        if (!result.passes.AA) {
          console.log(`   ⚠️  Text: ${result.textColor} on Background: ${result.backgroundColor}`);
        }
      });
    });

    console.log(`\n📊 Summary: ${passCount}/${totalCount} elements pass WCAG AA (${Math.round(passCount/totalCount*100)}%)\n`);

    // Report theme-specific issues
    const currentTheme = this.detectCurrentTheme();
    console.log(`🎨 Current Theme: ${currentTheme}`);
    
    return this.results;
  }

  /**
   * Detect current PM33 theme
   */
  detectCurrentTheme() {
    const body = document.body;
    const docElement = document.documentElement;
    
    if (body.className.includes('dark') || docElement.className.includes('dark')) {
      return 'Dark';
    } else if (body.className.includes('gray') || docElement.className.includes('gray')) {
      return 'Gray';
    } else {
      return 'Light';
    }
  }

  /**
   * Generate detailed report
   */
  generateReport() {
    const failingElements = this.results.filter(r => !r.passes.AA);
    
    if (failingElements.length === 0) {
      console.log('🎉 All tested elements meet WCAG AA standards!');
      return;
    }

    console.log(`\n❌ ${failingElements.length} elements failing WCAG AA:`);
    failingElements.forEach(result => {
      console.log(`\n• ${result.label}`);
      console.log(`  Contrast: ${result.contrastRatio}:1 (needs ${result.isLarge ? '3.0' : '4.5'}:1)`);
      console.log(`  Text: ${result.textColor}`);
      console.log(`  Background: ${result.backgroundColor}`);
      console.log(`  Font Size: ${result.fontSize}px ${result.isLarge ? '(Large)' : '(Normal)'}`);
      
      // Highlight the failing element
      result.element.style.outline = '3px solid red';
      setTimeout(() => {
        result.element.style.outline = '';
      }, 5000);
    });

    console.log(`\n💡 Recommendations:`);
    console.log(`- Use darker text colors for better contrast`);
    console.log(`- Use lighter background colors`);
    console.log(`- Consider making text larger (18px+) for lower contrast requirements`);
  }

  /**
   * Test all themes automatically
   */
  async testAllThemes() {
    const themes = ['light', 'dark', 'gray'];
    const themeResults = {};

    for (const theme of themes) {
      console.log(`\n🎨 Testing ${theme.toUpperCase()} theme...`);
      
      // Switch theme if toggle exists
      const themeButton = document.querySelector(`button:contains("${theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'Gray'}")`);
      if (themeButton) {
        themeButton.click();
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for theme to apply
      }
      
      const results = this.testPM33Components();
      themeResults[theme] = results;
      
      console.log(`${theme} theme: ${results.filter(r => r.passes.AA).length}/${results.length} pass AA\n`);
    }

    return themeResults;
  }
}

// Auto-run if in browser console
if (typeof window !== 'undefined') {
  window.PM33ContrastValidator = ContrastValidator;
  
  // Provide easy-to-use global function
  window.checkPM33Contrast = function() {
    const validator = new ContrastValidator();
    const results = validator.testPM33Components();
    validator.generateReport();
    return results;
  };
  
  console.log('🔍 PM33 Contrast Validator loaded!');
  console.log('📝 Run checkPM33Contrast() to test current page');
  console.log('📝 Or use: new PM33ContrastValidator().testAllThemes() for complete analysis');
}

// Export for Node.js usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContrastValidator;
}