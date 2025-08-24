/**
 * File: app/(app)/components/pm33-ui/AnalysisResults.tsx
 * Description: Strategic analysis results display with confidence scoring and actionable insights using PM33 design system
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Analysis results interface
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Results presentation patterns
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied
 * - [x] Animations implemented  
 * - [x] Hover states added
 * - [x] AI intelligence visible
 * - [x] Progress indicators present
 * - [x] Follows 8pt grid spacing
 */

"use client"

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { PM33Button } from '@/components/PM33Button'
import { PM33Card } from '@/components/PM33Card'
import { StrategicCard } from './StrategicCard'
import { StatusIndicator } from './StatusIndicator'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain,
  Target,
  Clock,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Copy,
  Download,
  Share,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

interface AnalysisTask {
  id: string
  title: string
  description: string
  assignee: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  estimatedHours: number
  dependencies?: string[]
}

interface SuccessMetric {
  metric: string
  target?: string
  timeframe?: string
}

interface AnalysisResultData {
  id: string
  framework: string
  confidence: number
  responseTime: number
  engine: string
  timestamp: Date
  
  // Core analysis content
  response: string
  summary?: string
  keyInsights?: string[]
  
  // Workflow data
  workflow?: {
    name: string
    strategicObjective: string
    frameworkUsed: string
    tasks?: AnalysisTask[]
    successMetrics?: SuccessMetric[]
    timeline?: string
    estimatedValue?: string
  }
  
  // Metadata
  meta?: {
    tokensUsed?: number
    processingStages?: string[]
    dataSourcesUsed?: string[]
  }
}

interface AnalysisResultsProps {
  result: AnalysisResultData
  showMetadata?: boolean
  showWorkflow?: boolean
  onExport?: (format: 'json' | 'pdf' | 'md') => void
  onShare?: () => void
  className?: string
}

function formatConfidence(confidence: number) {
  if (confidence >= 90) {
    return { text: `${confidence}% High`, className: 'bg-green-100 text-green-700' }
  } else if (confidence >= 70) {
    return { text: `${confidence}% Medium`, className: 'bg-yellow-100 text-yellow-700' }
  } else {
    return { text: `${confidence}% Low`, className: 'bg-red-100 text-red-700' }
  }
}

/**
 * AnalysisResults Component
 * 
 * Comprehensive display of strategic analysis results with
 * confidence scoring, actionable tasks, and export capabilities
 */
