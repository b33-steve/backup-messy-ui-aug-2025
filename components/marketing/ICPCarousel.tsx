'use client';

import React, { useState, useEffect } from 'react';
import { Container, Card, Title, Text, Button, Stack, Box, Badge, Group, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconUsers, IconRocket, IconBuilding, IconArrowRight, IconChevronLeft, IconChevronRight, IconTarget, IconTrendingUp, IconBrain } from '@tabler/icons-react';
import Link from 'next/link';

/**
 * Component: ICPCarousel
 * Purpose: Showcase the three ideal customer profiles from PRD
 * Design: Interactive carousel with detailed ICP information
 * 
 * ICPs:
 * 1. Senior Product Manager at Scale-Up Companies (Primary)
 * 2. Enterprise Product Leaders (Secondary) 
 * 3. Early-Stage Founders & CPOs (Tertiary)
 */

interface ICP {
  id: string;
  title: string;
  description: string;
  demographics: {
    titles: string[];
    experience: string;
    background: string;
    location: string;
  };
  firmographics: {
    stage: string;
    industry: string;
    revenue: string;
    team: string;
    spend: string;
  };
  painPoints: string[];
  valueProposition: string;
  ctaText: string;
  ctaLink: string;
  icon: React.ReactNode;
  color: string;
  badge: string;
  priority: 'Primary' | 'Secondary' | 'Tertiary';
}

const icpData: ICP[] = [
  {
    id: 'senior-pm',
    title: 'Senior Product Manager at Scale-Up Companies',
    description: 'Experienced PMs leading product strategy at growing companies who need strategic intelligence to make confident decisions.',
    demographics: {
      titles: ['Senior PM', 'Principal PM', 'Head of Product', 'VP Product'],
      experience: '5-12 years in product management',
      background: 'Technical or business background, often MBA/CS',
      location: 'US/EU tech hubs'
    },
    firmographics: {
      stage: 'Series A-C (50-500 employees)',
      industry: 'B2B SaaS, fintech, healthtech, AI/ML',
      revenue: '$5M-50M ARR',
      team: '3-15 person product team',
      spend: '$5K-15K/year per PM'
    },
    painPoints: [
      'Strategic decision paralysis - 87% struggle with confidence',
      'Spending 3-8 hours per strategic decision with only 60% confidence',
      '$2K-5K per quarter on external strategic advisors',
      'No predictive outcome modeling before resource commitment'
    ],
    valueProposition: 'Transform strategic decision-making from 8-hour manual research to 10-minute AI-powered insights with 95% confidence.',
    ctaText: 'Perfect for Scale-Ups',
    ctaLink: '/trial?segment=senior-pm',
    icon: <IconUsers size={24} />,
    color: 'indigo',
    badge: '🎯 Primary ICP',
    priority: 'Primary'
  },
  {
    id: 'enterprise-leader',
    title: 'Enterprise Product Leaders',
    description: 'VP Products and CPOs managing large product organizations who need strategic intelligence at scale.',
    demographics: {
      titles: ['VP Product', 'CPO', 'Director of Product Management'],
      experience: '8-15+ years, managing 10+ PMs',
      background: 'Strategic planning for entire product organization',
      location: 'Global enterprise centers'
    },
    firmographics: {
      stage: 'Series C+ or Public (500+ employees)',
      industry: 'Enterprise SaaS, fintech, healthcare, technology',
      revenue: '$50M+ ARR',
      team: '15+ person product organization',
      spend: '$50K-200K/year organization-wide'
    },
    painPoints: [
      'Strategy-to-execution gap across large product teams',
      'Need to professionalize PM practices quickly at scale',
      'Resource allocation decisions across multiple product lines',
      'Alignment challenges with 81% reporting issues'
    ],
    valueProposition: 'Scale strategic decision-making across your entire product organization with AI-powered intelligence and executive-level reporting.',
    ctaText: 'Built for Enterprise',
    ctaLink: '/contact?segment=enterprise-leader',
    icon: <IconBuilding size={24} />,
    color: 'blue',
    badge: '🏢 Secondary ICP',
    priority: 'Secondary'
  },
  {
    id: 'early-stage-founder',
    title: 'Early-Stage Founders & CPOs',
    description: 'Founders and early CPOs wearing multiple hats who need strategic product guidance without dedicated PM staff.',
    demographics: {
      titles: ['Founder', 'Co-Founder', 'CPO', 'Head of Product'],
      experience: '2-10 years, wearing multiple hats',
      background: 'Product strategy without dedicated PM staff',
      location: 'Global startup ecosystems'
    },
    firmographics: {
      stage: 'Pre-seed to Series A (5-50 employees)',
      industry: 'Tech startups, AI/ML, SaaS, mobile apps',
      revenue: '$0-5M ARR',
      team: '1-5 person product/engineering team',
      spend: '$500-3K/year total'
    },
    painPoints: [
      'Limited budget for external strategic consulting',
      'Need strategic guidance quickly without sacrificing depth',
      'Fast-moving markets requiring rapid strategic pivots',
      'Managing product roadmap complexity with limited resources'
    ],
    valueProposition: 'Get PMO-level strategic capabilities at startup budget - compete with enterprise teams using AI-powered strategic intelligence.',
    ctaText: 'Startup-Friendly Pricing',
    ctaLink: '/trial?segment=early-stage-founder',
    icon: <IconRocket size={24} />,
    color: 'orange',
    badge: '🚀 Tertiary ICP',
    priority: 'Tertiary'
  }
];

