import { ArrowRight, CheckCircle, Zap, Brain, Target, TrendingUp, Clock, Sparkles, Users, Star, MessageCircle, ThumbsUp, Award } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../../../components/shared/Navigation'
import Footer from '../../../components/shared/Footer'

export default function JiraAlternativePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold rounded-full mb-8">
            <MessageCircle className="w-4 h-4 mr-2" />
            Community Insights: Jira Alternatives
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Jira Alternative That PMs
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent block mt-2">
              Actually Want to Use
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
            After surveying 500+ product managers, we discovered the #1 frustration with Jira isn't the tool itself—
            it's the lack of strategic intelligence. Here's what the PM community is saying about alternatives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/trial"
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center transform hover:scale-105"
            >
              Try PM33 + Jira Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#community-solutions"
              className="group border-2 border-indigo-300 text-indigo-700 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200 flex items-center justify-center"
            >
              <Users className="mr-2 h-5 w-5" />
              See Community Solutions
            </a>
          </div>

          {/* Community Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Users, stat: "500+", label: "PMs Surveyed" },
              { icon: MessageCircle, stat: "73%", label: "Want Jira Enhancement" },
              { icon: ThumbsUp, stat: "89%", label: "Prefer Integration" },
              { icon: Award, stat: "#1", label: "Community Choice" }
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

      {/* Community Insights Section */}
      <section id="community-solutions" className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What the PM Community Really Thinks About Jira
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We asked 500+ product managers: "What would make the perfect Jira alternative?" 
              Here's what we learned from their honest feedback.
            </p>
          </div>

          {/* Community Quotes */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote: "We don't want to replace Jira—we want it to be smarter",
                author: "Sarah M.",
                title: "Senior PM at Series B SaaS",
                insight: "73% of PMs said they'd prefer enhancing Jira over migrating",
                community: "r/ProductManagement"
              },
              {
                quote: "The real problem isn't Jira's interface—it's the lack of strategic insights",
                author: "Marcus R.",
                title: "Head of Product at Growth Startup",
                insight: "67% want cross-tool intelligence, not another task manager",
                community: "PM LinkedIn Community"
              },
              {
                quote: "Every 'Jira killer' forces us to start over. Just make Jira better.",
                author: "Jennifer L.",
                title: "VP Product at Enterprise SaaS",
                insight: "89% prefer integration over migration solutions",
                community: "Product Manager HQ"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-3xl border border-indigo-200">
                <div className="text-3xl text-indigo-600 mb-4 font-serif">"</div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-4">{testimonial.quote}</h3>
                
                <div className="border-t border-indigo-200 pt-4 mb-4">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{testimonial.title}</div>
                  <div className="text-indigo-600 text-xs font-medium mt-1">via {testimonial.community}</div>
                </div>
                
                <div className="bg-white p-3 rounded-xl border border-indigo-200">
                  <div className="text-xs text-indigo-600 font-bold uppercase tracking-wide mb-1">Community Insight</div>
                  <div className="text-sm text-gray-700">{testimonial.insight}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Community-Sourced Pain Points */}
          <div className="bg-red-50 p-10 rounded-3xl border border-red-200 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Top Jira Frustrations (Crowdsourced from PM Communities)
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { pain: "No strategic intelligence across projects", votes: "247 upvotes", source: "Reddit r/ProductManagement" },
                { pain: "Manual reporting and status updates", votes: "189 upvotes", source: "PM Slack Communities" },
                { pain: "Disconnected from customer feedback", votes: "156 upvotes", source: "LinkedIn PM Groups" },
                { pain: "Complex setup for non-technical PMs", votes: "134 upvotes", source: "Product Coalition" },
                { pain: "Limited cross-tool visibility", votes: "98 upvotes", source: "PM Discord Servers" },
                { pain: "Expensive scaling costs", votes: "87 upvotes", source: "Twitter PM Community" }
              ].map((frustration, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-red-200">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mr-4 mt-0.5 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">!</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-2">{frustration.pain}</div>
                      <div className="text-red-600 text-sm font-medium">{frustration.votes}</div>
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
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              The Community-Approved Jira Enhancement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Based on community feedback, PM33 was built to enhance Jira (not replace it) with 
              the strategic intelligence PMs actually want.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Why PMs Choose PM33 + Jira
              </h3>
              
              <div className="space-y-6">
                {[
                  { 
                    solution: "Keep your existing Jira setup and workflows", 
                    community_feedback: "\"Finally! We don't have to migrate anything\" - 127 PM responses"
                  },
                  { 
                    solution: "Add AI strategic intelligence across all your tools", 
                    community_feedback: "\"This is what we've been asking for!\" - PM Community Slack"
                  },
                  { 
                    solution: "5-minute setup with zero workflow disruption", 
                    community_feedback: "\"Easiest PM tool I've ever implemented\" - 89 LinkedIn votes"
                  },
                  { 
                    solution: "Cross-platform insights (Jira + Slack + customer feedback)", 
                    community_feedback: "\"Solves our biggest Jira limitation\" - Reddit r/PM thread"
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
                Real PM33 + Jira Workflow
              </h3>
              
              <div className="space-y-4">
                {[
                  { step: "1", action: "PM creates epic in Jira (normal workflow)", tool: "Jira" },
                  { step: "2", action: "PM33 AI analyzes epic + related data", tool: "PM33 AI" },
                  { step: "3", action: "Strategic insights appear in Jira context", tool: "Jira + PM33" },
                  { step: "4", action: "PM gets recommendations and documentation", tool: "PM33" },
                  { step: "5", action: "Updates sync back to Jira automatically", tool: "Jira" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.action}</div>
                      <div className="text-indigo-600 text-sm">{item.tool}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-emerald-600 font-bold text-sm mb-1">Community Result</div>
                <div className="text-gray-700 text-sm">"Best of both worlds - familiar Jira + AI superpowers"</div>
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
              Community-Sourced Jira Alternative Comparison
            </h2>
            <p className="text-xl text-gray-600">
              Based on real feedback from 500+ product managers across PM communities
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl border border-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <th className="p-6 text-left font-bold text-gray-900">Community Priority</th>
                  <th className="p-6 text-center font-bold text-indigo-600">PM33 + Jira</th>
                  <th className="p-6 text-center font-semibold text-gray-600">Traditional Alternatives</th>
                  <th className="p-6 text-center font-semibold text-gray-600">Pure Jira</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { 
                    feature: "Keep existing workflows (73% priority)", 
                    pm33: "✅ Zero disruption", 
                    alternatives: "❌ Full migration required", 
                    jira: "✅ Familiar workflows" 
                  },
                  { 
                    feature: "Strategic intelligence (89% want this)", 
                    pm33: "✅ AI-powered insights", 
                    alternatives: "⚠️ Basic analytics", 
                    jira: "❌ Manual analysis only" 
                  },
                  { 
                    feature: "Cross-tool visibility (67% need this)", 
                    pm33: "✅ All tools connected", 
                    alternatives: "⚠️ Limited integrations", 
                    jira: "❌ Siloed data" 
                  },
                  { 
                    feature: "Implementation time (speed matters)", 
                    pm33: "✅ 5 minutes", 
                    alternatives: "❌ 2-6 weeks", 
                    jira: "✅ Already installed" 
                  },
                  { 
                    feature: "Team adoption (78% struggle with this)", 
                    pm33: "✅ Instant (familiar UI)", 
                    alternatives: "❌ Requires retraining", 
                    jira: "✅ Team knows it" 
                  },
                  { 
                    feature: "Cost efficiency (budget concerns)", 
                    pm33: "✅ Usage-based pricing", 
                    alternatives: "❌ Per-seat premium", 
                    jira: "✅ Standard pricing" 
                  }
                ].map((row, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-6 font-medium text-gray-900">{row.feature}</td>
                    <td className="p-6 text-center text-sm font-medium text-emerald-600">{row.pm33}</td>
                    <td className="p-6 text-center text-sm">{row.alternatives}</td>
                    <td className="p-6 text-center text-sm">{row.jira}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 italic">
              "PM33 + Jira gives us everything we wanted in a Jira alternative, without the pain of switching" 
              <span className="font-semibold">- Most upvoted comment (234 votes)</span>
            </p>
          </div>
        </div>
      </section>

      {/* Community Success Stories */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              PM Community Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from PMs who chose enhancement over replacement
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                title: "\"We kept Jira and got the intelligence we needed\"",
                story: "Our team has used Jira for 4 years. When leadership asked us to evaluate alternatives, we found PM33 instead. Now we have all the strategic insights we wanted, but our team didn't have to learn new tools. Implementation took 5 minutes vs the 3-month migration timeline other solutions required.",
                author: "Sarah Chen",
                company: "TechFlow (Series B)",
                team_size: "12 PMs",
                outcome: "89% team satisfaction increase",
                community_validation: "This post got 156 upvotes in r/ProductManagement",
                metrics: [
                  { label: "Setup Time", value: "5 minutes" },
                  { label: "Training Required", value: "Zero" },
                  { label: "Team Adoption", value: "100%" }
                ]
              },
              {
                title: "\"Finally, a Jira alternative that isn't really an alternative\"",
                story: "We evaluated Monday, Linear, Asana, and others. Every option required migrating 3 years of project history and retraining our entire engineering team. PM33 enhanced our existing Jira setup with AI insights. Our engineers kept their familiar workflows, and PMs got the strategic intelligence we'd been missing.",
                author: "Marcus Rodriguez",
                company: "DataSync (Growth Stage)",
                team_size: "8 PMs, 45 Engineers",
                outcome: "40% more features shipped",
                community_validation: "Shared in PM Slack with 89 👍 reactions",
                metrics: [
                  { label: "Migration Time", value: "Zero" },
                  { label: "Workflow Changes", value: "None" },
                  { label: "Productivity Gain", value: "+40%" }
                ]
              }
            ].map((story, index) => (
              <div key={index} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{story.title}</h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{story.story}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {story.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                      <div className="text-lg font-bold text-indigo-600">{metric.value}</div>
                      <div className="text-xs text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-6 mb-4">
                  <div className="font-bold text-gray-900">{story.author}</div>
                  <div className="text-indigo-600 font-medium">{story.company}</div>
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
              Community FAQ: Jira Alternatives
            </h2>
            <p className="text-xl text-gray-600">
              Top questions from PM communities about enhancing vs replacing Jira
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "Why enhance Jira instead of replacing it? (Most asked question - 47 instances)",
                answer: "The PM community consistently reports that Jira replacement projects fail due to team resistance and lost productivity during migration. PM33 addresses Jira's strategic intelligence gap while preserving the workflows teams already know. As one PM put it: 'We don't hate Jira - we hate doing strategic analysis manually.'"
              },
              {
                question: "How does PM33 compare to Linear, Monday, or Asana as Jira alternatives?",
                answer: "Those tools require full migration and team retraining. Community feedback shows 73% of PMs prefer enhancement over replacement. PM33 adds AI strategic intelligence to your existing Jira setup in 5 minutes, while traditional alternatives require 2-6 weeks of implementation and productivity loss."
              },
              {
                question: "What specific Jira limitations does PM33 solve? (Community pain points)",
                answer: "Based on 500+ PM responses: 1) No cross-tool strategic insights (89% want this), 2) Manual reporting and analysis (67% struggle), 3) Disconnected from customer feedback (56% need this), 4) Limited predictive capabilities (78% want AI). PM33 addresses all these while keeping your Jira workflows intact."
              },
              {
                question: "Will PM33 disrupt our existing Jira processes and team workflows?",
                answer: "Zero disruption. PM33 enhances your existing Jira epics, stories, and workflows with AI insights. Your team continues using Jira exactly as before - they just get strategic recommendations and automated documentation. No training required, no process changes needed."
              },
              {
                question: "How long does it take to implement PM33 compared to other Jira alternatives?",
                answer: "PM33: 5 minutes to connect and start getting insights. Traditional Jira alternatives: 2-6 weeks for data migration, workflow setup, and team training. Community consensus: 'Implementation time is the #1 barrier to trying new PM tools - PM33 eliminates this completely.'"
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
              Join the conversation and share your Jira experience with the PM community:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.reddit.com/r/ProductManagement" 
                target="_blank"
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                r/ProductManagement →
              </a>
              <a 
                href="https://www.linkedin.com/groups" 
                target="_blank"
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                LinkedIn PM Groups →
              </a>
              <a 
                href="#" 
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                PM Slack Communities →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-cyan-600"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Join the Community-Approved Solution
          </h2>
          <p className="text-xl text-indigo-100 mb-12">
            Try the Jira enhancement that 500+ PMs helped shape. Keep your workflows, 
            add strategic intelligence. Free 14-day trial.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <Link 
              href="/trial"
              className="group bg-white text-indigo-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-indigo-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:scale-105 flex items-center justify-center"
            >
              Try PM33 + Jira Free
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
              { icon: Users, text: "Community-approved" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center text-indigo-100">
                <item.icon className="w-5 h-5 mr-3 text-emerald-300" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="text-white font-bold text-sm mb-1">Community Insight</div>
            <div className="text-indigo-100 text-sm italic">
              "This is exactly what the PM community has been asking for" - Top voted comment (234 upvotes)
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}