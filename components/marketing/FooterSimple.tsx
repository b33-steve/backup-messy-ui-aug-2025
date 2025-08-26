import Link from 'next/link';
import { Box, Container, Text } from '@mantine/core';

export default function FooterSimple() {
  return (
    <Box py={32} bg="dark.9" c="white">
      <Container size="xl">
        <Text ta="center" c="dimmed" size="sm">
          © 2025 PM33. Built by the PM community, for the PM community.
        </Text>
      </Container>
    </Box>
  );
}