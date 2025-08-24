'use client';

import React from 'react';
import { Container, Title, Text, Stack, Box, Badge, Button, Group, Card, SimpleGrid, ThemeIcon, List, Tabs, Code } from '@mantine/core';
import { IconCode, IconLock, IconTarget, IconSettings, IconBrain, IconDatabase, IconMessageCircle, IconArrowRight, IconExternalLink, IconBook, IconRocket, IconShield } from '@tabler/icons-react';
import Link from 'next/link';

interface ApiSectionProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  href: string;
  endpoints?: string[];
  status?: 'stable' | 'beta' | 'alpha';
}

function ApiSection({ title, description, icon: Icon, href, endpoints = [], status = 'stable' }: ApiSectionProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'green';
      case 'beta': return 'orange';  
      case 'alpha': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Card 
      shadow="md" 
      radius="xl" 
      p={32}
      style={{ 
        backgroundColor: 'white',
        border: '1px solid var(--mantine-color-gray-2)',
        height: '100%',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      className="hover:shadow-xl hover:translate-y-[-4px]"
      component={Link}
      href={href}
    >
      <Stack gap={24}>
        <Group justify="space-between">
          <ThemeIcon size={48} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
            <Icon size={24} />
          </ThemeIcon>
          <Badge color={getStatusColor(status)} variant="light" size="sm">
            {status.toUpperCase()}
          </Badge>
        </Group>
        
        <Stack gap={12}>
          <Title order={3} size="h4" c="dark">
            {title}
          </Title>
          
          <Text c="dimmed" lh={1.6}>
            {description}
          </Text>

          {endpoints.length > 0 && (
            <Stack gap={8} mt={16}>
              <Text size="sm" fw={600} c="dark">Key Endpoints:</Text>
              <List size="sm" spacing={4}>
                {endpoints.slice(0, 3).map((endpoint, index) => (
                  <List.Item key={index}>
                    <Code>{endpoint}</Code>
                  </List.Item>
                ))}
                {endpoints.length > 3 && (
                  <List.Item>
                    <Text size="sm" c="dimmed">+{endpoints.length - 3} more endpoints</Text>
                  </List.Item>
                )}
              </List>
            </Stack>
          )}
        </Stack>
        
        <Button 
          variant="light" 
          rightSection={<IconArrowRight size={16} />}
          mt="auto"
        >
          View Documentation
        </Button>
      </Stack>
    </Card>
  );
}

function DocumentationHero({ title, description, version }: { title: string; description: string; version: string }) {
  return (
    <Box 
      style={{ 
        position: 'relative',
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        overflow: 'hidden',
        color: 'white'
      }}
    >
      <Container size="xl">
        <Stack align="center" gap={32}>
          <Badge 
            size="lg" 
            variant="light"
            color="white"
            leftSection={<IconCode size={16} />}
          >
            PM33 API Documentation v{version}
          </Badge>
          
          <Stack align="center" gap={24}>
            <Title 
              order={1} 
              size="3rem"
              ta="center"
              lh={1.1}
              style={{ 
                fontWeight: 900,
                color: 'white',
                maxWidth: 800,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {title}
            </Title>
            
            <Text size="xl" ta="center" maw={600} lh={1.6} style={{ opacity: 0.95 }}>
              {description}
            </Text>

            <Group gap={24} mt={24}>
              <Button 
                size="lg"
                variant="white"
                color="dark"
                rightSection={<IconRocket size={18} />}
                component="a"
                href="#quick-start"
                style={{ minWidth: 180 }}
              >
                Quick Start
              </Button>
              <Button 
                size="lg"
                variant="outline"
                color="white"
                rightSection={<IconExternalLink size={18} />}
                component="a"
                href="#interactive-explorer"
                style={{ minWidth: 160 }}
              >
                Try API
              </Button>
            </Group>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default function ApiDocumentationPage() {
  return (
    <div className="marketing-context">
      <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>

        <DocumentationHero 
          title="PM33 API Documentation"
          description="Integrate PM33's strategic intelligence into your product workflow with our comprehensive REST API"
          version="2.1.4"
        />

        {/* API Overview */}
        <Box py={96} bg="white">
          <Container size="xl">
            <Stack gap={64}>
              <Stack align="center" gap={24}>
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'blue.1', to: 'cyan.1' }}
                  c="blue.7"
                >
                  🚀 API Overview
                </Badge>
                
                <Title 
                  order={2} 
                  size="h2"
                  ta="center"
                  maw={800}
                  lh={1.2}
                  c="dark"
                >
                  Powerful APIs for Strategic Product Management
                </Title>

                <Text size="lg" c="dimmed" ta="center" maw={600} lh={1.6}>
                  PM33's REST API enables you to integrate strategic intelligence directly into your existing product management workflows.
                </Text>
              </Stack>

              <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing={32}>
                <ApiSection
                  title="Authentication"
                  description="Secure API key and OAuth 2.0 authentication patterns for all PM33 integrations"
                  icon={IconLock}
                  href="/resources/api-docs/authentication"
                  endpoints={[
                    'POST /auth/token',
                    'POST /auth/refresh',
                    'GET /auth/verify'
                  ]}
                  status="stable"
                />
                
                <ApiSection
                  title="Strategic Analysis"
                  description="AI-powered strategic analysis including ICE scoring, competitive intelligence, and market assessment"
                  icon={IconTarget}
                  href="/resources/api-docs/strategic-analysis"
                  endpoints={[
                    'POST /analysis/ice-score',
                    'GET /analysis/competitive',
                    'POST /analysis/market-opportunity',
                    'GET /analysis/frameworks'
                  ]}
                  status="stable"
                />
                
                <ApiSection
                  title="Workflow Execution"
                  description="Automated task management, process orchestration, and cross-team coordination APIs"
                  icon={IconSettings}
                  href="/resources/api-docs/workflow-execution"
                  endpoints={[
                    'POST /workflows/create',
                    'GET /workflows/{id}/status',
                    'PUT /workflows/{id}/execute',
                    'GET /workflows/templates'
                  ]}
                  status="stable"
                />

                <ApiSection
                  title="Data Intelligence"
                  description="Analytics, insights, and predictive modeling endpoints for data-driven product decisions"
                  icon={IconDatabase}
                  href="/resources/api-docs/data-intelligence"
                  endpoints={[
                    'GET /analytics/dashboard',
                    'POST /insights/generate',
                    'GET /metrics/performance',
                    'POST /predictions/feature-adoption'
                  ]}
                  status="beta"
                />

                <ApiSection
                  title="Communication AI"
                  description="Automated stakeholder updates, executive summaries, and cross-team alignment tools"
                  icon={IconMessageCircle}
                  href="/resources/api-docs/communication"
                  endpoints={[
                    'POST /communications/summary',
                    'GET /communications/templates',
                    'POST /communications/send',
                    'GET /communications/history'
                  ]}
                  status="beta"
                />

                <ApiSection
                  title="AI Processing"
                  description="Core AI processing endpoints for custom strategic intelligence workflows"
                  icon={IconBrain}
                  href="/resources/api-docs/ai-processing"
                  endpoints={[
                    'POST /ai/process',
                    'GET /ai/models',
                    'POST /ai/train',
                    'GET /ai/confidence'
                  ]}
                  status="alpha"
                />
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>

        {/* Quick Start Guide */}
        <Box py={96} id="quick-start" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4ff 100%)' }}>
          <Container size="xl">
            <Stack gap={48}>
              <Stack align="center" gap={24}>
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'green.1', to: 'teal.1' }}
                  c="green.7"
                >
                  ⚡ Quick Start
                </Badge>
                
                <Title 
                  order={2} 
                  size="h2"
                  ta="center"
                  maw={800}
                  lh={1.2}
                  c="dark"
                >
                  Get Started in Minutes
                </Title>
              </Stack>

              <Tabs defaultValue="authentication" orientation="horizontal">
                <Tabs.List grow>
                  <Tabs.Tab value="authentication" leftSection={<IconShield size={16} />}>
                    1. Authentication
                  </Tabs.Tab>
                  <Tabs.Tab value="first-call" leftSection={<IconCode size={16} />}>
                    2. First API Call
                  </Tabs.Tab>
                  <Tabs.Tab value="integration" leftSection={<IconSettings size={16} />}>
                    3. Integration
                  </Tabs.Tab>
                </Tabs.List>

                <Box mt={32}>
                  <Tabs.Panel value="authentication">
                    <Card shadow="sm" p={32} radius="lg" bg="white">
                      <Stack gap={24}>
                        <Title order={3} size="h4" c="dark">
                          Get Your API Key
                        </Title>
                        
                        <Text c="dimmed" lh={1.6}>
                          All PM33 API requests require authentication using your API key. You can find your API key in your PM33 dashboard under Settings → API Keys.
                        </Text>

                        <Code block p={20} style={{ background: 'var(--mantine-color-gray-1)' }}>
{`# Set your API key as an environment variable
export PM33_API_KEY="pk_live_your_api_key_here"

# Or include in request headers
curl -H "Authorization: Bearer pk_live_your_api_key_here" \\
     -H "Content-Type: application/json" \\
     https://api.pm33.ai/v1/analysis/ice-score`}
                        </Code>

                        <Button 
                          component={Link}
                          href="/pricing"
                          variant="light"
                          rightSection={<IconExternalLink size={16} />}
                        >
                          Get API Access
                        </Button>
                      </Stack>
                    </Card>
                  </Tabs.Panel>

                  <Tabs.Panel value="first-call">
                    <Card shadow="sm" p={32} radius="lg" bg="white">
                      <Stack gap={24}>
                        <Title order={3} size="h4" c="dark">
                          Make Your First API Call
                        </Title>
                        
                        <Text c="dimmed" lh={1.6}>
                          Try our ICE scoring endpoint to get AI-powered impact, confidence, and effort analysis for any feature idea.
                        </Text>

                        <Code block p={20} style={{ background: 'var(--mantine-color-gray-1)' }}>
{`curl -X POST https://api.pm33.ai/v1/analysis/ice-score \\
  -H "Authorization: Bearer $PM33_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "feature": "Add dark mode to mobile app",
    "context": "B2B SaaS with 10k users, 60% mobile usage",
    "business_goals": ["user retention", "user satisfaction"]
  }'

# Response
{
  "ice_score": {
    "impact": 8.5,
    "confidence": 9.2,
    "effort": 3.0,
    "total_score": 26.1,
    "recommendation": "high_priority"
  },
  "reasoning": "High user satisfaction impact with strong confidence..."
}`}
                        </Code>
                      </Stack>
                    </Card>
                  </Tabs.Panel>

                  <Tabs.Panel value="integration">
                    <Card shadow="sm" p={32} radius="lg" bg="white">
                      <Stack gap={24}>
                        <Title order={3} size="h4" c="dark">
                          Integration Examples
                        </Title>
                        
                        <Text c="dimmed" lh={1.6}>
                          Common integration patterns for popular development environments and frameworks.
                        </Text>

                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={24}>
                          <Stack gap={12}>
                            <Text fw={600} size="sm" c="dark">JavaScript/Node.js</Text>
                            <Code block p={16} fz="xs" style={{ background: 'var(--mantine-color-gray-1)' }}>
{`const pm33 = require('@pm33/api');

const client = new pm33.Client({
  apiKey: process.env.PM33_API_KEY
});

const score = await client.analysis.iceScore({
  feature: "New checkout flow",
  context: "E-commerce platform"
});`}
                            </Code>
                          </Stack>

                          <Stack gap={12}>
                            <Text fw={600} size="sm" c="dark">Python</Text>
                            <Code block p={16} fz="xs" style={{ background: 'var(--mantine-color-gray-1)' }}>
{`import pm33

client = pm33.Client(
    api_key=os.environ['PM33_API_KEY']
)

score = client.analysis.ice_score(
    feature="New checkout flow",
    context="E-commerce platform"
)`}
                            </Code>
                          </Stack>
                        </SimpleGrid>

                        <Button 
                          component={Link}
                          href="/resources/api-docs/sdks"
                          variant="light"
                          rightSection={<IconBook size={16} />}
                        >
                          View All SDKs
                        </Button>
                      </Stack>
                    </Card>
                  </Tabs.Panel>
                </Box>
              </Tabs>
            </Stack>
          </Container>
        </Box>

        {/* Interactive API Explorer Placeholder */}
        <Box py={96} bg="white" id="interactive-explorer">
          <Container size="xl">
            <Stack align="center" gap={32}>
              <Stack align="center" gap={24}>
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'orange.1', to: 'red.1' }}
                  c="orange.7"
                >
                  🧪 Interactive API Explorer
                </Badge>
                
                <Title 
                  order={2} 
                  size="h2"
                  ta="center"
                  maw={800}
                  lh={1.2}
                  c="dark"
                >
                  Test API Endpoints Live
                </Title>

                <Text size="lg" c="dimmed" ta="center" maw={600} lh={1.6}>
                  Try PM33's API endpoints directly in your browser. No installation required.
                </Text>
              </Stack>

              <Card 
                shadow="lg" 
                radius="xl" 
                p={48}
                style={{ 
                  backgroundColor: 'white',
                  border: '2px dashed var(--mantine-color-blue-3)',
                  width: '100%',
                  maxWidth: 800
                }}
              >
                <Stack align="center" gap={24}>
                  <ThemeIcon size={64} variant="light" color="blue">
                    <IconCode size={32} />
                  </ThemeIcon>
                  
                  <Stack align="center" gap={16}>
                    <Title order={3} size="h4" c="dark" ta="center">
                      Interactive API Explorer Coming Soon
                    </Title>
                    <Text c="dimmed" ta="center" maw={400}>
                      We're building an interactive API explorer that will let you test all PM33 endpoints directly in your browser with live data.
                    </Text>
                  </Stack>

                  <Group gap={16}>
                    <Button 
                      component={Link}
                      href="/resources/api-docs/authentication"
                      variant="filled"
                      rightSection={<IconArrowRight size={16} />}
                    >
                      View API Documentation
                    </Button>
                    <Button 
                      variant="outline"
                      rightSection={<IconExternalLink size={16} />}
                      component="a"
                      href="mailto:developers@pm33.ai?subject=API Explorer Early Access"
                    >
                      Request Early Access
                    </Button>
                  </Group>
                </Stack>
              </Card>
            </Stack>
          </Container>
        </Box>

        {/* Resources and Support */}
        <Box py={96} style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4ff 100%)' }}>
          <Container size="xl">
            <Stack gap={48}>
              <Stack align="center" gap={24}>
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'purple.1', to: 'pink.1' }}
                  c="purple.7"
                >
                  📚 Developer Resources
                </Badge>
                
                <Title 
                  order={2} 
                  size="h2"
                  ta="center"
                  maw={800}
                  lh={1.2}
                  c="dark"
                >
                  Everything You Need to Integrate PM33
                </Title>
              </Stack>

              <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing={24}>
                {[
                  {
                    icon: IconBook,
                    title: 'API Reference',
                    description: 'Complete documentation for every endpoint',
                    href: '/resources/api-docs/reference'
                  },
                  {
                    icon: IconCode,
                    title: 'SDKs & Libraries',
                    description: 'Official libraries for popular languages',
                    href: '/resources/api-docs/sdks'
                  },
                  {
                    icon: IconRocket,
                    title: 'Code Examples',
                    description: 'Copy-paste integration examples',
                    href: '/resources/api-docs/examples'
                  },
                  {
                    icon: IconMessageCircle,
                    title: 'Developer Support',
                    description: '24/7 technical support for developers',
                    href: 'mailto:developers@pm33.ai'
                  }
                ].map((resource, index) => (
                  <Card 
                    key={index}
                    shadow="sm" 
                    radius="lg" 
                    p={24}
                    bg="white"
                    style={{ 
                      border: '1px solid var(--mantine-color-gray-2)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                    className="hover:shadow-md hover:translate-y-[-2px]"
                    component={resource.href.startsWith('mailto:') ? 'a' : Link}
                    href={resource.href}
                  >
                    <Stack gap={16} align="center">
                      <ThemeIcon size={40} variant="light" color="blue">
                        <resource.icon size={20} />
                      </ThemeIcon>
                      
                      <Stack gap={8} align="center">
                        <Text fw={600} c="dark">
                          {resource.title}
                        </Text>
                        <Text size="sm" c="dimmed">
                          {resource.description}
                        </Text>
                      </Stack>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>

      </Box>
    </div>
  );
}