# PM33 Global CSS Styling Guide

## 🎯 MANDATORY: All Visual Styling Through Global CSS

**CRITICAL RULE**: All visual styling for PM33 components MUST be implemented through `app/globals.css`. No local component styling, inline styles (except for dynamic values), or component-level CSS files are permitted.

## 📋 Universal CSS Classes for Consistent Styling

### Core Glass Morphism Classes

```css
/* Universal glass class - Apply to ALL cards */
.pm33-glass {
  background: rgba(255, 255, 255, 0.06) !important;
  backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px !important;
  padding: 20px !important;
}

/* Enhanced glass card (existing system) */
.pm33-glass-card {
  /* More elaborate glass morphism with gradients and shadows */
}
```

### Component-Specific Classes

```css
/* Header and Navigation */
.pm33-start-trial-btn         /* Start Free Trial button styling */
.pm33-nav-active              /* Navigation active state */

/* AI Teams and Status */
.pm33-ai-status-bar           /* AI Teams status bar glass effect */
.pm33-ai-active-indicator     /* "AI TEAMS ACTIVE" indicator */

/* Main Content Cards */
.pm33-scenario-card           /* 4 scenario cards with consistent height */
.pm33-scenario-header         /* "COMPETITIVE STRATEGY" headers with gradient */
.pm33-scenario-title          /* Card titles */
.pm33-scenario-description    /* Card descriptions */
.pm33-main-content-grid       /* 2x2 grid layout */

/* Right Sidebar */
.pm33-right-sidebar-section   /* Glass containers for sidebar sections */
.pm33-right-sidebar-header    /* Section headers with icons */
.pm33-progress-container      /* Progress bar container */
.pm33-progress-bar            /* Progress bar background */
.pm33-progress-fill           /* Progress bar fill (30%) */
.pm33-progress-text           /* "30% to goal (50 beta users)" */
.pm33-metric-row              /* Key metrics rows */
.pm33-metric-label            /* Metric labels */
.pm33-metric-value            /* Metric values */
.pm33-metric-highlight        /* Highlighted values */
.pm33-metric-warning          /* Warning text (orange) */

/* Typography */
.pm33-main-heading            /* Main page heading (2.5rem) */
.pm33-main-subheading         /* Page subheading */
.pm33-section-header          /* Section headers with gradient text */
.pm33-icon-standard           /* Standard 20px icons */

/* Layout */
.pm33-three-column-layout     /* 320px | 1fr | 360px grid */
.pm33-left-sidebar            /* Left sidebar container */
.pm33-right-sidebar           /* Right sidebar container */  
.pm33-main-content            /* Main content area */
```

### Utility Classes

```css
/* Spacing */
.pm33-section-spacing         /* 24px margin-bottom */
.pm33-list-item               /* 12px gap, flex layout */
.pm33-card-content            /* 20px padding, 1.6 line-height */

/* States */
.pm33-glass:hover             /* Universal hover effects */
.pm33-scenario-card:hover     /* Card hover with scale(1.02) */
```

## 🎨 Implementation Requirements

### 1. Component Files - HTML Structure ONLY

Components should contain ONLY:
- JSX structure
- Data handling logic
- Event handlers
- Dynamic class name application

```tsx
// ✅ CORRECT - Structure only
export function ScenarioCard({ title, description, category }) {
  return (
    <div className="pm33-scenario-card">
      <div className="pm33-scenario-header">{category}</div>
      <h3 className="pm33-scenario-title">{title}</h3>
      <p className="pm33-scenario-description">{description}</p>
    </div>
  );
}

// ❌ INCORRECT - No inline styles or local styling
export function ScenarioCard({ title }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.1)' }}> {/* NO! */}
      <h3 className="font-bold text-lg">{title}</h3> {/* NO! Use CSS classes */}
    </div>
  );
}
```

### 2. Global CSS - All Visual Properties

```css
/* ✅ CORRECT - All styling in globals.css */
.pm33-scenario-card {
  background: rgba(255, 255, 255, 0.08) !important;
  backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 12px !important;
  padding: 24px !important;
  height: 200px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
}

.pm33-scenario-card:hover {
  transform: scale(1.02) !important;
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(255, 255, 255, 0.18) !important;
}
```

### 3. Theme Support

All classes automatically support three themes:

```css
/* Light theme (default) */
.pm33-glass {
  background: rgba(255, 255, 255, 0.06) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

/* Dark theme */
.dark .pm33-glass {
  background: rgba(255, 255, 255, 0.04) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

/* Gray theme */  
.gray .pm33-glass {
  background: rgba(156, 163, 175, 0.08) !important;
  border-color: rgba(156, 163, 175, 0.15) !important;
}
```

