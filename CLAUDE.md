# ⚠️ MANDATORY INSTRUCTIONS FOR CLAUDE CODE ⚠️
# THIS FILE MUST BE READ BEFORE ANY CODE IS WRITTEN

## 🔴 STOP! Before writing ANY code:

**1. DETERMINE CONTEXT FIRST:**
   - **Marketing Website?** → Use `app/(marketing)/docs/MARKETING_THEME_GUIDE.md`
   - **PM33 App?** → Use `app/(app)/docs/APP_THEME_GUIDE.md`

**2. READ CONTEXT-SPECIFIC DOCUMENTATION:**

   **For Marketing Pages:**
   - `app/(marketing)/docs/MARKETING_THEME_GUIDE.md` - Marketing theme system & examples
   - `app/(marketing)/docs/MARKETING_DESIGN_SYSTEM.md` - Marketing component standards
   - Use `.marketing-context` class and `--marketing-*` colors

   **For PM33 App Pages:**  
   - `app/(app)/docs/APP_THEME_GUIDE.md` - PM33 premium theme system & glass morphism
   - `app/(app)/docs/APP_DESIGN_SYSTEM.md` - Core app component standards
   - Use ThemeProvider and `--pm33-*` colors

**3. CONFIRM UNDERSTANDING:**
   Before any work, explicitly state your context:
   - "I am working on a MARKETING page and will follow app/(marketing)/docs/MARKETING_THEME_GUIDE.md"
   - "I am working on a PM33 APP page and will follow app/(app)/docs/APP_THEME_GUIDE.md"

## 🚫 AUTOMATIC REJECTION TRIGGERS

These will cause IMMEDIATE rejection:
- ANY border that is solid black
- ANY card without glass morphism
- ANY button without gradients
- ANY spinner instead of AI processing animation
- ANY form without AI pre-filling
- ANY action without impact preview

## ✅ REQUIRED FOR EVERY COMPONENT

```tsx
// EVERY component must have this header comment:
/**
 * Component: [ComponentName]
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md - Section [X.X]
 * UX Pattern: PM33_COMPLETE_UX_SYSTEM.md - Section [X.X]
 * 
 * Compliance Checklist:
 * - [ ] Glass morphism applied
 * - [ ] Animations implemented
 * - [ ] Hover states added
 * - [ ] AI intelligence visible
 * - [ ] Progress indicators present
 * - [ ] Follows 8pt grid spacing
 */
```

---

# PM33 Claude Development Guide

## ⚠️ MANDATORY SESSION INITIALIZATION

**BEFORE ANY DEVELOPMENT WORK, CONFIRM:**
"I have read PM33_COMPLETE_UI_SYSTEM.md and PM33_ Complete _UX_System.md and will follow them exactly."

**Required Reading:**
- `PM33_COMPLETE_UI_SYSTEM.md` - ALL UI standards
- `PM33_ Complete _UX_System.md` - ALL UX patterns  
- `CLAUDE_CODE_INSTRUCTIONS.md` - Enforcement rules

**For this session, I will:**
- Use ONLY glass morphism cards with gradients
- Implement ALL hover states and animations
- Use AIProcessingState, never basic spinners
- Follow the 8pt grid system exactly
- Ensure every workflow is <5 clicks
- Add AI prefill to all forms
- Include progress indicators everywhere
- Reference the design docs in every component
- **RUN PLAYWRIGHT TESTS IMMEDIATELY after every component creation/edit**
- **NEVER proceed without passing tests**

## 🚀 Quick Commands

**Development:**
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run test         # Run tests
npm run lint         # Code linting
npm run typecheck    # TypeScript validation
```

**Testing - MANDATORY AFTER EVERY COMPONENT CHANGE:**
```bash
npx playwright test tests/[component].spec.ts --project=chromium  # REQUIRED after every edit
npx playwright test  # Full E2E test suite
npx playwright test --ui  # Interactive test runner
npm test -- --watch # Jest tests in watch mode
```

## 🎯 Development Workflow - DUAL-FRAMEWORK ARCHITECTURE

### 1. **Context-Aware Development - CRITICAL**
**Marketing Context (`app/(marketing)/`)**:
- Use **Mantine UI 8.2.5** components exclusively
- Apply `.marketing-context` class styling  
- Clean, professional design (no glass morphism)
- Marketing color tokens (`--marketing-*`)
- @tabler/icons-react for icons

**Core App Context (`app/(app)/`)**:
- Use **shadcn/ui (Radix UI primitives)** + Tailwind CSS
- lucide-react icons, framer-motion animations
- class-variance-authority, clsx, tailwind-merge utilities
- PM33 glass morphism and premium animations
- PM33 design system tokens (`--pm33-*`)

### 2. Test-Driven Development - CONTEXT SPECIFIC
```bash
# Marketing context testing
npm run test:marketing

# Core app context testing  
npm run test:app

# Both design systems validation
npm run test:design-systems

# Full test suite
npm run test:all
```

### 3. Component Development Pattern - ENFORCED ORDER
1. **Test First**: Create/update Playwright tests for the component
2. **Implement**: Code the component following PM33 standards
3. **Test Immediately**: Run `npx playwright test tests/[component].spec.ts`
4. **Fix Issues**: Iterate until ALL tests pass (no exceptions)
5. **Visual Validate**: Ensure screenshots match expected UI
6. **Commit**: Only after 100% test pass rate

### 4. TESTING ENFORCEMENT RULES
- ❌ **NO CODE COMMITS** without passing Playwright tests
- ❌ **NO COMPONENT CHANGES** without immediate test runs
- ❌ **NO VISUAL CHANGES** without screenshot validation
- ✅ **MANDATORY**: Test every PM33 UX/UI compliance rule
- ✅ **MANDATORY**: Test responsive behavior on mobile/tablet/desktop
- ✅ **MANDATORY**: Test all interactive states (hover, focus, loading)

## 🎨 Code Style Guidelines

### Component Structure - CONTEXT SPECIFIC

**Marketing Components (Mantine UI 8.2.5):**
```tsx
'use client';
import { Container, Card, Title, Text, Button } from '@mantine/core';
import { IconRocket } from '@tabler/icons-react';

const MarketingComponent: React.FC = () => {
  return (
    <Container size={1200} px={24} py={48}>
      <Card shadow="md" padding={32} radius={16}>
        <Title order={1} c="var(--marketing-text-primary)">
          Marketing Headline
        </Title>
        <Button 
          leftSection={<IconRocket size={16} />}
          color="var(--marketing-primary)"
        >
          Call to Action
        </Button>
      </Card>
    </Container>
  );
};
```

**Core App Components (shadcn/ui + Radix UI):**
```tsx
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const AppComponent: React.FC = () => {
  return (
    <motion.div 
      className={cn("pm33-glass-card")}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CardHeader>
        <CardTitle className="pm33-text-gradient">
          Strategic Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default" className="pm33-btn-primary">
          <Brain className="mr-2 h-4 w-4" />
          Process with AI
        </Button>
      </CardContent>
    </motion.div>
  );
};
```

### Naming Conventions
- **Files**: PascalCase for components (e.g., `ChatInterface.tsx`)
- **Variables**: camelCase (e.g., `userQuery`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINT`)
- **CSS Classes**: kebab-case (e.g., `demo-indicator`)

### Demo Mode Implementation
```tsx
// Demo mode toggle pattern
const [isDemoMode, setIsDemoMode] = useState(true);

// Demo indicator styling
const demoStyles = isDemoMode ? {
  border: '2px dotted #ffd43b',
  position: 'relative'
} : {};

// Demo badge component
{isDemoMode && (
  <Badge size="xs" color="yellow" variant="filled" 
    style={{ position: 'absolute', top: 8, right: 8 }}>
    DEMO
  </Badge>
)}
```

## 🧪 Testing Standards

### Visual Tests
```typescript
// Screenshot comparison
await expect(page).toHaveScreenshot('component-name.png');

// Mobile responsive
await page.setViewportSize({ width: 375, height: 667 });
await expect(page).toHaveScreenshot('component-mobile.png');
```

### Component Tests
```typescript
// Test user interactions
await page.click('[data-testid="demo-toggle"]');
await expect(page.locator('.demo-indicator')).toBeVisible();

// Test form functionality
await page.fill('[data-testid="query-input"]', 'test query');
await page.click('[data-testid="submit-button"]');
await expect(page.locator('.result')).toContainText('Analysis');
```

## 🎯 Simplified Navigation Architecture

### Page Structure
```
/app
├── dashboard/          # Overview and metrics
├── chat/              # Strategic question interface
├── tasks/             # Workflow execution
├── data/              # Analytics and insights
└── settings/          # Configuration
```

### URL Patterns
```
/dashboard             # Main overview
/chat                  # Strategic chat interface
/tasks                 # Task management
/data                  # Data analytics
/settings/account      # Account settings
/settings/integrations # Integration setup
```

## 🎨 Dual Design System Usage

