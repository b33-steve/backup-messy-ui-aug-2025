'use client';

import { Container, Title, Text, Button, Card, Group, Stack, Badge, TextInput, Textarea } from '@mantine/core';
import { IconMail, IconPhone, IconMapPin, IconSend } from '@tabler/icons-react';

export default function ContactPage() {
  return (
    <Container size={1200} px={24} py={80}>
      <div className="marketing-context">
        
        <Stack align="center" gap={48} mb={80}>
          <Badge size="lg" color="indigo" variant="light">
            📞 Get in Touch
          </Badge>
          <Title order={1} size="h1" ta="center" fw={700} style={{ fontSize: '48px' }}>
            Contact Our Team
          </Title>
          <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6}>
            Ready to transform your product management with AI? Get in touch with our team 
            for a personalized demo and consultation.
          </Text>
        </Stack>

        <Group align="start" gap={48}>
          {/* Contact Form */}
          <Card shadow="lg" padding={40} radius={16} style={{ flex: 2 }}>
            <Title order={2} size="h3" mb={32}>Send us a message</Title>
            
            <Stack gap={24}>
              <Group grow>
                <TextInput 
                  label="First Name" 
                  placeholder="Your first name"
                  size="lg"
                />
                <TextInput 
                  label="Last Name" 
                  placeholder="Your last name"
                  size="lg"
                />
              </Group>
              
              <TextInput 
                label="Email" 
                placeholder="your@company.com"
                size="lg"
              />
              
              <TextInput 
                label="Company" 
                placeholder="Your company name"
                size="lg"
              />
              
              <Textarea 
                label="Message" 
                placeholder="Tell us about your product management challenges..."
                minRows={4}
                size="lg"
              />
              
              <Button 
                size="lg"
                style={{ background: 'var(--pm33-brand)' }}
                rightSection={<IconSend size={16} />}
              >
                Send Message
              </Button>
            </Stack>
          </Card>

          {/* Contact Info */}
          <Card shadow="md" padding={40} radius={16} style={{ flex: 1 }}>
            <Title order={2} size="h3" mb={32}>Get in touch</Title>
            
            <Stack gap={32}>
              <Group gap={16}>
                <div style={{ 
                  padding: 12, 
                  borderRadius: 12, 
                  background: 'rgba(99, 102, 241, 0.1)' 
                }}>
                  <IconMail size={24} color="var(--mantine-color-indigo-6)" />
                </div>
                <Stack gap={4}>
                  <Text fw={600}>Email</Text>
                  <Text size="sm" c="dimmed">hello@pm33.ai</Text>
                </Stack>
              </Group>

              <Group gap={16}>
                <div style={{ 
                  padding: 12, 
                  borderRadius: 12, 
                  background: 'rgba(99, 102, 241, 0.1)' 
                }}>
                  <IconPhone size={24} color="var(--mantine-color-indigo-6)" />
                </div>
                <Stack gap={4}>
                  <Text fw={600}>Phone</Text>
                  <Text size="sm" c="dimmed">+1 (555) 123-4567</Text>
                </Stack>
              </Group>

              <Group gap={16}>
                <div style={{ 
                  padding: 12, 
                  borderRadius: 12, 
                  background: 'rgba(99, 102, 241, 0.1)' 
                }}>
                  <IconMapPin size={24} color="var(--mantine-color-indigo-6)" />
                </div>
                <Stack gap={4}>
                  <Text fw={600}>Office</Text>
                  <Text size="sm" c="dimmed">
                    San Francisco, CA<br />
                    Remote-first team
                  </Text>
                </Stack>
              </Group>
            </Stack>

            <Card mt={32} p={24} radius={12} style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
              <Text size="sm" fw={600} mb={8}>Response Time</Text>
              <Text size="sm" c="dimmed">
                We typically respond within 24 hours during business days.
              </Text>
            </Card>
          </Card>
        </Group>

      </div>
    </Container>
  );
}