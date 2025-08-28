'use client';

import React, { useEffect, useState } from 'react';
import { Container, Card, Title, Text, Stack, Box, Badge, Group, SimpleGrid, ThemeIcon, Transition } from '@mantine/core';
import { IconUsers, IconTrendingUp, IconStar, IconBolt, IconTarget, IconRocket, IconShield } from '@tabler/icons-react';
import { analytics } from '../../lib/analytics';

/**
 * Component: SocialProofMetrics
 * Purpose: Display aggregate customer success metrics and social proof indicators
 * Design: Animated counter with trust signals and conversion optimization
 * 
 * Features:
 * - [x] Animated counting effect for key metrics
 * - [x] Segment-specific metrics display
 * - [x] Trust indicators and credibility signals
 * - [x] Conversion tracking integration
 * - [x] Responsive grid layout
 * - [x] Real-time metric updates (simulated)
 */

interface MetricData {
  id: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon: React.ReactNode;
  color: string;
  description?: string;
  trending?: boolean;
  segment?: 'all' | 'startup' | 'scaleup' | 'enterprise';
}

const metricsData: MetricData[] = [
  {
    id: 'active-customers',
    value: 2500,
    label: 'Active Product Managers',
    suffix: '+',
    icon: <IconUsers size={24} />,
    color: 'blue',
    description: 'Growing 23% month-over-month',
    trending: true,
    segment: 'all'
  },
  {
    id: 'average-time-savings',
    value: 78,
    label: 'Average Time Savings',
    suffix: '%',
    icon: <IconBolt size={24} />,
    color: 'green',
    description: 'More strategic focus time',
    trending: true,
    segment: 'all'
  },
  {
    id: 'revenue-impact',
    value: 2.3,
    label: 'Avg Revenue Impact',
    prefix: '$',
    suffix: 'M',
    icon: <IconTrendingUp size={24} />,
    color: 'teal',
    description: 'Per customer annual impact',
    trending: true,
    segment: 'enterprise'
  },
  {
    id: 'customer-satisfaction',
    value: 4.9,
    label: 'Customer Rating',
    suffix: '/5',
    icon: <IconStar size={24} />,
    color: 'yellow',
    description: 'Based on 1,847 reviews',
    trending: false,
    segment: 'all'
  },
  {
    id: 'feature-delivery',
    value: 185,
    label: 'Faster Feature Delivery',
    suffix: '%',
    icon: <IconRocket size={24} />,
    color: 'indigo',
    description: 'Average improvement',
    trending: true,
    segment: 'all'
  },
  {
    id: 'companies-served',
    value: 450,
    label: 'Companies Transformed',
    suffix: '+',
    icon: <IconTarget size={24} />,
    color: 'purple',
    description: 'From startup to enterprise',
    trending: true,
    segment: 'all'
  }
];

const trustSignals = [
  {
    id: 'security',
    icon: <IconShield size={20} />,
    label: 'SOC 2 Compliant',
    description: 'Enterprise security'
  },
  {
    id: 'uptime',
    icon: <IconBolt size={20} />,
    label: '99.9% Uptime',
    description: 'Reliable service'
  },
  {
    id: 'support',
    icon: <IconUsers size={20} />,
    label: '24/7 Support',
    description: 'Always here to help'
  }
];

interface SocialProofMetricsProps {
  segment?: 'all' | 'startup' | 'scaleup' | 'enterprise';
  showTrustSignals?: boolean;
  animated?: boolean;
  maxColumns?: number;
  className?: string;
  pageContext?: string; // For enhanced analytics tracking
}

function AnimatedCounter({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '',
  animated = true 
}: { 
  end: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string;
  animated?: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animated) {
      setCount(end);
      return;
    }

    const startTime = Date.now();
    const startValue = 0;

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);
      
      const currentValue = startValue + (end - startValue) * easedProgress;
      
      if (end < 10) {
        setCount(Math.round(currentValue * 10) / 10); // One decimal place
      } else {
        setCount(Math.round(currentValue));
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    // Start animation after a small delay
    const timer = setTimeout(() => {
      requestAnimationFrame(updateCount);
    }, 100);

    return () => clearTimeout(timer);
  }, [end, duration, animated]);

  const formatNumber = (num: number) => {
    if (num >= 1000 && suffix !== 'M') {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <Text size="48px" fw={900} lh={1}>
      {prefix}{formatNumber(count)}{suffix}
    </Text>
  );
}

