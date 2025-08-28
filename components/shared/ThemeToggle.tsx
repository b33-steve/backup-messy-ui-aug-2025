// app/frontend/components/shared/ThemeToggle.tsx
// Dark/Light mode toggle component with proper CSS custom property integration
// WHY: Implements user-requested dark mode by default with light mode toggle functionality
// RELEVANT FILES: APP_DESIGN_SYSTEM.md, app/globals.css

'use client';

import React, { useState, useEffect } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconSun, IconMoon, IconWand } from '@tabler/icons-react';
import { useTheme } from './MantineProvider';

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
  const { currentTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // Simple light/dark toggle to fix double-click issue
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
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

  // Get appropriate icon and tooltip for current theme
  const getThemeIcon = () => {
    return currentTheme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />;
  };

  const getTooltipLabel = () => {
    return currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  };

  const icon = getThemeIcon();
  const tooltipLabel = getTooltipLabel();

  const button = (
    <ActionIcon
      size={size}
      variant="subtle"
      onClick={toggleTheme}
      aria-label={tooltipLabel}
      data-testid="theme-toggle"
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