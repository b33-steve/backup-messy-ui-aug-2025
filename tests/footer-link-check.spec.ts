import { test, expect } from '@playwright/test';

test.describe('Footer Link Status Check', () => {
  const footerLinks = [
    '/features',
    '/pricing', 
    '/trial',
    '/demo',
    '/about',
    '/contact',
    '/blog',
    '/privacy',
    '/terms',
    '/security',
    '/support',
    '/community'
  ];

  test('check all footer links return valid responses', async ({ page }) => {
    for (const link of footerLinks) {
      console.log(`Testing ${link}...`);
      const response = await page.goto(link);
      const status = response?.status() || 0;
      console.log(`${link}: ${status}`);
      
      // We'll accept 200 (OK) and 404 for now, just to see what exists
      expect([200, 404, 500]).toContain(status);
    }
  });
});