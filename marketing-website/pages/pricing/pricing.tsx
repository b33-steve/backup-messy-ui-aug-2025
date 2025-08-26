'use client';

import React from 'react';
import { PM33_DESIGN, getMarketingColor, getSpacing } from '../../components/marketing/design-system';

export default function PricingPage() {
  return (
    <Box py={getSpacing('xxl')} style={{ backgroundColor: getMarketingColor('bg.primary') }}>
      <Container size="xl">
        <Stack align="center" gap={getSpacing('xxl')} mb={64}>
          <Title 
            order={1} 
            ta="center" 
            style={{
              fontSize: PM33_DESIGN.typography.h1.size,
              fontWeight: PM33_DESIGN.typography.h1.weight,
              lineHeight: PM33_DESIGN.typography.h1.line,
              color: getMarketingColor('text.primary')
            }}
          >
            Choose Your PM Transformation Plan
          </Title>
          <Text 
            size="xl" 
            ta="center" 
            maw={600}
            style={{ 
              color: getMarketingColor('text.secondary'),
              fontSize: PM33_DESIGN.typography.body.size,
              lineHeight: PM33_DESIGN.typography.body.line
            }}
          >
            Start free, upgrade when you're ready. All plans include our core AI capabilities.
          </Text>
        </Stack>

        <Stack gap={32}>
          {/* Free Trial */}
          <Card shadow="md" radius="xl" p={32}>
            <Stack gap={24}>
              <Title order={3} size="h3">Free Trial</Title>
              <Text size="xl" fw={700}>$0</Text>
              <Text size="sm" c="dimmed">14 days, no credit card</Text>
              
              <Stack gap={8}>
                <Text size="sm">• Strategic Intelligence Engine</Text>
                <Text size="sm">• Up to 50 AI analysis requests</Text>
                <Text size="sm">• Basic integrations (Jira, Linear)</Text>
                <Text size="sm">• Email support</Text>
              </Stack>
              
              <Button component={Link} href="/trial" size="lg" variant="outline" fullWidth>
                Start Free Trial
              </Button>
            </Stack>
          </Card>

          {/* Professional */}
          <Card 
            shadow="xl" 
            radius="xl" 
            p={getSpacing('xl')} 
            style={{ 
              border: `2px solid ${PM33_DESIGN.colors.marketing.primary}`,
              backgroundColor: getMarketingColor('bg.primary')
            }}
          >
            <Stack gap={getSpacing('lg')}>
              <Title 
                order={3} 
                style={{
                  fontSize: PM33_DESIGN.typography.h3.size,
                  fontWeight: PM33_DESIGN.typography.h3.weight,
                  color: getMarketingColor('text.primary')
                }}
              >
                Professional
              </Title>
              <Text 
                size="xl" 
                fw={700}
                style={{ color: getMarketingColor('text.primary') }}
              >
                $497/month
              </Text>
              <Text 
                size="sm" 
                style={{ color: getMarketingColor('text.secondary') }}
              >
                Perfect for growing teams
              </Text>
              
              <Stack gap={getSpacing('sm')}>
                <Text size="sm" style={{ color: getMarketingColor('text.primary') }}>• Everything in Free Trial</Text>
                <Text size="sm" style={{ color: getMarketingColor('text.primary') }}>• Unlimited AI analysis requests</Text>
                <Text size="sm" style={{ color: getMarketingColor('text.primary') }}>• 4 AI Teams coordination</Text>
                <Text size="sm" style={{ color: getMarketingColor('text.primary') }}>• Advanced integrations</Text>
                <Text size="sm" style={{ color: getMarketingColor('text.primary') }}>• Priority support</Text>
              </Stack>
              
              <Button 
                component={Link} 
                href="/trial" 
                size="lg" 
                variant="filled" 
                fullWidth
                style={{ 
                  backgroundColor: PM33_DESIGN.colors.marketing.primary,
                  color: getMarketingColor('text.inverse')
                }}
              >
                Get Started Now
              </Button>
            </Stack>
          </Card>

          {/* Enterprise */}
          <Card shadow="md" radius="xl" p={32}>
            <Stack gap={24}>
              <Title order={3} size="h3">Enterprise</Title>
              <Text size="xl" fw={700}>Custom</Text>
              <Text size="sm" c="dimmed">Tailored for your needs</Text>
              
              <Stack gap={8}>
                <Text size="sm">• Everything in Professional</Text>
                <Text size="sm">• Custom AI model training</Text>
                <Text size="sm">• Dedicated account manager</Text>
                <Text size="sm">• On-premise deployment</Text>
                <Text size="sm">• 24/7 white-glove support</Text>
              </Stack>
              
              <Button component={Link} href="/contact" size="lg" variant="outline" fullWidth>
                Contact Sales
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}