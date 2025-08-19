import { ArrowRight, Mail, MessageSquare, Calendar, MapPin, Clock, Phone, Sparkles, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../../../components/shared/Navigation'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold rounded-full mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Get in Touch with PM33
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Let's Talk About Your
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent block mt-2">
              PM Transformation
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
            Whether you need a demo, have questions about integration, or want to discuss enterprise features, 
            our PM experts are here to help you succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/trial"
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center transform hover:scale-105"
            >
              Start Free Trial First
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#contact-form"
              className="group border-2 border-indigo-300 text-indigo-700 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200 flex items-center justify-center"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Send Us a Message
            </a>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Choose How You'd Like to Connect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to support your PM journey in whatever way works best for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Calendar,
                title: "Book a Demo",
                description: "See PM33 in action with a personalized demo tailored to your use case",
                action: "Schedule 30-min demo",
                highlight: "Most Popular",
                color: "from-indigo-500 to-purple-500",
                bgColor: "from-indigo-50 to-purple-50"
              },
              {
                icon: MessageSquare,
                title: "Send a Message", 
                description: "Have questions? Send us a message and we'll respond within 4 hours",
                action: "Contact form below",
                highlight: "Quick Response",
                color: "from-emerald-500 to-teal-500",
                bgColor: "from-emerald-50 to-teal-50"
              },
              {
                icon: Phone,
                title: "Enterprise Sales",
                description: "Discuss custom features, security requirements, and volume pricing",
                action: "Schedule sales call",
                highlight: "For Teams 25+",
                color: "from-cyan-500 to-blue-500",
                bgColor: "from-cyan-50 to-blue-50"
              }
            ].map((option, index) => (
              <div key={index} className="group relative">
                <div className={`absolute -top-3 -right-3 bg-gradient-to-r ${option.color} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                  {option.highlight}
                </div>
                <div className={`bg-gradient-to-br ${option.bgColor} p-8 rounded-3xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full`}>
                  <div className={`bg-gradient-to-r ${option.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <option.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{option.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>
                  
                  <button className="w-full bg-white text-gray-900 py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 border border-gray-200">
                    {option.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="px-6 py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-600">
              Tell us about your PM challenges and we'll show you how PM33 can help
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select your role</option>
                    <option value="product-manager">Product Manager</option>
                    <option value="senior-pm">Senior Product Manager</option>
                    <option value="head-of-product">Head of Product</option>
                    <option value="vp-product">VP Product</option>
                    <option value="cpo">Chief Product Officer</option>
                    <option value="founder">Founder/CEO</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What would you like to discuss?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Product Demo', 'Integration Questions', 'Enterprise Features', 'Pricing', 'Implementation', 'Other'].map((topic) => (
                      <label key={topic} className="flex items-center">
                        <input
                          type="checkbox"
                          name="topics"
                          value={topic}
                          className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-gray-700">{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your PM challenges
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="What PM tasks take up most of your time? What tools do you currently use?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Send Message
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We'll respond within 4 hours during business days. For urgent matters, 
                  <Link href="/trial" className="text-indigo-600 hover:underline ml-1">start your free trial</Link> immediately.
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Immediate Help</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                      <Clock className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Response Time</div>
                      <div className="text-gray-600">Within 4 hours on business days</div>
                      <div className="text-sm text-gray-500">Monday-Friday, 9 AM - 6 PM PST</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-emerald-100 p-3 rounded-xl mr-4">
                      <Mail className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Email Support</div>
                      <div className="text-indigo-600 hover:underline">support@pm33.com</div>
                      <div className="text-sm text-gray-500">For technical questions and support</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-xl mr-4">
                      <MessageSquare className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Sales Inquiries</div>
                      <div className="text-indigo-600 hover:underline">sales@pm33.com</div>
                      <div className="text-sm text-gray-500">For demos and enterprise discussions</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why PMs Love Working With Us</h3>
                
                <div className="space-y-4">
                  {[
                    "We're PMs ourselves - we get your challenges",
                    "No pushy sales tactics, just honest conversations",
                    "Custom onboarding for your specific workflow",
                    "Ongoing support from our PM community"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-white rounded-xl">
                  <div className="text-sm text-indigo-600 font-bold mb-1">Average Setup Time</div>
                  <div className="text-2xl font-bold text-gray-900">5 minutes</div>
                  <div className="text-sm text-gray-500">From signup to first AI insights</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about PM33
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "How quickly can I get started with PM33?",
                answer: "Most teams are up and running in under 5 minutes. Simply connect your existing PM tools (Jira, Monday, Asana), and PM33's AI immediately begins analyzing your data to provide insights."
              },
              {
                question: "Do you offer custom integrations for enterprise tools?",
                answer: "Yes! We work with enterprise teams to integrate with custom tools, internal APIs, and specialized PM platforms. Contact our sales team to discuss your specific requirements."
              },
              {
                question: "What kind of support do you provide during onboarding?",
                answer: "Every new customer gets a personalized 30-minute onboarding session with a PM expert, plus access to our comprehensive knowledge base and responsive support team."
              },
              {
                question: "Can I schedule a demo before starting my trial?",
                answer: "Absolutely! We offer personalized demos where we show PM33 working with your specific tools and use cases. Book a demo using the calendar link above."
              },
              {
                question: "What if PM33 doesn't integrate with my current tools?",
                answer: "We support 20+ major PM tools and are constantly adding new integrations. If we don't support your tool yet, contact us - we prioritize integrations based on customer demand."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link 
              href="/trial" 
              className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
            >
              Start Free Trial - No Risk
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
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
                Ready to help with your PM transformation. Reach out anytime.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Contact</h4>
              <div className="space-y-4 text-gray-400">
                <div>support@pm33.com</div>
                <div>sales@pm33.com</div>
                <div>Book a Demo</div>
                <div>Help Center</div>
              </div>
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
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PM33. We're here to help you succeed.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}