import { NextRequest, NextResponse } from 'next/server'

interface JiraTokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  scope: string
}

interface JiraUser {
  account_id: string
  name: string
  email: string
  picture: string
}

interface JiraResource {
  id: string
  name: string
  url: string
  scopes: string[]
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?oauth_error=${error}`
    )
  }

  // Validate required parameters
  if (!code || !state) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?oauth_error=missing_parameters`
    )
  }

  try {
    // Verify state parameter for CSRF protection
    // In production, verify this against stored state in session/database
    
    // Exchange authorization code for access token
    const tokenData = await exchangeCodeForToken(code)
    
    if (!tokenData) {
      throw new Error('Failed to exchange code for token')
    }

    // Get user information
    const userData = await getJiraUser(tokenData.access_token)
    
    // Get accessible resources (Jira sites)
    const resources = await getJiraResources(tokenData.access_token)

    // Store integration data in database
    await storeJiraIntegration({
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresIn: tokenData.expires_in,
      user: userData,
      resources,
      connectedAt: new Date().toISOString()
    })

    // Redirect to dashboard with success message
    const workspaceName = resources.length > 0 ? resources[0].name : 'Unknown Workspace'
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?oauth_success=true&workspace=${encodeURIComponent(workspaceName)}`
    )

  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?oauth_error=callback_failed`
    )
  }
}

async function exchangeCodeForToken(code: string): Promise<JiraTokenResponse | null> {
  const JIRA_CLIENT_ID = process.env.JIRA_CLIENT_ID
  const JIRA_CLIENT_SECRET = process.env.JIRA_CLIENT_SECRET
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/oauth/callback/jira`

  if (!JIRA_CLIENT_ID || !JIRA_CLIENT_SECRET) {
    console.error('Missing Jira OAuth credentials')
    return null
  }

  try {
    const response = await fetch('https://auth.atlassian.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: JIRA_CLIENT_ID,
        client_secret: JIRA_CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Token exchange failed:', response.status, errorText)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Token exchange error:', error)
    return null
  }
}

async function getJiraUser(accessToken: string): Promise<JiraUser | null> {
  try {
    const response = await fetch('https://api.atlassian.com/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('Failed to get user info:', response.status)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Get user error:', error)
    return null
  }
}

async function getJiraResources(accessToken: string): Promise<JiraResource[]> {
  try {
    const response = await fetch('https://api.atlassian.com/oauth/token/accessible-resources', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('Failed to get resources:', response.status)
      return []
    }

    return await response.json()
  } catch (error) {
    console.error('Get resources error:', error)
    return []
  }
}

async function storeJiraIntegration(data: {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: JiraUser | null
  resources: JiraResource[]
  connectedAt: string
}) {
  // In a real app, store this in your database
  console.log('Storing Jira integration:', {
    userId: data.user?.account_id,
    workspace: data.resources[0]?.name,
    connectedAt: data.connectedAt,
    resourceCount: data.resources.length
  })

  // Example database operation:
  /*
  await db.integrations.create({
    data: {
      userId: getCurrentUserId(),
      service: 'jira',
      accessToken: encrypt(data.accessToken),
      refreshToken: encrypt(data.refreshToken),
      expiresAt: new Date(Date.now() + data.expiresIn * 1000),
      metadata: {
        user: data.user,
        resources: data.resources
      }
    }
  })
  */
}