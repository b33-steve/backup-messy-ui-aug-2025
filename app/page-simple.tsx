'use client';

import { Container, Title, Text, Button, Card } from '@mantine/core';
import Link from 'next/link';

export default function SimplePage() {
  return (
    <Container size={1200} px={24} py={40}>
      <Card shadow="md" padding={48} radius={16} style={{ textAlign: 'center' }}>
        <Title order={1} size="48px" fw={700} mb={24}>
          PM33: PMO Transformation Platform
        </Title>
        
        <Text size="xl" mb={32} c="dimmed">
          Transform from reactive Product Manager into strategic PMO leader 
          with AI-powered strategic intelligence teams.
        </Text>
        
        <Button 
          component={Link}
          href="/trial"
          size="xl"
          style={{ 
            backgroundColor: '#1E40AF',
            fontSize: '18px',
            padding: '16px 32px',
            height: 'auto'
          }}
        >
          Start Free 14-Day Trial
        </Button>
        
        <Text size="sm" mt={16} c="dimmed">
          No credit card required • 2-minute setup • Instant strategic value
        </Text>
      </Card>
    </Container>
  );
}