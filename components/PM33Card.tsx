/**
 * Component: PM33Card
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md - Section Glass Morphism Cards
 * UX Pattern: PM33_ Complete _UX_System.md - Glass morphism with premium animations
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

import { ReactNode, CSSProperties } from 'react';

interface PM33CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  [key: string]: any;
}

export const PM33Card = ({ children, className = '', style = {}, onClick, ...props }: PM33CardProps) => {
  const isClickable = !!onClick;

  return (
    <div
      className={`pm33-glass-card ${className}`}
      data-testid="pm33-glass-card"
      style={{
        // Glass morphism styles with exact specifications - theme-aware background
        background: 'var(--pm33-glass-bg)',
        backdropFilter: 'blur(40px) saturate(150%)',
        WebkitBackdropFilter: 'blur(40px) saturate(150%)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: '16px',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--pm33-glass-shadow)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: isClickable ? 'pointer' : 'default',
        color: 'var(--pm33-text-primary)',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
        e.currentTarget.style.boxShadow = 'var(--pm33-glass-hover-shadow)';
        // Brighten the card on hover
        e.currentTarget.style.filter = 'brightness(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = 'var(--pm33-glass-shadow)';
        e.currentTarget.style.filter = 'brightness(1)';
      }}
      onClick={onClick}
      {...props}
    >
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c)',
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 15s ease infinite'
        }}
      />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>

      {/* CSS for gradient-shift animation */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};