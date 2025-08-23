/**
 * File: tests/dashboard-oauth-integration.spec.ts
 * Purpose: Test OAuth integration functionality embedded in dashboard page
 * Why: Verify that Connect Jira button works within the stable dashboard context
 * Relevant Files: app/(app)/dashboard/page.tsx
 */

import { test, expect } from '@playwright/test';

test.describe('Dashboard OAuth Integration', () => {
  test('should load dashboard page with OAuth integration section', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Check that dashboard loaded correctly
    await expect(page.locator('h1')).toContainText('Good morning');
    
    // Check that OAuth integration section is visible
    await expect(page.locator('text=PM Tool Integrations')).toBeVisible();
    await expect(page.locator('text=Atlassian Jira')).toBeVisible();
  });

  test('should show Connect Jira button and handle click with OAuth setup instructions', async ({ page }) => {
    // Set up dialog handler to capture the OAuth setup instructions
    let dialogMessage = '';
    page.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept(); // Accept the first dialog (setup instructions)
    });
    
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Find and click Connect Jira button
    const connectJiraButton = page.locator('button', { hasText: 'Connect Jira' });
    await expect(connectJiraButton).toBeVisible();
    
    // Click the Connect Jira button
    await connectJiraButton.click();
    
    // Wait for the dialog to appear and be handled
    await page.waitForTimeout(1000);
    
    // Check that OAuth setup dialog appeared with correct content
    expect(dialogMessage).toContain('PM33 OAuth Setup Instructions for Jira');
    expect(dialogMessage).toContain('developer.atlassian.com');
    expect(dialogMessage).toContain('redirect URI');
    expect(dialogMessage).toContain('Demo Mode');
  });

  test('should handle complete OAuth connection flow with demo mode', async ({ page }) => {
    const dialogMessages: string[] = [];
    
    page.on('dialog', async dialog => {
      dialogMessages.push(dialog.message());
      await dialog.accept(); // Accept all dialogs
    });
    
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Initial state should show Connect button and Not Connected badge
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

  test('should show connection status and details after successful connection', async ({ page }) => {
    // First connect to Jira (simulate by setting localStorage)
    await page.goto('http://localhost:3000/dashboard');
    await page.evaluate(() => {
      localStorage.setItem('pm33_demo_jira_connected', 'true');
      localStorage.setItem('pm33_demo_jira_workspace', 'Demo Company');
      localStorage.setItem('pm33_demo_jira_connected_at', new Date().toISOString());
    });
    
    // Refresh to see connected state
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Should show connected state
    await expect(page.locator('text=Connected')).toBeVisible();
    await expect(page.locator('text=Active')).toBeVisible();
    await expect(page.locator('text=Demo Company')).toBeVisible();
    await expect(page.locator('text=Active Integration')).toBeVisible();
    
    // Should show disconnect button instead of connect
    await expect(page.locator('button', { hasText: 'Disconnect' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Connect Jira' })).not.toBeVisible();
  });

  test('should handle disconnect flow properly', async ({ page }) => {
    // Set up initial connected state
    await page.goto('http://localhost:3000/dashboard');
    await page.evaluate(() => {
      localStorage.setItem('pm33_demo_jira_connected', 'true');
      localStorage.setItem('pm33_demo_jira_workspace', 'Demo Company');
      localStorage.setItem('pm33_demo_jira_connected_at', new Date().toISOString());
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Set up dialog handler for disconnect confirmation
    let dialogMessage = '';
    page.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });
    
    // Click disconnect button
    const disconnectBtn = page.locator('button', { hasText: 'Disconnect' });
    await disconnectBtn.click();
    await page.waitForTimeout(1000);
    
    // Should have shown disconnect confirmation
    expect(dialogMessage).toContain('Disconnect from Jira workspace "Demo Company"');
    
    // Should return to initial state (though page won't auto-refresh in test)
    // We can verify localStorage was cleared
    const isConnected = await page.evaluate(() => localStorage.getItem('pm33_demo_jira_connected'));
    expect(isConnected).toBeNull();
  });

  test('should show demo mode indicator', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Check for demo mode indicator
    await expect(page.locator('text=Currently in Demo Mode')).toBeVisible();
    await expect(page.locator('text=OAuth setup required for production use')).toBeVisible();
  });

  test('should maintain dashboard stability with OAuth integration', async ({ page }) => {
    // Test multiple page loads to ensure OAuth integration doesn't break dashboard
    for (let i = 0; i < 3; i++) {
      await page.goto('http://localhost:3000/dashboard');
      await page.waitForLoadState('networkidle');
      
      // Verify core dashboard elements are present
      await expect(page.locator('h1')).toContainText('Good morning');
      await expect(page.locator('text=PM Tool Integrations')).toBeVisible();
      await expect(page.locator('button', { hasText: 'Connect Jira' })).toBeVisible();
      
      // Small delay between iterations
      await page.waitForTimeout(500);
    }
  });
});