/**
 * PM33 Design System - SINGLE SOURCE OF TRUTH
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Complete Theme Architecture
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Theme-aware component behavior
 * 
 * STRICT ENFORCEMENT: All components MUST use these tokens
 * NO inline styles, NO raw Tailwind classes allowed
 */

'use client'

export const PM33_THEME = {
  // Glass morphism variants
  glass: {
    primary: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10',
    secondary: 'bg-white/5 backdrop-blur-sm border border-white/10 shadow-md shadow-black/5', 
    interactive: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10 hover:bg-white/20 hover:border-white/40 hover:shadow-2xl hover:shadow-black/30',
    solid: 'bg-white border border-slate-200 shadow-md shadow-slate-900/10'
  },

  // Color system - WCAG AA compliant
  colors: {
    // Text hierarchy
    text: {
      primary: 'text-slate-900',
      secondary: 'text-slate-700', 
      muted: 'text-slate-600',
      inverse: 'text-white',
      accent: 'text-blue-600'
    },
    
    // Background system
    background: {
      primary: 'bg-gradient-to-br from-slate-50 to-blue-50',
      card: 'bg-white/10 backdrop-blur-md',
      solid: 'bg-white',
      overlay: 'bg-black/50'
    },

    // Semantic colors
    semantic: {
      success: 'text-green-600 bg-green-50 border-green-200',
      warning: 'text-orange-600 bg-orange-50 border-orange-200', 
      error: 'text-red-600 bg-red-50 border-red-200',
      info: 'text-blue-600 bg-blue-50 border-blue-200'
    },

    // Category colors for scenarios
    category: {
      blue: 'text-blue-600',
      green: 'text-green-600',
      orange: 'text-orange-600', 
      purple: 'text-purple-600'
    }
  },

  // Spacing system - 8pt grid ONLY
  spacing: {
    // Card padding
    card: {
      sm: 'p-4',    // 16px
      md: 'p-6',    // 24px (default)
      lg: 'p-8',    // 32px
      xl: 'p-10'    // 40px
    },
    
    // Section spacing
    section: 'p-4',              // 16px
    
    // Gap system
    gap: {
      xs: 'gap-2',  // 8px
      sm: 'gap-3',  // 12px  
      md: 'gap-4',  // 16px (default)
      lg: 'gap-6',  // 24px
      xl: 'gap-8'   // 32px
    },

    // Margin system
    margin: {
      xs: 'mb-2',   // 8px
      sm: 'mb-3',   // 12px
      md: 'mb-4',   // 16px (default)
      lg: 'mb-6',   // 24px
      xl: 'mb-8'    // 32px
    }
  },

  // Border radius system
  borderRadius: {
    card: 'rounded-xl',      // 12px - cards, main containers
    button: 'rounded-lg',    // 8px - buttons, small elements  
    input: 'rounded-lg',     // 8px - form inputs
    badge: 'rounded-full'    // Full radius - badges, pills
  },

  // Typography hierarchy
  typography: {
    // Headings
    heading: {
      h1: 'text-4xl font-bold text-slate-900 pm33-text-gradient',
      h2: 'text-2xl font-bold text-slate-900',
      h3: 'text-lg font-semibold text-slate-900',
      h4: 'text-base font-semibold text-slate-900'
    },
    
    // Body text
    body: {
      large: 'text-lg text-slate-700',
      base: 'text-base text-slate-700',
      small: 'text-sm text-slate-600',
      xs: 'text-xs text-slate-500'
    },

    // Special text
    label: 'text-sm font-medium text-slate-700',
    caption: 'text-xs text-slate-500',
    code: 'font-mono text-sm bg-slate-100 px-2 py-1 rounded'
  },

  // Layout system
  layout: {
    // Three-column grid
    threeCol: 'grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-6 min-h-screen',
    
    // Container system
    container: 'max-w-7xl mx-auto px-6 py-8',
    containerCompact: 'max-w-7xl mx-auto px-4 py-6',
    
    // Sidebar widths
    sidebar: {
      left: 'w-[280px]',
      right: 'w-[320px]'
    }
  },

  // Animation system
  animation: {
    // Standard transitions
    transition: 'transition-all duration-300 ease-out',
    transitionFast: 'transition-all duration-200 ease-out',
    transitionSlow: 'transition-all duration-500 ease-out',
    
    // Hover effects
    hover: {
      card: 'hover:transform hover:scale-[1.02] hover:-translate-y-1',
      cardInteractive: 'hover:transform hover:scale-[1.05] hover:-translate-y-2',
      button: 'hover:transform hover:-translate-y-0.5',
      nav: 'hover:translate-x-1'
    },
    
    // Loading states
    loading: 'animate-pulse opacity-60',
    fadeIn: 'animate-fade-in'
  },

  // Shadow system
  shadow: {
    card: 'shadow-lg shadow-black/10',
    cardHover: 'shadow-xl shadow-black/20',
    cardInteractive: 'shadow-2xl shadow-black/30',
    button: 'shadow-md shadow-slate-900/10',
    none: 'shadow-none'
  }
} as const

