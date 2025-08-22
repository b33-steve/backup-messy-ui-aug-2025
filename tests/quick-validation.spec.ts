import { test, expect } from '@playwright/test';

test('Homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('nav').locator('text=Features')).toBeVisible();
  await expect(page.locator('nav').locator('text=Blog')).toBeVisible();
  await expect(page.locator('nav').locator('text=Pricing')).toBeVisible();
});

test('All main pages return 200', async ({ page }) => {
  const pages = ['/', '/features', '/blog', '/pricing', '/about', '/contact'];
  
  for (const pagePath of pages) {
    const response = await page.goto(pagePath);
    expect(response?.status()).toBe(200);
  }
});