## 📱 Responsive Design Through CSS

```css
/* Desktop (1440px+) */
.pm33-three-column-layout {
  grid-template-columns: 320px 1fr 360px !important;
  gap: 24px !important;
}

/* Tablet (768px - 1440px) */
@media (max-width: 1440px) {
  .pm33-three-column-layout {
    grid-template-columns: 300px 1fr 320px !important;
    gap: 20px !important;
  }
}

/* Mobile (< 768px) */
@media (max-width: 768px) {
  .pm33-three-column-layout {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
}
```

## 🎯 Mockup Compliance Checklist

### Header Requirements
- [x] Hide theme switcher buttons: `nav .flex.items-center.gap-1 button { display: none !important; }`
- [x] Start Free Trial button: `.pm33-start-trial-btn` with gradient background
- [x] Navigation active state: `.pm33-nav-active` for Command Center
- [x] Navigation hover effects: Subtle background and transform

### AI Teams Status Bar
- [x] Glass morphism: `.pm33-ai-status-bar`
- [x] Active indicator: `.pm33-ai-active-indicator` 
- [x] Proper spacing and typography

### Main Content Cards
- [x] Consistent height: `height: 200px` for all scenario cards
- [x] Glass morphism: `.pm33-scenario-card`
- [x] Hover effects: `transform: scale(1.02)`
- [x] Gradient headers: `.pm33-scenario-header`
- [x] 2x2 grid layout: `.pm33-main-content-grid`

### Right Sidebar
- [x] Glass containers: `.pm33-right-sidebar-section`
- [x] Progress bar: Complete implementation with `.pm33-progress-*` classes
- [x] Metrics formatting: `.pm33-metric-*` classes
- [x] Warning color: Orange for "Limited marketing"

### Typography
- [x] Main heading: 2.5rem (`.pm33-main-heading`)
- [x] Gradient text: Section headers with background-clip: text
- [x] Consistent hierarchy: H1 > H2 > H3 with proper font weights

### Spacing & Layout
- [x] Consistent border-radius: 12px on ALL cards
- [x] Icon sizing: 20px standard (`.pm33-icon-standard`)
- [x] Grid gaps: 24px desktop, 16px mobile
- [x] Card padding: 20-24px consistent

### Accessibility
- [x] Focus states: Outline and box-shadow
- [x] Touch targets: Minimum 44px height
- [x] Motion preferences: `@media (prefers-reduced-motion)`
- [x] High contrast: `@media (prefers-contrast: high)`

## 🚀 Testing Integration

All styling is validated through comprehensive Playwright tests:

```bash
# Run mockup compliance tests
npm run test:mockup-compliance

# Test specific aspects
npx playwright test tests/mockup-compliance.spec.ts --grep "Glass morphism"
npx playwright test tests/mockup-compliance.spec.ts --grep "Border radius"
npx playwright test tests/mockup-compliance.spec.ts --grep "Three column layout"
```

## 🔧 Development Workflow

1. **Design Changes**: Update `app/globals.css` with new class definitions
2. **Component Updates**: Apply CSS classes to JSX elements
3. **Testing**: Run Playwright tests to validate compliance
4. **Documentation**: Update this guide with new classes

### Example Implementation Flow

```tsx
// 1. Define CSS class in globals.css
.pm33-metric-highlight {
  color: var(--pm33-primary) !important;
  font-weight: 700 !important;
}

// 2. Apply class in component
<span className="pm33-metric-highlight">{value}</span>

// 3. Test with Playwright
test('Metric highlighting works', async ({ page }) => {
  const highlight = page.locator('.pm33-metric-highlight');
  const color = await highlight.evaluate(el => 
    window.getComputedStyle(el).color
  );
  expect(color).toContain('59, 130, 246'); // PM33 primary blue
});
```

## 📚 CSS Organization

The global CSS is organized in sections:

1. **CSS Variables**: Color system, spacing units
2. **Base Glass Morphism**: Universal `.pm33-glass-card` system  
3. **Universal Classes**: `.pm33-glass` for consistency
4. **Header & Navigation**: Navigation and button styling
5. **AI Teams & Status**: Status bars and indicators
6. **Main Content**: Scenario cards and grid layouts
7. **Right Sidebar**: Metrics and progress bars
8. **Typography**: Heading hierarchy and gradients
9. **Layout & Responsive**: Grid systems and breakpoints
10. **Accessibility**: Focus states and motion preferences

This approach ensures:
- ✅ Consistent visual design across all components
- ✅ Easy theme switching (light/dark/gray)
- ✅ Maintainable codebase with single source of truth
- ✅ Responsive design through CSS media queries
- ✅ Accessibility compliance built-in
- ✅ Performance optimization (no runtime style calculations)