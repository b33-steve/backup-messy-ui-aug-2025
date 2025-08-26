'use client';

import React from 'react';
import { Container, Card, Title, Text, Button, Stack, Badge, SimpleGrid, Group, Box, ThemeIcon } from '@mantine/core';
import { IconBook, IconVideo, IconDownload, IconBrain, IconTarget, IconTrendingUp, IconUsers, IconFileText } from '@tabler/icons-react';
import Link from 'next/link';

export default function ResourcesPage() {
  return (
    <Box py={80} style={{ backgroundColor: 'var(--marketing-bg-primary)' }}>
      <Container size="xl">
        <Stack align="center" gap={48} mb={64}>
          <Badge size="lg" variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
            PM Resources
          </Badge>
          
          <Stack align="center" gap={24}>
            <Title order={1} size="h1" ta="center" lh={1.2}>
              Strategic PM Resources & Guides
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={600}>
              Learn advanced product management strategies, frameworks, and best practices from industry experts.
            </Text>
          </Stack>
        </Stack>

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

        {/* CTA Section */}
        <Card shadow="xl" radius="xl" p={48} mt={64} style={{ backgroundColor: 'var(--marketing-primary)', textAlign: 'center' }}>
          <Stack align="center" gap={24}>
            <Title order={2} c="white">Ready to Put These Strategies to Work?</Title>
            <Text size="lg" c="rgba(255, 255, 255, 0.9)" maw={600}>
              PM33's AI engine applies these frameworks automatically to your product decisions.
            </Text>
            <Group gap={16}>
              <Button 
                component={Link} 
                href="/trial" 
                size="lg" 
                variant="white" 
                color="dark"
              >
                Start Free Trial
              </Button>
              <Button 
                component={Link} 
                href="/strategic-intelligence-demo" 
                size="lg" 
                variant="outline"
                style={{ borderColor: 'white', color: 'white' }}
              >
                See AI in Action
              </Button>
            </Group>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}