# CLAUDE CODE ENFORCEMENT INSTRUCTIONS FOR PM33

## 🚨 CRITICAL ENFORCEMENT RULES

### MANDATORY PRE-WORK CHECKLIST
Before ANY code changes, Claude Code MUST:

1. **Read Context-Specific Documentation:**
   - **Marketing Pages**: Read `app/(marketing)/docs/MARKETING_THEME_GUIDE.md` 
   - **Core App Pages**: Read `app/(app)/docs/APP_THEME_GUIDE.md`
   - **Shared Standards**: Read `docs/shared/PM33_COMPLETE_UI_SYSTEM.md`

2. **Confirm Understanding:**
   - State explicitly: "I am working on [MARKETING/APP] context"
   - Reference the appropriate design system documentation
   - Confirm component standards before implementation

### AUTOMATIC REJECTION TRIGGERS

These patterns will cause IMMEDIATE rejection:

```tsx
// ❌ REJECTED - Solid black borders
border: '1px solid black'
border: '1px solid #000'

// ❌ REJECTED - Basic cards without glass morphism  
<div className="border p-4">

// ❌ REJECTED - Buttons without gradients
<button className="bg-gray-500">

// ❌ REJECTED - Basic spinners instead of AI processing
<Spinner />
<div className="animate-spin">

// ❌ REJECTED - Forms without AI pre-filling
<input placeholder="Enter value..." />

// ❌ REJECTED - Actions without impact preview
<Button onClick={handleSubmit}>Submit</Button>
```

### REQUIRED COMPONENT HEADERS

Every component MUST include this header:

```tsx
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

### MANDATORY PATTERNS

#### Glass Morphism Cards (REQUIRED)
```tsx
const PM33Card = ({ children, className }) => (
  <div 
    className={`pm33-glass-card ${className}`}
    style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(40px) saturate(150%)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      borderRadius: '16px',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }}
  >
    {children}
  </div>
);
```

#### AI Processing States (NO BASIC SPINNERS)
```tsx
const AIProcessingState = ({ message }) => (
  <div className="flex flex-col items-center p-12">
    <div className="relative w-32 h-32 mb-8">
      {/* Animated AI Brain with glow effects */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 animate-ping" />
      <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <BrainIcon className="w-16 h-16 text-white animate-pulse" />
      </div>
    </div>
    <p className="text-lg font-medium bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
      {message}
    </p>
  </div>
);
```

#### Premium Buttons (REQUIRED)
```tsx
const PM33Button = ({ variant = 'primary', children, ...props }) => (
  <button
    className="px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105"
    style={{
      background: variant === 'primary' 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : 'rgba(255,255,255,0.05)',
      boxShadow: variant === 'primary'
        ? '0 4px 15px 0 rgba(102,126,234,0.4)'
        : '0 2px 8px 0 rgba(0,0,0,0.1)',
      color: 'white'
    }}
    {...props}
  >
    {children}
  </button>
);
```

### PLAYWRIGHT TEST REQUIREMENTS

Every component change MUST be followed by:

```bash
# Run UI compliance tests
npx playwright test tests/pm33-ui-compliance.spec.ts --project=chromium

# Visual regression tests  
npx playwright test tests/visual-pm33-design.spec.ts --project=chromium

# Component-specific tests
npx playwright test tests/[component-name].spec.ts --project=chromium
```

### DUAL FRAMEWORK ENFORCEMENT

#### Marketing Context (`app/(marketing)/`)
- **Framework**: Mantine UI 8.2.5 exclusively
- **Icons**: @tabler/icons-react
- **Styling**: `.marketing-context` class, `--marketing-*` colors
- **Design**: Clean, professional (no glass morphism)

#### Core App Context (`app/(app)/`)  
- **Framework**: shadcn/ui (Radix UI primitives) + Tailwind CSS
- **Icons**: lucide-react
- **Styling**: `--pm33-*` colors, glass morphism required
- **Design**: Premium animations and AI intelligence visible

### WORKFLOW ENFORCEMENT

1. **Read Documentation First** - Always read context-specific guides
2. **Test Immediately** - Run Playwright tests after every change
3. **Visual Validation** - Take screenshots, ensure premium quality
4. **No Exceptions** - Every rule must be followed exactly

### SUCCESS CRITERIA

Code is acceptable when:
- ✅ All Playwright tests pass (100% success rate)
- ✅ Screenshots could be featured on Dribbble
- ✅ Looks NOTHING like Jira/Asana/Monday
- ✅ Has "wow factor" within 5 seconds
- ✅ Feels like a $500/month premium tool
- ✅ AI intelligence is visually apparent

### EMERGENCY REJECTION PROCEDURE

If ANY violation is detected:
1. **STOP** all work immediately
2. **READ** the appropriate design system documentation
3. **FIX** the violation using required patterns
4. **TEST** with Playwright before proceeding
5. **DOCUMENT** the correction in component header

---

## 📋 IMPLEMENTATION CHECKLIST

Before ANY commit:
- [ ] Context-appropriate design system followed
- [ ] Glass morphism applied (core app only)
- [ ] No basic UI elements exist
- [ ] All animations smooth and premium
- [ ] AI processing states implemented correctly
- [ ] Playwright tests passing 100%
- [ ] Component headers complete
- [ ] Visual quality matches mockups

**NO EXCEPTIONS. NO COMPROMISES. EXCELLENCE ONLY.**