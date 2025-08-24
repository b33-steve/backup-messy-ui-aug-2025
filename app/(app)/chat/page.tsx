/**
 * Component: ChatPage
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Chat interface
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Strategic chat patterns
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

import React, { useState, useEffect } from 'react';
import { PM33PageWrapper } from '@/components/PM33PageWrapper';
import { PM33Navigation } from '@/components/PM33Navigation';
import { PM33Card } from '@/components/PM33Card';
import { PM33Button } from '@/components/PM33Button';
import { Brain, Target, TrendingUp, Users, ExternalLink, Settings, MessageSquare, Zap } from 'lucide-react';
import Link from 'next/link';

const ChatPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isDemoMode] = useState(true);
  const [connectedIntegrations, setConnectedIntegrations] = useState<any[]>([]);
  const [isCreatingTasks, setIsCreatingTasks] = useState<number | null>(null);

  // Handle task creation
  const handleCreateTasks = async (analysisId: number, analysisTitle: string, recommendation: string) => {
    if (connectedIntegrations.length === 0) {
      // No integrations connected - redirect to settings
      window.location.href = '/settings?tab=integrations';
      return;
    }

    setIsCreatingTasks(analysisId);

    try {
      // For demo purposes, simulate task creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`Tasks created successfully in ${connectedIntegrations[0].name}!\n\nCreated tasks:\n• Strategic analysis review\n• Implementation planning\n• Risk assessment\n• Progress tracking setup`);
    } catch (error) {
      console.error('Failed to create tasks:', error);
      alert('Failed to create tasks. Please try again.');
    } finally {
      setIsCreatingTasks(null);
    }
  };

  const templateQuestions = [
    {
      icon: <Target className="h-4 w-4" />,
      title: 'Competitive Response',
      example: 'Competitor X just launched feature Y. How should we respond?'
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      title: 'Resource Allocation', 
      example: 'Should we hire 5 engineers or invest $200K in marketing?'
    },
    {
      icon: <Brain className="h-4 w-4" />,
      title: 'Feature Priority',
      example: 'Which features should we prioritize for Q4 roadmap?'
    },
    {
      icon: <Users className="h-4 w-4" />,
      title: 'Market Positioning',
      example: 'How should we position against enterprise competitors?'
    }
  ];

  // Demo data - enhanced but realistic
  const recentAnalyses = isDemoMode ? [
    {
      id: 1,
      title: 'Competitive Response to Feature Launch X',
      confidence: 94,
      framework: "Porter's Five Forces",
      recommendation: 'Fast-follower strategy with differentiation',
      timeline: '6 weeks',
      tasks: 8,
      impact: '$156K impact',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      title: 'Resource allocation: Engineering vs Marketing',
      confidence: 87,
      framework: 'Cost-benefit with ROI',
      recommendation: '60% eng, 40% marketing for Q4',
      timeline: '3 weeks',
      tasks: 6,
      impact: '$89K savings identified',
      timestamp: '5 hours ago'
    }
  ] : [];

  return (
    <PM33PageWrapper>
      <PM33Navigation currentPage="chat" />
      <div className="pt-20 px-6 pb-12 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold pm33-text-gradient">Strategic Chat</h1>
              <p className="text-lg text-muted-foreground">AI-powered strategic analysis and recommendations</p>
            </div>
            <div className="ml-auto">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Questions today: {isDemoMode ? '23' : '3'}
              </span>
            </div>
          </div>

          {/* Quick Templates */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Quick Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {templateQuestions.map((template, index) => (
                <PM33Card
                  key={index}
                  className="p-4 cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg"
                  onClick={() => setQuery(template.example)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-blue-600">
                      {template.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {template.title}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {template.example}
                  </p>
                </PM33Card>
              ))}
            </div>
          </div>

          {/* Question Input */}
          <PM33Card className="p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold pm33-text-gradient mb-2 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  Ask your strategic question
                </h2>
                <p className="text-lg text-muted-foreground">
                  Get AI-powered analysis with confidence scoring and executable recommendations
                </p>
              </div>

              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your strategic question..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-base resize-none"
              />

              <div className="flex justify-between items-center">
                <PM33Button
                  size="lg"
                  variant="primary"
                  disabled={!query.trim()}
                  onClick={() => {
                    // Navigate to strategic chat with pre-filled question
                    window.location.href = `/chat/strategic?q=${encodeURIComponent(query)}`;
                  }}
                >
                  <Brain className="mr-2 h-5 w-5" />
                  Start Strategic Analysis
                </PM33Button>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  AI-powered analysis with framework application
                </p>
              </div>
            </div>
          </PM33Card>

          {/* Recent Analysis */}
          {recentAnalyses.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Recent Analysis
                </h3>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                  DEMO
                </span>
              </div>
              
              <div className="space-y-4">
                {recentAnalyses.map((analysis) => (
                  <PM33Card key={analysis.id} className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold mb-2 text-foreground">
                            📊 {analysis.title}
                          </h4>
                          <div className="flex gap-2 mb-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                              Confidence: {analysis.confidence}%
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              {analysis.framework}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {analysis.timestamp}
                        </span>
                      </div>

                      <div>
                        <p className="font-medium mb-1 text-foreground">
                          Recommendation:
                        </p>
                        <p className="text-muted-foreground mb-3">
                          {analysis.recommendation}
                        </p>
                        
                        <div className="flex gap-6 flex-wrap">
                          <span className="text-sm text-muted-foreground">
                            <strong>Timeline:</strong> {analysis.timeline}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            <strong>Tasks:</strong> {analysis.tasks}
                          </span>
                          <span className="text-sm text-green-600">
                            <strong>Impact:</strong> {analysis.impact}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-3 flex-wrap">
                        <PM33Button size="sm" variant="secondary">
                          View Details
                        </PM33Button>
                        <PM33Button size="sm" variant="secondary">
                          Export Plan
                        </PM33Button>
                        
                        {connectedIntegrations.length > 0 ? (
                          <PM33Button 
                            size="sm" 
                            variant="primary"
                            onClick={() => handleCreateTasks(analysis.id, analysis.title, analysis.recommendation)}
                            disabled={isCreatingTasks === analysis.id}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            {isCreatingTasks === analysis.id 
                              ? 'Creating...' 
                              : `Create Tasks in ${connectedIntegrations[0].name}`
                            }
                          </PM33Button>
                        ) : (
                          <Link href="/settings?tab=integrations">
                            <PM33Button size="sm" variant="secondary">
                              <Settings className="mr-2 h-4 w-4" />
                              Connect Integration
                            </PM33Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </PM33Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PM33PageWrapper>
  );
};

export default ChatPage;