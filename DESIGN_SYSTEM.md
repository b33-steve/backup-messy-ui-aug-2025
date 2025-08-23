# PM33 Design System - Official UI Standards

**Version**: 1.0  
**Last Updated**: 2025-08-22  
**Status**: ✅ PRODUCTION STANDARD

---

## 🎯 **DESIGN PHILOSOPHY**

PM33 follows a **professional B2B SaaS aesthetic** that conveys trust, reliability, and enterprise-grade quality. We prioritize:

- **Clarity over creativity**
- **Function over form**
- **Consistency over customization**
- **Accessibility over aesthetics**

---

## 🚨 **MANDATORY RULES**

### ✅ **REQUIRED**
- Use **ONLY** shadcn/ui components from `/components/ui/`
- Follow shadcn/ui default color palette (zinc, slate, neutral)
- Maintain consistent spacing using Tailwind's 8pt grid system
- Implement proper dark/light mode support
- Use lucide-react icons exclusively
- Follow semantic HTML patterns

### ❌ **FORBIDDEN**
- Custom gradient backgrounds (unless pre-approved)
- Purple gaming-style color schemes
- Glass morphism effects
- Custom CSS animations (use shadcn/ui built-ins)
- Non-shadcn/ui component libraries
- Inconsistent spacing or typography

---

## 🎨 **COLOR PALETTE**

### **Primary Colors (shadcn/ui defaults)**
```css
/* These are automatically provided by shadcn/ui theme */
--background: hsl(0 0% 100%);           /* Clean white */
--foreground: hsl(222.2 84% 4.9%);     /* Near black text */
--card: hsl(0 0% 100%);                /* Card backgrounds */
--card-foreground: hsl(222.2 84% 4.9%); /* Card text */
--popover: hsl(0 0% 100%);             /* Popover backgrounds */
--popover-foreground: hsl(222.2 84% 4.9%); /* Popover text */
--primary: hsl(221.2 83.2% 53.3%);     /* Primary actions */
--primary-foreground: hsl(210 40% 98%); /* Primary text */
--secondary: hsl(210 40% 96%);          /* Secondary backgrounds */
--secondary-foreground: hsl(222.2 84% 4.9%); /* Secondary text */
--muted: hsl(210 40% 96%);              /* Muted backgrounds */
--muted-foreground: hsl(215.4 16.3% 46.9%); /* Muted text */
--accent: hsl(210 40% 96%);             /* Accent backgrounds */
--accent-foreground: hsl(222.2 84% 4.9%); /* Accent text */
--destructive: hsl(0 84.2% 60.2%);     /* Error states */
--destructive-foreground: hsl(210 40% 98%); /* Error text */
--border: hsl(214.3 31.8% 91.4%);      /* Border colors */
--input: hsl(214.3 31.8% 91.4%);       /* Input borders */
--ring: hsl(221.2 83.2% 53.3%);        /* Focus rings */
```

### **Usage Guidelines**
- **Primary**: CTA buttons, active states, brand elements
- **Secondary**: Secondary actions, backgrounds
- **Muted**: Disabled states, subtle backgrounds
- **Destructive**: Error messages, delete actions
- **Border**: All borders, dividers, input outlines

---

## 📐 **SPACING SYSTEM**

### **8pt Grid System (Tailwind)**
```css
/* Use these Tailwind classes exclusively */
.space-y-2  /* 8px vertical spacing */
.space-y-4  /* 16px vertical spacing */
.space-y-6  /* 24px vertical spacing */
.space-y-8  /* 32px vertical spacing */

.p-4       /* 16px padding */
.p-6       /* 24px padding */
.p-8       /* 32px padding */

.m-4       /* 16px margin */
.m-6       /* 24px margin */
.m-8       /* 32px margin */
```

### **Container Sizes**
```css
.max-w-7xl    /* Main page containers (1280px) */
.max-w-4xl    /* Content containers (896px) */
.max-w-2xl    /* Text containers (672px) */
```

---

## 🧩 **COMPONENT LIBRARY**

### **MANDATORY shadcn/ui Components**

All components MUST come from `/components/ui/`:

```tsx
// ✅ CORRECT - shadcn/ui imports
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

// ❌ FORBIDDEN - Custom or third-party components
import { Button } from '@mantine/core';           // Wrong library
import CustomButton from './CustomButton';        // Custom components
```