### Marketing Context - Mantine UI 8.2.5
```tsx
// Clean marketing layout with Mantine components
import { Container, Card, Title, Button } from '@mantine/core';
import { IconRocket } from '@tabler/icons-react';

<Container size={1200} px={24} py={80}>
  <Card shadow="md" padding={32} radius={16}>
    <Title order={1} c="var(--marketing-text-primary)">
      Professional Headline
    </Title>
    <Button 
      size="lg"
      leftSection={<IconRocket size={16} />}
      style={{ backgroundColor: 'var(--marketing-primary)' }}
    >
      Start Free Trial
    </Button>
  </Card>
</Container>
```

### Core App Context - shadcn/ui (Radix UI primitives)
```tsx
// PM33 glass morphism with shadcn/ui components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';

<motion.div 
  className="pm33-glass-card"
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.2 }}
>
  <CardHeader>
    <CardTitle className="pm33-text-gradient">
      Strategic Intelligence
    </CardTitle>
  </CardHeader>
  <CardContent>
    <Button variant="default" className="pm33-btn-primary">
      <Brain className="mr-2 h-4 w-4" />
      Process with AI
    </Button>
  </CardContent>
</motion.div>
```

### Dual Color System
```tsx
// Marketing Context Colors
const marketingColors = {
  primary: '#1E40AF',      // Strategic Blue - headlines, CTAs
  success: '#059669',      // Success indicators, testimonials  
  cta: '#EA580C',          // Primary CTAs, urgency
  textPrimary: '#1E293B',  // Headlines, key copy
  bgPrimary: '#FFFFFF'     // Clean white base
};

// Core App Context Colors (PM33 Design System)
const pm33Colors = {
  brand: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  aiGlow: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
  glass: 'rgba(255, 255, 255, 0.1)',
  textPrimary: '#0f172a',
  bgPrimary: '#0a0e27'     // Deep background
};
```

### Typography
```tsx
// Page titles
<Title order={1} size="h1" c="dark">Page Title</Title>

// Section headers
<Title order={2} size="h2" mb={24}>Section</Title>

// Body text
<Text size="lg" c="dimmed">Description text</Text>
```

## 🔧 Integration Patterns

### API Integration
```typescript
// API client pattern
const apiCall = async (endpoint: string, data?: any) => {
  const response = await fetch(`/api/${endpoint}`, {
    method: data ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined
  });
  return response.json();
};
```

### State Management
```tsx
// Use React state for UI state
const [query, setQuery] = useState('');
const [loading, setLoading] = useState(false);
const [result, setResult] = useState(null);

// Demo mode global state (use context if needed across components)
const [isDemoMode, setIsDemoMode] = useState(true);
```

## 📱 Responsive Design

### Breakpoints
```tsx
// Mantine responsive patterns
<Grid.Col span={{ base: 12, md: 6, lg: 4 }}>

// Custom responsive styles
const useStyles = createStyles((theme) => ({
  container: {
    [theme.fn.smallerThan('md')]: {
      padding: theme.spacing.md
    }
  }
}));
```

### Mobile-First Approach
1. Design for mobile (375px) first
2. Scale up to tablet (768px)
3. Optimize for desktop (1200px+)

## ⚡ Performance Guidelines

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Patterns
```tsx
// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Optimize images
<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  loading="lazy"
/>

// Memoize expensive calculations
const expensiveValue = useMemo(() => 
  heavyCalculation(data), [data]
);
```

## 🚫 Repository Etiquette

### Commit Messages
```
feat: add demo mode toggle to chat interface
fix: resolve mobile navigation overflow
style: update button spacing in dashboard
test: add screenshot tests for responsive layout
docs: update CLAUDE.md with testing guidelines
```

### Branch Naming
```
feature/demo-mode-implementation
fix/mobile-navigation-overflow
style/dashboard-spacing-updates
test/screenshot-validation
```

### File Organization
- **Components**: Group by feature, not by type
- **Tests**: Co-locate with components (`Component.test.tsx`)
- **Styles**: Use Mantine's built-in styling system
- **Assets**: Store in `/public` with descriptive names

## 🎯 Success Metrics

### Technical Metrics
- **Test Coverage**: >80% for components
- **Performance Score**: >90 (Lighthouse)
- **Accessibility Score**: >95 (WCAG AA compliant)
- **Bundle Size**: <500KB initial load

### User Experience Metrics
- **Load Time**: <3s on 3G connection
- **Interaction Responsiveness**: <100ms
- **Visual Stability**: No layout shifts
- **Mobile Usability**: 100% Google score

---

**Remember**: "Claude performs best when it has a clear target to iterate against—a visual mock, a test case, or another kind of output."

Always provide visual mockups or detailed descriptions before implementation.