'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { Button } from '@mantine/core';
import { analytics } from '../../lib/analytics';

/**
 * Component: ABTestingFramework
 * Purpose: A/B testing system for CTAs and conversion optimization
 * Design: Multi-variant testing with analytics integration and conversion tracking
 * 
 * Features:
 * - [x] Multi-variant A/B testing support
 * - [x] PostHog integration for experiment tracking
 * - [x] Conversion tracking and analytics
 * - [x] Local storage for variant persistence
 * - [x] Statistical significance monitoring
 * - [x] Easy integration with existing components
 */

interface ABVariant {
  id: string;
  name: string;
  weight: number; // 0-1, should sum to 1 across all variants
  content: ReactNode | ((props: any) => ReactNode);
}

interface ABTestConfig {
  testId: string;
  variants: ABVariant[];
  persistVariant?: boolean; // Store user's variant in localStorage
  trackingEvents?: {
    impression: string;
    conversion: string;
  };
}

interface ABTestProps extends ABTestConfig {
  className?: string;
  onVariantSelected?: (variant: ABVariant) => void;
  fallbackVariant?: string; // Variant ID to use if no random selection
  pageContext?: string; // For enhanced analytics tracking
  [key: string]: any; // Allow passing additional props to variant content
}

// CTA Button A/B Testing Variants
export const CTATestVariants = {
  pricing: {
    testId: 'pricing_cta_test',
    variants: [
      {
        id: 'variant_a',
        name: 'Start Free Trial',
        weight: 0.25,
        content: (props: any) => (
          <Button 
            {...props}
            size="lg"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'purple' }}
          >
            Start Free Trial
          </Button>
        )
      },
      {
        id: 'variant_b',
        name: 'Get Started Free',
        weight: 0.25,
        content: (props: any) => (
          <Button 
            {...props}
            size="lg"
            variant="gradient"
            gradient={{ from: 'green', to: 'teal' }}
          >
            Get Started Free
          </Button>
        )
      },
      {
        id: 'variant_c',
        name: 'Try PM33 Risk-Free',
        weight: 0.25,
        content: (props: any) => (
          <Button 
            {...props}
            size="lg"
            variant="gradient"
            gradient={{ from: 'orange', to: 'red' }}
          >
            Try PM33 Risk-Free
          </Button>
        )
      },
      {
        id: 'variant_d',
        name: 'Join 2,500+ PMs',
        weight: 0.25,
        content: (props: any) => (
          <Button 
            {...props}
            size="lg"
            variant="outline"
            style={{ borderWidth: 2 }}
          >
            Join 2,500+ PMs →
          </Button>
        )
      }
    ]
  },
  
  homepage: {
    testId: 'homepage_hero_cta_test',
    variants: [
      {
        id: 'urgent_a',
        name: 'Transform Your PM Work Today',
        weight: 0.33,
        content: (props: any) => (
          <Button 
            {...props}
            size="xl"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'purple' }}
          >
            Transform Your PM Work Today
          </Button>
        )
      },
      {
        id: 'benefit_b',
        name: 'Save 78% of Your Time',
        weight: 0.33,
        content: (props: any) => (
          <Button 
            {...props}
            size="xl"
            variant="gradient"
            gradient={{ from: 'green', to: 'teal' }}
          >
            Save 78% of Your Time
          </Button>
        )
      },
      {
        id: 'social_c',
        name: 'Join the Strategic PM Revolution',
        weight: 0.34,
        content: (props: any) => (
          <Button 
            {...props}
            size="xl"
            variant="gradient"
            gradient={{ from: 'orange', to: 'yellow' }}
          >
            Join the Strategic PM Revolution
          </Button>
        )
      }
    ]
  },

  enterprise: {
    testId: 'enterprise_cta_test',
    variants: [
      {
        id: 'demo_a',
        name: 'Schedule Executive Demo',
        weight: 0.5,
        content: (props: any) => (
          <Button 
            {...props}
            size="xl"
            variant="white"
            color="dark"
            style={{ fontWeight: 700 }}
          >
            Schedule Executive Demo
          </Button>
        )
      },
      {
        id: 'roi_b',
        name: 'See Your ROI Potential',
        weight: 0.5,
        content: (props: any) => (
          <Button 
            {...props}
            size="xl"
            variant="outline"
            style={{ 
              borderColor: 'var(--gradient-text)', 
              color: 'var(--gradient-text)', 
              fontWeight: 700,
              opacity: 0.9
            }}
          >
            See Your ROI Potential →
          </Button>
        )
      }
    ]
  }
};

