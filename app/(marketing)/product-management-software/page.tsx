import { ArrowRight, CheckCircle, Zap, Brain, Target, TrendingUp, Clock, Sparkles, Users, Star, Shield, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../../../components/shared/Navigation'

export default function ProductManagementSoftwarePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold rounded-full mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Next-Generation Product Management Software
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Product Management Software
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent block mt-2">
              That Works With Your Stack
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
            PM33 is product management software that enhances Jira, Monday.com, and Asana with AI intelligence. 
            Get advanced PM capabilities without migrating your data or retraining your team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/trial"
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center transform hover:scale-105"
            >
              Try PM Software Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/features"
              className="group border-2 border-indigo-300 text-indigo-700 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200 flex items-center justify-center"
            >
              View All Features
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Users, stat: "2,500+", label: "Active Product Managers" },
              { icon: Clock, stat: "72hrs", label: "Saved Monthly Per PM" },
              { icon: Shield, stat: "SOC 2", label: "Enterprise Security" },
              { icon: Star, stat: "4.9/5", label: "Customer Rating" }
            ].map((metric, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <div className="flex items-center justify-center mb-3">
                  <metric.icon className="h-6 w-6 text-indigo-600 mr-3" />
                  <div className="text-2xl font-bold text-indigo-600">{metric.stat}</div>
                </div>
                <div className="text-gray-600 font-medium text-sm">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Traditional Product Management Software Falls Short
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Most PM software forces you to choose: keep your familiar tools or get advanced features. 
              PM33 gives you both.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            {/* Traditional PM Software Problems */}
            <div>
              <div className="bg-red-50 p-8 rounded-3xl border border-red-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">❌</span>
                  </div>
                  Traditional PM Software Issues
                </h3>
                
                <div className="space-y-4">
                  {[
                    { problem: "Forces complete migration from existing tools", cost: "3-6 months implementation" },
                    { problem: "Requires extensive team retraining", cost: "$50K+ in lost productivity" },
                    { problem: "Siloed data with limited cross-platform insights", cost: "Strategic blind spots" },
                    { problem: "High per-seat pricing that scales with team size", cost: "$25-74/user monthly" },
                    { problem: "Generic features that don't adapt to your workflow", cost: "Reduced adoption" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start p-4 bg-white rounded-xl border border-red-200">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div>
                        <div className="font-medium text-gray-900 mb-1">{item.problem}</div>
                        <div className="text-red-600 text-sm font-semibold">Impact: {item.cost}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PM33 Solution */}
            <div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl border border-emerald-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full mr-4 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  PM33 Product Management Software
                </h3>
                
                <div className="space-y-4">
                  {[
                    { solution: "Enhances your existing Jira, Monday, Asana setup", benefit: "5-minute integration" },
                    { solution: "AI learns your team's workflow automatically", benefit: "Zero training required" },
                    { solution: "Cross-platform intelligence and unified insights", benefit: "360° strategic view" },
                    { solution: "Usage-based pricing, not per-seat", benefit: "60% cost savings" },
                    { solution: "Adapts to your specific PM processes", benefit: "100% team adoption" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start p-4 bg-white rounded-xl border border-emerald-200">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div>
                        <div className="font-medium text-gray-900 mb-1">{item.solution}</div>
                        <div className="text-emerald-600 text-sm font-semibold">Result: {item.benefit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core PM Software Features */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Essential Product Management Software Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All the PM capabilities you need, enhanced with AI intelligence across your existing tool stack.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Strategic Intelligence",
                description: "AI analyzes data across all your PM tools to provide unified strategic insights",
                features: [
                  "Cross-platform data synthesis",
                  "Predictive feature impact scoring",
                  "Automated competitive analysis",
                  "Strategic recommendation engine"
                ],
                benefit: "Make data-driven decisions 10x faster"
              },
              {
                icon: Zap,
                title: "Documentation Automation",
                description: "Generate PRDs, user stories, and requirements automatically from brief descriptions",
                features: [
                  "AI-powered PRD generation",
                  "User story creation with criteria",
                  "Technical spec drafting",
                  "Requirement documentation"
                ],
                benefit: "Reduce documentation time by 90%"
              },
              {
                icon: Target,
                title: "Roadmap Optimization",
                description: "Smart roadmap planning with AI-driven prioritization and resource allocation",
                features: [
                  "Automated feature prioritization",
                  "Resource capacity planning",
                  "Timeline optimization",
                  "Risk assessment and mitigation"
                ],
                benefit: "Ship 40% more features with same resources"
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Enhanced collaboration tools that work across your existing PM software stack",
                features: [
                  "Cross-tool communication sync",
                  "Stakeholder alignment dashboards",
                  "Decision tracking and history",
                  "Real-time collaboration feeds"
                ],
                benefit: "Improve team alignment by 85%"
              },
              {
                icon: TrendingUp,
                title: "Performance Analytics",
                description: "Advanced analytics that track what matters most for product success",
                features: [
                  "Feature performance tracking",
                  "User adoption metrics",
                  "ROI measurement and forecasting",
                  "Custom KPI dashboards"
                ],
                benefit: "Increase product success rate by 60%"
              },
              {
                icon: Lightbulb,
                title: "Smart Insights",
                description: "Proactive insights and recommendations based on your product data patterns",
                features: [
                  "Anomaly detection and alerts",
                  "Trend identification",
                  "Opportunity recommendations",
                  "Risk early warning system"
                ],
                benefit: "Identify opportunities 3x earlier"
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-white p-8 rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                
                <div className="space-y-2 mb-6">
                  {feature.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200">
                  <div className="text-indigo-600 font-bold text-sm">{feature.benefit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PM Software Comparison */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Product Management Software Comparison
            </h2>
            <p className="text-xl text-gray-600">
              See how PM33 compares to traditional PM software solutions
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl border border-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <th className="p-6 text-left font-bold text-gray-900">Capability</th>
                  <th className="p-6 text-center font-bold text-indigo-600">PM33</th>
                  <th className="p-6 text-center font-semibold text-gray-600">Traditional PM Software</th>
                  <th className="p-6 text-center font-semibold text-gray-600">Standalone Tools</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { 
                    feature: "Integration with existing tools", 
                    pm33: "✅ Native integration", 
                    traditional: "❌ Requires migration", 
                    standalone: "⚠️ Limited connectivity" 
                  },
                  { 
                    feature: "AI-powered insights", 
                    pm33: "✅ Cross-platform AI", 
                    traditional: "⚠️ Basic analytics", 
                    standalone: "❌ Manual analysis" 
                  },
                  { 
                    feature: "Implementation time", 
                    pm33: "✅ 5 minutes", 
                    traditional: "❌ 3-6 months", 
                    standalone: "⚠️ 1-4 weeks" 
                  },
                  { 
                    feature: "Team training required", 
                    pm33: "✅ None", 
                    traditional: "❌ Extensive", 
                    standalone: "⚠️ Moderate" 
                  },
                  { 
                    feature: "Cost structure", 
                    pm33: "✅ Usage-based", 
                    traditional: "❌ Per-seat pricing", 
                    standalone: "⚠️ Per-seat pricing" 
                  },
                  { 
                    feature: "Strategic intelligence", 
                    pm33: "✅ Advanced AI", 
                    traditional: "⚠️ Basic reporting", 
                    standalone: "❌ None" 
                  },
                  { 
                    feature: "Document automation", 
                    pm33: "✅ Full automation", 
                    traditional: "⚠️ Templates only", 
                    standalone: "❌ Manual" 
                  },
                  { 
                    feature: "Workflow customization", 
                    pm33: "✅ Adapts automatically", 
                    traditional: "⚠️ Limited flexibility", 
                    standalone: "⚠️ Manual setup" 
                  }
                ].map((row, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-6 font-medium text-gray-900">{row.feature}</td>
                    <td className="p-6 text-center text-sm font-medium text-emerald-600">{row.pm33}</td>
                    <td className="p-6 text-center text-sm">{row.traditional}</td>
                    <td className="p-6 text-center text-sm">{row.standalone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Customer Success Stories */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Product Teams Love PM33 Software
            </h2>
            <p className="text-xl text-gray-600">
              Real results from product managers using PM33 as their core PM software
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                quote: "Best product management software investment we've made",
                detail: "We evaluated 12 different PM software solutions. PM33 was the only one that enhanced our existing Jira setup instead of forcing us to start over. The AI insights helped us identify our biggest growth opportunity within the first week.",
                author: "Sarah Chen",
                title: "Head of Product at TechFlow",
                company: "Series B SaaS, 150 employees",
                metrics: [
                  { label: "Setup Time", value: "5 minutes" },
                  { label: "Team Adoption", value: "100%" },
                  { label: "Time Saved", value: "18 hrs/week" }
                ]
              },
              {
                quote: "Finally, PM software that actually understands how we work",
                detail: "Every other PM software tried to change our processes. PM33 learned our workflow and made it smarter. The cross-platform insights revealed patterns we never would have seen manually. Game-changing for our product strategy.",
                author: "Marcus Rodriguez",
                title: "VP Product at DataSync",
                company: "Growth-stage startup, 75 employees", 
                metrics: [
                  { label: "Features Shipped", value: "+40%" },
                  { label: "Strategic Time", value: "+300%" },
                  { label: "Decision Speed", value: "10x faster" }
                ]
              }
            ].map((story, index) => (
              <div key={index} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
                <div className="text-4xl text-indigo-600 mb-6 font-serif">"</div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{story.quote}</h3>
                
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">{story.detail}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {story.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                      <div className="text-lg font-bold text-indigo-600">{metric.value}</div>
                      <div className="text-xs text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="font-bold text-gray-900 text-lg">{story.author}</div>
                  <div className="text-indigo-600 font-medium">{story.title}</div>
                  <div className="text-gray-500 text-sm">{story.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PM Software FAQ */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Product Management Software FAQ
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about choosing PM software for your team
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "What makes PM33 different from other product management software?",
                answer: "Unlike traditional PM software that requires migrating your entire workflow, PM33 enhances your existing tools (Jira, Monday, Asana) with AI intelligence. You get advanced PM capabilities without changing how your team already works, making adoption instant and seamless."
              },
              {
                question: "How long does it take to implement PM33 product management software?",
                answer: "PM33 can be set up in under 5 minutes. Simply connect your existing PM tools, and our AI immediately begins analyzing your data to provide insights. There's no data migration, no workflow changes, and no team retraining required."
              },
              {
                question: "What product management software features does PM33 offer?",
                answer: "PM33 provides AI-powered strategic intelligence, automated documentation generation (PRDs, user stories, requirements), smart roadmap optimization, cross-platform analytics, team collaboration tools, and predictive insights - all working across your existing PM software stack."
              },
              {
                question: "Is PM33 suitable for large enterprise product management teams?",
                answer: "Yes, PM33 scales with teams of any size. We offer enterprise features including advanced security (SOC 2 compliant), custom integrations, dedicated support, and volume pricing. Many enterprise teams prefer PM33 because it doesn't disrupt their established PM software workflows."
              },
              {
                question: "How does PM33 pricing compare to other product management software?",
                answer: "PM33 uses usage-based pricing starting at $20/user/month, typically 40-60% less expensive than traditional PM software. You pay for AI actions and insights, not seat licenses, making it more cost-effective as your team grows."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-cyan-600"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Transform Your Product Management Software?
          </h2>
          <p className="text-xl text-indigo-100 mb-12">
            Join 2,500+ product managers using PM33 to enhance their existing PM tools with AI intelligence. 
            Free 14-day trial, no migration required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <Link 
              href="/trial"
              className="group bg-white text-indigo-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-indigo-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:scale-105 flex items-center justify-center"
            >
              Try PM Software Free
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact"
              className="group border-2 border-white/30 backdrop-blur-md text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center"
            >
              Contact Sales Team
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle, text: "No credit card required" },
              { icon: Clock, text: "5-minute setup" },
              { icon: Shield, text: "Enterprise security" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center text-indigo-100">
                <item.icon className="w-5 h-5 mr-3 text-emerald-300" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
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
                The product management software that enhances your existing workflow with AI intelligence.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">PM Software Features</h4>
              <div className="space-y-4 text-gray-400">
                <div className="hover:text-indigo-400 transition-colors">Strategic Intelligence</div>
                <div className="hover:text-indigo-400 transition-colors">Document Automation</div>
                <div className="hover:text-indigo-400 transition-colors">Roadmap Optimization</div>
                <div className="hover:text-indigo-400 transition-colors">Team Collaboration</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Comparisons</h4>
              <div className="space-y-4 text-gray-400">
                <Link href="/jira-alternative" className="block hover:text-indigo-400 transition-colors">vs Jira</Link>
                <Link href="/monday-alternative" className="block hover:text-indigo-400 transition-colors">vs Monday.com</Link>
                <Link href="/asana-competitor" className="block hover:text-indigo-400 transition-colors">vs Asana</Link>
                <Link href="/ai-product-management-tool" className="block hover:text-indigo-400 transition-colors">AI PM Tool</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Resources</h4>
              <div className="space-y-4 text-gray-400">
                <Link href="/templates" className="block hover:text-indigo-400 transition-colors">PM Templates</Link>
                <Link href="/pricing" className="block hover:text-indigo-400 transition-colors">Pricing</Link>
                <Link href="/security" className="block hover:text-indigo-400 transition-colors">Security</Link>
                <Link href="/contact" className="block hover:text-indigo-400 transition-colors">Contact</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PM33. The product management software that works with your existing stack.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}