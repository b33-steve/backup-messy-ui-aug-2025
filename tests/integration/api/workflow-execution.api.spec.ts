// tests/integration/api/workflow-execution.api.spec.ts
// API integration tests for Workflow Execution AI Team endpoints
// Tests PM tool integration, workflow automation, and cross-functional coordination
// RELEVANT FILES: strategic-intelligence.api.spec.ts, communication.api.spec.ts, data-intelligence.api.spec.ts

import { test, expect } from '@playwright/test';
import { TestDataManager } from '../../e2e/helpers/test-data-manager';

interface WorkflowCreationRequest {
  pm_tool: 'jira' | 'linear' | 'monday' | 'asana' | 'azure_devops';
  workflow_type: 'epic' | 'feature' | 'sprint' | 'release' | 'project';
  requirements: ProjectRequirement[];
  team_context: {
    team_size: number;
    sprint_length: number;
    velocity_points: number;
    available_capacity: number;
  };
  integration_config: {
    instance_url?: string;
    project_key?: string;
    board_id?: string;
    workspace_id?: string;
    field_mapping: FieldMappingConfig;
  };
}

interface ProjectRequirement {
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  effort_estimate: number;
  acceptance_criteria: string[];
  dependencies: string[];
  labels?: string[];
  assignee_preferences?: string[];
}

interface FieldMappingConfig {
  title_field: string;
  description_field: string;
  priority_field: string;
  status_field: string;
  assignee_field: string;
  labels_field?: string;
  custom_fields?: { [key: string]: string };
}

interface WorkflowCreationResponse {
  workflow_id: string;
  status: 'processing' | 'completed' | 'failed';
  items_created: WorkItem[];
  field_mapping_confidence: { [key: string]: number };
  automation_summary: AutomationSummary;
  integration_health: IntegrationHealth;
  processing_time_ms: number;
}

interface WorkItem {
  external_id: string;
  title: string;
  type: string;
  status: string;
  url: string;
  confidence_score: number;
}

interface AutomationSummary {
  total_items: number;
  successful_items: number;
  failed_items: number;
  warnings: string[];
  optimization_suggestions: string[];
}

interface IntegrationHealth {
  connection_status: 'healthy' | 'degraded' | 'failed';
  api_response_time: number;
  rate_limit_status: 'ok' | 'approaching' | 'exceeded';
  last_sync: string;
}

