'use client';

import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/spotlight/styles.css';

/**
 * PM33 Complete UI System - Mantine Theme Integration
 * 
 * This theme aligns Mantine components with PM33_COMPLETE_UI_SYSTEM.MD
 * specifications including premium gradients, glass morphism, and 
 * strategic intelligence visual language.
 * 
 * REFERENCE: PM33_COMPLETE_UI_SYSTEM.MD
 * COMPATIBILITY: Uses PM33 design tokens from globals.css
 */

const theme = createTheme({
  /** PM33 Strategic Intelligence Platform Theme - Premium Implementation */
  primaryColor: 'pm33Brand',
  defaultColorScheme: 'dark',
  
  colors: {
    // PM33 Brand Colors (aligned with gradient system)
    pm33Brand: [
      '#f0f6ff',      // pm33Brand.0 - Lightest tint
      '#d9ecff',      // pm33Brand.1 - Very light
      '#a6d5ff',      // pm33Brand.2 - Light
      '#73beff',      // pm33Brand.3 - Light medium
      '#667eea',      // pm33Brand.4 - Base brand start
      '#764ba2',      // pm33Brand.5 - Brand middle
      '#6366f1',      // pm33Brand.6 - Brand accent
      '#4f46e5',      // pm33Brand.7 - Darker
      '#4338ca',      // pm33Brand.8 - Very dark
      '#3730a3'       // pm33Brand.9 - Darkest
    ],
    
    // AI Processing Colors (strategic intelligence)
    aiGlow: [
      '#f0fcff',      // aiGlow.0 - Lightest
      '#e0f9ff',      // aiGlow.1 - Very light
      '#baf2ff',      // aiGlow.2 - Light
      '#7ee8ff',      // aiGlow.3 - Light medium
      '#00d2ff',      // aiGlow.4 - Base AI glow start
      '#3a7bd5',      // aiGlow.5 - AI glow end
      '#2563eb',      // aiGlow.6 - Accent
      '#1d4ed8',      // aiGlow.7 - Darker
      '#1e40af',      // aiGlow.8 - Very dark
      '#1e3a8a'       // aiGlow.9 - Darkest
    ],
    
    // Success States (strategic outcomes)
    strategicSuccess: [
      '#ecfdf5',      // Success lightest
      '#d1fae5',      // Success very light
      '#a7f3d0',      // Success light
      '#6ee7b7',      // Success light medium
      '#38ef7d',      // Success bright (from PM33 system)
      '#11998e',      // Success base (from PM33 system)
      '#059669',      // Success darker
      '#047857',      // Success very dark
      '#065f46',      // Success darkest
      '#064e3b'       // Success deepest
    ],
    
    // Warning States (attention)
    strategicWarning: [
      '#fffbeb',      // Warning lightest
      '#fef3c7',      // Warning very light
      '#fde68a',      // Warning light
      '#facc15',      // Warning light medium
      '#f2c94c',      // Warning bright (from PM33 system)
      '#f2994a',      // Warning base (from PM33 system)
      '#d97706',      // Warning darker
      '#b45309',      // Warning very dark
      '#92400e',      // Warning darkest
      '#78350f'       // Warning deepest
    ],
    
    // Error States (critical)
    strategicError: [
      '#fef2f2',      // Error lightest
      '#fecaca',      // Error very light
      '#fca5a5',      // Error light
      '#f87171',      // Error light medium
      '#f45c43',      // Error bright (from PM33 system)
      '#eb3349',      // Error base (from PM33 system)
      '#dc2626',      // Error darker
      '#b91c1c',      // Error very dark
      '#991b1b',      // Error darkest
      '#7f1d1d'       // Error deepest
    ]
  },
  
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
  
  // PM33 Spacing System (8pt grid from PM33_COMPLETE_UI_SYSTEM.MD)
  spacing: {
    xs: '0.5rem',    // 8px - space-2
    sm: '0.75rem',   // 12px - space-3
    md: '1rem',      // 16px - space-4
    lg: '1.5rem',    // 24px - space-6
    xl: '2rem',      // 32px - space-8
  },
  
  // PM33 Border Radius (glass morphism compatible)
  radius: {
    xs: '4px',       // Minimal radius
    sm: '8px',       // Small radius
    md: '12px',      // Standard radius (matches PM33 buttons)
    lg: '16px',      // Card radius (matches PM33 glass cards)
    xl: '20px',      // Large radius for special elements
  },
  
  // PM33 Premium Shadows (glass morphism compatible)
  shadows: {
    xs: '0 1px 3px 0 rgba(31, 38, 135, 0.1)',
    sm: '0 4px 6px -1px rgba(31, 38, 135, 0.1)',
    md: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',    // Matches --pm33-glass-shadow
    lg: '0 20px 60px 0 rgba(31, 38, 135, 0.25)',   // Premium hover shadow
    xl: '0 25px 50px -12px rgba(31, 38, 135, 0.25)',
  },
  
  // Component-specific overrides for PM33 aesthetic
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
          border: '1px solid var(--pm33-border-subtle)',
          backgroundColor: 'var(--pm33-bg-secondary)',
          
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 'var(--pm33-glass-shadow)',
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
          },
          
          '&[data-variant="gradient"]': {
            background: 'var(--pm33-brand)',
            border: 'none',
            boxShadow: '0 4px 15px 0 rgba(102, 126, 234, 0.4)',
            
            '&:hover': {
              background: 'var(--pm33-brand-hover)',
              boxShadow: '0 6px 20px 0 rgba(118, 75, 162, 0.5)',
            }
          }
        }
      }
    },
    
    Input: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        input: {
          backgroundColor: 'var(--pm33-bg-tertiary)',
          borderColor: 'var(--pm33-border-default)',
          color: 'var(--pm33-text-primary)',
          transition: 'all 0.2s ease',
          
          '&:focus': {
            borderColor: 'transparent',
            boxShadow: '0 0 0 2px var(--pm33-ai-glow), 0 0 0 4px rgba(0, 210, 255, 0.1)',
          }
        }
      }
    },
    
    Modal: {
      defaultProps: {
        radius: 'lg',
        shadow: 'xl',
        centered: true,
      },
      styles: {
        content: {
          backgroundColor: 'var(--pm33-bg-elevated)',
          border: '1px solid var(--pm33-border-subtle)',
        },
        header: {
          backgroundColor: 'var(--pm33-bg-elevated)',
          borderBottom: '1px solid var(--pm33-border-subtle)',
        }
      }
    },
    
    Notification: {
      styles: {
        root: {
          backgroundColor: 'var(--pm33-bg-elevated)',
          border: '1px solid var(--pm33-border-subtle)',
          borderRadius: '12px',
          boxShadow: 'var(--pm33-glass-shadow)',
        }
      }
    }
  }
});

interface MantineWrapperProps {
  children: React.ReactNode;
}

export default function MantineWrapper({ children }: MantineWrapperProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {children}
    </MantineProvider>
  );
}