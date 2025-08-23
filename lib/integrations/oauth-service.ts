/**
 * File: lib/integrations/oauth-service.ts
 * Purpose: OAuth authentication service for PM tool integrations with PKCE support
 * Why: Handles secure OAuth flows for end-user authentication with their PM tools
 * Relevant Files: lib/integrations/types.ts, components/integrations/IntegrationOAuthButton.tsx
 */

import { 
  IntegrationProvider, 
  IntegrationConfig, 
  AuthenticationMethod,
  IntegrationStatus,
  OAuthConfig,
  SyncStatus
} from './types';

// OAuth Configuration for each provider
const OAUTH_CONFIGS: Record<IntegrationProvider, Partial<OAuthConfig>> = {
  [IntegrationProvider.JIRA]: {
    scopes: ['read:jira-user', 'read:jira-work', 'write:jira-work'],
    tokenEndpoint: 'https://auth.atlassian.com/oauth/token'
  },
  [IntegrationProvider.LINEAR]: {
    scopes: ['read', 'write'],
    tokenEndpoint: 'https://api.linear.app/oauth/token'
  },
  [IntegrationProvider.MONDAY]: {
    scopes: ['boards:read', 'boards:write', 'me:read'],
    tokenEndpoint: 'https://auth.monday.com/oauth2/token'
  },
  [IntegrationProvider.ASANA]: {
    scopes: ['default'],
    tokenEndpoint: 'https://app.asana.com/-/oauth_token'
  }
};

// OAuth Redirect URLs (Next.js API routes)
const getRedirectUri = (provider: IntegrationProvider): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL;
  return `${baseUrl}/api/integrations/oauth/callback/${provider}`;
};

// PKCE Code Challenge Generation
const generateCodeVerifier = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, Array.from(array)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

const generateCodeChallenge = async (verifier: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

// OAuth State Management (prevents CSRF)
const generateState = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, Array.from(array)));
};

class OAuthService {
  private pendingConnections = new Map<string, { provider: IntegrationProvider; verifier: string }>();

  /**
   * Initiates OAuth flow for a provider
   */
  async initiateOAuth(provider: IntegrationProvider): Promise<void> {
    const config = OAUTH_CONFIGS[provider];
    if (!config) {
      throw new Error(`OAuth not configured for provider: ${provider}`);
    }

    // Check if we're in demo mode (demo client IDs)
    const clientId = this.getClientId(provider);
    const isDemoMode = clientId.startsWith('demo_');
    
    if (isDemoMode) {
      // Demo mode: simulate OAuth flow
      this.handleDemoOAuth(provider);
      return;
    }

    // Generate PKCE parameters
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = generateState();

    // Store verifier for callback
    this.pendingConnections.set(state, { provider, verifier: codeVerifier });
    
    // Store in localStorage as backup (cleared on callback)
    localStorage.setItem(`oauth_${state}`, JSON.stringify({
      provider,
      verifier: codeVerifier,
      timestamp: Date.now()
    }));

    const redirectUri = getRedirectUri(provider);
    const authUrl = this.buildAuthUrl(provider, {
      ...config,
      redirectUri,
      state,
      codeChallenge
    });

    // Redirect to OAuth provider
    window.location.href = authUrl;
  }

  /**
   * Handles demo mode OAuth simulation
   */
  private handleDemoOAuth(provider: IntegrationProvider): void {
    // Show demo modal explaining OAuth setup
    const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
    const setupInstructions = this.getOAuthSetupInstructions(provider);
    
    const message = `Demo Mode: ${providerName} OAuth Setup Required

To enable ${providerName} integration, you need to:

${setupInstructions}

For now, we'll simulate a successful connection for demo purposes.

Click OK to continue with demo connection.`;

    if (confirm(message)) {
      // Simulate successful OAuth connection
      this.simulateDemoConnection(provider);
    }
  }

  /**
   * Simulates a demo connection for development/demo purposes
   */
  private simulateDemoConnection(provider: IntegrationProvider): void {
    setTimeout(() => {
      // Create a demo integration config
      const integration: IntegrationConfig = {
        id: `${provider}_demo_${Date.now()}`,
        provider,
        name: `${provider} - Demo Workspace`,
        authentication: {
          method: AuthenticationMethod.OAUTH2,
          credentials: {},
          oauth: {
            clientId: this.getClientId(provider),
            scopes: OAUTH_CONFIGS[provider].scopes || [],
            redirectUri: getRedirectUri(provider),
            state: 'demo_state',
            tokenEndpoint: OAUTH_CONFIGS[provider].tokenEndpoint!,
            accessToken: 'demo_access_token',
            refreshToken: 'demo_refresh_token',
          },
          validated: true,
          expiresAt: new Date(Date.now() + 3600000) // 1 hour from now
        },
        settings: {
          baseUrl: `https://demo-workspace.${provider}.com`,
          workspaceId: 'demo_workspace',
          projectKeys: ['DEMO', 'TEST'],
          syncFrequency: 'daily' as any,
          fieldMappings: [],
          filters: [],
          mdmRules: []
        },
        createdAt: new Date(),
        status: IntegrationStatus.READY
      };

      // Store demo integration
      this.storeIntegration(integration);
      
      // Show success message
      alert(`Demo connection to ${provider} successful! 
      
In production, this would be a real OAuth connection. 
Check the Connected Integrations section to see your demo connection.
      
Refresh the page to see the connected integration.`);
      
      // Refresh the page to show the connected integration
      window.location.reload();
    }, 1000);
  }

