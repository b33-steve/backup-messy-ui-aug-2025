// app/frontend/app/page.tsx
// Root homepage - Re-export marketing homepage
// WHY: Next.js requires a root page.tsx file, this serves the marketing content directly
// RELEVANT FILES: app/layout.tsx, app/(marketing)/page.tsx

export { default } from './(marketing)/page';