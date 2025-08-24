# PM33 UI Validation Scripts

## validate-ui-consistency.ts

A comprehensive TypeScript validation script that ensures all core app components follow PM33 design system standards.

### Usage

```bash
npm run validate:ui
```

### What it checks:

#### ✅ **Critical Validations (Errors)**
- **No Mantine imports** in core app files (`app/(app)/`)
- **No Tabler icons** - must use `lucide-react` instead
- **PM33PageWrapper usage** - all pages must use PM33PageWrapper
- **PM33Navigation usage** - all pages must use PM33Navigation
- **No slate colors** - replace with semantic classes (`text-foreground`, `text-muted-foreground`)

#### ⚠️ **Recommended Fixes (Warnings)** 
- **Semantic color usage** - replace hardcoded gray colors with semantic classes
- **Glass morphism compliance** - ensure backdrop-blur is used with transparent backgrounds
- **Deprecated component usage** - replace old components with PM33 equivalents

#### ℹ️ **Best Practices (Info)**
- **Component compliance headers** - components should include PM33 compliance checklist
- **Icon size consistency** - use standard icon sizes (12, 14, 16, 18, 20, 24)
- **Dark mode usage** - informational notices about dark mode class usage

### PM33 Design System Standards

The script validates against these PM33 specifications:

#### Glass Morphism
- **Backdrop blur**: `backdrop-blur-sm`, `backdrop-blur-md`, `backdrop-blur-lg`, `backdrop-blur-xl`
- **Opacities**: `bg-white/80`, `bg-white/90`, `bg-white/50`, `bg-gray-50/80`

#### Components
- **Required PM33 components**: PM33PageWrapper, PM33Navigation, PM33Card, PM33Button, PM33AIProcessing
- **Semantic colors**: `text-foreground`, `text-muted-foreground`, `pm33-text-gradient`

#### Icons
- **Allowed**: `lucide-react` only
- **Forbidden**: `@tabler/icons-react`, `@mantine/core` icons

### Exit Codes

- **0**: No critical errors (warnings/info allowed)
- **1**: Critical errors found - must be fixed

### Example Output

```
🔍 PM33 UI Consistency Validation

Found 30 files to validate...

📊 Validation Report

Summary:
• 5 errors
• 12 warnings  
• 8 info
• 6 files with issues

📄 app/(app)/work-mapping/page.tsx
  ❌ ERROR [missing-pm33-page-wrapper]
    Core app page must use PM33PageWrapper component.
    Line 1

  ⚠️  WARNING [semantic-color-usage]
    Replace 'text-gray-500' with semantic color classes like 'text-foreground' or 'text-muted-foreground'.
    Line 45

🔧 Quick Fix Suggestions:
• Replace Mantine imports with PM33 components
• Update color classes to semantic variants (text-foreground, text-muted-foreground)
• Add backdrop-blur to transparent backgrounds
• Use lucide-react for all icons
• Ensure all pages use PM33PageWrapper and PM33Navigation
```

### Integration

The script can be integrated into:
- **Pre-commit hooks** - Ensure code quality before commits
- **CI/CD pipelines** - Validate PRs automatically
- **Development workflow** - Run manually during development

### Files Validated

The script checks all TypeScript/TSX files in:
- `app/(app)/**/*.{ts,tsx}` - Core app files
- `components/PM33*.{ts,tsx}` - PM33 components
- `app/(app)/components/**/*.{ts,tsx}` - Core app component files

### Configuration

All validation rules and PM33 specifications are defined within the script and can be customized as needed.