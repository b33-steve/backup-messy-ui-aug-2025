'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Container, Card, Title, Text, Button, Stack, TextInput, Group, Box, Badge, SimpleGrid, List, ThemeIcon, Grid, Select, Slider, Radio, Progress, Divider } from '@mantine/core';
import { IconCheck, IconUsers, IconBrain, IconRocket, IconMail, IconBuilding, IconUser, IconSparkles, IconTrendingUp, IconTarget, IconCalculator, IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import Navigation from '../../../components/marketing/IsolatedMarketingNavigation';
import Footer from '../../../components/marketing/IsolatedMarketingFooter';
import TestimonialShowcase from '../../../components/marketing/TestimonialShowcase';
import SocialProofMetrics from '../../../components/marketing/SocialProofMetrics';

/**
 * Component: ConversionOptimizedTrialPage
 * Design Reference: 100K MRR Strategy - Progressive Profiling for Lead Qualification
 * UX Pattern: Multi-step form with segment detection and personalized messaging
 * 
 * Compliance Checklist:
 * - [x] Progressive profiling with qualification scoring
 * - [x] Segment-specific value propositions and messaging
 * - [x] Multiple CTAs for different conversion paths
 * - [x] Real-time ROI calculation based on inputs
 * - [x] Social proof matched to user segment
 * - [x] Urgency and scarcity elements
 * - [x] Advanced lead scoring and routing
 */

interface TrialForm {
  // Step 1: Basic Info
  name: string;
  email: string;
  company: string;
  
  // Step 2: Role & Context
  title: string;
  companySize: string;
  industry: string;
  
  // Step 3: Pain Points & Goals
  primaryChallenge: string;
  currentTools: string[];
  teamSize: string;
  currentPMSalary: number;
  timeSpentOnBusywork: number;
  
  // Qualification Scoring
  qualificationScore: number;
  segment: 'startup' | 'scaleup' | 'enterprise';
}

function ConversionOptimizedTrialPageContent() {
  const searchParams = useSearchParams();
  const tierFromUrl = searchParams.get('tier') || 'enterprise';
  
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<TrialForm>({
    name: '',
    email: '',
    company: '',
    title: '',
    companySize: '',
    industry: '',
    primaryChallenge: '',
    currentTools: [],
    teamSize: '',
    currentPMSalary: 120000,
    timeSpentOnBusywork: 60,
    qualificationScore: 0,
    segment: 'scaleup'
  });

  const [roiData, setRoiData] = useState({
    monthlyPMCost: 0,
    consultantCost: 0,
    totalSavings: 0,
    roiPercentage: 0
  });

  // Calculate ROI and segment in real-time
  useEffect(() => {
    const monthlyPMCost = (form.currentPMSalary / 12) * (form.timeSpentOnBusywork / 100);
    const consultantCost = 20 * 300; // Average consultant hours
    const totalSavings = monthlyPMCost + consultantCost - 99; // PM33 Enterprise cost
    const roiPercentage = ((totalSavings / 99) * 100);

    setRoiData({
      monthlyPMCost,
      consultantCost,
      totalSavings,
      roiPercentage
    });

    // Segment detection
    let segment: 'startup' | 'scaleup' | 'enterprise' = 'scaleup';
    const companySize = parseInt(form.companySize);
    if (companySize <= 50) segment = 'startup';
    else if (companySize >= 500) segment = 'enterprise';

    // Qualification scoring
    let score = 0;
    if (form.title.includes('Senior') || form.title.includes('Principal')) score += 2;
    if (form.title.includes('VP') || form.title.includes('Head') || form.title.includes('Director')) score += 3;
    if (companySize >= 100) score += 2;
    if (form.currentPMSalary >= 100000) score += 1;
    if (form.timeSpentOnBusywork >= 50) score += 2;

    setForm(prev => ({ ...prev, segment, qualificationScore: score }));
  }, [form.companySize, form.title, form.currentPMSalary, form.timeSpentOnBusywork]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    
    // Track progression through form
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('trial_form_step_completed', {
        step: step,
        segment: form.segment,
        qualification_score: form.qualificationScore,
        tier: tierFromUrl
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track high-intent trial signup
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('trial_signup_completed', {
        segment: form.segment,
        qualification_score: form.qualificationScore,
        tier: tierFromUrl,
        roi_percentage: roiData.roiPercentage.toFixed(0),
        company_size: form.companySize,
        title: form.title
      });
    }

    // Route based on qualification score
    if (form.qualificationScore >= 6) {
      // High-value lead - enterprise sales
      window.location.href = `/dashboard?onboarding=enterprise&qualification=high`;
    } else if (form.qualificationScore >= 3) {
      // Mid-tier lead - self-serve with success outreach
      window.location.href = `/dashboard?onboarding=standard&qualification=medium`;
    } else {
      // Low-tier lead - self-serve only
      window.location.href = `/dashboard?onboarding=basic&qualification=low`;
    }
  };

  const getSegmentedMessaging = () => {
    switch (form.segment) {
      case 'startup':
        return {
          headline: "Do More with Less - Strategic PM Power on a Startup Budget",
          value: "Get PMO-level strategic intelligence for $49/month vs hiring another PM ($120K+ salary)",
          social: "Join 800+ startup PMs using PM33 to compete with larger teams"
        };
      case 'enterprise':
        return {
          headline: "Scale PM Excellence Across Your Organization",
          value: "Transform individual PMs into PMO-level strategic thinkers - $2.3M+ revenue impact potential",
          social: "Trusted by 200+ enterprise product teams at companies like TechFlow and GrowthScale"
        };
      default: // scaleup
        return {
          headline: "Accelerate from PM to Strategic Industry Leader",
          value: "78% faster feature delivery through AI-powered strategic intelligence",
          social: "Join 1,500+ scale-up PMs dominating their markets with strategic advantage"
        };
    }
  };

  const messaging = getSegmentedMessaging();

  return (
    <div className="marketing-context">
      <Navigation />
      <main className="pt-16">
        <Box style={{ backgroundColor: 'var(--marketing-bg-primary)', minHeight: '100vh' }}>
          
          {/* Hero Section */}
          <Box py={80} style={{ background: 'linear-gradient(135deg, var(--marketing-bg-secondary) 0%, var(--marketing-bg-primary) 100%)' }}>
            <Container size="lg">
              <Stack align="center" gap={32} mb={48}>
                <Badge size="xl" variant="gradient" gradient={{ from: 'green', to: 'teal' }}>
                  🚀 Start Your Free 14-Day Trial - No Credit Card Required
                </Badge>
                
                <Stack align="center" gap={16}>
                  <Title order={1} size="h1" ta="center" lh={1.1} maw={800}>
                    {messaging.headline}
                  </Title>
                  <Text size="xl" c="dimmed" ta="center" maw={600} lh={1.6}>
                    {messaging.value}
                  </Text>
                </Stack>

                {/* Progress Indicator */}
                <Card shadow="sm" radius="lg" p={20} maw={400}>
                  <Group justify="space-between" mb={12}>
                    <Text size="sm" fw={600}>Setup Progress</Text>
                    <Text size="sm" c="dimmed">{step}/4 steps</Text>
                  </Group>
                  <Progress value={(step / 4) * 100} color="indigo" size="md" radius="xl" />
                  <Group justify="space-between" mt={8}>
                    <Text size="xs" c="dimmed">Basic Info</Text>
                    <Text size="xs" c="dimmed">Strategic Analysis</Text>
                  </Group>
                </Card>
              </Stack>
            </Container>
          </Box>

          <Container size="lg" py={48}>
            <Grid gutter={48}>
              {/* Form Section */}
              <Grid.Col span={{ base: 12, md: 7 }}>
                <Card shadow="xl" radius="xl" p={40}>
                  <form onSubmit={handleSubmit}>
                    
                    {/* Step 1: Basic Information */}
                    {step === 1 && (
                      <Stack gap={24}>
                        <Stack gap={16}>
                          <Title order={2} size="h3">Let's Get Started</Title>
                          <Text c="dimmed">Create your PM33 account in under 2 minutes</Text>
                        </Stack>
                        
                        <TextInput
                          label="Full Name"
                          placeholder="Your full name"
                          required
                          leftSection={<IconUser size={16} />}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          size="md"
                        />
                        
                        <TextInput
                          label="Work Email"
                          placeholder="your.email@company.com"
                          required
                          type="email"
                          leftSection={<IconMail size={16} />}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          size="md"
                          description="We'll send your login credentials here"
                        />
                        
                        <TextInput
                          label="Company"
                          placeholder="Your company name"
                          required
                          leftSection={<IconBuilding size={16} />}
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          size="md"
                        />
                        
                        <Button 
                          onClick={handleNext}
                          size="xl" 
                          variant="gradient" 
                          gradient={{ from: 'indigo', to: 'purple' }}
                          rightSection={<IconArrowRight size={20} />}
                          fullWidth
                          disabled={!form.name || !form.email || !form.company}
                        >
                          Continue Setup
                        </Button>
                      </Stack>
                    )}

                    {/* Step 2: Role & Context */}
                    {step === 2 && (
                      <Stack gap={24}>
                        <Stack gap={16}>
                          <Title order={2} size="h3">Tell Us About Your Role</Title>
                          <Text c="dimmed">This helps us personalize your PM33 experience</Text>
                        </Stack>
                        
                        <TextInput
                          label="Job Title"
                          placeholder="e.g., Senior Product Manager, VP Product"
                          required
                          leftSection={<IconUser size={16} />}
                          value={form.title}
                          onChange={(e) => setForm({ ...form, title: e.target.value })}
                          size="md"
                        />
                        
                        <Select
                          label="Company Size"
                          placeholder="Select company size"
                          required
                          leftSection={<IconUsers size={16} />}
                          data={[
                            { value: '10', label: '1-10 employees' },
                            { value: '25', label: '11-25 employees' },
                            { value: '50', label: '26-50 employees' },
                            { value: '100', label: '51-100 employees' },
                            { value: '250', label: '101-250 employees' },
                            { value: '500', label: '251-500 employees' },
                            { value: '1000', label: '500+ employees' }
                          ]}
                          value={form.companySize}
                          onChange={(value) => setForm({ ...form, companySize: value || '' })}
                          size="md"
                        />
                        
                        <Select
                          label="Industry"
                          placeholder="Select your industry"
                          required
                          data={[
                            { value: 'saas', label: 'SaaS / Software' },
                            { value: 'fintech', label: 'Fintech' },
                            { value: 'healthcare', label: 'Healthcare / Healthtech' },
                            { value: 'ecommerce', label: 'E-commerce / Retail' },
                            { value: 'ai-ml', label: 'AI / Machine Learning' },
                            { value: 'gaming', label: 'Gaming / Entertainment' },
                            { value: 'other', label: 'Other' }
                          ]}
                          value={form.industry}
                          onChange={(value) => setForm({ ...form, industry: value || '' })}
                          size="md"
                        />
                        
                        <Group justify="space-between">
                          <Button 
                            onClick={() => setStep(1)}
                            variant="outline"
                            leftSection={<IconArrowLeft size={16} />}
                          >
                            Back
                          </Button>
                          <Button 
                            onClick={handleNext}
                            size="lg"
                            variant="gradient" 
                            gradient={{ from: 'indigo', to: 'purple' }}
                            rightSection={<IconArrowRight size={20} />}
                            disabled={!form.title || !form.companySize || !form.industry}
                          >
                            Continue
                          </Button>
                        </Group>
                      </Stack>
                    )}

                    {/* Step 3: Pain Points & ROI Calculation */}
                    {step === 3 && (
                      <Stack gap={24}>
                        <Stack gap={16}>
                          <Title order={2} size="h3">Calculate Your Potential ROI</Title>
                          <Text c="dimmed">Let's see how much PM33 can save your team</Text>
                        </Stack>
                        
                        <Radio.Group
                          label="What's your biggest PM challenge right now?"
                          required
                          value={form.primaryChallenge}
                          onChange={(value) => setForm({ ...form, primaryChallenge: value })}
                        >
                          <Stack gap={12} mt={12}>
                            <Radio value="strategic" label="Spending too much time on analysis instead of strategy" />
                            <Radio value="alignment" label="Struggling to align engineering and business teams" />
                            <Radio value="prioritization" label="Difficulty prioritizing features and roadmap items" />
                            <Radio value="competitive" label="Can't keep up with competitive analysis and market changes" />
                            <Radio value="communication" label="Too much time writing docs and status updates" />
                          </Stack>
                        </Radio.Group>
                        
                        <Stack gap={16}>
                          <Text fw={600}>Annual PM Salary: ${form.currentPMSalary.toLocaleString()}</Text>
                          <Slider
                            value={form.currentPMSalary}
                            onChange={(value) => setForm({ ...form, currentPMSalary: value })}
                            min={60000}
                            max={250000}
                            step={10000}
                            marks={[
                              { value: 60000, label: '$60K' },
                              { value: 120000, label: '$120K' },
                              { value: 180000, label: '$180K' },
                              { value: 250000, label: '$250K' }
                            ]}
                            color="indigo"
                          />
                        </Stack>
                        
                        <Stack gap={16}>
                          <Text fw={600}>Time spent on busywork: {form.timeSpentOnBusywork}%</Text>
                          <Slider
                            value={form.timeSpentOnBusywork}
                            onChange={(value) => setForm({ ...form, timeSpentOnBusywork: value })}
                            min={20}
                            max={80}
                            step={5}
                            marks={[
                              { value: 20, label: '20%' },
                              { value: 40, label: '40%' },
                              { value: 60, label: '60%' },
                              { value: 80, label: '80%' }
                            ]}
                            color="orange"
                          />
                          <Text size="sm" c="dimmed">
                            Includes: writing docs, status updates, manual analysis, coordination meetings
                          </Text>
                        </Stack>

                        {/* Real-time ROI Display */}
                        <Card bg="green.0" p={20} radius="lg">
                          <Group gap={16} mb={12}>
                            <ThemeIcon size={32} variant="gradient" gradient={{ from: 'green', to: 'teal' }}>
                              <IconCalculator size={16} />
                            </ThemeIcon>
                            <Text fw={700} size="lg">Your Potential Monthly Savings</Text>
                          </Group>
                          <SimpleGrid cols={2} spacing={16}>
                            <div>
                              <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Current Monthly Waste</Text>
                              <Text size="xl" fw={900} c="red.6">${(roiData.monthlyPMCost + roiData.consultantCost).toLocaleString()}</Text>
                            </div>
                            <div>
                              <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Net Savings with PM33</Text>
                              <Text size="xl" fw={900} c="green.6">${roiData.totalSavings.toLocaleString()}</Text>
                            </div>
                          </SimpleGrid>
                          <Text size="sm" c="green.7" fw={600} mt={8}>
                            ROI: {roiData.roiPercentage.toFixed(0)}% monthly return
                          </Text>
                        </Card>
                        
                        <Group justify="space-between">
                          <Button 
                            onClick={() => setStep(2)}
                            variant="outline"
                            leftSection={<IconArrowLeft size={16} />}
                          >
                            Back
                          </Button>
                          <Button 
                            onClick={handleNext}
                            size="lg"
                            variant="gradient" 
                            gradient={{ from: 'green', to: 'teal' }}
                            rightSection={<IconTrendingUp size={20} />}
                            disabled={!form.primaryChallenge}
                          >
                            See My Strategic Analysis
                          </Button>
                        </Group>
                      </Stack>
                    )}

                    {/* Step 4: Final Confirmation & CTA */}
                    {step === 4 && (
                      <Stack gap={24}>
                        <Stack gap={16} align="center">
                          <ThemeIcon size={64} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                            <IconRocket size={32} />
                          </ThemeIcon>
                          <Title order={2} size="h3" ta="center">You're All Set!</Title>
                          <Text c="dimmed" ta="center">
                            Your personalized PM33 workspace is ready. Start with strategic analysis of your current challenge.
                          </Text>
                        </Stack>

                        {/* Personalized Summary */}
                        <Card bg="indigo.0" p={20} radius="lg">
                          <Stack gap={12}>
                            <Text fw={600} c="indigo.7">Your PM33 Setup Summary:</Text>
                            <Group gap={32}>
                              <div>
                                <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Segment</Text>
                                <Badge color="indigo" variant="filled">{form.segment.toUpperCase()}</Badge>
                              </div>
                              <div>
                                <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Priority Challenge</Text>
                                <Text size="sm" fw={600} tt="capitalize">{form.primaryChallenge.replace('_', ' ')}</Text>
                              </div>
                              <div>
                                <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Monthly ROI</Text>
                                <Text size="sm" fw={600} c="green.6">{roiData.roiPercentage.toFixed(0)}%</Text>
                              </div>
                            </Group>
                          </Stack>
                        </Card>
                        
                        <Button 
                          type="submit"
                          size="xl" 
                          variant="gradient" 
                          gradient={{ from: 'indigo', to: 'purple' }}
                          rightSection={<IconRocket size={20} />}
                          fullWidth
                        >
                          Launch My PM33 Workspace
                        </Button>

                        <Stack gap={8} align="center">
                          <Group gap={24}>
                            <Group gap={8}>
                              <IconCheck size={16} color="var(--mantine-color-teal-6)" />
                              <Text size="sm" c="dimmed">14-day free trial</Text>
                            </Group>
                            <Group gap={8}>
                              <IconCheck size={16} color="var(--mantine-color-teal-6)" />
                              <Text size="sm" c="dimmed">No credit card required</Text>
                            </Group>
                            <Group gap={8}>
                              <IconCheck size={16} color="var(--mantine-color-teal-6)" />
                              <Text size="sm" c="dimmed">Cancel anytime</Text>
                            </Group>
                          </Group>
                        </Stack>
                      </Stack>
                    )}
                  </form>
                </Card>
              </Grid.Col>
              
              {/* Benefits & Social Proof Section */}
              <Grid.Col span={{ base: 12, md: 5 }}>
                <Stack gap={24}>
                  
                  {/* Segment-Specific Benefits */}
                  <Card shadow="lg" radius="xl" p={32}>
                    <Stack gap={20}>
                      <Group>
                        <ThemeIcon size={48} variant="gradient" gradient={{ from: 'indigo', to: 'purple' }}>
                          <IconBrain size={24} />
                        </ThemeIcon>
                        <Title order={3} size="h4">What You Get Day 1</Title>
                      </Group>
                      
                      <List spacing="sm" size="sm" icon={<ThemeIcon size={20} radius="xl" color="green"><IconCheck size={12} /></ThemeIcon>}>
                        {form.segment === 'startup' && (
                          <>
                            <List.Item><strong>Strategic Intelligence Engine</strong> - Compete with larger teams</List.Item>
                            <List.Item><strong>100 AI Analysis Requests</strong> - Perfect for lean team validation</List.Item>
                            <List.Item><strong>Basic Integrations</strong> - Connect your existing tools</List.Item>
                            <List.Item><strong>Startup PM Playbook</strong> - Resource-constrained strategies</List.Item>
                          </>
                        )}
                        {form.segment === 'enterprise' && (
                          <>
                            <List.Item><strong>4 AI Teams Coordination</strong> - Full PMO capabilities</List.Item>
                            <List.Item><strong>Unlimited Analysis</strong> - Scale across your organization</List.Item>
                            <List.Item><strong>Advanced Integrations</strong> - All your enterprise tools</List.Item>
                            <List.Item><strong>White-glove Onboarding</strong> - Dedicated success manager</List.Item>
                          </>
                        )}
                        {form.segment === 'scaleup' && (
                          <>
                            <List.Item><strong>Strategic Intelligence Engine</strong> - Competitive advantage</List.Item>
                            <List.Item><strong>Unlimited AI Analysis</strong> - Scale with your growth</List.Item>
                            <List.Item><strong>Team Collaboration</strong> - Align engineering & business</List.Item>
                            <List.Item><strong>Competitive Analysis</strong> - Stay ahead of competition</List.Item>
                          </>
                        )}
                      </List>
                    </Stack>
                  </Card>
                  
                  {/* Segment-Specific Social Proof */}
                  <Card shadow="md" radius="xl" p={24} style={{ backgroundColor: 'var(--marketing-bg-secondary)' }}>
                    <Stack gap={16}>
                      <Title order={4} size="h5">{messaging.social}</Title>
                      <SimpleGrid cols={3} spacing={16}>
                        <div style={{ textAlign: 'center' }}>
                          <Text fw={700} size="lg" c="indigo">
                            {form.segment === 'startup' ? '156%' : form.segment === 'enterprise' ? '$2.3M' : '78%'}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {form.segment === 'startup' ? 'Productivity gain' : form.segment === 'enterprise' ? 'Revenue impact' : 'Faster delivery'}
                          </Text>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <Text fw={700} size="lg" c="teal">
                            {form.segment === 'startup' ? '$45K' : form.segment === 'enterprise' ? '65%' : '$89K'}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {form.segment === 'startup' ? 'Annual savings' : form.segment === 'enterprise' ? 'Less admin' : 'Cost savings'}
                          </Text>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <Text fw={700} size="lg" c="orange">
                            {form.segment === 'startup' ? '5min' : form.segment === 'enterprise' ? '4.8/5' : '3x'}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {form.segment === 'startup' ? 'Setup time' : form.segment === 'enterprise' ? 'User rating' : 'Strategic wins'}
                          </Text>
                        </div>
                      </SimpleGrid>
                    </Stack>
                  </Card>
                  
                  {/* Urgency/Scarcity */}
                  <Card shadow="sm" radius="lg" p={20} style={{ border: '2px solid var(--marketing-primary)', backgroundColor: 'var(--marketing-bg-primary)' }}>
                    <Stack gap={12}>
                      <Group gap={12}>
                        <IconSparkles size={20} color="var(--marketing-primary)" />
                        <Text fw={600} c="indigo.7">Limited Beta Access</Text>
                      </Group>
                      <Text size="sm" c="dimmed">
                        We're accepting only <strong>200 more beta users</strong> this month. 
                        Join now to lock in your spot and get priority access to new features.
                      </Text>
                      <Progress value={78} color="orange" size="sm" radius="xl" />
                      <Text size="xs" c="dimmed">78% of beta spots taken</Text>
                    </Stack>
                  </Card>

                  {/* Dynamic Testimonials Based on Segment */}
                  {step >= 2 && (
                    <TestimonialShowcase
                      format="featured"
                      segment={form.segment === 'startup' ? 'startup-pm' : form.segment === 'enterprise' ? 'enterprise-pmo' : 'senior-pm'}
                      maxItems={1}
                      showMetrics={true}
                      autoRotate={false}
                      pageContext={`trial_page_step_${step}_${form.segment}`}
                    />
                  )}

                  {/* Social Proof Metrics at Final Step */}
                  {step >= 3 && (
                    <SocialProofMetrics
                      segment={form.segment}
                      showTrustSignals={false}
                      animated={true}
                      maxColumns={2}
                      pageContext={`trial_page_final_${form.segment}`}
                    />
                  )}
                </Stack>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>
      </main>
      <Footer />
    </div>
  );
}

export default function ConversionOptimizedTrialPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConversionOptimizedTrialPageContent />
    </Suspense>
  );
}