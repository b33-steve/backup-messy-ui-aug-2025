'use client';

import { Box, Container, Title, Text, Badge } from '@mantine/core';
import { useEffect, useRef } from 'react';

interface CompanyCarouselProps {
  title?: string;
  subtitle?: string;
}

export default function CompanyCarousel({ 
  title = "Companies We Work With",
  subtitle = "Trusted by leading product teams transforming their PM capabilities"
}: CompanyCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Demo company logos using text badges for reliable display
  const companies = [
    { name: 'TechCorp', industry: 'SaaS' },
    { name: 'InnovateLab', industry: 'AI/ML' },
    { name: 'ScaleUp Inc', industry: 'FinTech' },
    { name: 'BuildFast', industry: 'DevTools' },
    { name: 'DataFlow', industry: 'Analytics' },
    { name: 'CloudSync', industry: 'Infrastructure' },
    { name: 'UserFirst', industry: 'Design' },
    { name: 'AutoScale', industry: 'Platform' },
    { name: 'NextGen', industry: 'Enterprise' },
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
    <Box py={64} mt={48} style={{ backgroundColor: 'rgba(248, 250, 252, 0.5)', overflow: 'hidden' }}>
      <Container size={1200}>
        <Box ta="center" mb={48}>
          <Title order={2} mb={16} fw={600} c="var(--marketing-text-primary)">
            {title}
          </Title>
          <Text size="lg" c="dimmed" maw={600} mx="auto">
            {subtitle}
          </Text>
        </Box>

        <Box
          ref={scrollRef}
          style={{
            display: 'flex',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            gap: '32px',
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
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '70px',
                minWidth: '140px',
                padding: '0 16px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Text size="md" fw={600} c="var(--marketing-text-primary)" mb={4}>
                {company.name}
              </Text>
              <Badge size="xs" color="gray" variant="light">
                {company.industry}
              </Badge>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
