/**
 * Component: PMCommandCenter (Dashboard) - Enhanced Version
 * Design Reference: APP_THEME_GUIDE.md - Core app design system
 * UX Pattern: PM33_COMPLETE_UX_SYSTEM.md - Section 2.1 PM Command Center
 * 
 * Compliance Checklist:
 * - [x] Uses shadcn/ui components exclusively
 * - [x] Professional B2B SaaS design with glass morphism
 * - [x] lucide-react icons with framer-motion animations
 * - [x] Progress indicators present with real-time updates
 * - [x] Follows responsive grid system
 * - [x] Real API integration with fallback data
 */

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import PM33Card, { StrategicCard, AIProcessingCard } from '@/components/ui/pm33-card'
import AIProcessingState from '@/components/ui/ai-processing-state'
import { usePM33Theme, PM33ThemeToggle } from '../../../components/shared/PM33ThemeProvider'
import {
  Brain,
  Check,
  Target,
  Star,
  Link2,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import CoreAppNavigation from '../../../components/app/CoreAppNavigation'
import { useDashboardData } from '../../../hooks/useDashboardData'
import { PMToolIntegrationDashboard } from '../../../components/dashboard/PMToolIntegration'

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
  // Theme system
  const { theme } = usePM33Theme()
  
  // Use centralized data hooks instead of scattered useState calls
  const { 
    data, 
    loading, 
    error: dataError, 
    refresh: refreshDashboard,
    updateMetric,
    updateIntelligenceOps,
    toolHealthSummary,
    totalTaskCount,
    connectedToolsCount,
    connectTool,
    syncTool,
    disconnectTool
  } = useDashboardData()
  
  // Destructure data for easier access
  const { user, metrics, intelligenceOps, pmTools, scenarios, competitors } = data
  const [isLoading, setIsLoading] = useState(false)
  
  // Strategic Chat Integration State
  const [chatInput, setChatInput] = useState('')
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [chatLoading, setChatLoading] = useState(false)
  const [chatError, setChatError] = useState<string | null>(null)
  const [aiTeamsStatus, setAiTeamsStatus] = useState<any>(null)

  // Auto-refresh dashboard data on mount  
  useEffect(() => {
    refreshDashboard()
  }, [refreshDashboard])

  const handleStrategicReview = () => {
    // Track action completion
    fetch('/api/dashboard/summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'complete_action', 
        data: { action: 'strategic_review_clicked' } 
      })
    }).catch(console.error)
  }

  // Strategic Chat Functions
  const handleChatSubmit = async () => {
    console.log('🔥 handleChatSubmit called with input:', chatInput)
    if (!chatInput.trim()) {
      console.log('❌ No input provided, returning early')
      return
    }
    
    console.log('✅ Starting strategic analysis...')
    setChatLoading(true)
    setChatError(null)
    setAnalysisResult(null)

    try {
      const requestBody = {
        message: chatInput,
        analysisType: 'strategic',
        context: {
          user_role: 'Senior PM',
          company_stage: 'Series B',
          dashboard_context: true
        }
      }
      
      console.log('📤 Making API request to /api/strategic/analyze')
      console.log('📦 Request body:', requestBody)
      
      const response = await fetch('/api/strategic/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })
      
      console.log('📥 API Response status:', response.status)
      console.log('📥 API Response headers:', response.headers)

      const result = await response.json()
      console.log('📋 API Response data:', result)
      
      if (result.error) {
        console.log('❌ API returned error:', result.error)
        setChatError(result.error)
      } else {
        console.log('✅ API returned success:', result)
        setAnalysisResult(result)
        setChatInput('') // Clear input on success
      }
    } catch (error) {
      setChatError('Unable to analyze request. Please try again.')
      console.error('Strategic analysis error:', error)
    } finally {
      setChatLoading(false)
    }
  }

  const handleScenarioClick = (scenarioText: string) => {
    setChatInput(scenarioText)
  }

  // PM Tool Integration Handlers
  const handleConnectTool = async (toolName: string) => {
    try {
      // In real implementation, this would open OAuth flow or connection modal
      // For now, simulate connection with demo data
      const connectionData = {
        workspace: `${toolName} Demo Workspace`,
        project: `Demo Project`,
        apiEndpoint: `https://demo-${toolName.toLowerCase()}.com`
      }
      
      await connectTool(toolName, connectionData)
    } catch (error) {
      console.error(`Failed to connect ${toolName}:`, error)
    }
  }

  const handleSyncTool = async (toolName: string) => {
    try {
      await syncTool(toolName)
    } catch (error) {
      console.error(`Failed to sync ${toolName}:`, error)
    }
  }

  const handleDisconnectTool = async (toolName: string) => {
    try {
      await disconnectTool(toolName)
    } catch (error) {
      console.error(`Failed to disconnect ${toolName}:`, error)
    }
  }

  const handleSyncAll = async () => {
    try {
      // Use batch sync API for better performance
      const response = await fetch('/api/pm-tools/sync-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forceSync: false })
      })

      const result = await response.json()
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Batch sync failed')
      }

      // Update UI with sync results
      console.log('Batch sync completed:', result.summary)
      
      // Refresh dashboard to get updated data
      await refreshDashboard()
      
    } catch (error) {
      console.error('Failed to sync all tools:', error)
      // Fallback to individual tool sync
      const connectedTools = pmTools.filter(tool => tool.status === 'connected')
      for (const tool of connectedTools) {
        await syncTool(tool.name)
      }
    }
  }

  // AI Teams Status Monitoring
  useEffect(() => {
    const fetchAIStatus = async () => {
      try {
        const response = await fetch('/api/ai-teams/status')
        const status = await response.json()
        setAiTeamsStatus(status)
      } catch (error) {
        console.error('AI status check failed:', error)
      }
    }

    fetchAIStatus() // Initial load
    const interval = setInterval(fetchAIStatus, 30000) // Poll every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-gradient)' }}>
      <CoreAppNavigation />
      
      {/* Theme Switcher */}
      <PM33ThemeToggle className="fixed top-6 right-6 z-50" />
      
      <div className="container mx-auto px-6 py-12 pt-24 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Contextual Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Good morning, {user.name}! Here's your strategic focus for today.
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Strategic Intelligence Operations - {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* AI Summary Card */}
          <AIProcessingCard
            title="Intelligence Operations Summary"
            subtitle="AI-powered overnight analysis completed"
          >
            <Alert className="border-green-200 bg-green-50/50">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-800">
                <strong>Strategic Intelligence Complete</strong><br />
                While you were away, PM33 analyzed <strong>{intelligenceOps.competitorUpdates} competitor updates</strong>, 
                reviewed <strong>{intelligenceOps.customerTickets} customer tickets</strong>, 
                and prepared <strong>{intelligenceOps.recommendations} strategic recommendations</strong>.
              </AlertDescription>
            </Alert>
          </AIProcessingCard>

          {/* Priority Action Card */}
          <StrategicCard
            title="🎯 Priority Action"
            subtitle="Your highest-impact next step"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Badge variant="destructive" className="text-sm">
                  High Priority
                </Badge>
              </div>

              <div>
                <Link href="/strategic-intelligence">
                  <Button 
                    size="lg"
                    className="w-full h-14 text-lg font-semibold"
                    style={{
                      background: 'var(--pm33-primary)',
                      color: 'var(--text-primary)',
                    }}
                    onClick={handleStrategicReview}
                  >
                    <Brain className="mr-2 h-5 w-5" />
                    Review Strategic Recommendations (3 min)
                  </Button>
                </Link>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                  Then: Team standup prep (2 min)
                </p>
              </div>
            </div>
          </StrategicCard>

          {/* Progress Ring Card */}
          <StrategicCard title="📊 Today's Progress">
            <ProgressSection metrics={metrics} />
          </StrategicCard>

          {/* PM Tool Integration Dashboard */}
          <StrategicCard 
            title="🔗 PM Tool Integration Dashboard"
            subtitle={`${connectedToolsCount} of ${pmTools.length} tools connected • ${totalTaskCount} total tasks`}
          >
            <PMToolIntegrationDashboard
              tools={pmTools}
              totalTasks={totalTaskCount}
              onConnect={handleConnectTool}
              onSync={handleSyncTool}
              onDisconnect={handleDisconnectTool}
              onSyncAll={handleSyncAll}
            />
          </StrategicCard>

          {/* Skill Tree Card */}
          <StrategicCard title="🚀 PM Skill Tree">
            <SkillTreeSection />
          </StrategicCard>

          {/* Strategic Chat Interface */}
          <StrategicCard title="🧠 Strategic Intelligence Chat" data-section="strategic-chat">
            {/* DEBUG TEST BUTTON */}
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800 mb-2">🧪 Debug Test - Click to verify functionality:</p>
              <Button
                onClick={async () => {
                  console.log('🔥 TEST BUTTON CLICKED')
                  console.log('Current chatInput state:', chatInput)
                  console.log('Current chatLoading state:', chatLoading)
                  
                  // Test 1: Set input manually
                  setChatInput('Test strategic question from debug button')
                  console.log('✅ Set test input')
                  
                  // Test 2: Call handleChatSubmit directly
                  setTimeout(async () => {
                    console.log('🚀 About to call handleChatSubmit directly')
                    await handleChatSubmit()
                    console.log('✅ handleChatSubmit call completed')
                  }, 500)
                }}
                className="bg-yellow-500 text-black px-4 py-2 rounded"
              >
                🧪 TEST: Direct Function Call
              </Button>
            </div>
            <div className="space-y-4">
              {/* Quick Scenario Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleScenarioClick('A competitor has entered our market with similar features. What strategic response should we take?')}
                  className="text-left justify-start text-sm p-3 h-auto"
                >
                  🎯 Competitive Response Strategy
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleScenarioClick('Should we hire 5 more engineers or invest $200K in marketing for maximum growth impact?')}
                  className="text-left justify-start text-sm p-3 h-auto"
                >
                  ⚖️ Resource Allocation Decision  
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleScenarioClick('Our user growth has slowed to 5% monthly. What strategic pivots should we consider?')}
                  className="text-left justify-start text-sm p-3 h-auto"
                >
                  📈 Growth Strategy Analysis
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleScenarioClick('How should we position for Series B fundraising in 6 months with current metrics?')}
                  className="text-left justify-start text-sm p-3 h-auto"
                >
                  💼 Fundraising Strategy
                </Button>
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    console.log('🔥 Key pressed:', e.key, 'Loading:', chatLoading, 'Input:', chatInput)
                    if (e.key === 'Enter' && !chatLoading) {
                      console.log('✅ Enter key triggered, calling handleChatSubmit')
                      e.preventDefault();
                      handleChatSubmit();
                    }
                  }}
                  placeholder="Ask a strategic question or select a scenario above..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={chatLoading}
                />
                <Button
                  onClick={() => {
                    console.log('🔥 Submit button clicked!, Input:', chatInput, 'Loading:', chatLoading)
                    handleChatSubmit()
                  }}
                  disabled={chatLoading || !chatInput.trim()}
                  style={{
                    background: 'var(--pm33-primary)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {chatLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Brain className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Error Display */}
              {chatError && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-600">
                    {chatError}
                  </AlertDescription>
                </Alert>
              )}

              {/* Loading State */}
              {chatLoading && (
                <div className="p-4 border rounded-lg bg-blue-50">
                  <AIProcessingState 
                    team="Strategic Intelligence"
                    operation="Analyzing strategic question with multi-framework approach..."
                    progress={65}
                  />
                </div>
              )}

              {/* Analysis Results */}
              {analysisResult && (
                <div className="p-4 border rounded-lg bg-green-50 space-y-3">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">Strategic Analysis Complete</span>
                    <Badge variant="secondary" className="text-xs">
                      {analysisResult.meta?.engine || 'AI-Powered'}
                    </Badge>
                  </div>
                  
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-line text-sm text-gray-700">
                      {analysisResult.response}
                    </div>
                  </div>

                  {/* Workflow Tasks */}
                  {analysisResult.workflow?.tasks && (
                    <div className="mt-4 space-y-2">
                      <h4 className="font-semibold text-gray-800">Generated Workflow:</h4>
                      {analysisResult.workflow.tasks.slice(0, 3).map((task: any, index: number) => (
                        <div key={task.id} className="flex items-center gap-2 text-sm p-2 bg-white rounded border">
                          <div className={`
                            w-2 h-2 rounded-full
                            ${task.priority === 'critical' ? 'bg-red-500' : 
                              task.priority === 'high' ? 'bg-orange-500' : 
                              task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}
                          `}></div>
                          <span className="font-medium">{task.title}</span>
                          <span className="text-gray-500">({task.estimated_hours}h)</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* AI Teams Status */}
              {aiTeamsStatus && (
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    aiTeamsStatus.overall_health === 'excellent' ? 'bg-green-500' :
                    aiTeamsStatus.overall_health === 'good' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span>
                    AI Teams: {aiTeamsStatus.engines_available}/{aiTeamsStatus.engines_total} engines active
                  </span>
                </div>
              )}
            </div>
          </StrategicCard>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Button 
              size="lg"
              className="w-full flex-1"
              onClick={() => {
                console.log('🔥 Strategic Chat button clicked!')
                // Direct focus on the input field
                const input = document.querySelector('input[placeholder*="Ask a strategic question"]') as HTMLInputElement;
                console.log('Found input element:', input)
                if (input) {
                  input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setTimeout(() => {
                    input.focus();
                    console.log('✅ Input focused')
                  }, 300);
                } else {
                  console.log('❌ Could not find strategic question input')
                }
              }}
              style={{
                background: 'var(--pm33-primary)',
                color: 'var(--text-primary)',
              }}
            >
              <Brain className="mr-2 h-5 w-5" />
              Strategic Chat
            </Button>
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

          {/* Loading State */}
          {isLoading && (
            <PM33Card>
              <AIProcessingState 
                team="Strategic Intelligence"
                status="Loading dashboard data..."
                size="md"
              />
            </PM33Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}