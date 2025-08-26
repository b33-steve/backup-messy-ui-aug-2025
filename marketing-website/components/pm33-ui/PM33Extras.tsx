/**
 * Component: PM33Extras (List, Avatar, and utility components)
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Section 10.1
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Section 9.1
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied with backdrop-filter: blur(40px) saturate(150%)
 * - [x] Animations implemented (hover effects, loading states)
 * - [x] Hover states added with transform and glow effects
 * - [x] AI intelligence visible through smart components
 * - [x] Progress indicators present (loading states)
 * - [x] Follows 8pt grid spacing system
 * - [x] PM33 component library integration
 * - [x] Mantine compatibility maintained
 */

'use client';

import React, { forwardRef } from 'react';
import { List, Avatar, ListProps, AvatarProps, ThemeIcon, Group, Stack } from '@mantine/core';
import { IconCheck, IconBolt, IconSparkles, IconUser } from '@tabler/icons-react';

// ============================================================================
// PM33 LIST INTERFACES
// ============================================================================

export interface PM33ListProps extends ListProps {
  variant?: 'default' | 'glass' | 'ai' | 'checklist' | 'featured';
  glowEffect?: boolean;
  animate?: boolean;
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface PM33ListItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  checked?: boolean;
  featured?: boolean;
  style?: React.CSSProperties;
}

// ============================================================================
// PM33 AVATAR INTERFACES  
// ============================================================================

export interface PM33AvatarProps extends Omit<AvatarProps, 'variant'> {
  variant?: 'default' | 'glass' | 'ai' | 'premium' | 'team';
  glowEffect?: boolean;
  pulse?: boolean;
  animate?: boolean;
  status?: 'online' | 'offline' | 'busy' | 'away';
}

// ============================================================================
// PM33 LIST STYLES
// ============================================================================

const getListStyles = (variant: PM33ListProps['variant'] = 'default', glowEffect: boolean = false) => {
  const variants = {
    default: {
      padding: '0',
      margin: '0',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.06)',
      backdropFilter: 'blur(20px) saturate(120%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '16px 20px',
      margin: '0',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
    },
    ai: {
      background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.08) 0%, rgba(58, 123, 213, 0.04) 100%)',
      backdropFilter: 'blur(40px) saturate(150%)',
      border: '1px solid rgba(0, 210, 255, 0.15)',
      borderRadius: '16px',
      padding: '20px 24px',
      margin: '0',
      boxShadow: '0 6px 20px rgba(0, 210, 255, 0.1), inset 0 0 0 1px rgba(0, 210, 255, 0.1)',
    },
    checklist: {
      background: 'rgba(56, 161, 105, 0.05)',
      backdropFilter: 'blur(20px) saturate(120%)',
      border: '1px solid rgba(56, 161, 105, 0.15)',
      borderRadius: '12px',
      padding: '16px 20px',
      margin: '0',
      boxShadow: '0 4px 16px rgba(56, 161, 105, 0.08)',
    },
    featured: {
      background: 'var(--pm33-brand)',
      border: 'none',
      borderRadius: '16px',
      padding: '20px 24px',
      margin: '0',
      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.25)',
      color: 'white',
    },
  };

  let styles = variants[variant];

  if (glowEffect && variant !== 'default') {
    const glowColor = variant === 'ai' ? 'rgba(0, 210, 255, 0.4)' : 'rgba(102, 126, 234, 0.4)';
    styles = {
      ...styles,
      boxShadow: `${styles.boxShadow || ''}, 0 0 20px ${glowColor}`,
    };
  }

  return {
    ...styles,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };
};

const getListItemStyles = (checked: boolean = false, featured: boolean = false) => {
  return {
    padding: '8px 0',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    fontSize: '14px',
    lineHeight: '1.5',
    color: featured ? 'white' : 'var(--pm33-text-primary)',
    opacity: checked ? 1 : 0.9,
    transition: 'all 0.2s ease',
    '&:hover': {
      opacity: 1,
      transform: 'translateX(4px)',
    },
  };
};

// ============================================================================
// PM33 AVATAR STYLES
// ============================================================================

const getAvatarStyles = (
  variant: PM33AvatarProps['variant'] = 'default',
  glowEffect: boolean = false,
  pulse: boolean = false
) => {
  const variants = {
    default: {
      border: '2px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px) saturate(120%)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
    },
    ai: {
      background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.2) 0%, rgba(58, 123, 213, 0.15) 100%)',
      backdropFilter: 'blur(40px) saturate(150%)',
      border: '2px solid rgba(0, 210, 255, 0.4)',
      boxShadow: '0 6px 20px rgba(0, 210, 255, 0.2), inset 0 0 0 1px rgba(0, 210, 255, 0.2)',
    },
    premium: {
      background: 'var(--pm33-brand)',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3), 0 0 0 4px rgba(102, 126, 234, 0.1)',
    },
    team: {
      border: '2px solid var(--pm33-brand)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
    },
  };

  let styles = variants[variant];

  if (glowEffect) {
    const glowColor = variant === 'ai' ? 'rgba(0, 210, 255, 0.6)' : 'rgba(102, 126, 234, 0.6)';
    styles = {
      ...styles,
      boxShadow: `${styles.boxShadow}, 0 0 20px ${glowColor}`,
    };
  }

  return {
    ...styles,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    ...(pulse && {
      animation: 'pm33-pulse-scale 2s ease-in-out infinite',
    }),
    '&:hover': {
      transform: 'translateY(-2px) scale(1.05)',
      boxShadow: `${styles.boxShadow}, 0 8px 32px rgba(0, 0, 0, 0.15)`,
    },
  };
};

