import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { integration_type, integration_name } = req.body;

  // Validate input
  if (!integration_type || !integration_name) {
    return res.status(400).json({
      success: false,
      error: 'integration_type and integration_name are required'
    });
  }

  const supportedTypes = ['jira', 'linear', 'monday'];
  if (!supportedTypes.includes(integration_type)) {
    return res.status(400).json({
      success: false,
      error: `Unsupported integration type. Supported: ${supportedTypes.join(', ')}`
    });
  }

  // Check authorization
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: 'Authorization header required'
    });
  }

  try {
    // In production, forward to FastAPI backend:
    // const response = await fetch(`${process.env.BACKEND_URL}/api/integrations/setup`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: authHeader
    //   },
    //   body: JSON.stringify({ integration_type, integration_name })
    // });
    // const data = await response.json();
    // return res.status(response.status).json(data);

    // Mock OAuth URLs for development
    const mockAuthUrls = {
      jira: `https://auth.atlassian.com/authorize?response_type=code&client_id=pm33_jira_client&redirect_uri=https://app.pm33.ai/auth/jira/callback&scope=read:jira-user read:jira-work&state=mock_state_${Date.now()}&audience=api.atlassian.com&prompt=consent`,
      linear: `https://linear.app/oauth/authorize?response_type=code&client_id=pm33_linear_client&redirect_uri=https://app.pm33.ai/auth/linear/callback&scope=read write&state=mock_state_${Date.now()}`,
      monday: `https://auth.monday.com/oauth2/authorize?response_type=code&client_id=pm33_monday_client&redirect_uri=https://app.pm33.ai/auth/monday/callback&scope=boards:read boards:write&state=mock_state_${Date.now()}`
    };

    const state = `mock_state_${Date.now()}_${integration_type}`;

    res.status(200).json({
      success: true,
      authorize_url: mockAuthUrls[integration_type as keyof typeof mockAuthUrls],
      state: state
    });

  } catch (error) {
    console.error('Error setting up integration:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to initiate integration setup'
    });
  }
}