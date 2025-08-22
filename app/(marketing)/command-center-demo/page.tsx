import StrategicCommandCenterV2 from '../../../components/shared/CommandCenterWorking';
import { Box, Container, Text } from '@mantine/core';

export default function CommandCenterPage() {
  return (
    <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <StrategicCommandCenterV2 />
      <Container>
        <Text ta="center" py={24} c="dimmed">© 2025 PM33. Strategic Command Center.</Text>
      </Container>
    </Box>
  );
}