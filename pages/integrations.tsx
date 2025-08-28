"use client";

import React from 'react';
import { Container, Tabs } from '@mantine/core';
import { IconExternalLink, IconSettings, IconHistory, IconBolt } from '@tabler/icons-react';
import { IntegrationDashboard } from '../components/integrations/IntegrationDashboard';
import { FieldMappingPanel } from '../components/integrations/FieldMappingPanel';

export default function IntegrationsPage() {
  return (
    <Container size="xl" py="xl">
      <Tabs defaultValue="dashboard" keepMounted={false}>
        <Tabs.List>
          <Tabs.Tab value="dashboard" icon={<IconExternalLink size={16} />}>
            Integrations
          </Tabs.Tab>
          <Tabs.Tab value="settings" icon={<IconSettings size={16} />}>
            Settings
          </Tabs.Tab>
          <Tabs.Tab value="automation" icon={<IconBolt size={16} />}>
            Automation
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="dashboard" pt="xl">
          <IntegrationDashboard />
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xl">
          <div>Settings panel content goes here</div>
        </Tabs.Panel>

        <Tabs.Panel value="automation" pt="xl">
          <div>Automation panel content goes here</div>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}