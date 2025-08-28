/**
 * Component: UnifiedNavigation
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Section 3.1
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Section 2.1
 * 
 * WHY: Single source of truth for navigation across marketing and app contexts
 * INTEGRATES WITH: ThemeProvider for consistent theme-aware logo switching
 * REPLACES: Multiple inconsistent navigation components
 * 
 * Compliance Checklist:
 * - [x] Theme-aware logo switching (light/dark variants)
 * - [x] ThemeProvider integration via useTheme hook
 * - [x] Marketing vs App context awareness
 * - [x] Responsive design (mobile, tablet, desktop)
 * - [x] Consistent styling across all pages
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Box, 
  Container, 
  Group, 
  Button, 
  Text, 
  Menu, 
  Burger, 
  Stack,
  Badge,
  Anchor
} from '@mantine/core';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../../providers/ThemeProvider';

interface UnifiedNavigationProps {
  context?: 'marketing' | 'app';
  showThemeToggle?: boolean;
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export default function UnifiedNavigation({ 
  context = 'marketing',
  showThemeToggle = true,
  showCTA = true,
  ctaText = 'Start Free Trial',
  ctaHref = '/trial'
}: UnifiedNavigationProps) {
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const { currentTheme } = useTheme();

  const isActive = (path: string) => pathname === path;

  // Theme-aware logo selection - UNIFIED APPROACH
  const logoSrc = currentTheme === 'dark' 
    ? '/PM 33 New Logo Horizontal V1.2 WHITE.png'
    : '/PM 33 New Logo Horizontal V1.2.png';

  // Context-specific navigation links
  const getNavigationLinks = () => {
    if (context === 'app') {
      return [
        { href: '/dashboard', label: 'Dashboard', description: 'Strategic overview' },
        { href: '/chat', label: 'Strategic Chat', description: 'AI intelligence engine' },
        { href: '/tasks', label: 'Workflows', description: 'Execution management' },
        { href: '/data', label: 'Intelligence', description: 'Data insights' },
        { href: '/settings', label: 'Settings', description: 'Configuration' }
      ];
    }
    
    // Marketing context
    return [
      { href: '/features', label: 'Features', description: '4 AI Teams capabilities' },
      { href: '/blog', label: 'Resources', description: 'Strategic insights' },
      { href: '/pricing', label: 'Pricing', description: 'Simple, transparent pricing' },
      { href: '/about', label: 'About', description: 'Learn about PM33' },
      { href: '/contact', label: 'Contact', description: 'Get in touch' }
    ];
  };

  const navLinks = getNavigationLinks();

  // Context-aware styling
  const getContextStyles = () => {
    if (context === 'app') {
      return {
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(59, 130, 246, 0.2)'
      };
    }
    
    // Marketing context
    return {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(229, 231, 235, 0.5)'
    };
  };

  return (
    <Box 
      component="nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        ...getContextStyles()
      }}
    >
      <Container size={1200} px={24} py={18}>
        <Group h={68} justify="space-between" align="center">
          {/* Logo Section - UNIFIED WITH THEME INTEGRATION */}
          <Group gap={16} align="center">
            <Anchor component={Link} href="/" style={{ textDecoration: 'none' }}>
              <img 
                src={logoSrc}
                alt="PM33 Strategic Intelligence Platform" 
                style={{ 
                  height: '38px',
                  width: 'auto',
                  objectFit: 'contain'
                }} 
              />
            </Anchor>
            <Badge
              size="sm"
              radius="lg"
              style={{
                background: context === 'app' 
                  ? 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)'
                  : 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                color: 'white',
                border: 'none'
              }}
            >
              {context === 'app' ? 'Strategic Intelligence' : 'AI Product Management'}
            </Badge>
          </Group>

          {/* Desktop Navigation */}
          <Group gap={24} visibleFrom="lg">
            {navLinks.map((link) => (
              <Anchor
                key={link.href}
                component={Link}
                href={link.href}
                size="sm"
                fw={500}
                c={isActive(link.href) ? 'indigo.6' : (context === 'app' ? 'blue.4' : 'dark')}
                style={{ 
                  textDecoration: 'none',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  borderBottom: isActive(link.href) ? '2px solid var(--mantine-color-indigo-6)' : undefined,
                  transition: 'all 0.2s ease'
                }}
              >
                {link.label}
              </Anchor>
            ))}
          </Group>

          {/* Actions Group */}
          <Group gap={16}>
            {showThemeToggle && (
              <ThemeToggle size="sm" showTooltip={true} />
            )}
            
            {showCTA && (
              <Button
                component={Link}
                href={ctaHref}
                size="sm"
                radius="lg"
                visibleFrom="sm"
                style={{
                  background: context === 'app'
                    ? 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  color: 'white',
                  fontWeight: 600,
                  boxShadow: context === 'app' 
                    ? '0 4px 15px 0 rgba(0, 210, 255, 0.4)'
                    : '0 4px 15px 0 rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s ease'
                }}
              >
                {ctaText}
              </Button>
            )}

            {/* Mobile Menu */}
            <Menu opened={opened} onChange={setOpened} width={300} position="bottom-end" withinPortal>
              <Menu.Target>
                <Burger opened={opened} onClick={() => setOpened((o) => !o)} hiddenFrom="lg" size="sm" />
              </Menu.Target>
              
              <Menu.Dropdown>
                <Stack gap={8} p="md">
                  {navLinks.map((link) => (
                    <Anchor
                      key={link.href}
                      component={Link}
                      href={link.href}
                      p="sm"
                      style={{
                        display: 'block',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        backgroundColor: isActive(link.href) ? 'rgba(99, 102, 241, 0.1)' : undefined
                      }}
                      onClick={() => setOpened(false)}
                    >
                      <Text size="sm" fw={600} c={isActive(link.href) ? 'indigo.6' : 'dark'}>
                        {link.label}
                      </Text>
                      <Text size="xs" c="dimmed">{link.description}</Text>
                    </Anchor>
                  ))}
                  
                  {showCTA && (
                    <Button
                      component={Link}
                      href={ctaHref}
                      fullWidth
                      mt="md"
                      onClick={() => setOpened(false)}
                      style={{
                        background: context === 'app'
                          ? 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)'
                          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        color: 'white',
                        fontWeight: 600
                      }}
                    >
                      {ctaText}
                    </Button>
                  )}
                </Stack>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}

// Export as named export for consistency
export { UnifiedNavigation };