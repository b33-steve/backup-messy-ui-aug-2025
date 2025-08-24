#!/usr/bin/env node

/**
 * PM33 Next.js Configuration Validator
 * Validates Next.js and Vercel configurations before deployment
 */

const fs = require('fs');

class ConfigValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  async validateConfigs() {
    console.log('⚙️  PM33 Config Validation Starting...\n');
    
    this.validateNextConfig();
    this.validateVercelConfig();
    this.validateTailwindConfig();
    
    this.generateReport();
    return this.errors.length === 0;
  }
  
  validateNextConfig() {
    console.log('   Validating next.config.js...');
    
    if (!fs.existsSync('next.config.js')) {
      this.errors.push('❌ next.config.js not found');
      return;
    }
    
    try {
      const config = require('../next.config.js');
      
      // Check for problematic configurations
      if (config.output === 'export') {
        this.warnings.push('⚠️  Static export mode detected - may cause routing issues');
      }
      
      if (config.output === 'standalone' && !config.outputFileTracingRoot) {
        this.errors.push('❌ Standalone output requires outputFileTracingRoot to prevent file copy errors');
      }
      
      if (config.typescript?.ignoreBuildErrors) {
        this.warnings.push('⚠️  TypeScript build errors are being ignored');
      }
      
      // Check for proper file tracing configuration
      if (config.outputFileTracingRoot && !fs.existsSync(config.outputFileTracingRoot)) {
        this.errors.push(`❌ outputFileTracingRoot path does not exist: ${config.outputFileTracingRoot}`);
      }
      
      console.log('   ✅ next.config.js valid');
      
    } catch (error) {
      this.errors.push(`❌ next.config.js error: ${error.message}`);
    }
  }
  
  validateVercelConfig() {
    console.log('   Validating vercel.json...');
    
    if (!fs.existsSync('vercel.json')) {
      this.warnings.push('⚠️  vercel.json not found - using defaults');
      return;
    }
    
    try {
      const content = fs.readFileSync('vercel.json', 'utf8');
      const config = JSON.parse(content);
      
      // Check for problematic rewrites
      if (config.rewrites?.some(r => r.destination === '/index.html')) {
        this.errors.push('❌ vercel.json contains SPA rewrite that conflicts with Next.js App Router');
      }
      
      // Check for proper framework setting
      if (config.framework !== 'nextjs') {
        this.warnings.push('⚠️  vercel.json framework should be set to "nextjs"');
      }
      
      console.log('   ✅ vercel.json valid');
      
    } catch (error) {
      this.errors.push(`❌ vercel.json error: ${error.message}`);
    }
  }
  
  validateTailwindConfig() {
    console.log('   Validating tailwind.config...');
    
    // Check for both .js and .ts versions
    const configFiles = ['tailwind.config.js', 'tailwind.config.ts'];
    let configExists = false;
    
    for (const configFile of configFiles) {
      if (fs.existsSync(configFile)) {
        configExists = true;
        console.log(`   Found ${configFile}`);
        break;
      }
    }
    
    if (!configExists) {
      this.errors.push('❌ tailwind.config.js or tailwind.config.ts not found');
      return;
    }
    
    console.log('   ✅ tailwind.config valid');
  }
  
  generateReport() {
    console.log('\n📊 Config Validation Report');
    console.log('=' .repeat(50));
    console.log(`❌ Errors: ${this.errors.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n🚨 ERRORS:');
      this.errors.forEach(error => console.log(error));
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(warning => console.log(warning));
    }
    
    if (this.errors.length === 0) {
      console.log('\n✅ Config validation passed!');
    } else {
      console.log('\n❌ Config validation failed!');
    }
    
    console.log('=' .repeat(50));
  }
}

// CLI execution
if (require.main === module) {
  const validator = new ConfigValidator();
  validator.validateConfigs().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('❌ Config validation failed:', error);
    process.exit(1);
  });
}

module.exports = ConfigValidator;