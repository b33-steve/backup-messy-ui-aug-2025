/**
 * Component: StrategicIntelligenceCard
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md - Section 2 (Strategic Intelligence Card)
 * UX Pattern: PM33_COMPLETE_UX_SYSTEM.md - Progressive Intelligence Disclosure
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

import { PM33Card } from './PM33Card';
import { PM33Button } from './PM33Button';

interface StrategicIntelligenceData {
  title: string;
  recommendation: string;
  confidence: number;
  frameworks: string[];
  timeline: string;
  tasks: number;
  impact: number;
}

interface StrategicIntelligenceCardProps {
  data: StrategicIntelligenceData;
  onViewDetails?: () => void;
  onCreateTasks?: () => void;
}

export const StrategicIntelligenceCard = ({ data, onViewDetails, onCreateTasks }: StrategicIntelligenceCardProps) => {
  return (
    <PM33Card className="strategic-intelligence-card">
      {/* Confidence Ring with Glow Effect */}
      <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
        <div style={{ position: 'relative', width: '80px', height: '80px' }}>
          {/* Background circle */}
          <svg style={{ width: '80px', height: '80px', transform: 'rotate(-90deg)' }}>
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="4"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="url(#confidence-gradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 36}`}
              strokeDashoffset={`${2 * Math.PI * 36 * (1 - data.confidence / 100)}`}
              style={{
                transition: 'stroke-dashoffset 1s ease-out',
                filter: 'url(#glow)'
              }}
            />
            <defs>
              <linearGradient id="confidence-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d2ff" />
                <stop offset="100%" stopColor="#3a7bd5" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
          {/* Percentage text */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.125rem'
            }}>
              {data.confidence}%
            </span>
          </div>
          {/* Pulsing glow */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,210,255,0.2) 0%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'pulse 3s ease-in-out infinite'
          }} />
        </div>
      </div>
      
      {/* AI Status Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
          }} />
        </div>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: '500',
          color: 'rgba(255,255,255,0.6)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          AI Analysis Complete
        </span>
      </div>
      
      {/* Title */}
      <h3 style={{
        fontSize: 'var(--font-h3)',
        fontWeight: 'var(--weight-semibold)',
        marginBottom: '12px',
        background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        {data.title}
      </h3>
      
      {/* Recommendation */}
      <p style={{
        color: 'rgba(255,255,255,0.8)',
        fontSize: 'var(--font-small)',
        lineHeight: 'var(--leading-relaxed)',
        marginBottom: '24px'
      }}>
        {data.recommendation}
      </p>
      
      {/* Framework Pills */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '24px'
      }}>
        {data.frameworks.map((framework, index) => (
          <span
            key={framework}
            style={{
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: '500',
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              background: 'linear-gradient(135deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%)',
              border: '1px solid rgba(102,126,234,0.3)',
              color: '#a5b4fc',
              cursor: 'pointer',
              animationDelay: `${index * 100}ms`,
              animation: 'fade-up 0.5s ease-out forwards'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.3) 100%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%)';
            }}
          >
            {framework}
          </span>
        ))}
      </div>
      
      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '12px',
          borderRadius: '8px',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            fontSize: 'var(--font-h3)',
            fontWeight: 'var(--weight-bold)',
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {data.timeline}
          </div>
          <div style={{
            fontSize: 'var(--font-tiny)',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '4px'
          }}>
            Timeline
          </div>
        </div>
        
        <div style={{
          textAlign: 'center',
          padding: '12px',
          borderRadius: '8px',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            fontSize: 'var(--font-h3)',
            fontWeight: 'var(--weight-bold)',
            background: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {data.tasks}
          </div>
          <div style={{
            fontSize: 'var(--font-tiny)',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '4px'
          }}>
            Tasks
          </div>
        </div>
        
        <div style={{
          textAlign: 'center',
          padding: '12px',
          borderRadius: '8px',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            fontSize: 'var(--font-h3)',
            fontWeight: 'var(--weight-bold)',
            background: 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            ${data.impact}K
          </div>
          <div style={{
            fontSize: 'var(--font-tiny)',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '4px'
          }}>
            Impact
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <PM33Button
          variant="secondary"
          size="md"
          onClick={onViewDetails}
          style={{ flex: 1 }}
        >
          View Details
        </PM33Button>
        
        <PM33Button
          variant="primary"
          size="md"
          onClick={onCreateTasks}
          style={{ flex: 1 }}
          icon={<span>🚀</span>}
        >
          Create Tasks
        </PM33Button>
      </div>

      {/* CSS Animations */}
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
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </PM33Card>
  );
};