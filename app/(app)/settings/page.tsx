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
  TextInput,
  Select,
  Switch,
  Tabs,
  Divider,
  Avatar,
  FileInput
} from '@mantine/core';
import { 
  IconSettings, 
  IconUser,
  IconBell,
  IconShield,
  IconPalette,
  IconDatabase,
  IconUpload,
  IconKey
} from '@tabler/icons-react';
import AppNavigation from '../../../components/app/AppNavigation';
import { useDesignSystem } from '../../../components/app/DesignSystemProvider';

export default function SettingsPage() {
  const { theme } = useDesignSystem();
  const [notifications, setNotifications] = useState({
    insights: true,
    projects: true,
    security: false,
    marketing: false
  });

  return (
    <Box style={{ minHeight: '100vh', backgroundColor: theme.colors.bgSecondary }}>
      <AppNavigation />
      
      <Container size={1000} py={32}>
        <Stack gap={32}>
          {/* Header */}
          <Stack gap={8}>
            <Group>
              <IconSettings size={32} style={{ color: theme.colors.primary }} />
              <Stack gap={4}>
                <Title order={1} fw={700} style={{ color: theme.colors.textPrimary, fontSize: '28px' }}>
                  Settings & Preferences
                </Title>
                <Text size="lg" style={{ color: theme.colors.textSecondary }}>
                  Customize your PM33 strategic intelligence experience
                </Text>
              </Stack>
            </Group>
          </Stack>

          {/* Settings Tabs */}
          <Tabs defaultValue="account" variant="outline">
            <Tabs.List>
              <Tabs.Tab value="account" leftSection={<IconUser size={16} />}>
                Account
              </Tabs.Tab>
              <Tabs.Tab value="notifications" leftSection={<IconBell size={16} />}>
                Notifications
              </Tabs.Tab>
              <Tabs.Tab value="security" leftSection={<IconShield size={16} />}>
                Security
              </Tabs.Tab>
              <Tabs.Tab value="integrations" leftSection={<IconDatabase size={16} />}>
                Integrations
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="account" pt="xl">
              <Stack gap={24}>
                {/* Profile Card */}
                <Card 
                  p={32}
                  radius={12}
                  shadow="sm"
                  style={{ 
                    backgroundColor: theme.colors.bgPrimary,
                    border: `1px solid ${theme.colors.bgAccent}`
                  }}
                >
                  <Stack gap={24}>
                    <Title order={3} fw={600} style={{ color: theme.colors.textPrimary }}>
                      Profile Information
                    </Title>
                    
                    <Group gap={24} align="flex-start">
                      <Stack align="center" gap={16}>
                        <Avatar size={80} radius="xl" color="blue">
                          <IconUser size={32} />
                        </Avatar>
                        <FileInput
                          leftSection={<IconUpload size={16} />}
                          placeholder="Upload photo"
                          size="sm"
                          variant="subtle"
                        />
                      </Stack>
                      
                      <Stack gap={16} style={{ flex: 1 }}>
                        <Group gap={16}>
                          <TextInput
                            label="First Name"
                            placeholder="John"
                            style={{ flex: 1 }}
                            styles={{
                              label: { color: theme.colors.textSecondary, fontWeight: 500 },
                              input: { 
                                backgroundColor: theme.colors.bgTertiary,
                                border: `1px solid ${theme.colors.bgAccent}`,
                                '&:focus': { borderColor: theme.colors.primary }
                              }
                            }}
                          />
                          <TextInput
                            label="Last Name"
                            placeholder="Doe"
                            style={{ flex: 1 }}
                            styles={{
                              label: { color: theme.colors.textSecondary, fontWeight: 500 },
                              input: { 
                                backgroundColor: theme.colors.bgTertiary,
                                border: `1px solid ${theme.colors.bgAccent}`,
                                '&:focus': { borderColor: theme.colors.primary }
                              }
                            }}
                          />
                        </Group>
                        
                        <TextInput
                          label="Email Address"
                          placeholder="john.doe@company.com"
                          styles={{
                            label: { color: theme.colors.textSecondary, fontWeight: 500 },
                            input: { 
                              backgroundColor: theme.colors.bgTertiary,
                              border: `1px solid ${theme.colors.bgAccent}`,
                              '&:focus': { borderColor: theme.colors.primary }
                            }
                          }}
                        />
                        
                        <Group gap={16}>
                          <TextInput
                            label="Job Title"
                            placeholder="Senior Product Manager"
                            style={{ flex: 1 }}
                            styles={{
                              label: { color: theme.colors.textSecondary, fontWeight: 500 },
                              input: { 
                                backgroundColor: theme.colors.bgTertiary,
                                border: `1px solid ${theme.colors.bgAccent}`,
                                '&:focus': { borderColor: theme.colors.primary }
                              }
                            }}
                          />
                          <Select
                            label="Time Zone"
                            placeholder="Select timezone"
                            data={['UTC-8 (PST)', 'UTC-5 (EST)', 'UTC+0 (GMT)', 'UTC+1 (CET)']}
                            style={{ flex: 1 }}
                            styles={{
                              label: { color: theme.colors.textSecondary, fontWeight: 500 },
                              input: { 
                                backgroundColor: theme.colors.bgTertiary,
                                border: `1px solid ${theme.colors.bgAccent}`,
                                '&:focus': { borderColor: theme.colors.primary }
                              }
                            }}
                          />
                        </Group>
                      </Stack>
                    </Group>
                    
                    <Group justify="flex-end">
                      <Button variant="outline" color="gray">
                        Cancel
                      </Button>
                      <Button
                        style={{
                          backgroundColor: theme.colors.primary,
                          '&:hover': { backgroundColor: theme.colors.primaryHover }
                        }}
                      >
                        Save Changes
                      </Button>
                    </Group>
                  </Stack>
                </Card>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="notifications" pt="xl">
              <Card 
                p={32}
                radius={12}
                shadow="sm"
                style={{ 
                  backgroundColor: theme.colors.bgPrimary,
                  border: `1px solid ${theme.colors.bgAccent}`
                }}
              >
                <Stack gap={24}>
                  <Title order={3} fw={600} style={{ color: theme.colors.textPrimary }}>
                    Notification Preferences
                  </Title>
                  
                  <Stack gap={20}>
                    <Group justify="space-between">
                      <Stack gap={4}>
                        <Text fw={500} style={{ color: theme.colors.textPrimary }}>
                          Strategic Intelligence Alerts
                        </Text>
                        <Text size="sm" style={{ color: theme.colors.textTertiary }}>
                          Get notified when AI generates new strategic insights
                        </Text>
                      </Stack>
                      <Switch
                        checked={notifications.insights}
                        onChange={(event) => setNotifications({...notifications, insights: event.currentTarget.checked})}
                        color="blue"
                      />
                    </Group>
                    
                    <Divider />
                    
                    <Group justify="space-between">
                      <Stack gap={4}>
                        <Text fw={500} style={{ color: theme.colors.textPrimary }}>
                          Project Updates
                        </Text>
                        <Text size="sm" style={{ color: theme.colors.textTertiary }}>
                          Receive updates about project status changes and deadlines
                        </Text>
                      </Stack>
                      <Switch
                        checked={notifications.projects}
                        onChange={(event) => setNotifications({...notifications, projects: event.currentTarget.checked})}
                        color="blue"
                      />
                    </Group>
                    
                    <Divider />
                    
                    <Group justify="space-between">
                      <Stack gap={4}>
                        <Text fw={500} style={{ color: theme.colors.textPrimary }}>
                          Security Alerts
                        </Text>
                        <Text size="sm" style={{ color: theme.colors.textTertiary }}>
                          Important security and account notifications
                        </Text>
                      </Stack>
                      <Switch
                        checked={notifications.security}
                        onChange={(event) => setNotifications({...notifications, security: event.currentTarget.checked})}
                        color="blue"
                      />
                    </Group>
                    
                    <Divider />
                    
                    <Group justify="space-between">
                      <Stack gap={4}>
                        <Text fw={500} style={{ color: theme.colors.textPrimary }}>
                          Product Updates
                        </Text>
                        <Text size="sm" style={{ color: theme.colors.textTertiary }}>
                          News about new features and platform improvements
                        </Text>
                      </Stack>
                      <Switch
                        checked={notifications.marketing}
                        onChange={(event) => setNotifications({...notifications, marketing: event.currentTarget.checked})}
                        color="blue"
                      />
                    </Group>
                  </Stack>
                </Stack>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="security" pt="xl">
              <Stack gap={24}>
                <Card 
                  p={32}
                  radius={12}
                  shadow="sm"
                  style={{ 
                    backgroundColor: theme.colors.bgPrimary,
                    border: `1px solid ${theme.colors.bgAccent}`
                  }}
                >
                  <Stack gap={24}>
                    <Title order={3} fw={600} style={{ color: theme.colors.textPrimary }}>
                      Password & Authentication
                    </Title>
                    
                    <Stack gap={16}>
                      <TextInput
                        label="Current Password"
                        type="password"
                        placeholder="••••••••"
                        styles={{
                          label: { color: theme.colors.textSecondary, fontWeight: 500 },
                          input: { 
                            backgroundColor: theme.colors.bgTertiary,
                            border: `1px solid ${theme.colors.bgAccent}`,
                            '&:focus': { borderColor: theme.colors.primary }
                          }
                        }}
                      />
                      
                      <Group gap={16}>
                        <TextInput
                          label="New Password"
                          type="password"
                          placeholder="••••••••"
                          style={{ flex: 1 }}
                          styles={{
                            label: { color: theme.colors.textSecondary, fontWeight: 500 },
                            input: { 
                              backgroundColor: theme.colors.bgTertiary,
                              border: `1px solid ${theme.colors.bgAccent}`,
                              '&:focus': { borderColor: theme.colors.primary }
                            }
                          }}
                        />
                        <TextInput
                          label="Confirm Password"
                          type="password"
                          placeholder="••••••••"
                          style={{ flex: 1 }}
                          styles={{
                            label: { color: theme.colors.textSecondary, fontWeight: 500 },
                            input: { 
                              backgroundColor: theme.colors.bgTertiary,
                              border: `1px solid ${theme.colors.bgAccent}`,
                              '&:focus': { borderColor: theme.colors.primary }
                            }
                          }}
                        />
                      </Group>
                    </Stack>
                    
                    <Group justify="flex-end">
                      <Button
                        style={{
                          backgroundColor: theme.colors.primary,
                          '&:hover': { backgroundColor: theme.colors.primaryHover }
                        }}
                      >
                        Update Password
                      </Button>
                    </Group>
                  </Stack>
                </Card>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="integrations" pt="xl">
              <Card 
                p={32}
                radius={12}
                shadow="sm"
                style={{ 
                  backgroundColor: theme.colors.bgPrimary,
                  border: `1px solid ${theme.colors.bgAccent}`
                }}
              >
                <Stack gap={24}>
                  <Title order={3} fw={600} style={{ color: theme.colors.textPrimary }}>
                    Tool Integrations
                  </Title>
                  
                  <Text size="sm" style={{ color: theme.colors.textTertiary }}>
                    Connect your existing PM tools to supercharge them with AI intelligence
                  </Text>
                  
                  <Stack gap={16}>
                    {['Jira', 'Monday.com', 'Asana', 'Linear', 'Notion'].map((tool) => (
                      <Group key={tool} justify="space-between" p={16} style={{ 
                        backgroundColor: theme.colors.bgTertiary,
                        borderRadius: '8px',
                        border: `1px solid ${theme.colors.bgAccent}`
                      }}>
                        <Group>
                          <Box
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: '8px',
                              backgroundColor: theme.colors.primary,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <IconKey size={20} color="white" />
                          </Box>
                          <Stack gap={2}>
                            <Text fw={500} style={{ color: theme.colors.textPrimary }}>
                              {tool}
                            </Text>
                            <Text size="sm" style={{ color: theme.colors.textTertiary }}>
                              Connect your {tool} workspace
                            </Text>
                          </Stack>
                        </Group>
                        
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </Group>
                    ))}
                  </Stack>
                </Stack>
              </Card>
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Container>
    </Box>
  );
}