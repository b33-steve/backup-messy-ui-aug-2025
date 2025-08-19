# ⚠️ MANDATORY INSTRUCTIONS FOR CLAUDE CODE ⚠️
# THIS FILE MUST BE READ BEFORE ANY CODE IS WRITTEN

## 🔴 STOP! Before writing ANY code:

1. **READ THESE FILES COMPLETELY:**
   - `PM33_COMPLETE_UI_SYSTEM.md` - ALL UI standards
   - `PM33_COMPLETE_UX_SYSTEM.md` - ALL UX patterns
   - Run: `cat PM33_COMPLETE_UI_SYSTEM.md` and `cat PM33_COMPLETE_UX_SYSTEM.md`

2. **CONFIRM UNDERSTANDING:**
   Before any UI/UX work, explicitly state:
   "I have read PM33_COMPLETE_UI_SYSTEM.md and PM33_COMPLETE_UX_SYSTEM.md and will follow them exactly."

3. **REFERENCE REQUIREMENTS:**
   For EVERY component, cite the specific section from the design docs:
   "Following PM33_COMPLETE_UI_SYSTEM.md section 3.1 - Glass Morphism Cards"

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

## 🎯 Development Workflow - MANDATORY TESTING

### 1. Test-Driven Development - REQUIRED FOR EVERY COMPONENT
- **ALWAYS run Playwright tests IMMEDIATELY after creating/editing any component**
- **Write tests first** before implementing features  
- Use visual validation with screenshots
- Iterate code until tests pass
- **NEVER commit code without passing tests**

### 2. MANDATORY Testing Commands - Run After Every Change
```bash
# REQUIRED: Run after every component creation/edit
npx playwright test tests/[component-name].spec.ts --project=chromium

# REQUIRED: For visual validation
npx playwright test --update-snapshots

# REQUIRED: Full test suite before commits
npx playwright test --project=chromium
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

### Component Structure
```tsx
'use client';

import React from 'react';
import { Container, Card, Title, Text } from '@mantine/core';

const ComponentName: React.FC = () => {
  return (
    <Container size={1200} px={24} py={48}>
      {/* Component content */}
    </Container>
  );
};

export default ComponentName;
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

## 🎨 Design System Usage

### Mantine Components
```tsx
// Standard container
<Container size={1200} px={24} py={48}>

// Card with demo mode
<Card shadow="lg" padding={32} radius={16} style={demoStyles}>

// Button patterns
<Button 
  size="lg" 
  variant="gradient" 
  gradient={{ from: 'blue', to: 'cyan' }}
  leftSection={<IconBrain size={20} />}
>
  Analyze
</Button>
```

### Color System
```tsx
// Primary brand colors
colors: {
  primary: '#1971c2',   // Strategic blue
  success: '#51cf66',   // Growth green
  warning: '#ffd43b',   // Demo yellow
  danger: '#ff6b6b'     // Alert red
}
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