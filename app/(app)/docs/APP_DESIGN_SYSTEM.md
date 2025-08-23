# PM33 Core App Design System

**File:** `app/frontend/APP_DESIGN_SYSTEM.md`  
**Purpose:** Core app design standards using shadcn/ui + PM33 components  
**Context:** Premium strategic intelligence platform with glass morphism and AI-powered UX  
**RELEVANT FILES:** `app/(app)/layout.tsx`, `components/PM33*.tsx`, `components/ui/`, `app/globals.css`

## 🎯 **Core App Design Philosophy**

**Core Principle:** Premium strategic intelligence platform that visually communicates AI-powered PMO transformation.

**User Experience:** Every interface element should make users feel they have PMO-level strategic capabilities at their fingertips.

## 🎨 **PM33 Color System**

### **Primary Design Tokens**
```css
/* PM33 Brand Gradients */
--pm33-brand: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--pm33-brand-hover: linear-gradient(135deg, #764ba2 0%, #f093fb 100%);
--pm33-ai-glow: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
--pm33-ai-processing: linear-gradient(135deg, #667eea 0%, #00d2ff 100%);

/* Glass Morphism System */
--pm33-glass: rgba(255, 255, 255, 0.1);
--pm33-glass-border: rgba(255, 255, 255, 0.18);
--pm33-glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);

/* Strategic Intelligence Colors */
--pm33-success: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
--pm33-warning: linear-gradient(135deg, #f2994a 0%, #f2c94c 100%);
--pm33-danger: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
```

## 🪟 **Glass Morphism Architecture**

### **PM33 Glass Cards - Signature Style**
```tsx
import { PM33Card } from '@/components/PM33Card';

// Premium glass morphism card
<PM33Card className="pm33-animate-float">
  <CardHeader>
    <CardTitle className="pm33-text-gradient">
      Strategic Intelligence Analysis
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="pm33-ai-processing">
      Processing with Claude AI...
    </div>
  </CardContent>
</PM33Card>
```

### **Glass Morphism CSS Properties**
```css
.pm33-glass-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(40px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

## 🔧 **shadcn/ui + PM33 Integration**

### **Core Components**
```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PM33Card } from '@/components/PM33Card';
import { PM33Button } from '@/components/PM33Button';

// shadcn/ui Button with PM33 theming
<Button variant="default" className="pm33-btn-primary">
  <IconBrain className="mr-2 h-4 w-4" />
  Analyze with AI
</Button>

// PM33 Premium Button
<PM33Button variant="gradient" animation="glow">
  Strategic Processing
