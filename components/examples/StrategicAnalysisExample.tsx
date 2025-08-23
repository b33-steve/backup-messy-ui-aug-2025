'use client'

import { useState } from 'react'
import { useStrategicAnalysis } from '@/hooks/useStrategicAnalysis'
import GlassCard from '@/components/ui/GlassCard'

export default function StrategicAnalysisExample() {
  const [question, setQuestion] = useState('')
  const { analyzeQuestion, loading, data, error, clearData } = useStrategicAnalysis()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim()) {
      await analyzeQuestion(question.trim())
    }
  }

  const handleClear = () => {
    setQuestion('')
    clearData()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Strategic Analysis Demo</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Test the real API integration with fallback to mock data
        </p>
      </div>

      {/* Input Form */}
      <GlassCard>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-sm font-medium mb-2">
              Strategic Question
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Our competitor just raised $10M. What's our strategic response?"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              rows={3}
              disabled={loading}
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Analyze Strategy'}
            </button>
            
            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all disabled:opacity-50"
            >
              Clear
            </button>
          </div>
        </form>
      </GlassCard>

      {/* Loading State */}
      {loading && (
        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            <span>Analyzing your strategic question using AI frameworks...</span>
          </div>
        </GlassCard>
      )}

      {/* Error State */}
      {error && (
        <GlassCard className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <div className="flex items-center gap-2">
            <span className="text-red-500">⚠️</span>
            <span className="text-red-700 dark:text-red-300">
              Error: {error}
            </span>
          </div>
        </GlassCard>
      )}

      {/* Results */}
      {data && !loading && (
        <div className="space-y-4">
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Strategic Analysis Results</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Framework:</span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                  {data.framework}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Analysis:</h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {data.analysis}
                </p>
              </div>

              {data.recommendations.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Recommendations:</h3>
                  <ul className="space-y-2">
                    {data.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Confidence:</span>
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all duration-500"
                      style={{ width: `${data.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {Math.round(data.confidence * 100)}%
                  </span>
                </div>
                
                {data.timestamp && (
                  <span className="text-xs text-gray-500">
                    {new Date(data.timestamp).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}