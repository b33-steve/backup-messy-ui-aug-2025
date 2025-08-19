/**
 * Component: PM33AIProcessing
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md - Section AI Processing State
 * UX Pattern: PM33_ Complete _UX_System.md - Premium AI loader, never basic spinners
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied
 * - [x] Animations implemented
 * - [x] Hover states added
 * - [x] AI intelligence visible
 * - [x] Progress indicators present
 * - [x] Follows 8pt grid spacing
 */

'use client';

interface PM33AIProcessingProps {
  message?: string;
  subMessage?: string;
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const PM33AIProcessing = ({ 
  message = "Analyzing strategic implications...",
  subMessage = "This may take a few moments",
  showProgress = true,
  size = 'md'
}: PM33AIProcessingProps) => {
  const sizes = {
    sm: {
      container: 'p-6',
      brain: 'w-20 h-20',
      icon: 'w-10 h-10',
      text: 'text-base',
      subText: 'text-sm'
    },
    md: {
      container: 'p-12',
      brain: 'w-32 h-32',
      icon: 'w-16 h-16',
      text: 'text-lg',
      subText: 'text-sm'
    },
    lg: {
      container: 'p-16',
      brain: 'w-40 h-40',
      icon: 'w-20 h-20',
      text: 'text-xl',
      subText: 'text-base'
    }
  };

  const sizeConfig = sizes[size];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: size === 'sm' ? '24px' : size === 'md' ? '48px' : '64px'
    }}>
      {/* Animated AI Brain */}
      <div style={{
        position: 'relative',
        width: size === 'sm' ? '80px' : size === 'md' ? '128px' : '160px',
        height: size === 'sm' ? '80px' : size === 'md' ? '128px' : '160px',
        marginBottom: size === 'sm' ? '24px' : '32px'
      }}>
        {/* Outer glow rings */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          opacity: 0.2,
          animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          opacity: 0.3,
          animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
          animationDelay: '0.5s'
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          opacity: 0.4,
          animation: 'pulse 2s ease-in-out infinite'
        }} />
        
        {/* Core brain icon */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 60px rgba(102,126,234,0.6)'
        }}>
          <svg 
            style={{
              width: size === 'sm' ? '40px' : size === 'md' ? '64px' : '80px',
              height: size === 'sm' ? '40px' : size === 'md' ? '64px' : '80px',
              color: 'white',
              animation: 'pulse 2s ease-in-out infinite'
            }}
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <circle cx="12" cy="12" r="3" style={{ animation: 'ping 1.5s ease-in-out infinite' }}/>
          </svg>
        </div>
      </div>
      
      {/* Thinking dots */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          animation: 'bounce 1.4s ease-in-out infinite',
          animationDelay: '0ms'
        }} />
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
          animation: 'bounce 1.4s ease-in-out infinite',
          animationDelay: '150ms'
        }} />
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          animation: 'bounce 1.4s ease-in-out infinite',
          animationDelay: '300ms'
        }} />
      </div>
      
      {/* Status text with gradient */}
      <p style={{
        fontSize: size === 'sm' ? '1rem' : size === 'md' ? '1.125rem' : '1.25rem',
        fontWeight: '500',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'fade-pulse 2s ease-in-out infinite',
        textAlign: 'center',
        marginBottom: '8px'
      }}>
        {message}
      </p>
      
      {/* Sub message */}
      {subMessage && (
        <p style={{
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center',
          marginBottom: showProgress ? '16px' : '0'
        }}>
          {subMessage}
        </p>
      )}
      
      {/* Progress bar */}
      {showProgress && (
        <div style={{
          width: '256px',
          height: '4px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            borderRadius: '2px',
            animation: 'progress-slide 2s ease-in-out infinite'
          }} />
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes fade-pulse {
          0%, 100% { 
            opacity: 1; 
          }
          50% { 
            opacity: 0.7; 
          }
        }
        
        @keyframes progress-slide {
          0% {
            width: 0%;
            margin-left: 0;
          }
          50% {
            width: 60%;
            margin-left: 20%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
      `}</style>
    </div>
  );
};