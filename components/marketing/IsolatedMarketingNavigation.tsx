'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../shared/ThemeToggle';
import { useTheme } from '../shared/MantineProvider';
import { PM33_DESIGN, getMarketingColor } from '../../lib/design-system';

export default function IsolatedMarketingNavigation() {
  const pathname = usePathname();
  const { currentTheme } = useTheme();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/resources', label: 'Resources' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: currentTheme === 'dark' 
        ? 'rgba(15, 23, 42, 0.65)'  // More transparent dark mode glass
        : 'rgba(255, 255, 255, 0.65)', // More transparent light mode glass
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)', // Safari support
      borderBottom: currentTheme === 'dark' 
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(0, 0, 0, 0.1)',
      padding: '16px 0',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: currentTheme === 'dark'
        ? '0 4px 20px rgba(0, 0, 0, 0.3)'
        : '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}
    className="theme-transition glass-header">
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <img 
            src={currentTheme === 'dark' ? "/PM 33 New Logo Horizontal V1.2 WHITE.png" : "/PM 33 New Logo Horizontal V1.2.png"}
            alt="PM33 Strategic Intelligence Platform" 
            style={{ 
              height: '42px',
              width: 'auto',
              objectFit: 'contain'
            }} 
          />
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                textDecoration: 'none',
                color: isActive(link.href) 
                  ? (currentTheme === 'dark' ? '#ffffff' : 'var(--pm33-primary)')
                  : 'var(--pm33-marketingText)',
                fontWeight: isActive(link.href) ? 700 : 500,
                fontSize: '14px',
                padding: '10px 16px',
                borderRadius: '12px',
                background: isActive(link.href) 
                  ? (currentTheme === 'dark' 
                      ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                      : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)')
                  : 'transparent',
                border: isActive(link.href) 
                  ? (currentTheme === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.2)'
                      : '1px solid var(--pm33-primary)')
                  : '1px solid transparent',
                boxShadow: isActive(link.href) 
                  ? (currentTheme === 'dark' 
                      ? '0 4px 12px rgba(99, 102, 241, 0.3)'
                      : '0 2px 8px rgba(99, 102, 241, 0.2)')
                  : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Theme Toggle */}
          <div style={{ margin: '0 8px' }}>
            <ThemeToggle size="md" showTooltip={true} />
          </div>
          
          {/* CTA Button */}
          <Link
            href="/trial"
            style={{
              textDecoration: 'none',
              background: 'var(--pm33-primary-gradient)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--pm33-secondary-gradient)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--pm33-primary-gradient)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </nav>
  );
}