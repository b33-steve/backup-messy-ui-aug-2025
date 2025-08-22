import { Container, Title, Text, Button, Card, Group, List, Stack, Badge, Grid, Divider } from '@mantine/core';
import { IconRocket, IconBrain, IconTarget, IconShield, IconClock, IconTrendingUp, IconUsers, IconChartLine, IconCheck, IconHeart, IconBuilding, IconAward, IconSparkles } from '@tabler/icons-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Container size={1400} px={24} py={40}>

      {/* Hero Section */}
      <Card shadow="md" padding={64} radius={20} mb={60} 
            style={{ 
              background: 'linear-gradient(135deg, var(--marketing-primary-light) 0%, var(--marketing-bg-primary) 50%, var(--marketing-success-light) 100%)',
              textAlign: 'center'
            }}>
        <Grid>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Badge
              size="lg"
              leftSection={<IconSparkles size={16} />}
              variant="gradient"
              gradient={{ from: 'indigo', to: 'purple' }}
              radius="xl"
              mb={32}
            >
              Our Story & Mission
            </Badge>
            
            <Title order={1} size="h1" fw={900} mb={32} style={{ lineHeight: 1.2 }}>
              Built by PMs,
              <Text
                component="span"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                inherit
                display="block"
                mt={8}
              >
                For PMs
              </Text>
            </Title>
            
            <Text size="xl" mb={40} style={{ lineHeight: 1.7 }}>
              We're product managers who got tired of spending 80% of our time on busywork instead of strategy. 
              So we built the AI assistant we always wanted - one that enhances your existing tools instead of replacing them.
            </Text>
            
            <Grid mb={40}>
              {[
                { icon: IconUsers, stat: "2,500+", label: "PMs using PM33" },
                { icon: IconClock, stat: "72hrs", label: "Saved per PM monthly" },
                { icon: IconTarget, stat: "40%", label: "More features shipped" },
                { icon: IconAward, stat: "89%", label: "Team satisfaction" }
              ].map((metric, index) => (
                <Grid.Col key={index} span={{ base: 12, md: 6 }}>
                  <Card padding="lg" radius="lg" shadow="sm">
                    <Group mb={12}>
                      <metric.icon size={24} color="var(--marketing-primary)" />
                      <Text size="xl" fw={700} c="var(--marketing-primary)">{metric.stat}</Text>
                    </Group>
                    <Text size="sm" fw={500}>{metric.label}</Text>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Card padding="xl" radius="xl" shadow="xl">
              <Stack align="center" mb={32}>
                <div style={{ 
                  width: 80, 
                  height: 80, 
                  background: 'linear-gradient(45deg, var(--marketing-primary) 0%, purple 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16
                }}>
                  <IconBuilding size={40} color="white" />
                </div>
                <Title order={3} mb={8}>Founded in 2024</Title>
                <Text c="dimmed">By product managers, for product managers</Text>
              </Stack>
              
              <Stack gap="md">
                {[
                  "Remote-first team across 3 continents",
                  "Backed by experienced PM leaders", 
                  "Community-driven development approach"
                ].map((item, index) => (
                  <Group key={index}>
                    <IconCheck size={20} color="var(--marketing-success)" />
                    <Text>{item}</Text>
                  </Group>
                ))}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Card>

      {/* Mission Section */}
      <Card shadow="md" padding={48} radius={16} mb={60}>
        <Stack align="center" mb={48}>
          <Title order={2} size="h1" fw={700} ta="center" mb={24}>
            Our Mission
          </Title>
          <Text size="xl" ta="center" maw={800} mx="auto" style={{ lineHeight: 1.7 }}>
            To free product managers from busywork so they can focus on what matters most: strategic thinking and customer impact.
          </Text>
        </Stack>

        <Grid>
            {[
              {
                icon: IconHeart,
                title: "PM-First Approach",
                description: "Every feature is designed by product managers who understand the daily challenges of the role. We don't build for engineers or marketers - we build for PMs."
              },
              {
                icon: IconTarget,
                title: "Enhancement Philosophy", 
                description: "We believe in making your existing tools smarter, not forcing you to abandon workflows that already work. Integration over replacement, always."
              },
              {
                icon: IconBrain,
                title: "Community-Driven Innovation",
                description: "Our roadmap is shaped by the PM community. Every feature request, every use case, every workflow optimization comes from real PMs doing real work."
              }
            ].map((value, index) => (
              <Grid.Col key={index} span={{ base: 12, lg: 4 }}>
                <Stack align="center" ta="center">
                  <div style={{ 
                    background: 'linear-gradient(45deg, var(--marketing-primary) 0%, purple 100%)',
                    width: 64, 
                    height: 64, 
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 24,
                    transition: 'transform 0.3s ease'
                  }}>
                    <value.icon size={32} color="white" />
                  </div>
                  <Title order={3} mb={16}>{value.title}</Title>
                  <Text c="dimmed" style={{ lineHeight: 1.7 }}>{value.description}</Text>
                </Stack>
              </Grid.Col>
            ))}
        </Grid>
      </Card>

      {/* Founder Story */}
      <Card shadow="md" padding={48} radius={16} mb={80} 
            style={{ backgroundColor: 'var(--marketing-bg-secondary)' }}>
        <Grid align="center">
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Title order={2} size="h1" fw={700} mb={32}>
              The Story Behind PM33
            </Title>
            
            <Stack gap={24}>
              <Text size="lg" style={{ lineHeight: 1.7 }}>
                <Text component="span" fw={700}>The frustration was real.</Text> As senior PMs at fast-growing startups, we were spending 
                4+ hours daily on documentation, status updates, and data synthesis instead of customer research 
                and strategic planning.
              </Text>
              
              <Text size="lg" style={{ lineHeight: 1.7 }}>
                We tried every PM tool on the market. Each promised to solve our problems, but they all had the 
                same fatal flaw: <Text component="span" fw={700}>they wanted us to abandon our existing workflows</Text> and migrate 
                everything to their platform.
              </Text>
              
              <Text size="lg" style={{ lineHeight: 1.7 }}>
                That's when we realized the solution wasn't another PM tool - it was an <Text component="span" fw={700}>AI layer that 
                makes existing tools smarter</Text>. Why force teams to learn new systems when you can enhance 
                the ones they already know?
              </Text>
              
              <Text size="lg" style={{ lineHeight: 1.7 }}>
                Six months later, PM33 was born. Today, over 2,500 product managers use it to reclaim 70+ hours 
                monthly for strategic work.
              </Text>
            </Stack>
            
            <Card padding="xl" radius="xl" shadow="lg" mt={40}
                  style={{ backgroundColor: 'white' }}>
              <Text size="lg" fw={600} c="var(--marketing-primary)" mb={12}>
                "Our North Star"
              </Text>
              <Text size="xl" fs="italic" mb={16} style={{ lineHeight: 1.6 }}>
                "Every hour we save a PM from busywork is an hour they can spend understanding their customers better."
              </Text>
              <Text c="dimmed" fw={500}>— PM33 Founding Team</Text>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Stack gap={24}>
              <Card padding="xl" radius="xl" shadow="xl">
                <Title order={3} fw={700} mb={16}>Before PM33</Title>
                <Stack gap={12}>
                  {[
                    "4+ hours daily on documentation",
                    "Scattered data across 8+ tools", 
                    "Manual synthesis and reporting",
                    "Strategic time: 20% of day"
                  ].map((item, index) => (
                    <Group key={index}>
                      <div style={{ 
                        width: 12, 
                        height: 12, 
                        backgroundColor: '#ef4444', 
                        borderRadius: '50%' 
                      }} />
                      <Text>{item}</Text>
                    </Group>
                  ))}
                </Stack>
              </Card>
              
              <Card padding="xl" radius="xl" shadow="lg"
                    style={{ 
                      background: 'linear-gradient(135deg, #dcfce7 0%, #a7f3d0 100%)',
                      border: '1px solid #10b981'
                    }}>
                <Title order={3} fw={700} mb={16}>After PM33</Title>
                <Stack gap={12}>
                  {[
                    "15 minutes for comprehensive PRDs",
                    "Unified intelligence across all tools",
                    "AI-powered insights and recommendations", 
                    "Strategic time: 70% of day"
                  ].map((item, index) => (
                    <Group key={index}>
                      <div style={{ 
                        width: 12, 
                        height: 12, 
                        backgroundColor: '#10b981', 
                        borderRadius: '50%' 
                      }} />
                      <Text>{item}</Text>
                    </Group>
                  ))}
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Card>

      {/* Team Values */}
      <Card shadow="md" padding={48} radius={16} mb={80}>
        <Stack align="center" mb={48}>
          <Title order={2} size="h1" fw={700} ta="center">
            How We Work
          </Title>
          <Text size="xl" ta="center" c="dimmed" maw={600} mx="auto">
            Our values shape every product decision and customer interaction.
          </Text>
        </Stack>

        <Grid>
          {[
            { 
              title: "PM Empathy",
              description: "We're all practicing PMs. Every decision comes from real experience managing products and teams."
            },
            {
              title: "No BS Approach", 
              description: "Clear communication, honest pricing, no hidden fees. We say what we mean and deliver what we promise."
            },
            {
              title: "Community First",
              description: "The PM community shapes our roadmap. We build what PMs actually need, not what we think they should want."
            },
            {
              title: "Continuous Learning",
              description: "Product management evolves fast. We stay current with the latest frameworks, tools, and methodologies."
            }
          ].map((value, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }}>
              <Card padding="lg" radius="lg" shadow="sm" 
                    style={{ 
                      height: '100%', 
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
                      border: '1px solid #cbd5e1',
                      transition: 'all 0.3s ease'
                    }}
                    className="hover:shadow-lg">
                <Title order={4} fw={700} mb={12}>{value.title}</Title>
                <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                  {value.description}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Card>

      {/* CTA Section */}
      <Card shadow="xl" padding={64} radius={20} 
            style={{ 
              background: 'linear-gradient(135deg, var(--marketing-primary) 0%, purple 100%)',
              color: 'white',
              textAlign: 'center'
            }}>
        <Title order={2} size="h1" fw={700} mb={32} style={{ color: 'white' }}>
          Join the PM Community Revolution
        </Title>
        <Text size="xl" mb={48} maw={800} mx="auto" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          Be part of the movement that's freeing product managers from busywork. 
          Start your transformation today.
        </Text>
        
        <Group justify="center" gap={24}>
          <Button 
            component={Link}
            href="/trial"
            size="xl"
            radius="xl"
            variant="white"
            style={{ 
              fontSize: '20px',
              padding: '20px 40px',
              height: 'auto',
              color: 'var(--marketing-primary)'
            }}
            leftSection={<IconRocket size={24} />}
          >
            Start Your Free Trial
          </Button>
          <Button 
            component={Link}
            href="/contact"
            size="xl"
            variant="outline"
            radius="xl"
            style={{ 
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'white',
              fontSize: '18px',
              padding: '18px 32px',
              height: 'auto'
            }}
          >
            Get in Touch
          </Button>
        </Group>
        
        <Text mt={24} style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          Join 2,500+ product managers who've already made the switch
        </Text>
      </Card>

    </Container>
  );
}