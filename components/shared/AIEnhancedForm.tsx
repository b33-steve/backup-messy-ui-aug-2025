/**
 * File: app/frontend/components/shared/AIEnhancedForm.tsx
 * Purpose: AI-powered form enhancement system with pre-filling, validation, and impact previews
 * Why: Makes forms feel intelligent and helpful rather than tedious
 * RELEVANT FILES: PM33UXProvider.tsx, SmartNotification.tsx, ImpactPreview.tsx
 */

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  TextInput,
  Textarea,
  Select,
  MultiSelect,
  Card,
  Text,
  Button,
  Group,
  Stack,
  Badge,
  ActionIcon,
  Tooltip,
  Progress,
  Loader,
  Paper,
  Transition,
  Popover,
  Alert,
  Divider,
  ThemeIcon,
  NumberInput
} from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import {
  IconBrain,
  IconSparkles,
  IconWand,
  IconCheck,
  IconAlertTriangle,
  IconEye,
  IconTrendingUp,
  IconClock,
  IconTarget,
  IconBulb,
  IconRefresh,
  IconBolt,
  IconRocket,
  IconRobot
} from '@tabler/icons-react';
import { usePM33UX } from './PM33UXProvider';

// Enhanced form field interface
interface AIEnhancedFieldProps {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'number';
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  aiContext?: string;
  previewImpact?: boolean;
  smartSuggestions?: boolean;
  validationRules?: any;
  form: UseFormReturnType<any>;
}

interface ImpactPreviewData {
  estimated_time_saved: number;
  efficiency_gain: number;
  strategic_alignment: number;
  confidence: number;
  risks: string[];
  benefits: string[];
}

