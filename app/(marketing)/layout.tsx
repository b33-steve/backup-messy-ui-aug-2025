import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import MantineWrapper from "../../components/shared/MantineProvider";
import { DesignSystemProvider } from "../../components/marketing/DesignSystemProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
    <html lang="en">
      <head>
        <style>{`
          /* Marketing-Specific Color Tokens - REQUIRED USE ONLY */
          :root {
            /* Primary Marketing Colors */
            --marketing-primary: #1E40AF;      /* Strategic Blue - headlines, CTAs */
            --marketing-primary-hover: #1E3A8A; /* Interactive states */
            --marketing-primary-light: #EFF6FF; /* Backgrounds, highlights */
            
            /* Success & Growth (Conversion Colors) */
            --marketing-success: #059669;      /* Success indicators, testimonials */
            --marketing-success-light: #ECFDF5; /* Success backgrounds */
            
            /* Energy & Action (CTA Colors) */
            --marketing-cta: #EA580C;          /* Primary CTAs, urgency */
            --marketing-cta-hover: #DC2626;    /* CTA hover states */
            --marketing-cta-light: #FFF7ED;    /* CTA backgrounds */
            
            /* Professional Neutrals */
            --marketing-text-primary: #1E293B;   /* Headlines, key copy */
            --marketing-text-secondary: #64748B; /* Supporting copy */
            --marketing-text-muted: #94A3B8;     /* Captions, meta info */
            
            /* Marketing Backgrounds */
            --marketing-bg-primary: #FFFFFF;     /* Clean white base */
            --marketing-bg-secondary: #F8FAFC;   /* Section alternating */
            --marketing-bg-accent: #F1F5F9;      /* Feature highlights */
          }
        `}</style>
      </head>
      <body
        className={`${inter.variable} antialiased marketing-context`}
        style={{
          fontFamily: 'var(--font-inter)',
          color: 'var(--marketing-text-primary)',
          backgroundColor: 'var(--marketing-bg-primary)'
        }}
      >
        <MantineWrapper>
          <DesignSystemProvider context="marketing">
            {children}
          </DesignSystemProvider>
        </MantineWrapper>
      </body>
    </html>
  );
}