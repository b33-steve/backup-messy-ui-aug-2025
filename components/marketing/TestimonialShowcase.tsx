'use client';

import React, { useState, useEffect } from 'react';
import { Container, Card, Title, Text, Button, Stack, Box, Badge, Group, SimpleGrid, Avatar, Rating, Transition, ActionIcon } from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconQuote, IconStar, IconTrendingUp, IconUsers, IconBolt, IconTarget } from '@tabler/icons-react';
import { analytics } from '../../lib/analytics';

/**
 * Component: TestimonialShowcase
 * Purpose: Dynamic testimonial system with segment targeting and conversion optimization
 * Design: Social proof showcase with rotation, filtering, and analytics tracking
 * 
 * Features:
 * - [x] Segment-specific testimonial filtering (by role, company size, industry)
 * - [x] Auto-rotation with manual controls
 * - [x] Conversion tracking and analytics integration
 * - [x] Multiple display formats (carousel, grid, featured)
 * - [x] Social proof indicators (metrics, ratings, verification)
 * - [x] Responsive design with professional styling
 */

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  company: string;
  companySize: 'startup' | 'scaleup' | 'enterprise';
  industry: string;
  avatar: string;
  testimonial: string;
  metrics: {
    label: string;
    value: string;
    improvement?: string;
  };
  rating: number;
  verified: boolean;
  featured: boolean;
  segments: ('startup-pm' | 'senior-pm' | 'vp-product' | 'enterprise-pmo')[];
}

const testimonialData: TestimonialData[] = [
  {
    id: 'sarah-chen-techflow',
    name: 'Sarah Chen',
    role: 'VP Product',
    company: 'TechFlow',
    companySize: 'scaleup',
    industry: 'SaaS',
    avatar: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=120&h=120&fit=crop&crop=face',
    testimonial: "PM33 eliminated analysis paralysis completely. Our team now ships features 78% faster with strategic insights that actually matter. The AI teams coordination saved us from hiring three consultants.",
    metrics: {
      label: 'Faster Delivery',
      value: '78%',
      improvement: '+45% team productivity'
    },
    rating: 5,
    verified: true,
    featured: true,
    segments: ['senior-pm', 'vp-product']
  },
  {
    id: 'marcus-rodriguez-growthscale',
    name: 'Marcus Rodriguez',
    role: 'Chief Product Officer',
    company: 'GrowthScale',
    companySize: 'enterprise',
    industry: 'E-commerce',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face',
    testimonial: "The predictive analytics in PM33 helped us prioritize the right features at the right time. Result: $2.3M ARR from strategic decisions we wouldn't have made otherwise. ROI paid for itself in 3 weeks.",
    metrics: {
      label: 'Revenue Impact',
      value: '$2.3M',
      improvement: 'ARR from strategic features'
    },
    rating: 5,
    verified: true,
    featured: true,
    segments: ['vp-product', 'enterprise-pmo']
  },
  {
    id: 'alex-kumar-dataflow',
    name: 'Alex Kumar',
    role: 'Senior Product Manager',
    company: 'DataFlow',
    companySize: 'scaleup',
    industry: 'Data Analytics',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=120&h=120&fit=crop&crop=face',
    testimonial: "Finally spending time on strategy instead of spreadsheets. PM33 automated 65% of my busywork and turned me into a strategic powerhouse. My stakeholders now see me as the go-to person for strategic product decisions.",
    metrics: {
      label: 'Less Admin Work',
      value: '65%',
      improvement: 'More strategic focus'
    },
    rating: 5,
    verified: true,
    featured: false,
    segments: ['senior-pm']
  },
  {
    id: 'jennifer-adams-fintech',
    name: 'Jennifer Adams',
    role: 'Head of Product',
    company: 'FinTech Solutions',
    companySize: 'enterprise',
    industry: 'Financial Services',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face',
    testimonial: "PM33's multi-AI coordination is like having a strategic consultant, data analyst, and workflow expert on call 24/7. We've accelerated our roadmap by 6 months and increased feature adoption by 340%.",
    metrics: {
      label: 'Feature Adoption',
      value: '340%',
      improvement: '6 months ahead of roadmap'
    },
    rating: 5,
    verified: true,
    featured: true,
    segments: ['vp-product', 'enterprise-pmo']
  },
  {
    id: 'david-kim-startupflow',
    name: 'David Kim',
    role: 'Product Manager',
    company: 'StartupFlow',
    companySize: 'startup',
    industry: 'Productivity Tools',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
    testimonial: "As a solo PM at a startup, PM33 gives me PMO-level capabilities I could never afford to hire. The strategic intelligence helped us pivot our pricing model and increase MRR by 185% in 8 weeks.",
    metrics: {
      label: 'MRR Growth',
      value: '185%',
      improvement: 'Strategic pricing pivot'
    },
    rating: 5,
    verified: true,
    featured: false,
    segments: ['startup-pm', 'senior-pm']
  },
  {
    id: 'lisa-brown-cloudtech',
    name: 'Lisa Brown',
    role: 'VP of Product Strategy',
    company: 'CloudTech Industries',
    companySize: 'enterprise',
    industry: 'Cloud Infrastructure',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face',
    testimonial: "PM33 transformed our entire product organization. The workflow automation eliminated 70% of our coordination overhead, and the strategic analysis helped us identify a $15M market opportunity we were missing.",
    metrics: {
      label: 'Market Opportunity',
      value: '$15M',
      improvement: 'Previously unidentified'
    },
    rating: 5,
    verified: true,
    featured: true,
    segments: ['vp-product', 'enterprise-pmo']
  }
];

