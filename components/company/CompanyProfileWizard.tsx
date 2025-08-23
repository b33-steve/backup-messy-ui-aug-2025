// /app/frontend/components/company/CompanyProfileWizard.tsx
// Company Profile Wizard - Interactive setup for Data Intelligence AI Team
// Handles comprehensive company context creation for personalized strategic intelligence
// RELEVANT FILES: company_context.py, data_intelligence_service.py, schema.sql, strategic-intelligence/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import {
  Stepper,
  Button,
  Group,
  TextInput,
  Textarea,
  Select,
  MultiSelect,
  NumberInput,
  Paper,
  Title,
  Text,
  Progress,
  Card,
  Badge,
  Stack,
  Grid,
  Container,
  Alert,
  ActionIcon,
  Tooltip,
  Modal,
  Timeline,
  ThemeIcon,
  Divider,
  Checkbox,
  Radio,
  Slider,
  JsonInput,
  Tabs,
  Accordion,
  RingProgress,
  Center
} from '@mantine/core';
import {
  IconBuilding,
  IconUsers,
  IconTarget,
  IconTrendingUp,
  IconBrain,
  IconCheck,
  IconChevronRight,
  IconChevronLeft,
  IconAlertCircle,
  IconInfoCircle,
  IconSparkles,
  IconRocket,
  IconGlobe,
  IconCode,
  IconHeart,
  IconAward,
  IconBulb,
  IconShield,
  IconGraph
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';

// Company profile form data structure
interface CompanyProfileForm {
  // Basic Information
  companyName: string;
  websiteUrl: string;
  description: string;
  
  // Industry and Market
  industry: string;
  subIndustries: string[];
  targetMarkets: string[];
  geographicRegions: string[];
  
  // Company Stage and Scale
  companyStage: string;
  employeeCount: number;
  annualRevenue: string;
  fundingRaised: string;
  
  // Products and Business Model
  keyProducts: string[];
  businessModel: string;
  revenueStreams: string[];
  customerSegments: string[];
  
  // Strategic Context
  missionStatement: string;
  visionStatement: string;
  coreValues: string[];
  strategicObjectives: string[];
  
  // Competitive Landscape
  marketPosition: string;
  mainCompetitors: string[];
  competitiveAdvantages: string[];
  competitiveThreats: string[];
  
  // Current State
  currentChallenges: string[];
  growthOpportunities: string[];
  strategicPriorities: string[];
  
  // Technology and Tools
  techStack: string[];
  pmTools: string[];
  analyticsPlatforms: string[];
  
  // Team and Culture
  engineeringTeamSize: number;
  productTeamSize: number;
  companyCulture: string[];
  
  // Decision-Making Style
  decisionMakingStyle: string;
  riskTolerance: string;
  innovationApproach: string;
  growthStrategy: string;
}

// Industry options based on PM33 architecture
const INDUSTRY_OPTIONS = [
  { value: 'saas_software', label: 'SaaS/Software' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'fintech', label: 'FinTech' },
  { value: 'healthtech', label: 'HealthTech' },
  { value: 'edtech', label: 'EdTech' },
  { value: 'martech', label: 'MarTech' },
  { value: 'enterprise_software', label: 'Enterprise Software' },
  { value: 'consumer_apps', label: 'Consumer Apps' },
  { value: 'developer_tools', label: 'Developer Tools' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'artificial_intelligence', label: 'Artificial Intelligence' },
  { value: 'blockchain_web3', label: 'Blockchain/Web3' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'media_entertainment', label: 'Media & Entertainment' },
  { value: 'other', label: 'Other' }
];

const COMPANY_STAGES = [
  { value: 'pre_seed', label: 'Pre-Seed (<$1M ARR, <10 employees)', description: 'Early ideation and prototype' },
  { value: 'seed', label: 'Seed ($1M-5M ARR, 10-25 employees)', description: 'Product-market fit exploration' },
  { value: 'series_a', label: 'Series A ($5M-15M ARR, 25-75 employees)', description: 'Scaling proven model' },
  { value: 'series_b', label: 'Series B ($15M-40M ARR, 75-200 employees)', description: 'Market expansion' },
  { value: 'series_c_plus', label: 'Series C+ ($40M+ ARR, 200+ employees)', description: 'Global scaling' },
  { value: 'ipo_public', label: 'IPO/Public Company', description: 'Public markets' },
  { value: 'bootstrap', label: 'Bootstrapped', description: 'Self-funded growth' }
];

const MARKET_POSITIONS = [
  { value: 'market_leader', label: 'Market Leader', description: 'Dominant position in market' },
  { value: 'challenger', label: 'Challenger', description: 'Strong competitor to leader' },
  { value: 'follower', label: 'Follower', description: 'Following market trends' },
  { value: 'niche_player', label: 'Niche Player', description: 'Specialized market focus' },
  { value: 'disruptor', label: 'Disruptor', description: 'Changing industry paradigm' },
  { value: 'emerging_player', label: 'Emerging Player', description: 'New market entrant' }
];

const PM_TOOLS = [
  'Jira', 'Linear', 'Monday.com', 'Asana', 'Notion', 'ClickUp', 'Trello',
  'Azure DevOps', 'GitHub Projects', 'Shortcut', 'ProductPlan', 'Aha!', 'Roadmunk'
];

const ANALYTICS_PLATFORMS = [
  'Mixpanel', 'Amplitude', 'Google Analytics 4', 'PostHog', 'Segment',
  'Heap', 'Hotjar', 'FullStory', 'LogRocket', 'Pendo', 'Intercom'
];

const TECH_STACK_OPTIONS = [
  'React', 'Vue.js', 'Angular', 'Next.js', 'Node.js', 'Python', 'Django',
  'Flask', 'Ruby on Rails', 'Java', 'Spring', 'C#', '.NET', 'Go', 'Rust',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'AWS', 'Azure', 'GCP',
  'Docker', 'Kubernetes', 'Terraform', 'GraphQL', 'REST APIs'
];

interface CompanyProfileWizardProps {
  onComplete: (profile: CompanyProfileForm) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function CompanyProfileWizard({ 
  onComplete, 
  onCancel, 
  isLoading = false 
}: CompanyProfileWizardProps) {
  const [active, setActive] = useState(0);
  const [completionScore, setCompletionScore] = useState(0);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Form setup with validation
  const form = useForm<CompanyProfileForm>({
    initialValues: {
      companyName: '',
      websiteUrl: '',
      description: '',
      industry: '',
      subIndustries: [],
      targetMarkets: [],
      geographicRegions: [],
      companyStage: '',
      employeeCount: 0,
      annualRevenue: '',
      fundingRaised: '',
      keyProducts: [],
      businessModel: '',
      revenueStreams: [],
      customerSegments: [],
      missionStatement: '',
      visionStatement: '',
      coreValues: [],
      strategicObjectives: [],
      marketPosition: '',
      mainCompetitors: [],
      competitiveAdvantages: [],
      competitiveThreats: [],
      currentChallenges: [],
      growthOpportunities: [],
      strategicPriorities: [],
      techStack: [],
      pmTools: [],
      analyticsPlatforms: [],
      engineeringTeamSize: 0,
      productTeamSize: 0,
      companyCulture: [],
      decisionMakingStyle: 'data_driven',
      riskTolerance: 'moderate',
      innovationApproach: 'balanced',
      growthStrategy: 'sustainable'
    },
    validate: {
      companyName: (value) => (!value ? 'Company name is required' : null),
      description: (value) => (!value ? 'Company description is required' : null),
      industry: (value) => (!value ? 'Industry selection is required' : null),
      companyStage: (value) => (!value ? 'Company stage is required' : null),
      employeeCount: (value) => (value <= 0 ? 'Employee count must be greater than 0' : null),
      strategicObjectives: (value) => (value.length === 0 ? 'At least one strategic objective is required' : null),
      currentChallenges: (value) => (value.length === 0 ? 'At least one current challenge is required' : null),
      competitiveAdvantages: (value) => (value.length === 0 ? 'At least one competitive advantage is required' : null),
      strategicPriorities: (value) => (value.length === 0 ? 'At least one strategic priority is required' : null)
    }
  });

  // Calculate completion score
  useEffect(() => {
    const calculateCompletionScore = () => {
      const values = form.values;
      let score = 0;
      const weights = {
        // Basic info (30%)
        companyName: 5,
        description: 5,
        industry: 5,
        companyStage: 5,
        employeeCount: 5,
        websiteUrl: 5,
        
        // Strategic context (40%)
        strategicObjectives: 8,
        currentChallenges: 8,
        competitiveAdvantages: 8,
        strategicPriorities: 8,
        marketPosition: 8,
        
        // Business context (20%)
        keyProducts: 5,
        businessModel: 5,
        targetMarkets: 5,
        customerSegments: 5,
        
        // Additional context (10%)
        techStack: 2,
        pmTools: 2,
        companyCulture: 2,
        coreValues: 2,
        missionStatement: 2
      };
      
      Object.entries(weights).forEach(([field, weight]) => {
        const value = values[field as keyof CompanyProfileForm];
        if (Array.isArray(value) ? value.length > 0 : value) {
          score += weight;
        }
      });
      
      setCompletionScore(score);
    };
    
    calculateCompletionScore();
  }, [form.values]);

  const nextStep = () => {
    const stepValidations = [
      ['companyName', 'description', 'industry', 'companyStage'], // Step 0
      ['employeeCount', 'strategicObjectives'], // Step 1
      ['currentChallenges', 'competitiveAdvantages'], // Step 2
      ['strategicPriorities', 'marketPosition'], // Step 3
      [], // Step 4 - Review (no validation)
    ];
    
    const currentStepFields = stepValidations[active];
    const validation = form.validate();
    
    // Check if current step fields have errors
    const stepHasErrors = currentStepFields.some(field => validation.errors[field]);
    
    if (stepHasErrors) {
      notifications.show({
        title: 'Incomplete Information',
        message: 'Please fill in all required fields before continuing.',
        color: 'red'
      });
      return;
    }
    
    if (active < 4) {
      setActive(active + 1);
    }
  };

  const prevStep = () => active > 0 && setActive(active - 1);

  const handleSubmit = () => {
    const validation = form.validate();
    if (validation.hasErrors) {
      notifications.show({
        title: 'Profile Incomplete',
        message: 'Please review and complete all required fields.',
        color: 'red'
      });
      return;
    }
    
    notifications.show({
      title: 'Profile Created!',
      message: 'Your company profile is being processed by our AI teams.',
      color: 'green',
      icon: <IconSparkles size={16} />
    });
    
    onComplete(form.values);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Auto-generate company slug when name changes
  useEffect(() => {
    if (form.values.companyName) {
      const slug = generateSlug(form.values.companyName);
      // Don't update form directly to avoid circular updates
    }
  }, [form.values.companyName]);

  return (
    <Container size="lg" py="xl">
      {/* Header */}
      <Paper p="xl" mb="xl" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)'
      }}>
        <Group justify="space-between" align="center">
          <div>
            <Group align="center" mb="sm">
              <ThemeIcon size={48} radius="md" variant="gradient" gradient={{ from: 'blue', to: 'violet' }}>
                <IconBrain size={28} />
              </ThemeIcon>
              <div>
                <Title order={1} size="h2" fw={700}>Company Profile Setup</Title>
                <Text c="dimmed" size="lg">Configure your strategic intelligence context</Text>
              </div>
            </Group>
            <Text size="md">
              Help our AI teams understand your company for personalized strategic intelligence.
              The more context you provide, the better our recommendations become.
            </Text>
          </div>
          
          <div style={{ minWidth: 120 }}>
            <RingProgress
              size={100}
              thickness={8}
              sections={[{ value: completionScore, color: completionScore > 80 ? 'green' : completionScore > 60 ? 'yellow' : 'blue' }]}
              label={
                <Center>
                  <Text size="xs" fw={700}>
                    {completionScore}%
                  </Text>
                </Center>
              }
            />
            <Text ta="center" size="xs" c="dimmed" mt="xs">Complete</Text>
          </div>
        </Group>
      </Paper>

      <Grid>
        <Grid.Col span={{ base: 12, md: 3 }}>
          {/* Progress Stepper */}
          <Paper p="md">
            <Stepper active={active} onStepClick={setActive} orientation="vertical" size="sm">
              <Stepper.Step 
                label="Company Basics" 
                description="Core information"
                icon={<IconBuilding size={18} />}
                completedIcon={<IconCheck size={18} />}
              />
              <Stepper.Step 
                label="Strategic Context" 
                description="Goals and objectives"
                icon={<IconTarget size={18} />}
                completedIcon={<IconCheck size={18} />}
              />
              <Stepper.Step 
                label="Market Position" 
                description="Competition and challenges"
                icon={<IconGraph size={18} />}
                completedIcon={<IconCheck size={18} />}
              />
              <Stepper.Step 
                label="Priorities" 
                description="Strategic focus areas"
                icon={<IconRocket size={18} />}
                completedIcon={<IconCheck size={18} />}
              />
              <Stepper.Step 
                label="Review" 
                description="Finalize profile"
                icon={<IconSparkles size={18} />}
                completedIcon={<IconCheck size={18} />}
              />
            </Stepper>
            
            {/* Context Quality Indicator */}
            <Divider my="md" />
            <Stack gap="sm">
              <Text size="sm" fw={600}>Context Quality</Text>
              <Progress 
                value={completionScore} 
                color={completionScore > 80 ? 'green' : completionScore > 60 ? 'yellow' : 'blue'}
                size="sm"
              />
              <Text size="xs" c="dimmed">
                {completionScore > 90 ? 'Excellent - Optimal AI performance' :
                 completionScore > 80 ? 'Very Good - Strong recommendations' :
                 completionScore > 60 ? 'Good - Basic intelligence' :
                 'Basic - Limited insights'}
              </Text>
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 9 }}>
          <Paper p="xl">
            {/* Step 0: Company Basics */}
            {active === 0 && (
              <Stack gap="lg">
                <div>
                  <Title order={2} mb="md">Company Basics</Title>
                  <Text c="dimmed" mb="xl">
                    Let's start with the fundamentals about your company.
                  </Text>
                </div>

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 8 }}>
                    <TextInput
                      label="Company Name"
                      placeholder="Enter your company name"
                      required
                      {...form.getInputProps('companyName')}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TextInput
                      label="Website URL"
                      placeholder="https://yourcompany.com"
                      {...form.getInputProps('websiteUrl')}
                    />
                  </Grid.Col>
                </Grid>

                <Textarea
                  label="Company Description"
                  placeholder="Describe what your company does, your mission, and key value proposition..."
                  required
                  minRows={3}
                  maxRows={6}
                  {...form.getInputProps('description')}
                />

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      label="Industry"
                      placeholder="Select primary industry"
                      required
                      data={INDUSTRY_OPTIONS}
                      searchable
                      {...form.getInputProps('industry')}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      label="Company Stage"
                      placeholder="Select development stage"
                      required
                      data={COMPANY_STAGES.map(stage => ({
                        value: stage.value,
                        label: stage.label
                      }))}
                      {...form.getInputProps('companyStage')}
                    />
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <NumberInput
                      label="Employee Count"
                      placeholder="Total employees"
                      required
                      min={1}
                      {...form.getInputProps('employeeCount')}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <Select
                      label="Annual Revenue"
                      placeholder="Revenue range"
                      data={[
                        '<$1M', '$1M-5M', '$5M-15M', '$15M-40M', 
                        '$40M-100M', '$100M+', 'Not disclosed'
                      ]}
                      {...form.getInputProps('annualRevenue')}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TextInput
                      label="Funding Raised"
                      placeholder="e.g. $5M Series A"
                      {...form.getInputProps('fundingRaised')}
                    />
                  </Grid.Col>
                </Grid>

                <MultiSelect
                  label="Geographic Regions"
                  placeholder="Where do you operate?"
                  data={[
                    'North America', 'Europe', 'Asia-Pacific', 'Latin America',
                    'Middle East', 'Africa', 'Global'
                  ]}
                  {...form.getInputProps('geographicRegions')}
                />
              </Stack>
            )}

            {/* Step 1: Strategic Context */}
            {active === 1 && (
              <Stack gap="lg">
                <div>
                  <Title order={2} mb="md">Strategic Context</Title>
                  <Text c="dimmed" mb="xl">
                    Help us understand your strategic objectives and business model.
                  </Text>
                </div>

                <MultiSelect
                  label="Strategic Objectives"
                  placeholder="What are your main strategic goals?"
                  required
                  data={[
                    'Increase Market Share', 'Expand to New Markets', 'Launch New Products',
                    'Improve Profitability', 'Scale Team', 'Raise Funding',
                    'Improve Product Quality', 'Enhance Customer Experience',
                    'Operational Efficiency', 'Technology Innovation'
                  ]}
                  {...form.getInputProps('strategicObjectives')}
                />

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <MultiSelect
                      label="Key Products/Services"
                      placeholder="Your main offerings"
                      data={[]}
                      searchable
                      {...form.getInputProps('keyProducts')}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      label="Business Model"
                      placeholder="Primary business model"
                      data={[
                        'SaaS Subscription', 'Freemium', 'Enterprise Sales',
                        'Marketplace', 'E-commerce', 'Advertising',
                        'Transaction Fees', 'Professional Services', 'Other'
                      ]}
                      {...form.getInputProps('businessModel')}
                    />
                  </Grid.Col>
                </Grid>

                <MultiSelect
                  label="Target Markets"
                  placeholder="Who are your customers?"
                  data={[
                    'Enterprise (1000+ employees)', 'Mid-market (100-1000 employees)',
                    'Small Business (10-100 employees)', 'SMB (<10 employees)',
                    'Consumers', 'Developers', 'Product Managers', 'Sales Teams',
                    'Marketing Teams', 'HR Teams', 'Finance Teams'
                  ]}
                  {...form.getInputProps('targetMarkets')}
                />

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Textarea
                      label="Mission Statement"
                      placeholder="What is your company's mission?"
                      minRows={2}
                      {...form.getInputProps('missionStatement')}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Textarea
                      label="Vision Statement"
                      placeholder="Where do you see the company in 5-10 years?"
                      minRows={2}
                      {...form.getInputProps('visionStatement')}
                    />
                  </Grid.Col>
                </Grid>

                <MultiSelect
                  label="Core Values"
                  placeholder="What values drive your company?"
                  data={[
                    'Innovation', 'Customer Success', 'Transparency', 'Quality',
                    'Speed/Agility', 'Collaboration', 'Integrity', 'Excellence',
                    'Diversity & Inclusion', 'Sustainability', 'Ownership', 'Growth Mindset'
                  ]}
                  {...form.getInputProps('coreValues')}
                />
              </Stack>
            )}

            {/* Step 2: Market Position */}
            {active === 2 && (
              <Stack gap="lg">
                <div>
                  <Title order={2} mb="md">Market Position & Competition</Title>
                  <Text c="dimmed" mb="xl">
                    Tell us about your competitive landscape and current challenges.
                  </Text>
                </div>

                <Select
                  label="Market Position"
                  placeholder="How do you position in the market?"
                  data={MARKET_POSITIONS.map(pos => ({
                    value: pos.value,
                    label: pos.label,
                    description: pos.description
                  }))}
                  {...form.getInputProps('marketPosition')}
                />

                <MultiSelect
                  label="Main Competitors"
                  placeholder="Who are your primary competitors?"
                  data={[]}
                  searchable
                  {...form.getInputProps('mainCompetitors')}
                />

                <MultiSelect
                  label="Competitive Advantages"
                  placeholder="What makes you different/better?"
                  required
                  data={[
                    'Superior Technology', 'Better User Experience', 'Lower Cost',
                    'Faster Implementation', 'Better Support', 'Industry Expertise',
                    'Strong Brand', 'Network Effects', 'Data Advantage',
                    'Regulatory Compliance', 'Integration Capabilities', 'Customization'
                  ]}
                  {...form.getInputProps('competitiveAdvantages')}
                />

                <MultiSelect
                  label="Current Challenges"
                  placeholder="What are your biggest challenges right now?"
                  required
                  data={[
                    'Customer Acquisition', 'Customer Retention', 'Product Development',
                    'Team Scaling', 'Fundraising', 'Market Competition',
                    'Technical Debt', 'Operational Efficiency', 'Regulatory Compliance',
                    'International Expansion', 'Product-Market Fit', 'Pricing Strategy'
                  ]}
                  {...form.getInputProps('currentChallenges')}
                />

                <MultiSelect
                  label="Growth Opportunities"
                  placeholder="Where do you see growth potential?"
                  data={[
                    'New Customer Segments', 'Geographic Expansion', 'Product Extensions',
                    'Adjacent Markets', 'Partnership Opportunities', 'Technology Innovation',
                    'Acquisition Opportunities', 'Platform Strategy', 'API Monetization',
                    'Data Monetization', 'Community Building', 'Marketplace Creation'
                  ]}
                  {...form.getInputProps('growthOpportunities')}
                />

                <MultiSelect
                  label="Competitive Threats"
                  placeholder="What competitive threats are you monitoring?"
                  data={[
                    'New Market Entrants', 'Big Tech Competition', 'Open Source Alternatives',
                    'Changing Customer Needs', 'Technology Disruption', 'Regulatory Changes',
                    'Economic Downturn', 'Talent Competition', 'Supply Chain Issues',
                    'Cybersecurity Risks', 'Privacy Regulations', 'Platform Dependencies'
                  ]}
                  {...form.getInputProps('competitiveThreats')}
                />
              </Stack>
            )}

            {/* Step 3: Strategic Priorities & Tools */}
            {active === 3 && (
              <Stack gap="lg">
                <div>
                  <Title order={2} mb="md">Strategic Priorities & Tools</Title>
                  <Text c="dimmed" mb="xl">
                    Define your strategic priorities and tell us about your current tools.
                  </Text>
                </div>

                <MultiSelect
                  label="Strategic Priorities"
                  placeholder="What are your top strategic priorities?"
                  required
                  data={[
                    'Product Innovation', 'Market Expansion', 'Customer Success',
                    'Operational Excellence', 'Team Growth', 'Financial Performance',
                    'Brand Building', 'Partnership Development', 'Technology Infrastructure',
                    'Data & Analytics', 'Customer Acquisition', 'Retention Improvement'
                  ]}
                  {...form.getInputProps('strategicPriorities')}
                />

                <Accordion defaultValue="tools">
                  <Accordion.Item value="tools">
                    <Accordion.Control>
                      <Group>
                        <IconCode size={20} />
                        <div>
                          <Text fw={500}>Technology & Tools</Text>
                          <Text size="sm" c="dimmed">Optional: Help us understand your tech stack</Text>
                        </div>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Stack gap="md">
                        <MultiSelect
                          label="PM Tools Currently Used"
                          placeholder="Select your project management tools"
                          data={PM_TOOLS}
                          {...form.getInputProps('pmTools')}
                        />

                        <MultiSelect
                          label="Analytics Platforms"
                          placeholder="Select your analytics tools"
                          data={ANALYTICS_PLATFORMS}
                          {...form.getInputProps('analyticsPlatforms')}
                        />

                        <MultiSelect
                          label="Technology Stack"
                          placeholder="Select your main technologies"
                          data={TECH_STACK_OPTIONS}
                          {...form.getInputProps('techStack')}
                        />
                      </Stack>
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="team">
                    <Accordion.Control>
                      <Group>
                        <IconUsers size={20} />
                        <div>
                          <Text fw={500}>Team Structure</Text>
                          <Text size="sm" c="dimmed">Optional: Team composition details</Text>
                        </div>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Grid>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <NumberInput
                            label="Engineering Team Size"
                            placeholder="Number of engineers"
                            min={0}
                            {...form.getInputProps('engineeringTeamSize')}
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <NumberInput
                            label="Product Team Size"
                            placeholder="Number of product people"
                            min={0}
                            {...form.getInputProps('productTeamSize')}
                          />
                        </Grid.Col>
                      </Grid>

                      <MultiSelect
                        label="Company Culture"
                        placeholder="How would you describe your culture?"
                        data={[
                          'Fast-paced', 'Collaborative', 'Data-driven', 'Customer-focused',
                          'Innovation-focused', 'Results-oriented', 'Transparent', 'Flexible',
                          'Remote-first', 'Diverse & Inclusive', 'Learning-oriented', 'Autonomous'
                        ]}
                        {...form.getInputProps('companyCulture')}
                      />
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="decision-style">
                    <Accordion.Control>
                      <Group>
                        <IconBulb size={20} />
                        <div>
                          <Text fw={500}>Decision-Making Style</Text>
                          <Text size="sm" c="dimmed">Optional: How you make strategic decisions</Text>
                        </div>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Stack gap="md">
                        <Radio.Group
                          label="Decision-Making Style"
                          {...form.getInputProps('decisionMakingStyle')}
                        >
                          <Radio value="data_driven" label="Data-driven: Decisions based on metrics and analysis" />
                          <Radio value="intuitive" label="Intuitive: Decisions based on experience and gut feel" />
                          <Radio value="collaborative" label="Collaborative: Team consensus and input" />
                          <Radio value="hierarchical" label="Hierarchical: Top-down decision making" />
                        </Radio.Group>

                        <Radio.Group
                          label="Risk Tolerance"
                          {...form.getInputProps('riskTolerance')}
                        >
                          <Radio value="conservative" label="Conservative: Prefer proven approaches" />
                          <Radio value="moderate" label="Moderate: Balance risk and reward" />
                          <Radio value="aggressive" label="Aggressive: Willing to take big risks" />
                        </Radio.Group>

                        <Radio.Group
                          label="Innovation Approach"
                          {...form.getInputProps('innovationApproach')}
                        >
                          <Radio value="first_mover" label="First Mover: Pioneer new markets/technologies" />
                          <Radio value="fast_follower" label="Fast Follower: Quick to adopt proven innovations" />
                          <Radio value="balanced" label="Balanced: Mix of innovation and stability" />
                        </Radio.Group>
                      </Stack>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Stack>
            )}

            {/* Step 4: Review */}
            {active === 4 && (
              <Stack gap="lg">
                <div>
                  <Title order={2} mb="md">Review Your Profile</Title>
                  <Text c="dimmed" mb="xl">
                    Review your company profile before creating it. Our AI teams will use this context 
                    to provide personalized strategic intelligence.
                  </Text>
                </div>

                {/* Profile Summary Cards */}
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Card p="lg" radius="md">
                      <Group mb="md">
                        <IconBuilding size={24} color="blue" />
                        <Title order={4}>Company Overview</Title>
                      </Group>
                      <Stack gap="sm">
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">Company:</Text>
                          <Text size="sm" fw={500}>{form.values.companyName || 'Not specified'}</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">Industry:</Text>
                          <Text size="sm" fw={500}>{INDUSTRY_OPTIONS.find(i => i.value === form.values.industry)?.label || 'Not specified'}</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">Stage:</Text>
                          <Text size="sm" fw={500}>{COMPANY_STAGES.find(s => s.value === form.values.companyStage)?.label.split(' ')[0] || 'Not specified'}</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">Size:</Text>
                          <Text size="sm" fw={500}>{form.values.employeeCount || 0} employees</Text>
                        </Group>
                      </Stack>
                    </Card>
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Card p="lg" radius="md">
                      <Group mb="md">
                        <IconTarget size={24} color="green" />
                        <Title order={4}>Strategic Context</Title>
                      </Group>
                      <Stack gap="sm">
                        <div>
                          <Text size="sm" c="dimmed" mb="xs">Objectives ({form.values.strategicObjectives.length}):</Text>
                          {form.values.strategicObjectives.slice(0, 3).map((obj, index) => (
                            <Badge key={index} variant="light" size="sm" mr="xs" mb="xs">{obj}</Badge>
                          ))}
                          {form.values.strategicObjectives.length > 3 && (
                            <Badge variant="dot" size="sm">+{form.values.strategicObjectives.length - 3} more</Badge>
                          )}
                        </div>
                        <div>
                          <Text size="sm" c="dimmed" mb="xs">Priorities ({form.values.strategicPriorities.length}):</Text>
                          {form.values.strategicPriorities.slice(0, 3).map((priority, index) => (
                            <Badge key={index} variant="light" color="blue" size="sm" mr="xs" mb="xs">{priority}</Badge>
                          ))}
                          {form.values.strategicPriorities.length > 3 && (
                            <Badge variant="dot" color="blue" size="sm">+{form.values.strategicPriorities.length - 3} more</Badge>
                          )}
                        </div>
                      </Stack>
                    </Card>
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Card p="lg" radius="md">
                      <Group mb="md">
                        <IconGraph size={24} color="orange" />
                        <Title order={4}>Market Position</Title>
                      </Group>
                      <Stack gap="sm">
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">Position:</Text>
                          <Text size="sm" fw={500}>{MARKET_POSITIONS.find(p => p.value === form.values.marketPosition)?.label || 'Not specified'}</Text>
                        </Group>
                        <div>
                          <Text size="sm" c="dimmed" mb="xs">Advantages ({form.values.competitiveAdvantages.length}):</Text>
                          {form.values.competitiveAdvantages.slice(0, 2).map((advantage, index) => (
                            <Badge key={index} variant="light" color="green" size="sm" mr="xs" mb="xs">{advantage}</Badge>
                          ))}
                        </div>
                        <div>
                          <Text size="sm" c="dimmed" mb="xs">Challenges ({form.values.currentChallenges.length}):</Text>
                          {form.values.currentChallenges.slice(0, 2).map((challenge, index) => (
                            <Badge key={index} variant="light" color="red" size="sm" mr="xs" mb="xs">{challenge}</Badge>
                          ))}
                        </div>
                      </Stack>
                    </Card>
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Card p="lg" radius="md">
                      <Group mb="md">
                        <IconCode size={24} color="violet" />
                        <Title order={4}>Tools & Culture</Title>
                      </Group>
                      <Stack gap="sm">
                        <div>
                          <Text size="sm" c="dimmed" mb="xs">PM Tools ({form.values.pmTools.length}):</Text>
                          {form.values.pmTools.slice(0, 3).map((tool, index) => (
                            <Badge key={index} variant="dot" color="violet" size="sm" mr="xs">{tool}</Badge>
                          ))}
                        </div>
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">Decision Style:</Text>
                          <Text size="sm" fw={500}>{form.values.decisionMakingStyle.replace('_', ' ')}</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">Risk Tolerance:</Text>
                          <Text size="sm" fw={500}>{form.values.riskTolerance}</Text>
                        </Group>
                      </Stack>
                    </Card>
                  </Grid.Col>
                </Grid>

                {/* AI Intelligence Preview */}
                <Alert color="blue" title="🧠 AI Intelligence Preview" icon={<IconSparkles size={16} />}>
                  <Text size="sm">
                    Based on your profile, our AI teams will provide:
                  </Text>
                  <ul style={{ marginTop: 8, marginBottom: 0 }}>
                    <li><strong>Strategic Intelligence:</strong> {form.values.industry}-specific frameworks and competitive analysis</li>
                    <li><strong>Workflow Execution:</strong> Optimized task generation for {form.values.pmTools.join(', ') || 'your PM tools'}</li>
                    <li><strong>Data Intelligence:</strong> Pattern recognition based on {form.values.companyStage} stage companies</li>
                    <li><strong>Communication:</strong> Stakeholder messaging aligned with {form.values.decisionMakingStyle.replace('_', ' ')} culture</li>
                  </ul>
                </Alert>
              </Stack>
            )}

            {/* Navigation */}
            <Group justify="space-between" mt="xl">
              <Button 
                variant="light" 
                onClick={prevStep}
                disabled={active === 0}
                leftSection={<IconChevronLeft size={16} />}
              >
                Previous
              </Button>

              <Group>
                <Text size="sm" c="dimmed">
                  Step {active + 1} of 5
                </Text>
                
                {active < 4 ? (
                  <Button 
                    onClick={nextStep}
                    rightSection={<IconChevronRight size={16} />}
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    loading={isLoading}
                    gradient={{ from: 'blue', to: 'violet' }}
                    variant="gradient"
                    rightSection={<IconSparkles size={16} />}
                  >
                    Create Profile
                  </Button>
                )}
              </Group>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}