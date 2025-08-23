/**
 * Component: PostHog Analytics Provider  
 * Purpose: Initialize PostHog for $100K MRR tracking and performance analytics
 * Integration: Provides PostHog context to entire application
 * RELEVANT FILES: lib/posthog.ts, app/layout.tsx, app/(marketing)/layout.tsx
 */

'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initPostHog, trackCAC } from '../lib/posthog';

interface PostHogProviderProps {
  children: React.ReactNode;
}

// Internal component that uses useSearchParams
function PostHogTracker({ children }: PostHogProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize PostHog asynchronously
    initPostHog().catch(console.error);
  }, []);

  useEffect(() => {
    // Track pageviews manually for better control
    if (pathname) {
      // Extract UTM parameters for CAC tracking
      const source = searchParams.get('utm_source');
      const medium = searchParams.get('utm_medium');
      const campaign = searchParams.get('utm_campaign');
      
      // Track page view with CAC attribution  
      const posthog = window.posthog || {
        capture: (event: string, properties: any) => console.log('📊 PostHog Event:', event, properties)
      };
      
      posthog.capture('$pageview', {
        $current_url: window.location.href,
        utm_source: source,
        utm_medium: medium,
        utm_campaign: campaign,
        page_title: document.title,
      });
      
      // Track landing page views specifically for CAC analysis
      if (pathname === '/' || pathname === '/features' || pathname === '/pricing') {
        trackCAC.landingPageView(source || undefined, medium || undefined, campaign || undefined);
      }
      
      // Track demo page views for conversion analysis
      if (pathname.includes('demo') || pathname.includes('strategic-intelligence')) {
        posthog.capture('demo_page_view', {
          demo_type: pathname,
          referrer: document.referrer,
          utm_source: source,
        });
      }
      
      // Track trial page conversion tracking
      if (pathname === '/trial') {
        posthog.capture('trial_page_view', {
          referrer: document.referrer,
          utm_source: source,
          utm_medium: medium,
          utm_campaign: campaign,
        });
      }
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}

export default function PostHogProvider({ children }: PostHogProviderProps) {
  return (
    <Suspense fallback={<>{children}</>}>
      <PostHogTracker>{children}</PostHogTracker>
    </Suspense>
  );
}

/**
 * Usage in Marketing Pages:
 * - Automatic UTM parameter tracking
 * - Landing page conversion measurement
 * - Demo engagement tracking
 * - Trial funnel analysis
 * 
 * Key Metrics for $100K MRR Goal:
 * - Customer Acquisition Cost (CAC)
 * - Conversion rates by channel
 * - Time to trial/signup
 * - Feature adoption rates
 * - Revenue attribution
 */