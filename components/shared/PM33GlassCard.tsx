/**
 * Component: PM33GlassCard
 * Design Reference: HTML Prototype - Glass morphism card system
 * UX Pattern: Theme-aware glass cards with hover animations
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied
 * - [x] Animations implemented
 * - [x] Hover states added  
 * - [x] AI intelligence visible (N/A for cards)
 * - [x] Progress indicators present (N/A for cards)
 * - [x] Follows 8pt grid spacing
 */

'use client';

import React from 'react';
import { usePM33Theme } from './PM33ThemeProvider';

interface PM33GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

export function PM33GlassCard({ 
  children, 
  className = '', 
  hover = true,
  padding = 'md',
  style = {} 
}: PM33GlassCardProps) {
  const { theme } = usePM33Theme();

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      className={`
        rounded-2xl backdrop-blur-xl transition-all duration-400 ease-out relative overflow-hidden
        ${hover ? 'hover:-translate-y-1 cursor-pointer' : ''}
        ${paddingClasses[padding]}
        ${className}
      `}
      style={{
        background: 'var(--pm33-glass-bg)',
        border: '1px solid var(--pm33-glass-border)',
        boxShadow: 'var(--pm33-glass-shadow)',
        ...style
      }}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.boxShadow = 'var(--pm33-glass-hover-shadow)';
          if (theme === 'dark') {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
          } else if (theme === 'gray') {
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.boxShadow = 'var(--pm33-glass-shadow)';
          e.currentTarget.style.background = 'var(--pm33-glass-bg)';
        }
      }}
    >
      {children}
    </div>
  );
}

// Special AI Briefing Card variant
export function PM33AIBriefingCard({ 
  children, 
  className = '',
  isLive = false
}: {
  children: React.ReactNode;
  className?: string;
  isLive?: boolean;
}) {
  const { theme } = usePM33Theme();

  const getAIBriefingStyles = () => {
    switch (theme) {
      case 'light':
        return {
          background: 'rgba(59,130,246,0.1)',
          border: '1px solid rgba(59,130,246,0.2)',
          accentColor: '#3b82f6'
        };
      case 'dark':
        return {
          background: 'rgba(100,116,139,0.15)',
          border: '1px solid rgba(100,116,139,0.3)',
          accentColor: '#64748b'
        };
      case 'gray':
        return {
          background: 'rgba(156,163,175,0.15)',
          border: '1px solid rgba(156,163,175,0.3)',
          accentColor: '#9ca3af'
        };
      default:
        return {
          background: 'rgba(59,130,246,0.1)',
          border: '1px solid rgba(59,130,246,0.2)',
          accentColor: '#3b82f6'
        };
    }
  };

  const styles = getAIBriefingStyles();

  return (
    <div
      className={`rounded-xl p-6 ${className}`}
      style={styles}
    >
      {isLive && (
        <div className="flex items-center gap-2 mb-4">
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              background: theme === 'light' ? '#10b981' : '#06b6d4'
            }}
          />
          <span 
            className="text-xs font-semibold uppercase tracking-wider opacity-80"
            style={{ color: 'var(--pm33-text-primary)' }}
          >
            🧠 AI Intelligence Briefing - LIVE
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

// Section Title Component
export function PM33SectionTitle({ 
  children, 
  icon,
  className = '' 
}: {
  children: React.ReactNode;
  icon?: string;
  className?: string;
}) {
  return (
    <div 
      className={`flex items-center gap-2 text-sm font-semibold mb-4 uppercase tracking-wider ${className}`}
      style={{ color: 'var(--pm33-text-secondary)' }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </div>
  );
}

// Tool Item Component (for sidebar navigation)
export function PM33ToolItem({ 
  children, 
  icon,
  active = false,
  onClick,
  className = '' 
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const { theme } = usePM33Theme();

  return (
    <div
      className={`
        flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ease-out mb-2
        ${className}
      `}
      style={{
        color: active 
          ? (theme === 'light' ? '#1e40af' : 'rgba(248,250,252,1)')
          : 'var(--pm33-text-secondary)',
        background: active 
          ? (theme === 'light' 
              ? 'rgba(59,130,246,0.15)'
              : 'rgba(255,255,255,0.15)')
          : 'transparent',
        border: active 
          ? `1px solid ${theme === 'light' 
              ? 'rgba(59,130,246,0.3)' 
              : 'rgba(255,255,255,0.3)'}`
          : '1px solid transparent'
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = theme === 'light' 
            ? 'rgba(59,130,246,0.1)' 
            : 'rgba(255,255,255,0.1)';
          e.currentTarget.style.color = theme === 'light'
            ? '#3b82f6'
            : 'rgba(248,250,252,0.9)';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--pm33-text-secondary)';
        }
      }}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{children}</span>
    </div>
  );
}