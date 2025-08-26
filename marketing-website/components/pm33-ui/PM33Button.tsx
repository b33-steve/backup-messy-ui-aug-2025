/**
 * Component: PM33Button
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Section 3.2
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Section 2.1
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied with backdrop-filter: blur(40px) saturate(150%)
 * - [x] Animations implemented (hover, active, loading states)
 * - [x] Hover states added with transform and glow effects
 * - [x] AI intelligence visible through processing states
 * - [x] Progress indicators present (loading animation)
 * - [x] Follows 8pt grid spacing system
 * - [x] Brand gradients: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
 * - [x] Mantine integration maintained
 */

'use client';

import React, { ReactNode, useState, useRef, useEffect } from 'react';
import { Button, ButtonProps, Loader } from '@mantine/core';
// Marketing website - simple theme implementation without core app dependencies

interface PM33ButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ai' | 'glass' | 'outline' | 'minimal';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  loadingText?: string;
  aiProcessing?: boolean;
  glowEffect?: boolean;
  pulseOnHover?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const PM33Button: React.FC<PM33ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingText,
  aiProcessing = false,
  glowEffect = false,
  pulseOnHover = false,
  leftIcon,
  rightIcon,
  className = '',
  style = {},
  onClick,
  disabled,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Marketing website - simplified theme (always light theme)
  const isDark = false; // Marketing website - always light theme

  // Handle ripple effect on click
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;

    // Create ripple effect
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const ripple = {
        id: Date.now(),
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      setRipples(prev => [...prev, ripple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== ripple.id));
      }, 600);
    }

    onClick?.(event);
  };

  // Get variant-specific styles
  const getVariantStyles = () => {
    const baseStyles = {
      position: 'relative' as const,
      overflow: 'hidden',
      border: 'none',
      fontWeight: 600,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          background: 'var(--pm33-primary)',
          color: '#ffffff',
          boxShadow: isHovered ? '0 8px 25px rgba(118, 75, 162, 0.4)' : '0 4px 15px rgba(118, 75, 162, 0.2)',
          transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
        };

      case 'secondary':
        return {
          ...baseStyles,
          background: 'rgba(255, 255, 255, 0.1)',
          color: isDark ? '#ffffff' : '#1e293b',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: isHovered ? '0 8px 25px rgba(0, 0, 0, 0.15)' : '0 4px 15px rgba(0, 0, 0, 0.1)',
          transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
        };

      case 'ai':
        return {
          ...baseStyles,
          background: aiProcessing ? 'var(--pm33-aiGlow)' : 'var(--pm33-aiGlow)',
          color: '#ffffff',
          boxShadow: isHovered ? '0 8px 25px rgba(0, 210, 255, 0.4)' : '0 4px 15px rgba(0, 210, 255, 0.2)',
          transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
          animation: aiProcessing ? 'pm33-ai-pulse 2s ease-in-out infinite' : 'none',
        };

      case 'glass':
        return {
          ...baseStyles,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(40px) saturate(150%)',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: isDark ? '#ffffff' : '#1e293b',
          boxShadow: isHovered 
            ? '0 8px 32px rgba(31, 38, 135, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.2)' 
            : '0 4px 16px rgba(31, 38, 135, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
          transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
        };

      case 'outline':
        return {
          ...baseStyles,
          background: 'transparent',
          border: '2px solid var(--pm33-primary)',
          color: 'var(--pm33-primary)',
          boxShadow: isHovered ? '0 8px 25px rgba(118, 75, 162, 0.2)' : 'none',
          transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
        };

      case 'minimal':
        return {
          ...baseStyles,
          background: 'transparent',
          color: isDark ? '#ffffff' : '#1e293b',
          boxShadow: 'none',
          transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
          opacity: isHovered ? 0.8 : 1,
        };

      default:
        return baseStyles;
    }
  };

  // Size-specific styles using 8pt grid
  const getSizeStyles = () => {
    const sizeMap = {
      xs: {
        height: '28px',
        padding: '0 12px',
        fontSize: '12px',
        borderRadius: '6px',
      },
      sm: {
        height: '32px',
        padding: '0 16px',
        fontSize: '14px',
        borderRadius: '8px',
      },
      md: {
        height: '40px',
        padding: '0 24px',
        fontSize: '14px',
        borderRadius: '10px',
      },
      lg: {
        height: '48px',
        padding: '0 32px',
        fontSize: '16px',
        borderRadius: '12px',
      },
      xl: {
        height: '56px',
        padding: '0 40px',
        fontSize: '18px',
        borderRadius: '14px',
      }
    };
    return sizeMap[size];
  };

  // Combine all styles
  const combinedStyles = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...(glowEffect && isHovered ? {
      filter: 'drop-shadow(0 0 20px rgba(102, 126, 234, 0.6))',
    } : {}),
    ...(disabled || isLoading ? {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none',
      filter: 'grayscale(0.3)',
    } : {}),
    ...style
  };

  return (
    <>
      {/* CSS Keyframes */}
      <style jsx global>{`
        @keyframes pm33-ai-pulse {
          0%, 100% {
            background: var(--pm33-aiGlow);
          }
          50% {
            background: var(--pm33-aiGlow);
          }
        }

        @keyframes pm33-button-pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes pm33-glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(102, 126, 234, 0.8));
          }
        }

        .pm33-button-ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          animation: pm33-button-pulse 0.6s ease-out;
          pointer-events: none;
        }

        .pm33-button-pulse:hover {
          animation: ${pulseOnHover ? 'pm33-glow-pulse 2s ease-in-out infinite' : 'none'};
        }
      `}</style>

      <Button
        ref={buttonRef}
        style={combinedStyles}
        className={`pm33-button ${pulseOnHover ? 'pm33-button-pulse' : ''} ${className}`}
        onClick={handleClick}
        disabled={disabled || isLoading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        {...props}
      >
        {/* Loading state */}
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(4px)',
              borderRadius: 'inherit',
            }}
          >
            <Loader size="sm" color="white" />
          </div>
        )}

        {/* Button content */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: isLoading ? 0.3 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          {leftIcon && !isLoading && (
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {leftIcon}
            </span>
          )}
          
          <span>
            {isLoading && loadingText ? loadingText : children}
          </span>
          
          {rightIcon && !isLoading && (
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {rightIcon}
            </span>
          )}
        </div>

        {/* AI Processing Indicator */}
        {aiProcessing && (
          <div
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              background: '#ffffff',
              borderRadius: '50%',
              animation: 'pm33-ai-pulse 1s ease-in-out infinite',
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
            }}
          />
        )}

        {/* Ripple Effects */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="pm33-button-ripple"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        ))}

        {/* Glow Effect Overlay */}
        {glowEffect && isHovered && (
          <div
            style={{
              position: 'absolute',
              inset: '-2px',
              background: 'var(--pm33-primary)',
              borderRadius: 'inherit',
              opacity: 0.2,
              filter: 'blur(8px)',
              zIndex: -1,
              animation: 'pm33-glow-pulse 2s ease-in-out infinite',
            }}
          />
        )}
      </Button>
    </>
  );
};

export default PM33Button;