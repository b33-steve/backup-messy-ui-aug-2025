/**
 * PM33 Dashboard Continuous Testing Configuration
 * Sets up file watching and automated test execution
 * 
 * Usage:
 * node tests/watch-config.js  # Start continuous testing
 */

const { spawn } = require('child_process')
const chokidar = require('chokidar')
const path = require('path')

// Configuration
const WATCH_PATHS = [
  'app/(app)/dashboard/page.tsx',
  'app/(app)/layout.tsx', 
  'components/**/*.tsx',
  'app/globals.css',
  'dashboard-complete-demo.html'
]

const TEST_COMMAND = 'npx playwright test'
const UI_VALIDATION_TESTS = [
  'tests/dashboard-visual-regression.spec.ts',
  'tests/dashboard-content-validation.spec.ts', 
  'tests/continuous-ui-validation.spec.ts'
]

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

// Utility functions
function log(message, color = colors.reset) {
  const timestamp = new Date().toLocaleTimeString()
  console.log(`${color}[${timestamp}] ${message}${colors.reset}`)
}

function logSection(title) {
  console.log(`\n${colors.cyan}${colors.bright}${'='.repeat(60)}`)
  console.log(`  PM33 Dashboard UI Validation - ${title}`)
  console.log(`${'='.repeat(60)}${colors.reset}\n`)
}

// Test runner function
function runUIValidationTests(changedFile = null) {
  logSection('Running UI Validation Tests')
  
  if (changedFile) {
    log(`Triggered by change in: ${changedFile}`, colors.yellow)
  }
  
  log('Starting comprehensive UI validation...', colors.blue)
  
  // Run the continuous validation test which updates UI-Issues.md
  const testProcess = spawn('npx', [
    'playwright', 
    'test', 
    'tests/continuous-ui-validation.spec.ts',
    '--reporter=list',
    '--project=chromium'
  ], {
    stdio: 'pipe',
    cwd: process.cwd()
  })
  
  let output = ''
  let errorOutput = ''
  
  testProcess.stdout.on('data', (data) => {
    output += data.toString()
    process.stdout.write(data)
  })
  
  testProcess.stderr.on('data', (data) => {
    errorOutput += data.toString()
    process.stderr.write(data)
  })
  
  testProcess.on('close', (code) => {
    if (code === 0) {
      log('✅ UI Validation tests completed successfully', colors.green)
      log('📄 UI-Issues.md has been updated with latest findings', colors.cyan)
    } else {
      log(`❌ UI Validation tests failed with code ${code}`, colors.red)
      log('🔍 Check test output above for details', colors.yellow)
    }
    
    // Run additional focused tests based on what changed
    if (changedFile) {
      runFocusedTests(changedFile)
    }
  })
}

// Run focused tests based on file changes
function runFocusedTests(changedFile) {
  log(`\n🎯 Running focused tests for: ${path.basename(changedFile)}`, colors.magenta)
  
  let focusedTest = ''
  
  if (changedFile.includes('dashboard/page.tsx')) {
    focusedTest = 'tests/dashboard-visual-regression.spec.ts'
  } else if (changedFile.includes('dashboard-complete-demo.html')) {
    focusedTest = 'tests/dashboard-content-validation.spec.ts'
  } else if (changedFile.includes('.css')) {
    focusedTest = 'tests/dashboard-visual-regression.spec.ts'
  }
  
  if (focusedTest) {
    log(`Running focused test: ${focusedTest}`, colors.blue)
    
    const focusedTestProcess = spawn('npx', [
      'playwright',
      'test',
      focusedTest,
      '--reporter=list',
      '--project=chromium'
    ], {
      stdio: 'inherit',
      cwd: process.cwd()
    })
    
    focusedTestProcess.on('close', (code) => {
      if (code === 0) {
        log('✅ Focused test completed successfully', colors.green)
      } else {
        log('❌ Focused test found issues - check UI-Issues.md', colors.red)
      }
    })
  }
}

// File watcher setup
function setupWatcher() {
  logSection('Starting File Watcher')
  
  log('Setting up file watchers for:', colors.blue)
  WATCH_PATHS.forEach(watchPath => {
    log(`  📁 ${watchPath}`, colors.cyan)
  })
  
  const watcher = chokidar.watch(WATCH_PATHS, {
    ignored: /node_modules/,
    persistent: true,
    ignoreInitial: true
  })
  
  let debounceTimer = null
  
  watcher
    .on('change', (path) => {
      log(`📝 File changed: ${path}`, colors.yellow)
      
      // Debounce rapid changes
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        runUIValidationTests(path)
      }, 500)
    })
    .on('error', (error) => {
      log(`❌ Watcher error: ${error}`, colors.red)
    })
    .on('ready', () => {
      log('👀 File watcher is ready and monitoring changes', colors.green)
      log('💡 Make changes to dashboard files to trigger automated validation', colors.cyan)
      
      // Run initial validation
      setTimeout(() => {
        log('\n🚀 Running initial UI validation...', colors.magenta)
        runUIValidationTests()
      }, 1000)
    })
  
  return watcher
}

// Main execution
function main() {
  console.clear()
  
  logSection('Dashboard UI Continuous Validation System')
  
  log('PM33 Dashboard Visual Regression Testing', colors.bright)
  log('Monitors files and automatically runs UI validation tests', colors.blue)
  
  // Check if we're in the right directory
  const fs = require('fs')
  if (!fs.existsSync('app/(app)/dashboard/page.tsx')) {
    log('❌ Error: Not in the correct directory. Please run from the frontend root.', colors.red)
    log('Expected to find: app/(app)/dashboard/page.tsx', colors.yellow)
    process.exit(1)
  }
  
  // Setup file watcher
  const watcher = setupWatcher()
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    log('\n🛑 Shutting down file watcher...', colors.yellow)
    watcher.close()
    log('👋 UI validation watcher stopped', colors.blue)
    process.exit(0)
  })
  
  // Keep the process running
  process.stdin.resume()
}

// Run if called directly
if (require.main === module) {
  // Check for dependencies
  try {
    require('chokidar')
  } catch (error) {
    console.error(`${colors.red}❌ Missing dependency: chokidar${colors.reset}`)
    console.log(`${colors.yellow}💡 Install with: npm install --save-dev chokidar${colors.reset}`)
    process.exit(1)
  }
  
  main()
}

module.exports = {
  runUIValidationTests,
  setupWatcher,
  WATCH_PATHS,
  TEST_COMMAND
}