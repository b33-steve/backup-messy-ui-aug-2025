# PM33 Marketing Design System
*Bold, Conversion-Focused Strategic Intelligence Positioning*

## Purpose & Enforcement

This design system is **mandatory** for all marketing pages (`/`, `/pricing`, `/about`, `/demo`, `/trial`). Every component must use these tokens and patterns.

**Enforcement**: 
- Design tokens are CSS custom properties that **must** be used
- Components fail linting if they don't use design system tokens
- All marketing pages use shared component library

## Brand Positioning: Strategic Intelligence Platform

**Voice**: Confident, strategic, transformative
**Personality**: Professional intelligence that drives results
**Promise**: "Transform PMs into PMOs through AI-powered strategic teams"

## Marketing Color System (Bold & Conversion-Focused)

```css
/* Marketing-Specific Color Tokens - REQUIRED USE ONLY */
:root {
  /* Primary Marketing Colors */
  --marketing-primary: #1E40AF;      /* Strategic Blue - headlines, CTAs */
  --marketing-primary-hover: #1E3A8A; /* Interactive states */
  --marketing-primary-light: #EFF6FF; /* Backgrounds, highlights */
  
  /* Success & Growth (Conversion Colors) */
  --marketing-success: #059669;      /* Success indicators, testimonials */
  --marketing-success-light: #ECFDF5; /* Success backgrounds */
  
  /* Energy & Action (CTA Colors) */
  --marketing-cta: #EA580C;          /* Primary CTAs, urgency */
  --marketing-cta-hover: #DC2626;    /* CTA hover states */
  --marketing-cta-light: #FFF7ED;    /* CTA backgrounds */
  
  /* Professional Neutrals */
  --marketing-text-primary: #1E293B;   /* Headlines, key copy */
  --marketing-text-secondary: #64748B; /* Supporting copy */
  --marketing-text-muted: #94A3B8;     /* Captions, meta info */
  
  /* Marketing Backgrounds */
  --marketing-bg-primary: #FFFFFF;     /* Clean white base */
  --marketing-bg-secondary: #F8FAFC;   /* Section alternating */
  --marketing-bg-accent: #F1F5F9;      /* Feature highlights */
}
```

## Typography Scale (Marketing Impact)

```css
/* Marketing Typography - MANDATORY CLASSES */
.marketing-hero-xl {
  font-size: 4rem;        /* 64px - Hero headlines */
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--marketing-text-primary);
}

.marketing-hero-lg {
  font-size: 3rem;        /* 48px - Section headlines */
  font-weight: 700;
  line-height: 1.2;
  color: var(--marketing-text-primary);
}

.marketing-headline {
  font-size: 2rem;        /* 32px - Card/feature headlines */
  font-weight: 600;
  line-height: 1.3;
  color: var(--marketing-text-primary);
}

.marketing-subhead {
  font-size: 1.25rem;     /* 20px - Subheadings */
  font-weight: 500;
  line-height: 1.4;
  color: var(--marketing-text-secondary);
}

.marketing-body-lg {
  font-size: 1.125rem;    /* 18px - Important body text */
  line-height: 1.6;
  color: var(--marketing-text-secondary);
}

.marketing-body {
  font-size: 1rem;        /* 16px - Standard body */
  line-height: 1.6;
  color: var(--marketing-text-secondary);
}

.marketing-caption {
  font-size: 0.875rem;    /* 14px - Captions, meta */
  color: var(--marketing-text-muted);
}
```

## Marketing Component Library (Enforced Usage)

### Hero Section Component
```tsx
// REQUIRED: Use this component for all hero sections
interface MarketingHeroProps {
  headline: string;
  subheadline: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  badge?: string;
}

export const MarketingHero: React.FC<MarketingHeroProps> = ({
  headline, subheadline, primaryCTA, secondaryCTA, badge
}) => (
  <section className="hero-section">
    {badge && <Badge className="marketing-badge">{badge}</Badge>}
    <h1 className="marketing-hero-xl">{headline}</h1>
    <p className="marketing-body-lg marketing-subtext">{subheadline}</p>
    <div className="cta-group">
      <Button className="marketing-cta-primary" href={primaryCTA.href}>
        {primaryCTA.text}
      </Button>
      {secondaryCTA && (
        <Button className="marketing-cta-secondary" href={secondaryCTA.href}>
          {secondaryCTA.text}
        </Button>
      )}
    </div>
  </section>
);
```

