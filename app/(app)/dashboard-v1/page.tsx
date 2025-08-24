/**
 * Component: DashboardPage - Premium Glass Morphism PMO Command Center
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md - Glass morphism dashboard
 * UX Pattern: PM33_COMPLETE_UX_SYSTEM.md - PMO Command Center patterns
 * 
 * Compliance Checklist:
 * - [✅] Glass morphism applied (premium cards with backdrop blur)
 * - [✅] Animations implemented (hover states, AI processing)
 * - [✅] Hover states added (all interactive elements)
 * - [✅] AI intelligence visible (live processing indicators)
 * - [✅] Progress indicators present (strategic metrics)
 * - [✅] Follows 8pt grid spacing (consistent layout)
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

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024)
    // Initial check with small delay to ensure proper rendering
    setTimeout(checkDesktop, 100)
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen p-6 space-y-6" style={{ minHeight: '100vh' }}>
      {/* PMO Command Center Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* AI Status Banner */}
        <Card className="pm33-ai-status-bar">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="pm33-ai-active-indicator">AI TEAMS ACTIVE</span>
                </div>
                <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-600">
                  <Sparkles className="w-3 h-3 mr-1" />
                  4 Teams Processing
                </Badge>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span>PMO Transformation: 847% capability increase</span>
                <span>•</span>
                <span>Strategic Processing: 23min avg</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Header */}
        <div>
          <h1 className="pm33-main-heading">
            PMO Command Center
          </h1>
          <p className="pm33-main-subheading">
            Good morning! Your 4 AI teams have prepared strategic intelligence and workflow recommendations.
          </p>
        </div>
      </motion.div>

      {/* Strategic Metrics Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          <Card className="pm33-glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Strategic Intelligence</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--pm33-text-primary, #1e293b)' }}>Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="pm33-glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Workflow Execution</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--pm33-text-primary, #1e293b)' }}>Ready</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="pm33-glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data Intelligence</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--pm33-text-primary, #1e293b)' }}>Learning</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="pm33-glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Communication</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--pm33-text-primary, #1e293b)' }}>Standby</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Main Dashboard Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? '1fr 2fr 1fr' : '1fr', // Responsive three columns
          gap: '24px'
        }}
      >
        {/* Strategic Navigation */}
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4" />
              <h3 className="font-semibold">Strategic Tools</h3>
            </div>
            <div className="space-y-2">
              <motion.div whileHover={{ scale: 1.02, x: 4 }}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start h-auto p-4 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20"
                >
                  <MessageSquare className="w-5 h-5 mr-3 text-blue-600" />
                  <div className="text-left">
                    <div className="font-medium text-blue-700">Strategic Chat</div>
                    <div className="text-xs text-muted-foreground">AI-powered strategic analysis</div>
                  </div>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02, x: 4 }}>
                <Button variant="ghost" className="w-full justify-start h-auto p-4">
                  <Rocket className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Workflow Execution</div>
                    <div className="text-xs text-muted-foreground">Generate PM workflows</div>
                  </div>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02, x: 4 }}>
                <Button variant="ghost" className="w-full justify-start h-auto p-4">
                  <BarChart3 className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Analytics</div>
                    <div className="text-xs text-muted-foreground">Strategic metrics & insights</div>
                  </div>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02, x: 4 }}>
                <Button variant="ghost" className="w-full justify-start h-auto p-4">
                  <Target className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">OKR Planning</div>
                    <div className="text-xs text-muted-foreground">Objectives & key results</div>
                  </div>
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 mb-4">
            <h3 className="font-semibold mb-4">Company Context</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Building className="w-4 h-4 text-white/70" />
                <span className="text-sm text-white/90">Company Profile</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Target className="w-4 h-4 text-white/70" />
                <span className="text-sm text-white/90">Current Priorities</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Zap className="w-4 h-4 text-white/70" />
                <span className="text-sm text-white/90">Competitive Intel</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Users className="w-4 h-4 text-white/70" />
                <span className="text-sm text-white/90">Team Resources</span>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Intelligence Hub */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="pm33-right-sidebar-section">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-600">
                  AI INTELLIGENCE BRIEFING - LIVE
                </Badge>
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Strategic AI Co-Pilot Ready
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Ask any strategic question. I'll suggest frameworks like ICE or RICE, then apply them with your company context to generate executable workflows.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:scale-105 transition cursor-pointer">
                  <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Competitive Strategy</h3>
                  <p className="text-white/90 font-medium mb-2">Competitor launched similar features</p>
                  <p className="text-white/60 text-sm">They have 10x funding. Strategic response?</p>
                </div>
                
                <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:scale-105 transition cursor-pointer">
                  <h3 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Resource Allocation</h3>
                  <p className="text-white/90 font-medium mb-2">Hire developer vs marketing spend</p>
                  <p className="text-white/60 text-sm">$15k budget to reach 50 beta users</p>
                </div>
                
                <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:scale-105 transition cursor-pointer">
                  <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-3">Growth Strategy</h3>
                  <p className="text-white/90 font-medium mb-2">Low beta-to-paid conversion</p>
                  <p className="text-white/60 text-sm">Great feedback, poor conversion rates</p>
                </div>
                
                <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:scale-105 transition cursor-pointer">
                  <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Market Strategy</h3>
                  <p className="text-white/90 font-medium mb-2">Enterprise vs SMB focus</p>
                  <p className="text-white/60 text-sm">Bigger deals vs momentum building</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strategic Intelligence Hub - Premium Design */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pm33-glass"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.1), 0 0 0 1px rgba(147, 51, 234, 0.1)'
            }}
          >
            {/* Premium Header with AI Status */}
            <div className="flex items-center justify-between p-6 border-b border-blue-500/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Strategic AI Co-Pilot
                  </h3>
                  <p className="text-xs text-muted-foreground">Framework-driven analysis • Live insights</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-600 font-medium">● ACTIVE</span>
                <span className="text-xs text-muted-foreground">Response: ~23s avg</span>
              </div>
            </div>

            {/* Premium Chat Interface */}
            <div className="p-6">
              {/* AI Welcome Message */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6"
              >
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="pm33-glass p-4 rounded-xl border border-blue-500/20">
                      <p className="text-sm mb-3 leading-relaxed">
                        I'll analyze strategic decisions using proven PM frameworks like ICE, RICE, Porter's Five Forces, and Jobs-to-be-Done. 
                        Ask about competitive strategy, resource allocation, or market positioning.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" className="text-xs bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20">
                          <Target className="w-3 h-3 mr-1" />
                          Competitive Analysis
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20">
                          <BarChart3 className="w-3 h-3 mr-1" />
                          Resource Planning
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs bg-green-500/10 border-green-500/30 hover:bg-green-500/20">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Growth Strategy
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Premium Input Interface */}
              <div className="relative">
                <div className="pm33-glass p-4 rounded-xl border border-blue-500/20">
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask me anything strategic... I'll suggest the best framework to use"
                        className="w-full bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground pr-24"
                        style={{ color: 'var(--pm33-text-primary)' }}
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <kbd className="px-2 py-1 text-xs bg-muted rounded border text-muted-foreground">⏎</kbd>
                      </div>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Smart Suggestions */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-muted/30">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Zap className="w-3 h-3 text-blue-500" />
                      <span>AI will auto-suggest frameworks based on your question</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>Powered by</span>
                      <span className="font-semibold text-blue-500">Claude</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Strategic Context & Metrics */}
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4" />
              <h3 className="font-semibold">Competitive Landscape</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-semibold mb-1 text-white/90">Primary: Productboard</div>
                <div className="text-xs text-white/60">
                  Series C, $100M+ funding, roadmap focus
                </div>
              </div>
              
              <div>
                <div className="text-sm font-semibold mb-1 text-white/90">Secondary: Aha!</div>
                <div className="text-xs text-white/60">
                  Profitable, strategy docs, enterprise
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <div className="text-blue-400 text-sm font-semibold">
                  Our Advantage: Strategic AI + execution
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4" />
              <h3 className="font-semibold">Team & Resources</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Team Size:</span>
                <span className="font-semibold text-white/90">3 people</span>
              </div>
              <div className="text-xs text-white/60">1 PM, 2 Engineers</div>
              
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Runway:</span>
                <span className="font-semibold text-white/90">6 months</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Key Constraint:</span>
                <span className="px-2 py-1 rounded text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  Limited marketing
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4" />
              <h3 className="font-semibold">Key Metrics</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Beta Signups:</span>
                  <span className="font-semibold text-white/90">15 total</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Available Budget:</span>
                  <span className="font-semibold text-white/90">$15,000</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Progress to Goal</span>
                  <span className="font-semibold text-white/90">30%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
                <div className="text-xs text-white/60">
                  30% to goal (50 beta users)
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}