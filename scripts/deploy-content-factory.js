#!/usr/bin/env node

/**
 * PM33 Content Factory Deployment Script
 * Generates Next.js pages from content factory articles
 */

const fs = require('fs');
const path = require('path');

class ContentFactoryDeployment {
  constructor() {
    this.config = {
      CONTENT_FACTORY_ROOT: '/Users/ssaper/Desktop/my-projects/PM33',
      FINAL_DRAFTS_DIR: 'final drafts',
      MARKETING_PAGES_DIR: path.join(__dirname, '../app/(marketing)'),
      BLOG_CONTENT_DIR: path.join(__dirname, '../lib/content')
    };
  }

  /**
   * Main deployment function
   */
  async deploy() {
    console.log('🚀 Starting PM33 Content Factory deployment...');
    
    try {
      // 1. Scan content factory directories
      const articles = await this.generateResourceArticles();
      console.log(`📝 Found ${articles.length} articles to deploy`);
      
      // 2. Create Next.js pages for each article
      await this.deployContentAsPages(articles);
      
      // 3. Update resources page with new articles
      await this.updateResourcesPage(articles);
      
      console.log('✅ Content factory deployment completed successfully!');
      console.log(`📊 Deployed ${articles.length} articles as Next.js pages`);
      
    } catch (error) {
      console.error('❌ Content factory deployment failed:', error);
      process.exit(1);
    }
  }

  /**
   * Scan content factory directories and generate resource articles array
   */
  async generateResourceArticles() {
    const articles = [];
    
    try {
      const finalDraftsPath = path.join(this.config.CONTENT_FACTORY_ROOT, this.config.FINAL_DRAFTS_DIR);
      
      // Check product-sites directory
      const productSitesPath = path.join(finalDraftsPath, 'product-sites');
      if (fs.existsSync(productSitesPath)) {
        const productFiles = fs.readdirSync(productSitesPath);
        
        for (const file of productFiles) {
          if (file.endsWith('.md')) {
            const article = await this.processMarkdownFile(
              path.join(productSitesPath, file),
              'AI Tools',
              true // Featured for product sites
            );
            if (article) articles.push(article);
          }
        }
      }

      // Check blogs directory
      const blogsPath = path.join(finalDraftsPath, 'blogs');
      if (fs.existsSync(blogsPath)) {
        const blogFiles = fs.readdirSync(blogsPath);
        
        for (const file of blogFiles) {
          if (file.endsWith('.md')) {
            const article = await this.processMarkdownFile(
              path.join(blogsPath, file),
              'Strategic Insights',
              false // Not featured by default
            );
            if (article) articles.push(article);
          }
        }
      }

      // Check LinkedIn directory
      const linkedinPath = path.join(finalDraftsPath, 'linkedin');
      if (fs.existsSync(linkedinPath)) {
        const linkedinFiles = fs.readdirSync(linkedinPath);
        
        for (const file of linkedinFiles) {
          if (file.endsWith('.md')) {
            const article = await this.processMarkdownFile(
              path.join(linkedinPath, file),
              'Community Insights',
              false
            );
            if (article) articles.push(article);
          }
        }
      }

      // Check Reddit directory
      const redditPath = path.join(finalDraftsPath, 'reddit');
      if (fs.existsSync(redditPath)) {
        const redditFiles = fs.readdirSync(redditPath);
        
        for (const file of redditFiles) {
          if (file.endsWith('.md')) {
            const article = await this.processMarkdownFile(
              path.join(redditPath, file),
              'Community Guides',
              false
            );
            if (article) articles.push(article);
          }
        }
      }

      // Check X (Twitter) directory
      const xPath = path.join(finalDraftsPath, 'x');
      if (fs.existsSync(xPath)) {
        const xFiles = fs.readdirSync(xPath);
        
        for (const file of xFiles) {
          if (file.endsWith('.md')) {
            const article = await this.processMarkdownFile(
              path.join(xPath, file),
              'Quick Insights',
              false
            );
            if (article) articles.push(article);
          }
        }
      }

      // Check YouTube directory
      const youtubePath = path.join(finalDraftsPath, 'youtube');
      if (fs.existsSync(youtubePath)) {
        const youtubeFiles = fs.readdirSync(youtubePath);
        
        for (const file of youtubeFiles) {
          if (file.endsWith('.md')) {
            const article = await this.processMarkdownFile(
              path.join(youtubePath, file),
              'Video Guides',
              false
            );
            if (article) articles.push(article);
          }
        }
      }

      return articles;

    } catch (error) {
      console.error('❌ Error generating resource articles:', error);
      return [];
    }
  }

  /**
   * Process individual markdown file
   */
  async processMarkdownFile(filePath, category, featured) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const filename = path.basename(filePath, '.md');
      
