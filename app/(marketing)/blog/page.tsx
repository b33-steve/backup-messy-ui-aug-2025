'use client';

import React from 'react';
import { Container, Title, Text, Card, Stack, Badge, Button, Group, SimpleGrid, Box } from '@mantine/core';
import { IconArrowRight, IconCalendar, IconUser, IconEye } from '@tabler/icons-react';
import Link from 'next/link';

export default function BlogPage() {
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
              >
                📚 PM Intelligence Hub
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
                  Strategic Insights for
                  <Text 
                    span 
                    variant="gradient" 
                    gradient={{ from: 'indigo', to: 'cyan' }}
                    style={{ display: 'block', marginTop: 8 }}
                  >
                    AI-Powered Product Management
                  </Text>
                </Title>
                
                <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6}>
                  Deep dives into strategic frameworks, AI workflows, and real-world case studies from product teams scaling with intelligence.
                </Text>
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* Blog Posts */}
        <Box py={64} bg="white">
          <Container size="xl">
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32}>
              {blogPosts.map((post, index) => (
                <Card 
                  key={index}
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
                  className="hover:shadow-2xl hover:translate-y-[-4px]"
                >
                  <Stack gap={16} h="100%">
                    <Group justify="space-between">
                      <Badge size="sm" color="indigo" variant="light">
                        {post.category}
                      </Badge>
                      <Text size="xs" c="dimmed">{post.readTime}</Text>
                    </Group>
                    
                    <Title order={3} size="h4" lh={1.3}>
                      {post.title}
                    </Title>
                    
                    <Text c="dimmed" lh={1.6} style={{ flex: 1 }}>
                      {post.excerpt}
                    </Text>
                    
                    <Group justify="space-between" align="center" mt="auto">
                      <Stack gap={4}>
                        <Group gap={8}>
                          <IconUser size={14} color="var(--mantine-color-dimmed)" />
                          <Text size="xs" c="dimmed">{post.author}</Text>
                        </Group>
                        <Group gap={8}>
                          <IconCalendar size={14} color="var(--mantine-color-dimmed)" />
                          <Text size="xs" c="dimmed">{post.date}</Text>
                          <Text size="xs" c="dimmed">•</Text>
                          <IconEye size={14} color="var(--mantine-color-dimmed)" />
                          <Text size="xs" c="dimmed">{post.views}</Text>
                        </Group>
                      </Stack>
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
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Coming Soon */}
        <Box py={96} bg="gray.0">
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
                <Badge size="lg" color="white" variant="light">
                  🚀 More Coming Soon
                </Badge>
                
                <Stack align="center" gap={16}>
                  <Title order={2} size="h3" c="white">
                    We're Just Getting Started
                  </Title>
                  <Text size="lg" c="rgba(255, 255, 255, 0.9)" maw={500}>
                    Our PM Intelligence Hub is growing weekly with new strategic frameworks, AI workflows, and case studies from leading product teams.
                  </Text>
                </Stack>
                
                <Button
                  size="lg"
                  variant="white"
                  color="dark"
                  rightSection={<IconArrowRight size={20} />}
                  style={{ minWidth: 200 }}
                  component={Link}
                  href="/"
                >
                  Explore PM33 Platform
                </Button>
              </Stack>
            </Card>
          </Container>
        </Box>

      </Box>
    </div>
  );
}