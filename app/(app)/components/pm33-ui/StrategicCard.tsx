/**
 * File: app/(app)/components/pm33-ui/StrategicCard.tsx
 * Description: Premium card component for strategic intelligence interface
 * Purpose: Consistent card styling with hover effects and semantic variants
 * 
 * RELEVANT FILES: lib/utils.ts, styles/globals.css, components/ui/card.tsx, strategic-intelligence/page.tsx
 */

"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Strategic Card Variants using CVA for consistent styling
 */
const strategicCardVariants = cva(
  "pm33-strategic-card transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700",
        elevated: "elevated shadow-md hover:shadow-lg",
        primary: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20",
        success: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20",
        warning: "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20",
        error: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20",
      },
      size: {
        sm: "p-4",
        md: "p-6", 
        lg: "p-8",
        xl: "p-12",
      },
      interactive: {
        true: "cursor-pointer hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false,
    },
  }
)

interface StrategicCardProps 
  extends React.HTMLAttributes<HTMLDivElement>, 
         VariantProps<typeof strategicCardVariants> {
  title?: string
  description?: string
  children?: React.ReactNode
  icon?: React.ReactNode
  badge?: React.ReactNode
  footer?: React.ReactNode
}

/**
 * StrategicCard Component
 * 
 * A premium card component designed for strategic intelligence interface
 * with built-in hover effects, semantic variants, and accessibility features
 */
export function StrategicCard({ 
  className,
  variant,
  size,
  interactive,
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

  return (
    <Card
      className={cn(
        strategicCardVariants({ variant, size, interactive: isInteractive }),
        className
      )}
      onClick={onClick}
      {...props}
    >
      {(title || description || icon || badge) && (
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
                  {icon}
                </div>
              )}
              <div className="space-y-1">
                {title && (
                  <CardTitle className="pm33-h4">{title}</CardTitle>
                )}
                {description && (
                  <p className="pm33-caption">{description}</p>
                )}
              </div>
            </div>
            {badge && (
              <div className="flex-shrink-0">
                {badge}
              </div>
            )}
          </div>
        </CardHeader>
      )}
      
      {children && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}
      
      {footer && (
        <div className="px-6 pb-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          {footer}
        </div>
      )}
    </Card>
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