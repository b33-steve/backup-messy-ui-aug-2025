/**
 * File: app/(app)/components/pm33-ui/AIProcessingIndicator.tsx
 * Description: AI processing states and loading indicators for strategic analysis
 * Purpose: Consistent loading states with intelligence-focused messaging
 * 
 * RELEVANT FILES: lib/utils.ts, styles/globals.css, strategic-intelligence/page.tsx, StrategicCard.tsx
 */

"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { Brain, Sparkles, Zap, Target } from 'lucide-react'

interface AIProcessingIndicatorProps {
  message?: string
  subMessage?: string
  stage?: 'analyzing' | 'processing' | 'generating' | 'complete'
  confidence?: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const stageConfig = {
  analyzing: {
    icon: Brain,
    color: 'text-blue-600 dark:text-blue-400',
    message: 'Analyzing strategic context...',
    description: 'Processing market data and competitive intelligence',
  },
  processing: {
    icon: Zap,
    color: 'text-purple-600 dark:text-purple-400', 
    message: 'Applying strategic frameworks...',
    description: 'Running ICE, RICE, and Porter\'s Five Forces analysis',
  },
  generating: {
    icon: Sparkles,
    color: 'text-emerald-600 dark:text-emerald-400',
    message: 'Generating recommendations...',
    description: 'Creating actionable insights and next steps',
  },
  complete: {
    icon: Target,
    color: 'text-green-600 dark:text-green-400',
    message: 'Analysis complete',
    description: 'Strategic intelligence ready for review',
  },
}

/**
 * AIProcessingIndicator Component
 * 
 * Displays intelligent loading states for AI analysis processes
 * with contextual messaging and visual feedback
 */
export function AIProcessingIndicator({ 
  message,
  subMessage,
  stage = 'analyzing',
  confidence,
  className,
  size = 'md',
}: AIProcessingIndicatorProps) {
  const config = stageConfig[stage]
  const Icon = config.icon
  
  const sizeClasses = {
    sm: 'p-3 gap-2',
    md: 'p-4 gap-3', 
    lg: 'p-6 gap-4',
  }
  
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  }
  
  return (
    <div className={cn(
      'pm33-ai-processing flex items-center rounded-lg',
      sizeClasses[size],
      className
    )}>
      {/* Animated Icon */}
      <div className="flex-shrink-0">
        <div className="relative">
          <Icon 
            size={iconSizes[size]} 
            className={cn(config.color, stage !== 'complete' && 'animate-pulse')}
          />
          {stage !== 'complete' && (
            <div className="absolute inset-0 animate-ping">
              <Icon 
                size={iconSizes[size]} 
                className={cn(config.color, 'opacity-20')}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-medium text-slate-900 dark:text-white">
            {message || config.message}
          </p>
          
          {confidence && stage === 'complete' && (
            <div className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              confidence >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
              confidence >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            )}>
              {confidence}% confidence
            </div>
          )}
        </div>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {subMessage || config.description}
        </p>
        
        {/* Progress Indicators */}
        {stage !== 'complete' && (
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="pm33-ai-pulse"
                style={{ 
                  animationDelay: `${i * 0.3}s`,
                  background: `var(--pm33-${stage === 'analyzing' ? 'primary' : stage === 'processing' ? 'ai-pulse' : 'success'})`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Multi-stage Processing Indicator
 */
interface MultiStageProcessingProps {
  stages: Array<{
    name: string
    status: 'pending' | 'active' | 'complete'
    message?: string
  }>
  className?: string
}

export function MultiStageProcessing({ stages, className }: MultiStageProcessingProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {stages.map((stage, index) => {
        const stageType = stage.status === 'active' ? 'processing' : 
                         stage.status === 'complete' ? 'complete' : 'analyzing'
        
        return (
          <div 
            key={index}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg',
              stage.status === 'pending' && 'opacity-50',
              stage.status === 'active' && 'bg-blue-50 dark:bg-blue-900/20',
              stage.status === 'complete' && 'bg-green-50 dark:bg-green-900/20'
            )}
          >
            <div className="flex-shrink-0">
              {stage.status === 'pending' && (
                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
              )}
              {stage.status === 'active' && (
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              )}
              {stage.status === 'complete' && (
                <div className="w-2 h-2 rounded-full bg-green-500" />
              )}
            </div>
            
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {stage.name}
              </p>
              {stage.message && (
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {stage.message}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/**
 * Quick Processing States
 */
export function AnalyzingIndicator(props: Omit<AIProcessingIndicatorProps, 'stage'>) {
  return <AIProcessingIndicator stage="analyzing" {...props} />
}

export function ProcessingIndicator(props: Omit<AIProcessingIndicatorProps, 'stage'>) {
  return <AIProcessingIndicator stage="processing" {...props} />
}

export function GeneratingIndicator(props: Omit<AIProcessingIndicatorProps, 'stage'>) {
  return <AIProcessingIndicator stage="generating" {...props} />
}

export function CompleteIndicator(props: Omit<AIProcessingIndicatorProps, 'stage'>) {
  return <AIProcessingIndicator stage="complete" {...props} />
}