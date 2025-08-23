import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import MantineWrapper from "../../components/shared/MantineProvider";
import { DesignSystemProvider } from "../../components/marketing/DesignSystemProvider";
import Navigation from "../../components/marketing/Navigation";
import { Container, Text, Grid, Group, Stack, Divider } from '@mantine/core';
import Link from 'next/link';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PM33 - AI Product Management Tool",
  description: "Don't replace your PM tools - make them 10x smarter. PM33 is the AI brain that supercharges your existing PM stack without migration headaches.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div 
      className={`${inter.variable} antialiased marketing-context`}
      style={{
        fontFamily: 'var(--font-inter)',
        color: 'var(--marketing-text-primary)',
        backgroundColor: 'var(--marketing-bg-primary)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <MantineWrapper>
        <DesignSystemProvider context="marketing">
          <Navigation />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          {/* Comprehensive Footer */}
          <footer style={{ 
            backgroundColor: 'var(--marketing-bg-secondary)', 
            borderTop: '1px solid #e0e0e0',
            marginTop: 'auto' 
          }}>
            <Container size={1400} px={24} py={48}>
              <Grid>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Stack gap={16}>
                    <Text fw={700} size="lg">Product</Text>
                    <Stack gap={8}>
                      <Text component={Link} href="/command-center-demo" size="sm" c="dimmed" style={{ textDecoration: 'none' }}>
                        Demo
                      </Text>
                      <Text component={Link} href="/pricing" size="sm" c="dimmed" style={{ textDecoration: 'none' }}>
                        Pricing
                      </Text>
                      <Text component={Link} href="/features" size="sm" c="dimmed" style={{ textDecoration: 'none' }}>
                        Integrations
                      </Text>
                    </Stack>
                  </Stack>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Stack gap={16}>
                    <Text fw={700} size="lg">Community</Text>
                    <Stack gap={8}>
                      <Text component={Link} href="/blog" size="sm" c="dimmed" style={{ textDecoration: 'none' }}>
                        Community
                      </Text>
                      <Text component={Link} href="/blog" size="sm" c="dimmed" style={{ textDecoration: 'none' }}>
                        Blog
                      </Text>
                      <Text component={Link} href="/blog" size="sm" c="dimmed" style={{ textDecoration: 'none' }}>
                        PM Community
                      </Text>
                    </Stack>
                  </Stack>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Stack gap={16}>
                    <Text fw={700} size="lg">Resources</Text>
                    <Stack gap={8}>
                      <Text component={Link} href="/blog" size="sm" c="dimmed" style={{ textDecoration: 'none' }}>
                        Resources
                      </Text>
                      <Text component={Link} href="/features" size="sm" c="dimmed" style={{ textDecoration: 'none' }}>
                        Templates
                      </Text>
                      <Text component={Link} href="/blog" size="sm" c="dimmed" style={{ textDecoration: 'none' }}>
                        Case Studies
                      </Text>
                    </Stack>
                  </Stack>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Stack gap={16}>
                    <Text fw={700} size="lg">Company</Text>
                    <Stack gap={8}>
                      <Text component={Link} href="/about" size="sm" c="dimmed" style={{ textDecoration: 'none' }}>
                        About
                      </Text>
                      <Text component={Link} href="/contact" size="sm" c="dimmed" style={{ textDecoration: 'none' }}>
                        Contact
                      </Text>
                      <Text component={Link} href="/privacy" size="sm" c="dimmed" style={{ textDecoration: 'none' }}>
                        Privacy
                      </Text>
                    </Stack>
                  </Stack>
                </Grid.Col>
              </Grid>
              
              <Divider my={32} />
              
              <Group justify="space-between" align="center">
                <Text size="sm" c="dimmed">
                  © 2025 PM33. Strategic Intelligence Platform. All rights reserved.
                </Text>
                <Group gap={16}>
                  <Text component={Link} href="/privacy" size="sm" c="dimmed" style={{ textDecoration: 'none' }}>
                    Privacy Policy
                  </Text>
                  <Text component={Link} href="/privacy" size="sm" c="dimmed" style={{ textDecoration: 'none' }}>
                    Terms of Service
                  </Text>
                </Group>
              </Group>
            </Container>
          </footer>
        </DesignSystemProvider>
      </MantineWrapper>
    </div>
  );
}