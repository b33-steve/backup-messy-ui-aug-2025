# PM33 Frontend - Clean Global CSS Architecture

**File:** `app/frontend/README.md`  
**Purpose:** Complete frontend architecture overview and development guide  
**Context:** Clean PM33 platform with global CSS classes and independent deployment  
**RELEVANT FILES:** `CLAUDE.md`, `app/globals.css`, component implementations

## 🏗️ **Architecture Overview**

PM33 frontend uses a **dual-framework architecture** that separates marketing and core app contexts with appropriate design systems:

```
app/
├── (marketing)/          # Mantine UI - Clean, conversion-focused
│   ├── layout.tsx        # Marketing context wrapper  
│   ├── page.tsx          # Homepage
│   ├── pricing/          # Pricing page
│   └── features/         # Feature pages
│
├── (app)/               # shadcn/ui + PM33 - Premium glass morphism
│   ├── layout.tsx       # Core app context wrapper
│   ├── dashboard/       # Strategic command center
│   ├── chat/           # AI-powered strategic chat
│   └── intelligence/   # Strategic intelligence engine
│
└── globals.css         # Unified color system for both contexts
```

## 🎯 **Context-Specific Design Systems**

### **Marketing Context** (`app/(marketing)/`)
- **Framework:** Mantine UI 8.2.5 (React components library)
- **Icons:** @tabler/icons-react
- **Purpose:** Lead generation, conversion optimization
- **Design:** Clean, professional, trust-building
- **Colors:** Marketing tokens (`--marketing-*`)
- **Class:** `.marketing-context`

### **Core App Context** (`app/(app)/`) - **CLEAN IMPLEMENTATION**
- **Global CSS Architecture:** Direct CSS classes for glass morphism and PM33 styling
- **Key Classes:** `.glass-card`, `.btn-primary`, `.text-gradient`, `.input-field`, `.glass-nav`
- **Icons:** lucide-react for clean, consistent iconography
- **Framework:** Simple HTML/CSS with strategic enhancements
- **Purpose:** PMO transformation, strategic intelligence  
- **Design:** Glass morphism effects via backdrop-blur-xl and backdrop-saturate-150
- **Colors:** PM33 gradient system with CSS custom properties

## 📚 **Documentation Navigation**

### **Context-Specific Documentation**

**🎯 Marketing Context Documentation** (`app/(marketing)/docs/`):
- **[MARKETING_DESIGN_SYSTEM.md](app/(marketing)/docs/MARKETING_DESIGN_SYSTEM.md)** - Mantine UI design standards
- **[MARKETING_THEME_GUIDE.md](app/(marketing)/docs/MARKETING_THEME_GUIDE.md)** - Marketing theme implementation
- **[MARKETING_STRATEGY.md](app/(marketing)/docs/MARKETING_STRATEGY.md)** - Complete marketing strategy
- **[WEBSITE_MAP.md](app/(marketing)/docs/WEBSITE_MAP.md)** - Complete website structure guide
- **[CONTENT_FACTORY_GUIDE.md](app/(marketing)/docs/CONTENT_FACTORY_GUIDE.md)** - Content factory integration

**⚡ Core App Context Documentation** (`app/(app)/docs/`):
- **[APP_DESIGN_SYSTEM.md](app/(app)/docs/APP_DESIGN_SYSTEM.md)** - shadcn/ui + PM33 design standards
- **[APP_THEME_GUIDE.md](app/(app)/docs/APP_THEME_GUIDE.md)** - Core app theme implementation
- **[CORE_APP_DESIGN_SYSTEM.md](app/(app)/docs/CORE_APP_DESIGN_SYSTEM.md)** - Detailed core app standards

**🗂️ Project-Wide Documentation** (root level):
- **[CLAUDE.md](CLAUDE.md)** - Claude Code instructions and project memory
- **[PLATFORM_DEVELOPMENT_PLAN.md](PLATFORM_DEVELOPMENT_PLAN.md)** - Overall platform strategy and roadmap
- **[README.md](README.md)** - This file - architecture overview

## 🚀 **Quick Start**

### **Development Commands**
```bash
# Start development server
npm run dev

# Context-specific testing  
npm run test:marketing    # Test Mantine + marketing design
npm run test:app         # Test shadcn/ui + PM33 design
npm run test:design-systems  # Test both contexts

# Build and deployment
npm run build
npm run start
```

### **Component Development**

