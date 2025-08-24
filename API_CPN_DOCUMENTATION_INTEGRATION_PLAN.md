# PM33 API/CPN Documentation Library Integration Plan

**Created**: December 2024  
**Status**: Awaiting User Review  
**Context**: Integrate API/CPN documentation with periodic updates from core app

---

## 📋 **Executive Summary**

Transform the current "resources & blog" section into a comprehensive "resources" hub that includes:
- Strategic PM resources (existing)
- **NEW**: API/CPN documentation library with live updates
- **NEW**: App version tracking and documentation availability
- **NEW**: Automated synchronization from core app

---

## 🎯 **Objectives**

### Primary Goals
1. **Consolidate Resources**: Rename "resources & blog" → "resources" 
2. **Live Documentation**: Real-time API/CPN docs from core app
3. **Version Tracking**: Always show current app version + doc status
4. **Automated Updates**: Periodic sync from core app repository
5. **Developer Experience**: Professional API documentation interface

### Success Metrics
- **Documentation Freshness**: <24 hours behind core app
- **Developer Adoption**: API integration tutorials accessed
- **Version Clarity**: 100% visibility into app/doc version alignment
- **Update Reliability**: 99%+ sync success rate

---

## 🏗️ **Architecture Overview**

### **Option 1: Git-Based Synchronization (Recommended)**
```
PM33 Core App Repo
├── /docs/api/              # API documentation source
├── /docs/cpn/              # CPN (Customer Process Navigation) docs  
├── /version.json           # App version metadata
└── /docs/sync-config.json  # Documentation sync configuration

                    ↓ (Git Hook/GitHub Actions)

PM33 Marketing Website
├── /app/(marketing)/resources/
│   ├── page.tsx           # Main resources hub
│   ├── api-docs/          # Generated API documentation
│   │   ├── page.tsx       # API docs landing page
│   │   ├── [...slug]/     # Dynamic API endpoint docs
│   │   └── components/    # API documentation components
│   ├── cpn-docs/          # Generated CPN documentation  
│   │   ├── page.tsx       # CPN docs landing page
│   │   ├── [...slug]/     # Dynamic CPN process docs
│   │   └── components/    # CPN documentation components
│   └── version-info/      # App version and sync status
└── /lib/documentation/    # Documentation utilities
    ├── sync-service.ts    # Git-based sync logic
    ├── version-tracker.ts # Version comparison utilities
    └── doc-parser.ts      # Markdown/API spec parsing
```

### **Option 2: API-Based Synchronization**
```
PM33 Core App
├── /api/documentation/versions    # Version endpoint
├── /api/documentation/api-specs   # OpenAPI/Swagger specs
└── /api/documentation/cpn-guides  # CPN process documentation

                    ↓ (REST API Calls)

PM33 Marketing Website
└── /lib/documentation/
    ├── api-client.ts      # Core app API client
    ├── sync-scheduler.ts  # Periodic update logic
    └── cache-manager.ts   # Local documentation cache
```

---

## 🔧 **Implementation Plan**

### **Phase 1: Foundation Setup (Week 1)**

#### 1.1 Resource Hub Restructure
```tsx
// app/(marketing)/resources/page.tsx - Updated structure
export default function ResourcesPage() {
  return (
    <div className="marketing-context">
      {/* Hero: "Strategic Intelligence Hub" */}
      <ResourcesHero />
      
      {/* NEW: App Version & Documentation Status */}
      <AppVersionBanner />
      
      {/* Existing: Strategic Resources */}
      <StrategicResourcesSection />
      
      {/* NEW: API Documentation Library */}
      <ApiDocumentationSection />
      
      {/* NEW: CPN Process Documentation */}
      <CpnDocumentationSection />
      
      {/* Existing: Content categories, newsletter */}
      <ContentCategoriesSection />
      <NewsletterSignup />
    </div>
  );
}
```

