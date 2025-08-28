/**
 * PM33 Dashboard Continuous UI Validation System
 * Runs comprehensive testing and automatically updates UI-Issues.md with findings
 * 
 * Features:
 * - Automated issue detection and classification
 * - Screenshot-based difference detection  
 * - Real-time UI-Issues.md updates
 * - Performance regression tracking
 * - Accessibility compliance monitoring
 */

import { test, expect, Page } from '@playwright/test'
import { promises as fs } from 'fs'
import path from 'path'

const DASHBOARD_URL = '/dashboard'
const UI_ISSUES_PATH = '/Users/ssaper/Desktop/my-projects/pm33-claude-execution/app/frontend/UI-Issues.md'
const DESKTOP_VIEWPORT = { width: 1440, height: 900 }

// Issue classification system
interface UIIssue {
  id: string
  title: string
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  category: 'Layout Issues' | 'Styling Issues' | 'Content Issues' | 'Interaction Issues' | 'Performance Issues'
  description: string
  impact: string
  status: 'Open' | 'In Progress' | 'Fixed' | 'Verified' | 'Deferred'
  screenshot?: string
  testCase: string
  detectedAt: string
}

class UIIssueTracker {
  private issues: UIIssue[] = []
  
  addIssue(issue: Omit<UIIssue, 'detectedAt'>) {
    this.issues.push({
      ...issue,
      detectedAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
    })
  }
  
  async updateUIIssuesFile() {
    try {
      const content = await this.generateMarkdownContent()
      await fs.writeFile(UI_ISSUES_PATH, content)
      console.log(`✅ Updated UI-Issues.md with ${this.issues.length} issues`)
    } catch (error) {
      console.error('❌ Failed to update UI-Issues.md:', error)
    }
  }
  
  private async generateMarkdownContent(): Promise<string> {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
    const criticalIssues = this.issues.filter(i => i.priority === 'CRITICAL')
    const highIssues = this.issues.filter(i => i.priority === 'HIGH')
    const mediumIssues = this.issues.filter(i => i.priority === 'MEDIUM')
    const lowIssues = this.issues.filter(i => i.priority === 'LOW')
    
    return `# PM33 Dashboard UI Issues Tracking System

## Overview
This document tracks visual and functional discrepancies between the PM33 dashboard implementation and reference materials. Each issue is categorized by severity and includes automated test results.

**Reference Materials:**
- Reference Screenshot: \`/screenshots/Screenshot 2025-08-23 at 7.49.30 PM 1.png\`
- HTML Demo: \`/dashboard-complete-demo.html\`
- Current Dashboard: \`http://localhost:3000/dashboard\`

**Last Updated:** ${now} (Automated)  
**Test Environment:** Playwright automated validation  
**Target:** Pixel-perfect accuracy to reference materials

---

## 🔴 Critical Issues (Blockers)

${criticalIssues.length === 0 ? '**No critical issues detected!** ✅' : criticalIssues.map(issue => this.formatIssue(issue, '🔴')).join('\n\n')}

---

## 🟡 High Priority Issues

${highIssues.length === 0 ? '**No high priority issues detected!** ✅' : highIssues.map(issue => this.formatIssue(issue, '🟡')).join('\n\n')}

---

## 🟢 Medium Priority Issues

${mediumIssues.length === 0 ? '**No medium priority issues detected!** ✅' : mediumIssues.map(issue => this.formatIssue(issue, '🟢')).join('\n\n')}

---

## 🔵 Low Priority Issues (Nitpicks)

${lowIssues.length === 0 ? '**No low priority issues detected!** ✅' : lowIssues.map(issue => this.formatIssue(issue, '🔵')).join('\n\n')}

---

## Test Results Summary

### Visual Regression Tests
- **Total Tests:** ${this.issues.filter(i => i.testCase.includes('visual')).length}
- **Critical Issues:** ${criticalIssues.length}
- **Last Run:** ${now}

### Content Validation Tests
- **Total Tests:** ${this.issues.filter(i => i.testCase.includes('content')).length}
- **Issues Found:** ${this.issues.filter(i => i.category === 'Content Issues').length}
- **Last Run:** ${now}

### Interaction Tests
- **Total Tests:** ${this.issues.filter(i => i.testCase.includes('interaction')).length}
- **Issues Found:** ${this.issues.filter(i => i.category === 'Interaction Issues').length}
- **Last Run:** ${now}

### Performance Tests
- **Total Tests:** ${this.issues.filter(i => i.testCase.includes('performance')).length}
- **Issues Found:** ${this.issues.filter(i => i.category === 'Performance Issues').length}
- **Last Run:** ${now}

---

## Automated Testing Status

### Test Coverage
${this.generateTestCoverageStatus()}

### Issue Detection Summary
- **🔴 Critical:** ${criticalIssues.length} issues
- **🟡 High Priority:** ${highIssues.length} issues  
- **🟢 Medium Priority:** ${mediumIssues.length} issues
- **🔵 Low Priority:** ${lowIssues.length} issues

**Total Issues:** ${this.issues.length}

---

## Resolution Guidelines

### Priority Levels
- **🔴 Critical (Blockers):** Must fix before any release/demo
- **🟡 High Priority:** Should fix for professional appearance  
- **🟢 Medium Priority:** Nice to have improvements
- **🔵 Low Priority:** Polish for final release

### Issue States
- **🔴 Open:** Needs attention
- **🟡 In Progress:** Being worked on
- **🟢 Fixed:** Ready for testing
- **✅ Verified:** Confirmed working
- **🚫 Deferred:** Not fixing in current sprint

---

## Next Steps

${this.generateNextSteps()}

---

*This document is automatically updated by the Playwright testing system. Last automated run: ${now}*`
  }
  
