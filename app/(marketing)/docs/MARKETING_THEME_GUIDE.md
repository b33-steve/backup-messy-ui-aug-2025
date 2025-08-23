# PM33 Marketing Website Theme Guide

**Location**: `/app/frontend/MARKETING_THEME_GUIDE.md`

**Purpose**: Complete guide for implementing theme-aware marketing pages that drive conversion

**Target Audience**: Developers working on marketing pages, landing pages, and lead generation

## 🎯 **Marketing Theme Philosophy**

The marketing website uses a **clean, professional theme system** designed for **conversion optimization** and **enterprise credibility**. Unlike the app's premium glass morphism, marketing pages prioritize **trust, clarity, and conversion**.

## 🎨 **Marketing Color System**

### **Primary Marketing Colors**
```css
/* Strategic Blue - Headlines, CTAs */
--marketing-primary: #1E40AF;          
--marketing-primary-hover: #1E3A8A;   
--marketing-primary-light: #EFF6FF;   

/* Success & Growth - Testimonials, Success Indicators */
--marketing-success: #059669;         
--marketing-success-light: #ECFDF5;   

/* Energy & Action - Primary CTAs, Urgency */
--marketing-cta: #EA580C;            
--marketing-cta-hover: #DC2626;       
--marketing-cta-light: #FFF7ED;       
```

### **Professional Text Colors**
```css
/* Text Hierarchy */
--marketing-text-primary: #1E293B;     /* Headlines, key copy */
--marketing-text-secondary: #64748B;   /* Supporting copy */
--marketing-text-muted: #94A3B8;       /* Captions, meta info */

/* Background System */
--marketing-bg-primary: #FAFBFF;       /* Soft off-white base */
--marketing-bg-secondary: #F1F5F9;     /* Section alternating */
--marketing-bg-accent: #EFF6FF;        /* Feature highlights */
```

## 📋 **Implementation Requirements**

### **1. Marketing Context Class - MANDATORY**
```tsx
// Every marketing page MUST use this wrapper
<div className="marketing-context">
  {/* All marketing content goes here */}
</div>
```

### **2. Mantine Component Usage**
```tsx
import { Container, Card, Title, Text, Button } from '@mantine/core';

// ✅ CORRECT: Marketing-optimized components
const MarketingSection: React.FC = () => {
  return (
    <div className="marketing-context">
      <Container size={1200} px={24} py={80}>
        <Card shadow="md" padding={32} radius={16}>
          <Title order={1} c="var(--marketing-text-primary)">
            Transform Your Product Management
          </Title>
          <Text size="lg" c="var(--marketing-text-secondary)" mb={24}>
            Get PMO-level strategic capabilities without the team or budget.
          </Text>
          <Button 
            size="lg"
            style={{ backgroundColor: 'var(--marketing-primary)' }}
          >
            Start Free Trial
          </Button>
        </Card>
      </Container>
    </div>
  );
};
```

### **3. CTA Button Implementation**
```tsx
// Primary CTA - Strategic Blue
<Button 
  size="lg"
  style={{ 
    backgroundColor: 'var(--marketing-primary)',
    color: 'white'
  }}
>
  Get Started Free
</Button>

// Secondary CTA - Energy Orange
<Button 
  size="lg" 
  variant="outline"
  style={{ 
    backgroundColor: 'var(--marketing-cta)',
    color: 'white',
    borderColor: 'var(--marketing-cta)'
  }}
>
  Schedule Demo
</Button>
```

## 🏗️ **Marketing Page Structure**

### **Hero Section Template**
```tsx
const HeroSection = () => (
  <div className="marketing-context">
    <Container size={1200} px={24} py={120}>
      {/* Hero content with marketing colors */}
      <Title 
        order={1} 
        size="3rem" 
        fw={700}
        c="var(--marketing-text-primary)"
        ta="center"
        mb={24}
      >
        PMO Transformation Platform
      </Title>
      
      <Text 
        size="xl" 
        c="var(--marketing-text-secondary)"
        ta="center"
        mb={48}
        maw={800}
        mx="auto"
      >
        Transform individual Product Managers into fully functional PMOs 
        through agentic AI teams.
      </Text>
      
      <Group justify="center" gap={16}>
        <Button 
          size="xl" 
          style={{ backgroundColor: 'var(--marketing-primary)' }}
        >
          Start Free Trial
        </Button>
        <Button 
          size="xl" 
          variant="outline"
          c="var(--marketing-text-primary)"
        >
          Watch Demo
        </Button>
      </Group>
    </Container>
  </div>
);
```

### **Feature Section Template**
```tsx
const FeatureSection = () => (
  <div className="marketing-context">
    <Container size={1200} px={24} py={80}>
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32}>
        {features.map((feature) => (
          <Card 
            key={feature.id}
            shadow="sm"
            padding={32}
            radius={16}
            style={{
              backgroundColor: 'var(--marketing-bg-primary)',
              border: '1px solid rgba(0,0,0,0.08)'
            }}
          >
            <Title 
              order={3} 
              c="var(--marketing-text-primary)"
              mb={16}
            >
              {feature.title}
            </Title>
            <Text c="var(--marketing-text-secondary)">
              {feature.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  </div>
);
```

