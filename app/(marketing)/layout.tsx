import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import MantineWrapper from "../../components/shared/MantineProvider";
import { DesignSystemProvider } from "../../components/marketing/DesignSystemProvider";
import Navigation from "../../components/marketing/Navigation";

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
    <div 
      className={`${inter.variable} antialiased marketing-context`}
      style={{
        fontFamily: 'var(--font-inter)',
        color: 'var(--marketing-text-primary)',
        backgroundColor: 'var(--marketing-bg-primary)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <MantineWrapper>
        <DesignSystemProvider context="marketing">
          <Navigation />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          {/* Comprehensive Footer */}
          <footer style={{ 
            backgroundColor: 'var(--marketing-bg-secondary)', 
            borderTop: '1px solid #e0e0e0',
            marginTop: 'auto',
            padding: '48px 24px 24px 24px'
          }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '32px',
                marginBottom: '32px'
              }}>
                <div>
                  <h3 style={{ fontWeight: 700, marginBottom: '16px', fontSize: '18px' }}>Product</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href="/features" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Features</a>
                    <a href="/pricing" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Pricing</a>
                    <a href="/trial" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Free Trial</a>
                    <a href="/demo" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Demo</a>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ fontWeight: 700, marginBottom: '16px', fontSize: '18px' }}>Resources</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href="/blog" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Resources</a>
                    <a href="/about" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>About Us</a>
                    <a href="/contact" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Contact</a>
                    <a href="/support" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Support</a>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ fontWeight: 700, marginBottom: '16px', fontSize: '18px' }}>Legal</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href="/privacy" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Privacy Policy</a>
                    <a href="/terms" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Terms of Service</a>
                    <a href="/security" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Security</a>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ fontWeight: 700, marginBottom: '16px', fontSize: '18px' }}>Connect</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href="https://linkedin.com/company/pm33" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>LinkedIn</a>
                    <a href="https://twitter.com/PM33_AI" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Twitter</a>
                    <a href="/community" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Community</a>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                borderTop: '1px solid #e0e0e0',
                paddingTop: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--marketing-text-secondary)' }}>
                  © 2025 PM33. Strategic Intelligence Platform. All rights reserved.
                </p>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <a href="/privacy" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Privacy</a>
                  <a href="/terms" style={{ textDecoration: 'none', color: 'var(--marketing-text-secondary)', fontSize: '14px' }}>Terms</a>
                </div>
              </div>
            </div>
          </footer>
        </DesignSystemProvider>
      </MantineWrapper>
    </div>
  );
}