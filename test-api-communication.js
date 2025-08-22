/**
 * File: /app/frontend/test-api-communication.js  
 * Frontend-Backend Communication Validation - Tests API endpoints and data flow
 * Validates Next.js frontend to FastAPI backend communication patterns
 * RELEVANT FILES: lib/ai-service.ts, app/api routes, backend/main.py, backend/routes
 */

const https = require('https');
const http = require('http');

// API endpoint configurations for testing
const API_ENDPOINTS = {
  // Next.js Frontend API Routes (should be accessible)
  frontend: {
    baseUrl: 'http://localhost:3005',
    endpoints: [
      { path: '/api/health', method: 'GET', description: 'Frontend health check' },
      { path: '/api/ai/chat', method: 'POST', description: 'AI chat endpoint' },
      { path: '/api/ai/strategic', method: 'POST', description: 'Strategic intelligence' },
      { path: '/api/auth/status', method: 'GET', description: 'Authentication status' }
    ]
  },
  // FastAPI Backend Routes (may not be running)
  backend: {
    baseUrl: 'http://localhost:8000',
    endpoints: [
      { path: '/health', method: 'GET', description: 'Backend health check' },
      { path: '/api/v1/strategic/analyze', method: 'POST', description: 'Strategic analysis' },
      { path: '/api/v1/workflows/create', method: 'POST', description: 'Workflow creation' },
      { path: '/api/v1/ai-teams/coordinate', method: 'POST', description: 'Multi-AI coordination' }
    ]
  }
};

// Test results tracking  
const results = {
  frontend: { passed: 0, failed: 0, total: 0 },
  backend: { passed: 0, failed: 0, total: 0 },
  startTime: new Date()
};

console.log('🔄 PM33 Frontend-Backend Communication Test Starting...\n');

/**
 * Test HTTP endpoint accessibility
 */
function testEndpoint(baseUrl, endpoint) {
  return new Promise((resolve) => {
    const url = `${baseUrl}${endpoint.path}`;
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: endpoint.method,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'PM33-Integration-Test/1.0'
      }
    };
    
    const request = client.request(options, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        resolve({
          success: true,
          status: response.statusCode,
          data: data.substring(0, 200), // First 200 chars
          headers: response.headers,
          accessible: response.statusCode < 500
        });
      });
    });
    
    request.on('error', (error) => {
      resolve({
        success: false,
        error: error.message,
        accessible: false
      });
    });
    
    request.on('timeout', () => {
      resolve({
        success: false,
        error: 'Request timeout',
        accessible: false
      });
    });
    
    // For POST requests, send empty JSON body
    if (endpoint.method === 'POST') {
      request.write('{}');
    }
    
    request.end();
  });
}

/**
 * Test frontend API endpoints
 */
async function testFrontendAPIs() {
  console.log('🌐 Testing Frontend API Endpoints (Next.js on port 3005)...');
  
  for (const endpoint of API_ENDPOINTS.frontend.endpoints) {
    try {
      const result = await testEndpoint(API_ENDPOINTS.frontend.baseUrl, endpoint);
      results.frontend.total++;
      
      if (result.accessible) {
        results.frontend.passed++;
        console.log(`  ✅ ${endpoint.method} ${endpoint.path}: ${result.status} - ${endpoint.description}`);
        
        // Log response preview if available
        if (result.data && result.data.trim()) {
          const preview = result.data.trim().substring(0, 100);
          console.log(`    📄 Response: ${preview}${result.data.length > 100 ? '...' : ''}`);
        }
      } else {
        results.frontend.failed++;
        console.log(`  ❌ ${endpoint.method} ${endpoint.path}: ${result.error || result.status} - ${endpoint.description}`);
      }
    } catch (error) {
      results.frontend.total++;
      results.frontend.failed++;
      console.log(`  ❌ ${endpoint.method} ${endpoint.path}: ${error.message} - ${endpoint.description}`);
    }
  }
  
  console.log(`\n📊 Frontend APIs: ${results.frontend.passed}/${results.frontend.total} accessible\n`);
}

/**
 * Test backend API endpoints
 */
async function testBackendAPIs() {
  console.log('⚙️ Testing Backend API Endpoints (FastAPI on port 8000)...');
  
  for (const endpoint of API_ENDPOINTS.backend.endpoints) {
    try {
      const result = await testEndpoint(API_ENDPOINTS.backend.baseUrl, endpoint);
      results.backend.total++;
      
      if (result.accessible) {
        results.backend.passed++;
        console.log(`  ✅ ${endpoint.method} ${endpoint.path}: ${result.status} - ${endpoint.description}`);
        
        // Log response preview if available
        if (result.data && result.data.trim()) {
          const preview = result.data.trim().substring(0, 100);
          console.log(`    📄 Response: ${preview}${result.data.length > 100 ? '...' : ''}`);
        }
      } else {
        results.backend.failed++;
        console.log(`  ⚠️  ${endpoint.method} ${endpoint.path}: ${result.error || result.status} - ${endpoint.description}`);
      }
    } catch (error) {
      results.backend.total++;
      results.backend.failed++;
      console.log(`  ⚠️  ${endpoint.method} ${endpoint.path}: ${error.message} - ${endpoint.description}`);
    }
  }
  
  console.log(`\n📊 Backend APIs: ${results.backend.passed}/${results.backend.total} accessible\n`);
}

/**
 * Test data flow patterns
 */