**Marketing Component:**
```tsx
'use client';
import { Container, Card, Button } from '@mantine/core';

export function MarketingFeature() {
  return (
    <Container size={1200} px={24} py={80}>
      <Card shadow="md" padding={32} radius={16}>
        <Button 
          size="lg"
          style={{ backgroundColor: 'var(--marketing-primary)' }}
        >
          Start Free Trial
        </Button>
      </Card>
    </Container>
  );
}
```

**Core App Component (Clean Global CSS):**
```tsx
'use client';
import { Brain } from 'lucide-react';

export function AppFeature() {
  return (
    <div className="glass-card">
      <h3 className="text-xl font-bold text-gradient mb-4">
        Strategic Feature
      </h3>
      <p className="text-gray-600 mb-6">
        AI-powered strategic analysis for your PMO transformation
      </p>
      <button className="btn-primary flex items-center gap-2">
        <Brain className="w-4 h-4" />
        Process with AI
      </button>
    </div>
  );
}
```

## 📁 **Project Structure**

```
app/frontend/
├── app/
│   ├── (marketing)/     # Marketing pages (Mantine UI)
│   ├── (app)/          # Core app pages (shadcn/ui + PM33)
│   ├── globals.css     # Unified design system
│   └── layout.tsx      # Root layout
│
├── components/
│   ├── ui/            # shadcn/ui base components
│   ├── PM33*.tsx      # PM33 premium components  
│   ├── marketing/     # Marketing-specific components
│   └── shared/        # Cross-context utilities
│
├── lib/
│   └── utils.ts       # shadcn/ui utilities
│
├── tests/
│   ├── marketing/     # Marketing context tests
│   ├── app/          # Core app context tests  
│   └── shared/       # Cross-context tests
│
├── CLAUDE.md                    # Development guide
├── MARKETING_DESIGN_SYSTEM.md   # Marketing design standards
├── APP_DESIGN_SYSTEM.md         # Core app design standards
└── README.md                    # This file
```

## 🎨 **Design System Usage**

### **Color Systems**
```tsx
// Marketing colors (clean, professional)
const marketingPalette = {
  primary: 'var(--marketing-primary)',     // #1E40AF
  success: 'var(--marketing-success)',     // #059669  
  cta: 'var(--marketing-cta)',            // #EA580C
  textPrimary: 'var(--marketing-text-primary)', // #1E293B
  bgPrimary: 'var(--marketing-bg-primary)'     // #FFFFFF
};

// PM33 colors (premium, AI-powered)
const pm33Palette = {
  brand: 'var(--pm33-brand)',          // Gradient: #667eea → #764ba2
  aiGlow: 'var(--pm33-ai-glow)',       // Gradient: #00d2ff → #3a7bd5
  glass: 'var(--pm33-glass)',          // rgba(255, 255, 255, 0.1)
  textPrimary: 'var(--pm33-text-primary)', // #0f172a
  bgPrimary: 'var(--pm33-bg-primary)'     // #0a0e27
};
```

### **Component Libraries**

**Mantine UI (Marketing):**
```tsx
import { 
  Container, Card, Title, Text, Button, 
  Grid, Stack, Badge, List, Group 
} from '@mantine/core';
```

**Clean Global CSS (Core App):**
```tsx
// Global CSS classes for consistent PM33 styling
// .glass-card - Glass morphism cards with blur effects
// .btn-primary - Primary buttons with gradients
// .text-gradient - Text with PM33 brand gradients
// .input-field - Form inputs with glass styling
// .glass-nav - Fixed navigation with backdrop blur

// Lucide React icons for consistent iconography
import { Brain, Activity, Zap, Target } from 'lucide-react';
```

## 🧪 **Testing Architecture** 

### **Separate Test Suites**
```bash
tests/
├── marketing/
│   ├── pricing-page.spec.ts           # Mantine UI validation
│   └── marketing-design-compliance.spec.ts  # Marketing colors/layout
│
├── app/  
│   ├── dashboard.spec.ts              # shadcn/ui + PM33 validation
│   └── ui-compliance.spec.ts          # Glass morphism/animations
│
└── shared/
    └── cross-context.spec.ts          # Navigation, routing
```

### **Design Validation**
```typescript
// Marketing context validation
test('should use marketing color tokens', async ({ page }) => {
  await page.goto('/pricing');
  const button = page.locator('.mantine-Button-root').first();
  const bgColor = await button.evaluate(el => 
    getComputedStyle(el).backgroundColor
  );
  expect(bgColor).toBe('rgb(30, 64, 175)'); // --marketing-primary
});

// Core app context validation  
test('should use PM33 glass morphism', async ({ page }) => {
  await page.goto('/dashboard');
  const card = page.locator('.pm33-glass-card').first();
  const backdrop = await card.evaluate(el =>
    getComputedStyle(el).backdropFilter  
  );
  expect(backdrop).toContain('blur');
});
```

