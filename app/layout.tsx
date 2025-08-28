import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ColorSchemeScript } from '@mantine/core';
import MantineWrapper from '../components/shared/MantineProvider';
import PostHogProvider from '../components/PostHogProvider';
import '@mantine/core/styles.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'PM33 - Cut PM Busywork 78% with AI | $29/month',
    template: '%s | PM33 - Cut PM Busywork 78% with AI'
  },
  description: 'Transform Jira into AI strategic engine. No migration. Join 2,847 PMs saving 32 hours monthly. Start free.',
  keywords: [
    'AI product management tools',
    'product strategy automation', 
    'Jira AI integration',
    'PM busywork automation',
    'strategic intelligence AI',
    'product management software',
    'AI-powered PM tools',
    'product strategy',
    'PM frameworks',
    'product analytics',
    'roadmap planning',
    'competitive analysis',
    'product optimization'
  ],
  authors: [{ name: 'PM33 Team' }],
  creator: 'PM33',
  publisher: 'PM33',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pm33.ai',
    siteName: 'PM33',
    title: 'Cut PM Busywork 78% - PM33',
    description: '2,847 PMs save 32 hours/month',
    images: [
      {
        url: '/og-image-results.png',
        width: 1200,
        height: 630,
        alt: 'PM33 - Cut PM Busywork 78% with AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cut PM Busywork 78% - PM33',
    description: '2,847 PMs save 32 hours/month',
    images: ['/og-image-results.png'],
    creator: '@pm33ai',
  },
  alternates: {
    canonical: 'https://pm33.ai',
  },
  verification: {
    google: 'google-verification-code', // Add actual Google verification code
  },
  category: 'technology',
  other: {
    'application-name': 'PM33',
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#667eea" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data for AI and SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "PM33",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "AI-powered product management platform that transforms individual PMs into strategic PMOs with 4 agentic AI teams",
              "url": "https://pm33.ai",
              "author": {
                "@type": "Organization",
                "name": "PM33",
                "url": "https://pm33.ai"
              },
              "offers": {
                "@type": "Offer",
                "price": "29",
                "priceCurrency": "USD",
                "priceValidUntil": "2025-12-31",
                "description": "Starter plan - Cut PM busywork by 78%"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "2847"
              },
              "featureList": [
                "Strategic Intelligence AI Team",
                "Workflow Execution AI Team", 
                "Data Intelligence AI Team",
                "Communication AI Team",
                "AI-powered strategic analysis",
                "Automated workflow management",
                "Competitive intelligence",
                "PMO transformation tools"
              ],
              "screenshot": "https://pm33.ai/app-screenshot.png"
            })
          }}
        />
        
        {/* Additional AI-friendly metadata */}
        <meta name="ai-description" content="PM33 transforms Product Managers into Strategic PMOs using 4 specialized AI teams: Strategic Intelligence (Claude), Workflow Execution (OpenAI), Data Intelligence (Together AI), and Communication (multi-AI). Achieves 10x productivity improvement through automated strategic analysis, competitive intelligence, and workflow orchestration." />
        <meta name="target-audience" content="Product Managers, Product Teams, PMOs, Product Directors, VPs of Product" />
        <meta name="primary-benefit" content="Transform individual PM into full PMO capabilities without additional team or budget" />
        <meta name="pricing-model" content="SaaS subscription starting at $29/month for 40 AI operations" />
      </head>
      <body className={inter.className}>
        <PostHogProvider>
          <MantineWrapper>
            <div className="min-h-screen transition-all duration-300" 
                 style={{ background: 'var(--pm33-bg-primary)' }}>
              {children}
            </div>
          </MantineWrapper>
        </PostHogProvider>
      </body>
    </html>
  );
}