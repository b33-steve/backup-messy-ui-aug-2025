/**
 * Analytics Helper - PostHog Integration
 * Purpose: Centralized analytics tracking for PM33 conversion optimization
 * Features: Event tracking, user identification, funnel analysis, A/B testing
 */

declare global {
  interface Window {
    posthog?: any;
  }
}

// Event Types for Type Safety
export interface AnalyticsEvent {
  // Page Events
  page_viewed: {
    page_name: string;
    url: string;
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };

  // Social Proof Events
  testimonial_viewed: {
    testimonial_id: string;
    format: 'carousel' | 'grid' | 'featured';
    segment?: string;
    auto_rotate: boolean;
    page_context: string;
  };

  testimonial_navigation: {
    direction: 'prev' | 'next';
    current_testimonial: string;
    segment?: string;
    page_context: string;
  };

  social_proof_metrics_viewed: {
    segment: string;
    show_trust_signals: boolean;
    animated: boolean;
    page_context: string;
  };

  // A/B Testing Events
  ab_test_impression: {
    test_id: string;
    variant_id: string;
    variant_name: string;
    page_context: string;
    user_segment?: string;
  };

  ab_test_conversion: {
    test_id: string;
    variant_id: string;
    variant_name: string;
    conversion_type: string;
    page_context: string;
    user_segment?: string;
  };

  // CTA and Conversion Events
  cta_clicked: {
    cta_text: string;
    cta_type: 'primary' | 'secondary' | 'trial' | 'demo';
    destination_url: string;
    page_context: string;
    user_segment?: string;
    ab_test_variant?: string;
  };

  pricing_cta_clicked: {
    tier: string;
    pricing_page: string;
    is_annual: boolean;
    cta_position: string;
    ab_test_variant?: string;
  };

  // Trial and Lead Generation Events
  trial_form_started: {
    tier: string;
    utm_source?: string;
    referrer?: string;
    page_context: string;
  };

  trial_form_step_completed: {
    step: number;
    step_name: string;
    tier: string;
    qualification_score?: number;
    user_segment?: string;
  };

  trial_form_submitted: {
    tier: string;
    qualification_score: number;
    user_segment: string;
    company_size: string;
    industry: string;
    form_completion_time: number;
  };

  // Enterprise Events
  enterprise_demo_requested: {
    company: string;
    title: string;
    company_size: string;
    pain_points: string[];
    estimated_roi: number;
  };

  enterprise_calculator_used: {
    annual_savings: number;
    roi_percentage: number;
    team_size: number;
    current_pm_cost: number;
  };

  // ROI Calculator Events
  roi_calculator_started: {
    page_context: string;
    user_segment?: string;
  };

  roi_calculator_completed: {
    monthly_savings: number;
    annual_savings: number;
    roi_percentage: number;
    current_pm_salary: number;
    time_spent_busywork: number;
    consultant_hours: number;
    page_context: string;
  };

  // Content Engagement
  content_engagement: {
    content_type: 'blog' | 'case_study' | 'whitepaper' | 'demo';
    content_title: string;
    engagement_type: 'view' | 'scroll' | 'share' | 'download';
    engagement_duration?: number;
  };

  // Funnel Progression
  funnel_progression: {
    funnel_name: string;
    step: string;
    step_number: number;
    user_segment?: string;
    session_duration: number;
  };
}

class PM33Analytics {
  private isPostHogReady(): boolean {
    return typeof window !== 'undefined' && window.posthog;
  }

  // Core Event Tracking
  track<T extends keyof AnalyticsEvent>(
    eventName: T,
    properties: AnalyticsEvent[T],
    options?: { timestamp?: Date; send_instantly?: boolean }
  ): void {
    if (!this.isPostHogReady()) {
      console.warn(`PostHog not available for event: ${eventName}`);
      return;
    }

    // Add common properties to all events
    const enrichedProperties = {
      ...properties,
      timestamp: options?.timestamp?.toISOString() || new Date().toISOString(),
      user_agent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      viewport_width: typeof window !== 'undefined' ? window.innerWidth : undefined,
      viewport_height: typeof window !== 'undefined' ? window.innerHeight : undefined,
      pm33_version: '1.0.0', // Track app version for feature rollout analysis
    };

    window.posthog.capture(eventName, enrichedProperties, options);
  }

