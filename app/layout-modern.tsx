/**
 * Modern Layout - 2025 Best Practices
 * Replaces Mantine-heavy layout with clean, modern implementation
 * 
 * Improvements:
 * - Removed Mantine dependencies (ColorSchemeScript, MantineWrapper)
 * - Uses modern CSS foundation with light-dark() function
 * - Simplified provider structure
 * - Better performance (smaller bundle)
 * - Easier to maintain
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import PostHogProvider from '../components/PostHogProvider';
import './globals.css'; // Our modern CSS foundation

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'PM33 - PMO Transformation Platform | AI-Powered Product Management',
    template: '%s | PM33 - AI-Powered Product Management'
  },
  description: 'Transform from Product Manager to Strategic PMO with 4 Agentic AI Teams. Achieve 10x productivity with AI-powered strategic intelligence, workflow automation, and data-driven insights.',
  keywords: [
    'product management',
    'PMO',
    'AI product management',
    'strategic intelligence',
    'workflow automation',
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
    title: 'PM33 - PMO Transformation Platform',
    description: 'Transform from Product Manager to Strategic PMO with 4 Agentic AI Teams',
    images: [
      {
        url: 'https://pm33.ai/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PM33 - AI-Powered Product Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PM33 - PMO Transformation Platform',
    description: 'Transform from Product Manager to Strategic PMO with 4 Agentic AI Teams',
    creator: '@pm33ai',
    images: ['https://pm33.ai/og-image.png'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function ModernRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1e3a8a" />
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
                "description": "Starter plan with 40 AI operations per month"
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
      
      <body className={`${inter.className} antialiased`}>
        <PostHogProvider>
          {/* Simple wrapper - uses CSS variables for theming */}
          <div className="min-h-screen bg-primary text-primary transition-colors duration-300">
            {children}
          </div>
        </PostHogProvider>
      </body>
    </html>
  );
}