# PM33 Tailwind Configuration Usage Examples

## 🎨 Enhanced Tailwind Configuration

Your Tailwind configuration now includes comprehensive PM33-specific styling options.

## 🚀 Usage Examples

### Glass Morphism Cards
```tsx
// Basic glass card
<div className="bg-glass-light backdrop-blur-xl border border-glass-border rounded-2xl p-6 shadow-glass">
  <h3 className="text-pm33-600 font-semibold">Glass Card Title</h3>
  <p className="text-gray-600">Beautiful glass morphism effect</p>
</div>

// Interactive glass card with hover
<div className="bg-glass-light backdrop-blur-xl border border-glass-border rounded-2xl p-6 shadow-glass hover:shadow-glass-hover transition-all duration-300 hover:scale-[1.02]">
  <h3 className="text-pm33-600 font-semibold">Interactive Glass Card</h3>
  <p className="text-gray-600">Hover for enhanced effect</p>
</div>
```

### PM33 Branded Elements
```tsx
// Primary PM33 button
<button className="bg-pm33-gradient text-white px-6 py-3 rounded-xl font-semibold shadow-pm33 hover:scale-105 transition-all duration-200">
  Strategic Action
</button>

// Strategic gradient button
<button className="bg-strategic-gradient text-white px-6 py-3 rounded-xl font-semibold shadow-strategic hover:scale-105 transition-all duration-200">
  Strategic Intelligence
</button>

// PM33 text gradient
<h1 className="text-4xl font-bold bg-pm33-gradient bg-clip-text text-transparent">
  PM33 Dashboard
</h1>
```

### Enhanced Animations
```tsx
// Fade in animation
<div className="animate-fade-in">
  <p>This content fades in smoothly</p>
</div>

// Slide up animation
<div className="animate-slide-up">
  <h2>This slides up from bottom</h2>
</div>

// Loading dots with staggered bounce
<div className="flex gap-1">
  <div className="w-2 h-2 bg-pm33-500 rounded-full animate-bounce-1"></div>
  <div className="w-2 h-2 bg-pm33-500 rounded-full animate-bounce-2"></div>
  <div className="w-2 h-2 bg-pm33-500 rounded-full animate-bounce-3"></div>
</div>

// Pulsing notification dot
<div className="w-3 h-3 bg-red-500 rounded-full animate-pulse-slow"></div>

// Glowing effect
<div className="p-4 rounded-lg bg-pm33-100 animate-glow">
  <p>This has a subtle glow effect</p>
</div>
```

### Status Indicators with Gradients
```tsx
// Success status
<div className="bg-success-gradient text-white px-3 py-1 rounded-full text-sm font-medium">
  ✅ Connected
</div>

// Warning status  
<div className="bg-warning-gradient text-white px-3 py-1 rounded-full text-sm font-medium">
  ⚠️ Attention Required
</div>

// Error status
<div className="bg-error-gradient text-white px-3 py-1 rounded-full text-sm font-medium">
  ❌ Connection Failed
</div>
```

