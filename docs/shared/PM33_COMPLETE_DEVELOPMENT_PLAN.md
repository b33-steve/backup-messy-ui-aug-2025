# PM33 COMPLETE DEVELOPMENT PLAN & TESTING STRATEGY

## 🎯 **Phase 1: Foundation Components (Week 1)**

### **Core shadcn/ui Components to Build**

#### **1. PM33PageWrapper Component**

```typescript
// components/ui/pm33-page-wrapper.tsx
// Purpose: Root wrapper with theme system and background gradients
// Design: Matches mockup background gradients for light/dark/purple themes
// Required: Must support theme switching via context
```

**Claude Code Instructions:**

```bash
Create components/ui/pm33-page-wrapper.tsx that:
1. Uses React Context for theme management (light/dark/purple)
2. Implements gradient backgrounds exactly as shown in mockup
3. Includes animated orb elements for visual interest
4. Supports theme toggle functionality
5. Uses Tailwind CSS with custom gradients
6. Exports theme context for other components
```

#### **2. PM33Navigation Component**

```typescript
// components/ui/pm33-navigation.tsx
// Purpose: Responsive navigation with glass morphism
// Design: Horizontal menu that becomes hamburger on mobile (<768px)
// Required: Must show/hide nav items properly on mobile
```

**Claude Code Instructions:**

```bash
Create components/ui/pm33-navigation.tsx that:
1. Uses shadcn/ui NavigationMenu as base
2. Implements glass morphism backdrop-filter effects
3. Has proper mobile responsive hamburger menu
4. Shows full nav items on desktop, hamburger + overlay on mobile
5. Includes theme-aware styling
6. Uses the network-style PM33 logo from assets
7. Has proper TypeScript interfaces for nav items
```

#### **3. PM33Card Component**

```typescript
// components/ui/pm33-card.tsx
// Purpose: Glass morphism cards with hover effects
// Design: Semi-transparent with blur effects and subtle hover animations
// Required: Must support different variants (default, ai-briefing, tool-item)
```

**Claude Code Instructions:**

```bash
Create components/ui/pm33-card.tsx that:
1. Extends shadcn/ui Card component
2. Implements glass morphism effects with backdrop-filter
3. Has smooth hover animations (translateY + shadow changes)
4. Supports theme-aware background colors
5. Includes proper TypeScript props interface
6. Has variants: 'default' | 'ai-briefing' | 'sidebar'
```

### **Playwright Test Suite for Foundation**

```typescript
// tests/foundation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('PM33 Foundation Components', () => {
  test('Theme switching works correctly', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Test light theme
    await page.click('[data-testid="theme-light"]');
    await expect(page.locator('body')).toHaveClass(/light/);
    
    // Test dark theme
    await page.click('[data-testid="theme-dark"]');
    await expect(page.locator('body')).toHaveClass(/dark/);
    
    // Test purple theme
    await page.click('[data-testid="theme-purple"]');
    await expect(page.locator('body')).toHaveClass(/purple/);
  });

  test('Navigation is responsive', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Desktop view - nav items visible
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(page.locator('[data-testid="nav-items"]')).toBeVisible();
    await expect(page.locator('[data-testid="mobile-toggle"]')).not.toBeVisible();
    
    // Mobile view - hamburger menu
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[data-testid="nav-items"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="mobile-toggle"]')).toBeVisible();
    
    // Mobile menu toggle works
    await page.click('[data-testid="mobile-toggle"]');
    await expect(page.locator('[data-testid="nav-items"]')).toBeVisible();
  });

  test('Glass morphism cards render correctly', async ({ page }) => {
    await page.goto('/dashboard');
    const cards = page.locator('[data-testid="pm33-card"]');
    const firstCard = cards.first();
    
    // Check glass morphism properties
    const backdropFilter = await firstCard.evaluate(el => 
      window.getComputedStyle(el).backdropFilter
    );
    expect(backdropFilter).toContain('blur');
    
    // Check hover effect
    await firstCard.hover();
    await page.waitForTimeout(300); // Wait for animation
    const transform = await firstCard.evaluate(el => 
      window.getComputedStyle(el).transform
    );
    expect(transform).not.toBe('none');
  });
});
```

---

## 🎯 **Phase 2: Page Development (Week 2-3)**

### **Page 1: Command Center Dashboard**

**Claude Code Instructions:**

```bash
Create app/dashboard/page.tsx that:
1. Uses three-column grid layout (300px - 1fr - 350px)
2. Implements left sidebar with Strategic Tools and Company Context
3. Creates center content area with AI Briefing and chat interface
4. Builds right sidebar with competitive landscape and metrics
5. All cards use PM33Card component with proper styling
6. Fully responsive - collapses to single column on mobile
7. Integrates with theme system
8. Includes proper loading states and error handling
```

