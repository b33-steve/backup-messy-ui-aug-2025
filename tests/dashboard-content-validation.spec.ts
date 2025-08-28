/**
 * PM33 Dashboard Content Validation Suite
 * Ensures all text content, data accuracy, and strategic scenarios match reference
 * 
 * Validates:
 * - Strategic scenarios (Competitive Strategy, Resource Allocation, etc.)
 * - Metrics and data display accuracy
 * - Navigation labels and content consistency
 * - Company context information accuracy
 */

import { test, expect, Page } from '@playwright/test'

const DASHBOARD_URL = '/dashboard'
const DESKTOP_VIEWPORT = { width: 1440, height: 900 }

// Expected content from reference materials
const EXPECTED_STRATEGIC_SCENARIOS = [
  {
    category: 'COMPETITIVE STRATEGY',
    title: 'Competitor launched similar features',
    description: 'They have 10x funding. Strategic response?'
  },
  {
    category: 'RESOURCE ALLOCATION', 
    title: 'Hire developer vs marketing spend',
    description: '$15k budget to reach 50 beta users'
  },
  {
    category: 'GROWTH STRATEGY',
    title: 'Low beta-to-paid conversion',
    description: 'Great feedback, poor conversion rates'
  },
  {
    category: 'MARKET STRATEGY',
    title: 'Enterprise vs SMB focus', 
    description: 'Bigger deals vs momentum building'
  }
]

const EXPECTED_NAVIGATION_ITEMS = {
  strategicTools: [
    'Strategic Chat',
    'Project Delivery', 
    'Analytics',
    'OKR Planner'
  ],
  companyContext: [
    'Company Profile',
    'Current Priorities',
    'Competitive Intel',
    'Team Resources'
  ]
}

const EXPECTED_METRICS = {
  teamSize: '3 people',
  runway: '6 months',
  betaSignups: '15 total',
  budget: '$15,000',
  progressToGoal: '30%'
}

