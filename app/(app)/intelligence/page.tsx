'use client';

import React, { useState } from 'react';
import { 
  Container, 
  Card, 
  Title, 
  Text, 
  Group, 
  Stack, 
  Button, 
  Box,
  Textarea,
  Select,
  Badge,
  Tabs
} from '@mantine/core';
import { 
  IconBrain, 
  IconSend,
  IconAnalyze,
  IconReport,
  IconChartLine,
  IconBulb
} from '@tabler/icons-react';
import AppNavigation from '../../../components/app/AppNavigation';
import { useDesignSystem } from '../../../components/app/DesignSystemProvider';

export default function IntelligencePage() {
  const { theme } = useDesignSystem();
  const [query, setQuery] = useState('');
  const [analysisType, setAnalysisType] = useState('strategic');

  const analysisTypes = [
    { value: 'strategic', label: 'Strategic Analysis' },
    { value: 'competitive', label: 'Competitive Intelligence' },
    { value: 'market', label: 'Market Research' },
    { value: 'risk', label: 'Risk Assessment' },
  ];

  const recentAnalyses = [
    {
      title: 'Q2 Feature Prioritization Matrix',
      type: 'Strategic Analysis',
      status: 'Completed',
      confidence: 94,
      time: '2 hours ago'
    },
    {
      title: 'Competitive Landscape Assessment',
      type: 'Competitive Intelligence',
      status: 'In Progress',
      confidence: 78,
      time: '1 day ago'
    },
    {
      title: 'User Journey Optimization Study',
      type: 'Market Research',
      status: 'Completed',
      confidence: 87,
      time: '3 days ago'
    }
  ];

  return (
    <Box style={{ minHeight: '100vh', backgroundColor: theme.colors.bgSecondary }}>
      <AppNavigation />
      
      <Container size={1200} py={32}>
        <Stack gap={32}>
          {/* Header */}
          <Stack gap={8}>
            <Group>
              <IconBrain size={32} style={{ color: theme.colors.primary }} />
              <Stack gap={4}>
                <Title order={1} fw={700} style={{ color: theme.colors.textPrimary, fontSize: '28px' }}>
                  Strategic Intelligence Engine
                </Title>
                <Text size="lg" style={{ color: theme.colors.textSecondary }}>
                  Transform strategic questions into executable insights with AI-powered analysis
                </Text>
              </Stack>
            </Group>
          </Stack>

          {/* Main Intelligence Interface */}
          <Card 
            p={32}
            radius={12}
            shadow="sm"
            style={{ 
              backgroundColor: theme.colors.bgPrimary,
              border: `1px solid ${theme.colors.bgAccent}`
            }}
          >
            <Stack gap={24}>
              <Group justify="space-between">
                <Stack gap={4}>
                  <Title order={3} fw={600} style={{ color: theme.colors.textPrimary }}>
                    New Strategic Analysis
                  </Title>
                  <Text size="sm" style={{ color: theme.colors.textTertiary }}>
                    Ask strategic questions and get AI-powered insights with confidence scoring
                  </Text>
                </Stack>
                <Badge color="blue" variant="light" size="lg">
                  <Group gap={4}>
                    <IconAnalyze size={14} />
                    AI Engine Active
                  </Group>
                </Badge>
              </Group>

              <Stack gap={16}>
                <Select
                  label="Analysis Type"
                  placeholder="Select analysis framework"
                  data={analysisTypes}
                  value={analysisType}
                  onChange={(value) => setAnalysisType(value || 'strategic')}
                  size="md"
                  styles={{
                    label: { color: theme.colors.textSecondary, fontWeight: 500 },
                    input: { 
                      backgroundColor: theme.colors.bgTertiary,
                      border: `1px solid ${theme.colors.bgAccent}`,
                      '&:focus': { borderColor: theme.colors.primary }
                    }
                  }}
                />

                <Textarea
                  label="Strategic Question or Context"
                  placeholder="e.g., 'Should we prioritize user acquisition or retention features for Q2? Our current MAU is 50k with 15% monthly churn...'"
                  value={query}
                  onChange={(event) => setQuery(event.currentTarget.value)}
                  minRows={4}
                  maxRows={8}
                  size="md"
                  styles={{
                    label: { color: theme.colors.textSecondary, fontWeight: 500 },
                    input: { 
                      backgroundColor: theme.colors.bgTertiary,
                      border: `1px solid ${theme.colors.bgAccent}`,
                      '&:focus': { borderColor: theme.colors.primary }
                    }
                  }}
                />

                <Group justify="flex-end">
                  <Button
                    leftSection={<IconSend size={16} />}
                    size="md"
                    disabled={!query.trim()}
                    style={{
                      backgroundColor: theme.colors.primary,
                      '&:hover': { backgroundColor: theme.colors.primaryHover }
                    }}
                  >
                    Generate Strategic Intelligence
                  </Button>
                </Group>
              </Stack>
            </Stack>
          </Card>

          {/* Tabs for Results and History */}
          <Tabs defaultValue="results" variant="outline">
            <Tabs.List>
              <Tabs.Tab value="results" leftSection={<IconReport size={16} />}>
                Analysis Results
              </Tabs.Tab>
              <Tabs.Tab value="history" leftSection={<IconChartLine size={16} />}>
                Recent Analyses
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="results" pt="xl">
              <Card 
                p={32}
                radius={12}
                shadow="sm"
                style={{ 
                  backgroundColor: theme.colors.bgPrimary,
                  border: `1px solid ${theme.colors.bgAccent}`,
                  minHeight: '300px'
                }}
              >
                <Box 
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '250px',
                    backgroundColor: theme.colors.bgSecondary,
                    borderRadius: '8px',
                    border: `2px dashed ${theme.colors.bgAccent}`
                  }}
                >
                  <Stack align="center" gap={16}>
                    <IconBulb size={48} style={{ color: theme.colors.textMuted }} />
                    <Text size="lg" fw={500} style={{ color: theme.colors.textSecondary }}>
                      Strategic Analysis Results
                    </Text>
                    <Text size="sm" style={{ color: theme.colors.textMuted }}>
                      Submit a strategic question above to generate AI-powered insights
                    </Text>
                  </Stack>
                </Box>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="history" pt="xl">
              <Stack gap={16}>
                {recentAnalyses.map((analysis, index) => (
                  <Card
                    key={index}
                    p={24}
                    radius={12}
                    shadow="sm"
                    style={{ 
                      backgroundColor: theme.colors.bgPrimary,
                      border: `1px solid ${theme.colors.bgAccent}`
                    }}
                  >
                    <Group justify="space-between">
                      <Stack gap={8} style={{ flex: 1 }}>
                        <Group>
                          <Text fw={600} style={{ color: theme.colors.textPrimary }}>
                            {analysis.title}
                          </Text>
                          <Badge
                            color={analysis.status === 'Completed' ? 'green' : 'blue'}
                            variant="light"
                            size="sm"
                          >
                            {analysis.status}
                          </Badge>
                        </Group>
                        
                        <Group gap={16}>
                          <Text size="sm" style={{ color: theme.colors.textTertiary }}>
                            {analysis.type}
                          </Text>
                          <Text size="sm" style={{ color: theme.colors.textMuted }}>
                            •
                          </Text>
                          <Text size="sm" style={{ color: theme.colors.textTertiary }}>
                            Confidence: {analysis.confidence}%
                          </Text>
                          <Text size="sm" style={{ color: theme.colors.textMuted }}>
                            •
                          </Text>
                          <Text size="sm" style={{ color: theme.colors.textMuted }}>
                            {analysis.time}
                          </Text>
                        </Group>
                      </Stack>
                      
                      <Button variant="subtle" size="sm">
                        View Analysis
                      </Button>
                    </Group>
                  </Card>
                ))}
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Container>
    </Box>
  );
}