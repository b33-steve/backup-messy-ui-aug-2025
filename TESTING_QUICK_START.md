# PM33 Testing Quick Start Guide

## 🚀 Immediate Testing Commands

### **Critical Tests (Must Pass Before Deployment)**
```bash
# Essential tests - blocks deployment on failure
npm run test:critical

# Marketing design system validation
npm run test:marketing

# Premium experience validation
npm run test:premium-experience
```

### **Development Testing**
```bash
# UI compliance testing
npm run test:ui-compliance

# Performance benchmarks
npm run test:performance  

# Accessibility validation
npm run test:accessibility

# Complete test suite
npm run test:all
```

## 🔧 Current Issues to Fix

### **Critical Issues Blocking Tests**
1. **Homepage 500 Errors** - CSS syntax error at `globals.css:191`
2. **Webpack Module Loading** - `__webpack_modules__[moduleId] is not a function`
3. **Fast Refresh Instability** - Continuous full page reloads

### **Working Pages for Testing**
- ✅ `/dashboard` - 200 status
- ✅ `/pricing` - 200 status  
- ✅ `/about` - 200 status
- ✅ `/resources` - 200 status
- ❌ `/` (Homepage) - 500 status (NEEDS FIX)

## 📋 Test Categories Overview

### **1. Premium UI Compliance**
- Glass morphism validation
- Hover states on all elements
- Premium animations (no basic spinners)
- PM33 color system compliance
- 8pt grid spacing

### **2. Marketing Design System**
- Mantine UI integration
- Marketing color tokens
- Clean design (no glass on marketing)
- Conversion-focused CTAs
- Professional typography

### **3. Critical Path Testing**
- Homepage → Demo → Trial flows
- Cross-browser compatibility
- Mobile responsiveness
- Performance benchmarks

### **4. Quality Gates**
- Core Web Vitals enforcement
- Accessibility compliance
- Security scanning
- Visual regression testing

## 🎯 Quick Fix Priorities

### **Fix 1: CSS Syntax Error**
```bash
# Check globals.css line 191
head -n 195 app/globals.css | tail -n 10
```

### **Fix 2: Test Homepage**
```bash
# Test current homepage status
curl -I http://localhost:3005/
```

### **Fix 3: Run Working Page Tests**
```bash
# Test functional pages first
npx playwright test tests/pricing-page.spec.ts --project=chromium
npx playwright test tests/about-page.spec.ts --project=chromium
```

## ⚡ Enablement Commands

### **Setup Pre-commit Hooks**
```bash
npx husky install
```

### **Run Single Test Categories**
```bash
# Test just the UI compliance
npx playwright test tests/pm33-ui-compliance.spec.ts

# Test marketing design only  
npx playwright test tests/marketing/

# Test performance only
npx playwright test tests/performance/
```

### **Debug Tests**
```bash
# Run tests with debug mode
npx playwright test tests/homepage.spec.ts --debug

# Generate test reports
npx playwright show-report
```

## 📊 Success Indicators

### **Green Light Indicators**
- ✅ All tests in `npm run test:critical` pass
- ✅ Homepage returns 200 status
- ✅ No console errors in development
- ✅ Lighthouse score >95

### **Red Light Indicators**  
- ❌ Any test failures in critical path
- ❌ 500 errors on homepage
- ❌ CSS compilation failures
- ❌ Webpack module loading errors

---

**Next Steps**: Fix homepage 500 errors → Run critical tests → Enable CI/CD pipeline