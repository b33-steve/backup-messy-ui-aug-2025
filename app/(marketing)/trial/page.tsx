import { ArrowRight, CheckCircle, Users } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../../../components/shared/Navigation'

export default function TrialPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Form */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Start Your Free 14-Day Trial
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                No credit card required. Full access to all features. Join the PM community transforming how product teams work.
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-2">
                    Team Size
                  </label>
                  <select
                    id="teamSize"
                    name="teamSize"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select team size</option>
                    <option value="1-5">1-5 PMs</option>
                    <option value="6-15">6-15 PMs</option>
                    <option value="16-50">16-50 PMs</option>
                    <option value="50+">50+ PMs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current PM Tools (select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Jira', 'Monday.com', 'Asana', 'Trello', 'Notion', 'ClickUp', 'Linear', 'Other'].map((tool) => (
                      <label key={tool} className="flex items-center">
                        <input
                          type="checkbox"
                          name="currentTools"
                          value={tool}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{tool}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="communityUpdates"
                    name="communityUpdates"
                    className="mt-1 mr-3"
                    defaultChecked
                  />
                  <label htmlFor="communityUpdates" className="text-sm text-gray-600">
                    Keep me updated on PM community resources, templates, and insights (you can unsubscribe anytime)
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By starting your trial, you agree to our{' '}
                  <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                </p>
              </form>
            </div>

            {/* Right Column - Benefits */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What you'll get in your trial
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Full Platform Access</h3>
                    <p className="text-gray-600 text-sm">Connect all your PM tools and start generating AI insights immediately</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Personal Onboarding</h3>
                    <p className="text-gray-600 text-sm">30-minute setup call to configure PM33 for your specific workflow</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Community Access</h3>
                    <p className="text-gray-600 text-sm">Join our PM community for peer learning, templates, and best practices</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Success Guarantee</h3>
                    <p className="text-gray-600 text-sm">If you don't save 60% of your routine PM time, we'll extend your trial</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Join 2,500+ product managers already using PM33</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Community Bonus</h4>
                <p className="text-blue-800 text-sm">
                  Trial users get access to our exclusive PM templates library and weekly community calls with senior PMs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-4">PM33</div>
              <p className="text-gray-400">
                The AI brain that supercharges your existing PM tools without migration headaches.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/demo" className="block hover:text-white">Demo</Link>
                <Link href="/pricing" className="block hover:text-white">Pricing</Link>
                <Link href="/integrations" className="block hover:text-white">Integrations</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/blog" className="block hover:text-white">Blog</Link>
                <Link href="/community" className="block hover:text-white">PM Community</Link>
                <Link href="/resources" className="block hover:text-white">Resources</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/about" className="block hover:text-white">About</Link>
                <Link href="/contact" className="block hover:text-white">Contact</Link>
                <Link href="/privacy" className="block hover:text-white">Privacy</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PM33. Built by the PM community, for the PM community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}