# Claude Code Instructions - PM33 Core App Development (CORRECTED)

## 🚨 **CRITICAL CORRECTIONS & NEW REQUIREMENTS**

### **1. UI Framework Correction**
- ✅ **CORRECT**: **chadcn/ui** (not shadcn/ui)
- Use chadcn/ui components throughout the core app
- Marketing pages remain Mantine UI (as established)

### **2. HTML Prototype Foundation (CRITICAL)**
**Claude Code must FIRST review and analyze these prototype files:**
```bash
# REQUIRED: Analyze these prototype HTML files FIRST
/Users/ssaper/Desktop/my-projects/Assets/PROTOTYPE-HTML/pm33-theme-toggle-mockup.html

# Extract and leverage:
- Structure and layout patterns
- UX flow and interactions  
- Component hierarchy
- Theme system implementation
- Responsive behavior patterns
```

### **3. Logo Assets (CRITICAL)**
**Use these EXACT logo files:**
```bash
# Dark backgrounds (dark/gray themes):
/Users/ssaper/Desktop/my-projects/Assets/PM 33 New Logo Horizontal V1.2 WHITE.png

# Light backgrounds (light theme):
/Users/ssaper/Desktop/my-projects/Assets/PM 33 New Logo Horizontal V1.2.png
```

### **4. Design System Override**
**This new HTML prototype design should REPLACE the existing core app pages and UX that Claude Code previously worked on.**

---

## 📋 **Step 1: Prototype Analysis & Foundation (FIRST PRIORITY)**

### **Claude Code Instructions:**
```bash
# STEP 1: Analyze the prototype HTML
claude-code "First, read and analyze the HTML prototype file at /Users/ssaper/Desktop/my-projects/Assets/PROTOTYPE-HTML/pm33-theme-toggle-mockup.html. Extract the complete structure, layout patterns, UX flow, theme system, and component hierarchy. Document all key design patterns and interactions."

# STEP 2: Update logo implementation  
claude-code "Update the logo implementation to use the correct PNG files:
- Dark backgrounds: '/Users/ssaper/Desktop/my-projects/Assets/PM 33 New Logo Horizontal V1.2 WHITE.png'
- Light backgrounds: '/Users/ssaper/Desktop/my-projects/Assets/PM 33 New Logo Horizontal V1.2.png'
Theme-aware switching between white logo for dark themes and regular logo for light theme."

# STEP 3: Convert HTML prototype to React/chadcn components
claude-code "Convert the HTML prototype structure into React components using chadcn/ui. Create the foundation components that match the prototype exactly:
- PM33ThemeProvider (theme context from prototype)
- PM33Layout (navigation and layout from prototype)  
- PM33Card (card components from prototype)
Preserve all styling, interactions, and UX patterns from the HTML prototype."
```

---

## 🏗 **Step 2: Core App Pages (Based on HTML Prototype Structure)**

### **Dashboard/Command Center Page**
```bash
# Use the prototype structure as the foundation
claude-code "Using the HTML prototype as the foundation, create app/dashboard/page.tsx that:

1. Implements the EXACT layout structure from the HTML prototype
2. Uses the theme system from the prototype (light/dark/gray)
3. Preserves the three-column grid layout from prototype
4. Converts prototype navigation to chadcn/ui components
5. Maintains all UX interactions and hover effects from prototype
6. Uses proper logo switching (white for dark, regular for light)

Components to include:
- Strategic Intelligence briefing (center)
- Company context sidebar (left)
- Performance metrics (right)
- AI chat interface integration
- Interactive elements matching prototype behavior"
```

### **Project Delivery Page**
```bash
claude-code "Create app/project-delivery/page.tsx using the HTML prototype foundation:

1. Apply prototype layout structure and styling system
2. Implement strategic → execution pipeline visualization
3. Use prototype's card components for workflow sections
4. Include PM tool integration status dashboard
5. Maintain prototype's responsive behavior
6. Use theme-aware logo implementation
7. Convert prototype interactions to React/chadcn/ui

Key sections:
- Workflow builder with drag & drop
- Integration status cards (Jira, Linear, Monday)
- Task generation hub
- Team sync metrics
- All using prototype's glass morphism and theme system"
```

