'use client'

import React, { useState } from 'react'
import { useStrategicAnalysis } from '@/hooks/useStrategicAnalysis'
import GlassCard from '@/components/ui/GlassCard'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  framework?: string
  confidence?: number
}

interface StrategicChatProps {
  theme?: 'light' | 'dark' | 'gray'
  className?: string
  initialQuestion?: string
}

export default function StrategicChat({ theme = 'light', className = '', initialQuestion = '' }: StrategicChatProps) {
  const [input, setInput] = useState(initialQuestion)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Strategic AI Assistant. I can help you analyze business decisions using proven PM frameworks like ICE, RICE, and Porter\'s Five Forces. What strategic question can I help you with today?',
      timestamp: new Date().toISOString()
    }
  ])
  
  const { analyzeQuestion, loading, error } = useStrategicAnalysis()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      const response = await analyzeQuestion(input)
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.analysis,
        timestamp: response.timestamp || new Date().toISOString(),
        framework: response.framework,
        confidence: response.confidence
      }

      setMessages(prev => [...prev, assistantMessage])

      // Add recommendations as a follow-up if they exist
      if (response.recommendations && response.recommendations.length > 0) {
        const recommendationsMessage: Message = {
          role: 'assistant',
          content: `Based on this analysis, here are my recommendations:\n\n${response.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}`,
          timestamp: new Date().toISOString(),
          framework: response.framework,
          confidence: response.confidence
        }
        
        setTimeout(() => {
          setMessages(prev => [...prev, recommendationsMessage])
        }, 1000)
      }
    } catch (err) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error while analyzing your question. Please try rephrasing your question or try again in a moment.',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Chat cleared. What strategic question can I help you with?',
        timestamp: new Date().toISOString()
      }
    ])
  }

  return (
    <div className={`max-w-4xl mx-auto p-6 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Strategic Chat
        </h2>
        <button
          onClick={clearChat}
          className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          Clear Chat
        </button>
      </div>

      <GlassCard className="h-[600px] flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex items-start gap-3 max-w-[85%]">
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">🧠</span>
                  </div>
                )}
                
                <div className="flex flex-col">
                  <div
                    className={`rounded-lg p-3 ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white ml-auto'
                        : theme === 'light' 
                          ? 'bg-gray-100 dark:bg-gray-800' 
                          : 'bg-gray-700 dark:bg-gray-600'
                    }`}
                  >
                    <div className="whitespace-pre-line leading-relaxed">
                      {msg.content}
                    </div>
                  </div>

                  {/* Framework and Confidence Display */}
                  {msg.role === 'assistant' && (msg.framework || msg.confidence) && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      {msg.framework && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                          {msg.framework}
                        </span>
                      )}
                      {msg.confidence && (
                        <span className="flex items-center gap-1">
                          <span>Confidence:</span>
                          <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 transition-all duration-500"
                              style={{ width: `${msg.confidence * 100}%` }}
                            />
                          </div>
                          <span>{Math.round(msg.confidence * 100)}%</span>
                        </span>
                      )}
                    </div>
                  )}

                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">👤</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🧠</span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Analyzing with AI frameworks...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex justify-center">
              <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <span>⚠️</span>
                  <span className="text-sm">Error: {error}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a strategic question... (e.g., 'How should I respond to a competitor's price cut?')"
              disabled={loading}
              className={`flex-1 px-4 py-2 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                theme === 'light'
                  ? 'bg-white border-gray-300 focus:border-blue-500 text-gray-900'
                  : 'bg-gray-800 border-gray-600 focus:border-blue-400 text-gray-100'
              } disabled:opacity-50`}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending</span>
                </div>
              ) : (
                'Send'
              )}
            </button>
          </div>
          
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            💡 Try asking about competitive strategy, resource allocation, market positioning, or growth planning
          </div>
        </form>
      </GlassCard>
    </div>
  )
}