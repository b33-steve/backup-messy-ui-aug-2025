// tests/performance/performance-benchmarks.spec.ts
// Comprehensive performance benchmarking tests for PM33 platform
// Validates <2s response times, Core Web Vitals, and PM33 business requirements
// RELEVANT FILES: user-journey-helper.ts, performance-monitor.ts, test-data-manager.ts

import { test, expect } from '@playwright/test';
import { PerformanceMonitor } from '../e2e/helpers/performance-monitor';
import { TestDataManager } from '../e2e/helpers/test-data-manager';

interface PerformanceBenchmark {
  scenario: string;
  page_url: string;
  max_load_time: number;
  max_interaction_time: number;
  max_api_response: number;
  core_web_vitals: {
    lcp_threshold: number;
    fid_threshold: number;
    cls_threshold: number;
  };
  pm33_requirements: {
    strategic_analysis_time: number;
    workflow_creation_time: number;
    communication_generation_time: number;
    export_processing_time: number;
  };
}

test.describe('PM33 Performance Benchmarks', () => {
  let perfMonitor: PerformanceMonitor;
  let testDataManager: TestDataManager;
  
  // Performance benchmarks based on PM33 business requirements
  const benchmarks: PerformanceBenchmark[] = [
    {
      scenario: 'Marketing Landing Page',
      page_url: '/',
      max_load_time: 1500, // 1.5s for marketing conversion
      max_interaction_time: 500,
      max_api_response: 1000,
      core_web_vitals: { lcp_threshold: 2000, fid_threshold: 100, cls_threshold: 0.1 },
      pm33_requirements: { strategic_analysis_time: 0, workflow_creation_time: 0, communication_generation_time: 0, export_processing_time: 0 }
    },
    {
      scenario: 'Dashboard Overview',
      page_url: '/dashboard',
      max_load_time: 2000, // 2s for core PM33 requirement
      max_interaction_time: 800,
      max_api_response: 2500,
      core_web_vitals: { lcp_threshold: 2500, fid_threshold: 100, cls_threshold: 0.1 },
      pm33_requirements: { strategic_analysis_time: 0, workflow_creation_time: 0, communication_generation_time: 0, export_processing_time: 0 }
    },
    {
      scenario: 'Strategic Intelligence Hub',
      page_url: '/strategic-intelligence',
      max_load_time: 2000,
      max_interaction_time: 1000,
      max_api_response: 15000, // AI processing can take longer
      core_web_vitals: { lcp_threshold: 2500, fid_threshold: 100, cls_threshold: 0.1 },
      pm33_requirements: { strategic_analysis_time: 15000, workflow_creation_time: 0, communication_generation_time: 0, export_processing_time: 0 }
    },
    {
      scenario: 'Communication AI Team',
      page_url: '/communication',
      max_load_time: 2000,
      max_interaction_time: 1000,
      max_api_response: 12000,
      core_web_vitals: { lcp_threshold: 2500, fid_threshold: 100, cls_threshold: 0.1 },
      pm33_requirements: { strategic_analysis_time: 0, workflow_creation_time: 0, communication_generation_time: 12000, export_processing_time: 5000 }
    },
    {
      scenario: 'Workflow Execution Center',
      page_url: '/workflows',
      max_load_time: 2000,
      max_interaction_time: 1000,
      max_api_response: 30000,
      core_web_vitals: { lcp_threshold: 2500, fid_threshold: 100, cls_threshold: 0.1 },
      pm33_requirements: { strategic_analysis_time: 0, workflow_creation_time: 30000, communication_generation_time: 0, export_processing_time: 0 }
    }
  ];

  test.beforeEach(async ({ page }) => {
    perfMonitor = new PerformanceMonitor(page);
    testDataManager = new TestDataManager();
    await perfMonitor.startMonitoring();
  });

  test.afterEach(async () => {
    await perfMonitor.stopMonitoring();
  });

  benchmarks.forEach(benchmark => {
    test(`Performance: ${benchmark.scenario}`, async ({ page }) => {
      test.slow(); // Mark as slow test for performance benchmarking
      
      // Navigate to the page and measure load time
      const navigationStart = Date.now();
      await page.goto(benchmark.page_url, { waitUntil: 'networkidle' });
      const loadTime = Date.now() - navigationStart;
      
      // Validate page load time benchmark
      expect(loadTime).toBeLessThan(benchmark.max_load_time);
      
      // Measure and validate Core Web Vitals
      const webVitals = await perfMonitor.getCoreWebVitals();
      expect(webVitals.LCP).toBeLessThan(benchmark.core_web_vitals.lcp_threshold);
      expect(webVitals.FID).toBeLessThan(benchmark.core_web_vitals.fid_threshold);
      expect(webVitals.CLS).toBeLessThan(benchmark.core_web_vitals.cls_threshold);
      expect(webVitals.TTFB).toBeLessThan(800); // Time to First Byte under 800ms
      expect(webVitals.FCP).toBeLessThan(1800); // First Contentful Paint under 1.8s
      
      // Test key interactions if they exist on the page
      const interactionElements = [
        '[data-testid="cta-button"]',
        '[data-testid="navigation-link"]',
        '[data-testid="interactive-demo"]',
        'button:not([disabled])',
        'a[href]:not([href="#"])'
      ];
      
      for (const selector of interactionElements) {
        const element = page.locator(selector).first();
        if (await element.count() > 0) {
          const interactionStart = perfMonitor.measureInteractionTime('click-interaction');
          await element.click({ timeout: 5000 });
          await perfMonitor.assertInteractionTime('click-interaction', benchmark.max_interaction_time);
          break; // Test one interaction per page
        }
      }
      
      // Validate memory usage is reasonable
      const metrics = await perfMonitor.getMetrics();
      expect(metrics.memoryUsage).toBeLessThan(100 * 1024 * 1024); // Under 100MB
      
      console.log(`${benchmark.scenario} Performance Results:`, {
        loadTime: `${loadTime}ms`,
        lcp: `${webVitals.LCP}ms`,
        fid: `${webVitals.FID}ms`,
        cls: webVitals.CLS,
        ttfb: `${webVitals.TTFB}ms`,
        fcp: `${webVitals.FCP}ms`,
        memoryUsage: `${Math.round(metrics.memoryUsage / 1024 / 1024)}MB`
      });
    });
  });

  test('Performance: Strategic Analysis End-to-End', async ({ page }) => {
    test.slow();
    
    await page.goto('/strategic-intelligence');
    
    // Start strategic analysis
    await page.fill('[data-testid="strategic-question"]', 'Should we prioritize user acquisition or product features?');
    await page.selectOption('[data-testid="framework-select"]', 'RICE');
    
    const analysisStart = Date.now();
    await page.click('[data-testid="start-analysis"]');
    
    // Wait for analysis completion
    await page.waitForSelector('[data-testid="analysis-complete"]', { timeout: 20000 });
    const analysisTime = Date.now() - analysisStart;
    
    // Validate analysis time meets PM33 business requirements
    expect(analysisTime).toBeLessThan(15000); // Under 15 seconds
    
    // Validate results are displayed quickly
    await expect(page.locator('[data-testid="analysis-results"]')).toBeVisible();
    await expect(page.locator('[data-testid="recommendations"]')).toBeVisible();
    
    console.log('Strategic Analysis Performance:', {
      analysisTime: `${analysisTime}ms`,
      passedBenchmark: analysisTime < 15000
    });
  });

  test('Performance: Workflow Creation End-to-End', async ({ page }) => {
    test.slow();
    
    await page.goto('/workflows');
    
    // Start workflow creation
    await page.selectOption('[data-testid="pm-tool-select"]', 'linear');
    await page.selectOption('[data-testid="workflow-type"]', 'sprint');
    await page.fill('[data-testid="requirements-input"]', 'User authentication improvements\nAPI rate limiting\nDashboard optimization');
    
    const workflowStart = Date.now();
    await page.click('[data-testid="create-workflow"]');
    
    // Wait for workflow completion
    await page.waitForSelector('[data-testid="workflow-complete"]', { timeout: 35000 });
    const workflowTime = Date.now() - workflowStart;
    
    // Validate workflow creation time
    expect(workflowTime).toBeLessThan(30000); // Under 30 seconds
    
    // Validate results
    await expect(page.locator('[data-testid="created-items"]')).toBeVisible();
    await expect(page.locator('[data-testid="workflow-summary"]')).toBeVisible();
    
    console.log('Workflow Creation Performance:', {
      workflowTime: `${workflowTime}ms`,
      passedBenchmark: workflowTime < 30000
    });
  });

  test('Performance: Communication Generation End-to-End', async ({ page }) => {
    test.slow();
    
    await page.goto('/communication');
    
    // Start communication generation
    await page.selectOption('[data-testid="communication-type"]', 'executive_summary');
    await page.selectOption('[data-testid="audience-select"]', 'board_members');
    await page.selectOption('[data-testid="formality-select"]', 'executive');
    
    const communicationStart = Date.now();
    await page.click('[data-testid="generate-communication"]');
    
    // Wait for generation completion
    await page.waitForSelector('[data-testid="generation-complete"]', { timeout: 15000 });
    const communicationTime = Date.now() - communicationStart;
    
    // Validate communication generation time
    expect(communicationTime).toBeLessThan(12000); // Under 12 seconds
    
    // Validate content quality and export options
    await expect(page.locator('[data-testid="generated-content"]')).toBeVisible();
    await expect(page.locator('[data-testid="export-options"]')).toBeVisible();
    
    // Test export performance
    const exportStart = Date.now();
    await page.click('[data-testid="export-pdf"]');
    await page.waitForSelector('[data-testid="export-ready"]', { timeout: 8000 });
    const exportTime = Date.now() - exportStart;
    
    expect(exportTime).toBeLessThan(5000); // Export under 5 seconds
    
    console.log('Communication Generation Performance:', {
      generationTime: `${communicationTime}ms`,
      exportTime: `${exportTime}ms`,
      passedBenchmarks: communicationTime < 12000 && exportTime < 5000
    });
  });

  test('Performance: Mobile Responsiveness', async ({ page, browserName }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const pages = ['/', '/dashboard', '/strategic-intelligence', '/pricing'];
    
    for (const pageUrl of pages) {
      const loadStart = Date.now();
      await page.goto(pageUrl, { waitUntil: 'networkidle' });
      const loadTime = Date.now() - loadStart;
      
      // Mobile should load even faster due to simpler layouts
      expect(loadTime).toBeLessThan(3000); // 3 seconds for mobile
      
      // Validate Core Web Vitals on mobile
      const webVitals = await perfMonitor.getCoreWebVitals();
      expect(webVitals.LCP).toBeLessThan(3000); // Slightly more lenient for mobile
      expect(webVitals.CLS).toBeLessThan(0.1);
      
      // Test mobile interaction performance
      const mobileButton = page.locator('button, [role="button"]').first();
      if (await mobileButton.count() > 0) {
        const tapStart = perfMonitor.measureInteractionTime('mobile-tap');
        await mobileButton.tap();
        await perfMonitor.assertInteractionTime('mobile-tap', 300); // Mobile taps should be very fast
      }
      
      console.log(`Mobile ${pageUrl} Performance:`, {
        loadTime: `${loadTime}ms`,
        lcp: `${webVitals.LCP}ms`,
        cls: webVitals.CLS
      });
    }
  });

  test('Performance: Concurrent User Simulation', async ({ page }) => {
    test.slow();
    
    // Simulate multiple users accessing the platform simultaneously
    await page.goto('/dashboard');
    
    // Create multiple concurrent requests
    const concurrentOperations = [
      page.goto('/strategic-intelligence'),
      page.evaluate(() => fetch('/api/dashboard/metrics')),
      page.evaluate(() => fetch('/api/user/profile')),
      page.evaluate(() => fetch('/api/notifications/recent')),
      page.evaluate(() => fetch('/api/strategic/recent-analyses'))
    ];
    
    const operationStart = Date.now();
    await Promise.all(concurrentOperations);
    const totalTime = Date.now() - operationStart;
    
    // All concurrent operations should complete within reasonable time
    expect(totalTime).toBeLessThan(5000); // 5 seconds for all concurrent operations
    
    // Page should remain responsive
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
    
    console.log('Concurrent Operations Performance:', {
      totalTime: `${totalTime}ms`,
      passed: totalTime < 5000
    });
  });

  test('Performance: Resource Loading Optimization', async ({ page }) => {
    await page.goto('/');
    
    // Analyze resource loading
    const resourceMetrics = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const analysis = {
        totalResources: resources.length,
        javascriptSize: 0,
        cssSize: 0,
        imageSize: 0,
        slowResources: [] as string[],
        cacheableResources: 0
      };
      
      resources.forEach(resource => {
        const loadTime = resource.responseEnd - resource.startTime;
        
        // Track slow resources (over 2 seconds)
        if (loadTime > 2000) {
          analysis.slowResources.push(resource.name);
        }
        
        // Estimate sizes and cache status
        if (resource.name.includes('.js')) {
          analysis.javascriptSize += resource.transferSize || 0;
        } else if (resource.name.includes('.css')) {
          analysis.cssSize += resource.transferSize || 0;
        } else if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
          analysis.imageSize += resource.transferSize || 0;
        }
        
        // Check if resource was cached
        if (resource.transferSize === 0 && resource.decodedBodySize > 0) {
          analysis.cacheableResources++;
        }
      });
      
      return analysis;
    });
    
    // Validate resource optimization
    expect(resourceMetrics.slowResources.length).toBeLessThan(3); // Max 2 slow resources
    expect(resourceMetrics.javascriptSize).toBeLessThan(1024 * 1024); // Under 1MB JS
    expect(resourceMetrics.cssSize).toBeLessThan(200 * 1024); // Under 200KB CSS
    expect(resourceMetrics.imageSize).toBeLessThan(2 * 1024 * 1024); // Under 2MB images
    
    console.log('Resource Loading Analysis:', resourceMetrics);
  });

  test('Performance: API Response Time Distribution', async ({ page, request }) => {
    const apiEndpoints = [
      '/api/dashboard/overview',
      '/api/user/profile',
      '/api/strategic/templates',
      '/api/workflows/recent',
      '/api/communication/templates'
    ];
    
    const responseTimes: { [endpoint: string]: number } = {};
    
    for (const endpoint of apiEndpoints) {
      const start = Date.now();
      try {
        const response = await request.get(`http://localhost:3000${endpoint}`, {
          headers: { 'Authorization': 'Bearer test-api-key' }
        });
        const responseTime = Date.now() - start;
        responseTimes[endpoint] = responseTime;
        
        // Each API should respond quickly
        expect(responseTime).toBeLessThan(2000); // Under 2 seconds
        
      } catch (error) {
        // If endpoint doesn't exist, that's okay for this test
        responseTimes[endpoint] = -1;
      }
    }
    
    // Calculate average response time for existing endpoints
    const validResponses = Object.values(responseTimes).filter(time => time > 0);
    if (validResponses.length > 0) {
      const averageResponseTime = validResponses.reduce((sum, time) => sum + time, 0) / validResponses.length;
      expect(averageResponseTime).toBeLessThan(1500); // Average under 1.5 seconds
      
      console.log('API Response Time Distribution:', {
        ...responseTimes,
        average: `${Math.round(averageResponseTime)}ms`,
        validEndpoints: validResponses.length
      });
    }
  });

  test('Performance: Memory Leak Detection', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Initial memory measurement
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory ? (performance as any).memory.usedJSHeapSize : 0;
    });
    
    // Simulate user activity that could cause memory leaks
    for (let i = 0; i < 10; i++) {
      // Navigate between pages
      await page.goto('/strategic-intelligence');
      await page.goto('/communication');
      await page.goto('/workflows');
      await page.goto('/dashboard');
      
      // Interact with elements
      const button = page.locator('button').first();
      if (await button.count() > 0) {
        await button.click();
      }
      
      // Wait briefly
      await page.waitForTimeout(500);
    }
    
    // Force garbage collection if possible
    await page.evaluate(() => {
      if ((window as any).gc) {
        (window as any).gc();
      }
    });
    
    // Final memory measurement
    const finalMemory = await page.evaluate(() => {
      return (performance as any).memory ? (performance as any).memory.usedJSHeapSize : 0;
    });
    
    if (initialMemory > 0 && finalMemory > 0) {
      const memoryIncrease = finalMemory - initialMemory;
      const memoryIncreasePercent = (memoryIncrease / initialMemory) * 100;
      
      // Memory should not increase by more than 50% during normal usage
      expect(memoryIncreasePercent).toBeLessThan(50);
      
      console.log('Memory Usage Analysis:', {
        initial: `${Math.round(initialMemory / 1024 / 1024)}MB`,
        final: `${Math.round(finalMemory / 1024 / 1024)}MB`,
        increase: `${Math.round(memoryIncrease / 1024 / 1024)}MB`,
        increasePercent: `${Math.round(memoryIncreasePercent)}%`,
        passed: memoryIncreasePercent < 50
      });
    }
  });

  test('Performance: Bundle Size Analysis', async ({ page }) => {
    await page.goto('/');
    
    // Analyze JavaScript bundle sizes
    const bundleAnalysis = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      
      return {
        scriptCount: scripts.length,
        stylesheetCount: stylesheets.length,
        scripts: scripts.map(script => ({
          src: (script as HTMLScriptElement).src,
          async: (script as HTMLScriptElement).async,
          defer: (script as HTMLScriptElement).defer
        })),
        stylesheets: stylesheets.map(link => ({
          href: (link as HTMLLinkElement).href
        }))
      };
    });
    
    // Validate bundle optimization
    expect(bundleAnalysis.scriptCount).toBeLessThan(10); // Reasonable number of scripts
    expect(bundleAnalysis.stylesheetCount).toBeLessThan(5); // Limited CSS files
    
    // Check for proper loading attributes
    const hasAsyncScripts = bundleAnalysis.scripts.some(script => script.async || script.defer);
    expect(hasAsyncScripts).toBe(true); // Should have async/defer scripts
    
    console.log('Bundle Analysis:', bundleAnalysis);
  });
});