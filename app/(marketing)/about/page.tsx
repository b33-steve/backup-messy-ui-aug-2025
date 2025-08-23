/**
 * Component: About Page - PM33 Company Story, Culture & Philosophy
 * Purpose: Comprehensive company information with culture, careers, and philosophy 
 * Context: Marketing conversion and talent acquisition
 * RELEVANT FILES: components/shared/Navigation.tsx, app/(marketing)/layout.tsx
 */

'use client';

import { Container, Title, Text, Grid, Card, Button, Badge, Stack, Group, List, ThemeIcon } from '@mantine/core';
import { IconRocket, IconBrain, IconUsers, IconTarget, IconTrendingUp, IconHeart, IconBulb, IconCode } from '@tabler/icons-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="marketing-context">
      {/* Temporarily simplified for build - full content coming soon */}
      <Container size={1200} px={24} py={48}>
        <Title order={1} ta="center" mb="lg">About PM33</Title>
        <Text ta="center" size="lg">Coming soon - full about page with company story</Text>
      </Container>
    </div>
  );
}

function AboutPageFullContent() {
  return (
    <div className="marketing-context">
      <Container size={1200} px={24} py={48}>
        {/* Hero Section */}
        <Stack align="center" mb={80}>
          <Badge size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
            About PM33
          </Badge>
          <Title order={1} size="48px" fw={700} ta="center">
            Built by PMs, For PMs
          </Title>
          <Text size="xl" ta="center" maw={800} c="dimmed">
            We're on a mission to transform individual Product Managers into fully functional PMOs through AI-powered strategic intelligence
          </Text>
        </Stack>

        {/* Company Story */}
        <Card shadow="sm" padding="xl" radius="lg" mb={60}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Title order={2} mb="lg">Our Story</Title>
              <Text mb="md">
                PM33 was born from a simple frustration: spending 80% of our time on tactical busywork instead of strategic thinking. 
                As experienced Product Managers, we knew there had to be a better way.
              </Text>
              <Text mb="md">
                We didn't want to replace the tools we already loved. Instead, we built the AI brain that makes every PM tool 10x smarter. 
                PM33 transforms individual Product Managers into strategic PMOs with four specialized AI teams working around the clock.
              </Text>
              <Text>
                Today, over 2,500 product managers reclaim 75% of their time for strategic work, making better decisions with AI-powered 
                intelligence that spans strategic frameworks, competitive analysis, and cross-functional coordination.
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card padding="lg" style={{ backgroundColor: 'rgba(102, 126, 234, 0.1)' }}>
                <Stack>
                  <Group>
                    <IconTrendingUp size={32} color="var(--marketing-primary)" />
                    <div>
                      <Text fw={700} size="lg">$100K MRR Target</Text>
                      <Text size="sm" c="dimmed">EOY 2025 Growth Goal</Text>
                    </div>
                  </Group>
                  <Group>
                    <IconUsers size={32} color="var(--marketing-success)" />
                    <div>
                      <Text fw={700} size="lg">2,500+ PMs</Text>
                      <Text size="sm" c="dimmed">Transformed into Strategic Leaders</Text>
                    </div>
                  </Group>
                  <Group>
                    <IconBrain size={32} color="var(--marketing-cta)" />
                    <div>
                      <Text fw={700} size="lg">4 AI Teams</Text>
                      <Text size="sm" c="dimmed">Strategic, Workflow, Data, Communication</Text>
                    </div>
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Company Philosophy */}
        <Stack mb={80}>
          <Title order={2} ta="center">Our Philosophy</Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card shadow="sm" padding="xl" h="100%">
                <Stack align="center" ta="center">
                  <ThemeIcon size={48} radius="md" color="blue">
                    <IconBulb size={24} />
                  </ThemeIcon>
                  <Title order={3} size="h4">Think Hard, Write Short</Title>
                  <Text size="sm" c="dimmed">
                    Deep strategic thinking with concise, impactful execution. Every feature decision backed by rigorous analysis, 
                    delivered with elegant simplicity.
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card shadow="sm" padding="xl" h="100%">
                <Stack align="center" ta="center">
                  <ThemeIcon size={48} radius="md" color="green">
                    <IconTarget size={24} />
                  </ThemeIcon>
                  <Title order={3} size="h4">Update Before Create</Title>
                  <Text size="sm" c="dimmed">
                    Enhance and optimize existing workflows before building new ones. We believe in making what works better, 
                    not reinventing everything from scratch.
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card shadow="sm" padding="xl" h="100%">
                <Stack align="center" ta="center">
                  <ThemeIcon size={48} radius="md" color="orange">
                    <IconHeart size={24} />
                  </ThemeIcon>
                  <Title order={3} size="h4">PM Success First</Title>
                  <Text size="sm" c="dimmed">
                    Every decision optimized for PM success. We measure our success by how much strategic time we return to 
                    Product Managers worldwide.
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Stack>

        {/* Culture & Values */}
        <Card shadow="md" padding="xl" radius="lg" mb={80}>
          <Title order={2} ta="center" mb="xl">Our Culture</Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Title order={3} mb="md">Core Values</Title>
              <List spacing="sm" size="sm">
                <List.Item>
                  <Text><strong>Strategic First:</strong> Every feature must enhance strategic thinking, not just operational efficiency</Text>
                </List.Item>
                <List.Item>
                  <Text><strong>Quality Over Speed:</strong> Industry-leading solutions built for long-term success</Text>
                </List.Item>
                <List.Item>
                  <Text><strong>PM Empathy:</strong> Built by PMs who understand the daily challenges and strategic pressures</Text>
                </List.Item>
                <List.Item>
                  <Text><strong>Continuous Learning:</strong> Self-improving AI systems that evolve with user needs</Text>
                </List.Item>
                <List.Item>
                  <Text><strong>Transparent Growth:</strong> Open about our journey from startup to PMO transformation leader</Text>
                </List.Item>
              </List>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Title order={3} mb="md">Work Environment</Title>
              <Text mb="md">
                <strong>Remote-First:</strong> Distributed team of PM experts and AI engineers working across time zones
              </Text>
              <Text mb="md">
                <strong>Asynchronous Collaboration:</strong> Deep work blocks with strategic alignment sessions
              </Text>
              <Text mb="md">
                <strong>Outcome-Focused:</strong> Measured by PM transformation success, not hours logged
              </Text>
              <Text>
                <strong>Continuous Improvement:</strong> Weekly retrospectives and monthly strategic planning sessions
              </Text>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Careers Section */}
        <Card shadow="md" padding="xl" radius="lg" mb={80} style={{ backgroundColor: 'rgba(102, 126, 234, 0.05)' }}>
          <Stack align="center" ta="center" mb="xl">
            <IconCode size={48} color="var(--marketing-primary)" />
            <Title order={2}>Join Our Mission</Title>
            <Text size="lg" maw={600}>
              Help us transform Product Management through AI. We're looking for passionate builders who understand 
              the strategic challenges PMs face every day.
            </Text>
          </Stack>
          
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="sm" padding="lg">
                <Title order={4} mb="sm">Senior AI Engineer</Title>
                <Text size="sm" c="dimmed" mb="md">Build multi-AI orchestration systems</Text>
                <Badge size="sm" color="blue">Remote</Badge>
                <Badge size="sm" color="green" ml="xs">Full-time</Badge>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="sm" padding="lg">
                <Title order={4} mb="sm">Product Strategy Lead</Title>
                <Text size="sm" c="dimmed" mb="md">Define PMO transformation strategies</Text>
                <Badge size="sm" color="blue">Remote</Badge>
                <Badge size="sm" color="green" ml="xs">Full-time</Badge>
              </Card>
            </Grid.Col>
          </Grid>
          
          <Group justify="center" mt="xl">
            <Button 
              size="lg"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              component={Link}
              href="/contact"
              leftSection={<IconRocket size={20} />}
            >
              View All Positions
            </Button>
          </Group>
        </Card>

        {/* Leadership Team */}
        <Stack mb={80}>
          <Title order={2} ta="center">Leadership Team</Title>
          <Text ta="center" maw={600} mx="auto" c="dimmed" mb="xl">
            Former Product Managers from high-growth startups and Fortune 500 companies, 
            united by the mission to eliminate PM busywork through AI.
          </Text>
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card shadow="sm" padding="lg" ta="center">
                <Title order={4} mb="xs">Strategic Vision</Title>
                <Text size="sm" c="dimmed" mb="sm">Former PM, 8+ years strategic product leadership</Text>
                <Text size="sm">
                  "Every PM deserves PMO-level strategic capabilities. That's what we're building."
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card shadow="sm" padding="lg" ta="center">
                <Title order={4} mb="xs">Technical Excellence</Title>
                <Text size="sm" c="dimmed" mb="sm">AI/ML Engineer, 10+ years distributed systems</Text>
                <Text size="sm">
                  "Multi-AI orchestration is the key to transforming individual PMs into strategic leaders."
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card shadow="sm" padding="lg" ta="center">
                <Title order={4} mb="xs">Product Operations</Title>
                <Text size="sm" c="dimmed" mb="sm">Former PMO Director, enterprise transformation</Text>
                <Text size="sm">
                  "We're not just building software - we're reimagining how Product Management works."
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Stack>

        {/* CTA Section */}
        <Card 
          shadow="xl" 
          padding="xl" 
          radius="lg" 
          ta="center"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <Group justify="center" mb="lg">
            <IconUsers size={32} />
            <Title order={2} c="white">Ready to Join the PMO Transformation?</Title>
          </Group>
          <Text size="lg" mb="lg" opacity={0.9}>
            Experience how PM33's AI teams transform individual PMs into strategic PMO leaders
          </Text>
          <Group justify="center">
            <Button 
              size="lg"
              variant="white"
              color="dark"
              component={Link}
              href="/trial"
              leftSection={<IconRocket size={20} />}
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg"
              variant="outline"
              style={{ borderColor: 'white', color: 'white' }}
              component={Link}
              href="/contact"
              leftSection={<IconHeart size={20} />}
            >
              Get In Touch
            </Button>
          </Group>
        </Card>
      </Container>
    </div>
  );
}