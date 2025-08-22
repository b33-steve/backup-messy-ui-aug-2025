/**
 * File: /app/frontend/test-service-integrations.js
 * Service Integration Validation - Tests all PM33 service connections
 * Validates Railway, Pinecone, Anthropic, OpenAI, Together AI, PostHog, and Resend integrations
 * RELEVANT FILES: .env, lib/ai-service.ts, utils/config.py, orchestrator.py
 */

const https = require('https');
const { execSync } = require('child_process');

// Service configuration validation
const SERVICE_CONFIGS = {
  anthropic: {
    url: 'https://api.anthropic.com',
    envVar: 'ANTHROPIC_API_KEY',
    description: 'Anthropic Claude API - Strategic Intelligence Team'
  },
  openai: {
    url: 'https://api.openai.com/v1',
    envVar: 'OPENAI_API_KEY', 
    description: 'OpenAI API - Workflow Execution Team'
  },
  together: {
    url: 'https://api.together.xyz',
    envVar: 'TOGETHER_API_KEY',
    description: 'Together AI - Data Intelligence Team (Cost-Effective Processing)'
  },
  pinecone: {
    url: 'https://api.pinecone.io',
    envVar: 'PINECONE_API_KEY',
    description: 'Pinecone Vector Database - AI Team Memory & Context'
  },
  railway: {
    url: 'postgresql://postgres',
    envVar: 'DATABASE_URL',
    description: 'Railway PostgreSQL - Primary Database'
  },
  posthog: {
    url: 'https://app.posthog.com',
    envVar: 'POSTHOG_API_KEY',
    description: 'PostHog Analytics - User Behavior & Product Analytics'
  },
  resend: {
    url: 'https://api.resend.com',
    envVar: 'RESEND_API_KEY',
    description: 'Resend Email - Communication AI Team'
  }
};

// Test results tracking
const results = {
  services: [],
  totalTests: 0,
  passedTests: 0,
  failedTests: 0,
  startTime: new Date(),
  summary: {}
};

console.log('🚀 PM33 Service Integration Validation Starting...\n');
console.log('📊 Testing 7 core services for PMO Transformation Platform\n');

// Load environment variables
require('dotenv').config();

/**
 * Test environment variable configuration
 */
function testEnvironmentVariables() {
  console.log('🔧 Testing Environment Variable Configuration...');
  
  const envResults = [];
  
  Object.entries(SERVICE_CONFIGS).forEach(([service, config]) => {
    const hasEnvVar = !!process.env[config.envVar];
    const value = process.env[config.envVar];
    const masked = value ? `${value.substring(0, 8)}...${value.substring(value.length - 4)}` : 'NOT_SET';
    
    envResults.push({
      service,
      envVar: config.envVar,
      configured: hasEnvVar,
      maskedValue: masked,
      description: config.description
    });
    
    results.totalTests++;
    if (hasEnvVar) {
      results.passedTests++;
      console.log(`  ✅ ${service.toUpperCase()}: ${config.envVar} = ${masked}`);
    } else {
      results.failedTests++;
      console.log(`  ❌ ${service.toUpperCase()}: ${config.envVar} = NOT_SET`);
    }
  });
  
  console.log(`\n📈 Environment Variables: ${results.passedTests}/${results.totalTests} configured\n`);
  return envResults;
}

/**
 * Test API connectivity for HTTP-based services
 */
async function testAPIConnectivity() {
  console.log('🌐 Testing API Connectivity...');
  
  const apiTests = [
    { name: 'Anthropic', url: 'https://api.anthropic.com', method: 'GET' },
    { name: 'OpenAI', url: 'https://api.openai.com/v1/models', method: 'GET' },
    { name: 'Together AI', url: 'https://api.together.xyz/v1/models', method: 'GET' },
    { name: 'Pinecone', url: 'https://api.pinecone.io/indexes', method: 'GET' },
    { name: 'PostHog', url: 'https://app.posthog.com/api/projects', method: 'GET' },
    { name: 'Resend', url: 'https://api.resend.com/domains', method: 'GET' }
  ];
  
  for (const test of apiTests) {
    try {
      console.log(`  Testing ${test.name} connectivity...`);
      
      // Simple connectivity test (not authenticated, just checking if endpoint is reachable)
      const result = await testEndpoint(test.url);
      
      results.totalTests++;
      if (result.accessible) {
        results.passedTests++;
        console.log(`  ✅ ${test.name}: Endpoint accessible (${result.status})`);
      } else {
        results.failedTests++;
        console.log(`  ⚠️  ${test.name}: Endpoint issue (${result.error})`);
      }
    } catch (error) {
      results.totalTests++;
      results.failedTests++;
      console.log(`  ❌ ${test.name}: Connection failed - ${error.message}`);
    }
  }
  
  console.log(`\n📈 API Connectivity: ${results.passedTests - (results.totalTests - apiTests.length - Object.keys(SERVICE_CONFIGS).length)}/${apiTests.length} services accessible\n`);
}

/**
 * Test database connection
 */
