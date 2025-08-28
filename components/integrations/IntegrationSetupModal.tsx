"use client";

import React, { useState } from 'react';
import { Modal, Title, Text, Button, Group, Stack, Select, TextInput, Alert, Stepper, Card, Badge, List } from '@mantine/core';
import { IconBrandGoogle, IconExternalLink, IconCheck, IconAlertTriangle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

interface IntegrationSetupModalProps {
  opened: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface IntegrationType {
  value: string;
  label: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  status: 'available' | 'beta' | 'coming_soon';
}

const integrationTypes: IntegrationType[] = [
  {
    value: 'jira',
    label: 'Atlassian Jira',
    description: 'Sync projects, issues, and workflows from Jira Cloud',
    features: ['Projects & Issues', 'Custom Fields', 'Workflows', 'Users & Permissions'],
    icon: <IconBrandGoogle size={20} />,
    status: 'available'
  },
  {
    value: 'linear',
    label: 'Linear',
    description: 'Import issues, projects, and team data from Linear',
    features: ['Issues & Projects', 'Labels & States', 'Teams', 'Milestones'],
    icon: <IconExternalLink size={20} />,
    status: 'beta'
  },
  {
    value: 'monday',
    label: 'Monday.com',
    description: 'Connect boards, items, and workflows from Monday',
    features: ['Boards & Items', 'Custom Columns', 'Automations', 'Team Collaboration'],
    icon: <IconExternalLink size={20} />,
    status: 'coming_soon'
  }
];

export const IntegrationSetupModal: React.FC<IntegrationSetupModalProps> = ({
  opened,
  onClose,
  onSuccess
}) => {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authUrl, setAuthUrl] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      integration_type: '',
      integration_name: '',
    },
    validate: {
      integration_type: (value) => (!value ? 'Please select an integration type' : null),
      integration_name: (value) => (!value ? 'Please provide a name for this integration' : null),
    },
  });

  const selectedIntegration = integrationTypes.find(t => t.value === form.values.integration_type);

  const handleNext = () => {
    if (active === 0) {
      if (!form.values.integration_type) {
        form.setFieldError('integration_type', 'Please select an integration type');
        return;
      }
      setActive(1);
    } else if (active === 1) {
      if (!form.values.integration_name) {
        form.setFieldError('integration_name', 'Please provide a name');
        return;
      }
      setActive(2);
    }
  };

  const handleBack = () => {
    setActive(active - 1);
  };

  const handleSetup = async () => {
    const validation = form.validate();
    if (validation.hasErrors) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/integrations/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('pm33_token')}`,
        },
        body: JSON.stringify({
          integration_type: form.values.integration_type,
          integration_name: form.values.integration_name,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAuthUrl(data.authorize_url);
        setActive(3);
      } else {
        setError(data.error || 'Failed to setup integration');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthComplete = () => {
    onSuccess();
    handleClose();
  };

  const handleClose = () => {
    setActive(0);
    setError(null);
    setAuthUrl(null);
    form.reset();
    onClose();
  };

  const getStatusBadge = (status: IntegrationType['status']) => {
    switch (status) {
      case 'available':
        return <Badge color="green" variant="light">Available</Badge>;
      case 'beta':
        return <Badge color="blue" variant="light">Beta</Badge>;
      case 'coming_soon':
        return <Badge color="gray" variant="light">Coming Soon</Badge>;
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={<Title order={3}>Add Integration</Title>}
      size="lg"
      centered
    >
      <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
        {/* Step 1: Choose Integration */}
        <Stepper.Step label="Choose Integration" description="Select your PM tool">
          <Stack spacing="md">
            <Text>Select the PM tool you want to integrate with PM33:</Text>
            
            <Stack spacing="sm">
              {integrationTypes.map((integration) => (
                <Card
                  key={integration.value}
                  withBorder
                  p="md"
                  className={`cursor-pointer transition-colors ${
                    form.values.integration_type === integration.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => {
                    if (integration.status !== 'coming_soon') {
                      form.setFieldValue('integration_type', integration.value);
                    }
                  }}
                >
                  <Group position="apart" mb="xs">
                    <Group spacing="sm">
                      {integration.icon}
                      <Text fw={500}>{integration.label}</Text>
                    </Group>
                    {getStatusBadge(integration.status)}
                  </Group>
                  
                  <Text size="sm" c="dimmed" mb="sm">
                    {integration.description}
                  </Text>
                  
                  <List size="sm" spacing="xs">
                    {integration.features.map((feature, index) => (
                      <List.Item key={index} icon={<IconCheck size={14} color="green" />}>
                        {feature}
                      </List.Item>
                    ))}
                  </List>
                </Card>
              ))}
            </Stack>
            
            {form.errors.integration_type && (
              <Text color="red" size="sm">{form.errors.integration_type}</Text>
            )}
          </Stack>
        </Stepper.Step>

        {/* Step 2: Configuration */}
        <Stepper.Step label="Configuration" description="Name your integration">
          <Stack spacing="md">
            <Text>Configure your {selectedIntegration?.label} integration:</Text>
            
            <TextInput
              label="Integration Name"
              placeholder="e.g., Main Jira Workspace"
              description="Choose a name to identify this integration"
              {...form.getInputProps('integration_name')}
            />

            {selectedIntegration && (
              <Alert color="blue" variant="light" icon={<IconExternalLink />}>
                <Text size="sm">
                  This will connect to your {selectedIntegration.label} account and sync:
                </Text>
                <List size="sm" mt="xs">
                  {selectedIntegration.features.map((feature, index) => (
                    <List.Item key={index}>{feature}</List>
                  ))}
                </List>
              </Alert>
            )}
          </Stack>
        </Stepper.Step>

        {/* Step 3: Authentication */}
        <Stepper.Step label="Authentication" description="Connect your account">
          <Stack spacing="md">
            <Text>Connect your {selectedIntegration?.label} account:</Text>
            
            <Alert color="blue" variant="light">
              <Text size="sm" mb="sm">
                You'll be redirected to {selectedIntegration?.label} to authorize PM33 access.
              </Text>
              <Text size="sm">
                We only request the minimum permissions needed to sync your project data.
              </Text>
            </Alert>

            {error && (
              <Alert color="red" variant="light" icon={<IconAlertTriangle />}>
                {error}
              </Alert>
            )}
          </Stack>
        </Stepper.Step>

        {/* Step 4: OAuth Redirect */}
        <Stepper.Step label="Complete" description="Authorize access">
          <Stack spacing="md" align="center">
            {authUrl ? (
              <>
                <Text align="center">
                  Click the button below to complete the authorization process:
                </Text>
                <Button
                  component="a"
                  href={authUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<IconExternalLink />}
                  size="lg"
                >
                  Authorize {selectedIntegration?.label}
                </Button>
                <Text size="sm" c="dimmed" align="center">
                  After authorization, return to this page to complete the setup.
                </Text>
                <Button variant="light" onClick={handleOAuthComplete}>
                  I've completed authorization
                </Button>
              </>
            ) : (
              <Text>Setting up authorization...</Text>
            )}
          </Stack>
        </Stepper.Step>
      </Stepper>

      <Group position="right" mt="xl">
        {active > 0 && active < 3 && (
          <Button variant="default" onClick={handleBack}>
            Back
          </Button>
        )}
        
        {active < 2 && (
          <Button onClick={handleNext}>
            Next
          </Button>
        )}
        
        {active === 2 && (
          <Button onClick={handleSetup} loading={loading}>
            Setup Integration
          </Button>
        )}
      </Group>
    </Modal>
  );
};