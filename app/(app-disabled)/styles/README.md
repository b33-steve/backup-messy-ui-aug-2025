# PM33 Core App CSS Architecture

## File Structure & Organization

```
app/(app)/styles/
├── core-app.css           # Main centralized CSS system
├── components/            # Component-specific styles
│   ├── dashboard.css      # Dashboard-specific styles
│   ├── chat.css          # Chat interface styles
│   └── forms.css         # Form component styles
├── themes/               # Theme-specific styles
│   ├── light.css         # Light theme overrides
│   ├── dark.css          # Dark theme overrides
│   ├── high-contrast-light.css
│   └── high-contrast-dark.css
└── utilities/            # Utility classes
    ├── spacing.css       # 8pt grid spacing utilities
    ├── typography.css    # Text utilities
    └── animations.css    # Animation utilities
```

## CSS Architecture Principles

### 1. **Design Token System**
All colors, spacing, and design decisions are centralized in CSS custom properties:

```css
/* Core design tokens */
:root {
  --pm33-primary: #1a365d;
  --pm33-secondary: #2d3748;
  --pm33-spacing-unit: 8px;
  --pm33-border-radius: calc(var(--pm33-spacing-unit) * 2);
}
```

### 2. **Component-Based Architecture**
Each UI component has its own class with modifiers:

```css
/* Base component */
.pm33-glass-card {
  background: var(--pm33-glass-bg);
  backdrop-filter: var(--pm33-glass-blur);
}

/* Component modifiers */
.pm33-glass-card--large { padding: calc(var(--pm33-spacing-unit) * 4); }
.pm33-glass-card--interactive:hover { transform: translateY(-2px); }
```

### 3. **Theme System Architecture**
Themes are organized by data attributes and CSS classes:

```css
/* Light theme */
[data-theme="light"] {
  --pm33-text-primary: #1a202c;
  --pm33-bg-primary: #ffffff;
}

/* Dark theme */
[data-theme="dark"] {
  --pm33-text-primary: #f7fafc;
  --pm33-bg-primary: #0a0e27;
}
```

### 4. **Responsive Design Strategy**
Mobile-first approach with consistent breakpoints:

```css
/* Base: Mobile (375px+) */
.pm33-layout-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(var(--pm33-spacing-unit) * 3);
}

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .pm33-layout-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Desktop: 1200px+ */
@media (min-width: 1200px) {
  .pm33-layout-grid {
    grid-template-columns: 1fr 2fr 1fr;
  }
}
```

## CSS Naming Conventions

### 1. **Component Classes**
Format: `pm33-[component]-[element]--[modifier]`

Examples:
- `.pm33-glass-card` (base component)
- `.pm33-glass-card__header` (element within component)
- `.pm33-glass-card--elevated` (component modifier)
- `.pm33-glass-card__header--centered` (element modifier)

### 2. **Utility Classes**
Format: `pm33-[property]-[value]`

Examples:
- `.pm33-spacing-md` (spacing utilities)
- `.pm33-text-gradient` (text effects)
- `.pm33-animation-fade-in` (animations)

### 3. **Theme Classes**
Format: `pm33-theme-[theme-name]`

Examples:
- `.pm33-theme-light`
- `.pm33-theme-dark`
- `.pm33-theme-high-contrast-light`

## WCAG 2.1 AA/AAA Compliance

### Standard Theme Contrast Ratios (AA Compliance)
- **Normal text**: 4.5:1 minimum
- **Large text** (18pt+ or 14pt+ bold): 3:1 minimum
- **Interactive elements**: 3:1 minimum

### High Contrast Theme Ratios (AAA Compliance)
- **Normal text**: 7:1 minimum  
- **Large text**: 4.5:1 minimum
- **Interactive elements**: 4.5:1 minimum

### Implementation Example
```css
/* Light theme - AA compliant */
[data-theme="light"] {
  --pm33-text-primary: #1a202c;     /* 16.75:1 on white */
  --pm33-text-secondary: #4a5568;   /* 7.54:1 on white */
  --pm33-bg-primary: #ffffff;
}

/* High contrast light - AAA compliant */
[data-theme="high-contrast-light"] {
  --pm33-text-primary: #000000;     /* 21:1 on white */
  --pm33-text-secondary: #1a202c;   /* 16.75:1 on white */
  --pm33-bg-primary: #ffffff;
}
```

## Maintenance Guidelines

### 1. **Adding New Components**
1. Create component CSS in `components/[component-name].css`
2. Use PM33 design tokens for all values
3. Include hover, focus, and active states
4. Test contrast ratios in all themes
5. Add responsive breakpoints if needed

### 2. **Adding New Themes**
1. Create theme file in `themes/[theme-name].css`
2. Define all required CSS custom properties
3. Ensure WCAG compliance (AA minimum, AAA for high-contrast)
4. Test with Playwright contrast validation tests
5. Update `THEME_VARIANTS` in test files

### 3. **Updating Design Tokens**
1. Update tokens in `core-app.css` `:root` section
2. Verify no breaking changes in existing components
3. Run full theme contrast test suite
4. Update documentation if new tokens added

## Performance Considerations

### 1. **CSS Organization**
- Critical CSS inlined in main bundle
- Component-specific CSS loaded per route
- Theme CSS loaded on demand

### 2. **Bundle Optimization**
- Use CSS custom properties for runtime theme switching
- Minimize CSS custom property updates
- Leverage CSS containment for component isolation

### 3. **Loading Strategy**
```css
/* Critical CSS - loaded immediately */
.pm33-glass-card { /* base styles */ }

/* Non-critical CSS - loaded lazily */
@media (min-width: 1200px) {
  .pm33-glass-card--desktop-only { /* desktop-specific styles */ }
}
```

## Testing Integration

### Automated Testing
- **Contrast validation**: `npm run test:theme-contrast-comprehensive`
- **Layout validation**: `npm run test:layout`
- **Visual regression**: `npm run test:visual`
- **Premium experience**: `npm run test:premium-experience`

### Manual Testing Checklist
- [ ] All themes load without visual breaks
- [ ] Interactive elements have proper focus indicators
- [ ] Glass morphism effects work across browsers
- [ ] Responsive breakpoints transition smoothly
- [ ] High contrast themes meet AAA standards
- [ ] Animation performance is smooth (60fps)

## Migration Path

### From Component-Level CSS to Centralized System
1. **Phase 1**: Import centralized core-app.css in layout
2. **Phase 2**: Replace inline styles with utility classes
3. **Phase 3**: Migrate component CSS to design tokens
4. **Phase 4**: Remove redundant component-specific CSS files

### Legacy Support
- Maintain backward compatibility during migration
- Gradual adoption of new system
- Clear deprecation warnings for old patterns

---

*This architecture supports PM33's premium design system with glass morphism, comprehensive theming, and WCAG accessibility compliance.*