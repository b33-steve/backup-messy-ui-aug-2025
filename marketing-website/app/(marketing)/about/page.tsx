'use client';

import React from 'react';
import { Container, Card, Title, Text, Button, Group, Stack, Badge, SimpleGrid, Avatar, Box, Grid } from '@mantine/core';
import { IconTarget, IconUsers, IconBrain, IconTrendingUp } from '@tabler/icons-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Box className="marketing-context" py={80} style={{ backgroundColor: 'var(--marketing-bg-primary)' }}>
      <Container size="xl">
        <Stack align="center" gap={48} mb={64}>
          <Badge size="lg" variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
            About PM33
          </Badge>
          
          <Stack align="center" gap={24}>
            <Title order={1} size="h1" ta="center" lh={1.2}>
              Transforming Product Management with AI
            </Title>
            <Text size="xl" className="marketing-text-secondary" ta="center" maw={800}>
              PM33 was born from the frustration of spending 80% of PM time on busywork instead of strategy. 
              We're building the AI brain that makes every PM tool 10x smarter.
            </Text>
          </Stack>
        </Stack>

        {/* Mission Section */}
        <Grid gutter={48} mb={80}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap={24}>
              <Badge size="md" variant="light" color="blue">Our Mission</Badge>
              <Title order={2} size="h2" className="marketing-text-primary">
                Every PM Should Focus on Strategy, Not Busywork
              </Title>
              <Text size="lg" className="marketing-text-secondary" lh={1.6}>
                Product Managers are the strategic hearts of technology companies, yet most spend their days 
                writing documents, chasing updates, and managing spreadsheets instead of driving product vision.
              </Text>
              <Text size="lg" className="marketing-text-secondary" lh={1.6}>
                PM33 transforms your existing PM tools—Jira, Linear, Monday.com, Asana—into AI-powered 
                strategic engines. No migration headaches, just immediate productivity gains.
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card className="marketing-glass-card" shadow="md" radius="xl" p={32}>
              <Stack gap={24}>
                <IconBrain size={48} color="var(--marketing-primary)" />
                <Title order={3} className="marketing-text-primary">The PM33 Difference</Title>
                <SimpleGrid cols={2} spacing={16}>
                  <div>
                    <Text fw={600} c="indigo">78%</Text>
                    <Text size="sm" c="dimmed">Faster delivery</Text>
                  </div>
                  <div>
                    <Text fw={600} c="teal">$2.3M</Text>
                    <Text size="sm" c="dimmed">Revenue impact</Text>
                  </div>
                  <div>
                    <Text fw={600} c="orange">65%</Text>
                    <Text size="sm" c="dimmed">Less admin work</Text>
                  </div>
                  <div>
                    <Text fw={600} c="purple">2,500+</Text>
                    <Text size="sm" c="dimmed">PMs using PM33</Text>
                  </div>
                </SimpleGrid>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Values Section */}
        <Stack align="center" gap={32} mb={64}>
          <Title order={2} ta="center">Our Values</Title>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32}>
            <Card shadow="md" radius="xl" p={32} ta="center">
              <Stack align="center" gap={16}>
                <IconTarget size={48} color="var(--marketing-primary)" />
                <Title order={3} size="h4">Strategy First</Title>
                <Text c="dimmed">
                  Every feature we build asks: does this help PMs make better strategic decisions faster?
                </Text>
              </Stack>
            </Card>
            <Card shadow="md" radius="xl" p={32} ta="center">
              <Stack align="center" gap={16}>
                <IconUsers size={48} color="var(--marketing-primary)" />
                <Title order={3} size="h4">No Migration Pain</Title>
                <Text c="dimmed">
                  We enhance your existing tools instead of forcing costly, disruptive migrations.
                </Text>
              </Stack>
            </Card>
            <Card shadow="md" radius="xl" p={32} ta="center">
              <Stack align="center" gap={16}>
                <IconTrendingUp size={48} color="var(--marketing-primary)" />
                <Title order={3} size="h4">Measurable Impact</Title>
                <Text c="dimmed">
                  Every AI recommendation comes with confidence scores and predicted business outcomes.
                </Text>
              </Stack>
            </Card>
          </SimpleGrid>
        </Stack>

        {/* Team Section */}
        <Stack align="center" gap={32} mb={64}>
          <Title order={2} ta="center">Built by Product Leaders</Title>
          <Text size="lg" c="dimmed" ta="center" maw={600}>
            Our team combines decades of product management experience with cutting-edge AI research.
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={24}>
            {[
              { name: "Sarah Chen", role: "CEO & Co-Founder", experience: "Ex-Google PM, 12 years" },
              { name: "Marcus Kim", role: "CTO & Co-Founder", experience: "Ex-OpenAI, ML Research" },
              { name: "Alex Rivera", role: "Head of Product", experience: "Ex-Stripe, Growth PM" },
              { name: "Jordan Liu", role: "Head of AI", experience: "Ex-Anthropic, AI Safety" }
            ].map((member, index) => (
              <Card key={index} shadow="md" radius="xl" p={24} ta="center">
                <Stack align="center" gap={12}>
                  <Avatar size={64} radius="xl" />
                  <div>
                    <Text fw={600}>{member.name}</Text>
                    <Text size="sm" c="dimmed">{member.role}</Text>
                    <Text size="xs" c="dimmed">{member.experience}</Text>
                  </div>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>

        {/* CTA Section */}
        <Card shadow="xl" radius="xl" p={48} style={{ backgroundColor: 'var(--marketing-primary)', textAlign: 'center' }}>
          <Stack align="center" gap={24}>
            <Title order={2} c="white">Ready to Transform Your PM Work?</Title>
            <Text size="lg" c="rgba(255, 255, 255, 0.9)" maw={600}>
              Join thousands of product managers who've reclaimed their time for strategic thinking.
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
                href="/strategic-intelligence" 
                size="lg" 
                variant="outline"
                style={{ borderColor: 'white', color: 'white' }}
              >
                See Live Demo
              </Button>
            </Group>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}