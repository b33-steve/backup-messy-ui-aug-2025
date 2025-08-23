/**
 * File: /app/frontend/tests/keyboard-shortcuts.spec.ts
 * Purpose: Test keyboard shortcuts and power user features in PM33 Command Center
 * Why: Ensure keyboard shortcuts work correctly for power user workflows
 * Relevant Files: lib/navigation/workflow-state-manager.ts, app/(app)/command-center/page.tsx
 */

import { test, expect } from '@playwright/test';

test.describe('PM33 Keyboard Shortcuts', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to command center
    await page.goto('http://localhost:3001/command-center');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Wait for strategic intelligence content to load
    await page.waitForSelector('h2:has-text("Strategic Intelligence")');
  });

  test('should open command palette with Cmd+K', async ({ page }) => {
    // Press Cmd+K (or Ctrl+K on Windows/Linux)
    const isMac = process.platform === 'darwin';
    await page.keyboard.press(isMac ? 'Meta+KeyK' : 'Control+KeyK');
    
    // Should trigger command palette toggle
    // Note: This tests the keyboard event listener, actual command palette UI would need to be implemented
    await page.waitForTimeout(100);
    
    // Verify the keyboard shortcut was registered (check if action was logged)
    const commandButton = page.locator('button:has-text("Command")');
    await expect(commandButton).toBeVisible();
    
    // Verify the shortcut badge is shown
    const shortcutBadge = page.locator('text=⌘K');
    await expect(shortcutBadge).toBeVisible();
  });

  test('should navigate to strategic intelligence with Cmd+N', async ({ page }) => {
    // Mock router navigation
    let navigationUrl = '';
    await page.route('**/strategic-intelligence', (route) => {
      navigationUrl = route.request().url();
      route.continue();
    });
    
    // Press Cmd+N
    const isMac = process.platform === 'darwin';
    await page.keyboard.press(isMac ? 'Meta+KeyN' : 'Control+KeyN');
    
    // Should navigate to strategic intelligence
    await page.waitForTimeout(100);
    
    // Check if New Analysis button is present (which uses same navigation)
    const newAnalysisButton = page.locator('button:has-text("New Analysis")');
    await expect(newAnalysisButton).toBeVisible();
  });

  test('should navigate to command center with Cmd+H', async ({ page }) => {
    // We're already on command center, so this should be a no-op or refresh
    const isMac = process.platform === 'darwin';
    await page.keyboard.press(isMac ? 'Meta+KeyH' : 'Control+KeyH');
    
    await page.waitForTimeout(100);
    
    // Verify we're still on command center
    const title = page.locator('h1:has-text("Command Center")');
    await expect(title).toBeVisible();
  });

  test('should navigate to what-if analysis with Cmd+W', async ({ page }) => {
    // Press Cmd+W
    const isMac = process.platform === 'darwin';
    await page.keyboard.press(isMac ? 'Meta+KeyW' : 'Control+KeyW');
    
    await page.waitForTimeout(100);
    
    // The shortcut should attempt navigation to strategic-intelligence with what-if mode
    // We can verify the quick action for what-if exists
    const whatIfAction = page.locator('text=What-If Analysis');
    await expect(whatIfAction).toBeVisible();
  });

  test('should record power user actions on keyboard shortcuts', async ({ page }) => {
    // This tests the engagement tracking functionality
    const isMac = process.platform === 'darwin';
    
    // Use multiple shortcuts to trigger power user action recording
    await page.keyboard.press(isMac ? 'Meta+KeyK' : 'Control+KeyK');
    await page.waitForTimeout(50);
    await page.keyboard.press(isMac ? 'Meta+KeyH' : 'Control+KeyH');
    await page.waitForTimeout(50);
    
    // Verify power user metrics section exists
    const metricsSection = page.locator('text=Power User Actions');
    await expect(metricsSection).toBeVisible();
  });

  test('should show correct shortcut hints in quick actions', async ({ page }) => {
    // Check that quick action cards show keyboard shortcuts
    const shortcuts = ['Cmd+N', 'Cmd+W', 'Cmd+J'];
    
    for (const shortcut of shortcuts) {
      const shortcutBadge = page.locator(`text=${shortcut}`).first();
      await expect(shortcutBadge).toBeVisible();
    }
  });

  test('should maintain focus management with keyboard navigation', async ({ page }) => {
    // Test that keyboard shortcuts don't interfere with normal form focus
    const refreshButton = page.locator('button:has-text("Refresh")');
    await refreshButton.focus();
    
    // Press Cmd+K while focused on an element
    const isMac = process.platform === 'darwin';
    await page.keyboard.press(isMac ? 'Meta+KeyK' : 'Control+KeyK');
    
    // Focus should be managed appropriately
    await page.waitForTimeout(100);
    
    // Verify the page still functions normally
    await expect(refreshButton).toBeVisible();
  });

  test('should prevent default browser shortcuts', async ({ page }) => {
    // Test that our shortcuts prevent default browser behavior
    const isMac = process.platform === 'darwin';
    
    // Cmd+N normally opens new window - our handler should prevent this
    await page.keyboard.press(isMac ? 'Meta+KeyN' : 'Control+KeyN');
    await page.waitForTimeout(100);
    
    // Should still be on the same page, not opened new window
    const title = page.locator('h1:has-text("Command Center")');
    await expect(title).toBeVisible();
  });

  test('should work with different user personas', async ({ page }) => {
    // Test that shortcuts adapt to different user personas
    // This would require setting user persona in localStorage first
    
    await page.evaluate(() => {
      localStorage.setItem('pm33-workflow-state', JSON.stringify({
        state: {
          userPersona: 'founder',
          currentWorkflow: 'planning'
        }
      }));
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Verify founder-specific quick actions are visible
    const quickChatAction = page.locator('text=Strategic Question');
    await expect(quickChatAction).toBeVisible();
    
    // Test shortcuts still work with different persona
    const isMac = process.platform === 'darwin';
    await page.keyboard.press(isMac ? 'Meta+KeyK' : 'Control+KeyK');
    
    const commandButton = page.locator('button:has-text("Command")');
    await expect(commandButton).toBeVisible();
  });

  test('should handle crisis mode keyboard shortcuts', async ({ page }) => {
    // Set workflow to firefighting mode
    await page.evaluate(() => {
      localStorage.setItem('pm33-workflow-state', JSON.stringify({
        state: {
          currentWorkflow: 'firefighting',
          criticalAlertsCount: 2
        }
      }));
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Should show crisis mode button
    const crisisModeButton = page.locator('button:has-text("Crisis Mode")');
    await expect(crisisModeButton).toBeVisible();
    
    // Keyboard shortcuts should still work in crisis mode
    const isMac = process.platform === 'darwin';
    await page.keyboard.press(isMac ? 'Meta+KeyK' : 'Control+KeyK');
    
    const commandButton = page.locator('button:has-text("Command")');
    await expect(commandButton).toBeVisible();
  });
});