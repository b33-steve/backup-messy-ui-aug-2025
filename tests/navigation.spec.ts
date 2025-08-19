import { test, expect } from '@playwright/test';

test.describe('PM33 Simplified Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app (assuming dashboard is the main entry point)
    await page.goto('/dashboard');
  });

  test('should display simplified navigation with correct labels', async ({ page }) => {
    // Test that navigation contains simplified labels
    const nav = page.locator('[data-testid="main-navigation"]');
    
    await expect(nav.locator('text=Chat')).toBeVisible();
    await expect(nav.locator('text=Dashboard')).toBeVisible(); 
    await expect(nav.locator('text=Tasks')).toBeVisible();
    await expect(nav.locator('text=Data')).toBeVisible();
    await expect(nav.locator('text=Settings')).toBeVisible();
    
    // Should NOT contain complex terms
    await expect(nav.locator('text=Strategic Intelligence')).not.toBeVisible();
    await expect(nav.locator('text=Command Center')).not.toBeVisible();
    await expect(nav.locator('text=Workflow Execution')).not.toBeVisible();
  });

  test('should display PM33 logo in navigation', async ({ page }) => {
    const logo = page.locator('[data-testid="pm33-logo"]');
    await expect(logo).toBeVisible();
  });

  test('should show demo mode toggle', async ({ page }) => {
    const demoToggle = page.locator('[data-testid="demo-toggle"]');
    await expect(demoToggle).toBeVisible();
    
    // Should have DEMO indicator when enabled
    await expect(demoToggle.locator('text=DEMO')).toBeVisible();
  });

  test('should toggle demo mode on and off', async ({ page }) => {
    const demoToggle = page.locator('[data-testid="demo-toggle"]');
    
    // Initially should be in demo mode
    await expect(demoToggle).toHaveAttribute('data-demo-active', 'true');
    
    // Click to disable demo mode
    await demoToggle.click();
    await expect(demoToggle).toHaveAttribute('data-demo-active', 'false');
    
    // Demo indicators should be hidden
    const demoBadges = page.locator('.demo-badge');
    await expect(demoBadges.first()).not.toBeVisible();
    
    // Click to re-enable demo mode
    await demoToggle.click();
    await expect(demoToggle).toHaveAttribute('data-demo-active', 'true');
  });

  test('should navigate to correct pages', async ({ page }) => {
    // Test Chat navigation
    await page.click('text=Chat');
    await expect(page).toHaveURL('/chat');
    await expect(page.locator('h1')).toContainText('Chat');
    
    // Test Dashboard navigation
    await page.click('text=Dashboard');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    // Test Tasks navigation
    await page.click('text=Tasks');
    await expect(page).toHaveURL('/tasks');
    await expect(page.locator('h1')).toContainText('Tasks');
    
    // Test Data navigation
    await page.click('text=Data');
    await expect(page).toHaveURL('/data');
    await expect(page.locator('h1')).toContainText('Data');
    
    // Test Settings navigation
    await page.click('text=Settings');
    await expect(page).toHaveURL('/settings');
    await expect(page.locator('h1')).toContainText('Settings');
  });

  test('should highlight active navigation item', async ({ page }) => {
    // Dashboard should be active initially
    const dashboardNav = page.locator('[data-testid="nav-dashboard"]');
    await expect(dashboardNav).toHaveAttribute('data-active', 'true');
    
    // Navigate to Chat
    await page.click('text=Chat');
    const chatNav = page.locator('[data-testid="nav-chat"]');
    await expect(chatNav).toHaveAttribute('data-active', 'true');
    await expect(dashboardNav).toHaveAttribute('data-active', 'false');
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const nav = page.locator('[data-testid="main-navigation"]');
    await expect(nav).toBeVisible();
    
    // Navigation should still be accessible on mobile
    await expect(nav.locator('text=Chat')).toBeVisible();
    await expect(nav.locator('text=Dashboard')).toBeVisible();
  });

  test('should maintain consistent styling', async ({ page }) => {
    // Test that navigation follows design system
    const nav = page.locator('[data-testid="main-navigation"]');
    
    // Should use correct container sizing
    await expect(nav).toHaveCSS('max-width', '1200px');
    
    // Demo toggle should have gradient background
    const demoToggle = page.locator('[data-testid="demo-toggle"]');
    const background = await demoToggle.evaluate(el => getComputedStyle(el).background);
    expect(background).toContain('gradient');
  });

  test('should show demo indicators when demo mode is active', async ({ page }) => {
    // Ensure demo mode is active
    const demoToggle = page.locator('[data-testid="demo-toggle"]');
    if (await demoToggle.getAttribute('data-demo-active') !== 'true') {
      await demoToggle.click();
    }
    
    // Navigate to different pages and check for demo badges
    await page.click('text=Chat');
    await expect(page.locator('.demo-badge').first()).toBeVisible();
    
    await page.click('text=Tasks'); 
    await expect(page.locator('.demo-badge').first()).toBeVisible();
    
    await page.click('text=Data');
    await expect(page.locator('.demo-badge').first()).toBeVisible();
  });

  test('should hide demo indicators when demo mode is inactive', async ({ page }) => {
    // Disable demo mode
    const demoToggle = page.locator('[data-testid="demo-toggle"]');
    if (await demoToggle.getAttribute('data-demo-active') === 'true') {
      await demoToggle.click();
    }
    
    // Navigate to different pages and verify no demo badges
    await page.click('text=Chat');
    await expect(page.locator('.demo-badge')).not.toBeVisible();
    
    await page.click('text=Tasks');
    await expect(page.locator('.demo-badge')).not.toBeVisible();
  });
});