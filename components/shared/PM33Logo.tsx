/**
 * Component: PM33Logo
 * Design Reference: HTML Prototype - Theme-aware logo switching
 * UX Pattern: Automatic logo selection based on theme (white for dark, regular for light)
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied (N/A for logo)
 * - [x] Animations implemented (smooth transitions)
 * - [x] Hover states added
 * - [x] AI intelligence visible (N/A for logo)
 * - [x] Progress indicators present (N/A for logo)
 * - [x] Follows 8pt grid spacing
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePM33Theme } from './PM33ThemeProvider';

interface PM33LogoProps {
  href?: string;
  className?: string;
  imageClassName?: string;
  showText?: boolean;
  textClassName?: string;
  width?: number;
  height?: number;
}

export function PM33Logo({ 
  href = '/dashboard',
  className = '',
  imageClassName = '',
  showText = true,
  textClassName = '',
  width = 140,
  height = 40
}: PM33LogoProps) {
  const { theme, logoSrc } = usePM33Theme();

  const logoContent = (
    <div className={`flex items-center gap-3 transition-all duration-300 ease-in-out hover:scale-105 ${className}`}>
      <Image
        src={logoSrc}
        alt="PM33 Logo"
        width={width}
        height={height}
        className={`transition-all duration-300 ease-in-out ${imageClassName}`}
        priority
      />
      {showText && (
        <div className="flex items-center gap-2">
          <span 
            className={`text-xl font-bold transition-all duration-300 ease-in-out ${textClassName}`}
            style={{
              background: theme === 'light' 
                ? 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)'
                : 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            PM33
          </span>
          <span 
            className="text-xs font-semibold px-2 py-1 rounded-md text-white transition-all duration-300"
            style={{
              background: theme === 'light' 
                ? '#10b981' 
                : theme === 'dark' || theme === 'gray' 
                  ? '#06b6d4' 
                  : '#10b981'
            }}
          >
            BETA
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

// Simplified logo for compact spaces
export function PM33LogoCompact({ 
  href = '/dashboard',
  className = '',
  width = 32,
  height = 32
}: { 
  href?: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const { logoSrc } = usePM33Theme();

  const logoContent = (
    <Image
      src={logoSrc}
      alt="PM33"
      width={width}
      height={height}
      className={`transition-all duration-300 ease-in-out hover:scale-110 ${className}`}
      priority
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}