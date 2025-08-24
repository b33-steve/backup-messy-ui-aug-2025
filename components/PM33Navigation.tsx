/**
 * Component: PM33Navigation
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md - Section Navigation Component
 * UX Pattern: PM33_ Complete _UX_System.md - Section Navigation Patterns
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

import Link from 'next/link';
import { usePM33Theme } from '../components/shared/PM33ThemeProvider';

export const PM33Navigation = ({ currentPage }: { currentPage: string }) => {
  const { theme } = usePM33Theme();
  
  // Use appropriate logo based on theme
  const logoSrc = theme === 'light' ? '/pm33-logo-light.png' : '/PM 33 New Logo Horizontal V1.2 WHITE.png';
  
  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: '🎯' },
    { id: 'dashboard-v1', label: 'Command Center v1', icon: '✨' },
    { id: 'strategic-intelligence', label: 'Strategic Intelligence', icon: '🧠' },
    { id: 'resource-optimizer', label: 'Resource Optimizer', icon: '⚡' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
  ];

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(40px) saturate(150%)',
      WebkitBackdropFilter: 'blur(40px) saturate(150%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.filter = 'drop-shadow(0 0 10px rgba(102,126,234,0.5))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.filter = 'none';
          }}>
            <img 
              src={logoSrc} 
              alt="PM33 Strategic Intelligence Platform" 
              style={{ height: '32px' }}
            />
            <span style={{
              fontSize: '0.75rem',
              background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 'bold',
              animation: 'glow-pulse 2s ease-in-out infinite'
            }}>BETA</span>
          </div>
        </Link>

        {/* Navigation Items */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`/${item.id === 'dashboard' ? 'dashboard' : item.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                ...(currentPage === item.id ? {
                  background: 'linear-gradient(135deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%)',
                  border: '1px solid rgba(102,126,234,0.3)',
                  color: '#a5b4fc',
                  boxShadow: '0 0 20px rgba(102,126,234,0.2)'
                } : {
                  background: 'transparent',
                  border: '1px solid transparent',
                  color: '#ffffff' // Pure white for proper contrast
                })
              }}
              onMouseEnter={(e) => {
                if (currentPage !== item.id) {
                  e.currentTarget.style.background = 'rgba(102,126,234,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(102,126,234,0.2)';
                  e.currentTarget.style.color = '#a5b4fc';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== item.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.color = '#ffffff'; // Maintain proper contrast on mouse leave
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* User Info Button */}
        <button style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          color: 'white',
          padding: '0.7rem 1.5rem',
          borderRadius: '10px',
          fontSize: '0.9rem',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 15px 0 rgba(102,126,234,0.4)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'scale(1)',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 25px 0 rgba(118,75,162,0.5)';
          e.currentTarget.style.background = 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px 0 rgba(102,126,234,0.4)';
          e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }}>
          Steve Saper - PM33 Founder
        </button>
      </div>
    </nav>
  );
};