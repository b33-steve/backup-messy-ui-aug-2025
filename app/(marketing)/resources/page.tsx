'use client';

import React from 'react';
import { Container, Grid, Card, Title, Text, Button, Group, Stack, Badge, SimpleGrid, Box, Center, Anchor, ThemeIcon } from '@mantine/core';
import { IconArrowRight, IconCheck, IconBolt, IconBrain, IconClock, IconTrendingUp, IconSparkles, IconTarget, IconUsers, IconBulb, IconCircleCheck, IconBook, IconVideo, IconDownload, IconCalendar, IconUser, IconEye, IconCode, IconMap } from '@tabler/icons-react';
import Link from 'next/link';
import { AppVersionBanner } from '../../../components/shared/AppVersionBanner';

// PM33 Strategic Intelligence Resources
// Generated from PM33 Content Factory - 2025-08-24T13:30:19.888Z
// Generated from PM33 Content Factory - 2025-08-24T13:31:40.159Z
const resourceArticles = [
  {
    id: 'ai-product-management-tool-landing',
    title: 'PM33: The AI Product Management Tool That Supercharges Your Existing Stack',
    description: 'You\'re drowning in admin work. 60-80% of your time goes to:',
    category: 'AI Tools',
    readTime: '7 min read',
    featured: true,
    url: '/ai-product-management-tool-landing'
  },
  {
    id: 'ai-project-management-software-guide',
    title: 'AI Project Management Software: The Complete 2025 Guide (Traditional PM vs AI-Enhanced)',
    description: 'The AI project management software market is exploding. With a projected growth from $4.33 billion in 2024 to $14.11 billion by 2030 (21.6% CAGR), and...',
    category: 'Strategic Insights',
    readTime: '16 min read',
    featured: false,
    url: '/ai-project-management-software-guide'
  },
  {
    id: 'peer-driven-pm-challenge-post',
    title: 'LinkedIn Post: Peer-Driven PM Challenge',
    description: '"I\'m curious—what\'s your favorite way to keep your product roadmap collaborative instead of just another deck that collects dust?"',
    category: 'Community Insights',
    readTime: '3 min read',
    featured: false,
    url: '/peer-driven-pm-challenge-post'
  },
  {
    id: 'pm33-vs-traditional-carousel',
    title: 'LinkedIn Carousel: PM33 vs Traditional PM Tools',
    description: '(And it doesn\'t require changing your entire workflow)',
    category: 'Community Insights',
    readTime: '4 min read',
    featured: false,
    url: '/pm33-vs-traditional-carousel'
  },
  {
    id: 'crowdsource-ai-pm-workflows',
    title: 'Reddit Post: r/ProductManagement - Crowdsourcing AI PM Workflows',
    description: 'Looking for real PM workflows or tool combinations that help with AI integration. All approaches welcome—sophisticated AI tools, simple automation, or...',
    category: 'Community Guides',
    readTime: '3 min read',
    featured: false,
    url: '/crowdsource-ai-pm-workflows'
  },
  {
    id: 'ai-transforms-pm-work-thread',
    title: 'Twitter Thread: 10 Ways AI Transforms PM Work',
    description: '🧵 THREAD: 10 ways AI is transforming product management work (and why 92% of Fortune 500 companies are already using it)',
    category: 'Quick Insights',
    readTime: '4 min read',
    featured: false,
    url: '/ai-transforms-pm-work-thread'
  },
  {
    id: 'community-crowdsource-pm-time-thread',
    title: 'X (Twitter) Community Thread: Crowdsourcing PM Time-Saving Tactics',
    description: '❓ "What\'s the smartest thing you\'ve done to save time or drive clarity in your PM workflow—AI tool, template, mental framework, or back-to-basics post...',
    category: 'Quick Insights',
    readTime: '3 min read',
    featured: false,
    url: '/community-crowdsource-pm-time-thread'
  },
  {
    id: 'pm33-demo-comparison-script',
    title: 'YouTube Video Script: "PM33 vs Traditional PM Tools: 10-Minute Demo That\'ll Change How You Work"',
    description: '- Screen recordings of PM33 interface',
    category: 'Video Guides',
    readTime: '9 min read',
    featured: false,
    url: '/pm33-demo-comparison-script'
  }
];

