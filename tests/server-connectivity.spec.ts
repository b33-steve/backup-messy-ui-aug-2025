/**
 * Test: Server Connectivity - Multi-Theme System
 * Purpose: Verify the development server is accessible and theme system works
 */

import { test, expect } from '@playwright/test';

test.describe('Server Connectivity Tests', () => {
  test('should connect to development server and load homepage', async ({ page }) => {
    // Test homepage loads
    const response = await page.goto('http://localhost:3002/');
    expect(response?.status()).toBe(200);
    
    // Verify page loads content
    await expect(page).toHaveTitle(/PM33/);
  });

  test('should load dashboard with multi-theme system', async ({ page }) => {
    // Test dashboard loads
    const response = await page.goto('http://localhost:3002/dashboard');
    expect(response?.status()).toBe(200);
    
    // Wait for dashboard content to load
    await page.waitForSelector('text=PM Command Center', { timeout: 10000 });
    
    // Verify theme system is present
    await expect(page.locator('[data-testid="theme-switcher"]')).toBeVisible();
  });

  test('should load demo page', async ({ page }) => {
    const response = await page.goto('http://localhost:3002/demo');
    expect(response?.status()).toBe(200);
  });

  test('should load pricing page', async ({ page }) => {
    const response = await page.goto('http://localhost:3002/pricing');
    expect(response?.status()).toBe(200);
  });

  test('should test theme switching functionality', async ({ page }) => {
    await page.goto('http://localhost:3002/dashboard');
    
    // Wait for theme switcher to be available
    await page.waitForSelector('[data-testid="theme-switcher"]', { timeout: 5000 });
    
    // Test light theme (default)
    const lightButton = page.locator('[data-testid="theme-switcher"] [data-theme="light"]');
    await expect(lightButton).toBeVisible();
    
    // Test dark theme switch
    const darkButton = page.locator('[data-testid="theme-switcher"] [data-theme="dark"]');
    await darkButton.click();
    
    // Verify theme CSS variables are applied
    const root = page.locator('html');
    const backgroundColor = await root.evaluate(el => 
      getComputedStyle(el).getPropertyValue('--pm33-bg')
    );
    
    // Should have dark theme background
    expect(backgroundColor.trim()).toBe('#0f172a');
  });
});