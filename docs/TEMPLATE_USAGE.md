# PM33 Template System

## DO NOT CREATE CUSTOM LAYOUTS - USE TEMPLATES

### Available Templates:

1. **Dashboard Template**
   - Use for: Main command center, overview pages
   - Layout: 3-column with metrics
   - Import: `import { PM33DashboardTemplate } from '@/components/templates'`

2. **Analytics Template**
   - Use for: Charts, graphs, data visualization
   - Layout: 2-column grid
   - Import: `import { PM33AnalyticsTemplate } from '@/components/templates'`

3. **Project Template**
   - Use for: Kanban boards, task lists
   - Layout: Flexible columns
   - Import: `import { PM33ProjectTemplate } from '@/components/templates'`

### How to Create a New Page:

```bash
npm run generate:page PageName TemplateName
```

Example:
```bash
npm run generate:page TestDashboard Dashboard
```

### Code Examples:

```typescript
// ✅ CORRECT - Using template
import { PM33DashboardTemplate } from '@/components/templates';

export default function Dashboard() {
  return <PM33DashboardTemplate data={dashboardData} />;
}

// ❌ WRONG - Custom layout
export default function Dashboard() {
  return (
    <div className="flex">
      <aside>...</aside>
      <main>...</main>
    </div>
  );
}
```

### Template Data Requirements:

#### Dashboard Template
```typescript
interface DashboardData {
  user: {
    name: string;
    role: string;
  };
  metrics: Array<{
    label: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
  }>;
  scenarios: Array<{
    id: string;
    category: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    color: string;
  }>;
  tools: Array<{
    id: string;
    name: string;
    icon: string;
    active?: boolean;
  }>;
}
```

### Layout Components:

- `PM33AppShell`: Main application shell with sidebar layout
- `PM33TopNav`: Top navigation bar with logo and menu
- `PM33LeftSidebar`: Left sidebar with navigation
- `PM33RightSidebar`: Right sidebar with metrics and activity

### UI Components:

- `PM33Card`: Glass morphism cards with hover effects
- `ScenarioCard`: Strategic scenario display cards
- `MetricRow`: Metric display with trend indicators

### Enforcement Rules:

1. **NEVER** create custom layouts with raw HTML
2. **ALWAYS** use PM33 template components
3. **ALWAYS** follow the data interface requirements
4. **NEVER** use inline styles (use PM33 theme classes)
5. **ALWAYS** use PM33Card instead of plain divs

The ESLint rules will enforce these standards automatically.