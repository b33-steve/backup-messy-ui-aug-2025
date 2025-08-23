/**
 * Component: ExecutiveSummary
 * Location: app/frontend/components/communication/ExecutiveSummary.tsx
 * Purpose: Frontend component for generating AI-powered executive summaries from strategic analysis
 * Features: Provides professional template selection, context-aware content generation, and multi-format export
 * RELEVANT FILES: communication_service.py, strategic_intelligence_service.py, StakeholderUpdates.tsx, AlignmentDashboard.tsx
 */

'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  Text,
  Button,
  Group,
  Stack,
  Select,
  Textarea,
  MultiSelect,
  Badge,
  Paper,
  Title,
  Divider,
  LoadingOverlay,
  ActionIcon,
  Modal,
  Tooltip,
  Alert,
  Menu,
  Progress,
  ThemeIcon,
  Transition,
  Kbd
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useHotkeys } from '@mantine/hooks';
import {
  IconFileText,
  IconDownload,
  IconEdit,
  IconEye,
  IconShare,
  IconCopy,
  IconCheck,
  IconAlertCircle,
  IconSparkles,
  IconBulb,
  IconTrendingUp,
  IconUsers,
  IconTarget,
  IconCalendar,
  IconFileExport,
  IconRocket,
  IconBrain
} from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';

// Import UX enhancement components (disabled for build)
// import { usePM33UX } from '../shared/PM33UXProvider';
// import { AIEnhancedField, AIEnhancedForm, KeyboardShortcuts } from '../shared/AIEnhancedForm';
// import { CelebrationMoment, QuickWinsDisplay } from '../shared/CelebrationMoment';
// import { SmartNotification, AnxietyReducingNotifications } from '../shared/SmartNotification';
// import { PredictiveNavigation, SmartBreadcrumbs } from '../shared/PredictiveNavigation';

// TypeScript interfaces for executive summary
interface StrategicContext {
  analysis_results: Record<string, any>;
  key_insights: string[];
  recommendations: string[];
  metrics: Record<string, string | number>;
  timeframe: string;
  framework_used: string;
}

interface ExecutiveSummaryRequest {
  company_id: string;
  strategic_context: Record<string, any>;
  timeframe: string;
  focus_areas: string[];
  audience_level: string;
}

interface ExecutiveSummaryResponse {
  summary: {
    title: string;
    content: string;
    structure: string[];
    metadata: {
      generated_at: string;
      template_used: Record<string, any>;
      word_count: number;
    };
  };
  template_used: string;
  generated_at: string;
  company_id: string;
  export_formats: string[];
  editable_sections: string[];
}

interface ExportOptions {
  format: 'pdf' | 'docx' | 'html' | 'markdown' | 'powerpoint';
  include_branding: boolean;
  custom_styling: boolean;
}

