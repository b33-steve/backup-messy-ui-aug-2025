'use client';

import React from 'react';
import { Container, Title, Text, Stack, Box, Badge, Button, Group, Card, SimpleGrid, ThemeIcon, Timeline, Stepper } from '@mantine/core';
import { IconMap, IconRocket, IconUsers, IconSettings, IconChartBar, IconTarget, IconArrowRight, IconCheck, IconClock, IconAlertCircle } from '@tabler/icons-react';
import Link from 'next/link';

function DocumentationHero({ title, description, version }: { title: string; description: string; version: string }) {
  return (
    <Box 
      style={{ 
        position: 'relative',
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
            leftSection={<IconMap size={16} />}
          >
            CPN Documentation v{version}
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
                href="#onboarding-guide"
                style={{ minWidth: 200 }}
              >
                Start Transformation
              </Button>
              <Button 
                size="lg"
                variant="outline"
                color="white"
                rightSection={<IconUsers size={18} />}
                component="a"
                href="#implementation-team"
                style={{ minWidth: 180 }}
              >
                Implementation Team
              </Button>
            </Group>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default function CpnDocumentationPage() {
  return (
    <div className="marketing-context">
      <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>

        <DocumentationHero 
          title="Customer Process Navigation"
          description="Complete implementation guides for transforming your team with PM33's strategic intelligence platform"
          version="2.1.4"
        />

        {/* Process Overview */}
        <Box py={96} bg="white">
          <Container size="xl">
            <Stack gap={64}>
              <Stack align="center" gap={24}>
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'teal.1', to: 'green.1' }}
                  c="teal.7"
                >
                  🚀 Transformation Journey
                </Badge>
                
                <Title 
                  order={2} 
                  size="h2"
                  ta="center"
                  maw={800}
                  lh={1.2}
                  c="dark"
                >
                  Your PMO Transformation Roadmap
                </Title>

                <Text size="lg" c="dimmed" ta="center" maw={600} lh={1.6}>
                  A proven 4-phase process to transform individual Product Managers into strategic PMOs using AI-powered intelligence.
                </Text>
              </Stack>

              <Stepper active={0} size="lg" orientation="vertical">
                <Stepper.Step 
                  label="Strategic Onboarding" 
                  description="2-3 weeks"
                  icon={<IconRocket size={18} />}
                  completedIcon={<IconCheck size={18} />}
                >
                  <Card shadow="sm" p={24} radius="lg" mt={16} bg="gray.0">
                    <Stack gap={16}>
                      <Text fw={600} c="dark">Phase 1: Foundation Setup</Text>
                      <Text size="sm" c="dimmed" lh={1.6}>
                        Establish your strategic intelligence foundation with AI team configuration, workflow mapping, and initial data integration. Transform from reactive task management to predictive strategic planning.
                      </Text>
                      <Group gap={12}>
                        <Badge size="sm" color="teal" variant="light">Tools Integration</Badge>
                        <Badge size="sm" color="blue" variant="light">AI Configuration</Badge>
                        <Badge size="sm" color="purple" variant="light">Team Training</Badge>
                      </Group>
                      <Button size="sm" variant="light" color="teal" rightSection={<IconArrowRight size={16} />}>
                        Start Phase 1
                      </Button>
                    </Stack>
                  </Card>
                </Stepper.Step>

                <Stepper.Step 
                  label="Workflow Integration" 
                  description="1-2 weeks"
                  icon={<IconSettings size={18} />}
                >
                  <Card shadow="sm" p={24} radius="lg" mt={16} bg="gray.0">
                    <Stack gap={16}>
                      <Text fw={600} c="dark">Phase 2: Workflow Optimization</Text>
                      <Text size="sm" c="dimmed" lh={1.6}>
                        Integrate PM33 with your existing PM tools (Jira, Monday, Asana) and automate routine workflows. Enable cross-team coordination and intelligent task prioritization.
                      </Text>
                      <Group gap={12}>
                        <Badge size="sm" color="orange" variant="light">API Integration</Badge>
                        <Badge size="sm" color="cyan" variant="light">Automation Setup</Badge>
                        <Badge size="sm" color="green" variant="light">Process Optimization</Badge>
                      </Group>
                      <Button size="sm" variant="light" color="gray" disabled>
                        Phase 2 (After Phase 1)
                      </Button>
                    </Stack>
                  </Card>
                </Stepper.Step>

                <Stepper.Step 
                  label="Strategic Intelligence Activation" 
                  description="1 week"
                  icon={<IconChartBar size={18} />}
                >
                  <Card shadow="sm" p={24} radius="lg" mt={16} bg="gray.0">
                    <Stack gap={16}>
                      <Text fw={600} c="dark">Phase 3: AI Intelligence Launch</Text>
                      <Text size="sm" c="dimmed" lh={1.6}>
                        Activate advanced strategic analysis capabilities including ICE scoring, competitive intelligence, and predictive insights. Transform decision-making with data-driven recommendations.
                      </Text>
                      <Group gap={12}>
                        <Badge size="sm" color="indigo" variant="light">Strategic Analysis</Badge>
                        <Badge size="sm" color="pink" variant="light">Competitive Intel</Badge>
                        <Badge size="sm" color="violet" variant="light">Predictive Insights</Badge>
                      </Group>
                      <Button size="sm" variant="light" color="gray" disabled>
                        Phase 3 (After Phase 2)
                      </Button>
                    </Stack>
                  </Card>
                </Stepper.Step>

                <Stepper.Step 
                  label="PMO Excellence" 
                  description="Ongoing"
                  icon={<IconTarget size={18} />}
                >
                  <Card shadow="sm" p={24} radius="lg" mt={16} bg="gray.0">
                    <Stack gap={16}>
                      <Text fw={600} c="dark">Phase 4: Continuous Optimization</Text>
                      <Text size="sm" c="dimmed" lh={1.6}>
                        Achieve full PMO capabilities with automated reporting, stakeholder communication, and continuous process improvement. Monitor success metrics and scale strategic impact.
                      </Text>
                      <Group gap={12}>
                        <Badge size="sm" color="red" variant="light">Executive Reporting</Badge>
                        <Badge size="sm" color="yellow" variant="light">Success Metrics</Badge>
                        <Badge size="sm" color="gray" variant="light">Continuous Improvement</Badge>
                      </Group>
                      <Button size="sm" variant="light" color="gray" disabled>
                        Phase 4 (After Phase 3)
                      </Button>
                    </Stack>
                  </Card>
                </Stepper.Step>
              </Stepper>
            </Stack>
          </Container>
        </Box>

        {/* Process Cards */}
        <Box py={96} style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4ff 100%)' }}>
          <Container size="xl">
            <Stack gap={48}>
              <Stack align="center" gap={24}>
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'blue.1', to: 'cyan.1' }}
                  c="blue.7"
                >
                  📋 Implementation Guides
                </Badge>
                
                <Title 
                  order={2} 
                  size="h2"
                  ta="center"
                  maw={800}
                  lh={1.2}
                  c="dark"
                >
                  Step-by-Step Implementation Resources
                </Title>
              </Stack>

              <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing={32}>
                {/* Strategic Onboarding */}
                <Card 
                  shadow="lg" 
                  radius="xl" 
                  p={32}
                  style={{ 
                    backgroundColor: 'white',
                    border: '1px solid var(--mantine-color-teal-2)',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  className="hover:shadow-xl hover:translate-y-[-4px]"
                >
                  <Stack gap={24}>
                    <Group justify="space-between">
                      <ThemeIcon size={48} variant="gradient" gradient={{ from: 'teal', to: 'green' }}>
                        <IconRocket size={24} />
                      </ThemeIcon>
                      <Badge color="teal" variant="light" size="sm">2-3 weeks</Badge>
                    </Group>
                    
                    <Stack gap={12}>
                      <Title order={3} size="h4" c="dark">
                        Strategic Onboarding
                      </Title>
                      
                      <Text c="dimmed" lh={1.6}>
                        Complete transformation from reactive PM to strategic intelligence. Foundation setup, AI configuration, and team alignment.
                      </Text>

                      <Stack gap={8} mt={16}>
                        <Text size="sm" fw={500} c="teal.6">✅ AI Teams Configuration</Text>
                        <Text size="sm" fw={500} c="teal.6">✅ Strategic Framework Setup</Text>
                        <Text size="sm" fw={500} c="teal.6">✅ Initial Data Integration</Text>
                        <Text size="sm" fw={500} c="teal.6">✅ Team Training & Alignment</Text>
                      </Stack>
                    </Stack>
                    
                    <Button 
                      variant="light" 
                      color="teal"
                      rightSection={<IconArrowRight size={16} />}
                      mt="auto"
                    >
                      View Guide
                    </Button>
                  </Stack>
                </Card>

                {/* Workflow Integration */}
                <Card 
                  shadow="lg" 
                  radius="xl" 
                  p={32}
                  style={{ 
                    backgroundColor: 'white',
                    border: '1px solid var(--mantine-color-blue-2)',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  className="hover:shadow-xl hover:translate-y-[-4px]"
                >
                  <Stack gap={24}>
                    <Group justify="space-between">
                      <ThemeIcon size={48} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                        <IconSettings size={24} />
                      </ThemeIcon>
                      <Badge color="blue" variant="light" size="sm">1-2 weeks</Badge>
                    </Group>
                    
                    <Stack gap={12}>
                      <Title order={3} size="h4" c="dark">
                        Workflow Integration
                      </Title>
                      
                      <Text c="dimmed" lh={1.6}>
                        Seamlessly integrate PM33 with your existing PM stack. Automate workflows while maintaining familiar tools and processes.
                      </Text>

                      <Stack gap={8} mt={16}>
                        <Text size="sm" fw={500} c="blue.6">🔗 Jira/Monday/Asana Integration</Text>
                        <Text size="sm" fw={500} c="blue.6">⚡ Workflow Automation Setup</Text>
                        <Text size="sm" fw={500} c="blue.6">🤖 AI Process Orchestration</Text>
                        <Text size="sm" fw={500} c="blue.6">📊 Progress Tracking Systems</Text>
                      </Stack>
                    </Stack>
                    
                    <Button 
                      variant="light" 
                      color="blue"
                      rightSection={<IconArrowRight size={16} />}
                      mt="auto"
                    >
                      View Guide
                    </Button>
                  </Stack>
                </Card>

                {/* Success Metrics */}
                <Card 
                  shadow="lg" 
                  radius="xl" 
                  p={32}
                  style={{ 
                    backgroundColor: 'white',
                    border: '1px solid var(--mantine-color-orange-2)',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  className="hover:shadow-xl hover:translate-y-[-4px]"
                >
                  <Stack gap={24}>
                    <Group justify="space-between">
                      <ThemeIcon size={48} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                        <IconChartBar size={24} />
                      </ThemeIcon>
                      <Badge color="orange" variant="light" size="sm">Ongoing</Badge>
                    </Group>
                    
                    <Stack gap={12}>
                      <Title order={3} size="h4" c="dark">
                        Success Metrics & KPIs
                      </Title>
                      
                      <Text c="dimmed" lh={1.6}>
                        Measure and optimize your PMO transformation. Track strategic impact, efficiency gains, and team performance improvements.
                      </Text>

                      <Stack gap={8} mt={16}>
                        <Text size="sm" fw={500} c="orange.6">📈 Strategic Impact Metrics</Text>
                        <Text size="sm" fw={500} c="orange.6">⏱️ Efficiency Improvement Tracking</Text>
                        <Text size="sm" fw={500} c="orange.6">🎯 Goal Achievement Analysis</Text>
                        <Text size="sm" fw={500} c="orange.6">📋 Executive Reporting Templates</Text>
                      </Stack>
                    </Stack>
                    
                    <Button 
                      variant="light" 
                      color="orange"
                      rightSection={<IconArrowRight size={16} />}
                      mt="auto"
                    >
                      View Guide
                    </Button>
                  </Stack>
                </Card>
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>

        {/* Coming Soon Section */}
        <Box py={96} bg="white">
          <Container size="xl">
            <Stack align="center" gap={32}>
              <Stack align="center" gap={24}>
                <Badge 
                  size="lg" 
                  variant="gradient" 
                  gradient={{ from: 'purple.1', to: 'pink.1' }}
                  c="purple.7"
                >
                  🚧 Documentation In Progress
                </Badge>
                
                <Title 
                  order={2} 
                  size="h2"
                  ta="center"
                  maw={800}
                  lh={1.2}
                  c="dark"
                >
                  Comprehensive Implementation Guides Coming Soon
                </Title>

                <Text size="lg" c="dimmed" ta="center" maw={600} lh={1.6}>
                  We're creating detailed, step-by-step implementation guides based on successful PMO transformations from our beta customers.
                </Text>
              </Stack>

              <Card 
                shadow="lg" 
                radius="xl" 
                p={48}
                style={{ 
                  backgroundColor: 'white',
                  border: '2px dashed var(--mantine-color-teal-3)',
                  width: '100%',
                  maxWidth: 800
                }}
              >
                <Stack align="center" gap={24}>
                  <ThemeIcon size={64} variant="light" color="teal">
                    <IconClock size={32} />
                  </ThemeIcon>
                  
                  <Stack align="center" gap={16}>
                    <Title order={3} size="h4" c="dark" ta="center">
                      Detailed Implementation Guides in Development
                    </Title>
                    <Text c="dimmed" ta="center" maw={500}>
                      Our implementation team is documenting proven transformation processes from successful PMO implementations. Full guides will be available soon.
                    </Text>
                  </Stack>

                  <SimpleGrid cols={{ base: 1, md: 3 }} spacing={16} w="100%">
                    <Stack align="center" gap={8}>
                      <ThemeIcon size={32} variant="light" color="teal">
                        <IconCheck size={16} />
                      </ThemeIcon>
                      <Text size="sm" fw={600} c="dark" ta="center">Strategic Onboarding Checklist</Text>
                    </Stack>
                    <Stack align="center" gap={8}>
                      <ThemeIcon size={32} variant="light" color="blue">
                        <IconSettings size={16} />
                      </ThemeIcon>
                      <Text size="sm" fw={600} c="dark" ta="center">Technical Integration Guide</Text>
                    </Stack>
                    <Stack align="center" gap={8}>
                      <ThemeIcon size={32} variant="light" color="orange">
                        <IconChartBar size={16} />
                      </ThemeIcon>
                      <Text size="sm" fw={600} c="dark" ta="center">Success Metrics Framework</Text>
                    </Stack>
                  </SimpleGrid>

                  <Group gap={16}>
                    <Button 
                      component={Link}
                      href="/pricing"
                      variant="filled"
                      color="teal"
                      rightSection={<IconArrowRight size={16} />}
                    >
                      Start Your Transformation
                    </Button>
                    <Button 
                      variant="outline"
                      color="teal"
                      component="a"
                      href="mailto:implementation@pm33.ai?subject=CPN Documentation Request"
                    >
                      Request Implementation Support
                    </Button>
                  </Group>
                </Stack>
              </Card>
            </Stack>
          </Container>
        </Box>

      </Box>
    </div>
  );
}