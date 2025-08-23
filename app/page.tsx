'use client';

// app/frontend/app/page.tsx
// Minimal homepage - Native HTML/CSS for guaranteed build success
// WHY: Complex Mantine components were causing build failures on Vercel
// RELEVANT FILES: app/layout.tsx

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '60px 40px',
        textAlign: 'center',
        maxWidth: '800px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '700',
          color: 'white',
          marginBottom: '20px',
          lineHeight: '1.1'
        }}>
          PM33
        </h1>
        
        <p style={{
          fontSize: '1.5rem',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          PMO Transformation Platform
        </p>
        
        <p style={{
          fontSize: '1.1rem',
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '50px',
          lineHeight: '1.6'
        }}>
          Transform individual Product Managers into fully functional PMOs through agentic AI teams
        </p>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a 
            href="/trial" 
            style={{
              background: 'white',
              color: '#667eea',
              padding: '15px 30px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.1rem',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => (e.target as HTMLElement).style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => (e.target as HTMLElement).style.transform = 'translateY(0px)'}
          >
            Start Free Trial
          </a>
          
          <a 
            href="/demo" 
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.1rem',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => (e.target as HTMLElement).style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => (e.target as HTMLElement).style.transform = 'translateY(0px)'}
          >
            Live Demo
          </a>
        </div>
      </div>
      
      <div style={{
        marginTop: '40px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.9rem'
      }}>
        🚀 Target: $100K MRR by EOY 2025 • 4 Agentic AI Teams • PMO-Level Capabilities
      </div>
    </div>
  );
}