/**
 * File: app/(app)/components/pm33-ui/FrameworkSelector.tsx
 * Description: Strategic framework picker component for analysis selection
 * Purpose: Interactive framework selection with visual indicators and descriptions
 * 
 * RELEVANT FILES: lib/utils.ts, styles/globals.css, strategic-intelligence/page.tsx, StrategicCard.tsx
 */

"use client"

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { PM33Button } from '@/components/PM33Button'
import { 
  Target, 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3,
  CheckCircle,
  Info
} from 'lucide-react'

export type StrategicFramework = 'ICE' | 'RICE' | 'Porter' | 'SWOT' | 'OKR'

interface FrameworkOption {
  id: StrategicFramework
  name: string
  description: string
  icon: React.ComponentType<any>
  color: string
  complexity: 'Simple' | 'Moderate' | 'Advanced'
  timeEstimate: string
  bestFor: string[]
}

const frameworks: FrameworkOption[] = [
  {
    id: 'ICE',
    name: 'ICE Framework',
    description: 'Impact, Confidence, Ease prioritization',
    icon: Target,
    color: 'bg-blue-500',
    complexity: 'Simple',
    timeEstimate: '2-3 min',
    bestFor: ['Feature prioritization', 'Quick decisions', 'Resource allocation']
  },
  {
    id: 'RICE',
    name: 'RICE Framework', 
    description: 'Reach, Impact, Confidence, Effort scoring',
    icon: TrendingUp,
    color: 'bg-purple-500',
    complexity: 'Moderate',
    timeEstimate: '3-5 min',
    bestFor: ['Product roadmaps', 'Initiative ranking', 'Stakeholder alignment']
  },
  {
    id: 'Porter',
    name: "Porter's Five Forces",
    description: 'Competitive landscape analysis',
    icon: Shield,
    color: 'bg-emerald-500',
    complexity: 'Advanced',
    timeEstimate: '5-8 min',
    bestFor: ['Market analysis', 'Competitive strategy', 'Business planning']
  },
  {
    id: 'SWOT',
    name: 'SWOT Analysis',
    description: 'Strengths, Weaknesses, Opportunities, Threats',
    icon: BarChart3,
    color: 'bg-amber-500',
    complexity: 'Moderate',
    timeEstimate: '4-6 min',
    bestFor: ['Strategic planning', 'Risk assessment', 'Opportunity identification']
  },
  {
    id: 'OKR',
    name: 'OKR Framework',
    description: 'Objectives and Key Results alignment',
    icon: Zap,
    color: 'bg-rose-500',
    complexity: 'Advanced',
    timeEstimate: '6-10 min',
    bestFor: ['Goal setting', 'Performance tracking', 'Team alignment']
  }
]

interface FrameworkSelectorProps {
  selectedFramework?: StrategicFramework
  onFrameworkSelect: (framework: StrategicFramework) => void
  disabled?: boolean
  showDetails?: boolean
  className?: string
}

/**
 * FrameworkSelector Component
 * 
 * Interactive selection interface for strategic analysis frameworks
 * with detailed information and visual feedback
 */
export function FrameworkSelector({
  selectedFramework,
  onFrameworkSelect,
  disabled = false,
  showDetails = true,
  className
}: FrameworkSelectorProps) {
  const [hoveredFramework, setHoveredFramework] = useState<StrategicFramework | null>(null)

  return (
    <div className={cn('space-y-4', className)}>
      <div className="pm33-framework-selector">
        {frameworks.map((framework) => {
          const Icon = framework.icon
          const isSelected = selectedFramework === framework.id
          const isHovered = hoveredFramework === framework.id
          
          return (
            <div
              key={framework.id}
              className={cn(
                'pm33-framework-option group',
                isSelected && 'selected ring-2 ring-blue-500 ring-offset-2',
                disabled && 'opacity-50 cursor-not-allowed',
                !disabled && 'hover:shadow-md'
              )}
              onClick={() => !disabled && onFrameworkSelect(framework.id)}
              onMouseEnter={() => setHoveredFramework(framework.id)}
              onMouseLeave={() => setHoveredFramework(null)}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    'p-2 rounded-lg text-white',
                    framework.color
                  )}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">
                      {framework.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {framework.timeEstimate}
                    </p>
                  </div>
                </div>
                
                {isSelected && (
                  <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground mb-3">
                {framework.description}
              </p>

              {/* Complexity Badge */}
              <div className="flex items-center justify-between">
                <span className={cn(
                  'px-2 py-1 rounded-full text-xs font-medium',
                  framework.complexity === 'Simple' && 'bg-green-100 text-green-700',
                  framework.complexity === 'Moderate' && 'bg-yellow-100 text-yellow-700', 
                  framework.complexity === 'Advanced' && 'bg-red-100 text-red-700'
                )}>
                  {framework.complexity}
                </span>
                
                {showDetails && (isHovered || isSelected) && (
                  <PM33Button
                    variant="secondary"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Could open modal with detailed framework info
                    }}
                  >
                    <Info size={12} />
                  </PM33Button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Framework Details */}
      {selectedFramework && showDetails && (
        <div className="p-4 bg-blue-50/80 backdrop-blur-sm rounded-lg border border-blue-200">
          {(() => {
            const selected = frameworks.find(f => f.id === selectedFramework)
            if (!selected) return null
            
            return (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <selected.icon size={16} className="text-blue-600 dark:text-blue-400" />
                  <h4 className="font-semibold text-blue-900">
                    {selected.name} - Best Used For:
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selected.bestFor.map((use, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-sm text-blue-800">
                        {use}
                      </span>
                    </div>
                  ))}
                </div>
                
                <p className="text-sm text-blue-700">
                  Estimated analysis time: <strong>{selected.timeEstimate}</strong>
                </p>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}

/**
 * Quick Framework Selector (Compact Version)
 */
interface QuickFrameworkSelectorProps {
  selectedFramework?: StrategicFramework
  onFrameworkSelect: (framework: StrategicFramework) => void
  disabled?: boolean
}

export function QuickFrameworkSelector({
  selectedFramework,
  onFrameworkSelect,
  disabled = false
}: QuickFrameworkSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {frameworks.map((framework) => {
        const Icon = framework.icon
        const isSelected = selectedFramework === framework.id
        
        return (
          <PM33Button
            key={framework.id}
            variant={isSelected ? "primary" : "secondary"}
            size="sm"
            disabled={disabled}
            onClick={() => onFrameworkSelect(framework.id)}
            className="flex items-center gap-2"
          >
            <div className={cn(
              'p-1 rounded text-white',
              framework.color,
              !isSelected && 'bg-opacity-80'
            )}>
              <Icon size={12} />
            </div>
            {framework.name}
          </PM33Button>
        )
      })}
    </div>
  )
}

/**
 * Framework Comparison Helper
 */
export function getFrameworkRecommendation(context: {
  timeAvailable?: 'quick' | 'moderate' | 'detailed'
  decisionType?: 'tactical' | 'strategic' | 'operational'
  teamSize?: 'individual' | 'small' | 'large'
}): StrategicFramework {
  const { timeAvailable = 'moderate', decisionType = 'tactical' } = context
  
  if (timeAvailable === 'quick') {
    return decisionType === 'strategic' ? 'SWOT' : 'ICE'
  }
  
  if (decisionType === 'strategic') {
    return timeAvailable === 'detailed' ? 'Porter' : 'SWOT'
  }
  
  return timeAvailable === 'detailed' ? 'RICE' : 'ICE'
}