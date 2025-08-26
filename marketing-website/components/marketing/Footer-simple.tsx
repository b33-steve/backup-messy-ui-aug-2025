'use client';

import React from 'react';
import { Container, Grid, Stack, Text, Title, Button, Group, Divider, Badge, Card, SimpleGrid, ThemeIcon, Center } from '@mantine/core';
import { IconBrandGithub, IconBrandTwitter, IconBrandLinkedin, IconMail, IconPhone, IconMapPin, IconArrowRight, IconHeart, IconCrown } from '@tabler/icons-react';
import Link from 'next/link';

export default function FooterSimple() {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Strategic Intelligence', href: '/strategic-intelligence' },
        { label: 'Command Center', href: '/command-center' },
        { label: 'Resources & Blog', href: '/resources' }
      ]
    },
    {
      title: 'Solutions',
      links: [
        { label: 'For Product Managers', href: '/product-managers' },
        { label: 'For Product Teams', href: '/product-teams' },
        { label: 'For Enterprises', href: '/enterprise' },
        { label: 'AI Workflow Automation', href: '/ai-workflows' },
        { label: 'PMO Transformation', href: '/pmo-transformation' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'PM Framework Library', href: '/resources' },
        { label: 'Strategic Intelligence Blog', href: '/resources' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'PM Templates', href: '/templates' },
        { label: 'API Documentation', href: '/api-docs' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press Kit', href: '/press' },
        { label: 'Security', href: '/security' }
      ]
    }
  ];

  const stats = [
    { value: '2,500+', label: 'Product Managers', icon: IconCrown },
    { value: '50+', label: 'Companies', icon: IconHeart },
    { value: '99.9%', label: 'Uptime', icon: IconArrowRight }
  ];

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: 'white'
    }}>
      {/* Main Footer */}
      <Container size="xl" py={80}>
        <Grid gutter={48} mb={64}>
          {/* Company Info */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap={24}>
              <Group>
                <img 
                  src="/PM 33 New Logo Horizontal V1.2 WHITE.png" 
                  alt="PM33" 
                  style={{ height: '40px', width: 'auto' }} 
                />
                <Badge 
                  variant="gradient" 
                  gradient={{ from: 'indigo', to: 'purple' }}
                  size="sm"
                >
                  AI-Powered
                </Badge>
              </Group>
              
              <Text c="gray.4" lh={1.6} maw={400}>
                Transform from Product Manager to Strategic PMO with 4 Agentic AI Teams. 
                Built by the PM community, for the PM community.
              </Text>
              
              <Stack gap={16}>
                <Button
                  component={Link}
                  href="/trial"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'purple' }}
                  rightSection={<IconArrowRight size={16} />}
                  size="md"
                >
                  Start Free 14-Day Trial
                </Button>
                
                <Group gap={12}>
                  <ThemeIcon variant="light" size="lg" color="gray">
                    <IconBrandTwitter size={20} />
                  </ThemeIcon>
                  <ThemeIcon variant="light" size="lg" color="gray">
                    <IconBrandLinkedin size={20} />
                  </ThemeIcon>
                  <ThemeIcon variant="light" size="lg" color="gray">
                    <IconBrandGithub size={20} />
                  </ThemeIcon>
                  <ThemeIcon variant="light" size="lg" color="gray">
                    <IconMail size={20} />
                  </ThemeIcon>
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Footer Links */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <SimpleGrid cols={{ base: 2, sm: 4 }} spacing={32}>
              {footerSections.map((section) => (
                <Stack key={section.title} gap={16}>
                  <Text fw={700} size="sm" c="white">
                    {section.title}
                  </Text>
                  <Stack gap={8}>
                    {section.links.map((link) => (
                      <Text
                        key={link.label}
                        component={Link}
                        href={link.href}
                        size="sm"
                        c="gray.4"
                        style={{
                          textDecoration: 'none',
                          transition: 'color 0.2s ease'
                        }}
                        className="hover:text-indigo-300"
                      >
                        {link.label}
                      </Text>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </SimpleGrid>
          </Grid.Col>
        </Grid>

        {/* Stats Section */}
        <Card 
          radius="lg" 
          p={32}
          mb={48}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={32}>
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Center key={index}>
                  <Group gap={16}>
                    <ThemeIcon 
                      size={48} 
                      variant="gradient" 
                      gradient={{ from: 'indigo', to: 'purple' }}
                    >
                      <IconComponent size={24} />
                    </ThemeIcon>
                    <Stack gap={4}>
                      <Text fw={800} size="xl" c="white">
                        {stat.value}
                      </Text>
                      <Text size="sm" c="gray.4">
                        {stat.label}
                      </Text>
                    </Stack>
                  </Group>
                </Center>
              );
            })}
          </SimpleGrid>
        </Card>

        {/* Contact Info */}
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={32} mb={48}>
          <Card 
            radius="lg" 
            p={24}
            style={{
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }}
          >
            <Group mb={16}>
              <ThemeIcon variant="light" color="indigo">
                <IconMail size={20} />
              </ThemeIcon>
              <Text fw={600} c="white">Support</Text>
            </Group>
            <Text size="sm" c="gray.4">
              support@pm33.ai
            </Text>
            <Text size="xs" c="gray.5">
              &lt; 4 hour response time
            </Text>
          </Card>

          <Card 
            radius="lg" 
            p={24}
            style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.2)'
            }}
          >
            <Group mb={16}>
              <ThemeIcon variant="light" color="green">
                <IconPhone size={20} />
              </ThemeIcon>
              <Text fw={600} c="white">Sales</Text>
            </Group>
            <Text size="sm" c="gray.4">
              Schedule a demo call
            </Text>
            <Text size="xs" c="gray.5">
              &lt; 2 hour response time
            </Text>
          </Card>

          <Card 
            radius="lg" 
            p={24}
            style={{
              background: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.2)'
            }}
          >
            <Group mb={16}>
              <ThemeIcon variant="light" color="violet">
                <IconMapPin size={20} />
              </ThemeIcon>
              <Text fw={600} c="white">Headquarters</Text>
            </Group>
            <Text size="sm" c="gray.4">
              San Francisco, CA
            </Text>
            <Text size="xs" c="gray.5">
              Building the future of PM
            </Text>
          </Card>
        </SimpleGrid>
      </Container>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(75, 85, 99, 0.2)',
        background: 'rgba(0, 0, 0, 0.2)'
      }}>
        <Container size="xl" py={24}>
          <Group justify="space-between" wrap="wrap">
            <Group gap={24}>
              <Text size="sm" c="gray.5">
                © 2025 PM33. All rights reserved.
              </Text>
              <Group gap={16}>
                <Text
                  component={Link}
                  href="/privacy"
                  size="xs"
                  c="gray.5"
                  style={{ textDecoration: 'none' }}
                  className="hover:text-gray-300"
                >
                  Privacy Policy
                </Text>
                <Text
                  component={Link}
                  href="/terms"
                  size="xs"
                  c="gray.5"
                  style={{ textDecoration: 'none' }}
                  className="hover:text-gray-300"
                >
                  Terms of Service
                </Text>
                <Text
                  component={Link}
                  href="/cookies"
                  size="xs"
                  c="gray.5"
                  style={{ textDecoration: 'none' }}
                  className="hover:text-gray-300"
                >
                  Cookie Policy
                </Text>
              </Group>
            </Group>
            
            <Group gap={8} align="center">
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#22c55e',
                borderRadius: '50%',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }} />
              <Text size="sm" c="gray.4" fw={500}>
                All systems operational
              </Text>
            </Group>
          </Group>
        </Container>
      </div>
    </footer>
  );
}