test.describe('PM33 Dashboard Content Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT)
    await page.goto(DASHBOARD_URL)
    await page.waitForLoadState('networkidle')
  })

  test('Strategic Scenarios Content Accuracy', async ({ page }) => {
    await test.step('Validate all 4 strategic action boxes exist', async () => {
      const actionBoxes = page.locator('.pm33-action-box')
      await expect(actionBoxes).toHaveCount(4)
    })

    await test.step('Validate strategic scenario categories', async () => {
      for (const scenario of EXPECTED_STRATEGIC_SCENARIOS) {
        // Check category label
        const categoryElement = page.locator(`text="${scenario.category}"`)
        await expect(categoryElement).toBeVisible()
        
        // Check title
        const titleElement = page.locator(`text="${scenario.title}"`)
        await expect(titleElement).toBeVisible()
        
        // Check description
        const descriptionElement = page.locator(`text="${scenario.description}"`)
        await expect(descriptionElement).toBeVisible()
      }
    })

    await test.step('Validate action box structure and styling', async () => {
      const actionBoxes = page.locator('.pm33-action-box')
      
      for (let i = 0; i < 4; i++) {
        const box = actionBoxes.nth(i)
        
        // Should have category, title, and description
        const category = box.locator('[class*="text-xs"][class*="font-semibold"]').first()
        const title = box.locator('h4').first()
        const description = box.locator('p').first()
        
        await expect(category).toBeVisible()
        await expect(title).toBeVisible()
        await expect(description).toBeVisible()
        
        // Category should be uppercase
        const categoryText = await category.textContent()
        expect(categoryText).toBe(categoryText?.toUpperCase())
      }
    })
  })

  test('Navigation Content Validation', async ({ page }) => {
    await test.step('Validate Strategic Tools navigation', async () => {
      const strategicToolsSection = page.locator('h3:has-text("STRATEGIC TOOLS")').locator('..')
      
      for (const item of EXPECTED_NAVIGATION_ITEMS.strategicTools) {
        const navItem = strategicToolsSection.locator(`text="${item}"`)
        await expect(navItem).toBeVisible()
      }
    })

    await test.step('Validate Company Context navigation', async () => {
      const companyContextSection = page.locator('h3:has-text("COMPANY CONTEXT")').locator('..')
      
      for (const item of EXPECTED_NAVIGATION_ITEMS.companyContext) {
        const navItem = companyContextSection.locator(`text="${item}"`)
        await expect(navItem).toBeVisible()
      }
    })

    await test.step('Validate navigation item structure', async () => {
      const navItems = page.locator('.pm33-compact-nav-item')
      const itemCount = await navItems.count()
      expect(itemCount).toBeGreaterThanOrEqual(8) // Should have at least 8 nav items
      
      // Each nav item should have an icon and text
      for (let i = 0; i < Math.min(itemCount, 3); i++) {
        const item = navItems.nth(i)
        const icon = item.locator('svg, .lucide')
        const text = item.locator('span')
        
        await expect(icon).toBeVisible()
        await expect(text).toBeVisible()
      }
    })
  })

  test('Right Sidebar Metrics Validation', async ({ page }) => {
    await test.step('Validate Team & Resources card', async () => {
      const teamCard = page.locator('h3:has-text("TEAM & RESOURCES")').locator('..')
      
      // Team size
      await expect(teamCard.locator(`text="${EXPECTED_METRICS.teamSize}"`)).toBeVisible()
      
      // Runway
      await expect(teamCard.locator(`text="${EXPECTED_METRICS.runway}"`)).toBeVisible()
      
      // Team composition description
      await expect(teamCard.locator('text="1 PM, 2 Engineers"')).toBeVisible()
    })

    await test.step('Validate Key Metrics card', async () => {
      const metricsCard = page.locator('h3:has-text("KEY METRICS")').locator('..')
      
      // Beta signups
      await expect(metricsCard.locator(`text="${EXPECTED_METRICS.betaSignups}"`)).toBeVisible()
      
      // Budget
      await expect(metricsCard.locator(`text="${EXPECTED_METRICS.budget}"`)).toBeVisible()
      
      // Progress percentage
      await expect(metricsCard.locator(`text="${EXPECTED_METRICS.progressToGoal}"`)).toBeVisible()
      
      // Progress bar should exist
      const progressBar = metricsCard.locator('[style*="width: 30%"]')
      await expect(progressBar).toBeVisible()
    })

    await test.step('Validate Competitive Landscape card', async () => {
      const competitiveCard = page.locator('h3:has-text("COMPETITIVE LANDSCAPE")').locator('..')
      
      // Primary competitor
      await expect(competitiveCard.locator('text="Primary: Productboard"')).toBeVisible()
      await expect(competitiveCard.locator('text="Series C, $100M+ funding, roadmap focus"')).toBeVisible()
      
      // Secondary competitor  
      await expect(competitiveCard.locator('text="Secondary: Aha!"')).toBeVisible()
      await expect(competitiveCard.locator('text="Profitable, strategy docs, enterprise"')).toBeVisible()
      
      // Our advantage
      await expect(competitiveCard.locator('text="Our Advantage: Strategic AI + execution"')).toBeVisible()
    })
  })

  test('Header and Greeting Content', async ({ page }) => {
    await test.step('Validate main heading', async () => {
      const mainHeading = page.locator('h1').first()
      await expect(mainHeading).toContainText('Command Center')
      
      // Should be centered
      const headingStyle = await mainHeading.evaluate(el => window.getComputedStyle(el).textAlign)
      expect(headingStyle).toBe('center')
    })

    await test.step('Validate greeting section', async () => {
      // Main greeting
      await expect(page.locator('text="Good morning! Let\'s tackle today\'s strategic priorities."')).toBeVisible()
      
      // Time and progress indicator
      await expect(page.locator('text="04:10 AM"')).toBeVisible()
      await expect(page.locator('text="15 signups (30%)"')).toBeVisible()
      
      // AI briefing indicator
      await expect(page.locator('text="AI INTELLIGENCE BRIEFING - LIVE"')).toBeVisible()
      await expect(page.locator('text="Strategic AI Co-Pilot Ready"')).toBeVisible()
    })

    await test.step('Validate AI description text', async () => {
      const aiDescription = page.locator('text="Ask any strategic question. I\'ll suggest frameworks like ICE or RICE, then apply them with your company context to generate executable workflows."')
      await expect(aiDescription).toBeVisible()
    })
  })

  test('Chat Interface Content', async ({ page }) => {
    await test.step('Validate chat input placeholder', async () => {
      const chatInput = page.locator('input[type="text"]')
      await expect(chatInput).toHaveAttribute('placeholder', 'Ask me anything strategic... I\'ll suggest the best framework to use')
    })

    await test.step('Validate send button', async () => {
      const sendButton = page.locator('button:has-text("Send")')
      await expect(sendButton).toBeVisible()
      
      // Should have send icon
      const sendIcon = sendButton.locator('svg')
      await expect(sendIcon).toBeVisible()
    })
  })

  test('Section Headers and Typography', async ({ page }) => {
    await test.step('Validate section headers formatting', async () => {
      // All section headers should be uppercase and have consistent styling
      const sectionHeaders = page.locator('h3[class*="uppercase"]')
      const headerCount = await sectionHeaders.count()
      expect(headerCount).toBeGreaterThan(0)
      
      for (let i = 0; i < Math.min(headerCount, 5); i++) {
        const header = sectionHeaders.nth(i)
        const headerText = await header.textContent()
        
        // Should be uppercase
        expect(headerText).toBe(headerText?.toUpperCase())
        
        // Should have consistent styling
        const styles = await header.evaluate(el => ({
          fontSize: window.getComputedStyle(el).fontSize,
          fontWeight: window.getComputedStyle(el).fontWeight,
          letterSpacing: window.getComputedStyle(el).letterSpacing
        }))
        
        expect(styles.fontWeight).toBe('600') // font-semibold
      }
    })

    await test.step('Validate typography hierarchy', async () => {
      // Main heading should be largest
      const mainHeading = page.locator('h1').first()
      const mainSize = await mainHeading.evaluate(el => 
        parseFloat(window.getComputedStyle(el).fontSize)
      )
      
      // Section headers should be smaller than main heading
      const sectionHeader = page.locator('h2').first()
      const sectionSize = await sectionHeader.evaluate(el => 
        parseFloat(window.getComputedStyle(el).fontSize)
      )
      
      expect(mainSize).toBeGreaterThan(sectionSize)
    })
  })

  test('Dynamic Content and Time Display', async ({ page }) => {
    await test.step('Validate time display format', async () => {
      const timeDisplay = page.locator('text=/\\d{2}:\\d{2} AM|PM/')
      await expect(timeDisplay).toBeVisible()
      
      const timeText = await timeDisplay.textContent()
      expect(timeText).toMatch(/\d{2}:\d{2} (AM|PM)/)
    })

    await test.step('Validate progress indicators', async () => {
      // Should show current progress
      await expect(page.locator('text="Current Progress:"')).toBeVisible()
      
      // Should show specific numbers
      await expect(page.locator('text="15 signups"')).toBeVisible()
      await expect(page.locator('text="(30%)"')).toBeVisible()
    })

    await test.step('Validate AI processing indicators', async () => {
      // Should have animated dots or similar loading indicator
      const processingIndicator = page.locator('.ai-processing-indicator, [class*="loading"], [class*="pulse"]')
      const indicatorCount = await processingIndicator.count()
      expect(indicatorCount).toBeGreaterThan(0)
    })
  })

  test('Color-Coded Category Labels', async ({ page }) => {
    await test.step('Validate strategic category color coding', async () => {
      const categories = [
        { text: 'COMPETITIVE STRATEGY', color: 'blue' },
        { text: 'RESOURCE ALLOCATION', color: 'green' },
        { text: 'GROWTH STRATEGY', color: 'orange' },
        { text: 'MARKET STRATEGY', color: 'purple' }
      ]
      
      for (const category of categories) {
        const categoryElement = page.locator(`text="${category.text}"`)
        await expect(categoryElement).toBeVisible()
        
        // Check if element has expected color class
        const colorClass = await categoryElement.evaluate(el => el.className)
        expect(colorClass).toContain(category.color)
      }
    })
  })

  test('Content Consistency Across Sections', async ({ page }) => {
    await test.step('Validate consistent data references', async () => {
      // Team size should be consistent across sections
      const teamSizeElements = page.locator('text="3 people"')
      await expect(teamSizeElements).toHaveCount(1) // Should appear exactly once
      
      // Budget should be consistent
      const budgetElements = page.locator('text="$15,000", text="$15k"')
      const budgetCount = await budgetElements.count()
      expect(budgetCount).toBeGreaterThanOrEqual(1)
      
      // Beta signups should be consistent
      const signupElements = page.locator('text="15"')
      const signupCount = await signupElements.count()
      expect(signupCount).toBeGreaterThanOrEqual(2) // Should appear in multiple places
    })

    await test.step('Validate terminology consistency', async () => {
      // Should use consistent terms for strategic concepts
      await expect(page.locator('text="Strategic"')).toHaveCount({ gte: 3 }) // Multiple strategic references
      await expect(page.locator('text="strategic"')).toHaveCount({ gte: 2 }) // Case variations
      
      // Should use consistent company/competitor terminology
      await expect(page.locator('text="competitor", text="Competitor"')).toHaveCount({ gte: 1 })
    })
  })
})

