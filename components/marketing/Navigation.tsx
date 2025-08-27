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
import { ThemeToggle } from '../shared/ThemeToggle';

export default function Navigation() {
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);

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
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--pm33-bg-elevated)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--pm33-border)'
      }}
    >
      <Container size={1200} px={24} py={18}>
        <Group h={68} justify="space-between" align="center">
          {/* Logo Section */}
          <Group gap={16} align="center">
            <Anchor component={Link} href="/" style={{ textDecoration: 'none' }}>
              <img 
                src="/PM 33 New Logo Horizontal V1.2.png" 
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
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                color: 'white',
                border: 'none'
              }}
            >
              AI Product Management
            </Badge>
          </Group>

          {/* Desktop Navigation */}
          <Group gap={24} visibleFrom="lg">
            {navLinks.map((link) => (
              <Box key={link.href}>
                {link.demo ? (
                  <Text
                    size="sm"
                    fw={link.special ? 600 : 500}
                    c={link.special ? 'indigo.6' : 'dimmed'}
                    style={{ 
                      cursor: 'not-allowed',
                      opacity: 0.6,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: link.special ? 'rgba(99, 102, 241, 0.1)' : undefined
                    }}
                    title={link.description}
                  >
                    {link.label}
                  </Text>
                ) : (
                  <Anchor
                    component={Link}
                    href={link.href}
                    size="sm"
                    fw={link.special ? 600 : 500}
                    c={isActive(link.href) ? 'indigo.6' : (link.special ? 'indigo.6' : 'dark')}
                    style={{ 
                      textDecoration: 'none',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: link.special ? 'rgba(99, 102, 241, 0.1)' : undefined,
                      borderBottom: isActive(link.href) ? '2px solid var(--mantine-color-indigo-6)' : undefined
                    }}
                  >
                    {link.label}
                  </Anchor>
                )}
              </Box>
            ))}
          </Group>

          {/* CTA + Theme Toggle + Mobile Menu */}
          <Group gap={16}>
            <ThemeToggle size="sm" showTooltip={true} />
            <Button
              component={Link}
              href="/trial"
              size="sm"
              radius="lg"
              visibleFrom="sm"
              style={{
                background: 'var(--pm33-primary-gradient)',
                border: 'none',
                color: 'white',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--pm33-secondary-gradient)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--pm33-primary-gradient)';
                e.currentTarget.style.transform = 'translateY(0)';
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
                        <Anchor
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
                      background: 'var(--pm33-primary-gradient)',
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