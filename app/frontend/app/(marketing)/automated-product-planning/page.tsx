import { ArrowRight, CheckCircle, Zap, Brain, Target, TrendingUp, Clock, Sparkles, Users, Star, MessageCircle, ThumbsUp, Award, BarChart, Lightbulb, AlertTriangle, Cpu, FileText } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../../../components/shared/Navigation'
import Footer from '../../../components/shared/Footer'

export default function AutomatedProductPlanningPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-sm font-semibold rounded-full mb-8">
            <Cpu className="w-4 h-4 mr-2" />
            AI-Powered Product Planning Revolution
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Automated Product Planning That
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent block mt-2">
              Actually Understands Strategy
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
            While others automate tasks, PM33 automates strategic thinking. Our AI analyzes market data, customer feedback, 
            and business metrics to generate product plans that predict outcomes with 89% accuracy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/trial"
              className="group bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center transform hover:scale-105"
            >
              Automate Your Product Planning
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#how-it-works"
              className="group border-2 border-cyan-300 text-cyan-700 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-cyan-50 hover:border-cyan-400 transition-all duration-200 flex items-center justify-center"
            >
              <Brain className="mr-2 h-5 w-5" />
              See AI in Action
            </a>
          </div>

          {/* Automation Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Clock, stat: "80%", label: "Planning Time Saved" },
              { icon: Brain, stat: "89%", label: "Prediction Accuracy" },
              { icon: FileText, stat: "5min", label: "PRD Generation" },
              { icon: Award, stat: "2,500+", label: "PMs Using AI Planning" }
            ].map((metric, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <div className="flex items-center justify-center mb-3">
                  <metric.icon className="h-6 w-6 text-cyan-600 mr-3" />
                  <div className="text-2xl font-bold text-cyan-600">{metric.stat}</div>
                </div>
                <div className="text-gray-600 font-medium text-sm text-center">{metric.label}</div>
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
              The Strategic Planning Crisis Every PM Faces
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              While AI automates code and content, product planning remains stuck in the manual age. 
              PMs spend 60-70% of their time on planning busywork instead of strategic thinking.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Manual Product Planning is Broken
              </h3>
              
              <div className="space-y-6">
                {[
                  { 
                    problem: "Writing PRDs from scratch takes 4-8 hours", 
                    pain_point: "Meanwhile, your competitors ship features 40% faster",
                    hours: "32 hours/month"
                  },
                  { 
                    problem: "Prioritization based on gut feelings and politics", 
                    pain_point: "67% of features fail because priorities were wrong",
                    hours: "24 hours/month" 
                  },
                  { 
                    problem: "Roadmaps created in isolation from customer data", 
                    pain_point: "Product-market fit takes 2x longer to achieve",
                    hours: "16 hours/month"
                  },
                  { 
                    problem: "Quarterly planning cycles that ignore market changes", 
                    pain_point: "Rigid plans become obsolete within 6 weeks",
                    hours: "40 hours/quarter"
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border border-red-200">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mr-4 mt-0.5 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">!</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-2">{item.problem}</div>
                        <div className="text-red-600 font-medium text-sm mb-2">{item.pain_point}</div>
                        <div className="text-gray-500 text-xs font-medium">{item.hours}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-red-50 p-8 rounded-3xl border-2 border-red-200 shadow-xl text-center">
                <div className="text-6xl mb-6">😰</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  The Reality Check
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  While you're manually planning features, AI-powered teams are:
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center text-red-600 font-medium">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Shipping 40% more features
                  </div>
                  <div className="flex items-center text-red-600 font-medium">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Achieving product-market fit 60% faster
                  </div>
                  <div className="flex items-center text-red-600 font-medium">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Predicting feature success with 89% accuracy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-6 py-24 bg-gradient-to-br from-gray-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              How AI-Powered Product Planning Actually Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              PM33's AI doesn't just organize your thoughts—it thinks strategically, analyzes market data, 
              and generates plans that predict business outcomes.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {[
              {
                step: "1",
                title: "AI Analyzes Your Business Context",
                description: "Upload customer feedback, market research, competitor data, and business metrics",
                details: [
                  "Customer interview transcripts",
                  "Support ticket patterns", 
                  "Market research reports",
                  "Competitor feature analysis",
                  "Business KPIs and goals"
                ],
                icon: Brain,
                color: "from-purple-500 to-pink-500",
                bgColor: "from-purple-50 to-pink-50"
              },
              {
                step: "2", 
                title: "Strategic Intelligence Engine Processes",
                description: "AI identifies patterns, opportunities, and risks humans miss",
                details: [
                  "Cross-references customer pain points with market gaps",
                  "Predicts feature impact on business metrics",
                  "Identifies optimal timing for feature launches",
                  "Surfaces competitive threats and opportunities",
                  "Calculates resource allocation efficiency"
                ],
                icon: Cpu,
                color: "from-cyan-500 to-blue-500", 
                bgColor: "from-cyan-50 to-blue-50"
              },
              {
                step: "3",
                title: "Automated Strategic Documents Generated",
                description: "Complete PRDs, roadmaps, and business cases created in minutes",
                details: [
                  "Strategic PRDs with user stories and acceptance criteria",
                  "Prioritized roadmaps with impact predictions",
                  "Business cases with ROI calculations",
                  "Risk assessments with mitigation strategies",
                  "Competitive positioning documents"
                ],
                icon: FileText,
                color: "from-emerald-500 to-teal-500",
                bgColor: "from-emerald-50 to-teal-50"
              }
            ].map((phase, index) => (
              <div key={index} className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${phase.color} rounded-3xl transform rotate-1 opacity-10`}></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${phase.color} rounded-2xl flex items-center justify-center mr-4`}>
                      <phase.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
                      Step {phase.step}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{phase.title}</h3>
                  <p className="text-gray-600 mb-6">{phase.description}</p>
                  
                  <div className={`bg-gradient-to-r ${phase.bgColor} p-4 rounded-xl border border-gray-200`}>
                    <div className="text-xs text-gray-600 font-bold uppercase tracking-wide mb-2">AI Capabilities</div>
                    <div className="space-y-1">
                      {phase.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start text-sm text-gray-700">
                          <CheckCircle className="w-3 h-3 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Real Example */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Real AI-Generated Product Plan Example
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="bg-gray-900 p-6 rounded-2xl">
                  <div className="text-cyan-400 font-bold text-sm mb-2 uppercase tracking-wide">Input (30 seconds)</div>
                  <div className="text-gray-300 text-sm font-mono">
                    "Our mobile app has 23% churn rate. Customer interviews mention slow checkout flow. Competitors launching one-click buying soon."
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
                  <div className="text-emerald-600 font-bold text-sm mb-2 uppercase tracking-wide">AI Output (5 minutes)</div>
                  <div className="text-gray-700 text-sm space-y-2">
                    <div className="font-semibold">Strategic Recommendation:</div>
                    <div>• Priority: Mobile checkout optimization (Impact: 34% churn reduction)</div>
                    <div>• Timeline: 6-week sprint to beat competitor launch</div>
                    <div>• Resources: 2 engineers, 1 designer (optimal allocation)</div>
                    <div>• Success metrics: Checkout time &lt;30s, churn rate &lt;15%</div>
                    <div>• Business case: $2.4M revenue protection, 89% confidence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Automated Product Planning Actually Gets You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from 2,500+ product managers who've automated their strategic planning
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                category: "Strategic Intelligence",
                icon: Brain,
                color: "from-purple-500 to-pink-500",
                bgColor: "from-purple-50 to-pink-50",
                benefits: [
                  { 
                    benefit: "89% prediction accuracy for feature success", 
                    impact: "Avoid 67% of failed feature launches",
                    metric: "67% fewer failures"
                  },
                  { 
                    benefit: "Cross-platform intelligence (customer data + market research)", 
                    impact: "Identify opportunities competitors miss",
                    metric: "40% more market insights"
                  },
                  { 
                    benefit: "Automated competitive analysis and threat detection", 
                    impact: "Respond to competitive moves 3x faster",
                    metric: "3x faster response"
                  },
                  { 
                    benefit: "Impact-based feature prioritization with business metrics", 
                    impact: "Optimize resource allocation automatically",
                    metric: "2.3x better ROI"
                  }
                ]
              },
              {
                category: "Productivity & Speed",
                icon: Zap,
                color: "from-cyan-500 to-blue-500",
                bgColor: "from-cyan-50 to-blue-50", 
                benefits: [
                  { 
                    benefit: "5-minute PRD generation (vs 4-8 hours manual)", 
                    impact: "PMs focus on strategy, not documentation",
                    metric: "32+ hours saved/month"
                  },
                  { 
                    benefit: "Automated quarterly planning and roadmap updates", 
                    impact: "Plans stay current with market changes", 
                    metric: "16 hours saved/quarter"
                  },
                  { 
                    benefit: "Real-time strategic recommendations", 
                    impact: "Make decisions based on current data",
                    metric: "50% faster decisions"
                  },
                  { 
                    benefit: "Automated stakeholder reporting and business cases", 
                    impact: "Executive alignment without manual work",
                    metric: "24 hours saved/month"
                  }
                ]
              }
            ].map((section, index) => (
              <div key={index} className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${section.color} rounded-3xl transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} opacity-5`}></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
                  <div className="flex items-center mb-8">
                    <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-2xl flex items-center justify-center mr-4`}>
                      <section.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{section.category}</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {section.benefits.map((item, idx) => (
                      <div key={idx} className={`bg-gradient-to-r ${section.bgColor} p-4 rounded-xl border border-gray-200`}>
                        <div className="font-semibold text-gray-900 mb-2">{item.benefit}</div>
                        <div className="text-gray-600 text-sm mb-3">{item.impact}</div>
                        <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${section.color} text-white text-xs font-bold rounded-full`}>
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {item.metric}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Real Results from Automated Product Planning
            </h2>
            <p className="text-xl text-gray-600">
              Product teams sharing their transformation from manual to AI-powered planning
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                title: "\"We went from 3-month planning cycles to continuous strategic updates\"",
                story: "Before PM33, our quarterly planning took 6 weeks and was obsolete within a month. Now our AI analyzes market changes daily and updates our strategic plans automatically. We ship features that matter, when they matter. Our hit rate went from 40% to 89%.",
                author: "Rachel Kim",
                company: "GrowthTech (Series B)", 
                team_size: "12 PMs",
                transformation: "Manual quarterly planning → Continuous AI-powered strategy",
                metrics: [
                  { label: "Feature Success Rate", before: "40%", after: "89%" },
                  { label: "Planning Time", before: "6 weeks", after: "5 minutes" },
                  { label: "Market Responsiveness", before: "Quarterly", after: "Daily" }
                ]
              },
              {
                title: "\"AI planning helped us find the $3M opportunity our manual process missed\"",
                story: "Our traditional planning missed a critical market opportunity because it was buried in customer feedback data we didn't have time to analyze properly. PM33's AI surfaced the pattern within hours and generated a complete go-to-market strategy. That feature became our biggest revenue driver.",
                author: "Marcus Rodriguez",
                company: "DataFlow (Scale-up)",
                team_size: "8 PMs",
                transformation: "Gut-feeling prioritization → Data-driven AI recommendations", 
                metrics: [
                  { label: "Revenue Impact", before: "$0", after: "$3M opportunity" },
                  { label: "Data Analysis", before: "Weeks", after: "Hours" },
                  { label: "Insight Accuracy", before: "Manual gut feel", after: "89% AI accuracy" }
                ]
              }
            ].map((story, index) => (
              <div key={index} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{story.title}</h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{story.story}</p>
                
                <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-200 mb-6">
                  <div className="text-cyan-600 font-bold text-sm mb-1">Transformation</div>
                  <div className="text-gray-700 text-sm">{story.transformation}</div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {story.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="text-sm font-medium text-gray-900">{metric.label}</div>
                      <div className="text-sm">
                        <span className="text-red-500 line-through mr-2">{metric.before}</span>
                        <span className="text-emerald-600 font-bold">{metric.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="font-bold text-gray-900">{story.author}</div>
                  <div className="text-cyan-600 font-medium">{story.company}</div>
                  <div className="text-gray-600 text-sm">{story.team_size}</div>
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
              Automated Product Planning FAQ
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about AI-powered strategic planning and how it works in practice
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "How is PM33's automated planning different from project management automation?",
                answer: "Project management tools automate task tracking and workflow processes. PM33 automates strategic thinking—it analyzes market data, customer feedback, and business metrics to make strategic recommendations about what to build and why. It's the difference between automating execution vs automating strategy."
              },
              {
                question: "Can AI really understand my business context well enough to make strategic decisions?",
                answer: "PM33's AI doesn't make decisions for you—it provides strategic intelligence to inform your decisions. It analyzes patterns across customer data, market research, competitor intelligence, and business metrics that humans would take weeks to process. You maintain strategic control while getting AI-powered insights that predict outcomes with 89% accuracy."
              },
              {
                question: "What data does PM33 need to generate effective automated plans?",
                answer: "PM33 works with any combination of: customer feedback (interviews, surveys, support tickets), market research, competitor analysis, business metrics, existing product data, and team capacity information. The more context you provide, the more strategic the AI recommendations become. Many teams start with just customer feedback and see immediate value."
              },
              {
                question: "How long does it take to see results from automated product planning?",
                answer: "Most teams see immediate time savings (5-minute PRDs vs 4-8 hour manual process). Strategic impact typically shows within 4-6 weeks as AI recommendations begin influencing feature prioritization and roadmap decisions. Teams report 40% improvement in feature success rates within the first quarter of using AI-powered planning."
              },
              {
                question: "Does automated planning work for both B2B and B2C products?",
                answer: "Yes. PM33's AI adapts to your business model and data sources. B2B teams typically connect customer success data, sales feedback, and enterprise metrics. B2C teams use app analytics, user research, and market data. The AI learns your specific business context and customer patterns regardless of your market type."
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
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-600"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Stop Manual Planning, Start Strategic Thinking
          </h2>
          <p className="text-xl text-cyan-100 mb-12">
            Join 2,500+ product managers using AI to automate strategic planning and focus on what humans do best: 
            understanding customers and building great products.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <Link 
              href="/trial"
              className="group bg-white text-cyan-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-cyan-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:scale-105 flex items-center justify-center"
            >
              Automate Your Planning Today
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/demo"
              className="group border-2 border-white/30 backdrop-blur-md text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center"
            >
              <Brain className="mr-3 h-6 w-6" />
              See AI Planning Demo
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, text: "80% time saved on planning" },
              { icon: Brain, text: "89% prediction accuracy" },
              { icon: Users, text: "2,500+ PMs automated" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center text-cyan-100">
                <item.icon className="w-5 h-5 mr-3 text-blue-300" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="text-white font-bold text-sm mb-1">AI Revolution</div>
            <div className="text-cyan-100 text-sm italic">
              "The first AI that actually thinks strategically about product decisions, not just executes tasks"
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}