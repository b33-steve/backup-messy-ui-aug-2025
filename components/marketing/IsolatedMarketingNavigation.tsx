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
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'var(--pm33-marketingBg)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--pm33-border)',
      padding: '16px 0',
      transition: 'all 0.3s ease'
    }}
    className="theme-transition">
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
                color: isActive(link.href) ? 'var(--pm33-primary)' : 'var(--pm33-marketingText)',
                fontWeight: isActive(link.href) ? 600 : 500,
                fontSize: '14px',
                padding: '8px 12px',
                borderRadius: '8px',
                borderBottom: isActive(link.href) ? '2px solid var(--pm33-primary)' : undefined,
                transition: 'all 0.2s ease'
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