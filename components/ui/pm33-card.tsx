/**
 * Component: PM33Card
 * Design Reference: docs/app/APP_THEME_GUIDE.md - Glass morphism cards
 * UX Pattern: PM33_COMPLETE_UX_SYSTEM.md - Card patterns
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied
 * - [x] Animations implemented
 * - [x] Hover states added
 * - [x] AI intelligence visible
 * - [x] Follows 8pt grid spacing
 * - [x] Uses shadcn/ui base components
 */

'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PM33CardProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'ai-briefing' | 'sidebar';
  title?: string;
  subtitle?: string;
  withHover?: boolean;
  withGlow?: boolean;
}

const PM33Card: React.FC<PM33CardProps> = ({
  children,
  className = '',
  variant = 'default',
  title,
  subtitle,
  withHover = true,
  withGlow = false,
  ...motionProps
}) => {
  const baseStyles = {
    background: 'linear-gradient(135deg, var(--pm33-glass) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(40px) saturate(150%)',
    border: '1px solid var(--pm33-glassBorder)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
    transition: 'all 0.3s ease',
  };

  const hoverStyles = withHover ? {
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 16px 48px rgba(31, 38, 135, 0.25)',
      borderColor: 'var(--pm33-primary)',
    }
  } : {};

  const glowStyles = withGlow ? {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-2px',
      left: '-2px',
      right: '-2px',
      bottom: '-2px',
      background: 'var(--pm33-aiGlow)',
      borderRadius: '14px',
      zIndex: -1,
      opacity: 0.3,
      filter: 'blur(8px)',
    }
  } : {};

  const variantStyles = {
    default: {},
    'ai-briefing': {
      background: 'linear-gradient(135deg, var(--pm33-glass) 0%, var(--pm33-aiGlow) 1%)',
      borderColor: 'var(--pm33-aiGlow)',
    },
    sidebar: {
      background: 'var(--pm33-surface)',
      backdropFilter: 'blur(20px)',
    }
  };

  return (
    <motion.div
      className={cn('pm33-glass-card relative', className)}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...hoverStyles,
        ...glowStyles,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={withHover ? { scale: 1.02 } : undefined}
      data-testid="pm33-card"
      {...motionProps}
    >
      <Card className="bg-transparent border-none shadow-none">
        {(title || subtitle) && (
          <CardHeader className="pb-4">
            {title && (
              <CardTitle 
                className="pm33-text-gradient"
                style={{
                  background: 'var(--pm33-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {title}
              </CardTitle>
            )}
            {subtitle && (
              <p 
                className="text-sm opacity-80"
                style={{ color: 'var(--pm33-textSecondary)' }}
              >
                {subtitle}
              </p>
            )}
          </CardHeader>
        )}
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// AI Processing Card Variant
export const AIProcessingCard: React.FC<PM33CardProps> = (props) => (
  <PM33Card 
    {...props} 
    variant="ai-briefing" 
    withGlow={true}
    className={cn('pm33-animate-glow', props.className)}
  />
);

// Strategic Card Variant  
export const StrategicCard: React.FC<PM33CardProps> = (props) => (
  <PM33Card 
    {...props}
    withHover={true}
    className={cn('pm33-animate-float', props.className)}
  />
);

export default PM33Card;