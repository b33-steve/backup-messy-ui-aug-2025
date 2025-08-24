# PM33 UI System Migration Plan

**File:** `app/frontend/MIGRATION_PLAN.md`  
**Purpose:** Comprehensive migration strategy to unify PM33 core app under shadcn/ui + PM33 glass morphism design system  
**Target:** Complete consistency across all core app pages and components  
**Timeline:** 2-3 development sessions  

---

## 🎯 **Migration Objectives**

### **Primary Goals**
1. **Remove all Mantine UI dependencies** from core app components
2. **Standardize on shadcn/ui + PM33 glass morphism** as the single design system
3. **Create missing PM33 wrapper components** as documented
4. **Achieve visual consistency** across all core app pages
5. **Maintain premium UX standards** throughout migration

### **Success Metrics**
- ✅ Zero Mantine UI imports in `/app/(app)/` directory
- ✅ All components use shadcn/ui base + PM33 enhancements
- ✅ Consistent glass morphism implementation
- ✅ All pages use PM33 wrapper components
- ✅ Visual consistency across dashboard, strategic-intelligence, and all core pages

---

## 📋 **Phase 1: Foundation Setup**

### **1.1 Create Missing PM33 Core Components**

#### **PM33PageWrapper Component**
```typescript
// Import from actual PM33PageWrapper.tsx location
import { PM33PageWrapper } from '@/components/PM33PageWrapper';
  const backgroundStyles = {
    default: 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900',
    strategic: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900',
    minimal: 'bg-background'
  };

  return (
    <div className={cn(
      'min-h-screen relative overflow-hidden',
      backgroundStyles[backgroundVariant],
      className
    )}>
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
```

#### **PM33Navigation Component**
```typescript
// components/PM33Navigation.tsx - PRIORITY 1
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Brain, 
  CheckCircle, 
  TrendingUp, 
  Settings,
  Menu,
  X 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Activity },
  { name: 'Strategic Intelligence', href: '/strategic-intelligence', icon: Brain },
  { name: 'Tasks', href: '/tasks', icon: CheckCircle },
  { name: 'Data', href: '/data', icon: TrendingUp },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const PM33Navigation = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PM33
            </span>
            <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              Beta
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "flex items-center gap-2 transition-all",
                      isActive && "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-6 py-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start gap-2"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};
```

#### **PM33Button Component**
```typescript
// components/PM33Button.tsx - PRIORITY 1
'use client';

import { forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface PM33ButtonProps extends ButtonProps {
  variant?: 'default' | 'gradient' | 'glass' | 'ai' | 'destructive' | 'outline' | 'ghost';
  glowEffect?: boolean;
  loading?: boolean;
}

export const PM33Button = forwardRef<HTMLButtonElement, PM33ButtonProps>(
  ({ className, variant = 'default', glowEffect = false, loading = false, children, disabled, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl',
      glass: 'bg-white/10 backdrop-blur-sm border-white/20 text-foreground hover:bg-white/20',
      ai: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/25',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground'
    };

    const glowStyles = glowEffect ? 'animate-pulse shadow-lg shadow-blue-500/25' : '';

    return (
      <Button
        ref={ref}
        className={cn(
          'transition-all duration-200',
          variantStyles[variant],
          glowStyles,
          loading && 'opacity-70 cursor-not-allowed',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Button>
    );
  }
);

PM33Button.displayName = "PM33Button";
```

