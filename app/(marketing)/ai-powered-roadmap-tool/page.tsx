import { ArrowRight, CheckCircle, Zap, Brain, Target, TrendingUp, Clock, Sparkles, Users, Star, Calendar, Map } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../../../components/shared/Navigation'

export default function AIPoweredRoadmapToolPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold rounded-full mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Smart Roadmap Planning with AI
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            AI-Powered Roadmap Tool
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent block mt-2">
              That Actually Predicts Success
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
            PM33's AI-powered roadmap tool analyzes your product data, market trends, and team capacity to generate 
            strategic roadmaps with 89% accuracy in predicting feature success. Works with your existing PM tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/trial"
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center transform hover:scale-105"
            >
              Try AI Roadmap Tool Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/features"
              className="group border-2 border-indigo-300 text-indigo-700 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200 flex items-center justify-center"
            >
              <Map className="mr-2 h-5 w-5" />
              See Roadmap Features
            </Link>
          </div>

          {/* Success Metrics */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Target, stat: "89%", label: "Feature Success Prediction Accuracy" },
              { icon: TrendingUp, stat: "40%", label: "More Features Shipped" },
              { icon: Clock, stat: "15min", label: "Roadmap Generation Time" },
              { icon: Users, stat: "2,500+", label: "PMs Using AI Roadmaps" }
            ].map((metric, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <div className="flex items-center justify-center mb-3">
                  <metric.icon className="h-6 w-6 text-indigo-600 mr-3" />
                  <div className="text-2xl font-bold text-indigo-600">{metric.stat}</div>
                </div>
                <div className="text-gray-600 font-medium text-sm text-center">{metric.label}</div>
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
              Why Traditional Roadmap Planning Fails PMs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Most roadmap tools are glorified calendars. PM33's AI-powered approach predicts what will actually drive business results.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Traditional Roadmap Tool Problems
              </h3>
              
              <div className="space-y-6">
                {[
                  { problem: "Roadmaps based on gut feeling, not data", reality: "67% of features fail to meet success metrics" },
                  { problem: "Static plans that don't adapt to changing priorities", reality: "Average roadmap becomes obsolete in 6 weeks" },
                  { problem: "No visibility into resource constraints", reality: "Teams consistently over-commit by 30-50%" },
                  { problem: "Roadmaps disconnected from customer feedback", reality: "85% of roadmap decisions ignore user voice" },
                  { problem: "Manual effort to keep roadmaps updated", reality: "PMs spend 8+ hours weekly on roadmap maintenance" }
                ].map((issue, index) => (
                  <div key={index} className="bg-red-50 p-6 rounded-2xl border border-red-200">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mr-4 mt-0.5 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">!</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-2">{issue.problem}</div>
                        <div className="text-red-600 text-sm font-medium">Reality: {issue.reality}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                AI-Powered Roadmap Intelligence
              </h3>
              
              <div className="space-y-6">
                {[
                  { solution: "Data-driven prioritization with impact scoring", result: "89% accuracy in predicting feature success" },
                  { solution: "Dynamic roadmaps that auto-adjust to new data", result: "Roadmaps stay current with real-time updates" },
                  { solution: "Resource capacity planning with team velocity analysis", result: "Realistic timelines with 95% delivery confidence" },
                  { solution: "Customer feedback integration across all channels", result: "100% alignment with user needs and market demands" },
                  { solution: "Automated roadmap updates from connected tools", result: "Zero maintenance time, always up-to-date" }
                ].map((benefit, index) => (
                  <div key={index} className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex-shrink-0 mr-4 mt-0.5 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-2">{benefit.solution}</div>
                        <div className="text-emerald-600 text-sm font-medium">Result: {benefit.result}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Roadmap Features */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              AI-Powered Roadmap Tool Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced roadmap intelligence that transforms how product teams plan and execute.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {[
              {
                icon: Brain,
                title: "Smart Impact Scoring",
                description: "AI analyzes historical data, market trends, and customer feedback to score potential impact of each feature",
                capabilities: [
                  "Revenue impact predictions with confidence intervals",
                  "User adoption forecasting based on similar features",
                  "Competitive advantage scoring and market timing",
                  "Technical debt assessment and implementation risk"
                ],
                example: "Feature X scored 8.7/10 impact → Predicted $2.3M ARR increase → 87% confidence → Priority: P0"
              },
              {
                icon: Calendar,
                title: "Dynamic Timeline Optimization",
                description: "Intelligent scheduling that considers team velocity, dependencies, and resource constraints",
                capabilities: [
                  "Team velocity analysis and capacity planning",
                  "Dependency mapping with critical path identification",
                  "Resource allocation optimization across projects",
                  "Risk-adjusted delivery timeline predictions"
                ],
                example: "Q1 roadmap: 12 features planned → 3 dependencies identified → Timeline adjusted → 95% delivery confidence"
              },
              {
                icon: Target,
                title: "Strategic Alignment Engine",
                description: "Ensures every roadmap item connects to business objectives and OKRs with measurable outcomes",
                capabilities: [
                  "OKR alignment scoring for each feature",
                  "Business impact modeling and ROI forecasting",
                  "Market opportunity analysis and sizing",
                  "Stakeholder priority balancing and trade-offs"
                ],
                example: "Feature aligns with OKR 2.1 → 73% contribution to growth goal → High stakeholder value → Approved"
              },
              {
                icon: Zap,
                title: "Real-time Roadmap Adaptation",
                description: "Roadmaps that automatically adjust based on new data, changing priorities, and market conditions",
                capabilities: [
                  "Market signal detection and priority adjustment",
                  "Customer feedback integration and impact scoring",
                  "Competitor move analysis and response planning",
                  "Performance data integration for iteration decisions"
                ],
                example: "Competitor launched similar feature → Priority updated → Alternative approach suggested → Timeline revised"
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-white p-10 rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start mb-8">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-2xl mr-6 shadow-lg group-hover:scale-110 transition-transform">
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
                  <div className="text-emerald-400 font-bold text-xs mb-2 uppercase tracking-wide">AI Analysis Example</div>
                  <p className="text-gray-300 text-sm font-mono leading-relaxed">{feature.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Tool Integration */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Works With Your Existing Roadmap Tools
            </h2>
            <p className="text-xl text-gray-600">
              Enhance your current roadmap workflow with AI intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                tool: "Jira",
                description: "Transforms Jira epics and stories into intelligent roadmap items with AI-powered prioritization",
                features: ["Epic impact scoring", "Sprint capacity optimization", "Dependency analysis", "Timeline predictions"]
              },
              {
                tool: "Monday.com",
                description: "Adds strategic intelligence to Monday roadmap boards with predictive insights",
                features: ["Board intelligence", "Resource planning", "Priority automation", "Progress forecasting"]
              },
              {
                tool: "Asana",
                description: "Enhances Asana project planning with AI-driven roadmap optimization",
                features: ["Project prioritization", "Timeline optimization", "Resource allocation", "Impact assessment"]
              },
              {
                tool: "Linear",
                description: "Supercharges Linear roadmaps with AI-powered strategic planning capabilities",
                features: ["Initiative scoring", "Cycle planning", "Feature prioritization", "Delivery prediction"]
              },
              {
                tool: "Notion",
                description: "Transforms Notion roadmap databases with intelligent automation and insights",
                features: ["Database intelligence", "Property automation", "Template optimization", "Progress tracking"]
              },
              {
                tool: "Roadmunk",
                description: "Enhances dedicated roadmap tools with AI-powered strategic intelligence",
                features: ["Timeline intelligence", "Stakeholder alignment", "Impact visualization", "Scenario planning"]
              }
            ].map((integration, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-indigo-50 p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-bold text-indigo-600 mb-4">{integration.tool} Integration</h3>
                <p className="text-gray-600 mb-6">{integration.description}</p>
                
                <div className="space-y-2">
                  {integration.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-10 rounded-3xl border border-indigo-200 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">5-Minute AI Roadmap Setup</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", action: "Connect your roadmap tool", time: "30 seconds" },
                { step: "2", action: "AI analyzes your data", time: "2 minutes" },
                { step: "3", action: "Review AI recommendations", time: "1 minute" },
                { step: "4", action: "Generate optimized roadmap", time: "90 seconds" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold mb-3 mx-auto">
                    {item.step}
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">{item.action}</div>
                  <div className="text-sm text-gray-600">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              AI Roadmap Tool Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Product teams achieving breakthrough results with AI-powered roadmap planning
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                quote: "89% of our AI-recommended features exceeded success targets",
                detail: "We used to guess which features to build next. PM33's AI roadmap tool analyzes our customer data, market trends, and team capacity to recommend the highest-impact features. The predictions have been incredibly accurate.",
                author: "Sarah Chen",
                title: "Head of Product, TechFlow",
                metric: "89% success rate",
                improvement: "vs 34% before AI"
              },
              {
                quote: "Roadmap planning went from weeks to hours",
                detail: "Our quarterly planning used to take 3 weeks of meetings and analysis. Now PM33's AI generates data-driven roadmaps in hours, and they're more accurate than our manual ones ever were.",
                author: "Marcus Rodriguez",
                title: "VP Product, DataSync",
                metric: "95% faster planning",
                improvement: "3 weeks → 4 hours"
              },
              {
                quote: "Finally, roadmaps that actually predict what customers want",
                detail: "The AI continuously analyzes customer feedback, usage patterns, and market signals to keep our roadmap aligned with real demand. We're building features people actually use.",
                author: "Jennifer Liu",
                title: "Senior PM, CloudOps",
                metric: "73% higher adoption",
                improvement: "for new features"
              }
            ].map((story, index) => (
              <div key={index} className="group bg-white p-8 rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl text-indigo-600 mb-4 font-serif">"</div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">{story.quote}</h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{story.detail}</p>
                
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">{story.metric}</div>
                    <div className="text-sm text-gray-600">{story.improvement}</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="font-semibold text-gray-900">{story.author}</div>
                  <div className="text-gray-600 text-sm">{story.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Roadmap FAQ */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              AI-Powered Roadmap Tool FAQ
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about AI roadmap planning and optimization
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "How accurate are PM33's AI-powered roadmap predictions?",
                answer: "PM33's AI roadmap tool achieves 89% accuracy in predicting feature success based on analysis of over 10,000 features across our customer base. The system continuously learns from outcomes to improve predictions, and provides confidence intervals for each recommendation."
              },
              {
                question: "Can the AI roadmap tool work with our existing roadmap process?",
                answer: "Yes, PM33 enhances your existing roadmap tools (Jira, Monday, Asana, Linear, etc.) rather than replacing them. The AI analyzes your current roadmap data and provides intelligent recommendations within your familiar workflow, requiring no process changes."
              },
              {
                question: "What data does the AI use to generate roadmap recommendations?",
                answer: "The AI analyzes customer feedback, usage analytics, support tickets, market trends, competitive intelligence, team velocity data, and historical feature performance. All data analysis happens securely within your environment with full privacy protection."
              },
              {
                question: "How long does it take to set up AI-powered roadmap planning?",
                answer: "Initial setup takes about 5 minutes to connect your existing tools. The AI immediately begins analyzing your data and provides initial recommendations within hours. Full optimization and learning typically occurs over 2-4 weeks of usage."
              },
              {
                question: "Does the AI roadmap tool help with resource planning and capacity management?",
                answer: "Absolutely. The AI analyzes your team's historical velocity, current capacity, and skill sets to provide realistic timeline estimates and resource allocation recommendations. It identifies potential bottlenecks and suggests optimal team assignments for maximum efficiency."
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
            Ready to Transform Your Roadmap Planning?
          </h2>
          <p className="text-xl text-indigo-100 mb-12">
            Join 2,500+ product managers using AI to build roadmaps that actually predict success. 
            Free 14-day trial, works with your existing tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <Link 
              href="/trial"
              className="group bg-white text-indigo-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-indigo-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:scale-105 flex items-center justify-center"
            >
              Try AI Roadmap Tool Free
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/features"
              className="group border-2 border-white/30 backdrop-blur-md text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center"
            >
              <Map className="mr-3 h-6 w-6" />
              Explore All Features
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, text: "89% prediction accuracy" },
              { icon: Clock, text: "5-minute setup" },
              { icon: CheckCircle, text: "Works with existing tools" }
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
                The AI-powered roadmap tool that predicts feature success with 89% accuracy.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">AI Roadmap Features</h4>
              <div className="space-y-4 text-gray-400">
                <div className="hover:text-indigo-400 transition-colors">Impact Scoring</div>
                <div className="hover:text-indigo-400 transition-colors">Timeline Optimization</div>
                <div className="hover:text-indigo-400 transition-colors">Strategic Alignment</div>
                <div className="hover:text-indigo-400 transition-colors">Real-time Adaptation</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Integrations</h4>
              <div className="space-y-4 text-gray-400">
                <div className="hover:text-indigo-400 transition-colors">Jira Roadmaps</div>
                <div className="hover:text-indigo-400 transition-colors">Monday.com Boards</div>
                <div className="hover:text-indigo-400 transition-colors">Asana Projects</div>
                <div className="hover:text-indigo-400 transition-colors">Linear Cycles</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Resources</h4>
              <div className="space-y-4 text-gray-400">
                <Link href="/product-management-software" className="block hover:text-indigo-400 transition-colors">PM Software</Link>
                <Link href="/ai-product-management-tool" className="block hover:text-indigo-400 transition-colors">AI PM Tool</Link>
                <Link href="/templates" className="block hover:text-indigo-400 transition-colors">Templates</Link>
                <Link href="/contact" className="block hover:text-indigo-400 transition-colors">Contact</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PM33. The AI roadmap tool that turns planning into competitive advantage.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}