/**
 * PM33 Visual Regression Tests
 * 
 * ENFORCES VISUAL CONSISTENCY
 * Screenshots every page and compares against approved designs
 * Fails if >5% visual difference detected
 * 
 * MUST run before every commit
 */

import { test, expect, Page } from '@playwright/test'
import { readFileSync } from 'fs'
import path from 'path'

// Test configuration
const VISUAL_THRESHOLD = 0.05 // 5% maximum difference allowed
const VIEWPORTS = [
  { name: 'desktop', width: 1400, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 }
]

const PAGES_TO_TEST = [
  { path: '/dashboard', name: 'dashboard' },
  { path: '/dashboard-v1', name: 'dashboard-v1' },
  { path: '/strategic-intelligence', name: 'strategic-intelligence' },
  { path: '/command-center', name: 'command-center' },
  { path: '/chat', name: 'chat' },
  { path: '/projects', name: 'projects' },
  { path: '/settings', name: 'settings' }
]

test.describe('PM33 Visual Regression Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Ensure consistent environment for screenshots
    await page.addInitScript(() => {
      // Disable animations for consistent screenshots
      document.documentElement.style.setProperty('--animation-duration', '0s')
      document.documentElement.style.setProperty('--transition-duration', '0s')
    })
  })

  // Test each page across all viewports
  for (const pageConfig of PAGES_TO_TEST) {
    for (const viewport of VIEWPORTS) {
      test(`${pageConfig.name} - ${viewport.name} visual consistency`, async ({ page }) => {
        await page.setViewportSize({ 
          width: viewport.width, 
          height: viewport.height 
        })
        
        await page.goto(pageConfig.path)
        await page.waitForLoadState('networkidle')
        
        // Wait for glass morphism effects to settle
        await page.waitForTimeout(1000)
        
        // Take screenshot and compare
        await expect(page).toHaveScreenshot(
          `${pageConfig.name}-${viewport.name}.png`,
          {
            threshold: VISUAL_THRESHOLD,
            animations: 'disabled',
            maxDiffPixels: 1000
          }
        )
      })
    }
  }

  test('PM33 Component Visual Consistency', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Test glass morphism cards appear consistently
    const glassCards = await page.locator('.pm33-glass-card').count()
    expect(glassCards).toBeGreaterThan(0)
    
    // Screenshot each card type
    const cards = page.locator('.pm33-glass-card')
    const cardCount = await cards.count()
    
    for (let i = 0; i < Math.min(cardCount, 5); i++) {
      const card = cards.nth(i)
      await expect(card).toHaveScreenshot(`glass-card-${i + 1}.png`, {
        threshold: VISUAL_THRESHOLD
      })
    }
  })

  test('PM33 Layout Grid Consistency', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Test three-column layout
    const mainGrid = page.locator('[data-testid="pm33-layout-main"]')
    await expect(mainGrid).toBeVisible()
    
    // Screenshot the entire grid layout
    await expect(mainGrid).toHaveScreenshot('three-column-grid.png', {
      threshold: VISUAL_THRESHOLD
    })
  })

  test('PM33 Theme Consistency Across Pages', async ({ page }) => {
    for (const pageConfig of PAGES_TO_TEST) {
      await page.goto(pageConfig.path)
      await page.waitForLoadState('networkidle')
      
      // Check that PM33 theme classes are applied
      const themeElements = await page.locator('.pm33-glass-card, .pm33-text-gradient, [class*="pm33-"]').count()
      
      if (themeElements === 0) {
        throw new Error(`Page ${pageConfig.path} missing PM33 theme classes`)
      }
      
      // Screenshot theme elements
      const themeElement = page.locator('.pm33-glass-card').first()
      if (await themeElement.count() > 0) {
        await expect(themeElement).toHaveScreenshot(`theme-${pageConfig.name}.png`, {
          threshold: VISUAL_THRESHOLD
        })
      }
    }
  })

  test('PM33 Interactive States Visual Test', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Test hover states on interactive elements
    const interactiveCards = page.locator('[data-testid="scenario-card"]')
    const firstCard = interactiveCards.first()
    
    if (await firstCard.count() > 0) {
      // Normal state
      await expect(firstCard).toHaveScreenshot('card-normal-state.png', {
        threshold: VISUAL_THRESHOLD
      })
      
      // Hover state
      await firstCard.hover()
      await page.waitForTimeout(300)
      await expect(firstCard).toHaveScreenshot('card-hover-state.png', {
        threshold: VISUAL_THRESHOLD
      })
    }
  })

  test('PM33 Glass Morphism Effect Visual Test', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Test backdrop blur effects are visible
    const glassCard = page.locator('.pm33-glass-card').first()
    
    if (await glassCard.count() > 0) {
      // Check computed styles for glass morphism
      const backdropFilter = await glassCard.evaluate(el => 
        window.getComputedStyle(el).backdropFilter
      )
      
      expect(backdropFilter).toContain('blur')
      
      // Visual test of glass effect
      await expect(glassCard).toHaveScreenshot('glass-morphism-effect.png', {
        threshold: VISUAL_THRESHOLD
      })
    }
  })

  test('PM33 Typography Visual Consistency', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Test heading hierarchy
    const heading = page.locator('h1').first()
    if (await heading.count() > 0) {
      await expect(heading).toHaveScreenshot('typography-h1.png', {
        threshold: VISUAL_THRESHOLD
      })
    }
    
    // Test gradient text
    const gradientText = page.locator('.pm33-text-gradient').first()
    if (await gradientText.count() > 0) {
      await expect(gradientText).toHaveScreenshot('gradient-text.png', {
        threshold: VISUAL_THRESHOLD
      })
    }
  })
})

test.describe('PM33 Cross-Browser Visual Consistency', () => {
  
  test('Dashboard cross-browser visual consistency', async ({ page, browserName }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Take screenshot with browser name in filename
    await expect(page).toHaveScreenshot(`dashboard-${browserName}.png`, {
      threshold: VISUAL_THRESHOLD * 2, // Allow more variance across browsers
      maxDiffPixels: 2000
    })
  })
})

test.describe('PM33 Accessibility Visual Tests', () => {
  
  test('High contrast mode visual consistency', async ({ page }) => {
    // Simulate high contrast preferences
    await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' })
    
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('dashboard-high-contrast.png', {
      threshold: VISUAL_THRESHOLD
    })
  })
  
  test('Focus states visual consistency', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Tab through focusable elements and screenshot
    const focusableElements = page.locator('button, input, [tabindex="0"]')
    const count = await focusableElements.count()
    
    if (count > 0) {
      await focusableElements.first().focus()
      await expect(focusableElements.first()).toHaveScreenshot('focus-state.png', {
        threshold: VISUAL_THRESHOLD
      })
    }
  })
})

// Utility function to generate visual test report
test.afterAll(async () => {
  console.log('\n📸 Visual Regression Tests Complete')
  console.log('Screenshots saved to test-results/')
  console.log('Compare against approved designs in visual-baselines/')
  console.log('Any differences >5% will cause test failure\n')
})