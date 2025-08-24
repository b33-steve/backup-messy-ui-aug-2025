export default function ContactPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '4rem 2rem',
      background: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        textAlign: 'center',
        background: 'white',
        padding: '3rem',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 800, 
          marginBottom: '2rem',
          color: '#1e293b'
        }}>
          Contact PM33
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          lineHeight: 1.6, 
          marginBottom: '2rem',
          color: '#64748b'
        }}>
          Ready to transform your product management workflow?
        </p>
        <div style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          color: 'white',
          marginTop: '2rem'
        }}>
          <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
            Get in touch: hello@pm33.ai
          </p>
          <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            We'll respond within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}