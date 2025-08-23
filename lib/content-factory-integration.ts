// lib/content-factory-integration.ts
// Content Factory Integration System for PM33 Website
// This connects the local content factory system to the web application
// RELEVANT FILES: /Users/ssaper/Desktop/my-projects/PM33/scripts/keyword-factory-automation.js

import fs from 'fs';
import path from 'path';

interface ContentFactoryConfig {
  // Path to the content factory on local machine
  CONTENT_FACTORY_ROOT: string;
  FINAL_DRAFTS_DIR: string;
  KEYWORDS_FILE: string;
  
  // Website paths
  MARKETING_PAGES_DIR: string;
  BLOG_CONTENT_DIR: string;
}

interface GeneratedContent {
  keyword: string;
  title: string;
  description: string;
  content: string;
  category: string;
  readTime: string;
  url: string;
  featured: boolean;
  metaData: {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
  };
  structuredData: any;
  generated: string;
}

interface ContentFactoryArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  featured: boolean;
  url: string;
  keyword: string;
  content?: string;
}

export class ContentFactoryIntegration {
  private config: ContentFactoryConfig;

  constructor() {
    this.config = {
      CONTENT_FACTORY_ROOT: '/Users/ssaper/Desktop/my-projects/PM33',
      FINAL_DRAFTS_DIR: 'final drafts',
      KEYWORDS_FILE: 'keywords.md',
      MARKETING_PAGES_DIR: '/Users/ssaper/Desktop/my-projects/pm33-claude-execution/app/frontend/app/(marketing)',
      BLOG_CONTENT_DIR: '/Users/ssaper/Desktop/my-projects/pm33-claude-execution/app/frontend/lib/content'
    };
  }

  /**
   * Scan content factory directories and generate resource articles array
   */
  async generateResourceArticles(): Promise<ContentFactoryArticle[]> {
    const articles: ContentFactoryArticle[] = [];
    
    try {
      // Scan final drafts directory for completed content
      const finalDraftsPath = path.join(this.config.CONTENT_FACTORY_ROOT, this.config.FINAL_DRAFTS_DIR);
      
      // Check product-sites directory for landing pages
      const productSitesPath = path.join(finalDraftsPath, 'product-sites');
      if (fs.existsSync(productSitesPath)) {
        const productFiles = fs.readdirSync(productSitesPath);
        
        for (const file of productFiles) {
          if (file.endsWith('.md')) {
            const article = await this.processMarkdownFile(
              path.join(productSitesPath, file),
              'landing-page',
              true // Featured for product sites
            );
            if (article) articles.push(article);
          }
        }
      }

      // Check blogs directory for blog posts  
      const blogsPath = path.join(finalDraftsPath, 'blogs');
      if (fs.existsSync(blogsPath)) {
        const blogFiles = fs.readdirSync(blogsPath);
        
        for (const file of blogFiles) {
          if (file.endsWith('.md')) {
            const article = await this.processMarkdownFile(
              path.join(blogsPath, file),
              'blog-post',
              false // Not featured by default
            );
            if (article) articles.push(article);
          }
        }
      }

      console.log(`✅ Generated ${articles.length} resource articles from content factory`);
      return articles;

    } catch (error) {
      console.error('❌ Error generating resource articles:', error);
      return this.getFallbackArticles(); // Return hardcoded fallback
    }
  }

