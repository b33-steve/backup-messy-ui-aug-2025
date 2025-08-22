/**
 * providers/ThemeProvider.tsx - Efficient PM33 Theme Provider
 * Purpose: Professional theme context with performance-optimized switching
 * Why: Provides smooth theme switching with localStorage persistence and SSR safety
 * RELEVANT FILES: theme/index.ts, components/themed/PM33Components.tsx, app/layout.tsx
 */

'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { themes, ThemeName, themeVariables } from '../theme';

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface PM33ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  storageKey?: string;
}

export function PM33ThemeProvider({ 
  children, 
  defaultTheme = 'light',
  storageKey = 'pm33-theme'
}: PM33ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as ThemeName;
    if (stored && themes[stored]) {
      setCurrentTheme(stored);
    }
    setMounted(true);
  }, [storageKey]);

  // Apply CSS variables efficiently
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    const variables = themeVariables[currentTheme];
    
    // Batch DOM updates
    requestAnimationFrame(() => {
      Object.entries(variables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
      
      // Simple class toggle
      root.className = root.className.replace(/pm33-\w+/g, '') + ` pm33-${currentTheme}`;
    });
    
    localStorage.setItem(storageKey, currentTheme);
  }, [currentTheme, mounted, storageKey]);

  const setTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
  };

  const toggleTheme = () => {
    const themeOrder: ThemeName[] = ['light', 'dark', 'native'];
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setCurrentTheme(themeOrder[nextIndex]);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <MantineProvider theme={themes[defaultTheme]}>
        {children}
      </MantineProvider>
    );
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, toggleTheme }}>
      <MantineProvider theme={themes[currentTheme]}>
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
}

// Hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a PM33ThemeProvider');
  }
  return context;
}

// Efficient styled utilities
export function useThemedStyles() {
  const { currentTheme } = useTheme();
  
  return {
    // Get current theme colors
    getColors: () => ({
      background: `var(--pm33-bg)`,
      surface: `var(--pm33-surface)`,
      border: `var(--pm33-border)`,
      text: `var(--pm33-text)`,
      textMuted: `var(--pm33-text-muted)`,
      primary: `var(--pm33-primary)`,
    }),
    
    // Get spacing values
    getSpacing: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md') => {
      const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
      return `${spacing[size]}px`;
    },
    
    // Get border radius
    getRadius: () => `var(--pm33-radius)`,
    
    // Get shadow
    getShadow: () => `var(--pm33-shadow)`,
    
    // Check if current theme
    isTheme: (theme: ThemeName) => currentTheme === theme,
    
    // Get surface styles
    getSurfaceStyles: (elevated = false) => ({
      backgroundColor: `var(--pm33-surface)`,
      border: `1px solid var(--pm33-border)`,
      borderRadius: `var(--pm33-radius)`,
      ...(elevated && { boxShadow: `var(--pm33-shadow)` }),
    }),
    
    // Get input styles
    getInputStyles: () => ({
      border: `1px solid var(--pm33-border)`,
      borderRadius: `var(--pm33-radius)`,
      fontSize: '14px',
      height: '36px',
      '&:focus': {
        borderColor: `var(--pm33-primary)`,
        boxShadow: `0 0 0 1px var(--pm33-primary)`,
      }
    }),
    
    // Get button styles
    getButtonStyles: (variant: 'filled' | 'outline' = 'filled') => ({
      height: '36px',
      fontSize: '14px',
      fontWeight: 500,
      borderRadius: `var(--pm33-radius)`,
      transition: 'all 0.15s ease',
      ...(variant === 'filled' ? {
        backgroundColor: `var(--pm33-primary)`,
        color: '#ffffff',
        border: 'none',
      } : {
        backgroundColor: 'transparent',
        color: `var(--pm33-text)`,
        border: `1px solid var(--pm33-border)`,
      })
    }),
  };
}

// Simple Theme Switcher - PostHog Style
export function ThemeSwitcher({ className }: { className?: string }) {
  const { currentTheme, setTheme } = useTheme();
  const { getSurfaceStyles } = useThemedStyles();

  return (
    <div 
      data-testid="theme-switcher"
      className={className}
      style={{
        display: 'flex',
        gap: '4px',
        ...getSurfaceStyles(),
        padding: '4px',
        borderRadius: '6px',
      }}
    >
      {(['light', 'dark', 'native'] as ThemeName[]).map((theme) => (
        <button
          key={theme}
          data-theme={theme}
          onClick={() => setTheme(theme)}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 500,
            backgroundColor: currentTheme === theme 
              ? 'var(--pm33-primary)' 
              : 'transparent',
            color: currentTheme === theme 
              ? '#ffffff' 
              : 'var(--pm33-text)',
            transition: 'all 0.15s ease',
          }}
        >
          {theme}
        </button>
      ))}
    </div>
  );
}

// Utility for conditional styling
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}