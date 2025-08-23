# PM33 Component Classes Usage Guide

## 🎨 Enhanced Global Styles Implementation

Your `globals.css` now includes comprehensive component classes for rapid PM33 dashboard development.

## 🚀 Core Component Classes

### Glass Cards
```tsx
// Basic glass card (your specification)
<div className="glass-card">
  <h3>Glass Card Title</h3>
  <p>Beautiful translucent effect</p>
</div>

// Dark mode variant
<div className="glass-card-dark">
  <h3>Dark Glass Card</h3>
  <p>Perfect for dark themes</p>
</div>

// Strategic intelligence card
<div className="strategic-card">
  <h3>Strategic Analysis</h3>
  <p>Purple accent border with gradient</p>
</div>
```

### Buttons (Your Specifications + Extensions)
```tsx
// Primary button (your specification)
<button className="btn-primary">
  <Brain className="w-5 h-5" />
  Strategic Action
</button>

// Button variants
<button className="btn-secondary">Secondary Action</button>
<button className="btn-success">Success Action</button>
<button className="btn-warning">Warning Action</button>
<button className="btn-danger">Danger Action</button>
```

### Text Components
```tsx
// Text gradient (your specification)
<h1 className="text-gradient">PM33 Dashboard</h1>

// Responsive headings
<h1 className="heading-xl">Extra Large Heading</h1>
<h2 className="heading-lg">Large Heading</h2>
<h3 className="heading-md">Medium Heading</h3>

// Body text variants
<p className="body-lg">Large body text</p>
<p className="body-md">Regular body text</p>
<p className="body-sm">Small body text</p>
```

## 📊 Dashboard-Specific Components

### Metrics Display
```tsx
<div className="metric-card">
  <div className="metric-value">92%</div>
  <div className="metric-label">Team Alignment</div>
</div>
```

### Progress Indicators
```tsx
// Progress bar
<div className="progress-bar">
  <div className="progress-fill" style={{width: '75%'}}></div>
</div>

// Circular progress ring container
<div className="progress-ring">
  {/* Your circular progress content */}
</div>
```

### Status Badges
```tsx
<span className="badge-success">✅ Connected</span>
<span className="badge-warning">⚠️ Attention</span>
<span className="badge-error">❌ Failed</span>
<span className="badge-info">ℹ️ Information</span>
```

### AI Processing Indicators
```tsx
<div className="ai-processing-indicator">
  <div className="loading-dots">
    <div className="loading-dot"></div>
    <div className="loading-dot"></div>
    <div className="loading-dot"></div>
  </div>
  Analyzing with AI frameworks...
</div>
```

## 🎯 PM33 Skill Tree Components

### Skill Cards
```tsx
<div className="skill-card">
  <div className="skill-level-badge">Lvl 7</div>
  <h3>Strategic Thinking</h3>
  <div className="skill-progress-bar">
    <div className="skill-progress-fill" style={{width: '73%'}}></div>
  </div>
  <p>Next: Blue Ocean Analysis</p>
</div>
```

## 🔗 Integration Status Components

### Integration Cards
```tsx
// Connected integration
<div className="integration-card integration-connected">
  <h3>Jira Integration</h3>
  <p>Connected to: Demo Company</p>
</div>

// Disconnected integration
<div className="integration-card integration-disconnected">
  <h3>Linear Integration</h3>
  <p>Not connected</p>
</div>
```

## 🧭 Navigation Components

### Glass Navigation
```tsx
<nav className="nav-glass">
  <div className="flex items-center gap-6">
    <a href="/dashboard" className="nav-link nav-link-active">Dashboard</a>
    <a href="/analytics" className="nav-link">Analytics</a>
    <a href="/settings" className="nav-link">Settings</a>
  </div>
</nav>
```

### Glass Input Fields
```tsx
<input 
  type="text" 
  placeholder="Enter your query..."
  className="input-glass"
/>
```

## 📱 Layout Components

### Dashboard Grid System
```tsx
<div className="dashboard-section">
  <h2 className="heading-lg">Dashboard Overview</h2>
  
  <div className="dashboard-grid">
    <div className="metric-card">Metric 1</div>
    <div className="metric-card">Metric 2</div>
    <div className="metric-card">Metric 3</div>
  </div>
</div>
```

## 🎨 Complete Dashboard Example

```tsx
export default function DashboardExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="nav-glass">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-gradient text-xl font-bold">PM33</h1>
            <div className="flex gap-4">
              <a href="#" className="nav-link nav-link-active">Dashboard</a>
              <a href="#" className="nav-link">Analytics</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="dashboard-section">
            <h1 className="heading-xl">Good morning, Sarah!</h1>
            <p className="body-lg">Here's your strategic focus for today.</p>
          </div>

          {/* AI Summary */}
          <div className="glass-card mb-8">
            <div className="ai-processing-indicator mb-4">
              <div className="loading-dots">
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
              </div>
              Intelligence Operations Summary
            </div>
            <p className="body-md">
              PM33 analyzed <strong>3 competitor updates</strong> and prepared 
              <strong>2 strategic recommendations</strong>.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="dashboard-grid mb-8">
            <div className="metric-card">
              <div className="metric-value">4/5</div>
              <div className="metric-label">Decisions Made</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">92%</div>
              <div className="metric-label">Team Aligned</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">A+</div>
              <div className="metric-label">Strategic Score</div>
            </div>
          </div>

          {/* Skills */}
          <div className="dashboard-section">
            <h2 className="heading-lg">PM Skill Tree</h2>
            <div className="skill-card">
              <div className="skill-level-badge">Lvl 7</div>
              <h3 className="heading-md">Strategic Thinking</h3>
              <div className="skill-progress-bar mb-2">
                <div className="skill-progress-fill" style={{width: '73%'}}></div>
              </div>
              <p className="body-sm">Next: Blue Ocean Analysis</p>
            </div>
          </div>

          {/* Integrations */}
          <div className="dashboard-section">
            <h2 className="heading-lg">Integrations</h2>
            <div className="integration-card integration-connected">
              <h3 className="heading-md">Jira Integration</h3>
              <span className="badge-success">Connected</span>
              <p className="body-md">Connected to: Demo Company</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8">
            <button className="btn-primary">
              <Brain className="w-5 h-5" />
              Strategic Intelligence
            </button>
            <button className="btn-secondary">
              <Target className="w-5 h-5" />
              Task Management
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## 🎨 Color System Integration

Your component classes automatically work with:
- **Light/Dark mode**: All classes include dark mode variants
- **PM33 brand colors**: Consistent with your Tailwind config
- **Glass morphism**: Professional translucent effects
- **Smooth animations**: Hover states and transitions
- **Responsive design**: Mobile-friendly by default

## ⚡ Performance Notes

- **Optimized CSS**: Using `@layer components` for proper CSS cascade
- **Utility-first**: Built on top of your enhanced Tailwind utilities
- **Consistent animations**: All using the same timing functions
- **Accessible**: Focus states and reduced motion support built-in

## 🔄 Existing PM33 Classes

Your existing PM33 classes (from the comprehensive CSS above) still work:
- `.pm33-glass-card` - Premium glass morphism cards
- `.pm33-btn-primary` - Branded primary buttons  
- `.pm33-text-gradient` - PM33 brand gradients
- `.pm33-ai-processing` - AI processing indicators

These new component classes complement and extend your existing system! 🚀