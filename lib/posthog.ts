/**
 * Component: PostHog Analytics Configuration
 * Purpose: Setup CAC tracking and viral coefficient measurement for $100K MRR target
 * Features: User acquisition funnel, revenue attribution, product-led growth metrics
 * 
 * Strategic Context: Critical for tracking PM33's path to $100K MRR through:
 * - Customer Acquisition Cost (CAC) measurement
 * - Viral coefficient tracking
 * - Product-led growth metrics
 */

// Real PostHog integration - PRODUCTION READY with dynamic imports
declare global {
  interface Window {
    posthog?: any;
  }
}

// Dynamic import for Next.js compatibility
let posthog: any = null;

// PostHog configuration with dynamic loading
export const initPostHog = async () => {
  if (typeof window !== 'undefined' && !posthog) {
    try {
      // Dynamically import PostHog for Next.js compatibility
      const PostHog = (await import('posthog-js')).default;
      posthog = PostHog;
      
      PostHog.init(
        process.env.NEXT_PUBLIC_POSTHOG_API_KEY || 'phc_sBOe51oNNNoxQgzEZwu89H8V29qGwnRy0mMGIobyLgX',
        {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
          person_profiles: 'identified_only',
          capture_pageview: false, // Disable automatic pageview capture for custom tracking
          capture_pageleave: true,
          loaded: (posthog) => {
            if (process.env.NODE_ENV === 'development') posthog.debug();
            console.log('🎯 PostHog loaded successfully for $100K MRR tracking');
          },
        }
      );
      
      // Store globally for access
      window.posthog = PostHog;
    } catch (error) {
      console.error('PostHog failed to load:', error);
      // Fallback to console logging for development
      posthog = {
        capture: (event: string, properties: any) => console.log('📊 PostHog Event:', event, properties),
        identify: (userId: string, properties: any) => console.log('👤 PostHog Identify:', userId, properties),
        setPersonProperties: (properties: any) => console.log('📝 PostHog Person Properties:', properties),
      };
    }
  }
};

// Helper function to get PostHog instance
const getPostHog = () => {
  return posthog || window.posthog || {
    capture: (event: string, properties: any) => console.log('📊 PostHog Event:', event, properties),
    identify: (userId: string, properties: any) => console.log('👤 PostHog Identify:', userId, properties),
    setPersonProperties: (properties: any) => console.log('📝 PostHog Person Properties:', properties),
  };
};

// CAC Tracking Events
export const trackCAC = {
  // User Acquisition Funnel
  landingPageView: (source?: string, medium?: string, campaign?: string) => {
    getPostHog().capture('landing_page_view', {
      acquisition_channel: source || 'direct',
      utm_medium: medium,
      utm_campaign: campaign,
      timestamp: new Date().toISOString(),
    });
  },

  signupStarted: (acquisitionChannel: string, referrer?: string) => {
    getPostHog().capture('signup_started', {
      acquisition_channel: acquisitionChannel,
      referrer_url: referrer || document.referrer,
      page_url: window.location.href,
    });
  },

  signupCompleted: (userId: string, acquisitionCost?: number, plan?: string) => {
    getPostHog().capture('signup_completed', {
      user_id: userId,
      acquisition_cost: acquisitionCost || 0,
      plan_type: plan || 'trial',
      time_to_signup: Date.now(), // Will be calculated from session start
    });
    
    // Identify the user for person profiles
    getPostHog().identify(userId, {
      signup_date: new Date().toISOString(),
      initial_plan: plan || 'trial',
    });
  },

  firstSessionStarted: (userId: string) => {
    getPostHog().capture('first_session_started', {
      user_id: userId,
      session_start: new Date().toISOString(),
    });
  },

  activationEvent: (userId: string, eventType: 'first_strategic_query' | 'demo_completed' | 'integration_setup') => {
    getPostHog().capture('user_activation', {
      user_id: userId,
      activation_event: eventType,
      time_to_activation: Date.now(), // Calculate from signup
    });
  },

  // Revenue Attribution
  trialStarted: (userId: string, planType: string) => {
    getPostHog().capture('trial_started', {
      user_id: userId,
      plan_type: planType,
      trial_start_date: new Date().toISOString(),
    });
  },

  subscriptionCreated: (userId: string, plan: string, mrrValue: number) => {
    getPostHog().capture('subscription_created', {
      user_id: userId,
      plan_name: plan,
      mrr_value: mrrValue,
      annual_value: mrrValue * 12,
      subscription_date: new Date().toISOString(),
    });
    
    // Update user properties for cohort analysis
    getPostHog().setPersonProperties({
      plan: plan,
      mrr_value: mrrValue,
      subscriber_since: new Date().toISOString(),
    });
  },

  customerLTVUpdated: (userId: string, ltvValue: number) => {
    getPostHog().capture('customer_ltv_updated', {
      user_id: userId,
      ltv_value: ltvValue,
      updated_at: new Date().toISOString(),
    });
  },
};

