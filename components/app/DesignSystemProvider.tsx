'use client';

import React, { createContext, useContext } from 'react';

interface DesignSystemContextType {
  context: 'marketing' | 'app';
  theme: {
    colors: {
      primary: string;
      primaryHover: string;
      primaryLight: string;
      primaryGhost: string;
      success: string;
      successLight: string;
      successGhost: string;
      warning: string;
      warningLight: string;
      warningGhost: string;
      error: string;
      errorLight: string;
      errorGhost: string;
      textPrimary: string;
      textSecondary: string;
      textTertiary: string;
      textMuted: string;
      bgPrimary: string;
      bgSecondary: string;
      bgTertiary: string;
      bgAccent: string;
    };
  };
}

const DesignSystemContext = createContext<DesignSystemContextType | null>(null);

interface DesignSystemProviderProps {
  children: React.ReactNode;
  context: 'marketing' | 'app';
}

export function DesignSystemProvider({ children, context }: DesignSystemProviderProps) {
  const appTheme = {
    colors: {
      primary: 'var(--app-primary)',
      primaryHover: 'var(--app-primary-hover)',
      primaryLight: 'var(--app-primary-light)',
      primaryGhost: 'var(--app-primary-ghost)',
      success: 'var(--app-success)',
      successLight: 'var(--app-success-light)',
      successGhost: 'var(--app-success-ghost)',
      warning: 'var(--app-warning)',
      warningLight: 'var(--app-warning-light)',
      warningGhost: 'var(--app-warning-ghost)',
      error: 'var(--app-error)',
      errorLight: 'var(--app-error-light)',
      errorGhost: 'var(--app-error-ghost)',
      textPrimary: 'var(--app-text-primary)',
      textSecondary: 'var(--app-text-secondary)',
      textTertiary: 'var(--app-text-tertiary)',
      textMuted: 'var(--app-text-muted)',
      bgPrimary: 'var(--app-bg-primary)',
      bgSecondary: 'var(--app-bg-secondary)',
      bgTertiary: 'var(--app-bg-tertiary)',
      bgAccent: 'var(--app-bg-accent)',
    },
  };

  const marketingTheme = {
    colors: {
      primary: 'var(--marketing-primary)',
      primaryHover: 'var(--marketing-primary-hover)',
      primaryLight: 'var(--marketing-primary-light)',
      primaryGhost: 'var(--marketing-primary-light)', // Marketing doesn't have ghost variant
      success: 'var(--marketing-success)',
      successLight: 'var(--marketing-success-light)',
      successGhost: 'var(--marketing-success-light)',
      warning: 'var(--marketing-cta)', // Marketing uses CTA colors for warnings
      warningLight: 'var(--marketing-cta-light)',
      warningGhost: 'var(--marketing-cta-light)',
      error: 'var(--marketing-cta-hover)',
      errorLight: 'var(--marketing-cta-light)',
      errorGhost: 'var(--marketing-cta-light)',
      textPrimary: 'var(--marketing-text-primary)',
      textSecondary: 'var(--marketing-text-secondary)',
      textTertiary: 'var(--marketing-text-secondary)',
      textMuted: 'var(--marketing-text-muted)',
      bgPrimary: 'var(--marketing-bg-primary)',
      bgSecondary: 'var(--marketing-bg-secondary)',
      bgTertiary: 'var(--marketing-bg-accent)',
      bgAccent: 'var(--marketing-bg-accent)',
    },
  };

  const value: DesignSystemContextType = {
    context,
    theme: context === 'app' ? appTheme : marketingTheme,
  };

  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
}

export function useDesignSystem() {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }
  return context;
}