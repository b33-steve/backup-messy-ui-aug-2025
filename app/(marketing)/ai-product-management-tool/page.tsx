import { ArrowRight, CheckCircle, Zap, Brain, Target, TrendingUp, Clock, Sparkles, Users, Star } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../../../components/shared/Navigation'

export default function AIProductManagementToolPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold rounded-full mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            #1 AI Product Management Tool
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            AI Product Management Tool
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent block mt-2">
              That Enhances Your Existing Stack
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
            PM33 is the first AI product management tool that connects to Jira, Monday.com, and Asana to provide 
            strategic intelligence without forcing you to migrate. Turn busywork into strategic insights in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/trial"
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center transform hover:scale-105"
            >
              Try AI Tool Free for 14 Days
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/features"
              className="group border-2 border-indigo-300 text-indigo-700 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200 flex items-center justify-center"
            >
              See AI Features
            </Link>
          </div>

          {/* Social Proof */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Users, stat: "2,500+", label: "Product Managers" },
              { icon: Clock, stat: "72hrs", label: "Saved Per PM Monthly" },
              { icon: Star, stat: "4.9/5", label: "Customer Rating" }
            ].map((metric, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <div className="flex items-center justify-center mb-3">
                  <metric.icon className="h-8 w-8 text-indigo-600 mr-3" />
                  <div className="text-3xl font-bold text-indigo-600">{metric.stat}</div>
                </div>
                <div className="text-gray-600 font-medium">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Product Managers Choose AI-Powered Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Traditional PM tools force you to choose: either stick with familiar workflows or get AI benefits. 
              PM33 gives you both.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                The Traditional PM Tool Problem
              </h3>
              
              <div className="space-y-6">
                {[
                  { pain: "Manual documentation takes 4+ hours daily", impact: "Less time for customer research" },
                  { pain: "Data scattered across 8+ different tools", impact: "No unified strategic insights" },
                  { pain: "Feature prioritization based on gut feeling", impact: "Wrong features get built first" },
                  { pain: "Reactive instead of predictive planning", impact: "Always behind competitors" }
                ].map((problem, index) => (
                  <div key={index} className="bg-red-50 p-6 rounded-2xl border border-red-200">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mr-4 mt-0.5"></div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-2">{problem.pain}</div>
                        <div className="text-red-600 text-sm font-medium">→ {problem.impact}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                The AI Product Management Solution
              </h3>
              
              <div className="space-y-6">
                {[
                  { solution: "AI generates PRDs in 15 minutes", impact: "3.5 hours back for strategy daily" },
                  { solution: "Cross-platform intelligence analysis", impact: "Unified insights from all your tools" },
                  { solution: "Impact scoring with 89% accuracy", impact: "Build features customers actually want" },
                  { solution: "Predictive roadmap optimization", impact: "Stay ahead of market demands" }
                ].map((benefit, index) => (
                  <div key={index} className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex-shrink-0 mr-4 mt-0.5 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-2">{benefit.solution}</div>
                        <div className="text-emerald-600 text-sm font-medium">→ {benefit.impact}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Makes PM33 the Best AI Product Management Tool
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlike other AI tools that require you to start from scratch, PM33 enhances your existing PM workflow.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                icon: Brain,
                title: "AI Strategic Intelligence",
                description: "Cross-platform analysis that turns scattered data into strategic recommendations",
                capabilities: [
                  "Analyzes Jira tickets, Slack discussions, and customer feedback",
                  "Identifies patterns humans miss across 1000+ data points",
                  "Predicts feature impact with 89% accuracy",
                  "Generates strategic recommendations in plain English"
                ],
                example: "AI analyzed 847 support tickets → Identified mobile performance as #1 churn driver → Recommended optimization roadmap → Predicted 34% churn reduction"
              },
              {
                icon: Zap,
                title: "Automated Documentation Engine",
                description: "Generate comprehensive PRDs, user stories, and requirements from simple descriptions",
                capabilities: [
                  "Transforms 2-sentence ideas into complete PRDs",
                  "Creates user stories with acceptance criteria",
                  "Generates technical specifications",
                  "Maintains consistent formatting and standards"
                ],
                example: "Input: 'Improve checkout flow for mobile users' → Output: Complete 12-page PRD with user stories, success metrics, technical requirements, and implementation timeline"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
                <div className="flex items-start mb-8">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-2xl mr-6 shadow-lg">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-lg text-gray-600">{feature.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-8">
                  {feature.capabilities.map((capability, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{capability}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-900 p-6 rounded-2xl">
                  <div className="text-emerald-400 font-bold text-xs mb-2 uppercase tracking-wide">Real Example</div>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              AI Product Management Tool Comparison
            </h2>
            <p className="text-xl text-gray-600">
              See why PM33 is different from other AI PM tools
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl border border-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <th className="p-6 text-left font-bold text-gray-900">Feature</th>
                  <th className="p-6 text-center font-bold text-indigo-600">PM33</th>
                  <th className="p-6 text-center font-semibold text-gray-600">Traditional AI Tools</th>
                  <th className="p-6 text-center font-semibold text-gray-600">Legacy PM Tools</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Works with existing tools", pm33: "✅ Jira, Monday, Asana", traditional: "❌ Requires migration", legacy: "❌ No AI features" },
                  { feature: "AI strategic insights", pm33: "✅ Cross-platform analysis", traditional: "✅ Single tool only", legacy: "❌ Manual analysis" },
                  { feature: "Setup time", pm33: "✅ 5 minutes", traditional: "❌ 2-4 weeks migration", legacy: "✅ Quick but no AI" },
                  { feature: "Learning curve", pm33: "✅ Use existing workflows", traditional: "❌ Retrain entire team", legacy: "✅ Familiar but limited" },
                  { feature: "AI automation", pm33: "✅ Full documentation suite", traditional: "✅ Limited features", legacy: "❌ All manual" },
                  { feature: "Cost efficiency", pm33: "✅ $20-40/user", traditional: "❌ $50-100/user", legacy: "✅ $10-30/user" }
                ].map((row, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-6 font-medium text-gray-900">{row.feature}</td>
                    <td className="p-6 text-center text-sm font-medium text-emerald-600">{row.pm33}</td>
                    <td className="p-6 text-center text-sm">{row.traditional}</td>
                    <td className="p-6 text-center text-sm">{row.legacy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why 2,500+ PMs Choose PM33's AI Tool
            </h2>
            <p className="text-xl text-gray-600">
              Real results from product managers using AI-powered PM workflows
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Finally, an AI tool that doesn't force us to abandon Jira",
                detail: "We've been using Jira for 3 years. PM33's AI layer gave us all the intelligence we needed without disrupting our workflow. Setup took 5 minutes and we saw insights immediately.",
                author: "Sarah Chen",
                title: "Senior PM at TechFlow",
                metric: "5-minute setup",
                impact: "Zero workflow disruption"
              },
              {
                quote: "Our PRD creation time went from 4 hours to 15 minutes",
                detail: "The AI documentation engine is incredible. It takes our rough ideas and turns them into comprehensive PRDs that our engineering team actually uses. Game-changing productivity boost.",
                author: "Marcus Rodriguez", 
                title: "Head of Product at DataSync",
                metric: "93% time savings",
                impact: "4x more strategic work"
              },
              {
                quote: "The cross-platform intelligence is exactly what we needed",
                detail: "We had data in Slack, Jira, customer interviews, and market research. PM33's AI connects all the dots and gives us strategic recommendations we never would have seen.",
                author: "Jennifer Liu",
                title: "VP Product at CloudOps",
                metric: "360° data analysis",
                impact: "Strategic blind spots eliminated"
              }
            ].map((testimonial, index) => (
              <div key={index} className="group relative">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="text-4xl text-indigo-600 mb-4 font-serif">"</div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{testimonial.quote}</h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{testimonial.detail}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-xl text-center">
                      <div className="text-lg font-bold text-indigo-600">{testimonial.metric}</div>
                      <div className="text-xs text-gray-600">Key Metric</div>
                    </div>
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-xl text-center">
                      <div className="text-sm font-semibold text-emerald-600">{testimonial.impact}</div>
                      <div className="text-xs text-gray-600">Impact</div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              AI Product Management Tool FAQ
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about using AI for product management
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "How is PM33 different from other AI product management tools?",
                answer: "Most AI PM tools require you to migrate all your data and retrain your team. PM33 connects to your existing tools (Jira, Monday, Asana) and adds AI intelligence on top. You get AI benefits without changing your workflow."
              },
              {
                question: "What AI capabilities does PM33 offer for product managers?",
                answer: "PM33 provides AI-powered strategic intelligence (cross-platform data analysis), automated documentation generation (PRDs, user stories), predictive impact scoring, and smart roadmap optimization. All designed specifically for PM workflows."
              },
              {
                question: "How accurate is the AI strategic intelligence?",
                answer: "Our AI impact predictions have 89% accuracy based on analysis of 10,000+ features across our customer base. The system improves accuracy over time by learning from your specific product domain and customer feedback patterns."
              },
              {
                question: "Can the AI tool integrate with our custom PM processes?",
                answer: "Yes! PM33's AI adapts to your existing processes rather than forcing you to change. It learns your documentation standards, approval workflows, and prioritization criteria to provide personalized recommendations."
              },
              {
                question: "How long does it take to see results from the AI product management tool?",
                answer: "Most teams see immediate value within the first week. AI insights start appearing within minutes of connecting your tools, and comprehensive strategic recommendations develop as the system analyzes more of your historical data."
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
            Ready to Try the Best AI Product Management Tool?
          </h2>
          <p className="text-xl text-indigo-100 mb-12">
            Join 2,500+ product managers using PM33 to transform busywork into strategic insights. 
            Free 14-day trial, no credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <Link 
              href="/trial"
              className="group bg-white text-indigo-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-indigo-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:scale-105 flex items-center justify-center"
            >
              Start Free AI Trial Now
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/features"
              className="group border-2 border-white/30 backdrop-blur-md text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center"
            >
              Explore AI Features
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle, text: "No credit card required" },
              { icon: Clock, text: "5-minute setup" },
              { icon: Users, text: "Works with your existing tools" }
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
                The AI product management tool that enhances your existing workflow instead of replacing it.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">AI Features</h4>
              <div className="space-y-4 text-gray-400">
                <div className="hover:text-indigo-400 transition-colors">Strategic Intelligence</div>
                <div className="hover:text-indigo-400 transition-colors">Document Automation</div>
                <div className="hover:text-indigo-400 transition-colors">Impact Scoring</div>
                <div className="hover:text-indigo-400 transition-colors">Roadmap Optimization</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Comparisons</h4>
              <div className="space-y-4 text-gray-400">
                <Link href="/jira-alternative" className="block hover:text-indigo-400 transition-colors">PM33 vs Jira</Link>
                <Link href="/monday-alternative" className="block hover:text-indigo-400 transition-colors">PM33 vs Monday</Link>
                <Link href="/asana-competitor" className="block hover:text-indigo-400 transition-colors">PM33 vs Asana</Link>
                <Link href="/better-than-jira" className="block hover:text-indigo-400 transition-colors">Better than Jira</Link>
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
            <p>&copy; 2025 PM33. The AI product management tool that works with your existing stack.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}