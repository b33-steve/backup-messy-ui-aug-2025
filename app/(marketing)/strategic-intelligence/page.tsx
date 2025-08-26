'use client';

import React, { useState } from 'react';
import { Container, Card, Title, Text, Button, Stack, Badge, Group, Box, TextInput, Textarea, Select, Progress, List } from '@mantine/core';
import { IconBrain, IconTarget, IconTrendingUp, IconCheck, IconSparkles, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

export default function StrategicIntelligencePage() {
  const [analysisStep, setAnalysisStep] = useState(0);
  const [query, setQuery] = useState('');

  const startDemo = () => {
    if (query.trim()) {
      setAnalysisStep(1);
      // Simulate AI analysis steps
      const steps = [1, 2, 3, 4];
      steps.forEach((step, index) => {
        setTimeout(() => setAnalysisStep(step), (index + 1) * 1500);
      });
    }
  };

  return (
    <Box py={80} style={{ backgroundColor: 'var(--marketing-bg-primary)' }}>
      <Container size="xl">
        {/* Header */}
        <Stack align="center" gap={32} mb={64}>
          <Badge size="lg" variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
            Live Demo
          </Badge>
          
          <Stack align="center" gap={16}>
            <Title order={1} size="h1" ta="center" lh={1.2}>
              Strategic Intelligence Engine
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={600}>
              Transform strategic questions into executable workflows with AI-powered analysis
            </Text>
          </Stack>
        </Stack>

        {/* Demo Interface */}
        <Card shadow="xl" radius="xl" p={48} mb={48}>
          <Stack gap={32}>
            <Group>
              <IconBrain size={32} color="var(--mantine-color-indigo-6)" />
              <Title order={2}>Ask Your Strategic Question</Title>
            </Group>

            <Stack gap={16}>
              <TextInput
                size="lg"
                placeholder="e.g., Should we prioritize mobile app performance or new features?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={analysisStep > 0}
              />
              
              <Group>
                <Button
                  size="lg"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'purple' }}
                  onClick={startDemo}
                  disabled={!query.trim() || analysisStep > 0}
                  rightSection={<IconArrowRight size={20} />}
                >
                  Analyze with AI
                </Button>
                {analysisStep > 0 && (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setAnalysisStep(0);
                      setQuery('');
                    }}
                  >
                    Reset Demo
                  </Button>
                )}
              </Group>
            </Stack>
          </Stack>
        </Card>

        {/* Analysis Process */}
        {analysisStep > 0 && (
          <Card shadow="lg" radius="xl" p={40} mb={32}>
            <Stack gap={24}>
              <Group>
                <IconTarget size={24} color="var(--mantine-color-teal-6)" />
                <Title order={3}>AI Analysis in Progress</Title>
              </Group>

              <Progress 
                value={analysisStep * 25} 
                size="lg" 
                color="indigo"
                striped={analysisStep < 4}
                animate={analysisStep < 4}
              />

              <Stack gap={16}>
                {analysisStep >= 1 && (
                  <Group>
                    <IconCheck size={20} color="var(--mantine-color-green-6)" />
                    <Text>Analyzing current data across your tools...</Text>
                  </Group>
                )}
                {analysisStep >= 2 && (
                  <Group>
                    <IconCheck size={20} color="var(--mantine-color-green-6)" />
                    <Text>Applying strategic frameworks (ICE, RICE, Porter's Five Forces)...</Text>
                  </Group>
                )}
                {analysisStep >= 3 && (
                  <Group>
                    <IconCheck size={20} color="var(--mantine-color-green-6)" />
                    <Text>Generating confidence-scored recommendations...</Text>
                  </Group>
                )}
                {analysisStep >= 4 && (
                  <Group>
                    <IconCheck size={20} color="var(--mantine-color-green-6)" />
                    <Text>Strategic analysis complete!</Text>
                  </Group>
                )}
              </Stack>
            </Stack>
          </Card>
        )}

        {/* Results */}
        {analysisStep >= 4 && (
          <Card shadow="xl" radius="xl" p={40} mb={48} style={{ border: '2px solid var(--marketing-success)' }}>
            <Stack gap={32}>
              <Group>
                <IconSparkles size={32} color="var(--mantine-color-teal-6)" />
                <Title order={2} c="teal.7">Strategic Recommendations</Title>
              </Group>

              <Stack gap={24}>
                <Card p={24} radius="lg" bg="teal.0" style={{ border: '1px solid var(--mantine-color-teal-2)' }}>
                  <Stack gap={12}>
                    <Group justify="space-between">
                      <Text fw={700} c="teal.7">Priority Recommendation</Text>
                      <Badge color="teal" variant="filled">95% Confidence</Badge>
                    </Group>
                    <Text c="dimmed">
                      Focus on mobile app performance optimization. Based on analysis of 847 support tickets 
                      and user behavior data, mobile performance issues are causing 34% higher churn rates.
                    </Text>
                  </Stack>
                </Card>

                <Card p={24} radius="lg" bg="indigo.0" style={{ border: '1px solid var(--mantine-color-indigo-2)' }}>
                  <Stack gap={12}>
                    <Group justify="space-between">
                      <Text fw={700} c="indigo.7">Impact Analysis</Text>
                      <Badge color="indigo" variant="filled">Strategic</Badge>
                    </Group>
                    <List size="sm" spacing={8}>
                      <List.Item>Projected 34% reduction in mobile churn rate</List.Item>
                      <List.Item>Estimated $2.1M additional ARR over 12 months</List.Item>
                      <List.Item>3-month implementation timeline recommended</List.Item>
                      <List.Item>Requires 2 mobile engineers + 1 PM dedicated focus</List.Item>
                    </List>
                  </Stack>
                </Card>

                <Card p={24} radius="lg" bg="orange.0" style={{ border: '1px solid var(--mantine-color-orange-2)' }}>
                  <Stack gap={12}>
                    <Group justify="space-between">
                      <Text fw={700} c="orange.7">Next Steps</Text>
                      <Badge color="orange" variant="filled">Action Required</Badge>
                    </Group>
                    <List size="sm" spacing={8}>
                      <List.Item>Schedule technical discovery session with mobile team</List.Item>
                      <List.Item>Audit current mobile performance metrics baseline</List.Item>
                      <List.Item>Create detailed mobile performance optimization PRD</List.Item>
                      <List.Item>Secure executive approval for 3-month focused initiative</List.Item>
                    </List>
                  </Stack>
                </Card>
              </Stack>
            </Stack>
          </Card>
        )}

        {/* Features Showcase */}
        <Stack gap={32} mb={64}>
          <Title order={2} ta="center">How Strategic Intelligence Works</Title>
          
          <Group grow align="stretch">
            <Card p={32} radius="lg" shadow="md">
              <Stack gap={16}>
                <IconBrain size={48} color="var(--mantine-color-indigo-6)" />
                <Title order={4}>Multi-Framework Analysis</Title>
                <Text size="sm" c="dimmed">
                  Applies ICE/RICE scoring, Porter's Five Forces, and Jobs-to-be-Done frameworks 
                  automatically to every strategic question.
                </Text>
              </Stack>
            </Card>

            <Card p={32} radius="lg" shadow="md">
              <Stack gap={16}>
                <IconTarget size={48} color="var(--mantine-color-teal-6)" />
                <Title order={4}>Cross-Platform Intelligence</Title>
                <Text size="sm" c="dimmed">
                  Synthesizes data from Jira, Slack, customer support, analytics, and user research 
                  for comprehensive insights.
                </Text>
              </Stack>
            </Card>

            <Card p={32} radius="lg" shadow="md">
              <Stack gap={16}>
                <IconTrendingUp size={48} color="var(--mantine-color-orange-6)" />
                <Title order={4}>Predictive Recommendations</Title>
                <Text size="sm" c="dimmed">
                  Forecasts impact, timeline, and resource requirements with confidence scoring 
                  based on historical patterns.
                </Text>
              </Stack>
            </Card>
          </Group>
        </Stack>

        {/* CTA Section */}
        <Card shadow="xl" radius="xl" p={48} style={{ 
          background: 'linear-gradient(135deg, var(--marketing-primary) 0%, var(--marketing-cta) 100%)',
          textAlign: 'center'
        }}>
          <Stack align="center" gap={32}>
            <Badge size="lg" color="white" variant="light" leftSection={<IconSparkles size={16} />}>
              Ready for Strategic Intelligence?
            </Badge>
            
            <Title order={2} c="white" size="h1" maw={600} lh={1.1}>
              Transform Every Product Decision
              <Text span style={{ display: 'block', marginTop: 8 }}>
                Into Strategic Advantage
              </Text>
            </Title>
            
            <Text size="xl" c="rgba(255, 255, 255, 0.9)" maw={500} lh={1.6}>
              Join 2,500+ product managers using PM33's Strategic Intelligence Engine.
            </Text>
            
            <Group gap={24} justify="center">
              <Button 
                component={Link}
                href="/trial"
                size="xl"
                variant="white"
                color="dark"
                rightSection={<IconArrowRight size={20} />}
                style={{ borderRadius: 16, fontWeight: 700 }}
              >
                Start Your Free 14-Day Trial
              </Button>
              <Button 
                component={Link}
                href="/pricing"
                size="xl"
                variant="outline"
                style={{ 
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                  borderRadius: 16 
                }}
              >
                View Pricing
              </Button>
            </Group>
            
            <Group gap={32} justify="center">
              {[
                { icon: IconCheck, text: "No credit card required" },
                { icon: IconBrain, text: "Full AI analysis included" },
                { icon: IconTarget, text: "Cancel anytime" }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Group key={index} gap={8}>
                    <IconComponent size={20} color="rgba(167, 243, 208, 1)" />
                    <Text c="rgba(255, 255, 255, 0.9)" fw={500} size="sm">
                      {item.text}
                    </Text>
                  </Group>
                );
              })}
            </Group>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}