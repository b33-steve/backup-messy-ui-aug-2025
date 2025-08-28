/**
 * Modern Navigation - 2025 Best Practices
 * Replaces complex Mantine navigation with clean, maintainable component
 * 
 * Benefits:
 * - Uses modern CSS foundation (glass-card, nav-modern classes)
 * - Simple responsive design
 * - No external component library dependencies
 * - Easy to modify and maintain
 * - Accessible keyboard navigation
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ModernThemeToggle from './ThemeToggle-modern';

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Resources', href: '/resources' },
  { name: 'About', href: '/about' },
];

export function ModernNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="nav-modern sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P33</span>
            </div>
            <span className="text-xl font-bold text-primary">PM33</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Theme Toggle + CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <ModernThemeToggle />
            <Link href="/demo" className="btn-primary text-sm px-4 py-2">
              Try Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden nav-item p-2"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`nav-item ${isActive(item.href) ? 'active' : ''} block`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <ModernThemeToggle />
                <Link 
                  href="/demo" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary text-sm px-4 py-2"
                >
                  Try Demo
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default ModernNavigation;