#### **PM33GlassCard Component**
```typescript
// components/PM33GlassCard.tsx - PRIORITY 1
'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PM33GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  headerContent?: React.ReactNode;
  variant?: 'default' | 'premium' | 'ai' | 'minimal';
  glowEffect?: boolean;
  hoverEffect?: boolean;
}

export const PM33GlassCard = forwardRef<HTMLDivElement, PM33GlassCardProps>(
  ({ 
    className, 
    title, 
    description, 
    headerContent,
    variant = 'default',
    glowEffect = false,
    hoverEffect = true,
    children, 
    ...props 
  }, ref) => {
    const variantStyles = {
      default: 'bg-card/50 border-border/50',
      premium: 'bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/20',
      ai: 'bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border-cyan-500/20',
      minimal: 'bg-background/80 border-border/30'
    };

    const effectStyles = cn(
      'backdrop-blur-xl',
      hoverEffect && 'hover:scale-[1.02] hover:-translate-y-1',
      glowEffect && 'shadow-xl shadow-blue-500/10',
      'transition-all duration-300'
    );

    return (
      <Card
        ref={ref}
        className={cn(
          variantStyles[variant],
          effectStyles,
          className
        )}
        {...props}
      >
        {(title || description || headerContent) && (
          <CardHeader>
            {title && (
              <CardTitle className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {title}
              </CardTitle>
            )}
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
            {headerContent}
          </CardHeader>
        )}
        <CardContent className={cn(title || description || headerContent ? '' : 'pt-6')}>
          {children}
        </CardContent>
      </Card>
    );
  }
);

PM33GlassCard.displayName = "PM33GlassCard";
```

### **1.2 Update Global CSS**
```css
/* app/globals.css - ADD THESE PM33 UTILITIES */

/* PM33 Glass Morphism Utilities */
.pm33-glass {
  @apply bg-white/10 backdrop-blur-xl border border-white/20;
}

.pm33-glass-card {
  @apply bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-xl shadow-xl;
}

.pm33-text-gradient {
  @apply bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent;
}

.pm33-text-ai-gradient {
  @apply bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent;
}

/* PM33 Animations */
.pm33-animate-float {
  animation: pm33-float 3s ease-in-out infinite;
}

.pm33-animate-glow {
  animation: pm33-glow 2s ease-in-out infinite;
}

.pm33-animate-fade-up {
  animation: pm33-fade-up 0.6s ease-out forwards;
}

@keyframes pm33-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes pm33-glow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3),
                0 0 40px rgba(59, 130, 246, 0.1);
  }
  50% { 
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.5),
                0 0 60px rgba(59, 130, 246, 0.2);
  }
}

@keyframes pm33-fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 🔧 **Phase 2: StrategicIntelligenceEngine Migration**

### **2.1 Current State Analysis**
```typescript
// Current problematic imports in StrategicIntelligenceEngine.tsx
import { 
  Container,     // ❌ Mantine - Replace with div + max-width
  Grid,          // ❌ Mantine - Replace with CSS Grid
  Card,          // ❌ Mantine - Replace with PM33GlassCard
  Badge,         // ❌ Mantine - Replace with shadcn/ui Badge
  Title,         // ❌ Mantine - Replace with heading elements
  Text,          // ❌ Mantine - Replace with p elements
  Progress,      // ❌ Mantine - Replace with shadcn/ui Progress
  Group,         // ❌ Mantine - Replace with flexbox
  Stack,         // ❌ Mantine - Replace with flexbox
  Button,        // ❌ Mantine - Replace with PM33Button
  Alert,         // ❌ Mantine - Replace with shadcn/ui Alert
  ActionIcon,    // ❌ Mantine - Replace with PM33Button + icon
  Box,           // ❌ Mantine - Replace with div
  Select,        // ❌ Mantine - Replace with shadcn/ui Select
  Tabs           // ❌ Mantine - Replace with shadcn/ui Tabs
} from '@mantine/core';

// Wrong icon library
import { IconBrain, IconTarget } from '@tabler/icons-react'; // ❌ Should be lucide-react
```

### **2.2 Migration Mapping**
```typescript
// BEFORE (Mantine) → AFTER (shadcn/ui + PM33)

// Container
<Container size={1200} px={24} py={48}>
  ↓
<div className="max-w-6xl mx-auto px-6 py-12">

// Grid
<Grid gutter={32}>
  <Grid.Col span={{ base: 12, md: 4 }}>
  ↓
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div>

// Mantine Card
<Card shadow="md" padding={24} radius={16}>
  ↓
