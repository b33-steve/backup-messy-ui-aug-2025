export default function ContactPage() {
  return (
    <div className="marketing-context">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 700, color: 'var(--marketing-text-primary)', marginBottom: '24px' }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--marketing-text-secondary)', maxWidth: '600px', margin: '0 auto 48px auto', lineHeight: 1.6 }}>
            Ready to transform your product management with AI? Let's discuss how PM33 can help your team achieve PMO-level strategic capabilities.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '4rem' }}>
          <div style={{
            backgroundColor: 'var(--marketing-bg-primary)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'var(--marketing-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '20px'
            }}>
              📧
            </div>
            
            <h4 style={{ color: 'var(--marketing-text-primary)', marginBottom: '8px', fontSize: '1.1rem', fontWeight: 600 }}>
              Email Us
            </h4>
            <p style={{ fontWeight: 600, color: 'var(--marketing-primary)', marginBottom: '8px' }}>
              hello@pm33.ai
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--marketing-text-secondary)' }}>
              Get in touch for sales, support, or partnership opportunities
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--marketing-bg-primary)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'var(--marketing-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '20px'
            }}>
              📞
            </div>
            
            <h4 style={{ color: 'var(--marketing-text-primary)', marginBottom: '8px', fontSize: '1.1rem', fontWeight: 600 }}>
              Schedule a Call
            </h4>
            <p style={{ fontWeight: 600, color: 'var(--marketing-primary)', marginBottom: '8px' }}>
              Book a Demo
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--marketing-text-secondary)' }}>
              See PM33 in action with a personalized demo
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--marketing-bg-primary)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'var(--marketing-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '20px'
            }}>
              📍
            </div>
            
            <h4 style={{ color: 'var(--marketing-text-primary)', marginBottom: '8px', fontSize: '1.1rem', fontWeight: 600 }}>
              Headquarters
            </h4>
            <p style={{ fontWeight: 600, color: 'var(--marketing-primary)', marginBottom: '8px' }}>
              San Francisco, CA
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--marketing-text-secondary)' }}>
              Building the future of product management
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--marketing-bg-primary)',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '16px',
          padding: '48px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: 'var(--marketing-text-primary)', marginBottom: '32px', fontSize: '2rem', fontWeight: 600 }}>
            Send Us a Message
          </h2>
          
          <p style={{ fontSize: '1.1rem', color: 'var(--marketing-text-secondary)', maxWidth: '600px', lineHeight: 1.6, margin: '0 auto 32px auto' }}>
            We're here to help you transform your product management approach with AI-powered strategic intelligence.
          </p>
          
          <button style={{
            padding: '16px 32px',
            backgroundColor: 'var(--marketing-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            📧 Send Message
          </button>
        </div>
      </div>
    </div>
  );
}