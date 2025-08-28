"use client";

import React from 'react';
import { Card, Text, Group, Progress, ThemeIcon } from '@mantine/core';

interface IntegrationStatusCardProps {
  title: string;
  value: number;
  total?: number;
  color: string;
  icon: React.ReactNode;
  description?: string;
}

export const IntegrationStatusCard: React.FC<IntegrationStatusCardProps> = ({
  title,
  value,
  total,
  color,
  icon,
  description
}) => {
  const percentage = total ? (value / total) * 100 : undefined;

  return (
    <Card withBorder p="md" h="100%">
      <Group position="apart" mb="xs">
        <Text size="sm" c="dimmed" fw={500} tt="uppercase">
          {title}
        </Text>
        <ThemeIcon color={color} variant="light" size="sm">
          {icon}
        </ThemeIcon>
      </Group>

      <Text size="xl" fw={700} c={color}>
        {value}{total !== undefined && ` / ${total}`}
      </Text>

      {percentage !== undefined && (
        <Progress value={percentage} color={color} size="sm" mt="sm" />
      )}

      {description && (
        <Text size="xs" c="dimmed" mt="xs">
          {description}
        </Text>
      )}
    </Card>
  );
};