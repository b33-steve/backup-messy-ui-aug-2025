'use client';

import React, { useState } from 'react';
import { Container, Card, Title, Text, Button, Stack, TextInput, Textarea, Select, Group, Box, ThemeIcon, Grid } from '@mantine/core';
import { IconMail, IconPhone, IconMapPin, IconSend, IconUsers, IconBrain, IconRocket } from '@tabler/icons-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', form);
  };

  return (
    <Box py={80} style={{ backgroundColor: 'var(--marketing-bg-primary)' }}>
      <Container size="xl">
        <Stack align="center" gap={48} mb={64}>
          <Title order={1} size="h1" ta="center" lh={1.2}>
            Let's Transform Your PM Workflow
          </Title>
          <Text size="xl" c="dimmed" ta="center" maw={600}>
            Ready to see PM33 in action? Get in touch with our team for a personalized demo.
          </Text>
        </Stack>

        <Grid gutter={48}>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="md" radius="xl" p={40}>
              <form onSubmit={handleSubmit}>
                <Stack gap={24}>
                  <Title order={2} mb={16}>Get Started Today</Title>
                  
                  <Grid gutter={16}>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="Full Name"
                        placeholder="Your full name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="Work Email"
                        placeholder="your.email@company.com"
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </Grid.Col>
                  </Grid>
                  
                  <Grid gutter={16}>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="Company"
                        placeholder="Your company name"
                        required
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Select
                        label="Role"
                        placeholder="Select your role"
                        required
                        data={[
                          'Product Manager',
                          'Senior Product Manager',
                          'VP of Product',
                          'CPO',
                          'Head of Product',
                          'Product Owner',
                          'Other'
                        ]}
                        value={form.role}
                        onChange={(value) => setForm({ ...form, role: value || '' })}
                      />
                    </Grid.Col>
                  </Grid>
                  
                  <Textarea
                    label="Tell us about your PM challenges"
                    placeholder="What specific product management challenges are you facing? How many team members do you manage?"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    leftSection={<IconSend size={20} />}
                    variant="gradient" 
                    gradient={{ from: 'indigo', to: 'purple' }}
                  >
                    Request Demo
                  </Button>
                </Stack>
              </form>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap={24}>
              {/* Contact Info */}
              <Card shadow="md" radius="xl" p={24}>
                <Stack gap={20}>
                  <Title order={3} size="h4">Get in Touch</Title>
                  
                  <Group>
                    <ThemeIcon size={40} variant="light" color="blue">
                      <IconMail size={20} />
                    </ThemeIcon>
                    <div>
                      <Text fw={600}>Email</Text>
                      <Text size="sm" c="dimmed">hello@pm33.ai</Text>
                    </div>
                  </Group>
                  
                  <Group>
                    <ThemeIcon size={40} variant="light" color="green">
                      <IconPhone size={20} />
                    </ThemeIcon>
                    <div>
                      <Text fw={600}>Schedule Call</Text>
                      <Text size="sm" c="dimmed">Book a 30-min demo</Text>
                    </div>
                  </Group>
                  
                  <Group>
                    <ThemeIcon size={40} variant="light" color="orange">
                      <IconMapPin size={20} />
                    </ThemeIcon>
                    <div>
                      <Text fw={600}>Location</Text>
                      <Text size="sm" c="dimmed">San Francisco, CA</Text>
                    </div>
                  </Group>
                </Stack>
              </Card>
              
              {/* What to Expect */}
              <Card shadow="md" radius="xl" p={24}>
                <Stack gap={16}>
                  <Title order={3} size="h4">What to Expect</Title>
                  
                  <Group>
                    <ThemeIcon size={32} variant="light" color="indigo">
                      <IconUsers size={16} />
                    </ThemeIcon>
                    <div>
                      <Text fw={500} size="sm">30-Minute Demo</Text>
                      <Text size="xs" c="dimmed">Personalized walkthrough</Text>
                    </div>
                  </Group>
                  
                  <Group>
                    <ThemeIcon size={32} variant="light" color="cyan">
                      <IconBrain size={16} />
                    </ThemeIcon>
                    <div>
                      <Text fw={500} size="sm">AI Analysis</Text>
                      <Text size="xs" c="dimmed">See PM33 analyze your workflow</Text>
                    </div>
                  </Group>
                  
                  <Group>
                    <ThemeIcon size={32} variant="light" color="teal">
                      <IconRocket size={16} />
                    </ThemeIcon>
                    <div>
                      <Text fw={500} size="sm">Implementation Plan</Text>
                      <Text size="xs" c="dimmed">Custom rollout strategy</Text>
                    </div>
                  </Group>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
        
        {/* Response Time */}
        <Card shadow="sm" radius="xl" p={24} mt={32} style={{ backgroundColor: 'var(--marketing-bg-secondary)', textAlign: 'center' }}>
          <Text size="sm" c="dimmed">
            ⚡ We typically respond within 2 hours during business hours (9AM-6PM PST)
          </Text>
        </Card>
      </Container>
    </Box>
  );
}