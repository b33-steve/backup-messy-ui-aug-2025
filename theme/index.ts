/**
 * theme/index.ts - PM33 Professional Multi-Theme Configuration
 * Purpose: PostHog-inspired professional theme system with light/dark/native options
 * Why: Provides user choice while maintaining enterprise credibility and conversion focus
 * RELEVANT FILES: providers/ThemeProvider.tsx, components/themed/PM33Components.tsx, tests/professional-theme-system.spec.ts
 */

import { 
  MantineTheme, 
  createTheme, 
  MantineColorsTuple, 
  DEFAULT_THEME,
  mergeMantineTheme 
} from '@mantine/core';

// PM33 Professional Color Palette (PostHog-inspired)
const pm33Primary: MantineColorsTuple = [
  '#f8fafc',
  '#f1f5f9', 
  '#e2e8f0',
  '#cbd5e1',
  '#94a3b8',
  '#64748b', // Primary - Professional gray-blue
  '#475569',
  '#334155',
  '#1e293b',
  '#0f172a'
];

const pm33Blue: MantineColorsTuple = [
  '#eff6ff',
  '#dbeafe',
  '#bfdbfe',
  '#93c5fd',
  '#60a5fa',
  '#1e40af', // Serious blue for trust/enterprise
  '#1d4ed8',
  '#1e3a8a',
  '#1e40af',
  '#172554'
];

const pm33Purple: MantineColorsTuple = [
  '#faf7ff',
  '#f3f0ff',
  '#e9e5ff',
  '#d4c5f9',
  '#b197fc',
  '#7c3aed', // Muted purple for accents only
  '#6d28d9',
  '#5b21b6',
  '#4c1d95',
  '#3730a3'
];

// Minimal Base Theme - PostHog Style
const baseTheme = createTheme({
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  fontFamilyMonospace: 'JetBrains Mono, SF Mono, Monaco, Inconsolata, monospace',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '2rem', lineHeight: '1.2' },    // 32px - no oversized headers
      h2: { fontSize: '1.5rem', lineHeight: '1.3' },  // 24px - functional sizing
      h3: { fontSize: '1.25rem', lineHeight: '1.4' }, // 20px - clear hierarchy
      h4: { fontSize: '1rem', lineHeight: '1.5' },    // 16px - body-like
    }
  },
  colors: {
    pm33Primary,
    pm33Blue,
    pm33Purple,
  },
  primaryColor: 'pm33Primary',
  primaryShade: { light: 5, dark: 4 },
  radius: {
    xs: '2px',
    sm: '4px',
    md: '6px',    // Minimal rounded corners
    lg: '8px',
    xl: '12px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',   // Standard spacing
    lg: '24px',
    xl: '32px',
  },
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.05)', // Subtle shadows only
    lg: '0 8px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
});

// Light Theme - Clean & Professional
export const lightTheme = mergeMantineTheme(baseTheme, createTheme({
  colorScheme: 'light',
  white: '#ffffff',
  black: '#000000',
  other: {
    // Semantic colors - efficiency focused
    background: '#ffffff',
    surface: '#f8fafc',
    surfaceHover: '#f1f5f9',
    border: '#e2e8f0',
    borderFocus: '#64748b',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#64748b',
    textDisabled: '#94a3b8',
    // Action colors - minimal but clear
    primary: '#1e40af',
    primaryHover: '#1d4ed8',
    secondary: '#64748b',
    secondaryHover: '#475569',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    // Conversion focused but professional
    ctaPrimary: '#1e40af',
    ctaSecondary: '#64748b',
  },
  components: {
    Button: {
      styles: {
        root: {
          fontWeight: 500,
          borderRadius: '6px',
          transition: 'all 0.15s ease', // Faster transitions
          border: '1px solid transparent',
          fontSize: '14px',
          height: '36px', // Compact sizing
          '&:hover': {
            transform: 'none', // No fancy animations
            backgroundColor: 'var(--mantine-color-gray-1)',
          },
          '&[data-variant="filled"]': {
            backgroundColor: '#1e40af',
            '&:hover': {
              backgroundColor: '#1d4ed8',
            }
          },
          '&[data-variant="outline"]': {
            border: '1px solid #e2e8f0',
            color: '#475569',
            '&:hover': {
              backgroundColor: '#f8fafc',
              borderColor: '#64748b',
            }
          }
        }
      }
    },
    Card: {
      styles: {
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          boxShadow: 'none', // No shadows by default
          transition: 'border-color 0.15s ease',
          '&:hover': {
            borderColor: '#cbd5e1',
          }
        }
      }
    },
    Paper: {
      styles: {
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
        }
      }
    },
    Input: {
      styles: {
        input: {
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          fontSize: '14px',
          height: '36px',
          '&:focus': {
            borderColor: '#1e40af',
            boxShadow: '0 0 0 1px #1e40af',
          }
        }
      }
    }
  }
}));

