/**
 * Page: Strategic Intelligence Demo
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md - Complete implementation showcase
 * UX Pattern: PM33_COMPLETE_UX_SYSTEM.md - Progressive intelligence patterns
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

import { useState, useEffect } from 'react';
import { PM33PageWrapper } from '@/components/PM33PageWrapper';
import { PM33Navigation } from '@/components/PM33Navigation';
import { PM33Card } from '@/components/PM33Card';
import { PM33Button } from '@/components/PM33Button';
import { PM33AIProcessing } from '@/components/PM33AIProcessing';
import { StrategicIntelligenceCard } from '@/components/StrategicIntelligenceCard';
import { ProgressiveIntelligence } from '@/components/ProgressiveIntelligence';

export default function StrategicIntelligenceDemo() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showProgressiveIntelligence, setShowProgressiveIntelligence] = useState(false);
  const [activeDemo, setActiveDemo] = useState<'overview' | 'processing' | 'cards' | 'progressive' | 'intelligence'>('overview');

  // Mock data for demonstrations
  const strategicData = {
    title: "Mobile App Initiative Decision",
    recommendation: "Launch the mobile app initiative with a phased approach focusing on core features first.",
    confidence: 87,
    frameworks: ["ICE Framework", "RICE Analysis", "Porter's Five Forces"],
    timeline: "12 weeks",
    tasks: 23,
    impact: 240
  };

  const progressiveData = {
    question: "Should we build the export feature?",
    recommendation: 'yes' as const,
    confidence: 92,
    reasoning: {
      simple: [
        "47% of churned users requested this feature",
        "Estimated 3 weeks development time with 2 engineers",
        "$240K projected ARR impact within 6 months",
        "Low technical complexity and risk"
      ],
      detailed: {
        framework: "Using ICE Framework analysis - High Impact (9/10), Medium Confidence (7/10), Easy Implementation (8/10). Overall ICE Score: 8.0/10",
        analysis: "This feature represents a significant opportunity to reduce churn while providing substantial revenue upside. The development effort is well-scoped and aligns with our Q3 platform stability goals.",
        data: "User research shows 47% churn correlation with missing export functionality. Competitor analysis reveals this as table stakes in our market segment. Financial modeling projects $240K ARR increase.",
        risk: "Primary risks include: potential technical debt if rushed (mitigated by 3-week timeline), resource allocation from other initiatives (managed through sprint planning), and scope creep (controlled via strict MVP definition)."
      },
      pmo: {
        strategicAlignment: "This initiative directly supports our Q3 strategic goal of reducing churn by 15% and increasing platform stickiness. It aligns with the broader digital transformation vision by making our platform more interoperable with customer workflows.",
        resourceImpact: "Requires 2 senior engineers for 3 weeks (60 person-hours total). Low impact on other initiatives due to isolated nature of feature. QA testing requires 1 week overlap with development.",
        competitiveAnalysis: "All major competitors (Notion, Linear, Height) offer robust export functionality. This feature moves us from competitive disadvantage to parity, enabling focus on differentiation in other areas.",
        riskMitigation: "Technical risk mitigated through proof-of-concept. Resource risk managed via dedicated sprint allocation. Market risk minimal due to validated user demand.",
        implementation: [
          "Week 1: Technical design and API specification",
          "Week 2-3: Core export functionality development",
          "Week 3: QA testing and edge case handling",
          "Week 4: Gradual rollout to beta users",
          "Week 5: Full production release with monitoring"
        ],
        metrics: [
          "Churn rate reduction",
          "Export feature adoption",
          "User satisfaction scores",
          "Support ticket volume",
          "ARR impact tracking"
        ]
      }
    }
  };

  const handleStartAnalysis = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActiveDemo('cards');
    }, 3000);
  };

  const renderOverview = () => (
    <div className="pm33-animate-fade-up">
      <PM33Card style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-6)',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: 'var(--font-h1)',
              fontWeight: 'var(--weight-bold)',
              marginBottom: 'var(--space-4)',
              background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              PM33 Strategic Intelligence System
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 'var(--font-large)',
              lineHeight: 'var(--leading-relaxed)',
              marginBottom: 'var(--space-6)'
            }}>
              Experience the complete PM33 professional UI system with progressive intelligence disclosure, 
              AI processing states, and confidence visualization.
            </p>
            <PM33Button
              variant="primary"
              size="lg"
              icon={<span>🧠</span>}
              onClick={() => setActiveDemo('processing')}
            >
              Start Strategic Analysis
            </PM33Button>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '200px',
              height: '200px',
              margin: '0 auto',
              position: 'relative'
            }}>
              {/* Animated preview visualization */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%)',
                animation: 'rotate 8s linear infinite'
              }} />
              <div style={{
                position: 'absolute',
                inset: '8px',
                borderRadius: '50%',
                background: 'var(--pm33-dark-1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  fontSize: '3rem',
                  background: 'var(--pm33-ai-glow)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'pulse 2s ease-in-out infinite'
                }}>
                  🎯
                </span>
              </div>
            </div>
          </div>
        </div>
      </PM33Card>

      {/* Feature Grid */}
      <h2 style={{
        fontSize: 'var(--font-h2)',
        fontWeight: 'var(--weight-bold)',
        textAlign: 'center',
        marginBottom: 'var(--space-6)',
        background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Explore PM33 Components
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-8)'
      }}>
        <PM33Card
          onClick={() => setActiveDemo('processing')}
          style={{ cursor: 'pointer' }}
          className="pm33-animate-float"
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto var(--space-4)',
              borderRadius: '50%',
              background: 'var(--pm33-ai-processing)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              ⚡
            </div>
            <h3 style={{
              fontSize: 'var(--font-h4)',
              fontWeight: 'var(--weight-semibold)',
              color: 'rgba(255,255,255,0.95)',
              marginBottom: 'var(--space-2)'
            }}>
              AI Processing States
            </h3>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 'var(--font-small)',
              lineHeight: 'var(--leading-normal)'
            }}>
              Premium loading animations with contextual messaging
            </p>
          </div>
        </PM33Card>

        <PM33Card
          onClick={() => setActiveDemo('cards')}
          style={{ cursor: 'pointer', animationDelay: '0.2s' }}
          className="pm33-animate-float"
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto var(--space-4)',
              borderRadius: '50%',
              background: 'var(--pm33-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              📊
            </div>
            <h3 style={{
              fontSize: 'var(--font-h4)',
              fontWeight: 'var(--weight-semibold)',
              color: 'rgba(255,255,255,0.95)',
              marginBottom: 'var(--space-2)'
            }}>
              Intelligence Cards
            </h3>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 'var(--font-small)',
              lineHeight: 'var(--leading-normal)'
            }}>
              Strategic recommendations with confidence rings
            </p>
          </div>
        </PM33Card>

        <PM33Card
          onClick={() => setActiveDemo('progressive')}
          style={{ cursor: 'pointer', animationDelay: '0.4s' }}
          className="pm33-animate-float"
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto var(--space-4)',
              borderRadius: '50%',
              background: 'var(--pm33-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              🎯
            </div>
            <h3 style={{
              fontSize: 'var(--font-h4)',
              fontWeight: 'var(--weight-semibold)',
              color: 'rgba(255,255,255,0.95)',
              marginBottom: 'var(--space-2)'
            }}>
              Progressive Intelligence
            </h3>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 'var(--font-small)',
              lineHeight: 'var(--leading-normal)'
            }}>
              Entry → Advanced → PMO level disclosure
            </p>
          </div>
        </PM33Card>
      </div>

      {/* Navigation hint */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: 'var(--font-small)',
          animation: 'fade-pulse 2s ease-in-out infinite'
        }}>
          Click any card above to explore that component
        </p>
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div style={{ textAlign: 'center', minHeight: '400px' }}>
      <PM33AIProcessing 
        message="Analyzing strategic implications..."
        subMessage="Processing market data, competitor analysis, and resource requirements"
        size="lg"
      />
      <div style={{ marginTop: 'var(--space-8)' }}>
        <PM33Button
          variant="secondary"
          onClick={() => setActiveDemo('cards')}
        >
          Skip to Results
        </PM33Button>
      </div>
    </div>
  );

  const renderCards = () => (
    <div className="pm33-animate-fade-up">
      <div style={{
        display: 'grid',
        gap: 'var(--space-6)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <StrategicIntelligenceCard
          data={strategicData}
          onViewDetails={() => setActiveDemo('progressive')}
          onCreateTasks={() => {
            alert('Creating tasks based on strategic analysis...');
          }}
        />
        
        <div style={{ textAlign: 'center' }}>
          <PM33Button
            variant="secondary"
            onClick={() => setActiveDemo('progressive')}
          >
            See Progressive Intelligence →
          </PM33Button>
        </div>
      </div>
    </div>
  );

  const renderProgressive = () => (
    <div className="pm33-animate-fade-up">
      <ProgressiveIntelligence
        decisionData={progressiveData}
        onAccept={() => {
          alert('Decision accepted! Creating implementation plan...');
        }}
        onReject={() => {
          alert('Decision rejected. Gathering additional data...');
        }}
      />
      
      <div style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
        <PM33Button
          variant="secondary"
          onClick={() => setActiveDemo('overview')}
        >
          ← Back to Overview
        </PM33Button>
      </div>
    </div>
  );

  const renderIntelligence = () => (
    <div className="pm33-animate-fade-up">
      <PM33Card style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{
          fontSize: 'var(--font-h2)',
          fontWeight: 'var(--weight-bold)',
          marginBottom: 'var(--space-4)',
          background: 'var(--pm33-ai-glow)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Strategic Intelligence Active
        </h2>
        
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: 'var(--font-large)',
          marginBottom: 'var(--space-6)'
        }}>
          PM33 is now analyzing your strategic context...
        </p>

        <PM33Button
          variant="primary"
          onClick={() => setActiveDemo('overview')}
          icon={<span>🏠</span>}
        >
          Return to Overview
        </PM33Button>
      </PM33Card>
    </div>
  );

  // Auto-progress from processing to cards
  useEffect(() => {
    if (activeDemo === 'processing') {
      const timer = setTimeout(() => {
        setActiveDemo('cards');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [activeDemo]);

  return (
    <PM33PageWrapper>
      <PM33Navigation currentPage="strategic-intelligence-demo" />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'var(--space-12) var(--space-8)'
      }}>
        {/* Demo Navigation */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-2)',
          justifyContent: 'center',
          marginBottom: 'var(--space-8)',
          flexWrap: 'wrap'
        }}>
          {[
            { key: 'overview', label: 'Overview', icon: '🏠' },
            { key: 'processing', label: 'AI Processing', icon: '⚡' },
            { key: 'cards', label: 'Intelligence Cards', icon: '📊' },
            { key: 'progressive', label: 'Progressive Analysis', icon: '🎯' },
            { key: 'intelligence', label: 'Full Intelligence', icon: '🧠' }
          ].map((item) => (
            <PM33Button
              key={item.key}
              variant={activeDemo === item.key ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setActiveDemo(item.key as any)}
              icon={<span>{item.icon}</span>}
              style={{
                background: activeDemo === item.key 
                  ? 'var(--pm33-brand)' 
                  : 'rgba(255,255,255,0.05)',
                ...(activeDemo === item.key && {
                  boxShadow: '0 0 20px rgba(102,126,234,0.4)'
                })
              }}
            >
              {item.label}
            </PM33Button>
          ))}
        </div>

        {/* Demo Content */}
        <div style={{ minHeight: '500px' }}>
          {activeDemo === 'overview' && renderOverview()}
          {activeDemo === 'processing' && renderProcessing()}
          {activeDemo === 'cards' && renderCards()}
          {activeDemo === 'progressive' && renderProgressive()}
          {activeDemo === 'intelligence' && renderIntelligence()}
        </div>
      </div>
    </PM33PageWrapper>
  );
}