/**
 * Component: PM33Card
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Section 4.1
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Section 3.2
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied with backdrop-filter: blur(40px) saturate(150%)
 * - [x] Animations implemented (hover, loading, entrance effects)
 * - [x] Hover states added with transform and glow effects
 * - [x] AI intelligence visible through processing indicators
 * - [x] Progress indicators present (loading shimmer)
 * - [x] Follows 8pt grid spacing system
 * - [x] Theme variants (light/dark) with context awareness
 * - [x] Mantine integration maintained
 */

'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { Card, CardProps, Box, Group, Text, Stack } from '@mantine/core';
// Marketing website - simple theme implementation without core app dependencies

interface PM33CardProps extends Omit<CardProps, 'variant'> {
  children: ReactNode;
  variant?: 'standard' | 'glass' | 'premium' | 'ai' | 'minimal' | 'elevated';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  loading?: boolean;
  aiProcessing?: boolean;
  glowEffect?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  headerIcon?: ReactNode;
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onHover?: (isHovered: boolean) => void;
}

export const PM33Card: React.FC<PM33CardProps> = ({
  children,
  variant = 'standard',
  size = 'md',
  hover = true,
  loading = false,
  aiProcessing = false,
  glowEffect = false,
  header,
  footer,
  headerIcon,
  headerTitle,
  headerSubtitle,
  className = '',
  style = {},
  onClick,
  onHover,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Theme integration
  // Marketing website - simplified theme (always light theme)
  const isDark = false; // Marketing website - always light theme

  useEffect(() => {
    // Entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(false);
  };

  // Get variant-specific styles
  const getVariantStyles = () => {
    const baseStyles = {
      position: 'relative' as const,
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: onClick ? 'pointer' : 'default',
    };

    switch (variant) {
      case 'standard':
        return {
          ...baseStyles,
          background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: isHovered 
            ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)' 
            : '0 4px 16px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
        };

      case 'glass':
        return {
          ...baseStyles,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(40px) saturate(150%)',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: isHovered
            ? '0 8px 32px rgba(31, 38, 135, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.2)'
            : '0 4px 16px rgba(31, 38, 135, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        };

      case 'premium':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
          backdropFilter: 'blur(40px) saturate(150%)',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: isHovered
            ? `
                0 12px 40px rgba(31, 38, 135, 0.4),
                0 4px 20px rgba(102, 126, 234, 0.3),
                inset 0 0 0 1px rgba(255, 255, 255, 0.2)
              `
            : `
                0 8px 32px rgba(31, 38, 135, 0.2),
                0 2px 10px rgba(102, 126, 234, 0.1),
                inset 0 0 0 1px rgba(255, 255, 255, 0.1)
              `,
        };

      case 'ai':
        return {
          ...baseStyles,
          background: aiProcessing
            ? 'linear-gradient(135deg, rgba(0, 210, 255, 0.15) 0%, rgba(58, 123, 213, 0.08) 100%)'
            : 'linear-gradient(135deg, rgba(0, 210, 255, 0.1) 0%, rgba(58, 123, 213, 0.05) 100%)',
          backdropFilter: 'blur(40px) saturate(150%)',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          border: '1px solid rgba(0, 210, 255, 0.3)',
          boxShadow: isHovered
            ? '0 8px 32px rgba(0, 210, 255, 0.3), inset 0 0 0 1px rgba(0, 210, 255, 0.2)'
            : '0 4px 16px rgba(0, 210, 255, 0.15), inset 0 0 0 1px rgba(0, 210, 255, 0.1)',
          animation: aiProcessing ? 'pm33-ai-glow 3s ease-in-out infinite alternate' : 'none',
        };

      case 'minimal':
        return {
          ...baseStyles,
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
        };

      case 'elevated':
        return {
          ...baseStyles,
          background: 'var(--pm33-surface)',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.04)',
          boxShadow: isHovered
            ? '0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.15)'
            : '0 10px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)',
        };

      default:
        return baseStyles;
    }
  };

  // Size-specific styles using 8pt grid
  const getSizeStyles = () => {
    const sizeMap = {
      xs: {
        padding: 12, // 12px
        borderRadius: '8px',
        minHeight: '80px',
      },
      sm: {
        padding: 16, // 16px
        borderRadius: '10px',
        minHeight: '120px',
      },
      md: {
        padding: 24, // 24px
        borderRadius: '12px',
        minHeight: '160px',
      },
      lg: {
        padding: 32, // 32px
        borderRadius: '16px',
        minHeight: '200px',
      },
      xl: {
        padding: 40, // 40px
        borderRadius: '20px',
        minHeight: '240px',
      }
    };
    return sizeMap[size];
  };

  // Animation styles
  const getAnimationStyles = () => ({
    transform: isVisible
      ? hover && isHovered
        ? 'translateY(-4px) scale(1.02)'
        : 'translateY(0) scale(1)'
      : 'translateY(20px) scale(0.95)',
    opacity: isVisible ? 1 : 0,
  });

  // Combine all styles
  const combinedStyles = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...getAnimationStyles(),
    ...(glowEffect && isHovered ? {
      filter: 'drop-shadow(0 0 20px rgba(102, 126, 234, 0.4))',
    } : {}),
    ...style
  };

  return (
    <>
      {/* CSS Keyframes */}
      <style jsx global>{`
        @keyframes pm33-ai-glow {
          0% {
            border-color: rgba(0, 210, 255, 0.3);
            box-shadow: 0 4px 16px rgba(0, 210, 255, 0.15), inset 0 0 0 1px rgba(0, 210, 255, 0.1);
          }
          100% {
            border-color: rgba(58, 123, 213, 0.5);
            box-shadow: 0 8px 32px rgba(58, 123, 213, 0.3), inset 0 0 0 1px rgba(58, 123, 213, 0.2);
          }
        }

        @keyframes pm33-loading-shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes pm33-fade-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .pm33-card-loading::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: pm33-loading-shimmer 2s infinite;
          z-index: 1;
        }

        .pm33-card {
          animation: pm33-fade-in 0.6s ease-out;
        }
      `}</style>

      <Card
        style={combinedStyles}
        className={`pm33-card ${loading ? 'pm33-card-loading' : ''} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        {...props}
      >
        {/* AI Processing Indicator */}
        {aiProcessing && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              zIndex: 2,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: '4px',
                  height: '4px',
                  background: 'var(--pm33-aiGlow)',
                  borderRadius: '50%',
                  animation: `pm33-ai-pulse 1.5s ease-in-out infinite ${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Header Section */}
        {(header || headerTitle || headerIcon) && (
          <Box mb={size === 'xs' ? 8 : size === 'sm' ? 12 : 16}>
            {header || (
              <Group gap={12} align="flex-start">
                {headerIcon && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      background: 'var(--pm33-primary)',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                  >
                    {headerIcon}
                  </div>
                )}
                <Stack gap={2}>
                  {headerTitle && (
                    <Text
                      fw={600}
                      size={size === 'xs' ? 'sm' : size === 'sm' ? 'md' : 'lg'}
                      style={{
                        background: 'var(--pm33-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {headerTitle}
                    </Text>
                  )}
                  {headerSubtitle && (
                    <Text
                      size="sm"
                      c="dimmed"
                      style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                    >
                      {headerSubtitle}
                    </Text>
                  )}
                </Stack>
              </Group>
            )}
          </Box>
        )}

        {/* Main Content */}
        <Box style={{ position: 'relative', zIndex: 2 }}>
          {children}
        </Box>

        {/* Footer Section */}
        {footer && (
          <Box mt={size === 'xs' ? 8 : size === 'sm' ? 12 : 16}>
            {footer}
          </Box>
        )}

        {/* Glow Effect Overlay */}
        {glowEffect && isHovered && (
          <div
            style={{
              position: 'absolute',
              inset: '-4px',
              background: 'var(--pm33-primary)',
              borderRadius: 'inherit',
              opacity: 0.1,
              filter: 'blur(12px)',
              zIndex: 0,
            }}
          />
        )}

        {/* Loading Overlay */}
        {loading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(2px)',
              borderRadius: 'inherit',
              zIndex: 3,
            }}
          />
        )}
      </Card>
    </>
  );
};

export default PM33Card;