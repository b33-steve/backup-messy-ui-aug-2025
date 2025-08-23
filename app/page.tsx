/**
 * Component: Root Homepage - Marketing Landing Page  
 * Purpose: Show PM33 marketing homepage content directly at root path
 * Context: Marketing website entry point for prospects and visitors
 * RELEVANT FILES: app/(marketing)/page.tsx, app/layout.tsx
 */

import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Simple Navigation */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '4rem',
        maxWidth: '1200px',
        margin: '0 auto 4rem auto'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>
          PM33
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/about" style={{ textDecoration: 'none', color: '#64748b' }}>About</Link>
          <Link href="/features" style={{ textDecoration: 'none', color: '#64748b' }}>Features</Link>
          <Link href="/pricing" style={{ textDecoration: 'none', color: '#64748b' }}>Pricing</Link>
          <Link href="/trial" style={{ 
            textDecoration: 'none', 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem'
          }}>Start Trial</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '4rem 2rem',
          borderRadius: '1rem',
          marginBottom: '3rem'
        }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '900', 
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            Transform from Reactive PM to Strategic PMO Leader
          </h1>
          
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            PM33: Your AI Strategy Copilot - Think McKinsey + PM mentor + Data scientist in one platform
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/trial" style={{
              textDecoration: 'none',
              backgroundColor: '#f97316',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              fontSize: '1.125rem',
              fontWeight: '600'
            }}>
              Start Free 14-Day Trial
            </Link>
            
            <Link href="/demo" style={{
              textDecoration: 'none',
              border: '2px solid rgba(255, 255, 255, 0.8)',
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              fontSize: '1.125rem',
              fontWeight: '600'
            }}>
              See Live Demo
            </Link>
          </div>
          
          <p style={{ fontSize: '0.875rem', marginTop: '1.5rem', opacity: 0.8 }}>
            No credit card required • 2-minute setup • Instant strategic value
          </p>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Strategic Intelligence AI</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
              Multi-framework analysis (ICE, RICE, Porter's Five Forces) with competitive intelligence
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Workflow Execution AI</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
              Automated task creation and cross-functional coordination with PM tool integration
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Data Intelligence AI</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
              Company-specific learning and predictive analytics with performance optimization
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Communication AI</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
              Stakeholder communication and executive summaries with alignment facilitation
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{
          backgroundColor: '#059669',
          color: 'white',
          padding: '3rem 2rem',
          borderRadius: '1rem',
          marginBottom: '3rem'
        }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Ready to Transform Your Product Management?
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
            Join 2,500+ PMs who've transformed from reactive to strategic leaders
          </p>
          
          <Link href="/trial" style={{
            textDecoration: 'none',
            backgroundColor: 'white',
            color: '#059669',
            padding: '1rem 2rem',
            borderRadius: '0.75rem',
            fontSize: '1.125rem',
            fontWeight: '600'
          }}>
            Start Your Free Trial Today
          </Link>
        </div>
      </main>

      {/* Simple Footer */}
      <footer style={{
        borderTop: '1px solid #e2e8f0',
        padding: '2rem 0',
        marginTop: '4rem',
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '4rem auto 0 auto'
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <Link href="/features" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.875rem' }}>Features</Link>
              <Link href="/pricing" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.875rem' }}>Pricing</Link>
              <Link href="/trial" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.875rem' }}>Free Trial</Link>
            </div>
          </div>
          
          <div>
            <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <Link href="/about" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.875rem' }}>About</Link>
              <Link href="/blog" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.875rem' }}>Blog</Link>
              <Link href="/contact" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.875rem' }}>Contact</Link>
            </div>
          </div>
        </div>
        
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
          © 2025 PM33. Strategic Intelligence Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}