</PM33Button>
```

### **Component Configuration**
```json
// components.json - shadcn/ui config
{
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## 🎭 **Premium Animation System**

### **Required Animations**
```css
/* AI Intelligence Glow */
.pm33-animate-glow {
  animation: glow-pulse 2s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
}

/* Strategic Float Effect */
.pm33-animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Gradient Background Shift */
.pm33-animate-gradient {
  animation: gradient-shift 15s ease infinite;
  background-size: 400% 400%;
}

/* Fade Up for Lists */
.pm33-animate-fade-up {
  animation: fade-up 0.5s ease-out forwards;
}
```

### **Hover State Requirements**
```tsx
// Every interactive element MUST have premium hover states
<div 
  className="pm33-glass-card transition-all duration-300 hover:scale-102 hover:-translate-y-1"
  onMouseEnter={() => setHovered(true)}
>
  <Button className="hover:shadow-lg hover:shadow-blue-500/25">
    Strategic Action
  </Button>
</div>
```

## 🤖 **AI Intelligence Visual Language**

### **AI Processing States**
```tsx
import { AIProcessingState } from '@/components/PM33AIProcessing';

// Replace ALL basic spinners with AI processing
<AIProcessingState 
  state="analyzing"
  framework="ICE"
  confidence={0.95}
  message="Analyzing strategic opportunities..."
/>

// NEVER use basic spinners
// ❌ <Spinner />
// ✅ <AIProcessingState />
```

### **Intelligence Indicators**
```tsx
// Confidence scoring visual
<div className="flex items-center gap-2">
  <div className={`w-2 h-2 rounded-full ${
    confidence > 0.9 ? 'bg-green-500 pm33-animate-glow' :
    confidence > 0.7 ? 'bg-yellow-500' : 'bg-red-500'
  }`} />
  <Text className="text-sm text-muted-foreground">
    {Math.round(confidence * 100)}% confidence
  </Text>
</div>
```

## 📐 **8pt Grid System**

### **Spacing Standards**
```css
/* ONLY use these spacing values */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### **Layout Implementation**
```tsx
<div className="space-y-6 p-6">  {/* 24px spacing */}
  <CardHeader className="pb-4">   {/* 16px bottom padding */}
    <CardTitle className="mb-2">  {/* 8px margin bottom */}
      Strategic Dashboard
    </CardTitle>
  </CardHeader>
</div>
```

## 🎯 **Strategic Intelligence Components**

### **Health Score Display**
```tsx
<PM33Card>
  <div className="flex items-center justify-between">
    <div>
      <h3 className="pm33-text-gradient text-lg font-semibold">
        Strategic Health Score
      </h3>
      <div className="text-3xl font-bold text-green-500">
        87%
      </div>
    </div>
    <div className="w-16 h-16 pm33-animate-glow">
      <CircularProgress value={87} color="green" />
    </div>
  </div>
</PM33Card>
```

### **OKR Progress Tracking**
```tsx
<PM33Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <IconTarget className="h-5 w-5" />
      OKR Progress
    </CardTitle>
  </CardHeader>
  <CardContent>
    {okrs.map(okr => (
      <div key={okr.id} className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">{okr.title}</span>
          <span className="pm33-confidence-high">
            {okr.progress}%
          </span>
        </div>
        <Progress value={okr.progress} className="h-2" />
      </div>
    ))}
  </CardContent>
</PM33Card>
```

## ✅ **Core App Component Checklist**

### **REQUIRED for Every Core App Component:**
- [ ] Uses shadcn/ui base components + PM33 enhancements
- [ ] Applies PM33 glass morphism styling
- [ ] Premium hover states and animations
- [ ] AI intelligence indicators where applicable
- [ ] 8pt grid spacing system
- [ ] Strategic color gradients
- [ ] Professional theme switching support

### **FORBIDDEN in Core App:**
- ❌ Basic borders (`1px solid black`)
- ❌ Static cards without hover states
- ❌ Basic spinners instead of AI processing states
- ❌ Marketing color tokens (`--marketing-*`)
- ❌ Flat, non-premium styling

## 🌙 **Theme System Integration**

### **Multi-Theme Support**
```tsx
// Theme toggle component
<Button
  variant="ghost" 
  size="sm"
  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
  className="pm33-btn-glass"
>
  {theme === 'dark' ? <Sun /> : <Moon />}
</Button>

// Theme-aware styling
<div className={cn(
  "pm33-glass-card",
  "bg-card text-card-foreground",
  "dark:bg-card dark:text-card-foreground"
)}>
  Content adapts to theme
</div>
```

## 📱 **Responsive Design**

### **Breakpoint Strategy**
```tsx
// Mobile-first with premium animations preserved
<div className={cn(
  "pm33-glass-card",
  "p-6 md:p-8",           // Responsive padding
  "text-sm md:text-base", // Typography scaling
  "hover:scale-102 md:hover:scale-105" // Platform-appropriate animations
)}>
  <CardTitle className="text-lg md:text-xl lg:text-2xl">
    Strategic Intelligence
  </CardTitle>
</div>
```

## 🧪 **Testing Requirements**

### **Visual Validation Commands**
```bash
# Core app design compliance
npm run test:app

# UI compliance (glass morphism, animations)
npm run test:ui-compliance

# Cross-theme testing
npm run test:visual

# Performance testing
npm run test:performance
```

### **Component Testing Pattern**
```typescript
// Every PM33 component must pass these tests
test('should use PM33 glass morphism', async ({ page }) => {
  const card = page.locator('.pm33-glass-card');
  const backdrop = await card.evaluate(el => 
    getComputedStyle(el).backdropFilter
  );
  expect(backdrop).toContain('blur');
});

test('should have premium hover animations', async ({ page }) => {
  const button = page.locator('button').first();
  await button.hover();
  const transform = await button.evaluate(el =>
    getComputedStyle(el).transform
  );
  expect(transform).not.toBe('none');
});
```

---

**Philosophy:** Every pixel should communicate strategic intelligence and PMO-level capability. The interface itself is a competitive advantage.