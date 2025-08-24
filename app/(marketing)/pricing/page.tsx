'use client';

import { Container, Title, Text, Button, Card, Group, Badge, Stack } from '@mantine/core';
import { IconCheck, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <Container size={1200} px={24} py={80}>
      <div className="marketing-context">
        
        <Stack align="center" gap={48} mb={80}>
          <Badge size="lg" color="indigo" variant="light">
            ✨ Simple, Transparent Pricing
          </Badge>
          <Title order={1} size="h1" ta="center" fw={700} style={{ fontSize: '48px' }}>
            Choose Your PM33 Plan
          </Title>
          <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6}>
            Transform your product management with AI-powered strategic intelligence. 
            Start free, upgrade when you see the value.
          </Text>
        </Stack>

        <Group justify="center" gap={32} align="stretch">
          {/* Free Plan */}
          <Card shadow="md" padding={40} radius={16} maw={400} h="100%">
            <Stack gap={24}>
              <Stack gap={8}>
                <Title order={3} size="h3" fw={600}>Free</Title>
                <Text size="lg" c="dimmed">Perfect for trying PM33</Text>
              </Stack>
              
              <Group align="baseline" gap={4}>
                <Text size="48px" fw={800}>$0</Text>
                <Text size="lg" c="dimmed">/month</Text>
              </Group>
              
              <Stack gap={12}>
                <Group gap={8}>
                  <IconCheck size={16} color="var(--mantine-color-green-6)" />
                  <Text size="sm">3 Strategic Intelligence queries</Text>
                </Group>
                <Group gap={8}>
                  <IconCheck size={16} color="var(--mantine-color-green-6)" />
                  <Text size="sm">1 Command Center session</Text>
                </Group>
                <Group gap={8}>
                  <IconCheck size={16} color="var(--mantine-color-green-6)" />
                  <Text size="sm">Basic templates</Text>
                </Group>
              </Stack>
              
              <Button 
                component={Link}
                href="/trial"
                fullWidth
                size="lg"
                variant="outline"
                color="indigo"
              >
                Start Free
              </Button>
            </Stack>
          </Card>

          {/* Pro Plan */}
          <Card shadow="lg" padding={40} radius={16} maw={400} h="100%" 
                style={{ border: '2px solid var(--mantine-color-indigo-5)' }}>
            <Badge color="indigo" variant="filled" mb={16} style={{ position: 'absolute', top: 16, right: 16 }}>
              Most Popular
            </Badge>
            
            <Stack gap={24}>
              <Stack gap={8}>
                <Title order={3} size="h3" fw={600}>Pro</Title>
                <Text size="lg" c="dimmed">For serious product teams</Text>
              </Stack>
              
              <Group align="baseline" gap={4}>
                <Text size="48px" fw={800}>$497</Text>
                <Text size="lg" c="dimmed">/month</Text>
              </Group>
              
              <Stack gap={12}>
                <Group gap={8}>
                  <IconCheck size={16} color="var(--mantine-color-indigo-6)" />
                  <Text size="sm">Unlimited Strategic Intelligence</Text>
                </Group>
                <Group gap={8}>
                  <IconCheck size={16} color="var(--mantine-color-indigo-6)" />
                  <Text size="sm">Full Command Center access</Text>
                </Group>
                <Group gap={8}>
                  <IconCheck size={16} color="var(--mantine-color-indigo-6)" />
                  <Text size="sm">4 AI Teams coordination</Text>
                </Group>
                <Group gap={8}>
                  <IconCheck size={16} color="var(--mantine-color-indigo-6)" />
                  <Text size="sm">Advanced integrations</Text>
                </Group>
                <Group gap={8}>
                  <IconCheck size={16} color="var(--mantine-color-indigo-6)" />
                  <Text size="sm">Priority support</Text>
                </Group>
              </Stack>
              
              <Button 
                component={Link}
                href="/trial"
                fullWidth
                size="lg"
                style={{ background: 'var(--pm33-brand)' }}
                rightSection={<IconArrowRight size={16} />}
              >
                Start Pro Trial
              </Button>
            </Stack>
          </Card>

          {/* Enterprise Plan */}
          <Card shadow="md" padding={40} radius={16} maw={400} h="100%">
            <Stack gap={24}>
              <Stack gap={8}>
                <Title order={3} size="h3" fw={600}>Enterprise</Title>
                <Text size="lg" c="dimmed">For larger organizations</Text>
              </Stack>
              
              <Group align="baseline" gap={4}>
                <Text size="24px" fw={600}>Custom</Text>
                <Text size="lg" c="dimmed">pricing</Text>
              </Group>
              
              <Stack gap={12}>
                <Group gap={8}>
                  <IconCheck size={16} color="var(--mantine-color-gray-6)" />
                  <Text size="sm">Everything in Pro</Text>
                </Group>
                <Group gap={8}>
                  <IconCheck size={16} color="var(--mantine-color-gray-6)" />
                  <Text size="sm">Custom integrations</Text>
                </Group>
                <Group gap={8}>
                  <IconCheck size={16} color="var(--mantine-color-gray-6)" />
                  <Text size="sm">Dedicated support</Text>
                </Group>
                <Group gap={8}>
                  <IconCheck size={16} color="var(--mantine-color-gray-6)" />
                  <Text size="sm">SLA guarantees</Text>
                </Group>
              </Stack>
              
              <Button 
                component={Link}
                href="/contact"
                fullWidth
                size="lg"
                variant="outline"
                color="gray"
              >
                Contact Sales
              </Button>
            </Stack>
          </Card>
        </Group>

      </div>
    </Container>
  );
}