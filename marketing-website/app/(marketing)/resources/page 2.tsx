/**
 * Component: Resources Redirect Page - Seamless URL handling
 * Purpose: Redirect /resources to /blog for proper resource discovery
 * Context: SEO-friendly URL structure with content consolidation
 * RELEVANT FILES: app/(marketing)/blog/page.tsx, PM33_COMPLETE_WEBSITE_MAP.md
 */

import { redirect } from 'next/navigation';

export default function ResourcesRedirectPage() {
  redirect('/blog');
}