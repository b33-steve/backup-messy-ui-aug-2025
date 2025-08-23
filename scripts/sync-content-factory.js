#!/usr/bin/env node

/**
 * PM33 Content Factory Sync Script
 * 
 * Syncs content from local content factory to web application
 * Usage: node scripts/sync-content-factory.js [command]
 * Commands: sync, deploy, update-blog, help
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  // Content factory paths
  CONTENT_FACTORY_ROOT: '/Users/ssaper/Desktop/my-projects/PM33',
  FINAL_DRAFTS_DIR: 'final drafts',
  KEYWORDS_FILE: 'keywords.md',
  
  // Web app paths  
  WEB_APP_ROOT: path.join(__dirname, '..'),
  MARKETING_PAGES_DIR: path.join(__dirname, '../app/(marketing)'),
  BLOG_PAGE_PATH: path.join(__dirname, '../app/(marketing)/blog/page.tsx'),
  
  // Sync settings
  AUTO_DEPLOY_PAGES: false, // Set to true to auto-create Next.js pages
  UPDATE_BLOG_ONLY: true    // Set to false to also create individual pages
};

class ContentFactorySync {
  constructor() {
    this.articles = [];
  }

  /**
   * Main sync command - syncs content factory to web app
   */
  async sync() {
    console.log('🏭 PM33 Content Factory Sync Starting...');
    console.log(`📂 Source: ${CONFIG.CONTENT_FACTORY_ROOT}`);
    console.log(`🌐 Target: ${CONFIG.WEB_APP_ROOT}`);
    console.log('─'.repeat(50));

    try {
      // Step 1: Scan content factory
      await this.scanContentFactory();
      
      // Step 2: Update blog page with discovered content
      await this.updateBlogPage();
      
      // Step 3: Optionally deploy individual pages
      if (CONFIG.AUTO_DEPLOY_PAGES) {
        await this.deployPages();
      }

      console.log('─'.repeat(50));
      console.log(`✅ Sync complete! ${this.articles.length} articles processed`);
      console.log('🎯 Next steps:');
      console.log('   • Run "npm run dev" to see updated content');
      console.log('   • Run "node scripts/sync-content-factory.js deploy" to create individual pages');

    } catch (error) {
      console.error('❌ Sync failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Scan content factory directories for articles
   */
  async scanContentFactory() {
    console.log('🔍 Scanning content factory...');
    
    if (!fs.existsSync(CONFIG.CONTENT_FACTORY_ROOT)) {
      throw new Error(`Content factory not found at: ${CONFIG.CONTENT_FACTORY_ROOT}`);
    }

    const finalDraftsPath = path.join(CONFIG.CONTENT_FACTORY_ROOT, CONFIG.FINAL_DRAFTS_DIR);
    
    if (!fs.existsSync(finalDraftsPath)) {
      console.log('⚠️  Final drafts directory not found, using existing content');
      return;
    }

    // Scan product-sites directory
    const productSitesPath = path.join(finalDraftsPath, 'product-sites');
    if (fs.existsSync(productSitesPath)) {
      const productFiles = fs.readdirSync(productSitesPath).filter(f => f.endsWith('.md'));
      console.log(`📄 Found ${productFiles.length} product landing pages`);
      
      for (const file of productFiles) {
        const article = this.processMarkdownFile(path.join(productSitesPath, file), true);
        if (article) this.articles.push(article);
      }
    }

    // Scan blogs directory
    const blogsPath = path.join(finalDraftsPath, 'blogs');
    if (fs.existsSync(blogsPath)) {
      const blogFiles = fs.readdirSync(blogsPath).filter(f => f.endsWith('.md'));
      console.log(`📝 Found ${blogFiles.length} blog posts`);
      
      for (const file of blogFiles) {
        const article = this.processMarkdownFile(path.join(blogsPath, file), false);
        if (article) this.articles.push(article);
      }
    }

    console.log(`✅ Processed ${this.articles.length} total articles`);
  }

  /**
   * Process individual markdown file
   */
  processMarkdownFile(filePath, featured = false) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const filename = path.basename(filePath, '.md');
      
      // Extract title from first heading
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : this.formatTitle(filename);
      
      // Extract description from content
      const descriptionMatch = content.match(/^\*\*(.+?)\*\*$/m) || 
                              content.match(/^>?\s*(.+?)$/m);
      let description = descriptionMatch ? descriptionMatch[1] : '';
      
      // Fallback description extraction
      if (!description) {
        const paragraphMatch = content.match(/^[^#\*\-\n]+$/m);
        description = paragraphMatch ? paragraphMatch[0].trim() : '';
      }
      
      // Ensure description is properly formatted
      description = description
        .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold formatting
        .replace(/^\*+\s*/, '')          // Remove leading asterisks
        .trim();
      
      if (description.length > 150) {
        description = description.substring(0, 150) + '...';
      }
      
      if (!description) {
        description = `Comprehensive guide for ${this.extractKeywordFromFilename(filename)}`;
      }

      // Calculate read time
      const wordCount = content.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200) + ' min read';

      // Generate URL
      const url = '/' + filename.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

      // Determine category
      const keyword = this.extractKeywordFromFilename(filename);
      const category = this.determineCategory(keyword, filename);

      return {
        id: filename,
        title,
        description,
        category,
        readTime,
        featured,
        url,
        keyword,
        filePath
      };

    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
      return null;
    }
  }

  /**
   * Extract keyword from filename
   */
  extractKeywordFromFilename(filename) {
    return filename
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Format filename to title
   */
  formatTitle(filename) {
    return filename
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Determine category
   */
  determineCategory(keyword, filename) {
    if (keyword.includes('AI') || keyword.includes('Automation')) return 'AI Tools';
    if (keyword.includes('Strategic') || keyword.includes('Strategy')) return 'Strategic Intelligence';
    if (keyword.includes('Resource') || keyword.includes('Planning')) return 'Resource Management';
    if (keyword.includes('Demo') || filename.includes('demo')) return 'Platform Demo';
    if (filename.includes('blog')) return 'Strategic Insights';
    return 'Product Management';
  }

  /**
   * Update blog page with discovered articles
   */
  async updateBlogPage() {
    console.log('📝 Updating blog page with content factory articles...');
    
    if (!fs.existsSync(CONFIG.BLOG_PAGE_PATH)) {
      throw new Error(`Blog page not found at: ${CONFIG.BLOG_PAGE_PATH}`);
    }

    // Read current blog page
    let blogContent = fs.readFileSync(CONFIG.BLOG_PAGE_PATH, 'utf8');
    
    // Generate articles array code
    const articlesCode = this.articles.map(article => `  {
    id: '${article.id}',
    title: '${article.title.replace(/'/g, "\\'")}',
    description: '${article.description.replace(/'/g, "\\'")}',
    category: '${article.category}',
    readTime: '${article.readTime}',
    featured: ${article.featured},
    url: '${article.url}'
  }`).join(',\n');

    const newArticlesArray = `// Auto-generated from PM33 Content Factory - ${new Date().toISOString()}
const resourceArticles = [
${articlesCode}
];`;

    // Replace existing resourceArticles array
    const arrayRegex = /\/\/[^\n]*resourceArticles[\s\S]*?const resourceArticles = \[[^\]]*\];/;
    
    if (arrayRegex.test(blogContent)) {
      blogContent = blogContent.replace(arrayRegex, newArticlesArray);
    } else {
      // If not found, replace the old simple array
      const simpleArrayRegex = /const resourceArticles = \[[^\]]*\];/s;
      if (simpleArrayRegex.test(blogContent)) {
        blogContent = blogContent.replace(simpleArrayRegex, newArticlesArray);
      } else {
        console.log('⚠️  Could not find resourceArticles array to replace');
        return;
      }
    }

    // Write updated blog page
    fs.writeFileSync(CONFIG.BLOG_PAGE_PATH, blogContent);
    console.log(`✅ Updated blog page with ${this.articles.length} articles`);
  }

  /**
   * Deploy individual pages for articles
   */
  async deployPages() {
    console.log('🚀 Deploying individual pages...');
    
    let deployedCount = 0;
    
    for (const article of this.articles) {
      try {
        const urlPath = article.url.substring(1); // Remove leading slash
        const pageDir = path.join(CONFIG.MARKETING_PAGES_DIR, urlPath);
        const pagePath = path.join(pageDir, 'page.tsx');
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(pageDir)) {
          fs.mkdirSync(pageDir, { recursive: true });
        }
        
        // Generate page component
        const pageComponent = this.generatePageComponent(article);
        
        // Write page file
        fs.writeFileSync(pagePath, pageComponent);
        
        console.log(`✅ Created: ${urlPath}/page.tsx`);
        deployedCount++;
        
      } catch (error) {
        console.error(`❌ Failed to deploy ${article.url}:`, error.message);
      }
    }
    
    console.log(`✅ Deployed ${deployedCount} pages`);
  }

  /**
   * Generate Next.js page component
   */
  generatePageComponent(article) {
    const componentName = article.keyword.replace(/[^a-zA-Z0-9]/g, '');
    
    return `/**
 * Generated by PM33 Content Factory Sync
 * Source: ${article.filePath || 'Content Factory'}
 * Target keyword: ${article.keyword}
 * Generated: ${new Date().toISOString()}
 */

'use client';

import { Container, Title, Text, Button, Card, Stack, Group } from '@mantine/core';
import Link from 'next/link';

export default function ${componentName}Page() {
  return (
    <div className="marketing-context">
      <Container size={1200} px={24} py={80}>
        {/* Hero Section */}
        <Card shadow="md" padding={32} radius={16} mb={48}>
          <Stack align="center" gap={24}>
            <Title order={1} size="48px" fw={700} ta="center">
              ${article.title}
            </Title>
            
            <Text size="xl" c="var(--marketing-text-secondary)" ta="center" maw={800}>
              ${article.description}
            </Text>
            
            <Group>
              <Button 
                component={Link}
                href="/trial"
                size="lg"
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: 600
                }}
              >
                Start Free 14-Day Trial
              </Button>
              
              <Button 
                component={Link}
                href="/strategic-intelligence"
                size="lg"
                variant="outline"
                style={{ borderColor: 'var(--marketing-primary)' }}
              >
                See Live Demo
              </Button>
            </Group>
          </Stack>
        </Card>

        {/* Content would be loaded from original markdown file */}
        <Card shadow="sm" padding={32} radius={16}>
          <Text size="lg" mb="lg">
            Content from: <code>${article.keyword}</code>
          </Text>
          <Text c="dimmed">
            This page was generated from your content factory. 
            To display full content, implement markdown processing in the component.
          </Text>
        </Card>

        {/* CTA Section */}
        <Card 
          shadow="xl" 
          padding="xl" 
          radius="lg" 
          mt={60} 
          ta="center"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <Title order={2} c="white" mb="lg">Ready to Transform Your PM Workflow?</Title>
          <Text size="lg" mb="lg" opacity={0.9}>
            Join 2,500+ product managers using PM33's AI-powered strategic intelligence platform
          </Text>
          <Group justify="center">
            <Button 
              size="lg"
              variant="white"
              color="dark"
              component={Link}
              href="/trial"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg"
              variant="outline"
              style={{ borderColor: 'white', color: 'white' }}
              component={Link}
              href="/strategic-intelligence"
            >
              See Live Demo
            </Button>
          </Group>
        </Card>
      </Container>
    </div>
  );
}`;
  }

  /**
   * Show help information
   */
  showHelp() {
    console.log(`
🏭 PM33 Content Factory Sync Tool

Commands:
  sync     - Sync content factory to web app (updates blog page)
  deploy   - Deploy individual pages for all articles
  help     - Show this help information

Usage:
  node scripts/sync-content-factory.js [command]

Examples:
  node scripts/sync-content-factory.js sync
  node scripts/sync-content-factory.js deploy

Configuration:
  Content Factory: ${CONFIG.CONTENT_FACTORY_ROOT}
  Web App: ${CONFIG.WEB_APP_ROOT}
  Auto Deploy: ${CONFIG.AUTO_DEPLOY_PAGES}
    `);
  }
}

// Command line interface
async function main() {
  const command = process.argv[2] || 'sync';
  const sync = new ContentFactorySync();

  switch (command) {
    case 'sync':
      await sync.sync();
      break;
      
    case 'deploy':
      await sync.scanContentFactory();
      await sync.deployPages();
      break;
      
    case 'help':
      sync.showHelp();
      break;
      
    default:
      console.log(`Unknown command: ${command}`);
      sync.showHelp();
      process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = ContentFactorySync;