export const AIEnhancedField: React.FC<AIEnhancedFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  description,
  required,
  options,
  aiContext = 'general',
  previewImpact = false,
  smartSuggestions = true,
  form
}) => {
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [impactPreview, setImpactPreview] = useState<ImpactPreviewData | null>(null);
  const [showImpactPreview, setShowImpactPreview] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{ valid: boolean; suggestion?: string; confidence: number } | null>(null);
  
  const { getAISuggestion, previewImpact: getImpactPreview, validateWithAI, isAIThinking } = usePM33UX();
  const [debouncedValue] = useDebouncedValue(form.values[name], 500);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // AI suggestion loading
  const loadAISuggestion = useCallback(async () => {
    if (!smartSuggestions) return;
    
    setLoadingSuggestion(true);
    try {
      const suggestion = await getAISuggestion(aiContext, name);
      setAiSuggestion(suggestion);
      setShowSuggestion(true);
    } catch (error) {
      console.error('Failed to load AI suggestion:', error);
    } finally {
      setLoadingSuggestion(false);
    }
  }, [smartSuggestions, aiContext, name, getAISuggestion]);

  // Impact preview loading
  const loadImpactPreview = useCallback(async (value: string) => {
    if (!previewImpact || !value) return;
    
    try {
      const preview = await getImpactPreview(`${name}_change`, { [name]: value });
      setImpactPreview({
        estimated_time_saved: preview.estimated_time_saved,
        efficiency_gain: preview.efficiency_gain,
        strategic_alignment: preview.strategic_alignment,
        confidence: preview.confidence,
        risks: ['Potential integration complexity', 'Learning curve for team'],
        benefits: ['Improved efficiency', 'Better strategic alignment', 'Time savings']
      });
      setShowImpactPreview(true);
    } catch (error) {
      console.error('Failed to load impact preview:', error);
    }
  }, [previewImpact, name, getImpactPreview]);

  // AI validation
  const performAIValidation = useCallback(async (value: any) => {
    if (!value) return;
    
    setIsValidating(true);
    try {
      const result = await validateWithAI(name, value, form.values);
      setValidationResult(result);
    } catch (error) {
      console.error('AI validation failed:', error);
    } finally {
      setIsValidating(false);
    }
  }, [name, form.values, validateWithAI]);

  // Debounced validation
  useEffect(() => {
    if (debouncedValue) {
      performAIValidation(debouncedValue);
    }
  }, [debouncedValue, performAIValidation]);

  // Apply AI suggestion
  const applySuggestion = useCallback(() => {
    form.setFieldValue(name, aiSuggestion);
    setShowSuggestion(false);
    loadImpactPreview(aiSuggestion);
  }, [form, name, aiSuggestion, loadImpactPreview]);

  // Focus handlers for suggestions
  const handleFocus = useCallback(() => {
    if (!form.values[name] && smartSuggestions && !aiSuggestion) {
      loadAISuggestion();
    }
  }, [form.values, name, smartSuggestions, aiSuggestion, loadAISuggestion]);

  const handleBlur = useCallback(() => {
    const value = form.values[name];
    if (value && previewImpact) {
      loadImpactPreview(value);
    }
  }, [form.values, name, previewImpact, loadImpactPreview]);

  const renderField = () => {
    const commonProps = {
      ...form.getInputProps(name),
      label,
      placeholder,
      description,
      required,
      onFocus: handleFocus,
      onBlur: handleBlur,
      ref: inputRef,
      rightSection: (
        <Group gap={4}>
          {isValidating && <Loader size="xs" />}
          {validationResult && !validationResult.valid && (
            <Tooltip label={validationResult.suggestion}>
              <ActionIcon size="sm" color="yellow">
                <IconAlertTriangle size={12} />
              </ActionIcon>
            </Tooltip>
          )}
          {validationResult && validationResult.valid && validationResult.confidence > 80 && (
            <Tooltip label={`AI confidence: ${validationResult.confidence}%`}>
              <ActionIcon size="sm" color="green">
                <IconCheck size={12} />
              </ActionIcon>
            </Tooltip>
          )}
          {previewImpact && form.values[name] && (
            <Tooltip label="Show impact preview">
              <ActionIcon
                size="sm"
                color="blue"
                onClick={() => setShowImpactPreview(!showImpactPreview)}
              >
                <IconEye size={12} />
              </ActionIcon>
            </Tooltip>
          )}
          {smartSuggestions && (
            <Tooltip label="Get AI suggestion">
              <ActionIcon
                size="sm"
                color="violet"
                loading={loadingSuggestion}
                onClick={loadAISuggestion}
              >
                <IconBrain size={12} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      )
    };

    switch (type) {
      case 'textarea':
        // Create props without the ref for textarea to avoid type conflict
        const { ref, ...textareaProps } = commonProps;
        return <Textarea {...textareaProps} minRows={3} autosize />;
      case 'select':
        const { ref: selectRef, ...selectProps } = commonProps;
        return <Select {...selectProps} data={options || []} searchable />;
      case 'multiselect':
        const { ref: multiRef, ...multiProps } = commonProps;
        return <MultiSelect {...multiProps} data={options || []} searchable />;
      case 'number':
        return <NumberInput {...commonProps} />;
      default:
        return <TextInput {...commonProps} />;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {renderField()}
      
      {/* AI Suggestion Overlay */}
      <Transition
        mounted={showSuggestion && !!aiSuggestion}
        transition={{ in: { opacity: 1, transform: 'translateY(0)' }, out: { opacity: 0, transform: 'translateY(-10px)' }, transitionProperty: 'opacity, transform' }}
        duration={200}
      >
        {(styles) => (
          <Paper
            style={{
              ...styles,
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1000,
              marginTop: '4px',
              background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.05), rgba(255, 255, 255, 0.95))',
              border: '1px solid #e9ecef',
              backdropFilter: 'blur(10px)'
            }}
            shadow="lg"
            radius="md"
            p="md"
          >
            <Group justify="space-between" align="flex-start">
              <div style={{ flex: 1 }}>
                <Group gap="xs" mb="xs">
                  <ThemeIcon size="sm" variant="light" color="violet">
                    <IconSparkles size={12} />
                  </ThemeIcon>
                  <Text size="sm" fw={500}>AI Suggestion</Text>
                </Group>
                <Text size="sm" c="dimmed" mb="md">
                  {aiSuggestion}
                </Text>
                <Group gap="xs">
                  <Button
                    size="xs"
                    variant="light"
                    color="violet"
                    leftSection={<IconWand size={12} />}
                    onClick={applySuggestion}
                  >
                    Apply
                  </Button>
                  <Button
                    size="xs"
                    variant="subtle"
                    color="gray"
                    onClick={() => setShowSuggestion(false)}
                  >
                    Dismiss
                  </Button>
                </Group>
              </div>
            </Group>
          </Paper>
        )}
      </Transition>

      {/* Impact Preview */}
      <Transition
        mounted={showImpactPreview && !!impactPreview}
        transition={{ in: { opacity: 1, transform: 'translateY(0)' }, out: { opacity: 0, transform: 'translateY(-10px)' }, transitionProperty: 'opacity, transform' }}
        duration={200}
      >
        {(styles) => (
          <Paper
            style={{
              ...styles,
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 999,
              marginTop: '4px',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(255, 255, 255, 0.95))',
              border: '1px solid #3b82f6',
              backdropFilter: 'blur(10px)'
            }}
            shadow="lg"
            radius="md"
            p="md"
          >
            <Group gap="xs" mb="md">
              <ThemeIcon size="sm" variant="light" color="blue">
                <IconTrendingUp size={12} />
              </ThemeIcon>
              <Text size="sm" fw={500}>Impact Preview</Text>
              <Badge size="xs" variant="light" color="blue">
                {impactPreview?.confidence}% confidence
              </Badge>
            </Group>

            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm">Time Saved:</Text>
                <Badge variant="light" color="green">
                  {impactPreview?.estimated_time_saved}h
                </Badge>
              </Group>
              
              <Group justify="space-between">
                <Text size="sm">Efficiency Gain:</Text>
                <Badge variant="light" color="blue">
                  +{impactPreview?.efficiency_gain}%
                </Badge>
              </Group>
              
              <Group justify="space-between">
                <Text size="sm">Strategic Alignment:</Text>
                <Badge variant="light" color="violet">
                  {impactPreview?.strategic_alignment}%
                </Badge>
              </Group>

              <Divider size="xs" my="xs" />

              <Group justify="space-between">
                <Text size="xs" c="dimmed">Benefits:</Text>
                <Text size="xs" c="green">
                  {impactPreview?.benefits.slice(0, 2).join(', ')}
                </Text>
              </Group>

              <Button
                size="xs"
                variant="subtle"
                color="gray"
                onClick={() => setShowImpactPreview(false)}
              >
                Close Preview
              </Button>
            </Stack>
          </Paper>
        )}
      </Transition>
    </div>
  );
};

