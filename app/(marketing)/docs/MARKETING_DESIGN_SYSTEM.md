# PM33 Marketing Design System

**File:** `app/frontend/MARKETING_DESIGN_SYSTEM.md`  
**Purpose:** Marketing context design standards using Mantine UI  
**Context:** Clean, professional, conversion-focused design for lead generation  
**RELEVANT FILES:** `app/(marketing)/layout.tsx`, `app/globals.css`, `components/marketing/`

## 🎯 **Marketing Design Philosophy**

**Core Principle:** Professional, clean, conversion-optimized design that builds trust and drives signups.

**NOT PM33 App Design:** Marketing pages use clean, traditional design patterns - NO glass morphism, NO premium animations, NO AI processing indicators.

## 🎨 **Color System**

### **Required Color Tokens** 
```css
/* Use ONLY these marketing colors */
--marketing-primary: #1E40AF;      /* Strategic Blue - headlines, CTAs */
--marketing-primary-hover: #1E3A8A; /* Interactive states */
--marketing-success: #059669;      /* Success indicators, testimonials */
--marketing-cta: #EA580C;          /* Primary CTAs, urgency */
--marketing-cta-hover: #DC2626;    /* CTA hover states */

/* Professional Neutrals */
--marketing-text-primary: #1E293B;   /* Headlines, key copy */
--marketing-text-secondary: #64748B; /* Supporting copy */
--marketing-text-muted: #94A3B8;     /* Captions, meta info */

/* Clean Backgrounds */
--marketing-bg-primary: #FFFFFF;     /* Clean white base */
--marketing-bg-secondary: #F8FAFC;   /* Section alternating */
--marketing-bg-accent: #F1F5F9;      /* Feature highlights */
```

## 🧩 **Mantine UI Framework**

### **Component Usage Patterns**

**Container Layout:**
```tsx
<Container size={1200} px={24} py={80}>
  {/* Marketing content with generous spacing */}
</Container>
```

**Marketing Cards:**
```tsx
<Card 
  shadow="md" 
  padding={32} 
  radius={16}
  style={{ 
    backgroundColor: 'var(--marketing-bg-primary)',
    border: '1px solid rgba(0, 0, 0, 0.08)'
  }}
>
  <Title order={1} c="var(--marketing-text-primary)">
    Professional Headline
  </Title>
  <Text c="var(--marketing-text-secondary)">
    Clear, benefit-focused copy
  </Text>
</Card>
```

**Conversion-Focused Buttons:**
```tsx
<Button 
  size="lg"
  style={{ 
    backgroundColor: 'var(--marketing-primary)',
    ':hover': { backgroundColor: 'var(--marketing-primary-hover)' }
  }}
>
  Start Free Trial
</Button>
```

## 📐 **Layout Principles**

### **Spacing System**
- **Generous Padding:** `py={80}` for sections (conversion optimization)
- **Container Width:** `1200px` maximum for readability
- **Card Padding:** `32px` for breathing room
- **Button Spacing:** `gap={24}` between CTA groups

### **Typography Hierarchy**
```tsx
// Headlines
<Title order={1} size="48px" fw={700} c="var(--marketing-text-primary)">
  Primary Headline
</Title>

// Section Headers  
<Title order={2} size="32px" fw={600} mb={24}>
  Section Header
</Title>

// Body Copy
<Text size="lg" c="var(--marketing-text-secondary)" maw={600}>
  Clear, benefit-focused description text
</Text>
```

## ✅ **Marketing Component Checklist**

### **REQUIRED for Every Marketing Component:**
- [ ] Uses Mantine UI components exclusively
- [ ] Applies `.marketing-context` class styling
- [ ] Uses marketing color tokens (`--marketing-*`)
- [ ] Clean, professional design (NO glass morphism)
- [ ] Conversion-focused layout with generous spacing
- [ ] SEO-optimized semantic structure
- [ ] Mobile-responsive design

### **FORBIDDEN in Marketing Context:**
- ❌ PM33 glass morphism cards (`.pm33-glass-card`)
- ❌ Premium animations (`.pm33-animate-*`)
- ❌ AI processing indicators (`.pm33-ai-processing`)
- ❌ Backdrop filters or dramatic shadows
- ❌ Core app navigation elements

## 🔧 **Development Guidelines**

### **File Structure**
```
app/(marketing)/
├── layout.tsx           # Marketing context wrapper
├── page.tsx            # Homepage
├── pricing/page.tsx    # Pricing page
├── features/page.tsx   # Features page
└── contact/page.tsx    # Contact page

components/marketing/
├── DesignSystemProvider.tsx  # Marketing theme provider
└── MarketingNavigation.tsx   # Marketing-specific nav
```

### **Context Class Usage**
```tsx
// Marketing pages automatically get this class
<body className="marketing-context">
  <MantineWrapper>
    <DesignSystemProvider context="marketing">
      {children}
    </DesignSystemProvider>
  </MantineWrapper>
</body>
```

### **Testing Commands**
```bash
# Test marketing design compliance
npm run test:marketing

# Visual regression testing
npm run test:visual

# Marketing + app contexts
npm run test:design-systems
```

## 📊 **Performance Standards**

### **Marketing Page Requirements:**
- **Load Time:** < 3s on 3G connection
- **SEO Score:** > 95 (Google Lighthouse)
- **Accessibility:** WCAG 2.1 AA compliant
- **Conversion Optimization:** Clear CTA hierarchy

### **Browser Support:**
- Chrome 90+, Firefox 88+, Safari 14+
- Mobile: iOS Safari 14+, Android Chrome 90+

## 🎯 **Conversion Optimization**

### **CTA Button Guidelines**
```tsx
// Primary CTA (above the fold)
<Button 
  size="xl"
  style={{ 
    backgroundColor: 'var(--marketing-cta)',
    fontSize: '18px',
    padding: '16px 32px'
  }}
>
  Start Your Free 14-Day Trial
</Button>

// Secondary CTA
<Button 
  size="lg" 
  variant="outline"
  style={{ 
    borderColor: 'var(--marketing-primary)',
    color: 'var(--marketing-primary)'
  }}
>
  Schedule Demo
</Button>
```

### **Trust Signal Integration**
```tsx
<Stack gap={16}>
  <Badge color="var(--marketing-success)" size="lg">
    ✓ No Credit Card Required
  </Badge>
  <Badge color="var(--marketing-success)" size="lg">
    ✓ 14-Day Free Trial
  </Badge>
  <Badge color="var(--marketing-success)" size="lg">
    ✓ Cancel Anytime
  </Badge>
</Stack>
```

## 📱 **Responsive Design**

### **Breakpoint Strategy**
```tsx
// Mobile-first responsive grid
<Grid>
  <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
    {/* Feature card */}
  </Grid.Col>
</Grid>

// Typography scaling
<Title 
  order={1} 
  size={{ base: '32px', md: '48px', lg: '56px' }}
>
  Responsive Headline
</Title>
```

---

**Remember:** Marketing pages are about **trust, clarity, and conversion** - not showcasing technical prowess. Keep it clean, professional, and focused on user benefits.