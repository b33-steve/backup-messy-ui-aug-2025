/**
 * Component: Resources Page - PM33 Strategic Intelligence Resources Hub
 * Purpose: Display automated keyword factory content and strategic resources
 * Context: Marketing conversion and SEO-friendly article display
 * RELEVANT FILES: PM33_COMPLETE_WEBSITE_MAP.md, tests/marketing/automated-keyword-factory.spec.ts
 */

'use client';

import { Container, Title, Text, Card, Button, Badge, Stack, Group, Grid } from '@mantine/core';
import { IconTrendingUp, IconBrain, IconTarget } from '@tabler/icons-react';
import Link from 'next/link';

// Sample data structure for keyword factory content (linking to existing pages)
// Auto-generated from PM33 Content Factory - 2025-08-22T20:55:16.312Z
const resourceArticles = [
  {
    id: 'pm33-strategic-intelligence',
    title: 'PM33: Strategic Intelligence for Modern Product Teams',
    description: 'Discover how AI-powered frameworks like ICE and RICE can transform your strategic decision-making process.',
    category: 'Strategic Intelligence',
    readTime: '8 min read',
    featured: true,
    url: '/about'
  },
  {
    id: 'ai-pm-transformation',
    title: 'The Future of Product Management: AI-Enhanced Workflows',
    description: 'Learn how PM33 integrates with your existing tools to provide PMO-level strategic capabilities.',
    category: 'Product Management',
    readTime: '12 min read',
    featured: false,
    url: '/features'
  },
  {
    id: 'pmo-capabilities-individual-pms',
    title: 'PMO Capabilities for Individual Product Managers',
    description: 'Transform from individual contributor to strategic PMO function with AI-powered intelligence.',
    category: 'PMO Transformation',
    readTime: '10 min read',
    featured: false,
    url: '/pricing'
  }
];

export default function ResourcesPage() {
  const featuredArticles = resourceArticles.filter(article => article.featured);
  const regularArticles = resourceArticles.filter(article => !article.featured);

  return (
    <div className="marketing-context">
      <Container size={1200} px={24} py={48}>
        {/* Header */}
        <Stack align="center" mb={60}>
          <Badge size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
            Strategic Intelligence Hub
          </Badge>
          <Title order={1} size="48px" fw={700} ta="center">
            PM33 Resources
          </Title>
          <Text size="xl" ta="center" maw={800} c="dimmed">
            Strategic intelligence, AI-powered insights, and PMO transformation resources for modern product teams
          </Text>
        </Stack>

        {/* Coming Soon Notice */}
        <Card shadow="sm" padding="lg" radius="md" mb={48}>
          <Text ta="center" c="dimmed">
            🔍 Advanced search and filtering coming soon - browse all resources below
          </Text>
        </Card>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <Stack mb={60}>
            <Group>
              <IconTrendingUp size={24} color="var(--marketing-primary)" />
              <Title order={2}>Featured Resources</Title>
            </Group>
            <Grid>
              {featuredArticles.map(article => (
                <Grid.Col key={article.id} span={{ base: 12, md: 6 }}>
                  <Card 
                    shadow="md" 
                    padding="xl" 
                    radius="lg" 
                    h="100%" 
                    component={Link} 
                    href={article.url} 
                    style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                  >
                    <Badge size="sm" color="orange" mb="md">Featured</Badge>
                    <Title order={3} size="h3" mb="sm">{article.title}</Title>
                    <Text c="dimmed" mb="md">{article.description}</Text>
                    <Group justify="space-between" mt="auto">
                      <Badge variant="light" color="blue">{article.category}</Badge>
                      <Text size="sm" c="dimmed">{article.readTime}</Text>
                    </Group>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        )}

        {/* All Resources */}
        <Stack>
          <Group>
            <IconBrain size={24} color="var(--marketing-success)" />
            <Title order={2}>All Resources</Title>
            <Badge variant="light" color="gray">{resourceArticles.length} articles</Badge>
          </Group>
          <Grid>
            {regularArticles.map(article => (
              <Grid.Col key={article.id} span={{ base: 12, md: 6, lg: 4 }}>
                <Card 
                  shadow="sm" 
                  padding="lg" 
                  radius="md" 
                  h="100%" 
                  component={Link} 
                  href={article.url} 
                  style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                  <Title order={4} size="h4" mb="sm">{article.title}</Title>
                  <Text size="sm" c="dimmed" mb="md">{article.description}</Text>
                  <Stack gap={8}>
                    <Group justify="space-between">
                      <Badge variant="light" size="sm" color="blue">{article.category}</Badge>
                      <Text size="xs" c="dimmed">{article.readTime}</Text>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>

        {/* CTA Section */}
        <Card 
          shadow="xl" 
          padding="xl" 
          radius="lg" 
          mt={80} 
          ta="center"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <Group justify="center" mb="lg">
            <IconTarget size={32} />
            <Title order={2} c="white">Ready to Transform Your PM Workflow?</Title>
          </Group>
          <Text size="lg" mb="lg" opacity={0.9}>
            Join 2,500+ product managers using PM33's AI-powered strategic intelligence platform
          </Text>
          <Group justify="center">
            <Button 
              size="lg"
              variant="white"
              color="dark"
              component={Link}
              href="/trial"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg"
              variant="outline"
              style={{ borderColor: 'white', color: 'white' }}
              component={Link}
              href="/features"
            >
              Explore Features
            </Button>
          </Group>
        </Card>
      </Container>
    </div>
  );
}