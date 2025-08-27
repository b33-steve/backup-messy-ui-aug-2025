'use client';

import { MantineProvider, createTheme, CSSVariablesResolver } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/spotlight/styles.css';

/**
 * PM33 Complete UI System - Official Mantine Theme Integration
 * 
 * This implementation follows Mantine's official best practices using cssVariablesResolver
 * to properly integrate PM33 design tokens with Mantine's CSS variable system.
 * 
 * APPROACH: Uses cssVariablesResolver (official method) instead of component overrides
 * REFERENCE: PM33_COMPLETE_UI_SYSTEM.MD + Mantine official documentation
 * COMPATIBILITY: Full semantic color support (c="dimmed", c="bright", etc.)
 */

/**
 * Official Mantine CSS Variables Resolver
 * Maps PM33 design tokens to Mantine's CSS variable system for seamless integration
 */
const pm33CssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    // Theme-independent variables (spacing, radius, shadows)
    '--mantine-spacing-xs': '0.5rem',    // 8px - PM33 space-2
    '--mantine-spacing-sm': '0.75rem',   // 12px - PM33 space-3
    '--mantine-spacing-md': '1rem',      // 16px - PM33 space-4
    '--mantine-spacing-lg': '1.5rem',    // 24px - PM33 space-6
    '--mantine-spacing-xl': '2rem',      // 32px - PM33 space-8
    
    '--mantine-radius-xs': '4px',        // PM33 minimal radius
    '--mantine-radius-sm': '8px',        // PM33 small radius
    '--mantine-radius-md': '12px',       // PM33 standard radius
    '--mantine-radius-lg': '16px',       // PM33 card radius
    '--mantine-radius-xl': '20px',       // PM33 large radius
    
    '--mantine-shadow-xs': '0 1px 3px 0 rgba(31, 38, 135, 0.1)',
    '--mantine-shadow-sm': '0 4px 6px -1px rgba(31, 38, 135, 0.1)',
    '--mantine-shadow-md': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    '--mantine-shadow-lg': '0 20px 60px 0 rgba(31, 38, 135, 0.25)',
    '--mantine-shadow-xl': '0 25px 50px -12px rgba(31, 38, 135, 0.25)',
  },
  
  light: {
    // Core text and body colors - CRITICAL for default styling
    '--mantine-color-text': 'var(--pm33-text-primary)',         // All default text
    '--mantine-color-body': 'var(--pm33-bg-primary)',           // Body background
    '--mantine-color-error': 'var(--pm33-danger)',              // Error states
    '--mantine-color-placeholder': 'var(--pm33-text-muted)',    // Input placeholders
    '--mantine-color-anchor': 'var(--pm33-primary)',            // Links
    
    // Default component colors - Paper, Card, etc.
    '--mantine-color-default': 'var(--pm33-bg-secondary)',      // Default backgrounds
    '--mantine-color-default-hover': 'var(--pm33-bg-tertiary)', // Hover states
    '--mantine-color-default-color': 'var(--pm33-text-primary)', // Default component text
    '--mantine-color-default-border': 'var(--pm33-border)',     // Default borders
    
    // Semantic colors for c="dimmed", c="bright" etc.
    '--mantine-color-dimmed': 'var(--pm33-text-secondary)',     // c="dimmed"
    '--mantine-color-bright': 'var(--pm33-text-primary)',       // c="bright"
    '--mantine-color-dark': 'var(--pm33-text-primary)',         // c="dark"
    
    // Complete Mantine dark palette override (light theme)
    '--mantine-color-dark-0': 'var(--pm33-text-primary)',       // Darkest text
    '--mantine-color-dark-1': 'var(--pm33-text-primary)',
    '--mantine-color-dark-2': 'var(--pm33-text-secondary)',
    '--mantine-color-dark-3': 'var(--pm33-text-muted)',
    '--mantine-color-dark-4': 'var(--pm33-bg-tertiary)',
    '--mantine-color-dark-5': 'var(--pm33-bg-secondary)',
    '--mantine-color-dark-6': 'var(--pm33-bg-secondary)',
    '--mantine-color-dark-7': 'var(--pm33-bg-primary)',         // Lightest bg
    '--mantine-color-dark-8': 'var(--pm33-bg-primary)',
    '--mantine-color-dark-9': 'var(--pm33-bg-primary)',
    
    // ThemeIcon light variants that were causing light backgrounds
    '--mantine-color-blue-light': 'var(--pm33-primary-100)',
    '--mantine-color-blue-light-color': 'var(--pm33-primary)',
    '--mantine-color-indigo-light': 'var(--pm33-primary-100)',
    '--mantine-color-indigo-light-color': 'var(--pm33-primary)',
    '--mantine-color-yellow-light': 'var(--pm33-warning-100)',
    '--mantine-color-yellow-light-color': 'var(--pm33-warning)',
    '--mantine-color-teal-light': 'var(--pm33-success-100)',
    '--mantine-color-teal-light-color': 'var(--pm33-success)',
    
    // Color-specific filled variants
    '--mantine-color-blue-filled': 'var(--pm33-primary)',
    '--mantine-color-indigo-filled': 'var(--pm33-primary)',
    '--mantine-color-yellow-filled': 'var(--pm33-warning)',
    '--mantine-color-teal-filled': 'var(--pm33-success)',
    
    // Primary color scale
    '--mantine-primary-color-0': 'var(--pm33-primary-50)',
    '--mantine-primary-color-1': 'var(--pm33-primary-100)',
    '--mantine-primary-color-2': 'var(--pm33-primary-200)',
    '--mantine-primary-color-3': 'var(--pm33-primary-300)',
    '--mantine-primary-color-4': 'var(--pm33-primary-400)',
    '--mantine-primary-color-5': 'var(--pm33-primary)',
    '--mantine-primary-color-6': 'var(--pm33-primary)',
    '--mantine-primary-color-7': 'var(--pm33-primary)',
    '--mantine-primary-color-8': 'var(--pm33-primary-800)',
    '--mantine-primary-color-9': 'var(--pm33-primary-900)',
  },
  
  dark: {
    // Core text and body colors - CRITICAL for dark mode styling
    '--mantine-color-text': 'var(--pm33-text-primary)',         // White text for all components
    '--mantine-color-body': 'var(--pm33-bg-primary)',           // Dark body background
    '--mantine-color-error': 'var(--pm33-danger)',              // Error states
    '--mantine-color-placeholder': 'var(--pm33-text-muted)',    // Input placeholders
    '--mantine-color-anchor': 'var(--pm33-primary)',            // Links
    
    // Default component colors - MUST be dark in dark mode
    '--mantine-color-default': 'var(--pm33-bg-secondary)',      // Dark component backgrounds
    '--mantine-color-default-hover': 'var(--pm33-bg-tertiary)', // Hover states
    '--mantine-color-default-color': 'var(--pm33-text-primary)', // White component text
    '--mantine-color-default-border': 'var(--pm33-border)',     // Dark borders
    
    // Semantic colors for dark mode
    '--mantine-color-dimmed': 'var(--pm33-text-secondary)',     // c="dimmed" → light gray
    '--mantine-color-bright': 'var(--pm33-text-primary)',       // c="bright" → white
    '--mantine-color-dark': 'var(--pm33-text-muted)',           // c="dark" → muted in dark mode
    
    // Complete Mantine dark palette override (dark theme) - CRITICAL
    '--mantine-color-dark-0': 'var(--pm33-text-primary)',       // White (lightest text)
    '--mantine-color-dark-1': 'var(--pm33-text-secondary)',     // Light gray text
    '--mantine-color-dark-2': 'var(--pm33-text-muted)',         // Muted text
    '--mantine-color-dark-3': 'var(--pm33-bg-tertiary)',        // Light background
    '--mantine-color-dark-4': 'var(--pm33-bg-secondary)',       // Medium background  
    '--mantine-color-dark-5': 'var(--pm33-bg-secondary)',       // Default bg
    '--mantine-color-dark-6': 'var(--pm33-bg-secondary)',       // Card backgrounds
    '--mantine-color-dark-7': 'var(--pm33-bg-primary)',         // Dark body background
    '--mantine-color-dark-8': 'var(--pm33-bg-primary)',         // Darker
    '--mantine-color-dark-9': 'var(--pm33-bg-primary)',         // Darkest
    
    // ThemeIcon light variants - MUST be dark in dark mode
    '--mantine-color-blue-light': 'var(--pm33-bg-secondary)',
    '--mantine-color-blue-light-color': 'var(--pm33-primary)',
    '--mantine-color-indigo-light': 'var(--pm33-bg-secondary)',
    '--mantine-color-indigo-light-color': 'var(--pm33-primary)',
    '--mantine-color-yellow-light': 'var(--pm33-bg-secondary)',
    '--mantine-color-yellow-light-color': 'var(--pm33-warning)',
    '--mantine-color-teal-light': 'var(--pm33-bg-secondary)',
    '--mantine-color-teal-light-color': 'var(--pm33-success)',
    
    // Color-specific filled variants
    '--mantine-color-blue-filled': 'var(--pm33-primary)',
    '--mantine-color-indigo-filled': 'var(--pm33-primary)',
    '--mantine-color-yellow-filled': 'var(--pm33-warning)',
    '--mantine-color-teal-filled': 'var(--pm33-success)',
    
    // Primary color scale for dark theme
    '--mantine-primary-color-0': 'var(--pm33-primary-50)',
    '--mantine-primary-color-1': 'var(--pm33-primary-100)',
    '--mantine-primary-color-2': 'var(--pm33-primary-200)',
    '--mantine-primary-color-3': 'var(--pm33-primary-300)',
    '--mantine-primary-color-4': 'var(--pm33-primary-400)',
    '--mantine-primary-color-5': 'var(--pm33-primary)',
    '--mantine-primary-color-6': 'var(--pm33-primary)',
    '--mantine-primary-color-7': 'var(--pm33-primary)',
    '--mantine-primary-color-8': 'var(--pm33-primary-800)',
    '--mantine-primary-color-9': 'var(--pm33-primary-900)',
  },
});

