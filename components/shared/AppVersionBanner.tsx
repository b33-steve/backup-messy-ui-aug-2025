'use client';

import React, { useState, useEffect } from 'react';
import { Container, Card, Group, Badge, Text, Button, ThemeIcon, Tooltip } from '@mantine/core';
import { IconCheck, IconClock, IconAlertCircle, IconRefresh, IconExternalLink } from '@tabler/icons-react';

interface VersionInfo {
  appVersion: string;
  docVersion: string;
  lastSync: string;
  syncStatus: 'current' | 'syncing' | 'stale' | 'error';
  commitSha?: string;
}

interface SyncStatusIndicatorProps {
  status: 'current' | 'syncing' | 'stale' | 'error';
}

function SyncStatusIndicator({ status }: SyncStatusIndicatorProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'current':
        return { 
          icon: IconCheck, 
          color: 'green', 
          label: 'Up to date',
          tooltip: 'Documentation is synchronized with the latest app version'
        };
      case 'syncing':
        return { 
          icon: IconClock, 
          color: 'blue', 
          label: 'Syncing',
          tooltip: 'Documentation is currently being updated'
        };
      case 'stale':
        return { 
          icon: IconAlertCircle, 
          color: 'orange', 
          label: 'Update available',
          tooltip: 'New app version available, documentation will be updated shortly'
        };
      case 'error':
        return { 
          icon: IconAlertCircle, 
          color: 'red', 
          label: 'Sync error',
          tooltip: 'Documentation synchronization failed, manual intervention required'
        };
      default:
        return { 
          icon: IconClock, 
          color: 'gray', 
          label: 'Unknown',
          tooltip: 'Unable to determine sync status'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Tooltip label={config.tooltip}>
      <ThemeIcon size="sm" variant="light" color={config.color}>
        <Icon size={14} />
      </ThemeIcon>
    </Tooltip>
  );
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return date.toLocaleDateString();
}

// Mock version info - in production this would come from an API
function useVersionInfo(): VersionInfo {
  const [versionInfo, setVersionInfo] = useState<VersionInfo>({
    appVersion: '2.1.4',
    docVersion: '2.1.4',
    lastSync: new Date().toISOString(),
    syncStatus: 'current'
  });

  // Simulate periodic status updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In production, this would fetch from an API endpoint
      setVersionInfo(prev => ({
        ...prev,
        lastSync: new Date().toISOString()
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return versionInfo;
}

export function AppVersionBanner() {
  const versionInfo = useVersionInfo();

  return (
    <Container size="xl" py={16}>
      <Card 
        radius="md" 
        p={16} 
        style={{ 
          background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4ff 100%)',
          border: '1px solid var(--mantine-color-blue-2)'
        }}
      >
        <Group justify="space-between" align="center">
          <Group gap={16}>
            <Badge color="blue" variant="light" size="md">
              App v{versionInfo.appVersion}
            </Badge>
            <Badge 
              color={versionInfo.syncStatus === 'current' ? 'green' : 'orange'} 
              variant="light"
              size="md"
            >
              Docs v{versionInfo.docVersion}
            </Badge>
            <Text size="sm" c="dimmed">
              Updated {formatRelativeTime(versionInfo.lastSync)}
            </Text>
          </Group>
          
          <Group gap={12}>
            <SyncStatusIndicator status={versionInfo.syncStatus} />
            
            <Group gap={8}>
              <Button 
                size="xs" 
                variant="subtle" 
                leftSection={<IconExternalLink size={14} />}
                component="a"
                href="/resources/api-docs"
              >
                API Docs
              </Button>
              <Button 
                size="xs" 
                variant="subtle" 
                leftSection={<IconRefresh size={14} />}
                onClick={() => {
                  // In production, this would trigger a manual sync
                  console.log('Manual sync triggered');
                }}
              >
                Refresh
              </Button>
            </Group>
          </Group>
        </Group>
      </Card>
    </Container>
  );
}