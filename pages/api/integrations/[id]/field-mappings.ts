import type { NextApiRequest, NextApiResponse } from 'next';

// Mock field mappings data for development
const mockFieldMappings = {
  '550e8400-e29b-41d4-a716-446655440001': [ // Jira integration
    {
      id: 'mapping_1',
      source_field: 'summary',
      target_field: 'title',
      confidence_score: 1.0,
      is_ai_suggested: false,
      is_user_approved: true,
      is_required: true,
      transformation_rule: {},
      success_rate: 1.0,
      times_used: 247
    },
    {
      id: 'mapping_2',
      source_field: 'description',
      target_field: 'description',
      confidence_score: 0.95,
      is_ai_suggested: true,
      is_user_approved: true,
      is_required: false,
      transformation_rule: {},
      success_rate: 0.94,
      times_used: 225
    },
    {
      id: 'mapping_3',
      source_field: 'issuetype',
      target_field: 'work_item_type',
      confidence_score: 0.9,
      is_ai_suggested: true,
      is_user_approved: true,
      is_required: true,
      transformation_rule: {
        'Bug': 'bug',
        'Story': 'feature',
        'Task': 'task',
        'Epic': 'epic'
      },
      success_rate: 0.89,
      times_used: 247
    },
    {
      id: 'mapping_4',
      source_field: 'status',
      target_field: 'status',
      confidence_score: 0.88,
      is_ai_suggested: true,
      is_user_approved: false,
      is_required: true,
      transformation_rule: {},
      success_rate: 0.85,
      times_used: 198
    }
  ],
  '550e8400-e29b-41d4-a716-446655440002': [ // Linear integration
    {
      id: 'mapping_5',
      source_field: 'title',
      target_field: 'title',
      confidence_score: 1.0,
      is_ai_suggested: false,
      is_user_approved: true,
      is_required: true,
      transformation_rule: {},
      success_rate: 1.0,
      times_used: 42
    },
    {
      id: 'mapping_6',
      source_field: 'description',
      target_field: 'description',
      confidence_score: 0.92,
      is_ai_suggested: true,
      is_user_approved: true,
      is_required: false,
      transformation_rule: {},
      success_rate: 0.9,
      times_used: 38
    }
  ]
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Check authorization
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header required' });
  }

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid integration ID' });
  }

  switch (req.method) {
    case 'GET':
      try {
        // In production, forward to FastAPI backend:
        // const response = await fetch(`${process.env.BACKEND_URL}/api/integrations/${id}/field-mappings`, {
        //   headers: { Authorization: authHeader }
        // });
        // const data = await response.json();
        // return res.status(response.status).json(data);

        // Return mock data for development
        const mappings = mockFieldMappings[id as keyof typeof mockFieldMappings] || [];
        res.status(200).json(mappings);

      } catch (error) {
        console.error('Error fetching field mappings:', error);
        res.status(500).json({ error: 'Failed to fetch field mappings' });
      }
      break;

    case 'POST':
      try {
        const { source_field, target_field, confidence_score = 1.0 } = req.body;
        
        // In production, forward to FastAPI backend for creation
        // Mock response for development
        const newMapping = {
          id: `mapping_${Date.now()}`,
          source_field,
          target_field,
          confidence_score,
          is_ai_suggested: false,
          is_user_approved: false,
          is_required: false,
          transformation_rule: {},
          success_rate: 1.0,
          times_used: 0
        };

        res.status(201).json(newMapping);

      } catch (error) {
        console.error('Error creating field mapping:', error);
        res.status(500).json({ error: 'Failed to create field mapping' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}