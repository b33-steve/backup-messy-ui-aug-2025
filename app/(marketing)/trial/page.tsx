export default function TrialPage() {
  return (
    <div className="marketing-context" style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--marketing-text-primary)' }}>
          Start Your Free Trial
        </h1>
        <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '3rem', color: 'var(--marketing-text-secondary)' }}>
          Experience PM33's AI-powered intelligence teams. Transform from task manager to strategic leader in 14 days.
        </p>
        
        <div style={{ padding: '3rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', color: 'white', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', color: 'white' }}>
            14-Day Free Trial
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: 'rgba(255, 255, 255, 0.9)' }}>
            Full access to all 4 AI intelligence teams. No credit card required.
          </p>
          <a 
            href="mailto:sales@pm33.ai?subject=Free Trial Request" 
            style={{ 
              display: 'inline-block',
              padding: '16px 32px', 
              backgroundColor: 'white', 
              color: '#667eea', 
              textDecoration: 'none', 
              borderRadius: '8px', 
              fontWeight: 600,
              fontSize: '1.25rem'
            }}
          >
            Start Free Trial
          </a>
          <p style={{ fontSize: '0.875rem', marginTop: '1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
            ✅ No credit card required • ✅ Setup in 5 minutes • ✅ Cancel anytime
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--marketing-text-primary)', marginBottom: '1rem' }}>
              Strategic Intelligence
            </h3>
            <p style={{ color: 'var(--marketing-text-secondary)', marginBottom: '1rem' }}>
              AI-powered strategic analysis using frameworks like ICE, RICE, and Porter's Five Forces.
            </p>
            <ul style={{ textAlign: 'left', color: 'var(--marketing-text-muted)' }}>
              <li>Multi-framework analysis</li>
              <li>Competitive intelligence</li>
              <li>Strategic recommendations</li>
            </ul>
          </div>
          
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--marketing-text-primary)', marginBottom: '1rem' }}>
              Workflow Execution
            </h3>
            <p style={{ color: 'var(--marketing-text-secondary)', marginBottom: '1rem' }}>
              Automated task creation and cross-functional coordination with PM tool integration.
            </p>
            <ul style={{ textAlign: 'left', color: 'var(--marketing-text-muted)' }}>
              <li>Automated workflows</li>
              <li>Timeline management</li>
              <li>Progress tracking</li>
            </ul>
          </div>
          
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--marketing-text-primary)', marginBottom: '1rem' }}>
              Data Intelligence
            </h3>
            <p style={{ color: 'var(--marketing-text-secondary)', marginBottom: '1rem' }}>
              Company-specific context learning and predictive analytics for optimization.
            </p>
            <ul style={{ textAlign: 'left', color: 'var(--marketing-text-muted)' }}>
              <li>Performance optimization</li>
              <li>Trend analysis</li>
              <li>Predictive insights</li>
            </ul>
          </div>
          
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--marketing-text-primary)', marginBottom: '1rem' }}>
              Communication
            </h3>
            <p style={{ color: 'var(--marketing-text-secondary)', marginBottom: '1rem' }}>
              Professional stakeholder communication and executive summary generation.
            </p>
            <ul style={{ textAlign: 'left', color: 'var(--marketing-text-muted)' }}>
              <li>Executive summaries</li>
              <li>Stakeholder alignment</li>
              <li>Strategic presentations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}