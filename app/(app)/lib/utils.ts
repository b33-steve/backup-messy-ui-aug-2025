/**
 * File: app/(app)/lib/utils.ts
 * Description: Core utility functions for PM33 design system
 * Purpose: Styling utilities, class merging, and design tokens for core app
 * 
 * RELEVANT FILES: components/ui/button.tsx, components/ui/card.tsx, styles/globals.css, components/pm33-ui/StrategicCard.tsx
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind classes efficiently
 * Handles class conflicts and conditional styling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * PM33 Design System Utilities
 */
export const pm33 = {
  // Animation utilities
  animations: {
    fadeIn: "animate-in fade-in-0 duration-200",
    slideUp: "animate-in slide-in-from-bottom-4 duration-300",
    scaleIn: "animate-in zoom-in-95 duration-200",
    shimmer: "animate-pulse",
  },
  
  // Color utilities for semantic meanings
  colors: {
    primary: "bg-pm33-primary text-white",
    success: "bg-pm33-success text-white", 
    warning: "bg-pm33-warning text-white",
    error: "bg-pm33-error text-white",
    surface: "bg-pm33-surface border-pm33-border",
    background: "bg-pm33-background",
  },
  
  // Typography utilities
  typography: {
    h1: "text-3xl md:text-4xl font-bold tracking-tight",
    h2: "text-2xl md:text-3xl font-semibold tracking-tight", 
    h3: "text-xl md:text-2xl font-semibold",
    h4: "text-lg md:text-xl font-medium",
    body: "text-base leading-relaxed",
    caption: "text-sm text-muted-foreground",
    label: "text-sm font-medium",
  },
  
  // Spacing utilities following 8pt grid
  spacing: {
    xs: "p-2",    // 8px
    sm: "p-4",    // 16px  
    md: "p-6",    // 24px
    lg: "p-8",    // 32px
    xl: "p-12",   // 48px
  },
  
  // Shadow utilities for depth
  shadows: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg shadow-black/10",
    xl: "shadow-xl shadow-black/20",
  },
  
  // Border radius utilities
  radius: {
    sm: "rounded-sm",
    md: "rounded-md", 
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  },
}

/**
 * Responsive breakpoint utilities
 */
export const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

/**
 * Strategic framework color mappings
 */
export const frameworkColors = {
  'ICE': 'bg-blue-500',
  'RICE': 'bg-purple-500', 
  'Porter': 'bg-emerald-500',
  'SWOT': 'bg-amber-500',
  'OKR': 'bg-rose-500',
} as const

/**
 * Status indicator mappings
 */
export const statusIndicators = {
  healthy: { color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800' },
  warning: { color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-800' },
  error: { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800' },
  offline: { color: 'text-slate-500', bg: 'bg-slate-50 dark:bg-slate-900/20', border: 'border-slate-200 dark:border-slate-800' },
} as const

/**
 * Format confidence scores with appropriate styling
 */
export function formatConfidence(confidence: number): {
  text: string;
  className: string;
  level: 'high' | 'medium' | 'low';
} {
  const level = confidence >= 90 ? 'high' : confidence >= 70 ? 'medium' : 'low'
  
  const classNames = {
    high: 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800', 
    low: 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800',
  }
  
  return {
    text: `${confidence}% confidence`,
    className: classNames[level],
    level,
  }
}

/**
 * Generate consistent loading states
 */
export function createLoadingState(message: string = "Processing...") {
  return {
    isLoading: true,
    message,
    component: "AIProcessingIndicator",
  }
}