interface TestimonialShowcaseProps {
  format?: 'carousel' | 'grid' | 'featured';
  segment?: 'startup-pm' | 'senior-pm' | 'vp-product' | 'enterprise-pmo';
  maxItems?: number;
  autoRotate?: boolean;
  showMetrics?: boolean;
  className?: string;
  pageContext?: string; // For enhanced analytics tracking
}

export default function TestimonialShowcase({
  format = 'carousel',
  segment,
  maxItems = 3,
  autoRotate = true,
  showMetrics = true,
  className = '',
  pageContext = 'unknown'
}: TestimonialShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Filter testimonials by segment
  const filteredTestimonials = segment 
    ? testimonialData.filter(t => t.segments.includes(segment))
    : testimonialData;

  const displayTestimonials = filteredTestimonials.slice(0, maxItems);

  // Auto-rotation effect
  useEffect(() => {
    if (autoRotate && format === 'carousel' && displayTestimonials.length > 1) {
      const interval = setInterval(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
          setIsVisible(true);
        }, 300);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [autoRotate, format, displayTestimonials.length]);

  const handleNavigation = (direction: 'prev' | 'next') => {
    analytics.track('testimonial_navigation', {
      direction,
      current_testimonial: displayTestimonials[currentIndex]?.id || 'unknown',
      segment: segment || 'all',
      page_context: pageContext
    });

    setIsVisible(false);
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
      }
      setIsVisible(true);
    }, 300);
  };

  const currentTestimonial = displayTestimonials[currentIndex];

  if (!currentTestimonial && format === 'carousel') return null;

  // Track testimonial views
  useEffect(() => {
    if (currentTestimonial) {
      analytics.trackTestimonialView(
        currentTestimonial.id,
        format,
        segment,
        autoRotate,
        pageContext
      );
    }
  }, [currentTestimonial, format, segment, autoRotate, pageContext]);

  if (format === 'featured') {
    const featuredTestimonials = displayTestimonials.filter(t => t.featured).slice(0, 1);
    if (featuredTestimonials.length === 0) return null;

    const testimonial = featuredTestimonials[0];
    return (
      <Card shadow="xl" radius="xl" p={48} className={className} style={{ background: 'linear-gradient(135deg, var(--marketing-bg-secondary) 0%, var(--marketing-bg-primary) 100%)', border: '2px solid var(--marketing-primary)' }}>
        <Stack align="center" gap={32}>
          <Badge size="xl" variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
            ⭐ Customer Success Story
          </Badge>

          <Group gap={24} align="flex-start">
            <IconQuote size={40} style={{ color: 'var(--marketing-primary)', opacity: 0.3 }} />
            <Stack gap={24} maw={800}>
              <Text size="xl" fw={500} lh={1.6} ta="center" style={{ fontSize: '1.3rem' }}>
                "{testimonial.testimonial}"
              </Text>
              
              <Group justify="center" gap={32}>
                <Stack align="center" gap={8}>
                  <Avatar src={testimonial.avatar} size={60} radius="xl" />
                  <div style={{ textAlign: 'center' }}>
                    <Text fw={700} size="lg">{testimonial.name}</Text>
                    <Text size="sm" c="dimmed">{testimonial.role}</Text>
                    <Text size="sm" fw={600} c="indigo.6">{testimonial.company}</Text>
                  </div>
                  <Rating value={testimonial.rating} readOnly size="sm" />
                </Stack>

                {showMetrics && (
                  <Card shadow="md" radius="lg" p={24} style={{ border: '1px solid var(--marketing-primary)' }}>
                    <Stack align="center" gap={8}>
                      <Text size="32px" fw={900} variant="gradient" gradient={{ from: 'green', to: 'teal' }}>
                        {testimonial.metrics.value}
                      </Text>
                      <Text fw={600} size="sm" ta="center">{testimonial.metrics.label}</Text>
                      {testimonial.metrics.improvement && (
                        <Text size="xs" c="green.6" ta="center">{testimonial.metrics.improvement}</Text>
                      )}
                    </Stack>
                  </Card>
                )}
              </Group>
            </Stack>
          </Group>
        </Stack>
      </Card>
    );
  }

  if (format === 'grid') {
    return (
      <div className={className}>
        <SimpleGrid cols={{ base: 1, md: Math.min(3, displayTestimonials.length) }} spacing={32}>
          {displayTestimonials.map((testimonial) => (
            <Card key={testimonial.id} shadow="md" radius="xl" p={32} h="fit-content">
              <Stack gap={24}>
                <Group gap={16}>
                  <Avatar src={testimonial.avatar} size={50} radius="xl" />
                  <div>
                    <Group gap={8} align="center">
                      <Text fw={700}>{testimonial.name}</Text>
                      {testimonial.verified && (
                        <Badge size="xs" color="green" variant="light">✓ Verified</Badge>
                      )}
                    </Group>
                    <Text size="sm" c="dimmed">{testimonial.role}</Text>
                    <Text size="sm" fw={600} c="indigo.6">{testimonial.company}</Text>
                  </div>
                </Group>

                <Rating value={testimonial.rating} readOnly size="sm" />

                <Text size="sm" lh={1.6}>
                  "{testimonial.testimonial}"
                </Text>

                {showMetrics && (
                  <Card bg="gray.0" p={16} radius="lg">
                    <Group justify="space-between">
                      <div>
                        <Text size="xl" fw={900} c="green.6">{testimonial.metrics.value}</Text>
                        <Text size="xs" c="dimmed">{testimonial.metrics.label}</Text>
                      </div>
                      <IconTrendingUp size={20} style={{ color: 'var(--mantine-color-green-6)' }} />
                    </Group>
                  </Card>
                )}
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </div>
    );
  }

  // Carousel format (default)
  return (
    <div className={className}>
      <Box pos="relative">
        <Transition mounted={isVisible} transition="fade" duration={300}>
          {(styles) => (
            <Card shadow="xl" radius="xl" p={48} style={{ ...styles, background: 'linear-gradient(135deg, var(--marketing-bg-secondary) 0%, var(--marketing-bg-primary) 100%)' }}>
              <Stack align="center" gap={32}>
                <Group gap={16}>
                  <IconQuote size={32} style={{ color: 'var(--marketing-primary)' }} />
                  <Title order={3} size="h3">What Our Customers Say</Title>
                </Group>

                <Stack align="center" gap={24} maw={700}>
                  <Text size="lg" lh={1.6} ta="center" fw={500}>
                    "{currentTestimonial.testimonial}"
                  </Text>

                  <Group gap={32} align="center">
                    <Stack align="center" gap={8}>
                      <Avatar src={currentTestimonial.avatar} size={60} radius="xl" />
                      <div style={{ textAlign: 'center' }}>
                        <Group gap={8} justify="center">
                          <Text fw={700}>{currentTestimonial.name}</Text>
                          {currentTestimonial.verified && (
                            <Badge size="xs" color="green" variant="light">✓</Badge>
                          )}
                        </Group>
                        <Text size="sm" c="dimmed">{currentTestimonial.role}</Text>
                        <Text size="sm" fw={600} c="indigo.6">{currentTestimonial.company}</Text>
                      </div>
                      <Rating value={currentTestimonial.rating} readOnly size="sm" />
                    </Stack>

                    {showMetrics && (
                      <Card shadow="md" radius="lg" p={24} style={{ border: '2px solid var(--marketing-primary)' }}>
                        <Stack align="center" gap={8}>
                          <Text size="48px" fw={900} variant="gradient" gradient={{ from: 'green', to: 'teal' }}>
                            {currentTestimonial.metrics.value}
                          </Text>
                          <Text fw={600} ta="center">{currentTestimonial.metrics.label}</Text>
                          {currentTestimonial.metrics.improvement && (
                            <Text size="xs" c="green.6" ta="center">
                              {currentTestimonial.metrics.improvement}
                            </Text>
                          )}
                        </Stack>
                      </Card>
                    )}
                  </Group>
                </Stack>

                {/* Navigation Controls */}
                {displayTestimonials.length > 1 && (
                  <Group gap={16}>
                    <ActionIcon
                      size="lg"
                      variant="outline"
                      radius="xl"
                      onClick={() => handleNavigation('prev')}
                    >
                      <IconChevronLeft size={20} />
                    </ActionIcon>

                    <Group gap={8}>
                      {displayTestimonials.map((_, index) => (
                        <Box
                          key={index}
                          w={8}
                          h={8}
                          style={{
                            borderRadius: '50%',
                            backgroundColor: index === currentIndex ? 'var(--marketing-primary)' : 'rgba(0,0,0,0.2)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => {
                            setCurrentIndex(index);
                            analytics.track('testimonial_navigation', {
                              direction: 'dot_click',
                              current_testimonial: displayTestimonials[index]?.id || 'unknown',
                              segment: segment || 'all',
                              page_context: pageContext
                            });
                          }}
                        />
                      ))}
                    </Group>

                    <ActionIcon
                      size="lg"
                      variant="outline"
                      radius="xl"
                      onClick={() => handleNavigation('next')}
                    >
                      <IconChevronRight size={20} />
                    </ActionIcon>
                  </Group>
                )}
              </Stack>
            </Card>
          )}
        </Transition>
      </Box>
    </div>
  );
}

export { type TestimonialData, testimonialData };