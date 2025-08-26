# PM33 App Theme Guide - Premium PMO Intelligence Platform

**Location**: `/app/frontend/APP_THEME_GUIDE.md`

**Purpose**: Complete guide for implementing PM33's premium glass morphism theme system using shadcn/ui (Radix UI primitives)

**Target Audience**: Developers working on post-login dashboard, strategic intelligence, and PMO transformation features

**Core Technology Stack**:
- **Primary UI Library**: shadcn/ui (based on Radix UI primitives)
- **Styling**: Tailwind CSS with CSS custom properties
- **Icons**: lucide-react
- **Animations**: framer-motion
- **Utilities**: class-variance-authority, clsx, tailwind-merge

## 🎯 **PM33 App Theme Philosophy**

The PM33 app uses a **premium glass morphism design system** that reflects the **strategic intelligence** and **professional PMO capabilities** of the platform. Every interface element should make users feel they're using a **$500/month strategic tool**.

## 🌟 **Three Theme Options**

### **1. Light Theme (Professional Default)**
- **Use Case**: Daytime work, presentations, collaborative sessions
- **Colors**: Clean whites with strategic blue accents
- **Feel**: Professional, trustworthy, enterprise-grade

### **2. Dark Theme (Strategic Intelligence)**
- **Use Case**: Deep work, late-night analysis, focus sessions
- **Colors**: Deep backgrounds with bright text and AI glows
- **Feel**: Sophisticated, focused, intelligence-focused

### **3. Native Theme (Premium Experience)**
- **Use Case**: Premium users, demos, executive presentations
- **Colors**: Gradient backgrounds with glass morphism cards
- **Feel**: Cutting-edge, premium, visually stunning

## 🎨 **PM33 Premium Color System**

### **Core Brand Gradients**
```css
/* Primary Brand Identity */
--pm33-brand: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--pm33-brand-hover: linear-gradient(135deg, #764ba2 0%, #f093fb 100%);
--pm33-brand-active: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

/* AI Intelligence Colors */
--pm33-ai-glow: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
--pm33-ai-processing: linear-gradient(135deg, #667eea 0%, #00d2ff 100%);

/* Strategic Status Colors */
--pm33-success: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
--pm33-warning: linear-gradient(135deg, #f2994a 0%, #f2c94c 100%);
--pm33-danger: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
```

### **Glass Morphism System**
```css
/* Glass Card Foundation */
--pm33-glass: rgba(255, 255, 255, 0.1);
--pm33-glass-border: rgba(255, 255, 255, 0.18);
--pm33-glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
```

## 🏗️ **Theme Implementation**

### **1. ThemeProvider Setup - REQUIRED**
```tsx
// app/layout.tsx - Root level theme provider
import { PM33ThemeProvider } from './providers/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PM33ThemeProvider defaultTheme="dark">
          {children}
        </PM33ThemeProvider>
      </body>
    </html>
  );
}
```

### **2. Theme Context Usage with shadcn/ui Components**
```tsx
import { useTheme, useThemedStyles } from '@/providers/ThemeProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const StrategicDashboard = () => {
  const { currentTheme, setTheme, toggleTheme } = useTheme();
  const { getColors, getSurfaceStyles } = useThemedStyles();
  
  return (
    <motion.div 
      className="pm33-glass-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <CardHeader>
        <CardTitle className="pm33-text-gradient">
          Strategic Intelligence Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="pm33-btn-primary">
          <Brain className="mr-2 h-4 w-4" />
          Analyze Strategy
        </Button>
      </CardContent>
    </motion.div>
  );
};
```

### **3. Theme Switcher Component**
```tsx
import { ThemeSwitcher } from '@/providers/ThemeProvider';

// Add to any app header/sidebar
<ThemeSwitcher className="fixed top-4 right-4 z-50" />
```

## 🎴 **PM33 Component Library**

### **Glass Morphism Cards - shadcn/ui + PM33 Integration**
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Strategic Intelligence Card with shadcn/ui
const StrategicCard = ({ title, children, className }) => (
  <motion.div
    className={cn("pm33-glass-card pm33-animate-float", className)}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <CardHeader>
      <CardTitle className="pm33-text-gradient">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </motion.div>
);

