/**
 * PM33 Design System - Single Source of Truth
 * Simplified design tokens for marketing website and core app
 */

export const PM33_DESIGN = {
  colors: {
    // Marketing palette - Aligned with core app colors for brand consistency
    marketing: {
      primary: '#667eea',         // Same as core app primary
      secondary: '#764ba2',       // Same as core app secondary  
      accent: '#00d2ff',          // AI blue for highlights
      cta: '#f093fb',             // Attractive pink for CTAs
      success: '#11998e',         // Success green
      text: {
        primary: '#1E293B',
        secondary: '#64748B',
        muted: '#94A3B8',
        inverse: '#FFFFFF'
      },
      bg: {
        primary: '#FFFFFF',
        secondary: '#F8FAFC',
        accent: '#EFF6FF',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        glass: 'rgba(255, 255, 255, 0.1)'
      }
    },
    // App palette  
    app: {
      primary: '#667eea',
      secondary: '#764ba2',
      text: {
        primary: '#0F172A',
        secondary: '#475569',
        inverse: '#FFFFFF'
      },
      bg: {
        primary: '#FFFFFF',
        secondary: '#F1F5F9',
        glass: 'rgba(255, 255, 255, 0.1)'
      }
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  typography: {
    h1: { size: '48px', weight: 700, line: 1.2 },
    h2: { size: '36px', weight: 600, line: 1.3 },
    h3: { size: '24px', weight: 600, line: 1.4 },
    body: { size: '16px', weight: 400, line: 1.6 },
    small: { size: '14px', weight: 400, line: 1.5 }
  }
} as const;

/**
 * Generate CSS custom properties from design system
 */
export function generateCSSCustomProperties(): string {
  const { colors, spacing, typography } = PM33_DESIGN;

  return `
    :root {
      /* Marketing Colors - Brand Aligned */
      --marketing-primary: ${colors.marketing.primary};
      --marketing-secondary: ${colors.marketing.secondary};
      --marketing-accent: ${colors.marketing.accent};
      --marketing-cta: ${colors.marketing.cta};
      --marketing-success: ${colors.marketing.success};
      --marketing-text-primary: ${colors.marketing.text.primary};
      --marketing-text-secondary: ${colors.marketing.text.secondary};
      --marketing-text-muted: ${colors.marketing.text.muted};
      --marketing-text-inverse: ${colors.marketing.text.inverse};
      --marketing-bg-primary: ${colors.marketing.bg.primary};
      --marketing-bg-secondary: ${colors.marketing.bg.secondary};
      --marketing-bg-accent: ${colors.marketing.bg.accent};
      --marketing-bg-gradient: ${colors.marketing.bg.gradient};
      --marketing-bg-glass: ${colors.marketing.bg.glass};

      /* App Colors */
      --app-primary: ${colors.app.primary};
      --app-secondary: ${colors.app.secondary};
      --app-text-primary: ${colors.app.text.primary};
      --app-text-secondary: ${colors.app.text.secondary};
      --app-text-inverse: ${colors.app.text.inverse};
      --app-bg-primary: ${colors.app.bg.primary};
      --app-bg-secondary: ${colors.app.bg.secondary};
      --app-bg-glass: ${colors.app.bg.glass};

      /* Legacy PM33 Variables for backward compatibility */
      --pm33-primary: ${colors.app.primary};
      --pm33-secondary: ${colors.app.secondary};
      --pm33-text: ${colors.app.text.primary};
      --pm33-text-secondary: ${colors.app.text.secondary};
      --pm33-bg: ${colors.app.bg.primary};
      --pm33-bg-secondary: ${colors.app.bg.secondary};
      --pm33-marketingBg: ${colors.marketing.bg.primary};
      --pm33-marketingText: ${colors.marketing.text.primary};
      --pm33-border: rgba(0, 0, 0, 0.1);

      /* Semantic Design System Variables */
      --ds-bg-primary: ${colors.marketing.bg.primary};
      --ds-text-primary: ${colors.marketing.text.primary};
      --ds-text-secondary: ${colors.marketing.text.secondary};
      --ds-font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

      /* Spacing */
      --spacing-xs: ${spacing.xs};
      --spacing-sm: ${spacing.sm};
      --spacing-md: ${spacing.md};
      --spacing-lg: ${spacing.lg};
      --spacing-xl: ${spacing.xl};
      --spacing-xxl: ${spacing.xxl};

      /* Typography */
      --text-h1-size: ${typography.h1.size};
      --text-h1-weight: ${typography.h1.weight};
      --text-h1-line: ${typography.h1.line};
      --text-h2-size: ${typography.h2.size};
      --text-h2-weight: ${typography.h2.weight};
      --text-h2-line: ${typography.h2.line};
      --text-h3-size: ${typography.h3.size};
      --text-h3-weight: ${typography.h3.weight};
      --text-h3-line: ${typography.h3.line};
      --text-body-size: ${typography.body.size};
      --text-body-weight: ${typography.body.weight};
      --text-body-line: ${typography.body.line};
      --text-small-size: ${typography.small.size};
      --text-small-weight: ${typography.small.weight};
      --text-small-line: ${typography.small.line};
    }

    /* Dark Theme Support - Improved Contrast */
    [data-theme="dark"],
    .dark {
      --marketing-primary: #8B9AFF;        /* Lighter for better contrast */
      --marketing-secondary: #9F7AEA;      /* Lighter purple */
      --marketing-accent: #38C8FF;         /* Brighter AI blue */
      --marketing-cta: #FF9EFF;            /* Bright pink for visibility */
      --marketing-success: #4FD1C7;        /* Bright teal */
      --marketing-text-primary: #FFFFFF;   /* Pure white for maximum contrast */
      --marketing-text-secondary: rgba(255, 255, 255, 0.9);  /* High contrast */
      --marketing-text-muted: rgba(255, 255, 255, 0.7);      /* Improved visibility */
      --marketing-text-inverse: #1E293B;
      --marketing-bg-primary: #0a0e27;     /* Deep background from core theme */
      --marketing-bg-secondary: #0f1429;   /* Matching core surfaces */
      --marketing-bg-accent: #151b3b;      /* Consistent with core */
      --marketing-bg-gradient: linear-gradient(135deg, #8B9AFF 0%, #9F7AEA 100%);
      --marketing-bg-glass: rgba(139, 154, 255, 0.1);

      --app-text-primary: ${colors.app.text.inverse};
      --app-text-secondary: rgba(255, 255, 255, 0.8);
      --app-bg-primary: #0f1419;
      --app-bg-secondary: #1a1f2e;

      --pm33-text: ${colors.app.text.inverse};
      --pm33-text-secondary: rgba(255, 255, 255, 0.8);
      --pm33-bg: #0f1419;
      --pm33-bg-secondary: #1a1f2e;
      --pm33-marketingBg: #0f1419;
      --pm33-marketingText: ${colors.marketing.text.inverse};

      --ds-bg-primary: #0f1419;
      --ds-text-primary: ${colors.marketing.text.inverse};
      --ds-text-secondary: rgba(255, 255, 255, 0.8);
    }

    /* Base Typography Styles */
    body {
      font-family: var(--ds-font-primary);
      color: var(--ds-text-primary);
      background-color: var(--ds-bg-primary);
      transition: color 0.3s ease, background-color 0.3s ease;
    }

    /* Ensure text visibility */
    h1, h2, h3, h4, h5, h6, p, span, div, a {
      color: inherit;
    }

    /* Mantine component overrides */
    .mantine-Title-root {
      color: var(--ds-text-primary) !important;
    }

    .mantine-Text-root {
      color: var(--ds-text-secondary) !important;
    }

    /* Attractive Glass Morphism Utilities for Marketing */
    .marketing-glass-card {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
      backdrop-filter: blur(20px) saturate(150%);
      -webkit-backdrop-filter: blur(20px) saturate(150%);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 20px;
      box-shadow: 
        0 8px 32px 0 rgba(31, 38, 135, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
    }

    .marketing-glass-card:hover {
      transform: translateY(-4px);
      box-shadow: 
        0 12px 40px 0 rgba(31, 38, 135, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    .marketing-gradient-card {
      background: var(--marketing-bg-gradient);
      border: none;
      border-radius: 20px;
      box-shadow: 
        0 8px 32px 0 rgba(102, 126, 234, 0.25),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      color: var(--marketing-text-inverse);
      transition: all 0.3s ease;
    }

    .marketing-gradient-card:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 
        0 16px 48px 0 rgba(102, 126, 234, 0.35);
    }

    .marketing-cta-button {
      background: linear-gradient(135deg, var(--marketing-cta) 0%, var(--marketing-accent) 100%);
      border: none;
      border-radius: 16px;
      color: var(--marketing-text-inverse);
      font-weight: 600;
      padding: 16px 32px;
      font-size: 18px;
      box-shadow: 0 8px 25px 0 rgba(240, 147, 251, 0.4);
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .marketing-cta-button:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 12px 35px 0 rgba(240, 147, 251, 0.6);
    }

    /* Enhanced Navigation Styles */
    .marketing-nav {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px) saturate(150%);
      -webkit-backdrop-filter: blur(20px) saturate(150%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    [data-theme="dark"] .marketing-nav,
    .dark .marketing-nav {
      background: rgba(10, 14, 39, 0.95);
      border-bottom: 1px solid rgba(139, 154, 255, 0.2);
    }
  `;
}

/**
 * Utility functions for accessing design system values
 */
export const getMarketingColor = (path: string) => {
  const paths = path.split('.');
  let current: any = PM33_DESIGN.colors.marketing;
  for (const key of paths) {
    current = current?.[key];
  }
  return current;
};

export const getAppColor = (path: string) => {
  const paths = path.split('.');
  let current: any = PM33_DESIGN.colors.app;
  for (const key of paths) {
    current = current?.[key];
  }
  return current;
};

export const getSpacing = (size: keyof typeof PM33_DESIGN.spacing) => {
  return PM33_DESIGN.spacing[size];
};

export const getTypography = (variant: keyof typeof PM33_DESIGN.typography) => {
  return PM33_DESIGN.typography[variant];
};

export default PM33_DESIGN;