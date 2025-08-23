'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Brain,
  Check,
  Target,
  Star,
  Link2,
  Lightbulb,
  CheckCircle,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import CoreAppNavigation from '../../../components/app/CoreAppNavigation'

// Glass Card Component
const GlassCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <Card className={`
    bg-gradient-to-br from-white/60 to-white/30 
    backdrop-blur-xl border border-white/20 
    shadow-2xl hover:shadow-3xl hover:scale-[1.02] 
    transition-all duration-300 
    ${className}
  `}>
    <CardContent className="p-6">
      {children}
    </CardContent>
  </Card>
)

// Progress Section Component
const ProgressSection = ({ metrics }: { metrics: any }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
      📊 Today's Progress
    </h2>
    
    <div className="flex flex-col md:flex-row gap-8">
      {/* Progress Ring */}
      <div className="relative w-32 h-32 mx-auto md:mx-0">
        <div className={`
          w-32 h-32 rounded-full flex items-center justify-center
          bg-gradient-to-br from-blue-500 to-purple-600
        `} style={{
          background: `conic-gradient(#667eea 0deg ${(metrics.progressPercent / 100) * 360}deg, #e2e8f0 ${(metrics.progressPercent / 100) * 360}deg 360deg)`
        }}>
          <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900">{metrics.progressPercent}%</span>
            <span className="text-xs text-slate-500">Complete</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {metrics.decisionsToday}/{metrics.decisionsTotal}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Decisions Made</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {metrics.teamAlignment}%
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Team Aligned</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {metrics.strategicScore}
              </p>
              <Badge variant="secondary" className="text-xs">
                improved
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Strategic Score</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Integrations Section Component
const IntegrationsSection = () => {
  const [isConnectedToJira, setIsConnectedToJira] = useState(false)
  const [jiraWorkspace, setJiraWorkspace] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const connected = localStorage.getItem('pm33_demo_jira_connected') === 'true'
      const workspace = localStorage.getItem('pm33_demo_jira_workspace')
      setIsConnectedToJira(connected)
      setJiraWorkspace(workspace)
    }
  }, [])

  const handleConnectJira = () => {
    const setupMessage = `🔧 PM33 OAuth Setup Instructions for Jira

To connect your real Jira workspace:
1. Go to: https://developer.atlassian.com/console/myapps/
2. Click "Create" → "OAuth 2.0 (3LO)" 
3. Add redirect URI: http://localhost:3000/api/integrations/oauth/callback/jira

📝 Currently in DEMO MODE
Click OK to simulate a successful connection.`

    if (confirm(setupMessage)) {
      alert(`✅ Demo Connection Successful!

Jira workspace "Demo Company" connected!`)
      localStorage.setItem('pm33_demo_jira_connected', 'true')
      localStorage.setItem('pm33_demo_jira_workspace', 'Demo Company')
      setIsConnectedToJira(true)
      setJiraWorkspace('Demo Company')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          PM Tool Integrations
        </h2>
        <Badge variant={isConnectedToJira ? "default" : "secondary"} className="text-sm">
          {isConnectedToJira ? "Connected" : "Not Connected"}
        </Badge>
      </div>
      
      <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Atlassian Jira
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {isConnectedToJira 
                  ? `Connected to: ${jiraWorkspace}` 
                  : 'Connect your Jira workspace for task automation'
                }
              </p>
            </div>
          </div>

          <Button
            onClick={handleConnectJira}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isConnectedToJira ? 'Configure' : 'Connect Jira'}
          </Button>
        </div>

        {isConnectedToJira && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center mb-2">
              <Check className="text-green-600 text-sm h-4 w-4 mr-2" />
              <h4 className="font-medium text-green-800 dark:text-green-200">Active Integration</h4>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              Ready for task automation and strategic workflow execution
            </p>
          </div>
        )}
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-full">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          Currently in Demo Mode
        </div>
      </div>
    </div>
  )
}

