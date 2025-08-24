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

  useEffect(() => {
    setMounted(true)
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
        <Card className="pm33-glass-card border-0 bg-transparent" style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(40px) saturate(150%)',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
          borderRadius: '16px'
        }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-semibold text-green-600">AI TEAMS ACTIVE</span>
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            PMO Command Center
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="pm33-glass-card border-0 bg-transparent" style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(40px) saturate(150%)',
            WebkitBackdropFilter: 'blur(40px) saturate(150%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
            borderRadius: '16px'
          }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Strategic Intelligence</p>
                  <p className="text-2xl font-bold text-blue-600">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="pm33-glass-card border-0 bg-transparent" style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(40px) saturate(150%)',
            WebkitBackdropFilter: 'blur(40px) saturate(150%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
            borderRadius: '16px'
          }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Workflow Execution</p>
                  <p className="text-2xl font-bold text-green-600">Ready</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="pm33-glass-card border-0 bg-transparent" style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(40px) saturate(150%)',
            WebkitBackdropFilter: 'blur(40px) saturate(150%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
            borderRadius: '16px'
          }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data Intelligence</p>
                  <p className="text-2xl font-bold text-purple-600">Learning</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="pm33-glass-card border-0 bg-transparent" style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(40px) saturate(150%)',
            WebkitBackdropFilter: 'blur(40px) saturate(150%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
            borderRadius: '16px'
          }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Communication</p>
                  <p className="text-2xl font-bold text-orange-600">Standby</p>
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
          gridTemplateColumns: '1fr 2fr 1fr', // Force three columns at desktop
          gap: '24px'
        }}
      >
        {/* Strategic Navigation */}
        <div className="space-y-6">
          <Card className="pm33-glass-card border-0 bg-transparent">
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Target className="w-4 h-4" />
                Strategic Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
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
            </CardContent>
          </Card>

          <Card className="pm33-glass-card border-0 bg-transparent">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Company Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <Building className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Company Profile</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Current Priorities</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <Zap className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Competitive Intel</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Team Resources</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Intelligence Hub */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="pm33-glass-card border-0 bg-transparent">
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
              {/* Strategic Scenario Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.02, y: -2 }}>
                  <Card className="pm33-glass-card border-0 cursor-pointer hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-600 mb-2">
                        Competitive Strategy
                      </Badge>
                      <h4 className="font-semibold mb-2">Competitor launched similar features</h4>
                      <p className="text-sm text-muted-foreground">
                        They have 10x funding. Strategic response?
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02, y: -2 }}>
                  <Card className="pm33-glass-card border-0 cursor-pointer hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-600 mb-2">
                        Resource Allocation
                      </Badge>
                      <h4 className="font-semibold mb-2">Hire developer vs marketing spend</h4>
                      <p className="text-sm text-muted-foreground">
                        $15k budget to reach 50 beta users
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02, y: -2 }}>
                  <Card className="pm33-glass-card border-0 cursor-pointer hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <Badge variant="outline" className="bg-amber-500/10 border-amber-500/30 text-amber-600 mb-2">
                        Growth Strategy
                      </Badge>
                      <h4 className="font-semibold mb-2">Low beta-to-paid conversion</h4>
                      <p className="text-sm text-muted-foreground">
                        Great feedback, poor conversion rates
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02, y: -2 }}>
                  <Card className="pm33-glass-card border-0 cursor-pointer hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-600 mb-2">
                        Market Strategy
                      </Badge>
                      <h4 className="font-semibold mb-2">Enterprise vs SMB focus</h4>
                      <p className="text-sm text-muted-foreground">
                        Bigger deals vs momentum building
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* Strategic Chat Interface */}
          <Card className="pm33-glass-card border-0 bg-transparent">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                Strategic Intelligence Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-xl overflow-hidden bg-muted/30">
                <div className="h-72 p-4 overflow-y-auto space-y-4">
                  {/* AI Message */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <Card className="max-w-[80%] pm33-glass-card border-0">
                      <CardContent className="p-3">
                        <p className="text-sm">
                          Good morning! I'll help analyze strategic decisions using proven PM frameworks. Ask me anything about competitive strategy, resource allocation, or market positioning.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  {/* User Message */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-3 flex-row-reverse"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <Card className="max-w-[80%] bg-blue-500/10 border-blue-500/30">
                      <CardContent className="p-3">
                        <p className="text-sm">
                          Our main competitor just raised $10M Series A. What's our strategic response?
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  {/* AI Response */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <Card className="max-w-[80%] pm33-glass-card border-0">
                      <CardContent className="p-3">
                        <p className="text-sm mb-2">
                          I recommend using the <strong>Competitive Response Framework</strong> for this analysis. Based on PM33's beta stage and $15k budget, here's my strategic analysis:
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Apply ICE Framework</Button>
                          <Button size="sm" variant="ghost">No</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
                
                <div className="p-4 border-t flex gap-3 bg-muted/20">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask any strategic question... (I'll suggest which framework to use)"
                    className="flex-1 p-3 rounded-lg text-sm outline-none bg-background border"
                  />
                  <Button size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Context & Metrics */}
        <div className="space-y-6">
          <Card className="pm33-glass-card border-0 bg-transparent">
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Competitive Landscape
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-semibold mb-1">Primary: Productboard</div>
                <div className="text-xs text-muted-foreground">
                  Series C, $100M+ funding, roadmap focus
                </div>
              </div>
              
              <div>
                <div className="text-sm font-semibold mb-1">Secondary: Aha!</div>
                <div className="text-xs text-muted-foreground">
                  Profitable, strategy docs, enterprise
                </div>
              </div>
              
              <Card className="bg-blue-500/10 border-blue-500/30">
                <CardContent className="p-3">
                  <div className="text-blue-600 text-sm font-semibold">
                    Our Advantage: Strategic AI + execution
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="pm33-glass-card border-0 bg-transparent">
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" />
                Team & Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Team Size:</span>
                <span className="font-semibold">3 people</span>
              </div>
              <div className="text-xs text-muted-foreground">1 PM, 2 Engineers</div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Runway:</span>
                <span className="font-semibold">6 months</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Key Constraint:</span>
                <Badge variant="outline" className="bg-amber-500/10 border-amber-500/30 text-amber-600">
                  Limited marketing
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="pm33-glass-card border-0 bg-transparent">
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Key Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Beta Signups:</span>
                  <span className="font-semibold">15 total</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Available Budget:</span>
                  <span className="font-semibold">$15,000</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress to Goal</span>
                  <span className="font-semibold">30%</span>
                </div>
                <Progress value={30} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  30% to goal (50 beta users)
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}