// Direct usage with PM33 styling
<Card className="pm33-glass-card">
  <CardContent>
    <div className="pm33-text-ai-gradient">
      AI Strategic Analysis
    </div>
  </CardContent>
</Card>
```

### **Premium Button System with shadcn/ui**
```tsx
import { Button } from '@/components/ui/button';
import { Brain, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

// Primary Strategic Action
<Button className={cn("pm33-btn-primary")} size="lg">
  <Brain className="mr-2 h-4 w-4" />
  Process Strategic Analysis
</Button>

// Glass Morphism Secondary
<Button variant="outline" className={cn("pm33-btn-glass")}>
  <ExternalLink className="mr-2 h-4 w-4" />
  Export to Linear
</Button>

// With animation wrapper
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  <Button className="pm33-btn-primary" size="lg">
    <Brain className="mr-2 h-4 w-4" />
    Generate PMO Strategy
  </Button>
</motion.div>
```

### **AI Processing Indicators - REQUIRED FOR AI FEATURES**
```tsx
// Never use basic spinners - always use PM33 AI processing
<div className="pm33-ai-processing">
  <span>Strategic Intelligence Team analyzing...</span>
</div>

// With dynamic status
const AIProcessingIndicator = ({ team, status }) => (
  <div className={`pm33-ai-processing ${team.toLowerCase()}`}>
    <div className="pm33-animate-glow" />
    {team} AI Team: {status}
  </div>
);

// Usage
<AIProcessingIndicator 
  team="Strategic Intelligence" 
  status="Running Porter's Five Forces analysis"
/>
```

## 🎯 **Strategic Dashboard Patterns**

### **Command Center Layout**
```tsx
const PMOCommandCenter = () => {
  const { getColors, getSurfaceStyles } = useThemedStyles();
  
  return (
    <div className="pm33-command-center">
      {/* Hero Status Card */}
      <div className="pm33-glass-card pm33-animate-glow">
        <h2 className="pm33-text-gradient">
          PMO Transformation Status
        </h2>
        <div className="grid grid-cols-3 gap-6">
          <MetricCard 
            value="847%" 
            label="Strategic Capability Increase"
            trend="up"
          />
          <MetricCard 
            value="23min" 
            label="Avg Strategic Analysis Time"
            trend="down"
          />
          <MetricCard 
            value="4.2M" 
            label="Data Points Processed"
            trend="up"
          />
        </div>
      </div>
      
      {/* AI Team Status Grid */}
      <div className="grid grid-cols-2 gap-6">
        <AITeamCard team="Strategic Intelligence" status="active" />
        <AITeamCard team="Workflow Execution" status="processing" />
        <AITeamCard team="Data Intelligence" status="learning" />
        <AITeamCard team="Communication" status="ready" />
      </div>
    </div>
  );
};
```

### **Strategic Intelligence Interface with shadcn/ui**
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const StrategicIntelligence = () => (
  <div className="pm33-strategic-interface space-y-6">
    {/* Query Input - Premium Style */}
    <Card className="pm33-glass-card">
      <CardHeader>
        <CardTitle className="pm33-text-ai-gradient">
          Strategic Question Input
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea 
          className="pm33-strategic-input min-h-[120px] resize-none"
          placeholder="Ask your strategic question... (e.g., Should we prioritize feature A or B for Series B funding?)"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: 'var(--pm33-text-primary)'
          }}
        />
        
        {/* Framework Selection */}
        <div className="flex flex-wrap gap-3 mt-4">
          {['ICE', 'RICE', "Porter's Five Forces", 'Custom'].map(framework => (
            <motion.div
              key={framework}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge 
                variant="outline"
                className="pm33-btn-glass cursor-pointer hover:bg-opacity-20"
              >
                {framework}
              </Badge>
            </motion.div>
          ))}
        </div>
        
        <Button className="pm33-btn-primary mt-6 w-full" size="lg">
          <Brain className="mr-2 h-4 w-4" />
          Engage Strategic Intelligence AI Team
        </Button>
      </CardContent>
    </Card>
    
    {/* Results Display */}
    <div className="pm33-glass-card pm33-animate-fade-up">
      <AIProcessingIndicator 
        team="Strategic Intelligence"
        status="Analyzing competitive landscape..."
      />
      {/* Strategic analysis results */}
    </div>
  </div>
);
```

### **Workflow Generation Interface**
```tsx
const WorkflowGeneration = () => (
  <div className="pm33-workflow-interface">
    <div className="pm33-glass-card">
      <h3 className="pm33-text-gradient">
        PM Tool Integration
      </h3>
      
      {/* Tool Selection */}
      <div className="grid grid-cols-2 gap-4">
        {['Linear', 'Jira', 'Monday', 'Asana'].map(tool => (
          <div 
            key={tool}
            className="pm33-integration-card"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <h4>{tool}</h4>
            <span className="pm33-confidence-high">95% Confidence</span>
          </div>
        ))}
      </div>
      
      <button className="pm33-btn-primary mt-6">
        Generate Workflow with AI
      </button>
    </div>
  </div>
);
```

## 🎨 **Theme-Specific Styling**

### **Light Theme Patterns**
```tsx
// Light theme optimized components
const LightThemeCard = () => (
  <Card 
    style={{
      backgroundColor: 'var(--pm33-light-1)',
      border: '1px solid var(--pm33-border-subtle)',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
    }}
  >
    <Text c="var(--pm33-text-primary)">
      Light theme content
    </Text>
  </Card>
);
```

### **Dark Theme Patterns**
```tsx
// Dark theme with AI glow effects
const DarkThemeCard = () => (
  <div 
    className="pm33-glass-card pm33-animate-glow"
    style={{
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(0, 210, 255, 0.05) 100%)',
    }}
  >
    <h3 className="pm33-text-ai-gradient">
      AI Processing Active
    </h3>
  </div>
);
```

### **Native Theme Patterns**
```tsx
// Premium gradient experience
const NativeThemeCard = () => (
  <div style={{
    background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.95) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(124, 58, 237, 0.2)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(124, 58, 237, 0.1), 0 2px 8px rgba(236, 72, 153, 0.1)'
  }}>
    <h3 style={{ 
      background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent' 
    }}>
      Premium Experience
    </h3>
  </div>
);
```

## 🔧 **Advanced Theme Features**

### **Conditional Theme Rendering**
```tsx
import { useTheme } from '@/providers/ThemeProvider';

const ThemeAwareComponent = () => {
  const { currentTheme } = useTheme();
  
  if (currentTheme === 'native') {
    return <PremiumGradientVersion />;
  }
  
  if (currentTheme === 'dark') {
    return <AIGlowVersion />;
  }
  
  return <ProfessionalLightVersion />;
};
```

### **Dynamic Theme Variables**
```tsx
// Access theme colors dynamically
const DynamicButton = ({ variant = 'primary' }) => {
  const { getColors } = useThemedStyles();
  const colors = getColors();
  
  const buttonStyle = {
    backgroundColor: variant === 'primary' ? colors.primary : colors.secondary,
    color: colors.text,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    padding: '12px 24px'
  };
  
  return <button style={buttonStyle}>Dynamic Theme Button</button>;
};
```

### **Performance Optimized Theme Switching**
```tsx
// Efficient theme updates
const OptimizedThemeSwitch = () => {
  const { setTheme } = useTheme();
  
  const handleThemeChange = (newTheme) => {
    // Batch DOM updates for smooth transitions
    requestAnimationFrame(() => {
      setTheme(newTheme);
    });
  };
  
  return (
    <div className="theme-transition">
      {['light', 'dark', 'native'].map(theme => (
        <button 
          key={theme}
          onClick={() => handleThemeChange(theme)}
          className="pm33-btn-glass"
        >
          {theme}
        </button>
      ))}
    </div>
  );
};
```

## 🎪 **Animation & Micro-interactions**

### **Required PM33 Animations**
```tsx
// Fade up for new content
<div className="pm33-animate-fade-up">
  <StrategicAnalysisResult />
</div>

// Glow effect for AI processing
<div className="pm33-animate-glow">
  <AITeamStatus />
</div>

// Float effect for cards
<div className="pm33-animate-float">
  <StrategicMetricCard />
</div>

// Gradient shift for backgrounds
<div className="pm33-animate-gradient">
  <PremiumBackground />
</div>
```

### **Custom Animations for Strategic Elements**
```css
/* Strategic analysis reveal */
@keyframes strategic-reveal {
  0% { 
    opacity: 0; 
    transform: translateY(20px) scale(0.95); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}

.strategic-reveal {
  animation: strategic-reveal 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

## 📱 **Responsive Theme Behavior**

### **Mobile Theme Adaptations**
```tsx
const ResponsiveThemeComponent = () => {
  const { currentTheme, getColors } = useThemedStyles();
  
  return (
    <div 
      className="pm33-glass-card"
      style={{
        // Mobile: Reduce glass effects for performance
        padding: 'clamp(16px, 4vw, 24px)',
        backdropFilter: 'blur(clamp(10px, 2vw, 40px))'
      }}
    >
      <Title 
        order={2}
        size={{ base: 'xl', sm: '2xl', md: '3xl' }}
        className="pm33-text-gradient"
      >
        Responsive Strategic Interface
      </Title>
    </div>
  );
};
```

## ✅ **PM33 App Theme Checklist**

### **Before Implementing Any App Feature**
- [ ] ThemeProvider properly configured
- [ ] Using PM33 color system (`--pm33-*` variables)
- [ ] Glass morphism cards for main content
- [ ] AI processing indicators instead of basic spinners
- [ ] Proper animations for strategic elements
- [ ] Theme switching tested across all three themes
- [ ] Responsive behavior validated
- [ ] No marketing colors used (`--marketing-*`)

### **Strategic Intelligence Features**
- [ ] AI team status indicators visible
- [ ] Processing states use `pm33-ai-processing`
- [ ] Strategic frameworks clearly labeled
- [ ] Confidence scores displayed with proper colors
- [ ] Results use fade-up animations
- [ ] Export options styled with glass morphism

### **Performance Checklist**
- [ ] Theme switching is smooth (<300ms)
- [ ] No layout shift during theme changes
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Mobile theme performs well (no janky animations)
- [ ] LocalStorage persistence working

## 🚀 **Example App Pages**

### **Dashboard Page with shadcn/ui Architecture**
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Activity, Database, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  return (
    <div className="pm33-dashboard space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6"
      >
        <PMOStatusHeader />
        <StrategicMetricsGrid />
        <AITeamStatusCards />
        <RecentAnalysisSection />
        <QuickActionsPanel />
      </motion.div>
    </div>
  );
}

// Example AI Team Status Card with shadcn/ui
const AITeamCard = ({ team, status, icon: Icon }) => (
  <Card className="pm33-glass-card">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2 text-sm">
        <Icon className="h-4 w-4" />
        {team}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Badge className={`pm33-status-${status}`}>
        {status}
      </Badge>
    </CardContent>
  </Card>
);
```

### **Strategic Intelligence Page with shadcn/ui**
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

export default function StrategicIntelligence() {
  return (
    <div className="pm33-strategic-page p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <Tabs defaultValue="query" className="w-full">
          <TabsList className="pm33-glass-card p-1">
            <TabsTrigger value="query">Strategic Query</TabsTrigger>
            <TabsTrigger value="analysis">Analysis Results</TabsTrigger>
            <TabsTrigger value="workflows">Generated Workflows</TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <TabsContent value="query" className="space-y-4">
              <StrategicQueryInterface />
            </TabsContent>
            <TabsContent value="analysis" className="space-y-4">
              <AnalysisResultsDisplay />
            </TabsContent>
            <TabsContent value="workflows" className="space-y-4">
              <WorkflowGenerationSection />
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </div>
  );
}
```

---

**Remember**: Every PM33 app interface should make users feel like they're using a **premium PMO transformation platform** worth $500/month. The theme system is designed to convey strategic intelligence, professional capability, and cutting-edge AI technology.