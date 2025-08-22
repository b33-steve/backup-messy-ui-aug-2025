import { Container, Title, Text, Card, Stack, Badge, Button } from '@mantine/core';

export default function StrategicIntelligencePage() {
  return (
    <Container size={1200} py={80}>
      <Stack gap={24} ta="center" mb={64}>
        <Badge
          size="lg"
          variant="gradient"
          gradient={{ from: 'teal', to: 'green' }}
          radius="xl"
        >
          🧠 Strategic Intelligence
        </Badge>
        <Title order={1} size="h1" fw={700}>
          AI-Powered Strategic Analysis
        </Title>
        <Text size="xl" c="dimmed" maw={600} mx="auto">
          Transform your product decisions with multi-framework strategic intelligence.
          Get ICE/RICE analysis, Porter's Five Forces insights, and competitive intelligence.
        </Text>
        <Button
          size="lg"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'purple' }}
          radius="lg"
        >
          Start Strategic Analysis
        </Button>
      </Stack>

      <Card shadow="lg" padding={48} radius={20} ta="center" style={{ backgroundColor: 'var(--marketing-bg-secondary)' }}>
        <Title order={2} mb={16}>Ready to transform your strategic decisions?</Title>
        <Text size="lg" c="dimmed" mb={24} maw={500} mx="auto">
          Join product teams using PM33 Strategic Intelligence to make data-driven strategic decisions.
        </Text>
        <Button
          size="xl"
          variant="gradient"
          gradient={{ from: 'orange', to: 'red' }}
          radius="lg"
        >
          Start Free Trial
        </Button>
      </Card>
    </Container>
  );
}