#### 1.2 Version Tracking Component
```tsx
// components/shared/AppVersionBanner.tsx
interface VersionInfo {
  appVersion: string;
  docVersion: string;
  lastSync: string;
  syncStatus: 'current' | 'syncing' | 'stale' | 'error';
}

export function AppVersionBanner() {
  const versionInfo = useVersionInfo();
  
  return (
    <Container size="xl" py={24}>
      <Card radius="md" p={16} bg="gray.0">
        <Group justify="space-between" align="center">
          <Group gap={16}>
            <Badge color="blue" variant="light">
              App v{versionInfo.appVersion}
            </Badge>
            <Badge 
              color={versionInfo.syncStatus === 'current' ? 'green' : 'orange'} 
              variant="light"
            >
              Docs {versionInfo.docVersion}
            </Badge>
            <Text size="sm" c="dimmed">
              Last updated: {formatRelativeTime(versionInfo.lastSync)}
            </Text>
          </Group>
          
          <Group gap={8}>
            <SyncStatusIndicator status={versionInfo.syncStatus} />
            <Button size="xs" variant="subtle">
              View Changelog
            </Button>
          </Group>
        </Group>
      </Card>
    </Container>
  );
}
```

### **Phase 2: Git-Based Sync Implementation (Week 2)**

#### 2.1 Core App Documentation Structure
```
pm33-core-app/
├── docs/
│   ├── api/
│   │   ├── README.md              # API overview
│   │   ├── authentication.md     # Auth methods
│   │   ├── endpoints/
│   │   │   ├── strategic-analysis.md
│   │   │   ├── workflow-execution.md
│   │   │   ├── data-intelligence.md
│   │   │   └── communication.md
│   │   └── openapi.yaml          # OpenAPI specification
│   ├── cpn/
│   │   ├── README.md              # CPN overview
│   │   ├── processes/
│   │   │   ├── strategic-onboarding.md
│   │   │   ├── workflow-setup.md
│   │   │   ├── integration-guide.md
│   │   │   └── troubleshooting.md
│   │   └── examples/
│   │       ├── sample-workflows.md
│   │       └── integration-patterns.md
│   ├── version.json               # Version metadata
│   └── sync-config.json          # Sync configuration
└── .github/
    └── workflows/
        └── sync-docs.yml          # GitHub Action for doc sync
```

#### 2.2 Sync Service Implementation
```typescript
// lib/documentation/sync-service.ts
export class DocumentationSyncService {
  private readonly CORE_APP_REPO = 'pm33-core-app';
  private readonly DOCS_PATH = 'docs';
  
  async syncDocumentation(): Promise<SyncResult> {
    const latestCommit = await this.getLatestDocsCommit();
    const currentVersion = await this.getCurrentVersion();
    
    if (latestCommit.sha === currentVersion.commitSha) {
      return { status: 'current', message: 'Documentation up to date' };
    }
    
    try {
      // Fetch updated documentation
      const apiDocs = await this.fetchDirectoryContents('docs/api');
      const cpnDocs = await this.fetchDirectoryContents('docs/cpn');
      const versionInfo = await this.fetchVersionInfo();
      
      // Parse and transform documentation
      const parsedApiDocs = await this.parseApiDocumentation(apiDocs);
      const parsedCpnDocs = await this.parseCpnDocumentation(cpnDocs);
      
      // Update local documentation cache
      await this.updateDocumentationCache({
        api: parsedApiDocs,
        cpn: parsedCpnDocs,
        version: versionInfo,
        commitSha: latestCommit.sha,
        syncedAt: new Date().toISOString()
      });
      
      return { status: 'success', message: 'Documentation synchronized' };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
}
```

### **Phase 3: Documentation Interface (Week 3)**

#### 3.1 API Documentation Pages
```tsx
// app/(marketing)/resources/api-docs/page.tsx
export default function ApiDocumentationPage() {
  const { apiDocs, version } = useDocumentation();
  
  return (
    <div className="marketing-context">
      <DocumentationHero 
        title="PM33 API Documentation"
        description="Integrate PM33's strategic intelligence into your product workflow"
        version={version.appVersion}
      />
      
      <Container size="xl" py={64}>
        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing={32}>
          {/* Authentication */}
          <ApiSection
            title="Authentication"
            description="API keys, OAuth flows, and security patterns"
            icon={IconLock}
            href="/resources/api-docs/authentication"
          />
          
          {/* Strategic Analysis APIs */}
          <ApiSection
            title="Strategic Analysis"
            description="ICE scoring, competitive analysis, market assessment"
            icon={IconTarget}
            href="/resources/api-docs/strategic-analysis"
          />
          
          {/* Workflow APIs */}
          <ApiSection
            title="Workflow Execution"
            description="Automated task management and process orchestration"
            icon={IconGears}
            href="/resources/api-docs/workflow-execution"
          />
        </SimpleGrid>
      </Container>
      
      <InteractiveApiExplorer apiSpec={apiDocs.openApiSpec} />
    </div>
  );
}
```

