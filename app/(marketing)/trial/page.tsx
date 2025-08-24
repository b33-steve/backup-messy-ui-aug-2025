'use client';

import { Container, Title, Text, Button, Card, Group, Stack, Badge, TextInput, Checkbox } from '@mantine/core';
import { IconRocket, IconCheck, IconShield } from '@tabler/icons-react';

export default function TrialPage() {
  return (
    <Container size={1200} px={24} py={80}>
      <div className="marketing-context">
        
        <Stack align="center" gap={48} mb={80}>
          <Badge size="lg" color="green" variant="light">
            🚀 Start Your Free Trial
          </Badge>
          <Title order={1} size="h1" ta="center" fw={700} style={{ fontSize: '48px' }}>
            Try PM33 Free for 14 Days
          </Title>
          <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6}>
            Experience the full power of AI-driven product management. No credit card required, 
            no commitment, full access to all features.
          </Text>
        </Stack>

        <Group align="start" gap={48} justify="center">
          {/* Trial Form */}
          <Card shadow="lg" padding={48} radius={16} maw={500}>
            <Stack align="center" gap={32}>
              <div style={{ textAlign: 'center' }}>
                <Title order={2} size="h3" mb={16}>Create Your Account</Title>
                <Text c="dimmed">Get started with PM33 in less than 2 minutes</Text>
              </div>
              
              <Stack gap={24} w="100%">
                <Group grow>
                  <TextInput 
                    label="First Name" 
                    placeholder="John"
                    size="lg"
                  />
                  <TextInput 
                    label="Last Name" 
                    placeholder="Smith"
                    size="lg"
                  />
                </Group>
                
                <TextInput 
                  label="Work Email" 
                  placeholder="john@company.com"
                  size="lg"
                />
                
                <TextInput 
                  label="Company" 
                  placeholder="Your company name"
                  size="lg"
                />
                
                <Checkbox 
                  label="I agree to the Terms of Service and Privacy Policy"
                  size="md"
                />
                
                <Button 
                  size="xl"
                  fullWidth
                  h={56}
                  style={{ background: 'var(--pm33-brand)' }}
                  rightSection={<IconRocket size={20} />}
                >
                  Start Free Trial
                </Button>
              </Stack>

              <Group gap={8} style={{ fontSize: '14px', color: 'var(--mantine-color-dimmed)' }}>
                <IconShield size={16} />
                <Text size="sm" c="dimmed">No credit card required</Text>
              </Group>
            </Stack>
          </Card>

          {/* Benefits */}
          <Card shadow="md" padding={48} radius={16} maw={400}>
            <Title order={3} size="h4" mb={32}>What you get:</Title>
            
            <Stack gap={24}>
              <Group gap={12}>
                <IconCheck size={18} color="var(--mantine-color-green-6)" />
                <Text size="sm">Full access to Strategic Intelligence Engine</Text>
              </Group>
              
              <Group gap={12}>
                <IconCheck size={18} color="var(--mantine-color-green-6)" />
                <Text size="sm">Complete Command Center experience</Text>
              </Group>
              
              <Group gap={12}>
                <IconCheck size={18} color="var(--mantine-color-green-6)" />
                <Text size="sm">4 AI Teams coordination</Text>
              </Group>
              
              <Group gap={12}>
                <IconCheck size={18} color="var(--mantine-color-green-6)" />
                <Text size="sm">Unlimited strategic queries</Text>
              </Group>
              
              <Group gap={12}>
                <IconCheck size={18} color="var(--mantine-color-green-6)" />
                <Text size="sm">Email support</Text>
              </Group>
              
              <Group gap={12}>
                <IconCheck size={18} color="var(--mantine-color-green-6)" />
                <Text size="sm">Export all generated content</Text>
              </Group>
            </Stack>

            <Card mt={32} p={24} radius={12} style={{ backgroundColor: 'var(--mantine-color-green-0)' }}>
              <Text size="sm" fw={600} c="green.7" mb={8}>Money-back guarantee</Text>
              <Text size="sm" c="green.6">
                If you're not satisfied within 30 days, we'll refund every penny.
              </Text>
            </Card>
          </Card>
        </Group>

      </div>
    </Container>
  );
}