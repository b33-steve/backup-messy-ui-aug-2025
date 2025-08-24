/**
 * Component: StrategicIntelligencePage
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Section 4.1 (Strategic Analysis Interface)
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Section 3.1 (AI-Powered Chat Experience)
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied
 * - [x] Animations implemented
 * - [x] Hover states added
 * - [x] AI intelligence visible
 * - [x] Progress indicators present
 * - [x] Follows 8pt grid spacing
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '../../../components/ui/GlassCard'
import { Brain, TrendingUp, Target, BarChart3 } from 'lucide-react'

// Types
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  framework?: string | null
  confidence?: number
  tasks?: string[]
  metrics?: Record<string, string | number>
}

interface CompanyContext {
  industry: string
  stage: string
  teamSize: string
  runway: string
  constraint: string
}

export default function StrategicIntelligencePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "I'm your Strategic AI Co-Pilot. Ask me anything about competitive strategy, resource allocation, or product decisions. I'll apply proven frameworks to your specific context.",
      timestamp: new Date(),
      framework: null
    }
  ])
  const [input, setInput] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null)
  const [companyContext, setCompanyContext] = useState<CompanyContext | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Suggested questions based on common pain points
  const suggestedQuestions = [
    {
      category: 'Competitive Strategy',
      icon: '⚔️',
      questions: [
        "Our competitor just raised $10M and launched a similar feature. What's our strategic response?",
        "How do we differentiate when competitors have 10x our resources?",
        "Should we match competitor pricing or maintain premium positioning?"
      ]
    },
    {
      category: 'Resource Allocation',
      icon: '💰',
      questions: [
        "Should we hire 2 engineers or spend $50k on marketing?",
        "How should we allocate our $15k monthly budget for maximum growth?",
        "What's the ROI of building feature X vs improving existing features?"
      ]
    },
    {
      category: 'Product Strategy',
      icon: '🚀',
      questions: [
        "Should we focus on enterprise features or SMB volume?",
        "How do we prioritize our roadmap with limited resources?",
        "What features will drive the most revenue in Q4?"
      ]
    }
  ]

  const frameworks = [
    { id: 'ice', name: 'ICE Score', description: 'Impact, Confidence, Ease' },
    { id: 'rice', name: 'RICE Framework', description: 'Reach, Impact, Confidence, Effort' },
    { id: 'jobs', name: 'Jobs-to-be-Done', description: 'Customer job analysis' },
    { id: 'porter', name: "Porter's Five Forces", description: 'Competitive analysis' },
    { id: 'swot', name: 'SWOT Analysis', description: 'Strengths, Weaknesses, Opportunities, Threats' }
  ]

  useEffect(() => {
    // Load company context (demo data)
    setCompanyContext({
      industry: 'B2B SaaS',
      stage: 'Series A',
      teamSize: '25 people',
      runway: '18 months',
      constraint: 'Engineering resources'
    })
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isAnalyzing) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsAnalyzing(true)

    // Simulate AI analysis (replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Based on ${selectedFramework || 'best available'} framework analysis, here's my strategic recommendation:\n\n**Analysis**: This situation requires a multi-pronged approach focusing on your core differentiators while maintaining competitive positioning.\n\n**Key Insights**:\n- Leverage your engineering constraint as a focus mechanism\n- Prioritize high-impact, low-effort initiatives\n- Build strategic moats before scaling\n\n**Strategic Response**: Focus on your unique value proposition and double down on what makes you different rather than trying to match competitors feature-for-feature.`,
        timestamp: new Date(),
        framework: selectedFramework || 'RICE Framework',
        confidence: 87,
        tasks: [
          'Conduct competitive feature gap analysis',
          'Survey top 10 customers on differentiation factors',
          'Prioritize roadmap using RICE scoring',
          'Define 3-month strategic focus areas'
        ],
        metrics: {
          'Time to Decision': '2-3 days',
          'Confidence Level': '87%',
          'Impact Score': '8.5/10'
        }
      }

      setMessages(prev => [...prev, aiMessage])
      setIsAnalyzing(false)
    }, 3000)
  }

  const handleQuestionClick = (question: string) => {
    setInput(question)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* Main Chat Area */}
          <div className="space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Strategic Intelligence
                </h1>
              </div>
              <p className="text-slate-600">
                AI-powered strategic analysis using proven PM frameworks
              </p>
            </motion.div>

            {/* Chat Messages */}
            <GlassCard className="h-[500px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
                        <div className={`rounded-xl p-4 ${
                          message.role === 'user' 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                            : 'bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md'
                        }`}>
                          <div className="prose prose-sm max-w-none">
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                              {message.content}
                            </div>
                          </div>
                          
                          {/* Framework Used */}
                          {message.framework && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <span className="text-xs text-gray-500">
                                Framework: {message.framework}
                              </span>
                              {message.confidence && (
                                <span className="ml-3 text-xs text-green-600 font-semibold">
                                  {message.confidence}% confidence
                                </span>
                              )}
                            </div>
                          )}

                          {/* Generated Tasks */}
                          {message.tasks && message.tasks.length > 0 && (
                            <div className="mt-4 space-y-2">
                              <p className="text-sm font-semibold text-gray-700">
                                Recommended Actions:
                              </p>
                              {message.tasks.map((task, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <span className="text-green-500 mt-0.5">✓</span>
                                  <span className="text-sm">{task}</span>
                                </div>
                              ))}
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                              >
                                <Target className="w-3 h-3" />
                                Create tasks in project management
                              </motion.button>
                            </div>
                          )}

                          {/* Metrics */}
                          {message.metrics && (
                            <div className="mt-4 grid grid-cols-3 gap-3">
                              {Object.entries(message.metrics).map(([key, value]) => (
                                <div key={key} className="text-center p-2 bg-gray-50 rounded-lg">
                                  <div className="text-lg font-bold text-gray-900">{value}</div>
                                  <div className="text-xs text-gray-500">{key}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 px-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Analyzing Indicator */}
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200" />
                        </div>
                        <span className="text-sm text-gray-600">
                          Analyzing with {selectedFramework || 'best'} framework...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 bg-white/50 backdrop-blur-sm p-4">
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Framework Selector */}
                  <div className="flex gap-2 flex-wrap items-center">
                    <span className="text-sm text-gray-500">Framework:</span>
                    {frameworks.map((fw) => (
                      <motion.button
                        key={fw.id}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedFramework(fw.id)}
                        className={`px-3 py-1 text-xs rounded-full transition-all ${
                          selectedFramework === fw.id
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {fw.name}
                      </motion.button>
                    ))}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedFramework(null)}
                      className={`px-3 py-1 text-xs rounded-full transition-all ${
                        !selectedFramework
                          ? 'bg-green-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Auto-select
                    </motion.button>
                  </div>

                  {/* Input Field */}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask a strategic question..."
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                      disabled={isAnalyzing}
                    />
                    <motion.button
                      type="submit"
                      disabled={!input.trim() || isAnalyzing}
                      whileHover={!isAnalyzing && input.trim() ? { scale: 1.05 } : {}}
                      whileTap={!isAnalyzing && input.trim() ? { scale: 0.95 } : {}}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Analyzing...
                        </div>
                      ) : (
                        'Analyze'
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </GlassCard>

            {/* Suggested Questions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              {suggestedQuestions.map((category) => (
                <GlassCard key={category.category} className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="font-semibold text-gray-900">{category.category}</h3>
                  </div>
                  <div className="space-y-2">
                    {category.questions.map((question, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02, backgroundColor: '#f1f5f9' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuestionClick(question)}
                        className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm text-gray-700"
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Company Context */}
            <GlassCard>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Company Context
              </h3>
              {companyContext ? (
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-500">Industry:</span>
                    <span className="ml-2 font-medium">{companyContext.industry}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Stage:</span>
                    <span className="ml-2 font-medium">{companyContext.stage}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Team Size:</span>
                    <span className="ml-2 font-medium">{companyContext.teamSize}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Runway:</span>
                    <span className="ml-2 font-medium">{companyContext.runway}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Key Constraint:</span>
                    <span className="ml-2 font-medium text-orange-600">
                      {companyContext.constraint}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Complete company profile →
                  </motion.button>
                </div>
              )}
            </GlassCard>

            {/* Recent Analyses */}
            <GlassCard>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Recent Analyses
              </h3>
              <div className="space-y-3">
                <RecentAnalysisItem
                  title="Competitor Response Strategy"
                  framework="Porter's Five Forces"
                  time="2 hours ago"
                  confidence={92}
                />
                <RecentAnalysisItem
                  title="Q4 Resource Allocation"
                  framework="RICE Framework"
                  time="Yesterday"
                  confidence={87}
                />
                <RecentAnalysisItem
                  title="Feature Prioritization"
                  framework="ICE Score"
                  time="3 days ago"
                  confidence={95}
                />
              </div>
            </GlassCard>

            {/* Intelligence Metrics */}
            <GlassCard>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Intelligence Metrics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Analysis Accuracy</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-green-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '94%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Time Saved</span>
                    <span className="font-medium">12.5 hrs/week</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Decisions Made</span>
                    <span className="font-medium">47 this month</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1, delay: 0.9 }}
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Helper Components
function RecentAnalysisItem({ title, framework, time, confidence }: {
  title: string
  framework: string
  time: string
  confidence: number
}) {
  return (
    <motion.div
      whileHover={{ backgroundColor: '#f8fafc', scale: 1.02 }}
      className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
    >
      <div className="flex justify-between items-start mb-1">
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        <span className={`text-xs font-medium ${
          confidence >= 90 ? 'text-green-600' : confidence >= 80 ? 'text-yellow-600' : 'text-red-600'
        }`}>
          {confidence}%
        </span>
      </div>
      <p className="text-xs text-gray-500">{framework}</p>
      <p className="text-xs text-gray-400 mt-1">{time}</p>
    </motion.div>
  )
}