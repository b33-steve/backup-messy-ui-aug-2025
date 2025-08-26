/**
 * Component: Dashboard - PM33 Template System Implementation
 * Design Reference: Recovery plan - extracted template system with theme switching
 * UX Pattern: Professional enterprise dashboard with glass morphism and theme awareness
 * 
 * Layout Structure:
 * - PM33DashboardTemplate with 3-column CSS Grid layout
 * - PM33TopNav with logo, navigation, and single theme toggle
 * - PM33Card components with glass morphism
 * - Theme-aware styling (light/dark modes)
 * - Strategic chat interface with co-pilot functionality
 */

'use client'

import { useState, useEffect } from 'react'
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
import PM33DashboardTemplate from '@/components/templates/PM33DashboardTemplate'
import PM33TopNav from '@/components/layouts/PM33TopNav'
import PM33Card, { PM33ActionCard, PM33MetricCard } from '@/components/ui/PM33Card'

export default function Dashboard() {
  const [chatInput, setChatInput] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Theme initialization and persistence
  useEffect(() => {
    setMounted(true)
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('pm33-theme') as 'light' | 'dark'
    if (savedTheme) {
      setTheme(savedTheme)
      document.body.className = savedTheme
    }
  }, [])

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
    localStorage.setItem('pm33-theme', newTheme)
    document.body.className = newTheme
  }

  const handleChatSubmit = () => {
    if (chatInput.trim()) {
      console.log('Strategic query:', chatInput)
      // TODO: Connect to strategic analysis API
      setChatInput('')
    }
  }

  const handleActionClick = (action: string) => {
    console.log('Strategic action:', action)
    // TODO: Connect to strategic workflow API
  }

  if (!mounted) return null

  return (
    <PM33DashboardTemplate
      theme={theme}
      leftSidebar={<LeftSidebar theme={theme} />}
      centerContent={<CenterContent theme={theme} chatInput={chatInput} setChatInput={setChatInput} onChatSubmit={handleChatSubmit} onActionClick={handleActionClick} />}
      rightSidebar={<RightSidebar theme={theme} />}
    >
      {/* PM33TopNav */}
      <PM33TopNav 
        theme={theme} 
        onThemeChange={handleThemeChange}
        currentPage="dashboard"
      />
    </PM33DashboardTemplate>
  )
}

// Left Sidebar Component
function LeftSidebar({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Strategic Tools Navigation */}
      <PM33Card theme={theme}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Target size={20} color={theme === 'dark' ? '#94a3b8' : '#64748b'} />
          <h3 
            style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: theme === 'dark' ? '#ffffff' : '#1e293b'
            }}
          >
            Strategic Tools
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <NavItem icon={<MessageSquare size={16} />} label="Strategic Chat" isActive theme={theme} />
          <NavItem icon={<Rocket size={16} />} label="Project Delivery" theme={theme} />
          <NavItem icon={<BarChart3 size={16} />} label="Analytics" theme={theme} />
          <NavItem icon={<Target size={16} />} label="OKR Planner" theme={theme} />
        </div>
      </PM33Card>

      {/* Company Context Navigation */}
      <PM33Card theme={theme}>
        <h3 
          style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: theme === 'dark' ? '#ffffff' : '#1e293b',
            marginBottom: '16px'
          }}
        >
          Company Context
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <NavItem icon={<Building size={16} />} label="Company Profile" theme={theme} />
          <NavItem icon={<Target size={16} />} label="Current Priorities" theme={theme} />
          <NavItem icon={<Zap size={16} />} label="Competitive Intel" theme={theme} />
          <NavItem icon={<Users size={16} />} label="Team Resources" theme={theme} />
        </div>
      </PM33Card>
      
    </div>
  )
}

// Center Content Component  
function CenterContent({ 
  theme, 
  chatInput, 
  setChatInput, 
  onChatSubmit, 
  onActionClick 
}: { 
  theme: 'light' | 'dark'
  chatInput: string
  setChatInput: (value: string) => void
  onChatSubmit: () => void
  onActionClick: (action: string) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      
      {/* Strategic AI Co-Pilot Section */}
      <PM33Card theme={theme}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#3b82f6', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#3b82f6', borderRadius: '50%', animation: 'pulse 2s infinite 0.1s' }}></div>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#3b82f6', borderRadius: '50%', animation: 'pulse 2s infinite 0.2s' }}></div>
            </div>
            <span 
              style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: theme === 'dark' ? '#cbd5e1' : '#64748b'
              }}
            >
              <Brain size={16} style={{ display: 'inline', marginRight: '8px' }} />
              AI INTELLIGENCE BRIEFING - LIVE
            </span>
          </div>
          
          <h2 
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: theme === 'dark' ? '#ffffff' : '#1e293b',
              marginBottom: '8px'
            }}
          >
            Strategic AI Co-Pilot Ready
          </h2>
          <p 
            style={{
              color: theme === 'dark' ? '#cbd5e1' : '#64748b',
              lineHeight: '1.6'
            }}
          >
            Ask any strategic question. I'll suggest frameworks like ICE or RICE, then
            apply them with your company context to generate executable workflows.
          </p>
        </div>
      </PM33Card>

      {/* Strategic Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <PM33ActionCard
          category="COMPETITIVE STRATEGY"
          categoryColor="#3b82f6"
          title="Competitor launched similar features"
          description="They have 10x funding. Strategic response?"
          theme={theme}
          onClick={() => onActionClick('competitive-strategy')}
        />
        <PM33ActionCard
          category="RESOURCE ALLOCATION"
          categoryColor="#10b981"
          title="Hire developer vs marketing spend"
          description="$15k budget to reach 50 beta users"
          theme={theme}
          onClick={() => onActionClick('resource-allocation')}
        />
        <PM33ActionCard
          category="GROWTH STRATEGY"
          categoryColor="#f59e0b"
          title="Low beta-to-paid conversion"
          description="Great feedback, poor conversion rates"
          theme={theme}
          onClick={() => onActionClick('growth-strategy')}
        />
        <PM33ActionCard
          category="MARKET STRATEGY"  
          categoryColor="#8b5cf6"
          title="Enterprise vs SMB focus"
          description="Bigger deals vs momentum building"
          theme={theme}
          onClick={() => onActionClick('market-strategy')}
        />
      </div>

      {/* Strategic Chat Interface */}
      <PM33Card theme={theme} style={{ marginTop: 'auto' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask me anything strategic... I'll suggest the best framework to use"
            onKeyPress={(e) => e.key === 'Enter' && onChatSubmit()}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #d1d5db',
              borderRadius: '8px',
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
              color: theme === 'dark' ? '#ffffff' : '#1e293b',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
          <button
            onClick={onChatSubmit}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 20px',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <Send size={16} />
            Send
          </button>
        </div>
      </PM33Card>
      
    </div>
  )
}

