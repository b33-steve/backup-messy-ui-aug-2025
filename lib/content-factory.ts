/**
 * Content Factory Integration
 * Purpose: Automated content generation and SEO optimization for 100K MRR growth
 * Features: AI-powered content creation, SEO optimization, automated publishing
 */

import { analytics } from './analytics';

export interface ContentTemplate {
  id: string;
  title: string;
  category: 'blog' | 'landing-page' | 'case-study' | 'whitepaper' | 'guide';
  segment: 'startup-pm' | 'senior-pm' | 'vp-product' | 'enterprise-pmo' | 'all';
  keywords: string[];
  structure: ContentSection[];
  seoSettings: SEOSettings;
}

export interface ContentSection {
  type: 'hero' | 'problem' | 'solution' | 'benefits' | 'social-proof' | 'cta' | 'faq' | 'testimonial';
  title: string;
  content: string;
  variables: { [key: string]: string };
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  canonicalUrl?: string;
  schema?: any;
}

export interface GeneratedContent {
  slug: string;
  title: string;
  content: string;
  seo: SEOSettings;
  publishDate: string;
  lastUpdated: string;
  performance?: ContentPerformance;
}

export interface ContentPerformance {
  views: number;
  uniqueVisitors: number;
  bounceRate: number;
  timeOnPage: number;
  conversions: number;
  conversionRate: number;
  searchRankings: { keyword: string; position: number }[];
}

// High-Converting Content Templates for 100K MRR
export const CONTENT_TEMPLATES: ContentTemplate[] = [
  {
    id: 'startup-pm-guide',
    title: 'The Complete Guide to Startup Product Management in 2025',
    category: 'guide',
    segment: 'startup-pm',
    keywords: ['startup product management', 'PM guide 2025', 'startup PM tips', 'series A product management'],
    structure: [
      {
        type: 'hero',
        title: 'Transform from Solo PM to Strategic Leader',
        content: 'The comprehensive guide every startup PM needs to compete with enterprise teams.',
        variables: { cta: 'Download Free Guide', trial_link: '/trial?utm_source=startup-guide' }
      },
      {
        type: 'problem',
        title: 'The Startup PM Dilemma',
        content: 'You\'re expected to do the work of 5 people but have the resources of 0.5.',
        variables: { pain_points: 'limited budget, no team, competing with enterprises' }
      },
      {
        type: 'solution',
        title: 'AI-Powered PMO Capabilities',
        content: 'Get enterprise-level strategic intelligence at startup budget.',
        variables: { roi: '185% MRR growth', social_proof: '400+ startup PMs' }
      }
    ],
    seoSettings: {
      metaTitle: 'Startup Product Management Guide 2025 | PM33',
      metaDescription: 'Complete guide to startup PM success. Learn how 400+ startup PMs use AI to compete with enterprise teams. Free download.',
      keywords: ['startup product management', 'PM guide', 'startup PM', 'product manager startup'],
      ogTitle: 'The Ultimate Startup Product Management Guide',
      ogDescription: 'Transform from solo PM to strategic leader. Used by 400+ successful startup PMs.'
    }
  },

  {
    id: 'enterprise-pmo-transformation',
    title: 'Enterprise PMO Transformation: AI-Powered Strategic Intelligence',
    category: 'whitepaper',
    segment: 'enterprise-pmo',
    keywords: ['enterprise PMO', 'PMO transformation', 'AI PMO', 'enterprise product management'],
    structure: [
      {
        type: 'hero',
        title: 'Transform Your Enterprise PMO with AI',
        content: 'How 25+ enterprise PMOs achieved 70% efficiency gains through strategic AI transformation.',
        variables: { cta: 'Schedule Executive Demo', demo_link: '/enterprise?utm_source=pmo-whitepaper' }
      },
      {
        type: 'social-proof',
        title: 'Proven Enterprise Results',
        content: '$15M market opportunities identified, 70% efficiency improvement, board-level reporting.',
        variables: { case_studies: 'CloudTech Industries, GrowthScale, FinTech Solutions' }
      }
    ],
    seoSettings: {
      metaTitle: 'Enterprise PMO Transformation with AI | PM33 Whitepaper',
      metaDescription: 'Learn how enterprise PMOs achieve 70% efficiency gains. Case studies from 25+ transformations. Download free whitepaper.',
      keywords: ['enterprise PMO', 'PMO transformation', 'AI PMO', 'enterprise product management'],
      ogTitle: 'Enterprise PMO AI Transformation Guide',
      ogDescription: 'Case studies from 25+ successful enterprise PMO transformations.'
    }
  },

  {
    id: 'pm-career-advancement',
    title: 'From Senior PM to VP Product: The Strategic Leadership Path',
    category: 'guide',
    segment: 'senior-pm',
    keywords: ['PM to VP product', 'product manager career', 'PM promotion', 'strategic PM leadership'],
    structure: [
      {
        type: 'hero',
        title: 'Accelerate Your Path to VP Product',
        content: 'The strategic playbook used by 1,200+ PMs to advance to leadership roles.',
        variables: { cta: 'Start Career Acceleration', trial_link: '/trial?utm_source=career-guide&tier=enterprise' }
      },
      {
        type: 'benefits',
        title: 'Strategic Skills That Get You Promoted',
        content: 'Build strategic authority, thought leadership, and measurable business impact.',
        variables: { metrics: '2x faster promotion rate', success_rate: '78% promotion success' }
      }
    ],
    seoSettings: {
      metaTitle: 'Senior PM to VP Product Career Guide | PM33',
      metaDescription: 'Strategic career advancement guide for senior PMs. Used by 1,200+ successful promotions to VP Product.',
      keywords: ['PM to VP product', 'product manager career', 'PM promotion', 'strategic leadership'],
      ogTitle: 'The Strategic PM Career Advancement Guide',
      ogDescription: 'From Senior PM to VP Product: The proven strategic leadership path.'
    }
  }
];