export default function SocialProofMetrics({
  segment = 'all',
  showTrustSignals = true,
  animated = true,
  maxColumns = 3,
  className = '',
  pageContext = 'unknown'
}: SocialProofMetricsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Track metrics view with enhanced analytics
    analytics.trackSocialProofMetrics(segment, showTrustSignals, animated, pageContext);
  }, [segment, showTrustSignals, animated, pageContext]);

  // Filter metrics by segment
  const filteredMetrics = metricsData.filter(metric => 
    metric.segment === 'all' || metric.segment === segment
  );

  const displayMetrics = filteredMetrics.slice(0, maxColumns * 2); // Show up to 2 rows

  return (
    <div className={className}>
      <Transition mounted={isVisible} transition="slide-up" duration={500}>
        {(styles) => (
          <div style={styles}>
            <Stack gap={48}>
              {/* Main Metrics Grid */}
              <SimpleGrid cols={{ base: 1, sm: 2, md: Math.min(maxColumns, displayMetrics.length) }} spacing={32}>
                {displayMetrics.map((metric, index) => (
                  <Card 
                    key={metric.id} 
                    shadow="md" 
                    radius="xl" 
                    p={32} 
                    ta="center"
                    style={{ 
                      border: '1px solid var(--mantine-color-gray-2)',
                      transition: 'all 0.3s ease',
                      animationDelay: `${index * 100}ms`
                    }}
                    className="hover-lift"
                  >
                    <Stack align="center" gap={16}>
                      <ThemeIcon 
                        size={60} 
                        variant="light" 
                        color={metric.color}
                        radius="xl"
                      >
                        {metric.icon}
                      </ThemeIcon>

                      <Stack align="center" gap={4}>
                        <Group gap={8} align="center" justify="center">
                          <Box variant="gradient" gradient={{ from: metric.color, to: `${metric.color}.7` }} component="div">
                            <AnimatedCounter 
                              end={metric.value}
                              prefix={metric.prefix}
                              suffix={metric.suffix}
                              animated={animated}
                            />
                          </Box>
                          {metric.trending && (
                            <Badge size="sm" color="green" variant="light">
                              ↗ Trending
                            </Badge>
                          )}
                        </Group>
                        
                        <Text fw={600} size="lg">
                          {metric.label}
                        </Text>
                        
                        {metric.description && (
                          <Text size="sm" c="dimmed" ta="center">
                            {metric.description}
                          </Text>
                        )}
                      </Stack>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>

              {/* Trust Signals */}
              {showTrustSignals && (
                <Card shadow="sm" radius="xl" p={32} bg="gray.0">
                  <Stack gap={24}>
                    <Group justify="center" gap={8}>
                      <ThemeIcon size={24} variant="light" color="green" radius="xl">
                        <IconShield size={14} />
                      </ThemeIcon>
                      <Text fw={600} size="lg" ta="center">
                        Trusted by Product Teams Worldwide
                      </Text>
                    </Group>

                    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={24}>
                      {trustSignals.map((signal) => (
                        <Group key={signal.id} gap={12} justify="center">
                          <ThemeIcon size={32} variant="light" color="blue" radius="xl">
                            {signal.icon}
                          </ThemeIcon>
                          <div>
                            <Text fw={600} size="sm">{signal.label}</Text>
                            <Text size="xs" c="dimmed">{signal.description}</Text>
                          </div>
                        </Group>
                      ))}
                    </SimpleGrid>
                  </Stack>
                </Card>
              )}

              {/* Social Proof Statement */}
              <Card shadow="lg" radius="xl" p={32} ta="center" style={{ background: 'linear-gradient(135deg, var(--marketing-bg-secondary) 0%, var(--marketing-bg-primary) 100%)' }}>
                <Stack align="center" gap={16}>
                  <Badge size="lg" variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                    ⚡ Join the Movement
                  </Badge>
                  
                  <Title order={3} size="h3" maw={600}>
                    Join 2,500+ Product Managers Who've Transformed Their Strategic Impact
                  </Title>
                  
                  <Text size="lg" c="dimmed" maw={500}>
                    From individual contributors to strategic leaders - 
                    see why top PMs choose PM33 for their career transformation.
                  </Text>

                  <Group gap={32} mt={16}>
                    <div style={{ textAlign: 'center' }}>
                      <Text size="xl" fw={900} variant="gradient" gradient={{ from: 'green', to: 'teal' }}>
                        $45K+
                      </Text>
                      <Text size="sm" c="dimmed">Avg Annual Savings</Text>
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                      <Text size="xl" fw={900} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                        14 Days
                      </Text>
                      <Text size="sm" c="dimmed">Free Trial</Text>
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                      <Text size="xl" fw={900} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                        5 Min
                      </Text>
                      <Text size="sm" c="dimmed">Setup Time</Text>
                    </div>
                  </Group>
                </Stack>
              </Card>
            </Stack>
          </div>
        )}
      </Transition>

      <style jsx>{`
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}

export { metricsData, trustSignals };