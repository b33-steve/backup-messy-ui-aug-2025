import { NextRequest, NextResponse } from 'next/server'

interface MetricsData {
  period: 'day' | 'week' | 'month' | 'quarter'
  startDate: string
  endDate: string
  metrics: {
    decisions: {
      total: number
      byCategory: Record<string, number>
      successRate: number
      averageTime: number // minutes
    }
    productivity: {
      tasksCompleted: number
      goalsAchieved: number
      efficiency: number // percentage
      focusTime: number // hours
    }
    collaboration: {
      teamAlignment: number // percentage
      meetingsAttended: number
      communicationScore: number
      stakeholderSatisfaction: number
    }
    strategic: {
      initiativesLaunched: number
      marketResearch: number
      competitorAnalyses: number
      frameworksUsed: string[]
    }
    growth: {
      skillPoints: number
      certificationsEarned: number
      levelsGained: number
      badgesUnlocked: string[]
    }
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const period = (searchParams.get('period') as any) || 'day'
  const startDate = searchParams.get('start_date')
  const endDate = searchParams.get('end_date')

  try {
    const userId = await getCurrentUserId(request)
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const metrics = await getMetricsData(userId, period, startDate, endDate)
    
    return NextResponse.json({
      success: true,
      data: metrics,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Metrics API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch metrics',
        // Demo data
        data: generateDemoMetrics(period)
      },
      { status: 500 }
    )
  }
}

async function getCurrentUserId(request: NextRequest): Promise<string | null> {
  // Implement your authentication logic
  return 'demo-user-123'
}

async function getMetricsData(
  userId: string, 
  period: string, 
  startDate?: string | null, 
  endDate?: string | null
): Promise<MetricsData> {
  // In a real app, query your database for metrics
  /*
  const metrics = await db.userMetrics.findMany({
    where: {
      userId,
      createdAt: {
        gte: startDate ? new Date(startDate) : getPeriodStartDate(period),
        lte: endDate ? new Date(endDate) : new Date()
      }
    },
    include: {
      decisions: true,
      productivity: true,
      collaboration: true,
      strategic: true,
      growth: true
    }
  })
  */

  return generateDemoMetrics(period)
}

function generateDemoMetrics(period: string): MetricsData {
  const now = new Date()
  const startDate = getPeriodStartDate(period)
  
  return {
    period: period as any,
    startDate: startDate.toISOString(),
    endDate: now.toISOString(),
    metrics: {
      decisions: {
        total: Math.floor(Math.random() * 20) + 10,
        byCategory: {
          strategic: Math.floor(Math.random() * 8) + 2,
          tactical: Math.floor(Math.random() * 10) + 5,
          operational: Math.floor(Math.random() * 6) + 3
        },
        successRate: Math.floor(Math.random() * 20) + 75, // 75-95%
        averageTime: Math.floor(Math.random() * 30) + 15 // 15-45 minutes
      },
      productivity: {
        tasksCompleted: Math.floor(Math.random() * 25) + 15,
        goalsAchieved: Math.floor(Math.random() * 8) + 3,
        efficiency: Math.floor(Math.random() * 25) + 70, // 70-95%
        focusTime: Math.floor(Math.random() * 4) + 4 // 4-8 hours
      },
      collaboration: {
        teamAlignment: Math.floor(Math.random() * 15) + 80, // 80-95%
        meetingsAttended: Math.floor(Math.random() * 10) + 5,
        communicationScore: Math.floor(Math.random() * 20) + 75,
        stakeholderSatisfaction: Math.floor(Math.random() * 15) + 80
      },
      strategic: {
        initiativesLaunched: Math.floor(Math.random() * 3) + 1,
        marketResearch: Math.floor(Math.random() * 5) + 2,
        competitorAnalyses: Math.floor(Math.random() * 4) + 1,
        frameworksUsed: ['ICE', 'RICE', 'Porter\'s Five Forces', 'Jobs-to-be-Done'].slice(0, Math.floor(Math.random() * 3) + 1)
      },
      growth: {
        skillPoints: Math.floor(Math.random() * 500) + 100,
        certificationsEarned: Math.floor(Math.random() * 2),
        levelsGained: Math.floor(Math.random() * 2),
        badgesUnlocked: ['Strategic Thinker', 'Team Player', 'Innovation Leader'].slice(0, Math.floor(Math.random() * 2) + 1)
      }
    }
  }
}

function getPeriodStartDate(period: string): Date {
  const now = new Date()
  
  switch (period) {
    case 'day':
      return new Date(now.getFullYear(), now.getMonth(), now.getDate())
    case 'week':
      const weekStart = new Date(now)
      weekStart.setDate(now.getDate() - now.getDay())
      return weekStart
    case 'month':
      return new Date(now.getFullYear(), now.getMonth(), 1)
    case 'quarter':
      const quarter = Math.floor(now.getMonth() / 3)
      return new Date(now.getFullYear(), quarter * 3, 1)
    default:
      return new Date(now.getFullYear(), now.getMonth(), now.getDate())
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    const userId = await getCurrentUserId(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    switch (action) {
      case 'track_decision':
        await trackDecision(userId, data)
        return NextResponse.json({
          success: true,
          message: 'Decision tracked successfully'
        })

      case 'update_goal':
        await updateGoal(userId, data)
        return NextResponse.json({
          success: true,
          message: 'Goal updated successfully'
        })

      case 'log_activity':
        await logActivity(userId, data)
        return NextResponse.json({
          success: true,
          message: 'Activity logged successfully'
        })

      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Metrics action error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process metrics action' },
      { status: 500 }
    )
  }
}

async function trackDecision(userId: string, data: any) {
  console.log(`Tracking decision for user ${userId}:`, data)
  // In a real app: INSERT INTO decisions (user_id, category, description, outcome, created_at) VALUES (...)
}

async function updateGoal(userId: string, data: any) {
  console.log(`Updating goal for user ${userId}:`, data)
  // In a real app: UPDATE goals SET progress = ?, status = ? WHERE user_id = ? AND id = ?
}

async function logActivity(userId: string, data: any) {
  console.log(`Logging activity for user ${userId}:`, data)
  // In a real app: INSERT INTO activities (user_id, type, data, created_at) VALUES (...)
}