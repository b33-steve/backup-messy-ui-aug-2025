'use client';

import React from 'react';
import { Container, Title, Text, Card, Stack, Badge, Button, Group, SimpleGrid, Box } from '@mantine/core';
import { IconBrain, IconRocket, IconUsers, IconTrendingUp } from '@tabler/icons-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="marketing-context">
      <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>
        
        {/* Hero Section */}
        <Box 
          style={{ 
            position: 'relative',
            padding: '4rem 0',
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
            overflow: 'hidden'
          }}
        >
          <Container size="xl">
            <Stack align="center" gap={32}>
              <Badge 
                size="lg" 
                variant="gradient" 
                gradient={{ from: 'indigo.1', to: 'purple.1' }}
                c="indigo.7"
                leftSection={<IconBrain size={16} />}
              >
                About PM33
              </Badge>
              
              <Stack align="center" gap={16}>
                <Title 
                  order={1} 
                  size="h1"
                  lh={1.1}
                  ta="center"
                  style={{ 
                    fontWeight: 800,
                    color: 'var(--mantine-color-dark-8)'
                  }}
                >
                  We're Democratizing
                  <Text 
                    span 
                    variant="gradient" 
                    gradient={{ from: 'indigo', to: 'cyan' }}
                    style={{ display: 'block', marginTop: 8 }}
                  >
                    Strategic Product Management
                  </Text>
                </Title>
                
                <Text size="xl" c="dimmed" lh={1.6} ta="center" maw={800}>
                  Every PM deserves PMO-level strategic capabilities. We're building the AI platform 
                  that transforms individual contributors into strategic leaders, regardless of company 
                  size or budget.
                </Text>
              </Stack>
              
              <Group gap={16}>
                <Button 
                  component={Link}
                  href="/trial"
                  size="lg"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'purple' }}
                  leftSection={<IconRocket size={18} />}
                >
                  Start Free Trial
                </Button>
                <Button 
                  component={Link}
                  href="/contact"
                  size="lg"
                  variant="outline"
                  c="indigo.7"
                >
                  Get in Touch
                </Button>
              </Group>
            </Stack>
          </Container>
        </Box>

        {/* Stats Section */}
        <Box py={64} bg="white">
          <Container size="xl">
            <SimpleGrid cols={{ base: 2, md: 4 }} spacing={32}>
              <Card shadow="xl" radius="xl" p={24}>
                <Stack align="center" gap={16}>
                  <IconUsers size={48} color="var(--mantine-color-indigo-6)" />
                  <Stack align="center" gap={4}>
                    <Text size="24px" fw={700} c="indigo.6">2,500+</Text>
                    <Text size="sm" c="dimmed" ta="center">Product Managers</Text>
                  </Stack>
                </Stack>
              </Card>
              
              <Card shadow="xl" radius="xl" p={24}>
                <Stack align="center" gap={16}>
                  <IconTrendingUp size={48} color="var(--mantine-color-teal-6)" />
                  <Stack align="center" gap={4}>
                    <Text size="24px" fw={700} c="teal.6">300%</Text>
                    <Text size="sm" c="dimmed" ta="center">Productivity Boost</Text>
                  </Stack>
                </Stack>
              </Card>
              
              <Card shadow="xl" radius="xl" p={24}>
                <Stack align="center" gap={16}>
                  <IconBrain size={48} color="var(--mantine-color-orange-6)" />
                  <Stack align="center" gap={4}>
                    <Text size="24px" fw={700} c="orange.6">4</Text>
                    <Text size="sm" c="dimmed" ta="center">AI Teams</Text>
                  </Stack>
                </Stack>
              </Card>
              
              <Card shadow="xl" radius="xl" p={24}>
                <Stack align="center" gap={16}>
                  <IconRocket size={48} color="var(--mantine-color-green-6)" />
                  <Stack align="center" gap={4}>
                    <Text size="24px" fw={700} c="green.6">85%</Text>
                    <Text size="sm" c="dimmed" ta="center">Success Rate</Text>
                  </Stack>
                </Stack>
              </Card>
            </SimpleGrid>
          </Container>
        </Box>

        {/* Mission */}
        <Box py={64} bg="gray.0">
          <Container size="xl">
            <Stack align="center" gap={48}>
              <Stack align="center" gap={16}>
                <Badge size="lg" color="indigo" variant="light">
                  🎯 Our Mission
                </Badge>
                <Title order={2} size="h2" ta="center" maw={800}>
                  From Individual Contributors to Strategic Leaders
                </Title>
              </Stack>
              
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={48}>
                <Card shadow="xl" radius="xl" p={32} bg="indigo.0" style={{ border: '1px solid var(--mantine-color-indigo-2)' }}>
                  <Stack gap={24}>
                    <Title order={3} size="h3" c="indigo.8">
                      The Problem We're Solving
                    </Title>
                    <Text c="dimmed" lh={1.6}>
                      60-80% of PM time goes to administrative busywork instead of strategic thinking. 
                      Writing PRDs, synthesizing feedback, creating presentations—all manually.
                    </Text>
                    <Text c="dimmed" lh={1.6}>
                      Meanwhile, strategic opportunities slip by. Competitors ship faster because their 
                      PMs focus on strategy while yours handle admin tasks.
                    </Text>
                  </Stack>
                </Card>
                
                <Card shadow="xl" radius="xl" p={32} bg="teal.0" style={{ border: '1px solid var(--mantine-color-teal-2)' }}>
                  <Stack gap={24}>
                    <Title order={3} size="h3" c="teal.8">
                      Our Solution
                    </Title>
                    <Text c="dimmed" lh={1.6}>
                      PM33 provides 4 specialized AI teams that handle the busywork: Strategic Intelligence, 
                      Workflow Execution, Data Analysis, and Communication.
                    </Text>
                    <Text c="dimmed" lh={1.6}>
                      Transform from reactive task-handler to strategic leader in weeks. Focus on vision, 
                      strategy, and market opportunities—not administrative overhead.
                    </Text>
                  </Stack>
                </Card>
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>

        {/* CTA */}
        <Box py={96} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Container size="md">
            <Stack align="center" gap={32}>
              <Stack align="center" gap={16}>
                <Badge size="lg" color="white" variant="light">
                  💫 Experience PM33
                </Badge>
                <Title order={2} size="h2" c="white" ta="center">
                  Ready to Transform Your PM Work?
                </Title>
                <Text size="lg" c="rgba(255, 255, 255, 0.9)" ta="center" maw={600}>
                  Join 2,500+ product managers who've made the leap from busywork to strategic leadership.
                </Text>
              </Stack>
              
              <Group gap={16}>
                <Button 
                  size="xl"
                  variant="white"
                  color="dark"
                  leftSection={<IconRocket size={20} />}
                  component={Link}
                  href="/trial"
                >
                  Start Free 14-Day Trial
                </Button>
                <Button 
                  size="xl"
                  variant="outline"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.3)', color: 'white' }}
                  component={Link}
                  href="/contact"
                >
                  Get in Touch
                </Button>
              </Group>
              
              <Text size="sm" c="rgba(255, 255, 255, 0.8)">
                ✅ No credit card required • ✅ Setup in 5 minutes • ✅ Cancel anytime
              </Text>
            </Stack>
          </Container>
        </Box>

      </Box>
    </div>
  );
}