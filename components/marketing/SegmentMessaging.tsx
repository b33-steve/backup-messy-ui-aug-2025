'use client';

import React from 'react';
import { Title, Text, Badge, List, Card, Stack, Group, ThemeIcon } from '@mantine/core';
import { IconCheck, IconTrendingUp, IconUsers, IconRocket, IconBolt, IconTarget, IconBrain, IconShield } from '@tabler/icons-react';
import { analytics } from '../../lib/analytics';

/**
 * Component: SegmentMessaging
 * Purpose: Dynamic messaging optimization for different customer segments
 * Design: Personalized value propositions, pain points, and CTAs by segment
 * 
 * Segments:
 * - startup-pm: Solo PMs at Series A/B startups (budget-conscious, scrappy)
 * - senior-pm: Experienced PMs at scale-ups (career advancement focus)  
 * - vp-product: VPs at growth companies (team efficiency, strategic impact)
 * - enterprise-pmo: PMOs at large enterprises (organization transformation)
 */

export type UserSegment = 'startup-pm' | 'senior-pm' | 'vp-product' | 'enterprise-pmo' | 'default';

interface SegmentData {
  segment: UserSegment;
  
  // Hero messaging
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  
  // Value propositions
  primaryValue: string;
  secondaryValue: string;
  tertiaryValue: string;
  
  // Pain points addressed
  painPoints: string[];
  
  // Benefits with metrics
  benefits: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    metric: string;
    color: string;
  }>;
  
  // Social proof elements
  socialProofHeadline: string;
  testimonialQuote: string;
  testimonialAuthor: string;
  
  // CTA messaging
  primaryCTA: string;
  secondaryCTA: string;
  urgencyMessage: string;
  
  // Pricing emphasis
  recommendedTier: 'starter' | 'enterprise' | 'strategic';
  pricingMessage: string;
  
  // Trust signals
  trustSignals: string[];
}

