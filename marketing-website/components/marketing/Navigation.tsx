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
  Badge
} from '@mantine/core';
import { PM33_DESIGN } from './PM33Header';
import { useTheme } from './ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

export default function Navigation() {
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  
  // Safe theme hook with fallback
  let theme = 'light';
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
  } catch (error) {
    // Fallback to light theme if no provider
    console.warn('ThemeProvider not found, using light theme');
  }

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    { href: '/features', label: 'Features', description: 'PM33 capabilities' },
    { href: '/blog', label: 'Resources', description: 'Strategic insights and PM intelligence' },
    { href: '/pricing', label: 'Pricing', description: 'Simple, transparent pricing' },
    { href: '/about', label: 'About', description: 'Learn about PM33' },
    { href: '/contact', label: 'Contact', description: 'Get in touch' },
    { href: '/command-center-demo', label: 'Demo', special: true, demo: true, description: 'See PM33 in action' }
  ];

  return (
    <Box 
      component="nav"
      className="marketing-nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'all 0.3s ease'
      }}
    >
      <Container size={1400} px={24} py={12}>
        <Group h={72} justify="space-between" align="center" wrap="nowrap">
          {/* Logo Section */}
          <Group gap={16} align="center">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <img 
                src={theme === 'dark' ? '/pm33-logo-dark.png' : '/pm33-logo-light.png'}
                alt="PM33 Strategic Intelligence Platform" 
                style={{ 
                  height: '38px',
                  width: 'auto',
                  objectFit: 'contain',
                  transition: 'opacity 0.3s ease'
                }} 
              />
            </Link>
            <Badge
              size="sm"
              radius="lg"
              style={{
                background: `linear-gradient(135deg, ${PM33_DESIGN.colors.marketing.primary} 0%, ${PM33_DESIGN.colors.marketing.secondary} 100%)`,
                color: PM33_DESIGN.colors.marketing.text.inverse,
                border: 'none'
              }}
            >
              AI Product Management
            </Badge>
          </Group>

          {/* Desktop Navigation - Compact for no wrapping */}
          <Group gap={16} visibleFrom="lg" wrap="nowrap">
            {navLinks.slice(0, 4).map((link) => ( // Show only first 4 links to prevent wrapping
              <Box key={link.href}>
                {link.demo ? (
                  <Text
                    size="sm"
                    fw={500}
                    c="dimmed"
                    style={{ 
                      cursor: 'not-allowed',
                      opacity: 0.6,
                      padding: '6px 12px',
                      borderRadius: '8px',
                      whiteSpace: 'nowrap'
                    }}
                    title={link.description}
                  >
                    {link.label}
                  </Text>
                ) : (
                  <Link href={link.href}>
                    <Text
                      size="sm"
                      fw={500}
                      style={{ 
                        textDecoration: 'none',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        whiteSpace: 'nowrap',
                        color: isActive(link.href) 
                          ? 'var(--marketing-primary)' 
                          : (theme === 'dark' ? 'var(--marketing-text-primary)' : 'var(--marketing-text-secondary)'),
                        borderBottom: isActive(link.href) ? '2px solid var(--marketing-primary)' : undefined,
                        fontWeight: isActive(link.href) ? 600 : 500
                      }}
                    >
                      {link.label}
                    </Text>
                  </Link>
                )}
              </Box>
            ))}
          </Group>

          {/* CTA + Theme Toggle + Mobile Menu */}
          <Group gap={16}>
            <ThemeToggle />
            <Button
              component={Link}
              href="/trial"
              size="md"
              radius="lg"
              visibleFrom="sm"
              className="marketing-cta-button"
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}
            >
              Start Free Trial
            </Button>

            {/* Mobile Menu */}
            <Menu opened={opened} onChange={setOpened} width={300} position="bottom-end" withinPortal>
              <Menu.Target>
                <Burger opened={opened} onClick={() => setOpened((o) => !o)} hiddenFrom="lg" size="sm" />
              </Menu.Target>
              
              <Menu.Dropdown>
                <Stack gap={8} p="md">
                  {navLinks.map((link) => (
                    <Box key={link.href}>
                      {link.demo ? (
                        <Box p="sm" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                          <Text size="sm" fw={600}>{link.label}</Text>
                          <Text size="xs" c="dimmed">{link.description}</Text>
                        </Box>
                      ) : (
                        <Link 
                          href={link.href} 
                          style={{
                            display: 'block',
                            textDecoration: 'none',
                            padding: 'var(--mantine-spacing-sm)',
                            borderRadius: '8px',
                            backgroundColor: isActive(link.href) ? 'rgba(99, 102, 241, 0.1)' : undefined
                          }}
                          onClick={() => setOpened(false)}
                        >
                          <Text size="sm" fw={600} c={isActive(link.href) ? 'indigo.6' : 'dark'}>
                            {link.label}
                          </Text>
                          <Text size="xs" c="dimmed">{link.description}</Text>
                        </Link>
                      )}
                    </Box>
                  ))}
                  
                  <Button
                    component={Link}
                    href="/trial"
                    fullWidth
                    mt="md"
                    onClick={() => setOpened(false)}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      color: 'white',
                      fontWeight: 600
                    }}
                  >
                    Start Free Trial
                  </Button>
                </Stack>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}