### **Social Proof Section**
```tsx
const SocialProofSection = () => (
  <div className="marketing-context">
    <Container size={1200} px={24} py={80}>
      <Card
        padding={48}
        radius={16}
        style={{ 
          backgroundColor: 'var(--marketing-success-light)',
          border: '1px solid var(--marketing-success)'
        }}
      >
        <Title 
          order={2} 
          c="var(--marketing-success)"
          ta="center"
          mb={32}
        >
          Trusted by Product Leaders
        </Title>
        {/* Testimonials with success color scheme */}
      </Card>
    </Container>
  </div>
);
```

## 🚫 **What NOT to Use on Marketing Pages**

### **❌ AVOID: App-Specific Elements**
```tsx
// ❌ DON'T use PM33 glass morphism on marketing pages
<div className="pm33-glass-card">

// ❌ DON'T use PM33 gradient buttons  
<button className="pm33-btn-primary">

// ❌ DON'T use PM33 AI processing indicators
<div className="pm33-ai-processing">

// ❌ DON'T use app theme colors
color: "var(--pm33-brand)"
```

### **✅ USE: Marketing-Specific Elements**
```tsx
// ✅ Clean professional cards
<Card shadow="sm" padding={32} radius={16}>

// ✅ Marketing color tokens
color: "var(--marketing-primary)"
backgroundColor: "var(--marketing-cta)"

// ✅ Marketing context wrapper
<div className="marketing-context">
```

## 📱 **Responsive Marketing Design**

### **Mobile-First Approach**
```tsx
const ResponsiveHero = () => (
  <Container size={1200} px={{ base: 16, sm: 24 }}>
    <Title 
      order={1}
      size={{ base: '2rem', sm: '2.5rem', md: '3rem' }}
      c="var(--marketing-text-primary)"
    >
      Mobile-Optimized Headline
    </Title>
    
    <SimpleGrid 
      cols={{ base: 1, sm: 2, md: 3 }}
      spacing={{ base: 16, sm: 24, md: 32 }}
    >
      {/* Responsive grid content */}
    </SimpleGrid>
  </Container>
);
```

## 🎯 **Conversion-Focused Patterns**

### **Primary CTA Pattern**
```tsx
// Above-the-fold primary CTA
<Button 
  size="xl"
  style={{ 
    backgroundColor: 'var(--marketing-primary)',
    fontSize: '16px',
    fontWeight: 600,
    padding: '16px 32px'
  }}
>
  Start Free Trial - No Credit Card
</Button>
```

### **Secondary CTA Pattern**
```tsx
// Supporting/alternative action CTA
<Button 
  size="lg"
  style={{ 
    backgroundColor: 'var(--marketing-cta)',
    color: 'white'
  }}
>
  Schedule 15-Min Demo
</Button>
```

### **Trust Signal Colors**
```tsx
// Use success colors for trust indicators
<Group>
  <Text c="var(--marketing-success)" fw={600}>
    ✓ No Setup Required
  </Text>
  <Text c="var(--marketing-success)" fw={600}>
    ✓ 14-Day Free Trial
  </Text>
  <Text c="var(--marketing-success)" fw={600}>
    ✓ Cancel Anytime
  </Text>
</Group>
```

## 📊 **A/B Testing Support**

### **Color Variant Testing**
```tsx
// Support for CTA color testing
const ctaVariant = useABTest('cta-color', {
  control: 'var(--marketing-primary)',
  variant: 'var(--marketing-cta)'
});

<Button style={{ backgroundColor: ctaVariant }}>
  Get Started
</Button>
```

## 🔍 **SEO-Optimized Theme Usage**

### **Semantic Color Usage**
```tsx
// Use semantic HTML with marketing colors
<header style={{ backgroundColor: 'var(--marketing-bg-primary)' }}>
  <nav>
    <Title order={1} c="var(--marketing-text-primary)">
      PM33
    </Title>
  </nav>
</header>

<main>
  <section style={{ backgroundColor: 'var(--marketing-bg-accent)' }}>
    {/* Feature section */}
  </section>
</main>

<footer style={{ backgroundColor: 'var(--marketing-text-primary)' }}>
  {/* Footer with inverted colors */}
</footer>
```

## ✅ **Marketing Theme Checklist**

### **Before Publishing Any Marketing Page**
- [ ] Page wrapped in `marketing-context` class
- [ ] Using only marketing color tokens (`--marketing-*`)
- [ ] CTAs use appropriate marketing colors
- [ ] No PM33 app-specific styling (glass morphism, gradients)
- [ ] Responsive design tested on mobile/tablet
- [ ] Trust signals use success colors
- [ ] Text hierarchy uses marketing text colors
- [ ] Cards use clean professional styling (no glass effects)

### **Performance Checklist**
- [ ] Colors load without FOUC (Flash of Unstyled Content)
- [ ] Marketing context forces light mode properly
- [ ] No theme switching allowed on marketing pages
- [ ] Professional appearance maintained across all browsers

## 🚀 **Marketing Page Examples**

### **Landing Page Pattern**
```tsx
export default function LandingPage() {
  return (
    <div className="marketing-context">
      <HeroSection />
      <FeatureSection />
      <SocialProofSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
```

### **Product Page Pattern**
```tsx
export default function ProductPage() {
  return (
    <div className="marketing-context">
      <ProductHero />
      <BenefitsGrid />
      <ComparisonTable />
      <DemoSection />
      <ConversionFooter />
    </div>
  );
}
```

---

**Remember**: Marketing pages prioritize **conversion and trust** over visual effects. Keep it clean, professional, and focused on user action.