### Marketing Button System (ENFORCED)
```css
/* REQUIRED: All marketing buttons must use these classes */
.marketing-cta-primary {
  background: var(--marketing-cta);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.875rem 1.5rem; /* 14px 24px */
  border-radius: 0.5rem; /* 8px */
  border: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--marketing-cta-hover);
    transform: translateY(-1px);
  }
}

.marketing-cta-secondary {
  background: transparent;
  color: var(--marketing-primary);
  font-size: 1rem;
  font-weight: 600;
  padding: 0.875rem 1.5rem;
  border: 2px solid var(--marketing-primary);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--marketing-primary);
    color: white;
  }
}

.marketing-button-outline {
  background: transparent;
  color: var(--marketing-text-primary);
  border: 1px solid #E2E8F0;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  
  &:hover {
    background: var(--marketing-bg-secondary);
    border-color: var(--marketing-primary);
  }
}
```

### Marketing Card System
```tsx
// REQUIRED: Use MarketingCard for all feature/benefit cards
interface MarketingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
  cta?: {
    text: string;
    href: string;
  };
}

export const MarketingCard: React.FC<MarketingCardProps> = ({
  icon, title, description, features, cta
}) => (
  <Card className="marketing-feature-card">
    <CardHeader>
      <div className="marketing-card-icon">{icon}</div>
      <h3 className="marketing-headline">{title}</h3>
    </CardHeader>
    <CardContent>
      <p className="marketing-body">{description}</p>
      {features && (
        <ul className="marketing-feature-list">
          {features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      )}
      {cta && (
        <Button className="marketing-button-outline" href={cta.href}>
          {cta.text}
        </Button>
      )}
    </CardContent>
  </Card>
);
```

## Layout System (Marketing-Specific)

### Grid & Spacing
```css
/* Marketing layout containers - REQUIRED */
.marketing-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem; /* 24px */
}

.marketing-section {
  padding: 6rem 0; /* 96px vertical */
}

.marketing-section-compact {
  padding: 4rem 0; /* 64px vertical */
}

/* Marketing grid systems */
.marketing-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem; /* 48px */
}

.marketing-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem; /* 32px */
}

@media (max-width: 768px) {
  .marketing-grid-2,
  .marketing-grid-3 {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
```

## Marketing Page Templates (ENFORCED STRUCTURE)

### Landing Page Template
```tsx
// REQUIRED STRUCTURE for all marketing pages
export const MarketingPageTemplate: React.FC<{
  hero: HeroProps;
  sections: SectionProps[];
  cta: CTAProps;
}> = ({ hero, sections, cta }) => (
  <div className="marketing-page">
    <MarketingNavigation />
    <MarketingHero {...hero} />
    {sections.map((section, idx) => (
      <MarketingSection key={idx} {...section} />
    ))}
    <MarketingCTA {...cta} />
    <MarketingFooter />
  </div>
);
```

## Enforcement Mechanisms

### 1. CSS Linting Rules
```json
// .stylelintrc.json - ENFORCES design system usage
{
  "rules": {
    "declaration-property-value-allowed-list": {
      "color": ["/^var\\(--marketing-/", "transparent", "currentColor"],
      "background-color": ["/^var\\(--marketing-/", "transparent"],
      "font-size": ["/^var\\(--marketing-/", "inherit"]
    }
  }
}
```

### 2. Component Validation
```tsx
// components/marketing/utils/validateProps.ts
export const validateMarketingComponent = (props: any) => {
  const requiredClasses = ['marketing-', 'cta-', 'hero-'];
  const hasValidClasses = requiredClasses.some(prefix => 
    props.className?.includes(prefix)
  );
  
  if (!hasValidClasses) {
    throw new Error('Marketing components must use design system classes');
  }
};
```

### 3. Pre-commit Hooks
```bash
# .husky/pre-commit - BLOCKS commits without design system compliance
#!/bin/sh
npm run lint:design-system
npm run validate:marketing-components
```

## Marketing vs App Distinction

### Marketing Design Goals:
- **Bold & Confident**: Large headlines, strong CTAs, social proof
- **Conversion-Focused**: Clear value props, urgency, trust signals  
- **Storytelling**: Progressive disclosure of benefits and features
- **Professional Authority**: Enterprise-ready aesthetics that build trust

### Visual Differentiation:
- **Larger typography scales** (64px heroes vs 32px app headers)
- **Stronger color contrasts** (Orange CTAs vs Blue app buttons)
- **More generous spacing** (96px sections vs 32px app padding)
- **Bolder visual hierarchy** (High contrast vs subtle app refinement)

This marketing design system ensures every marketing page consistently positions PM33 as the definitive strategic intelligence platform while maintaining clear separation from the productivity-focused app interface.