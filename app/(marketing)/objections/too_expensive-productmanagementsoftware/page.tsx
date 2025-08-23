'use client';

import { Container, Title, Text, Button, Card, Alert } from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import Link from 'next/link';

export default function TooexpenIveHandlerPage() {
  return (
    <Container size={800} px={24} py={80}>
      <div className="marketing-context">
        
        <Alert icon={<IconAlertCircle size={16} />} title="Common Concern" color="yellow" mb={32}>
          We hear this objection often from product management software professionals
        </Alert>
        
        <Card shadow="md" padding={40} radius={16} mb={40}>
          <Title order={1} size="36px" fw={700} mb={24}>
            "Too Expensive"
          </Title>
          
          <Text size="lg" mb={32}>
            ROI: 75x return - saves 60 hours/month at $100/hour PM value
          </Text>
          
          <Alert icon={<IconCheck size={16} />} title="The PM33 Difference" color="green">
            Ready to see how PM33 specifically addresses this concern?
          </Alert>
        </Card>
        
        <Card shadow="md" padding={32} radius={16} ta="center">
          <Button 
            component={Link}
            href="/strategic-intelligence"
            size="lg"
            style={{ backgroundColor: 'var(--marketing-primary)' }}
          >
            See Live Demo
          </Button>
        </Card>
        
      </div>
    </Container>
  );
}