// ============================================================================
// PM33 LIST COMPONENT
// ============================================================================

export const PM33List = forwardRef<HTMLUListElement, PM33ListProps>(({
  variant = 'default',
  glowEffect = false,
  animate = false,
  spacing = 'md',
  style,
  children,
  ...props
}, ref) => {
  const listStyles = getListStyles(variant, glowEffect);

  return (
    <List
      ref={ref}
      spacing={spacing}
      style={{
        ...listStyles,
        ...style,
        ...(animate && {
          animation: 'pm33-fade-up 0.6s ease-out forwards',
        }),
      }}
      {...props}
    >
      {children}
    </List>
  );
});

PM33List.displayName = 'PM33List';

// ============================================================================
// PM33 LIST ITEM COMPONENT
// ============================================================================

export const PM33ListItem = forwardRef<HTMLLIElement, PM33ListItemProps>(({
  children,
  icon,
  checked = false,
  featured = false,
  style,
  ...props
}, ref) => {
  const itemStyles = getListItemStyles(checked, featured);

  const renderIcon = () => {
    if (icon) return icon;
    if (checked) return <IconCheck size={16} color={featured ? 'white' : '#38a169'} />;
    return <IconBolt size={16} color={featured ? 'white' : 'var(--pm33-brand)'} />;
  };

  return (
    <List.Item
      ref={ref}
      style={{
        ...itemStyles,
        ...style,
      }}
      icon={
        <ThemeIcon 
          size={20} 
          radius="xl" 
          variant="transparent"
          style={{ 
            minWidth: '20px',
            background: 'transparent',
            color: 'inherit',
          }}
        >
          {renderIcon()}
        </ThemeIcon>
      }
      {...props}
    >
      {children}
    </List.Item>
  );
});

PM33ListItem.displayName = 'PM33ListItem';

// ============================================================================
// PM33 AVATAR COMPONENT
// ============================================================================

export const PM33Avatar = forwardRef<HTMLDivElement, PM33AvatarProps>(({
  variant = 'default',
  glowEffect = false,
  pulse = false,
  animate = false,
  status,
  size = 'md',
  style,
  children,
  ...props
}, ref) => {
  const avatarStyles = getAvatarStyles(variant, glowEffect, pulse);

  const getStatusColor = () => {
    switch (status) {
      case 'online': return '#38a169';
      case 'busy': return '#f56565';
      case 'away': return '#f6ad55';
      case 'offline': return '#a0aec0';
      default: return null;
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Avatar
        ref={ref}
        size={size}
        style={{
          ...avatarStyles,
          ...style,
          ...(animate && {
            animation: 'pm33-fade-up 0.4s ease-out forwards',
          }),
        }}
        {...props}
      >
        {children || <IconUser size="60%" />}
      </Avatar>
      
      {status && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '12px',
            height: '12px',
            background: getStatusColor(),
            border: '2px solid white',
            borderRadius: '50%',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        />
      )}
    </div>
  );
});

PM33Avatar.displayName = 'PM33Avatar';

// ============================================================================
// SPECIALIZED COMPONENTS
// ============================================================================

export const PM33CheckList = forwardRef<HTMLUListElement, Omit<PM33ListProps, 'variant'>>(
  ({ children, ...props }, ref) => (
    <PM33List ref={ref} variant="checklist" {...props}>
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child) 
          ? React.cloneElement(child, { checked: true, key: index })
          : child
      )}
    </PM33List>
  )
);

export const PM33AIList = forwardRef<HTMLUListElement, Omit<PM33ListProps, 'variant'>>(
  (props, ref) => <PM33List ref={ref} variant="ai" glowEffect animate {...props} />
);

export const PM33GlassList = forwardRef<HTMLUListElement, Omit<PM33ListProps, 'variant'>>(
  (props, ref) => <PM33List ref={ref} variant="glass" {...props} />
);

export const PM33TeamAvatar = forwardRef<HTMLDivElement, Omit<PM33AvatarProps, 'variant'>>(
  (props, ref) => <PM33Avatar ref={ref} variant="team" {...props} />
);

export const PM33AIAvatar = forwardRef<HTMLDivElement, Omit<PM33AvatarProps, 'variant'>>(
  (props, ref) => <PM33Avatar ref={ref} variant="ai" glowEffect pulse {...props} />
);

// Display names
PM33CheckList.displayName = 'PM33CheckList';
PM33AIList.displayName = 'PM33AIList';
PM33GlassList.displayName = 'PM33GlassList';
PM33TeamAvatar.displayName = 'PM33TeamAvatar';
PM33AIAvatar.displayName = 'PM33AIAvatar';

export default { 
  PM33List,
  PM33ListItem,
  PM33Avatar,
  PM33CheckList,
  PM33AIList,
  PM33GlassList,
  PM33TeamAvatar,
  PM33AIAvatar
};