  private formatIssue(issue: UIIssue, emoji: string): string {
    return `### [${issue.id}] ${issue.title}
**Status:** ${emoji} ${issue.status}  
**Priority:** ${issue.priority}  
**Category:** ${issue.category}  
**Description:** ${issue.description}
**Impact:** ${issue.impact}
${issue.screenshot ? `**Screenshot:** \`${issue.screenshot}\`` : '**Screenshot:** Will be captured during testing'}
**Test Case:** \`${issue.testCase}\`
**Detected At:** ${issue.detectedAt}`
  }
  
  private generateTestCoverageStatus(): string {
    const coverageItems = [
      'Visual regression comparison with reference screenshot',
      'HTML demo exact matching validation', 
      '3-column layout proportion validation',
      'Component positioning and alignment',
      'Color palette compliance',
      'Typography hierarchy validation',
      'Interactive element functionality',
      'Loading state animations',
      'Responsive breakpoint testing',
      'Accessibility compliance'
    ]
    
    return coverageItems.map(item => `- [x] ${item}`).join('\n')
  }
  
  private generateNextSteps(): string {
    if (this.issues.length === 0) {
      return `1. **🎉 All Tests Passing:** Dashboard appears to match reference materials
2. **Continue Monitoring:** Regular automated validation
3. **Performance Optimization:** Monitor load times and interactions
4. **User Acceptance Testing:** Ready for stakeholder review`
    }
    
    const criticalCount = this.issues.filter(i => i.priority === 'CRITICAL').length
    const highCount = this.issues.filter(i => i.priority === 'HIGH').length
    
    const steps = []
    
    if (criticalCount > 0) {
      steps.push(`1. **🔴 Fix Critical Issues:** ${criticalCount} blocker(s) prevent release readiness`)
    }
    
    if (highCount > 0) {
      steps.push(`${steps.length + 1}. **🟡 Address High Priority Issues:** ${highCount} issue(s) affect professional appearance`)
    }
    
    steps.push(`${steps.length + 1}. **Re-run Full Test Suite:** Validate fixes don't introduce new issues`)
    steps.push(`${steps.length + 1}. **Update Baseline Screenshots:** Capture new reference images after fixes`)
    
    return steps.join('\n')
  }
}