// SEO Content Generation Engine
export class ContentFactory {
  private templates: ContentTemplate[] = CONTENT_TEMPLATES;

  // Generate content from templates with dynamic variables
  generateContent(templateId: string, variables: { [key: string]: any } = {}): GeneratedContent {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) throw new Error(`Template ${templateId} not found`);

    const slug = this.generateSlug(template.title);
    let htmlContent = this.generateHTMLContent(template, variables);

    // Track content generation
    analytics.track('content_generated', {
      template_id: templateId,
      content_type: template.category,
      segment: template.segment,
      keywords: template.keywords.join(',')
    } as any);

    return {
      slug,
      title: template.title,
      content: htmlContent,
      seo: { ...template.seoSettings, canonicalUrl: `https://pm33.ai/${slug}` },
      publishDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
  }

  // Generate SEO-optimized HTML content
  private generateHTMLContent(template: ContentTemplate, variables: { [key: string]: any }): string {
    let html = `
      <article className="content-factory-article">
        <header className="article-header">
          <h1>${template.title}</h1>
          <div className="article-meta">
            <span className="category">${template.category}</span>
            <span className="segment">${template.segment}</span>
            <time dateTime="${new Date().toISOString()}">${new Date().toLocaleDateString()}</time>
          </div>
        </header>
        <div className="article-content">
    `;

    template.structure.forEach(section => {
      html += this.generateSectionHTML(section, variables);
    });

    html += `
        </div>
        <footer className="article-footer">
          <div className="cta-section">
            <h3>Ready to Transform Your PM Work?</h3>
            <p>Join ${this.getSegmentStats(template.segment)} already using PM33 for strategic success.</p>
            <a href="/trial?utm_source=content-factory&utm_content=${template.id}" className="cta-button">
              Start Free Trial
            </a>
          </div>
        </footer>
      </article>
    `;

    return html;
  }

