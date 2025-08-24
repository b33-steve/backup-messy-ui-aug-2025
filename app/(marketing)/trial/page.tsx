'use client';

import React from 'react';
import { Container, Title, Text, Button, Card, Stack, Box, Badge, Center, Group } from '@mantine/core';
import { IconArrowRight, IconCheck, IconSparkles } from '@tabler/icons-react';
import Link from 'next/link';

export default function TrialPage() {
  return (
    <div className="marketing-context">
      <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>
        
        {/* Hero Section */}
        <Box 
          style={{ 
            position: 'relative',
            padding: '8rem 0 6rem 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <Container size="md">
            <Stack align="center" gap={32}>
              <Badge 
                size="lg" 
                color="white" 
                variant="light"
                leftSection={<IconSparkles size={16} />}
              >
                Start Your Free 14-Day Trial
              </Badge>
              
              <Stack align="center" gap={24}>
                <Title 
                  order={1} 
                  size="h1"
                  ta="center"
                  lh={1.1}
                  style={{ fontSize: '3.5rem', fontWeight: 800 }}
                >
                  Experience PM33 for Free
                </Title>
                
                <Text size="xl" ta="center" mw={600} lh={1.6} c="rgba(255, 255, 255, 0.9)">
                  No credit card required. Full access to all 4 AI teams. 
                  Cancel anytime. Start transforming your PM workflow today.
                </Text>
              </Stack>
              
              <Button 
                component={Link}
                href="/strategic-intelligence"
                size="xl"
                variant="white"
                color="dark"
                rightSection={<IconArrowRight size={20} />}
                style={{ 
                  borderRadius: 16,
                  fontWeight: 700,
                  fontSize: '18px',
                  padding: '16px 32px',
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3)'
                }}
              >
                Start Your Free Trial Now
              </Button>
              
              <Text size="sm" c="rgba(255, 255, 255, 0.8)" ta="center">
                Join 2,500+ product managers already using PM33
              </Text>
            </Stack>
          </Container>
        </Box>

        {/* Features Section */}
        <Box py={80}>
          <Container size="lg">
            <Stack align="center" gap={48}>
              <Title order={2} size="h2" ta="center" mb={24}>
                What's Included in Your Free Trial
              </Title>
              
              <Stack gap={24} mw={800}>
                {[
                  { icon: IconCheck, text: "Full access to Strategic Intelligence AI Team" },
                  { icon: IconCheck, text: "Complete Command Center with 4 AI teams orchestration" },
                  { icon: IconCheck, text: "50 AI operations to test all workflows" },
                  { icon: IconCheck, text: "Real strategic analysis with your data" },
                  { icon: IconCheck, text: "14-day unlimited access - no restrictions" },
                  { icon: IconCheck, text: "Email support and onboarding guidance" }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Group key={index} gap={16}>
                      <IconComponent size={24} color="var(--mantine-color-teal-6)" />
                      <Text size="lg" fw={500}>
                        {item.text}
                      </Text>
                    </Group>
                  );
                })}
              </Stack>

              <Card 
                shadow="xl" 
                radius="xl" 
                p={48}
                style={{ 
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--mantine-color-gray-2)',
                  maxWidth: 600
                }}
              >
                <Stack align="center" gap={24}>
                  <Title order={3} size="h3" ta="center" c="dark.8">
                    Ready to Transform Your PM Work?
                  </Title>
                  <Text size="lg" c="dimmed" ta="center" lh={1.6}>
                    Start with our Strategic Intelligence demo and see immediate results
                  </Text>
                  <Button 
                    component={Link}
                    href="/strategic-intelligence"
                    size="xl"
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'purple' }}
                    rightSection={<IconArrowRight size={20} />}
                    style={{ borderRadius: 16 }}
                  >
                    Begin Free Trial
                  </Button>
                </Stack>
              </Card>
            </Stack>
          </Container>
        </Box>
      </Box>
    </div>
  );
}