'use client';

import React from 'react';
import { Container, Title, Text, Card, Stack, Badge, Button, Group, SimpleGrid, Box, Grid, ThemeIcon, Avatar, Anchor } from '@mantine/core';
import { IconBrain, IconRocket, IconUsers, IconTrendingUp, IconAward, IconLinkedin, IconBrandTwitter, IconMail, IconBuildingSkyscraper, IconCode, IconChartBar, IconShield, IconTarget } from '@tabler/icons-react';
import Link from 'next/link';

export default function ComprehensiveAboutPage() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Co-Founder & CEO",
      bio: "Former VP of Product at scale-up unicorn. Led product strategy for 200+ person teams. Stanford MBA, ex-McKinsey consultant.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen"
    },
    {
      name: "Marcus Rodriguez", 
      role: "Co-Founder & CTO",
      bio: "Ex-Google Staff Engineer, built ML systems at scale. 15+ years building AI-powered products. MIT Computer Science.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/marcusrod",
      twitter: "https://twitter.com/marcusrod"
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of AI Strategy",
      bio: "Former Principal Data Scientist at Microsoft. PhD in Machine Learning from Carnegie Mellon. Published researcher in strategic AI.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face", 
      linkedin: "https://linkedin.com/in/emilywatson",
      twitter: "https://twitter.com/emilywatson"
    },
    {
      name: "Alex Kim",
      role: "VP of Product",
      bio: "Former Senior PM at Atlassian, built Jira Product Discovery. Expert in PM tools and workflows. University of California Berkeley.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/alexkim",
      twitter: "https://twitter.com/alexkim"
    }
  ];

  const advisors = [
    {
      name: "David Park",
      role: "Strategic Advisor",
      company: "Former CPO at Notion",
      bio: "Scaled Notion from startup to $10B valuation. Expert in product-led growth and AI integration."
    },
    {
      name: "Lisa Johnson",
      role: "Go-to-Market Advisor", 
      company: "Former VP Sales at Productboard",
      bio: "Led global expansion and enterprise sales. Deep expertise in PMO transformation sales cycles."
    }
  ];

  const milestones = [
    { year: "2023", event: "Founded PM33 with $2M seed funding", icon: IconRocket },
    { year: "2024", event: "Launched beta with 500+ PM testers", icon: IconUsers },
    { year: "2024", event: "Reached $100K ARR in first 6 months", icon: IconTrendingUp },
    { year: "2024", event: "2,500+ product managers using platform", icon: IconTarget },
    { year: "2025", event: "Series A funding & enterprise expansion", icon: IconBuildingSkyscraper }
  ];

  return (
    <div className="marketing-context">
      <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>

        {/* Hero Section */}
        <Box 
          style={{ 
            position: 'relative',
            padding: '4rem 0',
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
            overflow: 'hidden'
          }}
        >
          <Container size="xl">
            <Grid gutter={48} align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap={32}>
                  <Badge 
                    size="lg" 
                    variant="gradient" 
                    gradient={{ from: 'indigo.1', to: 'purple.1' }}
                    c="indigo.7"
                    leftSection={<IconBrain size={16} />}
                  >
                    About PM33
                  </Badge>
                  
                  <Stack gap={16}>
                    <Title 
                      order={1} 
                      size="h1"
                      lh={1.1}
                      style={{ 
                        fontWeight: 800,
                        color: 'var(--mantine-color-dark-8)'
                      }}
                    >
                      We're Building the Future of
                      <Text 
                        span 
                        variant="gradient" 
                        gradient={{ from: 'indigo', to: 'cyan' }}
                        style={{ display: 'block', marginTop: 8 }}
                      >
                        Strategic Product Management
                      </Text>
                    </Title>
                    
                    <Text size="xl" c="dimmed" lh={1.6}>
                      Founded by product leaders who experienced the pain of being strategic thinkers 
                      trapped in administrative work. We're democratizing PMO-level strategic 
                      capabilities for every Product Manager.
                    </Text>
                  </Stack>
                  
                  <Group gap={16}>
                    <Button 
                      component={Link}
                      href="/trial"
                      size="lg"
                      variant="gradient"
                      gradient={{ from: 'indigo', to: 'purple' }}
                      leftSection={<IconRocket size={18} />}
                    >
                      Join Our Mission
                    </Button>
                    <Button 
                      component={Link}
                      href="/contact"
                      size="lg"
                      variant="outline"
                      c="indigo.7"
                      leftSection={<IconMail size={18} />}
                    >
                      Get in Touch
                    </Button>
                  </Group>
                </Stack>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 6 }}>
                <SimpleGrid cols={2} spacing={16}>
                  <Card shadow="xl" radius="xl" p={24}>
                    <Stack align="center" gap={16}>
                      <ThemeIcon size={48} color="indigo" variant="light">
                        <IconUsers size={24} />
                      </ThemeIcon>
                      <Stack align="center" gap={4}>
                        <Text size="24px" fw={700} c="indigo.6">2,500+</Text>
                        <Text size="sm" c="dimmed" ta="center">Product Managers</Text>
                      </Stack>
                    </Stack>
                  </Card>
                  
                  <Card shadow="xl" radius="xl" p={24}>
                    <Stack align="center" gap={16}>
                      <ThemeIcon size={48} color="teal" variant="light">
                        <IconTrendingUp size={24} />
                      </ThemeIcon>
                      <Stack align="center" gap={4}>
                        <Text size="24px" fw={700} c="teal.6">300%</Text>
                        <Text size="sm" c="dimmed" ta="center">Productivity Increase</Text>
                      </Stack>
                    </Stack>
                  </Card>
                  
                  <Card shadow="xl" radius="xl" p={24}>
                    <Stack align="center" gap={16}>
                      <ThemeIcon size={48} color="orange" variant="light">
                        <IconBrain size={24} />
                      </ThemeIcon>
                      <Stack align="center" gap={4}>
                        <Text size="24px" fw={700} c="orange.6">4</Text>
                        <Text size="sm" c="dimmed" ta="center">AI Teams</Text>
                      </Stack>
                    </Stack>
                  </Card>
                  
                  <Card shadow="xl" radius="xl" p={24}>
                    <Stack align="center" gap={16}>
                      <ThemeIcon size={48} color="green" variant="light">
                        <IconAward size={24} />
                      </ThemeIcon>
                      <Stack align="center" gap={4}>
                        <Text size="24px" fw={700} c="green.6">85%</Text>
                        <Text size="sm" c="dimmed" ta="center">Success Rate</Text>
                      </Stack>
                    </Stack>
                  </Card>
                </SimpleGrid>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>

        {/* Mission & Vision */}
        <Box py={64} bg="white">
          <Container size="xl">
            <Stack align="center" gap={48} mb={64}>
              <Stack align="center" gap={16}>
                <Badge size="lg" color="indigo" variant="light">
                  🎯 Our Mission
                </Badge>
                <Title order={2} size="h2" ta="center" maw={800}>
                  Democratizing Strategic Intelligence for Every Product Manager
                </Title>
              </Stack>
            </Stack>
            
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={48}>
              <Card shadow="xl" radius="xl" p={32} bg="indigo.0" style={{ border: '1px solid var(--mantine-color-indigo-2)' }}>
                <Stack gap={24}>
                  <ThemeIcon size={56} color="indigo" variant="light">
                    <IconTarget size={28} />
                  </ThemeIcon>
                  <Stack gap={16}>
                    <Title order={3} size="h3" c="indigo.8">
                      The Problem We're Solving
                    </Title>
                    <Text c="dimmed" lh={1.6}>
                      Product Managers spend 60-80% of their time on administrative work instead of strategy. 
                      Writing PRDs, synthesizing feedback, creating presentations—all manually. Meanwhile, 
                      their strategic thinking potential remains untapped.
                    </Text>
                    <Text c="dimmed" lh={1.6}>
                      Competitors ship 40% faster because their PMs focus on strategy while yours are 
                      buried in busywork.
                    </Text>
                  </Stack>
                </Stack>
              </Card>
              
              <Card shadow="xl" radius="xl" p={32} bg="teal.0" style={{ border: '1px solid var(--mantine-color-teal-2)' }}>
                <Stack gap={24}>
                  <ThemeIcon size={56} color="teal" variant="light">
                    <IconRocket size={28} />
                  </ThemeIcon>
                  <Stack gap={16}>
                    <Title order={3} size="h3" c="teal.8">
                      Our Solution
                    </Title>
                    <Text c="dimmed" lh={1.6}>
                      PM33 gives every PM their own PMO through 4 specialized AI teams: Strategic 
                      Intelligence, Workflow Execution, Data Intelligence, and Communication.
                    </Text>
                    <Text c="dimmed" lh={1.6}>
                      Transform from individual contributor to strategic leader in weeks, not years. 
                      Focus on what matters: strategic thinking, not administrative overhead.
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            </SimpleGrid>
          </Container>
        </Box>

        {/* Leadership Team */}
        <Box py={64} bg="gray.0">
          <Container size="xl">
            <Stack align="center" gap={48} mb={64}>
              <Stack align="center" gap={16}>
                <Badge size="lg" color="purple" variant="light">
                  👥 Leadership Team
                </Badge>
                <Title order={2} size="h2" ta="center">
                  Built by Product Leaders, for Product Leaders
                </Title>
                <Text size="lg" c="dimmed" ta="center" maw={600}>
                  Our team combines decades of product management experience with cutting-edge AI expertise.
                </Text>
              </Stack>
            </Stack>
            
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32}>
              {teamMembers.map((member, index) => (
                <Card key={index} shadow="xl" radius="xl" p={32} h="100%">
                  <Stack gap={24}>
                    <Group gap={24}>
                      <Avatar src={member.avatar} size={80} radius="xl" />
                      <Stack gap={8}>
                        <Title order={3} size="h4">{member.name}</Title>
                        <Text fw={600} c="indigo.6">{member.role}</Text>
                        <Group gap={12}>
                          <Anchor href={member.linkedin} target="_blank" c="blue.6">
                            <IconLinkedin size={20} />
                          </Anchor>
                          <Anchor href={member.twitter} target="_blank" c="blue.4">
                            <IconBrandTwitter size={20} />
                          </Anchor>
                        </Group>
                      </Stack>
                    </Group>
                    <Text c="dimmed" lh={1.6}>
                      {member.bio}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Advisors */}
        <Box py={64} bg="white">
          <Container size="xl">
            <Stack align="center" gap={48} mb={64}>
              <Stack align="center" gap={16}>
                <Badge size="lg" color="orange" variant="light">
                  🌟 Strategic Advisors
                </Badge>
                <Title order={2} size="h2" ta="center">
                  Guided by Industry Veterans
                </Title>
              </Stack>
            </Stack>
            
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32} maw={800} mx="auto">
              {advisors.map((advisor, index) => (
                <Card key={index} shadow="md" radius="xl" p={24} ta="center">
                  <Stack gap={16}>
                    <Stack gap={8}>
                      <Title order={4} size="h5">{advisor.name}</Title>
                      <Text fw={600} c="orange.6">{advisor.role}</Text>
                      <Text size="sm" c="dimmed">{advisor.company}</Text>
                    </Stack>
                    <Text size="sm" c="dimmed" lh={1.5}>
                      {advisor.bio}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Company Milestones */}
        <Box py={64} bg="gray.0">
          <Container size="xl">
            <Stack align="center" gap={48} mb={64}>
              <Stack align="center" gap={16}>
                <Badge size="lg" color="green" variant="light">
                  📈 Our Journey
                </Badge>
                <Title order={2} size="h2" ta="center">
                  From Vision to PMO Transformation Leader
                </Title>
              </Stack>
            </Stack>
            
            <Stack gap={32}>
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                return (
                  <Card key={index} shadow="md" radius="xl" p={32}>
                    <Group gap={24} align="center">
                      <ThemeIcon size={64} color="green" variant="light">
                        <IconComponent size={32} />
                      </ThemeIcon>
                      <Stack gap={8}>
                        <Group gap={16}>
                          <Badge size="lg" color="green" variant="filled">
                            {milestone.year}
                          </Badge>
                        </Group>
                        <Text size="lg" fw={600}>
                          {milestone.event}
                        </Text>
                      </Stack>
                    </Group>
                  </Card>
                );
              })}
            </Stack>
          </Container>
        </Box>

        {/* Values */}
        <Box py={64} bg="white">
          <Container size="xl">
            <Stack align="center" gap={48} mb={64}>
              <Stack align="center" gap={16}>
                <Badge size="lg" color="blue" variant="light">
                  💎 Our Values
                </Badge>
                <Title order={2} size="h2" ta="center">
                  What Drives Us Every Day
                </Title>
              </Stack>
            </Stack>
            
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32}>
              {[
                {
                  icon: IconBrain,
                  title: "AI-First Thinking",
                  description: "We believe AI should amplify human strategic intelligence, not replace it. Every feature is designed to make PMs smarter, not just faster."
                },
                {
                  icon: IconUsers, 
                  title: "Community-Driven",
                  description: "Built by PMs, for PMs. Our roadmap is driven by real user feedback from product managers in the trenches."
                },
                {
                  icon: IconShield,
                  title: "Trust & Transparency",
                  description: "Your product strategy is your competitive advantage. We maintain bank-level security and complete transparency in how we handle your data."
                },
                {
                  icon: IconRocket,
                  title: "Continuous Innovation",
                  description: "Product management is evolving rapidly. We're committed to staying ahead of the curve with cutting-edge AI capabilities."
                },
                {
                  icon: IconTrendingUp,
                  title: "Results-Oriented",
                  description: "Every feature must demonstrate measurable impact on strategic decision-making speed and quality. No feature fluff."
                },
                {
                  icon: IconCode,
                  title: "Engineering Excellence",
                  description: "We build for scale from day one. 99.9% uptime, sub-second response times, and enterprise-grade reliability."
                }
              ].map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} shadow="md" radius="xl" p={24} h="100%">
                    <Stack gap={16}>
                      <ThemeIcon size={48} color="blue" variant="light">
                        <IconComponent size={24} />
                      </ThemeIcon>
                      <Stack gap={8}>
                        <Title order={4} size="h5">{value.title}</Title>
                        <Text c="dimmed" lh={1.6} size="sm">
                          {value.description}
                        </Text>
                      </Stack>
                    </Stack>
                  </Card>
                );
              })}
            </SimpleGrid>
          </Container>
        </Box>

        {/* CTA */}
        <Box py={96} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Container size="md">
            <Stack align="center" gap={32}>
              <Stack align="center" gap={16}>
                <Badge size="lg" color="white" variant="light">
                  🚀 Join the Revolution
                </Badge>
                <Title order={2} size="h2" c="white" ta="center">
                  Ready to Transform Your PM Career?
                </Title>
                <Text size="lg" c="rgba(255, 255, 255, 0.9)" ta="center" maw={600}>
                  Join 2,500+ product managers who've made the leap from administrative work to strategic leadership.
                </Text>
              </Stack>
              
              <Group gap={16}>
                <Button 
                  size="xl"
                  variant="white"
                  color="dark"
                  leftSection={<IconRocket size={20} />}
                  component={Link}
                  href="/trial"
                >
                  Start Free 14-Day Trial
                </Button>
                <Button 
                  size="xl"
                  variant="outline"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.3)', color: 'white' }}
                  component={Link}
                  href="/contact"
                >
                  Contact Our Team
                </Button>
              </Group>
              
              <Text size="sm" c="rgba(255, 255, 255, 0.8)">
                ✅ No credit card required • ✅ Setup in 5 minutes • ✅ Cancel anytime
              </Text>
            </Stack>
          </Container>
        </Box>

      </Box>
    </div>
  );
}