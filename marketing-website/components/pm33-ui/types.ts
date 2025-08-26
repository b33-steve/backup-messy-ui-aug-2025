/**
 * PM33 Component Library - TypeScript Type Definitions
 * 
 * Centralized type definitions for all PM33 components to ensure
 * consistency and provide excellent TypeScript support.
 */

import { ReactNode } from 'react';
import { ButtonProps as MantineButtonProps, TextInputProps as MantineTextInputProps, TextareaProps as MantineTextareaProps, SelectProps as MantineSelectProps, TitleProps as MantineTitleProps, TextProps as MantineTextProps, BadgeProps as MantineBadgeProps, ListProps as MantineListProps, AvatarProps as MantineAvatarProps } from '@mantine/core';

// ============================================================================
// Base Types
// ============================================================================

export type PM33Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type PM33Variant = 'primary' | 'secondary' | 'minimal';
export type PM33ThemeMode = 'light' | 'dark' | 'system';

// ============================================================================
// PM33PageWrapper Types
// ============================================================================

export interface PM33PageWrapperProps {
  children: ReactNode;
  variant?: 'marketing' | 'app' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
  glassEffect?: 'none' | 'subtle' | 'medium' | 'strong';
  backgroundGradient?: boolean;
  centered?: boolean;
}

// ============================================================================
// PM33Button Types  
// ============================================================================

export interface PM33ButtonProps extends Omit<MantineButtonProps, 'variant' | 'size'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ai' | 'glass' | 'outline' | 'minimal';
  size?: PM33Size;
  isLoading?: boolean;
  loadingText?: string;
  aiProcessing?: boolean;
  glowEffect?: boolean;
  pulseOnHover?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// ============================================================================
// PM33Card Types
// ============================================================================

export interface PM33CardProps {
  children: ReactNode;
  variant?: 'standard' | 'glass' | 'premium' | 'ai' | 'minimal' | 'elevated';
  size?: PM33Size;
  hover?: boolean;
  loading?: boolean;
  aiProcessing?: boolean;
  glowEffect?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  headerIcon?: ReactNode;
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onHover?: (isHovered: boolean) => void;
}

// ============================================================================
// PM33Navigation Types
// ============================================================================

export interface NavigationItem {
  label: string;
  href: string;
  icon?: ReactNode;
  badge?: string;
  description?: string;
  isNew?: boolean;
  isAI?: boolean;
}

export interface PM33NavigationProps {
  variant?: 'marketing' | 'app';
  items?: NavigationItem[];
  showThemeToggle?: boolean;
  showUserMenu?: boolean;
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
  logo?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onNavigate?: (href: string) => void;
}

// ============================================================================
// PM33AIProcessing Types
// ============================================================================

export interface AIEngine {
  id: string;
  name: string;
  icon: ReactNode;
  status: 'idle' | 'processing' | 'completed' | 'error';
  progress: number;
  confidence?: number;
  responseTime?: number;
  lastResult?: string;
}

export interface PM33AIProcessingProps {
  variant?: 'minimal' | 'standard' | 'detailed' | 'inline';
  engines?: AIEngine[];
  isProcessing?: boolean;
  processingText?: string;
  completedText?: string;
  showEngineDetails?: boolean;
  showConfidenceScores?: boolean;
  showResponseTimes?: boolean;
  autostart?: boolean;
  onProcessingComplete?: (results: AIEngine[]) => void;
  className?: string;
  style?: React.CSSProperties;
}

// ============================================================================
// Theme System Types
// ============================================================================

export interface ThemeColors {
  brand: {
    primary: string;
    hover: string;
    active: string;
  };
  ai: {
    glow: string;
    processing: string;
    success: string;
    warning: string;
    danger: string;
  };
  glass: {
    background: string;
    border: string;
    shadow: string;
    backdropFilter: string;
    borderRadius: string;
  };
  surfaces: {
    dark: Record<string, string>;
    light: Record<string, string>;
  };
  semantic: {
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    borderSubtle: string;
    borderDefault: string;
  };
}

export interface ThemeContextValue {
  mode: PM33ThemeMode;
  setMode: (mode: PM33ThemeMode) => void;
  theme: ThemeColors;
  glassStyles: Record<string, React.CSSProperties>;
  isDark: boolean;
}

export interface PM33ThemeProviderProps {
  children: ReactNode;
  defaultMode?: PM33ThemeMode;
  storageKey?: string;
}

// ============================================================================
// Component Composition Types
// ============================================================================