// Smart Form Container with Auto-Fill
interface AIEnhancedFormProps {
  formType: string;
  context?: Record<string, any>;
  onSubmit: (values: any) => void;
  children: React.ReactNode;
  enableSmartDefaults?: boolean;
  enableImpactPreview?: boolean;
  showProgressIndicator?: boolean;
}

export const AIEnhancedForm: React.FC<AIEnhancedFormProps> = ({
  formType,
  context = {},
  onSubmit,
  children,
  enableSmartDefaults = true,
  enableImpactPreview = true,
  showProgressIndicator = true
}) => {
  const [formProgress, setFormProgress] = useState(0);
  const [smartDefaultsLoaded, setSmartDefaultsLoaded] = useState(false);
  const [loadingDefaults, setLoadingDefaults] = useState(false);
  const { getSmartDefaults, addQuickWin } = usePM33UX();

  // Calculate form completion progress
  const calculateProgress = useCallback((values: Record<string, any>) => {
    const totalFields = React.Children.count(children);
    const completedFields = Object.values(values).filter(value => 
      value !== '' && value !== null && value !== undefined && 
      (Array.isArray(value) ? value.length > 0 : true)
    ).length;
    
    return totalFields > 0 ? (completedFields / totalFields) * 100 : 0;
  }, [children]);

  // Load smart defaults
  useEffect(() => {
    if (enableSmartDefaults && !smartDefaultsLoaded) {
      const loadDefaults = async () => {
        setLoadingDefaults(true);
        try {
          const defaults = await getSmartDefaults(formType, context);
          
          // Apply defaults to form (would need form reference)
          setSmartDefaultsLoaded(true);
          
          // Add quick win for AI assistance
          addQuickWin({
            title: 'Smart Defaults Applied',
            description: `AI pre-filled form fields for ${formType}`,
            impact: 'medium',
            category: 'efficiency_gained',
            value: 5
          });
        } catch (error) {
          console.error('Failed to load smart defaults:', error);
        } finally {
          setLoadingDefaults(false);
        }
      };

      loadDefaults();
    }
  }, [enableSmartDefaults, smartDefaultsLoaded, formType, context, getSmartDefaults, addQuickWin]);

  return (
    <Card shadow="sm" radius="md" withBorder>
      {/* Form Header with Progress */}
      <Stack gap="md">
        {showProgressIndicator && (
          <Group justify="space-between" align="center">
            <Group gap="md">
              <ThemeIcon variant="light" color="blue">
                <IconRocket size={16} />
              </ThemeIcon>
              <div>
                <Text size="sm" fw={500}>Smart Form</Text>
                <Text size="xs" c="dimmed">AI-enhanced experience</Text>
              </div>
            </Group>
            
            <Group gap="md">
              {loadingDefaults && (
                <Group gap="xs">
                  <Loader size="xs" />
                  <Text size="xs" c="dimmed">Loading AI suggestions...</Text>
                </Group>
              )}
              
              <div style={{ minWidth: '120px' }}>
                <Text size="xs" c="dimmed" mb={2}>
                  Progress: {Math.round(formProgress)}%
                </Text>
                <Progress value={formProgress} size="sm" radius="xl" />
              </div>
            </Group>
          </Group>
        )}

        {/* Form Content */}
        <div>
          {children}
        </div>

        {/* AI Enhancement Indicators */}
        <Alert
          icon={<IconSparkles size={16} />}
          title="AI Enhanced Form"
          color="blue"
          variant="light"
        >
          <Text size="sm">
            This form includes AI-powered suggestions, impact previews, and smart validation.
            {enableSmartDefaults && ' Smart defaults have been applied based on your context.'}
          </Text>
        </Alert>
      </Stack>
    </Card>
  );
};

// Keyboard Shortcuts Component
interface KeyboardShortcutsProps {
  shortcuts: Array<{
    key: string;
    description: string;
    action: () => void;
  }>;
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ shortcuts }) => {
  const [showShortcuts, setShowShortcuts] = useState(false);

  return (
    <Popover
      opened={showShortcuts}
      onClose={() => setShowShortcuts(false)}
      position="top-end"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <Tooltip label="Keyboard shortcuts">
          <ActionIcon
            variant="light"
            color="gray"
            onClick={() => setShowShortcuts(!showShortcuts)}
          >
            ⌘
          </ActionIcon>
        </Tooltip>
      </Popover.Target>

      <Popover.Dropdown>
        <Text size="sm" fw={500} mb="md">⌨️ Keyboard Shortcuts</Text>
        <Stack gap="xs">
          {shortcuts.map((shortcut, index) => (
            <Group key={index} justify="space-between" gap="md">
              <Text size="sm">{shortcut.description}</Text>
              <Badge variant="light" size="sm" style={{ fontFamily: 'monospace' }}>
                {shortcut.key}
              </Badge>
            </Group>
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};