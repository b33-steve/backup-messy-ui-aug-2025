export default function ContactPage() {
  return (
    <div className="marketing-context" style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>
          Contact PM33
        </h1>
        <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '3rem' }}>
          Ready to transform your product management workflow? Get in touch with our team.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
              Sales & Demos
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              Schedule a personalized demo to see PM33 in action.
            </p>
            <a href="mailto:sales@pm33.ai?subject=Demo Request" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 600 }}>
              sales@pm33.ai
            </a>
          </div>
          
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
              Support
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              Get help with your PM33 account and features.
            </p>
            <a href="mailto:support@pm33.ai?subject=Support Request" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 600 }}>
              support@pm33.ai
            </a>
          </div>
          
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
              General
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              Questions, partnerships, or media inquiries.
            </p>
            <a href="mailto:hello@pm33.ai?subject=General Inquiry" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 600 }}>
              hello@pm33.ai
            </a>
          </div>
        </div>
        
        <div style={{ padding: '3rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', color: 'white' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', color: 'white' }}>
            Start Your Free Trial
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: 'rgba(255, 255, 255, 0.9)' }}>
            Experience PM33's AI-powered intelligence teams. No credit card required.
          </p>
          <a 
            href="/trial" 
            style={{ 
              display: 'inline-block',
              padding: '12px 24px', 
              backgroundColor: 'white', 
              color: '#667eea', 
              textDecoration: 'none', 
              borderRadius: '8px', 
              fontWeight: 600,
              fontSize: '1.125rem'
            }}
          >
            Start Free 14-Day Trial
          </a>
          <p style={{ fontSize: '0.875rem', marginTop: '1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
            ✅ Setup in 5 minutes • ✅ Full feature access • ✅ Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}