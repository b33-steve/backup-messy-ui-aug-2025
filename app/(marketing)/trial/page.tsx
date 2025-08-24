'use client';

import React, { useState } from 'react';
import { Container, Card, Title, Text, Button, Stack, TextInput, Group, Box, Badge, SimpleGrid, List, ThemeIcon, Grid } from '@mantine/core';
import { IconCheck, IconUsers, IconBrain, IconRocket, IconMail, IconBuilding, IconUser, IconSparkles } from '@tabler/icons-react';

export default function TrialPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle trial signup
    console.log('Trial signup:', form);
  };

  return (
    <Box py={80} style={{ backgroundColor: 'var(--marketing-bg-primary)' }}>
      <Container size="lg">
        <Stack align="center" gap={48} mb={48}>
          <Badge size="lg" variant="gradient" gradient={{ from: 'indigo', to: 'purple' }} leftSection={<IconSparkles size={16} />}>
            Start Your Free 14-Day Trial
          </Badge>
          
          <Stack align="center" gap={24}>
            <Title order={1} size="h1" ta="center" lh={1.2} maw={800}>
              Transform Your PM Workflow in Under 5 Minutes
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={600}>
              No credit card required. No setup fees. Start using PM33's Strategic Intelligence Engine immediately.
            </Text>
          </Stack>
        </Stack>

        <Grid gutter={48}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card shadow="xl" radius="xl" p={40}>
              <form onSubmit={handleSubmit}>
                <Stack gap={24}>
                  <Stack gap={16}>
                    <Title order={2} size="h3">Create Your Account</Title>
                    <Text c="dimmed">Get started with PM33 in seconds</Text>
                  </Stack>
                  
                  <TextInput
                    label="Full Name"
                    placeholder="Your full name"
                    required
                    leftSection={<IconUser size={16} />}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  
                  <TextInput
                    label="Work Email"
                    placeholder="your.email@company.com"
                    required
                    type="email"
                    leftSection={<IconMail size={16} />}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  
                  <TextInput
                    label="Company"
                    placeholder="Your company name"
                    required
                    leftSection={<IconBuilding size={16} />}
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                  
                  <Button 
                    type="submit" 
                    size="xl" 
                    variant="gradient" 
                    gradient={{ from: 'indigo', to: 'purple' }}
                    rightSection={<IconRocket size={20} />}
                    fullWidth
                  >
                    Start My Free Trial
                  </Button>
                  
                  <Stack gap={8} align="center">
                    <Group gap={24}>
                      <Group gap={8}>
                        <IconCheck size={16} color="var(--mantine-color-teal-6)" />
                        <Text size="sm" c="dimmed">No credit card</Text>
                      </Group>
                      <Group gap={8}>
                        <IconCheck size={16} color="var(--mantine-color-teal-6)" />
                        <Text size="sm" c="dimmed">14-day trial</Text>
                      </Group>
                      <Group gap={8}>
                        <IconCheck size={16} color="var(--mantine-color-teal-6)" />
                        <Text size="sm" c="dimmed">Cancel anytime</Text>
                      </Group>
                    </Group>
                  </Stack>
                </Stack>
              </form>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap={32}>
              <Card shadow="md" radius="xl" p={32}>
                <Stack gap={20}>
                  <Group>
                    <ThemeIcon size={48} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                      <IconBrain size={24} />
                    </ThemeIcon>
                    <Title order={3} size="h4">What You Get Instantly</Title>
                  </Group>
                  
                  <List spacing="sm" size="sm" icon={<ThemeIcon size={20} radius="xl"><IconCheck size={12} /></ThemeIcon>}>
                    <List.Item><strong>Strategic Intelligence Engine</strong> - AI-powered analysis framework</List.Item>
                    <List.Item><strong>50 AI Analysis Requests</strong> - Perfect for testing with your real data</List.Item>
                    <List.Item><strong>Basic Integrations</strong> - Connect Jira, Linear, or Monday.com</List.Item>
                    <List.Item><strong>Email Support</strong> - Get help when you need it</List.Item>
                    <List.Item><strong>Live Demo Access</strong> - Experience all features interactively</List.Item>
                  </List>
                </Stack>
              </Card>
              
              <Card shadow="md" radius="xl" p={24} style={{ backgroundColor: 'var(--marketing-bg-secondary)' }}>
                <Stack gap={16}>
                  <Title order={4} size="h5">Join 2,500+ Product Managers</Title>
                  <SimpleGrid cols={3} spacing={16}>
                    <div style={{ textAlign: 'center' }}>
                      <Text fw={700} size="lg" c="indigo">78%</Text>
                      <Text size="xs" c="dimmed">Faster delivery</Text>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Text fw={700} size="lg" c="teal">$2.3M</Text>
                      <Text size="xs" c="dimmed">Revenue impact</Text>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Text fw={700} size="lg" c="orange">65%</Text>
                      <Text size="xs" c="dimmed">Less busywork</Text>
                    </div>
                  </SimpleGrid>
                </Stack>
              </Card>
              
              <Card shadow="sm" radius="lg" p={20} style={{ border: '1px solid var(--marketing-text-muted)' }}>
                <Group gap={12}>
                  <IconSparkles size={20} color="var(--marketing-primary)" />
                  <Text size="sm" c="dimmed">
                    <strong>Pro tip:</strong> Start with a strategic question you're working on right now. 
                    PM33's AI will analyze it using multiple frameworks and give you actionable insights.
                  </Text>
                </Group>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
        
        {/* Testimonial */}
        <Card shadow="md" radius="xl" p={32} mt={48} style={{ backgroundColor: 'var(--marketing-bg-secondary)', textAlign: 'center' }}>
          <Stack align="center" gap={16}>
            <Text size="lg" style={{ fontStyle: 'italic' }}>
              "I was skeptical about another PM tool, but PM33 actually enhanced my existing workflow instead of disrupting it. 
              The strategic insights are incredible."
            </Text>
            <Text fw={600} size="sm" c="indigo">
              — Sarah Chen, VP Product at TechFlow
            </Text>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}