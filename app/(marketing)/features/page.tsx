import { ArrowRight, CheckCircle, Zap, Brain, Target, Users, Lightbulb, TrendingUp, Clock, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../../../components/shared/Navigation'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold rounded-full mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Product Management Features That Actually Work
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Every <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">PM Feature</span> You Need,
            <span className="block mt-2">Zero Tool Migration</span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
            PM33 connects to your existing tools (Jira, Monday, Asana) and adds AI-powered strategic intelligence. 
            Get advanced PM capabilities without abandoning workflows your team already knows.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/trial"
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center transform hover:scale-105"
            >
              Try All Features Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/pricing"
              className="group border-2 border-indigo-300 text-indigo-700 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200 flex items-center justify-center"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Core PM Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything product managers need for strategic planning, documentation, and team alignment.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                icon: Brain,
                title: "AI Strategic Intelligence",
                description: "Turn scattered data into strategic insights across all your existing PM tools",
                features: [
                  "Cross-platform data analysis (Jira + Slack + Customer feedback)",
                  "AI-powered impact scoring and feature prioritization",
                  "Predictive churn analysis and growth opportunities",
                  "Automated competitive intelligence reports"
                ],
                demo: "Analyzes 847 support tickets → Recommends mobile optimization → Predicts 34% churn reduction"
              },
              {
                icon: Zap,
                title: "Automated Documentation",
                description: "Generate comprehensive PRDs, user stories, and requirements in minutes, not hours",
                features: [
                  "AI PRD generation from brief descriptions",
                  "User story creation with acceptance criteria",
                  "Technical specification drafting",
                  "Automatic formatting for team standards"
                ],
                demo: "Input: 'Improve checkout flow' → Complete PRD with stories, criteria, and metrics in 3 minutes"
              },
              {
                icon: Target,
                title: "Smart Roadmap Planning",
                description: "AI-powered roadmap optimization based on business impact and resource constraints",
                features: [
                  "Automated roadmap generation from backlog",
                  "Resource capacity planning and allocation",
                  "Dependency mapping and risk analysis",
                  "Timeline optimization with confidence intervals"
                ],
                demo: "Creates Q1 2025 roadmap → Identifies 3 blockers → Suggests 2 alternative paths → 89% delivery confidence"
              },
              {
                icon: Users,
                title: "Team Collaboration Hub",
                description: "Centralize PM communication and decision-making across distributed teams",
                features: [
                  "Real-time commenting and feedback collection",
                  "Stakeholder notification and approval workflows",
                  "Decision history and rationale tracking",
                  "Cross-functional alignment dashboards"
                ],
                demo: "Stakeholder feedback → AI synthesis → Decision recommendations → Automatic team notifications"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start mb-8">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-2xl mr-6 shadow-lg">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {feature.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feat}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gray-900 p-6 rounded-2xl">
                    <div className="text-emerald-400 font-bold text-xs mb-2 uppercase tracking-wide">Live Example</div>
                    <p className="text-gray-300 text-sm font-mono leading-relaxed">{feature.demo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Features */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Works With Your Existing Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              PM33 enhances your current tools instead of replacing them. No migration, no retraining, no disruption.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { tool: "Jira", description: "Bi-directional sync with ticket analysis and automated story creation" },
              { tool: "Monday.com", description: "Project intelligence and automated status updates" },
              { tool: "Asana", description: "Task prioritization and team workload optimization" },
              { tool: "Slack", description: "Discussion synthesis and decision tracking" },
              { tool: "GitHub", description: "Development velocity analysis and release planning" },
              { tool: "Figma", description: "Design feedback integration and user story generation" }
            ].map((integration, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="text-2xl font-bold text-indigo-600 mb-4">{integration.tool}</div>
                <p className="text-gray-600">{integration.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">5-Minute Setup Process</h3>
            <div className="grid md:grid-cols-4 gap-6 text-sm">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-3">1</div>
                <p className="text-gray-600">Connect your tools</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-3">2</div>
                <p className="text-gray-600">AI analyzes your data</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-3">3</div>
                <p className="text-gray-600">Receive first insights</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-3">4</div>
                <p className="text-gray-600">Start strategic planning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              How PM33 Compares
            </h2>
            <p className="text-xl text-gray-600">
              See why teams choose enhancement over replacement
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl border border-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <th className="p-6 text-left font-bold text-gray-900">Capability</th>
                  <th className="p-6 text-center font-bold text-indigo-600">PM33</th>
                  <th className="p-6 text-center font-semibold text-gray-600">Traditional PM Tools</th>
                  <th className="p-6 text-center font-semibold text-gray-600">AI-Only Solutions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Works with existing tools", pm33: "✅", traditional: "❌", ai: "❌" },
                  { feature: "AI strategic insights", pm33: "✅", traditional: "❌", ai: "✅" },
                  { feature: "No migration required", pm33: "✅", traditional: "❌", ai: "❌" },
                  { feature: "Team familiarity", pm33: "✅", traditional: "✅", ai: "❌" },
                  { feature: "Advanced automation", pm33: "✅", traditional: "❌", ai: "✅" },
                  { feature: "Cross-platform intelligence", pm33: "✅", traditional: "❌", ai: "❌" }
                ].map((row, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-6 font-medium text-gray-900">{row.feature}</td>
                    <td className="p-6 text-center text-2xl">{row.pm33}</td>
                    <td className="p-6 text-center text-2xl">{row.traditional}</td>
                    <td className="p-6 text-center text-2xl">{row.ai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-cyan-600"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Experience All Features?
          </h2>
          <p className="text-xl text-indigo-100 mb-12">
            Start your free 14-day trial and see how PM33 transforms your product management workflow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/trial"
              className="group bg-white text-indigo-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-indigo-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:scale-105 flex items-center justify-center"
            >
              Start Free Trial - All Features
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/pricing"
              className="group border-2 border-white/30 backdrop-blur-md text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">PM33</div>
                <div className="ml-3 px-2 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 text-xs font-medium rounded-full border border-indigo-500/30">
                  AI-Powered
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The AI brain that supercharges your existing PM tools without migration headaches.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Features</h4>
              <div className="space-y-4 text-gray-400">
                <div className="hover:text-indigo-400 transition-colors">AI Strategic Intelligence</div>
                <div className="hover:text-indigo-400 transition-colors">Automated Documentation</div>
                <div className="hover:text-indigo-400 transition-colors">Smart Roadmap Planning</div>
                <div className="hover:text-indigo-400 transition-colors">Team Collaboration</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Integrations</h4>
              <div className="space-y-4 text-gray-400">
                <div className="hover:text-indigo-400 transition-colors">Jira Integration</div>
                <div className="hover:text-indigo-400 transition-colors">Monday.com Sync</div>
                <div className="hover:text-indigo-400 transition-colors">Asana Connect</div>
                <div className="hover:text-indigo-400 transition-colors">Slack Integration</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Company</h4>
              <div className="space-y-4 text-gray-400">
                <Link href="/about" className="block hover:text-indigo-400 transition-colors">About</Link>
                <Link href="/contact" className="block hover:text-indigo-400 transition-colors">Contact</Link>
                <Link href="/privacy" className="block hover:text-indigo-400 transition-colors">Privacy</Link>
                <Link href="/security" className="block hover:text-indigo-400 transition-colors">Security</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PM33. Don't replace your PM tools - make them 10x smarter.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}