const segmentData: Record<UserSegment, SegmentData> = {
  'startup-pm': {
    segment: 'startup-pm',
    heroTitle: 'From Solo PM to Strategic Powerhouse',
    heroSubtitle: 'Get PMO-level strategic capabilities without the enterprise budget. Built for scrappy startups that need to compete with teams 10x their size.',
    heroBadge: '🚀 Perfect for Series A-B Startups',
    
    primaryValue: 'Compete with enterprise teams on a startup budget',
    secondaryValue: 'Strategic insights that unlock hidden growth opportunities',
    tertiaryValue: 'Eliminate the need for expensive strategic consultants',
    
    painPoints: [
      'Solo PM wearing too many hats with no strategic support',
      'Limited budget for hiring additional PMs or consultants',
      'Need to prove strategic impact to secure Series B funding',
      'Competing against well-funded companies with full PM teams'
    ],
    
    benefits: [
      {
        icon: <IconRocket size={20} />,
        title: 'Startup Speed',
        description: 'Make strategic decisions in minutes, not weeks',
        metric: '10x faster',
        color: 'orange'
      },
      {
        icon: <IconTrendingUp size={20} />,
        title: 'Growth Unlock',
        description: 'Find hidden revenue opportunities competitors miss',
        metric: '185% MRR growth',
        color: 'green'
      },
      {
        icon: <IconBrain size={20} />,
        title: 'Strategic Edge',
        description: 'Enterprise-level analysis on startup resources',
        metric: '$45K saved',
        color: 'blue'
      }
    ],
    
    socialProofHeadline: 'Trusted by 400+ Startup PMs',
    testimonialQuote: 'As a solo PM at a startup, PM33 gave me enterprise-level strategic capabilities. We now compete with teams 10x our size.',
    testimonialAuthor: 'David Kim, PM at StartupFlow',
    
    primaryCTA: 'Start Free Trial - No Risk',
    secondaryCTA: 'See Startup Success Stories',
    urgencyMessage: '🔥 Join 400+ startup PMs already accelerating growth',
    
    recommendedTier: 'starter',
    pricingMessage: 'Start with Starter tier ($49/month) - perfect for solo PMs and small teams. Upgrade as you grow.',
    
    trustSignals: [
      'No long-term contracts',
      '14-day free trial',
      'Cancel anytime',
      'Startup-friendly pricing'
    ]
  },

  'senior-pm': {
    segment: 'senior-pm',
    heroTitle: 'Accelerate Your Path to VP Product',
    heroSubtitle: 'Transform from tactical executor to strategic leader. Build the strategic thinking skills that get you promoted and recognized as a thought leader.',
    heroBadge: '⭐ Career Acceleration Platform',
    
    primaryValue: 'Become the strategic PM your company relies on for critical decisions',
    secondaryValue: 'Build thought leadership and industry recognition',
    tertiaryValue: '78% faster feature delivery with strategic focus',
    
    painPoints: [
      'Stuck in execution mode, not getting strategic recognition',
      'Hard to demonstrate strategic impact for promotion',
      'Need to build thought leadership and industry presence',
      'Want to transition from senior PM to VP Product role'
    ],
    
    benefits: [
      {
        icon: <IconTarget size={20} />,
        title: 'Strategic Authority',
        description: 'Become the go-to PM for strategic product decisions',
        metric: '340% increase',
        color: 'indigo'
      },
      {
        icon: <IconUsers size={20} />,
        title: 'Career Growth',
        description: 'Build skills and credibility for VP Product promotion',
        metric: '2x faster',
        color: 'purple'
      },
      {
        icon: <IconBolt size={20} />,
        title: 'Execution Excellence',
        description: 'Ship features 78% faster with strategic clarity',
        metric: '78% faster',
        color: 'yellow'
      }
    ],
    
    socialProofHeadline: 'Accelerating 1,200+ Senior PM Careers',
    testimonialQuote: 'PM33 accelerated my career from PM to strategic product leader. The insights are incredible and my stakeholders now see me as indispensable.',
    testimonialAuthor: 'Sarah Chen, VP Product at TechFlow',
    
    primaryCTA: 'Accelerate My Career',
    secondaryCTA: 'See Career Success Stories',
    urgencyMessage: '🎯 Join 1,200+ PMs already advancing to leadership roles',
    
    recommendedTier: 'enterprise',
    pricingMessage: 'Enterprise tier ($99/month) recommended - includes advanced strategic analysis and team collaboration features.',
    
    trustSignals: [
      'Used by VPs at top companies',
      'Thought leadership development',
      'Career advancement focus',
      '4.9/5 satisfaction rating'
    ]
  },

  'vp-product': {
    segment: 'vp-product',
    heroTitle: 'Transform Your Product Organization',
    heroSubtitle: 'Scale your team\'s strategic capabilities across the entire product organization. Turn your PMs into strategic thinkers who drive measurable business impact.',
    heroBadge: '🏆 Product Organization Transformation',
    
    primaryValue: 'Scale strategic thinking across your entire PM team',
    secondaryValue: 'Measurable improvement in product-market fit and revenue',
    tertiaryValue: 'Eliminate strategic consultant dependency',
    
    painPoints: [
      'PM team focused on execution instead of strategy',
      'Lack of consistent strategic framework across products',
      'Expensive strategic consultants with limited product context',
      'Need to demonstrate product organization ROI to executives'
    ],
    
    benefits: [
      {
        icon: <IconTrendingUp size={20} />,
        title: 'Revenue Impact',
        description: 'Measurable business outcomes from strategic decisions',
        metric: '$2.3M ARR',
        color: 'teal'
      },
      {
        icon: <IconUsers size={20} />,
        title: 'Team Transformation',
        description: 'Every PM becomes a strategic contributor',
        metric: '300% improvement',
        color: 'blue'
      },
      {
        icon: <IconShield size={20} />,
        title: 'Consultant Replacement',
        description: 'Eliminate expensive external strategic consulting',
        metric: '$200K+ saved',
        color: 'green'
      }
    ],
    
    socialProofHeadline: 'Transforming 150+ Product Organizations',
    testimonialQuote: 'PM33 transformed our entire product organization. Our PMs now think strategically, not just tactically. Revenue impact has been incredible.',
    testimonialAuthor: 'Marcus Rodriguez, CPO at GrowthScale',
    
    primaryCTA: 'Transform My Team',
    secondaryCTA: 'Schedule Executive Demo',
    urgencyMessage: '🚀 Join 150+ product leaders already transforming their organizations',
    
    recommendedTier: 'enterprise',
    pricingMessage: 'Enterprise tier ($99/month per PM) with team collaboration features. Strategic tier available for larger organizations.',
    
    trustSignals: [
      'SOC 2 compliant',
      'Enterprise security',
      'Dedicated success manager',
      'White-glove onboarding'
    ]
  },

  'enterprise-pmo': {
    segment: 'enterprise-pmo',
    heroTitle: 'Enterprise PMO Transformation Platform',
    heroSubtitle: 'Deploy strategic intelligence across your entire portfolio. Standardize strategic decision-making with AI-powered PMO capabilities at enterprise scale.',
    heroBadge: '🏢 Enterprise PMO Solution',
    
    primaryValue: 'Standardize strategic excellence across your entire product portfolio',
    secondaryValue: '$15M+ market opportunities identified through strategic analysis',
    tertiaryValue: 'Complete PMO transformation with measurable ROI',
    
    painPoints: [
      'Inconsistent strategic frameworks across product portfolios',
      'PMO lacks real-time strategic intelligence capabilities',
      'High-cost consulting relationships with limited ongoing value',
      'Need to demonstrate quantifiable PMO ROI to board and executives'
    ],
    
    benefits: [
      {
        icon: <IconTrendingUp size={20} />,
        title: 'Portfolio Impact',
        description: 'Strategic optimization across entire product portfolio',
        metric: '$15M opportunities',
        color: 'green'
      },
      {
        icon: <IconBrain size={20} />,
        title: 'PMO Intelligence',
        description: 'Real-time strategic insights for executive reporting',
        metric: '70% efficiency gain',
        color: 'indigo'
      },
      {
        icon: <IconShield size={20} />,
        title: 'Enterprise Scale',
        description: 'Secure, compliant, scalable across global operations',
        metric: '99.9% uptime',
        color: 'blue'
      }
    ],
    
    socialProofHeadline: 'Powering 25+ Enterprise PMOs',
    testimonialQuote: 'PM33 transformed our entire PMO function. We identified a $15M market opportunity we were missing and accelerated our roadmap by 6 months.',
    testimonialAuthor: 'Lisa Brown, VP Product Strategy at CloudTech Industries',
    
    primaryCTA: 'Schedule Executive Demo',
    secondaryCTA: 'Get Enterprise ROI Analysis',
    urgencyMessage: '🎯 Join 25+ enterprise PMOs already transforming their strategic capabilities',
    
    recommendedTier: 'strategic',
    pricingMessage: 'Strategic tier ($199/month) with custom AI training, dedicated CSM, API access, and enterprise security.',
    
    trustSignals: [
      'SOC 2 Type II certified',
      'Enterprise SSO integration',
      '24/7 dedicated support',
      'Custom implementation',
      'Board-level reporting'
    ]
  },

  'default': {
    segment: 'default',
    heroTitle: 'Transform PMs into PMOs Through Agentic AI Teams',
    heroSubtitle: 'Get PMO-level strategic capabilities at PM budget. 4 AI teams provide strategic intelligence, workflow execution, data analysis, and communication support.',
    heroBadge: '🤖 Agentic AI Teams Platform',
    
    primaryValue: 'PMO-level strategic capabilities without the enterprise overhead',
    secondaryValue: '78% faster feature delivery with strategic insights',
    tertiaryValue: 'Replace expensive consultants with AI-powered intelligence',
    
    painPoints: [
      'Need strategic capabilities but lack PMO budget and team',
      'Spending too much time on tactical work, not enough on strategy',
      'Expensive strategic consultants with limited ongoing value',
      'Want to demonstrate strategic impact and accelerate career growth'
    ],
    
    benefits: [
      {
        icon: <IconBrain size={20} />,
        title: 'Strategic Intelligence',
        description: 'AI-powered strategic analysis and competitive insights',
        metric: '10x faster',
        color: 'indigo'
      },
      {
        icon: <IconBolt size={20} />,
        title: 'Execution Speed',
        description: 'Automated workflows and task coordination',
        metric: '78% faster delivery',
        color: 'yellow'
      },
      {
        icon: <IconTrendingUp size={20} />,
        title: 'Business Impact',
        description: 'Measurable revenue and growth outcomes',
        metric: '$2.3M impact',
        color: 'teal'
      }
    ],
    
    socialProofHeadline: 'Trusted by 2,500+ Product Managers',
    testimonialQuote: 'PM33 gives me PMO-level strategic capabilities I could never afford to hire. The AI teams work together seamlessly.',
    testimonialAuthor: 'Product Manager at Growing Company',
    
    primaryCTA: 'Start Free Trial',
    secondaryCTA: 'See How It Works',
    urgencyMessage: '⚡ Join 2,500+ PMs already transforming their strategic impact',
    
    recommendedTier: 'enterprise',
    pricingMessage: 'Most customers choose Enterprise tier ($99/month) for full AI team coordination and unlimited analysis.',
    
    trustSignals: [
      '14-day free trial',
      'No credit card required',
      '4.9/5 customer rating',
      'Cancel anytime'
    ]
  }
};

