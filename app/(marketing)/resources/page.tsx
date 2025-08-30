/**
 * Component: Resources Hub - Comprehensive PM33 Resource Center
 * Purpose: Central hub for PM strategies, dev docs, API reference, and release notes
 * Context: Marketing conversion and developer onboarding with dual navigation
 * RELEVANT FILES: app/(marketing)/blog/page.tsx, PM33_COMPLETE_WEBSITE_MAP.md
 */

'use client';

import { Container, Title, Text, Card, Button, Badge, Stack, Group, Tabs, SimpleGrid, ThemeIcon, Box, List } from '@mantine/core';
import { IconBook, IconCode, IconRocket, IconFileText, IconBrain, IconTarget, IconTrendingUp, IconUsers, IconDownload, IconDatabase, IconGitBranch, IconShield, IconPlug } from '@tabler/icons-react';
import Link from 'next/link';

export default function ResourcesHubPage() {
  return (
    <Box py={80} style={{ backgroundColor: 'var(--marketing-bg-primary)' }}>
      <Container size="xl">
        {/* Header */}
        <Stack align="center" gap={48} mb={64}>
          <Badge size="lg" variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
            Resource Center
          </Badge>
          
          <Stack align="center" gap={24}>
            <Title order={1} size="h1" ta="center" lh={1.2}>
              PM33 Resource Hub
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              Strategic frameworks, developer documentation, and integration guides for modern product teams.
            </Text>
          </Stack>
        </Stack>

        {/* Navigation Tabs */}
        <Tabs defaultValue="strategies" variant="outline" radius="md">
          <Tabs.List grow mb={32}>
            <Tabs.Tab value="strategies" leftSection={<IconBrain size={16} />}>
              PM Strategies
            </Tabs.Tab>
            <Tabs.Tab value="developer" leftSection={<IconCode size={16} />}>
              Developer Resources
            </Tabs.Tab>
            <Tabs.Tab value="api" leftSection={<IconDatabase size={16} />}>
              API Reference
            </Tabs.Tab>
            <Tabs.Tab value="releases" leftSection={<IconGitBranch size={16} />}>
              Release Notes
            </Tabs.Tab>
          </Tabs.List>

          {/* PM Strategies Tab */}
          <Tabs.Panel value="strategies">
            <Stack gap={48}>
              {/* Featured Strategic Guides */}
              <Stack gap={32}>
                <Title order={2} ta="center">Strategic PM Frameworks & Guides</Title>
                
                <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={32}>
                  {/* AI Product Management Tool Guide */}
                  <Card shadow="xl" radius="xl" p={32} style={{ border: '2px solid var(--marketing-success)' }}>
                    <Stack gap={24}>
                      <Group>
                        <ThemeIcon size={48} variant="gradient" gradient={{ from: 'teal', to: 'cyan' }}>
                          <IconBrain size={24} />
                        </ThemeIcon>
                        <Badge variant="filled" color="teal" size="sm">NEW</Badge>
                      </Group>
                      <Stack gap={12}>
                        <Title order={3} size="h3">AI Product Management Tool Guide</Title>
                        <Text c="dimmed">
                          Don't Replace Your PM Tools - Make Them 10x Smarter. Transform Jira, Monday.com, and Asana 
                          into AI-powered strategic engines with no migration headaches.
                        </Text>
                      </Stack>
                      <Button 
                        component={Link} 
                        href="/ai-product-management-tool" 
                        variant="gradient" 
                        gradient={{ from: 'teal', to: 'cyan' }}
                        size="sm"
                      >
                        Read Full Guide
                      </Button>
                    </Stack>
                  </Card>

                  {/* Strategic Intelligence Framework */}
                  <Card shadow="xl" radius="xl" p={32} style={{ border: '2px solid var(--marketing-primary)' }}>
                    <Stack gap={24}>
                      <Group>
                        <ThemeIcon size={48} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                          <IconTarget size={24} />
                        </ThemeIcon>
                        <Badge variant="filled" color="indigo" size="sm">FRAMEWORK</Badge>
                      </Group>
                      <Stack gap={12}>
                        <Title order={3} size="h3">Strategic Intelligence Framework</Title>
                        <Text c="dimmed">
                          Complete guide to ICE/RICE prioritization, competitive analysis, and outcome-driven roadmapping 
                          with AI-powered insights.
                        </Text>
                      </Stack>
                      <Button 
                        component={Link} 
                        href="/strategic-intelligence" 
                        variant="gradient" 
                        gradient={{ from: 'indigo', to: 'purple' }}
                        size="sm"
                      >
                        Try Interactive Demo
                      </Button>
                    </Stack>
                  </Card>
                </SimpleGrid>
              </Stack>

              {/* Resource Categories */}
              <Stack gap={32}>
                <Title order={2} ta="center">Browse by Category</Title>
                
                <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={24}>
                  <Card shadow="md" radius="xl" p={24} ta="center" style={{ cursor: 'pointer' }}>
                    <Stack align="center" gap={16}>
                      <ThemeIcon size={48} variant="light" color="blue">
                        <IconFileText size={24} />
                      </ThemeIcon>
                      <Title order={4} size="h5">Strategic Frameworks</Title>
                      <Text size="sm" c="dimmed">
                        ICE/RICE, Porter's Five Forces, Jobs-to-be-Done, and more
                      </Text>
                      <Text size="sm" fw={500} c="blue">12 guides</Text>
                    </Stack>
                  </Card>

                  <Card shadow="md" radius="xl" p={24} ta="center" style={{ cursor: 'pointer' }}>
                    <Stack align="center" gap={16}>
                      <ThemeIcon size={48} variant="light" color="green">
                        <IconTrendingUp size={24} />
                      </ThemeIcon>
                      <Title order={4} size="h5">Competitive Analysis</Title>
                      <Text size="sm" c="dimmed">
                        Market research, competitor tracking, and positioning strategies
                      </Text>
                      <Text size="sm" fw={500} c="green">8 templates</Text>
                    </Stack>
                  </Card>

                  <Card shadow="md" radius="xl" p={24} ta="center" style={{ cursor: 'pointer' }}>
                    <Stack align="center" gap={16}>
                      <ThemeIcon size={48} variant="light" color="purple">
                        <IconUsers size={24} />
                      </ThemeIcon>
                      <Title order={4} size="h5">Stakeholder Management</Title>
                      <Text size="sm" c="dimmed">
                        Communication templates, alignment strategies, executive updates
                      </Text>
                      <Text size="sm" fw={500} c="purple">15 templates</Text>
                    </Stack>
                  </Card>

                  <Card shadow="md" radius="xl" p={24} ta="center" style={{ cursor: 'pointer' }}>
                    <Stack align="center" gap={16}>
                      <ThemeIcon size={48} variant="light" color="orange">
                        <IconDownload size={24} />
                      </ThemeIcon>
                      <Title order={4} size="h5">Templates & Tools</Title>
                      <Text size="sm" c="dimmed">
                        Ready-to-use PM templates and strategic planning tools
                      </Text>
                      <Text size="sm" fw={500} c="orange">25+ resources</Text>
                    </Stack>
                  </Card>
                </SimpleGrid>
              </Stack>
            </Stack>
          </Tabs.Panel>

          {/* Developer Resources Tab */}
          <Tabs.Panel value="developer">
            <Stack gap={48}>
              <Title order={2} ta="center">Developer Documentation</Title>
              
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32}>
                {/* Architecture Overview */}
                <Card shadow="lg" radius="xl" p={32}>
                  <Stack gap={24}>
                    <Group>
                      <ThemeIcon size={48} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                        <IconShield size={24} />
                      </ThemeIcon>
                    </Group>
                    <Title order={3} size="h4">Core Architecture</Title>
                    <Text c="dimmed">
                      Complete system architecture with Next.js 15.5.0, TypeScript, and advanced integration platform.
                    </Text>
                    <List size="sm" spacing="xs">
                      <List.Item>4 AI Teams Coordination System</List.Item>
                      <List.Item>Multi-tenant B2B SaaS Foundation</List.Item>
                      <List.Item>Real-time WebSocket Intelligence</List.Item>
                      <List.Item>Enterprise Security Standards</List.Item>
                    </List>
                    <Button variant="outline" leftSection={<IconFileText size={16} />}>
                      View Architecture Guide
                    </Button>
                  </Stack>
                </Card>

                {/* Integration Platform */}
                <Card shadow="lg" radius="xl" p={32}>
                  <Stack gap={24}>
                    <Group>
                      <ThemeIcon size={48} variant="gradient" gradient={{ from: 'purple', to: 'pink' }}>
                        <IconPlug size={24} />
                      </ThemeIcon>
                    </Group>
                    <Title order={3} size="h4">Integration Platform</Title>
                    <Text c="dimmed">
                      Advanced PM tool integrations with intelligent field mapping and portfolio-level insights.
                    </Text>
                    <List size="sm" spacing="xs">
                      <List.Item>Jira, Monday.com, Asana, Linear</List.Item>
                      <List.Item>AI-Powered Field Mapping</List.Item>
                      <List.Item>Real-time Sync & Intelligence</List.Item>
                      <List.Item>Portfolio Analytics Engine</List.Item>
                    </List>
                    <Button variant="outline" leftSection={<IconCode size={16} />}>
                      Integration Docs
                    </Button>
                  </Stack>
                </Card>

                {/* Component System */}
                <Card shadow="lg" radius="xl" p={32}>
                  <Stack gap={24}>
                    <Group>
                      <ThemeIcon size={48} variant="gradient" gradient={{ from: 'green', to: 'teal' }}>
                        <IconBook size={24} />
                      </ThemeIcon>
                    </Group>
                    <Title order={3} size="h4">Component Library</Title>
                    <Text c="dimmed">
                      Complete PM33 component system with glass morphism design and AI processing states.
                    </Text>
                    <List size="sm" spacing="xs">
                      <List.Item>12 Integration Components</List.Item>
                      <List.Item>Glass Morphism Design System</List.Item>
                      <List.Item>AI Processing Animations</List.Item>
                      <List.Item>TypeScript + Storybook</List.Item>
                    </List>
                    <Button variant="outline" leftSection={<IconRocket size={16} />}>
                      Browse Components
                    </Button>
                  </Stack>
                </Card>

                {/* Testing & Quality */}
                <Card shadow="lg" radius="xl" p={32}>
                  <Stack gap={24}>
                    <Group>
                      <ThemeIcon size={48} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                        <IconTarget size={24} />
                      </ThemeIcon>
                    </Group>
                    <Title order={3} size="h4">Testing & Quality</Title>
                    <Text c="dimmed">
                      Comprehensive testing suite with 650+ lines of coverage and production validation.
                    </Text>
                    <List size="sm" spacing="xs">
                      <List.Item>Playwright E2E Testing</List.Item>
                      <List.Item>Jest Unit Tests</List.Item>
                      <List.Item>Visual Regression Tests</List.Item>
                      <List.Item>Performance Monitoring</List.Item>
                    </List>
                    <Button variant="outline" leftSection={<IconShield size={16} />}>
                      Testing Guide
                    </Button>
                  </Stack>
                </Card>
              </SimpleGrid>
            </Stack>
          </Tabs.Panel>

          {/* API Reference Tab */}
          <Tabs.Panel value="api">
            <Stack gap={48}>
              <Title order={2} ta="center">PM33 API Reference</Title>
              
              <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={32}>
                {/* Strategic Analysis API */}
                <Card shadow="lg" radius="xl" p={32}>
                  <Stack gap={24}>
                    <Group>
                      <Badge color="blue" variant="light">POST</Badge>
                      <Text fw={600}>/api/strategic/analyze</Text>
                    </Group>
                    <Title order={4}>Strategic Analysis Engine</Title>
                    <Text size="sm" c="dimmed">
                      Multi-framework strategic analysis using ICE, RICE, and Porter's Five Forces with AI intelligence.
                    </Text>
                    <Stack gap={8}>
                      <Text size="sm" fw={500}>Request Body:</Text>
                      <Card bg="gray.1" p={16} radius="md">
                        <Text size="xs" ff="monospace">
                          {`{
  "framework": "ICE",
  "data": { ... },
  "context": { ... }
}`}
                        </Text>
                      </Card>
                    </Stack>
                    <Button size="sm" variant="outline">View Full Documentation</Button>
                  </Stack>
                </Card>

                {/* AI Teams Status API */}
                <Card shadow="lg" radius="xl" p={32}>
                  <Stack gap={24}>
                    <Group>
                      <Badge color="green" variant="light">GET</Badge>
                      <Text fw={600}>/api/ai-teams/status</Text>
                    </Group>
                    <Title order={4}>AI Teams Health Monitor</Title>
                    <Text size="sm" c="dimmed">
                      Real-time status monitoring for all 4 AI teams with performance metrics and availability.
                    </Text>
                    <Stack gap={8}>
                      <Text size="sm" fw={500}>Response:</Text>
                      <Card bg="gray.1" p={16} radius="md">
                        <Text size="xs" ff="monospace">
                          {`{
  "strategic": "healthy",
  "workflow": "healthy",
  "data": "healthy",
  "communication": "healthy"
}`}
                        </Text>
                      </Card>
                    </Stack>
                    <Button size="sm" variant="outline">View Full Documentation</Button>
                  </Stack>
                </Card>

                {/* Integration Sync API */}
                <Card shadow="lg" radius="xl" p={32}>
                  <Stack gap={24}>
                    <Group>
                      <Badge color="orange" variant="light">POST</Badge>
                      <Text fw={600}>/api/integrations/sync</Text>
                    </Group>
                    <Title order={4}>PM Tool Integration Sync</Title>
                    <Text size="sm" c="dimmed">
                      Intelligent synchronization with Jira, Monday.com, Asana, and Linear with field mapping.
                    </Text>
                    <Stack gap={8}>
                      <Text size="sm" fw={500}>Authentication:</Text>
                      <Card bg="gray.1" p={16} radius="md">
                        <Text size="xs" ff="monospace">
                          Authorization: Bearer YOUR_API_KEY
                        </Text>
                      </Card>
                    </Stack>
                    <Button size="sm" variant="outline">View Full Documentation</Button>
                  </Stack>
                </Card>

                {/* WebSocket Intelligence API */}
                <Card shadow="lg" radius="xl" p={32}>
                  <Stack gap={24}>
                    <Group>
                      <Badge color="purple" variant="light">WS</Badge>
                      <Text fw={600}>/api/websocket</Text>
                    </Group>
                    <Title order={4}>Real-time Intelligence Stream</Title>
                    <Text size="sm" c="dimmed">
                      WebSocket streaming for live PMO insights, progress tracking, and AI analysis updates.
                    </Text>
                    <Stack gap={8}>
                      <Text size="sm" fw={500}>Event Types:</Text>
                      <Card bg="gray.1" p={16} radius="md">
                        <Text size="xs" ff="monospace">
                          analysis_complete, sync_progress, ai_insight
                        </Text>
                      </Card>
                    </Stack>
                    <Button size="sm" variant="outline">View Full Documentation</Button>
                  </Stack>
                </Card>
              </SimpleGrid>

              {/* Quick Start Guide */}
              <Card shadow="xl" radius="xl" p={40} style={{ background: 'var(--marketing-gradient-primary)', color: 'white' }}>
                <Stack align="center" gap={24}>
                  <Title order={2} c="white">Ready to Integrate PM33?</Title>
                  <Text size="lg" ta="center" maw={600} opacity={0.9}>
                    Get your API key and start building PMO-level intelligence into your product workflows.
                  </Text>
                  <Group gap={16}>
                    <Button size="lg" variant="white" color="dark">
                      Get API Key
                    </Button>
                    <Button size="lg" variant="outline" style={{ borderColor: 'white', color: 'white' }}>
                      View Examples
                    </Button>
                  </Group>
                </Stack>
              </Card>
            </Stack>
          </Tabs.Panel>

          {/* Release Notes Tab */}
          <Tabs.Panel value="releases">
            <Stack gap={48}>
              <Title order={2} ta="center">Release Notes & Changelog</Title>
              
              <Stack gap={32}>
                {/* Latest Release */}
                <Card shadow="lg" radius="xl" p={32} style={{ border: '2px solid var(--marketing-success)' }}>
                  <Stack gap={20}>
                    <Group justify="space-between">
                      <Group>
                        <Badge color="green" size="lg">v1.2.0</Badge>
                        <Badge variant="light" color="green">LATEST</Badge>
                      </Group>
                      <Text size="sm" c="dimmed">August 27, 2025</Text>
                    </Group>
                    <Title order={3}>Advanced Integration Platform</Title>
                    <Text c="dimmed">
                      Major release featuring complete PM tool integration platform with 4-AI team coordination and real-time intelligence.
                    </Text>
                    
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={24}>
                      <Stack gap={8}>
                        <Text fw={600} c="green">🚀 New Features</Text>
                        <List size="sm" spacing="xs">
                          <List.Item>12 new integration components</List.Item>
                          <List.Item>Real-time WebSocket intelligence</List.Item>
                          <List.Item>Portfolio-level analytics engine</List.Item>
                          <List.Item>Advanced field mapping with AI</List.Item>
                        </List>
                      </Stack>
                      
                      <Stack gap={8}>
                        <Text fw={600} c="blue">🔧 Improvements</Text>
                        <List size="sm" spacing="xs">
                          <List.Item>650+ lines comprehensive testing</List.Item>
                          <List.Item>Performance optimization</List.Item>
                          <List.Item>Enhanced security validation</List.Item>
                          <List.Item>Glass morphism design system</List.Item>
                        </List>
                      </Stack>
                    </SimpleGrid>
                    
                    <Button variant="outline" leftSection={<IconDownload size={16} />}>
                      Download Release
                    </Button>
                  </Stack>
                </Card>

                {/* Previous Releases */}
                <Card shadow="md" radius="xl" p={24}>
                  <Stack gap={16}>
                    <Group justify="space-between">
                      <Group>
                        <Badge color="blue">v1.1.0</Badge>
                        <Text fw={600}>Multi-tenancy Foundation</Text>
                      </Group>
                      <Text size="sm" c="dimmed">August 15, 2025</Text>
                    </Group>
                    <Text size="sm" c="dimmed">
                      Enterprise-grade multi-tenant architecture with 100% tenant isolation validation and security compliance.
                    </Text>
                  </Stack>
                </Card>

                <Card shadow="md" radius="xl" p={24}>
                  <Stack gap={16}>
                    <Group justify="space-between">
                      <Group>
                        <Badge color="purple">v1.0.0</Badge>
                        <Text fw={600}>PM33 Core Platform Launch</Text>
                      </Group>
                      <Text size="sm" c="dimmed">August 1, 2025</Text>
                    </Group>
                    <Text size="sm" c="dimmed">
                      Initial release of PM33 PMO Transformation Platform with 4 AI teams and strategic intelligence engine.
                    </Text>
                  </Stack>
                </Card>
              </Stack>

              {/* Migration Guides */}
              <Card shadow="xl" radius="xl" p={32} bg="gray.1">
                <Stack gap={24}>
                  <Title order={3}>Migration & Upgrade Guides</Title>
                  <Text c="dimmed">
                    Step-by-step guides for upgrading between PM33 versions and migrating from other PM tools.
                  </Text>
                  
                  <SimpleGrid cols={{ base: 1, md: 3 }} spacing={16}>
                    <Button variant="light" size="sm" leftSection={<IconBook size={14} />}>
                      v1.1.0 → v1.2.0 Guide
                    </Button>
                    <Button variant="light" size="sm" leftSection={<IconBook size={14} />}>
                      Jira Migration Guide
                    </Button>
                    <Button variant="light" size="sm" leftSection={<IconBook size={14} />}>
                      Breaking Changes Log
                    </Button>
                  </SimpleGrid>
                </Stack>
              </Card>
            </Stack>
          </Tabs.Panel>
        </Tabs>

        {/* Content continued from old resources */}

        {/* Content Factory Articles - First Section */}
        <Stack gap={32} mb={64}>
          <Title order={2} ta="center">Latest Strategic Guides</Title>
          
          <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={32}>
            {/* AI Product Management Tool Guide */}
            <Card shadow="xl" radius="xl" p={32} style={{ border: '2px solid var(--marketing-success)' }}>
              <Stack gap={24}>
                <Group>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'teal', to: 'cyan' }}>
                    <IconBrain size={24} />
                  </ThemeIcon>
                  <Badge variant="filled" color="teal" size="sm">NEW</Badge>
                </Group>
                <Stack gap={12}>
                  <Title order={3} size="h3">AI Product Management Tool Guide</Title>
                  <Text c="dimmed">
                    Don't Replace Your PM Tools - Make Them 10x Smarter. Transform Jira, Monday.com, and Asana 
                    into AI-powered strategic engines with no migration headaches.
                  </Text>
                  <Text size="sm" c="dimmed" style={{ fontStyle: 'italic' }}>
                    Learn why PM33's enhancement approach beats traditional AI PM platforms
                  </Text>
                </Stack>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">5-minute read</Text>
                  <Button 
                    component={Link} 
                    href="/ai-product-management-tool" 
                    variant="gradient" 
                    gradient={{ from: 'teal', to: 'cyan' }}
                    size="sm"
                  >
                    Read Full Guide
                  </Button>
                </Group>
              </Stack>
            </Card>

            {/* AI Project Management Software Guide */}
            <Card shadow="xl" radius="xl" p={32} style={{ border: '2px solid var(--marketing-primary)' }}>
              <Stack gap={24}>
                <Group>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                    <IconTarget size={24} />
                  </ThemeIcon>
                  <Badge variant="filled" color="indigo" size="sm">COMPREHENSIVE</Badge>
                </Group>
                <Stack gap={12}>
                  <Title order={3} size="h3">AI Project Management Software: Complete 2025 Guide</Title>
                  <Text c="dimmed">
                    Traditional PM vs AI-Enhanced approaches analyzed. Market research, platform comparisons, 
                    ROI analysis, and decision frameworks for choosing the right AI PM solution.
                  </Text>
                  <Text size="sm" c="dimmed" style={{ fontStyle: 'italic' }}>
                    92% of Fortune 500 companies are adopting AI - make sure you choose wisely
                  </Text>
                </Stack>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">12-minute read</Text>
                  <Button 
                    component={Link} 
                    href="/ai-project-management-software-guide" 
                    variant="gradient" 
                    gradient={{ from: 'indigo', to: 'purple' }}
                    size="sm"
                  >
                    Read Full Guide
                  </Button>
                </Group>
              </Stack>
            </Card>
          </SimpleGrid>
        </Stack>

        {/* Featured Resources */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32} mb={64}>
          <Card shadow="xl" radius="xl" p={32} style={{ border: '2px solid var(--marketing-primary)' }}>
            <Stack gap={24}>
              <Group>
                <ThemeIcon size={48} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                  <IconBrain size={24} />
                </ThemeIcon>
                <Badge variant="filled" size="sm">Featured</Badge>
              </Group>
              <Stack gap={12}>
                <Title order={3} size="h3">Strategic PM Framework Guide</Title>
                <Text c="dimmed">
                  Complete guide to strategic product management including ICE/RICE prioritization, 
                  competitive analysis, and outcome-driven roadmapping.
                </Text>
              </Stack>
              <Button 
                component={Link} 
                href="/strategic-intelligence-demo" 
                variant="gradient" 
                gradient={{ from: 'indigo', to: 'purple' }}
                leftSection={<IconDownload size={16} />}
              >
                Try Interactive Demo
              </Button>
            </Stack>
          </Card>

          <Card shadow="xl" radius="xl" p={32} style={{ border: '2px solid var(--marketing-cta)' }}>
            <Stack gap={24}>
              <Group>
                <ThemeIcon size={48} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                  <IconTarget size={24} />
                </ThemeIcon>
                <Badge variant="filled" color="orange" size="sm">New</Badge>
              </Group>
              <Stack gap={12}>
                <Title order={3} size="h3">Command Center Walkthrough</Title>
                <Text c="dimmed">
                  See how 4 AI teams work together to transform your PM workflow with real-time 
                  strategic intelligence and automated execution.
                </Text>
              </Stack>
              <Button 
                component={Link} 
                href="/command-center-demo" 
                variant="gradient" 
                gradient={{ from: 'orange', to: 'red' }}
                leftSection={<IconVideo size={16} />}
              >
                Watch Demo
              </Button>
            </Stack>
          </Card>
        </SimpleGrid>

        {/* Resource Categories */}
        <Stack gap={48}>
          <Title order={2} ta="center">Browse by Category</Title>
          
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={24}>
            <Card shadow="md" radius="xl" p={24} ta="center" style={{ cursor: 'pointer' }}>
              <Stack align="center" gap={16}>
                <ThemeIcon size={48} variant="light" color="blue">
                  <IconFileText size={24} />
                </ThemeIcon>
                <Title order={4} size="h5">Strategic Frameworks</Title>
                <Text size="sm" c="dimmed">
                  ICE/RICE, Porter's Five Forces, Jobs-to-be-Done, and more
                </Text>
                <Text size="sm" fw={500} c="blue">12 guides</Text>
              </Stack>
            </Card>

            <Card shadow="md" radius="xl" p={24} ta="center" style={{ cursor: 'pointer' }}>
              <Stack align="center" gap={16}>
                <ThemeIcon size={48} variant="light" color="green">
                  <IconTrendingUp size={24} />
                </ThemeIcon>
                <Title order={4} size="h5">Competitive Analysis</Title>
                <Text size="sm" c="dimmed">
                  Market research, competitor tracking, and positioning strategies
                </Text>
                <Text size="sm" fw={500} c="green">8 templates</Text>
              </Stack>
            </Card>

            <Card shadow="md" radius="xl" p={24} ta="center" style={{ cursor: 'pointer' }}>
              <Stack align="center" gap={16}>
                <ThemeIcon size={48} variant="light" color="purple">
                  <IconUsers size={24} />
                </ThemeIcon>
                <Title order={4} size="h5">Stakeholder Management</Title>
                <Text size="sm" c="dimmed">
                  Communication templates, alignment strategies, executive updates
                </Text>
                <Text size="sm" fw={500} c="purple">15 templates</Text>
              </Stack>
            </Card>

            <Card shadow="md" radius="xl" p={24} ta="center" style={{ cursor: 'pointer' }}>
              <Stack align="center" gap={16}>
                <ThemeIcon size={48} variant="light" color="orange">
                  <IconVideo size={24} />
                </ThemeIcon>
                <Title order={4} size="h5">Video Tutorials</Title>
                <Text size="sm" c="dimmed">
                  Step-by-step PM33 tutorials and strategy deep-dives
                </Text>
                <Text size="sm" fw={500} c="orange">6 videos</Text>
              </Stack>
            </Card>
          </SimpleGrid>
        </Stack>

        {/* Popular Downloads */}
        <Stack gap={32} mt={64}>
          <Title order={2} ta="center">Most Downloaded This Month</Title>
          
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={24}>
            {[
              {
                title: "PM33 Strategic Analysis Template",
                description: "Ready-to-use template for strategic product decisions",
                downloads: "2,341 downloads",
                icon: IconFileText,
                color: "blue"
              },
              {
                title: "Competitive Intelligence Worksheet",
                description: "Systematic approach to competitor analysis",
                downloads: "1,847 downloads", 
                icon: IconTarget,
                color: "green"
              },
              {
                title: "Executive Summary Generator",
                description: "AI-powered executive communication templates",
                downloads: "1,623 downloads",
                icon: IconBook,
                color: "purple"
              }
            ].map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Card key={index} shadow="md" radius="lg" p={24}>
                  <Stack gap={16}>
                    <Group>
                      <ThemeIcon size={40} variant="light" color={resource.color}>
                        <IconComponent size={20} />
                      </ThemeIcon>
                    </Group>
                    <Stack gap={8}>
                      <Title order={4} size="h6">{resource.title}</Title>
                      <Text size="sm" c="dimmed">{resource.description}</Text>
                      <Text size="xs" c="dimmed">{resource.downloads}</Text>
                    </Stack>
                    <Button variant="light" size="sm" leftSection={<IconDownload size={14} />}>
                      Download
                    </Button>
                  </Stack>
                </Card>
              );
            })}
          </SimpleGrid>
        </Stack>

        {/* CTA Section - Theme Aware */}
        <Card shadow="xl" radius="xl" p={48} mt={64} style={{ 
          background: 'var(--marketing-gradient-primary)', 
          textAlign: 'center' 
        }}>
          <Stack align="center" gap={24}>
            <Title order={2} style={{ color: 'var(--marketing-text-on-gradient)' }}>Ready to Put These Strategies to Work?</Title>
            <Text size="lg" style={{ color: 'var(--marketing-text-on-gradient-secondary)' }} maw={600}>
              PM33's AI engine applies these frameworks automatically to your product decisions.
            </Text>
          </Stack>
        </Card>

      </Container>
    </Box>
  );
}