## 📦 **Dependencies**

### **Core Dependencies**
```json
{
  "next": "15.4.6",
  "react": "19.1.0",
  "tailwindcss": "^4",
  
  "// Marketing Framework": "",
  "@mantine/core": "^8.2.5",
  "@mantine/hooks": "^8.2.5",
  "@mantine/notifications": "^8.2.5",
  
  "// Core App Framework (shadcn/ui stack)": "",
  "class-variance-authority": "^0.7.1", 
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.3.1",
  "@radix-ui/react-slot": "^1.2.3",
  "framer-motion": "^11.0.0",
  
  "// Icons": "",
  "@tabler/icons-react": "^3.34.1",  // Marketing (Mantine)
  "lucide-react": "^0.539.0",        // Core app (shadcn/ui)
  
  "// Testing": "",
  "@playwright/test": "^1.54.2"
}
```

### **Installation**
```bash
# Install all dependencies
npm install

# Install shadcn/ui components for core app
npx shadcn@latest add button card input textarea badge tabs scroll-area separator

# Install additional Mantine components for marketing
npm install @mantine/dates @mantine/form @mantine/dropzone
```

## 🚀 **Deployment**

### **Build Process**
```bash
# Production build
npm run build

# Test build locally
npm run start

# Deploy to Vercel
vercel --prod
```

### **Environment Variables**
```bash
# .env.local
NEXT_PUBLIC_APP_URL=https://pm33.ai
NEXT_PUBLIC_MARKETING_URL=https://pm33.ai
```

## 🔧 **Development Guidelines**

### **Context Isolation**
- **Marketing pages** NEVER use PM33 components
- **Core app pages** NEVER use marketing color tokens  
- **Shared components** must support both contexts
- **Testing** validates context isolation

### **Performance Standards**
- **Marketing pages:** < 3s load, > 95 SEO score
- **Core app pages:** < 2s interaction, premium animations
- **Bundle splitting:** Automatic by Next.js route groups

### **Code Quality**
- **TypeScript:** Strict mode enabled
- **ESLint:** Next.js recommended + custom rules
- **Prettier:** Consistent code formatting
- **Husky:** Pre-commit hooks for quality

## 📖 **Documentation**

### **Development Guides**
- **[CLAUDE.md](CLAUDE.md)** - Complete development guide & enforcement rules
- **[README.md](README.md)** - This file - Architecture overview

### **Theme System Documentation** 
- **[MARKETING_THEME_GUIDE.md](MARKETING_THEME_GUIDE.md)** - ✨ Marketing website theme usage & examples
- **[APP_THEME_GUIDE.md](APP_THEME_GUIDE.md)** - ✨ PM33 app theme system & glass morphism
- **[theme/index.ts](theme/index.ts)** - Theme configuration & ThemeProvider setup

### **Design System Standards**
- **[MARKETING_DESIGN_SYSTEM.md](MARKETING_DESIGN_SYSTEM.md)** - Marketing component standards
- **[APP_DESIGN_SYSTEM.md](APP_DESIGN_SYSTEM.md)** - Core app component standards  
- **[PM33_COMPLETE_UI_SYSTEM.md](../PM33_COMPLETE_UI_SYSTEM.md)** - Complete UI specifications

### **Quick Reference**
- **Marketing Pages**: Use `MARKETING_THEME_GUIDE.md` - Clean, conversion-focused
- **Core App Pages**: Use `APP_THEME_GUIDE.md` - Premium glass morphism with 3 theme options

## 🆘 **Troubleshooting**

### **Common Issues**

**Wrong framework in wrong context:**
```bash
# ❌ Error: Mantine in core app
import { Button } from '@mantine/core'; // In app/(app)/

# ✅ Solution: Use shadcn/ui  
import { Button } from '@/components/ui/button';
```

**Missing dependencies:**
```bash
# Install missing shadcn/ui components
npx shadcn@latest add [component-name]

# Install missing Mantine components
npm install @mantine/[component-name]
```

**Context class missing:**
```tsx
// Ensure proper context wrapper
<body className={context === 'marketing' ? 'marketing-context' : 'app-context'}>
```

---

**🎯 Success Metrics:** Marketing converts leads, Core app delivers PMO transformation. Both contexts excel in their specific purposes through appropriate design systems.