// Skill Tree Section Component
const SkillTreeSection = () => {
  const skills = {
    strategic: {
      level: 7,
      name: "Strategic Thinking",
      progress: 73,
      nextUnlock: "Blue Ocean Analysis",
      recentAchievement: "Made 10 data-driven decisions"
    },
    execution: {
      level: 5,
      name: "Execution Excellence", 
      progress: 45,
      nextUnlock: "Automated Sprint Planning",
      recentAchievement: "Shipped 3 features on time"
    },
    leadership: {
      level: 6,
      name: "Team Leadership",
      progress: 60,
      nextUnlock: "AI Team Coaching",
      recentAchievement: "Team happiness at 95%"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          🚀 PM Skill Tree
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Level up your product management expertise
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(skills).map(([key, skill]) => (
          <div
            key={key}
            className="p-5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-4">
              <Badge variant="default" className="text-sm px-3 py-1 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white">
                Lvl {skill.level}
              </Badge>
              
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{skill.name}</h3>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{skill.progress}%</span>
                </div>
                <Progress 
                  value={skill.progress} 
                  className="h-2"
                />
                <div className="flex flex-col sm:flex-row gap-2 text-xs">
                  <p className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Next: {skill.nextUnlock}
                  </p>
                  <p className="text-green-600 dark:text-green-400 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    {skill.recentAchievement}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [user, setUser] = useState({ name: 'Sarah' })
  const [metrics, setMetrics] = useState({
    decisionsToday: 4,
    decisionsTotal: 5,
    teamAlignment: 92,
    strategicScore: 'A+',
    betaSignups: 15,
    progressPercent: 80
  })
  const [intelligenceOps, setIntelligenceOps] = useState({
    competitorUpdates: 3,
    customerTickets: 12,
    recommendations: 2
  })

  // Fetch real data from backend
  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Connect to your actual backend
      const response = await fetch('/api/dashboard/summary')
      const data = await response.json()
      
      if (data.metrics) setMetrics(data.metrics)
      if (data.intelligenceOps) setIntelligenceOps(data.intelligenceOps)
      if (data.user) setUser(data.user)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      // Keep default demo data if API fails
    }
  }

  const handleStrategicReview = async () => {
    // Navigate to strategic intelligence with real data
    window.location.href = '/strategic-intelligence'
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <CoreAppNavigation />
      
      <div className="container mx-auto px-6 py-12 pt-24 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Contextual Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Good morning, {user.name}! Here's your strategic focus for today.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Strategic Intelligence Operations - {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* AI Summary Card */}
          <GlassCard>
            <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                <strong>Intelligence Operations Summary</strong><br />
                While you were away, PM33 analyzed <strong>{intelligenceOps.competitorUpdates} competitor updates</strong>, 
                reviewed <strong>{intelligenceOps.customerTickets} customer tickets</strong>, 
                and prepared <strong>{intelligenceOps.recommendations} strategic recommendations</strong>.
              </AlertDescription>
            </Alert>
          </GlassCard>

          {/* Priority Action Card */}
          <GlassCard>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    🎯 Priority Action
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Your highest-impact next step
                  </p>
                </div>
                <Badge variant="destructive" className="text-sm">
                  High Priority
                </Badge>
              </div>

              <div>
                <Link href="/strategic-intelligence">
                  <Button 
                    size="lg"
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={handleStrategicReview}
                  >
                    <Brain className="mr-2 h-5 w-5" />
                    Review Strategic Recommendations (3 min)
                  </Button>
                </Link>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Then: Team standup prep (2 min)
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Progress Ring Card */}
          <GlassCard>
            <ProgressSection metrics={metrics} />
          </GlassCard>

          {/* Integrations Card */}
          <GlassCard>
            <IntegrationsSection />
          </GlassCard>

          {/* Skill Tree Card */}
          <GlassCard>
            <SkillTreeSection />
          </GlassCard>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/strategic-intelligence" className="flex-1">
              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Brain className="mr-2 h-5 w-5" />
                Strategic Intelligence
              </Button>
            </Link>
            <Link href="/tasks" className="flex-1">
              <Button 
                variant="secondary" 
                size="lg"
                className="w-full"
              >
                <Target className="mr-2 h-5 w-5" />
                Task Management
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}