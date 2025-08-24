export default function PricingPage() {
  return (
    <div className="marketing-context">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 700, color: 'var(--marketing-text-primary)', marginBottom: '24px' }}>
            Intelligence Operations Pricing
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--marketing-text-secondary)', maxWidth: '700px', margin: '0 auto 48px auto', lineHeight: 1.6 }}>
            Usage-based pricing that scales with your PMO transformation. No per-seat limits, no feature restrictions—just pure intelligence.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{
            backgroundColor: 'var(--marketing-bg-primary)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '16px',
            padding: '32px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--marketing-primary)',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 600
            }}>
              Most Popular
            </div>

            <h3 style={{ color: 'var(--marketing-text-primary)', marginBottom: '8px', fontSize: '1.5rem', fontWeight: 600 }}>
              Starter
            </h3>
            <p style={{ color: 'var(--marketing-text-secondary)', fontSize: '0.9rem', marginBottom: '32px' }}>
              Perfect for individual PMs starting their AI transformation
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--marketing-primary)', lineHeight: 1 }}>
                $29
              </div>
              <div style={{ color: 'var(--marketing-text-secondary)', fontSize: '0.9rem', marginTop: '8px' }}>
                per month
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              {['1 PM workspace', '50 AI analyses per month', 'Basic frameworks (ICE, RICE)', 'Email support'].map((feature, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--marketing-success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: 'white'
                  }}>
                    ✓
                  </div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--marketing-text-secondary)' }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button style={{
              width: '100%',
              padding: '12px 24px',
              backgroundColor: 'var(--marketing-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              ✨ Start Free Trial
            </button>
          </div>

          <div style={{
            backgroundColor: 'var(--marketing-bg-primary)',
            border: '2px solid var(--marketing-primary)',
            borderRadius: '16px',
            padding: '32px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--marketing-success)',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 600
            }}>
              Best Value
            </div>

            <h3 style={{ color: 'var(--marketing-text-primary)', marginBottom: '8px', fontSize: '1.5rem', fontWeight: 600 }}>
              Team
            </h3>
            <p style={{ color: 'var(--marketing-text-secondary)', fontSize: '0.9rem', marginBottom: '32px' }}>
              For product teams ready to scale strategic intelligence
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--marketing-primary)', lineHeight: 1 }}>
                $79
              </div>
              <div style={{ color: 'var(--marketing-text-secondary)', fontSize: '0.9rem', marginTop: '8px' }}>
                per month
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              {['5 PM workspaces', '200 AI analyses per month', 'Advanced frameworks', 'Priority support'].map((feature, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--marketing-success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: 'white'
                  }}>
                    ✓
                  </div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--marketing-text-secondary)' }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button style={{
              width: '100%',
              padding: '12px 24px',
              backgroundColor: 'var(--marketing-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              ✨ Start Free Trial
            </button>
          </div>

          <div style={{
            backgroundColor: 'var(--marketing-bg-primary)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '16px',
            padding: '32px'
          }}>
            <h3 style={{ color: 'var(--marketing-text-primary)', marginBottom: '8px', fontSize: '1.5rem', fontWeight: 600 }}>
              Enterprise
            </h3>
            <p style={{ color: 'var(--marketing-text-secondary)', fontSize: '0.9rem', marginBottom: '32px' }}>
              For enterprises requiring full PMO transformation
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--marketing-primary)', lineHeight: 1 }}>
                $599
              </div>
              <div style={{ color: 'var(--marketing-text-secondary)', fontSize: '0.9rem', marginTop: '8px' }}>
                per month
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              {['Unlimited workspaces', 'Unlimited AI analyses', 'Custom frameworks', 'Dedicated support'].map((feature, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--marketing-success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: 'white'
                  }}>
                    ✓
                  </div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--marketing-text-secondary)' }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button style={{
              width: '100%',
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: 'var(--marketing-text-primary)',
              border: '1px solid rgba(0,0,0,0.2)',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}