interface SegmentMessagingProps {
  segment?: UserSegment;
  component: 'hero' | 'benefits' | 'social-proof' | 'cta' | 'pricing' | 'pain-points' | 'trust-signals';
  className?: string;
}

export default function SegmentMessaging({ 
  segment = 'default', 
  component,
  className = '' 
}: SegmentMessagingProps) {
  const data = segmentData[segment];

  // Track messaging view
  React.useEffect(() => {
    analytics.track('segment_messaging_viewed', {
      segment,
      component,
      page_context: 'messaging_optimization'
    } as any);
  }, [segment, component]);

  switch (component) {
    case 'hero':
      return (
        <Stack align="center" gap={24} className={className}>
          <Badge size="xl" variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
            {data.heroBadge}
          </Badge>
          
          <Stack align="center" gap={16}>
            <Title order={1} size="h1" ta="center" maw={800} lh={1.1}>
              {data.heroTitle}
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6}>
              {data.heroSubtitle}
            </Text>
          </Stack>
          
          <Stack align="center" gap={8} mt={16}>
            <Text fw={600} c="indigo.6">{data.primaryValue}</Text>
            <Group gap={24} ta="center">
              <Text size="sm" c="dimmed">✓ {data.secondaryValue}</Text>
              <Text size="sm" c="dimmed">✓ {data.tertiaryValue}</Text>
            </Group>
          </Stack>
        </Stack>
      );

    case 'pain-points':
      return (
        <Card shadow="md" radius="xl" p={32} className={className}>
          <Stack gap={20}>
            <Title order={3} size="h4" c="red.6">
              Common {segment === 'startup-pm' ? 'Startup PM' : segment === 'senior-pm' ? 'Senior PM' : segment === 'vp-product' ? 'VP Product' : segment === 'enterprise-pmo' ? 'Enterprise PMO' : 'PM'} Challenges
            </Title>
            
            <List spacing="md" icon={<ThemeIcon size={20} radius="xl" color="red" variant="light">✗</ThemeIcon>}>
              {data.painPoints.map((pain, index) => (
                <List.Item key={index}>
                  <Text size="sm">{pain}</Text>
                </List.Item>
              ))}
            </List>
          </Stack>
        </Card>
      );

    case 'benefits':
      return (
        <div className={className}>
          <Stack align="center" gap={32} mb={48}>
            <Title order={2} size="h2" ta="center">
              Why {segment === 'startup-pm' ? 'Startup PMs' : segment === 'senior-pm' ? 'Senior PMs' : segment === 'vp-product' ? 'VP Products' : segment === 'enterprise-pmo' ? 'Enterprise PMOs' : 'Product Managers'} Choose PM33
            </Title>
            <Text size="lg" c="dimmed" ta="center" maw={600}>
              {data.socialProofHeadline}
            </Text>
          </Stack>
          
          <Group gap={32} justify="center">
            {data.benefits.map((benefit, index) => (
              <Card key={index} shadow="md" radius="xl" p={24} ta="center" maw={300}>
                <Stack align="center" gap={16}>
                  <ThemeIcon 
                    size={60} 
                    variant="light" 
                    color={benefit.color}
                    radius="xl"
                  >
                    {benefit.icon}
                  </ThemeIcon>
                  
                  <Stack align="center" gap={8}>
                    <Text size="32px" fw={900} variant="gradient" gradient={{ from: benefit.color, to: `${benefit.color}.7` }}>
                      {benefit.metric}
                    </Text>
                    <Text fw={600} size="lg">{benefit.title}</Text>
                    <Text size="sm" c="dimmed" ta="center">{benefit.description}</Text>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Group>
        </div>
      );

    case 'social-proof':
      return (
        <Card shadow="xl" radius="xl" p={48} className={className} 
              style={{ background: 'linear-gradient(135deg, var(--marketing-bg-secondary) 0%, var(--marketing-bg-primary) 100%)' }}>
          <Stack align="center" gap={24}>
            <Badge size="lg" variant="gradient" gradient={{ from: 'green', to: 'teal' }}>
              {data.socialProofHeadline}
            </Badge>
            
            <Text size="xl" fw={500} lh={1.6} ta="center" maw={700} style={{ fontStyle: 'italic' }}>
              "{data.testimonialQuote}"
            </Text>
            
            <Text fw={700} c="indigo.6">— {data.testimonialAuthor}</Text>
          </Stack>
        </Card>
      );

    case 'cta':
      return (
        <Stack align="center" gap={24} className={className}>
          <Text size="lg" fw={600} c="orange.6" ta="center">
            {data.urgencyMessage}
          </Text>
          
          <Group gap={24}>
            <Text fw={700} size="lg">{data.primaryCTA}</Text>
            <Text c="dimmed">{data.secondaryCTA}</Text>
          </Group>
        </Stack>
      );

    case 'pricing':
      return (
        <Card shadow="sm" radius="lg" p={24} className={className} bg="blue.0">
          <Stack gap={16}>
            <Group gap={12}>
              <ThemeIcon size={24} variant="light" color="blue" radius="xl">
                <IconTarget size={14} />
              </ThemeIcon>
              <Text fw={600} c="blue.7">Recommended for {segment === 'startup-pm' ? 'Startups' : segment === 'senior-pm' ? 'Senior PMs' : segment === 'vp-product' ? 'VP Products' : segment === 'enterprise-pmo' ? 'Enterprise PMOs' : 'Your Role'}</Text>
            </Group>
            <Text size="sm" c="blue.6">{data.pricingMessage}</Text>
          </Stack>
        </Card>
      );

    case 'trust-signals':
      return (
        <Group gap={32} justify="center" className={className}>
          {data.trustSignals.map((signal, index) => (
            <Group key={index} gap={8}>
              <ThemeIcon size={16} variant="light" color="green" radius="xl">
                <IconCheck size={10} />
              </ThemeIcon>
              <Text size="sm" fw={500}>{signal}</Text>
            </Group>
          ))}
        </Group>
      );

    default:
      return null;
  }
}

// Hook for getting segment-specific data
export function useSegmentData(segment: UserSegment = 'default') {
  return segmentData[segment];
}

// Utility for detecting segment from various sources
export function detectUserSegment(): UserSegment {
  // Check URL parameters
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const segmentParam = urlParams.get('segment') as UserSegment;
    if (segmentParam && segmentParam in segmentData) return segmentParam;
    
    // Check localStorage
    const storedSegment = localStorage.getItem('pm33_user_segment') as UserSegment;
    if (storedSegment && storedSegment in segmentData) return storedSegment;
    
    // Detect from referrer patterns
    const referrer = document.referrer.toLowerCase();
    if (referrer.includes('ycombinator') || referrer.includes('producthunt')) return 'startup-pm';
    if (referrer.includes('linkedin') && referrer.includes('vp')) return 'vp-product';
    if (referrer.includes('enterprise') || referrer.includes('pmo')) return 'enterprise-pmo';
    if (referrer.includes('linkedin') || referrer.includes('glassdoor')) return 'senior-pm';
  }
  
  return 'default';
}

export { segmentData };