  /**
   * Process individual markdown file from content factory
   */
  private async processMarkdownFile(
    filePath: string,
    contentType: string,
    featured: boolean
  ): Promise<ContentFactoryArticle | null> {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const filename = path.basename(filePath, '.md');
      
      // Extract title from markdown (first # heading)
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : this.formatTitle(filename);
      
      // Extract description (first paragraph after title)
      const descriptionMatch = content.match(/^##?\s+(.+?)[\r\n]+([\s\S]+?)(?=[\r\n]#{1,2}\s|$)/m);
      const description = descriptionMatch ? 
        descriptionMatch[2].replace(/\*\*(.+?)\*\*/g, '$1').substring(0, 150) + '...' :
        `Comprehensive guide for ${this.extractKeywordFromFilename(filename)}`;

      // Extract keyword from filename or content
      const keyword = this.extractKeywordFromFilename(filename);
      
      // Determine category based on content type and keyword
      const category = this.determineCategory(keyword, contentType);
      
      // Calculate estimated read time
      const wordCount = content.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200) + ' min read';

      // Generate URL slug
      const url = '/' + filename.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

      return {
        id: filename,
        title,
        description,
        category,
        readTime,
        featured,
        url,
        keyword,
        content: content // Store full content for page generation
      };

    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Extract keyword from filename
   */
  private extractKeywordFromFilename(filename: string): string {
    return filename
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Format filename to readable title
   */
  private formatTitle(filename: string): string {
    return filename
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Determine content category
   */
  private determineCategory(keyword: string, contentType: string): string {
    if (keyword.includes('AI') || keyword.includes('automation')) return 'AI Tools';
    if (keyword.includes('strategy') || keyword.includes('strategic')) return 'Strategic Intelligence';
    if (keyword.includes('management') || keyword.includes('planning')) return 'Resource Management';
    if (keyword.includes('demo') || contentType === 'demo') return 'Platform Demo';
    if (contentType === 'blog-post') return 'Strategic Insights';
    return 'Product Management';
  }

  /**
   * Deploy generated content as Next.js pages
   */
  async deployContentAsPages(articles: ContentFactoryArticle[]): Promise<void> {
    console.log(`🚀 Deploying ${articles.length} content factory articles as Next.js pages...`);

    for (const article of articles) {
      if (article.content) {
        await this.createNextJSPage(article);
      }
    }
  }

  /**
   * Create Next.js page from article content
   */
  private async createNextJSPage(article: ContentFactoryArticle): Promise<void> {
    const urlPath = article.url.substring(1); // Remove leading slash
    const fileName = `${urlPath}/page.tsx`;
    const fullPath = path.join(this.config.MARKETING_PAGES_DIR, fileName);
    
    // Create directory if it doesn't exist
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Generate Next.js page component
    const pageComponent = this.generateNextJSPageComponent(article);
    
    // Write the file
    fs.writeFileSync(fullPath, pageComponent);
    
    console.log(`✅ Created: ${fileName}`);
  }

  /**
   * Generate Next.js page component from article
   */
  private generateNextJSPageComponent(article: ContentFactoryArticle): string {
    const componentName = this.keywordToPascalCase(article.keyword);
    
    return `/**
 * Generated by PM33 Content Factory
 * Target keyword: ${article.keyword}
 * Generated: ${new Date().toISOString().split('T')[0]}
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

        {/* Content Section - Would be populated with processed markdown */}
        <Card shadow="sm" padding={32} radius={16}>
          <div dangerouslySetInnerHTML={{ 
            __html: this.markdownToHtml('${article.content?.replace(/'/g, "\\'")}') 
          }} />
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
}

// Helper function to convert markdown to HTML (simplified)
function markdownToHtml(markdown: string): string {
  if (!markdown) return '';
  
  return markdown
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
    .replace(/\\n\\n/g, '</p><p>')
    .replace(/^(.+)$/gm, '<p>$1</p>')
    .replace(/<p><h/g, '<h')
    .replace(/<\\/h([1-6])><\\/p>/g, '</h$1>');
}`;
  }

  /**
   * Convert keyword to PascalCase for component names
   */
  private keywordToPascalCase(keyword: string): string {
    return keyword
      .split(/[\s-]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
      .replace(/[^a-zA-Z0-9]/g, '');
  }

  /**
   * Fallback articles if content factory is not accessible
   */
  private getFallbackArticles(): ContentFactoryArticle[] {
    return [
      {
        id: 'ai-roadmap-planning-software',
        title: 'AI-Powered Roadmap Planning Software for Strategic Teams',
        description: 'Discover how AI transforms roadmap planning with strategic intelligence. Compare implementation strategies and advanced PM methodologies.',
        category: 'Strategic Intelligence',
        readTime: '10 min read',
        featured: true,
        url: '/ai-roadmap-planning-software',
        keyword: 'AI Roadmap Planning Software'
      },
      {
        id: 'strategic-chat-intelligence',
        title: 'Strategic Chat Intelligence for Product Teams',
        description: 'Experience PM33\'s strategic conversation AI. See how intelligent dialogue transforms product decision-making processes.',
        category: 'AI Tools',
        readTime: '8 min read',
        featured: true,
        url: '/strategic-chat',
        keyword: 'Strategic Chat Intelligence'
      },
      {
        id: 'resource-optimizer-guide',
        title: 'Resource Optimization with AI Intelligence',
        description: 'Advanced resource planning using PM33\'s intelligent optimization algorithms. Maximize team efficiency and strategic outcomes.',
        category: 'Resource Management',
        readTime: '12 min read',
        featured: false,
        url: '/resource-optimizer',
        keyword: 'Resource Optimization'
      },
      {
        id: 'command-center-demo',
        title: 'PM33 Strategic Command Center Demo',
        description: 'Live demonstration of PM33\'s command center capabilities. See real-time strategic intelligence and PMO transformation in action.',
        category: 'Platform Demo',
        readTime: '5 min demo',
        featured: false,
        url: '/command-center-demo',
        keyword: 'Command Center Demo'
      }
    ];
  }

  /**
   * Update blog page with content factory articles
   */
  async updateBlogPageWithContentFactory(): Promise<string> {
    const articles = await this.generateResourceArticles();
    
    // Generate the updated resourceArticles array as TypeScript code
    const articlesCode = articles.map(article => `  {
    id: '${article.id}',
    title: '${article.title.replace(/'/g, "\\'")}',
    description: '${article.description.replace(/'/g, "\\'")}',
    category: '${article.category}',
    readTime: '${article.readTime}',
    featured: ${article.featured},
    url: '${article.url}'
  }`).join(',\n');

    return `// Auto-generated from PM33 Content Factory
// Updated: ${new Date().toISOString()}
const resourceArticles = [
${articlesCode}
];`;
  }
}

// Export singleton instance
export const contentFactory = new ContentFactoryIntegration();