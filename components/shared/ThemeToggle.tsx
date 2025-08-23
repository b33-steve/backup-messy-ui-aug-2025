// app/frontend/components/shared/ThemeToggle.tsx
// Dark/Light mode toggle component with proper CSS custom property integration
// WHY: Implements user-requested dark mode by default with light mode toggle functionality
// RELEVANT FILES: APP_DESIGN_SYSTEM.md, app/globals.css

'use client';

import React, { useState, useEffect } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useTheme } from '../providers/theme-provider';

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
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Save to localStorage
    localStorage.setItem('pm33-theme', newTheme);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ActionIcon
        size={size}
        variant="subtle"
        disabled
      >
        <IconMoon size={18} />
      </ActionIcon>
    );
  }

  const isDark = theme === 'dark';
  const icon = isDark ? <IconSun size={18} /> : <IconMoon size={18} />;
  const tooltipLabel = `Switch to ${isDark ? 'light' : 'dark'} mode`;

  const button = (
    <ActionIcon
      size={size}
      variant="subtle"
      onClick={toggleTheme}
      aria-label={tooltipLabel}
    >
      {icon}
    </ActionIcon>
  );

  if (showTooltip) {
    return (
      <Tooltip label={tooltipLabel} position="bottom">
        {button}
      </Tooltip>
    );
  }

  return button;
};

export default ThemeToggle;