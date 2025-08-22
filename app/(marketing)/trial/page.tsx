'use client';

import { Container, Title, Text, Button, Card, Group, List, Stack, Badge, Grid, TextInput, Select, Checkbox } from '@mantine/core';
import { IconArrowRight, IconCheck, IconUsers, IconRocket, IconShield, IconClock, IconTrophy } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { trackCAC } from '../../../lib/posthog';

/**
 * Component: Trial Page - Professional Trial Signup
 * Route: /trial
 * Purpose: Convert visitors to trial users with comprehensive onboarding form
 * Target: Qualified prospects ready to evaluate PM33
 */

export default function TrialPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    teamSize: '',
    currentTools: [],
    communityUpdates: true
  });

  const pmTools = ['Jira', 'Monday.com', 'Asana', 'Trello', 'Notion', 'ClickUp', 'Linear', 'Other'];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate user ID for tracking (in real app, this would come from authentication)
    const userId = `trial_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Track trial signup completion for $100K MRR funnel
    trackCAC.signupCompleted(userId, 0, 'trial');
    trackCAC.trialStarted(userId, 'Professional PM');
    
    // In real implementation, this would:
    // 1. Submit form data to backend
    // 2. Create user account
    // 3. Redirect to onboarding
    alert('Trial signup tracked! In production, this would create your account and start onboarding.');
  };

  return (
    <Container size={1400} px={24} py={40}>
      
      {/* Hero Section */}
      <Stack gap={32} ta="center" mb={80}>
        <Badge
          size="lg"
          variant="gradient"
          gradient={{ from: 'green', to: 'blue' }}
          radius="xl"
        >
          🎆 Start Your Free 14-Day Trial
        </Badge>
        
        <Title order={1} size="h1" fw={700} maw={800} mx="auto">
          Transform from PM to
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: 'green', to: 'blue', deg: 45 }}
            inherit
            display="block"
            mt={8}
          >
            Strategic PMO in 14 Days
          </Text>
        </Title>
        
        <Text size="xl" c="dimmed" maw={700} mx="auto">
          No credit card required. Full access to all 4 AI teams. Join 2,500+ product managers 
          transforming how they work with strategic intelligence.
        </Text>
      </Stack>

      {/* Main Content Grid */}
      <Grid>
        {/* Left Column - Form */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card shadow="lg" padding="xl" radius="lg">
            <Title order={2} mb={24} fw={700}>
              Start Your PMO Transformation
            </Title>
            
            <form onSubmit={handleFormSubmit}>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="First Name"
                    placeholder="Enter your first name"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Last Name"
                    placeholder="Enter your last name"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </Grid.Col>
              </Grid>
              
              <TextInput
                label="Work Email"
                placeholder="your.email@company.com"
                type="email"
                required
                mt="md"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              
              <TextInput
                label="Company"
                placeholder="Your company name"
                required
                mt="md"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
              
              <Select
                label="Team Size"
                placeholder="Select your team size"
                required
                mt="md"
                data={[
                  { value: '1-5', label: '1-5 PMs' },
                  { value: '6-15', label: '6-15 PMs' },
                  { value: '16-50', label: '16-50 PMs' },
                  { value: '50+', label: '50+ PMs' }
                ]}
                value={formData.teamSize}
                onChange={(value) => setFormData({...formData, teamSize: value || ''})}
              />
              
              <Text fw={500} size="sm" mt="md" mb="xs">
                Current PM Tools (select all that apply)
              </Text>
              <Grid>
                {pmTools.map((tool, index) => (
                  <Grid.Col key={index} span={{ base: 12, sm: 6 }}>
                    <Checkbox
                      label={tool}
                      size="sm"
                    />
                  </Grid.Col>
                ))}
              </Grid>
              
              <Checkbox
                label="Keep me updated on PM community resources, templates, and insights (unsubscribe anytime)"
                size="sm"
                mt="lg"
                defaultChecked
              />
              
              <Button
                type="submit"
                size="lg"
                radius="xl"
                fullWidth
                mt="xl"
                rightSection={<IconArrowRight size={20} />}
                style={{
                  fontSize: '18px',
                  padding: '16px 32px',
                  height: 'auto'
                }}
              >
                Start Free 14-Day Trial
              </Button>
              
              <Text size="xs" c="dimmed" ta="center" mt="md">
                By starting your trial, you agree to our{' '}
                <Text component={Link} href="/privacy" c="var(--marketing-primary)" td="underline">Terms of Service</Text>
                {' '}and{' '}
                <Text component={Link} href="/privacy" c="var(--marketing-primary)" td="underline">Privacy Policy</Text>
              </Text>
            </form>
          </Card>
        </Grid.Col>

        {/* Right Column - Benefits */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card shadow="lg" padding="xl" radius="lg" style={{ backgroundColor: 'var(--marketing-bg-secondary)' }}>
            <Title order={2} mb={24} fw={700}>
              ✨ What You'll Get in Your Trial
            </Title>

            <Stack gap={24}>
              {[
                {
                  icon: IconRocket,
                  title: "Full Platform Access",
                  description: "Connect all your PM tools and start generating strategic AI insights immediately"
                },
                {
                  icon: IconUsers,
                  title: "Personal Onboarding Call",
                  description: "30-minute setup session to configure PM33 for your specific workflow and tools"
                },
                {
                  icon: IconShield,
                  title: "Community Access",
                  description: "Join our PM community for peer learning, exclusive templates, and best practices"
                },
                {
                  icon: IconTrophy,
                  title: "Success Guarantee",
                  description: "If you don't save 60% of your routine PM time, we'll extend your trial at no cost"
                }
              ].map((benefit, index) => (
                <Group key={index} align="flex-start">
                  <div style={{
                    background: 'linear-gradient(45deg, var(--marketing-success) 0%, var(--marketing-primary) 100%)',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <benefit.icon size={20} color="white" />
                  </div>
                  <div>
                    <Text fw={600} mb={4}>{benefit.title}</Text>
                    <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                      {benefit.description}
                    </Text>
                  </div>
                </Group>
              ))}
            </Stack>

            <Card shadow="sm" padding="lg" radius="lg" mt={32}>
              <Group>
                <IconUsers size={32} color="var(--marketing-primary)" />
                <div>
                  <Text fw={700} size="lg">Join 2,500+ PMs</Text>
                  <Text size="sm" c="dimmed">Already transforming with PM33</Text>
                </div>
              </Group>
            </Card>

            <Card shadow="sm" padding="lg" radius="lg" mt={16}
                  style={{ backgroundColor: 'var(--marketing-success-light)' }}>
              <Title order={4} size="sm" fw={700} mb={8} c="var(--marketing-success)">
                🎁 Community Bonus
              </Title>
              <Text size="sm">
                Trial users get exclusive access to our PM templates library and weekly 
                community calls with senior product managers.
              </Text>
            </Card>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Social Proof */}
      <Card shadow="md" padding={48} radius={16} mt={80} mb={40}>
        <Title order={2} ta="center" mb={32} fw={700}>
          🏆 Trusted by Leading Product Teams
        </Title>
        
        <Grid>
          {[
            { metric: "2,500+", label: "Product Managers", icon: IconUsers },
            { metric: "72hrs", label: "Monthly time saved per PM", icon: IconClock },
            { metric: "89%", label: "Continue after trial", icon: IconTrophy },
            { metric: "95%", label: "Satisfaction rating", icon: IconCheck }
          ].map((stat, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 3 }}>
              <Stack align="center" ta="center">
                <stat.icon size={40} color="var(--marketing-primary)" />
                <Text size="2xl" fw={900} c="var(--marketing-primary)">{stat.metric}</Text>
                <Text size="sm" c="dimmed" fw={600}>{stat.label}</Text>
              </Stack>
            </Grid.Col>
          ))}
        </Grid>
      </Card>

      {/* Risk Reversal */}
      <Card shadow="xl" padding={48} radius={20}
            style={{ 
              background: 'linear-gradient(135deg, var(--marketing-success) 0%, var(--marketing-primary) 100%)',
              color: 'white',
              textAlign: 'center'
            }}>
        <IconShield size={64} style={{ marginBottom: 24 }} />
        <Title order={2} size="h1" fw={700} mb={24} style={{ color: 'white' }}>
          Zero Risk. Maximum Transformation.
        </Title>
        
        <Text size="xl" mb={48} maw={800} mx="auto" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          14 days free. No credit card required. 30-day money-back guarantee. 
          Keep all strategic documents forever.
        </Text>
        
        <Group justify="center" gap={24}>
          <Button 
            component={Link}
            href="#trial-form"
            size="xl"
            radius="xl"
            variant="white"
            style={{ 
              fontSize: '20px',
              padding: '20px 40px',
              height: 'auto',
              color: 'var(--marketing-primary)'
            }}
            leftSection={<IconRocket size={24} />}
          >
            Start Trial Now
          </Button>
        </Group>
        
        <Text mt={32} style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          🚀 Transform in 14 days or less — Guaranteed
        </Text>
      </Card>
      
    </Container>
  );
}