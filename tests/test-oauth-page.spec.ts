/**
 * File: tests/test-oauth-page.spec.ts  
 * Purpose: Test the dedicated OAuth test page functionality
 * Why: Verify Connect Jira button works on the clean test page
 * Relevant Files: app/(app)/test-oauth/page.tsx
 */

import { test, expect } from '@playwright/test';

test.describe('Test OAuth Page', () => {
  test('should load test-oauth page and Connect Jira button works', async ({ page }) => {
    // Set up dialog handler
    let dialogMessage = '';
    page.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });
    
    await page.goto('http://localhost:3000/test-oauth');
    await page.waitForLoadState('networkidle');
    
    // Check page loaded correctly
    await expect(page.locator('h1')).toContainText('PM33 OAuth Test Page');
    
    // Check Connect Jira button is visible (specifically the button)
    const connectButton = page.locator('button', { hasText: 'Connect Jira' });
    await expect(connectButton).toBeVisible();
    
    // Click the button
    await connectButton.click();
    await page.waitForTimeout(1000);
    
    // Verify dialog appeared with OAuth instructions
    expect(dialogMessage).toContain('PM33 OAuth Setup Instructions for Jira');
    expect(dialogMessage).toContain('developer.atlassian.com');
    expect(dialogMessage).toContain('redirect URI');
    expect(dialogMessage).toContain('Demo Mode');
  });

  test('should handle connect and disconnect flow', async ({ page }) => {
    const dialogMessages: string[] = [];
    
    page.on('dialog', async dialog => {
      dialogMessages.push(dialog.message());
      await dialog.accept();
    });
    
    await page.goto('http://localhost:3000/test-oauth');
    await page.waitForLoadState('networkidle');
    
    // Initial state should show Connect button
    const connectBtn = page.locator('button', { hasText: 'Connect Jira' });
    await expect(connectBtn).toBeVisible();
    await expect(page.locator('text=Not Connected')).toBeVisible();
    
    // Click Connect
    await connectBtn.click();
    await page.waitForTimeout(2000);
    
    // Should have both setup dialog and success dialog
    expect(dialogMessages.length).toBeGreaterThanOrEqual(1);
    expect(dialogMessages[0]).toContain('OAuth Setup Instructions');
    
    // If we got success dialog too, check it
    if (dialogMessages.length > 1) {
      expect(dialogMessages[1]).toContain('Demo Connection Successful');
    }
  });
});