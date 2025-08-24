'use client';

import { Container, Title, Text, Card, Group, Stack, Badge, ThemeIcon } from '@mantine/core';
import { IconBrain, IconTarget, IconUsers, IconTrendingUp, IconBolt, IconShield } from '@tabler/icons-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: IconBrain,
      title: "Strategic Intelligence Engine",
      description: "Multi-framework analysis with AI-powered insights for strategic decision making.",
      benefits: ["ICE/RICE scoring", "Competitive analysis", "Market research synthesis"]
    },
    {
      icon: IconTarget,
      title: "Command Center",
      description: "Real-time orchestration of 4 specialized AI teams for comprehensive product management.",
      benefits: ["4 AI teams coordination", "Live metrics dashboard", "Automated workflows"]
    },
    {
      icon: IconUsers,
      title: "Team Collaboration",
      description: "Align stakeholders with AI-generated reports and strategic communications.",
      benefits: ["Executive summaries", "Stakeholder alignment", "Progress tracking"]
    },
    {
      icon: IconTrendingUp,
      title: "Data Intelligence",
      description: "Transform your product data into actionable strategic insights.",
      benefits: ["Pattern recognition", "Predictive analytics", "Performance optimization"]
    },
    {
      icon: IconBolt,
      title: "Workflow Automation",
      description: "Automated task creation and cross-functional coordination.",
      benefits: ["PM tool integration", "Timeline management", "Progress tracking"]
    },
    {
      icon: IconShield,
      title: "Enterprise Security",
      description: "Bank-grade security with SOC 2 compliance and data encryption.",
      benefits: ["Data encryption", "Access controls", "Audit trails"]
    }
  ];

  return (
    <Container size={1200} px={24} py={80}>
      <div className="marketing-context">
        
        <Stack align="center" gap={48} mb={80}>
          <Badge size="lg" color="indigo" variant="light">
            ✨ PM33 Platform Features
          </Badge>
          <Title order={1} size="h1" ta="center" fw={700} style={{ fontSize: '48px' }}>
            Everything You Need for Strategic PM
          </Title>
          <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6}>
            Transform from reactive product manager to strategic PMO with AI-powered 
            intelligence and automation.
          </Text>
        </Stack>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 32 }}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} shadow="md" padding={32} radius={16} h="100%">
                <Stack gap={24}>
                  <Group>
                    <ThemeIcon size={56} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} radius={12}>
                      <IconComponent size={28} />
                    </ThemeIcon>
                    <Stack gap={4} style={{ flex: 1 }}>
                      <Title order={3} size="h4" fw={600}>
                        {feature.title}
                      </Title>
                    </Stack>
                  </Group>
                  
                  <Text c="dimmed" lh={1.6}>
                    {feature.description}
                  </Text>
                  
                  <Stack gap={8}>
                    {feature.benefits.map((benefit, idx) => (
                      <Group key={idx} gap={8}>
                        <div style={{ 
                          width: 6, 
                          height: 6, 
                          borderRadius: '50%', 
                          background: 'var(--mantine-color-indigo-5)' 
                        }} />
                        <Text size="sm" fw={500} c="indigo.6">
                          {benefit}
                        </Text>
                      </Group>
                    ))}
                  </Stack>
                </Stack>
              </Card>
            );
          })}
        </div>

      </div>
    </Container>
  );
}