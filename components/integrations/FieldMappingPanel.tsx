"use client";

import React, { useState, useEffect } from 'react';
import { Card, Title, Text, Badge, Group, Stack, Table, Select, Button, Alert, Progress, ActionIcon, Tooltip } from '@mantine/core';
import { IconCheck, IconX, IconRefresh, IconRobot, IconEdit, IconTrash, IconAlertTriangle } from '@tabler/icons-react';

interface FieldMapping {
  id: string;
  source_field: string;
  target_field: string;
  confidence_score: number;
  is_ai_suggested: boolean;
  is_user_approved: boolean;
  is_required: boolean;
  transformation_rule: any;
  success_rate: number;
  times_used: number;
}

interface FieldMappingPanelProps {
  integrationId: string;
  integrationType: string;
}

const targetFields = [
  { value: 'title', label: 'Title', required: true },
  { value: 'description', label: 'Description', required: false },
  { value: 'work_item_type', label: 'Work Item Type', required: true },
  { value: 'status', label: 'Status', required: true },
  { value: 'priority', label: 'Priority', required: false },
  { value: 'assignee', label: 'Assignee', required: false },
  { value: 'reporter', label: 'Reporter', required: false },
  { value: 'project', label: 'Project', required: true },
  { value: 'labels', label: 'Labels/Tags', required: false },
  { value: 'components', label: 'Components', required: false },
  { value: 'epic_key', label: 'Epic/Parent', required: false },
  { value: 'story_points', label: 'Story Points', required: false },
  { value: 'created_at', label: 'Created Date', required: false },
  { value: 'updated_at', label: 'Updated Date', required: false }
];