  /**
   * Gets OAuth setup instructions for each provider
   */
  private getOAuthSetupInstructions(provider: IntegrationProvider): string {
    switch (provider) {
      case IntegrationProvider.JIRA:
        return `1. Go to https://developer.atlassian.com/console/myapps/
2. Create a new OAuth 2.0 (3LO) app
3. Add redirect URI: ${getRedirectUri(provider)}
4. Copy Client ID and Client Secret
5. Update .env.local with real credentials`;
      
      case IntegrationProvider.LINEAR:
        return `1. Go to Linear Settings > API > OAuth Applications
2. Create new OAuth application  
3. Add redirect URI: ${getRedirectUri(provider)}
4. Copy Client ID and Client Secret
5. Update .env.local with real credentials`;
      
      case IntegrationProvider.MONDAY:
        return `1. Go to Monday.com Developer Center
2. Create new OAuth app
3. Add redirect URI: ${getRedirectUri(provider)}
4. Copy Client ID and Client Secret
5. Update .env.local with real credentials`;
      
      case IntegrationProvider.ASANA:
        return `1. Go to Asana Developer Console
2. Create new OAuth application
3. Add redirect URI: ${getRedirectUri(provider)}
4. Copy Client ID and Client Secret
5. Update .env.local with real credentials`;
      
      default:
        return `Configure OAuth application for ${provider}`;
    }
  }

  /**
   * Builds authorization URL for each provider
   */
  private buildAuthUrl(provider: IntegrationProvider, config: Partial<OAuthConfig>): string {
    const params = new URLSearchParams();
    
    switch (provider) {
      case IntegrationProvider.JIRA:
        params.set('audience', 'api.atlassian.com');
        params.set('client_id', process.env.NEXT_PUBLIC_ATLASSIAN_CLIENT_ID!);
        params.set('scope', config.scopes?.join(' ') || '');
        params.set('redirect_uri', config.redirectUri!);
        params.set('state', config.state!);
        params.set('response_type', 'code');
        params.set('prompt', 'consent');
        return `https://auth.atlassian.com/authorize?${params}`;

      case IntegrationProvider.LINEAR:
        params.set('client_id', process.env.NEXT_PUBLIC_LINEAR_CLIENT_ID!);
        params.set('redirect_uri', config.redirectUri!);
        params.set('response_type', 'code');
        params.set('scope', config.scopes?.join(' ') || '');
        params.set('state', config.state!);
        return `https://linear.app/oauth/authorize?${params}`;

      case IntegrationProvider.MONDAY:
        params.set('client_id', process.env.NEXT_PUBLIC_MONDAY_CLIENT_ID!);
        params.set('state', config.state!);
        return `https://auth.monday.com/oauth2/authorize?${params}`;

      case IntegrationProvider.ASANA:
        params.set('client_id', process.env.NEXT_PUBLIC_ASANA_CLIENT_ID!);
        params.set('redirect_uri', config.redirectUri!);
        params.set('response_type', 'code');
        params.set('state', config.state!);
        return `https://app.asana.com/-/oauth_authorize?${params}`;

      default:
        throw new Error(`Unsupported OAuth provider: ${provider}`);
    }
  }