### Progress Indicators
```tsx
// Circular progress ring (manual)
<div className="relative w-32 h-32">
  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pm33-500 to-strategic-500" 
       style={{background: `conic-gradient(#667eea 0deg ${(75/100)*360}deg, #e2e8f0 ${(75/100)*360}deg 360deg)`}}>
    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
      <span className="text-xl font-bold text-pm33-600">75%</span>
    </div>
  </div>
</div>

// Linear progress bar
<div className="w-full bg-gray-200 rounded-full h-3">
  <div className="bg-pm33-gradient h-3 rounded-full transition-all duration-500" style={{width: '65%'}}></div>
</div>
```

### Responsive Grid Layouts
```tsx
// Dashboard grid with enhanced breakpoints
<div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <div className="bg-glass-light backdrop-blur-xl rounded-2xl p-6">Card 1</div>
  <div className="bg-glass-light backdrop-blur-xl rounded-2xl p-6">Card 2</div>
  <div className="bg-glass-light backdrop-blur-xl rounded-2xl p-6">Card 3</div>
  <div className="bg-glass-light backdrop-blur-xl rounded-2xl p-6">Card 4</div>
</div>
```

### Enhanced Typography
```tsx
// PM33 branded headings
<h1 className="text-4xl xs:text-5xl font-bold bg-pm33-gradient bg-clip-text text-transparent mb-4">
  Strategic Intelligence Operations
</h1>

<h2 className="text-2xl font-semibold text-pm33-700 dark:text-pm33-300 mb-3">
  Dashboard Overview
</h2>

// Code blocks with custom font
<code className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
  npm install pm33-cli
</code>
```

### Interactive Elements
```tsx
// Smooth hover effects
<div className="group p-6 bg-glass-light backdrop-blur-xl rounded-2xl border border-glass-border 
              hover:shadow-glass-hover transition-all duration-300 hover:scale-[1.02] cursor-pointer">
  <h3 className="text-pm33-600 group-hover:text-pm33-700 transition-colors">
    Interactive Card
  </h3>
  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
    Hover to see the smooth transition
  </p>
</div>

// Button with bounce effect
<button className="bg-pm33-gradient text-white px-6 py-3 rounded-xl font-semibold 
                   transform hover:scale-105 active:scale-95 transition-transform duration-200 
                   shadow-pm33 hover:shadow-lg">
  Click Me
</button>
```

### Layout Spacing (8pt Grid System)
```tsx
// Using enhanced spacing scale
<div className="space-y-18">  {/* 72px spacing */}
  <section className="p-18">   {/* 72px padding */}
    <div className="mb-18">     {/* 72px margin bottom */}
      <h2>Section Title</h2>
    </div>
  </section>
</div>

// Large container spacing
<div className="max-w-7xl mx-auto px-6 py-24 space-y-112"> {/* 448px vertical spacing */}
  <div className="h-128">    {/* 512px height */}
    Large content area
  </div>
</div>
```

### Advanced Glass Effects
```tsx
// Multi-layer glass effect
<div className="relative">
  <div className="absolute inset-0 bg-pm33-gradient opacity-10 rounded-2xl"></div>
  <div className="relative bg-glass-light backdrop-blur-4xl border border-glass-border rounded-2xl p-8 shadow-glass">
    <h3 className="text-pm33-700 font-semibold mb-4">Advanced Glass Card</h3>
    <p className="text-gray-600">Multiple layers create depth</p>
  </div>
</div>

// Frosted glass navigation
<nav className="fixed top-0 left-0 right-0 z-100 bg-white/80 backdrop-blur-xl border-b border-glass-border">
  <div className="max-w-7xl mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold bg-pm33-gradient bg-clip-text text-transparent">PM33</h1>
      <div className="flex gap-4">
        <a href="#" className="text-pm33-600 hover:text-pm33-700 transition-colors">Dashboard</a>
        <a href="#" className="text-pm33-600 hover:text-pm33-700 transition-colors">Analytics</a>
      </div>
    </div>
  </div>
</nav>
```

## 🎨 Color Palette

### PM33 Brand Colors
- `pm33-50` to `pm33-900`: Complete PM33 brand color scale
- `strategic-50` to `strategic-900`: Strategic analysis accent colors
- `glass-light`, `glass-dark`, `glass-border`: Glass morphism utilities

### Background Gradients
- `bg-pm33-gradient`: Main PM33 brand gradient
- `bg-strategic-gradient`: Strategic intelligence gradient
- `bg-success-gradient`: Success state gradient
- `bg-warning-gradient`: Warning state gradient
- `bg-error-gradient`: Error state gradient
- `bg-glass-light`: Glass morphism light background
- `bg-glass-dark`: Glass morphism dark background

### Shadows
- `shadow-glass`: Standard glass morphism shadow
- `shadow-glass-hover`: Enhanced glass shadow for hover states
- `shadow-glass-inset`: Inset glass border effect
- `shadow-pm33`: PM33 branded shadow
- `shadow-strategic`: Strategic accent shadow

## ⚡ Performance Tips

1. **Use purge-safe classes**: Stick to the configured utility classes
2. **Combine animations**: Use `transition-all duration-300` for smooth interactions
3. **Responsive design**: Utilize the enhanced breakpoint system (`xs`, `3xl`, `4xl`)
4. **Glass effects**: Use backdrop-blur sparingly for performance
5. **Color consistency**: Stick to the PM33 brand palette for consistency

Your Tailwind configuration is now perfectly optimized for the PM33 dashboard with professional glass morphism effects, smooth animations, and a comprehensive design system!