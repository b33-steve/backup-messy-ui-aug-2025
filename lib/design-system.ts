/**
 * PM33 Design System - Single Source of Truth
 * Simplified design tokens for marketing website and core app
 */

export const PM33_DESIGN = {
  colors: {
    // Marketing palette
    marketing: {
      primary: '#1E40AF',
      secondary: '#059669',
      cta: '#EA580C',
      text: {
        primary: '#1E293B',
        secondary: '#64748B',
        inverse: '#FFFFFF'
      },
      bg: {
        primary: '#FFFFFF',
        secondary: '#F8FAFC',
        accent: '#EFF6FF'
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
      /* Marketing Colors */
      --marketing-primary: ${colors.marketing.primary};
      --marketing-secondary: ${colors.marketing.secondary};
      --marketing-cta: ${colors.marketing.cta};
      --marketing-text-primary: ${colors.marketing.text.primary};
      --marketing-text-secondary: ${colors.marketing.text.secondary};
      --marketing-text-inverse: ${colors.marketing.text.inverse};
      --marketing-bg-primary: ${colors.marketing.bg.primary};
      --marketing-bg-secondary: ${colors.marketing.bg.secondary};
      --marketing-bg-accent: ${colors.marketing.bg.accent};

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

    /* Dark Theme Support */
    [data-theme="dark"],
    .dark {
      --marketing-text-primary: ${colors.marketing.text.inverse};
      --marketing-text-secondary: rgba(255, 255, 255, 0.8);
      --marketing-bg-primary: #0a0e27;
      --marketing-bg-secondary: #0f1429;
      --marketing-bg-accent: #1e2749;

      --app-text-primary: ${colors.app.text.inverse};
      --app-text-secondary: rgba(255, 255, 255, 0.8);
      --app-bg-primary: #0a0e27;
      --app-bg-secondary: #0f1429;

      --pm33-text: ${colors.app.text.inverse};
      --pm33-text-secondary: rgba(255, 255, 255, 0.8);
      --pm33-bg: #0a0e27;
      --pm33-bg-secondary: #0f1429;
      --pm33-marketingBg: #0a0e27;
      --pm33-marketingText: ${colors.marketing.text.inverse};

      --ds-bg-primary: #0a0e27;
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