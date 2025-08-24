#!/usr/bin/env node

/**
 * PM33 Build Test Script
 * Tests Next.js builds in isolated environment with detailed error capture
 * 
 * Features:
 * - Production build simulation
 * - Detailed error parsing and categorization
 * - Build artifact validation
 * - Performance metrics
 * - Rollback recommendations
 */

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

class BuildTester {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.buildMetrics = {};
    this.buildOutput = '';
    this.buildSuccess = false;
  }

  async runBuildTest() {
    console.log('🔨 PM33 Build Test Starting...\n');
    
    const startTime = performance.now();
    
    try {
      // Phase 1: Pre-build environment check
      await this.checkBuildEnvironment();
      
      // Phase 2: Clean build test
      await this.runCleanBuild();
      
      // Phase 3: Validate build artifacts
      await this.validateBuildArtifacts();
      
      // Phase 4: Test production server startup
      await this.testProductionServer();
      
    } catch (error) {
      this.errors.push(`❌ Build test failed: ${error.message}`);
    }
    
    const endTime = performance.now();
    this.buildMetrics.totalTime = Math.round(endTime - startTime);
    
    this.generateReport();
    return this.buildSuccess && this.errors.length === 0;
  }
  
  async checkBuildEnvironment() {
    console.log('🔍 Checking build environment...');
    
    // Check Node.js version
    const nodeVersion = process.version;
    console.log(`   Node.js version: ${nodeVersion}`);
    
    // Check dependencies
    if (!fs.existsSync('node_modules')) {
      this.errors.push('❌ node_modules not found. Run npm install first.');
      return;
    }
    
    // Check Next.js version
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const nextVersion = packageJson.dependencies?.next || 'Not found';
      console.log(`   Next.js version: ${nextVersion}`);
    } catch (error) {
      this.warnings.push('⚠️  Could not read package.json');
    }
    
    // Check for common missing files
    const requiredFiles = ['next.config.js', 'tailwind.config.js'];
    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        this.warnings.push(`⚠️  Missing config file: ${file}`);
      }
    }
    
    console.log('✅ Environment check complete\n');
  }
  
  async runCleanBuild() {
    console.log('🧹 Running clean build...');
    
    // Clean previous builds
    if (fs.existsSync('.next')) {
      console.log('   Cleaning .next directory...');
      await this.execCommand('rm -rf .next');
    }
    
    // Run build with detailed output capture
    const buildStartTime = performance.now();
    
    try {
      const result = await this.execCommand('npm run build', { 
        maxBuffer: 1024 * 1024 * 10, // 10MB buffer
        timeout: 300000 // 5 minute timeout
      });
      
      this.buildOutput = result.stdout + result.stderr;
      this.buildSuccess = true;
      
      const buildEndTime = performance.now();
      this.buildMetrics.buildTime = Math.round(buildEndTime - buildStartTime);
      
      console.log(`✅ Build completed in ${this.buildMetrics.buildTime}ms`);
      
      // Parse build output for insights
      this.parseBuildOutput();
      
    } catch (error) {
      this.buildSuccess = false;
      this.buildOutput = error.stdout + error.stderr;
      
      console.log('❌ Build failed');
      this.parseBuildErrors();
    }
  }
  
  parseBuildOutput() {
    const lines = this.buildOutput.split('\n');
    
    // Extract page generation info
    const pageRegex = /Generating static pages \((\d+)\/(\d+)\)/;
    for (const line of lines) {
      const match = line.match(pageRegex);
      if (match) {
        this.buildMetrics.pagesGenerated = parseInt(match[2]);
      }
    }
    
    // Look for warnings
    for (const line of lines) {
      if (line.includes('warn') || line.includes('WARNING')) {
        this.warnings.push(`⚠️  Build warning: ${line.trim()}`);
      }
    }
    
    // Extract build size info
    if (this.buildOutput.includes('First Load JS')) {
      console.log('   Build size analysis available');
      this.buildMetrics.hasSizeAnalysis = true;
    }
  }
  
  parseBuildErrors() {
    const lines = this.buildOutput.split('\n');
    const errorCategories = {
      css: [],
      typescript: [],
      component: [],
      import: [],
      other: []
    };
    
    for (const line of lines) {
      const cleanLine = line.trim();
      
      if (cleanLine.includes('Cannot apply unknown utility class')) {
        errorCategories.css.push(this.extractTailwindError(cleanLine));
      } else if (cleanLine.includes('Element type is invalid')) {
        errorCategories.component.push('React component import/export error');
      } else if (cleanLine.includes('Cannot resolve module') || cleanLine.includes('Module not found')) {
        errorCategories.import.push(this.extractImportError(cleanLine));
      } else if (cleanLine.includes('TypeScript')) {
        errorCategories.typescript.push(cleanLine);
      } else if (cleanLine.includes('Error:') || cleanLine.includes('error')) {
        errorCategories.other.push(cleanLine);
      }
    }
    
    // Report categorized errors
    this.reportCategorizedErrors(errorCategories);
  }
  
  extractTailwindError(line) {
    const match = line.match(/`([^`]+)`/);
    return match ? match[1] : 'Unknown utility class';
  }
  
  extractImportError(line) {
    const match = line.match(/'([^']+)'/);
    return match ? `Cannot resolve: ${match[1]}` : 'Import error';
  }
  
  reportCategorizedErrors(categories) {
    if (categories.css.length > 0) {
      this.errors.push(`❌ CSS Errors (${categories.css.length}):`);
      categories.css.forEach(error => {
        this.errors.push(`   • Invalid Tailwind class: ${error}`);
      });
    }
    
    if (categories.component.length > 0) {
      this.errors.push(`❌ Component Errors (${categories.component.length}):`);
      categories.component.forEach(error => {
        this.errors.push(`   • ${error}`);
      });
    }
    
    if (categories.import.length > 0) {
      this.errors.push(`❌ Import Errors (${categories.import.length}):`);
      categories.import.forEach(error => {
        this.errors.push(`   • ${error}`);
      });
    }
    
    if (categories.typescript.length > 0) {
      this.errors.push(`❌ TypeScript Errors (${categories.typescript.length}):`);
      categories.typescript.slice(0, 5).forEach(error => {
        this.errors.push(`   • ${error}`);
      });
    }
    
    if (categories.other.length > 0) {
      this.errors.push(`❌ Other Errors (${categories.other.length}):`);
      categories.other.slice(0, 3).forEach(error => {
        this.errors.push(`   • ${error}`);
      });
    }
  }
  
  async validateBuildArtifacts() {
    console.log('📦 Validating build artifacts...');
    
    if (!fs.existsSync('.next')) {
      this.errors.push('❌ .next directory not found after build');
      return;
    }
    
    // Check for essential build files
    const requiredArtifacts = [
      '.next/build-manifest.json',
      '.next/static',
      '.next/server'
    ];
    
    for (const artifact of requiredArtifacts) {
      if (!fs.existsSync(artifact)) {
        this.warnings.push(`⚠️  Missing build artifact: ${artifact}`);
      }
    }
    
    // Check build manifest
    if (fs.existsSync('.next/build-manifest.json')) {
      try {
        const manifest = JSON.parse(fs.readFileSync('.next/build-manifest.json', 'utf8'));
        this.buildMetrics.routes = Object.keys(manifest.pages || {}).length;
        console.log(`   Found ${this.buildMetrics.routes} routes`);
      } catch (error) {
        this.warnings.push('⚠️  Could not parse build manifest');
      }
    }
    
    console.log('✅ Build artifacts validated\n');
  }
  
  async testProductionServer() {
    console.log('🚀 Testing production server startup...');
    
    if (!this.buildSuccess) {
      console.log('   Skipping server test due to build failure');
      return;
    }
    
    try {
      // Test that the server can start (timeout after 10 seconds)
      const result = await this.execCommand('timeout 10 npm start', { 
        maxBuffer: 1024 * 1024,
        timeout: 15000
      });
      
      console.log('✅ Production server starts successfully');
      
    } catch (error) {
      if (error.code === 'TIMEOUT' || error.signal === 'SIGTERM') {
        console.log('✅ Production server started (timed out as expected)');
      } else {
        this.warnings.push('⚠️  Production server startup issues detected');
      }
    }
  }
  
  async execCommand(command, options = {}) {
    return new Promise((resolve, reject) => {
      exec(command, options, (error, stdout, stderr) => {
        if (error) {
          error.stdout = stdout;
          error.stderr = stderr;
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }
  
  generateReport() {
    console.log('\n📊 Build Test Report');
    console.log('=' .repeat(50));
    console.log(`🔨 Build Status: ${this.buildSuccess ? '✅ SUCCESS' : '❌ FAILED'}`);
    console.log(`⏱️  Total Time: ${this.buildMetrics.totalTime}ms`);
    console.log(`⏱️  Build Time: ${this.buildMetrics.buildTime || 'N/A'}ms`);
    console.log(`📄 Pages Generated: ${this.buildMetrics.pagesGenerated || 'Unknown'}`);
    console.log(`🛣️  Routes Found: ${this.buildMetrics.routes || 'Unknown'}`);
    console.log(`❌ Errors: ${this.errors.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n🚨 BUILD ERRORS:');
      this.errors.forEach(error => console.log(error));
    }
    
    if (this.warnings.length > 0 && process.env.VERBOSE) {
      console.log('\n⚠️  BUILD WARNINGS:');
      this.warnings.slice(0, 10).forEach(warning => console.log(warning));
    }
    
    if (this.buildSuccess && this.errors.length === 0) {
      console.log('\n✅ Build test passed! Ready for deployment.');
      console.log('\n🚀 Deployment Command:');
      console.log('   vercel --prod');
    } else {
      console.log('\n❌ Build test failed! Do not deploy.');
      console.log('\n🔧 Recommended Actions:');
      
      if (this.buildOutput.includes('Cannot apply unknown utility class')) {
        console.log('   1. Run: node scripts/validate-css.js');
        console.log('   2. Fix invalid Tailwind classes');
      }
      
      if (this.buildOutput.includes('Element type is invalid')) {
        console.log('   1. Run: node scripts/validate-components.js');
        console.log('   2. Fix component import/export issues');
      }
      
      console.log('   3. Re-run: npm run test:build');
    }
    
    console.log('=' .repeat(50));
    
    // Save detailed build log for analysis
    if (this.buildOutput) {
      const logFile = `.build-test-${Date.now()}.log`;
      fs.writeFileSync(logFile, this.buildOutput);
      console.log(`📝 Detailed build log saved: ${logFile}`);
    }
  }
}

// CLI execution
if (require.main === module) {
  const tester = new BuildTester();
  tester.runBuildTest().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('❌ Build test failed:', error);
    process.exit(1);
  });
}

module.exports = BuildTester;