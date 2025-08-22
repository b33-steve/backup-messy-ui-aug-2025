# PM33 Theme System - Quick Reference Guide

**Location**: `/app/frontend/THEME_QUICK_REFERENCE.md`

**Purpose**: Quick lookup for developers to choose the right theme documentation

## 🚀 **Quick Decision Tree**

### **"What am I building?"**

```
Are you working on...

📈 MARKETING PAGES?
├── Homepage, pricing, features, about
├── Lead generation, conversion focus
├── Pre-login user experience
└── → Use MARKETING_THEME_GUIDE.md

🎯 PM33 APP PAGES?  
├── Dashboard, strategic intelligence, PMO tools
├── Post-login user experience
├── Premium functionality, AI features
└── → Use APP_THEME_GUIDE.md
```

## 📚 **Documentation Map**

| Context | Primary Guide | Component Standards | Code Patterns |
|---------|---------------|-------------------|---------------|
| **Marketing** | `MARKETING_THEME_GUIDE.md` | `MARKETING_DESIGN_SYSTEM.md` | `.marketing-context` + Mantine UI |
| **PM33 App** | `APP_THEME_GUIDE.md` | `APP_DESIGN_SYSTEM.md` | `ThemeProvider` + shadcn/ui + PM33 |

## ⚡ **Quick Implementation**

### **Marketing Page Setup**
```tsx
// 1. Wrap in marketing context
<div className="marketing-context">

// 2. Use Mantine components
import { Container, Card, Button } from '@mantine/core';

// 3. Use marketing colors
backgroundColor: 'var(--marketing-primary)'
```

### **PM33 App Page Setup**  
```tsx
// 1. Use ThemeProvider (already in layout)
import { useTheme } from '@/providers/ThemeProvider';

// 2. Use shadcn/ui + PM33 components
import { Button } from '@/components/ui/button';

// 3. Use PM33 styling
className="pm33-glass-card pm33-animate-glow"
```

## 🎨 **Color Reference**

### **Marketing Colors**
```css
--marketing-primary: #1E40AF        /* Strategic blue */
--marketing-cta: #EA580C            /* Action orange */
--marketing-success: #059669        /* Trust green */
--marketing-text-primary: #1E293B   /* Professional text */
--marketing-bg-primary: #FAFBFF     /* Clean background */
```

### **PM33 Colors** 
```css
--pm33-brand: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--pm33-ai-glow: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)
--pm33-glass: rgba(255, 255, 255, 0.1)
--pm33-text-primary: #0f172a        /* Dark theme default */
--pm33-bg-primary: #0a0e27          /* Dark theme default */
```

## 🔧 **Component Quick Lookup**

### **Buttons**
```tsx
/* Marketing Button */
<Button 
  size="lg"
  style={{ backgroundColor: 'var(--marketing-primary)' }}
>
  Start Free Trial
</Button>

/* PM33 App Button */
<button className="pm33-btn-primary">
  Process with AI
</button>
```

### **Cards**
```tsx
/* Marketing Card */
<Card shadow="md" padding={32} radius={16}>
  <Title c="var(--marketing-text-primary)">
    Clean Professional Card
  </Title>
</Card>

/* PM33 App Card */
<div className="pm33-glass-card pm33-animate-float">
  <h3 className="pm33-text-gradient">
    Premium Glass Morphism Card
  </h3>
</div>
```

## 🎯 **Theme Options (PM33 App Only)**

PM33 app supports **3 theme options**:

1. **Light Theme**: Professional daytime interface
2. **Dark Theme**: Strategic intelligence focus (default)  
3. **Native Theme**: Premium gradient experience

```tsx
import { ThemeSwitcher } from '@/providers/ThemeProvider';

// Add theme switcher to any app page
<ThemeSwitcher />
```

## ❌ **Common Mistakes**

### **Wrong Context Usage**
```tsx
// ❌ DON'T: Mantine in PM33 app  
import { Button } from '@mantine/core'; // In app/(app)/

// ❌ DON'T: PM33 components in marketing
<div className="pm33-glass-card"> // In app/(marketing)/

// ❌ DON'T: Mixed color tokens
backgroundColor: 'var(--pm33-brand)' // In marketing context
```

### **Missing Context Wrappers**
```tsx
// ❌ DON'T: No context class
<Container size={1200}>

// ✅ DO: Proper context wrapper  
<div className="marketing-context">
  <Container size={1200}>
```

## 🔍 **File Structure Reference**

```
app/frontend/
├── MARKETING_THEME_GUIDE.md      ← Marketing theme usage
├── APP_THEME_GUIDE.md            ← PM33 app theme usage
├── THEME_QUICK_REFERENCE.md      ← This file
├── 
├── app/(marketing)/              ← Marketing pages
├── app/(app)/                    ← PM33 app pages
├── 
├── providers/ThemeProvider.tsx   ← PM33 theme system
├── theme/index.ts               ← Theme configuration
└── globals.css                  ← Unified color system
```

## 🚀 **Getting Started Checklist**

### **Before Writing Any Component:**
- [ ] Determined context (Marketing vs PM33 App)
- [ ] Read appropriate theme guide
- [ ] Imported correct component library
- [ ] Applied correct context wrapper
- [ ] Used appropriate color tokens

### **Marketing Component Checklist:**
- [ ] Used `.marketing-context` wrapper
- [ ] Imported from `@mantine/core`
- [ ] Applied `--marketing-*` color tokens
- [ ] Clean, professional styling
- [ ] Conversion-focused design

### **PM33 App Component Checklist:**
- [ ] Used `ThemeProvider` context
- [ ] Imported from `@/components/ui/*`  
- [ ] Applied `pm33-*` CSS classes
- [ ] Glass morphism styling
- [ ] Premium animations/interactions

---

**🎯 Remember**: Marketing converts leads, PM33 app delivers PMO transformation. Choose the right theme system for your context!