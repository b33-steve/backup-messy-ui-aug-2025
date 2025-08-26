'use client';

import { useState } from 'react';
import { PM33_DESIGN, getMarketingColor } from '../marketing/design-system';

export default function MarketingNavigation() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [pathname, setPathname] = useState('/');

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    document.body.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
  };

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
        <a href="/" style={{ textDecoration: 'none' }}>
          <img 
            src={currentTheme === 'dark' ? "/PM 33 New Logo Horizontal V1.2 WHITE.png" : "/PM 33 New Logo Horizontal V1.2.png"}
            alt="PM33 Strategic Intelligence Platform" 
            style={{ 
              height: '42px',
              width: 'auto',
              objectFit: 'contain'
            }} 
          />
        </a>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                textDecoration: 'none',
                color: isActive(link.href) ? PM33_DESIGN.colors.marketing.primary : getMarketingColor('text.primary'),
                fontWeight: isActive(link.href) ? 600 : 500,
                fontSize: PM33_DESIGN.typography.small.size,
                padding: `${PM33_DESIGN.spacing.sm} ${PM33_DESIGN.spacing.md}`,
                borderRadius: '8px',
                borderBottom: isActive(link.href) ? `2px solid ${PM33_DESIGN.colors.marketing.primary}` : undefined,
                transition: 'all 0.2s ease'
              }}
            >
              {link.label}
            </a>
          ))}
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            style={{
              margin: '0 8px',
              padding: `${PM33_DESIGN.spacing.sm}`,
              border: 'none',
              borderRadius: '6px',
              background: 'transparent',
              color: getMarketingColor('text.primary'),
              cursor: 'pointer'
            }}
            title="Toggle theme"
          >
            {currentTheme === 'light' ? '🌙' : '☀️'}
          </button>
          
          {/* CTA Button */}
          <a
            href="/trial"
            style={{
              textDecoration: 'none',
              background: `linear-gradient(135deg, ${PM33_DESIGN.colors.marketing.primary} 0%, ${PM33_DESIGN.colors.marketing.cta} 100%)`,
              color: getMarketingColor('text.inverse'),
              padding: `${PM33_DESIGN.spacing.sm} ${PM33_DESIGN.spacing.lg}`,
              borderRadius: '8px',
              fontSize: PM33_DESIGN.typography.small.size,
              fontWeight: PM33_DESIGN.typography.small.weight,
              boxShadow: `0 4px 15px 0 ${PM33_DESIGN.colors.marketing.primary}40`,
              transition: 'all 0.3s ease'
            }}
          >
            Start Free Trial
          </a>
        </div>
      </div>
    </nav>
  );
}