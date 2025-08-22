// app/frontend/lib/ai-service.ts
// PM33 AI Teams frontend service integration
// Connects to multi-AI orchestration backend for Strategic Intelligence, Workflow, Data, Communication
// RELEVANT FILES: app/(app)/chat/page.tsx, app/(app)/dashboard/page.tsx, app/(app)/intelligence/page.tsx

interface OrchestrationRequest {
  workflow_type: string;
  query: string;
  context: Record<string, any>;
  orchestration_mode?: string;
  required_teams?: string[];
  priority?: string;
  stakeholders?: string[];
  success_criteria?: string[];
}

interface TeamRequest {
  query?: string;
  framework?: string;
  strategic_objective?: string;
  timeline_weeks?: number;
  team_size?: number;
  pm_tool?: string;
  analysis_type?: string;
  data_sources?: string[];
  communication_type?: string;
  audience?: string;
  content?: Record<string, any>;
  format_type?: string;
  context?: Record<string, any>;
}

interface AIResponse {
  status: string;
  result?: any;
  orchestration_result?: any;
  error?: string;
  timestamp: string;
}

class PM33AIService {
  private baseUrl: string;
  
  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000') {
    this.baseUrl = baseUrl;
  }

  /**
   * Orchestrate multiple AI teams for comprehensive PMO transformation
   */
  async orchestrateAITeams(request: OrchestrationRequest): Promise<AIResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai-teams/orchestrate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('AI orchestration failed:', error);
      throw error;
    }
  }

  /**
   * Query Strategic Intelligence team for framework analysis
   */
  async queryStrategicIntelligence(request: TeamRequest): Promise<AIResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai-teams/strategic-intelligence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Strategic Intelligence query failed:', error);
      throw error;
    }
  }

  /**
   * Generate workflow using Workflow Execution team
   */
  async generateWorkflow(request: TeamRequest): Promise<AIResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai-teams/workflow-execution`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Workflow generation failed:', error);
      throw error;
    }
  }

  /**
   * Perform data analysis using Data Intelligence team
   */
  async analyzeData(request: TeamRequest): Promise<AIResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai-teams/data-intelligence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Data analysis failed:', error);
      throw error;
    }
  }

  /**
   * Generate communication using Communication team
   */
  async generateCommunication(request: TeamRequest): Promise<AIResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai-teams/communication`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Communication generation failed:', error);
      throw error;
    }
  }

  /**
   * Get AI teams capabilities
   */
  async getCapabilities(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai-teams/capabilities`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get capabilities:', error);
      throw error;
    }
  }

  /**
   * Get AI teams health status
   */
  async getHealthStatus(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai-teams/health`);
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'error', error: error.message };
    }
  }

  /**
   * Get orchestration status by request ID
   */
  async getOrchestrationStatus(requestId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai-teams/orchestration/${requestId}/status`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Status check failed:', error);
      throw error;
    }
  }

  /**
   * Get AI teams metrics
   */
  async getMetrics(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai-teams/metrics`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get metrics:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const aiService = new PM33AIService();

// Export types for use in components
export type { OrchestrationRequest, TeamRequest, AIResponse };

// Helper functions for common operations
export const AIHelpers = {
  /**
   * Create strategic planning orchestration request
   */
  createStrategicPlanningRequest: (
    query: string, 
    context: Record<string, any>
  ): OrchestrationRequest => ({
    workflow_type: 'strategic_planning',
    query,
    context,
    orchestration_mode: 'strategic_cascade',
    required_teams: ['strategic_intelligence', 'workflow_execution', 'data_intelligence', 'communication'],
    priority: 'high'
  }),

  /**
   * Create competitive response orchestration request
   */
  createCompetitiveResponseRequest: (
    query: string,
    competitor: string,
    context: Record<string, any>
  ): OrchestrationRequest => ({
    workflow_type: 'competitive_response',
    query,
    context: { ...context, competitor },
    orchestration_mode: 'parallel',
    required_teams: ['strategic_intelligence', 'workflow_execution', 'communication'],
    priority: 'critical'
  }),

  /**
   * Create feature prioritization request
   */
  createFeaturePrioritizationRequest: (
    query: string,
    features: string[],
    context: Record<string, any>
  ): OrchestrationRequest => ({
    workflow_type: 'feature_prioritization',
    query,
    context: { ...context, features },
    orchestration_mode: 'collaborative',
    required_teams: ['strategic_intelligence', 'data_intelligence', 'workflow_execution'],
    priority: 'medium'
  }),

  /**
   * Format orchestration result for display
   */
  formatOrchestrationResult: (result: any) => {
    if (!result.orchestration_result) {
      return null;
    }

    const orchestration = result.orchestration_result;
    
    return {
      workflowType: orchestration.workflow_type,
      overallStatus: orchestration.overall_status,
      successProbability: orchestration.success_probability,
      processingTime: orchestration.processing_time_ms,
      teamResults: orchestration.team_results,
      synthesis: orchestration.synthesis,
      recommendations: orchestration.final_recommendations,
      implementationPlan: orchestration.implementation_plan,
      createdAt: orchestration.created_at
    };
  },

  /**
   * Extract key insights from team results
   */
  extractKeyInsights: (teamResults: Record<string, any>) => {
    const insights = [];

    for (const [teamName, result] of Object.entries(teamResults)) {
      if (result.result && result.recommendations) {
        insights.push({
          team: teamName,
          confidence: result.confidence,
          keyResult: result.result,
          recommendations: result.recommendations.slice(0, 3), // Top 3 recommendations
        });
      }
    }

    return insights;
  }
};