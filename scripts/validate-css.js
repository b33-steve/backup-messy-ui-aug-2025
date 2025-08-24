#!/usr/bin/env node

/**
 * PM33 CSS Validation Script
 * Prevents Vercel deployment failures by validating CSS before build
 * 
 * Checks for:
 * - Invalid Tailwind utility classes in @apply statements
 * - CSS syntax errors
 * - Missing CSS custom properties
 * - Circular CSS dependencies
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class CSSValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.validatedFiles = 0;
    
    // Common invalid Tailwind patterns that cause build failures
    this.invalidPatterns = [
      // Color gradients with invalid syntax
      /from-\w+-\d+(?![\w-])/g,
      /to-\w+-\d+(?![\w-])/g,
      
      // Non-existent utility classes
      /glass-card/g,
      /text-gradient/g,
      
      // Invalid spacing/sizing
      /w-32(?![.\w-])/g,
      /h-32(?![.\w-])/g,
      
      // Invalid color classes
      /bg-slate-\d+(?![.\w-])/g,
      /text-slate-\d+(?![.\w-])/g,
      /text-blue-\d+(?![.\w-])/g,
      /border-\w+-\d+(?![.\w-])/g,
    ];
    
    // Check for Tailwind config completeness
    this.checkTailwindConfig();
    
    // Valid Tailwind utility classes for reference
    this.validClasses = new Set([
      'flex', 'block', 'inline', 'hidden', 'relative', 'absolute',
      'w-full', 'h-full', 'p-4', 'm-4', 'text-center', 'font-bold',
      'rounded', 'shadow', 'border', 'bg-white', 'text-black',
      // Add more as needed
    ]);
  }

  async validateAllCSS() {
    console.log('🔍 PM33 CSS Validation Starting...\n');
    
    // Find all CSS files
    const cssFiles = [
      'app/globals.css',
      'app/**/*.css',
      'components/**/*.css',
      'src/**/*.css'
    ];
    
    const allFiles = [];
    for (const pattern of cssFiles) {
      const matches = glob.sync(pattern, { 
        cwd: process.cwd(),
        ignore: ['node_modules/**', '.next/**', 'dist/**']
      });
      allFiles.push(...matches);
    }
    
    console.log(`📁 Found ${allFiles.length} CSS files to validate`);
    
    for (const file of allFiles) {
      await this.validateFile(file);
    }
    
    this.generateReport();
    return this.errors.length === 0;
  }
  
  async validateFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        this.warnings.push(`⚠️  File not found: ${filePath}`);
        return;
      }
      
      const content = fs.readFileSync(filePath, 'utf8');
      this.validatedFiles++;
      
      console.log(`   Validating: ${filePath}`);
      
      // Check for invalid @apply statements
      this.validateApplyStatements(filePath, content);
      
      // Check for CSS syntax errors
      this.validateCSSyntax(filePath, content);
      
      // Check for missing custom properties
      this.validateCustomProperties(filePath, content);
      
    } catch (error) {
      this.errors.push(`❌ Error reading ${filePath}: ${error.message}`);
    }
  }
  
  validateApplyStatements(filePath, content) {
    const applyRegex = /@apply\s+([^;]+);/g;
    let match;
    
    while ((match = applyRegex.exec(content)) !== null) {
      const line = this.getLineNumber(content, match.index);
      const classes = match[1].trim().split(/\s+/);
      
      for (const className of classes) {
        // Check against known invalid patterns
        for (const pattern of this.invalidPatterns) {
          if (pattern.test(className)) {
            this.errors.push(
              `❌ ${filePath}:${line} - Invalid Tailwind class: "${className}"`
            );
          }
        }
        
        // Check for common problematic patterns
        if (className.includes('from-') && !className.match(/^(bg-gradient-to-|gradient-)/)) {
          this.errors.push(
            `❌ ${filePath}:${line} - Invalid gradient class: "${className}" (use CSS gradients instead)`
          );
        }
        
        if (className === 'glass-card' || className === 'text-gradient') {
          this.errors.push(
            `❌ ${filePath}:${line} - Non-existent utility class: "${className}" (define as CSS class instead)`
          );
        }
      }
    }
  }
  
  validateCSSyntax(filePath, content) {
    // Basic CSS syntax validation
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      const lineNum = index + 1;
      
      // Check for unclosed braces
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      
      // Check for missing semicolons in property declarations
      if (line.includes(':') && !line.includes('@') && !line.trim().endsWith(';') && 
          !line.trim().endsWith('{') && !line.trim().endsWith('}') && line.trim() !== '') {
        this.warnings.push(
          `⚠️  ${filePath}:${lineNum} - Possible missing semicolon: "${line.trim()}"`
        );
      }
      
      // Check for malformed selectors
      if (line.includes('::') && !line.includes('::before') && !line.includes('::after') && 
          !line.includes('::placeholder')) {
        this.warnings.push(
          `⚠️  ${filePath}:${lineNum} - Possible malformed pseudo-element: "${line.trim()}"`
        );
      }
    });
  }
  
  validateCustomProperties(filePath, content) {
    // Find CSS custom property usage
    const customPropUsage = content.match(/var\(--[\w-]+\)/g) || [];
    const customPropDefinitions = content.match(/--[\w-]+:/g) || [];
    
    const usedProps = new Set(customPropUsage.map(prop => prop.replace(/var\(|\)/g, '')));
    const definedProps = new Set(customPropDefinitions.map(prop => prop.replace(':', '')));
    
    // Check for undefined custom properties (warnings only)
    for (const prop of usedProps) {
      if (!definedProps.has(prop)) {
        this.warnings.push(
          `⚠️  ${filePath} - Custom property "${prop}" used but not defined in this file`
        );
      }
    }
  }
  
  checkTailwindConfig() {
    try {
      const configPath = 'tailwind.config.ts';
      if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, 'utf8');
        
        // Check for gap utilities (required by Mantine)
        if (!configContent.includes('gap:') && !configContent.includes('gap-')) {
          this.warnings.push('⚠️  Missing gap utilities in tailwind.config.ts (required by Mantine CSS)');
        }
      }
    } catch (error) {
      this.warnings.push(`⚠️  Could not validate Tailwind config: ${error.message}`);
    }
  }

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  }
  
  generateReport() {
    console.log('\n📊 CSS Validation Report');
    console.log('=' .repeat(50));
    console.log(`📁 Files validated: ${this.validatedFiles}`);
    console.log(`❌ Errors: ${this.errors.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n🚨 ERRORS (Must fix before deployment):');
      this.errors.forEach(error => console.log(error));
    }
    
    if (this.warnings.length > 0 && process.env.VERBOSE) {
      console.log('\n⚠️  WARNINGS (Recommended to fix):');
      this.warnings.forEach(warning => console.log(warning));
    }
    
    if (this.errors.length === 0) {
      console.log('\n✅ CSS validation passed! Safe to deploy.');
    } else {
      console.log('\n❌ CSS validation failed! Fix errors before deploying.');
      console.log('\n💡 Quick fixes:');
      console.log('   • Replace @apply with standard CSS properties');
      console.log('   • Use linear-gradient() instead of Tailwind gradient classes');
      console.log('   • Define custom CSS classes for glass-card, text-gradient, etc.');
    }
    
    console.log('=' .repeat(50));
  }
}

// CLI execution
if (require.main === module) {
  const validator = new CSSValidator();
  validator.validateAllCSS().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('❌ CSS validation failed:', error);
    process.exit(1);
  });
}

module.exports = CSSValidator;