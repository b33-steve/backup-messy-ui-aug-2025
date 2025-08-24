/**
 * PM33 Theme System - Single Source of Truth
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md - Complete Theme Architecture
 * UX Pattern: PM33_COMPLETE_UX_SYSTEM.md - Theme-aware component behavior
 * 
 * This file exports ALL theme configuration for PM33:
 * - CSS Custom Properties (color variables)
 * - Glass morphism utilities
 * - Animation classes and keyframes
 * - Responsive breakpoints
 * - ThemeProvider for shadcn/ui integration
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// ============================================================================
// PM33 THEME CONFIGURATION
// ============================================================================

export const pm33Theme = {
  // Primary Brand Gradients
  brand: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    hover: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
    active: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  
  // Strategic Intelligence Colors
  ai: {
    glow: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
    processing: 'linear-gradient(135deg, #667eea 0%, #00d2ff 100%)',
    success: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    warning: 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)',
    danger: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)'
  },
  
  // Glass Morphism Settings
  glass: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.18)',
    shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    backdropFilter: 'blur(40px) saturate(150%)',
    borderRadius: '16px'
  },
  
  // Dark Mode Surfaces (Professional Theme)
  surfaces: {
    dark: {
      0: '#0a0e27',
      1: '#0f1429', 
      2: '#151b3b',
      3: '#1e2749'
    },
    light: {
      0: '#fafbff',
      1: '#ffffff',
      2: 'rgba(255, 255, 255, 0.95)',
      3: 'rgba(248, 250, 252, 0.98)'
    }
  },
  
  // Semantic Colors
  semantic: {
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textTertiary: '#94a3b8',
    borderSubtle: 'rgba(0, 0, 0, 0.06)',
    borderDefault: 'rgba(0, 0, 0, 0.12)'
  },
  
  // Typography Scale
  typography: {
    h1: '2.5rem',
    h2: '2rem', 
    h3: '1.5rem',
    h4: '1.25rem',
    large: '1.125rem',
    base: '1rem',
    small: '0.875rem',
    tiny: '0.75rem'
  },
  
  // Font Weights
  fontWeights: {
    bold: 700,
    semibold: 600,
    medium: 500,
    regular: 400
  },
  
  // Line Heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75
  },
  
  // Letter Spacing
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.05em'
  },
  
  // Spacing (8pt Grid)
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem', 
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem'
  },
  
  // Responsive Breakpoints
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

// ============================================================================
// CSS CUSTOM PROPERTIES GENERATOR
// ============================================================================

export const generateCSSVariables = () => {
  return `
    :root {
      /* Primary Brand Gradients */
      --pm33-brand: ${pm33Theme.brand.primary};
      --pm33-brand-hover: ${pm33Theme.brand.hover};
      --pm33-brand-active: ${pm33Theme.brand.active};
      
      /* Strategic Intelligence Colors */
      --pm33-ai-glow: ${pm33Theme.ai.glow};
      --pm33-ai-processing: ${pm33Theme.ai.processing};
      --pm33-success: ${pm33Theme.ai.success};
      --pm33-warning: ${pm33Theme.ai.warning};
      --pm33-danger: ${pm33Theme.ai.danger};
      
      /* Glass Morphism Backgrounds */
      --pm33-glass: ${pm33Theme.glass.background};
      --pm33-glass-border: ${pm33Theme.glass.border};
      --pm33-glass-shadow: ${pm33Theme.glass.shadow};
      --pm33-glass-backdrop-filter: ${pm33Theme.glass.backdropFilter};
      --pm33-glass-border-radius: ${pm33Theme.glass.borderRadius};
      
      /* Dark Mode Surfaces (Professional Theme) */
      --pm33-dark-0: ${pm33Theme.surfaces.dark[0]};
      --pm33-dark-1: ${pm33Theme.surfaces.dark[1]};
      --pm33-dark-2: ${pm33Theme.surfaces.dark[2]};
      --pm33-dark-3: ${pm33Theme.surfaces.dark[3]};
      
      /* Light Mode Surfaces */
      --pm33-light-0: ${pm33Theme.surfaces.light[0]};
      --pm33-light-1: ${pm33Theme.surfaces.light[1]};
      --pm33-light-2: ${pm33Theme.surfaces.light[2]};
      --pm33-light-3: ${pm33Theme.surfaces.light[3]};
      
      /* Semantic Colors */
      --pm33-text-primary: ${pm33Theme.semantic.textPrimary};
      --pm33-text-secondary: ${pm33Theme.semantic.textSecondary};
      --pm33-text-tertiary: ${pm33Theme.semantic.textTertiary};
      --pm33-border-subtle: ${pm33Theme.semantic.borderSubtle};
      --pm33-border-default: ${pm33Theme.semantic.borderDefault};
      
      /* PM33 Typography */
      --font-h1: ${pm33Theme.typography.h1};
      --font-h2: ${pm33Theme.typography.h2};
      --font-h3: ${pm33Theme.typography.h3};
      --font-h4: ${pm33Theme.typography.h4};
      --font-large: ${pm33Theme.typography.large};
      --font-base: ${pm33Theme.typography.base};
      --font-small: ${pm33Theme.typography.small};
      --font-tiny: ${pm33Theme.typography.tiny};
      
      /* Font Weights */
      --weight-bold: ${pm33Theme.fontWeights.bold};
      --weight-semibold: ${pm33Theme.fontWeights.semibold};
      --weight-medium: ${pm33Theme.fontWeights.medium};
      --weight-regular: ${pm33Theme.fontWeights.regular};
      
      /* Line Heights */
      --leading-tight: ${pm33Theme.lineHeights.tight};
      --leading-normal: ${pm33Theme.lineHeights.normal};
      --leading-relaxed: ${pm33Theme.lineHeights.relaxed};
      
      /* Letter Spacing */
      --tracking-tight: ${pm33Theme.letterSpacing.tight};
      --tracking-normal: ${pm33Theme.letterSpacing.normal};
      --tracking-wide: ${pm33Theme.letterSpacing.wide};
      
      /* PM33 Spacing (8pt Grid) */
      --space-0: ${pm33Theme.spacing[0]};
      --space-1: ${pm33Theme.spacing[1]};
      --space-2: ${pm33Theme.spacing[2]};
      --space-3: ${pm33Theme.spacing[3]};
      --space-4: ${pm33Theme.spacing[4]};
      --space-5: ${pm33Theme.spacing[5]};
      --space-6: ${pm33Theme.spacing[6]};
      --space-8: ${pm33Theme.spacing[8]};
      --space-10: ${pm33Theme.spacing[10]};
      --space-12: ${pm33Theme.spacing[12]};
      --space-16: ${pm33Theme.spacing[16]};
    }
  `;
};

// ============================================================================
// GLASS MORPHISM UTILITIES
// ============================================================================

export const glassStyles = {
  // Standard glass morphism card
  card: {
    background: pm33Theme.glass.background,
    backdropFilter: pm33Theme.glass.backdropFilter,
    WebkitBackdropFilter: pm33Theme.glass.backdropFilter,
    border: `1px solid ${pm33Theme.glass.border}`,
    borderRadius: pm33Theme.glass.borderRadius,
    boxShadow: pm33Theme.glass.shadow
  },
  
  // Premium glass with enhanced effects
  premium: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: pm33Theme.glass.backdropFilter,
    WebkitBackdropFilter: pm33Theme.glass.backdropFilter,
    border: `1px solid ${pm33Theme.glass.border}`,
    borderRadius: pm33Theme.glass.borderRadius,
    boxShadow: `
      0 8px 32px 0 rgba(31, 38, 135, 0.15),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1)
    `
  },
  
  // AI-themed glass with blue tint
  ai: {
    background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.1) 0%, rgba(58, 123, 213, 0.05) 100%)',
    backdropFilter: pm33Theme.glass.backdropFilter,
    WebkitBackdropFilter: pm33Theme.glass.backdropFilter,
    border: `1px solid rgba(0, 210, 255, 0.2)`,
    borderRadius: pm33Theme.glass.borderRadius,
    boxShadow: `
      0 8px 32px 0 rgba(0, 210, 255, 0.15),
      inset 0 0 0 1px rgba(0, 210, 255, 0.1)
    `
  },
  
  // Minimal glass for subtle components
  minimal: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px) saturate(120%)',
    WebkitBackdropFilter: 'blur(20px) saturate(120%)',
    border: `1px solid rgba(255, 255, 255, 0.1)`,
    borderRadius: '12px',
    boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.1)'
  }
};

// ============================================================================
// ANIMATION CLASSES AND KEYFRAMES
// ============================================================================

export const animations = {
  // Keyframes
  keyframes: `
    @keyframes pm33-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    
    @keyframes pm33-glow {
      0%, 100% { 
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.5),
                    0 0 40px rgba(102, 126, 234, 0.3);
      }
      50% { 
        box-shadow: 0 0 30px rgba(102, 126, 234, 0.8),
                    0 0 60px rgba(102, 126, 234, 0.4);
      }
    }
    
    @keyframes pm33-fade-up {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes pm33-pulse-scale {
      0%, 100% {
        transform: scale(1);
        opacity: 0.3;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.1;
      }
    }
    
    @keyframes pm33-shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    
    @keyframes pm33-gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes pm33-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes pm33-bounce {
      0%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
    }
    
    @keyframes pm33-progress-slide {
      0% {
        width: 0%;
        margin-left: 0;
      }
      50% {
        width: 60%;
        margin-left: 20%;
      }
      100% {
        width: 0%;
        margin-left: 100%;
      }
    }
    
    @keyframes pm33-ping {
      75%, 100% {
        transform: scale(2);
        opacity: 0;
      }
    }
  `,
  
  // CSS Classes
  classes: `
    .pm33-animate-float {
      animation: pm33-float 3s ease-in-out infinite;
    }
    
    .pm33-animate-glow {
      animation: pm33-glow 2s ease-in-out infinite;
    }
    
    .pm33-animate-fade-up {
      animation: pm33-fade-up 0.6s ease-out forwards;
    }
    
    .pm33-animate-gradient {
      background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c);
      background-size: 400% 400%;
      animation: pm33-gradient-shift 15s ease infinite;
    }
    
    .pm33-animate-shimmer {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 1000px 100%;
      animation: pm33-shimmer 2s infinite;
    }
    
    .pm33-animate-pulse-scale {
      animation: pm33-pulse-scale 2s ease-in-out infinite;
    }
    
    .pm33-animate-spin {
      animation: pm33-spin 1s linear infinite;
    }
    
    .pm33-animate-bounce {
      animation: pm33-bounce 1.4s ease-in-out infinite;
    }
    
    .pm33-animate-ping {
      animation: pm33-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
  `
};

// ============================================================================
// UTILITY CLASSES
// ============================================================================

export const utilityClasses = `
  /* Glass Morphism Utilities */
  .pm33-glass {
    background: var(--pm33-glass);
    backdrop-filter: var(--pm33-glass-backdrop-filter);
    -webkit-backdrop-filter: var(--pm33-glass-backdrop-filter);
    border: 1px solid var(--pm33-glass-border);
    border-radius: var(--pm33-glass-border-radius);
    box-shadow: var(--pm33-glass-shadow);
  }
  
  .pm33-glass-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    backdrop-filter: var(--pm33-glass-backdrop-filter);
    -webkit-backdrop-filter: var(--pm33-glass-backdrop-filter);
    border: 1px solid var(--pm33-glass-border);
    border-radius: var(--pm33-glass-border-radius);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
  
  /* Text Gradients */
  .pm33-text-gradient {
    background: var(--pm33-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .pm33-text-ai-gradient {
    background: var(--pm33-ai-glow);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  /* Button Styles */
  .pm33-btn-primary {
    background: var(--pm33-brand);
    border: none;
    color: white;
    font-weight: var(--weight-medium);
    transition: all 0.3s ease;
  }
  
  .pm33-btn-primary:hover {
    background: var(--pm33-brand-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px 0 rgba(118, 75, 162, 0.4);
  }
  
  .pm33-btn-ai {
    background: var(--pm33-ai-processing);
    border: none;
    color: white;
    font-weight: var(--weight-medium);
    transition: all 0.3s ease;
  }
  
  .pm33-btn-ai:hover {
    background: var(--pm33-ai-glow);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px 0 rgba(0, 210, 255, 0.4);
  }
`;

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const mediaQueries = {
  xs: `(min-width: ${pm33Theme.breakpoints.xs})`,
  sm: `(min-width: ${pm33Theme.breakpoints.sm})`, 
  md: `(min-width: ${pm33Theme.breakpoints.md})`,
  lg: `(min-width: ${pm33Theme.breakpoints.lg})`,
  xl: `(min-width: ${pm33Theme.breakpoints.xl})`,
  '2xl': `(min-width: ${pm33Theme.breakpoints['2xl']})`
};

// ============================================================================
// THEME CONTEXT
// ============================================================================

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  theme: typeof pm33Theme;
  glassStyles: typeof glassStyles;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ============================================================================
// THEME PROVIDER FOR SHADCN/UI INTEGRATION
// ============================================================================

interface PM33ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  storageKey?: string;
}

export const PM33ThemeProvider: React.FC<PM33ThemeProviderProps> = ({
  children,
  defaultMode = 'dark',
  storageKey = 'pm33-theme'
}) => {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [mounted, setMounted] = useState(false);

  // Load theme from storage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey) as ThemeMode;
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        setModeState(stored);
      }
    }
    setMounted(true);
  }, [storageKey]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = mode === 'dark' || (mode === 'system' && systemDark);

    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
    
    // Set data attribute for CSS targeting
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    
    // Store theme preference
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, mode);
    }
  }, [mode, mounted, storageKey]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  const systemDark = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-color-scheme: dark)').matches 
    : false;
  const isDark = mode === 'dark' || (mode === 'system' && systemDark);

  const value: ThemeContextValue = {
    mode,
    setMode,
    theme: pm33Theme,
    glassStyles,
    isDark
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      {/* Inject CSS variables and animations */}
      <style jsx global>{`
        ${generateCSSVariables()}
        ${animations.keyframes}
        ${animations.classes}
        ${utilityClasses}
      `}</style>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================================
// THEME HOOK
// ============================================================================

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a PM33ThemeProvider');
  }
  return context;
};

// ============================================================================
// THEME UTILITIES
// ============================================================================

export const getGlassStyle = (variant: keyof typeof glassStyles) => {
  return glassStyles[variant];
};

export const getResponsiveValue = <T>(
  values: Partial<Record<keyof typeof pm33Theme.breakpoints, T>>,
  fallback: T
): T => {
  if (typeof window === 'undefined') return fallback;
  
  const breakpoints = Object.entries(pm33Theme.breakpoints).reverse();
  
  for (const [key, minWidth] of breakpoints) {
    if (window.matchMedia(`(min-width: ${minWidth})`).matches) {
      const value = values[key as keyof typeof values];
      if (value !== undefined) return value;
    }
  }
  
  return fallback;
};

export const createResponsiveStyles = (
  styles: Partial<Record<keyof typeof pm33Theme.breakpoints, React.CSSProperties>>
): React.CSSProperties => {
  if (typeof window === 'undefined') return {};
  
  const breakpoints = Object.entries(pm33Theme.breakpoints);
  let appliedStyles: React.CSSProperties = {};
  
  for (const [key, minWidth] of breakpoints) {
    if (window.matchMedia(`(min-width: ${minWidth})`).matches) {
      const breakpointStyles = styles[key as keyof typeof styles];
      if (breakpointStyles) {
        appliedStyles = { ...appliedStyles, ...breakpointStyles };
      }
    }
  }
  
  return appliedStyles;
};

// ============================================================================
// EXPORTS
// ============================================================================

export default PM33ThemeProvider;

export {
  pm33Theme,
  glassStyles,
  animations,
  utilityClasses,
  mediaQueries,
  generateCSSVariables
};