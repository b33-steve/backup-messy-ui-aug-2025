import { ArrowRight, CheckCircle, Shield, Lock, Eye, FileText, Globe, Users, AlertTriangle, Trash2, Download, Settings } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../../../components/marketing/Navigation'
import Footer from '../../../components/marketing/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-sm font-semibold rounded-full mb-8">
            <Shield className="w-4 h-4 mr-2" />
            Privacy-First Product Intelligence
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Privacy Policy
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent block mt-2">
              Transparent & User-Controlled
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
            Your product data and insights belong to you. PM33's privacy policy is designed to give you 
            complete control over your information with the transparency you deserve.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="#data-practices"
              className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center transform hover:scale-105"
            >
              Read Our Data Practices
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact"
              className="group border-2 border-emerald-300 text-emerald-700 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-200 flex items-center justify-center"
            >
              <FileText className="mr-2 h-5 w-5" />
              Contact Privacy Team
            </Link>
          </div>

          {/* Privacy Principles */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Users, label: "You Own Your Data", description: "Complete ownership and control" },
              { icon: Eye, label: "Full Transparency", description: "Clear, honest communication" },
              { icon: Lock, label: "Minimal Collection", description: "Only what's necessary" },
              { icon: Trash2, label: "Easy Deletion", description: "Delete anytime, completely" }
            ].map((principle, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <div className="flex flex-col items-center text-center">
                  <principle.icon className="h-8 w-8 text-emerald-600 mb-3" />
                  <div className="text-lg font-bold text-gray-900 mb-2">{principle.label}</div>
                  <div className="text-gray-600 text-sm">{principle.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Collection & Use */}
      <section id="data-practices" className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Data We Collect & Why
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in radical transparency. Here's exactly what information PM33 collects, 
              why we need it, and how we protect it.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                category: "Account Information",
                icon: Users,
                color: "from-blue-500 to-indigo-500",
                bgColor: "from-blue-50 to-indigo-50",
                purpose: "To create and manage your PM33 account",
                data_collected: [
                  "Email address (required for login and communication)",
                  "Name (for personalization and team collaboration)",
                  "Company name (for workspace organization)",
                  "Job title (for relevant feature recommendations)"
                ],
                data_use: [
                  "Account authentication and access control",
                  "Product updates and security notifications", 
                  "Customer support and troubleshooting",
                  "Feature personalization based on role"
                ],
                retention: "Until account deletion or 7 years after last activity",
                user_control: "Full control - view, edit, or delete anytime"
              },
              {
                category: "Product Data",
                icon: FileText,
                color: "from-emerald-500 to-teal-500",
                bgColor: "from-emerald-50 to-teal-50",
                purpose: "To provide AI-powered product intelligence and insights",
                data_collected: [
                  "Product requirements and documentation you create",
                  "Customer feedback and research data you upload",
                  "Business metrics and goals you define",
                  "Team collaboration and decision records"
                ],
                data_use: [
                  "Generate AI insights and recommendations",
                  "Create automated documentation and reports",
                  "Provide predictive analytics and impact scoring",
                  "Enable team collaboration features"
                ],
                retention: "Until you delete it - no automatic deletion",
                user_control: "Complete ownership - export or delete all data anytime"
              },
              {
                category: "Usage Analytics",
                icon: Eye,
                color: "from-purple-500 to-pink-500",
                bgColor: "from-purple-50 to-pink-50",
                purpose: "To improve PM33's performance and user experience",
                data_collected: [
                  "Feature usage patterns (which tools you use most)",
                  "Performance metrics (page load times, error rates)",
                  "General workflow patterns (not specific content)",
                  "Device and browser information"
                ],
                data_use: [
                  "Identify and fix performance issues",
                  "Understand which features provide the most value",
                  "Improve user interface and experience",
                  "Optimize AI model performance"
                ],
                retention: "Aggregated data: 2 years, Individual data: 90 days",
                user_control: "Opt-out available - disable analytics tracking"
              }
            ].map((section, index) => (
              <div key={index} className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${section.color} rounded-3xl transform rotate-0.5 opacity-5`}></div>
                <div className="relative bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
                  {/* Header */}
                  <div className="flex items-center mb-8">
                    <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-2xl flex items-center justify-center mr-4`}>
                      <section.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{section.category}</h3>
                      <p className="text-gray-600">{section.purpose}</p>
                    </div>
                  </div>
                  
                  {/* Content Grid */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className={`bg-gradient-to-r ${section.bgColor} p-6 rounded-2xl border border-gray-200`}>
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                          <Download className="w-4 h-4 mr-2" />
                          What We Collect
                        </h4>
                        <div className="space-y-2">
                          {section.data_collected.map((item, idx) => (
                            <div key={idx} className="flex items-start text-sm text-gray-700">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className={`bg-gradient-to-r ${section.bgColor} p-6 rounded-2xl border border-gray-200`}>
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                          <Settings className="w-4 h-4 mr-2" />
                          How We Use It
                        </h4>
                        <div className="space-y-2">
                          {section.data_use.map((item, idx) => (
                            <div key={idx} className="flex items-start text-sm text-gray-700">
                              <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-2 text-amber-600" />
                          Retention Period
                        </h4>
                        <p className="text-gray-700 text-sm">{section.retention}</p>
                      </div>
                      
                      <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                          <Users className="w-4 h-4 mr-2 text-emerald-600" />
                          Your Control
                        </h4>
                        <p className="text-gray-700 text-sm">{section.user_control}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Rights */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Your Privacy Rights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're in California, Europe, or anywhere else, you have fundamental rights 
              over your personal information. We make exercising these rights simple and fast.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                title: "Access & Portability Rights",
                icon: Download,
                color: "from-blue-500 to-indigo-500",
                rights: [
                  {
                    right: "Right to Know",
                    description: "See exactly what personal information we have about you",
                    action: "Request via privacy dashboard"
                  },
                  {
                    right: "Right to Access",
                    description: "Download a complete copy of all your data",
                    action: "One-click export available"
                  },
                  {
                    right: "Right to Portability", 
                    description: "Export your data in standard formats (JSON, CSV)",
                    action: "Self-service export tools"
                  }
                ]
              },
              {
                title: "Control & Deletion Rights",
                icon: Trash2,
                color: "from-red-500 to-pink-500",
                rights: [
                  {
                    right: "Right to Correct",
                    description: "Update or correct any personal information",
                    action: "Edit directly in account settings"
                  },
                  {
                    right: "Right to Delete",
                    description: "Permanently delete all your personal data",
                    action: "Account deletion available anytime"
                  },
                  {
                    right: "Right to Restrict",
                    description: "Limit how we process your information",
                    action: "Granular privacy controls"
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
                    <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {section.rights.map((right, idx) => (
                      <div key={idx} className="border border-gray-200 p-4 rounded-xl">
                        <div className="font-semibold text-gray-900 mb-2">{right.right}</div>
                        <div className="text-gray-600 text-sm mb-3">{right.description}</div>
                        <div className="text-emerald-600 font-medium text-sm">
                          ✓ {right.action}
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

      {/* Data Sharing & Third Parties */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Data Sharing & Third Parties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don't sell your data, period. Here's our complete list of when and why 
              we might share information with third parties.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Service Providers",
                icon: Settings,
                description: "Essential services that help PM33 operate securely and efficiently",
                examples: [
                  "Cloud infrastructure (AWS, encrypted)",
                  "Email delivery (for notifications)",
                  "Payment processing (tokenized)",
                  "Security monitoring (anonymized logs)"
                ],
                safeguards: [
                  "Contractual data protection agreements",
                  "Regular security audits",
                  "Minimal data access principles",
                  "Industry-standard encryption"
                ]
              },
              {
                title: "Legal Requirements",
                icon: FileText,
                description: "Situations where we're legally required to share information",
                examples: [
                  "Valid legal subpoenas",
                  "Court orders",
                  "Government investigations",
                  "National security requests"
                ],
                safeguards: [
                  "Strict legal review process", 
                  "Challenge invalid requests",
                  "Notify users when legally permitted",
                  "Transparency reporting"
                ]
              },
              {
                title: "Business Transfers",
                icon: ArrowRight,
                description: "If PM33 is acquired or merged (highly unlikely scenario)",
                examples: [
                  "Merger or acquisition",
                  "Asset sale",
                  "Bankruptcy proceedings",
                  "Corporate restructuring"
                ],
                safeguards: [
                  "User notification requirement",
                  "Same privacy protections maintained",
                  "Option to delete data before transfer",
                  "Regulatory approval where required"
                ]
              }
            ].map((scenario, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-3xl border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                    <scenario.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{scenario.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{scenario.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-gray-900 mb-2 text-sm">When This Happens:</div>
                    <div className="space-y-1">
                      {scenario.examples.map((example, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                          <span>{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-semibold text-gray-900 mb-2 text-sm">Your Protections:</div>
                    <div className="space-y-1">
                      {scenario.safeguards.map((safeguard, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-emerald-500 mr-2 flex-shrink-0" />
                          <span>{safeguard}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-200 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              What We Never Do
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Sell your personal data to advertisers",
                "Share product insights with competitors",
                "Use your data to train public AI models"
              ].map((never, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-emerald-200">
                  <div className="text-red-500 font-bold mb-2">❌ Never</div>
                  <div className="text-gray-700 text-sm">{never}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Policy */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Cookie Policy
            </h2>
            <p className="text-xl text-gray-600">
              We use minimal cookies, only for essential functionality. No tracking, no advertising.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                category: "Essential Cookies",
                required: true,
                description: "Necessary for PM33 to function properly",
                examples: [
                  "Authentication tokens (keep you logged in)",
                  "Security tokens (prevent unauthorized access)", 
                  "Session management (maintain your workspace state)",
                  "Preference storage (remember your settings)"
                ],
                duration: "Session-based or 30 days maximum",
                control: "Cannot be disabled - required for service"
              },
              {
                category: "Analytics Cookies",
                required: false,
                description: "Help us understand how PM33 is used to improve performance",
                examples: [
                  "Page view tracking (which features are most useful)",
                  "Error logging (identify and fix issues)",
                  "Performance monitoring (optimize load times)",
                  "Feature usage patterns (improve user experience)"
                ],
                duration: "90 days maximum",
                control: "Fully optional - opt-out available in settings"
              }
            ].map((cookie, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{cookie.category}</h3>
                    <p className="text-gray-600">{cookie.description}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    cookie.required 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {cookie.required ? 'Required' : 'Optional'}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="font-semibold text-gray-900 mb-2 text-sm">Examples:</div>
                    <div className="space-y-1">
                      {cookie.examples.map((example, idx) => (
                        <div key={idx} className="text-sm text-gray-600">• {example}</div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-semibold text-gray-900 mb-2 text-sm">Duration:</div>
                    <div className="text-sm text-gray-600">{cookie.duration}</div>
                  </div>
                  
                  <div>
                    <div className="font-semibold text-gray-900 mb-2 text-sm">Your Control:</div>
                    <div className="text-sm text-gray-600">{cookie.control}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-teal-50 p-6 rounded-2xl border border-teal-200">
              <h3 className="font-bold text-gray-900 mb-2">Cookie Settings</h3>
              <p className="text-gray-600 text-sm mb-4">
                Manage your cookie preferences and opt-out of optional tracking
              </p>
              <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-200">
                Manage Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Updates */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Privacy Questions & Updates
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            We're committed to transparency and continuous improvement of our privacy practices. 
            Here's how to stay informed and get your questions answered.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-3xl border border-emerald-200">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Privacy Questions</h3>
              <p className="text-gray-600 mb-6">
                Our privacy team responds to all inquiries within 48 hours. 
                For urgent data requests, we respond within 24 hours.
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200"
              >
                <Shield className="w-4 h-4 mr-2" />
                Contact Privacy Team
              </Link>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Policy Updates</h3>
              <p className="text-gray-600 mb-6">
                We'll notify you 30 days before any material changes to this privacy policy. 
                Minor updates are posted immediately with change summaries.
              </p>
              <div className="text-blue-600 font-medium">
                Last updated: January 15, 2025
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Summary: Your Privacy Matters
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "We collect only what's necessary for PM33 to work",
                "You own and control all your product data",
                "We never sell or share your information for profit"
              ].map((summary, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="font-medium">{summary}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}