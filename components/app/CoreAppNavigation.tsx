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
            <div className="flex items-center gap-2">
              {navigationItems.map((item) => {
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm
                      transition-all duration-300 ease-in-out border border-transparent
                      ${active 
                        ? 'transform scale-95' 
                        : 'hover:transform hover:-translate-y-0.5'
                      }
                    `}
                    style={{
                      color: active 
                        ? 'var(--pm33-accent)' 
                        : 'var(--pm33-text-secondary)',
                      background: active 
                        ? 'rgba(59,130,246,0.15)' 
                        : 'transparent',
                      borderColor: active 
                        ? 'rgba(59,130,246,0.3)' 
                        : 'transparent',
                    }}
                    data-testid={item.testId}
                    data-active={active}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = theme === 'light' 
                          ? 'rgba(59,130,246,0.1)' 
                          : 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.borderColor = theme === 'light'
                          ? 'rgba(59,130,246,0.2)'
                          : 'rgba(255,255,255,0.2)';
                        e.currentTarget.style.color = theme === 'light'
                          ? '#3b82f6'
                          : 'rgba(255,255,255,0.9)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.color = 'var(--pm33-text-secondary)';
                      }
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* User Profile */}
            <div className="flex items-center">
              <div 
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer"
                style={{
                  background: theme === 'light' 
                    ? 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
                    : theme === 'dark'
                      ? 'linear-gradient(135deg, #64748b 0%, #334155 100%)'
                      : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
                  color: 'white',
                  boxShadow: theme === 'light'
                    ? '0 2px 10px rgba(59,130,246,0.3)'
                    : theme === 'dark'
                      ? '0 2px 10px rgba(100,116,139,0.3)'
                      : '0 2px 10px rgba(156,163,175,0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = theme === 'light'
                    ? '0 4px 15px rgba(59,130,246,0.4)'
                    : theme === 'dark'
                      ? '0 4px 15px rgba(100,116,139,0.4)'
                      : '0 4px 15px rgba(156,163,175,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = theme === 'light'
                    ? '0 2px 10px rgba(59,130,246,0.3)'
                    : theme === 'dark'
                      ? '0 2px 10px rgba(100,116,139,0.3)'
                      : '0 2px 10px rgba(156,163,175,0.3)';
                }}
              >
                Steve Saper - PM33 Founder
              </div>
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