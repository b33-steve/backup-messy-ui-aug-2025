/**
 * Component: DashboardMockup - Reference Design
 * Design Reference: Original HTML mockup for visual reference
 * UX Pattern: Complete glass morphism design system
 * 
 * This is the reference mockup showing the target design
 * Use this for visual reference when polishing v1
 */

'use client'

export default function DashboardMockup() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white font-medium">AI TEAMS ACTIVE</span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm border border-blue-500/30">
                  4 Teams Processing
                </span>
              </div>
              <div className="text-white/70 text-sm">
                PMO Transformation: 847% capability increase
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">PMO Command Center</h1>
          <p className="text-white/70 text-lg">
            Good morning! Your 4 AI teams have prepared strategic intelligence and workflow recommendations.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Sidebar */}
          <div className="space-y-4">
            {/* Strategic Tools */}
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span>🎯</span> Strategic Tools
              </h3>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition">
                  💬 Strategic Chat
                </div>
                <div className="p-3 rounded-lg hover:bg-white/10 transition text-white/80">
                  🚀 Workflow Execution  
                </div>
                <div className="p-3 rounded-lg hover:bg-white/10 transition text-white/80">
                  📊 Analytics
                </div>
                <div className="p-3 rounded-lg hover:bg-white/10 transition text-white/80">
                  🎯 OKR Planning
                </div>
              </div>
            </div>

            {/* Company Context */}
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <h3 className="text-white font-semibold mb-4">Company Context</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-white/80">🏢 Company Profile</div>
                <div className="flex items-center gap-2 text-white/80">🎯 Current Priorities</div>
                <div className="flex items-center gap-2 text-white/80">⚡ Competitive Intel</div>
                <div className="flex items-center gap-2 text-white/80">👥 Team Resources</div>
              </div>
            </div>
          </div>

          {/* Center Content */}
          <div className="space-y-6">
            {/* Strategic Scenarios - 2x2 Grid */}
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Strategic AI Co-Pilot Ready</h2>
                <p className="text-white/70">
                  Ask any strategic question. I'll suggest frameworks like ICE or RICE.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
            </div>

            {/* Premium Chat Interface */}
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <h3 className="text-white font-semibold mb-4">Strategic Intelligence Chat</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-white/90 text-sm">
                    I'll analyze strategic decisions using proven PM frameworks. Ask about competitive strategy, resource allocation, or market positioning.
                  </p>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Ask me anything strategic... I'll suggest the best framework to use"
                    className="flex-1 p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 outline-none focus:border-blue-500/50"
                  />
                  <button className="px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Key Metrics */}
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                📊 Key Metrics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Beta Signups:</span>
                  <span className="text-white font-semibold">15 total</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Available Budget:</span>
                  <span className="text-white font-semibold">$15,000</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Progress to Goal</span>
                    <span className="text-white font-semibold">30%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <div className="text-xs text-white/60">30% to goal (50 beta users)</div>
                </div>
              </div>
            </div>

            {/* Team & Resources */}
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                👥 Team & Resources
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Team Size:</span>
                  <span className="text-white font-semibold">3 people</span>
                </div>
                <div className="text-xs text-white/60">1 PM, 2 Engineers</div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Runway:</span>
                  <span className="text-white font-semibold">6 months</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Key Constraint:</span>
                  <span className="px-2 py-1 rounded text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    Limited marketing
                  </span>
                </div>
              </div>
            </div>

            {/* Competitive Landscape */}
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                ⚡ Competitive Landscape
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold text-white mb-1">Primary: Productboard</div>
                  <div className="text-xs text-white/60">Series C, $100M+ funding, roadmap focus</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-1">Secondary: Aha!</div>
                  <div className="text-xs text-white/60">Profitable, strategy docs, enterprise</div>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <div className="text-blue-400 text-sm font-semibold">
                    Our Advantage: Strategic AI + execution
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