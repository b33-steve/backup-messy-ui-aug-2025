/**
 * Component: Pricing - Simple Test Version
 * Purpose: Test basic pricing page functionality without complex imports
 */

'use client';

import { Container, Title, Text, Button, Card } from '@mantine/core';
import Link from 'next/link';

export default function SimplePricingPage() {
  return (
    <Container size={1200} px={24} py={40}>
      <Title order={1} size="h1" fw={700} mb={32}>
        PM33 Pricing
      </Title>
      
      <Text size="lg" mb={32}>
        Choose the plan that's right for you.
      </Text>
      
      <Card shadow="md" padding={32} radius={16}>
        <Title order={3} mb={16}>Professional PM</Title>
        <Text size="xl" fw={700} mb={16}>$29/month</Text>
        <Text mb={24}>Complete PMO transformation for individual product managers</Text>
        
        <Button 
          component={Link}
          href="/trial"
          size="lg"
          fullWidth
        >
          Start Free Trial
        </Button>
      </Card>
    </Container>
  );
}