### **Analytics Dashboard**
```bash
claude-code "Build app/analytics/page.tsx based on HTML prototype structure:

1. Use prototype's layout and theme system as foundation
2. Implement performance metrics using prototype card styles
3. Convert prototype charts to recharts with matching styling
4. Preserve prototype's responsive grid behavior
5. Include AI insights panel using prototype's component patterns
6. Theme-aware visualizations matching prototype aesthetics

Analytics sections:
- Strategic health score (prototype card style)
- Framework usage breakdown (charts with prototype styling)
- ROI metrics and trends
- Team productivity dashboard
- All components converted from prototype patterns"
```

### **Settings Page**
```bash
claude-code "Create app/settings/page.tsx following prototype foundation:

1. Implement prototype's layout structure for settings
2. Use prototype's form styling and component patterns  
3. Convert prototype navigation to settings categories
4. Include integration management using prototype card styles
5. Theme preferences using prototype's theme system
6. Profile settings with prototype's input styling

Settings sections:
- User profile (using prototype form patterns)
- Integration management (prototype card layouts)
- Theme & appearance (prototype theme system)
- AI preferences (prototype component styling)
- Advanced settings (prototype interaction patterns)"
```

---

## 🎨 **Step 3: Design System Implementation (From Prototype)**

### **Theme System (Exact from Prototype)**
```typescript
// Extract theme system from HTML prototype
interface PM33Theme {
  light: {
    background: string; // From prototype gradients
    card: string;       // From prototype glass morphism
    text: string;       // From prototype text colors
    logo: string;       // Regular logo path
  };
  dark: {
    background: string; // From prototype dark gradients
    card: string;       // From prototype dark glass morphism  
    text: string;       // From prototype dark text
    logo: string;       // WHITE logo path
  };
  gray: {
    background: string; // From prototype gray gradients
    card: string;       // From prototype gray glass morphism
    text: string;       // From prototype gray text
    logo: string;       // WHITE logo path
  };
}
```

### **Component Conversion (HTML → React + chadcn/ui)**
```bash
claude-code "Convert each prototype component to React with chadcn/ui:

1. PM33Card component:
   - Extract glass morphism CSS from prototype
   - Convert to chadcn/ui Card with custom styling
   - Preserve hover effects from prototype
   - Support theme variants from prototype

2. PM33Navigation component:
   - Convert prototype navigation to React
   - Use chadcn/ui NavigationMenu as base
   - Implement theme-aware logo switching
   - Preserve responsive behavior from prototype

3. PM33ThemeProvider:
   - Extract theme system from prototype
   - Convert to React Context
   - Support theme switching from prototype
   - Maintain gradient backgrounds from prototype

4. Layout patterns:
   - Convert prototype grid systems to Tailwind
   - Preserve responsive breakpoints from prototype
   - Maintain spacing and typography from prototype"
```

---

## 🔧 **Step 4: Integration Points (Based on Existing Backend)**

### **API Integration (Maintain Existing)**
```typescript
// Keep existing FastAPI backend integration
// Update components to use prototype styling

interface BackendIntegration {
  strategicAI: string;     // Claude/OpenAI endpoints
  workflowAI: string;      // Execution automation  
  dataAI: string;          // Together AI analytics
  communicationAI: string; // Stakeholder alignment
}

// Apply prototype styling to data presentation
// Maintain existing service connections
```

### **Real-time Features (Enhanced with Prototype UX)**
```bash
claude-code "Enhance existing real-time features with prototype UX:

1. Chat interface:
   - Apply prototype chat component styling
   - Use prototype's glass morphism for messages
   - Implement prototype's loading states
   - Theme-aware message bubbles

2. Live updates:
   - Use prototype's status indicator styling
   - Implement prototype's notification patterns
   - Apply prototype's progress indicators
   - Theme-aware real-time elements"
```

---

## 🧪 **Step 5: Testing & Validation**

