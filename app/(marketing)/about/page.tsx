'use client';

import { Container, Title, Text } from '@mantine/core';

export default function AboutPage() {
  return (
    <Container size={1200} px={24} py={48}>
      <Title order={1} ta="center" mb="lg">About PM33</Title>
      <Text ta="center" size="lg">
        PM33 transforms individual Product Managers into strategic PMOs through AI-powered intelligence.
      </Text>
      <Text ta="center" mt="md">
        Coming soon - full company story and team information.
      </Text>
    </Container>
  );
}