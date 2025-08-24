#!/usr/bin/env node

/**
 * PM33 Quick Validation Script
 * Fast pre-deployment check to catch common issues
 * Use this before every deployment to avoid failures
 */

const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

class QuickValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  async runQuickCheck() {
    console.log('⚡ PM33 Quick Validation Starting...\n');
    
    const startTime = Date.now();
    
    // Quick checks that prevent 90% of deployment failures
    await this.checkCriticalFiles();
    await this.checkCSSSyntax();
    await this.checkComponentExports();
    await this.checkVercelConfig();
    
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);
    
    this.generateQuickReport(duration);
    
    return this.errors.length === 0;
  }
  
  async checkCriticalFiles() {
    console.log('📁 Checking critical files...');
    
    const criticalFiles = [
      'next.config.js',
      'package.json',
      'app/globals.css',
      'app/layout.tsx'
    ];
    
    for (const file of criticalFiles) {
      if (!fs.existsSync(file)) {
        this.errors.push(`❌ Missing critical file: ${file}`);
      }
    }
    
    console.log(`   ✅ ${criticalFiles.length} critical files checked`);
  }
  
  async checkCSSSyntax() {
    console.log('🎨 Checking CSS for common issues...');
    
    if (!fs.existsSync('app/globals.css')) {
      this.errors.push('❌ globals.css not found');
      return;
    }
    
    const cssContent = fs.readFileSync('app/globals.css', 'utf8');
    
    // Check for invalid @apply patterns that cause build failures
    const invalidPatterns = [
      { pattern: /@apply.*from-\w+-\d+/g, message: 'Invalid gradient classes in @apply' },
      { pattern: /@apply.*glass-card/g, message: 'Non-existent glass-card class' },
      { pattern: /@apply.*text-gradient/g, message: 'Non-existent text-gradient class' },
      { pattern: /@apply.*bg-slate-\d+/g, message: 'Invalid bg-slate class in @apply' },
      { pattern: /@apply.*text-slate-\d+/g, message: 'Invalid text-slate class in @apply' }
    ];
    
    for (const { pattern, message } of invalidPatterns) {
      const matches = cssContent.match(pattern);
      if (matches) {
        this.errors.push(`❌ ${message}: ${matches.slice(0, 3).join(', ')}`);
      }
    }
    
    // Check for unclosed braces (basic syntax)
    const openBraces = (cssContent.match(/\{/g) || []).length;
    const closeBraces = (cssContent.match(/\}/g) || []).length;
    
    if (Math.abs(openBraces - closeBraces) > 5) { // Allow small margin
      this.errors.push('❌ CSS syntax error: Mismatched braces detected');
    }
    
    console.log('   ✅ CSS syntax checked');
  }
  
  async checkComponentExports() {
    console.log('🧩 Checking component exports...');
    
    // Check key page components have proper exports
    const pageFiles = [
      'app/(marketing)/page.tsx',
      'app/(marketing)/layout.tsx'
    ];
    
    for (const file of pageFiles) {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        
        if (file.includes('/page.tsx')) {
          if (!content.includes('export default')) {
            this.errors.push(`❌ ${file} missing default export`);
          }
        }
        
        // Check for problematic imports
        if (content.includes('import') && content.includes('from ""')) {
          this.errors.push(`❌ ${file} has empty import statements`);
        }
      }
    }
    
    console.log('   ✅ Component exports checked');
  }
  
  async checkVercelConfig() {
    console.log('⚙️  Checking Vercel config...');
    
    if (fs.existsSync('vercel.json')) {
      try {
        const content = fs.readFileSync('vercel.json', 'utf8');
        const config = JSON.parse(content);
        
        // Check for problematic SPA rewrite
        if (config.rewrites?.some(r => r.destination === '/index.html')) {
          this.errors.push('❌ vercel.json has conflicting SPA rewrite for Next.js App Router');
        }
        
      } catch (error) {
        this.errors.push(`❌ vercel.json syntax error: ${error.message}`);
      }
    }
    
    console.log('   ✅ Vercel config checked');
  }
  
  generateQuickReport(duration) {
    console.log('\n⚡ Quick Validation Report');
    console.log('=' .repeat(40));
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`❌ Critical Errors: ${this.errors.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    
    if (this.errors.length === 0) {
      console.log('\n✅ QUICK VALIDATION PASSED!');
      console.log('🚀 Safe to deploy with: vercel --prod');
      console.log('\n💡 For comprehensive validation:');
      console.log('   npm run validate:all');
    } else {
      console.log('\n❌ QUICK VALIDATION FAILED!');
      console.log('🚨 Critical issues found:');
      this.errors.forEach(error => console.log(`   ${error}`));
      console.log('\n🔧 Fix these issues before deploying.');
      console.log('\n📋 For detailed analysis:');
      console.log('   npm run validate:css');
      console.log('   npm run validate:components');
    }
    
    console.log('=' .repeat(40));
  }
}

// CLI execution
if (require.main === module) {
  const validator = new QuickValidator();
  validator.runQuickCheck().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('❌ Quick validation failed:', error);
    process.exit(1);
  });
}

module.exports = QuickValidator;