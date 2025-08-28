"use client";

import React, { useState, useEffect } from 'react';
import { Card, Title, Text, Button, Group, Badge, Stack, Alert, Grid, Progress, ActionIcon, Modal } from '@mantine/core';
import { IconPlus, IconRefresh, IconTrash, IconSettings, IconCheck, IconX, IconClock, IconExternalLink, IconAlertTriangle } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { IntegrationSetupModal } from './IntegrationSetupModal';
import { IntegrationStatusCard } from './IntegrationStatusCard';
import { SyncHistoryPanel } from './SyncHistoryPanel';

interface Integration {
  id: string;
  integration_type: string;
  integration_name: string;
  status: 'active' | 'inactive' | 'error' | 'pending';
  last_sync_at?: string;
  credential_expires_at?: string;
  needs_token_refresh: boolean;
  last_error?: string;
}

interface SyncLog {
  id: string;
  sync_type: string;
  sync_status: 'running' | 'completed' | 'failed';
  records_synced: number;
  started_at: string;
  completed_at?: string;
  error_messages: string[];
}

export const IntegrationDashboard: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [syncHistory, setSyncHistory] = useState<SyncLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [setupOpened, { open: openSetup, close: closeSetup }] = useDisclosure(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [refreshing, setRefreshing] = useState<string | null>(null);

  // Load integrations and sync history
  useEffect(() => {
    loadIntegrations();
    loadSyncHistory();
  }, []);

  const loadIntegrations = async () => {
    try {
      const response = await fetch('/api/integrations', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('pm33_token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setIntegrations(data);
      } else {
        console.error('Failed to load integrations');
      }
    } catch (error) {
      console.error('Error loading integrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSyncHistory = async () => {
    try {
      const response = await fetch('/api/integrations/sync-history', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('pm33_token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setSyncHistory(data);
      }
    } catch (error) {
      console.error('Error loading sync history:', error);
    }
  };

  const handleSync = async (integrationId: string, incremental: boolean = true) => {
    setRefreshing(integrationId);
    
    try {
      const response = await fetch(`/api/integrations/${integrationId}/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('pm33_token')}`,
        },
        body: JSON.stringify({ integration_id: integrationId, incremental }),
      });
      
      if (response.ok) {
        // Refresh data after sync
        setTimeout(() => {
          loadIntegrations();
          loadSyncHistory();
        }, 2000);
      } else {
        console.error('Sync failed');
      }
    } catch (error) {
      console.error('Error starting sync:', error);
    } finally {
      setTimeout(() => setRefreshing(null), 3000);
    }
  };

  const handleDelete = async (integrationId: string) => {
    if (!confirm('Are you sure you want to delete this integration? This will remove all synced data.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/integrations/${integrationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('pm33_token')}`,
        },
      });
      
      if (response.ok) {
        loadIntegrations();
      } else {
        console.error('Failed to delete integration');
      }
    } catch (error) {
      console.error('Error deleting integration:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'gray';
      case 'error': return 'red';
      case 'pending': return 'yellow';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <IconCheck size={16} />;
      case 'error': return <IconX size={16} />;
      case 'pending': return <IconClock size={16} />;
      default: return null;
    }
  };

  const formatLastSync = (lastSync?: string) => {
    if (!lastSync) return 'Never synced';
    
    const date = new Date(lastSync);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Less than 1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  };

  if (loading) {
    return (
      <Stack spacing="md">
        <Title order={2}>Integration Dashboard</Title>
        <Text>Loading integrations...</Text>
      </Stack>
    );
  }

  return (
    <Stack spacing="xl">
      <Group position="apart">
        <div>
          <Title order={2}>Integration Dashboard</Title>
          <Text c="dimmed">Manage your PM tool integrations and sync data</Text>
        </div>
        <Button leftIcon={<IconPlus />} onClick={openSetup}>
          Add Integration
        </Button>
      </Group>

      {/* Integration Status Overview */}
      <Grid>
        <Grid.Col span={12} md={6} lg={3}>
          <IntegrationStatusCard
            title="Active Integrations"
            value={integrations.filter(i => i.status === 'active').length}
            total={integrations.length}
            color="green"
            icon={<IconCheck />}
          />
        </Grid.Col>
        <Grid.Col span={12} md={6} lg={3}>
          <IntegrationStatusCard
            title="Need Attention"
            value={integrations.filter(i => i.needs_token_refresh || i.status === 'error').length}
            total={integrations.length}
            color="red"
            icon={<IconAlertTriangle />}
          />
        </Grid.Col>
        <Grid.Col span={12} md={6} lg={3}>
          <IntegrationStatusCard
            title="Recent Syncs"
            value={syncHistory.filter(s => s.sync_status === 'completed').length}
            total={syncHistory.length}
            color="blue"
            icon={<IconRefresh />}
          />
        </Grid.Col>
        <Grid.Col span={12} md={6} lg={3}>
          <IntegrationStatusCard
            title="Data Sources"
            value={new Set(integrations.map(i => i.integration_type)).size}
            total={3}
            color="violet"
            icon={<IconExternalLink />}
          />
        </Grid.Col>
      </Grid>

      {/* Active Integrations */}
      <div>
        <Title order={3} mb="md">Active Integrations</Title>
        {integrations.length === 0 ? (
          <Card withBorder p="xl">
            <Stack align="center" spacing="md">
              <IconExternalLink size={48} color="var(--mantine-color-dimmed)" />
              <div style={{ textAlign: 'center' }}>
                <Text size="lg" fw={500} mb="xs">No integrations configured</Text>
                <Text c="dimmed" mb="md">
                  Connect your PM tools to start syncing data and unlocking strategic insights
                </Text>
                <Button onClick={openSetup} leftIcon={<IconPlus />}>
                  Add Your First Integration
                </Button>
              </div>
            </Stack>
          </Card>
        ) : (
          <Grid>
            {integrations.map((integration) => (
              <Grid.Col key={integration.id} span={12} md={6} lg={4}>
                <Card withBorder p="md" h="100%">
                  <Stack spacing="sm">
                    <Group position="apart">
                      <Group spacing="xs">
                        <Badge
                          leftSection={getStatusIcon(integration.status)}
                          color={getStatusColor(integration.status)}
                          variant="light"
                        >
                          {integration.status}
                        </Badge>
                        {integration.needs_token_refresh && (
                          <Badge color="orange" variant="light">
                            Token Refresh
                          </Badge>
                        )}
                      </Group>
                      <Group spacing="xs">
                        <ActionIcon
                          variant="light"
                          onClick={() => handleSync(integration.id)}
                          loading={refreshing === integration.id}
                        >
                          <IconRefresh size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="red"
                          onClick={() => handleDelete(integration.id)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    </Group>

                    <div>
                      <Text fw={500} size="lg">{integration.integration_name}</Text>
                      <Text c="dimmed" size="sm" tt="capitalize">
                        {integration.integration_type} Integration
                      </Text>
                    </div>

                    <Text size="sm" c="dimmed">
                      Last sync: {formatLastSync(integration.last_sync_at)}
                    </Text>

                    {integration.last_error && (
                      <Alert color="red" variant="light" p="xs">
                        <Text size="xs">{integration.last_error}</Text>
                      </Alert>
                    )}

                    {refreshing === integration.id && (
                      <Progress value={100} animate striped color="blue" />
                    )}
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </div>

      {/* Sync History */}
      <SyncHistoryPanel syncHistory={syncHistory} onRefresh={loadSyncHistory} />

      {/* Setup Modal */}
      <IntegrationSetupModal
        opened={setupOpened}
        onClose={closeSetup}
        onSuccess={() => {
          closeSetup();
          loadIntegrations();
        }}
      />
    </Stack>
  );
};