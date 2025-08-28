/**
 * Component: WhatIfScenariosPage
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Scenarios interface
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Data visualization patterns
 * 
 * Compliance Checklist:
 * - [x] Uses shadcn/ui components exclusively
 * - [x] Glass morphism applied with GlassCard
 * - [x] Professional B2B SaaS design
 * - [x] lucide-react icons with animations
 * - [x] Recharts for data visualization
 * - [x] Interactive parameter sliders
 * - [x] Real-time scenario calculations
 * - [x] Follows 8pt grid spacing
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import GlassCard, { AIGlassCard, StrategicGlassCard, PremiumGlassCard } from '@/components/ui/glass-card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  ReferenceLine
} from 'recharts';
import { 
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Target,
  Users,
  Clock,
  DollarSign,
  Zap,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share,
  Settings,
  Info
} from 'lucide-react';
import CoreAppNavigation from '../../../components/app/CoreAppNavigation';

// Types
interface ScenarioParameter {
  id: string;
  name: string;
  description: string;
  min: number;
  max: number;
  default: number;
  unit: string;
  impact: 'high' | 'medium' | 'low';
}

interface ScenarioResult {
  timeline: string;
  revenue: number;
  users: number;
  costs: number;
  profit: number;
  marketShare: number;
  riskScore: number;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, number>;
  results: ScenarioResult[];
  confidence: number;
  recommendation: 'strongly-recommended' | 'recommended' | 'neutral' | 'not-recommended' | 'strongly-discouraged';
}

// Configuration
const scenarioParameters: ScenarioParameter[] = [
  {
    id: 'teamSize',
    name: 'Team Size',
    description: 'Number of full-time engineers',
    min: 3,
    max: 20,
    default: 8,
    unit: 'engineers',
    impact: 'high'
  },
  {
    id: 'marketingBudget',
    name: 'Marketing Budget',
    description: 'Monthly marketing spend',
    min: 5000,
    max: 100000,
    default: 25000,
    unit: '$',
    impact: 'high'
  },
  {
    id: 'productComplexity',
    name: 'Product Complexity',
    description: 'Feature complexity score (1-10)',
    min: 1,
    max: 10,
    default: 6,
    unit: '/10',
    impact: 'medium'
  },
  {
    id: 'timeToMarket',
    name: 'Time to Market',
    description: 'Months until launch',
    min: 3,
    max: 18,
    default: 9,
    unit: 'months',
    impact: 'high'
  },
  {
    id: 'competitorResponse',
    name: 'Competitor Response',
    description: 'Expected competitive pressure (1-10)',
    min: 1,
    max: 10,
    default: 5,
    unit: '/10',
    impact: 'medium'
  },
  {
    id: 'customerSegments',
    name: 'Target Segments',
    description: 'Number of customer segments to target',
    min: 1,
    max: 5,
    default: 2,
    unit: 'segments',
    impact: 'medium'
  },
  {
    id: 'pricingStrategy',
    name: 'Pricing Premium',
    description: 'Pricing above market average (%)',
    min: -30,
    max: 100,
    default: 20,
    unit: '%',
    impact: 'high'
  },
  {
    id: 'marketConditions',
    name: 'Market Conditions',
    description: 'Market favorability (1-10)',
    min: 1,
    max: 10,
    default: 7,
    unit: '/10',
    impact: 'low'
  }
];

// Sample scenarios
const predefinedScenarios: Scenario[] = [
  {
    id: 'conservative',
    name: 'Conservative Growth',
    description: 'Low-risk approach with steady, predictable growth',
    parameters: {
      teamSize: 5,
      marketingBudget: 15000,
      productComplexity: 4,
      timeToMarket: 12,
      competitorResponse: 3,
      customerSegments: 1,
      pricingStrategy: 0,
      marketConditions: 6
    },
    results: [],
    confidence: 85,
    recommendation: 'recommended'
  },
  {
    id: 'aggressive',
    name: 'Aggressive Expansion',
    description: 'High-risk, high-reward rapid growth strategy',
    parameters: {
      teamSize: 15,
      marketingBudget: 75000,
      productComplexity: 8,
      timeToMarket: 6,
      competitorResponse: 8,
      customerSegments: 4,
      pricingStrategy: 50,
      marketConditions: 8
    },
    results: [],
    confidence: 65,
    recommendation: 'neutral'
  },
  {
    id: 'balanced',
    name: 'Balanced Approach',
    description: 'Moderate risk with balanced growth potential',
    parameters: {
      teamSize: 8,
      marketingBudget: 25000,
      productComplexity: 6,
      timeToMarket: 9,
      competitorResponse: 5,
      customerSegments: 2,
      pricingStrategy: 20,
      marketConditions: 7
    },
    results: [],
    confidence: 78,
    recommendation: 'strongly-recommended'
  }
];

// Colors for charts
const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

const WhatIfScenariosPage: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<string>('custom');
  const [parameters, setParameters] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {};
    scenarioParameters.forEach(param => {
      defaults[param.id] = param.default;
    });
    return defaults;
  });
  const [scenarios, setScenarios] = useState<Scenario[]>(predefinedScenarios);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string>('revenue');
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [timeHorizon, setTimeHorizon] = useState<12 | 24 | 36>(24);

  // Calculate scenario results based on parameters
  const calculateScenarioResults = useMemo(() => {
    return (params: Record<string, number>): ScenarioResult[] => {
      const results: ScenarioResult[] = [];
      
      // Base calculations
      const baseRevenue = 50000; // Base monthly revenue
      const baseUsers = 1000;    // Base user count
      const baseCosts = 30000;   // Base monthly costs
      
      for (let month = 1; month <= timeHorizon; month++) {
        // Revenue calculations
        const teamEffectOnRevenue = Math.log(params.teamSize) * 0.3;
        const marketingEffectOnRevenue = Math.log(params.marketingBudget / 1000) * 0.25;
        const pricingEffect = 1 + (params.pricingStrategy / 100) * 0.8;
        const marketConditionsEffect = params.marketConditions / 10;
        const timeToMarketPenalty = Math.max(0, 1 - (params.timeToMarket - month) * 0.05);
        const competitorPenalty = 1 - (params.competitorResponse / 10) * 0.3;
        
        const revenueGrowthRate = (teamEffectOnRevenue + marketingEffectOnRevenue) * 
                                 marketConditionsEffect * competitorPenalty * timeToMarketPenalty;
        
        const monthlyRevenue = baseRevenue * Math.pow(1 + revenueGrowthRate * 0.1, month) * pricingEffect;
        
        // User calculations
        const userGrowthRate = marketingEffectOnRevenue * marketConditionsEffect * competitorPenalty;
        const monthlyUsers = baseUsers * Math.pow(1 + userGrowthRate * 0.15, month);
        
        // Cost calculations
        const teamCosts = params.teamSize * 8000; // $8k per engineer per month
        const marketingCosts = params.marketingBudget;
        const complexityCosts = params.productComplexity * 2000;
        const segmentCosts = params.customerSegments * 3000;
        
        const totalCosts = teamCosts + marketingCosts + complexityCosts + segmentCosts + baseCosts;
        
        // Risk calculations
        const riskFromComplexity = params.productComplexity * 0.8;
        const riskFromTimeToMarket = Math.max(0, 10 - params.timeToMarket) * 0.5;
        const riskFromCompetition = params.competitorResponse * 0.6;
        const riskFromPricing = Math.abs(params.pricingStrategy) * 0.02;
        
        const riskScore = Math.min(10, riskFromComplexity + riskFromTimeToMarket + riskFromCompetition + riskFromPricing);
        
        // Market share (simplified calculation)
        const marketShare = Math.min(25, (monthlyUsers / 100000) * 100);
        
        results.push({
          timeline: month <= 12 ? `Month ${month}` : `Year ${Math.ceil(month / 12)} M${month % 12 || 12}`,
          revenue: Math.round(monthlyRevenue),
          users: Math.round(monthlyUsers),
          costs: Math.round(totalCosts),
          profit: Math.round(monthlyRevenue - totalCosts),
          marketShare: Math.round(marketShare * 10) / 10,
          riskScore: Math.round(riskScore * 10) / 10
        });
      }
      
      return results;
    };
  }, [timeHorizon]);

  // Current scenario results
  const currentResults = useMemo(() => {
    return calculateScenarioResults(parameters);
  }, [parameters, calculateScenarioResults]);

  // Load predefined scenario
  const loadScenario = (scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      setParameters(scenario.parameters);
      setActiveScenario(scenarioId);
    }
  };

  // Run simulation
  const runSimulation = async () => {
    setIsSimulating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update scenarios with new results
    const updatedScenarios = scenarios.map(scenario => ({
      ...scenario,
      results: calculateScenarioResults(scenario.parameters)
    }));
    
    setScenarios(updatedScenarios);
    setIsSimulating(false);
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-3 rounded-lg border border-white/10 backdrop-blur-sm">
          <p className="text-white font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value.toLocaleString()}${
                selectedMetric === 'marketShare' ? '%' : 
                selectedMetric === 'riskScore' ? '/10' : 
                selectedMetric.includes('revenue') || selectedMetric.includes('costs') || selectedMetric.includes('profit') ? '$' : ''
              }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Get recommendation color
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'strongly-recommended': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'recommended': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'neutral': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'not-recommended': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'strongly-discouraged': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <CoreAppNavigation />
      
      <div className="container mx-auto px-6 py-12 pt-24 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                What-If Scenarios
              </h1>
              <p className="text-lg text-slate-300 mt-2">
                Model different strategic approaches and their potential outcomes
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={timeHorizon.toString()} onValueChange={(value) => setTimeHorizon(Number(value) as 12 | 24 | 36)}>
                <SelectTrigger className="bg-white/5 border-white/10 w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 Months</SelectItem>
                  <SelectItem value="24">24 Months</SelectItem>
                  <SelectItem value="36">36 Months</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={runSimulation}
                disabled={isSimulating}
              >
                {isSimulating ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
                Run Simulation
              </Button>
              
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Results
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Parameters Panel */}
            <div className="lg:col-span-1">
              <StrategicGlassCard title="Scenario Parameters" className="h-full">
                <div className="space-y-6">
                  {/* Predefined Scenarios */}
                  <div className="space-y-3">
                    <Label className="text-white font-semibold">Quick Scenarios</Label>
                    <div className="space-y-2">
                      {scenarios.map((scenario) => (
                        <Button
                          key={scenario.id}
                          variant={activeScenario === scenario.id ? "default" : "outline"}
                          className="w-full justify-start text-left h-auto p-3"
                          onClick={() => loadScenario(scenario.id)}
                        >
                          <div>
                            <div className="font-semibold text-sm">{scenario.name}</div>
                            <div className="text-xs opacity-60 mt-1">{scenario.description}</div>
                          </div>
                        </Button>
                      ))}
                      <Button
                        variant={activeScenario === 'custom' ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setActiveScenario('custom')}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Custom Scenario
                      </Button>
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  {/* Parameter Sliders */}
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-6">
                      {scenarioParameters.map((param) => (
                        <div key={param.id} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-white text-sm font-medium">
                              {param.name}
                            </Label>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={param.impact === 'high' ? 'destructive' : param.impact === 'medium' ? 'secondary' : 'outline'}
                                className="text-xs"
                              >
                                {param.impact}
                              </Badge>
                              <div className="text-sm text-blue-400 font-mono">
                                {parameters[param.id]}{param.unit}
                              </div>
                            </div>
                          </div>
                          
                          <Slider
                            value={[parameters[param.id]]}
                            onValueChange={(value) => setParameters(prev => ({ ...prev, [param.id]: value[0] }))}
                            min={param.min}
                            max={param.max}
                            step={param.max > 1000 ? 1000 : param.max > 100 ? 10 : 1}
                            className="w-full"
                          />
                          
                          <p className="text-xs text-slate-400">{param.description}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </StrategicGlassCard>
            </div>

            {/* Visualization Panel */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Controls */}
                <div className="flex items-center justify-between">
                  <Tabs value={selectedMetric} onValueChange={setSelectedMetric}>
                    <TabsList className="bg-white/5 border border-white/10">
                      <TabsTrigger value="revenue">Revenue</TabsTrigger>
                      <TabsTrigger value="users">Users</TabsTrigger>
                      <TabsTrigger value="profit">Profit</TabsTrigger>
                      <TabsTrigger value="marketShare">Market Share</TabsTrigger>
                      <TabsTrigger value="riskScore">Risk</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === 'chart' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('chart')}
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'table' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                    >
                      <PieChartIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Main Visualization */}
                <StrategicGlassCard title={`${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Projection`} className="h-[500px]">
                  {viewMode === 'chart' ? (
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={currentResults}>
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#667eea" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="timeline" 
                          stroke="rgba(255,255,255,0.6)" 
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="rgba(255,255,255,0.6)" 
                          fontSize={12}
                          tickFormatter={(value) => {
                            if (selectedMetric.includes('revenue') || selectedMetric.includes('costs') || selectedMetric.includes('profit')) {
                              return `$${(value / 1000).toFixed(0)}K`;
                            }
                            return value.toLocaleString();
                          }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey={selectedMetric}
                          stroke="#667eea"
                          strokeWidth={2}
                          fill="url(#colorGradient)"
                        />
                        {selectedMetric === 'riskScore' && (
                          <ReferenceLine y={5} stroke="#f59e0b" strokeDasharray="3 3" label="Risk Threshold" />
                        )}
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-2 text-white">Timeline</th>
                            <th className="text-right py-2 text-white">Revenue</th>
                            <th className="text-right py-2 text-white">Users</th>
                            <th className="text-right py-2 text-white">Costs</th>
                            <th className="text-right py-2 text-white">Profit</th>
                            <th className="text-right py-2 text-white">Risk</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentResults.slice(0, 12).map((result, index) => (
                            <tr key={index} className="border-b border-white/5">
                              <td className="py-2 text-slate-300">{result.timeline}</td>
                              <td className="text-right py-2 text-slate-300">${result.revenue.toLocaleString()}</td>
                              <td className="text-right py-2 text-slate-300">{result.users.toLocaleString()}</td>
                              <td className="text-right py-2 text-slate-300">${result.costs.toLocaleString()}</td>
                              <td className={`text-right py-2 ${result.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                ${result.profit.toLocaleString()}
                              </td>
                              <td className={`text-right py-2 ${result.riskScore > 5 ? 'text-red-400' : 'text-green-400'}`}>
                                {result.riskScore}/10
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </StrategicGlassCard>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <AIGlassCard>
                    <div className="text-center">
                      <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-400" />
                      <div className="text-lg font-bold text-white">
                        ${(currentResults[currentResults.length - 1]?.revenue || 0).toLocaleString()}
                      </div>
                      <p className="text-xs text-slate-300">Final Revenue</p>
                    </div>
                  </AIGlassCard>

                  <AIGlassCard>
                    <div className="text-center">
                      <Users className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                      <div className="text-lg font-bold text-white">
                        {(currentResults[currentResults.length - 1]?.users || 0).toLocaleString()}
                      </div>
                      <p className="text-xs text-slate-300">Total Users</p>
                    </div>
                  </AIGlassCard>

                  <AIGlassCard>
                    <div className="text-center">
                      <Target className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                      <div className="text-lg font-bold text-white">
                        {(currentResults[currentResults.length - 1]?.marketShare || 0).toFixed(1)}%
                      </div>
                      <p className="text-xs text-slate-300">Market Share</p>
                    </div>
                  </AIGlassCard>

                  <AIGlassCard>
                    <div className="text-center">
                      <AlertTriangle className={`h-6 w-6 mx-auto mb-2 ${(currentResults[currentResults.length - 1]?.riskScore || 0) > 5 ? 'text-red-400' : 'text-green-400'}`} />
                      <div className="text-lg font-bold text-white">
                        {(currentResults[currentResults.length - 1]?.riskScore || 0).toFixed(1)}/10
                      </div>
                      <p className="text-xs text-slate-300">Risk Score</p>
                    </div>
                  </AIGlassCard>
                </div>

                {/* Scenario Comparison */}
                <StrategicGlassCard title="Scenario Comparison">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {scenarios.map((scenario) => (
                      <Card key={scenario.id} className={`bg-white/5 border border-white/10 ${activeScenario === scenario.id ? 'border-blue-400 bg-blue-500/10' : ''}`}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm text-white">{scenario.name}</CardTitle>
                            <Badge className={getRecommendationColor(scenario.recommendation)}>
                              {scenario.recommendation.replace('-', ' ')}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-xs text-slate-400 mb-3">{scenario.description}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-300">Confidence</span>
                              <span className="text-blue-400">{scenario.confidence}%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-300">Team Size</span>
                              <span className="text-white">{scenario.parameters.teamSize}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-300">Time to Market</span>
                              <span className="text-white">{scenario.parameters.timeToMarket}m</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </StrategicGlassCard>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhatIfScenariosPage;