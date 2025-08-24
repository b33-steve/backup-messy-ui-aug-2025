# PM33 Authenticated App Design System
*Clean, Productivity-Focused Strategic Intelligence Interface*

## Purpose & Enforcement

This design system is **mandatory** for all authenticated app routes (`/app/*`). Every component must use these tokens to ensure consistent productivity-focused experience.

**Enforcement**: 
- Design tokens are CSS custom properties with app-specific validation
- Components fail TypeScript compilation if they don't use app design tokens
- Storybook documentation with mandatory usage examples

## App Positioning: Strategic Intelligence Workplace

**Voice**: Professional, efficient, intelligent
**Personality**: Sophisticated tool that amplifies PM capabilities
**Promise**: "PMO-level strategic intelligence at your fingertips"

## PM33 Theme System (Updated - August 2025)

**SINGLE SOURCE OF TRUTH**: `/lib/theme/pm33-theme.ts`

### Color System - Managed by Theme Provider

```tsx
// REQUIRED: Import theme system for all color usage
import { PM33ThemeProvider, useTheme, pm33Theme } from '@/lib/theme/pm33-theme';

// CSS Custom Properties - AUTO-INJECTED by PM33ThemeProvider:
// --pm33-brand: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
// --pm33-brand-hover: linear-gradient(135deg, #764ba2 0%, #f093fb 100%)
// --pm33-ai-glow: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)
// --pm33-glass: rgba(255, 255, 255, 0.1)
// --pm33-glass-border: rgba(255, 255, 255, 0.18)
// --pm33-glass-backdrop-filter: blur(40px) saturate(150%)
// + 40+ more variables managed automatically
```

### Glass Morphism System - Built-In

```tsx
// REQUIRED: Use glass styles from theme system
import { getGlassStyle, glassStyles } from '@/lib/theme/pm33-theme';

// Available glass variants:
const cardStyle = getGlassStyle('card');     // Standard glass
const premiumStyle = getGlassStyle('premium'); // Enhanced glass with insets
const aiStyle = getGlassStyle('ai');         // AI-themed blue tint
const minimalStyle = getGlassStyle('minimal'); // Subtle glass

// CSS classes automatically available:
// .pm33-glass - Standard glass morphism
// .pm33-glass-card - Premium glass card
// .pm33-text-gradient - PM33 brand gradient text
// .pm33-text-ai-gradient - AI glow gradient text
```

### Animation System - Built-In

```tsx
// CSS Animation classes automatically injected:
// .pm33-animate-float - 3s floating animation
// .pm33-animate-glow - 2s glowing pulse animation
// .pm33-animate-fade-up - 0.6s fade up entrance
// .pm33-animate-gradient - 15s gradient shift animation
// .pm33-animate-shimmer - 2s shimmer loading effect
// .pm33-animate-bounce - 1.4s bounce animation
// + more animations available via theme system
```

### Responsive Breakpoints - Managed

```tsx
// Breakpoints available via theme system:
const { breakpoints } = pm33Theme;
// xs: '475px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px'

// Responsive utility:
import { getResponsiveValue, createResponsiveStyles } from '@/lib/theme/pm33-theme';

const responsiveValue = getResponsiveValue({
  sm: '1rem',
  md: '1.5rem', 
  lg: '2rem'
}, '0.75rem');
```

## Typography Scale (App Productivity)

```css
/* App Typography - MANDATORY CLASSES */
.app-title-lg {
  font-size: 2rem;        /* 32px - Page titles */
  font-weight: 700;
  line-height: 1.25;
  color: var(--app-text-primary);
}

.app-title {
  font-size: 1.5rem;      /* 24px - Section titles */
  font-weight: 600;
  line-height: 1.33;
  color: var(--app-text-primary);
}

.app-heading {
  font-size: 1.25rem;     /* 20px - Component headings */
  font-weight: 600;
  line-height: 1.4;
  color: var(--app-text-primary);
}

.app-subheading {
  font-size: 1.125rem;    /* 18px - Subheadings */
  font-weight: 500;
  line-height: 1.44;
  color: var(--app-text-secondary);
}

.app-body {
  font-size: 1rem;        /* 16px - Body text */
  line-height: 1.5;
  color: var(--app-text-secondary);
}

.app-body-sm {
  font-size: 0.875rem;    /* 14px - Small body text */
  line-height: 1.43;
  color: var(--app-text-secondary);
}

.app-caption {
  font-size: 0.75rem;     /* 12px - Captions, labels */
  line-height: 1.33;
  color: var(--app-text-muted);
}

.app-mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.43;
  color: var(--app-text-primary);
}
```

## PM33 Component Library (Updated - August 2025)

### Required PM33 Components - ACTUAL IMPLEMENTATION

**Location**: `/app/frontend/components/`

```tsx
// REQUIRED: Import from actual PM33 components
import { PM33PageWrapper } from '@/components/PM33PageWrapper';
import { PM33Navigation } from '@/components/PM33Navigation';
import { PM33Card } from '@/components/PM33Card';
import { PM33Button } from '@/components/PM33Button';
import { PM33AIProcessing } from '@/components/PM33AIProcessing';

// REQUIRED: Use PM33ThemeProvider from theme system
import { PM33ThemeProvider, useTheme } from '@/lib/theme/pm33-theme';

// Example page structure using actual components:
export const AppPage = () => (
  <PM33ThemeProvider>
    <PM33PageWrapper>
      <PM33Navigation currentPage="dashboard" />
      <div className="pt-20 px-6">
        <PM33Card>
          <h1 className="pm33-text-gradient">Strategic Intelligence</h1>
          <PM33Button variant="primary">
            Process with AI
          </PM33Button>
          <PM33AIProcessing 
            message="Analyzing strategic implications..."
            showProgress={true}
            size="md"
          />
        </PM33Card>
      </div>
    </PM33PageWrapper>
  </PM33ThemeProvider>
);
```

### PM33PageWrapper Component - ACTUAL SPECS
**File**: `components/PM33PageWrapper.tsx`
- ✅ Glass morphism background with animated orbs
- ✅ PM33 CSS variables injected globally
- ✅ Complete animation keyframes system
- ✅ 8pt grid spacing utilities
- ✅ Professional dark gradient background

```tsx
// Usage in every PM33 app page:
<PM33PageWrapper backgroundVariant="strategic">
  {/* All PM33 app content */}
</PM33PageWrapper>
```

### PM33Navigation Component - ACTUAL SPECS
**File**: `components/PM33Navigation.tsx`
- ✅ Glass morphism: `backdrop-filter: blur(40px) saturate(150%)`
- ✅ Brand gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- ✅ Border: `1px solid rgba(255, 255, 255, 0.18)`
- ✅ Sticky positioning with PM33 logo
- ✅ Beta badge with gradient animation

```tsx
// Usage in every PM33 app page:
<PM33Navigation currentPage="dashboard" />
```

### PM33Card Component - ACTUAL SPECS
**File**: `components/PM33Card.tsx`
- ✅ Glass morphism with animated gradient background
- ✅ Hover animations: `translateY(-4px) scale(1.02)`
- ✅ Progressive enhancement with backdrop blur
- ✅ Premium card variants with inset shadows

```tsx
// Usage for all content cards:
<PM33Card onClick={handleClick}>
  <h3>Card Title</h3>
  <p>Card content with glass morphism styling</p>
</PM33Card>
```

### PM33Button Component - ACTUAL SPECS
**File**: `components/PM33Button.tsx`
- ✅ Primary: Brand gradient with hover transform
- ✅ Secondary: Glass morphism with backdrop filter
- ✅ Danger: Red gradient for destructive actions
- ✅ Loading states with spinner animation
- ✅ Icon support with proper spacing

```tsx
// Usage for all interactive buttons:
<PM33Button 
  variant="primary" 
  loading={isProcessing}
  icon={<BrainIcon />}
>
  Generate Analysis
</PM33Button>
```

### PM33AIProcessing Component - ACTUAL SPECS
**File**: `components/PM33AIProcessing.tsx`
- ✅ Premium AI loader (never basic spinners)
- ✅ Animated brain icon with pulsing rings
- ✅ Thinking dots animation
- ✅ Progress bar with gradient slide animation
- ✅ Three sizes: sm, md, lg

