/**
 * Component: ChatPage
 * Design Reference: APP_THEME_GUIDE.md - Core app design system
 * UX Pattern: PM33_COMPLETE_UX_SYSTEM.md - Chat interface patterns
 * 
 * Compliance Checklist:
 * - [x] Uses shadcn/ui components exclusively
 * - [x] Professional B2B SaaS design
 * - [x] lucide-react icons
 * - [x] Responsive layout
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Target, TrendingUp, Users, ExternalLink, Settings } from 'lucide-react';
import Link from 'next/link';
import CoreAppNavigation from '../../../components/app/CoreAppNavigation';
import { DemoBadge, DemoContent, useDemoMode } from '../../../components/shared/SimplifiedNavigation';
import { IntegrationProvider, IntegrationConfig } from '../../../lib/integrations/types';
import { oauthService } from '../../../lib/integrations/oauth-service';

const ChatPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const { isDemoMode } = useDemoMode();
  const [connectedIntegrations, setConnectedIntegrations] = useState<IntegrationConfig[]>([]);
  const [isCreatingTasks, setIsCreatingTasks] = useState<number | null>(null);

  // Load connected integrations
  useEffect(() => {
    const loadIntegrations = async () => {
      try {
        const integrations = await oauthService.getIntegrations();
        setConnectedIntegrations(integrations);
      } catch (error) {
        console.error('Failed to load integrations:', error);
      }
    };
    loadIntegrations();
  }, []);

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
      // In production, this would call the backend API to create tasks
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show success feedback
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <CoreAppNavigation />
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Page Header */}
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                  Chat
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Strategic questions and AI analysis
                </p>
              </div>
              <div className="flex gap-4">
                <Badge variant="secondary" className="text-sm">
                  Questions today: {isDemoMode ? '23' : '3'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Templates */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Quick Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {templateQuestions.map((template, index) => (
                <Card
                  key={index}
                  className="p-4 cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg"
                  onClick={() => setQuery(template.example)}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-blue-600 dark:text-blue-400">
                        {template.icon}
                      </div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {template.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {template.example}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Question Input */}
          <Card className="p-8">
            <CardContent className="p-0 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                  🎯 Ask your strategic question
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Get AI-powered analysis with confidence scoring and executable recommendations
                </p>
              </div>

              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your strategic question..."
                rows={4}
                className="text-base"
              />

              <div className="flex justify-between items-center">
                <Button
                  size="lg"
                  disabled={!query.trim()}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  onClick={() => {
                    // Navigate to strategic chat with pre-filled question
                    window.location.href = `/chat/strategic?q=${encodeURIComponent(query)}`;
                  }}
                >
                  <Brain className="mr-2 h-5 w-5" />
                  Start Strategic Chat
                </Button>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  ⚡ AI-powered analysis with framework application
                </p>
              </div>
            </CardContent>
          </Card>

        {/* Recent Analysis */}
        {recentAnalyses.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Recent Analysis
              </h3>
              <DemoBadge />
            </div>
            
            <div className="space-y-4">
              {recentAnalyses.map((analysis) => (
                <DemoContent key={analysis.id}>
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold mb-2">
                            📊 {analysis.title}
                          </h4>
                          <div className="flex gap-2 mb-2">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Confidence: {analysis.confidence}%
                            </Badge>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              {analysis.framework}
                            </Badge>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {analysis.timestamp}
                        </span>
                      </div>

                      <div>
                        <p className="font-medium mb-1">
                          Recommendation:
                        </p>
                        <p className="text-gray-600 mb-3">
                          {analysis.recommendation}
                        </p>
                        
                        <div className="flex gap-6 flex-wrap">
                          <span className="text-sm">
                            <strong>Timeline:</strong> {analysis.timeline}
                          </span>
                          <span className="text-sm">
                            <strong>Tasks:</strong> {analysis.tasks}
                          </span>
                          <span className="text-sm text-green-600">
                            <strong>Impact:</strong> {analysis.impact}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-3 flex-wrap">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Export Plan
                        </Button>
                        
                        {connectedIntegrations.length > 0 ? (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleCreateTasks(analysis.id, analysis.title, analysis.recommendation)}
                            disabled={isCreatingTasks === analysis.id}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            {isCreatingTasks === analysis.id 
                              ? 'Creating...' 
                              : `Create Tasks in ${connectedIntegrations[0].name}`
                            }
                          </Button>
                        ) : (
                          <Link href="/settings?tab=integrations">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-green-200 text-green-700 hover:bg-green-50"
                            >
                              <Settings className="mr-2 h-4 w-4" />
                              Connect Integration
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </Card>
                </DemoContent>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;