  // User Identification and Segmentation
  identify(userId: string, userProperties: {
    email?: string;
    name?: string;
    company?: string;
    title?: string;
    company_size?: string;
    industry?: string;
    signup_date?: string;
    trial_tier?: string;
    user_segment?: 'startup-pm' | 'senior-pm' | 'vp-product' | 'enterprise-pmo';
  }): void {
    if (!this.isPostHogReady()) return;

    window.posthog.identify(userId, {
      ...userProperties,
      identified_at: new Date().toISOString(),
    });
  }

  // Page View Tracking with Context
  trackPageView(pageName: string, additionalProperties: Partial<AnalyticsEvent['page_viewed']> = {}): void {
    if (!this.isPostHogReady()) return;

    const urlParams = new URLSearchParams(window.location.search);
    
    this.track('page_viewed', {
      page_name: pageName,
      url: window.location.href,
      referrer: document.referrer || undefined,
      utm_source: urlParams.get('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined,
      ...additionalProperties,
    });
  }

  // Conversion Funnel Tracking
  trackFunnelStep(funnelName: string, step: string, stepNumber: number, userSegment?: string): void {
    const sessionStartTime = sessionStorage.getItem('pm33_session_start');
    const sessionDuration = sessionStartTime 
      ? Date.now() - parseInt(sessionStartTime)
      : 0;

    this.track('funnel_progression', {
      funnel_name: funnelName,
      step,
      step_number: stepNumber,
      user_segment: userSegment,
      session_duration: sessionDuration,
    });
  }

  // A/B Test Tracking (Enhanced)
  trackABTestImpression(testId: string, variantId: string, variantName: string, pageContext: string): void {
    this.track('ab_test_impression', {
      test_id: testId,
      variant_id: variantId,
      variant_name: variantName,
      page_context: pageContext,
      user_segment: this.getCurrentUserSegment(),
    });
  }

  trackABTestConversion(testId: string, variantId: string, variantName: string, conversionType: string, pageContext: string): void {
    this.track('ab_test_conversion', {
      test_id: testId,
      variant_id: variantId,
      variant_name: variantName,
      conversion_type: conversionType,
      page_context: pageContext,
      user_segment: this.getCurrentUserSegment(),
    });
  }

  // CTA Click Tracking (Enhanced)
  trackCTAClick(ctaText: string, ctaType: 'primary' | 'secondary' | 'trial' | 'demo', destinationUrl: string, pageContext: string, abTestVariant?: string): void {
    this.track('cta_clicked', {
      cta_text: ctaText,
      cta_type: ctaType,
      destination_url: destinationUrl,
      page_context: pageContext,
      user_segment: this.getCurrentUserSegment(),
      ab_test_variant: abTestVariant,
    });
  }

  // Social Proof Tracking (Enhanced)
  trackTestimonialView(testimonialId: string, format: 'carousel' | 'grid' | 'featured', segment: string | undefined, autoRotate: boolean, pageContext: string): void {
    this.track('testimonial_viewed', {
      testimonial_id: testimonialId,
      format,
      segment: segment || 'all',
      auto_rotate: autoRotate,
      page_context: pageContext,
    });
  }

  trackSocialProofMetrics(segment: string, showTrustSignals: boolean, animated: boolean, pageContext: string): void {
    this.track('social_proof_metrics_viewed', {
      segment,
      show_trust_signals: showTrustSignals,
      animated,
      page_context: pageContext,
    });
  }

  // Lead Generation and Trial Tracking
  trackTrialFormStart(tier: string, pageContext: string): void {
    const urlParams = new URLSearchParams(window.location.search);
    
    this.track('trial_form_started', {
      tier,
      utm_source: urlParams.get('utm_source') || undefined,
      referrer: document.referrer || undefined,
      page_context: pageContext,
    });

    // Start funnel tracking
    this.trackFunnelStep('trial_signup', 'form_started', 1);
  }

  trackTrialFormStep(step: number, stepName: string, tier: string, qualificationScore?: number, userSegment?: string): void {
    this.track('trial_form_step_completed', {
      step,
      step_name: stepName,
      tier,
      qualification_score: qualificationScore,
      user_segment: userSegment,
    });

    // Continue funnel tracking
    this.trackFunnelStep('trial_signup', stepName, step + 1, userSegment);
  }

  trackTrialFormSubmission(formData: {
    tier: string;
    qualificationScore: number;
    userSegment: string;
    companySize: string;
    industry: string;
    formStartTime: number;
  }): void {
    const formCompletionTime = Date.now() - formData.formStartTime;

    this.track('trial_form_submitted', {
      tier: formData.tier,
      qualification_score: formData.qualificationScore,
      user_segment: formData.userSegment,
      company_size: formData.companySize,
      industry: formData.industry,
      form_completion_time: formCompletionTime,
    });

    // Complete funnel
    this.trackFunnelStep('trial_signup', 'form_completed', 4, formData.userSegment);
  }

  // ROI Calculator Tracking
  trackROICalculatorUsage(results: {
    monthlySavings: number;
    annualSavings: number;
    roiPercentage: number;
    currentPMSalary: number;
    timeSpentBusywork: number;
    consultantHours: number;
    pageContext: string;
  }): void {
    this.track('roi_calculator_completed', {
      monthly_savings: results.monthlySavings,
      annual_savings: results.annualSavings,
      roi_percentage: results.roiPercentage,
      current_pm_salary: results.currentPMSalary,
      time_spent_busywork: results.timeSpentBusywork,
      consultant_hours: results.consultantHours,
      page_context: results.pageContext,
    });
  }

  // Enterprise Demo Tracking
  trackEnterpriseDemo(demoData: {
    company: string;
    title: string;
    companySize: string;
    painPoints: string[];
    estimatedROI: number;
  }): void {
    this.track('enterprise_demo_requested', demoData);
    this.trackFunnelStep('enterprise_sales', 'demo_requested', 1, 'enterprise-pmo');
  }

  // Helper Methods
  private getCurrentUserSegment(): string | undefined {
    // Try to get segment from various sources
    const urlParams = new URLSearchParams(window.location.search);
    const segmentFromUrl = urlParams.get('segment');
    const segmentFromStorage = localStorage.getItem('pm33_user_segment');
    
    return segmentFromUrl || segmentFromStorage || undefined;
  }

  // Session Tracking
  startSession(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pm33_session_start', Date.now().toString());
    }
  }

