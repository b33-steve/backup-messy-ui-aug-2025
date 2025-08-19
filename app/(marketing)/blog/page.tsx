import { Calendar, Users, MessageCircle, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../../../components/shared/Navigation'

export default function BlogPage() {
  const featuredPosts = [
    {
      title: "How PMs Are Solving Documentation Overload Together: Community Insights",
      excerpt: "27 product managers shared their tactics for cutting documentation time by 60-80%. Here's what we learned from the PM community.",
      author: "PM Community",
      date: "Jan 8, 2025",
      readTime: "8 min read",
      category: "Community Wisdom",
      slug: "pm-documentation-community-insights",
      featured: true
    },
    {
      title: "Real AI PM Workflows: What Actually Works vs. What Feels Cool",
      excerpt: "Crowdsourced from 50+ PMs using AI in their daily work. Honest takes on what saves time and what creates more work.",
      author: "PM Community Contributors",
      date: "Jan 5, 2025", 
      readTime: "12 min read",
      category: "Tools & Workflows",
      slug: "real-ai-pm-workflows-community",
      featured: true
    },
    {
      title: "The Great PM Tool Migration Debate: Enhancement vs. Replacement",
      excerpt: "Community discussion on whether to enhance your current PM stack or migrate to new platforms. Real experiences included.",
      author: "Various Contributors",
      date: "Jan 3, 2025",
      readTime: "10 min read", 
      category: "Strategy Discussion",
      slug: "pm-tool-migration-debate",
      featured: false
    }
  ]

  const communityFeatures = [
    {
      icon: Users,
      title: "Peer Learning Groups",
      description: "Join weekly discussions with fellow PMs sharing real challenges and solutions",
      action: "Join Next Session"
    },
    {
      icon: BookOpen,
      title: "Open Resource Library", 
      description: "Community-contributed templates, frameworks, and guides. No paywalls.",
      action: "Browse Resources"
    },
    {
      icon: MessageCircle,
      title: "PM Wisdom Exchange",
      description: "Share your wins, fails, and questions. Get genuine help from practicing PMs.",
      action: "Start Discussion"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            PM Community Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            By product managers, for product managers. Real stories, practical solutions, and collaborative learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#contribute"
              className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Share Your Story
            </Link>
            <Link 
              href="#discussions"
              className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Join Discussions
            </Link>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Learn Together, Grow Together
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This isn't a company blog—it's a living library built by the PM community. Every resource, story, and framework is openly contributed and freely shared.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {communityFeatures.map((feature, index) => (
              <div key={index} className="p-8 bg-white rounded-lg shadow-lg border border-gray-200 text-center">
                <feature.icon className="h-12 w-12 text-purple-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <Link 
                  href="#"
                  className="text-purple-600 font-semibold hover:text-purple-700 inline-flex items-center"
                >
                  {feature.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Community Content */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Latest from the Community
            </h2>
            <p className="text-xl text-gray-600">
              Real insights from practicing product managers
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Featured Article */}
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    FEATURED
                  </span>
                  <span className="text-gray-500 text-sm ml-4">Community Wisdom</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {featuredPosts[0].title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {featuredPosts[0].date} • {featuredPosts[0].readTime}
                  </div>
                </div>
                <Link 
                  href={`/blog/${featuredPosts[0].slug}`}
                  className="inline-flex items-center text-purple-600 font-semibold mt-4 hover:text-purple-700"
                >
                  Read Community Insights
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </article>

            {/* Recent Articles */}
            <div className="space-y-8">
              {featuredPosts.slice(1).map((post, index) => (
                <article key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-purple-600 text-xs font-semibold px-2.5 py-0.5 rounded bg-purple-50">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.date} • {post.readTime}</span>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-purple-600 font-semibold hover:text-purple-700"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Contributions */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Community-Contributed Resources
            </h2>
            <p className="text-xl text-gray-600">
              Templates, frameworks, and guides shared by fellow PMs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "PRD Template Library",
                author: "Sarah @ TechFlow",
                description: "5 different PRD templates for various project types",
                downloads: "1.2k",
                type: "Templates"
              },
              {
                title: "User Interview Guide",
                author: "Marcus @ DataSync",
                description: "Step-by-step framework for customer discovery",
                downloads: "856",
                type: "Framework"
              },
              {
                title: "AI Tool Comparison Matrix",
                author: "Jennifer @ CloudOps",
                description: "Real PM experiences with 15+ AI tools",
                downloads: "743",
                type: "Research"
              },
              {
                title: "Stakeholder Alignment Playbook",
                author: "Alex @ StartupCo",
                description: "Templates and scripts for difficult conversations",
                downloads: "621",
                type: "Playbook"
              },
              {
                title: "Feature Prioritization Methods",
                author: "Priya @ HealthTech",
                description: "5 frameworks with real-world examples",
                downloads: "498",
                type: "Framework"
              },
              {
                title: "Remote PM Best Practices",
                author: "Community Collaboration",
                description: "Crowdsourced tactics from 30+ remote PMs",
                downloads: "392",
                type: "Guide"
              }
            ].map((resource, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {resource.type}
                  </span>
                  <span className="text-gray-500 text-sm">{resource.downloads} downloads</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {resource.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">by {resource.author}</span>
                  <Link 
                    href="#"
                    className="text-blue-600 font-semibold text-sm hover:text-blue-700"
                  >
                    Download Free →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Contribute */}
      <section id="contribute" className="px-6 py-20 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Share Your PM Wisdom
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Have a framework, story, or insight that helped you? Share it with the community and help other PMs level up.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contribute"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contribute Content
            </Link>
            <Link 
              href="/community-guidelines"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              Community Guidelines
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-4">PM33</div>
              <p className="text-gray-400">
                Supporting the PM community with tools and resources for better product management.
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
                <Link href="/community" className="block hover:text-white">Discussions</Link>
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