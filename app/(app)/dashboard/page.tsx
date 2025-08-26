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
  Rocket, 
  BarChart3, 
  Brain,
  MessageSquare,
  Send,
  Zap,
  Users,
  Building,
  Target
} from 'lucide-react'
import PM33TopNav from '@/components/layouts/PM33TopNav'

export default function Dashboard() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)
  const [chatInput, setChatInput] = useState('')

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('pm33-theme') as 'light' | 'dark' || 'dark'
    setTheme(savedTheme)
    document.body.className = savedTheme
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

  if (!mounted) return null

  return (
    <div style={{
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
        : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)',
      minHeight: '100vh',
      color: theme === 'dark' ? '#ffffff' : '#000000',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Top Navigation */}
      <PM33TopNav 
        theme={theme} 
        onThemeChange={handleThemeChange}
        currentPage="dashboard"
      />

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: theme === 'dark' ? '#ffffff' : '#000000',
            marginBottom: '1rem'
          }}>
            Command Center
          </h1>
          <p style={{ 
            color: theme === 'dark' ? '#cbd5e1' : '#64748b',
            fontSize: '1.125rem',
            marginBottom: '8px'
          }}>
            Good morning! Let's tackle today's strategic priorities.
          </p>
          <div style={{ 
            color: theme === 'dark' ? '#94a3b8' : '#64748b',
            fontSize: '0.875rem'
          }}>
            04:10 AM | Current Progress: 15 signups (30%)
          </div>
        </div>

        {/* 3-Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr 350px',
          gap: '24px',
          minHeight: 'calc(100vh - 200px)',
          width: '100%'
        }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Strategic Tools */}
            <div style={{
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(248, 250, 252, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <h3 style={{ marginBottom: '16px', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase' }}>Strategic Tools</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                  <MessageSquare size={16} />
                  <span>Strategic Chat</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '6px' }}>
                  <Rocket size={16} />
                  <span>Project Delivery</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '6px' }}>
                  <BarChart3 size={16} />
                  <span>Analytics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* AI Status */}
            <div style={{
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(248, 250, 252, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#3b82f6', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
                <span><Brain size={16} style={{ marginRight: '8px' }} />AI INTELLIGENCE BRIEFING - LIVE</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '8px' }}>Strategic AI Co-Pilot Ready</h2>
              <p>Ask any strategic question. I'll suggest frameworks like ICE or RICE, then apply them with your company context.</p>
            </div>

            {/* Strategic Chat Interface - Moved here between AI Status and Action Cards */}
            <div style={{
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(248, 250, 252, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask me anything strategic... I'll suggest the best framework to use"
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
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
                  onClick={() => handleChatSubmit()}
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
            </div>

            {/* Action Cards - All 4 Cards in 2x2 Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div style={{
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(248, 250, 252, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#3b82f6', marginBottom: '8px' }}>COMPETITIVE STRATEGY</div>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px' }}>Competitor launched similar features</h4>
                <p style={{ fontSize: '0.875rem', color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}>They have 10x funding. Strategic response?</p>
              </div>
              <div style={{
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(248, 250, 252, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#10b981', marginBottom: '8px' }}>RESOURCE ALLOCATION</div>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px' }}>Hire developer vs marketing spend</h4>
                <p style={{ fontSize: '0.875rem', color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}>$15k budget to reach 50 beta users</p>
              </div>
              <div style={{
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(248, 250, 252, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#f59e0b', marginBottom: '8px' }}>GROWTH STRATEGY</div>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px' }}>Low beta-to-paid conversion</h4>
                <p style={{ fontSize: '0.875rem', color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}>Great feedback, poor conversion rates</p>
              </div>
              <div style={{
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(248, 250, 252, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#8b5cf6', marginBottom: '8px' }}>MARKET STRATEGY</div>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px' }}>Enterprise vs SMB focus</h4>
                <p style={{ fontSize: '0.875rem', color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}>Bigger deals vs momentum building</p>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Competitive Landscape */}
            <div style={{
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(248, 250, 252, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Zap size={20} />
                <h3 style={{ fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase' }}>Competitive Landscape</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '4px' }}>Primary: Productboard</div>
                  <div style={{ fontSize: '0.75rem', color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}>Series C, $100M+ funding, roadmap focus</div>
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '4px' }}>Secondary: Aha!</div>
                  <div style={{ fontSize: '0.75rem', color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}>Profitable, strategy docs, enterprise</div>
                </div>
                <div style={{
                  padding: '12px',
                  background: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : '#dbeafe',
                  borderRadius: '8px'
                }}>
                  <div style={{ color: theme === 'dark' ? '#93c5fd' : '#1e40af', fontWeight: '600', fontSize: '0.75rem' }}>
                    Our Advantage: Strategic AI + execution
                  </div>
                </div>
              </div>
            </div>

            {/* Team & Resources */}
            <div style={{
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(248, 250, 252, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Users size={20} />
                <h3 style={{ fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase' }}>Team & Resources</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Team Size:</span>
                  <span style={{ fontWeight: '600' }}>3 people</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                  1 PM, 2 Engineers
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Runway:</span>
                  <span style={{ fontWeight: '600' }}>6 months</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Key Constraint:</span>
                  <span style={{
                    background: '#fef3c7',
                    color: '#92400e',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>
                    Limited marketing
                  </span>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div style={{
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(248, 250, 252, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <BarChart3 size={20} />
                <h3 style={{ fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase' }}>Key Metrics</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Beta Signups:</span>
                  <span style={{ fontWeight: '600' }}>15 total</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Budget:</span>
                  <span style={{ fontWeight: '600' }}>$15,000</span>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Progress to Goal</span>
                    <span style={{ fontWeight: '600' }}>30%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb', borderRadius: '4px' }}>
                    <div style={{ width: '30%', height: '100%', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', borderRadius: '4px' }} />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: theme === 'dark' ? '#94a3b8' : '#64748b', marginTop: '4px' }}>
                    30% to goal (50 beta users)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

