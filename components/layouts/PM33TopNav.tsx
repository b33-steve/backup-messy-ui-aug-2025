/**
 * Component: PM33TopNav - Top Navigation Bar
 * Design Reference: Recovery plan - PM33 logo with BETA badge, single theme toggle
 * UX Pattern: Professional navigation with theme switching and user profile
 * 
 * Features:
 * - PM33 logo with BETA badge (theme-aware)
 * - Navigation items: Command Center, Strategic Intelligence, Project Delivery, Analytics
 * - Single theme toggle button (not three buttons)
 * - Steve Saper - PM33 Founder profile button
 * - Theme persistence via localStorage
 */

'use client'

import { useState, useEffect } from 'react'
import { 
  Moon, 
  Sun, 
  Target, 
  Brain, 
  Rocket, 
  BarChart3,
  User
} from 'lucide-react'

interface PM33TopNavProps {
  theme: 'light' | 'dark'
  onThemeChange: (theme: 'light' | 'dark') => void
  currentPage?: string
}

export default function PM33TopNav({ 
  theme, 
  onThemeChange, 
  currentPage = 'dashboard' 
}: PM33TopNavProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    onThemeChange(newTheme)
    
    // Store in localStorage
    localStorage.setItem('pm33-theme', newTheme)
    
    // Apply to document body for global theme
    document.body.className = newTheme
  }

  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: Target, href: '/dashboard' },
    { id: 'intelligence', label: 'Strategic Intelligence', icon: Brain, href: '/strategic-intelligence' },
    { id: 'delivery', label: 'Project Delivery', icon: Rocket, href: '/projects' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/data' }
  ]

  const navStyle = {
    height: '64px',
    background: theme === 'dark' 
      ? 'rgba(15, 12, 41, 0.95)' 
      : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: theme === 'dark' 
      ? '1px solid rgba(255, 255, 255, 0.1)' 
      : '1px solid rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    position: 'sticky' as const,
    top: 0,
    zIndex: 50
  }

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: theme === 'dark' ? '#ffffff' : '#000000',
    fontSize: '1.5rem',
    fontWeight: '700'
  }

  const betaBadgeStyle = {
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    color: 'white',
    fontSize: '0.625rem',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: '600'
  }

  const navItemStyle = (isActive: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: isActive 
      ? '#3b82f6' 
      : theme === 'dark' ? '#cbd5e1' : '#64748b',
    background: isActive 
      ? theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)'
      : 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  })

  const themeToggleStyle = {
    padding: '8px',
    borderRadius: '8px',
    background: theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.05)',
    border: 'none',
    color: theme === 'dark' ? '#ffffff' : '#000000',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }

  const userProfileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '8px',
    background: theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.05)',
    border: 'none',
    color: theme === 'dark' ? '#ffffff' : '#000000',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }

  if (!mounted) return null

  return (
    <nav style={navStyle}>
      {/* PM33 Logo with BETA Badge */}
      <div style={logoStyle}>
        <img 
          src={theme === 'dark' ? '/pm33-logo-dark.png' : '/pm33-logo-light.png'}
          alt="PM33"
          style={{ height: '32px', width: 'auto' }}
        />
        <span style={betaBadgeStyle}>BETA</span>
      </div>

      {/* Navigation Items */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {navItems.map((item) => {
          const IconComponent = item.icon
          const isActive = currentPage === item.id
          
          return (
            <button
              key={item.id}
              style={navItemStyle(isActive)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = theme === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.05)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <IconComponent size={16} />
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Right Section: Theme Toggle + User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Single Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          style={themeToggleStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.2)' 
              : 'rgba(0, 0, 0, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.05)'
          }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Profile */}
        <button
          style={userProfileStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(0, 0, 0, 0.05)'
          }}
        >
          <User size={16} />
          Steve Saper - PM33 Founder
        </button>
      </div>
    </nav>
  )
}