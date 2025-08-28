'use client';

import Link from 'next/link';
import { useTheme } from '../shared/MantineProvider';

export default function IsolatedMarketingFooter() {
  const { currentTheme } = useTheme();
  
  return (
    <footer style={{
      backgroundColor: '#1e293b',
      color: 'white',
      padding: '64px 0 32px 0',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '48px',
          marginBottom: '48px'
        }}>
          
          {/* Company Info */}
          <div>
            <img 
              src="/PM 33 New Logo Horizontal V1.2 WHITE.png" 
              alt="PM33" 
              style={{ 
                height: '32px',
                marginBottom: '16px'
              }} 
            />
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#94a3b8',
              margin: '0 0 24px 0'
            }}>
              Transform from Product Manager to Strategic PMO with AI-powered intelligence. 
              Achieve 10x productivity with our 4 agentic AI teams.
            </p>
            
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link
                href="https://twitter.com/pm33ai"
                style={{
                  color: '#94a3b8',
                  fontSize: '14px',
                  textDecoration: 'none'
                }}
              >
                Twitter
              </Link>
              <Link
                href="https://linkedin.com/company/pm33"
                style={{
                  color: '#94a3b8',
                  fontSize: '14px',
                  textDecoration: 'none'
                }}
              >
                LinkedIn
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '24px',
              color: 'white'
            }}>
              Product
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '/pricing', label: 'Pricing' },
                { href: '/resources/api-docs', label: 'API Documentation' },
                { href: '/resources', label: 'Resources' },
                { href: '/strategic-intelligence', label: 'Strategic Intelligence' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: '#94a3b8',
                    fontSize: '14px',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '24px',
              color: 'white'
            }}>
              Company
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: '#94a3b8',
                    fontSize: '14px',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources Links */}
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '24px',
              color: 'white'
            }}>
              Resources
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '/resources/api-docs', label: 'API Documentation' },
                { href: '/resources/cpn-docs', label: 'Implementation Guides' },
                { href: '/ai-product-management-tool-landing', label: 'AI Product Management Guide' },
                { href: '/strategic-product-management-blog', label: 'Strategic PM Blog' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: '#94a3b8',
                    fontSize: '14px',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            © {new Date().getFullYear()} PM33. All rights reserved.
          </p>
          
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link
              href="/privacy"
              style={{
                color: '#6b7280',
                fontSize: '14px',
                textDecoration: 'none'
              }}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              style={{
                color: '#6b7280',
                fontSize: '14px',
                textDecoration: 'none'
              }}
            >
              Terms
            </Link>
            <Link
              href="/security"
              style={{
                color: '#6b7280',
                fontSize: '14px',
                textDecoration: 'none'
              }}
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}