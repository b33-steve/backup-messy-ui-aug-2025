/**
 * Component: PM33PageWrapper
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Section 2.1
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Section 1.2
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied with backdrop-filter: blur(40px) saturate(150%)
 * - [x] Animations implemented (fade-up, hover effects)
 * - [x] Hover states added with transform and glow effects
 * - [x] AI intelligence visible through theme integration
 * - [x] Progress indicators present (loading states)
 * - [x] Follows 8pt grid spacing system
 * - [x] Theme-aware (light/dark mode support)
 * - [x] Mantine integration for marketing context
 */

'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { Container, Box } from '@mantine/core';
import { useTheme, useThemedStyles } from '../shared/MantineProvider';

interface PM33PageWrapperProps {
  children: ReactNode;
  variant?: 'marketing' | 'app' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
  glassEffect?: 'none' | 'subtle' | 'medium' | 'strong';
  backgroundGradient?: boolean;
  centered?: boolean;
}

export const PM33PageWrapper: React.FC<PM33PageWrapperProps> = ({
  children,
  variant = 'marketing',
  size = 'xl',
  padding = 'lg',
  className = '',
  style = {},
  animate = true,
  glassEffect = 'none',
  backgroundGradient = false,
  centered = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Theme integration for context-aware styling
  const { currentTheme } = useTheme();
  const { getSurfaceStyles } = useThemedStyles();
  const isDark = currentTheme === 'dark';

  useEffect(() => {
    // Trigger entrance animation after mount
    if (animate) {
      const timer = setTimeout(() => setIsVisible(true), 50);
      const loadTimer = setTimeout(() => setIsLoaded(true), 200);
      return () => {
        clearTimeout(timer);
        clearTimeout(loadTimer);
      };
    } else {
      setIsVisible(true);
      setIsLoaded(true);
    }
  }, [animate]);

  // Glass morphism styles based on effect level
  const getGlassStyles = () => {
    switch (glassEffect) {
      case 'subtle':
        return {
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px) saturate(120%)',
          WebkitBackdropFilter: 'blur(20px) saturate(120%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)'
        };
      case 'medium':
        return {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(40px) saturate(150%)',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        };
      case 'strong':
        return {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
          backdropFilter: 'blur(40px) saturate(150%)',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.15),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1)
          `
        };
      default:
        return {};
    }
  };

  // Background gradient styles
  const getBackgroundStyles = () => {
    if (!backgroundGradient) return {};

    if (variant === 'app') {
      return {
        background: isDark 
          ? 'linear-gradient(135deg, #0a0e27 0%, #1e2749 50%, #151b3b 100%)'
          : 'linear-gradient(135deg, #fafbff 0%, #f1f5f9 50%, #e2e8f0 100%)'
      };
    } else {
      return {
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)'
      };
    }
  };

  // Padding calculations using 8pt grid
  const getPaddingValue = () => {
    const paddingMap = {
      none: 0,
      sm: 16, // 16px
      md: 24, // 24px  
      lg: 32, // 32px
      xl: 48  // 48px
    };
    return paddingMap[padding];
  };

  // Container size mapping
  const getContainerSize = () => {
    if (typeof size === 'number') return size;
    
    const sizeMap = {
      sm: 640,
      md: 768, 
      lg: 1024,
      xl: 1280
    };
    return sizeMap[size];
  };

  // Animation styles
  const animationStyles = animate ? {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  } : {};

  // Combine all styles
  const combinedStyles = {
    ...getBackgroundStyles(),
    ...getGlassStyles(),
    ...animationStyles,
    minHeight: variant === 'app' ? '100vh' : 'auto',
    position: 'relative' as const,
    overflow: 'hidden',
    ...style
  };

  return (
    <>
      {/* CSS Keyframes for animations */}
      <style jsx global>{`
        @keyframes pm33-page-fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pm33-page-shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .pm33-page-wrapper {
          animation: ${animate ? 'pm33-page-fade-up 0.6s ease-out' : 'none'};
        }

        .pm33-page-loading {
          position: relative;
          overflow: hidden;
        }

        .pm33-page-loading::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: pm33-page-shimmer 2s infinite;
          z-index: 1;
        }

        .pm33-glass-hover:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <Box
        component="main"
        style={combinedStyles}
        className={`pm33-page-wrapper ${!isLoaded ? 'pm33-page-loading' : ''} ${glassEffect !== 'none' ? 'pm33-glass-hover' : ''} ${className}`}
      >
        {/* AI Processing Indicator */}
        {!isLoaded && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 1000,
              background: 'var(--pm33-aiGlow)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                background: 'white',
                borderRadius: '50%',
                animation: 'pm33-bounce 1.4s ease-in-out infinite'
              }}
            />
            PM33 AI LOADING
          </div>
        )}

        <Container
          size={getContainerSize()}
          px={getPaddingValue()}
          py={getPaddingValue()}
          style={{
            display: centered ? 'flex' : 'block',
            flexDirection: centered ? 'column' : undefined,
            justifyContent: centered ? 'center' : undefined,
            alignItems: centered ? 'center' : undefined,
            minHeight: centered ? '100vh' : 'auto',
            position: 'relative',
            zIndex: 2
          }}
        >
          {children}
        </Container>

        {/* Brand Gradient Overlay for App variant */}
        {variant === 'app' && backgroundGradient && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'var(--pm33-primary)',
              opacity: 0.02,
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
        )}
      </Box>
    </>
  );
};

export default PM33PageWrapper;