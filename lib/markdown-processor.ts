// lib/markdown-processor.ts
// Advanced markdown processing for content factory articles
// Converts markdown content to SEO-optimized HTML with proper formatting
// RELEVANT FILES: scripts/sync-content-factory.js, content-factory-integration.ts

import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import matter from 'gray-matter';

interface ProcessedContent {
  content: string;
  data: {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    [key: string]: any;
  };
  excerpt: string;
  readingTime: number;
}

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  structuredData: any;
}

export class MarkdownProcessor {
  private processor: any;

  constructor() {
    this.processor = remark()
      .use(gfm) // GitHub Flavored Markdown
      .use(html, { sanitize: false }); // Allow HTML in markdown
  }

  /**
   * Process markdown content from content factory
   */
  async processMarkdown(rawMarkdown: string, keyword?: string): Promise<ProcessedContent> {
    try {
      // Parse frontmatter if present
      const { content, data } = matter(rawMarkdown);
      
      // Process markdown to HTML
      const processedContent = await this.processor.process(content);
      const htmlContent = processedContent.toString();
      
      // Generate excerpt
      const excerpt = this.generateExcerpt(content);
      
      // Calculate reading time
      const readingTime = this.calculateReadingTime(content);
      
      // Enhance with PM33 specific formatting
      const enhancedContent = this.enhanceContent(htmlContent, keyword);

      return {
        content: enhancedContent,
        data,
        excerpt,
        readingTime
      };

    } catch (error) {
      console.error('Error processing markdown:', error);
      return {
        content: '<p>Error processing content</p>',
        data: {},
        excerpt: '',
        readingTime: 0
      };
    }
  }

