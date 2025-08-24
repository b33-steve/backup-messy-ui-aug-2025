export default function AboutPage() {
  return (
    <div className="marketing-context" style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--marketing-text-primary)' }}>
          About PM33
        </h1>
        <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '3rem', color: 'var(--marketing-text-secondary)' }}>
          We're democratizing strategic product management through AI-powered intelligence teams.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--marketing-primary)', marginBottom: '0.5rem' }}>2,500+</h3>
            <p style={{ color: 'var(--marketing-text-muted)', margin: 0 }}>Product Managers</p>
          </div>
          
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--marketing-primary)', marginBottom: '0.5rem' }}>300%</h3>
            <p style={{ color: 'var(--marketing-text-muted)', margin: 0 }}>Productivity Boost</p>
          </div>
          
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--marketing-primary)', marginBottom: '0.5rem' }}>4</h3>
            <p style={{ color: 'var(--marketing-text-muted)', margin: 0 }}>AI Teams</p>
          </div>
          
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--marketing-primary)', marginBottom: '0.5rem' }}>85%</h3>
            <p style={{ color: 'var(--marketing-text-muted)', margin: 0 }}>Success Rate</p>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--marketing-text-primary)', marginBottom: '1rem' }}>
              The Problem We're Solving
            </h3>
            <p style={{ color: 'var(--marketing-text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              60-80% of PM time goes to administrative busywork instead of strategic thinking. 
              Writing PRDs, synthesizing feedback, creating presentations—all manually.
            </p>
            <p style={{ color: 'var(--marketing-text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Meanwhile, strategic opportunities slip by. Competitors ship faster because their 
              PMs focus on strategy while yours handle admin tasks.
            </p>
          </div>
          
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--marketing-text-primary)', marginBottom: '1rem' }}>
              Our Solution
            </h3>
            <p style={{ color: 'var(--marketing-text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              PM33 provides 4 specialized AI teams that handle the busywork: Strategic Intelligence, 
              Workflow Execution, Data Analysis, and Communication.
            </p>
            <p style={{ color: 'var(--marketing-text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Transform from reactive task-handler to strategic leader in weeks. Focus on vision, 
              strategy, and market opportunities—not administrative overhead.
            </p>
          </div>
        </div>
        
        <div style={{ padding: '3rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', color: 'white' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', color: 'white' }}>
            Ready to Transform Your PM Work?
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: 'rgba(255, 255, 255, 0.9)' }}>
            Join 2,500+ product managers who've made the leap from busywork to strategic leadership.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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
            <a 
              href="/contact" 
              style={{ 
                display: 'inline-block',
                padding: '12px 24px', 
                backgroundColor: 'transparent', 
                color: 'white', 
                textDecoration: 'none', 
                borderRadius: '8px', 
                fontWeight: 600,
                fontSize: '1.125rem',
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              Get in Touch
            </a>
          </div>
          <p style={{ fontSize: '0.875rem', marginTop: '1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
            ✅ No credit card required • ✅ Setup in 5 minutes • ✅ Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}