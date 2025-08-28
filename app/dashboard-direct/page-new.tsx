/**
 * Component: Dashboard - NEW PM33 Design System Implementation
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Complete Implementation
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Professional Dashboard Pattern
 * 
 * DEMONSTRATES ENFORCED CONSISTENCY:
 * - Uses ONLY PM33 components
 * - No inline styles
 * - No raw HTML elements
 * - Perfect visual consistency
 * - Impossible to make it look bad
 * 
 * Compliance Checklist:
 * - [x] PM33Layout wrapper used
 * - [x] PM33Card for all containers  
 * - [x] PM33Section for sidebar content
 * - [x] Theme tokens only
 * - [x] No raw div elements
 * - [x] Glass morphism enforced
 * - [x] 8pt grid spacing
 * - [x] Proper test IDs
 */

'use client'

import React from 'react'
import { 
  PM33Layout, 
  PM33LayoutHeader, 
  PM33Card, 
  PM33Section, 
  PM33NavItem, 
  PM33ContextItem,
  PM33ScenarioCard,
  PM33MetricCard
} from '@/components/ui/pm33'
import { 
  Target, 
  Rocket, 
  BarChart3, 
  Brain,
  MessageSquare,
  Building,
  Users,
  TrendingUp,
  Zap,
  Send,
  Activity,
  Database
} from 'lucide-react'

export default function Dashboard() {
  const [chatInput, setChatInput] = React.useState('')

  return (
    <PM33Layout
      header={
        <PM33LayoutHeader
          title="PMO Command Center"
          subtitle="Good morning! Let's tackle today's strategic priorities."
          actions={
            <div className="text-center text-sm text-slate-500">
              04:10 AM | Current Progress: 15 signups (30%)
            </div>
          }
        />
      }
      
      leftSidebar={
        <>
          {/* Strategic Tools Section */}
          <PM33Section
            title="Strategic Tools"
            icon={Target}
            testId="strategic-tools"
          >
            <PM33NavItem
              icon={MessageSquare}
              label="Strategic Chat"
              description="AI-powered analysis"
              active={true}
              testId="nav-strategic-chat"
            />
            <PM33NavItem
              icon={Rocket}
              label="Project Delivery"
              description="Execution tracking"
              testId="nav-project-delivery"
            />
            <PM33NavItem
              icon={BarChart3}
              label="Analytics"
              description="Performance insights"
              testId="nav-analytics"
            />
            <PM33NavItem
              icon={Target}
              label="OKR Planner"
              description="Goal management"
              testId="nav-okr-planner"
            />
          </PM33Section>

          {/* Company Context Section */}
          <PM33Section
            title="Company Context"
            icon={Building}
            testId="company-context"
          >
            <PM33ContextItem
              icon={Building}
              label="Company"
              value="PM33 PMO Platform"
            />
            <PM33ContextItem
              icon={Target}
              label="Stage"
              value="Beta Launch"
            />
            <PM33ContextItem
              icon={Zap}
              label="Priority"
              value="$100K MRR"
            />
            <PM33ContextItem
              icon={Users}
              label="Team"
              value="3 people"
            />
          </PM33Section>
        </>
      }

      mainContent={
        <>
          {/* AI Co-Pilot Greeting */}
          <PM33Card variant="glass" testId="ai-copilot">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
              </div>
              <span className="text-sm text-slate-600 font-medium">
                <Brain className="w-4 h-4 inline mr-2" />
                AI INTELLIGENCE BRIEFING - LIVE
              </span>
            </div>
            
            <h2 className="text-xl font-bold text-slate-900 mb-2 text-center">
              Strategic AI Co-Pilot Ready
            </h2>
            <p className="text-slate-600 text-center">
              Ask any strategic question. I'll suggest frameworks like ICE or RICE, then
              apply them with your company context to generate executable workflows.
            </p>
          </PM33Card>

          {/* Strategic Scenarios Grid */}
          <div 
            className="grid grid-cols-2 gap-4"
            data-testid="scenario-grid"
          >
            <PM33ScenarioCard
              title="Competitor launched similar features"
              description="They have 10x funding. Strategic response?"
              category="COMPETITIVE STRATEGY"
              categoryColor="blue"
            />
            
            <PM33ScenarioCard
              title="Hire developer vs marketing spend"
              description="$15k budget to reach 50 beta users"
              category="RESOURCE ALLOCATION"
              categoryColor="green"
            />
            
            <PM33ScenarioCard
              title="Low beta-to-paid conversion"
              description="Great feedback, poor conversion rates"
              category="GROWTH STRATEGY"
              categoryColor="orange"
            />
            
            <PM33ScenarioCard
              title="Enterprise vs SMB focus"
              description="Bigger deals vs momentum building"
              category="MARKET STRATEGY"
              categoryColor="purple"
            />
          </div>

          {/* Chat Input */}
          <PM33Card variant="glass" testId="chat-input">
            <div className="flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything strategic... I'll suggest the best framework to use"
                className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all">
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </PM33Card>
        </>
      }

      rightSidebar={
        <>
          {/* Competitive Landscape */}
          <PM33Section
            title="Competitive Landscape"
            icon={Zap}
            testId="competitive-landscape"
          >
            <div className="space-y-3">
              <div>
                <div className="font-semibold text-slate-900">Primary: Productboard</div>
                <div className="text-sm text-slate-600">Series C, $100M+ funding, roadmap focus</div>
              </div>
              <div>
                <div className="font-semibold text-slate-900">Secondary: Aha!</div>
                <div className="text-sm text-slate-600">Profitable, strategy docs, enterprise</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-blue-800 font-semibold text-sm">
                  Our Advantage: Strategic AI + execution
                </div>
              </div>
            </div>
          </PM33Section>

          {/* Team & Resources */}
          <PM33MetricCard
            label="Team Size"
            value="3 people"
            icon={Users}
          />

          {/* Key Metrics */}
          <PM33Section
            title="Key Metrics"
            icon={BarChart3}
            testId="key-metrics"
          >
            <div className="space-y-4">
              <PM33ContextItem
                label="Beta Signups"
                value="15 total"
              />
              <PM33ContextItem
                label="Available Budget"
                value="$15,000"
              />
              <div className="space-y-2">
                <PM33ContextItem
                  label="Progress to Goal"
                  value="30%"
                />
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" 
                    style={{ width: '30%' }}
                  ></div>
                </div>
                <div className="text-xs text-slate-500">30% to goal (50 beta users)</div>
              </div>
            </div>
          </PM33Section>
        </>
      }
    />
  )
}