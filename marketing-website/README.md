# PM33 Marketing Website

**⚠️ IMPORTANT: Marketing-Only Directory**

This directory contains **ONLY** marketing website components and files. It is completely separate from the core PM33 application and has **zero dependencies** on core app files.

## 🚫 **Strict Rules**

- **NO imports** from core app files (`app/(app)/`, root layout, etc.)
- **NO modifications** to any existing core app files  
- **NO references** to core app infrastructure
- **ONLY** self-contained marketing components

## 📁 **Directory Structure**

```
marketing-website/
├── components/           # Marketing-specific components
│   ├── navigation/      # Marketing navigation (no core deps)
│   ├── layouts/         # Marketing layouts (independent)
│   └── ui/             # Marketing UI components
├── pages/              # Marketing pages (standalone)
│   ├── pricing/        # Pricing page
│   ├── about/          # About page  
│   ├── resources/      # Resources page
│   └── homepage/       # Homepage components
├── lib/                # Marketing utilities
│   └── design-system.ts # Marketing design system
├── styles/             # Marketing-specific styles
└── index.html          # Standalone marketing website demo
```

## 🎨 **Design System**

Uses `PM33_DESIGN` object with marketing-specific colors:

```typescript
PM33_DESIGN.colors.marketing = {
  primary: '#1E40AF',      // Strategic Blue
  secondary: '#059669',    // Success Green  
  cta: '#EA580C',         // CTA Orange
  text: {
    primary: '#1E293B',    // Dark text
    secondary: '#64748B',  // Medium text
    inverse: '#FFFFFF'     // White text
  },
  bg: {
    primary: '#FFFFFF',    // White background
    secondary: '#F8FAFC',  // Light gray
    accent: '#EFF6FF'      // Blue tint
  }
}
```

## 🚀 **Usage**

### Standalone HTML Demo
```bash
open marketing-website/index.html
```

### React Components  
```typescript
import { MarketingNavigation } from './components/navigation/MarketingNavigation';
import { PM33_DESIGN } from './lib/design-system';

// Use marketing design system
const primaryColor = PM33_DESIGN.colors.marketing.primary;
```

## ✅ **What's Included**

- **Self-contained navigation** (no core app dependencies)
- **Marketing design system** (independent color palette)  
- **Standalone pricing page** (no Mantine dependencies)
- **Complete HTML demo** (works without Next.js)
- **Theme switching** (light/dark mode support)

## 🔧 **Development**

All marketing development happens in this directory:

1. Create new components in `components/`
2. Add pages in `pages/` 
3. Use `lib/design-system.ts` for styling
4. Test with `index.html` standalone demo

## 🎯 **Benefits**

- **Clean separation** from core app
- **Independent evolution** of marketing site
- **No accidental core modifications**  
- **Easy to understand boundaries**
- **Self-contained testing**

---

**Remember**: This marketing website is completely independent. Any references to core app files violates the separation boundary.