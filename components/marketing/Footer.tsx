import Link from 'next/link';
import { Box, Container, Grid, Text, Title, Group, Button, Stack, Anchor } from '@mantine/core';

export default function Footer() {
  return (
    <Box py={64} bg="dark.9" c="white">
      <Container size={1200}>
        <Grid gutter={48}>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Stack gap={24}>
              <Group>
                <Text size="xl" fw={800} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                  PM33
                </Text>
                <Box
                  px={8}
                  py={4}
                  style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(147, 51, 234, 0.2))',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: 16
                  }}
                >
                  <Text size="xs" fw={600} c="indigo.3">AI-Powered</Text>
                </Box>
              </Group>
              
              <Text c="dimmed" lh={1.6}>
                Built by the PM community, for the PM community. Enhancing your existing tools with AI intelligence.
              </Text>
              
              <Button
                component={Link}
                href="/trial"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'purple' }}
                size="md"
                radius="lg"
              >
                Start Free Trial
              </Button>
            </Stack>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Stack gap={16}>
              <Text fw={600} size="sm" c="white">Product</Text>
              <Stack gap={12}>
                <Anchor component={Link} href="/features" c="dimmed" size="sm" className="hover:text-indigo-400">Features</Anchor>
                <Anchor component={Link} href="/pricing" c="dimmed" size="sm" className="hover:text-indigo-400">Pricing</Anchor>
                <Anchor component={Link} href="/strategic-intelligence" c="dimmed" size="sm" className="hover:text-indigo-400">Strategic Intelligence</Anchor>
                <Anchor component={Link} href="/command-center" c="dimmed" size="sm" className="hover:text-indigo-400">Command Center</Anchor>
              </Stack>
            </Stack>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Stack gap={16}>
              <Text fw={600} size="sm" c="white">Solutions</Text>
              <Stack gap={12}>
                <Anchor component={Link} href="/jira-alternative" c="dimmed" size="sm" className="hover:text-indigo-400">Jira Alternative</Anchor>
                <Anchor component={Link} href="/monday-alternative" c="dimmed" size="sm" className="hover:text-indigo-400">Monday Alternative</Anchor>
                <Anchor component={Link} href="/asana-competitor" c="dimmed" size="sm" className="hover:text-indigo-400">Asana Alternative</Anchor>
                <Anchor component={Link} href="/ai-powered-roadmap-tool" c="dimmed" size="sm" className="hover:text-indigo-400">AI Roadmap Tool</Anchor>
              </Stack>
            </Stack>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Stack gap={16}>
              <Text fw={600} size="sm" c="white">Community</Text>
              <Stack gap={12}>
                <Anchor component={Link} href="/templates" c="dimmed" size="sm" className="hover:text-indigo-400">PM Templates</Anchor>
                <Anchor component={Link} href="/about" c="dimmed" size="sm" className="hover:text-indigo-400">About</Anchor>
                <Anchor component={Link} href="/contact" c="dimmed" size="sm" className="hover:text-indigo-400">Contact</Anchor>
                <Anchor component={Link} href="/security" c="dimmed" size="sm" className="hover:text-indigo-400">Security</Anchor>
                <Anchor component={Link} href="/privacy" c="dimmed" size="sm" className="hover:text-indigo-400">Privacy</Anchor>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>
        
        <Box mt={48} pt={32} style={{ borderTop: '1px solid rgba(75, 85, 99, 0.3)' }}>
          <Group justify="space-between" align="center">
            <Text c="dimmed" size="sm">
              © 2025 PM33. Built by the PM community, for the PM community.
            </Text>
            <Group gap={24}>
              <Group gap={8}>
                <Box
                  w={8}
                  h={8}
                  bg="teal.4"
                  style={{
                    borderRadius: '50%',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                />
                <Text size="sm" c="dimmed">2,500+ PMs trust PM33</Text>
              </Group>
            </Group>
          </Group>
        </Box>
      </Container>
    </Box>
  );
}