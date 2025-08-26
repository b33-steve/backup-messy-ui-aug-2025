/**
 * Component: PM33Card - Glass Morphism Card Component
 * Design Reference: Recovery plan - glass morphism with Safari compatibility
 * UX Pattern: Premium glass morphism effects with theme awareness
 * 
 * Features:
 * - Glass morphism background with backdrop blur
 * - Safari compatibility (WebkitBackdropFilter)
 * - Theme-aware styling (light/dark modes)
 * - Hover effects and transitions
 * - Flexible content with header, body, footer slots
 */

'use client'

import { ReactNode, CSSProperties } from 'react'

interface PM33CardProps {
  children: ReactNode
  theme?: 'light' | 'dark'
  className?: string
  style?: CSSProperties
  header?: ReactNode
  footer?: ReactNode
  hoverable?: boolean
  clickable?: boolean
  onClick?: () => void
}

export default function PM33Card({
  children,
  theme = 'light',
  className = '',
  style = {},
  header,
  footer,
  hoverable = true,
  clickable = false,
  onClick
}: PM33CardProps) {
  const baseCardStyle: CSSProperties = {
    // Glass morphism base
    background: theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(248, 250, 252, 0.95)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)', // Safari compatibility
    
    // Border and shape
    border: theme === 'dark' 
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : 'none',
    borderRadius: '12px',
    
    // Shadow
    boxShadow: theme === 'dark'
      ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      : '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 0 rgba(255, 255, 255, 0.8)',
    
    // Transitions
    transition: 'all 0.2s ease',
    
    // Content
    padding: '1.5rem',
    position: 'relative',
    overflow: 'hidden',
    
    // Interactive
    cursor: clickable ? 'pointer' : 'default',
    
    // Merge with custom styles
    ...style
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverable) return
    
    const element = e.currentTarget
    element.style.transform = 'translateY(-2px)'
    element.style.boxShadow = theme === 'dark'
      ? '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
      : '0 4px 16px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.9)'
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverable) return
    
    const element = e.currentTarget
    element.style.transform = 'translateY(0px)'
    element.style.boxShadow = theme === 'dark'
      ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      : '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 0 rgba(255, 255, 255, 0.8)'
  }

  const handleClick = () => {
    if (clickable && onClick) {
      onClick()
    }
  }

  return (
    <div
      className={`pm33-card ${className}`}
      style={baseCardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Card Header */}
      {header && (
        <div 
          className="pm33-card-header" 
          style={{
            marginBottom: '1rem',
            paddingBottom: '0.75rem',
            borderBottom: theme === 'dark' 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '1px solid rgba(0, 0, 0, 0.05)'
          }}
        >
          {header}
        </div>
      )}

      {/* Card Body */}
      <div className="pm33-card-body">
        {children}
      </div>

      {/* Card Footer */}
      {footer && (
        <div 
          className="pm33-card-footer" 
          style={{
            marginTop: '1rem',
            paddingTop: '0.75rem',
            borderTop: theme === 'dark' 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '1px solid rgba(0, 0, 0, 0.05)'
          }}
        >
          {footer}
        </div>
      )}

      {/* Glass reflection effect - subtle */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: theme === 'dark'
            ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
          pointerEvents: 'none'
        }}
      />
    </div>
  )
}

// Specialized PM33Card variants

export function PM33ActionCard({
  title,
  description,
  category,
  categoryColor = '#3b82f6',
  theme = 'light',
  onClick
}: {
  title: string
  description: string
  category: string
  categoryColor?: string
  theme?: 'light' | 'dark'
  onClick?: () => void
}) {
  return (
    <PM33Card theme={theme} clickable hoverable onClick={onClick}>
      <div style={{ marginBottom: '8px' }}>
        <div 
          style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: categoryColor,
            marginBottom: '8px'
          }}
        >
          {category}
        </div>
        <h4 
          style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: theme === 'dark' ? '#ffffff' : '#1e293b',
            marginBottom: '4px'
          }}
        >
          {title}
        </h4>
        <p 
          style={{
            fontSize: '0.875rem',
            color: theme === 'dark' ? '#cbd5e1' : '#64748b',
            lineHeight: '1.4'
          }}
        >
          {description}
        </p>
      </div>
    </PM33Card>
  )
}

export function PM33MetricCard({
  icon,
  title,
  value,
  subtitle,
  theme = 'light'
}: {
  icon: ReactNode
  title: string
  value: string | ReactNode
  subtitle?: string
  theme?: 'light' | 'dark'
}) {
  return (
    <PM33Card theme={theme} hoverable>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <div style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
          {icon}
        </div>
        <h3 
          style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: theme === 'dark' ? '#ffffff' : '#1e293b'
          }}
        >
          {title}
        </h3>
      </div>
      
      <div>
        <div 
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: theme === 'dark' ? '#ffffff' : '#1e293b',
            marginBottom: subtitle ? '4px' : '0'
          }}
        >
          {value}
        </div>
        {subtitle && (
          <div 
            style={{
              fontSize: '0.75rem',
              color: theme === 'dark' ? '#94a3b8' : '#64748b'
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </PM33Card>
  )
}