'use client';

import React, { useState, useEffect } from 'react';
import { trackCAC } from '../../../lib/posthog';
import { Container, Title, Text, Card, Stack, Badge, Button, Group, SimpleGrid, Grid, ThemeIcon } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

export default function ContactPage() {
  const [selectedForm, setSelectedForm] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: '',
    inquiry: 'general'
  });

  const contactMethods = [
    {
      id: 'sales',
      title: 'Sales & Demos',
      email: 'sales@pm33.ai',
      description: 'Ready to see PM33 in action? Book a personalized demo.',
      icon: '🚀',
      color: 'indigo',
      response: '&lt; 2 hours'
    },
    {
      id: 'support',
      title: 'Customer Support',
      email: 'support@pm33.ai',
      description: 'Need help with your PM33 account or features?',
      icon: '🛟',
      color: 'blue',
      response: '&lt; 4 hours'
    },
    {
      id: 'partnerships',
      title: 'Partnerships',
      email: 'partnerships@pm33.ai',
      description: 'Explore integration opportunities and strategic partnerships.',
      icon: '🤝',
      color: 'green',
      response: '1-2 business days'
    },
    {
      id: 'press',
      title: 'Press & Media',
      email: 'press@pm33.ai',
      description: 'Media inquiries and press kit requests.',
      icon: '📰',
      color: 'purple',
      response: '1 business day'
    }
  ];

  useEffect(() => {
    // Track contact page views
    if (window.posthog) {
      window.posthog.capture('contact_page_viewed', {
        referrer: document.referrer,
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission for lead generation analytics
    trackCAC.signupStarted(`contact_${formData.inquiry}`, window.location.href);
    
    if (window.posthog) {
      window.posthog.capture('contact_form_submitted', {
        inquiry_type: formData.inquiry,
        company: formData.company,
        role: formData.role,
        has_company: !!formData.company,
        message_length: formData.message.length,
      });
    }

    // Handle actual form submission here
    console.log('Form submitted:', formData);
  };

  const handleLiveChatClick = () => {
    if (window.posthog) {
      window.posthog.capture('live_chat_clicked', {
        page: 'contact',
        location: 'sidebar',
      });
    }
  };

  return (
    <div className="marketing-context">
      <Container size="xl" py={80}>
        {/* Header */}
        <Stack align="center" gap={32} mb={64}>
          <Badge 
            size="lg" 
            variant="gradient" 
            gradient={{ from: 'indigo.1', to: 'purple.1' }}
            c="indigo.7"
          >
            💬 Let's Connect
          </Badge>
          
          <Title 
            order={1} 
            size="h1"
            ta="center"
            lh={1.1}
            style={{ 
              fontWeight: 800,
              color: 'var(--mantine-color-dark-8)',
              maxWidth: 800
            }}
          >
            Ready to Transform Your
            <Text 
              span 
              variant="gradient" 
              gradient={{ from: 'indigo', to: 'cyan' }}
              style={{ display: 'block', marginTop: 8 }}
            >
              Product Management?
            </Text>
          </Title>
          
          <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6}>
            Choose how you'd like to connect. We're here to help you achieve PMO-level strategic capabilities with AI.
          </Text>
        </Stack>

        {/* Contact Methods */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={24} mb={64}>
          {contactMethods.map((method) => (
            <Card 
              key={method.id}
              shadow="md" 
              radius="xl" 
              p={24}
              style={{
                backgroundColor: 'white',
                border: `1px solid var(--mantine-color-${method.color}-2)`,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              className="hover:shadow-xl hover:translate-y-[-2px]"
              onClick={() => setSelectedForm(method.id)}
            >
              <Stack gap={16}>
                <Group>
                  <ThemeIcon size={48} variant="light" color={method.color}>
                    <Text size="xl">{method.icon}</Text>
                  </ThemeIcon>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Text fw={700} size="sm">{method.title}</Text>
                    <Badge size="xs" color={method.color} variant="light">
                      {method.response}
                    </Badge>
                  </Stack>
                </Group>
                
                <Text size="sm" c="dimmed" lh={1.4}>
                  {method.description}
                </Text>
                
                <Text size="xs" fw={600} c={`${method.color}.6`}>
                  {method.email}
                </Text>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>

        <Grid gutter={48}>
          {/* Contact Form */}
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Card shadow="xl" radius="xl" p={48}>
              <Stack gap={32}>
                <Stack gap={16}>
                  <Title order={2} size="h3">
                    Send Us a Message
                  </Title>
                  <Text c="dimmed" lh={1.6}>
                    Tell us about your product management challenges. We'll get back to you with personalized insights and solutions.
                  </Text>
                </Stack>

                <form onSubmit={handleSubmit}>
                  <Stack gap={24}>
                    <Group gap={16} grow>
                      <div>
                        <Text size="sm" fw={500} mb={8}>Full Name *</Text>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '1px solid var(--mantine-color-gray-3)',
                            borderRadius: '8px',
                            fontSize: '14px'
                          }}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <Text size="sm" fw={500} mb={8}>Work Email *</Text>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '1px solid var(--mantine-color-gray-3)',
                            borderRadius: '8px',
                            fontSize: '14px'
                          }}
                          placeholder="you@company.com"
                          required
                        />
                      </div>
                    </Group>

                    <Group gap={16} grow>
                      <div>
                        <Text size="sm" fw={500} mb={8}>Company</Text>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '1px solid var(--mantine-color-gray-3)',
                            borderRadius: '8px',
                            fontSize: '14px'
                          }}
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <Text size="sm" fw={500} mb={8}>Role</Text>
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '1px solid var(--mantine-color-gray-3)',
                            borderRadius: '8px',
                            fontSize: '14px'
                          }}
                        >
                          <option value="">Select your role</option>
                          <option value="product-manager">Product Manager</option>
                          <option value="senior-pm">Senior Product Manager</option>
                          <option value="director">Director of Product</option>
                          <option value="vp">VP Product</option>
                          <option value="founder">Founder/CEO</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </Group>

                    <div>
                      <Text size="sm" fw={500} mb={8}>Inquiry Type</Text>
                      <select
                        value={formData.inquiry}
                        onChange={(e) => setFormData({...formData, inquiry: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid var(--mantine-color-gray-3)',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="demo">Schedule Demo</option>
                        <option value="pricing">Pricing Questions</option>
                        <option value="integration">Integration Support</option>
                        <option value="enterprise">Enterprise Solutions</option>
                        <option value="partnership">Partnership Opportunity</option>
                      </select>
                    </div>

                    <div>
                      <Text size="sm" fw={500} mb={8}>Message *</Text>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={6}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid var(--mantine-color-gray-3)',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontFamily: 'inherit',
                          resize: 'vertical'
                        }}
                        placeholder="Tell us about your product management challenges, team size, current tools, and what you're hoping to achieve with AI..."
                        required
                      />
                    </div>

                    <Button 
                      type="submit"
                      size="lg"
                      variant="gradient"
                      gradient={{ from: 'indigo', to: 'purple' }}
                      rightSection={<IconArrowRight size={20} />}
                      fullWidth
                    >
                      Send Message
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Card>
          </Grid.Col>

          {/* Quick Chat & Resources */}
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <Stack gap={24}>
              {/* Live Chat */}
              <Card shadow="md" radius="xl" p={32}>
                <Stack gap={20}>
                  <Group>
                    <ThemeIcon size={48} variant="gradient" gradient={{ from: 'green', to: 'teal' }}>
                      <Text size="xl">💬</Text>
                    </ThemeIcon>
                    <Stack gap={4} style={{ flex: 1 }}>
                      <Text fw={700} size="lg">Quick Chat</Text>
                      <Badge size="sm" color="green" variant="light">
                        🟢 Available now
                      </Badge>
                    </Stack>
                  </Group>
                  
                  <Text c="dimmed" lh={1.6}>
                    Need immediate help? Chat with our product specialists. Average response time: 2 minutes.
                  </Text>
                  
                  <Button 
                    variant="light" 
                    color="green"
                    fullWidth
                    leftSection={<Text size="md">💬</Text>}
                    onClick={handleLiveChatClick}
                  >
                    Start Live Chat
                  </Button>
                </Stack>
              </Card>

              {/* Resources */}
              <Card shadow="md" radius="xl" p={32}>
                <Stack gap={20}>
                  <Group>
                    <ThemeIcon size={48} variant="light" color="blue">
                      <Text size="xl">📚</Text>
                    </ThemeIcon>
                    <Text fw={700} size="lg">Resources</Text>
                  </Group>
                  
                  <Stack gap={12}>
                    <Button 
                      variant="subtle" 
                      color="blue" 
                      size="sm"
                      fullWidth
                      justify="flex-start"
                      component={Link}
                      href="/resources"
                    >
                      📖 PM Framework Library
                    </Button>
                    <Button 
                      variant="subtle" 
                      color="blue" 
                      size="sm"
                      fullWidth
                      justify="flex-start"
                      component={Link}
                      href="/strategic-intelligence"
                    >
                      🎯 Strategic Intelligence Demo
                    </Button>
                    <Button 
                      variant="subtle" 
                      color="blue" 
                      size="sm"
                      fullWidth
                      justify="flex-start"
                      component={Link}
                      href="/command-center"
                    >
                      ⚡ Command Center Demo
                    </Button>
                  </Stack>
                </Stack>
              </Card>

              {/* Office Hours */}
              <Card shadow="md" radius="xl" p={32}>
                <Stack gap={20}>
                  <Group>
                    <ThemeIcon size={48} variant="light" color="purple">
                      <Text size="xl">🕒</Text>
                    </ThemeIcon>
                    <Text fw={700} size="lg">Office Hours</Text>
                  </Group>
                  
                  <Stack gap={8}>
                    <Text size="sm" fw={500}>Monday - Friday</Text>
                    <Text size="sm" c="dimmed">6:00 AM - 6:00 PM PST</Text>
                    <Text size="sm" fw={500}>Response Times</Text>
                    <Text size="sm" c="dimmed">Email: &lt; 4 hours</Text>
                    <Text size="sm" c="dimmed">Live Chat: &lt; 2 minutes</Text>
                  </Stack>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}