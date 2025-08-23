'use client';

import { Container, Title, Text, Button, Card, Group, Stack, Badge, Grid, Paper } from '@mantine/core';
import { IconRocket, IconTarget, IconBrain, IconChartBar, IconUsers, IconBolt } from '@tabler/icons-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container size={1200} px={24} py={40}>
      {/* Hero Section */}
      <Card shadow="md" padding={48} radius={16} mb={40}>
        <Stack align="center" gap={24}>
          <Badge size="lg" variant="gradient" gradient={{ from: 'blue', to: 'purple' }}>
            PMO Transformation Platform
          </Badge>
          
          <Title order={1} size="48px" fw={700} ta="center" c="dark">
            Transform from Product Manager to Strategic PMO
          </Title>
          
          <Text size="xl" ta="center" c="dimmed" maw={800}>
            Transform individual Product Managers into fully functional PMOs through 4 agentic AI teams. 
            Strategic Intelligence, Workflow Execution, Data Intelligence, and Communication coordination.
          </Text>
          
          <Group gap={16}>
            <Button 
              component={Link}
              href="/trial"
              size="xl"
              leftSection={<IconRocket size={20} />}
              style={{ 
                backgroundColor: '#1E40AF',
                fontSize: '18px',
                padding: '16px 32px',
                height: 'auto'
              }}
            >
              Start Free 14-Day Trial
            </Button>
            
            <Button 
              component={Link}
              href="/demo"
              size="xl"
              variant="outline"
              leftSection={<IconChartBar size={20} />}
              style={{ 
                fontSize: '18px',
                padding: '16px 32px',
                height: 'auto'
              }}
            >
              Live Demo
            </Button>
          </Group>
          
          <Text size="sm" c="dimmed">
            No credit card required • 2-minute setup • Instant strategic value
          </Text>
        </Stack>
      </Card>

      {/* Features Grid */}
      <Title order={2} size="32px" fw={600} ta="center" mb={32}>
        4 Agentic AI Teams for Complete PMO Transformation
      </Title>

      <Grid mb={40}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p={32} radius={12} h="100%">
            <Group mb={16}>
              <IconBrain size={32} color="#1E40AF" />
              <Title order={3} c="dark">Strategic Intelligence AI</Title>
            </Group>
            <Text c="dimmed" mb={16}>
              Multi-framework strategic analysis (ICE/RICE/Porter's Five Forces), competitive intelligence, 
              and strategic recommendations powered by Anthropic Claude.
            </Text>
            <Badge variant="light" color="blue">Anthropic Claude + Pinecone</Badge>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p={32} radius={12} h="100%">
            <Group mb={16}>
              <IconBolt size={32} color="#059669" />
              <Title order={3} c="dark">Workflow Execution AI</Title>
            </Group>
            <Text c="dimmed" mb={16}>
              Automated task creation, cross-functional coordination, PM tool integration, 
              and timeline management with structured outputs.
            </Text>
            <Badge variant="light" color="green">OpenAI + Railway + PM APIs</Badge>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p={32} radius={12} h="100%">
            <Group mb={16}>
              <IconChartBar size={32} color="#7C3AED" />
              <Title order={3} c="dark">Data Intelligence AI</Title>
            </Group>
            <Text c="dimmed" mb={16}>
              Company-specific context learning, historical pattern recognition, 
              predictive analytics and performance optimization.
            </Text>
            <Badge variant="light" color="violet">Together AI + Pinecone</Badge>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p={32} radius={12} h="100%">
            <Group mb={16}>
              <IconUsers size={32} color="#EA580C" />
              <Title order={3} c="dark">Communication AI</Title>
            </Group>
            <Text c="dimmed" mb={16}>
              Stakeholder communication, executive summaries, cross-team alignment, 
              and professional presentation generation.
            </Text>
            <Badge variant="light" color="orange">Claude/OpenAI + Resend</Badge>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* CTA Section */}
      <Card shadow="md" padding={48} radius={16}>
        <Stack align="center" gap={24}>
          <Badge size="lg" variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
            Target: $100K MRR by EOY 2025
          </Badge>
          
          <Title order={2} size="36px" fw={600} ta="center" c="dark">
            Ready to Transform Your PM Capabilities?
          </Title>
          
          <Text size="lg" ta="center" c="dimmed" maw={600}>
            Join the PMO transformation movement. Start with our 14-day free trial and experience 
            PMO-level strategic capabilities through agentic AI teams.
          </Text>
          
          <Button 
            component={Link}
            href="/trial"
            size="xl"
            leftSection={<IconTarget size={20} />}
            style={{ 
              backgroundColor: '#EA580C',
              fontSize: '18px',
              padding: '16px 32px',
              height: 'auto'
            }}
          >
            Start PMO Transformation Today
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}