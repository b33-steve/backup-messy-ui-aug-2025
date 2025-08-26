'use client';

import React from 'react';
import { Box, Container, Title, Text, Stack } from '@mantine/core';

interface CompaniesCarouselProps {
  title?: string;
  subtitle?: string;
}

export default function CompaniesCarousel({ 
  title = "Trusted by Leading Product Teams",
  subtitle = "Join 2,500+ product managers at top companies using PM33 to transform their workflows"
}: CompaniesCarouselProps) {
  
  // Company logos configuration
  const companies = [
    { src: '/company-logos/logo1.png', alt: 'Leading Technology Company' },
    { src: '/company-logos/logo2.png', alt: 'Fortune 500 Enterprise' },
    { src: '/company-logos/logo3.png', alt: 'Fast-Growing Startup' },
    { src: '/company-logos/logo4.png', alt: 'Global Software Company' },
    { src: '/company-logos/logo5.png', alt: 'Innovative Product Team' },
    { src: '/company-logos/logo6.png', alt: 'Market Leader' },
    { src: '/company-logos/logo7.png', alt: 'Emerging Growth Company' },
    { src: '/company-logos/logo8.png', alt: 'Digital Innovation Leader' },
    { src: '/company-logos/logo9.png', alt: 'Product Excellence Partner' },
  ];

  return (
    <Box 
      py={64} 
      style={{
        backgroundColor: 'var(--pm33-surfaceSecondary)',
        transition: 'background-color 0.3s ease'
      }}
    >
      <Container size="xl">
        <Stack align="center" gap={48}>
          <Stack align="center" gap={16}>
            <Title 
              order={2} 
              size="h2"
              ta="center"
              style={{ 
                color: 'var(--pm33-marketingText)',
                transition: 'color 0.3s ease'
              }}
            >
              {title}
            </Title>
            <Text 
              size="lg" 
              ta="center" 
              maw={600}
              style={{ 
                color: 'var(--pm33-marketingTextSecondary)',
                transition: 'color 0.3s ease'
              }}
            >
              {subtitle}
            </Text>
          </Stack>
          
          {/* Companies Carousel */}
          <Box 
            style={{ 
              width: '100%',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <Box
              style={{
                display: 'flex',
                animation: 'scroll 60s linear infinite',
                gap: '24px',
                alignItems: 'center',
                '--scroll-width': `${companies.length * 160 + (companies.length - 1) * 24}px`
              }}
              className="companies-scroll"
            >
              {/* First set of logos */}
              {companies.map((company, index) => (
                <Box
                  key={`first-${index}`}
                  style={{
                    flexShrink: 0,
                    width: '160px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    opacity: 0.6,
                    filter: 'grayscale(100%)',
                  }}
                  className="company-logo"
                >
                  <img
                    src={company.src}
                    alt={company.alt}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      transition: 'all 0.3s ease'
                    }}
                    onError={(e) => {
                      // Fallback for missing images
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.innerHTML = `
                          <div style="
                            width: 120px; 
                            height: 40px; 
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            border-radius: 8px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-weight: 600;
                            font-size: 12px;
                          ">
                            ${company.alt}
                          </div>
                        `;
                      }
                    }}
                  />
                </Box>
              ))}
              
              {/* Second set of logos for seamless loop */}
              {companies.map((company, index) => (
                <Box
                  key={`second-${index}`}
                  style={{
                    flexShrink: 0,
                    width: '160px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    opacity: 0.6,
                    filter: 'grayscale(100%)',
                  }}
                  className="company-logo"
                >
                  <img
                    src={company.src}
                    alt={company.alt}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      transition: 'all 0.3s ease'
                    }}
                    onError={(e) => {
                      // Fallback for missing images
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.innerHTML = `
                          <div style="
                            width: 120px; 
                            height: 40px; 
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            border-radius: 8px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-weight: 600;
                            font-size: 12px;
                          ">
                            ${company.alt}
                          </div>
                        `;
                      }
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Stack>
      </Container>
      
      <style jsx global>{`
        .companies-scroll {
          width: calc(var(--scroll-width) * 2);
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(var(--scroll-width) * -1));
          }
        }
        
        .company-logo:hover {
          opacity: 1 !important;
          filter: grayscale(0%) !important;
          transform: translateY(-2px) scale(1.05);
        }
        
        /* Pause animation on hover */
        .companies-scroll:hover {
          animation-play-state: paused;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .company-logo {
            width: 120px !important;
            height: 60px !important;
          }
          
          .companies-scroll {
            gap: 24px !important;
          }
          
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc((120px + 24px) * 9 * -1));
            }
          }
        }
      `}</style>
    </Box>
  );
}