**Required Components for Dashboard:**
- `StrategicToolsSidebar` - Left sidebar with tool navigation
- `AIIntelligenceBriefing` - Center AI briefing card with scenarios
- `ChatInterface` - Chat component with message history
- `CompetitiveLandscape` - Right sidebar competitive info
- `KeyMetrics` - Progress tracking and team info

### **Page 2: Strategic Intelligence**

**Claude Code Instructions:**

```bash
Create app/strategic-intelligence/page.tsx that:
1. Features grid layout showcasing AI capabilities
2. Demonstrates framework application (ICE, RICE, Porter's Five Forces)
3. Shows company context integration examples
4. Includes interactive framework selection
5. Has proper feature cards with icons and descriptions
6. Uses PM33Card for all content containers
7. Responsive design with mobile-first approach
```

### **Page 3: Project Delivery**

**Claude Code Instructions:**

```bash
Create app/project-delivery/page.tsx that:
1. Shows strategic → execution pipeline visualization
2. Displays active workflows and Jira integration status
3. Includes task generation and team sync metrics
4. Has workflow creation interface
5. Shows project status and delivery tracking
6. Uses data visualization components (recharts)
7. Fully responsive with mobile-friendly interactions
```

### **Page 4: Analytics Dashboard**

**Claude Code Instructions:**

```bash
Create app/analytics/page.tsx that:
1. Displays strategic health score and key metrics
2. Shows framework usage breakdown with charts
3. Includes decision timeline visualization
4. Has performance tracking and ROI metrics
5. Uses recharts for all data visualizations
6. Responsive design with chart adaptations for mobile
7. Includes export and filtering capabilities
```

---

## 🎯 **Phase 3: Interactive Features (Week 4)**

### **Chat System Implementation**

**Claude Code Instructions:**

```bash
Create components/chat/ directory with:

1. ChatInterface component:
   - Real-time message handling with useState
   - Message history with proper scrolling
   - Framework suggestion system
   - Company context integration
   - Loading states and error handling

2. ChatMessage component:
   - User/AI message differentiation
   - Framework application buttons
   - Interactive elements (Yes/No for framework)
   - Proper accessibility support

3. ChatInput component:
   - Auto-expanding textarea
   - Send button with loading states
   - Keyboard shortcuts (Enter to send)
   - File upload support for context

4. FrameworkSuggestion component:
   - Interactive framework selection
   - ICE/RICE/Porter's Five Forces options
   - One-click application with preview
   - Results integration with chat
```

---

## 🧪 **Comprehensive Testing Strategy**

### **1. Visual Regression Testing**

```typescript
// tests/visual.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  const pages = [
    '/dashboard',
    '/strategic-intelligence',
    '/project-delivery',
    '/analytics'
  ];
  
  const themes = ['light', 'dark', 'purple'];
  
  const viewports = [
    { width: 1920, height: 1080, name: 'desktop' },
    { width: 1024, height: 768, name: 'tablet' },
    { width: 375, height: 667, name: 'mobile' }
  ];

  for (const page of pages) {
    for (const theme of themes) {
      for (const viewport of viewports) {
        test(`${page} - ${theme} theme - ${viewport.name}`, async ({ page: pw }) => {
          await pw.setViewportSize(viewport);
          await pw.goto(page);
          await pw.click(`[data-testid="theme-${theme}"]`);
          await pw.waitForLoadState('networkidle');
          await expect(pw).toHaveScreenshot(`${page.replace('/', '')}-${theme}-${viewport.name}.png`);
        });
      }
    }
  }
});
```

### **2. Responsive Design Testing**

```typescript
// tests/responsive.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('Dashboard layout adapts correctly', async ({ page }) => {
    await page.goto('/dashboard');

    // Desktop - three columns visible
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('[data-testid="sidebar-left"]')).toBeVisible();
    await expect(page.locator('[data-testid="center-content"]')).toBeVisible();
    await expect(page.locator('[data-testid="sidebar-right"]')).toBeVisible();

    // Tablet - compressed layout
    await page.setViewportSize({ width: 1024, height: 768 });
    const leftSidebar = page.locator('[data-testid="sidebar-left"]');
    const width = await leftSidebar.evaluate(el => el.offsetWidth);
    expect(width).toBeLessThan(300); // Should be compressed

    // Mobile - single column
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[data-testid="dashboard-grid"]')).toHaveCSS('grid-template-columns', '1fr');
  });

  test('Navigation adapts to mobile', async ({ page }) => {
    await page.goto('/dashboard');

    // Desktop navigation
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('[data-testid="nav-items"]')).toBeVisible();
    await expect(page.locator('[data-testid="mobile-toggle"]')).not.toBeVisible();

    // Mobile navigation
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[data-testid="nav-items"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="mobile-toggle"]')).toBeVisible();

    // Mobile menu functionality
    await page.click('[data-testid="mobile-toggle"]');
    await expect(page.locator('[data-testid="nav-items"]')).toHaveClass(/show/);
  });
});
```