const theme = createTheme({
  /** PM33 Theme Integration - Official Mantine Approach */
  primaryColor: 'blue',
  
  // PM33 Typography System (matches globals.css)
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2' },      // 40px - PM33 system
      h2: { fontSize: '2rem', lineHeight: '1.2' },        // 32px - PM33 system  
      h3: { fontSize: '1.5rem', lineHeight: '1.33' },     // 24px - PM33 system
      h4: { fontSize: '1.25rem', lineHeight: '1.4' },     // 20px - PM33 system
      h5: { fontSize: '1.125rem', lineHeight: '1.44' },   // 18px - PM33 system
      h6: { fontSize: '1rem', lineHeight: '1.5' },        // 16px - PM33 system
    }
  },
  
  // Minimal component overrides - let cssVariablesResolver handle colors
  components: {
    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'md',
        padding: 'lg',
      },
      styles: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            transform: 'translateY(-2px)',
          }
        }
      }
    },
    
    Button: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
      styles: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          fontWeight: 500,
          '&:hover': {
            transform: 'translateY(-1px) scale(1.02)',
          }
        }
      }
    },
    
    Input: {
      defaultProps: {
        radius: 'md',
      }
    },
    
    Modal: {
      defaultProps: {
        radius: 'lg',
        shadow: 'xl',
        centered: true,
      }
    }
  }
});

interface MantineWrapperProps {
  children: React.ReactNode;
}

export default function MantineWrapper({ children }: MantineWrapperProps) {
  return (
    <MantineProvider 
      theme={theme} 
      defaultColorScheme="dark"
      cssVariablesResolver={pm33CssVariablesResolver}
    >
      {children}
    </MantineProvider>
  );
}