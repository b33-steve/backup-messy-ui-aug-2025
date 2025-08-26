/**
 * Component: PM33DashboardTemplate - 3-Column Dashboard Layout Template
 * Design Reference: Recovery from this morning's working dashboard
 * UX Pattern: Professional enterprise dashboard with theme-aware glass morphism
 * 
 * Layout Structure:
 * - Theme-aware gradient background (light/dark)
 * - Top navigation with PM33 branding and theme toggle
 * - 3-column layout: Left nav (280px) | Center content (1fr) | Right sidebar (320px)
 * - Glass morphism cards with Safari compatibility
 * - Inline CSS Grid (not Tailwind - proven to work)
 */

'use client'

import { ReactNode } from 'react'

interface PM33DashboardTemplateProps {
  children: ReactNode
  theme?: 'light' | 'dark'
  leftSidebar: ReactNode
  centerContent: ReactNode
  rightSidebar: ReactNode
}

export default function PM33DashboardTemplate({
  children,
  theme = 'light',
  leftSidebar,
  centerContent,
  rightSidebar
}: PM33DashboardTemplateProps) {
  // Theme-aware styles
  const backgroundStyle = theme === 'dark' 
    ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
    : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)'

  const textColor = theme === 'dark' ? '#ffffff' : '#000000'

  return (
    <div 
      className="pm33-dashboard-template"
      style={{
        background: backgroundStyle,
        minHeight: '100vh',
        color: textColor,
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Top Navigation Area */}
      <div>{children}</div>

      {/* Main Dashboard Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        
        {/* Centered Command Center Heading */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: textColor,
              marginBottom: '1rem'
            }}
          >
            Command Center
          </h1>
          <p style={{ 
            color: theme === 'dark' ? '#cbd5e1' : '#64748b',
            fontSize: '1.125rem',
            marginBottom: '8px'
          }}>
            Good morning! Let's tackle today's strategic priorities.
          </p>
          <div style={{ 
            color: theme === 'dark' ? '#94a3b8' : '#64748b',
            fontSize: '0.875rem'
          }}>
            04:10 AM | Current Progress: 15 signups (30%)
          </div>
        </div>

        {/* Main 3-Column Layout - CSS Grid with Inline Styles */}
        <div 
          className="dashboard-3-col"
          style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr 320px',
            gap: '24px',
            minHeight: 'calc(100vh - 200px)',
            width: '100%'
          }}
        >
          
          {/* Left Sidebar */}
          <div className="pm33-left-sidebar">
            {leftSidebar}
          </div>

          {/* Center Content */}
          <div className="pm33-center-section">
            {centerContent}
          </div>

          {/* Right Sidebar */}
          <div className="pm33-right-sidebar">
            {rightSidebar}
          </div>
          
        </div>
      </div>

      {/* Children for additional content */}
      {children}
    </div>
  )
}

// Export glass morphism card style helper
export const getGlassMorphismStyle = (theme: 'light' | 'dark' = 'light') => ({
  background: theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(248, 250, 252, 0.95)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)', // Safari compatibility
  border: theme === 'dark' 
    ? '1px solid rgba(255, 255, 255, 0.1)'
    : 'none',
  borderRadius: '12px',
  boxShadow: theme === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
    : '0 2px 8px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.2s ease'
})