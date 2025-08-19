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

export default function Navigation() {
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);

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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(229, 231, 235, 0.5)'
      }}
    >
      <Container size={1200} px={24}>
        <Group h={56} justify="space-between">
          {/* Logo Section */}
          <Group>
            <Anchor component={Link} href="/" style={{ textDecoration: 'none' }}>
              <Group gap={12}>
                <img src="/pm33-logo.png" alt="PM33 Strategic Intelligence Platform Logo" style={{ height: '32px' }} />
              </Group>
            </Anchor>
            <Badge
              size="sm"
              variant="gradient"
              gradient={{ from: 'teal', to: 'green' }}
              style={{ marginLeft: 8 }}
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

          {/* CTA + Mobile Menu */}
          <Group gap={16}>
            <Button
              component={Link}
              href="/trial"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'purple' }}
              size="sm"
              radius="lg"
              visibleFrom="sm"
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
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'purple' }}
                    fullWidth
                    mt="md"
                    onClick={() => setOpened(false)}
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