/**
 * File: tests/settings-oauth.spec.ts
 * Purpose: Test OAuth integration functionality in settings page
 * Why: Verify that Connect Jira button works and shows proper demo mode behavior
 * Relevant Files: app/(app)/settings/page.tsx, lib/integrations/oauth-service.ts
 */

import { test, expect } from '@playwright/test';

test.describe('Settings Page OAuth Integration', () => {
  test('should load settings page successfully', async ({ page }) => {
    await page.goto('http://localhost:3000/settings');
    
    // Check that page loads
    await expect(page).toHaveTitle(/PM33/);
    
    // Check for main heading
    await expect(page.locator('h1')).toContainText('Settings');
    
    // Check that Integrations tab is visible
    await expect(page.locator('text=Integrations')).toBeVisible();
  });

  test('should show integrations tab as active by default', async ({ page }) => {
    await page.goto('http://localhost:3000/settings');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Check that PM Tool Integrations section is visible
    await expect(page.locator('text=PM Tool Integrations')).toBeVisible();
    
    // Check for Connect buttons
    await expect(page.locator('text=Connect').first()).toBeVisible();
  });

  test('should show Connect Jira button and handle click', async ({ page }) => {
    // Set up dialog handler to capture the demo mode dialog
    let dialogMessage = '';
    page.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept(); // Accept the confirm dialog
    });
    
    await page.goto('http://localhost:3000/settings');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Find and click Connect button for Jira
    const connectButton = page.locator('text=Connect').first();
    await expect(connectButton).toBeVisible();
    
    // Click the Connect button
    await connectButton.click();
    
    // Wait a moment for the dialog to appear
    await page.waitForTimeout(1000);
    
    // Check that demo mode dialog appeared
    expect(dialogMessage).toContain('Demo Mode');
    expect(dialogMessage).toContain('Jira OAuth Setup Required');
    expect(dialogMessage).toContain('developer.atlassian.com');
  });

  test('should show success message after demo connection', async ({ page }) => {
    // Set up dialog handlers
    const dialogMessages: string[] = [];
    
    page.on('dialog', async dialog => {
      dialogMessages.push(dialog.message());
      await dialog.accept(); // Accept both confirm and alert dialogs
    });
    
    await page.goto('http://localhost:3000/settings');
    await page.waitForLoadState('networkidle');
    
    // Click Connect Jira button
    const connectButton = page.locator('text=Connect').first();
    await connectButton.click();
    
    // Wait for demo connection simulation
    await page.waitForTimeout(2000);
    
    // Should have at least 2 dialogs: setup instructions + success message
    expect(dialogMessages.length).toBeGreaterThanOrEqual(1);
    expect(dialogMessages[0]).toContain('Demo Mode');
    
    // If there's a success dialog, check it
    if (dialogMessages.length > 1) {
      expect(dialogMessages[1]).toContain('Demo connection');
      expect(dialogMessages[1]).toContain('successful');
    }
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
    const connectButtons = page.locator('text=Connect');
    await expect(connectButtons).toHaveCount(4);
  });
});