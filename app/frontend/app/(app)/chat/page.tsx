'use client';

import React, { useState } from 'react';
import { Container, Card, Title, Text, Button, Textarea, Group, Stack, Badge, Grid } from '@mantine/core';
import { IconBrain, IconTarget, IconTrendingUp, IconUsers } from '@tabler/icons-react';
import { DemoBadge, DemoContent, useDemoMode } from '../../../components/shared/SimplifiedNavigation';

const ChatPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const { isDemoMode } = useDemoMode();

  const templateQuestions = [
    {
      icon: <IconTarget size={16} />,
      title: 'Competitive Response',
      example: 'Competitor X just launched feature Y. How should we respond?'
    },
    {
      icon: <IconTrendingUp size={16} />,
      title: 'Resource Allocation', 
      example: 'Should we hire 5 engineers or invest $200K in marketing?'
    },
    {
      icon: <IconBrain size={16} />,
      title: 'Feature Priority',
      example: 'Which features should we prioritize for Q4 roadmap?'
    },
    {
      icon: <IconUsers size={16} />,
      title: 'Market Positioning',
      example: 'How should we position against enterprise competitors?'
    }
  ];

  // Demo data - enhanced but realistic
  const recentAnalyses = isDemoMode ? [
    {
      id: 1,
      title: 'Competitive Response to Feature Launch X',
      confidence: 94,
      framework: "Porter's Five Forces",
      recommendation: 'Fast-follower strategy with differentiation',
      timeline: '6 weeks',
      tasks: 8,
      impact: '$156K impact',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      title: 'Resource allocation: Engineering vs Marketing',
      confidence: 87,
      framework: 'Cost-benefit with ROI',
      recommendation: '60% eng, 40% marketing for Q4',
      timeline: '3 weeks',
      tasks: 6,
      impact: '$89K savings identified',
      timestamp: '5 hours ago'
    }
  ] : [];

  return (
    <Container size={1200} px={24} py={48}>
      {/* Page Header */}
      <Stack gap={32}>
        <div>
          <Group justify="space-between" align="flex-start">
            <Stack gap={8}>
              <Title order={1} size="h1" c="dark">
                Chat
              </Title>
              <Text size="lg" c="dimmed">
                Strategic questions and AI analysis
              </Text>
            </Stack>
            <Group gap={16}>
              <Badge size="lg" variant="light" color="blue">
                Questions today: {isDemoMode ? '23' : '3'}
              </Badge>
            </Group>
          </Group>
        </div>

        {/* Quick Templates */}
        <div>
          <Title order={3} size="h3" mb={16}>
            Quick Templates
          </Title>
          <Grid gutter={16}>
            {templateQuestions.map((template, index) => (
              <Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }}>
                <Card
                  shadow="sm"
                  padding="md"
                  radius="md"
                  withBorder
                  style={{ 
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onClick={() => setQuery(template.example)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <Group gap={8} mb={8}>
                    {template.icon}
                    <Text size="sm" fw={600}>
                      {template.title}
                    </Text>
                  </Group>
                  <Text size="xs" c="dimmed">
                    {template.example}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </div>

        {/* Question Input */}
        <Card shadow="lg" padding={32} radius={16}>
          <Stack gap={24}>
            <div>
              <Title order={2} size="h2" mb={8}>
                🎯 Ask your strategic question
              </Title>
              <Text c="dimmed" size="lg">
                Get AI-powered analysis with confidence scoring and executable recommendations
              </Text>
            </div>

            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your strategic question..."
              rows={4}
              size="lg"
              styles={{
                input: {
                  fontSize: '16px',
                  lineHeight: 1.5
                }
              }}
            />

            <Group justify="space-between" align="center">
              <Button
                size="lg"
                leftSection={<IconBrain size={20} />}
                disabled={!query.trim()}
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
                onClick={() => {
                  // TODO: Implement AI analysis
                  console.log('Analyzing:', query);
                }}
              >
                Generate Analysis
              </Button>
              <Text size="sm" c="dimmed">
                ⚡ AI-powered analysis with framework application
              </Text>
            </Group>
          </Stack>
        </Card>

        {/* Recent Analysis */}
        {recentAnalyses.length > 0 && (
          <div>
            <Group justify="space-between" align="center" mb={16}>
              <Title order={3} size="h3">
                Recent Analysis
              </Title>
              <DemoBadge />
            </Group>
            
            <Stack gap={16}>
              {recentAnalyses.map((analysis) => (
                <DemoContent key={analysis.id}>
                  <Card shadow="md" padding="xl" radius={12}>
                    <Stack gap={16}>
                      <Group justify="space-between" align="flex-start">
                        <div>
                          <Title order={4} size="h4" mb={4}>
                            📊 {analysis.title}
                          </Title>
                          <Group gap={16} mb={8}>
                            <Badge size="sm" color="green" variant="light">
                              Confidence: {analysis.confidence}%
                            </Badge>
                            <Badge size="sm" color="blue" variant="light">
                              {analysis.framework}
                            </Badge>
                          </Group>
                        </div>
                        <Text size="xs" c="dimmed">
                          {analysis.timestamp}
                        </Text>
                      </Group>

                      <div>
                        <Text fw={500} mb={4}>
                          Recommendation:
                        </Text>
                        <Text c="dimmed" mb={12}>
                          {analysis.recommendation}
                        </Text>
                        
                        <Group gap={24}>
                          <Text size="sm">
                            <strong>Timeline:</strong> {analysis.timeline}
                          </Text>
                          <Text size="sm">
                            <strong>Tasks:</strong> {analysis.tasks}
                          </Text>
                          <Text size="sm" c="green">
                            <strong>Impact:</strong> {analysis.impact}
                          </Text>
                        </Group>
                      </div>

                      <Group gap={12}>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Export Plan
                        </Button>
                        <Button size="sm" color="green">
                          Create Tasks
                        </Button>
                      </Group>
                    </Stack>
                  </Card>
                </DemoContent>
              ))}
            </Stack>
          </div>
        )}
      </Stack>
    </Container>
  );
};

export default ChatPage;