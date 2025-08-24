/**
 * Component: DashboardV2 - Clean Working Version
 * Design Reference: Shadcn/ui components only - no custom glass morphism
 * UX Pattern: Simple, functional PM dashboard that works reliably
 * 
 * This is the v2 dashboard focused on:
 * - Clean, working layout
 * - shadcn/ui components only
 * - Fast shipping to get users
 * - No complex animations or effects
 */

'use client'

import { useState } from 'react'
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

export default function DashboardV2() {
  const [chatInput, setChatInput] = useState('')

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">PMO Command Center</h1>
            <p className="text-muted-foreground">
              Your AI teams have prepared strategic intelligence and workflow recommendations.
            </p>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            <Sparkles className="w-4 h-4 mr-1" />
            4 Teams Active
          </Badge>
        </div>
      </div>

      {/* AI Teams Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Strategic Intelligence</p>
                <p className="text-xl font-bold">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Workflow Execution</p>
                <p className="text-xl font-bold">Ready</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data Intelligence</p>
                <p className="text-xl font-bold">Learning</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Communication</p>
                <p className="text-xl font-bold">Standby</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Strategic Tools */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Target className="w-4 h-4" />
                Strategic Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Strategic Chat
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Rocket className="w-4 h-4 mr-2" />
                Workflow Execution
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                OKR Planning
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Company Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Building className="w-4 h-4" />
                Company Profile
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4" />
                Current Priorities
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4" />
                Competitive Intel
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center - Strategic Scenarios */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Strategic Scenarios
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                AI-suggested scenarios based on your current context
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4">
                  <Badge variant="secondary" className="text-xs mb-2">Competitive</Badge>
                  <h4 className="font-medium text-sm mb-1">Competitor launched features</h4>
                  <p className="text-xs text-muted-foreground">They have 10x funding</p>
                </Card>
                
                <Card className="p-4">
                  <Badge variant="secondary" className="text-xs mb-2">Resource</Badge>
                  <h4 className="font-medium text-sm mb-1">Hire dev vs marketing</h4>
                  <p className="text-xs text-muted-foreground">$15k budget decision</p>
                </Card>
                
                <Card className="p-4">
                  <Badge variant="secondary" className="text-xs mb-2">Growth</Badge>
                  <h4 className="font-medium text-sm mb-1">Low conversion rate</h4>
                  <p className="text-xs text-muted-foreground">Great feedback, poor sales</p>
                </Card>
                
                <Card className="p-4">
                  <Badge variant="secondary" className="text-xs mb-2">Market</Badge>
                  <h4 className="font-medium text-sm mb-1">Enterprise vs SMB</h4>
                  <p className="text-xs text-muted-foreground">Strategy focus decision</p>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Strategic Chat */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Strategic AI Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">Ask any strategic question. I'll suggest frameworks and provide analysis.</p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about competitive strategy..."
                    className="flex-1 px-3 py-2 border rounded-md text-sm"
                  />
                  <Button size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Metrics */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Key Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Beta Signups:</span>
                <span className="font-semibold">15 total</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Budget:</span>
                <span className="font-semibold">$15,000</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Goal</span>
                  <span className="font-semibold">30%</span>
                </div>
                <Progress value={30} className="h-2" />
                <p className="text-xs text-muted-foreground">30% to goal (50 beta users)</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" />
                Team Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Team Size:</span>
                <span className="font-semibold">3 people</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Runway:</span>
                <span className="font-semibold">6 months</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Key Constraint:</span>
                <Badge variant="outline" className="bg-orange-100 text-orange-800">
                  Limited marketing
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Competitive Intel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Productboard</p>
                <p className="text-xs text-muted-foreground">Series C, $100M+ funding</p>
              </div>
              <div>
                <p className="text-sm font-medium">Aha!</p>
                <p className="text-xs text-muted-foreground">Profitable, enterprise focus</p>
              </div>
              <div className="p-2 bg-blue-50 rounded border border-blue-200">
                <p className="text-xs font-medium text-blue-800">Our Advantage: AI + Strategy</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}