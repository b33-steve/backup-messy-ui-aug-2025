'use client';

import React from 'react';
import { Container, Grid, Card, Title, Text, Button, Group, Stack, Badge, SimpleGrid, Box, Center, Anchor, ThemeIcon } from '@mantine/core';
import { IconArrowRight, IconCheck, IconBolt, IconBrain, IconClock, IconTrendingUp, IconSparkles, IconTarget, IconUsers, IconBulb, IconCircleCheck, IconBook, IconVideo, IconDownload } from '@tabler/icons-react';
import Link from 'next/link';

export default function ResourcesPage() {
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
            <Stack align="center" gap={32}>
              <Badge 
                size="lg" 
                variant="gradient" 
                gradient={{ from: 'indigo.1', to: 'purple.1' }}
                c="indigo.7"
                leftSection={<IconBook size={16} />}
              >
                Product Management Resources
              </Badge>
              
              <Stack align="center" gap={16}>
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
                  Strategic Intelligence Hub
                  <Text 
                    span 
                    variant="gradient" 
                    gradient={{ from: 'indigo', to: 'cyan' }}
                    style={{ display: 'block', marginTop: 8 }}
                  >
                    for Modern Product Managers
                  </Text>
                </Title>
                
                <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6}>
                  Frameworks, templates, and insights to transform your PM work from reactive to strategic.
                </Text>
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* Resource Categories */}
        <Box py={64} bg="white">
          <Container size="xl">
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32}>
              {/* Frameworks & Templates */}
              <Card 
                shadow="xl" 
                radius="xl" 
                p={32}
                style={{ 
                  backgroundColor: 'white',
                  border: '1px solid var(--mantine-color-indigo-2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                className="hover:shadow-2xl hover:translate-y-[-4px]"
              >
                <Group mb={20}>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                    <IconTarget size={24} />
                  </ThemeIcon>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Text fw={700} size="xl" c="dark">Strategic Frameworks</Text>
                    <Badge color="green" variant="light" size="sm">12 Templates</Badge>
                  </Stack>
                </Group>
                <Text c="dimmed" mb={16} lh={1.6}>
                  Battle-tested frameworks for prioritization, analysis, and strategic decision-making
                </Text>
                <Stack gap={8} mb={20}>
                  <Text size="sm" fw={500} c="indigo.6">✨ ICE & RICE Scoring Templates</Text>
                  <Text size="sm" fw={500} c="indigo.6">🎯 Porter's Five Forces Analysis</Text>
                  <Text size="sm" fw={500} c="indigo.6">⚡ Opportunity Solution Trees</Text>
                  <Text size="sm" fw={500} c="indigo.6">📊 Impact/Effort Matrix</Text>
                </Stack>
                <Button 
                  variant="light"
                  fullWidth
                  rightSection={<IconDownload size={16} />}
                >
                  Download Templates
                </Button>
              </Card>

              {/* Video Tutorials */}
              <Card 
                shadow="xl" 
                radius="xl" 
                p={32}
                style={{ 
                  backgroundColor: 'white',
                  border: '1px solid var(--mantine-color-cyan-2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                className="hover:shadow-2xl hover:translate-y-[-4px]"
              >
                <Group mb={20}>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'cyan', to: 'blue' }}>
                    <IconVideo size={24} />
                  </ThemeIcon>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Text fw={700} size="xl" c="dark">Master Classes</Text>
                    <Badge color="blue" variant="light" size="sm">8 Sessions</Badge>
                  </Stack>
                </Group>
                <Text c="dimmed" mb={16} lh={1.6}>
                  Deep-dive video tutorials on advanced PM concepts and AI-powered workflows
                </Text>
                <Stack gap={8} mb={20}>
                  <Text size="sm" fw={500} c="cyan.6">🎬 AI-Powered PRD Generation</Text>
                  <Text size="sm" fw={500} c="cyan.6">📈 Strategic Data Analysis</Text>
                  <Text size="sm" fw={500} c="cyan.6">🤖 Automated Competitive Research</Text>
                  <Text size="sm" fw={500} c="cyan.6">💡 Vision to Roadmap Alignment</Text>
                </Stack>
                <Button 
                  variant="light"
                  color="cyan"
                  fullWidth
                  rightSection={<IconArrowRight size={16} />}
                >
                  Watch Tutorials
                </Button>
              </Card>

              {/* Best Practices Guide */}
              <Card 
                shadow="xl" 
                radius="xl" 
                p={32}
                style={{ 
                  backgroundColor: 'white',
                  border: '1px solid var(--mantine-color-teal-2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                className="hover:shadow-2xl hover:translate-y-[-4px]"
              >
                <Group mb={20}>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'teal', to: 'green' }}>
                    <IconBrain size={24} />
                  </ThemeIcon>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Text fw={700} size="xl" c="dark">PM Intelligence</Text>
                    <Badge color="teal" variant="light" size="sm">Weekly Updates</Badge>
                  </Stack>
                </Group>
                <Text c="dimmed" mb={16} lh={1.6}>
                  Industry insights, case studies, and best practices from top product teams
                </Text>
                <Stack gap={8} mb={20}>
                  <Text size="sm" fw={500} c="teal.6">📚 Weekly PM Intelligence Brief</Text>
                  <Text size="sm" fw={500} c="teal.6">🏆 Success Story Case Studies</Text>
                  <Text size="sm" fw={500} c="teal.6">🔬 Industry Trend Analysis</Text>
                  <Text size="sm" fw={500} c="teal.6">💪 PM Skill Development</Text>
                </Stack>
                <Button 
                  variant="light"
                  color="teal"
                  fullWidth
                  rightSection={<IconArrowRight size={16} />}
                >
                  Subscribe Free
                </Button>
              </Card>
            </SimpleGrid>
          </Container>
        </Box>

        {/* Featured Content */}
        <Box 
          py={96} 
          style={{ 
            background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4ff 100%)'
          }}
        >
          <Container size="xl">
            <Stack align="center" gap={48} mb={64}>
              <Badge 
                size="lg" 
                variant="gradient" 
                gradient={{ from: 'indigo.1', to: 'purple.1' }}
                c="indigo.7"
              >
                🔥 Featured Resources
              </Badge>
              
              <Title 
                order={2} 
                size="h2"
                ta="center"
                maw={800}
                lh={1.2}
              >
                Most Popular This Week
              </Title>
            </Stack>

            <Grid gutter={32}>
              {[
                {
                  title: "The AI-First PM Transformation Guide",
                  description: "Complete playbook for integrating AI into your PM workflows without disrupting existing processes",
                  category: "Guide",
                  time: "15 min read",
                  popularity: "2,847 downloads"
                },
                {
                  title: "Strategic Analysis Automation Templates",
                  description: "Pre-built templates for ICE scoring, competitive analysis, and market opportunity assessment",
                  category: "Templates",
                  time: "5 templates",
                  popularity: "1,923 downloads"
                },
                {
                  title: "PM33 Demo: From Data to Decision in 5 Minutes",
                  description: "Watch how PM33's AI transforms scattered feedback into actionable product insights",
                  category: "Video",
                  time: "12 min watch",
                  popularity: "3,156 views"
                }
              ].map((item, index) => (
                <Grid.Col key={index} span={{ base: 12, md: 4 }}>
                  <Card 
                    shadow="xl" 
                    radius="xl" 
                    p={32}
                    h="100%"
                    style={{ 
                      backgroundColor: 'white',
                      border: '1px solid var(--mantine-color-gray-2)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    className="hover:shadow-2xl hover:translate-y-[-2px]"
                  >
                    <Stack gap={16}>
                      <Group justify="space-between">
                        <Badge size="sm" color="indigo" variant="light">
                          {item.category}
                        </Badge>
                        <Text size="xs" c="dimmed">{item.time}</Text>
                      </Group>
                      
                      <Title order={3} size="h4" lh={1.3}>
                        {item.title}
                      </Title>
                      
                      <Text c="dimmed" lh={1.6} style={{ flex: 1 }}>
                        {item.description}
                      </Text>
                      
                      <Group justify="space-between" align="center">
                        <Text size="xs" fw={600} c="teal.6">
                          {item.popularity}
                        </Text>
                        <Button 
                          variant="subtle" 
                          size="xs"
                          rightSection={<IconArrowRight size={14} />}
                        >
                          Read More
                        </Button>
                      </Group>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Newsletter Signup */}
        <Box py={96} bg="white">
          <Container size="md">
            <Card 
              shadow="xl" 
              radius="xl" 
              p={48}
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textAlign: 'center'
              }}
            >
              <Stack align="center" gap={32}>
                <Stack align="center" gap={16}>
                  <Badge size="lg" color="white" variant="light">
                    📧 Weekly Intelligence
                  </Badge>
                  <Title order={2} size="h3" c="white">
                    Stay Ahead of the Curve
                  </Title>
                  <Text size="lg" c="rgba(255, 255, 255, 0.9)" maw={500}>
                    Get the latest PM frameworks, AI insights, and strategic thinking delivered to your inbox every Tuesday.
                  </Text>
                </Stack>
                
                <Button
                  size="lg"
                  variant="white"
                  color="dark"
                  rightSection={<IconArrowRight size={20} />}
                  style={{ minWidth: 200 }}
                >
                  Subscribe Free
                </Button>
                
                <Text size="sm" c="rgba(255, 255, 255, 0.8)">
                  Join 12,000+ product managers • Unsubscribe anytime
                </Text>
              </Stack>
            </Card>
          </Container>
        </Box>

      </Box>
    </div>
  );
}