/**
 * Component: PMCommandCenter (Dashboard)
 * Design Reference: APP_THEME_GUIDE.md - Core app design system
 * UX Pattern: PM33_COMPLETE_UX_SYSTEM.md - Section 2.1 PM Command Center
 * 
 * Compliance Checklist:
 * - [x] Uses shadcn/ui components exclusively
 * - [x] Professional B2B SaaS design
 * - [x] lucide-react icons
 * - [x] Progress indicators present
 * - [x] Follows responsive grid system
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Brain,
  Sparkles,
  Target,
  Check,
  Star,
  Link2
} from 'lucide-react';
import Link from 'next/link';
import CoreAppNavigation from '../../../components/app/CoreAppNavigation';

// Types following Intelligence Operations model
interface UserContext {
  name: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  completedToday: number;
  totalToday: number;
  strategicScore: 'A+' | 'A' | 'B+' | 'B' | 'C';
  teamAlignment: number;
}

interface PMSkill {
  level: number;
  name: string;
  progress: number;
  nextUnlock: string;
  recentAchievement: string;
}

interface StrategicRecommendation {
  id: string;
  title: string;
  confidence: number;
  type: 'competitor_response' | 'feature_priority' | 'resource_allocation';
  urgency: 'high' | 'medium' | 'low';
  estimatedTime: string;
}

export default function PMCommandCenter() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConnectedToJira, setIsConnectedToJira] = useState(false);
  const [jiraWorkspace, setJiraWorkspace] = useState<string | null>(null);
  const [userContext, setUserContext] = useState<UserContext>({
    name: 'Sarah',
    timeOfDay: 'morning',
    completedToday: 4,
    totalToday: 5,
    strategicScore: 'A+',
    teamAlignment: 92
  });

  const [skills] = useState<Record<string, PMSkill>>({
    strategic: {
      level: 7,
      name: "Strategic Thinking",
      progress: 73,
      nextUnlock: "Blue Ocean Analysis",
      recentAchievement: "Made 10 data-driven decisions"
    },
    execution: {
      level: 5,
      name: "Execution Excellence", 
      progress: 45,
      nextUnlock: "Automated Sprint Planning",
      recentAchievement: "Shipped 3 features on time"
    },
    leadership: {
      level: 6,
      name: "Team Leadership",
      progress: 60,
      nextUnlock: "AI Team Coaching",
      recentAchievement: "Team happiness at 95%"
    }
  });

  const [recommendations] = useState<StrategicRecommendation[]>([
    {
      id: 'rec_1',
      title: 'Competitor launched AI features - Strategic response needed',
      confidence: 94,
      type: 'competitor_response',
      urgency: 'high',
      estimatedTime: '3 min review'
    },
    {
      id: 'rec_2', 
      title: 'Reallocate engineering resources for Q4 impact',
      confidence: 87,
      type: 'resource_allocation',
      urgency: 'medium',
      estimatedTime: '5 min review'
    }
  ]);

  // OAuth functionality
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const connected = localStorage.getItem('pm33_demo_jira_connected') === 'true';
      const workspace = localStorage.getItem('pm33_demo_jira_workspace');
      setIsConnectedToJira(connected);
      setJiraWorkspace(workspace);
    }
  }, []);

  const handleConnectJira = () => {
    const setupMessage = `🔧 PM33 OAuth Setup Instructions for Jira

To connect your real Jira workspace:
1. Go to: https://developer.atlassian.com/console/myapps/
2. Click "Create" → "OAuth 2.0 (3LO)" 
3. Add redirect URI: http://localhost:3000/api/integrations/oauth/callback/jira

📝 Currently in DEMO MODE
Click OK to simulate a successful connection.`;

    if (confirm(setupMessage)) {
      alert(`✅ Demo Connection Successful!

Jira workspace "Demo Company" connected!`);
      localStorage.setItem('pm33_demo_jira_connected', 'true');
      localStorage.setItem('pm33_demo_jira_workspace', 'Demo Company');
      setIsConnectedToJira(true);
      setJiraWorkspace('Demo Company');
    }
  };

  const getContextualGreeting = () => {
    const { name, timeOfDay, completedToday, totalToday } = userContext;
    const completionRate = Math.round((completedToday / totalToday) * 100);
    
    if (timeOfDay === 'morning') {
      return `Good morning, ${name}! Here's your strategic focus for today.`;
    } else if (timeOfDay === 'afternoon') {
      return `Afternoon check-in: You're ${completionRate}% through today's priorities.`;
    } else {
      return `Evening review: Strong progress on strategic initiatives today.`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <CoreAppNavigation />
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="space-y-8">
          {/* Contextual Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              {getContextualGreeting()}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Strategic Intelligence Operations - {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* The Magic Moment - AI Already Did The Work */}
          <Card className="mb-8">
            <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
              <Sparkles className="h-4 w-4" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                <strong>Intelligence Operations Summary</strong><br />
                While you were away, PM33 analyzed <strong>3 competitor updates</strong>, 
                reviewed <strong>12 customer tickets</strong>, and prepared <strong>2 strategic recommendations</strong>.
              </AlertDescription>
            </Alert>
          </Card>

          {/* Clear Next Action */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      🎯 Priority Action
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Your highest-impact next step
                    </p>
                  </div>
                  <Badge variant="destructive" className="text-sm">
                    High Priority
                  </Badge>
                </div>

                <div>
                  <Link href="/strategic-intelligence" className="block">
                    <Button
                      size="lg"
                      className="w-full h-14 text-lg font-semibold"
                      onClick={() => setIsProcessing(true)}
                    >
                      <Brain className="mr-2 h-5 w-5" />
                      Review Strategic Recommendations (3 min)
                    </Button>
                  </Link>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Then: Team standup prep (2 min)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Dopamine Hit */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  📊 Today's Progress
                </h2>
                
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Daily Progress Ring */}
                  <div className="relative w-32 h-32 mx-auto md:mx-0">
                    <Progress 
                      value={Math.round((userContext.completedToday / userContext.totalToday) * 100)} 
                      className="w-32 h-32 rounded-full"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">
                        {Math.round((userContext.completedToday / userContext.totalToday) * 100)}%
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Complete</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {userContext.completedToday}/{userContext.totalToday}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Decisions Made</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {userContext.teamAlignment}%
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Team Aligned</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                            {userContext.strategicScore}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            improved
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Strategic Score</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* OAuth Integration Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Link2 className="h-5 w-5" />
                    PM Tool Integrations
                  </h2>
                  <Badge variant={isConnectedToJira ? "default" : "secondary"} className="text-sm">
                    {isConnectedToJira ? "Connected" : "Not Connected"}
                  </Badge>
                </div>
                
                <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">J</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          Atlassian Jira
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          {isConnectedToJira 
                            ? `Connected to: ${jiraWorkspace}` 
                            : 'Connect your Jira workspace for task automation'
                          }
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={handleConnectJira}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Connect Jira
                    </Button>
                  </div>

                  {isConnectedToJira && (
                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Check className="text-green-600 text-sm h-4 w-4 mr-2" />
                        <h4 className="font-medium text-green-800 dark:text-green-200">Active Integration</h4>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Ready for task automation and strategic workflow execution
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-full">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    Currently in Demo Mode
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PM Skill Tree */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    🚀 PM Skill Tree
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Level up your product management expertise
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.entries(skills).map(([key, skill]) => (
                    <div
                      key={key}
                      className="p-5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex items-center gap-4">
                        <Badge variant="default" className="text-sm px-3 py-1 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white">
                          Lvl {skill.level}
                        </Badge>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-slate-900 dark:text-white">{skill.name}</h3>
                            <span className="text-sm text-slate-500 dark:text-slate-400">{skill.progress}%</span>
                          </div>
                          <Progress 
                            value={skill.progress} 
                            className="h-2"
                          />
                          <div className="flex flex-col sm:flex-row gap-2 text-xs">
                            <p className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              Next: {skill.nextUnlock}
                            </p>
                            <p className="text-green-600 dark:text-green-400 flex items-center gap-1">
                              <Check className="h-3 w-3" />
                              {skill.recentAchievement}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/strategic-intelligence" className="flex-1">
              <Button size="lg" className="w-full">
                <Brain className="mr-2 h-5 w-5" />
                Strategic Intelligence
              </Button>
            </Link>
            <Link href="/tasks" className="flex-1">
              <Button variant="secondary" size="lg" className="w-full">
                <Target className="mr-2 h-5 w-5" />
                Task Management
              </Button>
            </Link>
          </div>
          
          {/* AI Processing State */}
          {isProcessing && (
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Analyzing strategic intelligence...</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Preparing your customized recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}