// tests/integration/api/data-intelligence.api.spec.ts
// API integration tests for Data Intelligence AI Team endpoints
// Tests company-specific learning, predictive analytics, and performance optimization
// RELEVANT FILES: strategic-intelligence.api.spec.ts, workflow-execution.api.spec.ts, communication.api.spec.ts

import { test, expect } from '@playwright/test';
import { TestDataManager } from '../../e2e/helpers/test-data-manager';

interface DataLearningRequest {
  company_data: CompanyDataContext;
  learning_objectives: LearningObjective[];
  data_sources: DataSource[];
  learning_scope: 'immediate' | 'short_term' | 'long_term' | 'comprehensive';
  quality_requirements: {
    accuracy_threshold: number;
    confidence_minimum: number;
    data_freshness: string;
    validation_level: 'basic' | 'thorough' | 'comprehensive';
  };
}

interface CompanyDataContext {
  company_profile: {
    name: string;
    size: string;
    industry: string;
    maturity_stage: string;
  };
  historical_metrics: {
    timeframe: string;
    performance_data: any[];
    trend_data: any[];
    seasonal_patterns: any[];
  };
  current_state: {
    team_composition: any[];
    process_maturity: string;
    tool_ecosystem: string[];
    pain_points: string[];
  };
  strategic_context: {
    goals: string[];
    constraints: string[];
    priorities: string[];
    market_conditions: any;
  };
}

interface LearningObjective {
  category: 'performance_optimization' | 'trend_analysis' | 'predictive_modeling' | 'risk_assessment';
  specific_goal: string;
  success_metrics: string[];
  priority: 'critical' | 'high' | 'medium' | 'low';
  timeline: string;
}

interface DataSource {
  type: 'pm_tools' | 'analytics_platforms' | 'crm_systems' | 'financial_data' | 'user_feedback';
  platform: string;
  data_quality: number;
  update_frequency: string;
  relevance_score: number;
}

interface DataLearningResponse {
  learning_session_id: string;
  status: 'processing' | 'completed' | 'failed';
  learned_insights: LearnedInsight[];
  pattern_recognition: PatternRecognition;
  predictive_models: PredictiveModel[];
  optimization_opportunities: OptimizationOpportunity[];
  data_quality_assessment: DataQualityAssessment;
  processing_time_ms: number;
}

interface LearnedInsight {
  category: string;
  insight: string;
  confidence_score: number;
  supporting_evidence: any[];
  impact_assessment: string;
  actionable_recommendations: string[];
}

interface PatternRecognition {
  identified_patterns: Pattern[];
  seasonal_trends: SeasonalTrend[];
  anomaly_detection: Anomaly[];
  correlation_analysis: Correlation[];
}

interface Pattern {
  type: string;
  description: string;
  frequency: string;
  strength: number;
  predictive_value: number;
}

interface SeasonalTrend {
  pattern_name: string;
  cycle_length: string;
  peak_periods: string[];
  impact_magnitude: number;
}

interface PredictiveModel {
  model_type: string;
  prediction_horizon: string;
  accuracy_score: number;
  key_variables: string[];
  predictions: Prediction[];
}

interface Prediction {
  metric: string;
  predicted_value: number;
  confidence_interval: [number, number];
  factors: string[];
}

interface OptimizationOpportunity {
  category: string;
  opportunity: string;
  potential_impact: {
    efficiency_gain: number;
    time_savings: string;
    cost_reduction?: number;
    quality_improvement?: number;
  };
  implementation_effort: 'low' | 'medium' | 'high';
  priority_score: number;
}

interface DataQualityAssessment {
  overall_score: number;
  source_quality_scores: { [source: string]: number };
  data_completeness: number;
  data_consistency: number;
  data_accuracy: number;
  recommendations: string[];
}

