'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { Container, Card, Title, Text, Button, Stack, Badge, SimpleGrid, Box, Group, ThemeIcon } from '@mantine/core';
import { IconArrowRight, IconBolt, IconBrain, IconUsers, IconSparkles, IconTarget, IconTrendingUp } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '../components/marketing/IsolatedMarketingNavigation';
import Footer from '../components/marketing/IsolatedMarketingFooter';
import SegmentMessaging, { detectUserSegment, type UserSegment } from '../components/marketing/SegmentMessaging';
import TestimonialShowcase from '../components/marketing/TestimonialShowcase';
import SocialProofMetrics from '../components/marketing/SocialProofMetrics';
import ABTestingFramework, { ABTestCTA } from '../components/marketing/ABTestingFramework';
import CompanyLogoCarousel from '../components/marketing/CompanyLogoCarousel';
import TrustBadges from '../components/marketing/TrustBadges';
import ICPCarousel from '../components/marketing/ICPCarousel';
import AnalyticsDashboard, { useAnalyticsContext } from '../components/marketing/AnalyticsDashboard';
import { analytics } from '../lib/analytics';

/**
 * Component: ConversionOptimizedHomepage
 * Purpose: Maximum conversion homepage with segment-specific messaging
 * Design: Dynamic personalization, A/B testing, comprehensive social proof
 * 
 * Features:
 * - Segment detection and dynamic messaging
 * - A/B testing for hero CTAs
 * - Social proof metrics and testimonials
 * - Progressive conversion optimization
 * - PostHog analytics integration
 */

