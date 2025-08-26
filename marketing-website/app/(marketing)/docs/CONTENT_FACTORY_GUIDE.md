# 🏭 PM33 Content Factory Complete Usage Guide

## 📍 **Directory Navigation**

### **Step 1: Navigate to Web App Directory**
```bash
# In Terminal, navigate to the web app directory:
cd /Users/ssaper/Desktop/my-projects/pm33-claude-execution/app/frontend

# Verify you're in the right place:
pwd
# Should show: /Users/ssaper/Desktop/my-projects/pm33-claude-execution/app/frontend
```

### **Step 2: Available Commands**
```bash
# Sync content from factory to website
node scripts/sync-content-factory.js sync

# Deploy individual pages for articles
node scripts/sync-content-factory.js deploy  

# Show help information
node scripts/sync-content-factory.js help
```

---

## 🚀 **Complete Workflow**

### **Workflow 1: Create New Content & Sync**
```bash
# 1. Create content in your content factory (other Claude environment)
#    Location: /Users/ssaper/Desktop/my-projects/PM33/final drafts/

# 2. Navigate to web app directory
cd /Users/ssaper/Desktop/my-projects/pm33-claude-execution/app/frontend

# 3. Sync new content to website  
node scripts/sync-content-factory.js sync

# 4. Start marketing website (if not running)
PORT=8000 npm run dev

# 5. View results at:
#    Blog page: http://localhost:8000/blog
#    Individual articles: http://localhost:8000/[article-url]
```

### **Workflow 2: Deploy Individual Article Pages**
```bash
# Navigate to web app directory
cd /Users/ssaper/Desktop/my-projects/pm33-claude-execution/app/frontend

# Deploy pages for all articles
node scripts/sync-content-factory.js deploy
```

---

## 🎯 **What Each Command Does**

### **`sync` Command**
- **Scans**: `/Users/ssaper/Desktop/my-projects/PM33/final drafts/`
- **Discovers**: All `.md` files in `product-sites/` and `blogs/`
- **Updates**: `/app/(marketing)/blog/page.tsx` with new article list
- **Output**: Updated blog page with your content factory articles

### **`deploy` Command**  
- **Creates**: Individual Next.js pages for each article
- **Location**: `/app/(marketing)/[article-slug]/page.tsx`
- **URLs**: `http://localhost:8000/[article-slug]`

---

## 📂 **File Structure After Sync**

```
app/frontend/
├── scripts/
│   └── sync-content-factory.js                # Sync script
├── app/(marketing)/
│   ├── blog/page.tsx                          # Updated with your articles
│   ├── ai-product-management-tool/page.tsx    # Auto-generated
│   └── [other-articles]/page.tsx              # Auto-generated
└── lib/
    └── content-factory-integration.ts         # Integration system
```

---

## 🔧 **Troubleshooting**

### **Error: "Content factory not found"**
```bash
# Verify content factory exists:
ls -la /Users/ssaper/Desktop/my-projects/PM33/
ls -la /Users/ssaper/Desktop/my-projects/PM33/final\ drafts/
```

### **Error: "Command not found"**
```bash
# Make sure you're in the right directory:
cd /Users/ssaper/Desktop/my-projects/pm33-claude-execution/app/frontend

# Verify script exists:
ls -la scripts/sync-content-factory.js
```

### **No Articles Found**
```bash
# Check if content exists in final drafts:
ls -la "/Users/ssaper/Desktop/my-projects/PM33/final drafts/product-sites/"
ls -la "/Users/ssaper/Desktop/my-projects/PM33/final drafts/blogs/"
```

---

## 🎯 **Expected Output**

### **Successful Sync Example**
```
🏭 PM33 Content Factory Sync Starting...
📂 Source: /Users/ssaper/Desktop/my-projects/PM33
🌐 Target: /Users/ssaper/Desktop/my-projects/pm33-claude-execution/app/frontend
──────────────────────────────────────────────────
🔍 Scanning content factory...
📄 Found 3 product landing pages
📝 Found 2 blog posts
✅ Processed 5 total articles
📝 Updating blog page with content factory articles...
✅ Updated blog page with 5 articles
──────────────────────────────────────────────────
✅ Sync complete! 5 articles processed
```

### **Successful Deploy Example**
```
🚀 Deploying individual pages...
✅ Created: ai-product-management-tool/page.tsx
✅ Created: product-management-software/page.tsx
✅ Created: strategic-pm-guide/page.tsx
✅ Deployed 3 pages
```

---

## 📝 **Quick Reference Card**

**Always run from this directory:**
```bash
cd /Users/ssaper/Desktop/my-projects/pm33-claude-execution/app/frontend
```

**Main commands:**
```bash
node scripts/sync-content-factory.js sync     # Update blog page
node scripts/sync-content-factory.js deploy   # Create article pages
PORT=8000 npm run dev                         # Start website
```

**Check results:**
- Blog: http://localhost:8000/blog
- Articles: http://localhost:8000/[article-name]

---

## 🔄 **Integration with Your Existing Workflow**

1. **Content Creation** (Your other Claude environment)
   - Use sophisticated AI keyword research  
   - Generate SEO-optimized content
   - Save to `/Users/ssaper/Desktop/my-projects/PM33/final drafts/`

2. **Content Sync** (This environment)
   - Run sync command to update website
   - Deploy individual pages if needed
   - Content automatically appears on marketing site

3. **SEO Benefits**
   - Articles automatically get proper URLs
   - Meta descriptions from content
   - Structured data for search engines
   - Internal linking between articles

This creates a seamless pipeline from your AI content factory to the live marketing website!