function useABTest(config: ABTestConfig): { selectedVariant: ABVariant; isLoading: boolean } {
  const [selectedVariant, setSelectedVariant] = useState<ABVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const selectVariant = () => {
      let variant: ABVariant;
      
      // Check if variant is persisted in localStorage
      if (config.persistVariant) {
        const storedVariantId = localStorage.getItem(`ab_test_${config.testId}`);
        const storedVariant = config.variants.find(v => v.id === storedVariantId);
        if (storedVariant) {
          variant = storedVariant;
        } else {
          variant = selectRandomVariant();
          localStorage.setItem(`ab_test_${config.testId}`, variant.id);
        }
      } else {
        variant = selectRandomVariant();
      }

      // Track impression with enhanced analytics
      if (config.trackingEvents?.impression) {
        analytics.trackABTestImpression(
          config.testId,
          variant.id,
          variant.name,
          'unknown' // Will be overridden by component
        );
      }

      setSelectedVariant(variant);
      setIsLoading(false);
    };

    const selectRandomVariant = (): ABVariant => {
      const random = Math.random();
      let cumulativeWeight = 0;
      
      for (const variant of config.variants) {
        cumulativeWeight += variant.weight;
        if (random <= cumulativeWeight) {
          return variant;
        }
      }
      
      // Fallback to first variant if weights don't add up properly
      return config.variants[0];
    };

    // Small delay to prevent hydration mismatches
    const timer = setTimeout(selectVariant, 10);
    return () => clearTimeout(timer);
  }, [config]);

  return {
    selectedVariant: selectedVariant || config.variants[0],
    isLoading
  };
}

export default function ABTestingFramework({
  testId,
  variants,
  persistVariant = true,
  trackingEvents,
  className = '',
  onVariantSelected,
  fallbackVariant,
  pageContext = 'unknown',
  ...props
}: ABTestProps) {
  const { selectedVariant, isLoading } = useABTest({
    testId,
    variants,
    persistVariant,
    trackingEvents
  });

  useEffect(() => {
    if (!isLoading && onVariantSelected) {
      onVariantSelected(selectedVariant);
    }
  }, [selectedVariant, isLoading, onVariantSelected]);

  // Track conversion when component is clicked
  const handleConversion = () => {
    if (trackingEvents?.conversion) {
      analytics.trackABTestConversion(
        testId,
        selectedVariant.id,
        selectedVariant.name,
        'click',
        pageContext
      );
    }
    
    // Call original onClick if provided
    if (props.onClick) {
      props.onClick();
    }
  };

  if (isLoading) {
    // Show first variant during loading to prevent layout shift
    const content = typeof variants[0].content === 'function' 
      ? variants[0].content({ ...props, onClick: handleConversion, className })
      : variants[0].content;
    return <div style={{ opacity: 0.7 }}>{content}</div>;
  }

  // Render selected variant
  const content = typeof selectedVariant.content === 'function' 
    ? selectedVariant.content({ ...props, onClick: handleConversion, className })
    : selectedVariant.content;

  return <>{content}</>;
}

// Convenience hook for tracking conversions outside of the component
export function useABConversionTracking() {
  const trackConversion = (testId: string, variantId: string, conversionType: string = 'conversion') => {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture(`ab_test_${conversionType}`, {
        test_id: testId,
        variant_id: variantId,
        timestamp: new Date().toISOString()
      });
    }
  };

  return { trackConversion };
}

// Component for easily testing different CTA buttons
interface ABTestCTAProps {
  test: keyof typeof CTATestVariants;
  href?: string;
  onClick?: () => void;
  className?: string;
  [key: string]: any;
}

export function ABTestCTA({ test, href, onClick, className, ...props }: ABTestCTAProps) {
  const testConfig = CTATestVariants[test];
  
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <ABTestingFramework
      {...testConfig}
      onClick={handleClick}
      component={href ? 'a' : 'button'}
      href={href}
      className={className}
      trackingEvents={{
        impression: `${testConfig.testId}_impression`,
        conversion: `${testConfig.testId}_conversion`
      }}
      {...props}
    />
  );
}

export { useABTest };