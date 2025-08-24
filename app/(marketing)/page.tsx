export default function MarketingHomePage() {
  return (
    <div className="marketing-context">
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 24px'
      }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#eef2ff',
            color: '#6366f1',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '32px'
          }}>
            ✨ Trusted by 2,500+ Product Managers
          </div>
          
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 700,
            color: '#1f2937',
            marginBottom: '24px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}>
            Don't Replace Your PM Tools—<br />
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Make Them 10x Smarter
            </span>
          </h1>
          
          <p style={{
            fontSize: '1.375rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto 48px auto',
            lineHeight: 1.6
          }}>
            Transform Jira, Monday.com, and Asana into AI-powered strategic engines. 
            <span style={{ fontWeight: 600, color: '#6366f1' }}> No migration headaches.</span> Immediate productivity gains.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '40px'
          }}>
            <a
              href="/trial"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 600,
                boxShadow: '0 4px 15px 0 rgba(99, 102, 241, 0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              Start Free 14-Day Trial →
            </a>
            <a
              href="/strategic-intelligence"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '2px solid #6366f1',
                color: '#6366f1',
                padding: '14px 30px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
            >
              💡 Try Live Demo
            </a>
          </div>

          <div style={{
            display: 'flex',
            gap: '40px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {['No credit card required', 'Setup in 5 minutes', 'Cancel anytime'].map((text, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981', fontSize: '18px' }}>✓</span>
                <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Section */}
        <div style={{ marginBottom: '96px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#eef2ff',
              color: '#6366f1',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '24px'
            }}>
              ✨ Live Demo Experience
            </div>
            
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 700,
              color: '#1f2937',
              marginBottom: '24px'
            }}>
              See PM33 in Action
            </h2>
            
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              lineHeight: 1.6
            }}>
              Experience the full power of AI-driven product management with our interactive demo workflows.
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: '32px'
          }}>
            {/* Strategic Intelligence Demo */}
            <a
              href="/strategic-intelligence"
              style={{
                display: 'block',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '40px',
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px',
                  fontSize: '28px'
                }}>
                  🧠
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '4px' }}>
                    Strategic Intelligence Engine
                  </h3>
                  <span style={{
                    fontSize: '12px',
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontWeight: 600
                  }}>
                    ✅ Ready to Try
                  </span>
                </div>
              </div>
              
              <p style={{
                color: '#6b7280',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}>
                Transform strategic questions into executable workflows with automated priority scoring and AI analysis
              </p>
              
              <div style={{ marginBottom: '24px' }}>
                {[
                  'Multi-framework analysis',
                  'Confidence-scored recommendations', 
                  'Predictive outcome modeling'
                ].map((feature, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    <span style={{ color: '#6366f1', fontSize: '16px' }}>✓</span>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#6366f1' }}>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div style={{
                backgroundColor: '#f8fafc',
                color: '#6366f1',
                padding: '12px 24px',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 600
              }}>
                Try Strategic Intelligence →
              </div>
            </a>

            {/* Command Center Demo */}
            <a
              href="/command-center"
              style={{
                display: 'block',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '40px',
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px',
                  fontSize: '28px'
                }}>
                  🎯
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '4px' }}>
                    Strategic Command Center
                  </h3>
                  <span style={{
                    fontSize: '12px',
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontWeight: 600
                  }}>
                    ✅ Ready to Try
                  </span>
                </div>
              </div>
              
              <p style={{
                color: '#6b7280',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}>
                Real-time orchestration of 4 specialized AI teams transforming PM workflows with live metrics
              </p>
              
              <div style={{ marginBottom: '24px' }}>
                {[
                  '4 AI teams coordination',
                  'Real-time strategic metrics',
                  'End-to-end workflow automation'
                ].map((feature, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    <span style={{ color: '#06b6d4', fontSize: '16px' }}>✓</span>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#06b6d4' }}>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div style={{
                backgroundColor: '#f0f9ff',
                color: '#0284c7',
                padding: '12px 24px',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 600
              }}>
                Try Command Center →
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}