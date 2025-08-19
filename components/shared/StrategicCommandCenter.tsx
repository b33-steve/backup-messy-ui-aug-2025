'use client';

import React, { useState, useEffect } from 'react';
import StrategicChat from './StrategicChat';

interface AITeamStatus {
  name: string;
  role: string;
  health: number;
  status: 'operational' | 'processing' | 'idle' | 'alert';
  lastAction: string;
  icon: string;
  color: string;
}

interface StrategicMetric {
  label: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

const StrategicCommandCenter: React.FC = () => {
  const [strategicHealth, setStrategicHealth] = useState(87);
  const [aiTeams, setAITeams] = useState<AITeamStatus[]>([
    {
      name: 'Strategic AI',
      role: 'Multi-framework analysis & competitive intelligence',
      health: 92,
      status: 'operational',
      lastAction: 'Completed RICE framework analysis',
      icon: '🎯',
      color: 'blue'
    },
    {
      name: 'Workflow AI',
      role: 'Task generation & PM tool integration',
      health: 89,
      status: 'processing',
      lastAction: 'Syncing 15 tasks to Jira workspace',
      icon: '🔄',
      color: 'green'
    },
    {
      name: 'Data AI',
      role: 'Company context learning & predictive analytics',
      health: 84,
      status: 'operational',
      lastAction: 'Analyzed velocity trends (3 sprints)',
      icon: '📊',
      color: 'purple'
    },
    {
      name: 'Communications AI',
      role: 'Stakeholder management & executive reporting',
      health: 78,
      status: 'idle',
      lastAction: 'Generated weekly status report',
      icon: '📢',
      color: 'orange'
    }
  ]);

  const [strategicMetrics, setStrategicMetrics] = useState<StrategicMetric[]>([
    { label: 'OKR Progress', value: 73, target: 80, trend: 'up', color: 'blue' },
    { label: 'Execution Velocity', value: 92, target: 85, trend: 'up', color: 'green' },
    { label: 'Market Intelligence', value: 84, target: 90, trend: 'stable', color: 'purple' },
    { label: 'Resource Optimization', value: 67, target: 75, trend: 'down', color: 'orange' }
  ]);

  // Calculate overall health from AI teams
  useEffect(() => {
    const avgHealth = aiTeams.reduce((sum, team) => sum + team.health, 0) / aiTeams.length;
    setStrategicHealth(Math.round(avgHealth));
  }, [aiTeams]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800 border-green-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'idle': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'alert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTeamColor = (color: string) => {
    const colors = {
      blue: 'border-l-blue-500 bg-blue-50',
      green: 'border-l-green-500 bg-green-50',
      purple: 'border-l-purple-500 bg-purple-50',
      orange: 'border-l-orange-500 bg-orange-50'
    };
    return colors[color as keyof typeof colors] || 'border-l-gray-500 bg-gray-50';
  };

  const getMetricColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🎯 PM33 Strategic Command Center</h1>
              <p className="text-gray-600">PMO Transformation Dashboard - Day 3 Demo</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Strategic Health Score</div>
                <div className={`text-2xl font-bold ${strategicHealth >= 85 ? 'text-green-600' : strategicHealth >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {strategicHealth}/100
                </div>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="transform -rotate-90 w-16 h-16">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - strategicHealth / 100)}`}
                    className={strategicHealth >= 85 ? 'text-green-500' : strategicHealth >= 70 ? 'text-yellow-500' : 'text-red-500'}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - AI Teams Status */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">🤖 Agentic AI Teams</h2>
              <div className="space-y-4">
                {aiTeams.map((team, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${getTeamColor(team.color)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{team.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{team.name}</h3>
                          <p className="text-xs text-gray-600">{team.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(team.status)}`}>
                          {team.status.toUpperCase()}
                        </div>
                        <div className="text-sm font-semibold text-gray-900 mt-1">{team.health}%</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      <strong>Last Action:</strong> {team.lastAction}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getMetricColor(team.color)}`}
                        style={{ width: `${team.health}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Metrics */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Strategic Metrics</h2>
              <div className="space-y-4">
                {strategicMetrics.map((metric, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{metric.label}</span>
                      <div className="flex items-center">
                        <span className="text-lg">{getTrendIcon(metric.trend)}</span>
                        <span className="text-sm font-semibold text-gray-900 ml-1">{metric.value}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                      <div 
                        className={`h-2 rounded-full ${getMetricColor(metric.color)}`}
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Target: {metric.target}%</span>
                      <span>{metric.value >= metric.target ? 'On Track' : 'Needs Attention'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Strategic Chat */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">💬 Strategic AI Chat</h2>
                <p className="text-sm text-gray-600">Live AI interaction - Ask strategic questions and get executable workflows</p>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50">
                <StrategicChat />
              </div>
            </div>

            {/* Demo Alerts */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">🚨 Strategic Alerts</h2>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">⚠️</span>
                    <div>
                      <p className="font-medium text-red-900">Competitor Analysis Required</p>
                      <p className="text-sm text-red-700">New AI PM tool launched - needs strategic response</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-2">📋</span>
                    <div>
                      <p className="font-medium text-yellow-900">Budget Review Due</p>
                      <p className="text-sm text-yellow-700">Q4 resource allocation review scheduled for next week</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-2">🎯</span>
                    <div>
                      <p className="font-medium text-blue-900">OKR Progress Update</p>
                      <p className="text-sm text-blue-700">Growth OKR at 73% - acceleration needed for quarterly target</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner - Demo Status */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">🚀 Day 3 Beta Launch Demo</h3>
              <p className="opacity-90">Strategic Command Center operational - AI teams coordinating PMO transformation</p>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Demo Components</div>
              <div className="flex space-x-4 mt-1">
                <span className="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">✅ Strategic Chat</span>
                <span className="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">✅ AI Teams</span>
                <span className="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">✅ Health Scores</span>
                <span className="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">🔄 Live Demo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicCommandCenter;