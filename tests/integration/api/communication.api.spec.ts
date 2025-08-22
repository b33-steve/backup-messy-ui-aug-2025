// tests/integration/api/communication.api.spec.ts
// API integration tests for Communication AI Team endpoints
// Tests stakeholder communication generation, executive summaries, and cross-team alignment
// RELEVANT FILES: strategic-intelligence.api.spec.ts, workflow-execution.api.spec.ts, data-intelligence.api.spec.ts

import { test, expect } from '@playwright/test';
import { TestDataManager } from '../../e2e/helpers/test-data-manager';

interface CommunicationGenerationRequest {
  type: 'executive_summary' | 'team_update' | 'stakeholder_report' | 'project_status' | 'strategic_brief';
  source_analysis_id?: string;
  content_params: {
    audience: string[];
    formality: 'casual' | 'professional' | 'executive';
    length: 'brief' | 'detailed' | 'comprehensive';
    focus_areas: string[];
    key_metrics?: string[];
    time_period?: string;
  };
  template_preferences?: {
    company_branding: boolean;
    custom_template_id?: string;
    include_charts: boolean;
    include_recommendations: boolean;
  };
  export_formats: ('pdf' | 'docx' | 'html' | 'markdown' | 'powerpoint' | 'slack' | 'email')[];
}

interface CommunicationGenerationResponse {
  communication_id: string;
  status: 'processing' | 'completed' | 'failed';
  generated_content: GeneratedContent;
  export_urls: { [format: string]: string };
  quality_metrics: QualityMetrics;
  ai_generation_details: AIGenerationDetails;
  processing_time_ms: number;
}

interface GeneratedContent {
  title: string;
  executive_summary: string;
  main_content: ContentSection[];
  key_takeaways: string[];
  recommendations: Recommendation[];
  appendices?: ContentSection[];
}

interface ContentSection {
  heading: string;
  content: string;
  supporting_data?: any[];
  visualizations?: string[];
}

interface Recommendation {
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  timeline: string;
  owner?: string;
  success_metrics?: string[];
}

interface QualityMetrics {
  readability_score: number;
  audience_alignment: number;
  content_completeness: number;
  tone_consistency: number;
  factual_accuracy: number;
}

interface AIGenerationDetails {
  primary_ai: string;
  content_ai?: string;
  generation_approach: string;
  customization_level: number;
  revision_iterations: number;
}

interface AlignmentRequest {
  teams: TeamInfo[];
  objectives: AlignmentObjective[];
  communication_preferences: CommunicationPreference[];
  timeline: string;
  success_metrics: string[];
}

interface TeamInfo {
  name: string;
  size: number;
  lead: string;
  current_priorities: string[];
  communication_style: 'direct' | 'collaborative' | 'data_driven' | 'visual';
}

interface AlignmentObjective {
  title: string;
  description: string;
  success_criteria: string[];
  dependencies: string[];
  stakeholders: string[];
}

interface CommunicationPreference {
  team: string;
  preferred_channels: string[];
  frequency: 'daily' | 'weekly' | 'bi_weekly' | 'monthly';
  format: 'brief' | 'detailed' | 'visual';
}

