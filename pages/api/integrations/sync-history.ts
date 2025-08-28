import type { NextApiRequest, NextApiResponse } from 'next';

// Mock sync history data for development
const mockSyncHistory = [
  {
    id: '1',
    integration_id: '550e8400-e29b-41d4-a716-446655440001',
    sync_type: 'full_sync',
    sync_status: 'completed',
    records_synced: 247,
    records_created: 15,
    records_updated: 232,
    started_at: '2024-01-15T10:25:00Z',
    completed_at: '2024-01-15T10:30:00Z',
    sync_duration_seconds: 300,
    error_messages: []
  },
  {
    id: '2',
    integration_id: '550e8400-e29b-41d4-a716-446655440002',
    sync_type: 'incremental_sync',
    sync_status: 'completed',
    records_synced: 42,
    records_created: 8,
    records_updated: 34,
    started_at: '2024-01-15T09:10:00Z',
    completed_at: '2024-01-15T09:15:00Z',
    sync_duration_seconds: 120,
    error_messages: []
  },
  {
    id: '3',
    integration_id: '550e8400-e29b-41d4-a716-446655440003',
    sync_type: 'full_sync',
    sync_status: 'failed',
    records_synced: 0,
    records_created: 0,
    records_updated: 0,
    started_at: '2024-01-14T16:40:00Z',
    completed_at: '2024-01-14T16:45:00Z',
    sync_duration_seconds: 300,
    error_messages: [
      'Authentication failed - token may be revoked',
      'Unable to connect to Jira API'
    ]
  },
  {
    id: '4',
    integration_id: '550e8400-e29b-41d4-a716-446655440001',
    sync_type: 'incremental_sync',
    sync_status: 'running',
    records_synced: 0,
    records_created: 0,
    records_updated: 0,
    started_at: '2024-01-15T11:00:00Z',
    completed_at: null,
    sync_duration_seconds: null,
    error_messages: []
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Check authorization
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header required' });
  }

  try {
    // In production, forward to FastAPI backend:
    // const response = await fetch(`${process.env.BACKEND_URL}/api/integrations/sync-history`, {
    //   headers: { Authorization: authHeader }
    // });
    // const data = await response.json();
    // return res.status(response.status).json(data);

    // Return mock data sorted by start time (newest first)
    const sortedHistory = mockSyncHistory.sort((a, b) => 
      new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
    );

    res.status(200).json(sortedHistory);

  } catch (error) {
    console.error('Error fetching sync history:', error);
    res.status(500).json({ error: 'Failed to fetch sync history' });
  }
}