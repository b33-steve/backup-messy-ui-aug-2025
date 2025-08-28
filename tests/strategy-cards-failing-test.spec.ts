/**
 * THIS TEST WILL FAIL - Proving the dashboard structure is broken
 * The user is correct - the dashboard doesn't have the right structure
 */

import { test, expect } from '@playwright/test'

test.describe('Strategy Cards - FAILING TEST to prove problems', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
  })

  test('has 4 strategy cards in grid - THIS WILL FAIL', async ({ page }) => {
    // This is exactly what the user requested to prove it's broken
    const container = page.locator('.grid.grid-cols-2')
    await expect(container).toBeVisible()
    
    const cards = container.locator('.strategy-card')
    await expect(cards).toHaveCount(4)
  })

  test('prove strategy cards count is 0', async ({ page }) => {
    const cards = await page.locator('.strategy-card').count()
    console.log('Strategy cards found:', cards) // Will be 0
    
    // This test will fail because there are no .strategy-card elements
    expect(cards).toBe(4) // This will fail with 0
  })

  test('show what the current structure actually is', async ({ page }) => {
    // Let's see what's actually in the middle section
    const middleSection = page.locator('[data-testid="scenario-grid"]')
    
    // Check if it exists at all
    const exists = await middleSection.count()
    console.log('Scenario grid elements found:', exists)
    
    // Get the actual HTML structure
    if (exists > 0) {
      const html = await middleSection.innerHTML()
      console.log('Current HTML structure:', html)
    }
    
    // This test is just for debugging - it will show us what's really there
    expect(exists).toBeGreaterThan(0)
  })
})