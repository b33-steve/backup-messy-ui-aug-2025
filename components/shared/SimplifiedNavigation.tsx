'use client';

import React, { useState, useEffect } from 'react';
import { Container, Group, Button, ActionIcon, Image, Text } from '@mantine/core';
import { IconMessageCircle, IconDashboard, IconChecklist, IconChartBar, IconSettings } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  testId: string;
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Chat',
    href: '/chat',
    icon: <IconMessageCircle size={18} />,
    testId: 'nav-chat'
  },
  {
    label: 'Dashboard', 
    href: '/dashboard',
    icon: <IconDashboard size={18} />,
    testId: 'nav-dashboard'
  },
  {
    label: 'Tasks',
    href: '/tasks',
    icon: <IconChecklist size={18} />,
    testId: 'nav-tasks'
  },
  {
    label: 'Data',
    href: '/data', 
    icon: <IconChartBar size={18} />,
    testId: 'nav-data'
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <IconSettings size={18} />,
    testId: 'nav-settings'
  }
];

// Demo mode context provider
export const DemoModeContext = React.createContext<{
  isDemoMode: boolean;
  toggleDemoMode: () => void;
}>({
  isDemoMode: true,
  toggleDemoMode: () => {}
});

export const useDemoMode = () => {
  const context = React.useContext(DemoModeContext);
  if (!context) {
    throw new Error('useDemoMode must be used within a DemoModeProvider');
  }
  return context;
};

const SimplifiedNavigation: React.FC = () => {
  const [isDemoMode, setIsDemoMode] = useState(true);
  const pathname = usePathname();

  // Persist demo mode preference
  useEffect(() => {
    const saved = localStorage.getItem('pm33-demo-mode');
    if (saved !== null) {
      setIsDemoMode(JSON.parse(saved));
    }
  }, []);

  const toggleDemoMode = () => {
    const newMode = !isDemoMode;
    setIsDemoMode(newMode);
    localStorage.setItem('pm33-demo-mode', JSON.stringify(newMode));
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <DemoModeContext.Provider value={{ isDemoMode, toggleDemoMode }}>
      <Container 
        size={1200} 
        px={24} 
        py={16}
        data-testid="main-navigation"
        style={{
          borderBottom: '1px solid #e9ecef',
          backgroundColor: 'var(--mantine-color-body)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <Group justify="space-between" align="center">
          {/* Logo Section */}
          <Group gap={16}>
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <Group gap={12} align="center" data-testid="pm33-logo">
                <Image
                  src="/PM 33 New Logo Horizontal V1.2.png"
                  alt="PM33 Strategic Intelligence Platform"
                  width={32}
                  height={32}
                  fallbackSrc="/PM 33 New Logo Horizontal V1.2.png"
                />
                <Text size="xl" fw={700} c="dark">
                  PM33
                </Text>
              </Group>
            </Link>
          </Group>

          {/* Navigation Items */}
          <Group gap={8}>
            {navigationItems.map((item) => {
              const active = isActive(item.href);
              
              return (
                <Button
                  key={item.href}
                  component={Link}
                  href={item.href}
                  variant={active ? 'filled' : 'subtle'}
                  color={active ? 'blue' : 'gray'}
                  size="sm"
                  leftSection={item.icon}
                  data-testid={item.testId}
                  data-active={active}
                  style={{
                    fontWeight: active ? 600 : 400,
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Group>

          {/* Demo Mode Toggle */}
          <Group gap={12}>
            <Button
              onClick={toggleDemoMode}
              size="sm"
              variant="gradient"
              gradient={{ from: 'blue', to: 'violet' }}
              data-testid="demo-toggle"
              data-demo-active={isDemoMode}
              style={{
                opacity: isDemoMode ? 1 : 0.6,
                transition: 'opacity 0.2s ease'
              }}
            >
              {isDemoMode ? '🟢 DEMO' : '⚪ DEMO'}
            </Button>
          </Group>
        </Group>
      </Container>
    </DemoModeContext.Provider>
  );
};

// Demo Badge Component
export const DemoBadge: React.FC<{ 
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style = {} }) => {
  const { isDemoMode } = useDemoMode();
  
  if (!isDemoMode) return <>{children}</>;
  
  return (
    <div style={{ position: 'relative', ...style }}>
      {children}
      <div
        className="demo-badge"
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: '#ffd43b',
          color: '#1a1a1a',
          fontSize: '10px',
          fontWeight: 600,
          padding: '4px 8px',
          borderRadius: '4px',
          zIndex: 10,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        DEMO
      </div>
    </div>
  );
};

// Demo Content Wrapper
export const DemoContent: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style = {} }) => {
  const { isDemoMode } = useDemoMode();
  
  if (!isDemoMode) return <>{children}</>;
  
  return (
    <div
      className="demo-content"
      style={{
        border: '2px dotted #ffd43b',
        borderRadius: '8px',
        position: 'relative',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default SimplifiedNavigation;