```tsx
// Usage for all AI processing states:
<PM33AIProcessing 
  message="Analyzing strategic implications..."
  subMessage="This may take a few moments"
  showProgress={true}
  size="md"
/>
```

### App Button System (ENFORCED)
```css
/* REQUIRED: All app buttons must use these classes */
.app-button-primary {
  background: var(--app-primary);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem; /* 8px 16px */
  border-radius: 0.375rem; /* 6px */
  border: 1px solid var(--app-primary);
  transition: all 0.15s ease;
  
  &:hover {
    background: var(--app-primary-hover);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--app-primary-light);
  }
}

.app-button-secondary {
  background: var(--app-bg-primary);
  color: var(--app-text-primary);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 1px solid var(--app-border-default);
  border-radius: 0.375rem;
  transition: all 0.15s ease;
  
  &:hover {
    background: var(--app-bg-tertiary);
    border-color: var(--app-border-focus);
  }
}

.app-button-ghost {
  background: transparent;
  color: var(--app-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  
  &:hover {
    background: var(--app-bg-tertiary);
    color: var(--app-text-primary);
  }
}
```

### AI Interface Components
```tsx
// REQUIRED: AI-specific components for app consistency
interface AIProcessingCardProps {
  stage: 'analyzing' | 'processing' | 'complete' | 'error';
  confidence?: number;
  title: string;
  description?: string;
  progress?: number;
  timeRemaining?: string;
}

export const AIProcessingCard: React.FC<AIProcessingCardProps> = ({
  stage, confidence, title, description, progress, timeRemaining
}) => (
  <Card className="app-ai-card">
    <CardHeader>
      <div className="app-ai-indicator">
        <AIStatusIcon stage={stage} />
        <div>
          <h3 className="app-heading">{title}</h3>
          {description && <p className="app-body-sm">{description}</p>}
        </div>
      </div>
    </CardHeader>
    <CardContent>
      {progress !== undefined && (
        <ProgressBar 
          value={progress} 
          className="app-progress" 
        />
      )}
      {confidence !== undefined && (
        <ConfidenceIndicator 
          value={confidence}
          className="app-confidence"
        />
      )}
      {timeRemaining && (
        <span className="app-caption">
          Est. {timeRemaining} remaining
        </span>
      )}
    </CardContent>
  </Card>
);

// Confidence visualization component
interface ConfidenceIndicatorProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({
  value, size = 'md', showLabel = true
}) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'var(--app-ai-confidence-high)';
    if (confidence >= 70) return 'var(--app-ai-confidence-med)';
    return 'var(--app-ai-confidence-low)';
  };

  return (
    <div className={`app-confidence-indicator app-confidence-${size}`}>
      <div 
        className="app-confidence-ring"
        style={{
          '--confidence-color': getConfidenceColor(value),
          '--confidence-percentage': `${value * 3.6}deg`
        }}
      />
      {showLabel && (
        <span className="app-confidence-label">
          {value}% confidence
        </span>
      )}
    </div>
  );
};
```

### App Card System
```tsx
// REQUIRED: Use AppCard for all content cards
interface AppCardProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  status?: 'default' | 'success' | 'warning' | 'error';
  variant?: 'default' | 'elevated' | 'outlined';
}

export const AppCard: React.FC<AppCardProps> = ({
  title, subtitle, actions, children, status = 'default', variant = 'default'
}) => (
  <Card className={`app-card app-card-${variant} app-card-${status}`}>
    <CardHeader className="app-card-header">
      <div>
        <h3 className="app-heading">{title}</h3>
        {subtitle && <p className="app-body-sm">{subtitle}</p>}
      </div>
      {actions && <div className="app-card-actions">{actions}</div>}
    </CardHeader>
    <CardContent className="app-card-content">
      {children}
    </CardContent>
  </Card>
);
```

## Layout System (App-Specific)

