/**
 * Component: StrategicIntelligencePage - Clean PM33 Implementation
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Strategic intelligence interface
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Chat interface patterns
 * 
 * Compliance Checklist:
 * - [x] Uses global CSS classes (glass-card, btn-primary, input-field)
 * - [x] Professional B2B SaaS design
 * - [x] lucide-react icons with clean styling
 * - [x] Framework selection interface
 * - [x] Suggested questions for user guidance
 * - [x] Clean component architecture
 */

'use client'

import { useState } from 'react'
import { Send, Zap, DollarSign, Rocket, Target, Activity, TrendingUp, CheckCircle, Globe, Briefcase } from 'lucide-react'

export default function StrategicIntelligencePage() {
  const [input, setInput] = useState('')
  const [selectedFramework, setSelectedFramework] = useState('auto')

  const frameworks = [
    { id: 'ice', name: 'ICE Score' },
    { id: 'rice', name: 'RICE Framework' },
    { id: 'jobs', name: 'Jobs-to-be-Done' },
    { id: 'porter', name: "Porter's Five Forces" },
    { id: 'swot', name: 'SWOT Analysis' },
    { id: 'auto', name: 'Auto-select' }
  ]

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
        "How should we allocate our $15k monthly budget?",
        "What's the ROI of building feature X vs improving existing?"
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Premium Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-2xl font-bold text-gradient">PM33</span>
                <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  Beta
                </span>
              </div>

              {/* Nav Links */}
              <div className="hidden md:flex items-center gap-1">
                {[
                  { name: 'Dashboard', icon: Activity },
                  { name: 'Strategic Intelligence', icon: Zap, active: true },
                  { name: 'Tasks', icon: CheckCircle },
                  { name: 'Data', icon: TrendingUp },
                  { name: 'Settings', icon: null }
                ].map((item) => (
                  <button
                    key={item.name}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      item.active 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                {['Light', 'Dark', 'Gray'].map((theme) => (
                  <button
                    key={theme}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      theme === 'Light' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 px-6 pb-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Strategic Intelligence
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered strategic analysis using proven PM frameworks
          </p>
        </div>

        {/* Main Chat Interface */}
        <div className="glass-card mb-8">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <p className="text-gray-700">
              I'm your Strategic AI Co-Pilot. Ask me anything about competitive strategy, 
              resource allocation, or product decisions. I'll apply proven frameworks to your specific context.
            </p>
          </div>

          {/* Framework Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-gray-600 w-full mb-2">Select Framework:</span>
            {frameworks.map((fw) => (
              <button
                key={fw.id}
                onClick={() => setSelectedFramework(fw.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedFramework === fw.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {fw.name}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a strategic question..."
              className="input-field flex-1"
            />
            <button className="btn-primary flex items-center gap-2">
              <Send className="w-4 h-4" />
              Analyze
            </button>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestedQuestions.map((category) => (
            <div key={category.category} className="glass-card">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.questions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(q)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}