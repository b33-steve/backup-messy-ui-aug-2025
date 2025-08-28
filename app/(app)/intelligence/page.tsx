/**
 * Component: StrategicIntelligencePage
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Strategic intelligence interface
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Chat interface patterns
 * 
 * Compliance Checklist:
 * - [x] Uses shadcn/ui components exclusively
 * - [x] Glass morphism applied with GlassCard
 * - [x] Professional B2B SaaS design
 * - [x] lucide-react icons with animations
 * - [x] Responsive layout with strategic chat interface
 * - [x] AI framework selection and processing states
 * - [x] Follows 8pt grid spacing
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import GlassCard, { AIGlassCard, StrategicGlassCard, PremiumGlassCard } from '@/components/ui/glass-card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Send, 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Lightbulb, 
  Zap,
  Target,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  MessageCircle,
  Settings,
  RefreshCw
} from 'lucide-react';
import CoreAppNavigation from '../../../components/app/CoreAppNavigation';

// AI Framework Types
interface AIFramework {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bestFor: string[];
  confidence: number;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  framework?: string;
  confidence?: number;
  analysis?: {
    frameworks: string[];
    recommendations: string[];
    confidence: number;
  };
}

interface AnalysisProgress {
  phase: string;
  progress: number;
  description: string;
}

const StrategicIntelligencePage: React.FC = () => {
  // State Management
  const [selectedFramework, setSelectedFramework] = useState<string>('auto');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState<AnalysisProgress[]>([]);
  const [currentPhase, setCurrentPhase] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // AI Frameworks Configuration
  const frameworks: AIFramework[] = [
    {
      id: 'auto',
      name: 'Auto-Select Framework',
      description: 'AI automatically chooses the best framework combination',
      icon: <Brain className="h-5 w-5" />,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      bestFor: ['Complex decisions', 'Multi-factor analysis', 'Unknown scenarios'],
      confidence: 95
    },
    {
      id: 'ice',
      name: 'ICE Framework',
      description: 'Impact × Confidence × Ease scoring',
      icon: <Target className="h-5 w-5" />,
      color: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
      bestFor: ['Feature prioritization', 'Resource allocation', 'Quick wins'],
      confidence: 92
    },
    {
      id: 'rice',
      name: 'RICE Framework',
      description: 'Reach × Impact × Confidence × Effort analysis',
      icon: <BarChart3 className="h-5 w-5" />,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      bestFor: ['Product roadmaps', 'Growth initiatives', 'Market expansion'],
      confidence: 88
    },
    {
      id: 'porter',
      name: 'Porter\'s Five Forces',
      description: 'Competitive landscape and market dynamics',
      icon: <Users className="h-5 w-5" />,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      bestFor: ['Market analysis', 'Competitive strategy', 'Industry positioning'],
      confidence: 85
    },
    {
      id: 'kano',
      name: 'Kano Model',
      description: 'Customer satisfaction vs feature investment',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      bestFor: ['Feature satisfaction', 'User experience', 'Customer delight'],
      confidence: 90
    }
  ];

  // Analysis phases simulation
  const analysisPhases: AnalysisProgress[] = [
    { phase: 'Parsing Query', progress: 100, description: 'Understanding your strategic question' },
    { phase: 'Framework Selection', progress: 100, description: 'Choosing optimal analysis framework' },
    { phase: 'Data Gathering', progress: 75, description: 'Collecting relevant market and competitive data' },
    { phase: 'Strategic Analysis', progress: 45, description: 'Running multi-framework analysis' },
    { phase: 'Confidence Scoring', progress: 0, description: 'Calculating recommendation confidence' },
    { phase: 'Actionable Insights', progress: 0, description: 'Generating executable recommendations' }
  ];

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle message submission
  const handleSubmit = async () => {
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsAnalyzing(true);
    setCurrentPhase(0);
    setAnalysisProgress(analysisPhases);

    // Simulate AI processing
    const selectedFw = frameworks.find(f => f.id === selectedFramework);
    const systemMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'system',
      content: `Analyzing with ${selectedFw?.name || 'Auto-Selected Framework'}...`,
      timestamp: new Date(),
      framework: selectedFramework
    };

    setMessages(prev => [...prev, systemMessage]);

    // Simulate progress phases
    for (let i = 0; i < analysisPhases.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentPhase(i);
      
      if (i === analysisPhases.length - 1) {
        // Final AI response
        const aiResponse: ChatMessage = {
          id: (Date.now() + 2).toString(),
          type: 'ai',
          content: generateStrategicResponse(query, selectedFramework),
          timestamp: new Date(),
          framework: selectedFramework,
          confidence: selectedFw?.confidence || 85,
          analysis: {
            frameworks: selectedFramework === 'auto' ? ['ICE', 'RICE', 'Porter\'s Five Forces'] : [selectedFw?.name || ''],
            recommendations: [
              'Prioritize high-impact, low-effort initiatives first',
              'Conduct user interviews to validate assumptions',
              'Set up key metrics tracking for decision validation'
            ],
            confidence: selectedFw?.confidence || 85
          }
        };

        setMessages(prev => [...prev, aiResponse]);
        setIsAnalyzing(false);
      }
    }
  };

  // Generate strategic response based on query
  const generateStrategicResponse = (query: string, framework: string): string => {
    const responses = {
      auto: `I've analyzed your strategic question using multiple frameworks (ICE, RICE, and Porter's Five Forces). Based on the analysis, here are my key insights:\n\n**Strategic Recommendation:** Proceed with a phased approach focusing on high-impact, low-risk initiatives first.\n\n**Key Insights:**\n• Market opportunity score: 8.2/10\n• Implementation feasibility: 7.5/10\n• Competitive advantage potential: 6.8/10\n\n**Next Steps:**\n1. Validate assumptions with user research\n2. Create detailed implementation roadmap\n3. Set up success metrics and tracking`,
      
      ice: `Using the ICE Framework (Impact × Confidence × Ease), I've scored your strategic question:\n\n**ICE Analysis:**\n• Impact Score: 8/10 - High potential business value\n• Confidence Score: 7/10 - Strong data supports this direction\n• Ease Score: 6/10 - Moderate implementation complexity\n\n**Overall ICE Score: 7.0/10**\n\nThis places your initiative in the "High Priority" category for execution.`,
      
      rice: `RICE Framework Analysis (Reach × Impact × Confidence × Effort):\n\n**RICE Breakdown:**\n• Reach: 2,500 users/quarter\n• Impact: 2.5x improvement expected\n• Confidence: 75% based on available data\n• Effort: 6 person-months\n\n**RICE Score: 781**\n\nThis indicates a strong strategic opportunity worth prioritizing in your roadmap.`,
      
      porter: `Porter's Five Forces Analysis reveals:\n\n**Competitive Landscape:**\n• Threat of New Entrants: Medium\n• Bargaining Power of Suppliers: Low\n• Bargaining Power of Buyers: High\n• Threat of Substitutes: Medium-High\n• Competitive Rivalry: High\n\n**Strategic Position:** Focus on differentiation and customer lock-in strategies.`,
      
      kano: `Kano Model Analysis categorizes your feature/initiative:\n\n**Customer Satisfaction Impact:**\n• Basic Expectations: Met\n• Performance Features: High opportunity\n• Excitement Features: Moderate potential\n\n**Recommendation:** This appears to be a Performance feature that will drive customer satisfaction proportionally to implementation quality.`
    };

    return responses[framework as keyof typeof responses] || responses.auto;
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
          <div className="text-center space-y-4 mb-8">
            <motion.div 
              className="flex items-center justify-center gap-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
                <Brain className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Strategic Intelligence Engine
                </h1>
                <p className="text-lg text-slate-300">
                  Multi-framework AI analysis for strategic decisions
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[800px]">
            {/* Framework Selection Sidebar */}
            <div className="lg:col-span-1">
              <StrategicGlassCard title="AI Framework Selection" className="h-full">
                <div className="space-y-4">
                  <div className="space-y-3">
                    {frameworks.map((framework) => (
                      <motion.div
                        key={framework.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card 
                          className={`cursor-pointer transition-all ${
                            selectedFramework === framework.id 
                              ? 'border-blue-400 bg-blue-500/10' 
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                          }`}
                          onClick={() => setSelectedFramework(framework.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div 
                                className="p-2 rounded-lg flex-shrink-0"
                                style={{ background: framework.color }}
                              >
                                {framework.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-white text-sm mb-1">
                                  {framework.name}
                                </h3>
                                <p className="text-xs text-slate-400 mb-2">
                                  {framework.description}
                                </p>
                                <Badge variant="secondary" className="text-xs">
                                  {framework.confidence}% confidence
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </StrategicGlassCard>
            </div>

            {/* Main Chat Interface */}
            <div className="lg:col-span-3">
              <StrategicGlassCard title="Strategic Analysis Chat" className="h-full flex flex-col">
                {/* Messages Area */}
                <ScrollArea className="flex-1 pr-4 mb-4">
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center py-12 text-slate-400">
                        <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Ask a strategic question to get started</p>
                        <p className="text-sm mt-2">
                          Example: "Should we prioritize mobile app development or web platform improvements?"
                        </p>
                      </div>
                    ) : (
                      <>
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                              message.type === 'user' 
                                ? 'bg-blue-600 text-white' 
                                : message.type === 'ai'
                                ? 'bg-white/10 backdrop-blur-sm border border-white/10'
                                : 'bg-yellow-500/20 border border-yellow-500/30'
                            }`}>
                              {message.type === 'ai' && (
                                <div className="flex items-center gap-2 mb-2">
                                  <Brain className="h-4 w-4 text-blue-400" />
                                  <span className="text-sm font-medium text-blue-400">Strategic AI</span>
                                  {message.confidence && (
                                    <Badge variant="secondary" className="text-xs">
                                      {message.confidence}% confident
                                    </Badge>
                                  )}
                                </div>
                              )}
                              
                              <div className="whitespace-pre-wrap text-sm">
                                {message.content}
                              </div>
                              
                              {message.analysis && (
                                <div className="mt-4 pt-4 border-t border-white/10">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                    <div>
                                      <p className="font-medium mb-1">Frameworks Used:</p>
                                      <div className="flex flex-wrap gap-1">
                                        {message.analysis.frameworks.map((fw) => (
                                          <Badge key={fw} variant="outline" className="text-xs">
                                            {fw}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <p className="font-medium mb-1">Key Actions:</p>
                                      <ul className="space-y-1">
                                        {message.analysis.recommendations.map((rec, idx) => (
                                          <li key={idx} className="flex items-start gap-1">
                                            <CheckCircle className="h-3 w-3 mt-0.5 text-green-400 flex-shrink-0" />
                                            <span>{rec}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              <div className="text-xs opacity-60 mt-2">
                                {message.timestamp.toLocaleTimeString()}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        
                        {/* Analysis Progress */}
                        {isAnalyzing && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                          >
                            <div className="max-w-[80%] bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <RefreshCw className="h-4 w-4 text-blue-400 animate-spin" />
                                <span className="text-sm font-medium text-blue-400">Analyzing...</span>
                              </div>
                              
                              <div className="space-y-3">
                                {analysisProgress.map((phase, idx) => (
                                  <div key={idx} className="space-y-1">
                                    <div className="flex items-center justify-between text-xs">
                                      <span className={idx <= currentPhase ? 'text-white' : 'text-slate-400'}>
                                        {phase.phase}
                                      </span>
                                      <span className={idx <= currentPhase ? 'text-blue-400' : 'text-slate-500'}>
                                        {idx < currentPhase ? '100' : idx === currentPhase ? phase.progress : '0'}%
                                      </span>
                                    </div>
                                    <Progress 
                                      value={idx < currentPhase ? 100 : idx === currentPhase ? phase.progress : 0}
                                      className="h-1"
                                    />
                                    {idx === currentPhase && (
                                      <p className="text-xs text-slate-400">{phase.description}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <Textarea
                      ref={textareaRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Ask a strategic question... (e.g., Should we prioritize feature A or B for our Q2 roadmap?)"
                      className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-slate-400 resize-none"
                      rows={3}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleSubmit}
                      disabled={!query.trim() || isAnalyzing}
                      className="px-6"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      }}
                    >
                      {isAnalyzing ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>
                      Selected: {frameworks.find(f => f.id === selectedFramework)?.name}
                    </span>
                    <span>
                      Press Enter to send, Shift+Enter for new line
                    </span>
                  </div>
                </div>
              </StrategicGlassCard>
            </div>
          </div>

          {/* Framework Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AIGlassCard>
              <div className="text-center">
                <Sparkles className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                <h3 className="font-semibold mb-2 text-xl text-white">
                  Multi-Framework Analysis
                </h3>
                <p className="text-sm text-slate-300">
                  Combines ICE, RICE, Porter's Forces, and Kano models for comprehensive insights
                </p>
              </div>
            </AIGlassCard>
            
            <AIGlassCard>
              <div className="text-center">
                <Target className="h-12 w-12 mx-auto mb-4 text-green-400" />
                <h3 className="font-semibold mb-2 text-xl text-white">
                  Confidence Scoring
                </h3>
                <p className="text-sm text-slate-300">
                  AI provides confidence levels for each recommendation based on data quality and analysis depth
                </p>
              </div>
            </AIGlassCard>
            
            <AIGlassCard>
              <div className="text-center">
                <Zap className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                <h3 className="font-semibold mb-2 text-xl text-white">
                  Actionable Insights
                </h3>
                <p className="text-sm text-slate-300">
                  Get specific, executable recommendations with timelines and success metrics
                </p>
              </div>
            </AIGlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StrategicIntelligencePage;