// Right Sidebar Component
function RightSidebar({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Competitive Landscape */}
      <PM33MetricCard
        icon={<Zap size={20} />}
        title="Competitive Landscape"
        value={
          <div>
            <div style={{ marginBottom: '12px' }}>
              <div 
                style={{ 
                  fontWeight: '600', 
                  color: theme === 'dark' ? '#ffffff' : '#1e293b',
                  fontSize: '0.875rem'
                }}
              >
                Primary: Productboard
              </div>
              <div 
                style={{ 
                  fontSize: '0.75rem', 
                  color: theme === 'dark' ? '#cbd5e1' : '#64748b'
                }}
              >
                Series C, $100M+ funding, roadmap focus
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div 
                style={{ 
                  fontWeight: '600', 
                  color: theme === 'dark' ? '#ffffff' : '#1e293b',
                  fontSize: '0.875rem'
                }}
              >
                Secondary: Aha!
              </div>
              <div 
                style={{ 
                  fontSize: '0.75rem', 
                  color: theme === 'dark' ? '#cbd5e1' : '#64748b'
                }}
              >
                Profitable, strategy docs, enterprise
              </div>
            </div>
            <div 
              style={{
                padding: '12px',
                background: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : '#dbeafe',
                borderRadius: '8px'
              }}
            >
              <div 
                style={{
                  color: theme === 'dark' ? '#93c5fd' : '#1e40af',
                  fontWeight: '600',
                  fontSize: '0.75rem'
                }}
              >
                Our Advantage: Strategic AI + execution
              </div>
            </div>
          </div>
        }
        theme={theme}
      />

      {/* Team & Resources */}
      <PM33MetricCard
        icon={<Users size={20} />}
        title="Team & Resources"
        value={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}>Team Size:</span>
              <span style={{ fontWeight: '600', color: theme === 'dark' ? '#ffffff' : '#1e293b' }}>3 people</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
              1 PM, 2 Engineers
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}>Runway:</span>
              <span style={{ fontWeight: '600', color: theme === 'dark' ? '#ffffff' : '#1e293b' }}>6 months</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}>Key Constraint:</span>
              <span 
                style={{
                  background: '#fef3c7',
                  color: '#92400e',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}
              >
                Limited marketing
              </span>
            </div>
          </div>
        }
        theme={theme}
      />

      {/* Key Metrics */}
      <PM33MetricCard
        icon={<BarChart3 size={20} />}
        title="Key Metrics"
        value={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}>Beta Signups:</span>
              <span style={{ fontWeight: '600', color: theme === 'dark' ? '#ffffff' : '#1e293b' }}>15 total</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}>Available Budget:</span>
              <span style={{ fontWeight: '600', color: theme === 'dark' ? '#ffffff' : '#1e293b' }}>$15,000</span>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}>Progress to Goal</span>
                <span style={{ fontWeight: '600', color: theme === 'dark' ? '#ffffff' : '#1e293b' }}>30%</span>
              </div>
              <div 
                style={{
                  width: '100%',
                  height: '8px',
                  background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}
              >
                <div 
                  style={{
                    width: '30%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div 
                style={{
                  fontSize: '0.75rem',
                  color: theme === 'dark' ? '#94a3b8' : '#64748b',
                  marginTop: '4px'
                }}
              >
                30% to goal (50 beta users)
              </div>
            </div>
          </div>
        }
        theme={theme}
      />
      
    </div>
  )
}

// Navigation Item Component
function NavItem({ 
  icon, 
  label, 
  isActive = false, 
  theme 
}: { 
  icon: React.ReactNode
  label: string
  isActive?: boolean
  theme: 'light' | 'dark'
}) {
  const [isHovered, setIsHovered] = useState(false)

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: isActive 
      ? (theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)')
      : (isHovered 
          ? (theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)')
          : 'transparent'
        ),
    color: isActive 
      ? '#3b82f6' 
      : (theme === 'dark' ? '#cbd5e1' : '#64748b')
  }

  return (
    <div
      style={itemStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ color: 'inherit' }}>
        {icon}
      </div>
      <span>{label}</span>
    </div>
  )
}