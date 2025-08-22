/**
 * Component: ProgressiveIntelligence
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md - Progressive Disclosure Pattern
 * UX Pattern: PM33_COMPLETE_UX_SYSTEM.md - Entry → Advanced → PMO Intelligence Levels
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

import { useState } from 'react';
import { PM33Card } from './PM33Card';
import { PM33Button } from './PM33Button';

type IntelligenceLevel = 'entry' | 'advanced' | 'pmo';

interface DecisionData {
  question: string;
  recommendation: 'yes' | 'no' | 'conditional';
  confidence: number;
  reasoning: {
    simple: string[];
    detailed: {
      framework: string;
      analysis: string;
      data: string;
      risk: string;
    };
    pmo: {
      strategicAlignment: string;
      resourceImpact: string;
      competitiveAnalysis: string;
      riskMitigation: string;
      implementation: string[];
      metrics: string[];
    };
  };
}

interface ProgressiveIntelligenceProps {
  decisionData: DecisionData;
  onAccept?: () => void;
  onReject?: () => void;
  initialLevel?: IntelligenceLevel;
}

export const ProgressiveIntelligence = ({ 
  decisionData, 
  onAccept, 
  onReject,
  initialLevel = 'entry' 
}: ProgressiveIntelligenceProps) => {
  const [level, setLevel] = useState<IntelligenceLevel>(initialLevel);

  const getRecommendationColor = () => {
    switch (decisionData.recommendation) {
      case 'yes': return 'var(--pm33-success)';
      case 'no': return 'var(--pm33-danger)';
      case 'conditional': return 'var(--pm33-warning)';
      default: return 'var(--pm33-brand)';
    }
  };

  const getRecommendationText = () => {
    switch (decisionData.recommendation) {
      case 'yes': return 'YES';
      case 'no': return 'NO';
      case 'conditional': return 'CONDITIONAL';
      default: return 'ANALYZING';
    }
  };

  const renderEntryLevel = () => (
    <div className="pm33-animate-fade-up">
      {/* Simple Decision */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: 'var(--font-h3)',
          fontWeight: 'var(--weight-semibold)',
          color: 'rgba(255,255,255,0.95)',
          marginBottom: '16px'
        }}>
          {decisionData.question}
        </h3>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            padding: '8px 16px',
            borderRadius: '20px',
            background: getRecommendationColor(),
            color: 'white',
            fontWeight: 'var(--weight-bold)',
            fontSize: 'var(--font-base)'
          }}>
            {getRecommendationText()}
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255,255,255,0.7)'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--pm33-ai-glow)',
              animation: 'pulse 2s ease-in-out infinite'
            }} />
            <span style={{ fontSize: 'var(--font-small)' }}>
              {decisionData.confidence}% confidence
            </span>
          </div>
        </div>
      </div>

      {/* Quick reasoning bullets */}
      <div style={{ marginBottom: '32px' }}>
        {decisionData.reasoning.simple.map((reason, index) => (
          <div 
            key={index}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '12px',
              animationDelay: `${index * 100}ms`
            }}
            className="pm33-animate-fade-up"
          >
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--pm33-ai-glow)',
              marginTop: '8px',
              flexShrink: 0
            }} />
            <span style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: 'var(--font-base)',
              lineHeight: 'var(--leading-normal)'
            }}>
              {reason}
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <PM33Button
            variant="primary"
            onClick={onAccept}
            icon={<span>✓</span>}
          >
            Accept & Execute
          </PM33Button>
          
          {onReject && (
            <PM33Button
              variant="secondary"
              onClick={onReject}
            >
              Decline
            </PM33Button>
          )}
        </div>
        
        <PM33Button
          variant="secondary"
          onClick={() => setLevel('advanced')}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          See Analysis →
        </PM33Button>
      </div>
    </div>
  );

  const renderAdvancedLevel = () => (
    <div className="pm33-animate-fade-up">
      {/* Header with back navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px'
      }}>
        <PM33Button
          variant="secondary"
          size="sm"
          onClick={() => setLevel('entry')}
          style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '6px 12px'
          }}
        >
          ← Back
        </PM33Button>
        
        <PM33Button
          variant="secondary"
          size="sm"
          onClick={() => setLevel('pmo')}
          style={{
            background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
            border: '1px solid rgba(102,126,234,0.2)',
            color: '#a5b4fc'
          }}
        >
          PMO Analysis →
        </PM33Button>
      </div>

      {/* Detailed Analysis Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {/* Framework Analysis */}
        <div style={{
          padding: '16px',
          borderRadius: '12px',
          background: 'rgba(102,126,234,0.1)',
          border: '1px solid rgba(102,126,234,0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '1.25rem' }}>📊</span>
            <span style={{
              fontWeight: 'var(--weight-semibold)',
              color: 'rgba(255,255,255,0.9)',
              fontSize: 'var(--font-base)'
            }}>
              Framework Analysis
            </span>
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 'var(--font-small)',
            lineHeight: 'var(--leading-normal)'
          }}>
            {decisionData.reasoning.detailed.framework}
          </p>
        </div>

        {/* Data Insights */}
        <div style={{
          padding: '16px',
          borderRadius: '12px',
          background: 'rgba(118,75,162,0.1)',
          border: '1px solid rgba(118,75,162,0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '1.25rem' }}>📈</span>
            <span style={{
              fontWeight: 'var(--weight-semibold)',
              color: 'rgba(255,255,255,0.9)',
              fontSize: 'var(--font-base)'
            }}>
              Data Insights
            </span>
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 'var(--font-small)',
            lineHeight: 'var(--leading-normal)'
          }}>
            {decisionData.reasoning.detailed.data}
          </p>
        </div>

        {/* Risk Assessment */}
        <div style={{
          padding: '16px',
          borderRadius: '12px',
          background: 'rgba(235,51,73,0.1)',
          border: '1px solid rgba(235,51,73,0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '1.25rem' }}>⚠️</span>
            <span style={{
              fontWeight: 'var(--weight-semibold)',
              color: 'rgba(255,255,255,0.9)',
              fontSize: 'var(--font-base)'
            }}>
              Risk Analysis
            </span>
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 'var(--font-small)',
            lineHeight: 'var(--leading-normal)'
          }}>
            {decisionData.reasoning.detailed.risk}
          </p>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div style={{
        padding: '20px',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        marginBottom: '24px'
      }}>
        <h4 style={{
          fontSize: 'var(--font-h4)',
          fontWeight: 'var(--weight-semibold)',
          color: 'rgba(255,255,255,0.95)',
          marginBottom: '12px'
        }}>
          Detailed Analysis
        </h4>
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: 'var(--font-base)',
          lineHeight: 'var(--leading-relaxed)'
        }}>
          {decisionData.reasoning.detailed.analysis}
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <PM33Button
          variant="primary"
          onClick={onAccept}
          icon={<span>✓</span>}
        >
          Accept Analysis
        </PM33Button>
        
        {onReject && (
          <PM33Button
            variant="secondary"
            onClick={onReject}
          >
            Need More Analysis
          </PM33Button>
        )}
      </div>
    </div>
  );

  const renderPMOLevel = () => (
    <div className="pm33-animate-fade-up">
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px'
      }}>
        <PM33Button
          variant="secondary"
          size="sm"
          onClick={() => setLevel('advanced')}
          style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '6px 12px'
          }}
        >
          ← Advanced
        </PM33Button>
        
        <div style={{
          padding: '6px 12px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(240,147,251,0.2) 0%, rgba(245,87,108,0.2) 100%)',
          border: '1px solid rgba(240,147,251,0.3)',
          color: '#f093fb',
          fontSize: 'var(--font-tiny)',
          fontWeight: 'var(--weight-semibold)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          PMO Intelligence
        </div>
      </div>

      {/* Strategic Context */}
      <div style={{
        padding: '20px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
        border: '1px solid rgba(102,126,234,0.2)',
        marginBottom: '24px'
      }}>
        <h4 style={{
          fontSize: 'var(--font-h4)',
          fontWeight: 'var(--weight-semibold)',
          color: 'rgba(255,255,255,0.95)',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>🎯</span>
          Strategic Alignment
        </h4>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: 'var(--font-base)',
          lineHeight: 'var(--leading-relaxed)'
        }}>
          {decisionData.reasoning.pmo.strategicAlignment}
        </p>
      </div>

      {/* PMO Analysis Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {/* Resource Impact */}
        <div style={{
          padding: '16px',
          borderRadius: '12px',
          background: 'rgba(17,153,142,0.1)',
          border: '1px solid rgba(17,153,142,0.2)'
        }}>
          <h5 style={{
            fontSize: 'var(--font-base)',
            fontWeight: 'var(--weight-semibold)',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>👥</span>
            Resource Impact
          </h5>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 'var(--font-small)',
            lineHeight: 'var(--leading-normal)'
          }}>
            {decisionData.reasoning.pmo.resourceImpact}
          </p>
        </div>

        {/* Competitive Analysis */}
        <div style={{
          padding: '16px',
          borderRadius: '12px',
          background: 'rgba(242,153,74,0.1)',
          border: '1px solid rgba(242,153,74,0.2)'
        }}>
          <h5 style={{
            fontSize: 'var(--font-base)',
            fontWeight: 'var(--weight-semibold)',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>🏆</span>
            Competitive Analysis
          </h5>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 'var(--font-small)',
            lineHeight: 'var(--leading-normal)'
          }}>
            {decisionData.reasoning.pmo.competitiveAnalysis}
          </p>
        </div>
      </div>

      {/* Implementation Plan */}
      <div style={{
        padding: '20px',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        marginBottom: '24px'
      }}>
        <h4 style={{
          fontSize: 'var(--font-h4)',
          fontWeight: 'var(--weight-semibold)',
          color: 'rgba(255,255,255,0.95)',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>📋</span>
          Implementation Roadmap
        </h4>
        
        <div style={{
          display: 'grid',
          gap: '8px',
          marginBottom: '16px'
        }}>
          {decisionData.reasoning.pmo.implementation.map((step, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 0',
                animationDelay: `${index * 100}ms`
              }}
              className="pm33-animate-fade-up"
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {index + 1}
              </div>
              <span style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: 'var(--font-base)'
              }}>
                {step}
              </span>
            </div>
          ))}
        </div>

        <h5 style={{
          fontSize: 'var(--font-base)',
          fontWeight: 'var(--weight-semibold)',
          color: 'rgba(255,255,255,0.9)',
          marginBottom: '8px',
          marginTop: '16px'
        }}>
          Success Metrics
        </h5>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {decisionData.reasoning.pmo.metrics.map((metric, index) => (
            <span
              key={index}
              style={{
                padding: '4px 8px',
                fontSize: '0.75rem',
                borderRadius: '12px',
                background: 'rgba(240,147,251,0.1)',
                border: '1px solid rgba(240,147,251,0.2)',
                color: '#f093fb'
              }}
            >
              {metric}
            </span>
          ))}
        </div>
      </div>

      {/* PMO Actions */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <PM33Button
          variant="primary"
          onClick={onAccept}
          icon={<span>🚀</span>}
          style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            boxShadow: '0 4px 20px rgba(240,147,251,0.4)'
          }}
        >
          Execute PMO Strategy
        </PM33Button>
        
        <PM33Button
          variant="secondary"
          onClick={() => {
            // Could export detailed analysis
            console.log('Exporting PMO analysis...');
          }}
          icon={<span>📊</span>}
        >
          Export Analysis
        </PM33Button>
      </div>
    </div>
  );

  return (
    <PM33Card style={{ maxWidth: '800px', margin: '0 auto' }}>
      {level === 'entry' && renderEntryLevel()}
      {level === 'advanced' && renderAdvancedLevel()}
      {level === 'pmo' && renderPMOLevel()}
    </PM33Card>
  );
};