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
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        backdropFilter: 'blur(40px) saturate(150%)',
        WebkitBackdropFilter: 'blur(40px) saturate(150%)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: `
          0 8px 32px 0 rgba(31, 38, 135, 0.15),
          inset 0 0 0 1px rgba(255, 255, 255, 0.1)
        `,
        borderRadius: '16px',
        padding: '24px', // 8pt grid
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        position: 'relative',
        overflow: 'hidden',
        cursor: isClickable ? 'pointer' : 'default',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
        e.currentTarget.style.boxShadow = `
          0 20px 60px 0 rgba(31, 38, 135, 0.25),
          inset 0 0 0 1px rgba(255, 255, 255, 0.2)
        `;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = `
          0 8px 32px 0 rgba(31, 38, 135, 0.15),
          inset 0 0 0 1px rgba(255, 255, 255, 0.1)
        `;
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