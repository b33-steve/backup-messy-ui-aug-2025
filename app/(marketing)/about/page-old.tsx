export default function AboutPage() {
  return (
    <div className="marketing-context">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 700, color: 'var(--marketing-text-primary)', marginBottom: '24px' }}>
            About PM33
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--marketing-text-secondary)', maxWidth: '800px', margin: '0 auto 48px auto', lineHeight: 1.6 }}>
            We're transforming how Product Managers work by providing PMO-level strategic capabilities through intelligent AI teams. Our mission is to turn every PM into a strategic powerhouse.
          </p>
        </div>

        <div style={{
          backgroundColor: 'var(--marketing-bg-accent)',
          border: '1px solid var(--marketing-primary)',
          borderRadius: '16px',
          padding: '48px',
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{ color: 'var(--marketing-text-primary)', marginBottom: '24px', fontSize: '2rem', fontWeight: 600 }}>
            Our Mission
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--marketing-text-secondary)', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto' }}>
            To democratize PMO-level strategic intelligence for every Product Manager, 
            regardless of company size or budget. We believe strategic thinking shouldn't 
            be limited to executives—every PM deserves AI-powered strategic capabilities.
          </p>
        </div>

        <h2 style={{ color: 'var(--marketing-text-primary)', textAlign: 'center', marginBottom: '48px', fontSize: '2rem', fontWeight: 600 }}>
          Our Values
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '4rem' }}>
          <div style={{
            backgroundColor: 'var(--marketing-bg-primary)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '16px',
            padding: '32px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'var(--marketing-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '24px'
            }}>
              🧠
            </div>
            
            <h3 style={{ color: 'var(--marketing-text-primary)', marginBottom: '16px', fontSize: '1.25rem', fontWeight: 600 }}>
              AI-First Intelligence
            </h3>
            <p style={{ color: 'var(--marketing-text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              We believe every Product Manager deserves PMO-level strategic capabilities through intelligent AI teams.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--marketing-bg-primary)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '16px',
            padding: '32px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'var(--marketing-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '24px'
            }}>
              🚀
            </div>
            
            <h3 style={{ color: 'var(--marketing-text-primary)', marginBottom: '16px', fontSize: '1.25rem', fontWeight: 600 }}>
              Rapid Transformation
            </h3>
            <p style={{ color: 'var(--marketing-text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Transform from individual contributor to strategic leader in weeks, not years.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--marketing-bg-primary)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '16px',
            padding: '32px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'var(--marketing-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '24px'
            }}>
              🛡️
            </div>
            
            <h3 style={{ color: 'var(--marketing-text-primary)', marginBottom: '16px', fontSize: '1.25rem', fontWeight: 600 }}>
              Enterprise Security
            </h3>
            <p style={{ color: 'var(--marketing-text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Bank-level security with SOC 2 Type II compliance and data encryption at rest and in transit.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--marketing-bg-primary)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '16px',
            padding: '32px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'var(--marketing-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '24px'
            }}>
              👥
            </div>
            
            <h3 style={{ color: 'var(--marketing-text-primary)', marginBottom: '16px', fontSize: '1.25rem', fontWeight: 600 }}>
              Community-Driven
            </h3>
            <p style={{ color: 'var(--marketing-text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Built by PMs, for PMs. Our roadmap is driven by real user feedback and industry best practices.
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--marketing-bg-primary)',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '16px',
          padding: '48px'
        }}>
          <h2 style={{ color: 'var(--marketing-text-primary)', textAlign: 'center', marginBottom: '48px', fontSize: '2rem', fontWeight: 600 }}>
            PM33 by the Numbers
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '32px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--marketing-primary)', marginBottom: '8px' }}>
                10x
              </div>
              <p style={{ color: 'var(--marketing-text-secondary)', fontSize: '0.9rem' }}>
                Faster Strategic Analysis
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--marketing-primary)', marginBottom: '8px' }}>
                85%
              </div>
              <p style={{ color: 'var(--marketing-text-secondary)', fontSize: '0.9rem' }}>
                Average Confidence Score
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--marketing-primary)', marginBottom: '8px' }}>
                4
              </div>
              <p style={{ color: 'var(--marketing-text-secondary)', fontSize: '0.9rem' }}>
                AI Teams Working for You
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--marketing-primary)', marginBottom: '8px' }}>
                24/7
              </div>
              <p style={{ color: 'var(--marketing-text-secondary)', fontSize: '0.9rem' }}>
                Strategic Intelligence
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}