/**
 * Component: PM33ThemeProvider
 * Design Reference: docs/app/APP_THEME_GUIDE.md - Theme system implementation
 * UX Pattern: PM33_COMPLETE_UX_SYSTEM.md - Theme switching patterns
 * 
 * Compliance Checklist:
 * - [x] Three theme support (light/dark/native)
 * - [x] PM33 color system variables
 * - [x] Glass morphism CSS variables
 * - [x] Theme switching functionality
 * - [x] LocalStorage persistence
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'native';

interface PM33ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

interface ThemedStylesType {
  getColors: () => Record<string, string>;
  getSurfaceStyles: () => Record<string, string>;
}

const PM33ThemeContext = createContext<PM33ThemeContextType | undefined>(undefined);
const ThemedStylesContext = createContext<ThemedStylesType | undefined>(undefined);

// PM33 Comprehensive Color System for Marketing + App
const PM33_COLORS = {
  light: {
    // Core brand colors - using logo colors
    primary: '#1e3a8a',
    secondary: '#0891b2',
    aiGlow: '#06b6d4',
    success: '#0891b2',
    warning: '#f59e0b',
    danger: '#dc2626',
    
    // Text colors
    textPrimary: '#1e293b',
    textSecondary: '#475569',
    textDimmed: '#64748b',
    
    // Background colors - off-white, not pure white
    background: '#fafbfc',
    backgroundSecondary: '#f8fafc',
    surface: '#ffffff',
    surfaceSecondary: '#f1f5f9',
    
    // Marketing specific
    marketingBg: '#fafbfc',
    marketingText: '#1e293b',
    marketingTextSecondary: '#475569',
    marketingPrimary: '#1e3a8a',
    
    // Borders and separators
    border: '#e2e8f0',
    borderLight: '#f1f5f9',
    
    // Interactive elements
    hover: '#f8fafc',
    pressed: '#f1f5f9',
    
    // Glass morphism
    glass: 'rgba(255, 255, 255, 0.1)',
    glassBorder: 'rgba(255, 255, 255, 0.18)'
  },
  dark: {
    // Core brand colors - same logo colors work in dark
    primary: '#1e3a8a',
    secondary: '#0891b2', 
    aiGlow: '#06b6d4',
    success: '#0891b2',
    warning: '#f59e0b',
    danger: '#dc2626',
    
    // Text colors - bright on dark
    textPrimary: '#ffffff',
    textSecondary: '#e2e8f0',
    textDimmed: '#94a3b8',
    
    // Background colors - proper dark
    background: '#0f172a',
    backgroundSecondary: '#1e293b',
    surface: '#1e293b',
    surfaceSecondary: '#334155',
    
    // Marketing specific
    marketingBg: '#0f172a',
    marketingText: '#ffffff',
    marketingTextSecondary: '#e2e8f0',
    marketingPrimary: '#1e3a8a',
    
    // Borders and separators
    border: '#334155',
    borderLight: '#475569',
    
    // Interactive elements
    hover: '#334155',
    pressed: '#475569',
    
    // Glass morphism
    glass: 'rgba(255, 255, 255, 0.1)',
    glassBorder: 'rgba(255, 255, 255, 0.18)'
  },
  native: {
    // Core brand colors (gradient versions)
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
    aiGlow: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
    success: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    warning: 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)',
    danger: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
    
    // Text colors
    textPrimary: '#1e293b',
    textSecondary: '#64748b',
    textDimmed: '#9ca3af',
    
    // Background colors
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundSecondary: 'rgba(255, 255, 255, 0.95)',
    surface: 'rgba(255, 255, 255, 0.9)',
    surfaceSecondary: 'rgba(255, 255, 255, 0.8)',
    
    // Marketing specific
    marketingBg: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    marketingText: '#1e293b',
    marketingTextSecondary: '#64748b',
    marketingPrimary: '#667eea',
    
    // Borders and separators
    border: 'rgba(124, 58, 237, 0.2)',
    borderLight: 'rgba(124, 58, 237, 0.1)',
    
    // Interactive elements
    hover: 'rgba(255, 255, 255, 0.1)',
    pressed: 'rgba(255, 255, 255, 0.2)',
    
    // Glass morphism
    glass: 'rgba(255, 255, 255, 0.2)',
    glassBorder: 'rgba(255, 255, 255, 0.3)'
  }
};

export function PM33ThemeProvider({ 
  children, 
  defaultTheme = 'dark' 
}: { 
  children: React.ReactNode;
  defaultTheme?: Theme;
}) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('pm33-theme') as Theme;
    if (savedTheme && ['light', 'dark', 'native'].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    const colors = PM33_COLORS[currentTheme];
    
    // Set CSS custom properties
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--pm33-${key}`, value);
    });

    // Set theme class for Tailwind
    root.classList.remove('light', 'dark', 'native');
    root.classList.add(currentTheme);
    
    // Set data-theme attribute for CSS selectors
    root.setAttribute('data-theme', currentTheme);
    
    // Apply theme to document body as well
    document.body.className = document.body.className.replace(/\b(light|dark|native)\b/g, '').trim();
    document.body.classList.add(currentTheme);
    
    // Save to localStorage
    localStorage.setItem('pm33-theme', currentTheme);
  }, [currentTheme]);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'native'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const getColors = () => PM33_COLORS[currentTheme];

  const getSurfaceStyles = () => ({
    glassCard: {
      background: `var(--pm33-glass)`,
      backdropFilter: 'blur(40px) saturate(150%)',
      border: `1px solid var(--pm33-glassBorder)`,
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
    },
    primaryButton: {
      background: `var(--pm33-primary)`,
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    }
  });

  return (
    <PM33ThemeContext.Provider value={{ currentTheme, setTheme, toggleTheme }}>
      <ThemedStylesContext.Provider value={{ getColors, getSurfaceStyles }}>
        {children}
      </ThemedStylesContext.Provider>
    </PM33ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(PM33ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a PM33ThemeProvider');
  }
  return context;
};

export const useThemedStyles = () => {
  const context = useContext(ThemedStylesContext);
  if (!context) {
    throw new Error('useThemedStyles must be used within a PM33ThemeProvider');
  }
  return context;
};

// Theme Switcher Component
export const ThemeSwitcher = ({ className = '' }: { className?: string }) => {
  const { currentTheme, setTheme } = useTheme();

  return (
    <div className={`flex gap-2 ${className}`}>
      {(['light', 'dark', 'native'] as Theme[]).map((theme) => (
        <button
          key={theme}
          onClick={() => setTheme(theme)}
          data-testid={`theme-${theme}`}
          className={`
            px-3 py-2 rounded-lg text-sm font-medium
            transition-all duration-200
            ${currentTheme === theme 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-white/10 text-slate-600 hover:bg-white/20'
            }
          `}
          style={{
            background: currentTheme === theme 
              ? 'var(--pm33-primary)' 
              : 'var(--pm33-glass)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--pm33-glassBorder)'
          }}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      ))}
    </div>
  );
};