---

## 📋 **COMPONENT EXAMPLES**

### **✅ CORRECT IMPLEMENTATIONS**

#### **Page Layout**
```tsx
export default function PageName() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-primary mr-3" />
              <span className="text-xl font-semibold">PM33</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Content here */}
        </div>
      </div>
    </div>
  );
}
```

#### **Form Components**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Form Title</CardTitle>
  </CardHeader>
  <CardContent className="space-y-6">
    <div className="space-y-2">
      <Label htmlFor="input-id">Field Label</Label>
      <Input
        id="input-id"
        placeholder="Enter value..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
    
    <div className="space-y-2">
      <Label htmlFor="select-id">Selection</Label>
      <Select value={selection} onValueChange={setSelection}>
        <SelectTrigger>
          <SelectValue placeholder="Choose option..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <Button type="submit" className="w-full">
      Submit
    </Button>
  </CardContent>
</Card>
```

#### **Status Displays**
```tsx
{/* Success state */}
<Alert>
  <CheckCircle className="h-4 w-4" />
  <AlertDescription>
    Operation completed successfully.
  </AlertDescription>
</Alert>

{/* Error state */}
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertDescription>
    There was an error processing your request.
  </AlertDescription>
</Alert>

{/* Status badges */}
<Badge variant="default">Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="outline">Draft</Badge>
```

#### **Loading States**
```tsx
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      Processing...
    </>
  ) : (
    <>
      <Send className="w-4 h-4 mr-2" />
      Submit
    </>
  )}
</Button>
```

---

### **❌ INCORRECT IMPLEMENTATIONS**

#### **Custom Gradients (FORBIDDEN)**
```tsx
// ❌ WRONG - Custom purple gradients
<div style={{ 
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white'
}}>
  Content with custom gradient
</div>

// ✅ CORRECT - shadcn/ui styling
<Card>
  <CardContent>
    Content with proper theming
  </CardContent>
</Card>
```

#### **Glass Morphism (FORBIDDEN)**
```tsx
// ❌ WRONG - Glass morphism effects
<div className="backdrop-blur-lg bg-white/10 border-white/20">
  Glass morphism card
</div>

// ✅ CORRECT - Standard card
<Card>
  <CardContent>
    Standard card content
  </CardContent>
</Card>
```

#### **Custom Animations (FORBIDDEN)**
```tsx
// ❌ WRONG - Custom Framer Motion animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Animated content
</motion.div>

// ✅ CORRECT - CSS transitions only
<div className="transition-all duration-300 hover:bg-muted">
  Content with simple transition
</div>
```

---

## 🎭 **THEMING**

### **Dark Mode Support**
All components automatically support dark mode via shadcn/ui theming:

```tsx
// ✅ CORRECT - Automatic theme support
<div className="bg-background text-foreground">
  <Card>
    <CardContent>
      Content automatically adapts to light/dark theme
    </CardContent>
  </Card>
</div>
```

### **Theme Toggle Implementation**
```tsx
import { useTheme } from 'next-themes';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

---

## 🔤 **TYPOGRAPHY**

### **Text Hierarchy**
```tsx
{/* Page titles */}
<h1 className="text-4xl font-bold tracking-tight text-foreground">
  Page Title
</h1>

{/* Section headers */}
<h2 className="text-2xl font-semibold text-foreground">
  Section Header  
</h2>

{/* Card titles */}
<CardTitle className="text-xl font-semibold">
  Card Title
</CardTitle>

{/* Body text */}
<p className="text-base text-muted-foreground">
  Body text content
</p>

{/* Small text */}
<p className="text-sm text-muted-foreground">
  Small descriptive text
</p>
```

---

## 🎛️ **INTERACTIVE STATES**

### **Button States**
```tsx
{/* Primary action */}
<Button variant="default">Primary Action</Button>

{/* Secondary action */}
<Button variant="secondary">Secondary Action</Button>

{/* Outline style */}
<Button variant="outline">Outline Button</Button>

{/* Ghost style */}
<Button variant="ghost">Ghost Button</Button>

{/* Destructive action */}
<Button variant="destructive">Delete</Button>

{/* Disabled state */}
<Button disabled>Disabled Button</Button>
```

