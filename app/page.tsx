/**
 * Component: Root Homepage - Marketing Landing Page  
 * Purpose: Show PM33 marketing homepage content directly at root path with navigation
 * Context: Marketing website entry point for prospects and visitors
 * RELEVANT FILES: app/(marketing)/page.tsx, components/shared/Navigation.tsx, components/marketing/DesignSystemProvider.tsx
 */

'use client';

import MantineWrapper from "../components/shared/MantineProvider";
import { DesignSystemProvider } from "../components/marketing/DesignSystemProvider";
import Navigation from "../components/marketing/Navigation";
import { Container, Title, Text, Button, Card, Group, List, Stack, Badge, Grid, Divider } from '@mantine/core';
import { IconRocket, IconBrain, IconTarget, IconShield, IconClock, IconTrendingUp, IconUsers, IconChartLine } from '@tabler/icons-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div 
      className="antialiased marketing-context"
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
            <Container size={1400} px={24} py={40}>
              <div className="marketing-context">
                
                {/* HERO SECTION: Sales Playbook Hook */}
                <Card shadow="xl" padding={64} radius={20} mb={60} 
                      style={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        textAlign: 'center'
                      }}>
                  <Title order={1} size="64px" fw={900} mb={32}>
                    Transform from Reactive Product Manager to Strategic PMO Leader in 30 Days
                  </Title>
                  
                  <Text size="xl" mb={40} maw={800} mx="auto">
                    PM33: Your AI Strategy Copilot - Think McKinsey + PM mentor + Data scientist in one platform
                  </Text>
                  
                  <Group justify="center" gap={32} mt={48}>
                    <Button 
                      component={Link}
                      href="/trial"
                      size="xl"
                      radius="xl"
                      style={{ 
                        backgroundColor: 'var(--marketing-cta)',
                        fontSize: '20px',
                        padding: '20px 48px',
                        height: 'auto'
                      }}
                      leftSection={<IconRocket size={24} />}
                    >
                      Start Free 14-Day Trial
                    </Button>
                    
                    <Button 
                      component={Link}
                      href="/demo"
                      size="xl"
                      variant="outline"
                      radius="xl"
                      style={{ 
                        borderColor: 'rgba(255, 255, 255, 0.8)',
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        fontSize: '18px',
                        padding: '18px 40px',
                        height: 'auto'
                      }}
                      leftSection={<IconBrain size={20} />}
                    >
                      See Live Demo
                    </Button>
                  </Group>
                  
                  <Text size="sm" mt={24} opacity={0.9}>
                    No credit card required • 2-minute setup • Instant strategic value
                  </Text>
                </Card>

                {/* PROBLEM AGITATION: Weekly PM Pain Points */}
                <Card shadow="md" padding={48} radius={16} mb={60}>
                  <Title order={2} size="48px" fw={700} mb={32} ta="center">
                    Are You Stuck in the Tactical Trap?
                  </Title>
                  
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Stack gap="lg">
                        <Group>
                          <IconClock color="var(--marketing-cta)" size={32} />
                          <Text size="lg">16+ hours/week on "strategic" analysis that competitors ignore</Text>
                        </Group>
                        <Group>
                          <IconUsers color="var(--marketing-cta)" size={32} />
                          <Text size="lg">Arguing about resource allocation with gut feelings, not data</Text>
                        </Group>
                        <Group>
                          <IconChartLine color="var(--marketing-cta)" size={32} />
                          <Text size="lg">Building roadmaps that competitors outmaneuver in weeks</Text>
                        </Group>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Card padding="xl" style={{ backgroundColor: 'var(--marketing-cta)', color: 'white' }}>
                        <Title order={3} mb={16}>The Strategic Reality:</Title>
                        <Text size="lg" mb={16}>
                          While you spend 40% of your time on analysis, your competitors are using AI to make strategic decisions in minutes.
                        </Text>
                        <Badge size="xl" variant="white" color="orange">
                          You're fighting 2025 battles with 1990s tools
                        </Badge>
                      </Card>
                    </Grid.Col>
                  </Grid>
                </Card>

                {/* SOLUTION: PM33 AI Strategy Copilot */}
                <Card shadow="md" padding={48} radius={16} mb={60}>
                  <Title order={2} size="48px" fw={700} mb={32} ta="center">
                    PM33: Your AI Strategy Copilot
                  </Title>
                  
                  <Text size="xl" ta="center" mb={48} maw={1000} mx="auto">
                    4 specialized AI teams working together to transform you from reactive Product Manager 
                    into strategic PMO leader with McKinsey-level analysis capabilities.
                  </Text>
                  
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                      <Card padding="lg" shadow="sm" h="100%">
                        <IconBrain size={48} color="var(--marketing-primary)" />
                        <Title order={4} mt="sm">Strategic Intelligence AI</Title>
                        <Text size="sm" c="dimmed">
                          Multi-framework analysis (ICE, RICE, Porter's Five Forces) with competitive intelligence
                        </Text>
                      </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                      <Card padding="lg" shadow="sm" h="100%">
                        <IconTarget size={48} color="var(--marketing-primary)" />
                        <Title order={4} mt="sm">Workflow Execution AI</Title>
                        <Text size="sm" c="dimmed">
                          Automated task creation and cross-functional coordination with PM tool integration
                        </Text>
                      </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                      <Card padding="lg" shadow="sm" h="100%">
                        <IconChartLine size={48} color="var(--marketing-primary)" />
                        <Title order={4} mt="sm">Data Intelligence AI</Title>
                        <Text size="sm" c="dimmed">
                          Company-specific learning and predictive analytics with performance optimization
                        </Text>
                      </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                      <Card padding="lg" shadow="sm" h="100%">
                        <IconUsers size={48} color="var(--marketing-primary)" />
                        <Title order={4} mt="sm">Communication AI</Title>
                        <Text size="sm" c="dimmed">
                          Stakeholder communication and executive summaries with alignment facilitation
                        </Text>
                      </Card>
                    </Grid.Col>
                  </Grid>
                </Card>

                {/* SEAMLESS TOOL INTEGRATION - WITH TOOL LOGOS */}
                <Card shadow="md" padding={48} radius={16} mb={60}>
                  <Title order={2} size="48px" fw={700} mb={32} ta="center">
                    Seamless Integration with Your Existing PM Stack
                  </Title>
                  
                  <Text size="xl" ta="center" mb={48} maw={1000} mx="auto">
                    Don't replace your PM tools—make them 10x smarter. PM33 works with what you already use.
                  </Text>
                  
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                      <Card padding="lg" shadow="sm" h="100%" ta="center">
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                          <img src="/logos/jira-logo.svg" alt="Jira" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
                        </div>
                        <Title order={4}>Jira Integration</Title>
                        <Text size="sm" c="dimmed">
                          Strategic context for every ticket, automated story creation, and intelligent backlog prioritization
                        </Text>
                      </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                      <Card padding="lg" shadow="sm" h="100%" ta="center">
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                          <img src="/logos/linear-logo.svg" alt="Linear" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
                        </div>
                        <Title order={4}>Linear Integration</Title>
                        <Text size="sm" c="dimmed">
                          AI-powered issue insights, strategic milestone tracking, and automated workflow orchestration
                        </Text>
                      </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                      <Card padding="lg" shadow="sm" h="100%" ta="center">
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                          <img src="/logos/asana-logo.svg" alt="Asana" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
                        </div>
                        <Title order={4}>Asana Integration</Title>
                        <Text size="sm" c="dimmed">
                          Strategic project planning, intelligent resource allocation, and cross-team coordination
                        </Text>
                      </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                      <Card padding="lg" shadow="sm" h="100%" ta="center">
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                          <img src="/logos/monday-logo.svg" alt="Monday.com" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
                        </div>
                        <Title order={4}>Monday.com Integration</Title>
                        <Text size="sm" c="dimmed">
                          Enhanced workflow intelligence, strategic board management, and automated status updates
                        </Text>
                      </Card>
                    </Grid.Col>
                  </Grid>
                </Card>

                {/* PROVEN RESULTS - UPDATED METRICS */}
                <Card shadow="md" padding={48} radius={16} mb={60} 
                      style={{ backgroundColor: 'var(--marketing-success)', color: 'white' }}>
                  <Title order={2} size="48px" fw={700} mb={32} ta="center">
                    Proven Results from PM Leaders
                  </Title>
                  
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                      <Stack align="center">
                        <IconTrendingUp size={64} />
                        <Text size="xl" fw={900}>+47 NPS Points</Text>
                        <Text ta="center" size="lg">Average NPS boost from executive stakeholders within 90 days</Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                      <Stack align="center">
                        <IconUsers size={64} />
                        <Text size="xl" fw={900}>73% Team Satisfaction</Text>
                        <Text ta="center" size="lg">Engineering teams report higher clarity on strategic priorities</Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                      <Stack align="center">
                        <IconChartLine size={64} />
                        <Text size="xl" fw={900}>34% Faster Decisions</Text>
                        <Text ta="center" size="lg">Strategic decision cycles reduced from 2.3 weeks to 1.5 weeks average</Text>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                  
                  <Divider my="xl" />
                  
                  <Text size="xl" ta="center" fw={600} mb={16}>
                    "PM33 transformed how our product team makes strategic decisions. We went from gut-feel prioritization to data-driven strategic intelligence." 
                  </Text>
                  <Text size="lg" ta="center" opacity={0.9}>
                    — Sarah Chen, VP Product at TechFlow (Series B, 200+ employees)
                  </Text>
                </Card>

                {/* ROI JUSTIFICATION */}
                <Card shadow="md" padding={48} radius={16} mb={60}>
                  <Title order={2} size="48px" fw={700} mb={32} ta="center">
                    The ROI Math is Simple
                  </Title>
                  
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                      <Stack align="center">
                        <IconClock size={64} color="var(--marketing-primary)" />
                        <Text size="lg" fw={600}>Current Reality</Text>
                        <Text ta="center">16 hours/week on strategic analysis = 64 hours/month</Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                      <Stack align="center">
                        <IconTrendingUp size={64} color="var(--marketing-success)" />
                        <Text size="lg" fw={600}>With PM33</Text>
                        <Text ta="center">Reduced to 4 hours/month = 60 hours saved</Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                      <Stack align="center">
                        <IconShield size={64} color="var(--marketing-cta)" />
                        <Text size="lg" fw={600}>Value Created</Text>
                        <Text ta="center">At $100/hour PM value = $6,000 monthly value</Text>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                  
                  <Divider my="xl" />
                  
                  <Text size="32px" ta="center" fw={700} mb={16} style={{ color: 'var(--marketing-success)' }}>
                    PM33 Starter ($29/month) → 207x return on investment
                  </Text>
                  
                  <Text size="lg" ta="center" c="dimmed">
                    Plus: Better strategic decisions, faster execution, happier stakeholders
                  </Text>
                </Card>
                
              </div>
            </Container>
          </main>
          {/* Comprehensive Footer */}
          <footer style={{ 
            backgroundColor: 'var(--marketing-bg-secondary)', 
            borderTop: '1px solid #e0e0e0',
            marginTop: 'auto',
            padding: '48px 24px 24px 24px'
          }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '32px',
                marginBottom: '32px'
              }}>
                <div>
                  <h3 style={{ fontWeight: 700, marginBottom: '16px', fontSize: '18px' }}>Product</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href="/features" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Features</a>
                    <a href="/pricing" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Pricing</a>
                    <a href="/trial" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Free Trial</a>
                    <a href="/demo" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Demo</a>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ fontWeight: 700, marginBottom: '16px', fontSize: '18px' }}>Resources</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href="/blog" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Blog</a>
                    <a href="/about" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>About Us</a>
                    <a href="/contact" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Contact</a>
                    <a href="/support" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Support</a>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ fontWeight: 700, marginBottom: '16px', fontSize: '18px' }}>Legal</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href="/privacy" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Privacy Policy</a>
                    <a href="/terms" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Terms of Service</a>
                    <a href="/security" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Security</a>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ fontWeight: 700, marginBottom: '16px', fontSize: '18px' }}>Connect</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href="https://linkedin.com/company/pm33" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>LinkedIn</a>
                    <a href="https://twitter.com/PM33_AI" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Twitter</a>
                    <a href="/community" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Community</a>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                borderTop: '1px solid #e0e0e0',
                paddingTop: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--marketing-text-secondary)' }}>
                  © 2025 PM33. Strategic Intelligence Platform. All rights reserved.
                </p>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <a href="/privacy" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Privacy</a>
                  <a href="/terms" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Terms</a>
                </div>
              </div>
            </div>
          </footer>
        </DesignSystemProvider>
      </MantineWrapper>
    </div>
  );
}