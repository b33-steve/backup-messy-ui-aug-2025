'use client';

import { Container, Title, Text, Button, Card, Group, Stack, Badge, Grid, Divider } from '@mantine/core';
import { IconMail, IconPhone, IconMessageCircle, IconCalendar, IconUsers, IconBrain, IconRocket, IconClock, IconMapPin, IconArrowRight, IconHeadset, IconTrophy } from '@tabler/icons-react';
import Link from 'next/link';

/**
 * Component: Contact - Professional Contact & Support Center
 * Route: /contact
 * Purpose: Provide multiple contact channels and support options for PM33 users and prospects
 * Target: Current users needing support, prospects with questions, enterprise inquiries
 */

export default function ContactPage() {
  const contactMethods = [
    {
      icon: IconMessageCircle,
      title: "Live Chat Support",
      description: "Get instant help from our PM experts",
      availability: "24/7 for Enterprise • Business hours for Pro",
      cta: "Start Chat",
      href: "#chat",
      color: "blue"
    },
    {
      icon: IconMail,
      title: "Email Support", 
      description: "Detailed questions and technical assistance",
      availability: "Response within 4 hours",
      cta: "Send Email",
      href: "mailto:support@pm33.ai",
      color: "green"
    },
    {
      icon: IconCalendar,
      title: "Schedule Strategy Call",
      description: "One-on-one session with PM33 strategic advisor",
      availability: "30-min sessions • Same day booking",
      cta: "Book Call",
      href: "/book-call", 
      color: "purple"
    },
    {
      icon: IconUsers,
      title: "Enterprise Sales",
      description: "Custom pricing and implementation for teams",
      availability: "Enterprise solutions specialist",
      cta: "Contact Sales",
      href: "mailto:enterprise@pm33.ai",
      color: "orange"
    }
  ];

  const supportTopics = [
    {
      category: "Getting Started",
      topics: [
        "Account setup and onboarding",
        "First-time strategic analysis", 
        "Tool integrations (Jira, Linear, etc.)",
        "AI team configuration"
      ]
    },
    {
      category: "Strategic Intelligence", 
      topics: [
        "Framework customization (ICE, RICE, Porter's)",
        "Competitive analysis setup",
        "Market positioning guidance",
        "Strategic recommendation tuning"
      ]
    },
    {
      category: "Workflow & Automation",
      topics: [
        "PM tool synchronization",
        "Automated task prioritization",
        "Cross-functional coordination",
        "Progress tracking optimization"
      ]
    },
    {
      category: "Enterprise & Teams",
      topics: [
        "Multi-team deployment",
        "Custom integrations",
        "Security and compliance", 
        "Training and adoption"
      ]
    }
  ];

  return (
    <Container size={1400} px={24} py={40}>
      
      {/* Hero Section */}
      <Stack gap={32} ta="center" mb={80}>
        <Badge
          size="lg"
          radius="xl"
          style={{
            background: 'linear-gradient(135deg, blue 0%, purple 100%)',
            color: 'white',
            border: 'none'
          }}
        >
          🗣️ Expert Support & Strategic Guidance
        </Badge>
        
        <Title order={1} size="h1" fw={700} maw={800} mx="auto">
          Get Expert Help from
          <Text
            component="span"
            inherit
            display="block"
            mt={8}
            style={{
              background: 'linear-gradient(45deg, blue 0%, purple 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            PM33 Strategic Advisors
          </Text>
        </Title>
        
        <Text size="xl" c="dimmed" maw={700} mx="auto">
          Whether you're getting started with strategic intelligence or scaling PMO capabilities 
          across your team, our PM experts are here to help you succeed.
        </Text>
      </Stack>

      {/* Contact Methods Grid */}
      <Title order={2} ta="center" mb={48} fw={700}>
        ⚡ Choose Your Preferred Contact Method
      </Title>
      
      <Grid mb={80}>
        {contactMethods.map((method, index) => (
          <Grid.Col key={index} span={{ base: 12, md: 6 }}>
            <Card padding="xl" radius="lg" shadow="lg" style={{ height: '100%', textAlign: 'center' }}>
              <Stack gap={24}>
                <div style={{ 
                  background: `linear-gradient(45deg, var(--mantine-color-${method.color}-6), var(--mantine-color-${method.color}-8))`,
                  width: 64, 
                  height: 64, 
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto'
                }}>
                  <method.icon size={32} color="white" />
                </div>
                
                <div>
                  <Title order={3} fw={700} mb={8}>{method.title}</Title>
                  <Text c="dimmed" mb={16}>{method.description}</Text>
                  <Badge size="sm" color={method.color} variant="light">
                    {method.availability}
                  </Badge>
                </div>
                
                <Button
                  component={method.href.startsWith('#') ? 'button' : method.href.startsWith('mailto:') ? 'a' : Link}
                  href={method.href.startsWith('#') ? undefined : method.href}
                  size="lg"
                  color={method.color}
                  radius="xl"
                  rightSection={<IconArrowRight size={16} />}
                >
                  {method.cta}
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Popular Support Topics */}
      <Card shadow="md" padding={48} radius={16} mb={80}>
        <Title order={2} ta="center" mb={48} fw={700}>
          🎯 Popular Support Topics
        </Title>
        
        <Grid>
          {supportTopics.map((section, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 6 }}>
              <Card padding="lg" radius="lg" shadow="sm" style={{ height: '100%' }}>
                <Title order={3} mb={16} fw={700} c="var(--marketing-primary)">
                  {section.category}
                </Title>
                <Stack gap={8}>
                  {section.topics.map((topic, idx) => (
                    <Group key={idx} gap={8}>
                      <IconArrowRight size={14} color="var(--marketing-success)" />
                      <Text size="sm">{topic}</Text>
                    </Group>
                  ))}
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Card>

      {/* Response Time Guarantee */}
      <Card shadow="md" padding={48} radius={16} mb={80}
            style={{ backgroundColor: 'var(--marketing-bg-secondary)' }}>
        <Grid align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <IconHeadset size={80} color="var(--marketing-success)" style={{ marginBottom: 24 }} />
            <Title order={2} fw={700} mb={24}>
              ✅ Guaranteed Response Times
            </Title>
            <Stack gap={16}>
              <Group>
                <Badge color="green" size="lg">Enterprise</Badge>
                <Text size="lg">24/7 Priority Support • <strong>15-minute response</strong></Text>
              </Group>
              <Group>
                <Badge color="blue" size="lg">Professional</Badge>
                <Text size="lg">Business Hours • <strong>4-hour response</strong></Text>
              </Group>
              <Group>
                <Badge color="gray" size="lg">Free Trial</Badge>
                <Text size="lg">Community Support • <strong>24-hour response</strong></Text>
              </Group>
            </Stack>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card padding="xl" radius="xl" shadow="lg">
              <Stack align="center" ta="center">
                <IconTrophy size={48} color="var(--marketing-primary)" />
                <Title order={3} fw={700}>95% Customer Satisfaction</Title>
                <Text c="dimmed" mb={24}>
                  Our PM experts consistently receive 5-star ratings for strategic guidance and technical support.
                </Text>
                <Stack gap={8} style={{ width: '100%' }}>
                  <Group justify="space-between">
                    <Text size="sm">Problem Resolution</Text>
                    <Text size="sm" fw={700}>97%</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm">Strategic Value Added</Text>
                    <Text size="sm" fw={700}>94%</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm">Response Timeliness</Text>
                    <Text size="sm" fw={700}>96%</Text>
                  </Group>
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Card>

      {/* Office Information & Community */}
      <Grid mb={80}>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card shadow="md" padding={32} radius={16} style={{ height: '100%' }}>
            <Title order={3} mb={24} fw={700}>
              🌍 Remote-First Company
            </Title>
            <Stack gap={16}>
              <Group>
                <IconMapPin size={20} />
                <Text>Distributed team across 15+ time zones</Text>
              </Group>
              <Group>
                <IconClock size={20} />
                <Text>24/7 support coverage for Enterprise customers</Text>
              </Group>
              <Group>
                <IconUsers size={20} />
                <Text>Headquarters: San Francisco, CA</Text>
              </Group>
            </Stack>
            <Divider my={24} />
            <Title order={4} mb={16}>Legal & Compliance</Title>
            <Text size="sm" c="dimmed">
              <strong>PM33 Strategic Intelligence Inc.</strong><br />
              Business Registration: Delaware, USA<br />
              SOC 2 Type II Certified • GDPR Compliant<br />
              Enterprise-grade security and privacy
            </Text>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card shadow="md" padding={32} radius={16} style={{ height: '100%' }}>
            <Title order={3} mb={24} fw={700}>
              💬 Join the PM33 Community
            </Title>
            <Stack gap={16} mb={24}>
              <Text c="dimmed">
                Connect with 2,500+ product managers using PM33 for strategic intelligence, 
                best practices, and peer learning.
              </Text>
              <Group>
                <IconUsers size={20} color="#0077B5" />
                <Text>Follow us on LinkedIn for PM insights</Text>
              </Group>
              <Group>
                <IconMessageCircle size={20} color="#1DA1F2" />
                <Text>@PM33_AI for product management tips</Text>
              </Group>
              <Group>
                <IconMessageCircle size={20} />
                <Text>Slack community for peer support</Text>
              </Group>
            </Stack>
            <Button 
              component={Link}
              href="/community"
              variant="outline"
              radius="xl"
              rightSection={<IconArrowRight size={16} />}
            >
              Join Community
            </Button>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Emergency Contact CTA */}
      <Card shadow="xl" padding={64} radius={20} 
            style={{ 
              background: 'linear-gradient(135deg, var(--marketing-primary) 0%, purple 100%)',
              color: 'white',
              textAlign: 'center'
            }}>
        <IconRocket size={64} style={{ marginBottom: 32 }} />
        <Title order={2} size="h1" fw={700} mb={24} style={{ color: 'white' }}>
          Need Immediate Strategic Assistance?
        </Title>
        
        <Text size="xl" mb={48} maw={700} mx="auto" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          For urgent strategic decisions or critical product launches, our emergency PM advisory 
          service provides same-day strategic analysis and recommendations.
        </Text>
        
        <Group justify="center" gap={24}>
          <Button 
            component={Link}
            href="/emergency-advisory"
            size="xl"
            radius="xl"
            variant="white"
            style={{ 
              fontSize: '20px',
              padding: '20px 40px',
              height: 'auto',
              color: 'var(--marketing-primary)'
            }}
            leftSection={<IconPhone size={24} />}
          >
            Emergency PM Advisory
          </Button>
          <Button 
            component={Link}
            href="/trial"
            size="xl"
            variant="outline"
            radius="xl"
            style={{ 
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'white',
              fontSize: '18px',
              padding: '18px 32px',
              height: 'auto'
            }}
            rightSection={<IconArrowRight size={20} />}
          >
            Start Free Trial
          </Button>
        </Group>
        
        <Text mt={32} style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          ⚙️ Available 24/7 for Enterprise customers
        </Text>
      </Card>
      
    </Container>
  );
}