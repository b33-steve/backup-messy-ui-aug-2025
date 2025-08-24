# PM33 SYSTEM DOCUMENTATION

## 📁 Documentation Architecture

This document serves as the central index for all PM33 system documentation, organized by context and scope.

## 🗂️ Directory Structure

```
app/frontend/docs/
├── shared/                           # Cross-system documentation
│   ├── PM33_COMPLETE_UI_SYSTEM.md    # UI standards for both marketing & app
│   ├── PM33_COMPLETE_UX_SYSTEM.md    # UX patterns for both contexts
│   ├── PM33_COMPLETE_DEVELOPMENT_PLAN.md # Development workflow
│   ├── PM33_ONBOARDING_WORKFLOW_DIAGRAM.md # User onboarding flow
│   ├── CLAUDE_CODE_INSTRUCTIONS.md   # Enforcement rules for Claude Code
│   └── CLAUDE_CODE_CROSS_DIRECTORY_INSTRUCTIONS.md # Cross-directory setup
├── system/                           # System architecture
│   ├── MULTITENANT_ARCHITECTURE.md   # Multi-tenant system design
│   └── PM33_UX_ARCHITECTURE_PLAN.md  # UX architecture
├── deployment/                       # Deployment documentation
│   ├── PM33_PRODUCTION_DEPLOYMENT_GUIDE.md # Railway deployment
│   └── DEPLOYMENT.md                 # Zero-downtime pipeline
app/(marketing)/docs/                 # Marketing website specific
│   ├── MARKETING_THEME_GUIDE.md      # Marketing design system
│   ├── MARKETING_DESIGN_SYSTEM.md    # Marketing components
│   ├── PM33_MARKETING_WEBSITE_STRATEGY.md # Website strategy
│   └── PM33_PRICING_STRATEGY.md      # Pricing approach
app/(app)/docs/                       # Core app specific
│   ├── APP_THEME_GUIDE.md            # App design system
│   ├── APP_DESIGN_SYSTEM.md          # App components
│   └── CORE_APP_DESIGN_SYSTEM.md     # Core app standards
```

## 🎯 Context-Aware Documentation

### Marketing Website Context
**Directory**: `app/(marketing)/docs/`
**Purpose**: Clean, professional marketing site using Mantine UI
**Key Files**:
- `MARKETING_THEME_GUIDE.md` - Design system for marketing pages
- `MARKETING_DESIGN_SYSTEM.md` - Component standards
- `PM33_MARKETING_WEBSITE_STRATEGY.md` - Website strategy
- `PM33_PRICING_STRATEGY.md` - Pricing page approach

### Core App Context  
**Directory**: `app/(app)/docs/`
**Purpose**: Premium PM33 app with glass morphism and AI intelligence
**Key Files**:
- `APP_THEME_GUIDE.md` - Core app design system
- `APP_DESIGN_SYSTEM.md` - Component library
- `CORE_APP_DESIGN_SYSTEM.md` - Advanced app patterns

### Shared Documentation
**Directory**: `docs/shared/`
**Purpose**: Standards that apply across both contexts
**Key Files**:
- `PM33_COMPLETE_UI_SYSTEM.md` - Master UI standards
- `PM33_COMPLETE_UX_SYSTEM.md` - Master UX patterns
- `PM33_COMPLETE_DEVELOPMENT_PLAN.md` - Development workflow
- `CLAUDE_CODE_INSTRUCTIONS.md` - Enforcement rules

### System Architecture
**Directory**: `docs/system/`
**Purpose**: High-level system design and architecture
**Key Files**:
- `MULTITENANT_ARCHITECTURE.md` - Multi-tenant design
- `PM33_UX_ARCHITECTURE_PLAN.md` - UX system architecture

### Deployment Documentation
**Directory**: `docs/deployment/`
**Purpose**: Production deployment and operations
**Key Files**:
- `PM33_PRODUCTION_DEPLOYMENT_GUIDE.md` - Railway deployment
- `DEPLOYMENT.md` - Zero-downtime deployment pipeline

## 🔧 How to Use This Documentation

### For Development Work

