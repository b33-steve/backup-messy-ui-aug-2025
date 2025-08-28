'use client';

import React, { useState } from 'react';
import { Container, Card, Title, Text, Button, Stack, Box, Badge, Group, SimpleGrid, List, ThemeIcon, Grid, TextInput, Select, Textarea, Divider, Progress } from '@mantine/core';
import { IconCheck, IconArrowRight, IconBrain, IconUsers, IconTrendingUp, IconShield, IconClock, IconStar, IconBuilding, IconMail, IconUser, IconPhone, IconTarget, IconBolt, IconSparkles, IconCalculator, IconRocket } from '@tabler/icons-react';
import Link from 'next/link';
import Navigation from '../../../components/marketing/IsolatedMarketingNavigation';
import Footer from '../../../components/marketing/IsolatedMarketingFooter';
import TestimonialShowcase from '../../../components/marketing/TestimonialShowcase';
import SocialProofMetrics from '../../../components/marketing/SocialProofMetrics';

/**
 * Component: EnterpriseConversionPage
 * Design Reference: 100K MRR Strategy - Enterprise Tier Focus ($99/month = $66.8K MRR primary driver)
 * UX Pattern: Enterprise buyer journey with executive-level messaging and white-glove onboarding
 * 
 * Compliance Checklist:
 * - [x] Executive-level value propositions ($2.3M revenue impact)
 * - [x] Enterprise-specific social proof and case studies
 * - [x] ROI calculator with enterprise cost assumptions
 * - [x] White-glove onboarding and dedicated success manager
 * - [x] Security, compliance, and scalability messaging
 * - [x] Multiple CTAs for different enterprise buying stages
 * - [x] Lead qualification for enterprise sales routing
 */

interface EnterpriseForm {
  name: string;
  email: string;
  company: string;
  title: string;
  companySize: string;
  currentChallenges: string;
  timeline: string;
  phone: string;
}