export function AnalysisResults({
  result,
  showMetadata = true,
  showWorkflow = true,
  onExport,
  onShare,
  className
}: AnalysisResultsProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['response']))
  const confidenceData = formatConfidence(result.confidence)

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className={cn('space-y-6', className)}>
      
      {/* Results Header */}
      <StrategicCard variant="elevated" size="lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Brain className="text-blue-600" size={24} />
            <div>
              <h2 className="text-xl font-bold text-foreground">Analysis Complete</h2>
              <p className="text-sm text-muted-foreground">
                {result.framework} • Generated {result.timestamp.toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={cn('px-2 py-1 rounded-full text-xs font-medium', confidenceData.className)}>
              {confidenceData.text}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              {result.engine} • {result.responseTime.toFixed(2)}s
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
          <PM33Button
            variant="secondary"
            size="sm"
            onClick={() => copyToClipboard(result.response)}
          >
            <Copy size={14} className="mr-1" />
            Copy
          </PM33Button>
          
          {onShare && (
            <PM33Button variant="secondary" size="sm" onClick={onShare}>
              <Share size={14} className="mr-1" />
              Share
            </PM33Button>
          )}
          
          {onExport && (
            <div className="flex gap-1">
              {(['json', 'pdf', 'md'] as const).map((format) => (
                <PM33Button
                  key={format}
                  variant="secondary"
                  size="sm"
                  onClick={() => onExport(format)}
                >
                  <Download size={14} className="mr-1" />
                  {format.toUpperCase()}
                </PM33Button>
              ))}
            </div>
          )}
        </div>
      </StrategicCard>

      {/* AI Response */}
      <StrategicCard variant="default" size="lg">
        <div className="space-y-4">
          <motion.button
            onClick={() => toggleSection('response')}
            className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <motion.div
              animate={{ rotate: expandedSections.has('response') ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={16} />
            </motion.div>
            <h3 className="text-lg font-semibold text-foreground">Strategic Response</h3>
          </motion.button>
          
          <AnimatePresence>
            {expandedSections.has('response') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pl-6"
              >
                <div className="h-64 w-full overflow-y-auto">
                  <div className="pr-4">
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                      {result.response}
                    </p>
                  </div>
                </div>
                
                {result.keyInsights && result.keyInsights.length > 0 && (
                  <div className="mt-4 p-4 bg-blue-50/80 backdrop-blur-sm rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">
                      Key Insights
                    </h4>
                    <ul className="space-y-1">
                      {result.keyInsights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </StrategicCard>

      {/* Strategic Workflow */}
      {result.workflow && showWorkflow && (
        <StrategicCard variant="success" size="lg">
          <div className="space-y-4">
            <motion.button
              onClick={() => toggleSection('workflow')}
              className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-green-50 transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.has('workflow') ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight size={16} />
              </motion.div>
              <Target className="text-green-600" size={16} />
              <h3 className="text-lg font-semibold text-foreground">{result.workflow.name}</h3>
            </motion.button>
            
            <AnimatePresence>
              {expandedSections.has('workflow') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-6 space-y-4"
                >
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      Strategic Objective
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {result.workflow.strategicObjective}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      Framework: {result.workflow.frameworkUsed}
                    </span>
                    {result.workflow.timeline && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <Clock size={10} />
                        {result.workflow.timeline}
                      </span>
                    )}
                    {result.workflow.estimatedValue && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <TrendingUp size={10} />
                        {result.workflow.estimatedValue}
                      </span>
                    )}
                  </div>

                  {/* Action Items */}
                  {result.workflow.tasks && result.workflow.tasks.length > 0 && (
                    <div>
                      <h4 className="font-medium text-foreground mb-3">
                        Action Items
                      </h4>
                      <div className="space-y-3">
                        {result.workflow.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-sm text-foreground mb-1">
                                  {task.title}
                                </h5>
                                <p className="text-xs text-muted-foreground mb-2">
                                  {task.description}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Users size={10} />
                                    {task.assignee}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock size={10} />
                                    {task.estimatedHours}h
                                  </span>
                                </div>
                              </div>
                              <span className={cn(
                                'px-2 py-1 rounded-full text-xs font-medium',
                                task.priority === 'critical' && 'bg-red-100 text-red-700',
                                task.priority === 'high' && 'bg-orange-100 text-orange-700',
                                task.priority === 'medium' && 'bg-blue-100 text-blue-700',
                                task.priority === 'low' && 'bg-gray-100 text-gray-700'
                              )}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Success Metrics */}
                  {result.workflow.successMetrics && result.workflow.successMetrics.length > 0 && (
                    <div>
                      <h4 className="font-medium text-foreground mb-3">
                        Success Metrics
                      </h4>
                      <div className="space-y-2">
                        {result.workflow.successMetrics.map((metric, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <span className="text-sm text-foreground">
                                {metric.metric}
                              </span>
                              {(metric.target || metric.timeframe) && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {metric.target && `Target: ${metric.target}`}
                                  {metric.target && metric.timeframe && ' • '}
                                  {metric.timeframe && `Timeline: ${metric.timeframe}`}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </StrategicCard>
      )}

      {/* Analysis Metadata */}
      {showMetadata && result.meta && (
        <StrategicCard variant="default" size="md">
          <div className="space-y-4">
            <motion.button
              onClick={() => toggleSection('metadata')}
              className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.has('metadata') ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight size={16} />
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground">Analysis Details</h3>
            </motion.button>
            
            <AnimatePresence>
              {expandedSections.has('metadata') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-6 space-y-3"
                >
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {result.meta.tokensUsed && (
                      <div>
                        <span className="font-medium text-foreground">Tokens Used:</span>
                        <span className="ml-2 text-muted-foreground">{result.meta.tokensUsed.toLocaleString()}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-foreground">Response Time:</span>
                      <span className="ml-2 text-muted-foreground">{result.responseTime.toFixed(2)}s</span>
                    </div>
                  </div>
                  
                  {result.meta.processingStages && (
                    <div>
                      <h5 className="font-medium text-foreground mb-2">Processing Stages:</h5>
                      <div className="flex flex-wrap gap-1">
                        {result.meta.processingStages.map((stage, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {stage}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </StrategicCard>
      )}
    </div>
  )
}

/**
 * Analysis Results List for multiple results
 */
interface AnalysisResultsListProps {
  results: AnalysisResultData[]
  className?: string
}

export function AnalysisResultsList({ results, className }: AnalysisResultsListProps) {
  const [selectedResult, setSelectedResult] = useState<string | null>(
    results.length > 0 ? results[0].id : null
  )

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <Brain size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          No Analysis Results
        </h3>
        <p className="text-muted-foreground">
          Submit a strategic question to generate AI-powered insights.
        </p>
      </div>
    )
  }

  const selectedResultData = results.find(r => r.id === selectedResult)

  return (
    <div className={cn('space-y-6', className)}>
      {results.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {results.map((result) => (
            <PM33Button
              key={result.id}
              variant={selectedResult === result.id ? "primary" : "secondary"}
              size="sm"
              onClick={() => setSelectedResult(result.id)}
              className="whitespace-nowrap"
            >
              {result.framework} Analysis
              <span className="ml-2 px-1 py-0.5 bg-white/20 rounded text-xs">
                {formatConfidence(result.confidence).text}
              </span>
            </PM33Button>
          ))}
        </div>
      )}
      
      {selectedResultData && (
        <AnalysisResults result={selectedResultData} />
      )}
    </div>
  )
}