// Marketing route group layout - with PM33 branded navigation and footer
// WHY: Marketing pages need consistent PM33 glass morphism navigation across all marketing routes
// USING: IsolatedMarketingNavigation for beautiful PM33 branding with glass morphism

import type { Metadata } from "next";
import IsolatedMarketingNavigation from '../../components/marketing/IsolatedMarketingNavigation';
import IsolatedMarketingFooter from '../../components/marketing/IsolatedMarketingFooter';
// Marketing styles now consolidated in global CSS

export const metadata: Metadata = {
  title: "PM33 - AI Product Management Tool",
  description: "Don't replace your PM tools - make them 10x smarter. PM33 is the AI brain that supercharges your existing PM stack without migration headaches.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div 
      className="marketing-context"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--pm33-bg-primary)',
        color: 'var(--pm33-text-primary)',
        transition: 'all 0.3s ease'
      }}
    >
      <IsolatedMarketingNavigation />
      <main className="pt-16">
        {children}
      </main>
      <IsolatedMarketingFooter />
    </div>
  );
}