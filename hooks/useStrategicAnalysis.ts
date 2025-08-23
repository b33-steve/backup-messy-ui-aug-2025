'use client'

import { useState, useEffect } from 'react'

interface AnalysisResult {
  framework: string
  analysis: string
  recommendations: string[]
  confidence: number
  timestamp?: string
}

interface ApiResponse {
  success: boolean
  data?: AnalysisResult
  error?: string
}

export function useStrategicAnalysis() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const analyzeQuestion = async (question: string): Promise<AnalysisResult> => {
    setLoading(true)
    setError(null)
    
    try {
      // Try real API call first
      const response = await fetch('/api/strategic-analysis', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question })
      })

      if (response.ok) {
        const apiResult: ApiResponse = await response.json()
        if (apiResult.success && apiResult.data) {
          setData(apiResult.data)
          return apiResult.data
        }
        throw new Error(apiResult.error || 'API returned unsuccessful response')
      }
      
      // If API fails, fall back to mock data
      throw new Error(`API call failed with status: ${response.status}`)
      
    } catch (apiError) {
      // Fallback to mock response for development/demo
      console.warn('Strategic Analysis API unavailable, using mock data:', apiError)
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockResult: AnalysisResult = {
        framework: 'ICE',
        analysis: `Strategic analysis for: ${question}`,
        recommendations: [
          'Prioritize high-impact, low-effort initiatives',
          'Conduct competitive analysis for market positioning',
          'Implement user feedback collection system'
        ],
        confidence: 0.85,
        timestamp: new Date().toISOString()
      }
      
      setData(mockResult)
      return mockResult
      
    } finally {
      setLoading(false)
    }
  }

  // Clear data when needed
  const clearData = () => {
    setData(null)
    setError(null)
  }

  return {
    analyzeQuestion,
    loading,
    data,
    error,
    clearData
  }
}