1. **Determine Context First**:
   - Marketing page? → Read `app/(marketing)/docs/MARKETING_THEME_GUIDE.md`
   - Core app page? → Read `app/(app)/docs/APP_THEME_GUIDE.md`

2. **Check Shared Standards**:
   - Always reference `docs/shared/PM33_COMPLETE_UI_SYSTEM.md`
   - Follow patterns in `docs/shared/PM33_COMPLETE_UX_SYSTEM.md`

3. **Follow Enforcement Rules**:
   - Read `docs/shared/CLAUDE_CODE_INSTRUCTIONS.md` before coding
   - Run Playwright tests after every change

### For System Architecture

1. **Multi-tenant Design**: Reference `docs/system/MULTITENANT_ARCHITECTURE.md`
2. **UX Architecture**: Follow `docs/system/PM33_UX_ARCHITECTURE_PLAN.md`
3. **Onboarding Flow**: Use `docs/shared/PM33_ONBOARDING_WORKFLOW_DIAGRAM.md`

### For Deployment

1. **Production Deployment**: Follow `docs/deployment/PM33_PRODUCTION_DEPLOYMENT_GUIDE.md`
2. **Zero-Downtime Pipeline**: Use `docs/deployment/DEPLOYMENT.md`

## 📝 Documentation Standards

### File Naming Convention
- Use `UPPERCASE_WITH_UNDERSCORES.md` for major documentation
- Use descriptive names that indicate scope and purpose
- Avoid spaces in filenames (use underscores)

### Content Structure
All documentation should follow this structure:
```markdown
# Title
## Overview (what this covers)
## Implementation (how to use it)
## Examples (concrete examples)
## Testing (validation requirements)
## Troubleshooting (common issues)
```

### Cross-References
When referencing other documentation:
```markdown
See [Marketing Theme Guide](../marketing/docs/MARKETING_THEME_GUIDE.md)
Follow [UI System Standards](../shared/PM33_COMPLETE_UI_SYSTEM.md)
```

## ✅ Documentation Health Check

To verify all documentation is properly organized:

1. **Check File Locations**:
   ```bash
   find docs/ -name "*.md" | sort
   ```

2. **Validate Cross-References**:
   ```bash
   grep -r "\.md" docs/ | grep -v "\.md:" 
   ```

3. **Test Documentation Links**:
   ```bash
   # Verify all referenced files exist
   for file in $(grep -r "\.md)" docs/ | cut -d: -f2 | grep -o '[^(]*\.md'); do
     [[ -f "$file" ]] || echo "Missing: $file"
   done
   ```

## 🚨 Critical Files Status

### ✅ Restored and Organized
- PM33_COMPLETE_UI_SYSTEM.md → `docs/shared/`
- PM33_COMPLETE_UX_SYSTEM.md → `docs/shared/`
- PM33_COMPLETE_DEVELOPMENT_PLAN.md → `docs/shared/`
- PM33_PRODUCTION_DEPLOYMENT_GUIDE.md → `docs/deployment/`
- DEPLOYMENT.md → `docs/deployment/`
- MULTITENANT_ARCHITECTURE.md → `docs/system/`

### ✅ Recreated
- CLAUDE_CODE_INSTRUCTIONS.md → `docs/shared/` (recreated based on CLAUDE.md references)
- SYSTEM-DOCUMENTATION.md → `docs/system/` (this file)

### ✅ Existing Files in Correct Locations
- MARKETING_THEME_GUIDE.md → `app/(marketing)/docs/`
- MARKETING_DESIGN_SYSTEM.md → `app/(marketing)/docs/`
- APP_THEME_GUIDE.md → `app/(app)/docs/`
- APP_DESIGN_SYSTEM.md → `app/(app)/docs/`

## 🔄 Maintenance

This documentation structure should be maintained as follows:

1. **New Documentation**: Place in appropriate context directory
2. **Shared Patterns**: Add to `docs/shared/`
3. **Context-Specific**: Add to `app/(marketing)/docs/` or `app/(app)/docs/`
4. **System Architecture**: Add to `docs/system/`
5. **Deployment**: Add to `docs/deployment/`

---

**Last Updated**: File organization and restoration complete
**Status**: All critical documentation files restored and properly organized
**Next Steps**: Fix broken references throughout codebase