  /**
   * Handles OAuth callback (called by API route)
   */
  async handleCallback(
    provider: IntegrationProvider, 
    code: string, 
    state: string
  ): Promise<{ success: boolean; integration?: IntegrationConfig; error?: string }> {
    try {
      // Retrieve stored verifier
      const pending = this.pendingConnections.get(state);
      let verifier = pending?.verifier;
      
      if (!verifier) {
        // Fallback to localStorage
        const stored = localStorage.getItem(`oauth_${state}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          verifier = parsed.verifier;
          localStorage.removeItem(`oauth_${state}`);
        }
      }

      if (!verifier) {
        throw new Error('Invalid OAuth state - security check failed');
      }

      // Exchange code for token
      const tokenResponse = await this.exchangeCodeForToken(provider, code, verifier);
      
      if (!tokenResponse.access_token) {
        throw new Error('Failed to obtain access token');
      }

      // Get user info and workspace details
      const userInfo = await this.getUserInfo(provider, tokenResponse.access_token);

      // Create integration config
      const integration: IntegrationConfig = {
        id: `${provider}_${Date.now()}`,
        provider,
        name: `${provider} - ${userInfo.workspace}`,
        authentication: {
          method: AuthenticationMethod.OAUTH2,
          credentials: {},
          oauth: {
            clientId: this.getClientId(provider),
            scopes: OAUTH_CONFIGS[provider].scopes || [],
            redirectUri: getRedirectUri(provider),
            state,
            tokenEndpoint: OAUTH_CONFIGS[provider].tokenEndpoint!,
            accessToken: tokenResponse.access_token,
            refreshToken: tokenResponse.refresh_token,
          },
          validated: true,
          expiresAt: tokenResponse.expires_in ? 
            new Date(Date.now() + tokenResponse.expires_in * 1000) : undefined
        },
        settings: {
          baseUrl: userInfo.baseUrl,
          workspaceId: userInfo.workspaceId,
          projectKeys: userInfo.projectKeys,
          syncFrequency: 'daily' as any,
          fieldMappings: [],
          filters: [],
          mdmRules: []
        },
        createdAt: new Date(),
        status: IntegrationStatus.READY
      };

      // Clean up
      this.pendingConnections.delete(state);

      // Store integration (this would typically go to backend)
      await this.storeIntegration(integration);

      return { success: true, integration };

    } catch (error) {
      console.error('OAuth callback error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'OAuth authentication failed' 
      };
    }
  }

  /**
   * Exchange authorization code for access token
   */
  private async exchangeCodeForToken(
    provider: IntegrationProvider, 
    code: string, 
    verifier: string
  ): Promise<any> {
    const config = OAUTH_CONFIGS[provider];
    const tokenUrl = config.tokenEndpoint!;
    
    const params = new URLSearchParams();
    params.set('grant_type', 'authorization_code');
    params.set('code', code);
    params.set('redirect_uri', getRedirectUri(provider));
    params.set('code_verifier', verifier);

    switch (provider) {
      case IntegrationProvider.JIRA:
        params.set('client_id', process.env.NEXT_PUBLIC_ATLASSIAN_CLIENT_ID!);
        break;
      case IntegrationProvider.LINEAR:
        params.set('client_id', process.env.NEXT_PUBLIC_LINEAR_CLIENT_ID!);
        params.set('client_secret', process.env.LINEAR_CLIENT_SECRET!);
        break;
      case IntegrationProvider.MONDAY:
        params.set('client_id', process.env.NEXT_PUBLIC_MONDAY_CLIENT_ID!);
        params.set('client_secret', process.env.MONDAY_CLIENT_SECRET!);
        break;
      case IntegrationProvider.ASANA:
        params.set('client_id', process.env.NEXT_PUBLIC_ASANA_CLIENT_ID!);
        params.set('client_secret', process.env.ASANA_CLIENT_SECRET!);
        break;
    }

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: params
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    return response.json();
  }

  /**
   * Get user info and workspace details from provider
   */
  private async getUserInfo(provider: IntegrationProvider, accessToken: string): Promise<{
    workspace: string;
    baseUrl: string;
    workspaceId: string;
    projectKeys?: string[];
  }> {
    switch (provider) {
      case IntegrationProvider.JIRA:
        const sites = await fetch('https://api.atlassian.com/oauth/token/accessible-resources', {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }).then(r => r.json());
        
        const site = sites[0]; // Use first accessible site
        return {
          workspace: site.name,
          baseUrl: site.url,
          workspaceId: site.id
        };

      case IntegrationProvider.LINEAR:
        const user = await fetch('https://api.linear.app/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: '{ viewer { organization { name id } } }'
          })
        }).then(r => r.json());

        return {
          workspace: user.data.viewer.organization.name,
          baseUrl: 'https://api.linear.app',
          workspaceId: user.data.viewer.organization.id
        };

      default:
        return {
          workspace: 'Default Workspace',
          baseUrl: '',
          workspaceId: 'default'
        };
    }
  }

  private getClientId(provider: IntegrationProvider): string {
    switch (provider) {
      case IntegrationProvider.JIRA:
        return process.env.NEXT_PUBLIC_ATLASSIAN_CLIENT_ID!;
      case IntegrationProvider.LINEAR:
        return process.env.NEXT_PUBLIC_LINEAR_CLIENT_ID!;
      case IntegrationProvider.MONDAY:
        return process.env.NEXT_PUBLIC_MONDAY_CLIENT_ID!;
      case IntegrationProvider.ASANA:
        return process.env.NEXT_PUBLIC_ASANA_CLIENT_ID!;
      default:
        throw new Error(`Unknown provider: ${provider}`);
    }
  }

  /**
   * Store integration configuration (would typically call backend API)
   */
  private async storeIntegration(integration: IntegrationConfig): Promise<void> {
    // For now, store in localStorage (in production, this would be a backend API call)
    const stored = localStorage.getItem('pm33_integrations');
    const integrations = stored ? JSON.parse(stored) : [];
    integrations.push(integration);
    localStorage.setItem('pm33_integrations', JSON.stringify(integrations));
  }

  /**
   * Get stored integrations
   */
  async getIntegrations(): Promise<IntegrationConfig[]> {
    const stored = localStorage.getItem('pm33_integrations');
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Remove integration
   */
  async removeIntegration(integrationId: string): Promise<void> {
    const stored = localStorage.getItem('pm33_integrations');
    if (stored) {
      const integrations = JSON.parse(stored);
      const filtered = integrations.filter((i: IntegrationConfig) => i.id !== integrationId);
      localStorage.setItem('pm33_integrations', JSON.stringify(filtered));
    }
  }
}

export const oauthService = new OAuthService();