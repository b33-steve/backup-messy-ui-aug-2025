/**
 * Component: MRR Progress Tracker for $100K Goal
 * Purpose: Real-time MRR tracking and progress visualization with PostHog integration
 * Context: MARKETING context - displays public progress milestones
 * RELEVANT FILES: lib/posthog.ts, components/PostHogProvider.tsx
 */

'use client';

import { useState, useEffect } from 'react';
import { Container, Card, Title, Text, Group, Progress, Badge, Stack, Grid } from '@mantine/core';
import { IconTrendingUp, IconTarget, IconCalendar, IconUsers } from '@tabler/icons-react';
import { trackMRRProgress } from '../lib/posthog';

interface MRRData {
  currentMRR: number;
  targetMRR: number;
  monthlyGrowthRate: number;
  customersCount: number;
  averageCAC: number;
  averageLTV: number;
}

export default function MRRTracker() {
  const [mrrData, setMrrData] = useState<MRRData>({
    currentMRR: 12500, // Demo data - in production, this comes from API
    targetMRR: 100000,
    monthlyGrowthRate: 15.3,
    customersCount: 156,
    averageCAC: 89,
    averageLTV: 2400
  });

  const progressPercentage = (mrrData.currentMRR / mrrData.targetMRR) * 100;
  const monthsToTarget = Math.ceil(
    Math.log(mrrData.targetMRR / mrrData.currentMRR) / 
    Math.log(1 + (mrrData.monthlyGrowthRate / 100))
  );

  useEffect(() => {
    // Track MRR progress monthly for PostHog analysis
    trackMRRProgress.monthlyRecurringRevenue(
      mrrData.currentMRR,
      mrrData.currentMRR * (mrrData.monthlyGrowthRate / 100), // New MRR
      mrrData.currentMRR * 0.05 // Estimated churn (5%)
    );
  }, [mrrData]);

  return (
    <Container size={1200} px={24} py={48}>
      <Stack gap={32}>
        {/* Header */}
        <Group justify="space-between" align="center">
          <div>
            <Title order={2} fw={700} mb={8}>
              📈 PM33 Progress to $100K MRR
            </Title>
            <Text c="dimmed" size="lg">
              Real-time progress toward our strategic revenue goal
            </Text>
          </div>
          <Badge 
            size="xl" 
            variant="gradient" 
            gradient={{ from: 'green', to: 'blue' }}
            leftSection={<IconTarget size={16} />}
          >
            {progressPercentage.toFixed(1)}% Complete
          </Badge>
        </Group>

        {/* Progress Card */}
        <Card shadow="md" padding="xl" radius="lg">
          <Stack gap={24}>
            <Group justify="space-between">
              <Text size="sm" fw={600} c="dimmed">MONTHLY RECURRING REVENUE</Text>
              <Text size="sm" c="dimmed">
                ~{monthsToTarget} months to goal at current growth rate
              </Text>
            </Group>
            
            <div>
              <Group justify="space-between" mb={8}>
                <Text size="xl" fw={900} c="var(--marketing-primary)">
                  ${mrrData.currentMRR.toLocaleString()}
                </Text>
                <Text size="lg" fw={700} c="dimmed">
                  ${mrrData.targetMRR.toLocaleString()}
                </Text>
              </Group>
              
              <Progress 
                value={progressPercentage} 
                size="xl" 
                radius="xl"
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                }}
              />
            </div>
            
            <Group justify="space-between">
              <Group gap={8}>
                <IconTrendingUp size={16} color="var(--marketing-success)" />
                <Text size="sm" fw={600} c="var(--marketing-success)">
                  +{mrrData.monthlyGrowthRate}% monthly growth
                </Text>
              </Group>
              <Text size="sm" c="dimmed">
                ${(mrrData.targetMRR - mrrData.currentMRR).toLocaleString()} remaining
              </Text>
            </Group>
          </Stack>
        </Card>

        {/* Metrics Grid */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card padding="lg" radius="md" h="100%">
              <Group mb={16}>
                <IconUsers size={24} color="var(--marketing-primary)" />
                <div>
                  <Text size="xs" c="dimmed" fw={600}>CUSTOMERS</Text>
                  <Text size="xl" fw={900}>{mrrData.customersCount}</Text>
                </div>
              </Group>
              <Text size="sm" c="dimmed">
                Active PM33 users transforming their product management
              </Text>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card padding="lg" radius="md" h="100%">
              <Group mb={16}>
                <IconTarget size={24} color="var(--marketing-success)" />
                <div>
                  <Text size="xs" c="dimmed" fw={600}>CUSTOMER ACQUISITION COST</Text>
                  <Text size="xl" fw={900}>${mrrData.averageCAC}</Text>
                </div>
              </Group>
              <Text size="sm" c="dimmed">
                Average cost to acquire each new customer
              </Text>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card padding="lg" radius="md" h="100%">
              <Group mb={16}>
                <IconTarget size={24} color="var(--marketing-cta)" />
                <div>
                  <Text size="xs" c="dimmed" fw={600}>LIFETIME VALUE</Text>
                  <Text size="xl" fw={900}>${mrrData.averageLTV.toLocaleString()}</Text>
                </div>
              </Group>
              <Text size="sm" c="dimmed">
                Average value per customer over their lifecycle
              </Text>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Key Insights */}
        <Card padding="xl" radius="lg" style={{ backgroundColor: 'var(--marketing-bg-secondary)' }}>
          <Title order={3} mb={16}>🎯 Strategic Insights</Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap={8}>
                <Text fw={600}>Revenue Efficiency</Text>
                <Text size="sm" c="dimmed">
                  LTV:CAC ratio of {(mrrData.averageLTV / mrrData.averageCAC).toFixed(1)}x 
                  indicates excellent unit economics for sustainable growth.
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap={8}>
                <Text fw={600}>Growth Trajectory</Text>
                <Text size="sm" c="dimmed">
                  At {mrrData.monthlyGrowthRate}% monthly growth, PM33 is on track to reach 
                  $100K MRR by {new Date(Date.now() + monthsToTarget * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>
      </Stack>
    </Container>
  );
}

/**
 * Key Metrics Tracked:
 * - Monthly Recurring Revenue (MRR)
 * - Customer Acquisition Cost (CAC)
 * - Lifetime Value (LTV) 
 * - Growth rate and trajectory
 * - Time to $100K MRR goal
 * 
 * PostHog Integration:
 * - Real-time MRR progress updates
 * - Growth rate analysis
 * - Customer metrics correlation
 * - Revenue attribution tracking
 */