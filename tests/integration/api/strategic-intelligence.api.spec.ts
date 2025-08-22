// tests/integration/api/strategic-intelligence.api.spec.ts
// API integration tests for Strategic Intelligence AI Team endpoints
// Tests multi-framework analysis, competitive intelligence, and AI orchestration performance
// RELEVANT FILES: communication.api.spec.ts, workflow-execution.api.spec.ts, data-intelligence.api.spec.ts

import { test, expect } from '@playwright/test';
import { TestDataManager } from '../../e2e/helpers/test-data-manager';

interface StrategicAnalysisRequest {
  question: string;
  framework: 'ICE' | 'RICE' | 'Porter Five Forces' | 'Blue Ocean' | 'OKR' | 'SWOT';
  context: {
    company_profile: string;
    market_data: any;
    competitive_landscape: any;
    historical_performance: any;
  };
  urgency: 'low' | 'medium' | 'high' | 'critical';
  stakeholders: string[];
  budget_constraints?: {
    max_budget: number;
    timeline: string;
    resources: string[];
  };
}

interface StrategicAnalysisResponse {
  analysis_id: string;
  status: 'processing' | 'completed' | 'failed';
  framework_results: FrameworkResult[];
  recommendations: Recommendation[];
  confidence_score: number;
  processing_time_ms: number;
  ai_team_utilization: {
    primary_ai: string;
    secondary_ai?: string;
    reasoning_complexity: number;
  };
}

interface FrameworkResult {
  framework: string;
  scores: { [key: string]: number };
  analysis: string;
  supporting_data: any[];
  confidence: number;
}

interface Recommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  impact_score: number;
  effort_score: number;
  risk_level: string;
  timeline: string;
  dependencies: string[];
}

test.describe('Strategic Intelligence API Integration', () => {
  let testDataManager: TestDataManager;
  let baseURL: string;
  
  test.beforeAll(() => {
    testDataManager = new TestDataManager();
    baseURL = process.env.API_BASE_URL || 'http://localhost:3000/api';
  });

  test.describe('Strategic Analysis Endpoints', () => {
    test('POST /api/strategic/analyze - Basic RICE Analysis', async ({ request }) => {
      const analysisRequest: StrategicAnalysisRequest = {
        question: 'Should we prioritize user onboarding improvements or new feature development?',
        framework: 'RICE',
        context: {
          company_profile: 'startup_context',
          market_data: testDataManager.getStartupContext(),
          competitive_landscape: {},
          historical_performance: {}
        },
        urgency: 'high',
        stakeholders: ['product_team', 'engineering', 'growth']
      };

      const response = await request.post(`${baseURL}/strategic/analyze`, {
        data: analysisRequest,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-api-key'
        }
      });

      expect(response.status()).toBe(202); // Accepted for processing

      const responseBody: { analysis_id: string; estimated_completion: number } = await response.json();
      expect(responseBody.analysis_id).toBeTruthy();
      expect(responseBody.estimated_completion).toBeLessThanOrEqual(10000); // Under 10 seconds

      // Poll for completion
      let analysisComplete = false;
      let attempts = 0;
      const maxAttempts = 30; // 30 seconds maximum

      while (!analysisComplete && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second

        const statusResponse = await request.get(`${baseURL}/strategic/analyze/${responseBody.analysis_id}`);
        const statusBody: StrategicAnalysisResponse = await statusResponse.json();

        if (statusBody.status === 'completed') {
          analysisComplete = true;
          
          // Validate response structure
          expect(statusBody.framework_results).toHaveLength(1);
          expect(statusBody.framework_results[0].framework).toBe('RICE');
          expect(statusBody.framework_results[0].scores).toHaveProperty('reach');
          expect(statusBody.framework_results[0].scores).toHaveProperty('impact');
          expect(statusBody.framework_results[0].scores).toHaveProperty('confidence');
          expect(statusBody.framework_results[0].scores).toHaveProperty('effort');
          
          expect(statusBody.recommendations).toBeInstanceOf(Array);
          expect(statusBody.recommendations.length).toBeGreaterThan(0);
          expect(statusBody.confidence_score).toBeGreaterThanOrEqual(0.7); // 70% minimum confidence
          expect(statusBody.processing_time_ms).toBeLessThan(15000); // Under 15 seconds
          
          // Validate AI team utilization
          expect(statusBody.ai_team_utilization.primary_ai).toBe('claude');
          expect(statusBody.ai_team_utilization.reasoning_complexity).toBeGreaterThanOrEqual(6);
        } else if (statusBody.status === 'failed') {
          throw new Error('Strategic analysis failed');
        }

        attempts++;
      }

      expect(analysisComplete).toBe(true);
    });

    test('POST /api/strategic/analyze - Complex Multi-Framework Enterprise Analysis', async ({ request }) => {
      const enterpriseRequest: StrategicAnalysisRequest = {
        question: 'Should we invest $2M in AI capabilities or expand to European markets?',
        framework: 'Porter Five Forces',
        context: {
          company_profile: 'enterprise_context',
          market_data: testDataManager.getEnterpriseContext(),
          competitive_landscape: {
            direct_competitors: ['CompetitorA', 'CompetitorB'],
            market_share_data: { us: 0.15, europe: 0.08 },
            pricing_analysis: { average_price: 50000, our_price: 45000 }
          },
          historical_performance: {
            revenue_growth: 0.25,
            customer_acquisition_cost: 5000,
            lifetime_value: 50000
          }
        },
        urgency: 'critical',
        stakeholders: ['ceo', 'cfo', 'cto', 'vp_sales', 'board'],
        budget_constraints: {
          max_budget: 2000000,
          timeline: 'Q2-Q4 2025',
          resources: ['engineering', 'sales', 'marketing']
        }
      };

      const response = await request.post(`${baseURL}/strategic/analyze`, {
        data: enterpriseRequest
      });

      expect(response.status()).toBe(202);

      const responseBody = await response.json();
      expect(responseBody.estimated_completion).toBeLessThanOrEqual(20000); // Enterprise analysis under 20 seconds

      // Poll for completion with longer timeout for complex analysis
      let analysisComplete = false;
      let attempts = 0;
      const maxAttempts = 60; // 60 seconds for enterprise analysis

      while (!analysisComplete && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/strategic/analyze/${responseBody.analysis_id}`);
        const statusBody: StrategicAnalysisResponse = await statusResponse.json();

        if (statusBody.status === 'completed') {
          analysisComplete = true;
          
          // Validate Porter Five Forces results
          expect(statusBody.framework_results[0].framework).toBe('Porter Five Forces');
          expect(statusBody.framework_results[0].scores).toHaveProperty('competitive_rivalry');
          expect(statusBody.framework_results[0].scores).toHaveProperty('supplier_power');
          expect(statusBody.framework_results[0].scores).toHaveProperty('buyer_power');
          expect(statusBody.framework_results[0].scores).toHaveProperty('threat_of_substitutes');
          expect(statusBody.framework_results[0].scores).toHaveProperty('threat_of_new_entrants');
          
          // Validate enterprise-level recommendations
          expect(statusBody.recommendations.length).toBeGreaterThanOrEqual(3);
          expect(statusBody.recommendations.some(r => r.title.toLowerCase().includes('ai'))).toBe(true);
          expect(statusBody.recommendations.some(r => r.title.toLowerCase().includes('europe'))).toBe(true);
          
          // Validate high confidence for enterprise analysis
          expect(statusBody.confidence_score).toBeGreaterThanOrEqual(0.85); // 85% minimum for enterprise
          
          // Validate AI orchestration for complex analysis
          expect(statusBody.ai_team_utilization.reasoning_complexity).toBeGreaterThanOrEqual(9);
          expect(statusBody.ai_team_utilization.secondary_ai).toBeTruthy(); // Should use multiple AIs
        }

        attempts++;
      }

      expect(analysisComplete).toBe(true);
    });

    test('GET /api/strategic/competitive/{company_id} - Competitive Intelligence', async ({ request }) => {
      const companyId = 'test-company-123';
      
      const response = await request.get(`${baseURL}/strategic/competitive/${companyId}`);
      expect(response.status()).toBe(200);

      const competitiveData = await response.json();
      
      expect(competitiveData).toHaveProperty('competitive_landscape');
      expect(competitiveData).toHaveProperty('strategic_recommendations');
      expect(competitiveData).toHaveProperty('market_positioning');
      
      // Validate competitive landscape data
      expect(competitiveData.competitive_landscape.direct_competitors).toBeInstanceOf(Array);
      expect(competitiveData.competitive_landscape.market_analysis).toBeTruthy();
      expect(competitiveData.competitive_landscape.threat_assessment).toBeTruthy();
      
      // Validate strategic recommendations
      expect(competitiveData.strategic_recommendations).toBeInstanceOf(Array);
      expect(competitiveData.strategic_recommendations.length).toBeGreaterThan(0);
      
      // Validate market positioning
      expect(competitiveData.market_positioning).toHaveProperty('current_position');
      expect(competitiveData.market_positioning).toHaveProperty('recommended_position');
      expect(competitiveData.market_positioning).toHaveProperty('positioning_strategy');
    });

    test('POST /api/strategic/multi-framework - Multi-Framework Analysis', async ({ request }) => {
      const multiFrameworkRequest = {
        question: 'How should we approach our Series B fundraising strategy?',
        frameworks: ['RICE', 'OKR', 'SWOT'],
        context: testDataManager.getStartupContext('series_b'),
        cross_framework_analysis: true,
        synthesis_required: true
      };

      const response = await request.post(`${baseURL}/strategic/multi-framework`, {
        data: multiFrameworkRequest
      });

      expect(response.status()).toBe(202);

      const responseBody = await response.json();
      
      // Poll for completion
      let attempts = 0;
      let analysisComplete = false;

      while (!analysisComplete && attempts < 45) { // 45 seconds for multi-framework
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/strategic/multi-framework/${responseBody.analysis_id}`);
        const statusBody = await statusResponse.json();

        if (statusBody.status === 'completed') {
          analysisComplete = true;
          
          // Validate multi-framework results
          expect(statusBody.framework_results).toHaveLength(3);
          expect(statusBody.framework_results.map((f: any) => f.framework)).toEqual(
            expect.arrayContaining(['RICE', 'OKR', 'SWOT'])
          );
          
          // Validate cross-framework synthesis
          expect(statusBody).toHaveProperty('synthesis');
          expect(statusBody.synthesis.cross_framework_insights).toBeInstanceOf(Array);
          expect(statusBody.synthesis.unified_recommendations).toBeInstanceOf(Array);
          expect(statusBody.synthesis.framework_alignment_score).toBeGreaterThan(0.6);
        }

        attempts++;
      }

      expect(analysisComplete).toBe(true);
    });
  });

  test.describe('API Performance and Reliability', () => {
    test('Response time performance under load', async ({ request }) => {
      const analysisRequest: StrategicAnalysisRequest = {
        question: 'Quick feature prioritization test',
        framework: 'ICE',
        context: {
          company_profile: 'startup_context',
          market_data: testDataManager.getStartupContext(),
          competitive_landscape: {},
          historical_performance: {}
        },
        urgency: 'medium',
        stakeholders: ['product_team']
      };

      // Make 10 concurrent requests
      const promises = Array.from({ length: 10 }, () =>
        request.post(`${baseURL}/strategic/analyze`, {
          data: analysisRequest
        })
      );

      const responses = await Promise.all(promises);
      
      // All requests should be accepted
      responses.forEach(response => {
        expect(response.status()).toBe(202);
      });

      // Validate response times are reasonable under load
      const analysisIds = await Promise.all(responses.map(r => r.json()));
      
      for (const { analysis_id } of analysisIds) {
        let completed = false;
        let attempts = 0;

        while (!completed && attempts < 40) { // Allow more time under load
          await new Promise(resolve => setTimeout(resolve, 1000));

          const statusResponse = await request.get(`${baseURL}/strategic/analyze/${analysis_id}`);
          const statusBody = await statusResponse.json();

          if (statusBody.status === 'completed') {
            completed = true;
            expect(statusBody.processing_time_ms).toBeLessThan(25000); // 25 seconds under load
          }

          attempts++;
        }

        expect(completed).toBe(true);
      }
    });

    test('Error handling and validation', async ({ request }) => {
      // Test missing required fields
      const invalidRequest = {
        question: '', // Empty question
        framework: 'INVALID_FRAMEWORK' as any, // Invalid framework
        context: {} // Empty context
      };

      const response = await request.post(`${baseURL}/strategic/analyze`, {
        data: invalidRequest
      });

      expect(response.status()).toBe(400);

      const errorResponse = await response.json();
      expect(errorResponse).toHaveProperty('error');
      expect(errorResponse).toHaveProperty('validation_errors');
      expect(errorResponse.validation_errors).toBeInstanceOf(Array);
      expect(errorResponse.validation_errors.length).toBeGreaterThan(0);
    });

    test('Rate limiting behavior', async ({ request }) => {
      // Make rapid requests to test rate limiting
      const quickRequest = {
        question: 'Rate limit test',
        framework: 'ICE' as const,
        context: { company_profile: 'test', market_data: {}, competitive_landscape: {}, historical_performance: {} },
        urgency: 'low' as const,
        stakeholders: ['test']
      };

      const rapidRequests = Array.from({ length: 50 }, () =>
        request.post(`${baseURL}/strategic/analyze`, {
          data: quickRequest
        })
      );

      const responses = await Promise.allSettled(rapidRequests);
      
      // Should have some rate limited responses (429)
      const rateLimitedCount = responses.filter(r => 
        r.status === 'fulfilled' && r.value.status() === 429
      ).length;

      // Should have some successful responses
      const successfulCount = responses.filter(r =>
        r.status === 'fulfilled' && r.value.status() === 202
      ).length;

      expect(successfulCount).toBeGreaterThan(0);
      expect(rateLimitedCount).toBeGreaterThan(0);
    });

    test('Authentication and authorization', async ({ request }) => {
      const analysisRequest = {
        question: 'Auth test',
        framework: 'ICE' as const,
        context: { company_profile: 'test', market_data: {}, competitive_landscape: {}, historical_performance: {} },
        urgency: 'low' as const,
        stakeholders: ['test']
      };

      // Test without authorization header
      const noAuthResponse = await request.post(`${baseURL}/strategic/analyze`, {
        data: analysisRequest
      });

      expect(noAuthResponse.status()).toBe(401);

      // Test with invalid token
      const invalidAuthResponse = await request.post(`${baseURL}/strategic/analyze`, {
        data: analysisRequest,
        headers: {
          'Authorization': 'Bearer invalid-token'
        }
      });

      expect(invalidAuthResponse.status()).toBe(401);

      // Test with valid token
      const validAuthResponse = await request.post(`${baseURL}/strategic/analyze`, {
        data: analysisRequest,
        headers: {
          'Authorization': 'Bearer test-api-key'
        }
      });

      expect(validAuthResponse.status()).toBe(202);
    });
  });

  test.describe('AI Team Integration', () => {
    test('Claude AI primary reasoning validation', async ({ request }) => {
      const complexAnalysisRequest: StrategicAnalysisRequest = {
        question: 'Should we acquire our main competitor or build competing features organically?',
        framework: 'Porter Five Forces',
        context: {
          company_profile: 'growth_stage',
          market_data: testDataManager.getStartupContext('series_b'),
          competitive_landscape: {
            main_competitor: {
              valuation: 50000000,
              market_share: 0.25,
              strengths: ['brand recognition', 'customer base', 'distribution'],
              weaknesses: ['technical debt', 'slow innovation', 'high costs']
            }
          },
          historical_performance: {
            acquisition_experience: false,
            organic_growth_rate: 0.4,
            technical_capabilities: 'high'
          }
        },
        urgency: 'critical',
        stakeholders: ['ceo', 'cfo', 'vp_engineering', 'board']
      };

      const response = await request.post(`${baseURL}/strategic/analyze`, {
        data: complexAnalysisRequest,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      const { analysis_id } = await response.json();
      
      // Wait for completion and validate AI team utilization
      let attempts = 0;
      let analysisComplete = false;

      while (!analysisComplete && attempts < 45) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/strategic/analyze/${analysis_id}`);
        const statusBody: StrategicAnalysisResponse = await statusResponse.json();

        if (statusBody.status === 'completed') {
          analysisComplete = true;
          
          // Validate Claude was used for complex reasoning
          expect(statusBody.ai_team_utilization.primary_ai).toBe('claude');
          expect(statusBody.ai_team_utilization.reasoning_complexity).toBeGreaterThanOrEqual(9);
          
          // Validate quality of strategic reasoning
          expect(statusBody.confidence_score).toBeGreaterThanOrEqual(0.8);
          expect(statusBody.recommendations.length).toBeGreaterThanOrEqual(2);
          
          // Check for acquisition vs build analysis
          const hasAcquisitionRecommendation = statusBody.recommendations.some(r => 
            r.title.toLowerCase().includes('acqui')
          );
          const hasBuildRecommendation = statusBody.recommendations.some(r =>
            r.title.toLowerCase().includes('build') || r.title.toLowerCase().includes('develop')
          );
          
          expect(hasAcquisitionRecommendation || hasBuildRecommendation).toBe(true);
        }

        attempts++;
      }

      expect(analysisComplete).toBe(true);
    });
  });
});