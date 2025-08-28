/**
 * Modern Theme Toggle - 2025 Best Practices
 * Replaces complex Mantine-based theme management with simple CSS light-dark() integration
 * 
 * Benefits:
 * - Uses CSS light-dark() function (automatic theme detection)
 * - Simple localStorage persistence
 * - No external dependencies
 * - Accessible keyboard navigation
 * - Works with system preferences
 */

'use client';

import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

type Theme = 'light' | 'dark' | 'system';

export function ModernThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('pm33-theme') as Theme) || 'system';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark');
    
    if (newTheme === 'system') {
      // Let CSS light-dark() handle it automatically
      // No class needed - uses system preference
    } else {
      // Apply specific theme class
      root.classList.add(newTheme);
    }
    
    // Save preference
    localStorage.setItem('pm33-theme', newTheme);
  };

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-secondary animate-pulse" />
    );
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <SunIcon className="w-5 h-5" />;
      case 'dark':
        return <MoonIcon className="w-5 h-5" />;
      case 'system':
        return <ComputerDesktopIcon className="w-5 h-5" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light mode';
      case 'dark':
        return 'Dark mode';
      case 'system':
        return 'System theme';
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="
        nav-item 
        w-10 h-10 
        flex items-center justify-center 
        rounded-lg
        focus:outline-none 
        focus-visible:ring-2 
        focus-visible:ring-teal 
        focus-visible:ring-offset-2
      "
      aria-label={`Current theme: ${getLabel()}. Click to cycle themes.`}
      title={getLabel()}
    >
      {getIcon()}
    </button>
  );
}

export default ModernThemeToggle;