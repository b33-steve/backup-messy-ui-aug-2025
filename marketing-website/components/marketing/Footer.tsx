'use client';

import Link from 'next/link';
import { Container, Group, Text, Stack, Grid, Divider, Box } from '@mantine/core';
import { IconBrandTwitter, IconBrandLinkedin, IconBrandGithub, IconMail } from '@tabler/icons-react';
import { useTheme } from './ThemeProvider';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Safe theme hook with fallback
  let theme = 'light';
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
  } catch (error) {
    console.warn('ThemeProvider not found in Footer, using light theme');
  }
  
  const footerLinks = {
    product: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Resources', href: '/blog' },
      { label: 'Strategic Intelligence', href: '/strategic-intelligence' }
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Security', href: '/security' },
      { label: 'Privacy', href: '/privacy' }
    ]
  };

  const socialLinks = [
    { icon: IconBrandTwitter, href: 'https://twitter.com/pm33ai', label: 'Twitter' },
    { icon: IconBrandLinkedin, href: 'https://linkedin.com/company/pm33', label: 'LinkedIn' },
    { icon: IconBrandGithub, href: 'https://github.com/pm33', label: 'GitHub' },
    { icon: IconMail, href: 'mailto:hello@pm33.ai', label: 'Email' }
  ];

  return (
    <Box 
      component="footer"
      className="marketing-glass-card"
      style={{
        marginTop: '80px',
        borderRadius: '32px 32px 0 0',
        border: 'none',
        borderTop: '1px solid var(--marketing-bg-glass)',
        padding: 0
      }}
    >
      <Container size={1200} px={32} py={64}>
        {/* Main Footer Content */}
        <Grid gutter={48} mb={48}>
          {/* Brand Section */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap={24}>
              <Group align="center" gap={12}>
                <img 
                  src={theme === 'dark' ? '/pm33-logo-dark.png' : '/pm33-logo-light.png'}
                  alt="PM33 Strategic Intelligence Platform"
                  style={{ height: '32px', width: 'auto' }}
                />
                <Text 
                  size="xl" 
                  fw={700}
                  className="marketing-gradient-text"
                >
                  PM33
                </Text>
              </Group>
              
              <Text size="md" c="var(--marketing-text-secondary)" lh={1.6}>
                Transform your existing PM tools into AI-powered strategic engines. 
                78% faster delivery, 65% less admin work.
              </Text>
              
              <Text size="sm" c="var(--marketing-text-muted)">
                Trusted by 2,500+ Product Managers worldwide.
              </Text>
              
              {/* Social Links */}
              <Group gap={16}>
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <Link 
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <Box
                        style={{
                          padding: '12px',
                          borderRadius: '12px',
                          background: 'var(--marketing-bg-glass)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          color: 'var(--marketing-text-secondary)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.background = 'var(--marketing-primary)';
                          e.currentTarget.style.color = 'var(--marketing-text-inverse)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.background = 'var(--marketing-bg-glass)';
                          e.currentTarget.style.color = 'var(--marketing-text-secondary)';
                        }}
                      >
                        <IconComponent size={20} />
                      </Box>
                    </Link>
                  );
                })}
              </Group>
            </Stack>
          </Grid.Col>
          {/* Footer Links */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Grid gutter={32}>
              <Grid.Col span={6}>
                <Stack gap={16}>
                  <Text fw={600} size="md" c="var(--marketing-text-primary)">
                    Product
                  </Text>
                  <Stack gap={8}>
                    {footerLinks.product.map((link, index) => (
                      <Link key={index} href={link.href} style={{ textDecoration: 'none' }}>
                        <Text 
                          size="sm" 
                          c="var(--marketing-text-secondary)"
                          style={{
                            transition: 'color 0.2s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--marketing-primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--marketing-text-secondary)';
                          }}
                        >
                          {link.label}
                        </Text>
                      </Link>
                    ))}
                  </Stack>
                </Stack>
              </Grid.Col>

              <Grid.Col span={6}>
                <Stack gap={16}>
                  <Text fw={600} size="md" c="var(--marketing-text-primary)">
                    Company
                  </Text>
                  <Stack gap={8}>
                    {footerLinks.company.map((link, index) => (
                      <Link key={index} href={link.href} style={{ textDecoration: 'none' }}>
                        <Text 
                          size="sm" 
                          c="var(--marketing-text-secondary)"
                          style={{
                            transition: 'color 0.2s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--marketing-primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--marketing-text-secondary)';
                          }}
                        >
                          {link.label}
                        </Text>
                      </Link>
                    ))}
                  </Stack>
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>

        <Divider 
          color="var(--marketing-bg-glass)" 
          mb={32} 
        />

        {/* Bottom Footer */}
        <Group justify="space-between" align="center">
          <Text size="sm" c="var(--marketing-text-muted)">
            © {currentYear} PM33. All rights reserved.
          </Text>
          
          <Group gap={24}>
            <Group gap={8}>
              <Box
                w={8}
                h={8}
                style={{
                  borderRadius: '50%',
                  background: 'var(--marketing-success)',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}
              />
              <Text size="sm" c="var(--marketing-text-muted)">
                2,500+ PMs trust PM33
              </Text>
            </Group>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}