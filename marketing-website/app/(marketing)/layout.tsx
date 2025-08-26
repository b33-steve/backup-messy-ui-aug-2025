// Marketing route group layout - with navigation and footer
// WHY: Marketing pages need consistent navigation and footer across all marketing routes
// RELEVANT FILES: components/marketing/Navigation.tsx, components/marketing/Footer.tsx

import type { Metadata } from "next";
import Navigation from '../../components/marketing/Navigation';
import Footer from '../../components/marketing/Footer';
import { PM33_DESIGN } from '../../components/marketing/PM33Header';
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PM33",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "29",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <div 
        className="marketing-context"
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--marketing-bg-primary)',
          color: 'var(--marketing-text-primary)',
          transition: 'all 0.3s ease'
        }}
      >
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}