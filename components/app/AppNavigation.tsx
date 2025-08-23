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
  Anchor,
  Avatar,
  UnstyledButton,
  ActionIcon
} from '@mantine/core';
import { 
  IconDashboard, 
  IconBrain, 
  IconFolders, 
  IconSettings, 
  IconBell,
  IconSearch,
  IconUser
} from '@tabler/icons-react';
import { useDesignSystem } from './DesignSystemProvider';

export default function AppNavigation() {
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const { theme } = useDesignSystem();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  const navLinks = [
    { href: '/app/dashboard', label: 'Dashboard', icon: IconDashboard, description: 'Overview & metrics' },
    { href: '/app/intelligence', label: 'Intelligence', icon: IconBrain, description: 'Strategic analysis' },
    { href: '/app/projects', label: 'Projects', icon: IconFolders, description: 'Project management' },
    { href: '/app/settings', label: 'Settings', icon: IconSettings, description: 'Account & preferences' },
  ];

  return (
    <Box 
      component="nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: theme.colors.bgPrimary,
        borderBottom: `1px solid ${theme.colors.bgAccent}`,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }}
    >
      <Container size={1200} px={24}>
        <Group h={60} justify="space-between">
          {/* Logo Section */}
          <Group>
            <Anchor component={Link} href="/app/dashboard" style={{ textDecoration: 'none' }}>
              <Group gap={12}>
                <img src="/PM 33 New Logo Horizontal V1.2 WHITE.png" alt="PM33 Strategic Intelligence Platform" style={{ height: '32px' }} />
                <Text size="sm" fw={600} style={{ color: theme.colors.textSecondary }}>
                  Strategic Intelligence
                </Text>
              </Group>
            </Anchor>
          </Group>

          {/* Desktop Navigation */}
          <Group gap={8} visibleFrom="md">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              const active = isActive(link.href);
              
              return (
                <UnstyledButton
                  key={link.href}
                  component={Link}
                  href={link.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: active ? theme.colors.primaryLight : 'transparent',
                    color: active ? theme.colors.primary : theme.colors.textSecondary,
                    transition: 'all 0.2s ease',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  <IconComponent size={16} />
                  {link.label}
                </UnstyledButton>
              );
            })}
          </Group>

          {/* User Actions */}
          <Group gap={12}>
            <ActionIcon
              variant="subtle"
              color="gray"
              radius="lg"
              size={36}
              style={{ color: theme.colors.textTertiary }}
            >
              <IconSearch size={18} />
            </ActionIcon>
            
            <ActionIcon
              variant="subtle"
              color="gray"
              radius="lg"
              size={36}
              style={{ color: theme.colors.textTertiary }}
            >
              <IconBell size={18} />
            </ActionIcon>

            {/* User Menu */}
            <Menu position="bottom-end" withinPortal>
              <Menu.Target>
                <UnstyledButton
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <Avatar size={32} radius="lg" color="blue">
                    <IconUser size={18} />
                  </Avatar>
                  <Text size="sm" fw={500} visibleFrom="sm" style={{ color: theme.colors.textSecondary }}>
                    Product Manager
                  </Text>
                </UnstyledButton>
              </Menu.Target>
              
              <Menu.Dropdown>
                <Menu.Item component={Link} href="/app/settings">
                  <Group gap={8}>
                    <IconSettings size={16} />
                    Settings
                  </Group>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item component={Link} href="/" color="gray">
                  <Group gap={8}>
                    <IconUser size={16} />
                    Sign out
                  </Group>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            {/* Mobile Menu */}
            <Menu opened={opened} onChange={setOpened} width={280} position="bottom-end" withinPortal>
              <Menu.Target>
                <Burger opened={opened} onClick={() => setOpened((o) => !o)} hiddenFrom="md" size="sm" />
              </Menu.Target>
              
              <Menu.Dropdown>
                <Stack gap={4} p="md">
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    const active = isActive(link.href);
                    
                    return (
                      <UnstyledButton
                        key={link.href}
                        component={Link}
                        href={link.href}
                        p="sm"
                        style={{
                          display: 'flex',
                          width: '100%',
                          alignItems: 'center',
                          gap: '12px',
                          borderRadius: '8px',
                          backgroundColor: active ? theme.colors.primaryLight : 'transparent'
                        }}
                        onClick={() => setOpened(false)}
                      >
                        <IconComponent size={18} style={{ color: active ? theme.colors.primary : theme.colors.textTertiary }} />
                        <Box>
                          <Text size="sm" fw={600} style={{ color: active ? theme.colors.primary : theme.colors.textPrimary }}>
                            {link.label}
                          </Text>
                          <Text size="xs" style={{ color: theme.colors.textMuted }}>{link.description}</Text>
                        </Box>
                      </UnstyledButton>
                    );
                  })}
                </Stack>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}