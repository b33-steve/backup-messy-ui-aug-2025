import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { ThemeProvider } from '@/components/providers/theme-provider';
import '@mantine/core/styles.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PM33 - PMO Transformation Platform',
  description: 'Transform from Product Manager to Strategic PMO with 4 Agentic AI Teams',
  keywords: 'product management, PMO, AI, strategic intelligence, workflow automation',
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
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <ThemeProvider>
            <div className="min-h-screen transition-all duration-300 bg-gradient-light dark:bg-gradient-dark">
              {children}
            </div>
          </ThemeProvider>
        </MantineProvider>
      </body>
    </html>
  );
}