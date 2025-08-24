import Link from 'next/link';

export default function FooterSimple() {
  return (
    <footer style={{
      backgroundColor: '#1a202c',
      color: 'white',
      padding: '64px 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '48px',
          marginBottom: '48px'
        }}>
          {/* Company Section */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: 800, 
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0,
                marginBottom: '8px'
              }}>
                PM33
              </h3>
              <span style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#a78bfa',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '16px',
                padding: '4px 8px'
              }}>
                AI-Powered
              </span>
            </div>
            
            <p style={{ 
              color: '#9ca3af', 
              lineHeight: 1.6, 
              marginBottom: '24px'
            }}>
              Built by the PM community, for the PM community. Enhancing your existing tools with AI intelligence.
            </p>
            
            <Link
              href="/trial"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              Start Free Trial
            </Link>
          </div>
          
          {/* Product Section */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '14px', marginBottom: '16px', margin: 0 }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/features" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>Features</Link>
              <Link href="/pricing" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>Pricing</Link>
              <Link href="/strategic-intelligence" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>Strategic Intelligence</Link>
              <Link href="/command-center" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>Command Center</Link>
            </div>
          </div>
          
          {/* Solutions Section */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '14px', marginBottom: '16px', margin: 0 }}>Solutions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/jira-alternative" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>Jira Alternative</Link>
              <Link href="/monday-alternative" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>Monday Alternative</Link>
              <Link href="/asana-competitor" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>Asana Alternative</Link>
              <Link href="/ai-powered-roadmap-tool" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>AI Roadmap Tool</Link>
            </div>
          </div>
          
          {/* Community Section */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '14px', marginBottom: '16px', margin: 0 }}>Community</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/templates" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>PM Templates</Link>
              <Link href="/about" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>About</Link>
              <Link href="/contact" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>Contact</Link>
              <Link href="/security" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>Security</Link>
              <Link href="/privacy" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>Privacy</Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div style={{
          borderTop: '1px solid rgba(75, 85, 99, 0.3)',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
            © 2025 PM33. Built by the PM community, for the PM community.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#4ade80',
              borderRadius: '50%',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }} />
            <span style={{ fontSize: '14px', color: '#9ca3af' }}>2,500+ PMs trust PM33</span>
          </div>
        </div>
      </div>
    </footer>
  );
}