<PM33GlassCard variant="premium">

// Mantine Button
<Button leftSection={<IconBrain />} color="blue">
  ↓
<PM33Button variant="gradient" className="gap-2">
  <Brain className="w-4 h-4" />

// Mantine Title
<Title order={1} size="h1">
  ↓
<h1 className="text-3xl font-bold pm33-text-gradient">

// Mantine Text
<Text size="lg" c="dimmed">
  ↓
<p className="text-lg text-muted-foreground">

// Mantine Badge
<Badge color="blue" variant="light">
  ↓
<Badge variant="secondary" className="bg-blue-100 text-blue-700">

// Mantine Progress
<Progress value={progress} color="blue" />
  ↓
<Progress value={progress} className="bg-blue-100" />

// Mantine Alert
<Alert color="green" title="Success">
  ↓
<Alert className="border-green-200 bg-green-50 text-green-900">
  <CheckCircle className="h-4 w-4" />

// Mantine ActionIcon
<ActionIcon variant="subtle" size="lg">
  ↓
<PM33Button variant="ghost" size="sm">
  <Home className="w-4 h-4" />

// Icons
import { IconBrain } from '@tabler/icons-react';
  ↓
import { Brain } from 'lucide-react';
```

### **2.3 Complete Migration File**
```typescript
// components/shared/StrategicIntelligenceEngine.tsx - MIGRATED VERSION
'use client';

import React, { useState, useEffect } from 'react';
import { PM33PageWrapper } from '../PM33PageWrapper';
import { PM33Navigation } from '../PM33Navigation';
import { PM33GlassCard } from '../PM33GlassCard';
import { PM33Button } from '../PM33Button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Lightbulb,
  CheckSquare,
  Clock,
  ArrowLeft,
  Home,
  RefreshCw,
  ExternalLink,
  Check,
  GitBranch,
  Database
} from 'lucide-react';
import Link from 'next/link';

// Keep existing interfaces (they're fine)
interface PMToolConnection { /* ... existing ... */ }
interface StrategicSyncStep { /* ... existing ... */ }
interface StrategicSyncResult { /* ... existing ... */ }

