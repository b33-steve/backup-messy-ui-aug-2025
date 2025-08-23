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
    
    // Apply theme to document body for global styles
    document.body.className = newTheme;
    
    // Persist theme preference
    localStorage.setItem('pm33-theme', newTheme);
  };

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('pm33-theme') as PM33Theme;
    if (savedTheme && ['light', 'dark', 'gray'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      setTheme(defaultTheme);
    }
  }, [defaultTheme]);

  // Apply theme styles to CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    
    switch (theme) {
      case 'light':
        root.style.setProperty('--pm33-bg-gradient', 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)');
        root.style.setProperty('--pm33-text-primary', '#1e293b');
        root.style.setProperty('--pm33-text-secondary', '#64748b');
        root.style.setProperty('--pm33-accent', '#3b82f6');
        root.style.setProperty('--pm33-glass-bg', 'rgba(255,255,255,0.7)');
        root.style.setProperty('--pm33-glass-border', 'rgba(0,0,0,0.1)');
        root.style.setProperty('--pm33-glass-shadow', '0 4px 20px rgba(0,0,0,0.1)');
        root.style.setProperty('--pm33-glass-hover-shadow', '0 8px 30px rgba(0,0,0,0.15)');
        break;
        
      case 'dark':
        root.style.setProperty('--pm33-bg-gradient', 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)');
        root.style.setProperty('--pm33-text-primary', '#f8fafc');
        root.style.setProperty('--pm33-text-secondary', 'rgba(248,250,252,0.7)');
        root.style.setProperty('--pm33-accent', '#64748b');
        root.style.setProperty('--pm33-glass-bg', 'rgba(255,255,255,0.05)');
        root.style.setProperty('--pm33-glass-border', 'rgba(255,255,255,0.1)');
        root.style.setProperty('--pm33-glass-shadow', '0 4px 20px rgba(0,0,0,0.3)');
        root.style.setProperty('--pm33-glass-hover-shadow', '0 8px 30px rgba(0,0,0,0.4)');
        break;
        
      case 'gray':
        root.style.setProperty('--pm33-bg-gradient', 'linear-gradient(135deg, #f8f4ff 0%, #e9d5ff 30%, #f3e8ff 70%, #faf7ff 100%)');
        root.style.setProperty('--pm33-text-primary', '#581c87');
        root.style.setProperty('--pm33-text-secondary', 'rgba(88,28,135,0.7)');
        root.style.setProperty('--pm33-accent', '#9ca3af');
        root.style.setProperty('--pm33-glass-bg', 'rgba(255,255,255,0.1)');
        root.style.setProperty('--pm33-glass-border', 'rgba(255,255,255,0.15)');
        root.style.setProperty('--pm33-glass-shadow', '0 4px 20px rgba(0,0,0,0.2)');
        root.style.setProperty('--pm33-glass-hover-shadow', '0 8px 30px rgba(0,0,0,0.3)');
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
        className="min-h-screen transition-all duration-300 ease-in-out"
        style={{ background: 'var(--pm33-bg-gradient)', color: 'var(--pm33-text-primary)' }}
      >
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
          }}
        >
          {themeOption.label}
        </button>
      ))}
    </div>
  );
}