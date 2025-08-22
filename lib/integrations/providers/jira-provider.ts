/**
 * File: app/frontend/lib/integrations/providers/jira-provider.ts
 * Purpose: Jira-specific integration provider with OAuth 2.0 authentication and field discovery
 * Why: Implements the PM33 Intelligent Field Mapping System for Jira with real-world field examples
 * Relevant Files: types.ts, field-analysis-engine.ts, PM33_INTELLIGENT_FIELD_MAPPING_SYSTEM.md
 */

import {
  IntegrationProvider,
  SourceField,
  FieldType,
  AuthenticationMethod,
  IntegrationConfig,
  IntegrationStatus,
  FieldAnalysisResult,
  OAuthConfig,
  APIKeyConfig
} from '../types';
import { fieldAnalysisEngine } from '../field-analysis-engine';

// Jira-specific types
interface JiraField {
  id: string;
  name: string;
  custom: boolean;
  orderable: boolean;
  navigable: boolean;
  searchable: boolean;
  clauseNames: string[];
  schema?: JiraFieldSchema;
}

interface JiraFieldSchema {
  type: string;
  system?: string;
  custom?: string;
  customId?: number;
  items?: string;
}

interface JiraIssue {
  id: string;
  key: string;
  fields: Record<string, any>;
}

interface JiraProject {
  id: string;
  key: string;
  name: string;
  description?: string;
  issueTypes: JiraIssueType[];
}

interface JiraIssueType {
  id: string;
  name: string;
  description: string;
  subtask: boolean;
}

/**
 * Jira Integration Provider
 * Handles OAuth 2.0 authentication and intelligent field discovery for Jira
 */
export class JiraProvider {
  private baseUrl: string = '';
  private accessToken: string = '';
  private refreshToken: string = '';

  constructor() {}

  /**
   * Authenticate with Jira using OAuth 2.0 (recommended) or API key
   */
  async authenticate(config: IntegrationConfig): Promise<{ success: boolean; error?: string }> {
    try {
      this.baseUrl = config.settings.baseUrl;
      
      if (config.authentication.method === AuthenticationMethod.OAUTH2) {
        return await this.authenticateOAuth(config.authentication.oauth!);
      } else if (config.authentication.method === AuthenticationMethod.API_KEY) {
        return await this.authenticateAPIKey(config.authentication.apiKey!);
      }
      
      return { success: false, error: 'Unsupported authentication method' };
    } catch (error) {
      console.error('❌ Jira authentication failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Authentication failed' 
      };
    }
  }

