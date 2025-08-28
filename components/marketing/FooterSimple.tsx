import Link from 'next/link';
import { Box, Container, Text } from '@mantine/core';

export default function FooterSimple() {
  return (
    <Box 
      py={32} 
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
        color: 'var(--color-text-primary)'
      }}
    >
      <Container size="xl">
        <Text 
          ta="center" 
          size="sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          © 2025 PM33. Built by the PM community, for the PM community.
        </Text>
      </Container>
    </Box>
  );
}