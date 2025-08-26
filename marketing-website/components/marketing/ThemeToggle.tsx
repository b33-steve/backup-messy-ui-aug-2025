'use client';

import { ActionIcon } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  // Safe theme hook with fallback
  let theme = 'light';
  let toggleTheme = () => {};
  
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
  } catch (error) {
    // Fallback if no provider
    console.warn('ThemeProvider not found in ThemeToggle');
    return null; // Don't render if no theme context
  }

  return (
    <ActionIcon
      onClick={toggleTheme}
      variant="subtle"
      size="lg"
      aria-label="Toggle color scheme"
      style={{
        color: theme === 'dark' ? '#FFFFFF' : '#64748B'
      }}
    >
      {theme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
    </ActionIcon>
  );
}