export interface PM33ComponentBaseProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

export interface PM33InteractiveProps extends PM33ComponentBaseProps {
  onClick?: () => void;
  onHover?: (isHovered: boolean) => void;
  disabled?: boolean;
}

export interface PM33AnimatedProps {
  animate?: boolean;
  animationDelay?: number;
  animationDuration?: number;
}

export interface PM33GlassProps {
  glassEffect?: 'none' | 'subtle' | 'medium' | 'strong';
  glowEffect?: boolean;
}

// ============================================================================
// Utility Types
// ============================================================================

export type PM33ComponentVariant<T extends string> = {
  [K in T]: {
    className: string;
    style: React.CSSProperties;
  };
};

export type ResponsiveValue<T> = T | { xs?: T; sm?: T; md?: T; lg?: T; xl?: T };

export type PM33SpacingValue = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export type PM33ColorVariant = 
  | 'primary' 
  | 'secondary' 
  | 'ai' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'neutral';

// ============================================================================
// Event Handler Types
// ============================================================================

export type PM33ClickHandler = (event: React.MouseEvent) => void;
export type PM33KeyboardHandler = (event: React.KeyboardEvent) => void;
export type PM33FocusHandler = (event: React.FocusEvent) => void;
export type PM33ChangeHandler<T = string> = (value: T) => void;

// ============================================================================
// Validation Types
// ============================================================================

export interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: any) => boolean | string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// ============================================================================
// PM33 Form Element Types
// ============================================================================

export interface PM33TextInputProps extends Omit<MantineTextInputProps, 'variant'> {
  variant?: 'standard' | 'glass' | 'ai' | 'minimal';
  aiPrefill?: boolean;
  aiValidation?: boolean;
  successState?: boolean;
  glowEffect?: boolean;
}

export interface PM33TextareaProps extends Omit<MantineTextareaProps, 'variant'> {
  variant?: 'standard' | 'glass' | 'ai' | 'minimal';
  aiPrefill?: boolean;
  aiValidation?: boolean;
  successState?: boolean;
  glowEffect?: boolean;
}

export interface PM33SelectProps extends Omit<MantineSelectProps, 'variant'> {
  variant?: 'standard' | 'glass' | 'ai' | 'minimal';
  aiSuggestions?: boolean;
  successState?: boolean;
  glowEffect?: boolean;
}

// ============================================================================
// PM33 Typography Types
// ============================================================================

export interface PM33TitleProps extends MantineTitleProps {
  variant?: 'default' | 'gradient' | 'ai' | 'hero' | 'section' | 'card';
  glow?: boolean;
  animate?: boolean;
}

export interface PM33TextProps extends MantineTextProps {
  variant?: 'default' | 'muted' | 'accent' | 'ai' | 'success' | 'warning' | 'error';
  gradient?: boolean;
  glow?: boolean;
  animate?: boolean;
}

// ============================================================================
// PM33 Badge Types
// ============================================================================

export interface PM33BadgeProps extends Omit<MantineBadgeProps, 'variant' | 'color'> {
  variant?: 'default' | 'gradient' | 'glass' | 'ai' | 'success' | 'warning' | 'error' | 'featured' | 'new';
  glow?: boolean;
  pulse?: boolean;
  animate?: boolean;
  icon?: ReactNode;
}

// ============================================================================
// PM33 List and Avatar Types
// ============================================================================

export interface PM33ListProps extends MantineListProps {
  variant?: 'default' | 'glass' | 'ai' | 'checklist' | 'featured';
  glowEffect?: boolean;
  animate?: boolean;
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface PM33ListItemProps {
  children: ReactNode;
  icon?: ReactNode;
  checked?: boolean;
  featured?: boolean;
  style?: React.CSSProperties;
}

export interface PM33AvatarProps extends Omit<MantineAvatarProps, 'variant'> {
  variant?: 'default' | 'glass' | 'ai' | 'premium' | 'team';
  glowEffect?: boolean;
  pulse?: boolean;
  animate?: boolean;
  status?: 'online' | 'offline' | 'busy' | 'away';
}

// ============================================================================
// Export All Types
// ============================================================================

export type {
  PM33Size,
  PM33Variant,
  PM33ThemeMode,
  PM33ComponentBaseProps,
  PM33InteractiveProps,
  PM33AnimatedProps,
  PM33GlassProps,
  ResponsiveValue,
  PM33SpacingValue,
  PM33ColorVariant,
};