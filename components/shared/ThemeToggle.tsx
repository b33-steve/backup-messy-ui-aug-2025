// app/frontend/components/shared/ThemeToggle.tsx
// Dark/Light mode toggle component with proper CSS custom property integration
// WHY: Implements user-requested dark mode by default with light mode toggle functionality
// RELEVANT FILES: APP_DESIGN_SYSTEM.md, app/globals.css

'use client';

import React, { useState, useEffect } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'subtle' | 'filled';
  showTooltip?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 'md',
  variant = 'default',
  showTooltip = true
}) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('pm33-theme') as 'dark' | 'light' || 'dark';
    setTheme(savedTheme);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Save to localStorage
    localStorage.setItem('pm33-theme', newTheme);
    
    // Apply to document
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ActionIcon
        size={size}
        variant={variant}
        style={{ 
          backgroundColor: 'var(--app-bg-tertiary)',
          color: 'var(--app-text-muted)',
          border: '1px solid var(--app-border-muted)'
        }}
        disabled
      >
        <IconMoon size={18} />
      </ActionIcon>
    );
  }

  const isDark = theme === 'dark';
  const icon = isDark ? <IconSun size={18} /> : <IconMoon size={18} />;
  const tooltipLabel = `Switch to ${isDark ? 'light' : 'dark'} mode`;

  const buttonStyle = {
    backgroundColor: 'var(--app-bg-tertiary)',
    color: 'var(--app-text-secondary)',
    border: '1px solid var(--app-border-muted)',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'var(--app-bg-elevated)',
      color: 'var(--app-text-primary)',
      borderColor: 'var(--app-border-focus)',
      transform: 'scale(1.05)'
    }
  };

  if (showTooltip) {
    return (
      <Tooltip label={tooltipLabel} position="bottom">
        <ActionIcon
          size={size}
          variant="subtle"
          onClick={toggleTheme}
          style={buttonStyle}
          aria-label={tooltipLabel}
        >
          {icon}
        </ActionIcon>
      </Tooltip>
    );
  }

  return (
    <ActionIcon
      size={size}
      variant="subtle"
      onClick={toggleTheme}
      style={buttonStyle}
      aria-label={tooltipLabel}
    >
      {icon}
    </ActionIcon>
  );
};

export default ThemeToggle;