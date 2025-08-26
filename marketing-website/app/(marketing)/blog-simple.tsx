import { Container, Title, Text } from '@mantine/core';

export default function SimpleBlogPage() {
  return (
    <Container size={1400} px={24} py={40}>
      <Title order={1} size="h1" fw={700}>
        PM33 Blog
      </Title>
      <Text size="xl">
        Product Management Intelligence Hub - Coming Soon
      </Text>
    </Container>
  );
}