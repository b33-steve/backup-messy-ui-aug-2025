'use client';

import React from 'react';
import { Container, Title, Text, Stack, Box, Badge, Button, Group, Card, SimpleGrid, ThemeIcon, Anchor } from '@mantine/core';
import { IconBrain, IconTrendingUp, IconUsers, IconTarget, IconArrowRight, IconCalendar, IconUser, IconEye, IconClock, IconStar } from '@tabler/icons-react';
import Link from 'next/link';

const featuredPosts = [
  {
    title: "The AI-First PM Revolution: How Strategic Intelligence Changes Everything",
    excerpt: "Traditional product management is reactive. Strategic intelligence makes it predictive. Here's how AI transforms every aspect of the PM workflow from discovery to delivery.",
    author: "Sarah Chen, VP Product",
    date: "Dec 20, 2024",
    readTime: "12 min read",
    views: "4.2k",
    category: "Strategy",
    featured: true
  },
  {
    title: "From Chaos to Clarity: The Strategic Framework That Scales",
    excerpt: "Most PMs drown in feedback, feature requests, and stakeholder opinions. This proven framework transforms noise into signal using AI-powered analysis.",
    author: "Mike Rodriguez, Senior PM",
    date: "Dec 18, 2024", 
    readTime: "8 min read",
    views: "2.8k",
    category: "Framework"
  },
  {
    title: "ROI Case Study: 10x Faster Product Decisions at TechFlow",
    excerpt: "How a 50-person startup reduced decision-making time from weeks to hours while improving outcome quality by 300%. Complete breakdown with real metrics.",
    author: "Lisa Wang, PM Director",
    date: "Dec 15, 2024",
    readTime: "15 min read", 
    views: "5.1k",
    category: "Case Study"
  }
];

const strategicInsights = [
  {
    title: "The Hidden Cost of PM Reactive Mode",
    excerpt: "Why traditional project management approaches fail in modern product environments and what strategic intelligence offers instead.",
    category: "Analysis",
    readTime: "6 min"
  },
  {
    title: "AI-Powered Competitive Intelligence: A New Paradigm", 
    excerpt: "How automated competitive analysis transforms strategic positioning and market opportunity assessment.",
    category: "Competitive Strategy",
    readTime: "9 min"
  },
  {
    title: "The Strategic PM's Guide to Data-Driven Decision Making",
    excerpt: "Beyond basic analytics: Using AI to uncover patterns, predict outcomes, and optimize product-market fit.",
    category: "Data Strategy", 
    readTime: "11 min"
  },
  {
    title: "Building Product Intuition in the AI Age",
    excerpt: "How strategic intelligence augments (rather than replaces) product intuition and customer empathy.",
    category: "Leadership",
    readTime: "7 min"
  },
  {
    title: "The Evolution of Product Requirements: From Documents to Intelligence",
    excerpt: "Why traditional PRDs fall short and how AI-powered requirements capture intent, not just features.",
    category: "Process",
    readTime: "10 min"
  },
  {
    title: "Strategic Roadmapping: Beyond Feature Lists",
    excerpt: "Transform your roadmap from a feature catalog into a strategic communication tool that drives alignment.",
    category: "Roadmapping",
    readTime: "8 min"
  }
];