function ConversionOptimizedHomepageContent() {
  const [userSegment, setUserSegment] = useState<UserSegment>('default');
  const { trackConversion } = useAnalyticsContext();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Detect user segment and personalize experience
    const detectedSegment = detectUserSegment();
    setUserSegment(detectedSegment);

    // Track homepage view with segment context
    analytics.trackPageView('homepage', {
      user_segment: detectedSegment,
      utm_source: searchParams.get('utm_source') || undefined,
      utm_medium: searchParams.get('utm_medium') || undefined,
      utm_campaign: searchParams.get('utm_campaign') || undefined,
    });

    // Track funnel entry
    analytics.trackFunnelStep('pm33_conversion', 'homepage_view', 1, detectedSegment);
  }, [searchParams]);

  const handleTrialClick = (location: string) => {
    trackConversion('trial_click', 0);
    analytics.trackCTAClick('Start Free Trial', 'primary', '/trial', `homepage_${location}`);
  };

  const handleDemoClick = (location: string) => {
    trackConversion('demo_click', 0);
    analytics.trackCTAClick('Try Live Demo', 'secondary', '/strategic-intelligence-demo', `homepage_${location}`);
  };

  return (
    <AnalyticsDashboard>
      <div className="marketing-context">
        <Navigation />
        <main className="pt-16">
          <Box style={{ minHeight: '100vh', backgroundColor: 'var(--marketing-bg-primary)' }}>

            {/* Hero Section with Dynamic Messaging */}
            <Box 
              style={{ 
                position: 'relative',
                padding: '6rem 0',
                background: `linear-gradient(135deg, var(--marketing-bg-secondary) 0%, var(--marketing-bg-primary) 50%, var(--marketing-bg-accent) 100%)`,
                overflow: 'hidden'
              }}
            >
              <Container size="xl">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                  {/* Hero Content */}
                  <Stack gap={32}>
                    <SegmentMessaging 
                      segment={userSegment}
                      component="hero"
                    />
                    
                    {/* Dynamic CTAs with A/B Testing */}
                    <Group gap={16}>
                      <ABTestCTA
                        test="homepage"
                        component={Link}
                        href="/trial"
                        onClick={() => handleTrialClick('hero')}
                        rightSection={<IconArrowRight size={20} />}
                        pageContext="homepage_hero"
                        style={{ borderRadius: 16 }}
                      />
                      
                      <Button 
                        component={Link}
                        href="/strategic-intelligence-demo"
                        onClick={() => handleDemoClick('hero')}
                        size="xl"
                        variant="outline"
                        leftSection={<IconBolt size={20} />}
                        style={{ borderRadius: 16 }}
                      >
                        Try Live Demo
                      </Button>
                    </Group>
                    
                    <SegmentMessaging 
                      segment={userSegment}
                      component="trust-signals"
                    />
                  </Stack>

                  {/* Hero Visual - AI Strategy Assistant */}
                  <Box pos="relative">
                    <Card 
                      shadow="xl" 
                      radius="xl" 
                      p={32}
                      style={{ 
                        backgroundColor: 'var(--marketing-bg-primary)',
                        border: '2px solid var(--marketing-primary)',
                        backdropFilter: 'blur(20px)'
                      }}
                    >
                      <Group mb={24}>
                        <ThemeIcon size={40} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                          <IconBrain size={20} />
                        </ThemeIcon>
                        <Text fw={700} size="lg">AI Strategy Assistant</Text>
                      </Group>
                      
                      <Stack gap={16}>
                        <Card p={16} radius="lg" bg="indigo.0" style={{ border: '1px solid var(--mantine-color-indigo-2)' }}>
                          <Text size="sm" fw={600} c="var(--pm33-primary)" mb={4}>Strategic Analysis Complete ✨</Text>
                          <Text size="sm" c="dimmed">
                            {userSegment === 'startup-pm' 
                              ? 'Identified 3 growth opportunities for Series B positioning'
                              : userSegment === 'enterprise-pmo'
                              ? 'Portfolio optimization: $15M market opportunity detected'
                              : 'Mobile performance priority: 34% churn reduction potential'
                            }
                          </Text>
                        </Card>
                        
                        <Card p={16} radius="lg" bg="teal.0" style={{ border: '1px solid var(--mantine-color-teal-2)' }}>
                          <Text size="sm" fw={600} c="teal.6" mb={4}>Impact Prediction</Text>
                          <Text size="sm" c="dimmed">
                            {userSegment === 'startup-pm' 
                              ? '185% MRR growth trajectory'
                              : userSegment === 'enterprise-pmo'
                              ? '70% PMO efficiency improvement'
                              : '78% faster feature delivery'
                            }
                          </Text>
                        </Card>
                        
                        <Card p={16} radius="lg" bg="orange.0" style={{ border: '1px solid var(--mantine-color-orange-2)' }}>
                          <Text size="sm" fw={600} c="orange.6" mb={4}>Action Plan Generated</Text>
                          <Text size="sm" c="dimmed">
                            {userSegment === 'startup-pm' 
                              ? 'Lean startup roadmap with investor metrics'
                              : userSegment === 'enterprise-pmo'
                              ? 'Executive dashboard with board-level KPIs'
                              : 'Complete PRD with technical specifications'
                            }
                          </Text>
                        </Card>
                      </Stack>
                    </Card>
                    
                    {/* Floating Elements */}
                    <ThemeIcon 
                      size={56} 
                      variant="gradient" 
                      gradient={{ from: 'cyan', to: 'blue' }}
                      pos="absolute"
                      top={-16}
                      right={-16}
                      style={{ boxShadow: 'var(--mantine-shadow-lg)' }}
                    >
                      <IconTarget size={24} />
                    </ThemeIcon>
                  </Box>
                </div>
              </Container>
            </Box>

            {/* Trust Badges Section */}
            <TrustBadges layout="horizontal" showMetrics={true} />

            {/* Pain Points Section - Segment Specific */}
            <Container size="xl" py={80}>
              <SegmentMessaging 
                segment={userSegment}
                component="pain-points"
              />
            </Container>

            {/* Company Logo Carousel */}
            <CompanyLogoCarousel />

            {/* Social Proof Metrics */}
            <Container size="xl" py={80}>
              <SocialProofMetrics
                segment={userSegment === 'startup-pm' ? 'startup' : 
                        userSegment === 'enterprise-pmo' ? 'enterprise' : 'all'}
                showTrustSignals={true}
                animated={true}
                maxColumns={3}
                pageContext="homepage_social_proof"
              />
            </Container>

            {/* Benefits Section - Segment Specific */}
            <Box py={80} style={{ backgroundColor: 'var(--marketing-bg-secondary)' }}>
              <Container size="xl">
                <SegmentMessaging 
                  segment={userSegment}
                  component="benefits"
                />
              </Container>
            </Box>

            {/* ICP Carousel - Ideal Customer Profiles */}
            <ICPCarousel autoRotate={true} showControls={true} />

            {/* Customer Testimonials - Dynamic by Segment */}
            <Container size="xl" py={80}>
              <TestimonialShowcase
                format="carousel"
                segment={userSegment === 'startup-pm' ? 'startup-pm' : 
                        userSegment === 'senior-pm' ? 'senior-pm' :
                        userSegment === 'vp-product' ? 'vp-product' :
                        userSegment === 'enterprise-pmo' ? 'enterprise-pmo' : undefined}
                maxItems={3}
                showMetrics={true}
                autoRotate={true}
                pageContext="homepage_testimonials"
              />
            </Container>

            {/* Demo Section */}
            <Box py={80} style={{ backgroundColor: 'var(--marketing-bg-secondary)' }} data-testid="demo-cards-section">
              <Container size="xl">
                <Stack align="center" gap={48}>
                  <Badge 
                    size="xl" 
                    variant="gradient" 
                    gradient={{ from: 'indigo', to: 'cyan' }}
                    leftSection={<IconSparkles size={18} />}
                  >
                    ✨ Experience PM33 in Action
                  </Badge>
                  
                  <Stack align="center" gap={16}>
                    <Title order={2} size="h2" ta="center">
                      {userSegment === 'enterprise-pmo' 
                        ? 'See Enterprise PMO Transformation'
                        : userSegment === 'startup-pm'
                        ? 'See How Startups Compete with Enterprise Teams'
                        : 'See AI-Powered Strategic Intelligence'
                      }
                    </Title>
                    <Text size="lg" c="dimmed" ta="center" maw={600}>
                      Try our live demo workflows designed specifically for {
                        userSegment === 'startup-pm' ? 'startup PMs' :
                        userSegment === 'senior-pm' ? 'senior product managers' :
                        userSegment === 'vp-product' ? 'VP Products' :
                        userSegment === 'enterprise-pmo' ? 'enterprise PMOs' :
                        'product managers'
                      }.
                    </Text>
                  </Stack>
                  
                  <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32}>
                    {/* Strategic Intelligence Demo */}
                    <Card 
                      shadow="xl" 
                      radius="xl" 
                      p={32}
                      component={Link}
                      href="/strategic-intelligence-demo"
                      onClick={() => handleDemoClick('strategic_demo')}
                      style={{ 
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary)',
                        border: '2px solid var(--mantine-color-indigo-4)',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      className="hover:shadow-2xl hover:translate-y-[-4px]"
                      data-testid="strategic-intelligence-demo-card"
                    >
                      <Group mb={20}>
                        <ThemeIcon size={48} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                          <IconBrain size={24} />
                        </ThemeIcon>
                        <Stack gap={4} style={{ flex: 1 }}>
                          <Text fw={700} size="xl">Strategic Intelligence Engine</Text>
                          <Badge color="green" variant="light" size="sm">✅ Live Demo Ready</Badge>
                        </Stack>
                      </Group>
                      
                      <Text c="dimmed" mb={16}>
                        {userSegment === 'startup-pm' 
                          ? 'Strategic analysis that helps startups compete with enterprise teams'
                          : userSegment === 'enterprise-pmo'
                          ? 'Portfolio-wide strategic intelligence for enterprise PMO transformation'
                          : 'AI-powered strategic analysis with multi-framework insights'
                        }
                      </Text>
                      
                      <Group justify="space-between">
                        <Stack gap={4}>
                          <Text size="sm" fw={500} c="indigo.4">
                            ✨ {userSegment === 'startup-pm' ? 'Growth opportunity analysis' : 
                                userSegment === 'enterprise-pmo' ? 'Portfolio optimization' : 
                                'Multi-framework analysis'}
                          </Text>
                          <Text size="sm" fw={500} c="indigo.4">
                            🎯 {userSegment === 'startup-pm' ? 'Investor-ready metrics' : 
                                userSegment === 'enterprise-pmo' ? 'Board-level reporting' : 
                                'Confidence-scored recommendations'}
                          </Text>
                          <Text size="sm" fw={500} c="indigo.4">⚡ Real-time strategic insights</Text>
                        </Stack>
                        <Button variant="light" size="sm" rightSection={<IconArrowRight size={16} />}>
                          Try Now
                        </Button>
                      </Group>
                    </Card>

                    {/* Command Center Demo */}
                    <Card 
                      shadow="xl" 
                      radius="xl" 
                      p={32}
                      component={Link}
                      href="/command-center-demo"
                      onClick={() => handleDemoClick('command_center')}
                      style={{ 
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary)',
                        border: '2px solid var(--mantine-color-cyan-6)',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      className="hover:shadow-2xl hover:translate-y-[-4px]"
                      data-testid="command-center-demo-card"
                    >
                      <Group mb={20}>
                        <ThemeIcon size={48} variant="gradient" gradient={{ from: 'cyan', to: 'blue' }}>
                          <IconTarget size={24} />
                        </ThemeIcon>
                        <Stack gap={4} style={{ flex: 1 }}>
                          <Text fw={700} size="xl">Strategic Command Center</Text>
                          <Badge color="green" variant="light" size="sm">✅ Live Demo Ready</Badge>
                        </Stack>
                      </Group>
                      
                      <Text c="dimmed" mb={16}>
                        {userSegment === 'startup-pm' 
                          ? 'Complete startup PM workflow automation with lean startup metrics'
                          : userSegment === 'enterprise-pmo'
                          ? '4 AI teams coordinating enterprise PMO transformation at scale'
                          : 'Real-time orchestration of 4 specialized AI teams'
                        }
                      </Text>
                      
                      <Group justify="space-between">
                        <Stack gap={4}>
                          <Text size="sm" fw={500} c="cyan.4">
                            🤖 {userSegment === 'startup-pm' ? 'Lean startup automation' : 
                                userSegment === 'enterprise-pmo' ? 'Enterprise AI coordination' : 
                                '4 AI teams coordination'}
                          </Text>
                          <Text size="sm" fw={500} c="cyan.4">
                            📊 {userSegment === 'startup-pm' ? 'Growth metrics tracking' : 
                                userSegment === 'enterprise-pmo' ? 'Executive dashboards' : 
                                'Real-time strategic metrics'}
                          </Text>
                          <Text size="sm" fw={500} c="cyan.4">🔄 End-to-end workflow automation</Text>
                        </Stack>
                        <Button variant="light" size="sm" rightSection={<IconArrowRight size={16} />}>
                          Try Now
                        </Button>
                      </Group>
                    </Card>
                  </SimpleGrid>
                </Stack>
              </Container>
            </Box>

            {/* Pricing Preview - Segment Specific */}
            <Container size="xl" py={80}>
              <Stack align="center" gap={32}>
                <Title order={2} size="h2" ta="center">
                  {userSegment === 'startup-pm' ? 'Startup-Friendly Pricing' :
                   userSegment === 'enterprise-pmo' ? 'Enterprise PMO Solutions' :
                   'Simple, Transparent Pricing'}
                </Title>
                
                <SegmentMessaging 
                  segment={userSegment}
                  component="pricing"
                />
                
                <Group gap={24}>
                  <ABTestCTA
                    test="pricing"
                    component={Link}
                    href="/pricing"
                    onClick={() => handleTrialClick('pricing_preview')}
                    pageContext="homepage_pricing"
                    rightSection={<IconArrowRight size={20} />}
                  />
                  
                  <Button
                    component={Link}
                    href="/trial"
                    size="xl"
                    variant="outline"
                    onClick={() => handleTrialClick('pricing_trial')}
                  >
                    Start Free Trial
                  </Button>
                </Group>
              </Stack>
            </Container>

            {/* Additional Trust Elements */}
            <Container size="xl" py={60}>
              <Stack align="center" gap={32}>
                <Text size="sm" fw={700} c="dimmed" tt="uppercase" ta="center" lts={1}>
                  Security & Compliance You Can Trust
                </Text>
                <TrustBadges layout="grid" showMetrics={false} />
              </Stack>
            </Container>

            {/* Final CTA Section */}
            <Box 
              py={96} 
              style={{ 
                background: 'var(--pm33-bg-primary)',
                color: 'var(--pm33-text-primary)',
                borderTop: '1px solid var(--pm33-border)'
              }}
            >
              <Container size="xl">
                <Stack align="center" gap={48}>
                  <SegmentMessaging 
                    segment={userSegment}
                    component="cta"
                  />
                  
                  <Stack align="center" gap={24}>
                    <Title order={2} size="h1" ta="center" style={{ color: 'var(--pm33-text-primary)' }} maw={800}>
                      Ready to Transform Your {
                        userSegment === 'startup-pm' ? 'Startup' :
                        userSegment === 'senior-pm' ? 'Career' :
                        userSegment === 'vp-product' ? 'Product Organization' :
                        userSegment === 'enterprise-pmo' ? 'Enterprise PMO' :
                        'PM Work'
                      }?
                    </Title>
                    
                    <Text size="xl" style={{ color: 'var(--pm33-text-secondary)' }} ta="center" maw={600}>
                      {userSegment === 'startup-pm' 
                        ? 'Join 400+ startup PMs already accelerating growth and competing with enterprise teams.'
                        : userSegment === 'senior-pm'
                        ? 'Join 1,200+ senior PMs already advancing to strategic leadership roles.'
                        : userSegment === 'vp-product'
                        ? 'Join 150+ product leaders transforming their organizations for measurable impact.'
                        : userSegment === 'enterprise-pmo'
                        ? 'Join 25+ enterprise PMOs already transforming strategic capabilities at scale.'
                        : 'Join 2,500+ product managers focusing on strategy, not busywork.'
                      }
                    </Text>
                  </Stack>
                  
                  <Group gap={24} justify="center">
                    <ABTestCTA
                      test="homepage"
                      component={Link}
                      href="/trial"
                      onClick={() => handleTrialClick('final_cta')}
                      pageContext="homepage_final_cta"
                      rightSection={<IconArrowRight size={20} />}
                      style={{ 
                        borderRadius: 16,
                        fontWeight: 700,
                        boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3)'
                      }}
                    />
                    
                    {userSegment === 'enterprise-pmo' ? (
                      <Button 
                        component={Link}
                        href="/enterprise"
                        size="xl"
                        variant="outline"
                        style={{ 
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                          color: 'white',
                          borderRadius: 16
                        }}
                      >
                        Schedule Executive Demo
                      </Button>
                    ) : (
                      <Button 
                        component={Link}
                        href="/strategic-intelligence-demo"
                        onClick={() => handleDemoClick('final_demo')}
                        size="xl"
                        variant="outline"
                        style={{ 
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                          color: 'white',
                          borderRadius: 16
                        }}
                        leftSection={<IconBolt size={20} />}
                      >
                        Try Strategic Intelligence
                      </Button>
                    )}
                  </Group>
                  
                  <SegmentMessaging 
                    segment={userSegment}
                    component="trust-signals"
                  />
                </Stack>
              </Container>
            </Box>
          </Box>
        </main>
        <Footer />
      </div>
    </AnalyticsDashboard>
  );
}

export default function ConversionOptimizedHomepage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConversionOptimizedHomepageContent />
    </Suspense>
  );
}