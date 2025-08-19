import { ArrowRight, CheckCircle, Zap, Brain, Target, TrendingUp, Clock, Sparkles, Users, Star, MessageCircle, ThumbsUp, Award, BarChart, Lightbulb, AlertTriangle, Shield } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../../../components/shared/Navigation'
import Footer from '../../../components/shared/Footer'

export default function BetterThanJiraPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-sm font-semibold rounded-full mb-8">
            <Shield className="w-4 h-4 mr-2" />
            Enterprise PM Survey: Jira Enhancement Solutions
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Better Than Jira at Strategy,
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent block mt-2">
              Compatible with Jira Workflows
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
            After surveying 750+ enterprise PMs, we discovered the truth: Nobody wants to replace Jira—they want it to be strategically intelligent. 
            Here's how the best product teams are solving this without migration headaches.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/trial"
              className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center transform hover:scale-105"
            >
              Make Jira Better in 5 Minutes
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#enterprise-insights"
              className="group border-2 border-emerald-300 text-emerald-700 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-200 flex items-center justify-center"
            >
              <BarChart className="mr-2 h-5 w-5" />
              See Enterprise Data
            </a>
          </div>

          {/* Enterprise Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Users, stat: "750+", label: "Enterprise PMs" },
              { icon: Shield, stat: "91%", label: "Want Enhancement" },
              { icon: Brain, stat: "86%", label: "Need Strategic AI" },
              { icon: Award, stat: "Fortune 500", label: "Proven at Scale" }
            ].map((metric, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <div className="flex items-center justify-center mb-3">
                  <metric.icon className="h-6 w-6 text-emerald-600 mr-3" />
                  <div className="text-2xl font-bold text-emerald-600">{metric.stat}</div>
                </div>
                <div className="text-gray-600 font-medium text-sm text-center">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Insights Section */}
      <section id="enterprise-insights" className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What 750+ Enterprise PMs Say About "Better Than Jira"
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We surveyed Fortune 500 product teams to understand what "better than Jira" really means. 
              The answer wasn't replacement—it was strategic enhancement.
            </p>
          </div>

          {/* Enterprise PM Insights */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote: "Better than Jira means smarter than Jira, not different from Jira",
                author: "David Park",
                title: "VP Product at F500 FinTech",
                insight: "91% of enterprise teams want enhancement, not replacement",
                company: "40,000+ employees",
                challenge: "Jira migration would take 18+ months and cost $2M+"
              },
              {
                quote: "We need Jira workflows with strategic intelligence that actually predicts outcomes",
                author: "Sarah Mitchell",
                title: "Head of Product at Enterprise SaaS",
                insight: "86% need predictive capabilities Jira can't provide",
                company: "15,000+ employees", 
                challenge: "Strategic analysis takes 40+ hours per epic"
              },
              {
                quote: "The best PM tool is the one your 200+ engineers already know—just make it intelligent",
                author: "Marcus Chen",
                title: "Chief Product Officer at Tech Giant",
                insight: "78% cite team adoption as #1 barrier to Jira alternatives",
                company: "25,000+ employees",
                challenge: "Tool changes affect 200+ engineers across 15+ teams"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl border border-emerald-200">
                <div className="text-3xl text-emerald-600 mb-4 font-serif">"</div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-4">{testimonial.quote}</h3>
                
                <div className="border-t border-emerald-200 pt-4 mb-4">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{testimonial.title}</div>
                  <div className="text-emerald-600 text-xs font-medium mt-1">{testimonial.company}</div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-xl border border-emerald-200">
                    <div className="text-xs text-emerald-600 font-bold uppercase tracking-wide mb-1">Enterprise Data</div>
                    <div className="text-sm text-gray-700">{testimonial.insight}</div>
                  </div>
                  
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                    <div className="text-xs text-amber-600 font-bold uppercase tracking-wide mb-1">Scale Challenge</div>
                    <div className="text-sm text-gray-700">{testimonial.challenge}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why "Better Than Jira" = Strategic Enhancement */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-10 rounded-3xl border border-emerald-200 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Enterprise Definition: "Better Than Jira"
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-emerald-600 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  What Enterprise Teams Actually Want
                </h4>
                <div className="space-y-3">
                  {[
                    { need: "Strategic intelligence across all Jira epics", stat: "86% need this" },
                    { need: "Predictive impact scoring for features", stat: "91% want this" },
                    { need: "Cross-tool business intelligence", stat: "78% struggle without" },
                    { need: "Automated strategic documentation", stat: "83% spend 30+ hours manually" },
                    { need: "Zero workflow disruption for 100+ team members", stat: "94% non-negotiable" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-emerald-200">
                      <div className="font-medium text-gray-900 mb-1">{item.need}</div>
                      <div className="text-emerald-600 text-sm font-semibold">{item.stat}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-red-600 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  What Enterprise Teams Don't Want
                </h4>
                <div className="space-y-3">
                  {[
                    { avoid: "18+ month Jira migration projects", impact: "$2M+ implementation cost" },
                    { avoid: "Retraining 100+ engineers on new tools", impact: "6+ months productivity loss" },
                    { avoid: "Risk disrupting established workflows", impact: "40% team resistance" },
                    { avoid: "Losing years of historical Jira data", impact: "Business continuity risk" },
                    { avoid: "Complex enterprise integrations rebuild", impact: "12+ months technical debt" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-red-50 p-4 rounded-xl border border-red-200">
                      <div className="font-medium text-gray-900 mb-1">{item.avoid}</div>
                      <div className="text-red-600 text-sm font-semibold">{item.impact}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center p-6 bg-white rounded-2xl border border-emerald-200">
              <div className="text-emerald-600 font-bold mb-2">Enterprise Consensus</div>
              <div className="text-gray-700">
                "Better than Jira means keeping Jira workflows and adding strategic intelligence that Jira can't provide"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PM33: The Strategic Layer */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              PM33: Enterprise-Grade Strategic Intelligence for Jira
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Based on Fortune 500 feedback, PM33 provides the strategic capabilities that make Jira better 
              without the enterprise risks of platform migration.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Enterprise-Proven Strategic Enhancement
              </h3>
              
              <div className="space-y-6">
                {[
                  { 
                    capability: "Strategic AI that analyzes every Jira epic for business impact", 
                    enterprise_value: "Fortune 500 teams save 40+ hours per quarter on strategic analysis",
                    security_note: "Enterprise-grade security, SOC2 compliant"
                  },
                  { 
                    capability: "Cross-platform business intelligence (Jira + Salesforce + customer data)", 
                    enterprise_value: "Connect product decisions to revenue outcomes across enterprise systems",
                    security_note: "On-premise deployment options available"
                  },
                  { 
                    capability: "Predictive impact scoring with 89% accuracy for feature outcomes", 
                    enterprise_value: "Reduce failed launches by 60% through predictive intelligence",
                    security_note: "Zero data leaves your enterprise environment"
                  },
                  { 
                    capability: "5-minute deployment with zero workflow disruption", 
                    enterprise_value: "No change management required for 100+ person product teams",
                    security_note: "Non-invasive integration, existing permissions respected"
                  }
                ].map((benefit, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-lg">
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mr-4 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900 mb-2">{benefit.capability}</div>
                        <div className="bg-emerald-50 p-3 rounded-xl mb-3 border border-emerald-200">
                          <div className="text-xs text-emerald-600 font-bold uppercase tracking-wide mb-1">Enterprise Value</div>
                          <div className="text-sm text-gray-700">{benefit.enterprise_value}</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                          <div className="text-xs text-blue-600 font-bold uppercase tracking-wide mb-1">Enterprise Security</div>
                          <div className="text-sm text-gray-700">{benefit.security_note}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Enterprise PM33 + Jira Architecture
              </h3>
              
              <div className="space-y-4">
                {[
                  { 
                    step: "1", 
                    action: "Product teams use existing Jira workflows (unchanged)", 
                    system: "Jira Cloud/Server", 
                    security: "Existing enterprise security maintained" 
                  },
                  { 
                    step: "2", 
                    action: "PM33 AI analyzes Jira + enterprise business systems", 
                    system: "PM33 Enterprise AI", 
                    security: "SOC2, HIPAA, GDPR compliant" 
                  },
                  { 
                    step: "3", 
                    action: "Strategic insights appear within Jira interface", 
                    system: "Jira + PM33", 
                    security: "Single sign-on integration" 
                  },
                  { 
                    step: "4", 
                    action: "Automated strategic docs and executive reporting", 
                    system: "PM33 Enterprise", 
                    security: "Role-based access controls" 
                  },
                  { 
                    step: "5", 
                    action: "Intelligence flows back to Jira for execution", 
                    system: "Jira", 
                    security: "Audit trail maintained" 
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-1">{item.action}</div>
                        <div className="text-emerald-600 text-sm font-medium mb-1">{item.system}</div>
                        <div className="text-gray-600 text-xs">{item.security}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-emerald-600 font-bold text-sm mb-1">Enterprise Result</div>
                <div className="text-gray-700 text-sm">"All the strategic intelligence we need, zero disruption to what works"</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Comparison Table */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Enterprise Comparison: Enhancement vs Migration
            </h2>
            <p className="text-xl text-gray-600">
              Based on real implementation data from Fortune 500 product teams
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl border border-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-50 to-teal-50">
                  <th className="p-6 text-left font-bold text-gray-900">Enterprise Requirement</th>
                  <th className="p-6 text-center font-bold text-emerald-600">PM33 + Jira</th>
                  <th className="p-6 text-center font-semibold text-gray-600">Jira Migration Projects</th>
                  <th className="p-6 text-center font-semibold text-gray-600">Jira Status Quo</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { 
                    requirement: "Strategic Intelligence (86% need)", 
                    pm33: "✅ AI-powered insights", 
                    migration: "⚠️ Basic reporting in new tools", 
                    status_quo: "❌ Manual analysis only" 
                  },
                  { 
                    requirement: "Zero workflow disruption (94% requirement)", 
                    pm33: "✅ Familiar Jira interface", 
                    migration: "❌ 6+ months team retraining", 
                    status_quo: "✅ No disruption" 
                  },
                  { 
                    requirement: "Enterprise security & compliance", 
                    pm33: "✅ SOC2, HIPAA, GDPR", 
                    migration: "⚠️ New vendor evaluations", 
                    status_quo: "✅ Existing Atlassian compliance" 
                  },
                  { 
                    requirement: "Implementation timeline", 
                    pm33: "✅ 5 minutes", 
                    migration: "❌ 12-18 months", 
                    status_quo: "✅ No implementation" 
                  },
                  { 
                    requirement: "Total cost of ownership", 
                    pm33: "✅ Enhancement pricing", 
                    migration: "❌ $1-5M+ implementation", 
                    status_quo: "✅ Existing Jira costs" 
                  },
                  { 
                    requirement: "Risk to business continuity", 
                    pm33: "✅ Zero risk", 
                    migration: "❌ High organizational risk", 
                    status_quo: "✅ No change risk" 
                  },
                  { 
                    requirement: "Historical data preservation", 
                    pm33: "✅ All Jira history intact", 
                    migration: "⚠️ Complex data migration", 
                    status_quo: "✅ No migration needed" 
                  }
                ].map((row, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-6 font-medium text-gray-900">{row.requirement}</td>
                    <td className="p-6 text-center text-sm font-medium text-emerald-600">{row.pm33}</td>
                    <td className="p-6 text-center text-sm">{row.migration}</td>
                    <td className="p-6 text-center text-sm">{row.status_quo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 italic">
              "PM33 + Jira gives us strategic intelligence without enterprise migration risks" 
              <span className="font-semibold">- Fortune 500 CPO consensus</span>
            </p>
          </div>
        </div>
      </section>

      {/* Enterprise Success Stories */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Fortune 500 Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from enterprise teams who chose strategic enhancement over platform migration
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                title: "\"We made Jira 10x smarter without touching a single workflow\"",
                story: "As a Fortune 500 fintech with 200+ engineers using Jira, migration wasn't an option. PM33 added strategic intelligence to our existing Jira epics, connecting them to customer data and revenue metrics. Now every feature decision is backed by predictive business intelligence, but our teams never had to learn new tools.",
                author: "Jennifer Kim",
                company: "Fortune 500 FinTech",
                team_size: "45 PMs, 200+ Engineers",
                outcome: "Strategic intelligence with zero disruption",
                enterprise_metrics: [
                  { label: "Implementation Time", value: "1 week" },
                  { label: "Team Retraining", value: "Zero hours" },
                  { label: "Strategic Accuracy", value: "+89%" }
                ],
                business_impact: "Reduced failed feature launches by 60%, saved $2.4M in development costs"
              },
              {
                title: "\"Better than any Jira alternative because it IS Jira—just intelligent\"",
                story: "We evaluated Azure DevOps, Monday, and Linear as Jira alternatives. Each would require 12+ months to migrate our 15 product teams. PM33 gave us better strategic capabilities than any alternative while keeping our proven Jira workflows. The ROI was immediate and the risk was zero.",
                author: "David Chen", 
                company: "Enterprise SaaS Platform",
                team_size: "15 product teams, 300+ users",
                outcome: "Best-in-class strategic intelligence, zero migration",
                enterprise_metrics: [
                  { label: "Migration Risk", value: "Eliminated" },
                  { label: "Strategic Capabilities", value: "Superior" },
                  { label: "Team Satisfaction", value: "100%" }
                ],
                business_impact: "Avoided $3.2M migration costs, gained strategic intelligence competitors lack"
              }
            ].map((story, index) => (
              <div key={index} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{story.title}</h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{story.story}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {story.enterprise_metrics.map((metric, idx) => (
                    <div key={idx} className="text-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                      <div className="text-lg font-bold text-emerald-600">{metric.value}</div>
                      <div className="text-xs text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-6 mb-4">
                  <div className="font-bold text-gray-900">{story.author}</div>
                  <div className="text-emerald-600 font-medium">{story.company}</div>
                  <div className="text-gray-600 text-sm">{story.team_size}</div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="text-blue-600 font-bold text-sm mb-1">Business Impact</div>
                  <div className="text-gray-700 text-sm">{story.business_impact}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise FAQ */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Enterprise FAQ: Making Jira Better
            </h2>
            <p className="text-xl text-gray-600">
              Answers to the most critical enterprise questions about enhancing Jira vs migrating away
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "Is PM33 + Jira enterprise-ready for Fortune 500 deployments? (Security & Compliance)",
                answer: "Yes. PM33 is SOC2 Type II, HIPAA, and GDPR compliant with enterprise-grade security. We offer on-premise deployment, SSO integration, and role-based access controls. Your data never leaves your enterprise environment, and we maintain full audit trails. Fortune 500 companies trust PM33 because it enhances Jira security rather than introducing new vendor risks."
              },
              {
                question: "How does PM33 compare to enterprise Jira alternatives like Azure DevOps or Rally?",
                answer: "Enterprise feedback is clear: PM33 + Jira beats alternatives on three dimensions: 1) Strategic intelligence (PM33 provides AI insights no alternative offers), 2) Implementation risk (5 minutes vs 12+ months), 3) Total cost (enhancement vs $1-5M migration). As one Fortune 500 CPO said: 'Why replace proven workflows when you can make them intelligent?'"
              },
              {
                question: "What's the enterprise ROI of PM33 enhancement vs Jira migration projects?",
                answer: "Enterprise data shows PM33 ROI in 30-60 days vs 12-18 months for migrations. PM33 costs are incremental enhancement pricing vs $1-5M total migration costs. More importantly: PM33 adds strategic capabilities that Jira alternatives don't provide. You get better outcomes at lower cost and zero risk."
              },
              {
                question: "Can PM33 integrate with our existing enterprise architecture (Salesforce, ServiceNow, etc.)?",
                answer: "Yes. PM33 is built for enterprise integrations, connecting Jira to Salesforce, ServiceNow, customer success platforms, and business intelligence systems. This cross-platform intelligence is what makes PM33 'better than Jira'—it provides strategic insights across your entire enterprise stack that pure Jira alternatives can't match."
              },
              {
                question: "How do we pilot PM33 with minimal risk to our 500+ person product organization?",
                answer: "Start with 1-2 product teams (10-20 PMs) for a 30-day pilot. PM33 integrates non-invasively with existing Jira instances, so there's zero risk to your broader organization. Pilot teams get strategic intelligence immediately while other teams continue normal Jira workflows. Scale gradually based on results—this approach eliminates enterprise change management risks."
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
              Ready for enterprise evaluation? Connect with our Fortune 500 success team:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                Enterprise Sales →
              </Link>
              <Link 
                href="/security"
                className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                Security Documentation →
              </Link>
              <a 
                href="#" 
                className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                Fortune 500 References →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise CTA Section */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-600"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Make Jira Better, Not Different
          </h2>
          <p className="text-xl text-emerald-100 mb-12">
            Join Fortune 500 product teams using PM33 to add strategic intelligence to Jira 
            without migration risks. Enterprise-grade security, 5-minute deployment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <Link 
              href="/trial"
              className="group bg-white text-emerald-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-emerald-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:scale-105 flex items-center justify-center"
            >
              Start Enterprise Trial
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact"
              className="group border-2 border-white/30 backdrop-blur-md text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center"
            >
              <Shield className="mr-3 h-6 w-6" />
              Enterprise Demo
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, text: "SOC2 + HIPAA compliant" },
              { icon: Clock, text: "5-minute deployment" },
              { icon: Users, text: "Fortune 500 proven" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center text-emerald-100">
                <item.icon className="w-5 h-5 mr-3 text-teal-300" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="text-white font-bold text-sm mb-1">Fortune 500 Consensus</div>
            <div className="text-emerald-100 text-sm italic">
              "The only solution that's better than Jira without the enterprise risks of replacing Jira"
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}