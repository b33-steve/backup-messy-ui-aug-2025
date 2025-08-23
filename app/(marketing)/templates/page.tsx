import { ArrowRight, CheckCircle, Download, FileText, Users, Star, Clock, Zap, Target, TrendingUp, Lightbulb, Award } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../../../components/marketing/Navigation'
import Footer from '../../../components/marketing/Footer'

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold rounded-full mb-8">
            <FileText className="w-4 h-4 mr-2" />
            Community-Driven PM Templates
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Free PM Templates
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent block mt-2">
              Built by PMs, for PMs
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
            Skip the blank page syndrome. Our community of 2,500+ product managers has created, tested, 
            and refined these templates in real product environments. All free, no email required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="#templates"
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center transform hover:scale-105"
            >
              Browse Free Templates
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/trial"
              className="group border-2 border-indigo-300 text-indigo-700 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200 flex items-center justify-center"
            >
              <Zap className="mr-2 h-5 w-5" />
              Try AI Template Generation
            </Link>
          </div>

          {/* Template Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: FileText, stat: "50+", label: "Free Templates" },
              { icon: Users, stat: "2,500+", label: "PMs Contributing" },
              { icon: Download, stat: "25K+", label: "Downloads" },
              { icon: Star, stat: "4.9/5", label: "Community Rating" }
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

      {/* Templates Grid */}
      <section id="templates" className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Battle-Tested PM Templates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These aren't just templates—they're proven frameworks used by successful product teams. 
              Each one includes real examples, best practices, and community insights.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Strategic PRD Template",
                description: "Complete product requirements document with user stories, acceptance criteria, and business context",
                category: "Strategy & Planning",
                downloads: "5.2K",
                rating: 4.9,
                features: [
                  "Market analysis framework",
                  "User persona templates",
                  "Success metrics definition",
                  "Risk assessment section",
                  "Competitive analysis"
                ],
                author: "Sarah M., Head of Product",
                company: "Series B SaaS",
                testimonial: "Saved our team 4+ hours per PRD and improved stakeholder alignment",
                color: "from-blue-500 to-indigo-500",
                bgColor: "from-blue-50 to-indigo-50"
              },
              {
                title: "Product Roadmap Canvas",
                description: "Visual roadmap template that connects features to business outcomes and customer value",
                category: "Roadmapping",
                downloads: "4.8K", 
                rating: 4.8,
                features: [
                  "Outcome-based planning",
                  "Feature impact scoring",
                  "Timeline visualization",
                  "Stakeholder communication",
                  "Progress tracking"
                ],
                author: "Marcus R., VP Product",
                company: "Growth Startup",
                testimonial: "Transformed our quarterly planning from chaos to strategic clarity",
                color: "from-emerald-500 to-teal-500",
                bgColor: "from-emerald-50 to-teal-50"
              },
              {
                title: "Customer Interview Guide",
                description: "Structured framework for conducting customer interviews that uncover real insights",
                category: "Research",
                downloads: "6.1K",
                rating: 5.0,
                features: [
                  "Question frameworks",
                  "Bias avoidance techniques",
                  "Analysis templates",
                  "Insight synthesis",
                  "Stakeholder reporting"
                ],
                author: "Jennifer L., Senior PM",
                company: "Enterprise SaaS",
                testimonial: "Our customer insights quality improved 10x with this structured approach",
                color: "from-purple-500 to-pink-500",
                bgColor: "from-purple-50 to-pink-50"
              },
              {
                title: "Feature Prioritization Matrix",
                description: "Multi-criteria decision framework for prioritizing features based on impact and effort",
                category: "Prioritization",
                downloads: "4.3K",
                rating: 4.7,
                features: [
                  "Impact vs effort scoring",
                  "Business value assessment",
                  "Resource requirement analysis",
                  "Risk evaluation",
                  "Stakeholder buy-in framework"
                ],
                author: "David C., Chief Product Officer",
                company: "Tech Scale-up",
                testimonial: "Eliminated feature prioritization debates and aligned our entire team",
                color: "from-cyan-500 to-blue-500", 
                bgColor: "from-cyan-50 to-blue-50"
              },
              {
                title: "User Story Writing Kit",
                description: "Complete guide for writing effective user stories with examples and acceptance criteria",
                category: "Agile & Development",
                downloads: "3.9K",
                rating: 4.6,
                features: [
                  "User story templates",
                  "Acceptance criteria patterns",
                  "Edge case identification",
                  "Definition of Done",
                  "Backlog organization"
                ],
                author: "Lisa K., Agile PM",
                company: "DevTech Company",
                testimonial: "Our development velocity increased 30% with clearer user stories",
                color: "from-orange-500 to-red-500",
                bgColor: "from-orange-50 to-red-50"
              },
              {
                title: "Competitive Analysis Framework",
                description: "Systematic approach to analyzing competitors and identifying market opportunities",
                category: "Market Intelligence", 
                downloads: "3.2K",
                rating: 4.8,
                features: [
                  "Competitor profiling",
                  "Feature comparison matrix",
                  "Market positioning map",
                  "Threat assessment",
                  "Opportunity identification"
                ],
                author: "Amanda T., Product Strategy",
                company: "B2B Platform",
                testimonial: "Helped us identify a $2M market gap our competitors missed",
                color: "from-violet-500 to-purple-500",
                bgColor: "from-violet-50 to-purple-50"
              }
            ].map((template, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${template.color} rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform opacity-10`}></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-200 h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${template.bgColor} text-gray-700 text-xs font-semibold rounded-full mb-3`}>
                        {template.category}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{template.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{template.description}</p>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-gray-900 mb-3">What's Included:</div>
                    <div className="space-y-2">
                      {template.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center">
                      <Download className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-sm font-medium text-gray-700">{template.downloads}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium text-gray-700">{template.rating}</span>
                    </div>
                  </div>
                  
                  {/* Testimonial */}
                  <div className={`bg-gradient-to-r ${template.bgColor} p-4 rounded-xl border border-gray-200 mb-6`}>
                    <div className="text-sm text-gray-700 italic mb-2">"{template.testimonial}"</div>
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">{template.author}</span>, {template.company}
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <button className={`w-full bg-gradient-to-r ${template.color} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 group-hover:shadow-xl flex items-center justify-center`}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Free Template
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* AI Template Generation CTA */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-10 rounded-3xl border border-indigo-200 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need a Custom Template? Let AI Create It for You
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                PM33's AI can generate custom templates tailored to your specific product, team, and business context. 
                Get personalized frameworks that fit your exact needs in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/trial"
                  className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Try AI Template Generator
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/features"
                  className="group border-2 border-indigo-300 text-indigo-700 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200 flex items-center justify-center"
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  See AI Features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Contribution */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Built by the PM Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every template comes from real product teams solving real problems. 
              Join the community that's making product management better for everyone.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                title: "Community-Sourced",
                icon: Users,
                description: "Templates created and tested by PMs from startups to Fortune 500",
                stats: "2,500+ contributors"
              },
              {
                title: "Battle-Tested",
                icon: Award, 
                description: "Each template has been used in real product environments with proven results",
                stats: "25,000+ downloads"
              },
              {
                title: "Always Updated",
                icon: TrendingUp,
                description: "Community feedback keeps templates current with evolving PM best practices",
                stats: "Monthly updates"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="text-indigo-600 font-bold text-lg">{item.stats}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Have a Template to Share?
              </h3>
              <p className="text-gray-600 mb-6">
                Help other PMs by sharing your proven templates and frameworks. 
                Get community recognition and help improve product management for everyone.
              </p>
              <a 
                href="mailto:community@pm33.ai" 
                className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <FileText className="w-4 h-4 mr-2" />
                Submit Your Template
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}