export const FieldMappingPanel: React.FC<FieldMappingPanelProps> = ({
  integrationId,
  integrationType
}) => {
  const [mappings, setMappings] = useState<FieldMapping[]>([]);
  const [availableFields, setAvailableFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadMappings();
    loadAvailableFields();
  }, [integrationId]);

  const loadMappings = async () => {
    try {
      const response = await fetch(`/api/integrations/${integrationId}/field-mappings`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('pm33_token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setMappings(data);
      }
    } catch (error) {
      console.error('Error loading field mappings:', error);
    }
  };

  const loadAvailableFields = async () => {
    try {
      const response = await fetch(`/api/integrations/${integrationId}/available-fields`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('pm33_token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setAvailableFields(data);
      }
    } catch (error) {
      console.error('Error loading available fields:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAIMappings = async () => {
    setGenerating(true);
    
    try {
      const response = await fetch(`/api/integrations/${integrationId}/generate-mappings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('pm33_token')}`,
        },
      });
      
      if (response.ok) {
        await loadMappings();
      }
    } catch (error) {
      console.error('Error generating AI mappings:', error);
    } finally {
      setGenerating(false);
    }
  };

  const updateMapping = async (mappingId: string, targetField: string) => {
    try {
      const response = await fetch(`/api/integrations/${integrationId}/field-mappings/${mappingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('pm33_token')}`,
        },
        body: JSON.stringify({
          target_field: targetField,
          is_user_approved: true
        }),
      });
      
      if (response.ok) {
        await loadMappings();
      }
    } catch (error) {
      console.error('Error updating mapping:', error);
    }
  };

  const deleteMapping = async (mappingId: string) => {
    try {
      const response = await fetch(`/api/integrations/${integrationId}/field-mappings/${mappingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('pm33_token')}`,
        },
      });
      
      if (response.ok) {
        await loadMappings();
      }
    } catch (error) {
      console.error('Error deleting mapping:', error);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'green';
    if (confidence >= 0.7) return 'yellow';
    return 'red';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.9) return 'High';
    if (confidence >= 0.7) return 'Medium';
    return 'Low';
  };

  const requiredMappings = targetFields.filter(field => field.required);
  const mappedRequired = requiredMappings.filter(field => 
    mappings.some(mapping => mapping.target_field === field.value && mapping.is_user_approved)
  );
  const completionPercent = (mappedRequired.length / requiredMappings.length) * 100;

  if (loading) {
    return (
      <Card withBorder p="md">
        <Text>Loading field mappings...</Text>
      </Card>
    );
  }

  return (
    <Card withBorder p="md">
      <Group position="apart" mb="md">
        <div>
          <Title order={4}>Field Mapping</Title>
          <Text c="dimmed" size="sm">
            Map {integrationType} fields to PM33 schema
          </Text>
        </div>
        <Button
          leftIcon={<IconRobot />}
          onClick={generateAIMappings}
          loading={generating}
          variant="light"
        >
          Generate AI Suggestions
        </Button>
      </Group>

      <Stack spacing="md">
        {/* Progress Overview */}
        <Alert color={completionPercent === 100 ? 'green' : 'blue'} variant="light">
          <Group position="apart" mb="xs">
            <Text size="sm" fw={500}>
              Required Fields: {mappedRequired.length} / {requiredMappings.length}
            </Text>
            <Text size="sm">{Math.round(completionPercent)}% Complete</Text>
          </Group>
          <Progress value={completionPercent} color={completionPercent === 100 ? 'green' : 'blue'} />
        </Alert>

        {mappings.length === 0 ? (
          <Alert color="gray" variant="light">
            <Text size="sm">
              No field mappings configured. Click "Generate AI Suggestions" to automatically map fields.
            </Text>
          </Alert>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Source Field</th>
                <th>Target Field</th>
                <th>Confidence</th>
                <th>Status</th>
                <th>Usage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mappings.map((mapping) => (
                <tr key={mapping.id}>
                  <td>
                    <Text size="sm" fw={500}>
                      {mapping.source_field}
                    </Text>
                  </td>
                  <td>
                    <Select
                      data={targetFields}
                      value={mapping.target_field}
                      onChange={(value) => value && updateMapping(mapping.id, value)}
                      size="sm"
                      searchable
                    />
                  </td>
                  <td>
                    <Badge
                      color={getConfidenceColor(mapping.confidence_score)}
                      variant="light"
                      size="sm"
                    >
                      {getConfidenceLabel(mapping.confidence_score)} ({Math.round(mapping.confidence_score * 100)}%)
                    </Badge>
                  </td>
                  <td>
                    <Group spacing="xs">
                      {mapping.is_ai_suggested && (
                        <Tooltip label="AI Suggested">
                          <Badge color="blue" variant="light" size="xs">
                            <IconRobot size={10} />
                          </Badge>
                        </Tooltip>
                      )}
                      {mapping.is_user_approved ? (
                        <Tooltip label="User Approved">
                          <Badge color="green" variant="light" size="xs">
                            <IconCheck size={10} />
                          </Badge>
                        </Tooltip>
                      ) : (
                        <Tooltip label="Pending Review">
                          <Badge color="orange" variant="light" size="xs">
                            <IconAlertTriangle size={10} />
                          </Badge>
                        </Tooltip>
                      )}
                      {mapping.is_required && (
                        <Tooltip label="Required Field">
                          <Badge color="red" variant="light" size="xs">
                            Required
                          </Badge>
                        </Tooltip>
                      )}
                    </Group>
                  </td>
                  <td>
                    <div>
                      <Text size="xs" c="dimmed">
                        {mapping.times_used} uses
                      </Text>
                      <Text size="xs" c={mapping.success_rate >= 0.8 ? 'green' : 'red'}>
                        {Math.round(mapping.success_rate * 100)}% success
                      </Text>
                    </div>
                  </td>
                  <td>
                    <Group spacing="xs">
                      <ActionIcon
                        size="sm"
                        variant="light"
                        color="red"
                        onClick={() => deleteMapping(mapping.id)}
                      >
                        <IconTrash size={12} />
                      </ActionIcon>
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Stack>
    </Card>
  );
};