### **Form States**
```tsx
{/* Default input */}
<Input placeholder="Enter text..." />

{/* Error state */}
<Input className="border-destructive focus-visible:ring-destructive" />

{/* Success state */}
<Input className="border-green-500 focus-visible:ring-green-500" />

{/* Disabled state */}
<Input disabled placeholder="Disabled input" />
```

---

## 📱 **RESPONSIVE DESIGN**

### **Breakpoint Usage**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</div>

<div className="px-4 sm:px-6 lg:px-8">
  {/* Responsive padding */}
</div>

<div className="text-sm sm:text-base lg:text-lg">
  {/* Responsive text */}
</div>
```

---

## ♿ **ACCESSIBILITY**

### **Required Patterns**
```tsx
{/* Form labels */}
<Label htmlFor="input-id">Field Label</Label>
<Input id="input-id" />

{/* Button accessibility */}
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

{/* Focus management */}
<Button className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  Accessible Button
</Button>
```

---

## 🧪 **TESTING REQUIREMENTS**

### **Visual Testing**
Every component must pass:
- ✅ Light mode rendering
- ✅ Dark mode rendering  
- ✅ Mobile viewport (375px)
- ✅ Desktop viewport (1280px)
- ✅ Keyboard navigation
- ✅ Screen reader compatibility

### **Playwright Tests**
```typescript
// Required test patterns
test('component renders correctly', async ({ page }) => {
  await page.goto('/component-page');
  await expect(page.locator('[data-testid="component"]')).toBeVisible();
});

test('component works in dark mode', async ({ page }) => {
  await page.goto('/component-page');
  await page.click('[data-testid="theme-toggle"]');
  await expect(page).toHaveScreenshot('component-dark.png');
});
```

---

## 📚 **COMPONENT REFERENCE**

### **Available shadcn/ui Components**
Located in `/components/ui/`:

- ✅ `alert.tsx` - Status messages
- ✅ `badge.tsx` - Status indicators  
- ✅ `button.tsx` - Actions
- ✅ `card.tsx` - Content containers
- ✅ `input.tsx` - Text inputs
- ✅ `label.tsx` - Form labels
- ✅ `progress.tsx` - Progress indicators
- ✅ `select.tsx` - Dropdowns
- ✅ `separator.tsx` - Visual dividers
- ✅ `skeleton.tsx` - Loading placeholders
- ✅ `textarea.tsx` - Multi-line inputs

### **Icon Library**
```tsx
// ✅ CORRECT - lucide-react icons only
import { 
  Brain, Send, Target, AlertCircle, CheckCircle, 
  Loader2, X, Settings, User, Bell 
} from 'lucide-react';

// ❌ FORBIDDEN - Other icon libraries
import { IconRocket } from '@tabler/icons-react';  // Wrong library
```

---

## 🚀 **IMPLEMENTATION CHECKLIST**

Before deploying any component:

- [ ] Uses only shadcn/ui components from `/components/ui/`
- [ ] Follows the approved color palette
- [ ] No custom gradients or glass morphism
- [ ] Implements proper dark mode support
- [ ] Uses 8pt grid spacing system
- [ ] Includes proper accessibility attributes
- [ ] Passes Playwright visual tests
- [ ] Works on mobile and desktop
- [ ] Follows semantic HTML structure
- [ ] Uses lucide-react icons only

---

## 🔄 **APPROVAL PROCESS**

### **Design Changes**
Any deviation from this design system requires:
1. **Design review** with project lead
2. **Technical feasibility** assessment  
3. **Accessibility audit** completion
4. **Cross-browser testing** verification
5. **Documentation update** in this file

### **Component Updates**
- New components must follow shadcn/ui patterns
- Existing component modifications require approval
- All changes must maintain backward compatibility

---

## 📞 **SUPPORT**

**Questions?** Reference:
1. [shadcn/ui documentation](https://ui.shadcn.com/)
2. [Tailwind CSS documentation](https://tailwindcss.com/)
3. [Lucide React icons](https://lucide.dev/)
4. This DESIGN_SYSTEM.md file

---

**Remember**: When in doubt, choose the **more conservative**, **more accessible**, and **more standard** option. PM33 prioritizes reliability and professionalism over visual creativity.

---

*Last updated: 2025-08-22 | Version: 1.0*