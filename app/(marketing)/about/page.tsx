'use client';

import React from 'react';
import { Container, Title, Text, Card, Stack, Badge, Button, Group, SimpleGrid, Box, Grid, ThemeIcon, Anchor, List } from '@mantine/core';
import { IconBrain, IconRocket, IconUsers, IconTrendingUp, IconAward, IconBuildingSkyscraper, IconCode, IconChartBar, IconShield, IconTarget, IconHeart, IconCoffee, IconTrendingUp2, IconWorld, IconMail, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

export default function AboutPage() {
  const coreValues = [
    {
      icon: IconBrain,
      title: "AI-First Innovation",
      description: "We believe AI should amplify human strategic intelligence, not replace it. Every feature is designed to make PMs smarter strategists, not just faster executors.",
      examples: ["Multi-framework strategic analysis", "Predictive outcome modeling", "Context-aware recommendations"]
    },
    {
      icon: IconUsers,
      title: "PM Community Focus",
      description: "Built by PMs, for PMs. Our product roadmap is driven by real feedback from product managers working in the trenches, not executive assumptions.",
      examples: ["Weekly PM community calls", "Feature requests from active users", "PM-to-PM support channels"]
    },
    {
      icon: IconShield,
      title: "Radical Transparency",
      description: "Your product strategy is your competitive advantage. We maintain complete transparency about data handling, AI decision-making, and product development.",
      examples: ["Open source AI models", "Public roadmap", "Transparent pricing"]
    },
    {
      icon: IconRocket,
      title: "Continuous Excellence",
      description: "Product management evolves rapidly. We stay ahead through continuous learning, experimentation, and adaptation to emerging PM best practices.",
      examples: ["Weekly framework updates", "Cutting-edge AI research", "Industry trend integration"]
    },
    {
      icon: IconTarget,
      title: "Results Over Features",
      description: "Every capability must demonstrate measurable impact on strategic decision-making speed and quality. We build solutions, not feature lists.",
      examples: ["ROI-driven development", "User outcome tracking", "Strategic impact metrics"]
    },
    {
      icon: IconHeart,
      title: "Empathy-Driven Design",
      description: "We understand PM frustrations because we've lived them. Every interaction is designed with deep empathy for the PM experience.",
      examples: ["PM workflow research", "Pain point interviews", "User-centric design thinking"]
    }
  ];

  const culturePillars = [
    {
      title: "Remote-First Global Team",
      description: "We believe the best talent is distributed globally. Our remote-first culture enables deep work while maintaining strong collaboration.",
      icon: IconWorld,
      highlights: ["Flexible working hours across time zones", "Quarterly team retreats", "Async-first communication"]
    },
    {
      title: "Learning & Growth",
      description: "Continuous learning isn't just encouraged—it's essential. We invest heavily in team development and skill advancement.",
      icon: IconTrendingUp2,
      highlights: ["$2,000 annual learning budget", "Conference speaking opportunities", "Internal skill sharing sessions"]
    },
    {
      title: "Work-Life Integration",
      description: "We optimize for sustainable high performance, not burnout. Mental health and personal growth are as important as professional success.",
      icon: IconCoffee,
      highlights: ["Unlimited PTO policy", "Mental health support", "Flexible family leave"]
    },
    {
      title: "Ownership Mindset",
      description: "Every team member thinks and acts like an owner. We make decisions for long-term success, not short-term wins.",
      icon: IconBuildingSkyscraper,
      highlights: ["Equity for all employees", "Decision-making autonomy", "Long-term thinking rewards"]
    }
  ];

  const jobOpenings = [
    {
      title: "Senior Full-Stack Engineer",
      department: "Engineering",
      location: "Remote (US/EU)",
      type: "Full-time",
      description: "Build the next generation of AI-powered PM tools with React, Node.js, and modern AI frameworks."
    },
    {
      title: "AI/ML Engineer",
      department: "AI Research",
      location: "Remote",
      type: "Full-time", 
      description: "Develop and optimize AI models for strategic product management analysis and recommendations."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote (US)",
      type: "Full-time",
      description: "Lead product strategy for our AI intelligence platform. Must have 5+ years PM experience at B2B SaaS companies."
    },
    {
      title: "Head of Marketing",
      department: "Marketing",
      location: "Remote (US)",
      type: "Full-time",
      description: "Scale our go-to-market strategy and build the PM33 brand in the product management community."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote (US/EU)",
      type: "Full-time",
      description: "Drive adoption and success for enterprise PM teams implementing strategic intelligence workflows."
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Scale our infrastructure to support thousands of concurrent AI operations with 99.9% uptime."
    }
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
                      We're Democratizing
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
                      Every PM deserves PMO-level strategic capabilities. We're building the AI platform 
                      that transforms individual contributors into strategic leaders, regardless of company 
                      size or budget.
                    </Text>
                  </Stack>
                  
                  <Group gap={16}>
                    <Button 
                      component={Link}
                      href="#careers"
                      size="lg"
                      variant="gradient"
                      gradient={{ from: 'indigo', to: 'purple' }}
                      leftSection={<IconRocket size={18} />}
                    >
                      Join Our Team
                    </Button>
                    <Button 
                      component={Link}
                      href="/trial"
                      size="lg"
                      variant="outline"
                      c="indigo.7"
                      leftSection={<IconTarget size={18} />}
                    >
                      Try PM33 Free
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
                        <Text size="sm" c="dimmed" ta="center">Productivity Boost</Text>
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
                  From Individual Contributors to Strategic Leaders
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
                      60-80% of PM time goes to administrative busywork instead of strategic thinking. 
                      Writing PRDs, synthesizing feedback, creating presentations—all manually.
                    </Text>
                    <Text c="dimmed" lh={1.6}>
                      Meanwhile, strategic opportunities slip by. Competitors ship faster because their 
                      PMs focus on strategy while yours handle admin tasks.
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
                      PM33 provides 4 specialized AI teams that handle the busywork: Strategic Intelligence, 
                      Workflow Execution, Data Analysis, and Communication.
                    </Text>
                    <Text c="dimmed" lh={1.6}>
                      Transform from reactive task-handler to strategic leader in weeks. Focus on vision, 
                      strategy, and market opportunities—not administrative overhead.
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            </SimpleGrid>
          </Container>
        </Box>

        {/* Core Values */}
        <Box py={64} bg="gray.0">
          <Container size="xl">
            <Stack align="center" gap={48} mb={64}>
              <Stack align="center" gap={16}>
                <Badge size="lg" color="purple" variant="light">
                  💎 Our Core Values
                </Badge>
                <Title order={2} size="h2" ta="center">
                  Principles That Guide Everything We Do
                </Title>
                <Text size="lg" c="dimmed" ta="center" maw={600}>
                  These values shape our product decisions, hiring choices, and daily interactions.
                </Text>
              </Stack>
            </Stack>
            
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing={32}>
              {coreValues.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} shadow="xl" radius="xl" p={24} h="100%">
                    <Stack gap={16} h="100%">
                      <ThemeIcon size={48} color="purple" variant="light">
                        <IconComponent size={24} />
                      </ThemeIcon>
                      <Stack gap={8} style={{ flex: 1 }}>
                        <Title order={4} size="h5">{value.title}</Title>
                        <Text c="dimmed" lh={1.6} size="sm">
                          {value.description}
                        </Text>
                      </Stack>
                      <Stack gap={4}>
                        <Text size="xs" fw={600} c="purple.6">Examples:</Text>
                        <List size="xs" spacing={2}>
                          {value.examples.map((example, i) => (
                            <List.Item key={i} c="dimmed">{example}</List.Item>
                          ))}
                        </List>
                      </Stack>
                    </Stack>
                  </Card>
                );
              })}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Culture */}
        <Box py={64} bg="white">
          <Container size="xl">
            <Stack align="center" gap={48} mb={64}>
              <Stack align="center" gap={16}>
                <Badge size="lg" color="orange" variant="light">
                  🌟 Our Culture
                </Badge>
                <Title order={2} size="h2" ta="center">
                  Built for Sustainable High Performance
                </Title>
                <Text size="lg" c="dimmed" ta="center" maw={700}>
                  We believe great products come from great teams. Our culture enables deep work, 
                  continuous learning, and personal fulfillment.
                </Text>
              </Stack>
            </Stack>
            
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32}>
              {culturePillars.map((pillar, index) => {
                const IconComponent = pillar.icon;
                return (
                  <Card key={index} shadow="md" radius="xl" p={32}>
                    <Stack gap={20}>
                      <Group gap={16}>
                        <ThemeIcon size={48} color="orange" variant="light">
                          <IconComponent size={24} />
                        </ThemeIcon>
                        <Title order={4} size="h4">{pillar.title}</Title>
                      </Group>
                      <Text c="dimmed" lh={1.6}>
                        {pillar.description}
                      </Text>
                      <Stack gap={8}>
                        <Text size="sm" fw={600} c="orange.6">Key Benefits:</Text>
                        <List size="sm" spacing={4}>
                          {pillar.highlights.map((highlight, i) => (
                            <List.Item key={i} c="dimmed">{highlight}</List.Item>
                          ))}
                        </List>
                      </Stack>
                    </Stack>
                  </Card>
                );
              })}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Careers */}
        <Box py={64} bg="gray.0" id="careers">
          <Container size="xl">
            <Stack align="center" gap={48} mb={64}>
              <Stack align="center" gap={16}>
                <Badge size="lg" color="green" variant="light">
                  🚀 Join Our Team
                </Badge>
                <Title order={2} size="h2" ta="center">
                  Help Us Transform Product Management
                </Title>
                <Text size="lg" c="dimmed" ta="center" maw={700}>
                  We're looking for talented, passionate people who want to revolutionize how 
                  PMs work. Join us in building the future of strategic product management.
                </Text>
              </Stack>
            </Stack>
            
            <Stack gap={24}>
              {jobOpenings.map((job, index) => (
                <Card key={index} shadow="md" radius="xl" p={32}>
                  <Grid align="center">
                    <Grid.Col span={{ base: 12, md: 8 }}>
                      <Stack gap={12}>
                        <Group gap={16}>
                          <Title order={4} size="h5">{job.title}</Title>
                          <Badge color="blue" variant="light" size="sm">{job.type}</Badge>
                        </Group>
                        <Group gap={16}>
                          <Text size="sm" c="dimmed">{job.department}</Text>
                          <Text size="sm" c="dimmed">•</Text>
                          <Text size="sm" c="dimmed">{job.location}</Text>
                        </Group>
                        <Text size="sm" c="dimmed" lh={1.5}>
                          {job.description}
                        </Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                      <Button 
                        fullWidth
                        variant="outline"
                        color="green"
                        rightSection={<IconArrowRight size={16} />}
                        component={Anchor}
                        href={`mailto:careers@pm33.ai?subject=Application for ${job.title}`}
                      >
                        Apply Now
                      </Button>
                    </Grid.Col>
                  </Grid>
                </Card>
              ))}
            </Stack>
            
            <Card shadow="xl" radius="xl" p={32} mt={48} bg="green.0" style={{ border: '1px solid var(--mantine-color-green-2)' }}>
              <Stack align="center" gap={16}>
                <ThemeIcon size={56} color="green" variant="light">
                  <IconMail size={28} />
                </ThemeIcon>
                <Stack align="center" gap={8}>
                  <Title order={3} size="h4" c="green.8">
                    Don't See Your Role?
                  </Title>
                  <Text c="dimmed" ta="center" maw={500}>
                    We're always interested in talking to exceptional people. Send us your resume 
                    and tell us how you'd like to contribute to the PM33 mission.
                  </Text>
                </Stack>
                <Button 
                  color="green"
                  size="md"
                  leftSection={<IconMail size={18} />}
                  component={Anchor}
                  href="mailto:careers@pm33.ai?subject=General Interest"
                >
                  Contact Us
                </Button>
              </Stack>
            </Card>
          </Container>
        </Box>

        {/* CTA */}
        <Box py={96} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Container size="md">
            <Stack align="center" gap={32}>
              <Stack align="center" gap={16}>
                <Badge size="lg" color="white" variant="light">
                  💫 Experience PM33
                </Badge>
                <Title order={2} size="h2" c="white" ta="center">
                  Ready to Transform Your PM Work?
                </Title>
                <Text size="lg" c="rgba(255, 255, 255, 0.9)" ta="center" maw={600}>
                  Join 2,500+ product managers who've made the leap from busywork to strategic leadership.
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
                  Get in Touch
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