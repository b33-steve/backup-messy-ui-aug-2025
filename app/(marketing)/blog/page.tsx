import { Container, Title, Text, Card, Stack, Badge, Button, Grid, Group, Divider } from '@mantine/core';
import { IconCalendar, IconUser, IconArrowRight, IconTrendingUp, IconBrain, IconTarget } from '@tabler/icons-react';

export default function BlogPage() {
  const keywordInsights = [
    { keyword: "AI Product Management", volume: "8.2K/month", difficulty: "Medium", intent: "Commercial" },
    { keyword: "PMO Transformation", volume: "3.1K/month", difficulty: "Low", intent: "Informational" },
    { keyword: "Strategic Intelligence", volume: "5.5K/month", difficulty: "High", intent: "Research" },
    { keyword: "Product Management AI", volume: "4.8K/month", difficulty: "Medium", intent: "Commercial" },
    { keyword: "Agentic AI Teams", volume: "2.3K/month", difficulty: "Low", intent: "Educational" },
    { keyword: "PM Tool Integration", volume: "6.7K/month", difficulty: "Medium", intent: "Commercial" }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI-Powered Product Management: 2025 Strategic Framework",
      excerpt: "Discover how strategic intelligence transforms product decisions, accelerates roadmap execution, and delivers PMO-level capabilities for individual product managers.",
      author: "PM33 Strategy Team",
      date: "January 15, 2025",
      category: "Strategic Intelligence",
      readTime: "8 min read",
      featured: true,
      tags: ["AI Product Management", "Strategic Intelligence", "PMO Transformation"]
    },
    {
      id: 2,
      title: "From Reactive to Strategic: Building PMO Capabilities Without the Team", 
      excerpt: "Transform your PM practice with agentic AI teams that deliver enterprise PMO-level strategic capabilities, competitive intelligence, and workflow automation.",
      author: "Sarah Chen, Senior PM",
      date: "January 12, 2025",
      category: "PMO Transformation",
      readTime: "12 min read",
      tags: ["PMO Transformation", "Agentic AI Teams", "Strategic Intelligence"]
    },
    {
      id: 3,
      title: "AI Product Management Tool Integration: The Complete 2025 Guide",
      excerpt: "Learn how to enhance your existing PM tools with AI intelligence instead of replacing them. Complete integration strategies for Jira, Linear, Monday, and Asana.",
      author: "Mike Rodriguez, PM Lead",
      date: "January 10, 2025", 
      category: "Tool Integration",
      readTime: "15 min read",
      tags: ["PM Tool Integration", "AI Product Management", "Workflow Automation"]
    },
    {
      id: 4,
      title: "Strategic Intelligence vs Traditional PM Analytics: ROI Analysis",
      excerpt: "Data-driven comparison showing how AI-powered strategic intelligence delivers 300% better decision confidence vs traditional PM analytics dashboards.",
      author: "Data Intelligence Team",
      date: "January 8, 2025",
      category: "Strategic Intelligence", 
      readTime: "10 min read",
      tags: ["Strategic Intelligence", "PM Analytics", "ROI Analysis"]
    },
    {
      id: 5,
      title: "Agentic AI Teams for Product Managers: Multi-AI Orchestration Strategy",
      excerpt: "Deep dive into how 4 specialized AI teams (Strategic, Workflow, Data, Communication) work together to transform individual PMs into PMO-level strategic leaders.",
      author: "AI Architecture Team",
      date: "January 5, 2025",
      category: "Agentic AI",
      readTime: "18 min read", 
      tags: ["Agentic AI Teams", "Multi-AI Orchestration", "PMO Transformation"]
    },
    {
      id: 6,
      title: "Product Management AI vs Human PM: Collaboration Framework 2025",
      excerpt: "How AI augments rather than replaces human PM expertise. Framework for AI-human collaboration that enhances strategic thinking and customer empathy.",
      author: "PM Community Research",
      date: "January 3, 2025",
      category: "AI Collaboration",
      readTime: "11 min read",
      tags: ["Product Management AI", "Human-AI Collaboration", "Strategic Intelligence"]
    }
  ];

  const categories = [
    { name: "Strategic Intelligence", count: 12, color: "blue" },
    { name: "PMO Transformation", count: 8, color: "purple" },
    { name: "AI Product Management", count: 15, color: "cyan" },
    { name: "Tool Integration", count: 6, color: "green" },
    { name: "Agentic AI Teams", count: 4, color: "orange" }
  ];

  return (
    <Container size={1400} px={24} py={40}>
      
      {/* Header Section */}
      <Stack gap={24} ta="center" mb={64}>
        <Badge
          size="lg"
          variant="gradient"
          gradient={{ from: 'purple', to: 'pink' }}
          radius="xl"
        >
          📚 Strategic Insights & Keyword Intelligence
        </Badge>
        <Title order={1} size="h1" fw={700}>
          Product Management Intelligence Hub
        </Title>
        <Text size="xl" c="dimmed" maw={800} mx="auto">
          Strategic insights, AI-powered frameworks, and data-driven case studies from the PM33 community. 
          Research-backed content optimized for product management professionals seeking PMO-level capabilities.
        </Text>
      </Stack>

      {/* Keyword Insights Section */}
      <Card shadow="md" padding={48} radius={16} mb={60} style={{ backgroundColor: 'var(--marketing-bg-secondary)' }}>
        <Title order={2} mb={32} ta="center">
          🎯 Strategic Keyword Intelligence Dashboard
        </Title>
        <Text ta="center" mb={32} c="dimmed" size="lg">
          Data-driven insights into product management search trends and strategic opportunities
        </Text>
        
        <Grid>
          {keywordInsights.map((insight, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
              <Card padding="lg" radius="lg" shadow="sm" style={{ height: '100%' }}>
                <Group justify="space-between" mb={8}>
                  <Text fw={600} size="sm">{insight.keyword}</Text>
                  <Badge size="xs" variant="light" color={
                    insight.difficulty === 'Low' ? 'green' : 
                    insight.difficulty === 'Medium' ? 'yellow' : 'red'
                  }>
                    {insight.difficulty}
                  </Badge>
                </Group>
                <Text size="lg" fw={700} c="var(--marketing-primary)" mb={4}>
                  {insight.volume}
                </Text>
                <Text size="xs" c="dimmed">
                  Search Intent: {insight.intent}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Card>

      {/* Categories Section */}
      <Card shadow="md" padding={32} radius={16} mb={60}>
        <Title order={3} mb={24} ta="center">Browse by Strategic Focus Area</Title>
        <Group justify="center" gap="md">
          {categories.map((category, index) => (
            <Badge
              key={index}
              size="lg"
              radius="lg"
              variant="light"
              color={category.color}
              style={{ padding: '12px 16px', cursor: 'pointer' }}
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </Group>
      </Card>

      {/* Featured Posts Section */}
      <Title order={2} mb={40} ta="center">
        🚀 Latest Strategic Intelligence Articles
      </Title>
      
      <Grid>
        {blogPosts.map((post, index) => (
          <Grid.Col key={post.id} span={{ base: 12, md: 6, lg: post.featured ? 12 : 6 }}>
            <Card 
              padding="xl" 
              radius="lg" 
              shadow="md"
              style={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: post.featured ? '2px solid var(--marketing-primary)' : '1px solid rgba(0,0,0,0.1)'
              }}
            >
              {post.featured && (
                <Badge mb={16} size="sm" variant="filled" color="blue">
                  ⭐ Featured Analysis
                </Badge>
              )}
              
              <Group justify="space-between" mb={16}>
                <Badge variant="light" size="sm">{post.category}</Badge>
                <Group gap={8}>
                  <IconCalendar size={14} />
                  <Text size="xs" c="dimmed">{post.date}</Text>
                </Group>
              </Group>
              
              <Title order={post.featured ? 2 : 3} mb={16} fw={700}>
                {post.title}
              </Title>
              
              <Text c="dimmed" mb={20} style={{ lineHeight: 1.6 }}>
                {post.excerpt}
              </Text>
              
              <Group gap="xs" mb={20}>
                {post.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} size="xs" variant="outline">
                    {tag}
                  </Badge>
                ))}
              </Group>
              
              <Group justify="space-between" align="center">
                <Group gap={8}>
                  <IconUser size={14} />
                  <Text size="sm" c="dimmed">{post.author}</Text>
                  <Text size="sm" c="dimmed">•</Text>
                  <Text size="sm" c="dimmed">{post.readTime}</Text>
                </Group>
                <Button 
                  variant="subtle" 
                  rightSection={<IconArrowRight size={16} />}
                  size="sm"
                >
                  Read Analysis
                </Button>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Newsletter CTA */}
      <Card shadow="xl" padding={48} radius={20} mt={80}
            style={{ 
              background: 'linear-gradient(135deg, var(--marketing-success) 0%, var(--marketing-primary) 100%)',
              color: 'white',
              textAlign: 'center'
            }}>
        <IconBrain size={48} style={{ marginBottom: 24 }} />
        <Title order={2} mb={16} style={{ color: 'white' }}>
          Get Weekly Strategic Intelligence
        </Title>
        <Text size="lg" mb={32} maw={600} mx="auto" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          Join 2,500+ product managers getting data-driven insights, AI frameworks, and PMO transformation strategies delivered weekly.
        </Text>
        <Group justify="center" gap={16}>
          <Button 
            size="lg"
            variant="white"
            radius="xl"
            style={{ color: 'var(--marketing-primary)' }}
          >
            Subscribe to Strategic Insights
          </Button>
          <Button 
            size="lg"
            variant="outline"
            radius="xl"
            style={{ 
              borderColor: 'rgba(255, 255, 255, 0.8)', 
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            Browse Archive
          </Button>
        </Group>
      </Card>
      
    </Container>
  );
}