function testDatabaseConnection() {
  console.log('🗄️  Testing Database Connection...');
  
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.log('  ❌ DATABASE_URL not configured');
    results.totalTests++;
    results.failedTests++;
    return;
  }
  
  try {
    // Parse database URL for validation
    const url = new URL(dbUrl);
    const isPostgres = url.protocol === 'postgresql:';
    const hasCredentials = url.username && url.password;
    const hasHost = url.hostname;
    const hasPort = url.port;
    const hasDatabase = url.pathname && url.pathname !== '/';
    
    results.totalTests++;
    if (isPostgres && hasCredentials && hasHost && hasPort && hasDatabase) {
      results.passedTests++;
      console.log(`  ✅ Railway PostgreSQL: Configuration valid`);
      console.log(`    Host: ${url.hostname}:${url.port}`);
      console.log(`    Database: ${url.pathname.substring(1)}`);
      console.log(`    User: ${url.username}`);
    } else {
      results.failedTests++;
      console.log(`  ❌ Railway PostgreSQL: Invalid configuration`);
    }
  } catch (error) {
    results.totalTests++;
    results.failedTests++;
    console.log(`  ❌ Railway PostgreSQL: URL parsing failed - ${error.message}`);
  }
  
  console.log('');
}

/**
 * Test endpoint accessibility
 */
function testEndpoint(url) {
  return new Promise((resolve) => {
    const request = https.request(url, { method: 'GET', timeout: 5000 }, (response) => {
      resolve({
        accessible: true,
        status: response.statusCode,
        headers: response.headers
      });
    });
    
    request.on('error', (error) => {
      resolve({
        accessible: false,
        error: error.message
      });
    });
    
    request.on('timeout', () => {
      resolve({
        accessible: false,
        error: 'Request timeout'
      });
    });
    
    request.end();
  });
}

/**
 * Generate service integration report
 */
function generateReport() {
  const endTime = new Date();
  const duration = (endTime - results.startTime) / 1000;
  
  console.log('📊 PM33 Service Integration Report');
  console.log('=' .repeat(50));
  console.log(`🕒 Test Duration: ${duration.toFixed(2)} seconds`);
  console.log(`✅ Passed Tests: ${results.passedTests}`);
  console.log(`❌ Failed Tests: ${results.failedTests}`);
  console.log(`📈 Success Rate: ${((results.passedTests / results.totalTests) * 100).toFixed(1)}%`);
  console.log('');
  
  // Service integration status
  console.log('🔧 PM33 4 Agentic AI Teams Service Status:');
  console.log('  1. Strategic Intelligence Team (Claude + Pinecone + PostHog)');
  console.log('  2. Workflow Execution Team (OpenAI + Railway + PM Tool APIs)');
  console.log('  3. Data Intelligence Team (Together AI + Pinecone + Railway)');
  console.log('  4. Communication Team (Claude/OpenAI + Resend + Railway)');
  console.log('');
  
  // Integration readiness assessment
  const readinessScore = (results.passedTests / results.totalTests) * 100;
  let readinessStatus;
  
  if (readinessScore >= 90) {
    readinessStatus = '🟢 PRODUCTION READY';
  } else if (readinessScore >= 70) {
    readinessStatus = '🟡 DEVELOPMENT READY';
  } else {
    readinessStatus = '🔴 NEEDS CONFIGURATION';
  }
  
  console.log(`🎯 PM33 Integration Readiness: ${readinessStatus} (${readinessScore.toFixed(1)}%)`);
  console.log('');
  
  // Next steps
  if (results.failedTests > 0) {
    console.log('🔨 Recommended Next Steps:');
    console.log('  1. Configure missing environment variables in .env file');
    console.log('  2. Verify API key permissions and rate limits');
    console.log('  3. Test database connection with actual queries');
    console.log('  4. Run multi-AI coordination workflow tests');
    console.log('');
  }
  
  return {
    duration,
    passedTests: results.passedTests,
    failedTests: results.failedTests,
    successRate: readinessScore,
    readinessStatus,
    recommendations: results.failedTests > 0 ? [
      'Configure missing environment variables',
      'Verify API key permissions',
      'Test database connectivity',
      'Run workflow coordination tests'
    ] : ['All services ready for production deployment']
  };
}

/**
 * Main execution function
 */
async function runServiceIntegrationTests() {
  try {
    // Test environment variables
    testEnvironmentVariables();
    
    // Test API connectivity
    await testAPIConnectivity();
    
    // Test database connection
    testDatabaseConnection();
    
    // Generate comprehensive report
    const report = generateReport();
    
    return report;
    
  } catch (error) {
    console.error('❌ Service integration testing failed:', error);
    return {
      error: error.message,
      duration: 0,
      passedTests: 0,
      failedTests: results.totalTests || 1,
      successRate: 0,
      readinessStatus: '🔴 TESTING FAILED'
    };
  }
}

// Execute if run directly
if (require.main === module) {
  runServiceIntegrationTests()
    .then(report => {
      process.exit(report.failedTests > 0 ? 1 : 0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { runServiceIntegrationTests, SERVICE_CONFIGS };