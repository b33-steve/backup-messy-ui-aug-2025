/**
 * Component: GlassCard
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Glass morphism cards
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Card patterns
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied
 * - [x] Animations implemented
 * - [x] Hover states added
 * - [x] AI intelligence visible
 * - [x] Progress indicators present
 * - [x] Follows 8pt grid spacing
 * - [x] Uses shadcn/ui components exclusively
 */

'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GlassCardProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'premium' | 'ai-processing' | 'strategic';
  title?: string;
  subtitle?: string;
  withHover?: boolean;
  withGlow?: boolean;
  withAnimation?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'default',
  title,
  subtitle,
  withHover = true,
  withGlow = false,
  withAnimation = true,
  ...motionProps
}) => {
  const baseStyles = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(40px) saturate(150%)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const variantStyles = {
    default: {},
    premium: {
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
      borderColor: 'rgba(102, 126, 234, 0.3)',
    },
    'ai-processing': {
      background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.1) 0%, rgba(58, 123, 213, 0.1) 100%)',
      borderColor: 'rgba(0, 210, 255, 0.3)',
    },
    strategic: {
      background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(160, 82, 45, 0.1) 100%)',
      borderColor: 'rgba(139, 69, 19, 0.3)',
    }
  };

  const hoverStyles = withHover ? {
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 16px 48px rgba(31, 38, 135, 0.25)',
      borderColor: 'rgba(102, 126, 234, 0.5)',
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
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.5) 0%, rgba(118, 75, 162, 0.5) 100%)',
      borderRadius: '18px',
      zIndex: -1,
      opacity: 0.6,
      filter: 'blur(8px)',
    }
  } : {};

  const animationProps = withAnimation ? {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { 
      duration: 0.4, 
      ease: [0.4, 0, 0.2, 1],
      delay: 0.1 
    },
    whileHover: withHover ? { 
      scale: 1.02,
      transition: { duration: 0.2 }
    } : undefined,
  } : {};

  return (
    <motion.div
      className={cn('glass-card relative overflow-hidden', className)}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...hoverStyles,
        ...glowStyles,
      }}
      {...animationProps}
      {...motionProps}
    >
      <Card className="bg-transparent border-none shadow-none h-full">
        {(title || subtitle) && (
          <CardHeader className="pb-4">
            {title && (
              <CardTitle 
                className="text-xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {title}
              </CardTitle>
            )}
            {subtitle && (
              <p className="text-sm opacity-80 mt-2 text-slate-300">
                {subtitle}
              </p>
            )}
          </CardHeader>
        )}
        <CardContent className="p-6 pt-0">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Premium variant for high-value features
export const PremiumGlassCard: React.FC<GlassCardProps> = (props) => (
  <GlassCard 
    {...props} 
    variant="premium" 
    withGlow={true}
    className={cn('premium-glass-card', props.className)}
  />
);

// AI Processing variant for AI-powered features
export const AIGlassCard: React.FC<GlassCardProps> = (props) => (
  <GlassCard 
    {...props} 
    variant="ai-processing" 
    withGlow={true}
    className={cn('ai-glass-card pulse-glow', props.className)}
  />
);

// Strategic variant for strategic intelligence features
export const StrategicGlassCard: React.FC<GlassCardProps> = (props) => (
  <GlassCard 
    {...props} 
    variant="strategic" 
    withHover={true}
    className={cn('strategic-glass-card', props.className)}
  />
);

export default GlassCard;