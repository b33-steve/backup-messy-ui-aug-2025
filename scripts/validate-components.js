#!/usr/bin/env node

/**
 * PM33 Component Import Validator
 * Prevents "Element type is invalid" React errors before deployment
 * 
 * Validates:
 * - Import/export integrity
 * - Component dependencies
 * - Missing imports
 * - Circular dependencies
 * - TypeScript/JavaScript compatibility
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class ComponentValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.validatedFiles = 0;
    this.componentMap = new Map(); // Track all components and their exports
    this.importGraph = new Map();  // Track import relationships
  }

  async validateAllComponents() {
    console.log('🔍 PM33 Component Validation Starting...\n');
    
    // Find all React component files
    const componentFiles = [
      'app/**/*.tsx',
      'app/**/*.jsx', 
      'components/**/*.tsx',
      'components/**/*.jsx',
      'src/**/*.tsx',
      'src/**/*.jsx'
    ];
    
    const allFiles = [];
    for (const pattern of componentFiles) {
      const matches = glob.sync(pattern, { 
        cwd: process.cwd(),
        ignore: ['node_modules/**', '.next/**', 'dist/**', '**/*.test.*', '**/*.spec.*']
      });
      allFiles.push(...matches);
    }
    
    console.log(`📁 Found ${allFiles.length} component files to validate`);
    
    // Phase 1: Build component map
    for (const file of allFiles) {
      await this.mapComponent(file);
    }
    
    // Phase 2: Validate imports
    for (const file of allFiles) {
      await this.validateFile(file);
    }
    
    // Phase 3: Check for circular dependencies
    this.detectCircularDependencies();
    
    this.generateReport();
    return this.errors.length === 0;
  }
  
  async mapComponent(filePath) {
    try {
      if (!fs.existsSync(filePath)) return;
      
      const content = fs.readFileSync(filePath, 'utf8');
      const exports = this.extractExports(content);
      
      this.componentMap.set(filePath, {
        exports: exports,
        content: content
      });
      
    } catch (error) {
      this.errors.push(`❌ Error mapping ${filePath}: ${error.message}`);
    }
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
      
      // Validate imports
      this.validateImports(filePath, content);
      
      // Validate exports
      this.validateExports(filePath, content);
      
      // Check for common React patterns
      this.validateReactPatterns(filePath, content);
      
      // Check for Next.js specific issues
      this.validateNextjsPatterns(filePath, content);
      
    } catch (error) {
      this.errors.push(`❌ Error validating ${filePath}: ${error.message}`);
    }
  }
  
  validateImports(filePath, content) {
    // Extract all imports
    const importRegex = /import\s+(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)?\s*(?:,\s*\{[^}]*\})?\s*from\s+['"`]([^'"`]+)['"`]/g;
    let match;
    
    const imports = [];
    while ((match = importRegex.exec(content)) !== null) {
      imports.push({
        line: this.getLineNumber(content, match.index),
        importPath: match[1],
        fullMatch: match[0]
      });
    }
    
    this.importGraph.set(filePath, imports.map(i => i.importPath));
    
    for (const importInfo of imports) {
      const { line, importPath, fullMatch } = importInfo;
      
      // Check for relative imports
      if (importPath.startsWith('./') || importPath.startsWith('../')) {
        const resolvedPath = this.resolveImportPath(filePath, importPath);
        
        if (!this.fileExists(resolvedPath)) {
          this.errors.push(
            `❌ ${filePath}:${line} - Cannot resolve import: "${importPath}"`
          );
        }
      }
      
      // Check for known problematic imports
      if (importPath.includes('@mantine/core') && !this.checkMantineImport(fullMatch)) {
        this.warnings.push(
          `⚠️  ${filePath}:${line} - Potential Mantine import issue: ${fullMatch}`
        );
      }
      
      // Check for missing React import in JSX files (Next.js 13+ doesn't require this)
      if (content.includes('<') && content.includes('>') && 
          !imports.some(i => i.importPath === 'react' || i.fullMatch.includes('React')) &&
          !filePath.includes('app/') && !filePath.includes('components/')) {
        this.warnings.push(
          `⚠️  ${filePath}:${line} - React import not found (may be auto-imported by Next.js)`
        );
      }
    }
  }
  
  validateExports(filePath, content) {
    const exports = this.extractExports(content);
    
    // Check for default export in page components
    if (filePath.includes('/page.tsx') || filePath.includes('/page.jsx')) {
      if (!exports.hasDefault) {
        this.errors.push(
          `❌ ${filePath} - Page component must have default export`
        );
      }
    }
    
    // Check for named exports without default in component files
    if (exports.named.length > 0 && !exports.hasDefault && 
        !filePath.includes('lib/') && !filePath.includes('utils/')) {
      this.warnings.push(
        `⚠️  ${filePath} - Component file has named exports but no default export`
      );
    }
  }
  
  validateReactPatterns(filePath, content) {
    // Check for 'use client' directive in interactive components
    if (this.hasInteractiveElements(content) && !content.includes("'use client'")) {
      this.warnings.push(
        `⚠️  ${filePath} - Component has interactive elements but missing 'use client' directive`
      );
    }
    
    // Check for hooks usage outside components
    const hookRegex = /use[A-Z][a-zA-Z]*/g;
    const hooks = content.match(hookRegex) || [];
    
    if (hooks.length > 0 && !this.isComponentFile(content)) {
      this.warnings.push(
        `⚠️  ${filePath} - React hooks found in non-component file`
      );
    }
    
    // Check for JSX without proper imports
    if (content.includes('JSX.Element') && !content.includes('import') && 
        !content.includes('React')) {
      this.errors.push(
        `❌ ${filePath} - JSX.Element type used without React import`
      );
    }
  }
  
  validateNextjsPatterns(filePath, content) {
    // Check for Next.js specific imports
    if (content.includes('next/') && filePath.includes('components/')) {
      // This is fine, components can use Next.js features
    }
    
    // Check for server-side only code in client components
    if (content.includes("'use client'") && content.includes('fs.')) {
      this.errors.push(
        `❌ ${filePath} - Client component cannot use server-side APIs (fs)`
      );
    }
    
    // Check for missing metadata in layout files
    if (filePath.includes('layout.tsx') && !content.includes('metadata') && 
        !content.includes('generateMetadata')) {
      this.warnings.push(
        `⚠️  ${filePath} - Layout file missing metadata export`
      );
    }
  }
  
  detectCircularDependencies() {
    const visited = new Set();
    const recursionStack = new Set();
    
    for (const file of this.importGraph.keys()) {
      if (!visited.has(file)) {
        this.dfsCircularCheck(file, visited, recursionStack, []);
      }
    }
  }
  
  dfsCircularCheck(file, visited, recursionStack, path) {
    visited.add(file);
    recursionStack.add(file);
    path.push(file);
    
    const imports = this.importGraph.get(file) || [];
    
    for (const importPath of imports) {
      const resolvedImport = this.resolveImportPath(file, importPath);
      
      if (this.importGraph.has(resolvedImport)) {
        if (!visited.has(resolvedImport)) {
          this.dfsCircularCheck(resolvedImport, visited, recursionStack, [...path]);
        } else if (recursionStack.has(resolvedImport)) {
          const cycle = [...path, resolvedImport];
          this.errors.push(
            `❌ Circular dependency detected: ${cycle.join(' → ')}`
          );
        }
      }
    }
    
    recursionStack.delete(file);
  }
  
  // Helper methods
  extractExports(content) {
    const defaultExport = /export\s+default/.test(content);
    const namedExports = content.match(/export\s+(?:const|function|class)\s+(\w+)/g) || [];
    
    return {
      hasDefault: defaultExport,
      named: namedExports.map(exp => exp.match(/export\s+(?:const|function|class)\s+(\w+)/)[1])
    };
  }
  
  hasInteractiveElements(content) {
    return /onClick|onChange|onSubmit|useState|useEffect/.test(content);
  }
  
  isComponentFile(content) {
    return /function\s+[A-Z]\w*|const\s+[A-Z]\w*.*=.*=>|class\s+[A-Z]\w*.*extends.*Component/.test(content);
  }
  
  checkMantineImport(importStatement) {
    // Check for proper Mantine import structure
    return importStatement.includes('{') && importStatement.includes('}');
  }
  
  resolveImportPath(fromFile, importPath) {
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      const fromDir = path.dirname(fromFile);
      const resolved = path.resolve(fromDir, importPath);
      
      // Try different extensions
      for (const ext of ['.tsx', '.jsx', '.ts', '.js']) {
        if (fs.existsSync(resolved + ext)) {
          return resolved + ext;
        }
      }
      
      // Try index files
      for (const ext of ['.tsx', '.jsx', '.ts', '.js']) {
        const indexFile = path.join(resolved, 'index' + ext);
        if (fs.existsSync(indexFile)) {
          return indexFile;
        }
      }
    }
    
    return importPath;
  }
  
  fileExists(filePath) {
    return fs.existsSync(filePath);
  }
  
  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  }
  
  generateReport() {
    console.log('\n📊 Component Validation Report');
    console.log('=' .repeat(50));
    console.log(`📁 Files validated: ${this.validatedFiles}`);
    console.log(`🧩 Components mapped: ${this.componentMap.size}`);
    console.log(`❌ Errors: ${this.errors.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n🚨 ERRORS (Must fix before deployment):');
      this.errors.forEach(error => console.log(error));
    }
    
    if (this.warnings.length > 0 && process.env.VERBOSE) {
      console.log('\n⚠️  WARNINGS (Recommended to fix):');
      this.warnings.slice(0, 10).forEach(warning => console.log(warning));
      if (this.warnings.length > 10) {
        console.log(`   ... and ${this.warnings.length - 10} more warnings`);
      }
    }
    
    if (this.errors.length === 0) {
      console.log('\n✅ Component validation passed! No critical issues found.');
    } else {
      console.log('\n❌ Component validation failed! Fix errors before deploying.');
      console.log('\n💡 Quick fixes:');
      console.log('   • Fix missing import statements');
      console.log('   • Add "use client" directive for interactive components');
      console.log('   • Ensure all page components have default exports');
      console.log('   • Resolve circular dependencies');
    }
    
    console.log('=' .repeat(50));
  }
}

// CLI execution
if (require.main === module) {
  const validator = new ComponentValidator();
  validator.validateAllComponents().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('❌ Component validation failed:', error);
    process.exit(1);
  });
}

module.exports = ComponentValidator;