  /**
   * Generate SEO metadata from markdown content
   */
  generateSEOData(content: string, keyword: string, url: string): SEOData {
    // Extract title from first H1
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : `${keyword} - PM33 AI Enhancement`;
    
    // Extract description from first paragraph or bold text
    const descMatch = content.match(/^\*\*(.+?)\*\*$/m) || 
                     content.match(/^>?\s*([^#\*\-\n]{50,200})/m);
    let description = descMatch ? descMatch[1].trim() : '';
    
    if (!description) {
      description = `Transform your ${keyword.toLowerCase()} with PM33's AI intelligence. Don't replace your tools - make them 10x smarter.`;
    }
    
    // Ensure description is proper length
    if (description.length > 160) {
      description = description.substring(0, 157) + '...';
    }
    
    // Generate keywords
    const keywords = this.extractKeywords(content, keyword);
    
    // Generate structured data
    const structuredData = this.generateStructuredData(title, description, url, keyword);

    return {
      title: `${title} | PM33 AI-Powered Enhancement`,
      description,
      keywords,
      canonical: `https://pm33.ai${url}`,
      structuredData
    };
  }

  /**
   * Extract keywords from content
   */
  private extractKeywords(content: string, primaryKeyword: string): string[] {
    const keywords = [primaryKeyword];
    
    // Common PM33 keywords
    const pm33Keywords = [
      'AI product management',
      'product management software',
      'PM33',
      'strategic intelligence',
      'workflow automation',
      'PM tools',
      'product strategy'
    ];
    
    // Extract keywords that appear in content
    pm33Keywords.forEach(keyword => {
      if (content.toLowerCase().includes(keyword.toLowerCase())) {
        keywords.push(keyword);
      }
    });
    
    return [...new Set(keywords)]; // Remove duplicates
  }

  /**
   * Generate structured data for SEO
   */
  private generateStructuredData(title: string, description: string, url: string, keyword: string) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "url": `https://pm33.ai${url}`,
      "author": {
        "@type": "Organization",
        "name": "PM33",
        "url": "https://pm33.ai"
      },
      "publisher": {
        "@type": "Organization",
        "name": "PM33",
        "logo": {
          "@type": "ImageObject",
          "url": "https://pm33.ai/PM%2033%20New%20Logo%20Horizontal%20V1.2.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://pm33.ai${url}`
      },
      "keywords": [keyword, "AI product management", "PM33", "product management software"],
      "about": {
        "@type": "Thing",
        "name": keyword
      }
    };
  }

  /**
   * Enhance HTML content with PM33 styling and features
   */
  private enhanceContent(htmlContent: string, keyword?: string): string {
    let enhanced = htmlContent;

    // Add PM33-specific CSS classes
    enhanced = enhanced
      .replace(/<h1>/g, '<h1 class="pm33-heading-1">')
      .replace(/<h2>/g, '<h2 class="pm33-heading-2">')
      .replace(/<h3>/g, '<h3 class="pm33-heading-3">')
      .replace(/<p>/g, '<p class="pm33-paragraph">')
      .replace(/<table>/g, '<table class="pm33-table">')
      .replace(/<ul>/g, '<ul class="pm33-list">')
      .replace(/<ol>/g, '<ol class="pm33-list">')
      .replace(/<blockquote>/g, '<blockquote class="pm33-blockquote">');

    // Enhance CTAs with PM33 styling
    enhanced = enhanced.replace(
      /\[(.+?)\]/g,
      '<a href="/trial" class="pm33-cta-button">$1</a>'
    );

    // Add keyword highlighting (subtle)
    if (keyword) {
      const keywordRegex = new RegExp(`(${keyword})(?![^<]*>)`, 'gi');
      enhanced = enhanced.replace(keywordRegex, '<mark class="pm33-keyword">$1</mark>');
    }

    return enhanced;
  }

  /**
   * Generate excerpt from content
   */
  private generateExcerpt(content: string, maxLength: number = 160): string {
    // Remove markdown syntax
    const plainText = content
      .replace(/^#+\s+/gm, '')  // Remove headings
      .replace(/\*\*(.+?)\*\*/g, '$1')  // Remove bold
      .replace(/\*(.+?)\*/g, '$1')  // Remove italic
      .replace(/\[(.+?)\]\(.+?\)/g, '$1')  // Remove links
      .replace(/>\s+/gm, '')  // Remove blockquotes
      .replace(/\n+/g, ' ')  // Replace newlines with spaces
      .trim();

    if (plainText.length <= maxLength) {
      return plainText;
    }

    return plainText.substring(0, maxLength - 3).trim() + '...';
  }

  /**
   * Calculate reading time
   */
  private calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  /**
   * Generate content preview for blog listings
   */
  generatePreview(content: string, length: number = 150): string {
    const excerpt = this.generateExcerpt(content, length);
    return excerpt;
  }
}

// Export singleton instance
export const markdownProcessor = new MarkdownProcessor();

// CSS styles for enhanced content (to be added to globals.css)
export const PM33_CONTENT_STYLES = `
/* PM33 Content Factory Styles */
.pm33-heading-1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--marketing-text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.pm33-heading-2 {
  font-size: 2rem;
  font-weight: 600;
  color: var(--marketing-text-primary);
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--marketing-primary);
  padding-bottom: 0.5rem;
}

.pm33-heading-3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--marketing-text-primary);
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.pm33-paragraph {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--marketing-text-secondary);
  margin-bottom: 1.25rem;
}

.pm33-table {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  font-size: 0.9rem;
}

.pm33-table th,
.pm33-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--marketing-border);
}

.pm33-table th {
  background-color: var(--marketing-bg-secondary);
  font-weight: 600;
  color: var(--marketing-text-primary);
}

.pm33-list {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.pm33-list li {
  margin-bottom: 0.5rem;
  color: var(--marketing-text-secondary);
}

.pm33-blockquote {
  border-left: 4px solid var(--marketing-primary);
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  color: var(--marketing-text-secondary);
  background-color: var(--marketing-bg-secondary);
  padding: 1rem 1.5rem;
  border-radius: 0 8px 8px 0;
}

.pm33-cta-button {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin: 0.25rem;
  transition: transform 0.2s ease;
}

.pm33-cta-button:hover {
  transform: translateY(-1px);
  text-decoration: none;
  color: white;
}

.pm33-keyword {
  background-color: transparent;
  color: var(--marketing-primary);
  font-weight: 500;
}
`;