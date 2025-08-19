'use client';

import React, { createContext, useContext } from 'react';

interface DesignSystemContextType {
  context: 'marketing' | 'app';
  theme: {
    colors: {
      primary: string;
      primaryHover: string;
      primaryLight: string;
      success: string;
      successLight: string;
      cta: string;
      ctaHover: string;
      ctaLight: string;
      textPrimary: string;
      textSecondary: string;
      textMuted: string;
      bgPrimary: string;
      bgSecondary: string;
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
  const marketingTheme = {
    colors: {
      primary: 'var(--marketing-primary)',
      primaryHover: 'var(--marketing-primary-hover)',
      primaryLight: 'var(--marketing-primary-light)',
      success: 'var(--marketing-success)',
      successLight: 'var(--marketing-success-light)',
      cta: 'var(--marketing-cta)',
      ctaHover: 'var(--marketing-cta-hover)',
      ctaLight: 'var(--marketing-cta-light)',
      textPrimary: 'var(--marketing-text-primary)',
      textSecondary: 'var(--marketing-text-secondary)',
      textMuted: 'var(--marketing-text-muted)',
      bgPrimary: 'var(--marketing-bg-primary)',
      bgSecondary: 'var(--marketing-bg-secondary)',
      bgAccent: 'var(--marketing-bg-accent)',
    },
  };

  const appTheme = {
    colors: {
      primary: 'var(--app-primary)',
      primaryHover: 'var(--app-primary-hover)',
      primaryLight: 'var(--app-primary-light)',
      success: 'var(--app-success)',
      successLight: 'var(--app-success-light)',
      cta: 'var(--app-primary)', // App uses primary for CTAs
      ctaHover: 'var(--app-primary-hover)',
      ctaLight: 'var(--app-primary-light)',
      textPrimary: 'var(--app-text-primary)',
      textSecondary: 'var(--app-text-secondary)',
      textMuted: 'var(--app-text-muted)',
      bgPrimary: 'var(--app-bg-primary)',
      bgSecondary: 'var(--app-bg-secondary)',
      bgAccent: 'var(--app-bg-accent)',
    },
  };

  const value: DesignSystemContextType = {
    context,
    theme: context === 'marketing' ? marketingTheme : appTheme,
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