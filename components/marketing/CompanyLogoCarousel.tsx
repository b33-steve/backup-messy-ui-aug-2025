'use client';

import React from 'react';
import { Container, Text, Stack, Box } from '@mantine/core';

export default function CompanyLogoCarousel() {
  const logos = [
    '/company-logos/logo1.png',
    '/company-logos/logo2.png', 
    '/company-logos/logo3.png',
    '/company-logos/logo4.png',
    '/company-logos/logo5.png',
    '/company-logos/logo6.png',
    '/company-logos/logo7.png',
    '/company-logos/logo8.png',
    '/company-logos/logo9.png'
  ];

  return (
    <Box py={64} style={{ backgroundColor: 'var(--marketing-bg-primary)', overflow: 'hidden' }}>
      <Container size="xl">
        <Stack align="center" gap={48}>
          <Text 
            size="xl" 
            fw={600} 
            ta="center"
            style={{ color: 'var(--marketing-text-secondary)' }}
          >
            Trusted by product teams at leading companies
          </Text>
          
          {/* Carousel Container */}
          <Box style={{ width: '100%', position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                animation: 'scroll-logos 30s linear infinite',
                gap: '64px'
              }}
            >
              {/* First set of logos */}
              {logos.map((logo, index) => (
                <img
                  key={`first-${index}`}
                  src={logo}
                  alt={`Company logo ${index + 1}`}
                  style={{
                    height: '48px',
                    width: 'auto',
                    objectFit: 'contain',
                    opacity: 0.7,
                    transition: 'opacity 0.3s ease',
                    filter: 'grayscale(100%)',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.filter = 'grayscale(0%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.7';
                    e.currentTarget.style.filter = 'grayscale(100%)';
                  }}
                />
              ))}
              
              {/* Duplicate set for seamless loop */}
              {logos.map((logo, index) => (
                <img
                  key={`second-${index}`}
                  src={logo}
                  alt={`Company logo ${index + 1}`}
                  style={{
                    height: '48px',
                    width: 'auto',
                    objectFit: 'contain',
                    opacity: 0.7,
                    transition: 'opacity 0.3s ease',
                    filter: 'grayscale(100%)',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.filter = 'grayscale(0%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.7';
                    e.currentTarget.style.filter = 'grayscale(100%)';
                  }}
                />
              ))}
            </div>
          </Box>
        </Stack>
      </Container>
      
    </Box>
  );
}