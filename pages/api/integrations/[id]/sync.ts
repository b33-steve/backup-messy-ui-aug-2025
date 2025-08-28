import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id } = req.query;
  const { incremental = true } = req.body;

  // Check authorization
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header required' });
  }

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid integration ID' });
  }

  try {
    // In production, forward to FastAPI backend:
    // const response = await fetch(`${process.env.BACKEND_URL}/api/integrations/${id}/sync`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: authHeader
    //   },
    //   body: JSON.stringify({ integration_id: id, incremental })
    // });
    // const data = await response.json();
    // return res.status(response.status).json(data);

    // Mock response for development
    console.log(`Starting ${incremental ? 'incremental' : 'full'} sync for integration ${id}`);
    
    res.status(200).json({
      success: true,
      message: `${incremental ? 'Incremental' : 'Full'} sync started for integration`,
      sync_id: `sync_${Date.now()}`
    });

  } catch (error) {
    console.error('Error starting sync:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to start sync'
    });
  }
}