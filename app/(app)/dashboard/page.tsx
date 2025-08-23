/**
 * Component: PM33CommandCenter (Dashboard)
 * Design Reference: HTML Prototype - Three-column dashboard layout
 * UX Pattern: Strategic tools sidebar + AI briefing center + metrics sidebar
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

import React, { useState } from 'react';
import { 
  PM33GlassCard, 
  PM33AIBriefingCard, 
  PM33SectionTitle, 
  PM33ToolItem 
} from '../../../components/shared/PM33GlassCard';
import { usePM33Theme } from '../../../components/shared/PM33ThemeProvider';

export default function PM33CommandCenter() {
  const [selectedTool, setSelectedTool] = useState('chat');
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const { theme } = usePM33Theme();

  const strategicScenarios = [
    {
      id: 'competitive',
      category: 'COMPETITIVE STRATEGY',
      title: 'Competitor launched similar features',
      description: 'They have 10x funding. Strategic response?',
      color: '#3b82f6'
    },
    {
      id: 'resource',
      category: 'RESOURCE ALLOCATION', 
      title: 'Hire developer vs marketing spend',
      description: '$15k budget to reach 50 beta users',
      color: '#10b981'
    },
    {
      id: 'growth',
      category: 'GROWTH STRATEGY',
      title: 'Low beta-to-paid conversion',
      description: 'Great feedback, poor conversion rates',
      color: '#f59e0b'
    },
    {
      id: 'market',
      category: 'MARKET STRATEGY',
      title: 'Enterprise vs SMB focus',
      description: 'Bigger deals vs momentum building',
      color: '#8b5cf6'
    }
  ];

  const mockConversation = [
    {
      type: 'ai',
      message: 'Good morning! I\'ll help analyze strategic decisions using proven PM frameworks. Ask me anything about competitive strategy, resource allocation, or market positioning.'
    },
    {
      type: 'user',
      message: 'Our main competitor just raised $10M Series A. What\'s our strategic response?'
    },
    {
      type: 'ai',
      message: 'I recommend using the Competitive Response Framework for this analysis. Based on PM33\'s beta stage and $15k budget, here\'s my strategic analysis:\n\nApply ICE Framework? [Yes] [No]\nThis will help prioritize your competitive response actions.'
    }
  ];

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div 
      className="min-h-screen transition-all duration-300 ease-in-out"
      style={{ background: 'var(--pm33-bg-gradient)', color: 'var(--pm33-text-primary)' }}
    >
      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto p-8">
        {/* Three Column Dashboard Grid */}
        <div 
          className="grid gap-8 min-h-[calc(100vh-120px)]"
          style={{ gridTemplateColumns: '300px 1fr 350px' }}
        >
          {/* Left Sidebar - Strategic Tools */}
          <div className="w-[300px] space-y-4">
            <PM33GlassCard hover={false}>
              <PM33SectionTitle icon="🎯">STRATEGIC TOOLS</PM33SectionTitle>
              
              <PM33ToolItem
                icon="💬"
                active={selectedTool === 'chat'}
                onClick={() => setSelectedTool('chat')}
              >
                Strategic Chat
              </PM33ToolItem>
              
              <PM33ToolItem
                icon="🚀"
                active={selectedTool === 'delivery'}
                onClick={() => setSelectedTool('delivery')}
              >
                Project Delivery
              </PM33ToolItem>
              
              <PM33ToolItem
                icon="📊"
                active={selectedTool === 'analytics'}
                onClick={() => setSelectedTool('analytics')}
              >
                Analytics
              </PM33ToolItem>
              
              <PM33ToolItem
                icon="🎯"
                active={selectedTool === 'okr'}
                onClick={() => setSelectedTool('okr')}
              >
                OKR Planner
              </PM33ToolItem>
            </PM33GlassCard>
            
            <PM33GlassCard hover={false}>
              <PM33SectionTitle>COMPANY CONTEXT</PM33SectionTitle>
              <div className="space-y-3 text-sm">
                <div><strong>🏢 Company Profile</strong></div>
                <div><strong>🎯 Current Priorities</strong></div>
                <div><strong>🕵️ Competitive Intel</strong></div>
                <div><strong>👥 Team Resources</strong></div>
              </div>
            </PM33GlassCard>
          </div>

          {/* Center Content - AI Briefing */}
          <div className="min-w-0 space-y-8">
            {/* Page Header */}
            <div>
              <h1 
                className="text-4xl font-bold mb-2"
                style={{
                  background: theme === 'light' 
                    ? 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)'
                    : 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Command Center
              </h1>
              <p 
                className="text-lg mb-2"
                style={{ color: 'var(--pm33-text-secondary)' }}
              >
                Good morning! Let's tackle today's strategic priorities.
              </p>
              <div 
                className="flex items-center gap-4 text-sm opacity-60"
                style={{ color: 'var(--pm33-text-secondary)' }}
              >
                <span>{getCurrentTime()}</span>
                <span>|</span>
                <span>Current Progress: 15 signups (30%)</span>
              </div>
            </div>

            {/* AI Intelligence Briefing */}
            <PM33GlassCard hover={false}>
              <PM33AIBriefingCard isLive={true}>
                <h2 className="text-2xl font-semibold mb-4">
                  Strategic AI Co-Pilot Ready
                </h2>
                
                <p className="text-base leading-relaxed mb-6 opacity-80">
                  Ask any strategic question. I'll suggest frameworks like ICE or RICE, 
                  then apply them with your company context to generate executable workflows.
                </p>

                {/* Scenario Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {strategicScenarios.map((scenario) => (
                    <div
                      key={scenario.id}
                      className="p-4 rounded-lg cursor-pointer transition-all duration-200 ease-out border border-transparent"
                      style={{ 
                        background: 'rgba(0,0,0,0.1)', 
                        border: '1px solid rgba(0,0,0,0.1)' 
                      }}
                      onClick={() => setSelectedScenario(scenario.id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div 
                        className="text-xs font-semibold mb-2 uppercase tracking-wider"
                        style={{ color: scenario.color }}
                      >
                        {scenario.category}
                      </div>
                      <h4 className="text-sm font-semibold mb-1">
                        {scenario.title}
                      </h4>
                      <p className="text-xs opacity-70">
                        {scenario.description}
                      </p>
                    </div>
                  ))}
                </div>
              </PM33AIBriefingCard>

              {/* Chat Interface */}
              <div 
                className="rounded-xl overflow-hidden"
                style={{ border: '1px solid rgba(0,0,0,0.1)' }}
              >
                {/* Chat Messages */}
                <div 
                  className="h-80 p-4 overflow-y-auto space-y-4"
                  style={{ background: 'rgba(0,0,0,0.05)' }}
                >
                  {mockConversation.map((msg, index) => (
                    <div 
                      key={index}
                      className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                        style={{
                          background: msg.type === 'ai' 
                            ? 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
                            : 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
                        }}
                      >
                        {msg.type === 'ai' ? '🧠' : '👤'}
                      </div>
                      <div 
                        className="max-w-[80%] p-3 rounded-xl text-sm leading-relaxed whitespace-pre-line"
                        style={{
                          background: msg.type === 'ai' 
                            ? 'rgba(0,0,0,0.1)'
                            : 'rgba(59,130,246,0.15)',
                          border: msg.type === 'ai'
                            ? '1px solid rgba(0,0,0,0.1)'
                            : '1px solid rgba(59,130,246,0.2)'
                        }}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Chat Input */}
                <div 
                  className="p-4 flex gap-3"
                  style={{ 
                    background: 'rgba(0,0,0,0.02)', 
                    borderTop: '1px solid rgba(0,0,0,0.1)' 
                  }}
                >
                  <input
                    type="text"
                    placeholder="Ask any strategic question... (I'll suggest which framework to use)"
                    className="flex-1 p-3 rounded-lg text-sm outline-none"
                    style={{
                      background: 'rgba(0,0,0,0.05)',
                      border: '1px solid rgba(0,0,0,0.1)',
                      color: 'var(--pm33-text-primary)'
                    }}
                  />
                  <button 
                    className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 text-white"
                    style={{
                      background: theme === 'light' 
                        ? 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
                        : theme === 'dark'
                          ? 'linear-gradient(135deg, #64748b 0%, #334155 100%)'
                          : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
                      boxShadow: theme === 'light'
                        ? '0 2px 10px rgba(59,130,246,0.3)'
                        : theme === 'dark'
                          ? '0 2px 10px rgba(100,116,139,0.3)'
                          : '0 2px 10px rgba(156,163,175,0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </PM33GlassCard>
          </div>

          {/* Right Sidebar - Metrics & Context */}
          <div className="w-[350px] space-y-4">
            <PM33GlassCard hover={false}>
              <PM33SectionTitle icon="⚡">Competitive Landscape</PM33SectionTitle>
              
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-semibold mb-1">Primary: Productboard</div>
                  <div className="opacity-70 text-xs">Series C, $100M+ funding, roadmap focus</div>
                </div>
                
                <div>
                  <div className="font-semibold mb-1">Secondary: Aha!</div>
                  <div className="opacity-70 text-xs">Profitable, strategy docs, enterprise</div>
                </div>
                
                <div 
                  className="p-3 rounded-lg"
                  style={{
                    background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.2)'
                  }}
                >
                  <div 
                    className="text-xs font-semibold"
                    style={{ color: '#3b82f6' }}
                  >
                    Our Advantage: Strategic AI + execution
                  </div>
                </div>
              </div>
            </PM33GlassCard>

            <PM33GlassCard hover={false}>
              <PM33SectionTitle icon="👥">Team & Resources</PM33SectionTitle>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Team Size:</span>
                  <span className="font-semibold">3 people</span>
                </div>
                <div className="text-xs opacity-70 mb-3">1 PM, 2 Engineers</div>
                
                <div className="flex justify-between">
                  <span>Runway:</span>
                  <span className="font-semibold">6 months</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Key Constraint:</span>
                  <span className="font-semibold" style={{ color: '#f59e0b' }}>Limited marketing</span>
                </div>
              </div>
            </PM33GlassCard>

            <PM33GlassCard hover={false}>
              <PM33SectionTitle icon="📊">Key Metrics</PM33SectionTitle>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Beta Signups:</span>
                  <span className="font-semibold">15 total</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Available Budget:</span>
                  <span className="font-semibold">$15,000</span>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-2">
                  <div 
                    className="w-full h-2 rounded-full overflow-hidden"
                    style={{ background: 'rgba(0,0,0,0.1)' }}
                  >
                    <div 
                      className="h-full transition-all duration-300"
                      style={{ 
                        width: '30%',
                        background: 'linear-gradient(90deg, #3b82f6 0%, #1e40af 100%)'
                      }}
                    />
                  </div>
                  <div className="text-xs mt-1 opacity-60">
                    30% to goal (50 beta users)
                  </div>
                </div>
              </div>
            </PM33GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}