const StrategicIntelligenceEngine: React.FC = () => {
  // Keep existing state logic
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  // ... existing state ...

  return (
    <PM33PageWrapper backgroundVariant="strategic">
      <PM33Navigation />
      
      <div className="pt-20"> {/* Account for fixed navigation */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/dashboard">
                <PM33Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </PM33Button>
              </Link>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Live Demo
              </Badge>
            </div>
            
            <h1 className="text-4xl font-bold pm33-text-gradient mb-4">
              Strategic Intelligence Platform
            </h1>
            <p className="text-xl text-muted-foreground">
              Tactical data + Strategic data → AI optimization → Detailed execution instructions
            </p>
          </div>

          {!activeWorkflow ? (
            /* Strategic Query Input */
            <PM33GlassCard 
              title="🎯 Strategic Intelligence Input"
              description="Transform tactical and strategic data into AI-optimized execution plans"
              variant="premium"
              className="mb-8"
            >
              <div className="space-y-6">
                <textarea
                  value={strategicQuery}
                  onChange={(e) => setStrategicQuery(e.target.value)}
                  placeholder="Enter your strategic challenge or decision..."
                  rows={4}
                  className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-foreground resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex items-center justify-between">
                  <PM33Button 
                    variant="gradient"
                    onClick={() => startStrategicSync(strategicQuery, selectedTool)}
                    disabled={!strategicQuery.trim()}
                    className="gap-2"
                  >
                    <Brain className="w-4 h-4" />
                    Generate Strategic Intelligence
                  </PM33Button>
                  
                  <span className="text-sm text-muted-foreground">
                    ⚡ AI-optimized tactical → strategic → execution workflow
                  </span>
                </div>

                {/* Predefined Questions */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">💡 Strategic automation scenarios:</h3>
                  <div className="grid gap-3">
                    {predefinedQueries.map((query, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto p-4 text-left justify-start whitespace-normal"
                        onClick={() => setStrategicQuery(query)}
                      >
                        {query}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </PM33GlassCard>
          ) : (
            /* Active Analysis Workflow */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Progress Sidebar */}
              <div className="lg:col-span-1">
                <PM33GlassCard 
                  title="🧠 Analysis Progress"
                  variant="ai"
                  className="sticky top-24"
                >
                  <div className="space-y-4">
                    {syncSteps.map((step, index) => (
                      <div 
                        key={step.id} 
                        className="p-4 rounded-lg bg-white/5 border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge 
                            variant={
                              step.status === 'completed' ? 'default' :
                              step.status === 'processing' ? 'secondary' : 'outline'
                            }
                            className={step.status === 'processing' ? 'animate-pulse' : ''}
                          >
                            {step.status === 'completed' ? '✓' : 
                             step.status === 'processing' ? '⏳' : '⏸'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {step.timeEstimate}
                          </span>
                        </div>
                        
                        <h4 className="font-medium text-sm mb-1">{step.name}</h4>
                        
                        {step.status === 'processing' && (
                          <div className="space-y-2">
                            <Progress value={step.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              {Math.round(step.progress)}% complete
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {syncResult && (
                    <Alert className="mt-6 border-green-200 bg-green-50/50">
                      <Check className="h-4 w-4" />
                      <AlertDescription>
                        Analysis completed with {syncResult.confidenceScore}% confidence
                        <div className="flex gap-2 mt-3">
                          <Link href="/command-center">
                            <PM33Button variant="outline" size="sm">
                              <Target className="w-4 h-4 mr-2" />
                              Command Center
                            </PM33Button>
                          </Link>
                          <PM33Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setActiveWorkflow(null);
                              setSyncResult(null);
                              setStrategicQuery('');
                            }}
                          >
                            Try Another
                          </PM33Button>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                </PM33GlassCard>
              </div>

              {/* Results Area */}
              <div className="lg:col-span-2">
                <PM33GlassCard 
                  title={`📋 Strategic Analysis: ${strategicQuery}`}
                  variant="premium"
                >
                  {syncResult ? (
                    <Tabs defaultValue="overview" className="space-y-6">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                        <TabsTrigger value="metrics">Metrics</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">📊 Situation Assessment</h4>
                            <p className="text-muted-foreground">{syncResult.situationAssessment}</p>
                          </div>
                          
                          <div className="flex gap-3">
                            <Badge className="bg-blue-100 text-blue-900">
                              Confidence: {syncResult.confidenceScore}%
                            </Badge>
                            <Badge className="bg-green-100 text-green-900">
                              {syncResult.toolUpdates.length} Tool Updates
                            </Badge>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="recommendations" className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">💡 Strategic Recommendation</h4>
                            <p className="text-muted-foreground">{syncResult.strategicRecommendation}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">🎯 Next Actions</h4>
                            <div className="space-y-2">
                              {syncResult.nextActions.map((action, index) => (
                                <Alert key={index} className="border-blue-200 bg-blue-50/50">
                                  <AlertDescription>{action}</AlertDescription>
                                </Alert>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="metrics" className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3">🎯 Success Metrics</h4>
                          <div className="grid gap-3">
                            {syncResult.successMetrics.map((metric, index) => (
                              <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-sm">{metric}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">Strategic analysis in progress...</p>
                      {/* Show completed step outputs */}
                      {syncSteps.map((step) => 
                        step.status === 'completed' && step.output ? (
                          <PM33GlassCard 
                            key={step.id}
                            title={`✓ ${step.name}`}
                            variant="minimal"
                          >
                            <pre className="text-xs text-muted-foreground overflow-auto">
                              {JSON.stringify(step.output, null, 2)}
                            </pre>
                          </PM33GlassCard>
                        ) : null
                      )}
                    </div>
                  )}
                </PM33GlassCard>
              </div>
            </div>
          )}
        </div>
      </div>
    </PM33PageWrapper>
  );
};

export default StrategicIntelligenceEngine;
```

---

## 🏗️ **Phase 3: Core App Pages Standardization**

### **3.1 Dashboard Page Migration**
```typescript
// app/(app)/dashboard/page.tsx - STANDARDIZED VERSION
'use client';

import { useState, useEffect } from 'react';
import { PM33PageWrapper } from '@/components/PM33PageWrapper';
import { PM33Navigation } from '@/components/PM33Navigation';
import { PM33GlassCard } from '@/components/PM33GlassCard';
import { PM33Button } from '@/components/PM33Button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Brain, 
  TrendingUp, 
  Target,
  Users,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <PM33PageWrapper>
      <PM33Navigation />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold pm33-text-gradient mb-2">
              Strategic Command Center
            </h1>
            <p className="text-xl text-muted-foreground">
              PMO-level insights and AI-powered strategic intelligence
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <PM33GlassCard variant="ai" glowEffect>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Strategic Health</p>
                  <p className="text-3xl font-bold pm33-text-ai-gradient">94%</p>
                </div>
                <Brain className="w-8 h-8 text-blue-500" />
              </div>
              <Progress value={94} className="mt-3" />
            </PM33GlassCard>

            <PM33GlassCard variant="premium">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <Target className="w-8 h-8 text-purple-500" />
              </div>
            </PM33GlassCard>

            <PM33GlassCard variant="default">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Team Velocity</p>
                  <p className="text-3xl font-bold text-green-600">+23%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </PM33GlassCard>

            <PM33GlassCard variant="minimal">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Time Saved</p>
                  <p className="text-3xl font-bold">18h</p>
                  <p className="text-xs text-muted-foreground">this week</p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </PM33GlassCard>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Teams Status */}
            <PM33GlassCard title="🤖 AI Teams Status" variant="premium">
              <div className="space-y-4">
                {[
                  { name: 'Strategic Intelligence', status: 'Active', progress: 100, color: 'blue' },
                  { name: 'Workflow Execution', status: 'Processing', progress: 67, color: 'purple' },
                  { name: 'Data Intelligence', status: 'Learning', progress: 45, color: 'green' },
                  { name: 'Communication', status: 'Ready', progress: 100, color: 'orange' }
                ].map((team) => (
                  <div key={team.name} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-${team.color}-500 animate-pulse`} />
                      <div>
                        <p className="font-medium">{team.name}</p>
                        <Badge variant="secondary" className="text-xs">
                          {team.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{team.progress}%</p>
                      <Progress value={team.progress} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </PM33GlassCard>

            {/* Recent Strategic Analyses */}
            <PM33GlassCard title="📊 Recent Strategic Analyses" variant="ai">
              <div className="space-y-3">
                {[
                  { title: 'Competitive Response Strategy', framework: 'Porter\'s Five Forces', confidence: 94, time: '2h ago' },
                  { title: 'Resource Allocation Optimization', framework: 'RICE Framework', confidence: 89, time: '4h ago' },
                  { title: 'Feature Prioritization Analysis', framework: 'ICE Score', confidence: 92, time: '1d ago' }
                ].map((analysis, index) => (
                  <div key={index} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{analysis.title}</p>
                        <p className="text-xs text-muted-foreground">{analysis.framework}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${analysis.confidence >= 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} text-xs`}>
                          {analysis.confidence}%
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{analysis.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </PM33GlassCard>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <PM33GlassCard title="⚡ Quick Actions" variant="default">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <PM33Button variant="gradient" className="h-12 gap-2">
                  <Brain className="w-4 h-4" />
                  New Analysis
                </PM33Button>
                
                <PM33Button variant="glass" className="h-12 gap-2">
                  <Target className="w-4 h-4" />
                  Create OKR
                </PM33Button>
                
                <PM33Button variant="outline" className="h-12 gap-2">
                  <Users className="w-4 h-4" />
                  Team Sync
                </PM33Button>
                
                <PM33Button variant="ghost" className="h-12 gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Review Tasks
                </PM33Button>
              </div>
            </PM33GlassCard>
          </div>
        </div>
      </div>
    </PM33PageWrapper>
  );
}
```

### **3.2 Strategic Intelligence Page Migration**
```typescript
// app/(app)/strategic-intelligence/page.tsx - STANDARDIZED VERSION
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PM33PageWrapper } from '@/components/PM33PageWrapper';
import { PM33Navigation } from '@/components/PM33Navigation';
import { PM33GlassCard } from '@/components/PM33GlassCard';
import { PM33Button } from '@/components/PM33Button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, TrendingUp, Target, BarChart3 } from 'lucide-react';

// Keep existing interfaces and logic...
interface Message { /* ... existing ... */ }
interface CompanyContext { /* ... existing ... */ }

export default function StrategicIntelligencePage() {
  // Keep existing state and logic...
  const [messages, setMessages] = useState<Message[]>([/* ... */]);
  // ... rest of existing state ...

  return (
    <PM33PageWrapper backgroundVariant="strategic">
      <PM33Navigation />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Chat Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold pm33-text-gradient">
                    Strategic Intelligence
                  </h1>
                </div>
                <p className="text-muted-foreground">
                  AI-powered strategic analysis using proven PM frameworks
                </p>
              </motion.div>

              {/* Chat Messages */}
              <PM33GlassCard variant="premium" className="h-[500px] flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
                          <div className={`rounded-xl p-4 ${
                            message.role === 'user' 
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                              : 'bg-white/10 backdrop-blur-sm border border-white/20'
                          }`}>
                            <div className="prose prose-sm max-w-none">
                              <div style={{ whiteSpace: 'pre-wrap' }}>
                                {message.content}
                              </div>
                            </div>
                            
                            {/* Framework Used */}
                            {message.framework && (
                              <div className="mt-3 pt-3 border-t border-gray-200/20">
                                <span className="text-xs opacity-70">
                                  Framework: {message.framework}
                                </span>
                                {message.confidence && (
                                  <span className="ml-3 text-xs text-green-400 font-semibold">
                                    {message.confidence}% confidence
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Generated Tasks */}
                            {message.tasks && message.tasks.length > 0 && (
                              <div className="mt-4 space-y-2">
                                <p className="text-sm font-semibold">
                                  Recommended Actions:
                                </p>
                                {message.tasks.map((task, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <span className="text-green-400 mt-0.5">✓</span>
                                    <span className="text-sm">{task}</span>
                                  </div>
                                ))}
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <PM33Button variant="ghost" size="sm" className="mt-2">
                                    <Target className="w-3 h-3 mr-1" />
                                    Create tasks in project management
                                  </PM33Button>
                                </motion.div>
                              </div>
                            )}

                            {/* Metrics */}
                            {message.metrics && (
                              <div className="mt-4 grid grid-cols-3 gap-3">
                                {Object.entries(message.metrics).map(([key, value]) => (
                                  <div key={key} className="text-center p-2 bg-white/5 rounded-lg">
                                    <div className="text-lg font-bold">{value}</div>
                                    <div className="text-xs opacity-70">{key}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="text-xs opacity-60 mt-1 px-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Analyzing Indicator */}
                  {isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                          <span className="text-sm">
                            Analyzing with {selectedFramework || 'best'} framework...
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-white/20 bg-white/5 backdrop-blur-sm p-4">
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Framework Selector */}
                    <div className="flex gap-2 flex-wrap items-center">
                      <span className="text-sm opacity-70">Framework:</span>
                      {frameworks.map((fw) => (
                        <motion.div key={fw.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            type="button"
                            variant={selectedFramework === fw.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedFramework(fw.id)}
                            className={selectedFramework === fw.id ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                          >
                            {fw.name}
                          </Button>
                        </motion.div>
                      ))}
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          type="button"
                          variant={!selectedFramework ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedFramework(null)}
                          className={!selectedFramework ? 'bg-gradient-to-r from-green-600 to-green-700' : ''}
                        >
                          Auto-select
                        </Button>
                      </motion.div>
                    </div>

                    {/* Input Field */}
                    <div className="flex gap-3">
                      <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a strategic question..."
                        className="flex-1 bg-white/10 border-white/20 focus:border-blue-500 resize-none"
                        disabled={isAnalyzing}
                        rows={2}
                      />
                      <PM33Button
                        type="submit"
                        disabled={!input.trim() || isAnalyzing}
                        variant="gradient"
                        loading={isAnalyzing}
                      >
                        {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                      </PM33Button>
                    </div>
                  </form>
                </div>
              </PM33GlassCard>

              {/* Suggested Questions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                {suggestedQuestions.map((category) => (
                  <PM33GlassCard key={category.category} variant="minimal">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="font-semibold">{category.category}</h3>
                    </div>
                    <div className="space-y-2">
                      {category.questions.map((question, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="ghost"
                            className="w-full text-left justify-start h-auto p-3 whitespace-normal"
                            onClick={() => handleQuestionClick(question)}
                          >
                            {question}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </PM33GlassCard>
                ))}
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Company Context */}
              <PM33GlassCard title="Company Context" variant="ai">
                {companyContext ? (
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Industry:</span>
                      <span className="ml-2 font-medium">{companyContext.industry}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Stage:</span>
                      <span className="ml-2 font-medium">{companyContext.stage}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Team Size:</span>
                      <span className="ml-2 font-medium">{companyContext.teamSize}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Runway:</span>
                      <span className="ml-2 font-medium">{companyContext.runway}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Key Constraint:</span>
                      <span className="ml-2 font-medium text-orange-500">
                        {companyContext.constraint}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <PM33Button variant="outline" size="sm">
                      Complete company profile →
                    </PM33Button>
                  </div>
                )}
              </PM33GlassCard>

              {/* Intelligence Metrics */}
              <PM33GlassCard title="Intelligence Metrics" variant="premium">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Analysis Accuracy</span>
                      <span className="font-medium">94%</span>
                    </div>
                    <motion.div
                      className="w-full bg-gray-200 rounded-full h-2"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                    >
                      <motion.div
                        className="bg-green-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '94%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </motion.div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Time Saved</span>
                      <span className="font-medium">12.5 hrs/week</span>
                    </div>
                    <motion.div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </motion.div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Decisions Made</span>
                      <span className="font-medium">47 this month</span>
                    </div>
                    <motion.div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1, delay: 0.9 }}
                      />
                    </motion.div>
                  </div>
                </div>
              </PM33GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </PM33PageWrapper>
  );
}
```

---

## 🔄 **Phase 4: Implementation Roadmap**

### **4.1 Migration Order (2-3 Sessions)**

#### **Session 1: Foundation (Day 1)**
1. ✅ Create all PM33 wrapper components (`PM33PageWrapper`, `PM33Navigation`, `PM33Button`, `PM33GlassCard`)
2. ✅ Update `globals.css` with PM33 utilities
3. ✅ Test components individually in Storybook/isolated environment

#### **Session 2: Core Migration (Day 2)**
1. ✅ Migrate `StrategicIntelligenceEngine.tsx` from Mantine to shadcn/ui + PM33
2. ✅ Update `dashboard/page.tsx` to use PM33 components
3. ✅ Update `strategic-intelligence/page.tsx` to use PM33 components
4. ✅ Test all pages for visual consistency

#### **Session 3: Polish & Consistency (Day 3)**
1. ✅ Update all remaining core app pages (`/tasks`, `/data`, `/settings`, etc.)
2. ✅ Remove all Mantine dependencies from `package.json`
3. ✅ Run visual regression tests
4. ✅ Update layout files to use PM33Navigation consistently

### **4.2 Testing Strategy**
```bash
# Before migration
npm run test:visual:before
npm run test:performance:before

# During migration (after each component)
npm run test:component:PM33PageWrapper
npm run test:component:PM33Navigation
npm run test:component:PM33GlassCard

# After migration
npm run test:visual:after
npm run test:performance:after
npm run test:cross-browser
```

### **4.3 Rollback Plan**
```typescript
// Keep backup branches for each major change
git checkout -b backup-before-mantine-removal
git checkout -b backup-strategic-intelligence-migration
git checkout -b backup-dashboard-migration

// Emergency rollback commands
git checkout backup-before-mantine-removal
npm install # Restore Mantine dependencies
npm run dev # Verify functionality
```

---

## ✅ **Phase 5: Validation & Quality Assurance**

### **5.1 Visual Consistency Checklist**
- [ ] All pages use `PM33PageWrapper` as root component
- [ ] All pages use `PM33Navigation` for consistent header
- [ ] All cards use `PM33GlassCard` with appropriate variants
- [ ] All buttons use `PM33Button` with proper variants
- [ ] All text follows PM33 typography classes (`pm33-text-gradient`, etc.)
- [ ] All animations use PM33 animation classes
- [ ] No Mantine UI components remain in core app directory
- [ ] All icons use `lucide-react` (not `@tabler/icons-react`)

### **5.2 Performance Validation**
```bash
# Bundle size comparison
npm run analyze:before
npm run analyze:after

# Expected results:
# - 40% reduction in bundle size (removing Mantine)
# - Faster page load times
# - Consistent animation performance
# - No layout shift during theme changes
```

### **5.3 Cross-Browser Testing**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## 🎯 **Success Criteria**

### **Technical Success**
1. **Zero Mantine imports** in `/app/(app)/` directory
2. **100% shadcn/ui + PM33** component usage
3. **Consistent glass morphism** across all pages
4. **40%+ bundle size reduction**
5. **Sub-300ms page transitions**

### **Visual Success**
1. **Consistent branding** across all core app pages
2. **Premium feel** maintained throughout migration
3. **Smooth animations** and micro-interactions
4. **Perfect responsive behavior** on all screen sizes
5. **Accessible color contrasts** and focus states

### **User Experience Success**
1. **No functionality regression** during migration
2. **Improved page load speeds**
3. **Consistent navigation experience**
4. **Enhanced visual hierarchy**
5. **Professional, premium appearance**

---

## 📚 **Post-Migration Documentation**

### **6.1 Component Library Documentation**
```markdown
# PM33 Component Library

## Core Components
- `PM33PageWrapper` - Root page wrapper with background variants
- `PM33Navigation` - Consistent app navigation
- `PM33GlassCard` - Premium glass morphism cards
- `PM33Button` - Enhanced buttons with gradients and animations

## Usage Examples
[Include comprehensive examples for each component]

## Design Tokens
[Document all CSS custom properties and utility classes]
```

### **6.2 Developer Guidelines**
```markdown
# PM33 Core App Development Guidelines

## Architecture Rules
1. Always use PM33 wrapper components
2. Never import Mantine components in core app
3. Use lucide-react for all icons
4. Follow PM33 animation standards

## Code Patterns
[Include common patterns and anti-patterns]
```

---

## ⚠️ **Migration Risks & Mitigation**

### **Risk 1: Functionality Regression**
**Mitigation**: Comprehensive testing after each component migration, maintain backup branches

### **Risk 2: Visual Inconsistencies**
**Mitigation**: Use design tokens, maintain PM33 design system standards, visual regression testing

### **Risk 3: Performance Issues**
**Mitigation**: Bundle analysis at each step, performance monitoring, progressive enhancement

### **Risk 4: User Experience Disruption**
**Mitigation**: Feature flags for gradual rollout, user feedback collection, quick rollback plan

---

This migration plan ensures a systematic, low-risk transition to a unified shadcn/ui + PM33 design system while maintaining the premium user experience and strategic intelligence focus of the platform.