export default function StrategicProductManagementBlogPage() {
  return (
    <div className="marketing-context">
      <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>

        {/* Hero Section */}
        <Box 
          style={{ 
            position: 'relative',
            padding: '6rem 0',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4ff 50%, #ffffff 100%)',
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
                leftSection={<IconBrain size={16} />}
              >
                Strategic Product Management Blog
              </Badge>
              
              <Stack align="center" gap={24}>
                <Title 
                  order={1} 
                  size="3.5rem"
                  ta="center"
                  lh={1.1}
                  style={{ 
                    fontWeight: 900,
                    color: 'var(--mantine-color-dark-8)',
                    maxWidth: 900
                  }}
                >
                  Deep Strategic Insights
                  <Text 
                    span 
                    variant="gradient" 
                    gradient={{ from: 'indigo', to: 'cyan' }}
                    style={{ 
                      display: 'block', 
                      marginTop: 16,
                      fontSize: '2.8rem'
                    }}
                  >
                    for Modern Product Leaders
                  </Text>
                </Title>
                
                <Text size="xl" c="dimmed" ta="center" maw={700} lh={1.6}>
                  Go beyond surface-level PM content. Get strategic frameworks, AI-powered insights, and proven methodologies from product leaders building the future.
                </Text>

                <Group gap={24} mt={32}>
                  <Button 
                    component={Link}
                    href="#featured"
                    size="lg"
                    rightSection={<IconArrowRight size={18} />}
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      minWidth: 180
                    }}
                  >
                    Read Latest
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    color="dark"
                    rightSection={<IconStar size={18} />}
                    style={{ minWidth: 160 }}
                  >
                    Subscribe
                  </Button>
                </Group>
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* Featured Articles */}
        <Box py={96} bg="white" id="featured">
          <Container size="xl">
            <Stack gap={64}>
              <Stack align="center" gap={24}>
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'cyan.1', to: 'blue.1' }}
                  c="blue.7"
                >
                  🔥 Featured Strategic Insights
                </Badge>
                
                <Title 
                  order={2} 
                  size="h2"
                  ta="center"
                  maw={800}
                  lh={1.2}
                  c="dark"
                >
                  Essential Reading for Strategic Product Managers
                </Title>
              </Stack>

              <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing={32}>
                {featuredPosts.map((post, index) => (
                  <Card 
                    key={index}
                    shadow="lg" 
                    radius="xl" 
                    p={32}
                    style={{ 
                      backgroundColor: 'white',
                      border: post.featured ? '2px solid #667eea' : '1px solid var(--mantine-color-gray-2)',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                    className="hover:shadow-xl hover:translate-y-[-4px]"
                  >
                    {post.featured && (
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
                    
                    <Stack gap={20} style={{ height: '100%' }}>
                      <Group justify="space-between">
                        <Badge size="sm" color="blue" variant="light">
                          {post.category}
                        </Badge>
                        <Group gap={8}>
                          <ThemeIcon size="xs" variant="light" color="gray">
                            <IconClock size={10} />
                          </ThemeIcon>
                          <Text size="xs" c="dimmed">{post.readTime}</Text>
                        </Group>
                      </Group>
                      
                      <Stack gap={12} style={{ flex: 1 }}>
                        <Title order={3} size="h4" lh={1.3} c="dark">
                          {post.title}
                        </Title>
                        
                        <Text c="dimmed" lh={1.6} size="sm">
                          {post.excerpt}
                        </Text>
                      </Stack>
                      
                      <Stack gap={16} mt="auto">
                        <Group gap={12} align="center">
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
                          variant="light"
                          color="indigo"
                          size="sm"
                          fullWidth
                          rightSection={<IconArrowRight size={14} />}
                        >
                          Read Full Article
                        </Button>
                      </Stack>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>

        {/* Strategic Insights Grid */}
        <Box py={96} style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4ff 100%)' }}>
          <Container size="xl">
            <Stack gap={64}>
              <Stack align="center" gap={24}>
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'indigo.1', to: 'purple.1' }}
                  c="indigo.7"
                >
                  📚 Strategic Framework Library
                </Badge>
                
                <Title 
                  order={2} 
                  size="h2"
                  ta="center"
                  maw={800}
                  lh={1.2}
                  c="dark"
                >
                  Master the Frameworks That Drive Results
                </Title>

                <Text size="lg" c="dimmed" ta="center" maw={600} lh={1.6}>
                  Battle-tested strategies, frameworks, and methodologies from product leaders at high-growth companies.
                </Text>
              </Stack>

              <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing={32}>
                {strategicInsights.map((post, index) => (
                  <Card 
                    key={index}
                    shadow="md" 
                    radius="xl" 
                    p={32}
                    bg="white"
                    style={{ 
                      border: '1px solid var(--mantine-color-gray-2)',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    className="hover:shadow-lg hover:translate-y-[-2px]"
                  >
                    <Stack gap={20}>
                      <Group justify="space-between">
                        <Badge size="sm" color="teal" variant="light">
                          {post.category}
                        </Badge>
                        <Text size="xs" c="dimmed">{post.readTime}</Text>
                      </Group>
                      
                      <Stack gap={12} style={{ flex: 1 }}>
                        <Title order={4} size="h5" lh={1.3} c="dark">
                          {post.title}
                        </Title>
                        
                        <Text c="dimmed" lh={1.6} size="sm">
                          {post.excerpt}
                        </Text>
                      </Stack>
                      
                      <Button 
                        variant="subtle"
                        color="teal"
                        size="sm"
                        fullWidth
                        rightSection={<IconArrowRight size={14} />}
                        mt="auto"
                      >
                        Read More
                      </Button>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>

        {/* Categories */}
        <Box py={96} bg="white">
          <Container size="xl">
            <Stack gap={48}>
              <Stack align="center" gap={24}>
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'orange.1', to: 'red.1' }}
                  c="orange.7"
                >
                  🎯 Content Categories
                </Badge>
                
                <Title 
                  order={2} 
                  size="h2"
                  ta="center"
                  maw={800}
                  lh={1.2}
                  c="dark"
                >
                  Explore by Strategic Focus Area
                </Title>
              </Stack>

              <SimpleGrid cols={{ base: 2, md: 4 }} spacing={24}>
                {[
                  { 
                    name: 'Strategy', 
                    count: '24 articles', 
                    icon: IconTarget,
                    color: 'blue',
                    description: 'Strategic thinking and planning'
                  },
                  { 
                    name: 'AI & Data', 
                    count: '18 articles', 
                    icon: IconBrain,
                    color: 'purple',
                    description: 'AI-powered product intelligence'
                  },
                  { 
                    name: 'Leadership', 
                    count: '15 articles', 
                    icon: IconUsers,
                    color: 'green',
                    description: 'Team building and influence'
                  },
                  { 
                    name: 'Growth', 
                    count: '21 articles', 
                    icon: IconTrendingUp,
                    color: 'orange',
                    description: 'Scaling products and teams'
                  }
                ].map((category, index) => (
                  <Card 
                    key={index}
                    shadow="sm" 
                    radius="lg" 
                    p={24}
                    style={{ 
                      backgroundColor: 'white',
                      border: '1px solid var(--mantine-color-gray-2)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                    className="hover:shadow-md hover:translate-y-[-2px]"
                  >
                    <Stack gap={12} align="center">
                      <ThemeIcon 
                        size={48} 
                        variant="light" 
                        color={category.color}
                      >
                        <category.icon size={24} />
                      </ThemeIcon>
                      
                      <Stack gap={4} align="center">
                        <Text fw={600} c="dark">
                          {category.name}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {category.description}
                        </Text>
                        <Badge size="sm" color={category.color} variant="light">
                          {category.count}
                        </Badge>
                      </Stack>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>

        {/* Newsletter CTA */}
        <Box py={96} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Container size="md">
            <Card 
              shadow="xl" 
              radius="xl" 
              p={64}
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                textAlign: 'center'
              }}
            >
              <Stack align="center" gap={32}>
                <Stack align="center" gap={16}>
                  <Badge size="lg" color="indigo" variant="light">
                    📧 Weekly Strategic Intelligence
                  </Badge>
                  <Title order={2} size="h2" c="dark">
                    Never Miss a Strategic Insight
                  </Title>
                  <Text size="lg" c="dimmed" maw={500}>
                    Get the week's best strategic frameworks, AI insights, and product management intelligence delivered every Tuesday.
                  </Text>
                </Stack>
                
                <Group gap={24}>
                  <Button
                    size="xl"
                    rightSection={<IconArrowRight size={20} />}
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      minWidth: 220,
                      fontWeight: 600
                    }}
                  >
                    Subscribe Free
                  </Button>
                  <Button
                    component={Link}
                    href="/pricing"
                    size="xl"
                    variant="outline"
                    color="dark"
                    style={{ minWidth: 180 }}
                  >
                    Start Trial
                  </Button>
                </Group>
                
                <Text size="sm" c="dimmed">
                  Join 8,500+ strategic product managers • Unsubscribe anytime
                </Text>
              </Stack>
            </Card>
          </Container>
        </Box>

      </Box>
    </div>
  );
}