test.describe('Workflow Execution API Integration', () => {
  let testDataManager: TestDataManager;
  let baseURL: string;
  
  test.beforeAll(() => {
    testDataManager = new TestDataManager();
    baseURL = process.env.API_BASE_URL || 'http://localhost:3000/api';
  });

  test.describe('Workflow Creation Endpoints', () => {
    test('POST /api/workflows/create - Linear Sprint Creation', async ({ request }) => {
      const linearWorkflow: WorkflowCreationRequest = {
        pm_tool: 'linear',
        workflow_type: 'sprint',
        requirements: [
          {
            title: 'User Authentication Improvements',
            description: 'Enhance login flow with better error handling and password reset',
            priority: 'high',
            effort_estimate: 8,
            acceptance_criteria: [
              'Login errors display helpful messages',
              'Password reset flow works end-to-end',
              'Social login options are available'
            ],
            dependencies: [],
            labels: ['frontend', 'authentication', 'user-experience']
          },
          {
            title: 'API Rate Limiting Implementation',
            description: 'Add rate limiting to protect against abuse and ensure fair usage',
            priority: 'medium',
            effort_estimate: 5,
            acceptance_criteria: [
              'Rate limits applied per endpoint',
              'Clear error messages when limits exceeded',
              'Admin dashboard shows usage metrics'
            ],
            dependencies: ['User Authentication Improvements'],
            labels: ['backend', 'security', 'performance']
          }
        ],
        team_context: {
          team_size: 8,
          sprint_length: 14,
          velocity_points: 32,
          available_capacity: 0.8
        },
        integration_config: {
          workspace_id: 'test-workspace-123',
          field_mapping: {
            title_field: 'title',
            description_field: 'description',
            priority_field: 'priority',
            status_field: 'state',
            assignee_field: 'assignee',
            labels_field: 'labels'
          }
        }
      };

      const response = await request.post(`${baseURL}/workflows/create`, {
        data: linearWorkflow,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-api-key'
        }
      });

      expect(response.status()).toBe(202);

      const responseBody: { workflow_id: string; estimated_completion: number } = await response.json();
      expect(responseBody.workflow_id).toBeTruthy();
      expect(responseBody.estimated_completion).toBeLessThanOrEqual(30000); // Under 30 seconds

      // Poll for completion
      let workflowComplete = false;
      let attempts = 0;
      const maxAttempts = 45; // 45 seconds maximum

      while (!workflowComplete && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/workflows/${responseBody.workflow_id}`);
        const statusBody: WorkflowCreationResponse = await statusResponse.json();

        if (statusBody.status === 'completed') {
          workflowComplete = true;
          
          // Validate workflow creation results
          expect(statusBody.items_created).toHaveLength(2);
          expect(statusBody.items_created.every(item => item.confidence_score >= 0.95)).toBe(true);
          
          // Validate field mapping confidence
          expect(statusBody.field_mapping_confidence.title_field).toBeGreaterThanOrEqual(0.95);
          expect(statusBody.field_mapping_confidence.priority_field).toBeGreaterThanOrEqual(0.90);
          
          // Validate automation summary
          expect(statusBody.automation_summary.successful_items).toBe(2);
          expect(statusBody.automation_summary.failed_items).toBe(0);
          
          // Validate integration health
          expect(statusBody.integration_health.connection_status).toBe('healthy');
          expect(statusBody.integration_health.api_response_time).toBeLessThan(2000);
          expect(statusBody.integration_health.rate_limit_status).toBeOneOf(['ok', 'approaching']);
          
          // Validate processing time
          expect(statusBody.processing_time_ms).toBeLessThan(30000);
          
        } else if (statusBody.status === 'failed') {
          throw new Error('Workflow creation failed');
        }

        attempts++;
      }

      expect(workflowComplete).toBe(true);
    });

    test('POST /api/workflows/create - Complex Jira Epic Creation', async ({ request }) => {
      const jiraWorkflow: WorkflowCreationRequest = {
        pm_tool: 'jira',
        workflow_type: 'epic',
        requirements: Array.from({ length: 10 }, (_, i) => ({
          title: `Enterprise Feature ${i + 1}`,
          description: `Complex enterprise feature requiring multiple team coordination and stakeholder approval`,
          priority: i < 3 ? 'critical' : i < 6 ? 'high' : 'medium',
          effort_estimate: Math.floor(Math.random() * 13) + 3, // 3-15 points
          acceptance_criteria: [
            'Meets enterprise security requirements',
            'Passes accessibility compliance tests',
            'Performance benchmarks achieved',
            'Documentation updated'
          ],
          dependencies: i > 0 ? [`Enterprise Feature ${i}`] : [],
          labels: ['enterprise', 'complex', `team-${Math.floor(i / 3) + 1}`]
        })),
        team_context: {
          team_size: 15,
          sprint_length: 14,
          velocity_points: 65,
          available_capacity: 0.85
        },
        integration_config: {
          instance_url: 'https://test-company.atlassian.net',
          project_key: 'ENT',
          field_mapping: {
            title_field: 'summary',
            description_field: 'description',
            priority_field: 'priority',
            status_field: 'status',
            assignee_field: 'assignee',
            labels_field: 'labels',
            custom_fields: {
              'story_points': 'customfield_10002',
              'epic_link': 'customfield_10014',
              'team_field': 'customfield_10020'
            }
          }
        }
      };

      const response = await request.post(`${baseURL}/workflows/create`, {
        data: jiraWorkflow,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(202);

      const { workflow_id } = await response.json();
      
      // Poll for completion with extended timeout for complex workflow
      let attempts = 0;
      let workflowComplete = false;

      while (!workflowComplete && attempts < 90) { // 90 seconds for complex epic
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/workflows/${workflow_id}`);
        const statusBody: WorkflowCreationResponse = await statusResponse.json();

        if (statusBody.status === 'completed') {
          workflowComplete = true;
          
          // Validate complex workflow results
          expect(statusBody.items_created).toHaveLength(10);
          
          // Validate hierarchical structure (epic + stories)
          const epics = statusBody.items_created.filter(item => item.type === 'Epic');
          const stories = statusBody.items_created.filter(item => item.type === 'Story');
          
          expect(epics.length).toBeGreaterThanOrEqual(1);
          expect(stories.length).toBeGreaterThanOrEqual(9);
          
          // Validate field mapping for complex custom fields
          expect(statusBody.field_mapping_confidence['customfield_10002']).toBeGreaterThanOrEqual(0.90);
          expect(statusBody.field_mapping_confidence['customfield_10014']).toBeGreaterThanOrEqual(0.85);
          
          // Validate automation optimizations
          expect(statusBody.automation_summary.optimization_suggestions).toBeInstanceOf(Array);
          expect(statusBody.automation_summary.successful_items).toBeGreaterThanOrEqual(9);
          
        } else if (statusBody.status === 'failed') {
          throw new Error('Complex Jira epic creation failed');
        }

        attempts++;
      }

      expect(workflowComplete).toBe(true);
    });

    test('GET /api/workflows/coordination/{project_id} - Cross-functional Coordination', async ({ request }) => {
      const projectId = 'test-project-456';
      
      const response = await request.get(`${baseURL}/workflows/coordination/${projectId}`, {
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(200);

      const coordinationData = await response.json();
      
      // Validate coordination response structure
      expect(coordinationData).toHaveProperty('timeline');
      expect(coordinationData).toHaveProperty('dependencies');
      expect(coordinationData).toHaveProperty('resource_allocation');
      expect(coordinationData).toHaveProperty('risk_assessment');
      
      // Validate timeline data
      expect(coordinationData.timeline.milestones).toBeInstanceOf(Array);
      expect(coordinationData.timeline.critical_path).toBeTruthy();
      expect(coordinationData.timeline.estimated_completion).toBeTruthy();
      
      // Validate dependencies
      expect(coordinationData.dependencies.blocking_items).toBeInstanceOf(Array);
      expect(coordinationData.dependencies.dependency_graph).toBeTruthy();
      expect(coordinationData.dependencies.risk_score).toBeGreaterThanOrEqual(0);
      
      // Validate resource allocation
      expect(coordinationData.resource_allocation.team_assignments).toBeInstanceOf(Array);
      expect(coordinationData.resource_allocation.capacity_utilization).toBeGreaterThan(0);
      expect(coordinationData.resource_allocation.bottlenecks).toBeInstanceOf(Array);
    });
  });

  test.describe('Integration Management', () => {
    test('POST /api/workflows/integrations/sync - Bidirectional Sync', async ({ request }) => {
      const syncRequest = {
        pm_tool: 'linear',
        sync_direction: 'bidirectional',
        workspace_id: 'test-workspace-123',
        filters: {
          updated_since: '2025-01-01T00:00:00Z',
          project_ids: ['project-1', 'project-2'],
          status_categories: ['active', 'completed']
        },
        field_mappings: {
          'title': 'title',
          'description': 'description',
          'priority': 'priority',
          'assignee': 'assignee.email'
        }
      };

      const response = await request.post(`${baseURL}/workflows/integrations/sync`, {
        data: syncRequest,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(202);

      const { sync_id } = await response.json();
      
      // Monitor sync progress
      let syncComplete = false;
      let attempts = 0;

      while (!syncComplete && attempts < 60) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/workflows/integrations/sync/${sync_id}`);
        const statusBody = await statusResponse.json();

        if (statusBody.status === 'completed') {
          syncComplete = true;
          
          // Validate sync results
          expect(statusBody.items_synchronized).toBeGreaterThan(0);
          expect(statusBody.sync_summary.success_rate).toBeGreaterThanOrEqual(0.95);
          expect(statusBody.sync_summary.conflicts_resolved).toBeInstanceOf(Array);
          expect(statusBody.sync_summary.field_mapping_accuracy).toBeGreaterThanOrEqual(0.90);
          
          // Validate bidirectional sync
          expect(statusBody.sync_directions.inbound_items).toBeGreaterThanOrEqual(0);
          expect(statusBody.sync_directions.outbound_items).toBeGreaterThanOrEqual(0);
        }

        attempts++;
      }

      expect(syncComplete).toBe(true);
    });

    test('GET /api/workflows/integrations/health - Integration Health Check', async ({ request }) => {
      const response = await request.get(`${baseURL}/workflows/integrations/health`, {
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(200);

      const healthData = await response.json();
      
      // Validate health check response
      expect(healthData.integrations).toBeInstanceOf(Array);
      expect(healthData.overall_health).toBeOneOf(['healthy', 'degraded', 'critical']);
      
      // Validate individual integration health
      healthData.integrations.forEach((integration: any) => {
        expect(integration).toHaveProperty('pm_tool');
        expect(integration).toHaveProperty('status');
        expect(integration).toHaveProperty('response_time');
        expect(integration).toHaveProperty('last_successful_sync');
        expect(integration).toHaveProperty('error_rate');
        
        expect(integration.response_time).toBeLessThan(5000); // Under 5 seconds
        expect(integration.error_rate).toBeLessThan(0.05); // Under 5% error rate
      });
    });
  });

  test.describe('Performance and Scale Testing', () => {
    test('Bulk workflow creation performance', async ({ request }) => {
      const bulkRequest = {
        workflows: Array.from({ length: 5 }, (_, i) => ({
          pm_tool: 'linear' as const,
          workflow_type: 'feature' as const,
          requirements: Array.from({ length: 8 }, (_, j) => ({
            title: `Bulk Feature ${i + 1}.${j + 1}`,
            description: `Feature description for bulk test`,
            priority: 'medium' as const,
            effort_estimate: 5,
            acceptance_criteria: ['Meets requirements', 'Tests pass'],
            dependencies: []
          })),
          team_context: {
            team_size: 6,
            sprint_length: 14,
            velocity_points: 30,
            available_capacity: 0.8
          },
          integration_config: {
            workspace_id: `workspace-${i}`,
            field_mapping: {
              title_field: 'title',
              description_field: 'description',
              priority_field: 'priority',
              status_field: 'state',
              assignee_field: 'assignee'
            }
          }
        }))
      };

      const startTime = Date.now();
      
      const response = await request.post(`${baseURL}/workflows/bulk-create`, {
        data: bulkRequest,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(202);

      const { bulk_workflow_id } = await response.json();
      
      // Monitor bulk workflow completion
      let bulkComplete = false;
      let attempts = 0;

      while (!bulkComplete && attempts < 120) { // 2 minutes for bulk operations
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/workflows/bulk/${bulk_workflow_id}`);
        const statusBody = await statusResponse.json();

        if (statusBody.status === 'completed') {
          bulkComplete = true;
          
          const totalTime = Date.now() - startTime;
          
          // Validate bulk performance
          expect(totalTime).toBeLessThan(120000); // Under 2 minutes
          expect(statusBody.workflows_completed).toBe(5);
          expect(statusBody.total_items_created).toBe(40); // 5 workflows × 8 items each
          expect(statusBody.success_rate).toBeGreaterThanOrEqual(0.95);
          
          // Validate parallel processing efficiency
          const avgTimePerWorkflow = totalTime / 5;
          expect(avgTimePerWorkflow).toBeLessThan(30000); // Under 30 seconds per workflow
        }

        attempts++;
      }

      expect(bulkComplete).toBe(true);
    });

    test('High-frequency sync operations', async ({ request }) => {
      // Test rapid successive sync requests
      const syncRequests = Array.from({ length: 10 }, (_, i) => 
        request.post(`${baseURL}/workflows/integrations/sync`, {
          data: {
            pm_tool: 'linear',
            sync_direction: 'inbound',
            workspace_id: `test-workspace-${i}`,
            filters: { updated_since: '2025-01-01T00:00:00Z' },
            field_mappings: { title: 'title', status: 'state' }
          },
          headers: { 'Authorization': 'Bearer test-api-key' }
        })
      );

      const responses = await Promise.all(syncRequests);
      
      // All requests should be accepted
      responses.forEach(response => {
        expect([202, 429]).toContain(response.status()); // Accepted or rate limited
      });

      const acceptedResponses = responses.filter(r => r.status() === 202);
      expect(acceptedResponses.length).toBeGreaterThan(5); // At least 5 should succeed
    });
  });

  test.describe('Error Handling and Recovery', () => {
    test('Invalid PM tool integration', async ({ request }) => {
      const invalidRequest = {
        pm_tool: 'invalid_tool' as any,
        workflow_type: 'feature' as const,
        requirements: [],
        team_context: { team_size: 5, sprint_length: 14, velocity_points: 25, available_capacity: 0.8 },
        integration_config: { field_mapping: {} as any }
      };

      const response = await request.post(`${baseURL}/workflows/create`, {
        data: invalidRequest,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(400);

      const errorResponse = await response.json();
      expect(errorResponse.error).toContain('Invalid PM tool');
      expect(errorResponse.supported_tools).toEqual(['jira', 'linear', 'monday', 'asana', 'azure_devops']);
    });

    test('Integration connection failure handling', async ({ request }) => {
      const connectionTestRequest = {
        pm_tool: 'jira',
        instance_url: 'https://invalid-instance.atlassian.net',
        credentials: {
          username: 'test@example.com',
          api_token: 'invalid-token'
        }
      };

      const response = await request.post(`${baseURL}/workflows/integrations/test-connection`, {
        data: connectionTestRequest,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(200);

      const testResult = await response.json();
      expect(testResult.connection_status).toBe('failed');
      expect(testResult.error_details).toBeTruthy();
      expect(testResult.retry_suggestions).toBeInstanceOf(Array);
    });

    test('Partial workflow creation failure recovery', async ({ request }) => {
      const problematicWorkflow: WorkflowCreationRequest = {
        pm_tool: 'linear',
        workflow_type: 'sprint',
        requirements: [
          {
            title: 'Valid Requirement',
            description: 'This should succeed',
            priority: 'high',
            effort_estimate: 5,
            acceptance_criteria: ['Should work'],
            dependencies: []
          },
          {
            title: '', // Invalid empty title
            description: 'This should fail',
            priority: 'high',
            effort_estimate: 3,
            acceptance_criteria: [],
            dependencies: ['Non-existent dependency'] // Invalid dependency
          }
        ],
        team_context: {
          team_size: 8,
          sprint_length: 14,
          velocity_points: 32,
          available_capacity: 0.8
        },
        integration_config: {
          workspace_id: 'test-workspace',
          field_mapping: {
            title_field: 'title',
            description_field: 'description',
            priority_field: 'priority',
            status_field: 'state',
            assignee_field: 'assignee'
          }
        }
      };

      const response = await request.post(`${baseURL}/workflows/create`, {
        data: problematicWorkflow,
        headers: { 'Authorization': 'Bearer test-api-key' }
      });

      expect(response.status()).toBe(202);

      const { workflow_id } = await response.json();
      
      // Wait for partial completion
      let attempts = 0;
      let partialComplete = false;

      while (!partialComplete && attempts < 30) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await request.get(`${baseURL}/workflows/${workflow_id}`);
        const statusBody = await statusResponse.json();

        if (statusBody.status === 'completed') {
          partialComplete = true;
          
          // Validate partial success handling
          expect(statusBody.automation_summary.successful_items).toBe(1);
          expect(statusBody.automation_summary.failed_items).toBe(1);
          expect(statusBody.automation_summary.warnings).toBeInstanceOf(Array);
          expect(statusBody.automation_summary.warnings.length).toBeGreaterThan(0);
          
          // Validate error details for failed items
          expect(statusBody.failed_items).toHaveLength(1);
          expect(statusBody.failed_items[0].error_reason).toBeTruthy();
          expect(statusBody.failed_items[0].recovery_suggestion).toBeTruthy();
        }

        attempts++;
      }

      expect(partialComplete).toBe(true);
    });
  });
});