      // Extract title from markdown (first # heading)
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : this.formatTitle(filename);
      
      // Extract description (find first substantial paragraph)
      const lines = content.split('\n').map(line => line.trim()).filter(line => line);
      let description = '';
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        // Skip headers, markdown formatting, empty lines, and navigation elements
        if (line && 
            !line.startsWith('#') && 
            !line.startsWith('[') && 
            !line.startsWith('**') &&
            !line.startsWith('---') &&
            !line.startsWith('*') &&
            !line.startsWith('|') &&
            line.length > 20) {
          
          description = line
            .replace(/\*\*(.+?)\*\*/g, '$1')  // Remove bold
            .replace(/\*(.+?)\*/g, '$1')      // Remove italic
            .replace(/`(.+?)`/g, '$1')        // Remove code
            .substring(0, 150);
          
          if (description.length === 150) description += '...';
          break;
        }
      }
      
      if (!description || description.length < 20) {
        description = `Comprehensive ${category.toLowerCase()} guide covering ${this.extractKeywordFromFilename(filename).toLowerCase()} strategies and best practices.`;
      }

      // Calculate read time
      const wordCount = content.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200) + ' min read';

      // Generate URL slug
      const url = '/' + filename.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      return {
        id: filename,
        title,
        description,
        category,
        readTime,
        featured,
        url,
        content: content // Store full content for page generation
      };

    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Deploy generated content as Next.js pages
   */
  async deployContentAsPages(articles) {
    console.log(`📄 Deploying ${articles.length} content factory articles as Next.js pages...`);

    for (const article of articles) {
      if (article.content) {
        await this.createNextJSPage(article);
      }
    }
  }

  /**
   * Create Next.js page from article content
   */
  async createNextJSPage(article) {
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
  generateNextJSPageComponent(article) {
    // Convert markdown to HTML-like JSX
    const processedContent = this.markdownToJSX(article.content);
    
    return `'use client';

import React from 'react';
import { Container, Title, Text, Button, Card, Stack, Group, Box, Badge } from '@mantine/core';
import { IconArrowRight, IconSparkles } from '@tabler/icons-react';
import Link from 'next/link';

/**
 * Generated by PM33 Content Factory
 * Source: ${article.id}
 * Generated: ${new Date().toISOString().split('T')[0]}
 */

export default function ${this.keywordToPascalCase(article.title)}Page() {
  return (
    <div className="marketing-context">
      <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>
        
        {/* Hero Section */}
        <Box 
          style={{ 
            position: 'relative',
            padding: '4rem 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            overflow: 'hidden',
            color: 'white'
          }}
        >
          <Container size="xl">
            <Stack align="center" gap={32}>
              <Badge 
                size="lg" 
                variant="light"
                color="white"
                leftSection={<IconSparkles size={16} />}
              >
                ${article.category}
              </Badge>
              
              <Stack align="center" gap={24}>
                <Title 
                  order={1} 
                  size="3rem"
                  ta="center"
                  lh={1.1}
                  style={{ 
                    fontWeight: 900,
                    color: 'white',
                    maxWidth: 900,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  ${article.title}
                </Title>
                
                <Text size="xl" ta="center" maw={700} lh={1.6} style={{ opacity: 0.95 }}>
                  ${article.description}
                </Text>

                <Group gap={24} mt={32}>
                  <Button 
                    component={Link}
                    href="/pricing"
                    size="xl"
                    variant="white"
                    color="dark"
                    rightSection={<IconArrowRight size={20} />}
                    style={{ 
                      minWidth: 200,
                      fontWeight: 600
                    }}
                  >
                    Start Free Trial
                  </Button>
                  <Button 
                    component={Link}
                    href="/strategic-intelligence"
                    size="xl"
                    variant="outline"
                    color="white"
                    rightSection={<IconSparkles size={20} />}
                    style={{ minWidth: 180 }}
                  >
                    See Live Demo
                  </Button>
                </Group>
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* Content Section */}
        <Box py={96} bg="white">
          <Container size="xl">
            <div className="content-factory-article" style={{
              fontSize: '18px',
              lineHeight: '1.7',
              color: 'var(--mantine-color-dark-8)'
            }}>
              ${processedContent}
            </div>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box py={96} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Container size="md">
            <Card 
              shadow="xl" 
              radius="xl" 
              p={64}
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                textAlign: 'center'
              }}
            >
              <Stack align="center" gap={32}>
                <Stack align="center" gap={16}>
                  <Badge size="lg" color="indigo" variant="light">
                    🚀 Ready to Transform?
                  </Badge>
                  <Title order={2} size="h2" c="dark">
                    Start Your AI-Powered PM Journey Today
                  </Title>
                  <Text size="lg" c="dimmed" maw={500}>
                    Join 500+ product managers who've transformed their workflow with PM33's strategic intelligence platform.
                  </Text>
                </Stack>
                
                <Group gap={24}>
                  <Button
                    component={Link}
                    href="/pricing"
                    size="xl"
                    rightSection={<IconArrowRight size={20} />}
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      minWidth: 220,
                      fontWeight: 600
                    }}
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    component={Link}
                    href="/strategic-intelligence"
                    size="xl"
                    variant="outline"
                    color="dark"
                    rightSection={<IconSparkles size={20} />}
                    style={{ minWidth: 180 }}
                  >
                    See Live Demo
                  </Button>
                </Group>
                
                <Text size="sm" c="dimmed">
                  14-day free trial • No credit card required • Cancel anytime
                </Text>
              </Stack>
            </Card>
          </Container>
        </Box>

      </Box>
    </div>
  );
}`;
  }

  /**
   * Convert markdown to JSX-compatible format
   */
  markdownToJSX(markdown) {
    if (!markdown) return '';
    
    return markdown
      // Handle headers
      .replace(/^# (.+)$/gm, '<Title order={1} size="2.5rem" mb={24} c="dark">$1</Title>')
      .replace(/^## (.+)$/gm, '<Title order={2} size="2rem" mb={20} c="dark">$1</Title>')
      .replace(/^### (.+)$/gm, '<Title order={3} size="1.5rem" mb={16} c="dark">$1</Title>')
      
      // Handle bold text
      .replace(/\*\*(.+?)\*\*/g, '<Text component="span" fw={700}>$1</Text>')
      
      // Handle italic text  
      .replace(/\*(.+?)\*/g, '<Text component="span" fs="italic">$1</Text>')
      
      // Handle links (basic)
      .replace(/\[(.+?)\]\((.+?)\)/g, '<Anchor href="$2" target="_blank">$1</Anchor>')
      
      // Handle list items
      .replace(/^- (.+)$/gm, '<Text component="li" mb={8}>$1</Text>')
      
      // Handle blockquotes
      .replace(/^> (.+)$/gm, '<Text fs="italic" c="dimmed" pl={16} style={{ borderLeft: "3px solid var(--mantine-color-blue-4)" }}>$1</Text>')
      
      // Handle horizontal rules
      .replace(/^---$/gm, '<Box my={32}><div style={{ height: "1px", background: "var(--mantine-color-gray-3)" }} /></Box>')
      
      // Handle paragraphs (wrap non-component lines)
      .split('\n')
      .map(line => {
        line = line.trim();
        if (!line) return '<Box mb={16} />';
        if (line.startsWith('<') || line.startsWith('{')) return line;
        if (line.length > 0) return `<Text mb={16} lh={1.7}>${line}</Text>`;
        return line;
      })
      .join('\n              ');
  }

  /**
   * Update resources page with content factory articles
   */
  async updateResourcesPage(articles) {
    const resourcesPagePath = path.join(this.config.MARKETING_PAGES_DIR, 'resources/page.tsx');
    
    try {
      // Read current resources page
      const currentContent = fs.readFileSync(resourcesPagePath, 'utf8');
      
      // Generate new articles array
      const articlesCode = articles.map(article => `  {
    id: '${article.id}',
    title: '${article.title.replace(/'/g, "\\'")}',
    description: '${article.description.replace(/'/g, "\\'")}',
    category: '${article.category}',
    readTime: '${article.readTime}',
    featured: ${article.featured},
    url: '${article.url}'
  }`).join(',\n');

      // Replace the hardcoded articles with content factory articles
      const updatedContent = currentContent.replace(
        /const resourceArticles = \[[\s\S]*?\];/,
        `// Generated from PM33 Content Factory - ${new Date().toISOString()}
const resourceArticles = [
${articlesCode}
];`
      );

      // Write updated file
      fs.writeFileSync(resourcesPagePath, updatedContent);
      
      console.log('✅ Updated resources page with content factory articles');
      
    } catch (error) {
      console.error('❌ Error updating resources page:', error);
    }
  }

  /**
   * Utility functions
   */
  extractKeywordFromFilename(filename) {
    return filename
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/\s+/g, ' ')
      .trim();
  }

  formatTitle(filename) {
    return filename
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/\s+/g, ' ')
      .trim();
  }

  keywordToPascalCase(keyword) {
    return keyword
      .split(/[\s-]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
      .replace(/[^a-zA-Z0-9]/g, '');
  }
}

// Run deployment if called directly
if (require.main === module) {
  const deployment = new ContentFactoryDeployment();
  deployment.deploy();
}

module.exports = ContentFactoryDeployment;