'use client';

import React from 'react';
import { Container, Card, Title, Text, Button, Stack, Box } from '@mantine/core';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <Box py={80} style={{ backgroundColor: 'var(--marketing-bg-primary)' }}>
      <Container size="xl">
        <Stack align="center" gap={48} mb={64}>
          <Title order={1} size="h1" ta="center" lh={1.2}>
            Choose Your PM Transformation Plan
          </Title>
          <Text size="xl" c="dimmed" ta="center" maw={600}>
            Start free, upgrade when you're ready. All plans include our core AI capabilities.
          </Text>
        </Stack>

        <Stack gap={32}>
          {/* Free Trial */}
          <Card shadow="md" radius="xl" p={32}>
            <Stack gap={24}>
              <Title order={3} size="h3">Free Trial</Title>
              <Text size="xl" fw={700}>$0</Text>
              <Text size="sm" c="dimmed">14 days, no credit card</Text>
              
              <Stack gap={8}>
                <Text size="sm">• Strategic Intelligence Engine</Text>
                <Text size="sm">• Up to 50 AI analysis requests</Text>
                <Text size="sm">• Basic integrations (Jira, Linear)</Text>
                <Text size="sm">• Email support</Text>
              </Stack>
              
              <Button component={Link} href="/trial" size="lg" variant="outline" fullWidth>
                Start Free Trial
              </Button>
            </Stack>
          </Card>

          {/* Professional */}
          <Card shadow="xl" radius="xl" p={32} style={{ border: '2px solid var(--marketing-primary)' }}>
            <Stack gap={24}>
              <Title order={3} size="h3">Professional</Title>
              <Text size="xl" fw={700}>$497/month</Text>
              <Text size="sm" c="dimmed">Perfect for growing teams</Text>
              
              <Stack gap={8}>
                <Text size="sm">• Everything in Free Trial</Text>
                <Text size="sm">• Unlimited AI analysis requests</Text>
                <Text size="sm">• 4 AI Teams coordination</Text>
                <Text size="sm">• Advanced integrations</Text>
                <Text size="sm">• Priority support</Text>
              </Stack>
              
              <Button component={Link} href="/trial" size="lg" variant="filled" fullWidth>
                Get Started Now
              </Button>
            </Stack>
          </Card>

          {/* Enterprise */}
          <Card shadow="md" radius="xl" p={32}>
            <Stack gap={24}>
              <Title order={3} size="h3">Enterprise</Title>
              <Text size="xl" fw={700}>Custom</Text>
              <Text size="sm" c="dimmed">Tailored for your needs</Text>
              
              <Stack gap={8}>
                <Text size="sm">• Everything in Professional</Text>
                <Text size="sm">• Custom AI model training</Text>
                <Text size="sm">• Dedicated account manager</Text>
                <Text size="sm">• On-premise deployment</Text>
                <Text size="sm">• 24/7 white-glove support</Text>
              </Stack>
              
              <Button component={Link} href="/contact" size="lg" variant="outline" fullWidth>
                Contact Sales
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}