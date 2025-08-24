'use client';

import { usePathname } from 'next/navigation';
import Navigation from './marketing/Navigation-simple';
import Footer from './marketing/Footer-simple';

interface ConditionalMarketingLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalMarketingLayout({ children }: ConditionalMarketingLayoutProps) {
  const pathname = usePathname();
  
  // Marketing pages that need navigation and footer
  const marketingPaths = [
    '/',
    '/pricing', 
    '/resources',
    '/about',
    '/contact',
    '/trial',
    '/strategic-intelligence',
    '/command-center'
  ];
  
  const isMarketingPage = marketingPaths.some(path => 
    pathname === path || pathname.startsWith(path + '/')
  );
  
  // App pages (dashboard, settings, etc.) don't need marketing nav/footer
  const isAppPage = pathname.startsWith('/(app)') || 
                   pathname.includes('/dashboard') || 
                   pathname.includes('/settings') ||
                   pathname.includes('/chat') ||
                   pathname.includes('/intelligence');
  
  if (isMarketingPage && !isAppPage) {
    return (
      <div className="marketing-context">
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </div>
    );
  }
  
  // App pages or other pages without marketing layout
  return <>{children}</>;
}