  // Feature Flag Integration (for future use)
  getFeatureFlag(flagName: string, defaultValue: boolean = false): boolean {
    if (!this.isPostHogReady()) return defaultValue;
    return window.posthog.isFeatureEnabled(flagName, defaultValue);
  }

  // Goal Conversion Tracking for 100K MRR
  trackRevenueGoal(event: 'trial_to_paid' | 'upgrade' | 'churn' | 'expansion', value: number, tier: string): void {
    if (!this.isPostHogReady()) return;

    window.posthog.capture('revenue_goal_event', {
      event_type: event,
      revenue_value: value,
      tier,
      timestamp: new Date().toISOString(),
    });

    // Also send to PostHog as a distinct event for better analysis
    window.posthog.capture(`revenue_${event}`, {
      value,
      tier,
      timestamp: new Date().toISOString(),
    });
  }
}

// Export singleton instance
export const analytics = new PM33Analytics();

// React Hook for Analytics
export function useAnalytics() {
  return analytics;
}

// Event Tracking Utilities for Components
export const trackEvent = analytics.track.bind(analytics);
export const trackPageView = analytics.trackPageView.bind(analytics);
export const trackCTAClick = analytics.trackCTAClick.bind(analytics);
export const trackTrialFormStart = analytics.trackTrialFormStart.bind(analytics);
export const identifyUser = analytics.identify.bind(analytics);