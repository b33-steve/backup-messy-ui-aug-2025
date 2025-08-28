'use client';

import React, { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '../../lib/analytics';

/**
 * Component: AnalyticsDashboard
 * Purpose: Centralized analytics initialization and page view tracking
 * Features: Automatic page tracking, session management, UTM parameter capture
 */

interface AnalyticsDashboardProps {
  children: React.ReactNode;
}

// Separate component for analytics tracking that uses useSearchParams
function AnalyticsTracker({ children }: AnalyticsDashboardProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize session tracking
    analytics.startSession();

    // Track page view with full context
    const pageName = getPageNameFromPath(pathname);
    
    analytics.trackPageView(pageName, {
      url: typeof window !== 'undefined' ? window.location.href : pathname,
      referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
      utm_source: searchParams.get('utm_source') || undefined,
      utm_medium: searchParams.get('utm_medium') || undefined,
      utm_campaign: searchParams.get('utm_campaign') || undefined,
    });

    // Track funnel entry if relevant
    trackFunnelEntry(pathname, searchParams);

    // Set up user segment detection
    detectAndSetUserSegment(searchParams);

  }, [pathname, searchParams]);

  return <>{children}</>;
}

// Main component wrapper with Suspense boundary
export default function AnalyticsDashboard({ children }: AnalyticsDashboardProps) {
  return (
    <Suspense fallback={<>{children}</>}>
      <AnalyticsTracker>{children}</AnalyticsTracker>
    </Suspense>
  );
}

function getPageNameFromPath(pathname: string): string {
  const pageMap: { [key: string]: string } = {
    '/': 'homepage',
    '/pricing': 'pricing_page',
    '/trial': 'trial_page',
    '/enterprise': 'enterprise_page',
    '/about': 'about_page',
    '/contact': 'contact_page',
    '/features': 'features_page',
    '/blog': 'blog_page',
    '/strategic-intelligence': 'strategic_intelligence_page',
    '/command-center': 'command_center_page',
    '/dashboard': 'dashboard_page',
  };

  return pageMap[pathname] || `page_${pathname.replace(/\//g, '_')}`;
}

function trackFunnelEntry(pathname: string, searchParams: URLSearchParams) {
  const funnelEntryPoints = {
    '/': 'awareness',
    '/pricing': 'consideration',
    '/trial': 'conversion',
    '/enterprise': 'enterprise_consideration',
    '/strategic-intelligence': 'product_demo',
  };

  const funnelStep = funnelEntryPoints[pathname as keyof typeof funnelEntryPoints];
  if (funnelStep) {
    const tier = searchParams.get('tier');
    const userSegment = getUserSegmentFromParams(searchParams);
    
    analytics.trackFunnelStep('pm33_conversion', funnelStep, 1, userSegment);

    // Track specific campaign funnel entries
    const utmCampaign = searchParams.get('utm_campaign');
    if (utmCampaign) {
      analytics.trackFunnelStep(`campaign_${utmCampaign}`, funnelStep, 1, userSegment);
    }
  }
}

function detectAndSetUserSegment(searchParams: URLSearchParams) {
  // Detect segment from URL parameters
  let segment = searchParams.get('segment');
  
  // Detect segment from referrer patterns
  if (!segment && typeof document !== 'undefined') {
    const referrer = document.referrer.toLowerCase();
    
    if (referrer.includes('linkedin.com') || referrer.includes('glassdoor.com')) {
      segment = 'senior-pm';
    } else if (referrer.includes('ycombinator.com') || referrer.includes('producthunt.com')) {
      segment = 'startup-pm';
    } else if (referrer.includes('google.com')) {
      // Analyze search terms if available
      const searchQuery = searchParams.get('q') || '';
      if (searchQuery.toLowerCase().includes('enterprise') || searchQuery.toLowerCase().includes('pmo')) {
        segment = 'enterprise-pmo';
      }
    }
  }

  // Store segment for use throughout the session
  if (segment && typeof localStorage !== 'undefined') {
    localStorage.setItem('pm33_user_segment', segment);
  }
}

function getUserSegmentFromParams(searchParams: URLSearchParams): string | undefined {
  const segment = searchParams.get('segment');
  const tier = searchParams.get('tier');
  
  // Infer segment from tier selection
  if (!segment && tier) {
    const tierSegmentMap = {
      'starter': 'startup-pm',
      'enterprise': 'senior-pm',
      'strategic': 'enterprise-pmo'
    };
    return tierSegmentMap[tier as keyof typeof tierSegmentMap];
  }
  
  return segment || undefined;
}

// Hook for components to access current analytics context
export function useAnalyticsContext() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const pageContext = getPageNameFromPath(pathname);
  const userSegment = searchParams.get('segment') || 
                     (typeof window !== 'undefined' ? localStorage.getItem('pm33_user_segment') : null) || 
                     undefined;
  
  const tier = searchParams.get('tier');
  const utmSource = searchParams.get('utm_source');
  const utmCampaign = searchParams.get('utm_campaign');
  
  return {
    pageContext,
    userSegment,
    tier,
    utmSource,
    utmCampaign,
    trackConversion: (conversionType: string, value?: number) => {
      if (typeof window !== 'undefined' && window.posthog) {
        window.posthog.capture('conversion', {
          conversion_type: conversionType,
          page_context: pageContext,
          user_segment: userSegment,
          tier,
          utm_source: utmSource,
          utm_campaign: utmCampaign,
          value,
          timestamp: new Date().toISOString()
        });
      }
    }
  };
}

// Component for tracking specific conversion events
export function ConversionTracker({ 
  children, 
  eventName, 
  eventData = {} 
}: { 
  children: React.ReactNode; 
  eventName: string; 
  eventData?: any;
}) {
  const { pageContext, userSegment } = useAnalyticsContext();

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture(eventName, {
        ...eventData,
        page_context: pageContext,
        user_segment: userSegment,
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
}

// Revenue tracking component for subscription events
export function RevenueTracker() {
  useEffect(() => {
    // Listen for revenue events from other parts of the app
    const handleRevenueEvent = (event: CustomEvent) => {
      const { type, value, tier } = event.detail;
      analytics.trackRevenueGoal(type, value, tier);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('pm33-revenue-event', handleRevenueEvent as EventListener);
      
      return () => {
        window.removeEventListener('pm33-revenue-event', handleRevenueEvent as EventListener);
      };
    }
  }, []);

  return null; // This is an invisible tracking component
}

// Utility function to emit revenue events
export function emitRevenueEvent(type: 'trial_to_paid' | 'upgrade' | 'churn' | 'expansion', value: number, tier: string) {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('pm33-revenue-event', {
      detail: { type, value, tier }
    });
    window.dispatchEvent(event);
  }
}