// Dark Theme - PostHog-inspired Dark Mode
export const darkTheme = mergeMantineTheme(baseTheme, createTheme({
  colorScheme: 'dark',
  colors: {
    ...baseTheme.colors,
    dark: [
      '#f8fafc',
      '#f1f5f9',
      '#e2e8f0',
      '#94a3b8',
      '#64748b',
      '#475569',  // Main dark surface
      '#334155',  // Elevated dark surface
      '#1e293b',  // Deep dark surface
      '#0f172a',  // Background
      '#020617',  // Deepest
    ]
  },
  white: '#f8fafc',
  black: '#0f172a',
  other: {
    background: '#0f172a',
    surface: '#1e293b',
    surfaceHover: '#334155',
    border: '#475569',
    borderFocus: '#64748b',
    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
    textDisabled: '#64748b',
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    secondary: '#64748b',
    secondaryHover: '#94a3b8',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    ctaPrimary: '#3b82f6',
    ctaSecondary: '#64748b',
  },
  components: {
    Button: {
      styles: {
        root: {
          fontWeight: 500,
          borderRadius: '6px',
          transition: 'all 0.15s ease',
          border: '1px solid transparent',
          fontSize: '14px',
          height: '36px',
          '&[data-variant="filled"]': {
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#2563eb',
            }
          },
          '&[data-variant="outline"]': {
            border: '1px solid #475569',
            color: '#cbd5e1',
            '&:hover': {
              backgroundColor: '#334155',
              borderColor: '#64748b',
            }
          }
        }
      }
    },
    Card: {
      styles: {
        root: {
          backgroundColor: '#1e293b',
          border: '1px solid #475569',
          borderRadius: '8px',
          boxShadow: 'none',
          transition: 'border-color 0.15s ease',
          '&:hover': {
            borderColor: '#64748b',
          }
        }
      }
    },
    Paper: {
      styles: {
        root: {
          backgroundColor: '#1e293b',
          border: '1px solid #475569',
          borderRadius: '6px',
        }
      }
    },
    Input: {
      styles: {
        input: {
          backgroundColor: '#334155',
          border: '1px solid #475569',
          borderRadius: '6px',
          color: '#f8fafc',
          fontSize: '14px',
          height: '36px',
          '&:focus': {
            borderColor: '#3b82f6',
            boxShadow: '0 0 0 1px #3b82f6',
          }
        }
      }
    }
  }
}));

// Native Theme - Premium Gradient Experience
export const nativeTheme = mergeMantineTheme(baseTheme, createTheme({
  colorScheme: 'light', // Base on light for readability
  white: '#ffffff',
  black: '#0f172a',
  other: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)', // Premium gradient
    surface: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white
    surfaceHover: 'rgba(255, 255, 255, 0.98)',
    border: 'rgba(124, 58, 237, 0.2)',
    borderFocus: '#7c3aed',
    textPrimary: '#1e1b4b', // Deep purple for better contrast on gradients
    textSecondary: '#4c1d95',
    textMuted: '#6b46c1',
    textDisabled: '#a78bfa',
    primary: '#7c3aed', // Purple accent for native
    primaryHover: '#6d28d9',
    secondary: '#ec4899', // Pink accent
    secondaryHover: '#db2777',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    ctaPrimary: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
    ctaSecondary: 'linear-gradient(135deg, #1e40af 0%, #06b6d4 100%)',
    // Premium accent gradients
    accent: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #06b6d4 100%)',
    cardGradient: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.95) 100%)',
  },
  components: {
    Button: {
      styles: {
        root: {
          fontWeight: 500,
          borderRadius: '6px',
          transition: 'all 0.15s ease',
          border: '1px solid transparent',
          fontSize: '14px',
          height: '36px',
          '&[data-variant="filled"]': {
            background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
            color: '#ffffff',
            '&:hover': {
              background: 'linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)',
            }
          },
          '&[data-variant="outline"]': {
            border: '1px solid #e2e8f0',
            color: '#475569',
            '&:hover': {
              backgroundColor: '#f8fafc',
              borderColor: '#7c3aed',
              color: '#7c3aed',
            }
          }
        }
      }
    },
    Card: {
      styles: {
        root: {
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.95) 100%)',
          border: '1px solid rgba(124, 58, 237, 0.2)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(124, 58, 237, 0.1), 0 2px 8px rgba(236, 72, 153, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'rgba(124, 58, 237, 0.4)',
            boxShadow: '0 12px 40px rgba(124, 58, 237, 0.15), 0 4px 12px rgba(236, 72, 153, 0.15)',
            transform: 'translateY(-2px)',
          }
        }
      }
    },
    Paper: {
      styles: {
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
        }
      }
    },
    Input: {
      styles: {
        input: {
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          fontSize: '14px',
          height: '36px',
          '&:focus': {
            borderColor: '#7c3aed',
            boxShadow: '0 0 0 1px #7c3aed',
          }
        }
      }
    }
  }
}));

// Theme definitions
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  native: nativeTheme,
} as const;

export type ThemeName = keyof typeof themes;

// Efficient CSS Variables - PostHog Style
export const themeVariables = {
  light: {
    '--pm33-bg': '#ffffff',
    '--pm33-surface': '#f8fafc',
    '--pm33-border': '#e2e8f0',
    '--pm33-text': '#0f172a',
    '--pm33-text-muted': '#64748b',
    '--pm33-primary': '#1e40af',
    '--pm33-radius': '6px',
    '--pm33-shadow': '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  dark: {
    '--pm33-bg': '#0f172a',
    '--pm33-surface': '#1e293b',
    '--pm33-border': '#475569',
    '--pm33-text': '#f8fafc',
    '--pm33-text-muted': '#94a3b8',
    '--pm33-primary': '#3b82f6',
    '--pm33-radius': '6px',
    '--pm33-shadow': '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  native: {
    '--pm33-bg': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
    '--pm33-surface': 'rgba(255, 255, 255, 0.95)',
    '--pm33-border': 'rgba(124, 58, 237, 0.2)',
    '--pm33-text': '#1e1b4b',
    '--pm33-text-muted': '#6b46c1',
    '--pm33-primary': '#7c3aed',
    '--pm33-radius': '12px',
    '--pm33-shadow': '0 8px 32px rgba(124, 58, 237, 0.1), 0 2px 8px rgba(236, 72, 153, 0.1)',
  }
};