// Utility function to get theme classes
export function getThemeClass(category: keyof typeof PM33_THEME, ...path: string[]): string {
  let current: any = PM33_THEME[category]
  
  for (const key of path) {
    current = current?.[key]
  }
  
  return current || ''
}

// Type definitions for theme usage
export type ThemeColors = keyof typeof PM33_THEME.colors
export type ThemeSpacing = keyof typeof PM33_THEME.spacing
export type ThemeGlass = keyof typeof PM33_THEME.glass
export type ThemeBorderRadius = keyof typeof PM33_THEME.borderRadius

// Component class generators - Fixed to use string literals instead of theme references
export const pm33Classes = {
  // Card variants
  card: {
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10 rounded-xl p-6 transition-all duration-300 ease-out shadow-lg shadow-black/10',
    interactive: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10 hover:bg-white/20 hover:border-white/40 hover:shadow-2xl hover:shadow-black/30 rounded-xl p-6 transition-all duration-300 ease-out hover:transform hover:scale-[1.05] hover:-translate-y-2 cursor-pointer',
    solid: 'bg-white border border-slate-200 shadow-md shadow-slate-900/10 rounded-xl p-6 transition-all duration-300 ease-out'
  },
  
  // Layout components
  layout: {
    main: 'bg-gradient-to-br from-slate-50 to-blue-50 animate-fade-in min-h-screen',
    container: 'max-w-7xl mx-auto px-6 py-8',
    grid: 'grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-6 min-h-screen'
  },
  
  // Typography
  text: {
    heading: 'text-4xl font-bold text-slate-900 pm33-text-gradient',
    subheading: 'text-2xl font-bold text-slate-900',
    body: 'text-base text-slate-700',
    caption: 'text-xs text-slate-500'
  }
}

// Validation functions for build-time checks
export function validateThemeUsage(className: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Check for forbidden inline Tailwind classes
  const forbiddenClasses = [
    /p-\d+(?!6)/, // Only p-6 allowed for cards
    /m-\d+(?!4)/, // Only m-4 allowed typically
    /bg-(?!white\/|gradient-|slate-50)/, // Only approved backgrounds
    /text-(?!slate-|blue-|green-|orange-|purple-|white)/, // Only approved text colors
    /rounded-(?!xl|lg|full)/, // Only approved border radius
    /gap-(?!2|3|4|6|8)/, // Only approved gaps
  ]
  
  for (const pattern of forbiddenClasses) {
    if (pattern.test(className)) {
      errors.push(`Forbidden Tailwind class pattern detected: ${pattern.source}`)
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

// ESLint rule helper - exports for build validation
export const ALLOWED_TAILWIND_PATTERNS = [
  // Layout
  'grid', 'grid-cols-1', 'lg:grid-cols-3', 'lg:grid-cols-\\[280px_1fr_320px\\]',
  'flex', 'items-center', 'justify-between', 'justify-center', 'space-y-\\d+',
  'gap-[2346]', 'min-h-screen', 'max-w-7xl', 'mx-auto', 'px-[46]', 'py-[68]',
  
  // Typography
  'text-(xs|sm|base|lg|xl|2xl|3xl|4xl)', 'font-(normal|medium|semibold|bold)',
  'text-slate-(500|600|700|900)', 'text-(blue|green|orange|purple)-600',
  'text-white', 'uppercase', 'tracking-wide', 'truncate',
  
  // Backgrounds & Effects
  'bg-white', 'bg-gradient-to-br', 'from-slate-50', 'to-blue-50',
  'bg-white\\/\\d+', 'backdrop-blur-(sm|md)', 'border', 'border-white\\/\\d+',
  
  // Spacing (8pt grid only)
  'p-[46]', 'm-[46]', 'mb-[2346]', 'mt-[2346]', 'space-y-[2346]',
  
  // Borders & Shadows
  'rounded-(lg|xl|full)', 'shadow-(sm|md|lg|xl|2xl)', 'shadow-black\\/\\d+',
  'border-slate-\\d+', 'border-\\w+-\\d+',
  
  // Animations & Transforms
  'transition-all', 'duration-\\d+', 'ease-out', 'hover:.*', 'animate-.*',
  'transform', 'scale-.*', 'translate-.*',
  
  // Interactive states
  'cursor-pointer', 'opacity-\\d+', 'group', 'group-hover:.*'
]

export const FORBIDDEN_PATTERNS = [
  // Raw spacing values
  /p-(?![46](?:\s|$))/, 
  /m-(?![46](?:\s|$))/,
  /gap-(?![2346](?:\s|$))/,
  
  // Raw colors
  /bg-(?!white|gradient-|slate-50|white\/)/,
  /text-(?!slate-|blue-|green-|orange-|purple-|white)/,
  
  // Raw border radius
  /rounded-(?!xl|lg|full)/,
  
  // Inline styles
  /style\s*=\s*\{/
]