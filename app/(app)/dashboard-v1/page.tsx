/**
 * Component: DashboardV1 - Premium Glass Morphism Layout
 * Design Reference: Professional HTML demo with enhanced glass morphism
 * UX Pattern: Premium glass morphism with professional 3-column layout
 * 
 * This is the v1 dashboard focused on:
 * - Premium glass morphism effects and animations
 * - Professional 3-column layout matching screenshot  
 * - Enhanced visual effects and transitions
 * - Premium user experience with subtle animations
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
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
  Database,
  Sparkles
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DashboardV1() {
  const [mounted, setMounted] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024)
    setTimeout(checkDesktop, 100)
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-8 animate-fade-in">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="dashboard-title">
            Command Center
          </h1>
          <p className="dashboard-subtitle">
            Good morning! Let's tackle today's strategic priorities.
          </p>
          <div className="text-sm text-slate-500 mb-6">
            04:10 AM  |  Current Progress: 15 signups (30%)
          </div>
        </motion.div>

        {/* Main 3-Column Layout */}
        <div className="dashboard-3-col">
          
          {/* Left Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            
            {/* Strategic Tools Section */}
            <div className="pm33-glass-card">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-slate-700" />
                <h3 className="section-title">STRATEGIC TOOLS</h3>
              </div>
              <div className="space-y-3">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="tool-active p-3 rounded-lg cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-medium">Strategic Chat</span>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Rocket className="w-4 h-4 text-slate-600" />
                    <span className="font-medium text-slate-700">Project Delivery</span>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-4 h-4 text-slate-600" />
                    <span className="font-medium text-slate-700">Analytics</span>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-slate-600" />
                    <span className="font-medium text-slate-700">OKR Planner</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Company Context Section */}
            <div className="pm33-glass-card">
              <h3 className="section-title mb-4">COMPANY CONTEXT</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-700">
                  <Building className="w-4 h-4" />
                  <span>Company Profile</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Target className="w-4 h-4" />
                  <span>Current Priorities</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Zap className="w-4 h-4" />
                  <span>Competitive Intel</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Users className="w-4 h-4" />
                  <span>Team Resources</span>
                </div>
              </div>
            </div>
            
          </motion.div>

          {/* Center Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            
            {/* Strategic AI Co-Pilot Card */}
            <div className="pm33-glass-card">
              <div className="ai-processing-indicator mb-6">
                <div className="loading-dots">
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
                <span className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  AI INTELLIGENCE BRIEFING - LIVE
                </span>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Strategic AI Co-Pilot Ready</h2>
                <p className="text-slate-600">
                  Ask any strategic question. I'll suggest frameworks like ICE or RICE, then
                  apply them with your company context to generate executable workflows.
                </p>
              </div>

              {/* 2x2 Strategic Scenarios Grid with Enhanced Animations */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="pm33-glass-card strategic-card-blue cursor-pointer"
                >
                  <div className="badge-blue text-xs mb-3">COMPETITIVE STRATEGY</div>
                  <h4 className="font-semibold text-slate-900 mb-2">Competitor launched similar features</h4>
                  <p className="text-sm text-slate-600">They have 10x funding. Strategic response?</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  className="pm33-glass-card strategic-card-green cursor-pointer"
                >
                  <div className="badge-green text-xs mb-3">RESOURCE ALLOCATION</div>
                  <h4 className="font-semibold text-slate-900 mb-2">Hire developer vs marketing spend</h4>
                  <p className="text-sm text-slate-600">$15k budget to reach 50 beta users</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="pm33-glass-card strategic-card-orange cursor-pointer"
                >
                  <div className="badge-orange text-xs mb-3">GROWTH STRATEGY</div>
                  <h4 className="font-semibold text-slate-900 mb-2">Low beta-to-paid conversion</h4>
                  <p className="text-sm text-slate-600">Great feedback, poor conversion rates</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  className="pm33-glass-card strategic-card-purple cursor-pointer"
                >
                  <div className="badge-purple text-xs mb-3">MARKET STRATEGY</div>
                  <h4 className="font-semibold text-slate-900 mb-2">Enterprise vs SMB focus</h4>
                  <p className="text-sm text-slate-600">Bigger deals vs momentum building</p>
                </motion.div>
              </div>
            </div>

            {/* Strategic Chat Interface with Enhanced Styling */}
            <div className="pm33-glass-card">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask me anything strategic... I'll suggest the best framework to use"
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-6"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            
          </motion.div>

          {/* Right Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            
            {/* Competitive Landscape */}
            <div className="pm33-glass-card">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-slate-700" />
                <h3 className="section-title">COMPETITIVE LANDSCAPE</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="font-semibold text-slate-900">Primary: Productboard</div>
                  <div className="text-sm text-slate-600">Series C, $100M+ funding, roadmap focus</div>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Secondary: Aha!</div>
                  <div className="text-sm text-slate-600">Profitable, strategy docs, enterprise</div>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <div className="text-blue-800 font-semibold text-sm">
                    Our Advantage: Strategic AI + execution
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Team & Resources */}
            <div className="pm33-glass-card">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-slate-700" />
                <h3 className="section-title">TEAM & RESOURCES</h3>
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
                  <span className="badge-warning">Limited marketing</span>
                </div>
              </div>
            </div>

            {/* Key Metrics with Enhanced Progress Bar */}
            <div className="pm33-glass-card">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-slate-700" />
                <h3 className="section-title">KEY METRICS</h3>
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
                  <motion.div 
                    className="progress-bar"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div 
                      className="progress-fill" 
                      initial={{ width: '0%' }}
                      animate={{ width: '30%' }}
                      transition={{ delay: 0.7, duration: 1 }}
                    ></motion.div>
                  </motion.div>
                  <div className="text-xs text-slate-500">30% to goal (50 beta users)</div>
                </div>
              </div>
            </div>
            
          </motion.div>
          
        </div>
      </div>
    </div>
  )
}