'use client';

import { Container, Card, Title, Text, Button, Grid, TextInput, Textarea } from '@mantine/core';
import { IconMail, IconPhone, IconMapPin, IconSend } from '@tabler/icons-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: IconMail,
      title: 'Email Us',
      content: 'hello@pm33.ai',
      description: 'Get in touch for sales, support, or partnership opportunities'
    },
    {
      icon: IconPhone,
      title: 'Schedule a Call',
      content: 'Book a Demo',
      description: 'See PM33 in action with a personalized demo'
    },
    {
      icon: IconMapPin,
      title: 'Headquarters',
      content: 'San Francisco, CA',
      description: 'Building the future of product management'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to an API
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="marketing-context">
      <Container size={1200} px={24} py={80}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Title 
            order={1} 
            size="3.5rem" 
            fw={700}
            c="var(--marketing-text-primary)"
            mb={24}
          >
            Get in Touch
          </Title>
          <Text 
            size="xl" 
            c="var(--marketing-text-secondary)"
            maw={600}
            mx="auto"
            mb={48}
          >
            Ready to transform your product management with AI? Let's discuss how PM33 can help your team achieve PMO-level strategic capabilities.
          </Text>
        </div>

        <Grid>
          {/* Contact Information */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <div style={{ marginBottom: '2rem' }}>
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  shadow="sm"
                  padding={24}
                  radius={16}
                  mb={24}
                  style={{
                    backgroundColor: 'var(--marketing-bg-primary)',
                    border: '1px solid rgba(0,0,0,0.08)'
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--marketing-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem'
                    }}
                  >
                    <info.icon size={20} color="white" />
                  </div>
                  
                  <Title order={4} c="var(--marketing-text-primary)" mb={8}>
                    {info.title}
                  </Title>
                  <Text fw={600} c="var(--marketing-primary)" mb={8}>
                    {info.content}
                  </Text>
                  <Text size="sm" c="var(--marketing-text-secondary)">
                    {info.description}
                  </Text>
                </Card>
              ))}
            </div>
          </Grid.Col>

          {/* Contact Form */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card
              shadow="md"
              padding={48}
              radius={16}
              style={{
                backgroundColor: 'var(--marketing-bg-primary)',
                border: '1px solid rgba(0,0,0,0.08)'
              }}
            >
              <Title order={2} c="var(--marketing-text-primary)" mb={32}>
                Send Us a Message
              </Title>
              
              <form onSubmit={handleSubmit}>
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Full Name"
                      placeholder="Your name"
                      required
                      size="lg"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.currentTarget.value)}
                      styles={{
                        label: { color: 'var(--marketing-text-primary)', fontWeight: 600 },
                        input: {
                          backgroundColor: 'var(--marketing-bg-secondary)',
                          border: '1px solid rgba(0,0,0,0.1)',
                          color: 'var(--marketing-text-primary)'
                        }
                      }}
                    />
                  </Grid.Col>
                  
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Email Address"
                      placeholder="your@email.com"
                      required
                      type="email"
                      size="lg"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.currentTarget.value)}
                      styles={{
                        label: { color: 'var(--marketing-text-primary)', fontWeight: 600 },
                        input: {
                          backgroundColor: 'var(--marketing-bg-secondary)',
                          border: '1px solid rgba(0,0,0,0.1)',
                          color: 'var(--marketing-text-primary)'
                        }
                      }}
                    />
                  </Grid.Col>
                  
                  <Grid.Col span={12}>
                    <TextInput
                      label="Company"
                      placeholder="Your company name"
                      size="lg"
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.currentTarget.value)}
                      styles={{
                        label: { color: 'var(--marketing-text-primary)', fontWeight: 600 },
                        input: {
                          backgroundColor: 'var(--marketing-bg-secondary)',
                          border: '1px solid rgba(0,0,0,0.1)',
                          color: 'var(--marketing-text-primary)'
                        }
                      }}
                    />
                  </Grid.Col>
                  
                  <Grid.Col span={12}>
                    <Textarea
                      label="Message"
                      placeholder="Tell us about your product management challenges and how we can help..."
                      required
                      rows={6}
                      size="lg"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.currentTarget.value)}
                      styles={{
                        label: { color: 'var(--marketing-text-primary)', fontWeight: 600 },
                        input: {
                          backgroundColor: 'var(--marketing-bg-secondary)',
                          border: '1px solid rgba(0,0,0,0.1)',
                          color: 'var(--marketing-text-primary)'
                        }
                      }}
                    />
                  </Grid.Col>
                  
                  <Grid.Col span={12}>
                    <Button
                      type="submit"
                      size="lg"
                      leftSection={<IconSend size={16} />}
                      style={{
                        backgroundColor: 'var(--marketing-primary)',
                        color: 'white',
                        marginTop: '1rem'
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid.Col>
                </Grid>
              </form>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}