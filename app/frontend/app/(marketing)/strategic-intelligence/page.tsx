import StrategicAIChat from '../../../components/shared/StrategicAIChat';
import Navigation from '../../../components/shared/Navigation';
import { Box, Container, Text } from '@mantine/core';

export default function StrategicIntelligencePage() {
  return (
    <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <Navigation />
      <StrategicAIChat />
      <Container>
        <Text ta="center" py={24} c="dimmed">© 2025 PM33. Strategic Intelligence Platform.</Text>
      </Container>
    </Box>
  );
}