/**
 * Component: DataAnalyticsPage
 * Design Reference: APP_THEME_GUIDE.md - Core app design system
 * UX Pattern: PM33_COMPLETE_UX_SYSTEM.md - Analytics dashboard patterns
 * 
 * Compliance Checklist:
 * - [x] Uses shadcn/ui components exclusively
 * - [x] Professional B2B SaaS design
 * - [x] lucide-react icons
 * - [x] Responsive grid layout
 */

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Clock, Target, Brain } from 'lucide-react';
import { DemoBadge, DemoContent, useDemoMode } from '../../../components/shared/SimplifiedNavigation';

const DataPage: React.FC = () => {
  const { isDemoMode } = useDemoMode();

  // Demo data - enhanced but realistic
  const performanceMetrics = [
    {
      title: 'Decision Confidence',
      value: isDemoMode ? '94%' : '76%',
      change: isDemoMode ? '+12%' : '+6%',
      color: 'green',
      icon: <Brain className="h-6 w-6" />
    },
    {
      title: 'Resource Efficiency',
      value: isDemoMode ? '+23%' : '+11%',
      change: isDemoMode ? '+8%' : '+3%',
      color: 'blue',
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: 'Strategic Alignment',
      value: isDemoMode ? '87%' : '72%',
      change: isDemoMode ? '+15%' : '+5%',
      color: 'violet',
      icon: <Target className="h-6 w-6" />
    },
    {
      title: 'Time to Decision',
      value: isDemoMode ? '8hr → 10min' : '8hr → 3hr',
      change: isDemoMode ? '47x improvement' : '3x improvement',
      color: 'orange',
      icon: <Clock className="h-6 w-6" />
    }
  ];

  const questionCategories = isDemoMode ? [
    { category: 'Competitive Response', percentage: 34, count: 8, color: 'red' },
    { category: 'Resource Allocation', percentage: 28, count: 6, color: 'blue' },
    { category: 'Feature Prioritization', percentage: 22, count: 5, color: 'green' },
    { category: 'Market Positioning', percentage: 16, count: 4, color: 'violet' }
  ] : [
    { category: 'Feature Prioritization', percentage: 45, count: 2, color: 'green' },
    { category: 'Resource Allocation', percentage: 33, count: 1, color: 'blue' },
    { category: 'Competitive Response', percentage: 22, count: 1, color: 'red' }
  ];

  const roiMetrics = isDemoMode ? {
    timeSaved: '47 hours',
    costAvoidance: '$7,050',
    resourceOptimization: '$156K savings identified',
    decisionSpeed: '47x faster',
    confidence: '60% → 94%',
    taskCompletion: '91%',
    efficiency: '+23%'
  } : {
    timeSaved: '8 hours',
    costAvoidance: '$1,200',
    resourceOptimization: '$23K savings identified',
    decisionSpeed: '3x faster',
    confidence: '60% → 76%',
    taskCompletion: '78%',
    efficiency: '+11%'
  };

  const integrationHealth = [
    {
      name: 'Jira',
      reliability: isDemoMode ? '99.2%' : '95.1%',
      items: isDemoMode ? '156 tasks synced' : '23 tasks synced',
      status: 'healthy'
    },
    {
      name: 'Slack', 
      reliability: isDemoMode ? '96%' : '94%',
      items: isDemoMode ? '47 strategic updates sent' : '8 updates sent',
      status: 'healthy'
    },
    {
      name: 'Analytics',
      reliability: isDemoMode ? '99.8%' : '97.2%', 
      items: 'Real-time data',
      status: 'healthy'
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Data
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Analytics and insights
            </p>
          </div>
          <div className="flex gap-4">
            <Badge variant="secondary" className="text-sm">
              Last update: 30s ago
            </Badge>
          </div>
        </div>

        {/* Performance Overview */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            Performance Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceMetrics.map((metric, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-blue-600 dark:text-blue-400">
                      {metric.icon}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {metric.title}
                    </p>
                  </div>
                  
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {metric.value}
                  </p>
                  
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700 dark:text-green-400">
                    ↑ {metric.change}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Question Categories */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Question Categories (Last 30 Days)
            </h2>
            <DemoBadge />
          </div>
          
          <DemoContent>
            <Card className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center">
                  <div className="relative w-48 h-48">
                    {/* Simple circular progress representation */}
                    <div className="w-full h-full rounded-full border-8 border-slate-200 dark:border-slate-700 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">Categories</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Distribution</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {questionCategories.map((category, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color === 'red' ? '#ef4444' : category.color === 'blue' ? '#3b82f6' : category.color === 'green' ? '#10b981' : '#8b5cf6' }}
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {category.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {category.count} questions
                        </span>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          {category.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </DemoContent>
        </div>

        {/* ROI Impact Measurement */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              ROI Impact Measurement
            </h2>
            <DemoBadge />
          </div>
          
          <DemoContent>
            <Card className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    Value Delivered This Month
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <p className="text-slate-700 dark:text-slate-300">
                        <strong>Time Savings:</strong> {roiMetrics.timeSaved} saved (vs consultant analysis)
                      </p>
                      <p className="text-slate-700 dark:text-slate-300">
                        <strong>Cost Avoidance:</strong> {roiMetrics.costAvoidance} (consultant fees not paid)
                      </p>
                      <p className="text-slate-700 dark:text-slate-300">
                        <strong>Resource Optimization:</strong> {roiMetrics.resourceOptimization}
                      </p>
                      <p className="text-slate-700 dark:text-slate-300">
                        <strong>Decision Speed:</strong> {roiMetrics.decisionSpeed} strategic analysis
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-slate-700 dark:text-slate-300">
                        <strong>Strategic Outcomes:</strong>
                      </p>
                      <div className="pl-4 space-y-2">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          • Decision confidence: {roiMetrics.confidence} average
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          • Task completion rate: {roiMetrics.taskCompletion} strategic alignment
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          • Resource efficiency: {roiMetrics.efficiency} improvement
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </DemoContent>
        </div>

        {/* Integration Health */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            Integration Health
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {integrationHealth.map((integration, index) => (
              <Card key={index} className="p-4">
                <CardContent className="p-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                      {integration.name}
                    </h4>
                    <Badge variant="default" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      🟢 {integration.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    {integration.reliability} reliability
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {integration.items}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPage;