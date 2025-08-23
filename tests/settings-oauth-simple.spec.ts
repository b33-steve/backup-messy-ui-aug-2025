/**
 * File: tests/settings-oauth-simple.spec.ts
 * Purpose: Test simplified OAuth integration functionality in settings page
 * Why: Verify that Connect Jira button works with basic demo mode
 * Relevant Files: app/(app)/settings/page.tsx
 */

import { test, expect } from '@playwright/test';

test.describe('Simple Settings Page OAuth Integration', () => {
  test('should load settings page successfully', async ({ page }) => {
    await page.goto('http://localhost:3000/settings');
    
    // Check that page loads
    await expect(page.locator('h1')).toContainText('Settings');
    
    // Check that integrations section is visible
    await expect(page.locator('text=PM Tool Integrations')).toBeVisible();
  });

  test('should show Connect Jira button and handle click', async ({ page }) => {
    // Set up dialog handler to capture the demo mode dialog
    let dialogMessage = '';
    page.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept(); // Accept the alert dialog
    });
    
    await page.goto('http://localhost:3000/settings');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Find and click Connect Jira button specifically
    const connectJiraButton = page.locator('text=Connect Jira');
    await expect(connectJiraButton).toBeVisible();
    
    // Click the Connect Jira button
    await connectJiraButton.click();
    
    // Wait a moment for the dialog to appear
    await page.waitForTimeout(1000);
    
    // Check that demo mode dialog appeared with correct content
    expect(dialogMessage).toContain('Demo Mode');
    expect(dialogMessage).toContain('Jira OAuth Setup Required');
    expect(dialogMessage).toContain('developer.atlassian.com');
    expect(dialogMessage).toContain('OAuth 2.0 (3LO) app');
    expect(dialogMessage).toContain('redirect URI');
  });

  test('should show all four integration providers', async ({ page }) => {
    await page.goto('http://localhost:3000/settings');
    await page.waitForLoadState('networkidle');
    
    // Check for all four providers
    await expect(page.locator('text=Jira')).toBeVisible();
    await expect(page.locator('text=Linear')).toBeVisible();
    await expect(page.locator('text=Monday.com')).toBeVisible();
    await expect(page.locator('text=Asana')).toBeVisible();
    
    // Check for all connect buttons
    await expect(page.locator('text=Connect Jira')).toBeVisible();
    await expect(page.locator('text=Connect Linear')).toBeVisible();
    await expect(page.locator('text=Connect Monday.com')).toBeVisible();
    await expect(page.locator('text=Connect Asana')).toBeVisible();
  });

  test('should handle Linear button click', async ({ page }) => {
    let dialogMessage = '';
    page.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });
    
    await page.goto('http://localhost:3000/settings');
    await page.waitForLoadState('networkidle');
    
    const connectLinearButton = page.locator('text=Connect Linear');
    await connectLinearButton.click();
    await page.waitForTimeout(1000);
    
    expect(dialogMessage).toContain('Demo Mode');
    expect(dialogMessage).toContain('Linear OAuth Setup Required');
  });

  test('should have proper styling and layout', async ({ page }) => {
    await page.goto('http://localhost:3000/settings');
    await page.waitForLoadState('networkidle');
    
    // Check for proper CSS classes and structure
    await expect(page.locator('.bg-white.rounded-lg.shadow')).toBeVisible();
    await expect(page.locator('.space-y-4')).toBeVisible();
    
    // Check button styling
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBe(4); // All 4 connect buttons
    
    // Check first button has proper classes
    const firstButton = buttons.first();
    await expect(firstButton).toHaveClass(/bg-blue-600/);
    await expect(firstButton).toHaveClass(/text-white/);
  });
});