### **Prototype Compliance Testing**
```bash
claude-code "Create tests to ensure prototype compliance:

1. Visual regression tests:
   - Compare components to prototype styling
   - Verify theme switching behavior
   - Test responsive breakpoints from prototype
   - Validate logo switching functionality

2. Interaction tests:
   - Test all prototype interactions work in React
   - Verify hover effects match prototype
   - Test navigation behavior from prototype
   - Validate form interactions match prototype

3. Theme system tests:
   - Test light/dark/gray theme switching
   - Verify gradient backgrounds from prototype
   - Test logo switching with themes
   - Validate card styling in each theme"
```

---

## 🚦 **Development Execution Order (CORRECTED)**

### **Week 1: Foundation (Based on HTML Prototype)**
```bash
# Day 1: Prototype analysis
claude-code "Analyze /Users/ssaper/Desktop/my-projects/Assets/PROTOTYPE-HTML/pm33-theme-toggle-mockup.html and extract all design patterns, layouts, and interactions."

# Day 2: Logo and theme system
claude-code "Implement logo switching system and convert prototype theme system to React Context with chadcn/ui."

# Day 3-4: Foundation components  
claude-code "Convert prototype HTML components to React with chadcn/ui while preserving exact styling and interactions."

# Day 5: Layout system
claude-code "Implement prototype's layout patterns and responsive behavior using Tailwind CSS."
```

### **Week 2: Core Pages (Prototype Structure)**
```bash
# Day 1-2: Dashboard/Command Center
claude-code "Build dashboard using prototype layout structure with AI briefing, company context, and performance metrics."

# Day 3-4: Project Delivery  
claude-code "Create project delivery page with prototype styling, workflow builder, and integration dashboard."

# Day 5: Analytics foundation
claude-code "Build analytics dashboard using prototype card layouts and theme system."
```

### **Week 3: Advanced Features & Polish**
```bash
# Day 1-2: Settings and remaining pages
claude-code "Complete settings page and any additional pages using prototype patterns."

# Day 3-4: Integration and real-time features
claude-code "Enhance existing backend integration with prototype UX patterns."

# Day 5: Testing and optimization
claude-code "Run comprehensive tests and optimize for production."
```

---

## 🎯 **Success Criteria (CORRECTED)**

### **Prototype Compliance**
- [ ] All components match HTML prototype styling exactly
- [ ] Theme switching works identically to prototype
- [ ] Logo switching (white/regular) works properly
- [ ] Layout matches prototype responsive behavior
- [ ] All interactions preserved from prototype

### **Technical Requirements**
- [ ] Uses chadcn/ui components throughout
- [ ] Integrates with existing FastAPI backend
- [ ] Maintains existing marketing pages (Mantine UI)
- [ ] Passes all Playwright tests
- [ ] Mobile responsive matching prototype

### **Business Requirements**
- [ ] Strategic → execution workflows functional
- [ ] AI integration throughout all pages
- [ ] PM tool integrations working
- [ ] Performance analytics providing insights
- [ ] Team collaboration features enabled

---

## 🔥 **Immediate Execution Commands**

```bash
# START HERE - Analyze prototype first
claude-code "Read and analyze the HTML prototype at /Users/ssaper/Desktop/my-projects/Assets/PROTOTYPE-HTML/pm33-theme-toggle-mockup.html. Extract all layout patterns, styling systems, theme implementation, and UX interactions. This will be the foundation for rebuilding the core app."

# Then implement logo system
claude-code "Update logo implementation to use theme-aware switching:
- Light theme: '/Users/ssaper/Desktop/my-projects/Assets/PM 33 New Logo Horizontal V1.2.png'  
- Dark/Gray themes: '/Users/ssaper/Desktop/my-projects/Assets/PM 33 New Logo Horizontal V1.2 WHITE.png'"

# Finally convert to React
claude-code "Convert the HTML prototype to React components using chadcn/ui while preserving exact styling, layout, and interactions. Start with theme provider and layout components."
```

**Remember**: The HTML prototype is the authoritative design source. Everything should be built to match that prototype exactly while using chadcn/ui for the component implementation.