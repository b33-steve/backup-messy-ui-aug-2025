/**
 * CSS Variable Validation System
 * Scans marketing pages for undefined CSS variables and validates theme support
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const CSS_FILE = path.join(__dirname, '..', 'app', 'globals.css');
const MARKETING_PAGES_PATTERN = path.join(__dirname, '..', 'app', '(marketing)', '**', '*.tsx');
const COMPONENT_PATTERN = path.join(__dirname, '..', 'components', 'marketing', '*.tsx');

// Extract CSS variables from globals.css
function extractDefinedVariables(cssContent) {
  const variables = new Set();
  const variableRegex = /--[\w-]+/g;
  let match;
  
  while ((match = variableRegex.exec(cssContent)) !== null) {
    variables.add(match[0]);
  }
  
  return variables;
}

// Extract CSS variable usage from JSX/TSX files
function extractUsedVariables(fileContent) {
  const variables = new Set();
  
  // Pattern for var(--variable-name)
  const varRegex = /var\((-{2}[\w-]+)\)/g;
  let match;
  
  while ((match = varRegex.exec(fileContent)) !== null) {
    variables.add(match[1]);
  }
  
  return variables;
}

// Check for theme-aware variables
function analyzeThemeSupport(cssContent) {
  const themeAnalysis = {
    lightModeVariables: new Set(),
    darkModeVariables: new Set(),
    systemThemeVariables: new Set(),
    rootVariables: new Set()
  };
  
  // Extract variables from different theme contexts
  const lightModeMatch = cssContent.match(/\.light\s*\{([^}]+)\}/s);
  if (lightModeMatch) {
    const lightVars = lightModeMatch[1].match(/--[\w-]+/g) || [];
    lightVars.forEach(v => themeAnalysis.lightModeVariables.add(v));
  }
  
  const darkModeMatch = cssContent.match(/\.dark\s*\{([^}]+)\}/s);
  if (darkModeMatch) {
    const darkVars = darkModeMatch[1].match(/--[\w-]+/g) || [];
    darkVars.forEach(v => themeAnalysis.darkModeVariables.add(v));
  }
  
  const systemThemeMatch = cssContent.match(/@media \(prefers-color-scheme: dark\)[^}]+\{([^}]+)\}/s);
  if (systemThemeMatch) {
    const systemVars = systemThemeMatch[1].match(/--[\w-]+/g) || [];
    systemVars.forEach(v => themeAnalysis.systemThemeVariables.add(v));
  }
  
  const rootMatches = cssContent.match(/:root\s*\{([^}]+)\}/gs);
  if (rootMatches) {
    rootMatches.forEach(rootMatch => {
      const rootVars = rootMatch.match(/--[\w-]+/g) || [];
      rootVars.forEach(v => themeAnalysis.rootVariables.add(v));
    });
  }
  
  return themeAnalysis;
}

// Main validation function
async function validateCSSVariables() {
  const results = {
    timestamp: new Date().toISOString(),
    definedVariables: new Set(),
    usedVariables: new Set(),
    undefinedVariables: new Set(),
    themeAnalysis: null,
    fileAnalysis: [],
    issues: [],
    summary: {}
  };
  
  console.log('🔍 Starting CSS Variable Validation...\n');
  
  // Read and analyze globals.css
  console.log('📄 Analyzing globals.css...');
  const cssContent = fs.readFileSync(CSS_FILE, 'utf8');
  results.definedVariables = extractDefinedVariables(cssContent);
  results.themeAnalysis = analyzeThemeSupport(cssContent);
  
  console.log(`  Found ${results.definedVariables.size} defined variables`);
  
  // Find all marketing files
  const marketingFiles = glob.sync(MARKETING_PAGES_PATTERN);
  const componentFiles = glob.sync(COMPONENT_PATTERN);
  const allFiles = [...marketingFiles, ...componentFiles];
  
  console.log(`\n📁 Analyzing ${allFiles.length} files for variable usage...`);
  
  // Analyze each file
  for (const filePath of allFiles) {
    const relativePath = path.relative(path.join(__dirname, '..'), filePath);
    console.log(`  📄 ${relativePath}`);
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const usedInFile = extractUsedVariables(fileContent);
    
    // Add to global used variables
    usedInFile.forEach(variable => results.usedVariables.add(variable));
    
    // Find undefined variables in this file
    const undefinedInFile = new Set();
    usedInFile.forEach(variable => {
      if (!results.definedVariables.has(variable)) {
        undefinedInFile.add(variable);
        results.undefinedVariables.add(variable);
      }
    });
    
    const fileAnalysis = {
      filePath: relativePath,
      usedVariables: Array.from(usedInFile),
      undefinedVariables: Array.from(undefinedInFile),
      variableCount: usedInFile.size,
      undefinedCount: undefinedInFile.size
    };
    
    results.fileAnalysis.push(fileAnalysis);
    
    // Create issues for undefined variables
    if (undefinedInFile.size > 0) {
      undefinedInFile.forEach(variable => {
        results.issues.push({
          type: 'undefined_variable',
          variable: variable,
          file: relativePath,
          severity: 'error',
          suggestion: getSuggestion(variable)
        });
      });
    }
  }
  
  // Check for theme-awareness issues
  console.log('\n🎨 Analyzing theme support...');
  
  const themeAwareVariables = [
    '--color-bg-primary',
    '--color-bg-secondary', 
    '--color-text-primary',
    '--gradient-text',
    '--marketing-primary',
    '--marketing-bg-primary',
    '--marketing-bg-secondary'
  ];
  
  themeAwareVariables.forEach(variable => {
    const inLight = results.themeAnalysis.lightModeVariables.has(variable);
    const inDark = results.themeAnalysis.darkModeVariables.has(variable);
    const inRoot = results.themeAnalysis.rootVariables.has(variable);
    
    if (results.usedVariables.has(variable)) {
      if (!inLight && !inDark && !inRoot) {
        results.issues.push({
          type: 'missing_variable',
          variable: variable,
          severity: 'critical',
          suggestion: `Variable ${variable} is used but not defined anywhere`
        });
      } else if (inRoot && !inLight && !inDark) {
        results.issues.push({
          type: 'theme_support_missing',
          variable: variable,
          severity: 'warning',
          suggestion: `Variable ${variable} is only defined in :root but should have theme variants`
        });
      } else if ((inLight && !inDark) || (!inLight && inDark)) {
        results.issues.push({
          type: 'incomplete_theme_support',
          variable: variable,
          severity: 'warning',
          suggestion: `Variable ${variable} is missing in ${inLight ? 'dark' : 'light'} theme`
        });
      }
    }
  });
  
  // Generate summary
  results.summary = {
    totalFiles: allFiles.length,
    definedVariablesCount: results.definedVariables.size,
    usedVariablesCount: results.usedVariables.size,
    undefinedVariablesCount: results.undefinedVariables.size,
    totalIssues: results.issues.length,
    criticalIssues: results.issues.filter(i => i.severity === 'critical').length,
    errorIssues: results.issues.filter(i => i.severity === 'error').length,
    warningIssues: results.issues.filter(i => i.severity === 'warning').length,
    mostUsedUndefined: getMostUsedUndefined(results),
    themeSupport: {
      lightModeVariables: results.themeAnalysis.lightModeVariables.size,
      darkModeVariables: results.themeAnalysis.darkModeVariables.size,
      systemThemeVariables: results.themeAnalysis.systemThemeVariables.size
    }
  };
  
  // Convert Sets to Arrays for JSON serialization
  results.definedVariables = Array.from(results.definedVariables);
  results.usedVariables = Array.from(results.usedVariables);
  results.undefinedVariables = Array.from(results.undefinedVariables);
  results.themeAnalysis.lightModeVariables = Array.from(results.themeAnalysis.lightModeVariables);
  results.themeAnalysis.darkModeVariables = Array.from(results.themeAnalysis.darkModeVariables);
  results.themeAnalysis.systemThemeVariables = Array.from(results.themeAnalysis.systemThemeVariables);
  results.themeAnalysis.rootVariables = Array.from(results.themeAnalysis.rootVariables);
  
  // Save results
  const resultsPath = path.join(__dirname, '..', 'test-results', 'css-variable-validation.json');
  const resultsDir = path.dirname(resultsPath);
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  // Print summary
  console.log('\n📊 CSS VARIABLE VALIDATION RESULTS');
  console.log('==================================');
  console.log(`Files Analyzed: ${results.summary.totalFiles}`);
  console.log(`Defined Variables: ${results.summary.definedVariablesCount}`);
  console.log(`Used Variables: ${results.summary.usedVariablesCount}`);
  console.log(`Undefined Variables: ${results.summary.undefinedVariablesCount}`);
  console.log(`Total Issues: ${results.summary.totalIssues}`);
  console.log(`  Critical: ${results.summary.criticalIssues}`);
  console.log(`  Errors: ${results.summary.errorIssues}`);
  console.log(`  Warnings: ${results.summary.warningIssues}`);
  
  if (results.summary.undefinedVariablesCount > 0) {
    console.log('\n🚨 UNDEFINED VARIABLES:');
    results.undefinedVariables.slice(0, 10).forEach(variable => {
      const usage = results.fileAnalysis
        .filter(f => f.undefinedVariables.includes(variable))
        .map(f => f.filePath);
      console.log(`  ${variable}`);
      console.log(`    Used in: ${usage.join(', ')}`);
    });
  }
  
  if (results.summary.criticalIssues > 0) {
    console.log('\n🚨 CRITICAL ISSUES:');
    results.issues
      .filter(i => i.severity === 'critical')
      .forEach(issue => {
        console.log(`  ${issue.variable}: ${issue.suggestion}`);
      });
  }
  
  console.log(`\nResults saved to: ${resultsPath}`);
  
  return results;
}

function getSuggestion(variable) {
  const suggestions = {
    '--marketing-primary': 'Add to globals.css with light/dark theme variants',
    '--marketing-bg-primary': 'Define as theme-aware background variable',
    '--marketing-bg-secondary': 'Define as secondary background variable',
    '--gradient-text': 'Should be theme-aware: white for dark backgrounds, dark for light backgrounds'
  };
  
  return suggestions[variable] || `Define ${variable} in globals.css with proper theme support`;
}

function getMostUsedUndefined(results) {
  const usage = {};
  results.fileAnalysis.forEach(file => {
    file.undefinedVariables.forEach(variable => {
      usage[variable] = (usage[variable] || 0) + 1;
    });
  });
  
  return Object.entries(usage)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([variable, count]) => ({ variable, count }));
}

// Run if called directly
if (require.main === module) {
  validateCSSVariables().catch(console.error);
}

module.exports = { validateCSSVariables };