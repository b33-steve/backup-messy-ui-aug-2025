/**
 * File: app/api/integrations/oauth/callback/[provider]/route.ts
 * Purpose: OAuth callback handler for PM tool integrations
 * Why: Processes OAuth redirect and exchanges authorization code for access token
 * Relevant Files: lib/integrations/oauth-service.ts, lib/integrations/types.ts
 */

import { NextRequest, NextResponse } from 'next/server';
import { IntegrationProvider } from '@/lib/integrations/types';
import { oauthService } from '@/lib/integrations/oauth-service';

interface CallbackParams {
  provider: string;
}

// Handle OAuth callback GET request
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<CallbackParams> }
) {
  try {
    const { provider } = await params;
    const { searchParams } = new URL(request.url);
    
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    // Check for OAuth errors
    if (error) {
      console.error('OAuth error:', error, errorDescription);
      return NextResponse.redirect(
        new URL(`/settings?integration_error=${encodeURIComponent(errorDescription || error)}`, request.url)
      );
    }

    // Validate required parameters
    if (!code || !state) {
      return NextResponse.redirect(
        new URL('/settings?integration_error=Missing authorization code or state', request.url)
      );
    }

    // Validate provider
    if (!Object.values(IntegrationProvider).includes(provider as IntegrationProvider)) {
      return NextResponse.redirect(
        new URL('/settings?integration_error=Invalid integration provider', request.url)
      );
    }

    // Handle OAuth callback
    const result = await oauthService.handleCallback(
      provider as IntegrationProvider,
      code,
      state
    );

    if (result.success && result.integration) {
      // Successful integration
      const successParams = new URLSearchParams({
        integration_success: 'true',
        provider: provider,
        workspace: result.integration.settings.workspaceId || 'connected'
      });
      
      return NextResponse.redirect(
        new URL(`/settings?${successParams}`, request.url)
      );
    } else {
      // Integration failed
      return NextResponse.redirect(
        new URL(`/settings?integration_error=${encodeURIComponent(result.error || 'Integration failed')}`, request.url)
      );
    }

  } catch (error) {
    console.error('OAuth callback processing error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.redirect(
      new URL(`/settings?integration_error=${encodeURIComponent(errorMessage)}`, request.url)
    );
  }
}

// Handle preflight OPTIONS request (CORS)
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}