test.describe('Communication AI Team API Integration', () => {
  let testDataManager: TestDataManager;
  let baseURL: string;
  
  test.beforeAll(() => {
    testDataManager = new TestDataManager();
    baseURL = process.env.API_BASE_URL || 'http://localhost:3000/api';
  });

  test.describe('Content Generation Endpoints', () => {
    test('POST /api/communication/generate - Executive Summary from Strategic Analysis', async ({ request }) => {
      const executiveSummaryRequest: CommunicationGenerationRequest = {
        type: 'executive_summary',
        source_analysis_id: 'test-strategic-analysis-789',
        content_params: {
          audience: ['ceo', 'board_members', 'investors'],
          formality: 'executive',
          length: 'comprehensive',
          focus_areas: [
            'strategic_recommendations',
            'financial_impact',
            'risk_assessment',
            'implementation_timeline',
            'resource_requirements'
          ],
          key_metrics: [
            'projected_roi',
            'market_opportunity_size',
            'competitive_advantage',
            'implementation_timeline'
          ],
          time_period: 'next_12_months'
        },
        template_preferences: {
          company_branding: true,
          include_charts: true,
          include_recommendations: true
        },
        export_formats: ['pdf', 'powerpoint', 'html']
      };

      const response = await request.post(`${baseURL}/communication/generate`, {
        data: executiveSummaryRequest,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-api-key'
        }
      });

      expect(response.status()).toBe(202);

      const responseBody: { communication_id: string; estimated_completion: number } = await response.json();
      expect(responseBody.communication_id).toBeTruthy();
      expect(responseBody.estimated_completion).toBeLessThanOrEqual(15000); // Under 15 seconds

      // Poll for completion
      let generationComplete = false;
      let attempts = 0;
      const maxAttempts = 30;

      while (!generationComplete && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/communication/${responseBody.communication_id}`);
        const statusBody: CommunicationGenerationResponse = await statusResponse.json();

        if (statusBody.status === 'completed') {
          generationComplete = true;
          
          // Validate executive summary content structure
          expect(statusBody.generated_content.title).toBeTruthy();
          expect(statusBody.generated_content.executive_summary).toBeTruthy();
          expect(statusBody.generated_content.main_content).toBeInstanceOf(Array);
          expect(statusBody.generated_content.main_content.length).toBeGreaterThanOrEqual(4);
          expect(statusBody.generated_content.key_takeaways).toBeInstanceOf(Array);
          expect(statusBody.generated_content.recommendations).toBeInstanceOf(Array);
          
          // Validate content sections
          const contentSections = statusBody.generated_content.main_content;
          const sectionHeadings = contentSections.map(section => section.heading.toLowerCase());
          expect(sectionHeadings.some(h => h.includes('strategic'))).toBe(true);
          expect(sectionHeadings.some(h => h.includes('financial') || h.includes('impact'))).toBe(true);
          expect(sectionHeadings.some(h => h.includes('risk'))).toBe(true);
          expect(sectionHeadings.some(h => h.includes('timeline') || h.includes('implementation'))).toBe(true);
          
          // Validate quality metrics
          expect(statusBody.quality_metrics.readability_score).toBeGreaterThanOrEqual(70);
          expect(statusBody.quality_metrics.audience_alignment).toBeGreaterThanOrEqual(85);
          expect(statusBody.quality_metrics.content_completeness).toBeGreaterThanOrEqual(90);
          expect(statusBody.quality_metrics.tone_consistency).toBeGreaterThanOrEqual(85);
          expect(statusBody.quality_metrics.factual_accuracy).toBeGreaterThanOrEqual(95);
          
          // Validate export formats
          expect(statusBody.export_urls).toHaveProperty('pdf');
          expect(statusBody.export_urls).toHaveProperty('powerpoint');
          expect(statusBody.export_urls).toHaveProperty('html');
          
          // Validate AI generation details
          expect(['claude', 'openai'].includes(statusBody.ai_generation_details.primary_ai)).toBe(true);
          expect(statusBody.ai_generation_details.customization_level).toBeGreaterThanOrEqual(8);
          
          // Validate processing time
          expect(statusBody.processing_time_ms).toBeLessThan(15000);
          
        } else if (statusBody.status === 'failed') {
          throw new Error('Executive summary generation failed');
        }

        attempts++;
      }

      expect(generationComplete).toBe(true);
    });

    test('POST /api/communication/generate - Multi-Team Update', async ({ request }) => {
      const teamUpdateRequest: CommunicationGenerationRequest = {
        type: 'team_update',
        content_params: {
          audience: ['product_team', 'engineering_team', 'design_team', 'marketing_team'],
          formality: 'professional',
          length: 'detailed',
          focus_areas: [
            'sprint_achievements',
            'blockers_and_challenges',
            'upcoming_priorities',
            'cross_team_dependencies',
            'metrics_and_kpis'
          ],
          key_metrics: [
            'sprint_velocity',
            'story_completion_rate',
            'bug_resolution_time',
            'user_satisfaction_score'
          ],
          time_period: 'current_sprint'
        },
        template_preferences: {
          company_branding: true,
          include_charts: true,
          include_recommendations: false
        },
        export_formats: ['markdown', 'slack', 'email', 'html']
      };

      const response = await request.post(`${baseURL}/communication/generate`, {
        data: teamUpdateRequest,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(202);

      const { communication_id } = await response.json();
      
      // Poll for completion
      let attempts = 0;
      let generationComplete = false;

      while (!generationComplete && attempts < 25) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/communication/${communication_id}`);
        const statusBody: CommunicationGenerationResponse = await statusResponse.json();

        if (statusBody.status === 'completed') {
          generationComplete = true;
          
          // Validate team update structure
          expect(statusBody.generated_content.main_content.length).toBeGreaterThanOrEqual(4);
          
          const sectionHeadings = statusBody.generated_content.main_content.map(s => s.heading.toLowerCase());
          expect(sectionHeadings.some(h => h.includes('achievement') || h.includes('completed'))).toBe(true);
          expect(sectionHeadings.some(h => h.includes('blocker') || h.includes('challenge'))).toBe(true);
          expect(sectionHeadings.some(h => h.includes('upcoming') || h.includes('priority'))).toBe(true);
          expect(sectionHeadings.some(h => h.includes('metric') || h.includes('kpi'))).toBe(true);
          
          // Validate multi-format exports
          expect(statusBody.export_urls).toHaveProperty('markdown');
          expect(statusBody.export_urls).toHaveProperty('slack');
          expect(statusBody.export_urls).toHaveProperty('email');
          expect(statusBody.export_urls).toHaveProperty('html');
          
          // Validate professional tone for team context
          expect(statusBody.quality_metrics.tone_consistency).toBeGreaterThanOrEqual(80);
          expect(statusBody.quality_metrics.audience_alignment).toBeGreaterThanOrEqual(85);
          
        } else if (statusBody.status === 'failed') {
          throw new Error('Team update generation failed');
        }

        attempts++;
      }

      expect(generationComplete).toBe(true);
    });

    test('POST /api/communication/generate - Stakeholder Status Report', async ({ request }) => {
      const stakeholderReportRequest: CommunicationGenerationRequest = {
        type: 'stakeholder_report',
        content_params: {
          audience: ['project_sponsors', 'department_heads', 'external_stakeholders'],
          formality: 'professional',
          length: 'comprehensive',
          focus_areas: [
            'project_status',
            'milestone_progress',
            'budget_utilization',
            'risk_mitigation',
            'stakeholder_feedback',
            'next_phase_planning'
          ],
          key_metrics: [
            'project_completion_percentage',
            'budget_variance',
            'timeline_adherence',
            'quality_metrics',
            'stakeholder_satisfaction'
          ],
          time_period: 'quarter_to_date'
        },
        template_preferences: {
          company_branding: true,
          include_charts: true,
          include_recommendations: true
        },
        export_formats: ['pdf', 'powerpoint']
      };

      const response = await request.post(`${baseURL}/communication/generate`, {
        data: stakeholderReportRequest,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      const { communication_id } = await response.json();
      
      // Extended polling for comprehensive reports
      let attempts = 0;
      let generationComplete = false;

      while (!generationComplete && attempts < 40) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/communication/${communication_id}`);
        const statusBody: CommunicationGenerationResponse = await statusResponse.json();

        if (statusBody.status === 'completed') {
          generationComplete = true;
          
          // Validate comprehensive stakeholder report
          expect(statusBody.generated_content.main_content.length).toBeGreaterThanOrEqual(6);
          expect(statusBody.generated_content.recommendations.length).toBeGreaterThanOrEqual(3);
          
          // Validate stakeholder-specific content
          const content = statusBody.generated_content.main_content;
          expect(content.some(s => s.heading.toLowerCase().includes('status'))).toBe(true);
          expect(content.some(s => s.heading.toLowerCase().includes('milestone'))).toBe(true);
          expect(content.some(s => s.heading.toLowerCase().includes('budget'))).toBe(true);
          expect(content.some(s => s.heading.toLowerCase().includes('risk'))).toBe(true);
          
          // Validate high-quality metrics for stakeholder communications
          expect(statusBody.quality_metrics.content_completeness).toBeGreaterThanOrEqual(95);
          expect(statusBody.quality_metrics.factual_accuracy).toBeGreaterThanOrEqual(98);
          expect(statusBody.quality_metrics.audience_alignment).toBeGreaterThanOrEqual(90);
        }

        attempts++;
      }

      expect(generationComplete).toBe(true);
    });
  });

  test.describe('Cross-Team Alignment Endpoints', () => {
    test('POST /api/communication/align - Multi-Team Alignment Facilitation', async ({ request }) => {
      const alignmentRequest: AlignmentRequest = {
        teams: [
          {
            name: 'Product Team',
            size: 8,
            lead: 'Sarah Johnson',
            current_priorities: ['user_experience', 'feature_delivery', 'market_research'],
            communication_style: 'data_driven'
          },
          {
            name: 'Engineering Team',
            size: 12,
            lead: 'Mike Chen',
            current_priorities: ['technical_debt', 'performance_optimization', 'system_scalability'],
            communication_style: 'direct'
          },
          {
            name: 'Design Team',
            size: 5,
            lead: 'Alex Rivera',
            current_priorities: ['design_system', 'user_research', 'accessibility'],
            communication_style: 'visual'
          },
          {
            name: 'Marketing Team',
            size: 6,
            lead: 'Lisa Park',
            current_priorities: ['go_to_market', 'content_strategy', 'customer_acquisition'],
            communication_style: 'collaborative'
          }
        ],
        objectives: [
          {
            title: 'Q2 Product Launch',
            description: 'Coordinate cross-team efforts for major product launch',
            success_criteria: [
              'Feature complete by end of Q1',
              'Marketing materials ready 2 weeks before launch',
              'User acceptance testing completed',
              'Performance benchmarks met'
            ],
            dependencies: [
              'Technical architecture review',
              'Design system finalization',
              'Marketing strategy approval'
            ],
            stakeholders: ['product_team', 'engineering_team', 'design_team', 'marketing_team']
          },
          {
            title: 'Cross-Team Process Optimization',
            description: 'Improve collaboration efficiency and reduce handoff delays',
            success_criteria: [
              'Handoff time reduced by 50%',
              'Communication clarity score >90%',
              'Cross-team satisfaction score >85%'
            ],
            dependencies: [
              'Current process audit',
              'Tool integration assessment'
            ],
            stakeholders: ['product_team', 'engineering_team', 'design_team']
          }
        ],
        communication_preferences: [
          { team: 'Product Team', preferred_channels: ['slack', 'email', 'meetings'], frequency: 'weekly', format: 'detailed' },
          { team: 'Engineering Team', preferred_channels: ['slack', 'linear'], frequency: 'daily', format: 'brief' },
          { team: 'Design Team', preferred_channels: ['figma', 'slack'], frequency: 'bi_weekly', format: 'visual' },
          { team: 'Marketing Team', preferred_channels: ['email', 'presentations'], frequency: 'weekly', format: 'detailed' }
        ],
        timeline: 'Q1_2025',
        success_metrics: [
          'alignment_score',
          'communication_effectiveness',
          'objective_completion_rate',
          'team_satisfaction'
        ]
      };

      const response = await request.post(`${baseURL}/communication/align`, {
        data: alignmentRequest,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(202);

      const { alignment_id } = await response.json();
      
      // Poll for alignment completion
      let attempts = 0;
      let alignmentComplete = false;

      while (!alignmentComplete && attempts < 45) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/communication/align/${alignment_id}`);
        const statusBody = await statusResponse.json();

        if (statusBody.status === 'completed') {
          alignmentComplete = true;
          
          // Validate alignment results
          expect(statusBody.alignment_plan).toBeTruthy();
          expect(statusBody.communication_matrix).toBeInstanceOf(Array);
          expect(statusBody.milestone_coordination).toBeInstanceOf(Array);
          expect(statusBody.risk_mitigation_strategies).toBeInstanceOf(Array);
          
          // Validate communication matrix
          const communicationMatrix = statusBody.communication_matrix;
          expect(communicationMatrix.length).toBe(4); // One entry per team
          
          communicationMatrix.forEach((entry: any) => {
            expect(entry).toHaveProperty('team');
            expect(entry).toHaveProperty('communication_plan');
            expect(entry).toHaveProperty('touchpoints');
            expect(entry).toHaveProperty('success_metrics');
          });
          
          // Validate milestone coordination
          expect(statusBody.milestone_coordination.length).toBeGreaterThanOrEqual(2);
          
          // Validate alignment quality metrics
          expect(statusBody.alignment_metrics.predicted_success_rate).toBeGreaterThanOrEqual(0.80);
          expect(statusBody.alignment_metrics.communication_efficiency_score).toBeGreaterThanOrEqual(75);
          expect(statusBody.alignment_metrics.conflict_risk_level).toBeLessThanOrEqual(30);
        }

        attempts++;
      }

      expect(alignmentComplete).toBe(true);
    });

    test('GET /api/communication/alignment/health/{project_id} - Alignment Health Check', async ({ request }) => {
      const projectId = 'test-project-alignment-123';
      
      const response = await request.get(`${baseURL}/communication/alignment/health/${projectId}`, {
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(200);

      const healthData = await response.json();
      
      // Validate alignment health data
      expect(healthData).toHaveProperty('overall_alignment_score');
      expect(healthData).toHaveProperty('team_alignment_scores');
      expect(healthData).toHaveProperty('communication_effectiveness');
      expect(healthData).toHaveProperty('risk_indicators');
      expect(healthData).toHaveProperty('improvement_recommendations');
      
      // Validate scoring ranges
      expect(healthData.overall_alignment_score).toBeGreaterThanOrEqual(0);
      expect(healthData.overall_alignment_score).toBeLessThanOrEqual(100);
      
      // Validate team scores
      expect(healthData.team_alignment_scores).toBeInstanceOf(Array);
      expect(healthData.team_alignment_scores.length).toBeGreaterThan(0);
      
      healthData.team_alignment_scores.forEach((teamScore: any) => {
        expect(teamScore).toHaveProperty('team');
        expect(teamScore).toHaveProperty('score');
        expect(teamScore).toHaveProperty('strengths');
        expect(teamScore).toHaveProperty('areas_for_improvement');
        expect(teamScore.score).toBeGreaterThanOrEqual(0);
        expect(teamScore.score).toBeLessThanOrEqual(100);
      });
      
      // Validate improvement recommendations
      expect(healthData.improvement_recommendations).toBeInstanceOf(Array);
      expect(healthData.improvement_recommendations.length).toBeGreaterThan(0);
    });
  });

  test.describe('Export and Format Management', () => {
    test('GET /api/communication/export/{communication_id} - Multi-Format Export', async ({ request }) => {
      // First create a communication to export
      const generationRequest: CommunicationGenerationRequest = {
        type: 'project_status',
        content_params: {
          audience: ['team_leads'],
          formality: 'professional',
          length: 'detailed',
          focus_areas: ['progress', 'challenges', 'next_steps'],
          key_metrics: ['completion_rate', 'velocity']
        },
        export_formats: ['pdf', 'docx', 'markdown', 'html']
      };

      const createResponse = await request.post(`${baseURL}/communication/generate`, {
        data: generationRequest,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      const { communication_id } = await createResponse.json();
      
      // Wait for generation to complete
      let generationComplete = false;
      let attempts = 0;

      while (!generationComplete && attempts < 20) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/communication/${communication_id}`);
        const statusBody = await statusResponse.json();

        if (statusBody.status === 'completed') {
          generationComplete = true;
          
          // Test each export format
          const formats = ['pdf', 'docx', 'markdown', 'html'];
          
          for (const format of formats) {
            const exportResponse = await request.get(`${baseURL}/communication/export/${communication_id}`, {
              headers: { 
                'Authorization': 'Bearer test-api-key',
                'Accept': `application/${format}`
              }
            });

            expect(exportResponse.status()).toBe(200);
            
            // Validate content type
            const contentType = exportResponse.headers()['content-type'];
            if (format === 'pdf') expect(contentType).toContain('application/pdf');
            if (format === 'docx') expect(contentType).toContain('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            if (format === 'markdown') expect(contentType).toContain('text/markdown');
            if (format === 'html') expect(contentType).toContain('text/html');
            
            // Validate content length (should have actual content)
            const contentLength = exportResponse.headers()['content-length'];
            expect(parseInt(contentLength)).toBeGreaterThan(1000); // At least 1KB of content
          }
        }

        attempts++;
      }

      expect(generationComplete).toBe(true);
    });

    test('POST /api/communication/templates - Custom Template Management', async ({ request }) => {
      const customTemplate = {
        name: 'Executive Quarterly Review',
        type: 'executive_summary',
        sections: [
          {
            name: 'Executive Summary',
            required: true,
            content_type: 'text',
            max_length: 500
          },
          {
            name: 'Key Achievements',
            required: true,
            content_type: 'bullet_list',
            max_items: 8
          },
          {
            name: 'Financial Performance',
            required: true,
            content_type: 'metrics_table',
            metrics: ['revenue', 'profit_margin', 'customer_growth']
          },
          {
            name: 'Strategic Initiatives',
            required: true,
            content_type: 'text',
            max_length: 1000
          },
          {
            name: 'Risk Assessment',
            required: false,
            content_type: 'risk_matrix',
            categories: ['high', 'medium', 'low']
          }
        ],
        branding: {
          company_colors: ['#1E40AF', '#059669'],
          logo_position: 'header',
          font_family: 'Inter'
        },
        export_formats: ['pdf', 'powerpoint']
      };

      const response = await request.post(`${baseURL}/communication/templates`, {
        data: customTemplate,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(201);

      const templateResponse = await response.json();
      expect(templateResponse.template_id).toBeTruthy();
      expect(templateResponse.name).toBe('Executive Quarterly Review');
      expect(templateResponse.sections).toHaveLength(5);
      expect(templateResponse.validation_rules).toBeInstanceOf(Array);
    });
  });

  test.describe('Performance and Quality Assurance', () => {
    test('Content generation performance under load', async ({ request }) => {
      const requests = Array.from({ length: 5 }, (_, i) => ({
        type: 'team_update' as const,
        content_params: {
          audience: ['team_leads'],
          formality: 'professional' as const,
          length: 'brief' as const,
          focus_areas: ['progress', 'blockers'],
          key_metrics: ['velocity', 'completion_rate'],
          time_period: 'current_week'
        },
        export_formats: ['markdown', 'html'] as ('markdown' | 'html')[]
      }));

      const startTime = Date.now();
      
      const responses = await Promise.all(
        requests.map(req => 
          request.post(`${baseURL}/communication/generate`, {
            data: req,
            headers: { 'Authorization': 'Bearer test-api-key' }
          })
        )
      );

      // All should be accepted
      responses.forEach(response => {
        expect(response.status()).toBe(202);
      });

      const communicationIds = await Promise.all(responses.map(r => r.json()));
      
      // Wait for all to complete
      const completionPromises = communicationIds.map(async ({ communication_id }: any) => {
        let attempts = 0;
        while (attempts < 30) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const statusResponse = await request.get(`${baseURL}/communication/${communication_id}`);
          const statusBody = await statusResponse.json();
          
          if (statusBody.status === 'completed') {
            return statusBody;
          }
          
          attempts++;
        }
        throw new Error('Generation did not complete in time');
      });

      const results = await Promise.all(completionPromises);
      const totalTime = Date.now() - startTime;
      
      // Validate concurrent processing performance
      expect(totalTime).toBeLessThan(45000); // All 5 under 45 seconds
      expect(results.length).toBe(5);
      
      // Validate quality maintained under load
      results.forEach(result => {
        expect(result.quality_metrics.content_completeness).toBeGreaterThanOrEqual(85);
        expect(result.quality_metrics.tone_consistency).toBeGreaterThanOrEqual(80);
      });
    });

    test('AI model failover and redundancy', async ({ request }) => {
      const complexRequest: CommunicationGenerationRequest = {
        type: 'strategic_brief',
        content_params: {
          audience: ['board_members', 'investors'],
          formality: 'executive',
          length: 'comprehensive',
          focus_areas: [
            'market_analysis',
            'competitive_positioning',
            'financial_projections',
            'strategic_recommendations'
          ],
          key_metrics: ['market_share', 'revenue_growth', 'competitive_advantage'],
          time_period: 'next_18_months'
        },
        template_preferences: {
          company_branding: true,
          include_charts: true,
          include_recommendations: true
        },
        export_formats: ['pdf', 'powerpoint']
      };

      const response = await request.post(`${baseURL}/communication/generate`, {
        data: complexRequest,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      const { communication_id } = await response.json();
      
      let attempts = 0;
      let completed = false;

      while (!completed && attempts < 60) { // Extended timeout for complex generation
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/communication/${communication_id}`);
        const statusBody = await statusResponse.json();

        if (statusBody.status === 'completed') {
          completed = true;
          
          // Validate AI failover worked if needed
          expect(statusBody.ai_generation_details).toBeTruthy();
          expect(['claude', 'openai'].includes(statusBody.ai_generation_details.primary_ai)).toBe(true);
          
          // Should maintain high quality even with failover
          expect(statusBody.quality_metrics.content_completeness).toBeGreaterThanOrEqual(90);
          expect(statusBody.quality_metrics.factual_accuracy).toBeGreaterThanOrEqual(95);
          
          // Complex content should have multiple revisions for quality
          expect(statusBody.ai_generation_details.revision_iterations).toBeGreaterThanOrEqual(2);
        }

        attempts++;
      }

      expect(completed).toBe(true);
    });

    test('Content quality validation', async ({ request }) => {
      const qualityTestRequest: CommunicationGenerationRequest = {
        type: 'executive_summary',
        content_params: {
          audience: ['ceo', 'board_members'],
          formality: 'executive',
          length: 'comprehensive',
          focus_areas: ['strategic_analysis', 'recommendations'],
          key_metrics: ['roi', 'market_impact']
        },
        export_formats: ['pdf']
      };

      const response = await request.post(`${baseURL}/communication/generate`, {
        data: qualityTestRequest,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      const { communication_id } = await response.json();
      
      // Wait for completion and validate quality
      let attempts = 0;
      let completed = false;

      while (!completed && attempts < 30) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/communication/${communication_id}`);
        const statusBody = await statusResponse.json();

        if (statusBody.status === 'completed') {
          completed = true;
          
          // Validate content quality thresholds
          const quality = statusBody.quality_metrics;
          
          // Executive content must meet high standards
          expect(quality.readability_score).toBeGreaterThanOrEqual(75);
          expect(quality.audience_alignment).toBeGreaterThanOrEqual(90);
          expect(quality.content_completeness).toBeGreaterThanOrEqual(95);
          expect(quality.tone_consistency).toBeGreaterThanOrEqual(85);
          expect(quality.factual_accuracy).toBeGreaterThanOrEqual(98);
          
          // Validate content structure quality
          const content = statusBody.generated_content;
          expect(content.title.length).toBeGreaterThan(10);
          expect(content.title.length).toBeLessThan(100);
          expect(content.executive_summary.length).toBeGreaterThan(100);
          expect(content.key_takeaways.length).toBeGreaterThanOrEqual(3);
          expect(content.recommendations.length).toBeGreaterThanOrEqual(2);
          
          // Validate no placeholder or incomplete content
          const allContent = JSON.stringify(content).toLowerCase();
          expect(allContent).not.toContain('[placeholder]');
          expect(allContent).not.toContain('todo');
          expect(allContent).not.toContain('tbd');
          expect(allContent).not.toContain('coming soon');
        }

        attempts++;
      }

      expect(completed).toBe(true);
    });
  });
});