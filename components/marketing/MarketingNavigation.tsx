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
import { useDesignSystem } from './DesignSystemProvider';

export default function MarketingNavigation() {
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const { theme } = useDesignSystem();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    { href: '/strategic-intelligence', label: '🧠 Strategic Intelligence', special: true, description: 'AI-powered strategic analysis' },
    { href: '/command-center', label: '🎯 Command Center', special: true, description: '4 AI teams orchestration' },
    { href: '/resource-optimizer', label: '💡 Resource Optimizer', special: true, demo: true, description: 'Coming soon - Resource allocation' },
    { href: '/strategic-dashboard', label: '📊 Strategic Dashboard', special: true, demo: true, description: 'Coming soon - Executive insights' },
    { href: '/pricing', label: 'Pricing', description: 'Simple, transparent pricing' },
    { href: '/about', label: 'About', description: 'Learn about PM33' }
  ];

  return (
    <Box 
      component="nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.colors.bgAccent}`
      }}
    >
      <Container size={1200} px={24}>
        <Group h={64} justify="space-between">
          {/* Logo Section */}
          <Group>
            <Anchor component={Link} href="/" style={{ textDecoration: 'none' }}>
              <Group gap={12}>
                <img src="/PM 33 New Logo Horizontal V1.2.png" alt="PM33 Strategic Intelligence Platform" style={{ height: '32px' }} />
              </Group>
            </Anchor>
            <Badge
              size="sm"
              variant="gradient"
              gradient={{ from: 'teal', to: 'green' }}
              style={{ 
                marginLeft: 8,
                background: `linear-gradient(135deg, ${theme.colors.success} 0%, ${theme.colors.primary} 100%)`
              }}
            >
              Strategic AI Co-Pilot
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
                    style={{ 
                      cursor: 'not-allowed',
                      opacity: 0.6,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: link.special ? theme.colors.primaryLight : undefined,
                      color: link.special ? theme.colors.primary : theme.colors.textSecondary
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
                    style={{ 
                      textDecoration: 'none',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: link.special ? theme.colors.primaryLight : undefined,
                      color: isActive(link.href) ? theme.colors.primary : (link.special ? theme.colors.primary : theme.colors.textPrimary),
                      borderBottom: isActive(link.href) ? `2px solid ${theme.colors.primary}` : undefined
                    }}
                  >
                    {link.label}
                  </Anchor>
                )}
              </Box>
            ))}
          </Group>

          {/* CTA + Mobile Menu */}
          <Group gap={16}>
            <Group gap={8} visibleFrom="sm">
              <Button
                component={Link}
                href="/trial"
                variant="gradient"
                gradient={{ from: 'blue', to: 'indigo' }}
                size="sm"
                radius="lg"
                styles={{
                  root: {
                    fontWeight: 600,
                  }
                }}
              >
                Start Free Trial
              </Button>
            </Group>

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
                          <Text size="sm" fw={600} style={{ color: theme.colors.textPrimary }}>{link.label}</Text>
                          <Text size="xs" style={{ color: theme.colors.textMuted }}>{link.description}</Text>
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
                            backgroundColor: isActive(link.href) ? theme.colors.primaryLight : undefined
                          }}
                          onClick={() => setOpened(false)}
                        >
                          <Text size="sm" fw={600} style={{ color: isActive(link.href) ? theme.colors.primary : theme.colors.textPrimary }}>
                            {link.label}
                          </Text>
                          <Text size="xs" style={{ color: theme.colors.textMuted }}>{link.description}</Text>
                        </Anchor>
                      )}
                    </Box>
                  ))}
                  
                  <Stack gap="sm" mt="md">
                    <Button
                      component={Link}
                      href="/trial"
                      variant="gradient"
                      gradient={{ from: 'blue', to: 'indigo' }}
                      fullWidth
                      onClick={() => setOpened(false)}
                    >
                      Start Free Trial
                    </Button>
                  </Stack>
                </Stack>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}