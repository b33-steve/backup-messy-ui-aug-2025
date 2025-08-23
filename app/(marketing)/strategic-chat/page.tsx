'use client';

import React from 'react';
import { Container, Title, Text, Button, Card, Stack, Badge, Group, SimpleGrid, Box, ThemeIcon, Progress, Alert } from '@mantine/core';
import { IconMessageCircle, IconBrain, IconBolt, IconTarget, IconRocket, IconMail } from '@tabler/icons-react';
import Link from 'next/link';
import Navigation from '../../../components/marketing/Navigation';
import Footer from '../../../components/marketing/Footer';

export default function StrategicChatPage() {
  return (
    <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <Navigation />
      
      <Container size="xl" px="md" py="xl">
        {/* Header Section */}
        <Stack align="center" gap={32} mb={64}>
          <ThemeIcon size={80} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
            <IconMessageCircle size={40} />
          </ThemeIcon>
          
          <Stack align="center" gap={16}>
            <Badge size="xl" color="blue" variant="light">
              🚧 Coming Soon
            </Badge>
            <Title order={1} size={48} ta="center" lh={1.2}>
              Strategic AI Chat
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6}>
              Intelligent conversational interface for strategic product management decisions
            </Text>
          </Stack>
          
          <Progress value={60} size="xl" w="100%" maw={400} color="blue" />
          <Text size="sm" c="dimmed">Development Progress: 60% Complete</Text>
        </Stack>

        {/* Feature Preview */}
        <Card shadow="xl" padding="xl" radius="xl" mb={48}>
          <Stack gap={32}>
            <Group justify="space-between">
              <Title order={2}>AI-Powered Strategic Conversations</Title>
              <Badge color="cyan" variant="light">Phase 2 Release</Badge>
            </Group>
            
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing={24}>
              <Card padding="lg" withBorder>
                <ThemeIcon size={48} variant="light" color="blue" mb="md">
                  <IconBrain size={24} />
                </ThemeIcon>
                <Text fw={600} mb="xs">Intelligent Query Processing</Text>
                <Text size="sm" c="dimmed">
                  Natural language strategic questions with context-aware AI responses
                </Text>
              </Card>
              
              <Card padding="lg" withBorder>
                <ThemeIcon size={48} variant="light" color="cyan" mb="md">
                  <IconBolt size={24} />
                </ThemeIcon>
                <Text fw={600} mb="xs">Real-time Strategic Analysis</Text>
                <Text size="sm" c="dimmed">
                  Instant strategic insights and recommendations through conversational AI
                </Text>
              </Card>
              
              <Card padding="lg" withBorder>
                <ThemeIcon size={48} variant="light" color="teal" mb="md">
                  <IconTarget size={24} />
                </ThemeIcon>
                <Text fw={600} mb="xs">Decision Support</Text>
                <Text size="sm" c="dimmed">
                  AI-guided decision trees and strategic option evaluation
                </Text>
              </Card>
            </SimpleGrid>
          </Stack>
        </Card>

        {/* Expected Features */}
        <Card shadow="md" padding="xl" radius="xl" mb={48} bg="gradient-to-br from-blue-50 to-cyan-50">
          <Stack gap={24}>
            <Title order={3}>Conversational Features</Title>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={16}>
              {[
                "Natural language strategic questioning",
                "Context-aware AI responses and insights", 
                "Strategic framework recommendations",
                "Real-time competitive intelligence queries",
                "Product roadmap discussion and planning",
                "Resource allocation conversation support",
                "Risk assessment through dialogue",
                "Strategic initiative planning assistance"
              ].map((feature, index) => (
                <Group key={index} gap="sm">
                  <ThemeIcon size={20} variant="light" color="blue">
                    <Text size="xs" fw={600}>✓</Text>
                  </ThemeIcon>
                  <Text size="sm">{feature}</Text>
                </Group>
              ))}
            </SimpleGrid>
          </Stack>
        </Card>

        {/* Mock Chat Preview */}
        <Card shadow="xl" padding="xl" radius="xl" mb={48} bg="gradient-to-br from-gray-50 to-blue-50">
          <Stack gap={24}>
            <Title order={3}>Chat Interface Preview</Title>
            
            <Card padding="lg" withBorder bg="white">
              <Stack gap={16}>
                <Group>
                  <ThemeIcon size={32} variant="light" color="gray">
                    <Text size="sm" fw={600}>PM</Text>
                  </ThemeIcon>
                  <Text size="sm" c="dimmed">Product Manager</Text>
                </Group>
                <Text>"How should we prioritize our Q2 roadmap features given our current competitive landscape?"</Text>
              </Stack>
            </Card>
            
            <Card padding="lg" withBorder bg="blue.0">
              <Stack gap={16}>
                <Group>
                  <ThemeIcon size={32} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                    <IconBrain size={16} />
                  </ThemeIcon>
                  <Text size="sm" c="dimmed">PM33 Strategic AI</Text>
                </Group>
                <Text>Based on your competitive analysis, I recommend using the RICE framework. Let me analyze your current features against market position...</Text>
              </Stack>
            </Card>
            
            <Alert color="blue" variant="light" radius="md">
              <Text size="sm">
                The Strategic Chat will provide intelligent, context-aware conversations for all your 
                strategic product management decisions and planning needs.
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
              Experience our live Strategic Intelligence Engine for advanced strategic analysis and decision support.
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
                leftSection={<IconTarget size={16} />}
              >
                Try Command Center
              </Button>
            </Group>
          </Stack>
        </Alert>

        {/* Notify Section */}
        <Card shadow="xl" padding="xl" radius="xl" bg="gradient-to-br from-blue-600 to-cyan-600" style={{ color: 'white' }}>
          <Stack align="center" gap={24}>
            <ThemeIcon size={64} variant="white">
              <IconMail size={32} color="var(--mantine-color-blue-6)" />
            </ThemeIcon>
            <Title order={2} ta="center" c="white">Strategic AI Chat Early Access</Title>
            <Text ta="center" size="lg" style={{ opacity: 0.9 }}>
              Get exclusive early access to Strategic AI Chat when it launches. 
              Perfect for product managers who want conversational strategic intelligence.
            </Text>
            <Button 
              component={Link}
              href="/trial"
              size="xl"
              variant="white"
              color="blue"
            >
              Request Early Access
            </Button>
          </Stack>
        </Card>
      </Container>
      
      <Footer />
    </Box>
  );
}