### **3. Accessibility Testing**

```typescript
// tests/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('Dashboard page is accessible', async ({ page }) => {
    await page.goto('/dashboard');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Keyboard navigation works', async ({ page }) => {
    await page.goto('/dashboard');

    // Tab through navigation items
    await page.press('body', 'Tab');
    await expect(page.locator('[data-testid="theme-light"]')).toBeFocused();
    await page.press('body', 'Tab');
    await expect(page.locator('[data-testid="nav-item-dashboard"]')).toBeFocused();

    // Enter activates nav item
    await page.press('body', 'Enter');
    await expect(page.url()).toContain('/dashboard');
  });

  test('Screen reader compatibility', async ({ page }) => {
    await page.goto('/dashboard');

    // Check ARIA labels
    await expect(page.locator('[data-testid="ai-briefing"]')).toHaveAttribute('aria-label');
    await expect(page.locator('[data-testid="chat-input"]')).toHaveAttribute('aria-label');

    // Check heading hierarchy
    const h1 = await page.locator('h1').count();
    expect(h1).toBe(1); // Only one h1 per page

    // Check alt text for images
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt');
    }
  });
});
```

### **4. Performance Testing**

```typescript
// tests/performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('Page load times are acceptable', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // Under 3 seconds
  });

  test('No memory leaks in theme switching', async ({ page }) => {
    await page.goto('/dashboard');

    // Switch themes multiple times
    for (let i = 0; i < 10; i++) {
      await page.click('[data-testid="theme-light"]');
      await page.click('[data-testid="theme-dark"]');
      await page.click('[data-testid="theme-purple"]');
    }

    // Check for memory usage (implementation depends on specific metrics)
    const metrics = await page.evaluate(() => (performance as any).measureUserAgentSpecificMemory?.());
    // Add specific memory assertions based on your requirements
  });

  test('Smooth animations', async ({ page }) => {
    await page.goto('/dashboard');
    const card = page.locator('[data-testid="pm33-card"]').first();

    // Measure hover animation performance
    await card.hover();
    await page.waitForTimeout(100);
    const animationDuration = await card.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.transitionDuration;
    });
    expect(animationDuration).toMatch(/0\.[2-5]s/); // Between 0.2s and 0.5s
  });
});
```

---

## 📋 **Implementation Checklist**

### **Week 1: Foundation**
- [ ] Set up shadcn/ui with PM33 theme configuration
- [ ] Create PM33PageWrapper with theme system
- [ ] Build PM33Navigation with responsive hamburger menu
- [ ] Implement PM33Card with glass morphism effects
- [ ] Set up Playwright testing infrastructure
- [ ] Create visual regression test baseline screenshots

### **Week 2: Core Pages**
- [ ] Build Command Center dashboard with three-column layout
- [ ] Create Strategic Intelligence feature showcase page
- [ ] Develop Project Delivery workflow page
- [ ] Implement Analytics dashboard with charts
- [ ] Add responsive breakpoints for all pages
- [ ] Test mobile navigation functionality

### **Week 3: Interactive Features**
- [ ] Implement chat interface with real-time messaging
- [ ] Add framework suggestion system (ICE/RICE/Porter's)
- [ ] Create company context integration
- [ ] Build scenario cards with click interactions
- [ ] Add loading states and error handling
- [ ] Implement data visualization components

### **Week 4: Testing & Polish**
- [ ] Complete accessibility audit and fixes
- [ ] Run performance optimization (bundle size, load times)
- [ ] Execute full visual regression test suite
- [ ] Test all responsive breakpoints thoroughly
- [ ] Validate theme switching across all components
- [ ] Final quality assurance and bug fixes

---

## 🚀 **Success Criteria**

### **Technical Requirements**
- ✅ All Playwright tests pass (100% success rate)
- ✅ Lighthouse performance score >90
- ✅ Zero accessibility violations (axe-core)
- ✅ Bundle size <500KB gzipped
- ✅ First Contentful Paint <1.5 seconds

### **UX Requirements**
- ✅ Smooth 60fps animations on all devices
- ✅ Perfect responsive behavior 320px to 2560px
- ✅ Theme switching works instantly without flicker
- ✅ Mobile navigation is intuitive and accessible
- ✅ Glass morphism effects render consistently

### **Browser Compatibility**
- ✅ Chrome/Edge 90+ (primary target)
- ✅ Firefox 88+ (secondary)
- ✅ Safari 14+ (Mac/iOS)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

This comprehensive plan ensures PM33 delivers a premium, accessible, and performant strategic intelligence platform that matches the mockup designs exactly while maintaining enterprise-grade quality standards.