interface ICPCarouselProps {
  autoRotate?: boolean;
  showControls?: boolean;
  className?: string;
}

export default function ICPCarousel({ 
  autoRotate = true,
  showControls = true,
  className = '' 
}: ICPCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate functionality
  useEffect(() => {
    if (!autoRotate || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % icpData.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [autoRotate, isPaused]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + icpData.length) % icpData.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % icpData.length);
  };

  const currentICP = icpData[currentIndex];

  return (
    <Container size="xl" py={80} className={className}>
      <Stack gap={48}>
        {/* Header */}
        <Stack align="center" gap={24}>
          <Badge size="xl" variant="gradient" gradient={{ from: 'cyan', to: 'indigo' }}>
            🎯 Ideal Customer Profiles
          </Badge>
          <Title order={2} size="h1" ta="center" maw={800}>
            Designed for Product Leaders at Every Stage
          </Title>
          <Text size="xl" c="dimmed" ta="center" maw={600}>
            From early-stage founders to enterprise CPOs, PM33 adapts to your strategic needs and organizational scale.
          </Text>
        </Stack>

        {/* Carousel */}
        <Box pos="relative">
          <Card
            shadow="xl"
            radius="xl"
            p={48}
            style={{
              background: `linear-gradient(135deg, var(--mantine-color-${currentICP.color}-0) 0%, var(--mantine-color-${currentICP.color}-1) 100%)`,
              border: `2px solid var(--mantine-color-${currentICP.color}-3)`,
              minHeight: '600px'
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={48}>
              {/* Left Column - ICP Details */}
              <Stack gap={32}>
                <Group gap={16}>
                  <ThemeIcon 
                    size={60} 
                    variant="gradient" 
                    gradient={{ from: currentICP.color, to: `${currentICP.color}.7` }}
                    radius="xl"
                  >
                    {currentICP.icon}
                  </ThemeIcon>
                  <Stack gap={8}>
                    <Badge 
                      size="lg" 
                      color={currentICP.color} 
                      variant="light"
                    >
                      {currentICP.badge}
                    </Badge>
                    <Title order={3} size="h2" c={`${currentICP.color}.8`}>
                      {currentICP.title}
                    </Title>
                  </Stack>
                </Group>

                <Text size="lg" c="dimmed" lh={1.6}>
                  {currentICP.description}
                </Text>

                {/* Demographics */}
                <Stack gap={16}>
                  <Title order={4} size="h4" c={`${currentICP.color}.7`}>
                    👥 Demographics
                  </Title>
                  <SimpleGrid cols={1} spacing={12}>
                    <Group gap={8}>
                      <Text size="sm" fw={600} c={`${currentICP.color}.6`}>Titles:</Text>
                      <Text size="sm" c="dimmed">{currentICP.demographics.titles.join(', ')}</Text>
                    </Group>
                    <Group gap={8}>
                      <Text size="sm" fw={600} c={`${currentICP.color}.6`}>Experience:</Text>
                      <Text size="sm" c="dimmed">{currentICP.demographics.experience}</Text>
                    </Group>
                    <Group gap={8}>
                      <Text size="sm" fw={600} c={`${currentICP.color}.6`}>Background:</Text>
                      <Text size="sm" c="dimmed">{currentICP.demographics.background}</Text>
                    </Group>
                  </SimpleGrid>
                </Stack>

                {/* Firmographics */}
                <Stack gap={16}>
                  <Title order={4} size="h4" c={`${currentICP.color}.7`}>
                    🏢 Company Profile
                  </Title>
                  <SimpleGrid cols={1} spacing={12}>
                    <Group gap={8}>
                      <Text size="sm" fw={600} c={`${currentICP.color}.6`}>Stage:</Text>
                      <Text size="sm" c="dimmed">{currentICP.firmographics.stage}</Text>
                    </Group>
                    <Group gap={8}>
                      <Text size="sm" fw={600} c={`${currentICP.color}.6`}>Revenue:</Text>
                      <Text size="sm" c="dimmed">{currentICP.firmographics.revenue}</Text>
                    </Group>
                    <Group gap={8}>
                      <Text size="sm" fw={600} c={`${currentICP.color}.6`}>Team Size:</Text>
                      <Text size="sm" c="dimmed">{currentICP.firmographics.team}</Text>
                    </Group>
                  </SimpleGrid>
                </Stack>
              </Stack>

              {/* Right Column - Pain Points & Value Prop */}
              <Stack gap={32}>
                {/* Pain Points */}
                <Stack gap={20}>
                  <Title order={4} size="h4" c={`${currentICP.color}.7`}>
                    💡 Key Pain Points
                  </Title>
                  <Stack gap={16}>
                    {currentICP.painPoints.map((pain, index) => (
                      <Group key={index} gap={12} align="flex-start">
                        <ThemeIcon 
                          size={24} 
                          variant="light" 
                          color={currentICP.color} 
                          radius="xl"
                        >
                          <IconTarget size={14} />
                        </ThemeIcon>
                        <Text size="sm" c="dimmed" style={{ flex: 1 }}>
                          {pain}
                        </Text>
                      </Group>
                    ))}
                  </Stack>
                </Stack>

                {/* Value Proposition */}
                <Card 
                  p={24} 
                  radius="lg" 
                  bg={`${currentICP.color}.1`}
                  style={{ border: `1px solid var(--mantine-color-${currentICP.color}-3)` }}
                >
                  <Stack gap={16}>
                    <Group gap={12}>
                      <ThemeIcon 
                        size={32} 
                        variant="gradient" 
                        gradient={{ from: currentICP.color, to: `${currentICP.color}.7` }}
                        radius="xl"
                      >
                        <IconBrain size={18} />
                      </ThemeIcon>
                      <Title order={4} size="h5" c={`${currentICP.color}.8`}>
                        PM33 Value Proposition
                      </Title>
                    </Group>
                    <Text size="sm" fw={500} c={`${currentICP.color}.7`} lh={1.6}>
                      {currentICP.valueProposition}
                    </Text>
                  </Stack>
                </Card>

                {/* CTA */}
                <Button
                  component={Link}
                  href={currentICP.ctaLink}
                  size="xl"
                  variant="gradient"
                  gradient={{ from: currentICP.color, to: `${currentICP.color}.7` }}
                  rightSection={<IconArrowRight size={20} />}
                  fullWidth
                  style={{
                    borderRadius: '16px',
                    fontWeight: 700,
                    fontSize: '16px',
                    height: '60px'
                  }}
                >
                  {currentICP.ctaText}
                </Button>
              </Stack>
            </SimpleGrid>
          </Card>

          {/* Navigation Controls */}
          {showControls && (
            <Group gap={16} justify="center" mt={32}>
              <Button
                variant="outline"
                color={currentICP.color}
                size="lg"
                leftSection={<IconChevronLeft size={20} />}
                onClick={handlePrevious}
              >
                Previous
              </Button>
              
              {/* Indicators */}
              <Group gap={8}>
                {icpData.map((_, index) => (
                  <Box
                    key={index}
                    w={12}
                    h={12}
                    bg={index === currentIndex ? `${currentICP.color}.6` : 'gray.3'}
                    style={{
                      borderRadius: '50%',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </Group>

              <Button
                variant="outline"
                color={currentICP.color}
                size="lg"
                rightSection={<IconChevronRight size={20} />}
                onClick={handleNext}
              >
                Next
              </Button>
            </Group>
          )}
        </Box>

        {/* Summary Stats */}
        <Card shadow="md" radius="xl" p={32} bg="gray.0">
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32}>
            <Stack align="center" gap={12}>
              <ThemeIcon size={48} variant="light" color="indigo" radius="xl">
                <IconUsers size={24} />
              </ThemeIcon>
              <Text size="24px" fw={900} c="indigo.4">334K</Text>
              <Text size="sm" c="dimmed" ta="center">Total Addressable PMs</Text>
            </Stack>
            
            <Stack align="center" gap={12}>
              <ThemeIcon size={48} variant="light" color="blue" radius="xl">
                <IconTrendingUp size={24} />
              </ThemeIcon>
              <Text size="24px" fw={900} c="blue.4">$2.1B</Text>
              <Text size="sm" c="dimmed" ta="center">PM Software Market</Text>
            </Stack>
            
            <Stack align="center" gap={12}>
              <ThemeIcon size={48} variant="light" color="orange" radius="xl">
                <IconTarget size={24} />
              </ThemeIcon>
              <Text size="24px" fw={900} c="orange.5">675</Text>
              <Text size="sm" c="dimmed" ta="center">Target Customers for $100K MRR</Text>
            </Stack>
          </SimpleGrid>
        </Card>
      </Stack>
    </Container>
  );
}