### App Layout Grid
```css
/* App layout containers - REQUIRED */
.app-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1rem; /* 16px */
}

.app-section {
  padding: 2rem 0; /* 32px vertical */
}

.app-section-compact {
  padding: 1.5rem 0; /* 24px vertical */
}

/* App-specific spacing scale */
.app-space-xs { gap: 0.5rem; }   /* 8px */
.app-space-sm { gap: 0.75rem; }  /* 12px */
.app-space-md { gap: 1rem; }     /* 16px */
.app-space-lg { gap: 1.5rem; }   /* 24px */
.app-space-xl { gap: 2rem; }     /* 32px */

/* Dashboard grid systems */
.app-grid-sidebar {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 2rem;
  min-height: 100vh;
}

.app-grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.app-grid-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
```

### Navigation System
```tsx
// REQUIRED: App navigation component
interface AppNavigationProps {
  currentPath: string;
  user: {
    name: string;
    avatar?: string;
    organization: string;
  };
}

export const AppNavigation: React.FC<AppNavigationProps> = ({
  currentPath, user
}) => (
  <nav className="app-navigation">
    <div className="app-nav-header">
      <img src="/pm33-logo.png" alt="PM33" className="app-logo" />
      <Badge variant="outline" size="sm">Strategic Intelligence</Badge>
    </div>
    
    <div className="app-nav-menu">
      <AppNavItem 
        href="/app/dashboard" 
        icon={<IconDashboard />}
        active={currentPath.startsWith('/app/dashboard')}
      >
        Dashboard
      </AppNavItem>
      <AppNavItem 
        href="/app/intelligence" 
        icon={<IconBrain />}
        active={currentPath.startsWith('/app/intelligence')}
      >
        Strategic Intelligence
      </AppNavItem>
      <AppNavItem 
        href="/app/projects" 
        icon={<IconProject />}
        active={currentPath.startsWith('/app/projects')}
      >
        Projects
      </AppNavItem>
      <AppNavItem 
        href="/app/insights" 
        icon={<IconChart />}
        active={currentPath.startsWith('/app/insights')}
      >
        Insights
      </AppNavItem>
    </div>
    
    <div className="app-nav-footer">
      <AppUserMenu user={user} />
    </div>
  </nav>
);
```

## Enforcement Mechanisms

### 1. TypeScript Integration
```typescript
// types/app-design-system.ts - ENFORCES app design system
export type AppColor = 
  | `var(--app-primary${string})`
  | `var(--app-success${string})`
  | `var(--app-warning${string})`
  | `var(--app-error${string})`
  | `var(--app-text${string})`
  | `var(--app-bg${string})`
  | `var(--app-border${string})`
  | `var(--app-ai${string})`;

export interface AppComponentProps {
  className?: string;
  style?: {
    color?: AppColor;
    backgroundColor?: AppColor;
    borderColor?: AppColor;
  };
}
```

### 2. Storybook Documentation
```tsx
// .storybook/app-design-system.stories.tsx
export default {
  title: 'App Design System/Colors',
  parameters: {
    docs: {
      description: {
        component: 'MANDATORY: All app components must use these colors'
      }
    }
  }
};

export const AppColors = () => (
  <div className="design-system-showcase">
    <ColorSwatch name="Primary" value="var(--app-primary)" />
    <ColorSwatch name="Success" value="var(--app-success)" />
    {/* All app colors documented with usage examples */}
  </div>
);
```

### 3. ESLint Rules for App Components
```json
// .eslintrc.app.json - App-specific linting
{
  "rules": {
    "app-design-system/required-props": "error",
    "app-design-system/no-inline-styles": "error",
    "app-design-system/use-design-tokens": "error"
  }
}
```

## App vs Marketing Distinction

### App Design Goals:
- **Productivity-Focused**: Clean, minimal, distraction-free
- **Professional Efficiency**: Quick access to information and actions
- **Strategic Intelligence**: AI-powered insights presented clearly
- **Scalable Interface**: Handles complex data without overwhelming

### Visual Differentiation:
- **Smaller typography scales** (32px max headlines vs 64px marketing)
- **Subtle color usage** (Professional blues vs bold marketing orange)
- **Tighter spacing** (32px sections vs 96px marketing sections)
- **Refined hierarchy** (Understated vs bold marketing contrast)

This app design system ensures consistent productivity-focused experience while maintaining the strategic intelligence positioning that differentiates PM33 from generic project management tools.