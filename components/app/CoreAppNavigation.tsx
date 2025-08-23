/**
 * File: components/app/CoreAppNavigation.tsx
 * Purpose: Clean, professional navigation for core PM33 app using shadcn/ui components
 * Context: Following CORE_APP_DESIGN_SYSTEM.md standards - professional B2B SaaS aesthetic
 * RELEVANT FILES: CORE_APP_DESIGN_SYSTEM.md, components/ui/button.tsx, components/ui/badge.tsx
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageCircle, BarChart3, CheckSquare, Database, Settings, User, LogOut } from 'lucide-react';
import { PM33Logo } from '../shared/PM33Logo';
import { usePM33Theme } from '../shared/PM33ThemeProvider';

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  testId: string;
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Strategic Intelligence',
    href: '/strategic-intelligence',
    icon: <Brain size={16} />,
    testId: 'nav-strategic-intelligence'
  },
  {
    label: 'Chat',
    href: '/chat',
    icon: <MessageCircle size={16} />,
    testId: 'nav-chat'
  },
  {
    label: 'Dashboard', 
    href: '/dashboard',
    icon: <BarChart3 size={16} />,
    testId: 'nav-dashboard'
  },
  {
    label: 'Tasks',
    href: '/tasks',
    icon: <CheckSquare size={16} />,
    testId: 'nav-tasks'
  },
  {
    label: 'Data',
    href: '/data', 
    icon: <Database size={16} />,
    testId: 'nav-data'
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings size={16} />,
    testId: 'nav-settings'
  }
];

// Demo mode context provider
export const CoreAppDemoModeContext = React.createContext<{
  isDemoMode: boolean;
  toggleDemoMode: () => void;
}>({
  isDemoMode: true,
  toggleDemoMode: () => {}
});

export const useCoreAppDemoMode = () => {
  const context = React.useContext(CoreAppDemoModeContext);
  if (!context) {
    return { isDemoMode: true, toggleDemoMode: () => {} };
  }
  return context;
};

const CoreAppNavigation: React.FC = () => {
  const [isDemoMode, setIsDemoMode] = useState(true);
  const pathname = usePathname();
  const { theme } = usePM33Theme();

  // Persist demo mode preference
  useEffect(() => {
    const saved = localStorage.getItem('pm33-core-app-demo-mode');
    if (saved !== null) {
      setIsDemoMode(JSON.parse(saved));
    }
  }, []);

  const toggleDemoMode = () => {
    const newMode = !isDemoMode;
    setIsDemoMode(newMode);
    localStorage.setItem('pm33-core-app-demo-mode', JSON.stringify(newMode));
  };

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <CoreAppDemoModeContext.Provider value={{ isDemoMode, toggleDemoMode }}>
      <nav 
        className="sticky top-0 z-100 backdrop-blur-xl transition-all duration-300 ease-in-out"
        data-testid="core-app-navigation"
        style={{
          background: 'var(--pm33-glass-bg)',
          borderBottom: '1px solid var(--pm33-glass-border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center">
              <PM33Logo href="/dashboard" />
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-1">
              {navigationItems.map((item) => {
                const active = isActive(item.href);
                
                return (
                  <Button
                    key={item.href}
                    asChild
                    variant={active ? 'default' : 'ghost'}
                    size="sm"
                    className={`${active ? 'bg-primary text-primary-foreground pm33-btn-primary' : 'text-muted-foreground hover:text-foreground pm33-btn-secondary'}`}
                    data-testid={item.testId}
                    data-active={active}
                  >
                    <Link href={item.href} className="flex items-center space-x-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>

            {/* Demo Mode Toggle */}
            <div className="flex items-center">
              <Button
                onClick={toggleDemoMode}
                size="sm"
                variant={isDemoMode ? 'default' : 'outline'}
                data-testid="core-app-demo-toggle"
                data-demo-active={isDemoMode}
                className={`flex items-center space-x-2 ${isDemoMode ? 'pm33-btn-primary' : 'pm33-btn-secondary'}`}
              >
                <span className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <span>DEMO</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </CoreAppDemoModeContext.Provider>
  );
};

// Demo Badge Component for Core App
export const CoreAppDemoBadge: React.FC<{ 
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const { isDemoMode } = useCoreAppDemoMode();
  
  if (!isDemoMode) return <>{children}</>;
  
  return (
    <div className={`relative ${className}`}>
      {children}
      <Badge 
        variant="secondary" 
        className="absolute top-2 right-2 text-xs"
      >
        DEMO
      </Badge>
    </div>
  );
};

export default CoreAppNavigation;