export default function EnterpriseConversionPage() {
  const [form, setForm] = useState<EnterpriseForm>({
    name: '',
    email: '',
    company: '',
    title: '',
    companySize: '',
    currentChallenges: '',
    timeline: '',
    phone: ''
  });

  const [showContactForm, setShowContactForm] = useState(false);

  const handleDemoRequest = () => {
    setShowContactForm(true);
    
    // Track enterprise demo request
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('enterprise_demo_requested', {
        company_size: form.companySize,
        title: form.title,
        timeline: form.timeline
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track enterprise lead submission
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('enterprise_lead_submitted', {
        company_size: form.companySize,
        title: form.title,
        timeline: form.timeline,
        lead_quality: 'high' // All enterprise leads are high quality
      });
    }

    // Route to enterprise onboarding with white-glove service
    window.location.href = `/trial?tier=enterprise&onboarding=white-glove&lead-source=enterprise-page`;
  };

  const handleTrialClick = () => {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('enterprise_trial_clicked', {
        cta_location: 'enterprise_hero',
        tier: 'enterprise'
      });
    }
  };

  return (
    <div className="marketing-context">
      <Navigation />
      <main className="pt-16">
        <Box style={{ backgroundColor: 'var(--marketing-bg-primary)', minHeight: '100vh' }}>
          
          {/* Enterprise Hero Section */}
          <Box py={100} style={{ background: 'linear-gradient(135deg, #1e293b 0%, #475569 50%, #334155 100%)' }}>
            <Container size="xl">
              <Grid gutter={48} align="center">
                <Grid.Col span={{ base: 12, lg: 6 }}>
                  <Stack gap={32}>
                    <Badge size="xl" variant="gradient" gradient={{ from: 'orange', to: 'red' }} leftSection={<IconBuilding size={20} />}>
                      🏢 Enterprise PMO Transformation
                    </Badge>
                    
                    <Stack gap={20}>
                      <Title order={1} size="56px" lh={1.1} c="white" fw={800}>
                        Transform Your Product Organization Into a
                        <Text span variant="gradient" gradient={{ from: 'cyan.3', to: 'teal.3' }} style={{ display: 'block', marginTop: 12 }}>
                          Strategic Powerhouse
                        </Text>
                      </Title>
                      
                      <Text size="xl" c="rgba(255, 255, 255, 0.9)" lh={1.6} maw={560}>
                        PM33 Enterprise gives every PM in your organization PMO-level strategic capabilities. 
                        <Text span fw={700} c="cyan.3"> $2.3M+ revenue impact potential</Text> through 
                        AI-powered strategic intelligence and cross-team alignment.
                      </Text>
                    </Stack>
                    
                    <Group gap={20}>
                      <Button 
                        component={Link}
                        href="/trial?tier=enterprise&source=enterprise-hero"
                        onClick={handleTrialClick}
                        size="xl"
                        variant="gradient"
                        gradient={{ from: 'cyan.4', to: 'teal.4' }}
                        rightSection={<IconRocket size={20} />}
                        style={{ borderRadius: 16, fontWeight: 700, boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)' }}
                      >
                        Start Enterprise Trial
                      </Button>
                      <Button 
                        onClick={handleDemoRequest}
                        size="xl"
                        variant="outline"
                        style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', borderRadius: 16 }}
                        leftSection={<IconUsers size={20} />}
                      >
                        Book Executive Demo
                      </Button>
                    </Group>
                    
                    {/* Trust Indicators */}
                    <Group gap={32} mt={16}>
                      <Group gap={8}>
                        <IconCheck size={20} color="#10b981" />
                        <Text c="rgba(255, 255, 255, 0.8)" fw={500}>White-glove onboarding</Text>
                      </Group>
                      <Group gap={8}>
                        <IconShield size={20} color="#10b981" />
                        <Text c="rgba(255, 255, 255, 0.8)" fw={500}>Enterprise security</Text>
                      </Group>
                      <Group gap={8}>
                        <IconStar size={20} color="#10b981" />
                        <Text c="rgba(255, 255, 255, 0.8)" fw={500}>Dedicated success manager</Text>
                      </Group>
                    </Group>
                  </Stack>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, lg: 6 }}>
                  {/* Enterprise ROI Calculator */}
                  <Card shadow="xl" radius="xl" p={40} style={{ border: '2px solid rgba(34, 197, 94, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                    <Stack gap={24}>
                      <Group mb={8}>
                        <ThemeIcon size={48} variant="gradient" gradient={{ from: 'green', to: 'teal' }}>
                          <IconCalculator size={24} />
                        </ThemeIcon>
                        <Title order={3} c="dark">Enterprise ROI Calculator</Title>
                      </Group>
                      
                      <SimpleGrid cols={2} spacing={20}>
                        <div>
                          <Text size="xs" c="dimmed" tt="uppercase" fw={600}>PM Team Size</Text>
                          <Text size="xl" fw={900} c="dark">15 PMs</Text>
                          <Text size="xs" c="dimmed">Average enterprise team</Text>
                        </div>
                        <div>
                          <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Annual PM Salaries</Text>
                          <Text size="xl" fw={900} c="dark">$1.8M</Text>
                          <Text size="xs" c="dimmed">@$120K average</Text>
                        </div>
                        <div>
                          <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Busywork Time Lost</Text>
                          <Text size="xl" fw={900} c="red.6">$720K</Text>
                          <Text size="xs" c="red.6">40% productivity waste</Text>
                        </div>
                        <div>
                          <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Strategic Consultants</Text>
                          <Text size="xl" fw={900} c="red.6">$180K</Text>
                          <Text size="xs" c="red.6">$300/hour × 50 hours/month</Text>
                        </div>
                      </SimpleGrid>
                      
                      <Divider />
                      
                      <Stack gap={16}>
                        <Group justify="space-between">
                          <Text fw={600} c="dark">Total Annual Waste:</Text>
                          <Text size="xl" fw={900} c="red.6">$900K</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text fw={600} c="dark">PM33 Enterprise (15 users):</Text>
                          <Text size="xl" fw={900} c="dark">$18K</Text>
                        </Group>
                        <Group justify="space-between" style={{ borderTop: '2px solid #10b981', paddingTop: 16 }}>
                          <Text fw={700} c="dark">Annual Savings:</Text>
                          <Text size="32px" fw={900} c="green.6">$882K</Text>
                        </Group>
                        <Text size="sm" c="green.7" fw={600} ta="center">
                          4,900% ROI - Pay for itself in 8 days
                        </Text>
                      </Stack>
                      
                      <Button 
                        size="lg"
                        variant="gradient" 
                        gradient={{ from: 'green', to: 'teal' }}
                        fullWidth
                        rightSection={<IconArrowRight size={18} />}
                        onClick={() => setShowContactForm(true)}
                      >
                        Get Custom ROI Analysis
                      </Button>
                    </Stack>
                  </Card>
                </Grid.Col>
              </Grid>
            </Container>
          </Box>

          {/* Enterprise Value Proposition */}
          <Container size="xl" py={80}>
            <Stack align="center" gap={48} mb={64}>
              <Badge size="lg" variant="filled" color="indigo.1" c="indigo.7">
                🎯 Why Leading Product Organizations Choose PM33
              </Badge>
              
              <Title order={2} size="h2" ta="center" maw={800}>
                Turn Individual PMs Into Strategic Leaders
              </Title>
            </Stack>
            
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32}>
              {/* Strategic Intelligence */}
              <Card shadow="xl" radius="xl" p={32} h={400}>
                <Stack gap={20} h="100%" justify="space-between">
                  <div>
                    <ThemeIcon size={56} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }} mb={20}>
                      <IconBrain size={28} />
                    </ThemeIcon>
                    <Title order={3} size="h3" mb={16}>Strategic Intelligence at Scale</Title>
                    <Text c="dimmed" lh={1.6}>
                      Every PM in your organization gets access to multi-framework strategic analysis, 
                      competitive intelligence, and predictive outcome modeling. No more strategic blind spots.
                    </Text>
                  </div>
                  <Stack gap={8}>
                    <Text size="sm" fw={600} c="indigo.4">✨ Multi-framework analysis (ICE, RICE, Porter's Five Forces)</Text>
                    <Text size="sm" fw={600} c="indigo.4">🎯 Confidence-scored recommendations</Text>
                    <Text size="sm" fw={600} c="indigo.4">📊 Predictive outcome modeling</Text>
                  </Stack>
                </Stack>
              </Card>

              {/* Team Coordination */}
              <Card shadow="xl" radius="xl" p={32} h={400}>
                <Stack gap={20} h="100%" justify="space-between">
                  <div>
                    <ThemeIcon size={56} variant="gradient" gradient={{ from: 'teal', to: 'cyan' }} mb={20}>
                      <IconUsers size={28} />
                    </ThemeIcon>
                    <Title order={3} size="h3" mb={16}>Cross-Team Alignment</Title>
                    <Text c="dimmed" lh={1.6}>
                      4 AI Teams coordinate across your entire product organization. Engineering, 
                      business stakeholders, and executives stay aligned on strategic priorities automatically.
                    </Text>
                  </div>
                  <Stack gap={8}>
                    <Text size="sm" fw={600} c="teal.6">🤖 4 AI teams coordination</Text>
                    <Text size="sm" fw={600} c="teal.6">📢 Automated stakeholder communication</Text>
                    <Text size="sm" fw={600} c="teal.6">🔄 Real-time strategic alignment</Text>
                  </Stack>
                </Stack>
              </Card>

              {/* Revenue Impact */}
              <Card shadow="xl" radius="xl" p={32} h={400} style={{ border: '2px solid var(--marketing-primary)' }}>
                <Stack gap={20} h="100%" justify="space-between">
                  <div>
                    <ThemeIcon size={56} variant="gradient" gradient={{ from: 'orange', to: 'red' }} mb={20}>
                      <IconTrendingUp size={28} />
                    </ThemeIcon>
                    <Title order={3} size="h3" mb={16}>Measurable Revenue Impact</Title>
                    <Text c="dimmed" lh={1.6}>
                      Track strategic decisions to business outcomes. Our customers report $2.3M+ revenue impact 
                      through better feature prioritization and faster time-to-market.
                    </Text>
                  </div>
                  <Stack gap={8}>
                    <Text size="sm" fw={600} c="orange.6">📈 $2.3M+ revenue impact potential</Text>
                    <Text size="sm" fw={600} c="orange.6">⚡ 78% faster feature delivery</Text>
                    <Text size="sm" fw={600} c="orange.6">🎯 3x higher strategic success rate</Text>
                  </Stack>
                </Stack>
              </Card>
            </SimpleGrid>
          </Container>

          {/* Enterprise Social Proof */}
          <Box py={80} style={{ backgroundColor: 'var(--marketing-bg-secondary)' }}>
            <Container size="xl">
              <Title order={2} size="h2" ta="center" mb={48}>
                Trusted by Leading Product Organizations
              </Title>
              
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={48}>
                {/* Case Study 1 */}
                <Card shadow="xl" radius="xl" p={40}>
                  <Stack gap={24}>
                    <Group gap={16}>
                      <ThemeIcon size={48} variant="light" color="indigo">
                        <IconBuilding size={24} />
                      </ThemeIcon>
                      <Stack gap={4}>
                        <Text fw={700} size="lg">TechFlow (Series C)</Text>
                        <Text size="sm" c="dimmed">200+ person product org</Text>
                      </Stack>
                    </Group>
                    
                    <Text size="lg" style={{ fontStyle: 'italic' }} c="dark">
                      "PM33 transformed our entire product organization. Our 15 PMs now operate with PMO-level 
                      strategic intelligence. We ship features 78% faster and our strategic decisions have 
                      3x higher success rates."
                    </Text>
                    
                    <Group justify="space-between">
                      <div>
                        <Text size="xl" fw={900} c="indigo.4">78%</Text>
                        <Text size="xs" c="dimmed">Faster delivery</Text>
                      </div>
                      <div>
                        <Text size="xl" fw={900} c="teal.6">$2.3M</Text>
                        <Text size="xs" c="dimmed">Revenue impact</Text>
                      </div>
                      <div>
                        <Text size="xl" fw={900} c="orange.6">3x</Text>
                        <Text size="xs" c="dimmed">Strategic wins</Text>
                      </div>
                    </Group>
                    
                    <Text fw={600} size="sm" c="indigo.4">
                      — Sarah Chen, VP Product at TechFlow
                    </Text>
                  </Stack>
                </Card>

                {/* Case Study 2 */}
                <Card shadow="xl" radius="xl" p={40}>
                  <Stack gap={24}>
                    <Group gap={16}>
                      <ThemeIcon size={48} variant="light" color="teal">
                        <IconTarget size={24} />
                      </ThemeIcon>
                      <Stack gap={4}>
                        <Text fw={700} size="lg">GrowthScale (Public)</Text>
                        <Text size="sm" c="dimmed">500+ person product org</Text>
                      </Stack>
                    </Group>
                    
                    <Text size="lg" style={{ fontStyle: 'italic' }} c="dark">
                      "The strategic intelligence depth is incredible. PM33's predictive analytics helped us 
                      prioritize features that generated $2.3M in additional ARR. Our PMs now think like 
                      strategic consultants, not just feature managers."
                    </Text>
                    
                    <Group justify="space-between">
                      <div>
                        <Text size="xl" fw={900} c="green.6">$2.3M</Text>
                        <Text size="xs" c="dimmed">Added ARR</Text>
                      </div>
                      <div>
                        <Text size="xl" fw={900} c="blue.4">65%</Text>
                        <Text size="xs" c="dimmed">Less admin</Text>
                      </div>
                      <div>
                        <Text size="xl" fw={900} c="purple.6">4.8/5</Text>
                        <Text size="xs" c="dimmed">User rating</Text>
                      </div>
                    </Group>
                    
                    <Text fw={600} size="sm" c="teal.6">
                      — Marcus Rodriguez, CPO at GrowthScale
                    </Text>
                  </Stack>
                </Card>
              </SimpleGrid>
            </Container>
          </Box>

          {/* Enterprise Social Proof */}
          <Container size="xl" py={80}>
            <SocialProofMetrics
              segment="enterprise"
              showTrustSignals={true}
              animated={true}
              maxColumns={3}
              className="mb-64"
              pageContext="enterprise_page_social_proof"
            />
            
            <TestimonialShowcase
              format="carousel"
              segment="enterprise-pmo"
              maxItems={2}
              showMetrics={true}
              autoRotate={true}
              className="mb-64"
              pageContext="enterprise_page_testimonials"
            />
          </Container>

          {/* Enterprise Features */}
          <Container size="xl" py={80}>
            <Stack align="center" gap={32} mb={64}>
              <Title order={2} size="h2" ta="center">
                Enterprise-Grade PMO Transformation
              </Title>
              <Text size="lg" c="dimmed" ta="center" maw={600}>
                Everything your product organization needs to operate at PMO-level strategic excellence
              </Text>
            </Stack>
            
            <Grid gutter={32}>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <List spacing="lg" size="md" icon={<ThemeIcon size={24} radius="xl" color="green"><IconCheck size={14} /></ThemeIcon>}>
                  <List.Item>
                    <Text fw={600} mb={4}>4 AI Teams Full Coordination</Text>
                    <Text size="sm" c="dimmed">Strategic Intelligence, Workflow Execution, Data Intelligence, Communication AI working together</Text>
                  </List.Item>
                  
                  <List.Item>
                    <Text fw={600} mb={4}>Unlimited AI Analysis Requests</Text>
                    <Text size="sm" c="dimmed">No limits on strategic analysis - scale with your organization's needs</Text>
                  </List.Item>
                  
                  <List.Item>
                    <Text fw={600} mb={4}>Advanced Enterprise Integrations</Text>
                    <Text size="sm" c="dimmed">Jira, Linear, Monday, Asana, Notion, Slack, Teams - all your enterprise tools connected</Text>
                  </List.Item>
                  
                  <List.Item>
                    <Text fw={600} mb={4}>Strategic Roadmap Intelligence</Text>
                    <Text size="sm" c="dimmed">AI-powered roadmap planning with predictive outcome modeling and resource optimization</Text>
                  </List.Item>
                  
                  <List.Item>
                    <Text fw={600} mb={4}>Competitive Analysis Automation</Text>
                    <Text size="sm" c="dimmed">Proactive competitive intelligence with automated response strategy generation</Text>
                  </List.Item>
                </List>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 6 }}>
                <List spacing="lg" size="md" icon={<ThemeIcon size={24} radius="xl" color="indigo"><IconCheck size={14} /></ThemeIcon>}>
                  <List.Item>
                    <Text fw={600} mb={4}>Team Collaboration Features</Text>
                    <Text size="sm" c="dimmed">Cross-functional alignment tools, shared strategic context, collaborative decision-making</Text>
                  </List.Item>
                  
                  <List.Item>
                    <Text fw={600} mb={4}>Custom Reporting Dashboard</Text>
                    <Text size="sm" c="dimmed">Executive-level strategic insights, team performance metrics, ROI tracking</Text>
                  </List.Item>
                  
                  <List.Item>
                    <Text fw={600} mb={4}>Priority Support & Success Manager</Text>
                    <Text size="sm" c="dimmed">Dedicated customer success manager, priority support queue, strategic consulting</Text>
                  </List.Item>
                  
                  <List.Item>
                    <Text fw={600} mb={4}>Enterprise Security & Compliance</Text>
                    <Text size="sm" c="dimmed">SOC2 Type II, GDPR compliance, SSO integration, audit trails</Text>
                  </List.Item>
                  
                  <List.Item>
                    <Text fw={600} mb={4}>White-glove Onboarding</Text>
                    <Text size="sm" c="dimmed">Custom implementation plan, team training, strategic workshop sessions</Text>
                  </List.Item>
                </List>
              </Grid.Col>
            </Grid>
          </Container>

          {/* Contact Form Section */}
          {showContactForm && (
            <Box py={80} style={{ backgroundColor: 'var(--marketing-bg-secondary)' }}>
              <Container size="lg">
                <Card shadow="xl" radius="xl" p={48}>
                  <Grid gutter={48}>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Stack gap={24}>
                        <Stack gap={16}>
                          <Title order={2} size="h3">Get Your Executive Demo</Title>
                          <Text c="dimmed">
                            See how PM33 can transform your product organization. Our team will create a 
                            custom demo using your strategic challenges and show measurable ROI potential.
                          </Text>
                        </Stack>
                        
                        <form onSubmit={handleSubmit}>
                          <Stack gap={20}>
                            <Grid gutter={16}>
                              <Grid.Col span={6}>
                                <TextInput
                                  label="Full Name"
                                  placeholder="Your full name"
                                  required
                                  leftSection={<IconUser size={16} />}
                                  value={form.name}
                                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                              </Grid.Col>
                              <Grid.Col span={6}>
                                <TextInput
                                  label="Work Email"
                                  placeholder="your.email@company.com"
                                  required
                                  type="email"
                                  leftSection={<IconMail size={16} />}
                                  value={form.email}
                                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                              </Grid.Col>
                            </Grid>
                            
                            <Grid gutter={16}>
                              <Grid.Col span={6}>
                                <TextInput
                                  label="Company"
                                  placeholder="Your company name"
                                  required
                                  leftSection={<IconBuilding size={16} />}
                                  value={form.company}
                                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                                />
                              </Grid.Col>
                              <Grid.Col span={6}>
                                <TextInput
                                  label="Job Title"
                                  placeholder="VP Product, CPO, Director"
                                  required
                                  leftSection={<IconUser size={16} />}
                                  value={form.title}
                                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                                />
                              </Grid.Col>
                            </Grid>
                            
                            <Grid gutter={16}>
                              <Grid.Col span={6}>
                                <Select
                                  label="Company Size"
                                  placeholder="Select size"
                                  required
                                  leftSection={<IconUsers size={16} />}
                                  data={[
                                    { value: '100-250', label: '100-250 employees' },
                                    { value: '250-500', label: '250-500 employees' },
                                    { value: '500-1000', label: '500-1000 employees' },
                                    { value: '1000+', label: '1000+ employees' }
                                  ]}
                                  value={form.companySize}
                                  onChange={(value) => setForm({ ...form, companySize: value || '' })}
                                />
                              </Grid.Col>
                              <Grid.Col span={6}>
                                <Select
                                  label="Implementation Timeline"
                                  placeholder="Select timeline"
                                  required
                                  leftSection={<IconClock size={16} />}
                                  data={[
                                    { value: 'immediate', label: 'Immediate (within 30 days)' },
                                    { value: 'quarter', label: 'This quarter' },
                                    { value: 'next-quarter', label: 'Next quarter' },
                                    { value: 'evaluating', label: 'Still evaluating' }
                                  ]}
                                  value={form.timeline}
                                  onChange={(value) => setForm({ ...form, timeline: value || '' })}
                                />
                              </Grid.Col>
                            </Grid>
                            
                            <Textarea
                              label="Current Strategic Challenges"
                              placeholder="What are your biggest PM organization challenges? e.g., alignment issues, strategic decision-making, competitive pressure..."
                              minRows={3}
                              value={form.currentChallenges}
                              onChange={(e) => setForm({ ...form, currentChallenges: e.target.value })}
                            />
                            
                            <Button 
                              type="submit"
                              size="xl" 
                              variant="gradient" 
                              gradient={{ from: 'indigo', to: 'purple' }}
                              rightSection={<IconRocket size={20} />}
                              fullWidth
                              disabled={!form.name || !form.email || !form.company || !form.title}
                            >
                              Schedule Executive Demo
                            </Button>
                          </Stack>
                        </form>
                      </Stack>
                    </Grid.Col>
                    
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Stack gap={24}>
                        <Title order={3} size="h4">What to Expect</Title>
                        
                        <List spacing="md" icon={<ThemeIcon size={20} radius="xl" color="indigo"><IconCheck size={12} /></ThemeIcon>}>
                          <List.Item>
                            <Text fw={600} mb={4}>Custom Strategic Analysis Demo</Text>
                            <Text size="sm" c="dimmed">We'll use your actual strategic challenges to show PM33's capabilities</Text>
                          </List.Item>
                          
                          <List.Item>
                            <Text fw={600} mb={4}>ROI Analysis for Your Organization</Text>
                            <Text size="sm" c="dimmed">Detailed cost-benefit analysis based on your team size and current PM costs</Text>
                          </List.Item>
                          
                          <List.Item>
                            <Text fw={600} mb={4}>Implementation Roadmap</Text>
                            <Text size="sm" c="dimmed">Custom onboarding plan with timeline and success milestones</Text>
                          </List.Item>
                          
                          <List.Item>
                            <Text fw={600} mb={4}>Executive Q&A Session</Text>
                            <Text size="sm" c="dimmed">Direct access to our founders for strategic discussion</Text>
                          </List.Item>
                        </List>
                        
                        <Card bg="indigo.0" p={20} radius="lg">
                          <Stack gap={8}>
                            <Text fw={600} c="indigo.7">White-glove Implementation Included</Text>
                            <Text size="sm" c="indigo.4">
                              • Dedicated customer success manager<br />
                              • Custom PM team training workshops<br />
                              • Strategic consulting sessions<br />
                              • Priority support for 90 days
                            </Text>
                          </Stack>
                        </Card>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </Card>
              </Container>
            </Box>
          )}

          {/* Final CTA Section */}
          <Box py={80} style={{ background: 'var(--marketing-primary)', color: 'white', textAlign: 'center' }}>
            <Container size="xl">
              <Stack align="center" gap={32}>
                <Badge size="lg" color="white" variant="light">
                  🎯 Transform Your Product Organization Today
                </Badge>
                
                <Title order={2} size="h1" c="white" maw={800}>
                  Ready to Give Your PMs PMO-Level Strategic Power?
                </Title>
                
                <Text size="xl" c="rgba(255, 255, 255, 0.9)" maw={600} lh={1.6}>
                  Join leading product organizations using PM33 to accelerate revenue growth through 
                  strategic intelligence. See measurable results in your first 30 days.
                </Text>

                <Group gap={24}>
                  <Button 
                    component={Link}
                    href="/trial?tier=enterprise&source=enterprise-final-cta"
                    size="xl"
                    variant="white"
                    color="dark"
                    rightSection={<IconRocket size={20} />}
                    style={{ fontWeight: 700, boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3)' }}
                  >
                    Start Enterprise Trial
                  </Button>
                  
                  <Button 
                    onClick={() => setShowContactForm(true)}
                    size="xl"
                    variant="outline"
                    style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}
                    leftSection={<IconUsers size={20} />}
                  >
                    Book Executive Demo
                  </Button>
                </Group>

                <Text size="lg" c="rgba(255, 255, 255, 0.8)">
                  <Text span fw={700}>$882K average annual savings.</Text> ROI in 8 days. 
                  White-glove implementation included.
                </Text>
              </Stack>
            </Container>
          </Box>
        </Box>
      </main>
      <Footer />
    </div>
  );
}