import { ArrowRight, CheckCircle, Users, Target, Lightbulb, Heart, Sparkles, Building2, Award, Clock } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../../../components/shared/Navigation'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold rounded-full mb-8">
                <Sparkles className="w-4 h-4 mr-2" />
                Our Story & Mission
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Built by PMs,
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent block mt-2">
                  For PMs
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                We're product managers who got tired of spending 80% of our time on busywork instead of strategy. 
                So we built the AI assistant we always wanted - one that enhances your existing tools instead of replacing them.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {[
                  { icon: Users, stat: "2,500+", label: "PMs using PM33" },
                  { icon: Clock, stat: "72hrs", label: "Saved per PM monthly" },
                  { icon: Target, stat: "40%", label: "More features shipped" },
                  { icon: Award, stat: "89%", label: "Team satisfaction" }
                ].map((metric, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex items-center mb-3">
                      <metric.icon className="h-6 w-6 text-indigo-600 mr-3" />
                      <div className="text-3xl font-bold text-indigo-600">{metric.stat}</div>
                    </div>
                    <div className="text-gray-600 font-medium">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-200">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Building2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Founded in 2024</h3>
                  <p className="text-gray-600">By product managers, for product managers</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                    <span>Remote-first team across 3 continents</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                    <span>Backed by experienced PM leaders</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                    <span>Community-driven development approach</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              To free product managers from busywork so they can focus on what matters most: strategic thinking and customer impact.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                icon: Heart,
                title: "PM-First Approach",
                description: "Every feature is designed by product managers who understand the daily challenges of the role. We don't build for engineers or marketers - we build for PMs."
              },
              {
                icon: Target,
                title: "Enhancement Philosophy", 
                description: "We believe in making your existing tools smarter, not forcing you to abandon workflows that already work. Integration over replacement, always."
              },
              {
                icon: Lightbulb,
                title: "Community-Driven Innovation",
                description: "Our roadmap is shaped by the PM community. Every feature request, every use case, every workflow optimization comes from real PMs doing real work."
              }
            ].map((value, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                The Story Behind PM33
              </h2>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong>The frustration was real.</strong> As senior PMs at fast-growing startups, we were spending 
                  4+ hours daily on documentation, status updates, and data synthesis instead of customer research 
                  and strategic planning.
                </p>
                
                <p>
                  We tried every PM tool on the market. Each promised to solve our problems, but they all had the 
                  same fatal flaw: <strong>they wanted us to abandon our existing workflows</strong> and migrate 
                  everything to their platform.
                </p>
                
                <p>
                  That's when we realized the solution wasn't another PM tool - it was an <strong>AI layer that 
                  makes existing tools smarter</strong>. Why force teams to learn new systems when you can enhance 
                  the ones they already know?
                </p>
                
                <p>
                  Six months later, PM33 was born. Today, over 2,500 product managers use it to reclaim 70+ hours 
                  monthly for strategic work.
                </p>
              </div>
              
              <div className="mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="text-lg font-semibold text-indigo-600 mb-3">"Our North Star"</div>
                <blockquote className="text-gray-700 italic text-xl leading-relaxed">
                  "Every hour we save a PM from busywork is an hour they can spend understanding their customers better."
                </blockquote>
                <div className="text-gray-600 font-medium mt-4">— PM33 Founding Team</div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Before PM33</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span>4+ hours daily on documentation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span>Scattered data across 8+ tools</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span>Manual synthesis and reporting</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span>Strategic time: 20% of day</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">After PM33</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                    <span>15 minutes for comprehensive PRDs</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                    <span>Unified intelligence across all tools</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                    <span>AI-powered insights and recommendations</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                    <span>Strategic time: 70% of day</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              How We Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our values shape every product decision and customer interaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "PM Empathy",
                description: "We're all practicing PMs. Every decision comes from real experience managing products and teams."
              },
              {
                title: "No BS Approach", 
                description: "Clear communication, honest pricing, no hidden fees. We say what we mean and deliver what we promise."
              },
              {
                title: "Community First",
                description: "The PM community shapes our roadmap. We build what PMs actually need, not what we think they should want."
              },
              {
                title: "Continuous Learning",
                description: "Product management evolves fast. We stay current with the latest frameworks, tools, and methodologies."
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
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
            Join the PM Community Revolution
          </h2>
          <p className="text-xl text-indigo-100 mb-12">
            Be part of the movement that's freeing product managers from busywork. 
            Start your transformation today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <Link 
              href="/trial"
              className="group bg-white text-indigo-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-indigo-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:scale-105 flex items-center justify-center"
            >
              Start Your Free Trial
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact"
              className="group border-2 border-white/30 backdrop-blur-md text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center"
            >
              Get in Touch
            </Link>
          </div>
          
          <p className="text-indigo-200">
            Join 2,500+ product managers who've already made the switch
          </p>
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
                Built by PMs, for PMs. Enhancing your existing tools with AI intelligence.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Product</h4>
              <div className="space-y-4 text-gray-400">
                <Link href="/features" className="block hover:text-indigo-400 transition-colors">Features</Link>
                <Link href="/pricing" className="block hover:text-indigo-400 transition-colors">Pricing</Link>
                <Link href="/templates" className="block hover:text-indigo-400 transition-colors">Templates</Link>
                <Link href="/security" className="block hover:text-indigo-400 transition-colors">Security</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Company</h4>
              <div className="space-y-4 text-gray-400">
                <Link href="/about" className="block hover:text-indigo-400 transition-colors">About</Link>
                <Link href="/contact" className="block hover:text-indigo-400 transition-colors">Contact</Link>
                <Link href="/privacy" className="block hover:text-indigo-400 transition-colors">Privacy</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Connect</h4>
              <div className="space-y-4 text-gray-400">
                <div className="hover:text-indigo-400 transition-colors">PM Community</div>
                <div className="hover:text-indigo-400 transition-colors">LinkedIn</div>
                <div className="hover:text-indigo-400 transition-colors">Twitter</div>
                <div className="hover:text-indigo-400 transition-colors">Newsletter</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PM33. Built with ❤️ by the PM community, for the PM community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}