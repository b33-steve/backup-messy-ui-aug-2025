'use client';

import React, { useState } from 'react';
import { 
  Container, 
  Card, 
  Title, 
  Text, 
  Group, 
  Stack, 
  Button, 
  Box,
  Badge,
  Progress,
  ActionIcon,
  Select,
  TextInput,
  Table,
  Avatar
} from '@mantine/core';
import { 
  IconFolders, 
  IconPlus,
  IconSearch,
  IconFilter,
  IconDots,
  IconCalendar,
  IconUsers,
  IconTarget
} from '@tabler/icons-react';
import AppNavigation from '../../../components/app/AppNavigation';
import { useDesignSystem } from '../../../components/app/DesignSystemProvider';

export default function ProjectsPage() {
  const { theme } = useDesignSystem();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const projects = [
    {
      id: 1,
      name: 'Mobile App Redesign',
      status: 'In Progress',
      progress: 67,
      priority: 'High',
      dueDate: 'Mar 15, 2024',
      team: ['JD', 'AS', 'MK'],
      description: 'Complete redesign of mobile application with improved UX'
    },
    {
      id: 2,
      name: 'API Integration Platform',
      status: 'Planning',
      progress: 23,
      priority: 'Medium',
      dueDate: 'Apr 30, 2024',
      team: ['RG', 'LM'],
      description: 'New integration platform for third-party APIs'
    },
    {
      id: 3,
      name: 'Analytics Dashboard V2',
      status: 'In Progress',
      progress: 89,
      priority: 'High',
      dueDate: 'Feb 28, 2024',
      team: ['SK', 'PL', 'TH', 'VM'],
      description: 'Enhanced analytics dashboard with real-time insights'
    },
    {
      id: 4,
      name: 'Security Audit Implementation',
      status: 'Completed',
      progress: 100,
      priority: 'Critical',
      dueDate: 'Jan 15, 2024',
      team: ['DR', 'FN'],
      description: 'Implementation of security recommendations from audit'
    }
  ];

  const statusColors = {
    'In Progress': 'blue',
    'Planning': 'yellow',
    'Completed': 'green',
    'On Hold': 'gray'
  };

  const priorityColors = {
    'Critical': 'red',
    'High': 'orange',
    'Medium': 'blue',
    'Low': 'gray'
  };

  return (
    <Box style={{ minHeight: '100vh', backgroundColor: theme.colors.bgSecondary }}>
      <AppNavigation />
      
      <Container size={1200} py={32}>
        <Stack gap={32}>
          {/* Header */}
          <Stack gap={8}>
            <Group justify="space-between">
              <Group>
                <IconFolders size={32} style={{ color: theme.colors.primary }} />
                <Stack gap={4}>
                  <Title order={1} fw={700} style={{ color: theme.colors.textPrimary, fontSize: '28px' }}>
                    Project Management
                  </Title>
                  <Text size="lg" style={{ color: theme.colors.textSecondary }}>
                    Strategic project oversight with AI-powered insights
                  </Text>
                </Stack>
              </Group>
              
              <Button
                leftSection={<IconPlus size={16} />}
                size="md"
                style={{
                  backgroundColor: theme.colors.primary,
                  '&:hover': { backgroundColor: theme.colors.primaryHover }
                }}
              >
                New Project
              </Button>
            </Group>
          </Stack>

          {/* Filters */}
          <Card 
            p={24}
            radius={12}
            shadow="sm"
            style={{ 
              backgroundColor: theme.colors.bgPrimary,
              border: `1px solid ${theme.colors.bgAccent}`
            }}
          >
            <Group justify="space-between">
              <Group gap={16}>
                <TextInput
                  placeholder="Search projects..."
                  leftSection={<IconSearch size={16} />}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.currentTarget.value)}
                  style={{ minWidth: '300px' }}
                  styles={{
                    input: { 
                      backgroundColor: theme.colors.bgTertiary,
                      border: `1px solid ${theme.colors.bgAccent}`,
                      '&:focus': { borderColor: theme.colors.primary }
                    }
                  }}
                />
                
                <Select
                  placeholder="Filter by status"
                  leftSection={<IconFilter size={16} />}
                  data={[
                    { value: 'all', label: 'All Status' },
                    { value: 'planning', label: 'Planning' },
                    { value: 'in-progress', label: 'In Progress' },
                    { value: 'completed', label: 'Completed' }
                  ]}
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value || 'all')}
                  styles={{
                    input: { 
                      backgroundColor: theme.colors.bgTertiary,
                      border: `1px solid ${theme.colors.bgAccent}`,
                      '&:focus': { borderColor: theme.colors.primary }
                    }
                  }}
                />
              </Group>
              
              <Text size="sm" style={{ color: theme.colors.textTertiary }}>
                {projects.length} projects total
              </Text>
            </Group>
          </Card>

          {/* Projects Grid */}
          <Stack gap={16}>
            {projects.map((project) => (
              <Card
                key={project.id}
                p={24}
                radius={12}
                shadow="sm"
                style={{ 
                  backgroundColor: theme.colors.bgPrimary,
                  border: `1px solid ${theme.colors.bgAccent}`
                }}
              >
                <Group justify="space-between" align="flex-start">
                  <Stack gap={16} style={{ flex: 1 }}>
                    <Group justify="space-between">
                      <Group gap={12}>
                        <Title order={4} fw={600} style={{ color: theme.colors.textPrimary }}>
                          {project.name}
                        </Title>
                        <Badge
                          color={statusColors[project.status as keyof typeof statusColors]}
                          variant="light"
                          size="sm"
                        >
                          {project.status}
                        </Badge>
                        <Badge
                          color={priorityColors[project.priority as keyof typeof priorityColors]}
                          variant="outline"
                          size="sm"
                        >
                          {project.priority}
                        </Badge>
                      </Group>
                      
                      <ActionIcon variant="subtle" color="gray">
                        <IconDots size={16} />
                      </ActionIcon>
                    </Group>
                    
                    <Text size="sm" style={{ color: theme.colors.textTertiary }}>
                      {project.description}
                    </Text>
                    
                    <Group gap={24} align="center">
                      <Group gap={8}>
                        <IconTarget size={16} style={{ color: theme.colors.textMuted }} />
                        <Text size="sm" style={{ color: theme.colors.textTertiary }}>
                          Progress: {project.progress}%
                        </Text>
                        <Box style={{ width: '120px' }}>
                          <Progress
                            value={project.progress}
                            size="sm"
                            color={project.progress > 75 ? 'green' : project.progress > 50 ? 'blue' : 'orange'}
                            radius="xl"
                          />
                        </Box>
                      </Group>
                      
                      <Group gap={8}>
                        <IconCalendar size={16} style={{ color: theme.colors.textMuted }} />
                        <Text size="sm" style={{ color: theme.colors.textTertiary }}>
                          Due: {project.dueDate}
                        </Text>
                      </Group>
                      
                      <Group gap={8}>
                        <IconUsers size={16} style={{ color: theme.colors.textMuted }} />
                        <Group gap={4}>
                          {project.team.map((member, index) => (
                            <Avatar
                              key={index}
                              size={24}
                              radius="xl"
                              color="blue"
                            >
                              {member}
                            </Avatar>
                          ))}
                        </Group>
                      </Group>
                    </Group>
                  </Stack>
                  
                  <Button variant="subtle" size="sm">
                    View Details
                  </Button>
                </Group>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}