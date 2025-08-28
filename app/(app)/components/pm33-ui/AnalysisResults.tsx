/**
 * File: app/(app)/components/pm33-ui/AnalysisResults.tsx
 * Description: Strategic analysis results display with confidence scoring and actionable insights
 * Purpose: Structured presentation of AI analysis with clear visual hierarchy and interaction
 * 
 * RELEVANT FILES: lib/utils.ts, styles/globals.css, FrameworkSelector.tsx, StatusIndicator.tsx
 */

"use client"

import React, { useState } from 'react'
import { cn, formatConfidence } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { StrategicCard } from './StrategicCard'
import { StatusIndicator } from './StatusIndicator'
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
    <div className={cn('pm33-analysis-results space-y-6', className)}>
      
      {/* Results Header */}
      <StrategicCard variant="elevated" size="lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Brain className="text-blue-600 dark:text-blue-400" size={24} />
            <div>
              <h2 className="pm33-h3">Analysis Complete</h2>
              <p className="pm33-caption">
                {result.framework} • Generated {result.timestamp.toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              className={cn('pm33-confidence-indicator', confidenceData.className)}
            >
              {confidenceData.text}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {result.engine} • {result.responseTime.toFixed(2)}s
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(result.response)}
          >
            <Copy size={14} className="mr-1" />
            Copy
          </Button>
          
          {onShare && (
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share size={14} className="mr-1" />
              Share
            </Button>
          )}
          
          {onExport && (
            <div className="flex gap-1">
              {(['json', 'pdf', 'md'] as const).map((format) => (
                <Button
                  key={format}
                  variant="outline"
                  size="sm"
                  onClick={() => onExport(format)}
                >
                  <Download size={14} className="mr-1" />
                  {format.toUpperCase()}
                </Button>
              ))}
            </div>
          )}
        </div>
      </StrategicCard>

      {/* AI Response */}
      <StrategicCard variant="default" size="lg">
        <div className="space-y-4">
          <button
            onClick={() => toggleSection('response')}
            className="flex items-center gap-2 w-full text-left pm33-btn-secondary"
          >
            {expandedSections.has('response') ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <h3 className="pm33-h4">Strategic Response</h3>
          </button>
          
          {expandedSections.has('response') && (
            <div className="pl-6">
              <ScrollArea className="h-64 w-full">
                <div className="pr-4">
                  <p className="pm33-body whitespace-pre-wrap leading-relaxed">
                    {result.response}
                  </p>
                </div>
              </ScrollArea>
              
              {result.keyInsights && result.keyInsights.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Key Insights
                  </h4>
                  <ul className="space-y-1">
                    {result.keyInsights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </StrategicCard>

      {/* Strategic Workflow */}
      {result.workflow && showWorkflow && (
        <StrategicCard variant="success" size="lg">
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('workflow')}
              className="flex items-center gap-2 w-full text-left pm33-btn-secondary"
            >
              {expandedSections.has('workflow') ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <Target className="text-green-600 dark:text-green-400" size={16} />
              <h3 className="pm33-h4">{result.workflow.name}</h3>
            </button>
            
            {expandedSections.has('workflow') && (
              <div className="pl-6 space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-1">
                    Strategic Objective
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {result.workflow.strategicObjective}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Badge variant="outline" className="text-xs">
                    Framework: {result.workflow.frameworkUsed}
                  </Badge>
                  {result.workflow.timeline && (
                    <Badge variant="outline" className="text-xs">
                      <Clock size={10} className="mr-1" />
                      {result.workflow.timeline}
                    </Badge>
                  )}
                  {result.workflow.estimatedValue && (
                    <Badge variant="outline" className="text-xs text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-300">
                      <TrendingUp size={10} className="mr-1" />
                      {result.workflow.estimatedValue}
                    </Badge>
                  )}
                </div>

                {/* Action Items */}
                {result.workflow.tasks && result.workflow.tasks.length > 0 && (
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white mb-3">
                      Action Items
                    </h4>
                    <div className="space-y-3">
                      {result.workflow.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-sm text-slate-900 dark:text-white mb-1">
                                {task.title}
                              </h5>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                                {task.description}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
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
                            <Badge
                              className={cn(
                                'text-xs px-2 py-1',
                                task.priority === 'critical' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
                                task.priority === 'high' && 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
                                task.priority === 'medium' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
                                task.priority === 'low' && 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300'
                              )}
                            >
                              {task.priority}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Success Metrics */}
                {result.workflow.successMetrics && result.workflow.successMetrics.length > 0 && (
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white mb-3">
                      Success Metrics
                    </h4>
                    <div className="space-y-2">
                      {result.workflow.successMetrics.map((metric, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <span className="text-sm text-slate-700 dark:text-slate-300">
                              {metric.metric}
                            </span>
                            {(metric.target || metric.timeframe) && (
                              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
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
              </div>
            )}
          </div>
        </StrategicCard>
      )}

      {/* Analysis Metadata */}
      {showMetadata && result.meta && (
        <StrategicCard variant="default" size="md">
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('metadata')}
              className="flex items-center gap-2 w-full text-left pm33-btn-secondary"
            >
              {expandedSections.has('metadata') ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <h3 className="pm33-h4">Analysis Details</h3>
            </button>
            
            {expandedSections.has('metadata') && (
              <div className="pl-6 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {result.meta.tokensUsed && (
                    <div>
                      <span className="font-medium text-slate-900 dark:text-white">Tokens Used:</span>
                      <span className="ml-2 text-slate-600 dark:text-slate-400">{result.meta.tokensUsed.toLocaleString()}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-slate-900 dark:text-white">Response Time:</span>
                    <span className="ml-2 text-slate-600 dark:text-slate-400">{result.responseTime.toFixed(2)}s</span>
                  </div>
                </div>
                
                {result.meta.processingStages && (
                  <div>
                    <h5 className="font-medium text-slate-900 dark:text-white mb-2">Processing Stages:</h5>
                    <div className="flex flex-wrap gap-1">
                      {result.meta.processingStages.map((stage, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {stage}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
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
        <Brain size={48} className="mx-auto text-slate-400 mb-4" />
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
          No Analysis Results
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
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
            <Button
              key={result.id}
              variant={selectedResult === result.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedResult(result.id)}
              className="whitespace-nowrap"
            >
              {result.framework} Analysis
              <Badge variant="secondary" className="ml-2">
                {formatConfidence(result.confidence).text}
              </Badge>
            </Button>
          ))}
        </div>
      )}
      
      {selectedResultData && (
        <AnalysisResults result={selectedResultData} />
      )}
    </div>
  )
}