#### 3.2 CPN Documentation Pages
```tsx
// app/(marketing)/resources/cpn-docs/page.tsx
export default function CpnDocumentationPage() {
  const { cpnDocs, version } = useDocumentation();
  
  return (
    <div className="marketing-context">
      <DocumentationHero 
        title="Customer Process Navigation (CPN)"
        description="Guide customers through PM33's strategic transformation journey"
        version={version.appVersion}
      />
      
      <Container size="xl" py={64}>
        <ProcessNavigationTree processes={cpnDocs.processes} />
        
        <CpnProcessGrid>
          {/* Strategic Onboarding */}
          <ProcessCard
            title="Strategic Onboarding"
            description="Transform from reactive PM to strategic intelligence"
            steps={cpnDocs.processes.strategicOnboarding.steps}
            duration="2-3 weeks"
          />
          
          {/* Workflow Integration */}
          <ProcessCard
            title="Workflow Integration"
            description="Integrate PM33 with existing PM tools and processes"
            steps={cpnDocs.processes.workflowSetup.steps}
            duration="1-2 weeks"
          />
        </CpnProcessGrid>
      </Container>
    </div>
  );
}
```

### **Phase 4: Automation & Monitoring (Week 4)**

#### 4.1 GitHub Actions Workflow
```yaml
# .github/workflows/sync-documentation.yml
name: Sync Documentation to Marketing Site

on:
  push:
    paths: 
      - 'docs/**'
      - 'version.json'
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:        # Manual trigger

jobs:
  sync-docs:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout core app
        uses: actions/checkout@v3
        with:
          repository: pm33/core-app
          token: ${{ secrets.SYNC_TOKEN }}
          path: core-app
      
      - name: Checkout marketing site
        uses: actions/checkout@v3
        with:
          repository: pm33/marketing-website
          token: ${{ secrets.SYNC_TOKEN }}
          path: marketing-site
      
      - name: Sync documentation
        run: |
          cd marketing-site
          npm install
          npm run sync-docs
        env:
          CORE_APP_PATH: ../core-app
          
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v4
        with:
          path: marketing-site
          title: 'docs: sync from core app'
          body: 'Automated documentation sync from core app'
          branch: docs/auto-sync
```

#### 4.2 Sync Monitoring Dashboard
```tsx
// app/(marketing)/resources/sync-status/page.tsx
export default function SyncStatusPage() {
  const { syncHistory, currentStatus } = useSyncMonitoring();
  
  return (
    <div className="marketing-context">
      <Container size="xl" py={64}>
        <Title order={2} mb={32}>Documentation Sync Status</Title>
        
        {/* Current Status Card */}
        <SyncStatusCard status={currentStatus} />
        
        {/* Sync History */}
        <SyncHistoryTable history={syncHistory} />
        
        {/* Manual Sync Controls */}
        <ManualSyncControls />
      </Container>
    </div>
  );
}
```

---

## 🔄 **Synchronization Strategy**

### **Automatic Sync Triggers**
1. **Git Hook**: On commit to `docs/` in core app
2. **Scheduled**: Every 6 hours via GitHub Actions
3. **Version Release**: On new app version tag
4. **Manual**: Admin-triggered sync button

### **Sync Process Flow**
```
1. Detect Changes
   ├── Compare commit SHAs
   ├── Check version.json updates
   └── Monitor documentation file modifications

2. Fetch Updates
   ├── Pull latest documentation files
   ├── Download OpenAPI specifications  
   └── Retrieve version metadata

3. Transform Content
   ├── Parse Markdown → React components
   ├── Generate API reference pages
   └── Create navigation structures

4. Update Marketing Site
   ├── Update documentation cache
   ├── Regenerate static pages
   └── Update version information

5. Notify & Monitor
   ├── Log sync results
   ├── Update sync status dashboard
   └── Alert on sync failures
```

