import type { NextApiRequest, NextApiResponse } from 'next';

// Mock data for development - replace with actual API calls to FastAPI backend
const mockIntegrations = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    integration_type: 'jira',
    integration_name: 'Main Jira Workspace',
    status: 'active',
    last_sync_at: '2024-01-15T10:30:00Z',
    credential_expires_at: '2024-12-31T23:59:59Z',
    needs_token_refresh: false,
    last_error: null
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    integration_type: 'linear',
    integration_name: 'Engineering Team',
    status: 'active',
    last_sync_at: '2024-01-15T09:15:00Z',
    credential_expires_at: '2024-06-30T23:59:59Z',
    needs_token_refresh: true,
    last_error: null
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    integration_type: 'jira',
    integration_name: 'Support Desk',
    status: 'error',
    last_sync_at: '2024-01-14T16:45:00Z',
    credential_expires_at: '2024-12-31T23:59:59Z',
    needs_token_refresh: false,
    last_error: 'Authentication failed - token may be revoked'
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // In production, verify JWT token here
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header required' });
  }

  switch (method) {
    case 'GET':
      try {
        // In production, make request to FastAPI backend:
        // const response = await fetch(`${process.env.BACKEND_URL}/api/integrations`, {
        //   headers: { Authorization: authHeader }
        // });
        // const data = await response.json();
        
        // For now, return mock data
        res.status(200).json(mockIntegrations);
      } catch (error) {
        console.error('Error fetching integrations:', error);
        res.status(500).json({ error: 'Failed to fetch integrations' });
      }
      break;

    case 'POST':
      try {
        // Handle integration creation
        const { integration_type, integration_name } = req.body;
        
        // In production, forward to FastAPI backend:
        // const response = await fetch(`${process.env.BACKEND_URL}/api/integrations`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: authHeader
        //   },
        //   body: JSON.stringify(req.body)
        // });
        
        // Mock response for development
        const newIntegration = {
          id: `550e8400-e29b-41d4-a716-${Date.now()}`,
          integration_type,
          integration_name,
          status: 'pending',
          last_sync_at: null,
          credential_expires_at: null,
          needs_token_refresh: false,
          last_error: null
        };
        
        res.status(201).json(newIntegration);
      } catch (error) {
        console.error('Error creating integration:', error);
        res.status(500).json({ error: 'Failed to create integration' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}