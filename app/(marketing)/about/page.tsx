'use client';

import { Container, Card, Title, Text, Grid } from '@mantine/core';
import { IconBrain, IconRocket, IconShield, IconUsers } from '@tabler/icons-react';

export default function AboutPage() {
  const values = [
    {
      icon: IconBrain,
      title: 'AI-First Intelligence',
      description: 'We believe every Product Manager deserves PMO-level strategic capabilities through intelligent AI teams.'
    },
    {
      icon: IconRocket,
      title: 'Rapid Transformation',
      description: 'Transform from individual contributor to strategic leader in weeks, not years.'
    },
    {
      icon: IconShield,
      title: 'Enterprise Security',
      description: 'Bank-level security with SOC 2 Type II compliance and data encryption at rest and in transit.'
    },
    {
      icon: IconUsers,
      title: 'Community-Driven',
      description: 'Built by PMs, for PMs. Our roadmap is driven by real user feedback and industry best practices.'
    }
  ];

  return (
    <div className="marketing-context">
      <Container size={1200} px={24} py={80}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Title 
            order={1} 
            size="3.5rem" 
            fw={700}
            c="var(--marketing-text-primary)"
            mb={24}
          >
            About PM33
          </Title>
          <Text 
            size="xl" 
            c="var(--marketing-text-secondary)"
            maw={800}
            mx="auto"
            mb={48}
          >
            We're transforming how Product Managers work by providing PMO-level strategic capabilities through intelligent AI teams. Our mission is to turn every PM into a strategic powerhouse.
          </Text>
        </div>

        {/* Mission Statement */}
        <Card
          shadow="md"
          padding={48}
          radius={16}
          mb={64}
          style={{
            backgroundColor: 'var(--marketing-bg-accent)',
            border: '1px solid var(--marketing-primary)',
            textAlign: 'center'
          }}
        >
          <Title order={2} c="var(--marketing-text-primary)" mb={24}>
            Our Mission
          </Title>
          <Text 
            size="lg" 
            c="var(--marketing-text-secondary)"
            style={{ lineHeight: 1.7, maxWidth: '700px', margin: '0 auto' }}
          >
            To democratize PMO-level strategic intelligence for every Product Manager, 
            regardless of company size or budget. We believe strategic thinking shouldn't 
            be limited to executives—every PM deserves AI-powered strategic capabilities.
          </Text>
        </Card>

        {/* Company Values */}
        <Title order={2} c="var(--marketing-text-primary)" ta="center" mb={48}>
          Our Values
        </Title>
        
        <Grid mb={64}>
          {values.map((value, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 6 }}>
              <Card
                shadow="sm"
                padding={32}
                radius={16}
                h="100%"
                style={{
                  backgroundColor: 'var(--marketing-bg-primary)',
                  border: '1px solid rgba(0,0,0,0.08)'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--marketing-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}
                >
                  <value.icon size={24} color="white" />
                </div>
                
                <Title order={3} c="var(--marketing-text-primary)" mb={16}>
                  {value.title}
                </Title>
                <Text c="var(--marketing-text-secondary)" style={{ lineHeight: 1.6 }}>
                  {value.description}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* Company Stats */}
        <Card
          shadow="md"
          padding={48}
          radius={16}
          style={{
            backgroundColor: 'var(--marketing-bg-primary)',
            border: '1px solid rgba(0,0,0,0.08)'
          }}
        >
          <Title order={2} c="var(--marketing-text-primary)" ta="center" mb={48}>
            PM33 by the Numbers
          </Title>
          
          <Grid>
            <Grid.Col span={{ base: 6, md: 3 }}>
              <div style={{ textAlign: 'center' }}>
                <Text size="3rem" fw={700} c="var(--marketing-primary)">
                  10x
                </Text>
                <Text c="var(--marketing-text-secondary)" size="sm" mt={8}>
                  Faster Strategic Analysis
                </Text>
              </div>
            </Grid.Col>
            
            <Grid.Col span={{ base: 6, md: 3 }}>
              <div style={{ textAlign: 'center' }}>
                <Text size="3rem" fw={700} c="var(--marketing-primary)">
                  85%
                </Text>
                <Text c="var(--marketing-text-secondary)" size="sm" mt={8}>
                  Average Confidence Score
                </Text>
              </div>
            </Grid.Col>
            
            <Grid.Col span={{ base: 6, md: 3 }}>
              <div style={{ textAlign: 'center' }}>
                <Text size="3rem" fw={700} c="var(--marketing-primary)">
                  4
                </Text>
                <Text c="var(--marketing-text-secondary)" size="sm" mt={8}>
                  AI Teams Working for You
                </Text>
              </div>
            </Grid.Col>
            
            <Grid.Col span={{ base: 6, md: 3 }}>
              <div style={{ textAlign: 'center' }}>
                <Text size="3rem" fw={700} c="var(--marketing-primary)">
                  24/7
                </Text>
                <Text c="var(--marketing-text-secondary)" size="sm" mt={8}>
                  Strategic Intelligence
                </Text>
              </div>
            </Grid.Col>
          </Grid>
        </Card>
      </Container>
    </div>
  );
}