test.describe('Dashboard Content Accessibility', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT)
    await page.goto(DASHBOARD_URL)
    await page.waitForLoadState('networkidle')
  })

  test('Text Readability and Contrast', async ({ page }) => {
    await test.step('Validate text contrast ratios', async () => {
      // Sample key text elements for contrast checking
      const textElements = [
        page.locator('h1').first(),
        page.locator('h2').first(), 
        page.locator('h3').first(),
        page.locator('p').first()
      ]
      
      for (const element of textElements) {
        if (await element.isVisible()) {
          const styles = await element.evaluate(el => ({
            color: window.getComputedStyle(el).color,
            backgroundColor: window.getComputedStyle(el).backgroundColor
          }))
          
          console.log('Text element styles:', styles)
          
          // Basic validation that text has a defined color
          expect(styles.color).toBeTruthy()
          expect(styles.color).not.toBe('rgba(0, 0, 0, 0)')
        }
      }
    })

    await test.step('Validate font sizes for readability', async () => {
      // Main heading should be large enough
      const mainHeading = page.locator('h1').first()
      const headingSize = await mainHeading.evaluate(el => 
        parseFloat(window.getComputedStyle(el).fontSize)
      )
      expect(headingSize).toBeGreaterThanOrEqual(24) // At least 24px
      
      // Body text should be readable
      const bodyText = page.locator('p').first()
      const bodySize = await bodyText.evaluate(el => 
        parseFloat(window.getComputedStyle(el).fontSize)
      )
      expect(bodySize).toBeGreaterThanOrEqual(14) // At least 14px
    })
  })

  test('Screen Reader Content Structure', async ({ page }) => {
    await test.step('Validate heading hierarchy', async () => {
      // Should have proper heading hierarchy (h1 > h2 > h3)
      const h1Count = await page.locator('h1').count()
      const h2Count = await page.locator('h2').count()
      const h3Count = await page.locator('h3').count()
      
      expect(h1Count).toBeGreaterThanOrEqual(1) // At least one main heading
      expect(h3Count).toBeGreaterThan(0) // Should have section headings
      
      console.log(`Heading structure: h1=${h1Count}, h2=${h2Count}, h3=${h3Count}`)
    })

    await test.step('Validate semantic content structure', async () => {
      // Should use semantic HTML elements appropriately
      const nav = page.locator('nav')
      const navCount = await nav.count()
      expect(navCount).toBeGreaterThanOrEqual(1) // Should have navigation
      
      // Should have proper button elements
      const buttons = page.locator('button')
      const buttonCount = await buttons.count()
      expect(buttonCount).toBeGreaterThan(0) // Should have interactive buttons
      
      // Input should have proper labeling
      const inputs = page.locator('input')
      for (let i = 0; i < await inputs.count(); i++) {
        const input = inputs.nth(i)
        const placeholder = await input.getAttribute('placeholder')
        const ariaLabel = await input.getAttribute('aria-label')
        
        // Should have either placeholder or aria-label for accessibility
        expect(placeholder || ariaLabel).toBeTruthy()
      }
    })
  })
})