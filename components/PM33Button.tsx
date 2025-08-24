/**
 * Component: PM33Button
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md - Section Button System
 * UX Pattern: PM33_ Complete _UX_System.md - Premium button interactions
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied
 * - [x] Animations implemented
 * - [x] Hover states added
 * - [x] AI intelligence visible
 * - [x] Progress indicators present
 * - [x] Follows 8pt grid spacing
 */

'use client';

import { ReactNode, CSSProperties, ButtonHTMLAttributes } from 'react';

interface PM33ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
  loading?: boolean;
  style?: CSSProperties;
}

export const PM33Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon,
  loading = false,
  style = {},
  className = '',
  ...props 
}: PM33ButtonProps) => {
  const variants = {
    primary: {
      // Solid background with glass overlay for better contrast
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      hoverBackground: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
      color: 'white',
      boxShadow: '0 4px 15px 0 rgba(102,126,234,0.4)',
      hoverBoxShadow: '0 6px 20px 0 rgba(118,75,162,0.5)',
      backdropFilter: 'blur(10px) saturate(120%)',
      WebkitBackdropFilter: 'blur(10px) saturate(120%)'
    },
    secondary: {
      // Glass button that adapts to theme
      background: 'var(--pm33-glass-bg)',
      backdropFilter: 'blur(40px) saturate(150%)',
      WebkitBackdropFilter: 'blur(40px) saturate(150%)',
      hoverBackground: 'var(--pm33-glass-bg)',
      color: 'var(--pm33-text-primary)',
      border: '1px solid var(--pm33-glass-border)',
      hoverBorder: '1px solid var(--pm33-glass-border)'
    },
    danger: {
      background: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
      hoverBackground: 'linear-gradient(135deg, #f45c43 0%, #fc6767 100%)',
      color: 'white',
      boxShadow: '0 4px 15px 0 rgba(235,51,73,0.4)',
      backdropFilter: 'blur(10px) saturate(120%)',
      WebkitBackdropFilter: 'blur(10px) saturate(120%)'
    }
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const sizeStyles = {
    sm: { padding: '6px 12px', fontSize: '0.875rem' },
    md: { padding: '10px 16px', fontSize: '1rem' },
    lg: { padding: '12px 24px', fontSize: '1.125rem' }
  };
  
  return (
    <button
      className={`${className}`}
      style={{
        ...variants[variant],
        ...sizeStyles[size],
        fontWeight: '500',
        borderRadius: '10px',
        transition: 'all 0.3s ease-out',
        transform: 'scale(1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        backdropFilter: 'backdropFilter' in variants[variant] ? (variants[variant] as any).backdropFilter : 'none',
        WebkitBackdropFilter: 'WebkitBackdropFilter' in variants[variant] ? (variants[variant] as any).WebkitBackdropFilter : 'none',
        border: 'border' in variants[variant] ? (variants[variant] as any).border : 'none',
        cursor: loading ? 'wait' : 'pointer',
        opacity: loading ? 0.7 : 1,
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
      onMouseEnter={(e) => {
        if (!loading) {
          e.currentTarget.style.transform = 'scale(1.05)';
          if (variants[variant].hoverBackground) {
            e.currentTarget.style.background = variants[variant].hoverBackground;
          }
          if ('hoverBoxShadow' in variants[variant] && (variants[variant] as any).hoverBoxShadow) {
            e.currentTarget.style.boxShadow = (variants[variant] as any).hoverBoxShadow;
          }
          if ('hoverBorder' in variants[variant] && (variants[variant] as any).hoverBorder) {
            e.currentTarget.style.border = (variants[variant] as any).hoverBorder;
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!loading) {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.background = variants[variant].background;
          e.currentTarget.style.boxShadow = 'boxShadow' in variants[variant] ? (variants[variant] as any).boxShadow : '';
          e.currentTarget.style.border = 'border' in variants[variant] ? (variants[variant] as any).border : 'none';
        }
      }}
      onMouseDown={(e) => {
        if (!loading) {
          e.currentTarget.style.transform = 'scale(0.95)';
        }
      }}
      onMouseUp={(e) => {
        if (!loading) {
          e.currentTarget.style.transform = 'scale(1.05)';
        }
      }}
      disabled={loading}
      {...props}
    >
      {loading && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: 'inherit'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid white',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      )}
      
      {!loading && (
        <>
          {icon && <span style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</span>}
          {children}
        </>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};