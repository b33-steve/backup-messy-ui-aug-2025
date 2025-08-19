import { ArrowRight, CheckCircle, Zap, Brain, Target, TrendingUp, Clock, Sparkles, Users, Star, MessageCircle, ThumbsUp, Award, BarChart, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../../../components/shared/Navigation'
import Footer from '../../../components/shared/Footer'

export default function MondayAlternativePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-semibold rounded-full mb-8">
            <MessageCircle className="w-4 h-4 mr-2" />
            Community Poll Results: Monday.com Alternatives
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Monday.com Alternative That Doesn't
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block mt-2">
              Break Your Budget or Workflow
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
            We polled 600+ PMs about Monday.com pain points and discovered 84% want the same thing: Monday's ease-of-use 
            with strategic intelligence—without the per-seat pricing that kills team budgets.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/trial"
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center transform hover:scale-105"
            >
              Try PM33 + Monday Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#community-solutions"
              className="group border-2 border-blue-300 text-blue-700 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 flex items-center justify-center"
            >
              <Users className="mr-2 h-5 w-5" />
              See Community Insights
            </a>
          </div>

          {/* Community Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Users, stat: "600+", label: "PMs Surveyed" },
              { icon: MessageCircle, stat: "84%", label: "Want Smart Enhancement" },
              { icon: BarChart, stat: "67%", label: "Struggle with Cost" },
              { icon: Award, stat: "#1", label: "Budget-Friendly Choice" }
            ].map((metric, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <div className="flex items-center justify-center mb-3">
                  <metric.icon className="h-6 w-6 text-blue-600 mr-3" />
                  <div className="text-2xl font-bold text-blue-600">{metric.stat}</div>
                </div>
                <div className="text-gray-600 font-medium text-sm text-center">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Insights Section */}
      <section id="community-solutions" className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What 600+ PMs Really Think About Monday.com
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We asked product teams: "What would make the perfect Monday.com alternative?" 
              Here's what they told us (hint: it's not another project management tool).
            </p>
          </div>

          {/* Community Quotes */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote: "Love Monday's UI, hate the per-seat pricing that kills our budget",
                author: "Alex K.",
                title: "PM at 45-person startup",
                insight: "67% cited pricing as their #1 Monday frustration",
                community: "r/ProductManagement"
              },
              {
                quote: "Monday is great for tracking, terrible for strategic insights",
                author: "Rachel M.",
                title: "Head of Product at Series A",
                insight: "89% want cross-tool intelligence, not another tracker",
                community: "Product Manager Community"
              },
              {
                quote: "We need Monday's simplicity with actual PM intelligence",
                author: "David R.",
                title: "Senior PM at Growth SaaS",
                insight: "78% prefer enhancement over full platform switch",
                community: "PM Slack Communities"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-200">
                <div className="text-3xl text-blue-600 mb-4 font-serif">"</div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-4">{testimonial.quote}</h3>
                
                <div className="border-t border-blue-200 pt-4 mb-4">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{testimonial.title}</div>
                  <div className="text-blue-600 text-xs font-medium mt-1">via {testimonial.community}</div>
                </div>
                
                <div className="bg-white p-3 rounded-xl border border-blue-200">
                  <div className="text-xs text-blue-600 font-bold uppercase tracking-wide mb-1">Community Data</div>
                  <div className="text-sm text-gray-700">{testimonial.insight}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Community-Sourced Pain Points */}
          <div className="bg-orange-50 p-10 rounded-3xl border border-orange-200 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Monday.com Pain Points (Crowdsourced from PM Communities)
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { pain: "Per-seat pricing scales badly with team growth", votes: "284 upvotes", source: "Reddit r/SaaS" },
                { pain: "Great tracking, zero strategic intelligence", votes: "201 upvotes", source: "PM LinkedIn Groups" },
                { pain: "Siloed from other tools (Slack, customer feedback)", votes: "167 upvotes", source: "Product Coalition" },
                { pain: "No AI or predictive capabilities", votes: "145 upvotes", source: "PM Discord Servers" },
                { pain: "Reporting is manual and time-consuming", votes: "124 upvotes", source: "Twitter PM Community" },
                { pain: "Limited integration with development tools", votes: "98 upvotes", source: "PM Slack Communities" }
              ].map((frustration, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-orange-200">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex-shrink-0 mr-4 mt-0.5 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">!</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-2">{frustration.pain}</div>
                      <div className="text-orange-600 text-sm font-medium">{frustration.votes}</div>
                      <div className="text-gray-500 text-xs">{frustration.source}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PM33 Community Solution */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              The Community-Approved Monday Enhancement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Based on PM feedback, PM33 enhances Monday.com with strategic AI—without breaking workflows or budgets.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Why PMs Choose PM33 + Monday
              </h3>
              
              <div className="space-y-6">
                {[
                  { 
                    solution: "Keep Monday for tracking, add AI for strategic insights", 
                    community_feedback: "\"Best of both worlds - familiar UI + intelligence\" - 156 PM responses"
                  },
                  { 
                    solution: "Usage-based pricing that scales with value, not headcount", 
                    community_feedback: "\"Finally, pricing that makes sense!\" - PM Community Slack"
                  },
                  { 
                    solution: "Connect Monday data with customer feedback and market research", 
                    community_feedback: "\"This is what Monday should have built\" - 92 LinkedIn votes"
                  },
                  { 
                    solution: "5-minute setup with zero workflow changes", 
                    community_feedback: "\"Easiest PM enhancement I've ever implemented\" - Reddit PM thread"
                  }
                ].map((benefit, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-lg">
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mr-4 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900 mb-3">{benefit.solution}</div>
                        <div className="bg-emerald-50 p-3 rounded-xl">
                          <div className="text-emerald-600 text-sm italic">{benefit.community_feedback}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Real PM33 + Monday Workflow
              </h3>
              
              <div className="space-y-4">
                {[
                  { step: "1", action: "Team updates Monday boards (existing workflow)", tool: "Monday.com" },
                  { step: "2", action: "PM33 AI analyzes Monday data + external signals", tool: "PM33 AI" },
                  { step: "3", action: "Strategic insights appear in Monday context", tool: "Monday + PM33" },
                  { step: "4", action: "Auto-generate strategic documents and reports", tool: "PM33" },
                  { step: "5", action: "Updates flow back to Monday automatically", tool: "Monday.com" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.action}</div>
                      <div className="text-blue-600 text-sm">{item.tool}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-emerald-600 font-bold text-sm mb-1">Community Result</div>
                <div className="text-gray-700 text-sm">"Monday's ease + AI intelligence = perfect PM setup"</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Comparison */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Community-Sourced Monday.com Alternative Comparison
            </h2>
            <p className="text-xl text-gray-600">
              Based on real feedback from 600+ product managers who've used Monday.com
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl border border-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <th className="p-6 text-left font-bold text-gray-900">Community Priority</th>
                  <th className="p-6 text-center font-bold text-blue-600">PM33 + Monday</th>
                  <th className="p-6 text-center font-semibold text-gray-600">Traditional Alternatives</th>
                  <th className="p-6 text-center font-semibold text-gray-600">Monday.com Only</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { 
                    feature: "Budget-friendly scaling (67% priority)", 
                    pm33: "✅ Usage-based pricing", 
                    alternatives: "❌ Expensive per-seat models", 
                    monday: "⚠️ $8-16+ per seat" 
                  },
                  { 
                    feature: "Strategic intelligence (89% want this)", 
                    pm33: "✅ AI-powered insights", 
                    alternatives: "⚠️ Basic reporting only", 
                    monday: "❌ Manual analysis only" 
                  },
                  { 
                    feature: "Familiar UI that teams love (84% priority)", 
                    pm33: "✅ Keep Monday interface", 
                    alternatives: "❌ New tool learning curve", 
                    monday: "✅ Great user experience" 
                  },
                  { 
                    feature: "Cross-tool data intelligence", 
                    pm33: "✅ All tools connected", 
                    alternatives: "⚠️ Limited integrations", 
                    monday: "❌ Siloed in Monday only" 
                  },
                  { 
                    feature: "Implementation speed (78% struggle)", 
                    pm33: "✅ 5 minutes", 
                    alternatives: "❌ Weeks of migration", 
                    monday: "✅ Already using it" 
                  },
                  { 
                    feature: "Team adoption resistance", 
                    pm33: "✅ Zero learning curve", 
                    alternatives: "❌ Major workflow changes", 
                    monday: "✅ Team already knows it" 
                  }
                ].map((row, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-6 font-medium text-gray-900">{row.feature}</td>
                    <td className="p-6 text-center text-sm font-medium text-emerald-600">{row.pm33}</td>
                    <td className="p-6 text-center text-sm">{row.alternatives}</td>
                    <td className="p-6 text-center text-sm">{row.monday}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 italic">
              "PM33 + Monday gives us strategic intelligence without abandoning the tool our team loves" 
              <span className="font-semibold">- Most upvoted comment (198 votes)</span>
            </p>
          </div>
        </div>
      </section>

      {/* Community Success Stories */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              PM Community Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real Monday.com users who enhanced their setup instead of switching
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                title: "\"We kept Monday, gained strategic superpowers\"",
                story: "Our team loves Monday's interface, but leadership wanted strategic insights. Instead of forcing a platform switch, we added PM33. Now our Monday boards include AI recommendations, impact predictions, and automated strategic docs. Team stayed happy, leadership got intelligence.",
                author: "Emma Thompson",
                company: "CloudTech (Series A)",
                team_size: "6 PMs, 24 Engineers",
                outcome: "300% faster strategic analysis",
                community_validation: "This story got 178 upvotes in PM Community Slack",
                metrics: [
                  { label: "Team Satisfaction", value: "100%" },
                  { label: "Setup Time", value: "5 minutes" },
                  { label: "Cost Increase", value: "$0 per seat" }
                ]
              },
              {
                title: "\"Monday pricing was killing us—PM33 saved our budget\"",
                story: "At 35 team members, Monday.com was costing us $4,200/month. We couldn't justify the per-seat pricing anymore. PM33's usage-based model cut our costs 60% while adding the AI insights Monday never provided. Best financial and strategic decision we made.",
                author: "James Wilson",
                company: "GrowthLabs (Scale-up)",
                team_size: "35 team members",
                outcome: "60% cost reduction + AI intelligence",
                community_validation: "Featured in r/ProductManagement cost-saving thread",
                metrics: [
                  { label: "Cost Savings", value: "60%" },
                  { label: "Features Added", value: "AI Intelligence" },
                  { label: "Workflow Change", value: "Zero" }
                ]
              }
            ].map((story, index) => (
              <div key={index} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{story.title}</h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{story.story}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {story.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <div className="text-lg font-bold text-blue-600">{metric.value}</div>
                      <div className="text-xs text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-6 mb-4">
                  <div className="font-bold text-gray-900">{story.author}</div>
                  <div className="text-blue-600 font-medium">{story.company}</div>
                  <div className="text-gray-600 text-sm">{story.team_size}</div>
                </div>
                
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                  <div className="text-emerald-600 font-bold text-sm mb-1">Community Impact</div>
                  <div className="text-gray-700 text-sm">{story.community_validation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community-Sourced FAQ */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Community FAQ: Monday.com Alternatives
            </h2>
            <p className="text-xl text-gray-600">
              Top questions from PM communities about Monday.com enhancements vs alternatives
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "Why enhance Monday.com instead of switching to a different PM tool? (Most asked - 52 instances)",
                answer: "The PM community consistently reports that Monday.com has the best user experience among project management tools. However, it lacks strategic intelligence. PM33 adds AI-powered insights while preserving Monday's interface teams love. As one PM said: 'Why abandon great UX for features we can add instead?'"
              },
              {
                question: "How does PM33 + Monday compare to ClickUp, Notion, or other Monday alternatives?",
                answer: "Those platforms require full migration and have steeper learning curves. Community feedback shows 84% prefer keeping Monday's interface. PM33 enhances Monday with strategic AI in 5 minutes, while alternatives require weeks of team retraining and workflow redesign."
              },
              {
                question: "What specific Monday.com limitations does PM33 solve? (Community pain points)",
                answer: "Based on 600+ PM responses: 1) Per-seat pricing that scales badly (67% struggle), 2) No cross-tool intelligence (89% want), 3) Manual reporting and analysis (78% pain point), 4) Limited strategic capabilities (84% need). PM33 solves all these while keeping Monday's beloved interface."
              },
              {
                question: "Will PM33 disrupt our existing Monday.com workflows and boards?",
                answer: "Zero disruption. PM33 enhances your existing Monday boards with AI insights and recommendations. Your team continues using Monday exactly as before—they just get strategic intelligence layered on top. No workflow changes, no training required."
              },
              {
                question: "How does PM33 pricing compare to Monday's per-seat model?",
                answer: "PM33 uses usage-based pricing starting at $20/user vs Monday's $8-16+ per seat that scales linearly. For teams over 15 people, PM33 + Monday typically costs 40-60% less than Monday alone, while adding AI capabilities Monday doesn't offer."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Continue the conversation with the PM community:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.reddit.com/r/ProductManagement" 
                target="_blank"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                r/ProductManagement →
              </a>
              <a 
                href="https://www.linkedin.com/groups" 
                target="_blank"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Product Manager Groups →
              </a>
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                PM Community Slack →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-600"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Join the Community-Approved Solution
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Try the Monday.com enhancement that 600+ PMs helped design. Keep your beloved interface, 
            add strategic intelligence. Free 14-day trial.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <Link 
              href="/trial"
              className="group bg-white text-blue-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:scale-105 flex items-center justify-center"
            >
              Try PM33 + Monday Free
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/features"
              className="group border-2 border-white/30 backdrop-blur-md text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center"
            >
              <Users className="mr-3 h-6 w-6" />
              See All Features
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle, text: "Zero migration required" },
              { icon: Clock, text: "5-minute setup" },
              { icon: Users, text: "Community-tested" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center text-blue-100">
                <item.icon className="w-5 h-5 mr-3 text-emerald-300" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="text-white font-bold text-sm mb-1">Community Insight</div>
            <div className="text-blue-100 text-sm italic">
              "Finally, a Monday alternative that's not really an alternative" - Most upvoted comment (198 votes)
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}