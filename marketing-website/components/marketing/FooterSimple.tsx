import Link from 'next/link';
import { Box, Container, Text } from '@mantine/core';
import { PM33_DESIGN } from './PM33Header';

export default function FooterSimple() {
  return (
    <Box 
      py={32} 
      style={{
        backgroundColor: PM33_DESIGN.colors.marketing.bg.secondary,
        borderTop: `1px solid ${PM33_DESIGN.colors.marketing.text.secondary}33`
      }}
    >
      <Container size="xl">
        <Text 
          ta="center" 
          size="sm"
          style={{ color: PM33_DESIGN.colors.marketing.text.secondary }}
        >
          © 2025 PM33. Built by the PM community, for the PM community.
        </Text>
      </Container>
    </Box>
  );
}