const ExecutiveSummary: React.FC = () => {
  // State management for executive summary generation
  const [loading, setLoading] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState<ExecutiveSummaryResponse | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [strategicData, setStrategicData] = useState<StrategicContext | null>(null);
  const [availableAnalyses, setAvailableAnalyses] = useState<Array<{ value: string; label: string }>>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState<any>(null);
  const [impactPreview, setImpactPreview] = useState<any>(null);
  
  // UX Enhancement hooks (disabled for build)
  // const { 
  //   addQuickWin, 
  //   showSmartNotification, 
  //   triggerCelebration, 
  //   previewImpact, 
  //   getSmartDefaults,
  //   recordUserAction,
  //   reduceAnxiety
  // } = usePM33UX();
  
  // Form for executive summary generation
  const summaryForm = useForm<ExecutiveSummaryRequest>({
    initialValues: {
      company_id: '',
      strategic_context: {},
      timeframe: 'quarterly',
      focus_areas: [],
      audience_level: 'executive'
    },
    validate: {
      company_id: (value) => value.length === 0 ? 'Company selection is required' : null,
      timeframe: (value) => !value ? 'Timeframe is required' : null,
    }
  });

  // Available focus areas for executive summaries
  const focusAreaOptions = [
    { value: 'strategic_initiatives', label: 'Strategic Initiatives' },
    { value: 'market_position', label: 'Market Position' },
    { value: 'competitive_analysis', label: 'Competitive Analysis' },
    { value: 'financial_performance', label: 'Financial Performance' },
    { value: 'operational_efficiency', label: 'Operational Efficiency' },
    { value: 'innovation_pipeline', label: 'Innovation Pipeline' },
    { value: 'risk_management', label: 'Risk Management' },
    { value: 'stakeholder_value', label: 'Stakeholder Value' }
  ];

  // Timeframe options for executive summaries
  const timeframeOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annual', label: 'Annual' },
    { value: 'custom', label: 'Custom Period' }
  ];

  // Audience level options
  const audienceOptions = [
    { value: 'executive', label: 'C-Suite Executives' },
    { value: 'senior_management', label: 'Senior Management' },
    { value: 'board', label: 'Board of Directors' },
    { value: 'investors', label: 'Investors & Stakeholders' }
  ];

  // Load available strategic analyses on component mount
  useEffect(() => {
    const loadAvailableAnalyses = async () => {
      try {
        // This would fetch from strategic intelligence service
        const mockAnalyses = [
          { value: 'analysis_1', label: 'Q4 2024 Strategic Analysis (RICE Framework)' },
          { value: 'analysis_2', label: 'Competitive Landscape Analysis (Porter\'s Five Forces)' },
          { value: 'analysis_3', label: 'Market Positioning Analysis (ICE Framework)' }
        ];
        setAvailableAnalyses(mockAnalyses);
      } catch (error) {
        console.error('Failed to load strategic analyses:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to load available strategic analyses',
          color: 'red',
          icon: <IconAlertCircle size={16} />
        });
      }
    };

    loadAvailableAnalyses();
  }, []);

  // Generate executive summary using Communication AI Team with UX enhancements
  const handleGenerateSummary = async (values: ExecutiveSummaryRequest) => {
    setLoading(true);
    // recordUserAction('generate_executive_summary', 'communication');
    
    // Show anxiety-reducing notification
    // showSmartNotification(
    //   AnxietyReducingNotifications.processing('Generating your executive summary'),
    //   {}
    // );

    try {
      // Preview impact before generation
      // const impact = await previewImpact('generate_executive_summary', values);
      // setImpactPreview(impact);

      // Call communication service API
      const response = await fetch('/api/communication/executive-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (!response.ok) throw new Error('Failed to generate executive summary');

      const summaryData: ExecutiveSummaryResponse = await response.json();
      setGeneratedSummary(summaryData);
      
      // Add quick win for successful generation
      // addQuickWin({
      //   title: 'Executive Summary Generated',
      //   description: `Created ${summaryData.summary.metadata.word_count} word professional summary`,
      //   impact: 'high',
      //   category: 'goal_achieved',
      //   value: 15
      // });

      // Trigger celebration
      setCelebrationData({
        title: 'Executive Summary Complete!',
        description: `Professional ${summaryData.summary.metadata.word_count}-word summary ready`,
        value: summaryData.summary.metadata.word_count,
        impact: 'high'
      });
      setShowCelebration(true);

      // Smart notification with success message
      // showSmartNotification(
      //   AnxietyReducingNotifications.success('Executive summary generated successfully'),
      //   {}
      // );

    } catch (error) {
      console.error('Executive summary generation failed:', error);
      
      // Anxiety-reducing error handling
      // reduceAnxiety(
      //   'Something went wrong with the summary generation', 
      //   'Our AI systems are self-healing. Let\'s try a different approach automatically.'
      // );
      
      // showSmartNotification(
      //   AnxietyReducingNotifications.error('Generation encountered an issue'),
      //   {}
      // );
    } finally {
      setLoading(false);
    }
  };

  // Load strategic context when analysis is selected
  const handleAnalysisSelection = async (analysisId: string) => {
    try {
      // This would fetch strategic analysis results
      const mockStrategicData: StrategicContext = {
        analysis_results: {
          strategic_score: 8.5,
          market_opportunity: 'High',
          competitive_advantage: 'Strong',
          execution_risk: 'Medium'
        },
        key_insights: [
          'Market opportunity in enterprise segment shows 40% growth potential',
          'Competitive positioning strengthened by unique AI capabilities',
          'Strategic initiative alignment with customer needs at 85%'
        ],
        recommendations: [
          'Accelerate enterprise market penetration',
          'Invest in AI platform differentiation',
          'Enhance customer success programs'
        ],
        metrics: {
          strategic_alignment: '85%',
          market_readiness: '92%',
          execution_confidence: '78%'
        },
        timeframe: 'Q4 2024',
        framework_used: 'RICE Framework'
      };

      setStrategicData(mockStrategicData);
      summaryForm.setFieldValue('strategic_context', mockStrategicData.analysis_results);
      summaryForm.setFieldValue('company_id', analysisId);

    } catch (error) {
      console.error('Failed to load strategic context:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to load strategic analysis context',
        color: 'red',
        icon: <IconAlertCircle size={16} />
      });
    }
  };

  // Export executive summary in selected format
  const handleExportSummary = async (exportOptions: ExportOptions) => {
    if (!generatedSummary) return;

    try {
      const response = await fetch('/api/communication/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: generatedSummary.summary,
          format_type: exportOptions.format,
          company_id: generatedSummary.company_id,
          options: exportOptions
        })
      });

      if (!response.ok) throw new Error('Export failed');

      const exportResult = await response.json();
      
      // Create download link
      const downloadLink = document.createElement('a');
      downloadLink.href = exportResult.export_url;
      downloadLink.download = `executive_summary.${exportOptions.format}`;
      downloadLink.click();

      notifications.show({
        title: 'Export Successful',
        message: `Executive summary exported as ${exportOptions.format.toUpperCase()}`,
        color: 'green',
        icon: <IconCheck size={16} />
      });

      setExportModalOpen(false);

    } catch (error) {
      console.error('Export failed:', error);
      notifications.show({
        title: 'Export Failed',
        message: 'Failed to export executive summary. Please try again.',
        color: 'red',
        icon: <IconAlertCircle size={16} />
      });
    }
  };

  // Copy summary content to clipboard
  const handleCopyContent = async () => {
    if (!generatedSummary) return;

    try {
      await navigator.clipboard.writeText(generatedSummary.summary.content);
      notifications.show({
        title: 'Copied',
        message: 'Executive summary content copied to clipboard',
        color: 'blue',
        icon: <IconCopy size={16} />
      });
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  // Render strategic context preview
  const renderStrategicContext = () => {
    if (!strategicData) return null;

    return (
      <Paper p="md" withBorder radius="md" style={{ backgroundColor: 'var(--mantine-color-blue-0)' }}>
        <Group justify="space-between" mb="md">
          <Title order={4}>
            <IconBulb size={20} style={{ marginRight: 8 }} />
            Strategic Context
          </Title>
          <Badge variant="light" color="blue">
            {strategicData.framework_used}
          </Badge>
        </Group>

        <Stack gap="sm">
          <Group>
            <Text size="sm" fw={500}>Key Insights:</Text>
            <Badge variant="dot" color="green">
              {strategicData.key_insights.length} insights
            </Badge>
          </Group>
          
          <Stack gap={4}>
            {strategicData.key_insights.slice(0, 3).map((insight, index) => (
              <Text key={index} size="sm" c="dimmed">
                • {insight}
              </Text>
            ))}
          </Stack>

          <Group mt="md">
            <Text size="sm" fw={500}>Strategic Metrics:</Text>
          </Group>
          
          <Group>
            {Object.entries(strategicData.metrics).map(([key, value]) => (
              <Badge key={key} variant="outline">
                {key.replace('_', ' ')}: {value}
              </Badge>
            ))}
          </Group>
        </Stack>
      </Paper>
    );
  };

  // Render generated summary with edit capabilities
  const renderGeneratedSummary = () => {
    if (!generatedSummary) return null;

    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={3}>
            <IconFileText size={24} style={{ marginRight: 8 }} />
            {generatedSummary.summary.title}
          </Title>
          
          <Group>
            <Tooltip label="Edit Content">
              <ActionIcon
                variant={editMode ? "filled" : "light"}
                color="blue"
                onClick={() => setEditMode(!editMode)}
              >
                <IconEdit size={16} />
              </ActionIcon>
            </Tooltip>
            
            <Tooltip label="Preview">
              <ActionIcon
                variant={previewMode ? "filled" : "light"}
                color="green"
                onClick={() => setPreviewMode(!previewMode)}
              >
                <IconEye size={16} />
              </ActionIcon>
            </Tooltip>
            
            <Tooltip label="Copy Content">
              <ActionIcon variant="light" color="gray" onClick={handleCopyContent}>
                <IconCopy size={16} />
              </ActionIcon>
            </Tooltip>
            
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button leftSection={<IconDownload size={16} />} variant="light">
                  Export
                </Button>
              </Menu.Target>
              
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconFileExport size={16} />}
                  onClick={() => setExportModalOpen(true)}
                >
                  Export Options
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconShare size={16} />}
                  onClick={handleCopyContent}
                >
                  Copy to Clipboard
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>

        <Stack gap="md">
          {/* Summary metadata */}
          <Group>
            <Badge variant="light" color="blue">
              {generatedSummary.template_used.replace('_', ' ')}
            </Badge>
            <Badge variant="light" color="green">
              {generatedSummary.summary.metadata.word_count} words
            </Badge>
            <Badge variant="light" color="orange">
              Generated {new Date(generatedSummary.generated_at).toLocaleDateString()}
            </Badge>
          </Group>

          {/* Summary content */}
          <Divider />
          
          {editMode ? (
            <Textarea
              value={generatedSummary.summary.content}
              onChange={(e) => {/* handle content change */}}
              minRows={10}
              autosize
              placeholder="Edit summary content..."
            />
          ) : (
            <Paper p="md" withBorder radius="md">
              <div
                dangerouslySetInnerHTML={{ __html: generatedSummary.summary.content }}
                style={{ 
                  lineHeight: 1.6,
                  fontSize: '14px',
                  whiteSpace: 'pre-wrap'
                }}
              />
            </Paper>
          )}

          {/* Summary structure overview */}
          <Group mt="md">
            <Text size="sm" fw={500}>Document Structure:</Text>
            {generatedSummary.summary.structure.map((section, index) => (
              <Badge key={index} variant="outline" size="sm">
                {section}
              </Badge>
            ))}
          </Group>

          {/* Editable sections */}
          {generatedSummary.editable_sections.length > 0 && (
            <Alert
              icon={<IconSparkles size={16} />}
              title="AI-Enhanced Sections"
              color="blue"
              variant="light"
            >
              <Text size="sm">
                These sections can be edited and regenerated with AI assistance: {' '}
                {generatedSummary.editable_sections.join(', ')}
              </Text>
            </Alert>
          )}
        </Stack>
      </Card>
    );
  };

  // Export modal component
  const renderExportModal = () => (
    <Modal
      opened={exportModalOpen}
      onClose={() => setExportModalOpen(false)}
      title="Export Executive Summary"
      size="md"
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Choose export format and options for your executive summary.
        </Text>

        <Select
          label="Export Format"
          placeholder="Select format"
          data={[
            { value: 'pdf', label: 'PDF Document' },
            { value: 'docx', label: 'Microsoft Word' },
            { value: 'powerpoint', label: 'PowerPoint Presentation' },
            { value: 'html', label: 'HTML Web Page' },
            { value: 'markdown', label: 'Markdown Text' }
          ]}
          defaultValue="pdf"
        />

        <Group justify="flex-end" mt="xl">
          <Button variant="light" onClick={() => setExportModalOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => handleExportSummary({
              format: 'pdf',
              include_branding: true,
              custom_styling: false
            })}
          >
            Export
          </Button>
        </Group>
      </Stack>
    </Modal>
  );

  // Keyboard shortcuts for power users
  useHotkeys([
    ['mod+Enter', () => summaryForm.onSubmit(handleGenerateSummary)()],
    ['mod+E', () => setEditMode(!editMode)],
    ['mod+P', () => setPreviewMode(!previewMode)],
    ['Escape', () => { setEditMode(false); setPreviewMode(false); }],
  ]);

  const keyboardShortcuts = [
    { key: '⌘ + Enter', description: 'Generate Summary', action: () => summaryForm.onSubmit(handleGenerateSummary)() },
    { key: '⌘ + E', description: 'Toggle Edit Mode', action: () => setEditMode(!editMode) },
    { key: '⌘ + P', description: 'Toggle Preview', action: () => setPreviewMode(!previewMode) },
    { key: 'Escape', description: 'Exit Modes', action: () => { setEditMode(false); setPreviewMode(false); } },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
      <LoadingOverlay visible={loading} overlayProps={{ radius: "sm", blur: 2 }} />
      
      {/* Celebration Moment */}
      {/* {showCelebration && celebrationData && (
        <CelebrationMoment
          type="achievement"
          data={celebrationData}
          onComplete={() => setShowCelebration(false)}
        />
      )} */}
      
      {/* Smart Breadcrumbs */}
      {/* <SmartBreadcrumbs
        currentPage="Executive Summary Generator"
        parentPages={[
          { label: 'Communication', path: '/communication' },
          { label: 'AI Team', path: '/communication/ai-team' }
        ]}
      /> */}
      
      {/* Header with UX enhancements */}
      <Stack gap="lg" mb="xl" mt="md">
        <Group justify="space-between">
          <div>
            <Group gap="md" align="center">
              <ThemeIcon size="xl" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                <IconTrendingUp size={24} />
              </ThemeIcon>
              <div>
                <Title order={1} mb="xs">
                  Executive Summary Generator
                </Title>
                <Text c="dimmed" size="lg">
                  AI-powered executive summaries with smart assistance
                </Text>
              </div>
            </Group>
          </div>
          
          <Group gap="md">
            {/* <KeyboardShortcuts shortcuts={keyboardShortcuts} /> */}
            <Badge size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
              <IconBrain size={16} style={{ marginRight: 4 }} />
              Communication AI Team
            </Badge>
          </Group>
        </Group>

        {/* Quick wins display */}
        {/* <QuickWinsDisplay limit={3} showProgress={true} /> */}

        <Alert
          icon={<IconSparkles size={16} />}
          title="🚀 AI-Enhanced Executive Communication"
          color="blue"
          variant="light"
        >
          <Group justify="space-between" align="center">
            <Text size="sm">
              Smart form pre-filling • Impact previews • Celebration moments • Anxiety-free UX
            </Text>
            <Group gap="xs">
              <Kbd>⌘</Kbd>
              <Text size="xs">+</Text>
              <Kbd>Enter</Kbd>
              <Text size="xs" c="dimmed">to generate</Text>
            </Group>
          </Group>
        </Alert>

        {/* Impact Preview */}
        {impactPreview && (
          <Transition
            mounted={!!impactPreview}
            transition="fade"
            duration={300}
          >
            {(styles) => (
              <Alert
                style={styles}
                icon={<IconRocket size={16} />}
                title="📊 Impact Preview"
                color="yellow"
                variant="light"
              >
                <Group gap="md">
                  <Badge variant="light" color="green">
                    {impactPreview.estimated_time_saved}h saved
                  </Badge>
                  <Badge variant="light" color="blue">
                    +{impactPreview.efficiency_gain}% efficiency
                  </Badge>
                  <Badge variant="light" color="violet">
                    {impactPreview.strategic_alignment}% alignment
                  </Badge>
                  <Badge variant="light" color="orange">
                    {impactPreview.confidence}% confidence
                  </Badge>
                </Group>
              </Alert>
            )}
          </Transition>
        )}

        {/* Predictive Navigation */}
        {/* <PredictiveNavigation /> */}
      </Stack>

      {/* AI-Enhanced Summary Generation Form */}
      <Card withBorder padding="lg">
        <form onSubmit={summaryForm.onSubmit(handleGenerateSummary)}>
          <Stack gap="md">
            <Title order={3} mb="md">
              <IconRocket size={20} style={{ marginRight: 8 }} />
              Executive Summary Configuration
            </Title>

            <Select
              label="Template Style" 
              placeholder="Select summary template"
              data={[
                { value: 'executive', label: 'Executive Brief' },
                { value: 'strategic', label: 'Strategic Overview' },
                { value: 'detailed', label: 'Detailed Analysis' }
              ]}
              {...summaryForm.getInputProps('template_style')}
            />

            <Button type="submit" loading={loading}>
              Generate Executive Summary
            </Button>
          </Stack>
        </form>
      </Card>

      {/* Generated Summary Display */}
      {generatedSummary && renderGeneratedSummary()}

      {/* Export Modal */}
      {renderExportModal()}
    </div>
  );
};

export default ExecutiveSummary;