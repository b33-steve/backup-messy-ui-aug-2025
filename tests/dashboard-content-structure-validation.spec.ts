/**
 * Dashboard Content Structure Tests - STRICT Content Validation
 * These tests validate the actual dashboard structure matches the reference screenshot
 * 
 * Expected Structure:
 * 1. AI Teams status bar with 4 teams
 * 2. Strategic scenarios in 2x2 grid (4 cards total)
 * 3. Glass morphism effects on all cards
 * 4. Proper data-testid attributes for reliable testing
 */

import { test, expect } from '@playwright/test'

test.describe('Dashboard Content Structure Validation - STRICT', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000) // Ensure React hydration
  })

  test('has exactly 4 scenario cards with proper test IDs', async ({ page }) => {
    // This test will FAIL - we need data-testid="scenario-card" on each card
    const cards = await page.locator('[data-testid="scenario-card"]').count()
    expect(cards).toBe(4) // This will show actual count vs expected 4
    
    // Verify each specific scenario card exists
    await expect(page.locator('[data-testid="scenario-card"]:has-text("Competitive Strategy")')).toBeVisible()
    await expect(page.locator('[data-testid="scenario-card"]:has-text("Resource Allocation")')).toBeVisible() 
    await expect(page.locator('[data-testid="scenario-card"]:has-text("Growth Strategy")')).toBeVisible()
    await expect(page.locator('[data-testid="scenario-card"]:has-text("Market Strategy")')).toBeVisible()
  })

  test('scenario cards are in 2x2 grid layout', async ({ page }) => {
    // This test will FAIL - we need data-testid="scenario-grid"
    const container = page.locator('[data-testid="scenario-grid"]')
    await expect(container).toBeVisible()
    
    const gridCols = await container.evaluate(el => 
      window.getComputedStyle(el).gridTemplateColumns
    )
    // Should be something like "1fr 1fr" for 2 columns
    expect(gridCols).toMatch(/1fr.*1fr|auto.*auto|\d+px.*\d+px/)
    
    const gridRows = await container.evaluate(el => 
      window.getComputedStyle(el).gridTemplateRows  
    )
    // Should have 2 rows for 2x2 grid
    expect(gridRows).toMatch(/auto.*auto|1fr.*1fr|\d+(\.\d+)?px.*\d+(\.\d+)?px/)
  })

  test('cards have proper glass morphism effects', async ({ page }) => {
    const card = page.locator('[data-testid="scenario-card"]').first()
    await expect(card).toBeVisible()
    
    const styles = await card.evaluate(el => {
      const style = window.getComputedStyle(el)
      return {
        backgroundColor: style.backgroundColor,
        backdropFilter: style.backdropFilter,
        border: style.border
      }
    })
    
    // Glass morphism should have transparent background
    expect(styles.backgroundColor).toContain('rgba')
    expect(styles.backgroundColor).not.toBe('rgb(255, 255, 255)') // Not solid white
    
    // Should have backdrop blur effect
    expect(styles.backdropFilter).toContain('blur')
  })

  test('AI teams status bar is visible with 4 teams', async ({ page }) => {
    // This test will FAIL - we need the AI teams status bar
    const statusBar = page.locator('[data-testid="ai-teams-status"]')
    await expect(statusBar).toBeVisible()
    
    // Check for all 4 AI teams
    await expect(page.locator('[data-testid="ai-team"]:has-text("Strategic Intelligence")')).toBeVisible()
    await expect(page.locator('[data-testid="ai-team"]:has-text("Workflow Execution")')).toBeVisible()  
    await expect(page.locator('[data-testid="ai-team"]:has-text("Data Intelligence")')).toBeVisible()
    await expect(page.locator('[data-testid="ai-team"]:has-text("Communication")')).toBeVisible()
  })

  test('AI teams have status indicators', async ({ page }) => {
    // Verify status colors and states
    const strategicTeam = page.locator('[data-testid="ai-team"]:has-text("Strategic Intelligence")')
    await expect(strategicTeam.locator('text=Active')).toBeVisible()
    
    const workflowTeam = page.locator('[data-testid="ai-team"]:has-text("Workflow Execution")')
    await expect(workflowTeam.locator('text=Ready')).toBeVisible()
    
    const dataTeam = page.locator('[data-testid="ai-team"]:has-text("Data Intelligence")')  
    await expect(dataTeam.locator('text=Learning')).toBeVisible()
    
    const commTeam = page.locator('[data-testid="ai-team"]:has-text("Communication")')
    await expect(commTeam.locator('text=Standby')).toBeVisible()
  })

  test('scenario cards have proper content structure', async ({ page }) => {
    // Test the specific content structure of each card
    const competitiveCard = page.locator('[data-testid="scenario-card"]:has-text("Competitive Strategy")')
    await expect(competitiveCard.locator('text=Competitor launched similar features')).toBeVisible()
    await expect(competitiveCard.locator('text=They have 10x funding. Strategic response?')).toBeVisible()
    
    const resourceCard = page.locator('[data-testid="scenario-card"]:has-text("Resource Allocation")')
    await expect(resourceCard.locator('text=Hire developer vs marketing spend')).toBeVisible()
    await expect(resourceCard.locator('text=$15k budget to reach 50 beta users')).toBeVisible()
    
    const growthCard = page.locator('[data-testid="scenario-card"]:has-text("Growth Strategy")')
    await expect(growthCard.locator('text=Low beta-to-paid conversion')).toBeVisible()
    await expect(growthCard.locator('text=Great feedback, poor conversion rates')).toBeVisible()
    
    const marketCard = page.locator('[data-testid="scenario-card"]:has-text("Market Strategy")')
    await expect(marketCard.locator('text=Enterprise vs SMB focus')).toBeVisible()
    await expect(marketCard.locator('text=Bigger deals vs momentum building')).toBeVisible()
  })

  test('cards have proper category color coding', async ({ page }) => {
    // Test that each card has the correct color-coded category label
    const competitiveCard = page.locator('[data-testid="scenario-card"]:has-text("Competitive Strategy")')
    const competitiveLabel = competitiveCard.locator('.text-blue-600')
    await expect(competitiveLabel).toContainText('COMPETITIVE STRATEGY')
    
    const resourceCard = page.locator('[data-testid="scenario-card"]:has-text("Resource Allocation")')
    const resourceLabel = resourceCard.locator('.text-green-600')
    await expect(resourceLabel).toContainText('RESOURCE ALLOCATION')
    
    const growthCard = page.locator('[data-testid="scenario-card"]:has-text("Growth Strategy")')
    const growthLabel = growthCard.locator('.text-orange-600')
    await expect(growthLabel).toContainText('GROWTH STRATEGY')
    
    const marketCard = page.locator('[data-testid="scenario-card"]:has-text("Market Strategy")')
    const marketLabel = marketCard.locator('.text-purple-600')
    await expect(marketLabel).toContainText('MARKET STRATEGY')
  })
})

test.describe('Dashboard Visual Layout Validation - STRICT', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
  })

  test('validates exact 3-column layout with glass morphism', async ({ page }) => {
    // Test the main dashboard layout
    const dashboard = page.locator('[data-testid="dashboard-main"]')
    await expect(dashboard).toBeVisible()
    
    // Verify 3-column grid
    const gridCols = await dashboard.evaluate(el => 
      window.getComputedStyle(el).gridTemplateColumns
    )
    expect(gridCols).toContain('280px')
    expect(gridCols).toContain('320px')
  })

  test('all interactive elements are properly accessible', async ({ page }) => {
    // Test that all cards are clickable and have proper hover states
    const scenarioCards = page.locator('[data-testid="scenario-card"]')
    const cardCount = await scenarioCards.count()
    
    for (let i = 0; i < cardCount; i++) {
      const card = scenarioCards.nth(i)
      await expect(card).toBeVisible()
      
      // Test hover state
      await card.hover()
      
      // Verify card is clickable (cursor should be pointer)
      const cursor = await card.evaluate(el => 
        window.getComputedStyle(el).cursor
      )
      expect(cursor).toBe('pointer')
    }
  })
})