'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../shared/ThemeToggle';

export default function NavigationSimple() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/resources', label: 'Resources & Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'var(--pm33-glass)',
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
            src="/PM 33 New Logo Horizontal V1.2.png" 
            alt="PM33 Strategic Intelligence Platform" 
            style={{ 
              height: '38px',
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
                borderBottom: isActive(link.href) ? '2px solid #6366f1' : undefined,
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
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              boxShadow: '0 4px 15px 0 rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </nav>
  );
}