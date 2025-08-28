/**
 * PM33 Component Library - Main Export Index
 * 
 * This file provides a centralized export point for all PM33 components,
 * making them easily importable throughout the application.
 * 
 * Usage:
 * import { PM33Button, PM33Card, PM33PageWrapper } from '@/components/pm33-ui';
 * 
 * Or import individual components:
 * import { PM33Button } from '@/components/pm33-ui/PM33Button';
 */

// Core Components
export { PM33PageWrapper, type PM33PageWrapperProps } from './PM33PageWrapper';
export { PM33Button, type PM33ButtonProps } from './PM33Button';
export { PM33Card, type PM33CardProps } from './PM33Card';
export { PM33Navigation, type PM33NavigationProps } from './PM33Navigation';
export { PM33AIProcessing, type PM33AIProcessingProps } from './PM33AIProcessing';

// Form Components
export { 
  PM33TextInput, 
  PM33Textarea, 
  PM33Select,
  type PM33TextInputProps,
  type PM33TextareaProps,
  type PM33SelectProps
} from './PM33FormElements';

// Typography Components
export { 
  PM33Title, 
  PM33Text, 
  PM33HeroTitle, 
  PM33SectionTitle, 
  PM33CardTitle, 
  PM33MutedText, 
  PM33AIText,
  type PM33TitleProps,
  type PM33TextProps
} from './PM33Typography';

// Badge Components
export { 
  PM33Badge, 
  PM33AIBadge, 
  PM33FeaturedBadge, 
  PM33NewBadge, 
  PM33SuccessBadge, 
  PM33GlassBadge, 
  PM33GradientBadge,
  type PM33BadgeProps
} from './PM33Badge';

// Utility Components
export { 
  PM33List, 
  PM33ListItem, 
  PM33Avatar, 
  PM33CheckList, 
  PM33AIList, 
  PM33GlassList, 
  PM33TeamAvatar, 
  PM33AIAvatar,
  type PM33ListProps,
  type PM33ListItemProps,
  type PM33AvatarProps
} from './PM33Extras';

// Theme System
export { 
  pm33Theme,
  glassStyles,
  animations,
  utilityClasses,
  mediaQueries,
  generateCSSVariables,
  PM33ThemeProvider,
  useTheme,
  getGlassStyle,
  getResponsiveValue,
  createResponsiveStyles
} from '../../lib/theme/pm33-theme';

// Re-export types for convenience
export type {
  PM33PageWrapperProps,
  PM33ButtonProps, 
  PM33CardProps,
  PM33NavigationProps,
  PM33AIProcessingProps,
  PM33TextInputProps,
  PM33TextareaProps,
  PM33SelectProps,
  PM33TitleProps,
  PM33TextProps,
  PM33BadgeProps,
  PM33ListProps,
  PM33ListItemProps,
  PM33AvatarProps
} from './types';

// Component variants and utilities
export const PM33Variants = {
  pageWrapper: ['marketing', 'app', 'minimal'] as const,
  button: ['primary', 'secondary', 'ai', 'glass', 'outline', 'minimal'] as const,
  card: ['standard', 'glass', 'premium', 'ai', 'minimal', 'elevated'] as const,
  navigation: ['marketing', 'app'] as const,
  aiProcessing: ['minimal', 'standard', 'detailed', 'inline'] as const,
  textInput: ['standard', 'glass', 'ai', 'minimal'] as const,
  textarea: ['standard', 'glass', 'ai', 'minimal'] as const,
  select: ['standard', 'glass', 'ai', 'minimal'] as const,
  title: ['default', 'gradient', 'ai', 'hero', 'section', 'card'] as const,
  text: ['default', 'muted', 'accent', 'ai', 'success', 'warning', 'error'] as const,
  badge: ['default', 'gradient', 'glass', 'ai', 'success', 'warning', 'error', 'featured', 'new'] as const,
  list: ['default', 'glass', 'ai', 'checklist', 'featured'] as const,
  avatar: ['default', 'glass', 'ai', 'premium', 'team'] as const,
} as const;

// Default configurations for each component
export const PM33Defaults = {
  pageWrapper: {
    variant: 'marketing' as const,
    size: 'xl' as const,
    padding: 'lg' as const,
    animate: true,
    glassEffect: 'none' as const,
  },
  button: {
    variant: 'primary' as const,
    size: 'md' as const,
    glowEffect: false,
    pulseOnHover: false,
  },
  card: {
    variant: 'standard' as const,
    size: 'md' as const,
    hover: true,
    glowEffect: false,
  },
  navigation: {
    variant: 'marketing' as const,
    showThemeToggle: true,
    showCTA: true,
    ctaText: 'Start Free Trial' as const,
    ctaHref: '/trial' as const,
  },
  aiProcessing: {
    variant: 'standard' as const,
    showEngineDetails: false,
    showConfidenceScores: false,
    showResponseTimes: false,
  },
} as const;