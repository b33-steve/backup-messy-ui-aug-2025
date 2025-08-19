'use client';

import React from 'react';
import { Container, Title, Text, Button, Card, Stack, Badge, Group, SimpleGrid, Box, ThemeIcon, Progress, Alert } from '@mantine/core';
import { IconChartLine, IconEye, IconTrendingUp, IconBrain, IconRocket, IconMail } from '@tabler/icons-react';
import Link from 'next/link';
import Navigation from '../../../components/shared/Navigation';
import Footer from '../../../components/shared/Footer';

export default function StrategicDashboardPage() {
  return (
    <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <Navigation />
      
      <Container size="xl" px="md" py="xl">
        {/* Header Section */}
        <Stack align="center" gap={32} mb={64}>
          <ThemeIcon size={80} variant="gradient" gradient={{ from: 'violet', to: 'blue' }}>
            <IconChartLine size={40} />
          </ThemeIcon>
          
          <Stack align="center" gap={16}>
            <Badge size="xl" color="violet" variant="light">
              🚧 Coming Soon
            </Badge>
            <Title order={1} size={48} ta="center" lh={1.2}>
              Strategic Dashboard
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6}>
              Executive-level strategic insights with competitive intelligence and predictive market analysis
            </Text>
          </Stack>
          
          <Progress value={45} size="xl" w="100%" maw={400} color="violet" />
          <Text size="sm" c="dimmed">Development Progress: 45% Complete</Text>
        </Stack>

        {/* Feature Preview */}
        <Card shadow="xl" padding="xl" radius="xl" mb={48}>
          <Stack gap={32}>
            <Group justify="space-between">
              <Title order={2}>Executive Intelligence Platform</Title>
              <Badge color="blue" variant="light">Phase 2 Release</Badge>
            </Group>
            
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing={24}>
              <Card padding="lg" withBorder>
                <ThemeIcon size={48} variant="light" color="blue" mb="md">
                  <IconEye size={24} />
                </ThemeIcon>
                <Text fw={600} mb="xs">Competitive Intelligence</Text>
                <Text size="sm" c="dimmed">
                  Real-time competitive analysis and market positioning insights
                </Text>
              </Card>
              
              <Card padding="lg" withBorder>
                <ThemeIcon size={48} variant="light" color="green" mb="md">
                  <IconTrendingUp size={24} />
                </ThemeIcon>
                <Text fw={600} mb="xs">Strategic Forecasting</Text>
                <Text size="sm" c="dimmed">
                  Predictive analytics for market trends and strategic opportunity identification
                </Text>
              </Card>
              
              <Card padding="lg" withBorder>
                <ThemeIcon size={48} variant="light" color="purple" mb="md">
                  <IconBrain size={24} />
                </ThemeIcon>
                <Text fw={600} mb="xs">Executive Briefings</Text>
                <Text size="sm" c="dimmed">
                  AI-generated executive summaries with actionable strategic recommendations
                </Text>
              </Card>
            </SimpleGrid>
          </Stack>
        </Card>

        {/* Expected Features */}
        <Card shadow="md" padding="xl" radius="xl" mb={48} bg="gradient-to-br from-violet-50 to-blue-50">
          <Stack gap={24}>
            <Title order={3}>Executive Features</Title>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={16}>
              {[
                "Real-time competitive landscape monitoring",
                "Strategic opportunity identification dashboard",
                "Market trend analysis and predictions",
                "Executive decision support system",
                "Strategic initiative performance tracking",
                "Cross-portfolio strategic alignment view",
                "Risk assessment and mitigation planning",
                "Strategic KPI monitoring and alerts"
              ].map((feature, index) => (
                <Group key={index} gap="sm">
                  <ThemeIcon size={20} variant="light" color="violet">
                    <Text size="xs" fw={600}>✓</Text>
                  </ThemeIcon>
                  <Text size="sm">{feature}</Text>
                </Group>
              ))}
            </SimpleGrid>
          </Stack>
        </Card>

        {/* Mock Dashboard Preview */}
        <Card shadow="xl" padding="xl" radius="xl" mb={48} bg="gradient-to-br from-gray-50 to-indigo-50">
          <Stack gap={24}>
            <Title order={3}>Dashboard Preview</Title>
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={24}>
              <Card padding="lg" withBorder bg="white">
                <Text size="xs" c="dimmed" mb="xs">COMPETITIVE POSITION</Text>
                <Text size="xl" fw={700} c="green">Leading</Text>
                <Text size="sm" c="dimmed">vs. 15 competitors</Text>
              </Card>
              
              <Card padding="lg" withBorder bg="white">
                <Text size="xs" c="dimmed" mb="xs">MARKET OPPORTUNITY</Text>
                <Text size="xl" fw={700} c="blue">$2.3B</Text>
                <Text size="sm" c="dimmed">Total addressable market</Text>
              </Card>
              
              <Card padding="lg" withBorder bg="white">
                <Text size="xs" c="dimmed" mb="xs">STRATEGIC INITIATIVES</Text>
                <Text size="xl" fw={700} c="orange">8/12</Text>
                <Text size="sm" c="dimmed">On track for Q2 goals</Text>
              </Card>
            </SimpleGrid>
            
            <Alert color="blue" variant="light" radius="md">
              <Text size="sm">
                This dashboard will provide executive-level strategic insights combining competitive intelligence, 
                market analysis, and predictive forecasting in a single view.
              </Text>
            </Alert>
          </Stack>
        </Card>

        {/* Try Current Features */}
        <Alert 
          color="blue" 
          title="While You Wait..." 
          icon={<IconRocket size={20} />}
          radius="xl"
          mb={48}
        >
          <Stack gap={16}>
            <Text>
              Experience our live Strategic Intelligence Engine and Command Center for tactical-level insights.
            </Text>
            <Group>
              <Button 
                component={Link}
                href="/strategic-intelligence"
                variant="light"
                leftSection={<IconBrain size={16} />}
              >
                Try Strategic Intelligence
              </Button>
              <Button 
                component={Link}
                href="/command-center"
                variant="light"
                leftSection={<IconTrendingUp size={16} />}
              >
                Try Command Center
              </Button>
            </Group>
          </Stack>
        </Alert>

        {/* Notify Section */}
        <Card shadow="xl" padding="xl" radius="xl" bg="gradient-to-br from-violet-600 to-blue-600" style={{ color: 'white' }}>
          <Stack align="center" gap={24}>
            <ThemeIcon size={64} variant="white">
              <IconMail size={32} color="var(--mantine-color-violet-6)" />
            </ThemeIcon>
            <Title order={2} ta="center" c="white">Executive Early Access</Title>
            <Text ta="center" size="lg" style={{ opacity: 0.9 }}>
              Get exclusive early access to the Strategic Dashboard when it launches. 
              Perfect for executives and strategic decision-makers.
            </Text>
            <Button 
              component={Link}
              href="/trial"
              size="xl"
              variant="white"
              color="violet"
            >
              Request Executive Access
            </Button>
          </Stack>
        </Card>
      </Container>
      
      <Footer />
    </Box>
  );
}