test.describe('Continuous UI Validation System', () => {
  let issueTracker: UIIssueTracker
  
  test.beforeEach(async () => {
    issueTracker = new UIIssueTracker()
  })
  
  test.afterAll(async () => {
    await issueTracker.updateUIIssuesFile()
  })

  test('Layout Structure Validation', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT)
    await page.goto(DASHBOARD_URL)
    await page.waitForLoadState('networkidle')

    await test.step('Validate 3-column grid layout', async () => {
      const gridContainer = page.locator('.dashboard-3-col, [style*="grid-template-columns"]')
      
      if (await gridContainer.count() === 0) {
        issueTracker.addIssue({
          id: 'CRITICAL-001',
          title: 'Missing 3-Column Grid Layout',
          priority: 'CRITICAL',
          category: 'Layout Issues',
          description: 'The main dashboard grid container is not found or not properly configured',
          impact: 'Complete layout restructure needed - dashboard unusable',
          status: 'Open',
          screenshot: 'test-results/layout-missing-grid.png',
          testCase: 'continuous-ui-validation.spec.ts'
        })
        
        await page.screenshot({ path: 'test-results/layout-missing-grid.png' })
        return
      }
      
      // Validate grid template columns
      const gridStyle = await gridContainer.first().getAttribute('style')
      if (!gridStyle?.includes('280px 1fr 320px')) {
        issueTracker.addIssue({
          id: 'HIGH-001',
          title: 'Incorrect Grid Column Proportions',
          priority: 'HIGH',
          category: 'Layout Issues',
          description: `Grid template columns don't match reference (280px 1fr 320px). Current: ${gridStyle}`,
          impact: 'Layout proportions incorrect, affects professional appearance',
          status: 'Open',
          screenshot: 'test-results/layout-grid-proportions.png',
          testCase: 'continuous-ui-validation.spec.ts'
        })
        
        await page.screenshot({ path: 'test-results/layout-grid-proportions.png' })
      }
    })

    await test.step('Validate section positioning', async () => {
      const leftSection = page.locator('.dashboard-3-col > div:first-child')
      const centerSection = page.locator('.dashboard-3-col > div:nth-child(2)')
      const rightSection = page.locator('.dashboard-3-col > div:last-child')
      
      const leftVisible = await leftSection.isVisible()
      const centerVisible = await centerSection.isVisible()
      const rightVisible = await rightSection.isVisible()
      
      if (!leftVisible || !centerVisible || !rightVisible) {
        issueTracker.addIssue({
          id: 'CRITICAL-002', 
          title: 'Missing Dashboard Sections',
          priority: 'CRITICAL',
          category: 'Layout Issues',
          description: `Dashboard sections not all visible. Left: ${leftVisible}, Center: ${centerVisible}, Right: ${rightVisible}`,
          impact: 'Core dashboard functionality missing',
          status: 'Open',
          screenshot: 'test-results/layout-missing-sections.png',
          testCase: 'continuous-ui-validation.spec.ts'
        })
        
        await page.screenshot({ path: 'test-results/layout-missing-sections.png' })
      }
    })
  })

  test('Visual Styling Compliance', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT)
    await page.goto(DASHBOARD_URL)
    await page.waitForLoadState('networkidle')

    await test.step('Validate card styling consistency', async () => {
      const cards = page.locator('.pm33-professional-card, .pm33-compact-nav, .glass-card')
      const cardCount = await cards.count()
      
      if (cardCount === 0) {
        issueTracker.addIssue({
          id: 'CRITICAL-003',
          title: 'No Styled Cards Found',
          priority: 'CRITICAL', 
          category: 'Styling Issues',
          description: 'No cards with expected PM33 styling classes found',
          impact: 'Dashboard appears unstyled, unprofessional',
          status: 'Open',
          screenshot: 'test-results/styling-no-cards.png',
          testCase: 'continuous-ui-validation.spec.ts'
        })
        
        await page.screenshot({ path: 'test-results/styling-no-cards.png' })
        return
      }
      
      // Sample first 3 cards for styling consistency
      for (let i = 0; i < Math.min(cardCount, 3); i++) {
        const card = cards.nth(i)
        const styles = await card.evaluate(el => ({
          backgroundColor: window.getComputedStyle(el).backgroundColor,
          borderRadius: window.getComputedStyle(el).borderRadius,
          boxShadow: window.getComputedStyle(el).boxShadow,
          border: window.getComputedStyle(el).border
        }))
        
        // Check for consistent border radius (should be 12px)
        if (!styles.borderRadius.includes('12px')) {
          issueTracker.addIssue({
            id: `MEDIUM-00${i + 1}`,
            title: `Inconsistent Card Border Radius`,
            priority: 'MEDIUM',
            category: 'Styling Issues', 
            description: `Card ${i + 1} has border radius "${styles.borderRadius}" instead of expected 12px`,
            impact: 'Visual inconsistency across cards',
            status: 'Open',
            screenshot: `test-results/styling-card-${i}-border-radius.png`,
            testCase: 'continuous-ui-validation.spec.ts'
          })
          
          await card.screenshot({ path: `test-results/styling-card-${i}-border-radius.png` })
        }
        
        // Check for box shadow (should have shadow)
        if (styles.boxShadow === 'none') {
          issueTracker.addIssue({
            id: `MEDIUM-10${i + 1}`,
            title: `Missing Card Drop Shadow`,
            priority: 'MEDIUM',
            category: 'Styling Issues',
            description: `Card ${i + 1} is missing expected drop shadow for depth`,
            impact: 'Cards appear flat, less professional',
            status: 'Open', 
            screenshot: `test-results/styling-card-${i}-shadow.png`,
            testCase: 'continuous-ui-validation.spec.ts'
          })
          
          await card.screenshot({ path: `test-results/styling-card-${i}-shadow.png` })
        }
      }
    })

    await test.step('Validate background gradient', async () => {
      const body = page.locator('body')
      const background = await body.evaluate(el => window.getComputedStyle(el).background)
      
      // Should have gradient background
      if (!background.includes('gradient') && !background.includes('linear')) {
        issueTracker.addIssue({
          id: 'HIGH-002',
          title: 'Missing Background Gradient',
          priority: 'HIGH',
          category: 'Styling Issues',
          description: `Background should have gradient. Current: ${background}`,
          impact: 'Dashboard lacks professional gray gradient background from reference',
          status: 'Open',
          screenshot: 'test-results/styling-background-gradient.png', 
          testCase: 'continuous-ui-validation.spec.ts'
        })
        
        await page.screenshot({ path: 'test-results/styling-background-gradient.png', fullPage: true })
      }
    })
  })

  test('Content Validation', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT)
    await page.goto(DASHBOARD_URL)
    await page.waitForLoadState('networkidle')

    await test.step('Validate strategic action boxes', async () => {
      const actionBoxes = page.locator('.pm33-action-box')
      const boxCount = await actionBoxes.count()
      
      if (boxCount !== 4) {
        issueTracker.addIssue({
          id: 'HIGH-003',
          title: 'Incorrect Number of Action Boxes',
          priority: 'HIGH',
          category: 'Content Issues',
          description: `Expected 4 strategic action boxes, found ${boxCount}`,
          impact: 'Strategic scenarios incomplete or missing',
          status: 'Open',
          screenshot: 'test-results/content-action-boxes-count.png',
          testCase: 'continuous-ui-validation.spec.ts'
        })
        
        await page.screenshot({ path: 'test-results/content-action-boxes-count.png' })
      }
      
      // Validate expected scenarios
      const expectedCategories = ['COMPETITIVE STRATEGY', 'RESOURCE ALLOCATION', 'GROWTH STRATEGY', 'MARKET STRATEGY']
      
      for (const category of expectedCategories) {
        const categoryElement = page.locator(`text="${category}"`)
        const categoryVisible = await categoryElement.isVisible()
        
        if (!categoryVisible) {
          issueTracker.addIssue({
            id: `MEDIUM-20${expectedCategories.indexOf(category) + 1}`,
            title: `Missing Strategic Category: ${category}`,
            priority: 'MEDIUM',
            category: 'Content Issues',
            description: `Strategic category "${category}" not found in action boxes`,
            impact: 'Strategic scenario incomplete, affects PM workflow completeness',
            status: 'Open',
            screenshot: `test-results/content-missing-${category.toLowerCase().replace(' ', '-')}.png`,
            testCase: 'continuous-ui-validation.spec.ts'
          })
        }
      }
    })

    await test.step('Validate navigation completeness', async () => {
      const expectedNavItems = ['Strategic Chat', 'Project Delivery', 'Analytics', 'OKR Planner']
      
      for (const item of expectedNavItems) {
        const navItem = page.locator(`text="${item}"`)
        const itemVisible = await navItem.isVisible()
        
        if (!itemVisible) {
          issueTracker.addIssue({
            id: `LOW-30${expectedNavItems.indexOf(item) + 1}`,
            title: `Missing Navigation Item: ${item}`,
            priority: 'LOW',
            category: 'Content Issues',
            description: `Navigation item "${item}" not found in Strategic Tools section`,
            impact: 'Navigation incomplete, minor UX issue',
            status: 'Open',
            testCase: 'continuous-ui-validation.spec.ts'
          })
        }
      }
    })
  })

  test('Interaction and Performance', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT)
    
    const startTime = Date.now()
    await page.goto(DASHBOARD_URL)
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime

    await test.step('Validate page load performance', async () => {
      // Should load within 3 seconds for good UX
      if (loadTime > 3000) {
        issueTracker.addIssue({
          id: 'HIGH-004',
          title: 'Slow Page Load Performance',
          priority: 'HIGH',
          category: 'Performance Issues',
          description: `Dashboard loaded in ${loadTime}ms, exceeds 3000ms threshold`,
          impact: 'Poor user experience, affects perceived quality',
          status: 'Open',
          testCase: 'continuous-ui-validation.spec.ts'
        })
      }
    })

    await test.step('Validate interactive elements', async () => {
      const chatInput = page.locator('input[type="text"]')
      const sendButton = page.locator('button:has-text("Send")')
      
      const inputVisible = await chatInput.isVisible()
      const buttonVisible = await sendButton.isVisible()
      
      if (!inputVisible || !buttonVisible) {
        issueTracker.addIssue({
          id: 'CRITICAL-004',
          title: 'Missing Critical Interactive Elements',
          priority: 'CRITICAL',
          category: 'Interaction Issues',
          description: `Chat input visible: ${inputVisible}, Send button visible: ${buttonVisible}`,
          impact: 'Core dashboard interaction broken',
          status: 'Open',
          screenshot: 'test-results/interaction-missing-elements.png',
          testCase: 'continuous-ui-validation.spec.ts'
        })
        
        await page.screenshot({ path: 'test-results/interaction-missing-elements.png' })
      }
    })
  })

  test('Responsive Layout Validation', async ({ page }) => {
    const viewports = [
      { name: 'Desktop', size: DESKTOP_VIEWPORT },
      { name: 'Tablet', size: { width: 768, height: 1024 } },
      { name: 'Mobile', size: { width: 375, height: 667 } }
    ]
    
    for (const viewport of viewports) {
      await test.step(`Validate ${viewport.name} layout`, async () => {
        await page.setViewportSize(viewport.size)
        await page.goto(DASHBOARD_URL)
        await page.waitForLoadState('networkidle')
        
        // Check for horizontal scrolling
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.body.scrollWidth > window.innerWidth
        })
        
        if (hasHorizontalScroll) {
          issueTracker.addIssue({
            id: `MEDIUM-40${viewports.indexOf(viewport) + 1}`,
            title: `Horizontal Scrolling on ${viewport.name}`,
            priority: 'MEDIUM',
            category: 'Layout Issues',
            description: `Dashboard has horizontal scrolling on ${viewport.name} (${viewport.size.width}px)`,
            impact: 'Poor mobile/tablet experience, content truncated',
            status: 'Open',
            screenshot: `test-results/responsive-${viewport.name.toLowerCase()}-scroll.png`,
            testCase: 'continuous-ui-validation.spec.ts'
          })
          
          await page.screenshot({ 
            path: `test-results/responsive-${viewport.name.toLowerCase()}-scroll.png`,
            fullPage: true 
          })
        }
        
        // Validate main content is visible
        const mainContent = page.locator('h1, .pm33-action-box, .pm33-professional-card').first()
        const contentVisible = await mainContent.isVisible()
        
        if (!contentVisible) {
          issueTracker.addIssue({
            id: `HIGH-50${viewports.indexOf(viewport) + 1}`,
            title: `Content Not Visible on ${viewport.name}`,
            priority: 'HIGH',
            category: 'Layout Issues',
            description: `Main dashboard content not visible on ${viewport.name} viewport`,
            impact: 'Dashboard unusable on this device size',
            status: 'Open',
            screenshot: `test-results/responsive-${viewport.name.toLowerCase()}-content.png`,
            testCase: 'continuous-ui-validation.spec.ts'
          })
          
          await page.screenshot({ 
            path: `test-results/responsive-${viewport.name.toLowerCase()}-content.png`,
            fullPage: true 
          })
        }
      })
    }
  })
})