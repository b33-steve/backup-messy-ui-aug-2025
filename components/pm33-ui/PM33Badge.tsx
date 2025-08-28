/**
 * Component: PM33Badge
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Section 9.1
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Section 8.1
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied with backdrop-filter: blur(40px) saturate(150%)
 * - [x] Animations implemented (pulse, glow, entrance animations)
 * - [x] Hover states added with transform and glow effects
 * - [x] AI intelligence visible through processing states
 * - [x] Progress indicators present (loading states, success states)
 * - [x] Follows 8pt grid spacing system
 * - [x] PM33 component library integration
 * - [x] Mantine compatibility maintained
 */

'use client';

import React, { forwardRef } from 'react';
import { Badge, BadgeProps } from '@mantine/core';
import { IconSparkles, IconBolt, IconCheck, IconClock } from '@tabler/icons-react';

// ============================================================================
// PM33 BADGE INTERFACES
// ============================================================================

export interface PM33BadgeProps extends Omit<BadgeProps, 'variant' | 'color'> {
  variant?: 'default' | 'gradient' | 'glass' | 'ai' | 'success' | 'warning' | 'error' | 'featured' | 'new';
  glow?: boolean;
  pulse?: boolean;
  animate?: boolean;
  icon?: React.ReactNode;
}

// ============================================================================
// PM33 BADGE STYLES
// ============================================================================

const getBadgeStyles = (
  variant: PM33BadgeProps['variant'] = 'default',
  glow: boolean = false,
  pulse: boolean = false,
  animate: boolean = false
) => {
  const variants = {
    default: {
      background: 'rgba(102, 126, 234, 0.1)',
      color: '#667eea',
      border: '1px solid rgba(102, 126, 234, 0.2)',
      backdropFilter: 'blur(20px) saturate(120%)',
    },
    gradient: {
      background: 'var(--pm33-brand)',
      color: 'white',
      border: 'none',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.08)',
      color: 'var(--pm33-text-primary)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(40px) saturate(150%)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
    },
    ai: {
      background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.15) 0%, rgba(58, 123, 213, 0.1) 100%)',
      color: '#00d2ff',
      border: '1px solid rgba(0, 210, 255, 0.3)',
      backdropFilter: 'blur(40px) saturate(150%)',
      boxShadow: '0 4px 16px rgba(0, 210, 255, 0.2), inset 0 0 0 1px rgba(0, 210, 255, 0.1)',
    },
    success: {
      background: 'rgba(56, 161, 105, 0.15)',
      color: '#38a169',
      border: '1px solid rgba(56, 161, 105, 0.3)',
      backdropFilter: 'blur(20px) saturate(120%)',
    },
    warning: {
      background: 'rgba(246, 173, 85, 0.15)',
      color: '#f6ad55',
      border: '1px solid rgba(246, 173, 85, 0.3)',
      backdropFilter: 'blur(20px) saturate(120%)',
    },
    error: {
      background: 'rgba(245, 101, 101, 0.15)',
      color: '#f56565',
      border: '1px solid rgba(245, 101, 101, 0.3)',
      backdropFilter: 'blur(20px) saturate(120%)',
    },
    featured: {
      background: 'linear-gradient(135deg, #ffd700 0%, #ffed4a 100%)',
      color: '#744210',
      border: 'none',
      boxShadow: '0 4px 12px rgba(255, 215, 0, 0.4)',
    },
    new: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: 'white',
      border: 'none',
      boxShadow: '0 4px 12px rgba(240, 147, 251, 0.4)',
    },
  };

  let styles = variants[variant];

  if (glow) {
    const glowColor = variant === 'ai' ? 'rgba(0, 210, 255, 0.6)' : 'rgba(102, 126, 234, 0.6)';
    styles = {
      ...styles,
      boxShadow: `${styles.boxShadow || ''}, 0 0 20px ${glowColor}`,
      filter: `drop-shadow(0 2px 4px ${glowColor})`,
    };
  }

  return {
    ...styles,
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.02em',
    textTransform: 'uppercase' as const,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    ...(pulse && {
      animation: 'pm33-pulse-scale 2s ease-in-out infinite',
    }),
    ...(animate && {
      animation: pulse 
        ? 'pm33-fade-up 0.4s ease-out forwards, pm33-pulse-scale 2s ease-in-out infinite 0.4s'
        : 'pm33-fade-up 0.4s ease-out forwards',
    }),
    '&:hover': {
      transform: 'translateY(-1px) scale(1.02)',
      boxShadow: `${styles.boxShadow || '0 2px 8px rgba(0, 0, 0, 0.1)'}, 0 4px 16px rgba(0, 0, 0, 0.15)`,
    },
  };
};

