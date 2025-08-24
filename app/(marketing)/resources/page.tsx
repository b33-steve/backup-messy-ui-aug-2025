'use client';

import { Container, Title, Text, Card, Group, Stack, Badge } from '@mantine/core';
import { IconBook, IconVideo, IconFileText, IconTrendingUp } from '@tabler/icons-react';

export default function ResourcesPage() {
  const resources = [
    {
      icon: IconBook,
      title: "PM33 Strategic Playbooks",
      description: "Comprehensive guides for strategic product management with AI assistance.",
      category: "Guide"
    },
    {
      icon: IconVideo,
      title: "Video Tutorials",
      description: "Step-by-step tutorials on maximizing PM33 for your workflow.",
      category: "Video"
    },
    {
      icon: IconFileText,
      title: "Case Studies",
      description: "Real-world examples of PM teams transforming with PM33 intelligence.",
      category: "Case Study"
    },
    {
      icon: IconTrendingUp,
      title: "Industry Insights",
      description: "Latest trends and analysis in AI-powered product management.",
      category: "Research"
    }
  ];

  return (
    <Container size={1200} px={24} py={80}>
      <div className="marketing-context">
        
        <Stack align="center" gap={48} mb={80}>
          <Badge size="lg" color="indigo" variant="light">
            📚 Resources & Insights
          </Badge>
          <Title order={1} size="h1" ta="center" fw={700} style={{ fontSize: '48px' }}>
            Strategic Intelligence Resources
          </Title>
          <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6}>
            Learn from the best practices and insights from successful product teams 
            using AI-powered strategic intelligence.
          </Text>
        </Stack>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 32 }}>
          {resources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <Card key={index} shadow="md" padding={32} radius={16} h="100%">
                <Stack gap={24}>
                  <Group>
                    <div style={{ 
                      padding: 12, 
                      borderRadius: 12, 
                      background: 'rgba(99, 102, 241, 0.1)' 
                    }}>
                      <IconComponent size={32} color="var(--mantine-color-indigo-6)" />
                    </div>
                    <Badge color="indigo" variant="light">
                      {resource.category}
                    </Badge>
                  </Group>
                  
                  <Stack gap={12}>
                    <Title order={3} size="h4" fw={600}>
                      {resource.title}
                    </Title>
                    <Text c="dimmed" lh={1.6}>
                      {resource.description}
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            );
          })}
        </div>

        <Card mt={80} shadow="lg" padding={48} radius={16} ta="center"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Title order={2} size="h3" mb={16}>
            Want More Strategic Intelligence?
          </Title>
          <Text size="lg" mb={32}>
            Subscribe to our weekly insights on AI-powered product management and strategic decision making.
          </Text>
          <Group justify="center">
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 24px', borderRadius: 8 }}>
              <Text size="sm">📧 Coming Soon: Weekly Strategic Intelligence Newsletter</Text>
            </div>
          </Group>
        </Card>

      </div>
    </Container>
  );
}