const blogPosts = [
  {
    title: "The AI-First PM Revolution: How PM33 is Changing Product Management",
    excerpt: "Discover how AI is transforming product management from reactive task management to strategic intelligence.",
    author: "PM33 Team",
    date: "Dec 15, 2024",
    views: "2.3k",
    category: "Strategy",
    readTime: "5 min"
  },
  {
    title: "From Chaos to Clarity: Implementing Strategic Intelligence in Your PM Workflow",
    excerpt: "A step-by-step guide to transforming scattered feedback and data into actionable strategic insights.",
    author: "Sarah Chen, VP Product",
    date: "Dec 12, 2024",
    views: "1.8k",
    category: "Tutorial",
    readTime: "8 min"
  },
  {
    title: "ROI Case Study: How TechFlow Achieved 10x Faster Product Decisions",
    excerpt: "Real metrics from a mid-stage startup that reduced decision-making time from weeks to hours.",
    author: "Mike Rodriguez, PM",
    date: "Dec 10, 2024",
    views: "3.1k",
    category: "Case Study",
    readTime: "6 min"
  }
];

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

        {/* App Version & Documentation Status */}
        <AppVersionBanner />

        {/* API & Process Documentation */}
        <Box py={64} bg="white">
          <Container size="xl">
            <Stack align="center" gap={48} mb={64}>
              <Badge 
                size="lg" 
                variant="gradient" 
                gradient={{ from: 'purple.1', to: 'pink.1' }}
                c="purple.7"
              >
                🔌 Developer Resources
              </Badge>
              
              <Title 
                order={2} 
                size="h2"
                ta="center"
                maw={800}
                lh={1.2}
              >
                API Documentation & Integration Guides
              </Title>
            </Stack>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32}>
              {/* API Documentation */}
              <Card 
                shadow="xl" 
                radius="xl" 
                p={32}
                style={{ 
                  backgroundColor: 'white',
                  border: '2px solid #667eea',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                className="hover:shadow-2xl hover:translate-y-[-4px]"
                component={Link}
                href="/resources/api-docs"
              >
                <Group mb={20}>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                    <IconCode size={24} />
                  </ThemeIcon>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Text fw={700} size="xl" c="dark">PM33 API Documentation</Text>
                    <Badge color="green" variant="light" size="sm">v2.1.4 - Stable</Badge>
                  </Stack>
                </Group>
                <Text c="dimmed" mb={16} lh={1.6}>
                  Complete REST API documentation for integrating PM33's strategic intelligence into your product workflow
                </Text>
                <Stack gap={8} mb={20}>
                  <Text size="sm" fw={500} c="blue.6">🔐 Authentication & Security</Text>
                  <Text size="sm" fw={500} c="blue.6">🎯 Strategic Analysis APIs</Text>
                  <Text size="sm" fw={500} c="blue.6">⚙️ Workflow Execution APIs</Text>
                  <Text size="sm" fw={500} c="blue.6">📊 Data Intelligence APIs</Text>
                </Stack>
                <Button 
                  variant="light"
                  fullWidth
                  rightSection={<IconArrowRight size={16} />}
                >
                  View API Documentation
                </Button>
              </Card>

              {/* CPN Documentation */}
              <Card 
                shadow="xl" 
                radius="xl" 
                p={32}
                style={{ 
                  backgroundColor: 'white',
                  border: '2px solid #10b981',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                className="hover:shadow-2xl hover:translate-y-[-4px]"
                component={Link}
                href="/resources/cpn-docs"
              >
                <Group mb={20}>
                  <ThemeIcon size={48} variant="gradient" gradient={{ from: 'teal', to: 'green' }}>
                    <IconMap size={24} />
                  </ThemeIcon>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Text fw={700} size="xl" c="dark">Customer Process Navigation</Text>
                    <Badge color="teal" variant="light" size="sm">Implementation Guides</Badge>
                  </Stack>
                </Group>
                <Text c="dimmed" mb={16} lh={1.6}>
                  Step-by-step transformation guides for implementing PM33's strategic intelligence in your organization
                </Text>
                <Stack gap={8} mb={20}>
                  <Text size="sm" fw={500} c="teal.6">🚀 Strategic Onboarding Process</Text>
                  <Text size="sm" fw={500} c="teal.6">🔄 Workflow Integration Guide</Text>
                  <Text size="sm" fw={500} c="teal.6">📈 Success Metrics & KPIs</Text>
                  <Text size="sm" fw={500} c="teal.6">🛠 Troubleshooting & Support</Text>
                </Stack>
                <Button 
                  variant="light"
                  color="teal"
                  fullWidth
                  rightSection={<IconArrowRight size={16} />}
                >
                  View Process Documentation
                </Button>
              </Card>
            </SimpleGrid>
          </Container>
        </Box>

        {/* Featured Strategic Resources */}
        <Box 
          py={96} 
          style={{ 
            background: 'linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%)'
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
                📚 Strategic Resources
              </Badge>
              
              <Title 
                order={2} 
                size="h2"
                ta="center"
                maw={800}
                lh={1.2}
              >
                Essential Product Management Resources
              </Title>
            </Stack>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32}>
              {resourceArticles.map((article, index) => (
                <Card 
                  key={index}
                  shadow="xl" 
                  radius="xl" 
                  p={32}
                  style={{ 
                    backgroundColor: 'white',
                    border: article.featured ? '2px solid #6366f1' : '1px solid var(--mantine-color-gray-2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  className="hover:shadow-2xl hover:translate-y-[-4px]"
                  component={Link}
                  href={article.url}
                >
                  {article.featured && (
                    <Badge 
                      pos="absolute"
                      top={-12}
                      left="50%"
                      style={{ transform: 'translateX(-50%)' }}
                      size="sm"
                      color="indigo"
                      variant="filled"
                    >
                      Featured
                    </Badge>
                  )}
                  
                  <Stack gap={20}>
                    <Group justify="space-between">
                      <Badge size="sm" color="blue" variant="light">
                        {article.category}
                      </Badge>
                      <Text size="xs" c="dimmed">{article.readTime}</Text>
                    </Group>
                    
                    <Title order={3} size="h4" lh={1.3}>
                      {article.title}
                    </Title>
                    
                    <Text size="sm" c="dimmed" lh={1.6}>
                      {article.description}
                    </Text>
                    
                    <Group justify="space-between" mt="auto">
                      <Text size="sm" fw={600} c="indigo.6">
                        Click to access →
                      </Text>
                    </Group>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
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

        {/* Featured Strategic Resources */}
        <Box 
          py={96} 
          style={{ 
            background: 'linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%)'
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
📚 Strategic Resources
              </Badge>
              
              <Title 
                order={2} 
                size="h2"
                ta="center"
                maw={800}
                lh={1.2}
              >
Essential Product Management Resources
              </Title>
            </Stack>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32}>
              {resourceArticles.map((article, index) => (
                <Card 
                  key={index}
                  shadow="xl" 
                  radius="xl" 
                  p={32}
                  style={{ 
                    backgroundColor: 'white',
                    border: article.featured ? '2px solid #6366f1' : '1px solid var(--mantine-color-gray-2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  className="hover:shadow-2xl hover:translate-y-[-2px]"
                >
                  <Stack gap={16}>
                    <Group justify="space-between">
                      <Badge 
                        size="sm" 
                        color={article.featured ? "indigo" : "gray"} 
                        variant={article.featured ? "filled" : "light"}
                      >
                        {article.category}
                      </Badge>
                      {article.featured && (
                        <Badge size="xs" color="yellow" variant="light">
                          Featured
                        </Badge>
                      )}
                    </Group>
                    
                    <Title order={3} size="h4" lh={1.3}>
                      {article.title}
                    </Title>
                    
                    <Text c="dimmed" lh={1.6} style={{ flex: 1 }}>
                      {article.description}
                    </Text>
                    
                    <Group justify="space-between" align="center">
                      <Text size="sm" fw={500} c="indigo.6">
                        {article.readTime}
                      </Text>
                      <Button 
                        component={Link}
                        href={article.url}
                        variant="light" 
                        size="sm"
                        rightSection={<IconArrowRight size={14} />}
                      >
                        Read More
                      </Button>
                    </Group>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Strategic Insights Blog */}
        <Box py={96} bg="white">
          <Container size="xl">
            <Stack align="center" gap={48} mb={64}>
              <Badge 
                size="lg" 
                variant="gradient" 
                gradient={{ from: 'cyan.1', to: 'blue.1' }}
                c="blue.7"
              >
                📚 Strategic Insights Blog
              </Badge>
              
              <Title 
                order={2} 
                size="h2"
                ta="center"
                maw={800}
                lh={1.2}
              >
                Deep Dives into AI-Powered Product Management
              </Title>
            </Stack>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32}>
              {blogPosts.map((post, index) => (
                <Card 
                  key={index}
                  shadow="xl" 
                  radius="xl" 
                  p={24}
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
                      <Badge size="sm" color="blue" variant="light">
                        {post.category}
                      </Badge>
                      <Text size="xs" c="dimmed">{post.readTime}</Text>
                    </Group>
                    
                    <Title order={4} size="h5" lh={1.3}>
                      {post.title}
                    </Title>
                    
                    <Text size="sm" c="dimmed" lh={1.6} style={{ flex: 1 }}>
                      {post.excerpt}
                    </Text>
                    
                    <Group gap={12} align="center" style={{ marginTop: 'auto' }}>
                      <ThemeIcon size="sm" variant="light" color="gray">
                        <IconUser size={12} />
                      </ThemeIcon>
                      <Text size="xs" c="dimmed">{post.author}</Text>
                      
                      <ThemeIcon size="sm" variant="light" color="gray">
                        <IconCalendar size={12} />
                      </ThemeIcon>
                      <Text size="xs" c="dimmed">{post.date}</Text>
                      
                      <ThemeIcon size="sm" variant="light" color="gray">
                        <IconEye size={12} />
                      </ThemeIcon>
                      <Text size="xs" c="dimmed">{post.views}</Text>
                    </Group>
                    
                    <Button 
                      variant="subtle" 
                      size="sm"
                      fullWidth
                      rightSection={<IconArrowRight size={14} />}
                    >
                      Read Article
                    </Button>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Newsletter Signup */}
        <Box py={96} style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4ff 100%)' }}>
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