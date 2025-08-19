# ⚠️ MANDATORY INSTRUCTIONS FOR CLAUDE CODE ⚠️
# THIS FILE MUST BE READ BEFORE ANY CODE IS WRITTEN

## 🔴 STOP! Before writing ANY code:

1. **READ THESE FILES COMPLETELY:**
   - `PM33_COMPLETE_UI_SYSTEM.md` - ALL UI standards
   - `PM33_ Complete _UX_System.md` - ALL UX patterns
   - Run: `cat PM33_COMPLETE_UI_SYSTEM.md` and `cat "PM33_ Complete _UX_System.md"`

2. **CONFIRM UNDERSTANDING:**
   Before any UI/UX work, explicitly state:
   "I have read PM33_COMPLETE_UI_SYSTEM.md and PM33_ Complete _UX_System.md and will follow them exactly."

3. **REFERENCE REQUIREMENTS:**
   For EVERY component, cite the specific section from the design docs:
   "Following PM33_COMPLETE_UI_SYSTEM.md section 3.1 - Glass Morphism Cards"

## 🚫 AUTOMATIC REJECTION TRIGGERS

These will cause IMMEDIATE rejection:
- ANY border that is solid black
- ANY card without glass morphism
- ANY button without gradients
- ANY spinner instead of AI processing animation
- ANY form without AI pre-filling
- ANY action without impact preview

## ✅ REQUIRED FOR EVERY COMPONENT

```tsx
// EVERY component must have this header comment:
/**
 * Component: [ComponentName]
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md - Section [X.X]
 * UX Pattern: PM33_ Complete _UX_System.md - Section [X.X]
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

## 🧪 BEFORE EVERY COMMIT
Run these commands:
```bash
# 1. UI Compliance Test
npm run test:ui-compliance

# 2. UX Quality Test  
npm run test:ux-quality

# 3. Visual Screenshot Test
npm run test:visual

# If ANY test fails, code must be fixed before proceeding
```

## 📋 COMPONENT CREATION CHECKLIST
When creating ANY new component, follow this EXACT process:

1. Read relevant section from PM33_COMPLETE_UI_SYSTEM.md
2. Copy the example code from the design system
3. Adapt to specific need while maintaining all styling
4. Add compliance comment at top of file
5. Test with Playwright before committing

## 🎨 COPY-PASTE TEMPLATES
**For Cards:**
```tsx
// ALWAYS start with this, never create from scratch
import { PM33Card } from '@/components/ui/PM33Card';
// See PM33_COMPLETE_UI_SYSTEM.md - Section 3.1
```

**For Buttons:**
```tsx
// ALWAYS use PM33Button, never native button
import { PM33Button } from '@/components/ui/PM33Button';
// See PM33_COMPLETE_UI_SYSTEM.md - Section 3.4
```

**For AI States:**
```tsx
// ALWAYS use AIProcessingState, never basic spinner
import { AIProcessingState } from '@/components/ui/AIProcessingState';
// See PM33_COMPLETE_UI_SYSTEM.md - Section 3.3
```

## 🔍 SELF-AUDIT QUESTIONS
Before submitting ANY UI code, answer:

1. Could this screenshot be on Dribbble? (Must be YES)
2. Does it look like Jira/Asana? (Must be NO)
3. Are there gradients and glass effects? (Must be YES)
4. Would a user say "wow"? (Must be YES)
5. Is AI intelligence visually apparent? (Must be YES)

## 🚨 ESCALATION PROTOCOL
If you're unsure about ANY design decision:

1. Re-read the relevant section in design docs
2. Look for similar patterns in the examples
3. Choose the MORE premium/sophisticated option
4. Add extra polish rather than less

## 📊 QUALITY METRICS
Your code will be measured against:

- Glass morphism coverage: MUST be 100%
- Animation coverage: MUST be 100%
- Gradient usage: MUST be >80%
- Basic elements: MUST be 0%
- Time to first value: MUST be <30 seconds
- Clicks to complete workflow: MUST be <5

## 🎯 REMEMBER
PM33 is a PREMIUM $100K MRR product that competes with Linear and Notion.
Every pixel must reflect this quality.
No exceptions. No compromises. Excellence only.