/**
 * Modern Demo Page - See the transformed UI
 * Shows the new modern homepage with CSS foundation
 */

import type { Metadata } from 'next';
import ModernMarketingHomePage from '../(marketing)/page-modern';
import ModernNavigation from '../../components/shared/Navigation-modern';

export const metadata: Metadata = {
  title: 'PM33 Modern UI Demo - See the Transformation',
  description: 'Experience the new PM33 UI with modern CSS foundation, 91% smaller CSS, and performance optimizations'
};

export default function ModernDemoPage() {
  return (
    <div>
      <ModernNavigation />
      <ModernMarketingHomePage />
    </div>
  );
}