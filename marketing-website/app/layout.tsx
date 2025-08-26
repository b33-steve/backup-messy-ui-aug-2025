import type { Metadata } from "next";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './globals.css';
import { generateCSSCustomProperties } from '../components/marketing/design-system';
import { ThemeProvider } from '../components/marketing/ThemeProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://pm33.ai'),
  title: {
    default: 'PM33 - AI Product Management Intelligence Platform',
    template: '%s | PM33'
  },
  description: 'Transform Jira, Linear, and Asana into AI-powered strategic engines. 78% faster feature delivery, 65% less admin work.',
  keywords: [
    'AI product management tools',
    'product strategy automation', 
    'Jira alternative for product managers',
    'AI roadmap planning',
    'product management AI assistant',
    'PMO transformation platform',
    'strategic intelligence for PMs'
  ],
  openGraph: {
    title: 'PM33 - 10x Your PM Productivity with AI',
    description: '78% faster feature delivery. Join 2,500+ PMs using AI to eliminate busywork.',
    images: '/og-image.png',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PM33 - AI Product Management Platform',
    description: 'Stop doing busywork. Start doing strategy.',
    images: '/twitter-card.png'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: generateCSSCustomProperties() }} />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "PM33",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "price": "29",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <MantineProvider>
            {children}
          </MantineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}