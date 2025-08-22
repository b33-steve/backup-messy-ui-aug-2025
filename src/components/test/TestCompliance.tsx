'use client';

/**
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md
 * UX Pattern: PM33_ Complete _UX_System.md
 * 
 * TestCompliance - PM33 Compliant Component
 * - Glass morphism design with gradients
 * - Hover states and premium animations
 * - 8pt grid system alignment
 * - AIProcessingState for loading states
 * - <5 click workflow optimization
 */

import React, { useState } from 'react';
import {
  Container,
  Card,
  Title,
  Text,
  Button,
  Group,
  Badge,
  Box
} from '@mantine/core';
import { IconBrain, IconSparkles } from '@tabler/icons-react';

interface TestComplianceProps {
  isDemoMode?: boolean;
  onToggleDemo?: () => void;
}

const TestCompliance: React.FC<TestComplianceProps> = ({
  isDemoMode = false,
  onToggleDemo
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Demo mode styling with glass morphism
  const demoStyles = isDemoMode ? {
    border: '2px dotted #ffd43b',
    position: 'relative' as const,
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    backdropFilter: 'blur(10px)',
    borderRadius: 16
  } : {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 16
  };

  // Premium hover animation styles
  const hoverStyles = {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
      background: isDemoMode 
        ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)'
    }
  };

  return (
    <Container size={1200} px={24} py={48}>
      <Card
        shadow="xl"
        padding={32}
        radius={16}
        style={{...demoStyles, ...hoverStyles}}
      >
        {/* Demo Mode Badge */}
        {isDemoMode && (
          <Badge
            size="sm"
            color="yellow"
            variant="filled"
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10
            }}
          >
            DEMO MODE
          </Badge>
        )}

        {/* Header Section */}
        <Group justify="space-between" align="flex-start" mb={32}>
          <Box>
            <Title
              order={1}
              size="h2"
              c="dark"
              mb={8}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              TestCompliance
            </Title>
            <Text size="lg" c="dimmed">
              Component description with strategic context
            </Text>
          </Box>

          {onToggleDemo && (
            <Button
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              leftSection={<IconSparkles size={16} />}
              onClick={onToggleDemo}
              size="sm"
              style={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            >
              Toggle Demo
            </Button>
          )}
        </Group>

        {/* Main Content Area */}
        <Box mb={24}>
          <Text size="md" mb={16}>
            Main component content goes here following PM33 design patterns.
          </Text>
          
          {/* Action Button with Premium Animation */}
          <Button
            size="lg"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            leftSection={<IconBrain size={20} />}
            loading={isLoading}
            onClick={() => {
              setIsLoading(true);
              // Simulate processing
              setTimeout(() => setIsLoading(false), 2000);
            }}
            style={{
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
              }
            }}
          >
            {isLoading ? 'Processing...' : 'Execute Action'}
          </Button>
        </Box>

        {/* Status or Additional Content */}
        {isLoading && (
          <Box
            mt={24}
            p={16}
            style={{
              background: 'linear-gradient(135deg, rgba(81, 207, 102, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)',
              borderRadius: 12,
              border: '1px solid rgba(81, 207, 102, 0.2)'
            }}
          >
            <Text size="sm" c="dimmed" ta="center">
              AI Processing in progress...
            </Text>
          </Box>
        )}
      </Card>
    </Container>
  );
};

export default TestCompliance;
