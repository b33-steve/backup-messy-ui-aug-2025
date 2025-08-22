'use client';

import { Box, Container, Title, Text } from '@mantine/core';
import { useEffect, useRef } from 'react';

interface CompanyCarouselProps {
  title?: string;
  subtitle?: string;
}

export default function CompanyCarousel({ 
  title = "Companies We Work With",
  subtitle = "Trusted by leading product teams worldwide"
}: CompanyCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const companies = [
    { name: 'Company 1', logo: '/company-logos/logo1.png' },
    { name: 'Company 2', logo: '/company-logos/logo2.png' },
    { name: 'Company 3', logo: '/company-logos/logo3.png' },
    { name: 'Company 4', logo: '/company-logos/logo4.png' },
    { name: 'Company 5', logo: '/company-logos/logo5.png' },
    { name: 'Company 6', logo: '/company-logos/logo6.png' },
    { name: 'Company 7', logo: '/company-logos/logo7.png' },
    { name: 'Company 8', logo: '/company-logos/logo8.png' },
    { name: 'Company 9', logo: '/company-logos/logo9.png' },
  ];

  // Duplicate companies for seamless loop
  const duplicatedCompanies = [...companies, ...companies];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame
    const containerWidth = scrollContainer.scrollWidth / 2; // Half because we duplicated

    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= containerWidth) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      requestAnimationFrame(scroll);
    };

    const animation = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <Box py={64} style={{ backgroundColor: 'var(--marketing-bg-secondary)', overflow: 'hidden' }}>
      <Container size={1200}>
        <Box ta="center" mb={48}>
          <Title order={2} mb={16} fw={600}>
            {title}
          </Title>
          <Text size="lg" c="dimmed" maw={500} mx="auto">
            {subtitle}
          </Text>
        </Box>

        <Box
          ref={scrollRef}
          style={{
            display: 'flex',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            gap: '48px',
            alignItems: 'center',
            height: '80px',
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
        >
          {duplicatedCompanies.map((company, index) => (
            <Box
              key={index}
              style={{
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60px',
                minWidth: '120px',
                padding: '0 24px'
              }}
            >
              <img
                src={company.logo}
                alt={company.name}
                style={{
                  maxHeight: '60px',
                  maxWidth: '120px',
                  objectFit: 'contain',
                  filter: 'grayscale(100%) opacity(0.6)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'grayscale(0%) opacity(1)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'grayscale(100%) opacity(0.6)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
