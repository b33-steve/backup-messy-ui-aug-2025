/**
 * API Route: PM Tools Integration Management
 * Handles connection, synchronization, and status management for PM tools
 * Integrates with dashboard data hooks for real-time updates
 */

import { NextRequest, NextResponse } from 'next/server'

// Mock database - In production, this would connect to Supabase/Firebase
let mockPMTools = [
  {
    id: '1',
    name: 'Jira',
    type: 'issue_tracking',
    status: 'disconnected',
    capabilities: ['task_creation', 'status_updates', 'sprint_management', 'reporting'],
    taskCount: 0,
    lastSync: null,
    health: 'unknown',
    connectionData: null
  },
  {
    id: '2', 
    name: 'Linear',
    type: 'issue_tracking',
    status: 'connected',
    capabilities: ['task_creation', 'status_updates', 'team_management'],
    taskCount: 127,
    lastSync: new Date('2024-01-15T10:30:00Z'),
    health: 'excellent',
    connectionData: {
      workspace: 'Linear Demo Workspace',
      apiKey: 'demo_key_***',
      team: 'Engineering'
    }
  },
  {
    id: '3',
    name: 'Monday.com', 
    type: 'project_management',
    status: 'connected',
    capabilities: ['project_planning', 'team_collaboration', 'timeline_management', 'automation'],
    taskCount: 89,
    lastSync: new Date('2024-01-15T09:15:00Z'),
    health: 'good',
    connectionData: {
      workspace: 'Monday Demo Board',
      apiKey: 'demo_key_***',
      board: 'Product Development'
    }
  },
  {
    id: '4',
    name: 'Asana',
    type: 'task_management', 
    status: 'error',
    capabilities: ['task_management', 'project_tracking', 'team_coordination'],
    taskCount: 34,
    lastSync: new Date('2024-01-14T16:45:00Z'),
    health: 'degraded',
    connectionData: {
      workspace: 'Asana Demo Project',
      apiKey: 'demo_key_***',
      project: 'Q1 Roadmap'
    },
    lastError: 'API rate limit exceeded'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const toolName = searchParams.get('tool')

    // Return specific tool if requested
    if (toolName) {
      const tool = mockPMTools.find(t => t.name.toLowerCase() === toolName.toLowerCase())
      if (!tool) {
        return NextResponse.json(
          { error: 'PM tool not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ tool })
    }

    // Return all tools with summary
    const summary = {
      total: mockPMTools.length,
      connected: mockPMTools.filter(t => t.status === 'connected').length,
      healthy: mockPMTools.filter(t => t.health === 'excellent' || t.health === 'good').length,
      totalTasks: mockPMTools.reduce((sum, tool) => sum + tool.taskCount, 0)
    }

    return NextResponse.json({
      tools: mockPMTools,
      summary,
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('PM tools API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch PM tools data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, toolName, connectionData } = body

    if (!action || !toolName) {
      return NextResponse.json(
        { error: 'Missing required fields: action, toolName' },
        { status: 400 }
      )
    }

    const toolIndex = mockPMTools.findIndex(t => t.name.toLowerCase() === toolName.toLowerCase())
    if (toolIndex === -1) {
      return NextResponse.json(
        { error: 'PM tool not found' },
        { status: 404 }
      )
    }

    switch (action) {
      case 'connect':
        mockPMTools[toolIndex] = {
          ...mockPMTools[toolIndex],
          status: 'connected',
          connectionData: connectionData || {
            workspace: `${toolName} Demo Workspace`,
            apiKey: 'demo_key_***',
            connectedAt: new Date().toISOString()
          },
          health: 'excellent',
          lastSync: new Date()
        }
        break

      case 'disconnect':
        mockPMTools[toolIndex] = {
          ...mockPMTools[toolIndex],
          status: 'disconnected',
          connectionData: null,
          health: 'unknown',
          lastSync: null,
          taskCount: 0
        }
        break

      case 'sync':
        // Simulate sync operation
        const tool = mockPMTools[toolIndex]
        if (tool.status !== 'connected') {
          return NextResponse.json(
            { error: 'Tool must be connected to sync' },
            { status: 400 }
          )
        }

        // Simulate updating task count and sync time
        mockPMTools[toolIndex] = {
          ...tool,
          lastSync: new Date(),
          taskCount: Math.floor(Math.random() * 200) + 50, // Random task count for demo
          health: Math.random() > 0.2 ? 'excellent' : 'good' // 80% excellent, 20% good
        }
        break

      case 'test_connection':
        // Simulate connection test
        const testResult = {
          success: Math.random() > 0.1, // 90% success rate for demo
          latency: Math.floor(Math.random() * 200) + 50,
          timestamp: new Date().toISOString()
        }

        if (testResult.success) {
          mockPMTools[toolIndex].health = testResult.latency < 100 ? 'excellent' : 'good'
        } else {
          mockPMTools[toolIndex].health = 'degraded'
          mockPMTools[toolIndex].lastError = 'Connection timeout'
        }

        return NextResponse.json({
          tool: mockPMTools[toolIndex],
          testResult
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported: connect, disconnect, sync, test_connection' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      tool: mockPMTools[toolIndex],
      success: true,
      message: `${action} completed successfully for ${toolName}`
    })

  } catch (error) {
    console.error('PM tools API error:', error)
    return NextResponse.json(
      { error: 'Failed to process PM tools request' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { toolName, updates } = body

    if (!toolName || !updates) {
      return NextResponse.json(
        { error: 'Missing required fields: toolName, updates' },
        { status: 400 }
      )
    }

    const toolIndex = mockPMTools.findIndex(t => t.name.toLowerCase() === toolName.toLowerCase())
    if (toolIndex === -1) {
      return NextResponse.json(
        { error: 'PM tool not found' },
        { status: 404 }
      )
    }

    // Update tool with provided data
    mockPMTools[toolIndex] = {
      ...mockPMTools[toolIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      tool: mockPMTools[toolIndex],
      success: true,
      message: `${toolName} updated successfully`
    })

  } catch (error) {
    console.error('PM tools API error:', error)
    return NextResponse.json(
      { error: 'Failed to update PM tool' },
      { status: 500 }
    )
  }
}