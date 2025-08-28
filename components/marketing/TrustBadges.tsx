'use client';

import React from 'react';
import { Container, Group, Stack, Text, Card, ThemeIcon, Badge } from '@mantine/core';
import { IconShield, IconLock, IconCheck, IconStar, IconUsers, IconTrendingUp } from '@tabler/icons-react';

/**
 * Component: TrustBadges
 * Purpose: Display trust signals, security badges, and credibility indicators
 * Design: Professional security badges with social proof metrics
 * 
 * Features:
 * - Security compliance badges
 * - User trust metrics
 * - Social proof indicators
 * - Professional certifications
 */

interface TrustBadgesProps {
  layout?: 'horizontal' | 'grid';
  showMetrics?: boolean;
  className?: string;
}

export default function TrustBadges({ 
  layout = 'horizontal', 
  showMetrics = true,
  className = '' 
}: TrustBadgesProps) {
  const securityBadges = [
    {
      icon: <IconShield size={20} />,
      title: 'SOC 2 Compliant',
      description: 'Enterprise security standards',
      color: 'blue'
    },
    {
      icon: <IconLock size={20} />,
      title: 'Data Encrypted',
      description: 'Bank-level encryption',
      color: 'green'
    },
    {
      icon: <IconCheck size={20} />,
      title: 'GDPR Compliant',
      description: 'Privacy protected',
      color: 'teal'
    }
  ];

  const trustMetrics = [
    {
      icon: <IconStar size={20} />,
      value: '4.9/5',
      label: 'Customer Rating',
      color: 'yellow'
    },
    {
      icon: <IconUsers size={20} />,
      value: '2,847',
      label: 'Active PMs',
      color: 'indigo'
    },
    {
      icon: <IconTrendingUp size={20} />,
      value: '99.9%',
      label: 'Uptime SLA',
      color: 'green'
    }
  ];

  if (layout === 'grid') {
    return (
      <Container size="xl" py={40} className={className}>
        <Stack gap={32}>
          {/* Security Badges */}
          <Stack align="center" gap={16}>
            <Text size="sm" fw={600} c="dimmed" ta="center">
              TRUSTED BY ENTERPRISE • BUILT FOR SECURITY
            </Text>
            <Group gap={24} justify="center">
              {securityBadges.map((badge, index) => (
                <Card key={index} shadow="sm" radius="lg" p={16} ta="center" w={140}>
                  <Stack align="center" gap={8}>
                    <ThemeIcon size={40} variant="light" color={badge.color} radius="xl">
                      {badge.icon}
                    </ThemeIcon>
                    <Text size="sm" fw={600}>{badge.title}</Text>
                    <Text size="xs" c="dimmed">{badge.description}</Text>
                  </Stack>
                </Card>
              ))}
            </Group>
          </Stack>

          {/* Trust Metrics */}
          {showMetrics && (
            <Stack align="center" gap={16}>
              <Text size="sm" fw={600} c="dimmed" ta="center">
                PROVEN RESULTS • MEASURABLE IMPACT
              </Text>
              <Group gap={32} justify="center">
                {trustMetrics.map((metric, index) => (
                  <Group key={index} gap={12}>
                    <ThemeIcon size={32} variant="light" color={metric.color} radius="xl">
                      {metric.icon}
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="lg" fw={900} c={`${metric.color}.6`}>{metric.value}</Text>
                      <Text size="xs" c="dimmed" fw={500}>{metric.label}</Text>
                    </Stack>
                  </Group>
                ))}
              </Group>
            </Stack>
          )}
        </Stack>
      </Container>
    );
  }

  // Horizontal layout (default)
  return (
    <div 
      className={className}
      style={{ 
        backgroundColor: 'var(--marketing-bg-secondary)',
        borderTop: '1px solid var(--marketing-border)',
        borderBottom: '1px solid var(--marketing-border)'
      }}
    >
      <Container size="xl" py={24}>
        <Group gap={48} justify="center" align="center">
          {/* Security Section */}
          <Stack align="center" gap={12}>
            <Text size="xs" fw={700} c="dimmed" tt="uppercase" ta="center" lts={1}>
              Enterprise Security
            </Text>
            <Group gap={24}>
              {securityBadges.map((badge, index) => (
                <Group key={index} gap={8}>
                  <ThemeIcon size={24} variant="light" color={badge.color} radius="xl">
                    {badge.icon}
                  </ThemeIcon>
                  <Stack gap={0}>
                    <Text size="sm" fw={600}>{badge.title}</Text>
                    <Text size="xs" c="dimmed">{badge.description}</Text>
                  </Stack>
                </Group>
              ))}
            </Group>
          </Stack>

          {/* Divider */}
          <div style={{ height: '40px', width: '1px', backgroundColor: 'var(--marketing-border)' }} />

          {/* Trust Metrics Section */}
          {showMetrics && (
            <Stack align="center" gap={12}>
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" ta="center" lts={1}>
                Trusted Results
              </Text>
              <Group gap={24}>
                {trustMetrics.map((metric, index) => (
                  <Group key={index} gap={8}>
                    <ThemeIcon size={24} variant="light" color={metric.color} radius="xl">
                      {metric.icon}
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={900} c={`${metric.color}.6`}>{metric.value}</Text>
                      <Text size="xs" c="dimmed">{metric.label}</Text>
                    </Stack>
                  </Group>
                ))}
              </Group>
            </Stack>
          )}

          {/* Additional Trust Badges */}
          <Group gap={16}>
            <Badge variant="light" color="green" leftSection={<IconCheck size={12} />}>
              14-day Free Trial
            </Badge>
            <Badge variant="light" color="blue" leftSection={<IconShield size={12} />}>
              No Credit Card Required
            </Badge>
          </Group>
        </Group>
      </Container>
    </div>
  );
}