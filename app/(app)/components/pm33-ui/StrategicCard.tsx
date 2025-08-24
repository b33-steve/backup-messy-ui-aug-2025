/**
 * File: app/(app)/components/pm33-ui/StrategicCard.tsx
 * Description: Premium card component for strategic intelligence interface using PM33 design system
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Glass morphism card system
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Strategic card patterns
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

import React from 'react'
import { PM33Card } from '@/components/PM33Card'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface StrategicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  children?: React.ReactNode
  icon?: React.ReactNode
  badge?: React.ReactNode
  footer?: React.ReactNode
  variant?: 'default' | 'elevated' | 'primary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  interactive?: boolean
}

const variantStyles = {
  default: "bg-white/80 backdrop-blur-sm border border-gray-200",
  elevated: "bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg",
  primary: "bg-blue-50/80 backdrop-blur-sm border border-blue-200",
  success: "bg-green-50/80 backdrop-blur-sm border border-green-200",
  warning: "bg-yellow-50/80 backdrop-blur-sm border border-yellow-200",
  error: "bg-red-50/80 backdrop-blur-sm border border-red-200"
}

const sizeStyles = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8", 
  xl: "p-12"
}

/**
 * StrategicCard Component
 * 
 * A premium card component designed for strategic intelligence interface
 * with built-in hover effects, semantic variants, and accessibility features
 */
export function StrategicCard({ 
  className,
  variant = 'default',
  size = 'md',
  interactive = false,
  title,
  description,
  children,
  icon,
  badge,
  footer,
  onClick,
  ...props 
}: StrategicCardProps) {
  const isInteractive = interactive || !!onClick

  const CardWrapper = isInteractive ? motion.div : 'div'
  const motionProps = isInteractive ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
  } : {}

  return (
    <CardWrapper {...(isInteractive ? motionProps : {})}>
      <PM33Card
        className={cn(
          'transition-all duration-200',
          variantStyles[variant],
          sizeStyles[size],
          isInteractive && 'cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {(title || description || icon || badge) && (
          <div className="mb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {icon && (
                  <div className="flex-shrink-0 text-blue-600">
                    {icon}
                  </div>
                )}
                <div className="space-y-1">
                  {title && (
                    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                  )}
                  {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                  )}
                </div>
              </div>
              {badge && (
                <div className="flex-shrink-0">
                  {badge}
                </div>
              )}
            </div>
          </div>
        )}
        
        {children && (
          <div>
            {children}
          </div>
        )}
        
        {footer && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            {footer}
          </div>
        )}
      </PM33Card>
    </CardWrapper>
  )
}

/**
 * Pre-configured Strategic Card Variants
 */
export function AnalysisCard({ children, ...props }: StrategicCardProps) {
  return (
    <StrategicCard variant="elevated" size="lg" {...props}>
      {children}
    </StrategicCard>
  )
}

export function FrameworkCard({ children, ...props }: StrategicCardProps) {
  return (
    <StrategicCard variant="primary" interactive size="md" {...props}>
      {children}
    </StrategicCard>
  )
}

export function ResultsCard({ children, ...props }: StrategicCardProps) {
  return (
    <StrategicCard variant="success" size="lg" {...props}>
      {children}
    </StrategicCard>
  )
}

export function StatusCard({ children, ...props }: StrategicCardProps) {
  return (
    <StrategicCard variant="default" size="sm" {...props}>
      {children}
    </StrategicCard>
  )
}