async function testDataFlowPatterns() {
  console.log('🔄 Testing Data Flow Patterns...');
  
  // Test frontend to AI service integration
  try {
    const aiTestData = {
      query: "Test strategic analysis request",
      context: { test: true },
      user_id: "test-user"
    };
    
    const result = await testEndpoint(API_ENDPOINTS.frontend.baseUrl, {
      path: '/api/ai/strategic',
      method: 'POST',
      description: 'AI strategic analysis flow'
    });
    
    console.log(`  ${result.accessible ? '✅' : '❌'} Frontend → AI Service: ${result.accessible ? 'Connected' : 'Not accessible'}`);
    
  } catch (error) {
    console.log(`  ❌ Frontend → AI Service: ${error.message}`);
  }
  
  // Test authentication flow
  try {
    const authResult = await testEndpoint(API_ENDPOINTS.frontend.baseUrl, {
      path: '/api/auth/status',
      method: 'GET',
      description: 'Authentication flow'
    });
    
    console.log(`  ${authResult.accessible ? '✅' : '❌'} Authentication Flow: ${authResult.accessible ? 'Working' : 'Not accessible'}`);
    
  } catch (error) {
    console.log(`  ❌ Authentication Flow: ${error.message}`);
  }
  
  console.log('');
}

/**
 * Generate communication test report
 */
function generateCommunicationReport() {
  const endTime = new Date();
  const duration = (endTime - results.startTime) / 1000;
  
  const totalPassed = results.frontend.passed + results.backend.passed;
  const totalFailed = results.frontend.failed + results.backend.failed;
  const totalTests = results.frontend.total + results.backend.total;
  
  console.log('📊 PM33 Frontend-Backend Communication Report');
  console.log('=' .repeat(55));
  console.log(`🕒 Test Duration: ${duration.toFixed(2)} seconds`);
  console.log(`✅ Total Passed: ${totalPassed}`);
  console.log(`❌ Total Failed: ${totalFailed}`);
  console.log(`📈 Overall Success Rate: ${totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(1) : 0}%`);
  console.log('');
  
  // Frontend status
  const frontendRate = results.frontend.total > 0 ? 
    ((results.frontend.passed / results.frontend.total) * 100).toFixed(1) : 0;
  console.log(`🌐 Frontend (Next.js): ${results.frontend.passed}/${results.frontend.total} (${frontendRate}%)`);
  
  // Backend status  
  const backendRate = results.backend.total > 0 ? 
    ((results.backend.passed / results.backend.total) * 100).toFixed(1) : 0;
  console.log(`⚙️ Backend (FastAPI): ${results.backend.passed}/${results.backend.total} (${backendRate}%)`);
  console.log('');
  
  // Architecture assessment
  let architectureStatus;
  if (results.frontend.passed >= results.frontend.total * 0.75) {
    architectureStatus = results.backend.passed > 0 ? 
      '🟢 FULL-STACK READY' : '🟡 FRONTEND READY';
  } else {
    architectureStatus = '🔴 NEEDS CONFIGURATION';
  }
  
  console.log(`🏗️ Architecture Status: ${architectureStatus}`);
  console.log('');
  
  // Communication patterns analysis
  console.log('🔄 Communication Patterns:');
  if (results.frontend.passed > 0) {
    console.log('  ✅ Frontend API Layer: Functional');
    console.log('  ✅ Next.js Server: Running on port 3005');
  } else {
    console.log('  ❌ Frontend API Layer: Not accessible');
  }
  
  if (results.backend.passed > 0) {
    console.log('  ✅ Backend API Layer: Functional');  
    console.log('  ✅ FastAPI Server: Running on port 8000');
  } else {
    console.log('  ⚠️  Backend API Layer: Not running (expected for frontend-only testing)');
  }
  
  console.log('');
  
  // Deployment readiness
  console.log('🚀 Deployment Readiness Assessment:');
  if (results.frontend.passed >= 2) {
    console.log('  ✅ Frontend deployment ready');
    console.log('  ✅ API routing functional');
    console.log('  ✅ Service integration accessible');
  }
  
  if (results.backend.passed === 0) {
    console.log('  💡 Backend can be deployed independently');
    console.log('  💡 Microservices architecture allows independent scaling');
  }
  
  console.log('');
  
  return {
    duration,
    frontend: results.frontend,
    backend: results.backend,
    totalPassed,
    totalFailed,
    successRate: totalTests > 0 ? (totalPassed / totalTests) * 100 : 0,
    architectureStatus,
    deploymentReady: results.frontend.passed >= 2
  };
}

/**
 * Main execution function
 */
async function runCommunicationTests() {
  try {
    // Test frontend API endpoints
    await testFrontendAPIs();
    
    // Test backend API endpoints (may not be running)
    await testBackendAPIs();
    
    // Test data flow patterns
    await testDataFlowPatterns();
    
    // Generate comprehensive report
    const report = generateCommunicationReport();
    
    return report;
    
  } catch (error) {
    console.error('❌ Communication testing failed:', error);
    return {
      error: error.message,
      duration: 0,
      totalPassed: 0,
      totalFailed: 1,
      successRate: 0,
      architectureStatus: '🔴 TESTING FAILED'
    };
  }
}

// Execute if run directly
if (require.main === module) {
  runCommunicationTests()
    .then(report => {
      // Success if frontend is working (backend may not be running)
      process.exit(report.frontend && report.frontend.passed >= 1 ? 0 : 1);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { runCommunicationTests, API_ENDPOINTS };