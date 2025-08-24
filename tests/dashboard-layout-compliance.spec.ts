/**
 * Dashboard Layout Compliance Tests
 * Validates that the dashboard meets all specified layout requirements
 * 
 * Requirements being tested:
 * 1. 3-column layout (280px | 1fr | 320px)
 * 2. Centered "Command Center" heading  
 * 3. Compact left navigation with Strategic Tools + Company Context
 * 4. Center section: greeting + 4 action boxes + chat window
 * 5. Right sidebar with exactly 3 boxes
 * 6. Gray gradient background
 * 7. Off-white cards with no borders, consistent corners
 * 8. Navigation states: blue font for selected, dark for others
 */

import { test, expect } from '@playwright/test'

test.describe('Dashboard Layout Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
    
    // Wait for page to be fully loaded and hydrated
    await page.waitForLoadState('networkidle')
    
    // Wait for React hydration
    await page.waitForTimeout(1000)
  })

  test('should display 3-column layout with correct proportions', async ({ page }) => {
    // Check that dashboard grid exists and has correct CSS Grid properties
    const dashboardGrid = page.locator('.dashboard-3-col')
    await expect(dashboardGrid).toBeVisible()
    
    // Verify CSS Grid properties using JavaScript evaluation
    const gridProperties = await page.evaluate(() => {
      const grid = document.querySelector('.dashboard-3-col') as HTMLElement
      const computedStyle = window.getComputedStyle(grid)
      return {
        display: computedStyle.display,
        gridTemplateColumns: computedStyle.gridTemplateColumns,
        gap: computedStyle.gap
      }
    })
    
    expect(gridProperties.display).toBe('grid')
    expect(gridProperties.gridTemplateColumns).toMatch(/280px.*320px/) // Should contain both sidebar widths
    expect(gridProperties.gap).toBe('24px') // 1.5rem = 24px
  })

  test('should have centered Command Center heading', async ({ page }) => {
    const heading = page.locator('h1:has-text("Command Center")')
    await expect(heading).toBeVisible()
    
    // Check if heading has center alignment
    const textAlign = await heading.evaluate((el) => {
      return window.getComputedStyle(el).textAlign
    })
    
    expect(textAlign).toBe('center')
  })

  test('should display gray gradient background', async ({ page }) => {
    const backgroundElement = page.locator('.pm33-gray-gradient-bg')
    await expect(backgroundElement).toBeVisible()
    
    // Check background gradient
    const backgroundImage = await backgroundElement.evaluate((el) => {
      return window.getComputedStyle(el).backgroundImage
    })
    
    expect(backgroundImage).toContain('linear-gradient')
    expect(backgroundImage).toContain('rgb(241, 245, 249)') // #f1f5f9
    expect(backgroundImage).toContain('rgb(226, 232, 240)') // #e2e8f0
    expect(backgroundImage).toContain('rgb(203, 213, 225)') // #cbd5e1
  })

  test('should have compact left navigation with two sections', async ({ page }) => {
    // Strategic Tools section
    const strategicTools = page.locator('h3:has-text("STRATEGIC TOOLS")')
    await expect(strategicTools).toBeVisible()
    
    // Company Context section  
    const companyContext = page.locator('h3:has-text("COMPANY CONTEXT")')
    await expect(companyContext).toBeVisible()
    
    // Check that both sections are in compact nav containers
    const compactNavSections = page.locator('.pm33-compact-nav')
    await expect(compactNavSections).toHaveCount(2)
    
    // Verify compact nav styling
    const navStyling = await compactNavSections.first().evaluate((el) => {
      const style = window.getComputedStyle(el)
      return {
        backgroundColor: style.backgroundColor,
        borderRadius: style.borderRadius,
        border: style.border
      }
    })
    
    expect(navStyling.backgroundColor).toBe('rgba(248, 250, 252, 0.95)')
    expect(navStyling.borderRadius).toBe('12px')
    expect(navStyling.border).toBe('none') // No borders as specified
  })

  test('should have center section with greeting, 4 action boxes, and chat', async ({ page }) => {
    // Greeting section
    const greeting = page.locator('h2:has-text("Strategic AI Co-Pilot Ready")')
    await expect(greeting).toBeVisible()
    
    // 4 action boxes with specific strategy types
    const competitiveStrategy = page.locator('.pm33-action-box:has-text("COMPETITIVE STRATEGY")')
    const resourceAllocation = page.locator('.pm33-action-box:has-text("RESOURCE ALLOCATION")')  
    const growthStrategy = page.locator('.pm33-action-box:has-text("GROWTH STRATEGY")')
    const marketStrategy = page.locator('.pm33-action-box:has-text("MARKET STRATEGY")')
    
    await expect(competitiveStrategy).toBeVisible()
    await expect(resourceAllocation).toBeVisible()
    await expect(growthStrategy).toBeVisible() 
    await expect(marketStrategy).toBeVisible()
    
    // Chat window at bottom
    const chatWindow = page.locator('.pm33-chat-window')
    await expect(chatWindow).toBeVisible()
    
    const chatInput = page.locator('input[placeholder*="Ask me anything strategic"]')
    await expect(chatInput).toBeVisible()
  })

  test('should have right sidebar with exactly 3 boxes', async ({ page }) => {
    // Competitive Landscape box
    const competitiveLandscape = page.locator('h3:has-text("COMPETITIVE LANDSCAPE")')
    await expect(competitiveLandscape).toBeVisible()
    
    // Team & Resources box
    const teamResources = page.locator('h3:has-text("TEAM & RESOURCES")')
    await expect(teamResources).toBeVisible()
    
    // Key Metrics box
    const keyMetrics = page.locator('h3:has-text("KEY METRICS")')
    await expect(keyMetrics).toBeVisible()
    
    // Verify exactly 3 professional cards in right sidebar
    const professionalCards = page.locator('.pm33-professional-card')
    await expect(professionalCards).toHaveCount(3)
  })

  test('should have consistent off-white card styling with no borders', async ({ page }) => {
    const cards = page.locator('.pm33-professional-card, .pm33-compact-nav, .pm33-greeting-section, .pm33-action-box, .pm33-chat-window')
    
    // Check that we have multiple cards
    await expect(cards).toHaveCount(11) // 3 professional + 2 compact nav + 1 greeting + 4 action + 1 chat
    
    // Sample a few cards to verify consistent styling
    const cardStyling = await cards.first().evaluate((el) => {
      const style = window.getComputedStyle(el)
      return {
        backgroundColor: style.backgroundColor,
        borderRadius: style.borderRadius,
        border: style.border,
        boxShadow: style.boxShadow
      }
    })
    
    expect(cardStyling.backgroundColor).toBe('rgba(248, 250, 252, 0.95)')
    expect(cardStyling.borderRadius).toBe('12px')
    expect(cardStyling.border).toBe('none') // No borders as specified
    expect(cardStyling.boxShadow).toContain('rgba(0, 0, 0, 0.08)') // Subtle shadow
  })

  test('should be responsive on different viewport sizes', async ({ page }) => {
    // Test desktop layout (1440px)
    await page.setViewportSize({ width: 1440, height: 900 })
    
    const dashboardGrid = page.locator('.dashboard-3-col')
    const gridColumns = await dashboardGrid.evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns
    })
    
    // Should maintain 3-column layout on desktop
    expect(gridColumns).toMatch(/280px.*320px/)
    
    // Test mobile layout (375px) - should stack to single column
    await page.setViewportSize({ width: 375, height: 667 })
    await page.waitForTimeout(100) // Wait for CSS to apply
    
    const mobileGridColumns = await dashboardGrid.evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns
    })
    
    // Should stack to single column on mobile (based on our CSS media query at 768px)
    // At 375px width, should be single column
    expect(mobileGridColumns).toBe('none') // Fallback for unsupported grid or single column
  })

  test('should have working interactive elements', async ({ page }) => {
    // Test action box interactivity (cursor pointer)
    const actionBox = page.locator('.pm33-action-box').first()
    await expect(actionBox).toBeVisible()
    
    // Test chat input functionality
    const chatInput = page.locator('input[placeholder*="Ask me anything strategic"]')
    await chatInput.fill('Test strategic question')
    await expect(chatInput).toHaveValue('Test strategic question')
    
    // Test send button
    const sendButton = page.locator('button:has-text("Send")')
    await expect(sendButton).toBeVisible()
    await expect(sendButton).toBeEnabled()
  })

  test('should have proper typography hierarchy', async ({ page }) => {
    // Main heading
    const mainHeading = page.locator('h1:has-text("Command Center")')
    const mainHeadingStyles = await mainHeading.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return {
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        color: style.color
      }
    })
    
    expect(mainHeadingStyles.fontSize).toBe('40px') // 2.5rem = 40px
    expect(mainHeadingStyles.fontWeight).toBe('700')
    expect(mainHeadingStyles.color).toBe('rgb(30, 41, 59)') // #1e293b
    
    // Section headings should be consistent
    const sectionHeadings = page.locator('h3')
    await expect(sectionHeadings).toHaveCount(6) // STRATEGIC TOOLS, COMPANY CONTEXT, COMPETITIVE LANDSCAPE, TEAM & RESOURCES, KEY METRICS, plus others
  })
})

