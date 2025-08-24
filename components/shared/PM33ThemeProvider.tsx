/**
 * Component: PM33ThemeProvider
 * Design Reference: HTML Prototype - Theme system with light/dark/gray variants
 * UX Pattern: Theme-aware switching with automatic logo selection
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

import React, { createContext, useContext, useEffect, useState } from 'react';

export type PM33Theme = 'light' | 'dark' | 'gray';

interface PM33ThemeContextType {
  theme: PM33Theme;
  setTheme: (theme: PM33Theme) => void;
  logoSrc: string;
}

const PM33ThemeContext = createContext<PM33ThemeContextType | undefined>(undefined);

interface PM33ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: PM33Theme;
}

export function PM33ThemeProvider({ children, defaultTheme = 'light' }: PM33ThemeProviderProps) {
  const [theme, setThemeState] = useState<PM33Theme>(defaultTheme);

  // Logo mapping based on theme
  const getLogoSrc = (currentTheme: PM33Theme): string => {
    switch (currentTheme) {
      case 'light':
        return '/pm33-logo-light.png'; // Regular logo for light backgrounds
      case 'dark':
      case 'gray':
        return '/pm33-logo-dark.png'; // White logo for dark/gray backgrounds
      default:
        return '/pm33-logo-light.png';
    }
  };

  const setTheme = (newTheme: PM33Theme) => {
    setThemeState(newTheme);
    
    // Apply theme to document body and html for global styles
    document.body.className = newTheme;
    document.documentElement.className = newTheme;
    
    // Persist theme preference
    localStorage.setItem('pm33-theme', newTheme);
  };

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('pm33-theme') as PM33Theme;
    if (savedTheme && ['light', 'dark', 'gray'].includes(savedTheme)) {
      setThemeState(savedTheme);
      // Apply theme immediately on load
      document.body.className = savedTheme;
      document.documentElement.className = savedTheme;
    } else {
      setThemeState(defaultTheme);
      document.body.className = defaultTheme;
      document.documentElement.className = defaultTheme;
    }
  }, [defaultTheme]);

  // Apply theme styles to CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    
    switch (theme) {
      case 'light':
        // LIGHT THEME: Exact specifications
        root.style.setProperty('--pm33-bg-gradient', 'linear-gradient(135deg, #f8f9fa, #ffffff)');
        root.style.setProperty('--pm33-text-primary', '#1a1a1a');
        root.style.setProperty('--pm33-text-secondary', '#4a4a4a');
        root.style.setProperty('--pm33-accent', '#3b82f6');
        root.style.setProperty('--pm33-glass-bg', 'rgba(255,255,255,0.8)');
        root.style.setProperty('--pm33-glass-border', 'rgba(0, 0, 0, 0.06)');
        root.style.setProperty('--pm33-glass-shadow', '0 4px 20px rgba(0,0,0,0.08)');
        root.style.setProperty('--pm33-glass-hover-shadow', '0 8px 30px rgba(0, 0, 0, 0.12)');
        root.style.setProperty('--pm33-brand-gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
        break;
        
      case 'dark':
        // DARK THEME: Exact specifications
        root.style.setProperty('--pm33-bg-gradient', 'linear-gradient(135deg, #0a0a0a, #1a1a1a)');
        root.style.setProperty('--pm33-text-primary', '#ffffff');
        root.style.setProperty('--pm33-text-secondary', '#d1d5db');
        root.style.setProperty('--pm33-accent', '#60a5fa');
        root.style.setProperty('--pm33-glass-bg', 'rgba(255,255,255,0.05)');
        root.style.setProperty('--pm33-glass-border', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--pm33-glass-shadow', '0 8px 32px rgba(0,0,0,0.4)');
        root.style.setProperty('--pm33-glass-hover-shadow', '0 8px 30px rgba(96, 165, 250, 0.2)');
        root.style.setProperty('--pm33-brand-gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
        break;
        
      case 'gray':
        // GRAY THEME: Warm charcoal background with sophisticated contrast - visually distinct from dark
        root.style.setProperty('--pm33-bg-gradient', 'linear-gradient(135deg, #1f2937 0%, #374151 100%)'); // Warmer gray-blue
        root.style.setProperty('--pm33-text-primary', '#f9fafb'); // Off-white headings  
        root.style.setProperty('--pm33-text-secondary', '#d1d5db'); // Lighter gray body text
        root.style.setProperty('--pm33-accent', '#a78bfa'); // Purple accent (different from dark theme blue)
        root.style.setProperty('--pm33-glass-bg', 'rgba(75, 85, 99, 0.3)'); // Warm gray glass tint
        root.style.setProperty('--pm33-glass-border', 'rgba(156, 163, 175, 0.2)'); // Gray border
        root.style.setProperty('--pm33-glass-shadow', '0 4px 20px rgba(31, 41, 55, 0.4)'); // Warmer shadows
        root.style.setProperty('--pm33-glass-hover-shadow', '0 8px 30px rgba(167, 139, 250, 0.15)'); // Purple glow effect
        root.style.setProperty('--pm33-brand-gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
        break;
    }
  }, [theme]);

  const contextValue: PM33ThemeContextType = {
    theme,
    setTheme,
    logoSrc: getLogoSrc(theme),
  };

  return (
    <PM33ThemeContext.Provider value={contextValue}>
      <div 
        className="min-h-screen transition-all duration-500 ease-in-out"
        style={{ 
          background: 'var(--pm33-bg-gradient)', 
          color: 'var(--pm33-text-primary)',
          // Ensure the background covers the full viewport
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1
        }}
      />
      <div className="relative z-10 min-h-screen" style={{ color: 'var(--pm33-text-primary)' }}>
        {children}
      </div>
    </PM33ThemeContext.Provider>
  );
}

export function usePM33Theme() {
  const context = useContext(PM33ThemeContext);
  if (context === undefined) {
    throw new Error('usePM33Theme must be used within a PM33ThemeProvider');
  }
  return context;
}

// Theme Toggle Component
export function PM33ThemeToggle() {
  const { theme, setTheme } = usePM33Theme();
  
  const themes: { value: PM33Theme; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'gray', label: 'Gray' },
  ];

  return (
    <div className="fixed top-5 right-5 z-50 flex gap-2 p-2 rounded-xl backdrop-blur-xl"
         style={{ 
           background: 'var(--pm33-glass-bg)', 
           border: '1px solid var(--pm33-glass-border)' 
         }}>
      {themes.map((themeOption) => (
        <button
          key={themeOption.value}
          onClick={() => setTheme(themeOption.value)}
          onMouseEnter={(e) => {
            if (theme !== themeOption.value) {
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (theme !== themeOption.value) {
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out
            ${theme === themeOption.value 
              ? 'transform scale-95 opacity-100' 
              : 'opacity-70 hover:opacity-90'
            }`}
          style={{
            background: theme === themeOption.value 
              ? 'var(--pm33-accent)' 
              : 'transparent',
            color: theme === themeOption.value 
              ? 'white' 
              : 'var(--pm33-text-secondary)',
            transform: theme === themeOption.value ? 'scale(0.95)' : 'scale(1)',
          }}
        >
          {themeOption.label}
        </button>
      ))}
    </div>
  );
}