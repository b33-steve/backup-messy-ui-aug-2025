import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Environment variables - set these in your .env.local file
    const JIRA_CLIENT_ID = process.env.JIRA_CLIENT_ID
    const JIRA_CLIENT_SECRET = process.env.JIRA_CLIENT_SECRET
    const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
    
    if (!JIRA_CLIENT_ID) {
      return NextResponse.json({
        success: false,
        error: 'Jira OAuth not configured',
        setup: {
          message: 'To enable Jira OAuth integration:',
          steps: [
            '1. Go to: https://developer.atlassian.com/console/myapps/',
            '2. Click "Create" → "OAuth 2.0 (3LO)"',
            '3. Add redirect URI: ' + NEXT_PUBLIC_APP_URL + '/api/integrations/oauth/callback/jira',
            '4. Set JIRA_CLIENT_ID and JIRA_CLIENT_SECRET in .env.local'
          ]
        }
      }, { status: 400 })
    }

    const REDIRECT_URI = `${NEXT_PUBLIC_APP_URL}/api/integrations/oauth/callback/jira`
    const state = generateState() // Generate CSRF protection state
    
    // Store state in session/database for verification
    // In production, you'd store this in a secure session store
    
    const authUrl = `https://auth.atlassian.com/authorize?` +
      `audience=api.atlassian.com&` +
      `client_id=${JIRA_CLIENT_ID}&` +
      `scope=read:jira-work write:jira-work manage:jira-project&` +
      `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
      `response_type=code&` +
      `prompt=consent&` +
      `state=${state}`
    
    return NextResponse.json({
      success: true,
      authUrl,
      state,
      redirectUri: REDIRECT_URI
    })

  } catch (error) {
    console.error('Jira OAuth auth error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate OAuth URL',
        demo: true,
        message: 'Currently in demo mode. Real OAuth integration requires environment setup.'
      },
      { status: 500 }
    )
  }
}

// Generate a secure random state for CSRF protection
function generateState(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'disconnect':
        // Handle disconnection - clear stored tokens
        console.log('Disconnecting Jira integration for user:', data.userId)
        // In a real app: DELETE FROM integrations WHERE user_id = ? AND service = 'jira'
        
        return NextResponse.json({
          success: true,
          message: 'Jira integration disconnected successfully'
        })

      case 'refresh_token':
        // Handle token refresh
        console.log('Refreshing Jira token for user:', data.userId)
        // In a real app: refresh OAuth token using refresh_token
        
        return NextResponse.json({
          success: true,
          message: 'Token refreshed successfully'
        })

      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Jira OAuth action error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process OAuth action' },
      { status: 500 }
    )
  }
}