### **Conflict Resolution**
- **Core App Priority**: Core app documentation always overwrites marketing site
- **Version Locks**: Marketing site can lock to specific core app version
- **Rollback Support**: Keep last 5 successful sync states for rollback
- **Manual Override**: Admin can manually edit docs with conflict warnings

---

## 📊 **User Experience Design**

### **Navigation Integration**
```tsx
// Updated resources page navigation
const resourceCategories = [
  {
    title: "Strategic Frameworks",
    description: "Battle-tested PM methodologies",
    icon: IconTarget,
    href: "/resources/frameworks"
  },
  {
    title: "API Documentation", // NEW
    description: "Integrate PM33 into your workflow",
    icon: IconCode,
    href: "/resources/api-docs"
  },
  {
    title: "Process Navigation", // NEW  
    description: "Customer transformation guides",
    icon: IconMap,
    href: "/resources/cpn-docs"
  },
  {
    title: "Strategic Insights",
    description: "Deep-dive articles and case studies", 
    icon: IconBrain,
    href: "/resources/blog"
  }
];
```

### **Version Awareness UX**
```tsx
// Smart version warnings
{docVersion !== appVersion && (
  <Alert color="orange" icon={<IconInfoCircle />}>
    <Text size="sm">
      Documentation is for v{docVersion}, but app is now v{appVersion}.
      <Anchor href="/resources/sync-status" ml={8}>
        View sync status →
      </Anchor>
    </Text>
  </Alert>
)}
```

### **Developer Experience Features**
- **Interactive API Explorer**: Test endpoints directly in documentation
- **Code Examples**: Copy-paste integration examples in multiple languages
- **Postman Collection**: Auto-generated from OpenAPI spec
- **SDK Downloads**: Links to official SDKs and libraries
- **Changelog Integration**: View API changes between versions

---

## 🛡️ **Security & Performance**

### **Security Considerations**
- **API Token Management**: Secure storage of GitHub tokens
- **Content Validation**: Sanitize markdown before rendering
- **Access Control**: Admin-only sync triggers and controls
- **Audit Logging**: Track all documentation changes and sync events

### **Performance Optimization**
- **Static Generation**: Pre-build documentation pages at build time
- **CDN Caching**: Cache documentation assets with appropriate TTL
- **Incremental Updates**: Only update changed documentation sections
- **Search Indexing**: Full-text search across all documentation

---

## 📈 **Success Metrics & Monitoring**

### **Technical Metrics**
- **Sync Success Rate**: Target 99%+ successful syncs
- **Documentation Freshness**: <24 hours behind core app
- **Page Load Speed**: Documentation pages <2s LCP
- **Search Performance**: Documentation search <500ms response

### **User Experience Metrics**
- **API Adoption**: Number of developers accessing API docs
- **Integration Success**: Successful API integrations per month
- **Documentation Usage**: Most accessed docs and search queries
- **User Satisfaction**: NPS score for documentation experience

### **Business Metrics**
- **Developer Activation**: Developers who complete API integration
- **Integration Retention**: Long-term API usage patterns
- **Support Reduction**: Fewer documentation-related support tickets
- **Community Growth**: Developer community engagement and contributions

---

## 🚀 **Next Steps**

### **Immediate Actions (This Week)**
1. **User Review**: Get approval on overall architecture approach
2. **Repository Setup**: Create documentation structure in core app
3. **Version Baseline**: Establish current version tracking system

### **Implementation Priority**
1. **Phase 1**: Resource hub restructure + version tracking (Week 1)
2. **Phase 2**: Git-based sync service implementation (Week 2)  
3. **Phase 3**: API/CPN documentation interfaces (Week 3)
4. **Phase 4**: Automation, monitoring, and optimization (Week 4)

### **Risk Mitigation**
- **Backup Strategy**: Always maintain local documentation cache
- **Graceful Degradation**: Show last successful sync if current sync fails
- **Monitoring Alerts**: Immediate notification of sync failures
- **Manual Override**: Admin ability to bypass automated sync when needed

---

**Recommendation**: Proceed with **Option 1: Git-Based Synchronization** for reliability, version control, and developer workflow integration.

**Total Timeline**: 4 weeks for full implementation
**Resource Requirements**: 1 developer full-time + periodic review cycles

Would you like me to proceed with Phase 1 implementation or modify any aspect of this plan?