  private generateSectionHTML(section: ContentSection, variables: { [key: string]: any }): string {
    let content = section.content;
    
    // Replace variables in content
    Object.entries(section.variables).forEach(([key, value]) => {
      const actualValue = variables[key] || value;
      content = content.replace(`{{${key}}}`, actualValue);
    });

    switch (section.type) {
      case 'hero':
        return `
          <section className="hero-section">
            <h2>${section.title}</h2>
            <p className="hero-description">${content}</p>
            <div className="hero-cta">
              <a href="${section.variables.trial_link || '/trial'}" className="primary-cta">
                ${section.variables.cta || 'Get Started'}
              </a>
            </div>
          </section>
        `;

      case 'problem':
        return `
          <section className="problem-section">
            <h2>${section.title}</h2>
            <div className="problem-content">
              <p>${content}</p>
              <ul className="pain-points">
                ${section.variables.pain_points?.split(',').map((point: string) => 
                  `<li>❌ ${point.trim()}</li>`
                ).join('') || ''}
              </ul>
            </div>
          </section>
        `;

      case 'solution':
        return `
          <section className="solution-section">
            <h2>${section.title}</h2>
            <p>${content}</p>
            <div className="solution-benefits">
              <div className="metric">
                <span className="metric-value">${section.variables.roi || 'N/A'}</span>
                <span className="metric-label">Average ROI</span>
              </div>
              <div className="social-proof">
                <span>${section.variables.social_proof || 'Trusted by professionals'}</span>
              </div>
            </div>
          </section>
        `;

      case 'social-proof':
        return `
          <section className="social-proof-section">
            <h2>${section.title}</h2>
            <p>${content}</p>
            <div className="case-studies">
              ${section.variables.case_studies?.split(',').map((study: string) => 
                `<div className="case-study">✅ ${study.trim()}</div>`
              ).join('') || ''}
            </div>
          </section>
        `;

      case 'benefits':
        return `
          <section className="benefits-section">
            <h2>${section.title}</h2>
            <p>${content}</p>
            <div className="benefits-metrics">
              <div className="metric-card">
                <span className="metric">${section.variables.metrics || 'Proven Results'}</span>
              </div>
              <div className="metric-card">
                <span className="metric">${section.variables.success_rate || 'High Success Rate'}</span>
              </div>
            </div>
          </section>
        `;

      case 'cta':
        return `
          <section className="cta-section">
            <h2>${section.title}</h2>
            <p>${content}</p>
            <a href="${section.variables.cta_link || '/trial'}" className="cta-button">
              ${section.variables.cta_text || 'Get Started'}
            </a>
          </section>
        `;

      default:
        return `
          <section className="content-section">
            <h2>${section.title}</h2>
            <p>${content}</p>
          </section>
        `;
    }
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private getSegmentStats(segment: string): string {
    const segmentStats = {
      'startup-pm': '400+ startup PMs',
      'senior-pm': '1,200+ senior PMs',
      'vp-product': '150+ product leaders',
      'enterprise-pmo': '25+ enterprise PMOs',
      'all': '2,500+ product managers'
    };
    return segmentStats[segment as keyof typeof segmentStats] || '2,500+ professionals';
  }

  // Generate blog post list for blog page
  generateBlogList(limit: number = 10): Array<{
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    segment: string;
    publishDate: string;
    readTime: string;
  }> {
    return this.templates.slice(0, limit).map(template => ({
      slug: this.generateSlug(template.title),
      title: template.title,
      excerpt: this.generateExcerpt(template),
      category: template.category,
      segment: template.segment,
      publishDate: new Date().toISOString(),
      readTime: this.estimateReadTime(template)
    }));
  }

  private generateExcerpt(template: ContentTemplate): string {
    const heroSection = template.structure.find(s => s.type === 'hero');
    return heroSection?.content.substring(0, 150) + '...' || 'Strategic insights for product managers.';
  }

  private estimateReadTime(template: ContentTemplate): string {
    const wordCount = template.structure.reduce((total, section) => {
      return total + section.content.split(' ').length + section.title.split(' ').length;
    }, 0);
    const readTimeMinutes = Math.ceil(wordCount / 200); // 200 words per minute
    return `${readTimeMinutes} min read`;
  }

  // SEO keyword research and optimization
  generateSEOKeywords(topic: string, segment: string): string[] {
    const baseKeywords = {
      'startup-pm': [
        'startup product management',
        'PM for startups',
        'startup PM guide',
        'early stage product management',
        'lean product management',
        'startup PM strategy',
        'product management series A',
        'startup PM tools'
      ],
      'senior-pm': [
        'senior product manager',
        'PM career advancement',
        'product manager promotion',
        'strategic product management',
        'PM leadership',
        'product manager skills',
        'PM to VP product',
        'strategic PM'
      ],
      'vp-product': [
        'VP product',
        'product organization',
        'product leadership',
        'product strategy',
        'product team management',
        'product operations',
        'CPO insights',
        'product transformation'
      ],
      'enterprise-pmo': [
        'enterprise PMO',
        'PMO transformation',
        'product management office',
        'enterprise product management',
        'PMO strategy',
        'portfolio management',
        'enterprise PM',
        'PMO governance'
      ]
    };

    const segmentKeywords = baseKeywords[segment as keyof typeof baseKeywords] || [];
    
    // Add topic-specific keywords
    const topicKeywords = [
      `${topic} guide`,
      `${topic} strategy`,
      `${topic} best practices`,
      `${topic} 2025`,
      `AI powered ${topic}`,
      `${topic} automation`
    ];

    return [...segmentKeywords, ...topicKeywords].slice(0, 15);
  }

  // Content performance tracking
  trackContentPerformance(slug: string, event: 'view' | 'engagement' | 'conversion'): void {
    analytics.track('content_engagement', {
      content_slug: slug,
      engagement_type: event,
      timestamp: new Date().toISOString()
    } as any);
  }

  // Automated content optimization based on performance
  optimizeContent(slug: string, performanceData: ContentPerformance): string[] {
    const recommendations: string[] = [];

    if (performanceData.bounceRate > 70) {
      recommendations.push('Improve headline and opening paragraph for better engagement');
      recommendations.push('Add more compelling social proof in the first section');
    }

    if (performanceData.conversionRate < 2) {
      recommendations.push('Strengthen CTAs with more urgency and value propositions');
      recommendations.push('Add testimonials and case studies');
    }

    if (performanceData.timeOnPage < 120) {
      recommendations.push('Break up content with more subheadings and visual elements');
      recommendations.push('Add interactive elements and engagement hooks');
    }

    // SEO optimization recommendations
    performanceData.searchRankings.forEach(ranking => {
      if (ranking.position > 10) {
        recommendations.push(`Optimize for "${ranking.keyword}" - currently ranking #${ranking.position}`);
      }
    });

    return recommendations;
  }
}

// Export singleton instance
export const contentFactory = new ContentFactory();

// React hooks for content integration
export function useContentFactory() {
  const generateContent = (templateId: string, variables?: any) => {
    return contentFactory.generateContent(templateId, variables);
  };

  const getBlogList = (limit?: number) => {
    return contentFactory.generateBlogList(limit);
  };

  const trackContent = (slug: string, event: 'view' | 'engagement' | 'conversion') => {
    contentFactory.trackContentPerformance(slug, event);
  };

  return {
    generateContent,
    getBlogList,
    trackContent,
    templates: CONTENT_TEMPLATES
  };
}