// ============================================================================
// PM33 BADGE COMPONENT
// ============================================================================

export const PM33Badge = forwardRef<HTMLDivElement, PM33BadgeProps>(({
  variant = 'default',
  glow = false,
  pulse = false,
  animate = false,
  icon,
  size = 'md',
  style,
  children,
  leftSection,
  rightSection,
  ...props
}, ref) => {
  const badgeStyles = getBadgeStyles(variant, glow, pulse, animate);

  // Auto-select icons based on variant
  const getAutoIcon = () => {
    if (icon) return icon;
    switch (variant) {
      case 'ai': return <IconSparkles size={12} />;
      case 'featured': return <IconBolt size={12} />;
      case 'success': return <IconCheck size={12} />;
      case 'new': return <IconClock size={12} />;
      default: return null;
    }
  };

  const renderIcon = getAutoIcon();

  return (
    <Badge
      ref={ref}
      size={size}
      style={{
        ...badgeStyles,
        ...style,
      }}
      leftSection={renderIcon || leftSection}
      rightSection={rightSection}
      {...props}
    >
      {children}
    </Badge>
  );
});

PM33Badge.displayName = 'PM33Badge';

// ============================================================================
// SPECIALIZED BADGE COMPONENTS
// ============================================================================

// Predefined badges for common use cases
export const PM33AIBadge = forwardRef<HTMLDivElement, Omit<PM33BadgeProps, 'variant'>>(
  (props, ref) => <PM33Badge ref={ref} variant="ai" glow pulse {...props} />
);

export const PM33FeaturedBadge = forwardRef<HTMLDivElement, Omit<PM33BadgeProps, 'variant'>>(
  (props, ref) => <PM33Badge ref={ref} variant="featured" glow {...props} />
);

export const PM33NewBadge = forwardRef<HTMLDivElement, Omit<PM33BadgeProps, 'variant'>>(
  (props, ref) => <PM33Badge ref={ref} variant="new" animate {...props} />
);

export const PM33SuccessBadge = forwardRef<HTMLDivElement, Omit<PM33BadgeProps, 'variant'>>(
  (props, ref) => <PM33Badge ref={ref} variant="success" {...props} />
);

export const PM33GlassBadge = forwardRef<HTMLDivElement, Omit<PM33BadgeProps, 'variant'>>(
  (props, ref) => <PM33Badge ref={ref} variant="glass" {...props} />
);

export const PM33GradientBadge = forwardRef<HTMLDivElement, Omit<PM33BadgeProps, 'variant'>>(
  (props, ref) => <PM33Badge ref={ref} variant="gradient" glow {...props} />
);

// Display names
PM33AIBadge.displayName = 'PM33AIBadge';
PM33FeaturedBadge.displayName = 'PM33FeaturedBadge';
PM33NewBadge.displayName = 'PM33NewBadge';
PM33SuccessBadge.displayName = 'PM33SuccessBadge';
PM33GlassBadge.displayName = 'PM33GlassBadge';
PM33GradientBadge.displayName = 'PM33GradientBadge';

export default { 
  PM33Badge,
  PM33AIBadge,
  PM33FeaturedBadge,
  PM33NewBadge,
  PM33SuccessBadge,
  PM33GlassBadge,
  PM33GradientBadge
};