// Viral Coefficient Tracking
export const trackViral = {
  // Referral & Sharing Events
  demoShared: (userId: string, shareMethod: 'link' | 'email' | 'slack' | 'teams') => {
    getPostHog().capture('demo_shared', {
      user_id: userId,
      share_method: shareMethod,
      shared_at: new Date().toISOString(),
    });
  },

  referralSent: (referrerId: string, referralMethod: 'email' | 'link' | 'social') => {
    getPostHog().capture('referral_sent', {
      referrer_id: referrerId,
      referral_method: referralMethod,
      sent_at: new Date().toISOString(),
    });
  },

  referralSignup: (referrerId: string, refereeId: string) => {
    getPostHog().capture('referral_signup', {
      referrer_id: referrerId,
      referee_id: refereeId,
      referral_successful: true,
      signup_date: new Date().toISOString(),
    });
  },

  teamInvitationSent: (inviterId: string, teamSize: number) => {
    getPostHog().capture('team_invitation_sent', {
      inviter_id: inviterId,
      team_size: teamSize,
      invitation_sent_at: new Date().toISOString(),
    });
  },

  // Product-Led Growth Metrics
  strategicAnalysisShared: (userId: string, shareChannel: 'export' | 'email' | 'slack' | 'presentation') => {
    getPostHog().capture('strategic_analysis_shared', {
      user_id: userId,
      share_channel: shareChannel,
      shared_at: new Date().toISOString(),
    });
  },

  frameworkResultExported: (userId: string, frameworkType: 'ICE' | 'RICE' | 'Porter' | 'OKR') => {
    getPostHog().capture('framework_result_exported', {
      user_id: userId,
      framework_type: frameworkType,
      exported_at: new Date().toISOString(),
    });
  },

  competitiveIntelligenceViewed: (userId: string, competitor: string) => {
    getPostHog().capture('competitive_intelligence_viewed', {
      user_id: userId,
      competitor: competitor,
      viewed_at: new Date().toISOString(),
    });
  },
};

// Product Usage Tracking for CAC/LTV Analysis
export const trackProductUsage = {
  strategicQuery: (userId: string, queryType: string, frameworks: string[]) => {
    getPostHog().capture('strategic_query', {
      user_id: userId,
      query_type: queryType,
      frameworks_used: frameworks,
      query_timestamp: new Date().toISOString(),
    });
  },

  dashboardView: (userId: string, section: string) => {
    getPostHog().capture('dashboard_view', {
      user_id: userId,
      dashboard_section: section,
      view_timestamp: new Date().toISOString(),
    });
  },

  integrationUsed: (userId: string, integrationType: 'jira' | 'slack' | 'github' | 'linear') => {
    getPostHog().capture('integration_used', {
      user_id: userId,
      integration_type: integrationType,
      usage_timestamp: new Date().toISOString(),
    });
  },

  featureAdoption: (userId: string, featureName: string) => {
    getPostHog().capture('feature_adoption', {
      user_id: userId,
      feature_name: featureName,
      adoption_timestamp: new Date().toISOString(),
    });
  },
};

// MRR Progress Tracking for $100K Goal
export const trackMRRProgress = {
  monthlyRecurringRevenue: (totalMRR: number, newMRR: number, churnedMRR: number) => {
    getPostHog().capture('mrr_monthly_update', {
      total_mrr: totalMRR,
      new_mrr: newMRR,
      churned_mrr: churnedMRR,
      net_new_mrr: newMRR - churnedMRR,
      progress_to_100k: (totalMRR / 100000) * 100,
      update_date: new Date().toISOString(),
    });
  },

  cohortAnalysis: (cohort: string, retention: number, ltv: number) => {
    getPostHog().capture('cohort_analysis', {
      cohort_id: cohort,
      retention_rate: retention,
      cohort_ltv: ltv,
      analysis_date: new Date().toISOString(),
    });
  },
};

export default posthog;