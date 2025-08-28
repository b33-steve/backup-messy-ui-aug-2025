/**
 * PM33 Modern Marketing Homepage - 2025 Best Practices
 * Replaces complex Mantine + PM33 components with modern Tailwind + Radix
 * 
 * Improvements:
 * - Uses new CSS foundation (light-dark(), design tokens)
 * - Simple, maintainable component structure
 * - Performance optimized (no complex component libraries)
 * - Easy to modify colors and spacing
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRightIcon, 
  CheckIcon, 
  BoltIcon, 
  CpuChipIcon, 
  ClockIcon, 
  ChartBarIcon,
  SparklesIcon,
  RocketLaunchIcon,
  UsersIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

export default function ModernMarketingHomePage() {
  const [demoProcessing, setDemoProcessing] = useState(false);

  const handleDemoClick = () => {
    setDemoProcessing(true);
    setTimeout(() => setDemoProcessing(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Premium Hero Section */}
      <section className="hero-section py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Main Content */}
            <div className="space-y-8 animate-slide-in-up">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card hover-glow animate-pulse-premium">
                <SparklesIcon className="w-4 h-4 text-gradient-ai animate-ai-pulse" />
                <span className="text-sm font-semibold text-primary">Join 2,500+ Product Managers</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-primary leading-[1.1]">
                  Don't Replace Your PM Tools—
                  <span className="text-gradient block mt-2">
                    Make Them 10x Smarter
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-secondary max-w-2xl leading-relaxed">
                  PM33 transforms your existing tools (Jira, Linear, Asana) with AI-powered strategic intelligence. 
                  Get PMO-level insights without changing your workflow.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleDemoClick}
                  className="btn-primary flex items-center justify-center gap-3 px-8 py-4 text-lg hover-lift"
                  disabled={demoProcessing}
                >
                  {demoProcessing ? (
                    <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <BoltIcon className="w-6 h-6" />
                  )}
                  {demoProcessing ? 'Processing...' : 'Start Free Trial'}
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
                
                <Link href="/demo" className="btn-glass flex items-center justify-center gap-3 px-8 py-4 text-lg hover-lift">
                  <CpuChipIcon className="w-6 h-6" />
                  See How It Works
                </Link>
              </div>

              {/* Enhanced Social Proof */}
              <div className="pt-8">
                <div className="text-sm text-muted mb-3 font-medium">Trusted by PMs at:</div>
                <div className="flex items-center gap-6">
                  {['Stripe', 'Figma', 'Linear', 'Notion'].map((company) => (
                    <div key={company} className="glass-card px-4 py-2 hover-scale">
                      <span className="text-sm font-semibold text-primary">{company}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Premium Demo Visual */}
            <div className="animate-float-slow">
              <div className="glass-card-premium p-8 hover-tilt shadow-premium animate-glow">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-gradient-premium rounded-lg flex items-center justify-center">
                    <LightBulbIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">Live Strategic Analysis</h3>
                    <p className="text-sm text-secondary">Real-time AI insights</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: 'Sprint Efficiency', value: '94%', color: 'text-green-500', bg: 'bg-green-50' },
                    { label: 'Strategic Alignment', value: '87%', color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Risk Indicators', value: '2 Low', color: 'text-yellow-500', bg: 'bg-yellow-50' }
                  ].map((metric, index) => (
                    <div key={index} className="glass-card p-4 hover-lift">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-secondary">{metric.label}</span>
                        <span className={`text-sm font-bold ${metric.color}`}>{metric.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 glass-card-ai p-6 shadow-ai">
                  <div className="flex items-start gap-3">
                    <SparklesIcon className="w-5 h-5 text-gradient-ai mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-primary mb-1">AI Recommendation</p>
                      <p className="text-sm text-secondary">
                        Consider accelerating Feature X based on user engagement trends and market analysis
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-tertiary opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card mb-6 hover-glow">
              <SparklesIcon className="w-5 h-5 text-gradient-ai" />
              <span className="text-sm font-semibold text-primary">AI-Powered PMO Transformation</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Meet Your <span className="text-gradient">4 AI Teams</span>
            </h2>
            <p className="text-xl text-secondary max-w-4xl mx-auto leading-relaxed">
              PM33 provides specialized AI teams that work seamlessly with your existing tools 
              to deliver enterprise-grade PMO capabilities at individual PM scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CpuChipIcon,
                title: "Strategic Intelligence",
                description: "Multi-framework analysis, competitive intelligence, and strategic recommendations",
                gradient: "from-blue-500 to-purple-600",
                delay: "0ms"
              },
              {
                icon: BoltIcon,
                title: "Workflow Execution",
                description: "Automated task creation, cross-functional coordination, and timeline management",
                gradient: "from-orange-500 to-red-600",
                delay: "100ms"
              },
              {
                icon: ChartBarIcon,
                title: "Data Intelligence",
                description: "Company-specific context learning, pattern recognition, and predictive analytics",
                gradient: "from-green-500 to-teal-600",
                delay: "200ms"
              },
              {
                icon: UsersIcon,
                title: "Communication",
                description: "Stakeholder alignment, executive summaries, and professional presentations",
                gradient: "from-purple-500 to-pink-600",
                delay: "300ms"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-card-premium p-8 text-center hover-lift hover-glow group"
                style={{ animationDelay: feature.delay }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-premium group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-gradient transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-secondary leading-relaxed group-hover:text-primary transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-24 bg-gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        
        <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
          <div className="glass-card-premium p-12 lg:p-16 shadow-premium hover-lift">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card mb-8 hover-glow">
              <RocketLaunchIcon className="w-5 h-5 text-gradient-ai" />
              <span className="text-sm font-semibold text-primary">Ready for PMO-Level Intelligence?</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-primary mb-8 leading-tight">
              Transform Your PM Practice
              <span className="text-gradient block mt-2">Starting Today</span>
            </h2>
            
            <p className="text-xl text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
              Join 2,500+ Product Managers who've upgraded to strategic AI-powered workflows. 
              Experience PMO-level capabilities without the PMO overhead.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button className="btn-primary flex items-center justify-center gap-3 px-10 py-5 text-xl hover-lift shadow-premium">
                <BoltIcon className="w-6 h-6" />
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5" />
              </button>
              <Link href="/pricing" className="btn-glass flex items-center justify-center gap-3 px-10 py-5 text-xl hover-lift">
                <ChartBarIcon className="w-6 h-6" />
                View Pricing
              </Link>
            </div>

            {/* Enhanced Social Proof */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-glass-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">14 Days</div>
                <div className="text-sm text-secondary">Free Trial</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">5 Minutes</div>
                <div className="text-sm text-secondary">Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">No Migration</div>
                <div className="text-sm text-secondary">Required</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}