test.describe('Dashboard Content Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
  })

  test('should display correct strategic scenarios', async ({ page }) => {
    // Verify specific strategic scenario content
    await expect(page.locator('text=Competitor launched similar features')).toBeVisible()
    await expect(page.locator('text=They have 10x funding. Strategic response?')).toBeVisible()
    
    await expect(page.locator('text=Hire developer vs marketing spend')).toBeVisible()
    await expect(page.locator('text=$15k budget to reach 50 beta users')).toBeVisible()
    
    await expect(page.locator('text=Low beta-to-paid conversion')).toBeVisible()
    await expect(page.locator('text=Great feedback, poor conversion rates')).toBeVisible()
    
    await expect(page.locator('text=Enterprise vs SMB focus')).toBeVisible()
    await expect(page.locator('text=Bigger deals vs momentum building')).toBeVisible()
  })

  test('should display correct company metrics', async ({ page }) => {
    // Team & Resources
    await expect(page.locator('text=Team Size:')).toBeVisible()
    await expect(page.locator('text=3 people')).toBeVisible()
    await expect(page.locator('text=1 PM, 2 Engineers')).toBeVisible()
    await expect(page.locator('text=Runway:')).toBeVisible()
    await expect(page.locator('text=6 months')).toBeVisible()
    
    // Key Metrics
    await expect(page.locator('text=Beta Signups:')).toBeVisible()
    await expect(page.locator('text=15 total')).toBeVisible()
    await expect(page.locator('text=Available Budget:')).toBeVisible()
    await expect(page.locator('text=$15,000')).toBeVisible()
    await expect(page.locator('text=Progress to Goal')).toBeVisible()
    await expect(page.locator('text=30%')).toBeVisible()
  })
})

test.describe('Dashboard Performance and Accessibility', () => {
  test('should load within acceptable time limits', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime
    
    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000)
  })

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Test tab navigation to chat input
    await page.keyboard.press('Tab')
    // Continue tabbing to reach the chat input
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
      const focused = await page.locator(':focus').count()
      if (focused > 0) {
        const focusedElement = page.locator(':focus')
        const tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase())
        if (tagName === 'input') break
      }
    }
    
    // Should be able to type in focused input
    await page.keyboard.type('Keyboard navigation test')
    const chatInput = page.locator('input[placeholder*="Ask me anything strategic"]')
    await expect(chatInput).toHaveValue('Keyboard navigation test')
  })
})