test.describe('Data Intelligence AI Team API Integration', () => {
  let testDataManager: TestDataManager;
  let baseURL: string;
  
  test.beforeAll(() => {
    testDataManager = new TestDataManager();
    baseURL = process.env.API_BASE_URL || 'http://localhost:3000/api';
  });

  test.describe('Company Learning Endpoints', () => {
    test('POST /api/data/learn - Comprehensive Company Learning Session', async ({ request }) => {
      const startupContext = testDataManager.getStartupContext('pre_series_a');
      
      const learningRequest: DataLearningRequest = {
        company_data: {
          company_profile: {
            name: startupContext.company.name,
            size: startupContext.company.size,
            industry: startupContext.company.industry,
            maturity_stage: startupContext.company.stage
          },
          historical_metrics: {
            timeframe: 'last_12_months',
            performance_data: [
              { month: 'Jan', users: 1200, revenue: 15000, churn: 0.05 },
              { month: 'Feb', users: 1450, revenue: 18200, churn: 0.04 },
              { month: 'Mar', users: 1680, revenue: 21600, churn: 0.06 },
              { month: 'Apr', users: 1920, revenue: 24800, churn: 0.03 }
            ],
            trend_data: [
              { metric: 'user_growth', trend: 'increasing', rate: 0.15 },
              { metric: 'revenue_per_user', trend: 'stable', rate: 0.02 },
              { metric: 'churn_rate', trend: 'decreasing', rate: -0.08 }
            ],
            seasonal_patterns: [
              { pattern: 'q4_growth_spike', strength: 0.8, consistency: 0.7 },
              { pattern: 'summer_slowdown', strength: 0.6, consistency: 0.9 }
            ]
          },
          current_state: {
            team_composition: startupContext.team.roles.map(role => ({ role, count: 2 })),
            process_maturity: 'developing',
            tool_ecosystem: startupContext.tools_in_use,
            pain_points: startupContext.challenges
          },
          strategic_context: {
            goals: startupContext.goals,
            constraints: [
              `Monthly budget: $${startupContext.budget_constraints.monthly_budget}`,
              `Team size: ${startupContext.team.size} people`,
              'Limited enterprise sales experience'
            ],
            priorities: ['Series A preparation', 'Product-market fit', 'Team scaling'],
            market_conditions: {
              competition_level: 'high',
              market_growth: 'rapid',
              funding_environment: 'competitive'
            }
          }
        },
        learning_objectives: [
          {
            category: 'performance_optimization',
            specific_goal: 'Identify bottlenecks in current user acquisition funnel',
            success_metrics: ['conversion_rate_improvement', 'cost_per_acquisition_reduction'],
            priority: 'critical',
            timeline: '2_weeks'
          },
          {
            category: 'predictive_modeling',
            specific_goal: 'Predict user growth trajectory for Series A pitch',
            success_metrics: ['prediction_accuracy', 'confidence_intervals'],
            priority: 'high',
            timeline: '1_month'
          },
          {
            category: 'trend_analysis',
            specific_goal: 'Understand seasonal patterns in user behavior',
            success_metrics: ['pattern_identification', 'seasonal_adjustment_factors'],
            priority: 'medium',
            timeline: '3_weeks'
          }
        ],
        data_sources: [
          { type: 'analytics_platforms', platform: 'PostHog', data_quality: 0.9, update_frequency: 'real_time', relevance_score: 0.95 },
          { type: 'pm_tools', platform: 'Linear', data_quality: 0.85, update_frequency: 'daily', relevance_score: 0.8 },
          { type: 'user_feedback', platform: 'Intercom', data_quality: 0.75, update_frequency: 'continuous', relevance_score: 0.9 }
        ],
        learning_scope: 'comprehensive',
        quality_requirements: {
          accuracy_threshold: 0.85,
          confidence_minimum: 0.8,
          data_freshness: 'within_24_hours',
          validation_level: 'thorough'
        }
      };

      const response = await request.post(`${baseURL}/data/learn`, {
        data: learningRequest,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-api-key'
        }
      });

      expect(response.status()).toBe(202);

      const responseBody: { learning_session_id: string; estimated_completion: number } = await response.json();
      expect(responseBody.learning_session_id).toBeTruthy();
      expect(responseBody.estimated_completion).toBeLessThanOrEqual(45000); // Under 45 seconds

      // Poll for learning completion
      let learningComplete = false;
      let attempts = 0;
      const maxAttempts = 60; // 60 seconds for comprehensive learning

      while (!learningComplete && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/data/learn/${responseBody.learning_session_id}`);
        const statusBody: DataLearningResponse = await statusResponse.json();

        if (statusBody.status === 'completed') {
          learningComplete = true;
          
          // Validate learned insights
          expect(statusBody.learned_insights).toBeInstanceOf(Array);
          expect(statusBody.learned_insights.length).toBeGreaterThanOrEqual(5);
          
          statusBody.learned_insights.forEach(insight => {
            expect(insight.confidence_score).toBeGreaterThanOrEqual(0.8);
            expect(insight.supporting_evidence).toBeInstanceOf(Array);
            expect(insight.actionable_recommendations.length).toBeGreaterThan(0);
          });
          
          // Validate pattern recognition
          expect(statusBody.pattern_recognition.identified_patterns.length).toBeGreaterThan(0);
          expect(statusBody.pattern_recognition.seasonal_trends.length).toBeGreaterThanOrEqual(2);
          expect(statusBody.pattern_recognition.anomaly_detection).toBeInstanceOf(Array);
          expect(statusBody.pattern_recognition.correlation_analysis.length).toBeGreaterThan(0);
          
          // Validate predictive models
          expect(statusBody.predictive_models.length).toBeGreaterThanOrEqual(1);
          statusBody.predictive_models.forEach(model => {
            expect(model.accuracy_score).toBeGreaterThanOrEqual(0.75);
            expect(model.predictions.length).toBeGreaterThan(0);
            expect(model.key_variables.length).toBeGreaterThan(0);
          });
          
          // Validate optimization opportunities
          expect(statusBody.optimization_opportunities.length).toBeGreaterThanOrEqual(3);
          statusBody.optimization_opportunities.forEach(opportunity => {
            expect(opportunity.potential_impact.efficiency_gain).toBeGreaterThan(0);
            expect(['low', 'medium', 'high'].includes(opportunity.implementation_effort)).toBe(true);
            expect(opportunity.priority_score).toBeGreaterThan(0);
          });
          
          // Validate data quality assessment
          expect(statusBody.data_quality_assessment.overall_score).toBeGreaterThanOrEqual(0.8);
          expect(statusBody.data_quality_assessment.data_completeness).toBeGreaterThanOrEqual(0.8);
          expect(statusBody.data_quality_assessment.data_consistency).toBeGreaterThanOrEqual(0.8);
          expect(statusBody.data_quality_assessment.data_accuracy).toBeGreaterThanOrEqual(0.85);
          
          // Validate processing time
          expect(statusBody.processing_time_ms).toBeLessThan(45000);
          
        } else if (statusBody.status === 'failed') {
          throw new Error('Company learning session failed');
        }

        attempts++;
      }

      expect(learningComplete).toBe(true);
    });

    test('POST /api/data/learn - Enterprise Scale Learning', async ({ request }) => {
      const enterpriseContext = testDataManager.getEnterpriseContext('fortune_500');
      
      const enterpriseLearningRequest: DataLearningRequest = {
        company_data: {
          company_profile: {
            name: enterpriseContext.organization.name,
            size: enterpriseContext.organization.size,
            industry: enterpriseContext.organization.industry,
            maturity_stage: 'mature_enterprise'
          },
          historical_metrics: {
            timeframe: 'last_36_months',
            performance_data: Array.from({ length: 36 }, (_, i) => ({
              month: `Month_${i + 1}`,
              revenue: 800000000 + (Math.random() * 100000000),
              users: 2000000 + (Math.random() * 200000),
              market_share: 0.15 + (Math.random() * 0.05),
              efficiency_score: 75 + (Math.random() * 20)
            })),
            trend_data: [
              { metric: 'revenue_growth', trend: 'increasing', rate: 0.12 },
              { metric: 'market_share', trend: 'stable', rate: 0.01 },
              { metric: 'operational_efficiency', trend: 'improving', rate: 0.08 }
            ],
            seasonal_patterns: [
              { pattern: 'q4_enterprise_sales_peak', strength: 0.9, consistency: 0.95 },
              { pattern: 'q1_budget_cycle_impact', strength: 0.7, consistency: 0.85 },
              { pattern: 'summer_productivity_dip', strength: 0.4, consistency: 0.6 }
            ]
          },
          current_state: {
            team_composition: [
              { role: 'Product Managers', count: 25 },
              { role: 'Engineers', count: 150 },
              { role: 'Designers', count: 30 },
              { role: 'Data Scientists', count: 15 }
            ],
            process_maturity: 'optimized',
            tool_ecosystem: [
              ...enterpriseContext.enterprise_tools.pm_tools,
              ...enterpriseContext.enterprise_tools.analytics_tools
            ],
            pain_points: [
              'Cross-team coordination complexity',
              'Decision-making speed',
              'Innovation vs stability balance',
              'Regulatory compliance overhead'
            ]
          },
          strategic_context: {
            goals: [
              'Maintain market leadership',
              'Expand to new markets',
              'Digital transformation',
              'Operational excellence'
            ],
            constraints: [
              'Regulatory compliance requirements',
              'Legacy system dependencies',
              'Shareholder expectations',
              'Risk management protocols'
            ],
            priorities: [
              'Innovation acceleration',
              'Cost optimization',
              'Market expansion',
              'Talent retention'
            ],
            market_conditions: {
              competition_level: 'intense',
              market_growth: 'mature_steady',
              regulatory_environment: 'strict',
              technology_disruption: 'moderate'
            }
          }
        },
        learning_objectives: [
          {
            category: 'performance_optimization',
            specific_goal: 'Identify enterprise-scale process optimization opportunities',
            success_metrics: ['efficiency_improvement', 'cost_reduction', 'time_to_market'],
            priority: 'critical',
            timeline: '6_weeks'
          },
          {
            category: 'predictive_modeling',
            specific_goal: 'Build models for market demand forecasting',
            success_metrics: ['forecast_accuracy', 'demand_prediction_precision'],
            priority: 'high',
            timeline: '8_weeks'
          },
          {
            category: 'risk_assessment',
            specific_goal: 'Assess operational and strategic risks',
            success_metrics: ['risk_identification_completeness', 'mitigation_strategy_effectiveness'],
            priority: 'high',
            timeline: '4_weeks'
          }
        ],
        data_sources: [
          { type: 'analytics_platforms', platform: 'Tableau', data_quality: 0.95, update_frequency: 'hourly', relevance_score: 0.9 },
          { type: 'pm_tools', platform: 'Jira', data_quality: 0.9, update_frequency: 'real_time', relevance_score: 0.85 },
          { type: 'crm_systems', platform: 'Salesforce', data_quality: 0.92, update_frequency: 'real_time', relevance_score: 0.88 },
          { type: 'financial_data', platform: 'SAP', data_quality: 0.98, update_frequency: 'daily', relevance_score: 0.95 }
        ],
        learning_scope: 'comprehensive',
        quality_requirements: {
          accuracy_threshold: 0.95,
          confidence_minimum: 0.9,
          data_freshness: 'within_1_hour',
          validation_level: 'comprehensive'
        }
      };

      const response = await request.post(`${baseURL}/data/learn`, {
        data: enterpriseLearningRequest,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(202);

      const { learning_session_id } = await response.json();
      
      // Extended polling for enterprise-scale learning
      let attempts = 0;
      let learningComplete = false;

      while (!learningComplete && attempts < 120) { // 2 minutes for enterprise learning
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/data/learn/${learning_session_id}`);
        const statusBody: DataLearningResponse = await statusResponse.json();

        if (statusBody.status === 'completed') {
          learningComplete = true;
          
          // Validate enterprise-level learning results
          expect(statusBody.learned_insights.length).toBeGreaterThanOrEqual(15); // More insights for enterprise
          expect(statusBody.pattern_recognition.identified_patterns.length).toBeGreaterThanOrEqual(8);
          expect(statusBody.predictive_models.length).toBeGreaterThanOrEqual(3);
          expect(statusBody.optimization_opportunities.length).toBeGreaterThanOrEqual(10);
          
          // Validate high-quality enterprise standards
          statusBody.learned_insights.forEach(insight => {
            expect(insight.confidence_score).toBeGreaterThanOrEqual(0.9); // Higher bar for enterprise
          });
          
          statusBody.predictive_models.forEach(model => {
            expect(model.accuracy_score).toBeGreaterThanOrEqual(0.85); // Higher accuracy for enterprise
          });
          
          // Validate comprehensive data quality for enterprise
          expect(statusBody.data_quality_assessment.overall_score).toBeGreaterThanOrEqual(0.92);
          expect(statusBody.data_quality_assessment.data_accuracy).toBeGreaterThanOrEqual(0.95);
          
        } else if (statusBody.status === 'failed') {
          throw new Error('Enterprise learning session failed');
        }

        attempts++;
      }

      expect(learningComplete).toBe(true);
    });
  });

  test.describe('Predictive Analytics Endpoints', () => {
    test('GET /api/data/predictions/{company_id} - Company Performance Predictions', async ({ request }) => {
      const companyId = 'test-company-predictions-456';
      
      const response = await request.get(`${baseURL}/data/predictions/${companyId}`, {
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(200);

      const predictionsData = await response.json();
      
      // Validate prediction response structure
      expect(predictionsData).toHaveProperty('performance_predictions');
      expect(predictionsData).toHaveProperty('optimization_opportunities');
      expect(predictionsData).toHaveProperty('risk_assessments');
      expect(predictionsData).toHaveProperty('trend_forecasts');
      
      // Validate performance predictions
      expect(predictionsData.performance_predictions).toBeInstanceOf(Array);
      expect(predictionsData.performance_predictions.length).toBeGreaterThan(0);
      
      predictionsData.performance_predictions.forEach((prediction: any) => {
        expect(prediction).toHaveProperty('metric');
        expect(prediction).toHaveProperty('current_value');
        expect(prediction).toHaveProperty('predicted_value');
        expect(prediction).toHaveProperty('confidence_score');
        expect(prediction).toHaveProperty('prediction_horizon');
        expect(prediction).toHaveProperty('key_factors');
        
        expect(prediction.confidence_score).toBeGreaterThanOrEqual(0.6);
        expect(prediction.confidence_score).toBeLessThanOrEqual(1.0);
        expect(prediction.key_factors).toBeInstanceOf(Array);
      });
      
      // Validate optimization opportunities
      expect(predictionsData.optimization_opportunities).toBeInstanceOf(Array);
      predictionsData.optimization_opportunities.forEach((opportunity: any) => {
        expect(opportunity).toHaveProperty('category');
        expect(opportunity).toHaveProperty('description');
        expect(opportunity).toHaveProperty('potential_impact');
        expect(opportunity).toHaveProperty('implementation_complexity');
        expect(opportunity).toHaveProperty('timeline');
      });
      
      // Validate risk assessments
      expect(predictionsData.risk_assessments).toBeInstanceOf(Array);
      predictionsData.risk_assessments.forEach((risk: any) => {
        expect(risk).toHaveProperty('risk_type');
        expect(risk).toHaveProperty('severity');
        expect(risk).toHaveProperty('probability');
        expect(risk).toHaveProperty('impact_description');
        expect(risk).toHaveProperty('mitigation_suggestions');
        expect(['low', 'medium', 'high', 'critical'].includes(risk.severity)).toBe(true);
      });
    });

    test('POST /api/data/predictions/custom - Custom Predictive Modeling', async ({ request }) => {
      const customModelRequest = {
        model_type: 'user_growth_prediction',
        target_metrics: ['monthly_active_users', 'conversion_rate', 'churn_rate'],
        historical_data_period: 'last_18_months',
        prediction_horizon: '6_months',
        feature_variables: [
          'marketing_spend',
          'product_releases',
          'seasonal_factors',
          'competitive_activity',
          'economic_indicators'
        ],
        validation_requirements: {
          accuracy_threshold: 0.8,
          cross_validation_folds: 5,
          test_set_size: 0.2
        },
        business_constraints: {
          growth_rate_bounds: { min: -0.1, max: 0.5 },
          seasonality_adjustment: true,
          external_factor_weights: {
            marketing_spend: 0.3,
            product_quality: 0.4,
            market_conditions: 0.3
          }
        }
      };

      const response = await request.post(`${baseURL}/data/predictions/custom`, {
        data: customModelRequest,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(202);

      const { model_id } = await response.json();
      
      // Poll for model training completion
      let attempts = 0;
      let modelComplete = false;

      while (!modelComplete && attempts < 90) { // 90 seconds for model training
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/data/predictions/custom/${model_id}`);
        const statusBody = await statusResponse.json();

        if (statusBody.status === 'completed') {
          modelComplete = true;
          
          // Validate custom model results
          expect(statusBody.model_performance).toBeTruthy();
          expect(statusBody.model_performance.accuracy_score).toBeGreaterThanOrEqual(0.8);
          expect(statusBody.model_performance.validation_metrics).toBeTruthy();
          
          // Validate predictions
          expect(statusBody.predictions).toBeInstanceOf(Array);
          expect(statusBody.predictions.length).toBe(6); // 6 months of predictions
          
          statusBody.predictions.forEach((prediction: any) => {
            expect(prediction).toHaveProperty('period');
            expect(prediction).toHaveProperty('predicted_values');
            expect(prediction).toHaveProperty('confidence_intervals');
            expect(prediction.predicted_values).toHaveProperty('monthly_active_users');
            expect(prediction.predicted_values).toHaveProperty('conversion_rate');
            expect(prediction.predicted_values).toHaveProperty('churn_rate');
          });
          
          // Validate feature importance
          expect(statusBody.feature_importance).toBeInstanceOf(Array);
          expect(statusBody.feature_importance.length).toBe(5); // 5 feature variables
          
          // Validate model interpretability
          expect(statusBody.model_explanation).toBeTruthy();
          expect(statusBody.model_explanation.key_drivers).toBeInstanceOf(Array);
          expect(statusBody.model_explanation.sensitivity_analysis).toBeTruthy();
          
        } else if (statusBody.status === 'failed') {
          throw new Error('Custom model training failed');
        }

        attempts++;
      }

      expect(modelComplete).toBe(true);
    });
  });

  test.describe('Data Quality and Validation', () => {
    test('POST /api/data/quality/assess - Data Quality Assessment', async ({ request }) => {
      const qualityAssessmentRequest = {
        data_sources: [
          {
            source_id: 'posthog_analytics',
            source_type: 'analytics_platform',
            connection_details: {
              api_endpoint: 'https://app.posthog.com/api',
              data_types: ['events', 'users', 'cohorts', 'funnels']
            }
          },
          {
            source_id: 'linear_pm',
            source_type: 'pm_tool',
            connection_details: {
              api_endpoint: 'https://api.linear.app/graphql',
              data_types: ['issues', 'projects', 'cycles', 'teams']
            }
          },
          {
            source_id: 'stripe_revenue',
            source_type: 'financial_data',
            connection_details: {
              api_endpoint: 'https://api.stripe.com/v1',
              data_types: ['charges', 'customers', 'subscriptions', 'invoices']
            }
          }
        ],
        assessment_scope: 'comprehensive',
        quality_dimensions: [
          'completeness',
          'accuracy',
          'consistency',
          'timeliness',
          'validity',
          'uniqueness'
        ],
        validation_rules: [
          { field: 'user_id', rule: 'not_null', severity: 'critical' },
          { field: 'timestamp', rule: 'valid_datetime', severity: 'critical' },
          { field: 'revenue_amount', rule: 'positive_number', severity: 'high' },
          { field: 'event_type', rule: 'valid_enum', severity: 'medium' }
        ]
      };

      const response = await request.post(`${baseURL}/data/quality/assess`, {
        data: qualityAssessmentRequest,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(202);

      const { assessment_id } = await response.json();
      
      // Poll for assessment completion
      let attempts = 0;
      let assessmentComplete = false;

      while (!assessmentComplete && attempts < 60) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/data/quality/assess/${assessment_id}`);
        const statusBody = await statusResponse.json();

        if (statusBody.status === 'completed') {
          assessmentComplete = true;
          
          // Validate quality assessment results
          expect(statusBody.overall_quality_score).toBeGreaterThanOrEqual(0);
          expect(statusBody.overall_quality_score).toBeLessThanOrEqual(100);
          
          // Validate source-specific scores
          expect(statusBody.source_assessments).toHaveLength(3);
          statusBody.source_assessments.forEach((assessment: any) => {
            expect(assessment).toHaveProperty('source_id');
            expect(assessment).toHaveProperty('quality_dimensions');
            expect(assessment).toHaveProperty('validation_results');
            expect(assessment).toHaveProperty('data_profiling');
            
            // Validate quality dimensions
            expect(assessment.quality_dimensions).toHaveProperty('completeness');
            expect(assessment.quality_dimensions).toHaveProperty('accuracy');
            expect(assessment.quality_dimensions).toHaveProperty('consistency');
            expect(assessment.quality_dimensions).toHaveProperty('timeliness');
            
            // Validate validation results
            expect(assessment.validation_results.rules_passed).toBeGreaterThanOrEqual(0);
            expect(assessment.validation_results.rules_failed).toBeGreaterThanOrEqual(0);
            expect(assessment.validation_results.critical_violations).toBeInstanceOf(Array);
          });
          
          // Validate recommendations
          expect(statusBody.improvement_recommendations).toBeInstanceOf(Array);
          expect(statusBody.improvement_recommendations.length).toBeGreaterThan(0);
          
          statusBody.improvement_recommendations.forEach((recommendation: any) => {
            expect(recommendation).toHaveProperty('category');
            expect(recommendation).toHaveProperty('description');
            expect(recommendation).toHaveProperty('priority');
            expect(recommendation).toHaveProperty('estimated_impact');
            expect(['low', 'medium', 'high', 'critical'].includes(recommendation.priority)).toBe(true);
          });
          
        } else if (statusBody.status === 'failed') {
          throw new Error('Data quality assessment failed');
        }

        attempts++;
      }

      expect(assessmentComplete).toBe(true);
    });

    test('GET /api/data/quality/monitoring/{company_id} - Continuous Quality Monitoring', async ({ request }) => {
      const companyId = 'test-company-monitoring-789';
      
      const response = await request.get(`${baseURL}/data/quality/monitoring/${companyId}`, {
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(200);

      const monitoringData = await response.json();
      
      // Validate monitoring response
      expect(monitoringData).toHaveProperty('current_quality_status');
      expect(monitoringData).toHaveProperty('quality_trends');
      expect(monitoringData).toHaveProperty('alert_thresholds');
      expect(monitoringData).toHaveProperty('data_lineage');
      expect(monitoringData).toHaveProperty('automated_checks');
      
      // Validate current status
      const currentStatus = monitoringData.current_quality_status;
      expect(currentStatus.overall_health).toBeOneOf(['healthy', 'warning', 'critical']);
      expect(currentStatus.last_updated).toBeTruthy();
      expect(currentStatus.active_issues).toBeInstanceOf(Array);
      
      // Validate quality trends
      expect(monitoringData.quality_trends.completeness_trend).toBeInstanceOf(Array);
      expect(monitoringData.quality_trends.accuracy_trend).toBeInstanceOf(Array);
      expect(monitoringData.quality_trends.timeliness_trend).toBeInstanceOf(Array);
      
      // Validate automated checks
      expect(monitoringData.automated_checks.total_checks).toBeGreaterThan(0);
      expect(monitoringData.automated_checks.passing_checks).toBeGreaterThanOrEqual(0);
      expect(monitoringData.automated_checks.failing_checks).toBeGreaterThanOrEqual(0);
      expect(monitoringData.automated_checks.check_frequency).toBeTruthy();
    });
  });

  test.describe('Performance and Scale Testing', () => {
    test('Large dataset learning performance', async ({ request }) => {
      const largeDatasetRequest: DataLearningRequest = {
        company_data: {
          company_profile: {
            name: 'Large Scale Test Company',
            size: 'Enterprise (10,000+)',
            industry: 'Technology',
            maturity_stage: 'scale_up'
          },
          historical_metrics: {
            timeframe: 'last_60_months',
            performance_data: Array.from({ length: 60 }, (_, i) => ({
              month: `Month_${i + 1}`,
              users: 100000 + (i * 5000) + (Math.random() * 10000),
              revenue: 1000000 + (i * 50000) + (Math.random() * 100000),
              efficiency_metrics: Array.from({ length: 20 }, () => Math.random() * 100)
            })),
            trend_data: Array.from({ length: 25 }, (_, i) => ({
              metric: `metric_${i}`,
              trend: ['increasing', 'decreasing', 'stable'][Math.floor(Math.random() * 3)],
              rate: (Math.random() - 0.5) * 0.4
            })),
            seasonal_patterns: Array.from({ length: 12 }, (_, i) => ({
              pattern: `pattern_${i}`,
              strength: Math.random(),
              consistency: Math.random()
            }))
          },
          current_state: {
            team_composition: Array.from({ length: 15 }, (_, i) => ({ role: `Role_${i}`, count: Math.floor(Math.random() * 20) + 5 })),
            process_maturity: 'optimized',
            tool_ecosystem: Array.from({ length: 25 }, (_, i) => `Tool_${i}`),
            pain_points: Array.from({ length: 10 }, (_, i) => `Pain_Point_${i}`)
          },
          strategic_context: {
            goals: Array.from({ length: 8 }, (_, i) => `Goal_${i}`),
            constraints: Array.from({ length: 6 }, (_, i) => `Constraint_${i}`),
            priorities: Array.from({ length: 5 }, (_, i) => `Priority_${i}`),
            market_conditions: {
              competition_level: 'intense',
              market_growth: 'rapid',
              disruption_risk: 'moderate'
            }
          }
        },
        learning_objectives: Array.from({ length: 8 }, (_, i) => ({
          category: ['performance_optimization', 'trend_analysis', 'predictive_modeling', 'risk_assessment'][i % 4] as any,
          specific_goal: `Large scale objective ${i + 1}`,
          success_metrics: [`metric_${i}_1`, `metric_${i}_2`],
          priority: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as any,
          timeline: ['1_week', '2_weeks', '1_month', '2_months'][Math.floor(Math.random() * 4)]
        })),
        data_sources: Array.from({ length: 8 }, (_, i) => ({
          type: ['pm_tools', 'analytics_platforms', 'crm_systems', 'financial_data', 'user_feedback'][i % 5] as any,
          platform: `Platform_${i}`,
          data_quality: 0.8 + (Math.random() * 0.2),
          update_frequency: ['real_time', 'hourly', 'daily'][Math.floor(Math.random() * 3)],
          relevance_score: 0.7 + (Math.random() * 0.3)
        })),
        learning_scope: 'comprehensive',
        quality_requirements: {
          accuracy_threshold: 0.85,
          confidence_minimum: 0.8,
          data_freshness: 'within_6_hours',
          validation_level: 'thorough'
        }
      };

      const startTime = Date.now();
      
      const response = await request.post(`${baseURL}/data/learn`, {
        data: largeDatasetRequest,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(202);

      const { learning_session_id } = await response.json();
      
      // Extended timeout for large dataset processing
      let attempts = 0;
      let learningComplete = false;

      while (!learningComplete && attempts < 180) { // 3 minutes for large dataset
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/data/learn/${learning_session_id}`);
        const statusBody: DataLearningResponse = await statusResponse.json();

        if (statusBody.status === 'completed') {
          learningComplete = true;
          
          const totalTime = Date.now() - startTime;
          
          // Validate large dataset processing performance
          expect(totalTime).toBeLessThan(180000); // Under 3 minutes
          expect(statusBody.processing_time_ms).toBeLessThan(180000);
          
          // Should still deliver quality results
          expect(statusBody.learned_insights.length).toBeGreaterThanOrEqual(10);
          expect(statusBody.pattern_recognition.identified_patterns.length).toBeGreaterThanOrEqual(15);
          expect(statusBody.optimization_opportunities.length).toBeGreaterThanOrEqual(12);
          
          // Quality should be maintained despite scale
          expect(statusBody.data_quality_assessment.overall_score).toBeGreaterThanOrEqual(0.8);
          
          const averageInsightConfidence = statusBody.learned_insights.reduce((sum, insight) => 
            sum + insight.confidence_score, 0) / statusBody.learned_insights.length;
          expect(averageInsightConfidence).toBeGreaterThanOrEqual(0.75);
          
        } else if (statusBody.status === 'failed') {
          throw new Error('Large dataset learning failed');
        }

        attempts++;
      }

      expect(learningComplete).toBe(true);
    });

    test('Concurrent learning sessions', async ({ request }) => {
      const concurrentRequests = Array.from({ length: 5 }, (_, i) => ({
        company_data: {
          company_profile: {
            name: `Concurrent Company ${i}`,
            size: 'Startup (50-200)',
            industry: 'SaaS',
            maturity_stage: 'growth'
          },
          historical_metrics: {
            timeframe: 'last_12_months',
            performance_data: Array.from({ length: 12 }, (_, j) => ({
              month: j + 1,
              users: 1000 + (j * 100),
              revenue: 10000 + (j * 1000)
            })),
            trend_data: [{ metric: 'growth', trend: 'increasing', rate: 0.1 }],
            seasonal_patterns: []
          },
          current_state: {
            team_composition: [{ role: 'PM', count: 2 }],
            process_maturity: 'developing',
            tool_ecosystem: ['Linear', 'PostHog'],
            pain_points: ['Scale challenges']
          },
          strategic_context: {
            goals: ['Growth'],
            constraints: ['Budget'],
            priorities: ['Scale'],
            market_conditions: {}
          }
        },
        learning_objectives: [
          {
            category: 'performance_optimization' as const,
            specific_goal: `Optimization for company ${i}`,
            success_metrics: ['efficiency'],
            priority: 'medium' as const,
            timeline: '2_weeks'
          }
        ],
        data_sources: [
          {
            type: 'analytics_platforms' as const,
            platform: 'PostHog',
            data_quality: 0.9,
            update_frequency: 'daily',
            relevance_score: 0.8
          }
        ],
        learning_scope: 'short_term' as const,
        quality_requirements: {
          accuracy_threshold: 0.8,
          confidence_minimum: 0.75,
          data_freshness: 'within_24_hours',
          validation_level: 'basic' as const
        }
      }));

      const responses = await Promise.all(
        concurrentRequests.map(req => 
          request.post(`${baseURL}/data/learn`, {
            data: req,
            headers: { 'Authorization': 'Bearer test-api-key' }
          })
        )
      );

      // All should be accepted
      responses.forEach(response => {
        expect(response.status()).toBe(202);
      });

      const sessionIds = await Promise.all(responses.map(r => r.json()));
      
      // Monitor all sessions concurrently
      const completionPromises = sessionIds.map(async ({ learning_session_id }: any) => {
        let attempts = 0;
        while (attempts < 60) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const statusResponse = await request.get(`${baseURL}/data/learn/${learning_session_id}`);
          const statusBody = await statusResponse.json();
          
          if (statusBody.status === 'completed') {
            return statusBody;
          } else if (statusBody.status === 'failed') {
            throw new Error(`Learning session ${learning_session_id} failed`);
          }
          
          attempts++;
        }
        throw new Error(`Learning session ${learning_session_id} did not complete in time`);
      });

      const results = await Promise.all(completionPromises);
      
      // Validate all concurrent sessions completed successfully
      expect(results.length).toBe(5);
      
      results.forEach((result, index) => {
        expect(result.learned_insights.length).toBeGreaterThan(0);
        expect(result.data_quality_assessment.overall_score).toBeGreaterThanOrEqual(0.75);
        expect(result.processing_time_ms).toBeLessThan(60000); // Each under 60 seconds
      });
    });
  });
});