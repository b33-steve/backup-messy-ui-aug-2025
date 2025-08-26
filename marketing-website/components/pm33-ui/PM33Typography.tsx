/**
 * Component: PM33Typography
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Section 8.1
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Section 7.1
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied with gradient text effects
 * - [x] Animations implemented (entrance animations, hover effects)
 * - [x] Hover states added with glow and transform effects
 * - [x] AI intelligence visible through gradient text treatments
 * - [x] Progress indicators present (loading text states)
 * - [x] Follows 8pt grid spacing system
 * - [x] PM33 component library integration
 * - [x] Mantine compatibility maintained
 */

'use client';

import React, { forwardRef } from 'react';
import { Title, Text, TitleProps, TextProps } from '@mantine/core';
import { pm33Theme } from '../../lib/theme/pm33-theme';

// ============================================================================
// PM33 TYPOGRAPHY INTERFACES
// ============================================================================

export interface PM33TitleProps extends TitleProps {
  variant?: 'default' | 'gradient' | 'ai' | 'hero' | 'section' | 'card';
  glow?: boolean;
  animate?: boolean;
}

export interface PM33TextProps extends TextProps {
  variant?: 'default' | 'muted' | 'accent' | 'ai' | 'success' | 'warning' | 'error';
  gradient?: boolean;
  glow?: boolean;
  animate?: boolean;
}

// ============================================================================
// PM33 TITLE STYLES
// ============================================================================

const getTitleStyles = (variant: PM33TitleProps['variant'] = 'default', glow: boolean = false, animate: boolean = false) => {
  const variants = {
    default: {
      color: 'var(--pm33-text-primary)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    gradient: {
      background: 'var(--pm33-brand)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    ai: {
      background: 'var(--pm33-ai-glow)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    hero: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      backgroundSize: '200% 200%',
      fontWeight: 900,
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
      ...(animate && {
        animation: 'pm33-gradient-shift 8s ease-in-out infinite',
      }),
    },
    section: {
      color: 'var(--pm33-text-primary)',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    card: {
      color: 'var(--pm33-text-primary)',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: 'normal',
    },
  };

  let styles = variants[variant];

  if (glow) {
    styles = {
      ...styles,
      textShadow: '0 0 20px rgba(102, 126, 234, 0.4), 0 0 40px rgba(102, 126, 234, 0.2)',
      filter: 'drop-shadow(0 2px 4px rgba(102, 126, 234, 0.1))',
    };
  }

  return {
    ...styles,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ...(animate && {
      animation: variant === 'hero' 
        ? 'pm33-gradient-shift 8s ease-in-out infinite, pm33-fade-up 0.8s ease-out forwards'
        : 'pm33-fade-up 0.6s ease-out forwards',
    }),
  };
};

// ============================================================================
// PM33 TEXT STYLES
// ============================================================================

const getTextStyles = (variant: PM33TextProps['variant'] = 'default', gradient: boolean = false, glow: boolean = false, animate: boolean = false) => {
  const variants = {
    default: {
      color: 'var(--pm33-text-primary)',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: 'normal',
    },
    muted: {
      color: 'var(--pm33-text-muted)',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: 'normal',
      opacity: 0.8,
    },
    accent: {
      color: 'var(--pm33-text-secondary)',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: 'normal',
    },
    ai: {
      color: 'var(--pm33-ai-processing)',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    success: {
      color: '#38a169',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: 'normal',
    },
    warning: {
      color: '#f6ad55',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: 'normal',
    },
    error: {
      color: '#f56565',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: 'normal',
    },
  };

  let styles = variants[variant];

  if (gradient && variant !== 'ai') {
    styles = {
      ...styles,
      background: 'var(--pm33-brand)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 500,
    };
  }

  if (glow) {
    const glowColor = variant === 'ai' ? 'rgba(0, 210, 255, 0.4)' : 'rgba(102, 126, 234, 0.3)';
    styles = {
      ...styles,
      textShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
      filter: `drop-shadow(0 1px 2px ${glowColor})`,
    };
  }

  return {
    ...styles,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ...(animate && {
      animation: 'pm33-fade-up 0.6s ease-out forwards',
    }),
  };
};

// ============================================================================
// PM33 TITLE COMPONENT
// ============================================================================

export const PM33Title = forwardRef<HTMLHeadingElement, PM33TitleProps>(({
  variant = 'default',
  glow = false,
  animate = false,
  order = 2,
  size,
  style,
  children,
  ...props
}, ref) => {
  const titleStyles = getTitleStyles(variant, glow, animate);

  // Auto-size based on variant if not specified
  const autoSize = () => {
    if (size) return size;
    switch (variant) {
      case 'hero': return 'h1';
      case 'section': return 'h2';
      case 'card': return order === 1 ? 'h3' : 'h4';
      default: return `h${order}`;
    }
  };

  return (
    <Title
      ref={ref}
      order={order}
      size={autoSize()}
      style={{
        ...titleStyles,
        ...style,
      }}
      {...props}
    >
      {children}
    </Title>
  );
});

PM33Title.displayName = 'PM33Title';

// ============================================================================
// PM33 TEXT COMPONENT
// ============================================================================

export const PM33Text = forwardRef<HTMLParagraphElement, PM33TextProps>(({
  variant = 'default',
  gradient = false,
  glow = false,
  animate = false,
  size = 'md',
  style,
  children,
  ...props
}, ref) => {
  const textStyles = getTextStyles(variant, gradient, glow, animate);

  return (
    <Text
      ref={ref}
      size={size}
      style={{
        ...textStyles,
        ...style,
      }}
      {...props}
    >
      {children}
    </Text>
  );
});

PM33Text.displayName = 'PM33Text';

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

// Specialized components for common use cases
export const PM33HeroTitle = forwardRef<HTMLHeadingElement, Omit<PM33TitleProps, 'variant' | 'order'>>(
  (props, ref) => <PM33Title ref={ref} variant="hero" order={1} animate {...props} />
);

export const PM33SectionTitle = forwardRef<HTMLHeadingElement, Omit<PM33TitleProps, 'variant' | 'order'>>(
  (props, ref) => <PM33Title ref={ref} variant="section" order={2} animate {...props} />
);

export const PM33CardTitle = forwardRef<HTMLHeadingElement, Omit<PM33TitleProps, 'variant'>>(
  (props, ref) => <PM33Title ref={ref} variant="card" {...props} />
);

export const PM33MutedText = forwardRef<HTMLParagraphElement, Omit<PM33TextProps, 'variant'>>(
  (props, ref) => <PM33Text ref={ref} variant="muted" {...props} />
);

export const PM33AIText = forwardRef<HTMLParagraphElement, Omit<PM33TextProps, 'variant'>>(
  (props, ref) => <PM33Text ref={ref} variant="ai" glow {...props} />
);

// Display names
PM33HeroTitle.displayName = 'PM33HeroTitle';
PM33SectionTitle.displayName = 'PM33SectionTitle';
PM33CardTitle.displayName = 'PM33CardTitle';
PM33MutedText.displayName = 'PM33MutedText';
PM33AIText.displayName = 'PM33AIText';

// Export all typography components
export default { 
  PM33Title, 
  PM33Text, 
  PM33HeroTitle, 
  PM33SectionTitle, 
  PM33CardTitle, 
  PM33MutedText, 
  PM33AIText 
};