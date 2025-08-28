"use client";

import React, { useState } from 'react';
import { Card, Title, Text, Badge, Group, Stack, Timeline, Button, Collapse, Alert, ActionIcon } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconRefresh, IconCheck, IconX, IconClock, IconAlertTriangle } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface SyncLog {
  id: string;
  sync_type: string;
  sync_status: 'running' | 'completed' | 'failed';
  records_synced: number;
  records_created: number;
  records_updated: number;
  started_at: string;
  completed_at?: string;
  sync_duration_seconds?: number;
  error_messages: string[];
}

interface SyncHistoryPanelProps {
  syncHistory: SyncLog[];
  onRefresh: () => void;
}

export const SyncHistoryPanel: React.FC<SyncHistoryPanelProps> = ({
  syncHistory,
  onRefresh
}) => {
  const [opened, { toggle }] = useDisclosure(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'failed': return 'red';
      case 'running': return 'blue';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <IconCheck size={16} />;
      case 'failed': return <IconX size={16} />;
      case 'running': return <IconClock size={16} />;
      default: return null;
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A';
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const recentSyncs = syncHistory.slice(0, 5);

  return (
    <Card withBorder p="md">
      <Group position="apart" mb="md">
        <Title order={4}>Sync History</Title>
        <Group spacing="xs">
          <ActionIcon
            variant="light"
            onClick={handleRefresh}
            loading={refreshing}
          >
            <IconRefresh size={16} />
          </ActionIcon>
          <ActionIcon variant="light" onClick={toggle}>
            {opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
          </ActionIcon>
        </Group>
      </Group>

      {syncHistory.length === 0 ? (
        <Text c="dimmed" size="sm">No sync history available</Text>
      ) : (
        <Stack spacing="sm">
          <Timeline bulletSize={24} lineWidth={2}>
            {recentSyncs.map((sync) => (
              <Timeline.Item
                key={sync.id}
                bullet={getStatusIcon(sync.sync_status)}
                color={getStatusColor(sync.sync_status)}
              >
                <Group position="apart" mb="xs">
                  <div>
                    <Text size="sm" fw={500}>
                      {sync.sync_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {formatDateTime(sync.started_at)}
                    </Text>
                  </div>
                  <Badge
                    leftSection={getStatusIcon(sync.sync_status)}
                    color={getStatusColor(sync.sync_status)}
                    variant="light"
                    size="sm"
                  >
                    {sync.sync_status}
                  </Badge>
                </Group>

                <Group spacing="xl">
                  <div>
                    <Text size="xs" c="dimmed">Records</Text>
                    <Text size="sm" fw={500}>{sync.records_synced}</Text>
                  </div>
                  <div>
                    <Text size="xs" c="dimmed">Duration</Text>
                    <Text size="sm">{formatDuration(sync.sync_duration_seconds)}</Text>
                  </div>
                  {sync.records_created > 0 && (
                    <div>
                      <Text size="xs" c="dimmed">Created</Text>
                      <Text size="sm" c="green">{sync.records_created}</Text>
                    </div>
                  )}
                  {sync.records_updated > 0 && (
                    <div>
                      <Text size="xs" c="dimmed">Updated</Text>
                      <Text size="sm" c="blue">{sync.records_updated}</Text>
                    </div>
                  )}
                </Group>

                {sync.error_messages.length > 0 && (
                  <Alert color="red" variant="light" mt="xs" p="xs">
                    <Text size="xs">
                      {sync.error_messages[0]}
                      {sync.error_messages.length > 1 && ` (+${sync.error_messages.length - 1} more)`}
                    </Text>
                  </Alert>
                )}
              </Timeline.Item>
            ))}
          </Timeline>

          <Collapse in={opened}>
            <Timeline bulletSize={20} lineWidth={1}>
              {syncHistory.slice(5).map((sync) => (
                <Timeline.Item
                  key={sync.id}
                  bullet={getStatusIcon(sync.sync_status)}
                  color={getStatusColor(sync.sync_status)}
                >
                  <Group position="apart" mb="xs">
                    <div>
                      <Text size="sm">
                        {sync.sync_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {formatDateTime(sync.started_at)}
                      </Text>
                    </div>
                    <Group spacing="xs">
                      <Text size="xs" c="dimmed">{sync.records_synced} records</Text>
                      <Badge
                        color={getStatusColor(sync.sync_status)}
                        variant="light"
                        size="xs"
                      >
                        {sync.sync_status}
                      </Badge>
                    </Group>
                  </Group>
                </Timeline.Item>
              ))}
            </Timeline>
          </Collapse>

          {syncHistory.length > 5 && (
            <Button
              variant="light"
              size="xs"
              onClick={toggle}
              rightIcon={opened ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
            >
              {opened ? 'Show Less' : `Show ${syncHistory.length - 5} More`}
            </Button>
          )}
        </Stack>
      )}
    </Card>
  );
};