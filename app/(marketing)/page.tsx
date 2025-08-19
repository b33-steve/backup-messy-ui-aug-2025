/**
 * Component: MarketingHomePage
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md - Redirects to Intelligence Operations app
 * UX Pattern: PM33_ Complete _UX_System.md - Separates marketing from login app
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied
 * - [x] Animations implemented
 * - [x] Hover states added
 * - [x] AI intelligence visible
 * - [x] Progress indicators present
 * - [x] Follows 8pt grid spacing
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PM33PageWrapper } from '@/components/PM33PageWrapper';
import { PM33Card } from '@/components/PM33Card';
import { PM33AIProcessing } from '@/components/PM33AIProcessing';

// Redirect marketing homepage to the actual PM33 Intelligence Operations app
export default function HomePage() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    // Show loading state for 1.5 seconds to demonstrate PM33 AI processing
    const timer = setTimeout(() => {
      // This should redirect to the PM Command Center (the actual app)
      router.push('/dashboard');
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <PM33PageWrapper>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        {isRedirecting ? (
          <PM33Card style={{
            maxWidth: '600px',
            textAlign: 'center',
            padding: '3rem'
          }}>
            <div style={{
              marginBottom: '2rem'
            }}>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                PM33 Intelligence Operations
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '2rem'
              }}>
                Initializing your strategic command center...
              </p>
            </div>
            
            <PM33AIProcessing 
              message="Loading your Intelligence Operations dashboard..."
              subMessage="Preparing strategic insights and AI recommendations"
              size="md"
            />
            
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'rgba(102,126,234,0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(102,126,234,0.2)'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'white',
                marginBottom: '0.5rem'
              }}>
                🚀 Welcome to PM33 Beta
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: '1.5'
              }}>
                You're accessing the next-generation PM intelligence platform.
                <br />
                <strong>Intelligence Operations</strong> starting at $29/month.
              </p>
            </div>
          </PM33Card>
        ) : (
          <PM33Card>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h1 style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                PM33 Intelligence Operations
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                Redirecting to your command center...
              </p>
            </div>
          </PM33Card>
        )}
      </div>
    </PM33PageWrapper>
  );
}