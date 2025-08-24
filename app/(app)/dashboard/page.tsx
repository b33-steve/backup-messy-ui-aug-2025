/**
 * Component: Dashboard - Professional 3-Column Layout
 * Design Reference: User screenshot - 3-column layout with off-white cards and gray gradient
 * UX Pattern: Professional enterprise dashboard with centered heading, compact navigation, and structured sections
 * 
 * Layout Structure:
 * - Gray gradient background
 * - Centered "Command Center" heading
 * - 3-column layout: Left compact nav (280px) | Center greeting+actions+chat (1fr) | Right 3 boxes (320px)
 * - Off-white cards with no borders, consistent corners
 * - Top navigation with blue selected state, dark font for others
 */

'use client'

import { useState } from 'react'
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
  const [chatInput, setChatInput] = useState('')

  return (
    <div 
      className="pm33-gray-gradient-bg"
      style={{
        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)',
        minHeight: '100vh'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Centered Command Center Heading */}
        <div className="mb-8">
          <h1 
            className="pm33-centered-heading"
            style={{
              textAlign: 'center',
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '1rem'
            }}
          >
            Command Center
          </h1>
          <p className="text-center text-slate-600 text-lg mb-2">
            Good morning! Let's tackle today's strategic priorities.
          </p>
          <div className="text-center text-sm text-slate-500">
            04:10 AM | Current Progress: 15 signups (30%)
          </div>
        </div>

        {/* Main 3-Column Layout - FORCED GRID */}
        <div 
          className="dashboard-3-col"
          style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr 320px',
            gap: '1.5rem',
            minHeight: '100vh',
            width: '100%'
          }}
        >
          
          {/* Left Sidebar - Compact Navigation */}
          <div className="space-y-6">
            
            {/* Strategic Tools - Compact Navigation */}
            <div 
              className="pm33-compact-nav"
              style={{
                background: 'rgba(248, 250, 252, 0.95)',
                borderRadius: '12px',
                padding: '1rem',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-slate-700" />
                <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">STRATEGIC TOOLS</h3>
              </div>
              <div className="space-y-2">
                <div className="pm33-compact-nav-item selected">
                  <MessageSquare className="w-4 h-4" />
                  <span>Strategic Chat</span>
                </div>
                <div className="pm33-compact-nav-item">
                  <Rocket className="w-4 h-4" />
                  <span>Project Delivery</span>
                </div>
                <div className="pm33-compact-nav-item">
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </div>
                <div className="pm33-compact-nav-item">
                  <Target className="w-4 h-4" />
                  <span>OKR Planner</span>
                </div>
              </div>
            </div>

            {/* Company Context - Compact Navigation */}
            <div 
              className="pm33-compact-nav"
              style={{
                background: 'rgba(248, 250, 252, 0.95)',
                borderRadius: '12px',
                padding: '1rem',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
              }}
            >
              <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide mb-4">COMPANY CONTEXT</h3>
              <div className="space-y-2">
                <div className="pm33-compact-nav-item">
                  <Building className="w-4 h-4" />
                  <span>Company Profile</span>
                </div>
                <div className="pm33-compact-nav-item">
                  <Target className="w-4 h-4" />
                  <span>Current Priorities</span>
                </div>
                <div className="pm33-compact-nav-item">
                  <Zap className="w-4 h-4" />
                  <span>Competitive Intel</span>
                </div>
                <div className="pm33-compact-nav-item">
                  <Users className="w-4 h-4" />
                  <span>Team Resources</span>
                </div>
              </div>
            </div>
            
          </div>

          {/* Center Column - Greeting + 4 Action Boxes + Chat */}
          <div className="pm33-center-section">
            
            {/* Greeting Section - Properly Sized */}
            <div 
              className="pm33-greeting-section"
              style={{
                background: 'rgba(248, 250, 252, 0.95)',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
              }}
            >
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
              
              <h2>Strategic AI Co-Pilot Ready</h2>
              <p>
                Ask any strategic question. I'll suggest frameworks like ICE or RICE, then
                apply them with your company context to generate executable workflows.
              </p>
            </div>

            {/* 4 Action Boxes Based on Company Context */}
            <div className="pm33-action-grid">
              <div 
                className="pm33-action-box"
                style={{
                  background: 'rgba(248, 250, 252, 0.95)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div className="text-xs text-blue-600 font-semibold mb-2 uppercase tracking-wide">COMPETITIVE STRATEGY</div>
                <h4>Competitor launched similar features</h4>
                <p>They have 10x funding. Strategic response?</p>
              </div>
              
              <div 
                className="pm33-action-box"
                style={{
                  background: 'rgba(248, 250, 252, 0.95)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div className="text-xs text-green-600 font-semibold mb-2 uppercase tracking-wide">RESOURCE ALLOCATION</div>
                <h4>Hire developer vs marketing spend</h4>
                <p>$15k budget to reach 50 beta users</p>
              </div>
              
              <div 
                className="pm33-action-box"
                style={{
                  background: 'rgba(248, 250, 252, 0.95)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div className="text-xs text-orange-600 font-semibold mb-2 uppercase tracking-wide">GROWTH STRATEGY</div>
                <h4>Low beta-to-paid conversion</h4>
                <p>Great feedback, poor conversion rates</p>
              </div>
              
              <div 
                className="pm33-action-box"
                style={{
                  background: 'rgba(248, 250, 252, 0.95)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div className="text-xs text-purple-600 font-semibold mb-2 uppercase tracking-wide">MARKET STRATEGY</div>
                <h4>Enterprise vs SMB focus</h4>
                <p>Bigger deals vs momentum building</p>
              </div>
            </div>

            {/* Chat Window at Bottom */}
            <div 
              className="pm33-chat-window"
              style={{
                background: 'rgba(248, 250, 252, 0.95)',
                borderRadius: '12px',
                padding: '1.5rem',
                border: 'none',
                marginTop: 'auto',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
              }}
            >
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
            </div>
            
          </div>

          {/* Right Sidebar - Exactly 3 Boxes */}
          <div className="pm33-right-sidebar">
            
            {/* Box 1: Competitive Landscape */}
            <div 
              className="pm33-professional-card"
              style={{
                background: 'rgba(248, 250, 252, 0.95)',
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                padding: '1.5rem',
                transition: 'all 0.2s ease',
                flex: '1'
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-slate-700" />
                <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">COMPETITIVE LANDSCAPE</h3>
              </div>
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
            </div>

            {/* Box 2: Team & Resources */}
            <div 
              className="pm33-professional-card"
              style={{
                background: 'rgba(248, 250, 252, 0.95)',
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                padding: '1.5rem',
                transition: 'all 0.2s ease',
                flex: '1'
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-slate-700" />
                <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">TEAM & RESOURCES</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Team Size:</span>
                  <span className="font-semibold">3 people</span>
                </div>
                <div className="text-xs text-slate-500">1 PM, 2 Engineers</div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Runway:</span>
                  <span className="font-semibold">6 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Key Constraint:</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">Limited marketing</span>
                </div>
              </div>
            </div>

            {/* Box 3: Key Metrics */}
            <div 
              className="pm33-professional-card"
              style={{
                background: 'rgba(248, 250, 252, 0.95)',
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                padding: '1.5rem',
                transition: 'all 0.2s ease',
                flex: '1'
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-slate-700" />
                <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">KEY METRICS</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Beta Signups:</span>
                  <span className="font-semibold">15 total</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Available Budget:</span>
                  <span className="font-semibold">$15,000</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Progress to Goal</span>
                    <span className="font-semibold">30%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <div className="text-xs text-slate-500">30% to goal (50 beta users)</div>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  )
}