  /**
   * OAuth 2.0 authentication flow
   */
  private async authenticateOAuth(oauth: OAuthConfig): Promise<{ success: boolean; error?: string }> {
    try {
      // For client-side implementation, this would redirect to Jira OAuth flow
      // Here we simulate the token exchange that happens after user consent
      
      console.log('🔐 Starting OAuth 2.0 flow with Jira...');
      
      // In real implementation, exchange authorization code for tokens
      const tokenResponse = await this.exchangeOAuthCode(oauth);
      
      if (tokenResponse.access_token) {
        this.accessToken = tokenResponse.access_token;
        this.refreshToken = tokenResponse.refresh_token || '';
        
        // Test the connection
        const testResult = await this.testConnection();
        if (testResult.success) {
          console.log('✅ OAuth 2.0 authentication successful');
          return { success: true };
        }
      }
      
      return { success: false, error: 'Token exchange failed' };
    } catch (error) {
      return { 
        success: false, 
        error: `OAuth failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  }

  /**
   * API Key authentication (fallback method)
   */
  private async authenticateAPIKey(apiKey: APIKeyConfig): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🔑 Authenticating with API key...');
      
      // For API key, we use Basic Auth with email:token
      const email = apiKey.userField || '';
      const token = apiKey.keyField || '';
      
      if (!email || !token) {
        return { success: false, error: 'Email and API token are required' };
      }
      
      // Create Basic Auth header
      this.accessToken = Buffer.from(`${email}:${token}`).toString('base64');
      
      // Test the connection
      const testResult = await this.testConnection();
      return testResult;
      
    } catch (error) {
      return { 
        success: false, 
        error: `API key authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  }

  /**
   * Exchange OAuth authorization code for access token
   */
  private async exchangeOAuthCode(oauth: OAuthConfig): Promise<any> {
    // This is a simplified version - real implementation would include:
    // - PKCE verification
    // - State validation 
    // - Secure token storage
    
    const tokenEndpoint = oauth.tokenEndpoint || 'https://auth.atlassian.com/oauth/token';
    
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: oauth.clientId,
        code: 'auth_code_from_callback', // Would come from OAuth callback
        redirect_uri: oauth.redirectUri,
        code_verifier: oauth.codeChallenge // PKCE
      })
    });

    return response.json();
  }

  /**
   * Test connection to Jira instance
   */
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await this.makeAuthenticatedRequest('/rest/api/3/myself');
      
      if (response.ok) {
        const user = await response.json();
        console.log(`✅ Connected to Jira as: ${user.displayName} (${user.emailAddress})`);
        return { success: true };
      }
      
      return { success: false, error: `Connection test failed: ${response.status}` };
    } catch (error) {
      return { 
        success: false, 
        error: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  }

  /**
   * Discover all available fields in the Jira instance
   */
  async discoverFields(integrationId: string): Promise<FieldAnalysisResult> {
    console.log('🔍 Discovering Jira fields...');
    
    try {
      // 1. Get field metadata from Jira
      const jiraFields = await this.getJiraFields();
      console.log(`📋 Found ${jiraFields.length} Jira fields`);

      // 2. Sample data from actual issues to understand field population
      const sampleData = await this.sampleFieldData(jiraFields);
      console.log(`📊 Sampled data from ${sampleData.totalIssues} issues`);

      // 3. Convert Jira fields to standardized SourceField format
      const sourceFields = this.convertJiraFieldsToSourceFields(jiraFields, sampleData);
      
      // 4. Run intelligent field analysis
      const analysisResult = await fieldAnalysisEngine.analyzeFieldStructure(
        IntegrationProvider.JIRA,
        sourceFields,
        integrationId
      );

      console.log(`✅ Field analysis complete: ${analysisResult.recommendedMappings.length} mappings recommended`);
      return analysisResult;
      
    } catch (error) {
      console.error('❌ Field discovery failed:', error);
      throw error;
    }
  }

  /**
   * Get all fields from Jira API
   */
  private async getJiraFields(): Promise<JiraField[]> {
    const response = await this.makeAuthenticatedRequest('/rest/api/3/field');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Jira fields: ${response.status}`);
    }
    
    return response.json();
  }

  /**
   * Sample field data from actual Jira issues
   */
  private async sampleFieldData(jiraFields: JiraField[]): Promise<{
    fieldData: Record<string, any[]>;
    totalIssues: number;
  }> {
    
    // Get a sample of issues to analyze field population
    const jqlQuery = 'ORDER BY updated DESC';
    const maxResults = 100; // Sample size
    
    const response = await this.makeAuthenticatedRequest(
      `/rest/api/3/search?jql=${encodeURIComponent(jqlQuery)}&maxResults=${maxResults}&expand=names`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to sample Jira data: ${response.status}`);
    }
    
    const searchResult = await response.json();
    const issues: JiraIssue[] = searchResult.issues || [];
    
    // Aggregate field values
    const fieldData: Record<string, any[]> = {};
    
    for (const field of jiraFields) {
      fieldData[field.id] = [];
      
      for (const issue of issues) {
        const value = issue.fields[field.id];
        fieldData[field.id].push(value);
      }
    }
    
    return {
      fieldData,
      totalIssues: issues.length
    };
  }

  /**
   * Convert Jira fields to standardized SourceField format
   */
  private convertJiraFieldsToSourceFields(
    jiraFields: JiraField[],
    sampleData: { fieldData: Record<string, any[]>; totalIssues: number }
  ): SourceField[] {
    
    return jiraFields.map(jiraField => {
      const fieldSamples = sampleData.fieldData[jiraField.id] || [];
      const populatedCount = fieldSamples.filter(value => value !== null && value !== undefined).length;
      const populationRate = sampleData.totalIssues > 0 ? populatedCount / sampleData.totalIssues : 0;
      
      return {
        id: jiraField.id,
        name: jiraField.name,
        displayName: this.getJiraFieldDisplayName(jiraField),
        type: this.mapJiraFieldType(jiraField),
        description: this.getJiraFieldDescription(jiraField),
        required: this.isJiraFieldRequired(jiraField),
        customField: jiraField.custom,
        schema: this.convertJiraSchema(jiraField.schema),
        samples: fieldSamples.slice(0, 10), // Keep first 10 samples
        populationRate,
        metadata: {
          jiraId: jiraField.id,
          clauseNames: jiraField.clauseNames,
          orderable: jiraField.orderable,
          searchable: jiraField.searchable
        }
      };
    });
  }

  /**
   * Get user-friendly display name for Jira field
   */
  private getJiraFieldDisplayName(field: JiraField): string {
    // For custom fields, extract name from field name
    if (field.custom && field.name.includes('[') && field.name.includes(']')) {
      const match = field.name.match(/\[(.*?)\]/);
      return match ? match[1] : field.name;
    }
    return field.name;
  }

  /**
   * Map Jira field types to standardized FieldType enum
   */
  private mapJiraFieldType(field: JiraField): FieldType {
    if (!field.schema) return FieldType.UNKNOWN;
    
    const { type, system } = field.schema;
    
    // System fields
    if (system) {
      switch (system) {
        case 'summary': return FieldType.TEXT;
        case 'description': return FieldType.TEXT;
        case 'issuetype': return FieldType.SELECT;
        case 'status': return FieldType.STATUS;
        case 'priority': return FieldType.PRIORITY;
        case 'assignee': return FieldType.USER;
        case 'reporter': return FieldType.USER;
        case 'created': return FieldType.DATE;
        case 'updated': return FieldType.DATE;
        case 'duedate': return FieldType.DATE;
        case 'labels': return FieldType.LABELS;
        case 'components': return FieldType.COMPONENTS;
        default: break;
      }
    }
    
    // By schema type
    switch (type) {
      case 'string': return FieldType.TEXT;
      case 'number': return FieldType.NUMBER;
      case 'date': return FieldType.DATE;
      case 'datetime': return FieldType.DATE;
      case 'option': return FieldType.SELECT;
      case 'array':
        if (field.schema.items === 'option') return FieldType.MULTI_SELECT;
        if (field.schema.items === 'string') return FieldType.LABELS;
        return FieldType.MULTI_SELECT;
      case 'user': return FieldType.USER;
      case 'project': return FieldType.SELECT;
      case 'issuelink': return FieldType.EPIC_LINK;
      default: break;
    }
    
    // Special cases for common custom fields
    if (field.name.toLowerCase().includes('story point') || 
        field.name.toLowerCase().includes('point') ||
        field.name.toLowerCase().includes('estimate')) {
      return FieldType.STORY_POINTS;
    }
    
    if (field.name.toLowerCase().includes('epic') && 
        field.name.toLowerCase().includes('link')) {
      return FieldType.EPIC_LINK;
    }
    
    if (field.name.toLowerCase().includes('sprint')) {
      return FieldType.SPRINT;
    }
    
    return FieldType.CUSTOM;
  }

  /**
   * Get field description (for Jira, often not available)
   */
  private getJiraFieldDescription(field: JiraField): string {
    if (field.schema?.system) {
      // Provide descriptions for known system fields
      const systemDescriptions: Record<string, string> = {
        'summary': 'Issue title/summary',
        'description': 'Detailed description of the issue',
        'issuetype': 'Type of issue (Story, Task, Bug, etc.)',
        'status': 'Current status of the issue',
        'priority': 'Priority level of the issue',
        'assignee': 'Person assigned to work on the issue',
        'reporter': 'Person who reported the issue',
        'created': 'Date when issue was created',
        'updated': 'Date when issue was last updated',
        'duedate': 'Target completion date',
        'labels': 'Labels or tags for categorization',
        'components': 'Components affected by this issue'
      };
      return systemDescriptions[field.schema.system] || field.name;
    }
    
    return field.custom ? `Custom field: ${field.name}` : field.name;
  }

  /**
   * Determine if field is required (Jira API doesn't provide this directly)
   */
  private isJiraFieldRequired(field: JiraField): boolean {
    // Known required fields in Jira
    const requiredSystemFields = ['summary', 'issuetype', 'reporter'];
    return field.schema?.system ? requiredSystemFields.includes(field.schema.system) : false;
  }

  /**
   * Convert Jira schema to standardized format
   */
  private convertJiraSchema(schema?: JiraFieldSchema): any {
    if (!schema) return undefined;
    
    return {
      dataType: this.mapJiraDataType(schema.type),
      format: schema.custom,
      nullable: true, // Most Jira fields are nullable
      constraints: this.getJiraFieldConstraints(schema)
    };
  }

  /**
   * Map Jira data types to standard types
   */
  private mapJiraDataType(jiraType: string): string {
    const typeMap: Record<string, string> = {
      'string': 'string',
      'number': 'number',
      'date': 'date',
      'datetime': 'date',
      'option': 'string',
      'array': 'array',
      'user': 'reference',
      'project': 'reference',
      'issuelink': 'reference'
    };
    
    return typeMap[jiraType] || 'string';
  }

  /**
   * Get constraints for Jira field types
   */
  private getJiraFieldConstraints(schema: JiraFieldSchema): any {
    const constraints: any = {};
    
    if (schema.type === 'string') {
      constraints.maxLength = 255; // Most string fields have this limit
    }
    
    if (schema.type === 'number') {
      constraints.minValue = 0;
    }
    
    return Object.keys(constraints).length > 0 ? constraints : undefined;
  }

  /**
   * Make authenticated request to Jira API
   */
  private async makeAuthenticatedRequest(endpoint: string): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    
    // Add authentication header
    if (this.accessToken.includes(':')) {
      // API key authentication (Basic Auth)
      headers['Authorization'] = `Basic ${this.accessToken}`;
    } else {
      // OAuth 2.0 Bearer token
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }
    
    return fetch(url, {
      method: 'GET',
      headers
    });
  }

  /**
   * Get available projects (for filtering)
   */
  async getProjects(): Promise<JiraProject[]> {
    const response = await this.makeAuthenticatedRequest('/rest/api/3/project');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status}`);
    }
    
    return response.json();
  }

  /**
   * Get issue types for a project
   */
  async getIssueTypes(projectKey: string): Promise<JiraIssueType[]> {
    const response = await this.makeAuthenticatedRequest(`/rest/api/3/project/${projectKey}/statuses`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch issue types: ${response.status}`);
    }
    
    const statuses = await response.json();
    return statuses.map((status: any) => status.id);
  }
}

// Example usage and testing
export const createJiraIntegrationExample = (): IntegrationConfig => {
  return {
    id: 'jira_integration_001',
    provider: IntegrationProvider.JIRA,
    name: 'Company Jira Integration',
    authentication: {
      method: AuthenticationMethod.OAUTH2,
      credentials: {},
      oauth: {
        clientId: 'pm33-jira-client',
        scopes: ['read:jira-work', 'write:jira-work', 'read:jira-user'],
        redirectUri: 'https://app.pm33.ai/integrations/jira/callback',
        state: 'random_state_string',
        codeChallenge: 'code_challenge_for_pkce',
        tokenEndpoint: 'https://auth.atlassian.com/oauth/token'
      },
      validated: false
    },
    settings: {
      baseUrl: 'https://company.atlassian.net',
      syncFrequency: 'daily' as any,
      fieldMappings: [],
      filters: [],
      mdmRules: []
    },
    createdAt: new Date(),
    status: IntegrationStatus.CONNECTING
  };
};

// Export singleton instance
export const jiraProvider = new JiraProvider();