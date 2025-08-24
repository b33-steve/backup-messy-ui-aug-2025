/**
 * Visual Design Validation Tests - PM33 Premium Dashboard
 * Tests that the rendered website matches the intended premium design
 * 
 * This comprehensive test suite validates:
 * - Visual consistency with premium mockups
 * - Glass morphism implementation and rendering
 * - Component layout and spacing
 * - Typography and color implementation
 * - Interactive element behavior
 * - Cross-viewport responsive design
 */

import { test, expect } from '@playwright/test';

test.describe('Visual Design Validation - Premium Dashboard', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard and wait for full load
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Allow React hydration and CSS loading
  });

  test('Dashboard loads with all expected visual components', async ({ page }) => {
    // Take full page screenshot for baseline comparison
    await expect(page).toHaveScreenshot('dashboard-full-page-baseline.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Verify main visual sections are present
    await expect(page.locator('h1:has-text("PMO Command Center")')).toBeVisible();
    await expect(page.locator('text=AI TEAMS ACTIVE')).toBeVisible();
    await expect(page.locator('text=Strategic Intelligence')).toBeVisible();
  });

  test('Glass morphism cards render with correct visual effects', async ({ page }) => {
    // Wait for glass cards to be visible
    await page.waitForSelector('.pm33-glass-card', { timeout: 10000 });
    
    const glassCards = page.locator('.pm33-glass-card');
    const cardCount = await glassCards.count();
    
    expect(cardCount).toBeGreaterThan(3); // Should have multiple glass cards
    
    // Take screenshot of first few cards for visual validation
    const firstCard = glassCards.first();
    await expect(firstCard).toHaveScreenshot('glass-morphism-card.png');
    
    // Test hover states
    await firstCard.hover();
    await page.waitForTimeout(500); // Allow hover animation
    await expect(firstCard).toHaveScreenshot('glass-morphism-card-hover.png');
  });

  test('AI Team Status indicators display correctly', async ({ page }) => {
    // Check for 4 AI team status cards
    const aiTeamCards = page.locator('text=Strategic Intelligence').or(
      page.locator('text=Workflow Execution')
    ).or(
      page.locator('text=Data Intelligence')
    ).or(
      page.locator('text=Communication')
    );
    
    expect(await aiTeamCards.count()).toBeGreaterThan(3);
    
    // Screenshot AI teams section
    const aiSection = page.locator('[data-testid="ai-teams-section"]').or(
      page.locator('text=Strategic Intelligence').first().locator('..')
    );
    await expect(aiSection).toHaveScreenshot('ai-teams-status-display.png');
  });

  test('Premium chat interface renders with intended design', async ({ page }) => {
    const chatSection = page.locator('text=Strategic Intelligence Chat').or(
      page.locator('[data-testid="chat-interface"]')
    );
    
    if (await chatSection.count() > 0) {
      await expect(chatSection).toHaveScreenshot('premium-chat-interface.png');
      
      // Test chat input field
      const chatInput = page.locator('input[placeholder*="strategic"]').or(
        page.locator('textarea[placeholder*="strategic"]')
      );
      
      if (await chatInput.count() > 0) {
        await chatInput.focus();
        await expect(chatInput).toHaveScreenshot('chat-input-focused.png');
      }
    }
  });

  test('Strategic scenario cards have premium visual styling', async ({ page }) => {
    const scenarioCards = page.locator('text=Competitive Strategy').or(
      page.locator('text=Resource Allocation')
    ).or(
      page.locator('text=Growth Strategy')
    ).or(
      page.locator('text=Market Strategy')
    );
    
    if (await scenarioCards.count() > 0) {
      const firstScenario = scenarioCards.first();
      await expect(firstScenario.locator('..')).toHaveScreenshot('strategic-scenario-card.png');
      
      // Test hover interaction
      await firstScenario.hover();
      await page.waitForTimeout(300);
      await expect(firstScenario.locator('..')).toHaveScreenshot('strategic-scenario-card-hover.png');
    }
  });

  test('Typography hierarchy and contrast meet premium standards', async ({ page }) => {
    // Test main heading
    const mainHeading = page.locator('h1:has-text("PMO Command Center")');
    await expect(mainHeading).toHaveScreenshot('main-heading-typography.png');
    
    // Test gradient text effects
    const gradientText = page.locator('.pm33-text-gradient').or(
      page.locator('[class*="gradient"]')
    );
    
    if (await gradientText.count() > 0) {
      await expect(gradientText.first()).toHaveScreenshot('gradient-typography.png');
    }
    
    // Check text contrast by taking screenshots of different text elements
    const textElements = page.locator('p, span, div').filter({
      hasText: /Strategic|Intelligence|PMO|Processing/
    });
    
    if (await textElements.count() > 0) {
      await expect(textElements.first()).toHaveScreenshot('text-contrast-sample.png');
    }
  });

  test('Layout spacing and component alignment', async ({ page }) => {
    // Take screenshot of main layout grid
    const mainContent = page.locator('main').or(
      page.locator('[class*="grid"]').first()
    );
    
    await expect(mainContent).toHaveScreenshot('layout-spacing-alignment.png');
    
    // Test card grid alignment
    const cardGrid = page.locator('.grid').or(
      page.locator('[class*="grid-cols"]')
    );
    
    if (await cardGrid.count() > 0) {
      await expect(cardGrid.first()).toHaveScreenshot('card-grid-alignment.png');
    }
  });

  test('Progress indicators and metrics display correctly', async ({ page }) => {
    // Look for progress bars or metric displays
    const progressElements = page.locator('[role="progressbar"]').or(
      page.locator('text=30%')
    ).or(
      page.locator('text=Beta Signups')
    );
    
    if (await progressElements.count() > 0) {
      await expect(progressElements.first().locator('..')).toHaveScreenshot('progress-metrics-display.png');
    }
    
    // Test key metrics section
    const metricsSection = page.locator('text=Key Metrics').or(
      page.locator('text=PMO Transformation')
    );
    
    if (await metricsSection.count() > 0) {
      await expect(metricsSection.first().locator('..')).toHaveScreenshot('metrics-section.png');
    }
  });

  test('Responsive design - Mobile viewport (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000); // Allow responsive layout
    
    await expect(page).toHaveScreenshot('dashboard-mobile-375px.png', {
      fullPage: true
    });
  });

  test('Responsive design - Tablet viewport (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('dashboard-tablet-768px.png', {
      fullPage: true
    });
  });

  test('Responsive design - Desktop viewport (1200px)', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('dashboard-desktop-1200px.png', {
      fullPage: true
    });
  });

  test('Interactive elements visual feedback', async ({ page }) => {
    // Test button hover states
    const buttons = page.locator('button').filter({
      hasText: /Strategic|Workflow|Analytics|OKR/
    });
    
    if (await buttons.count() > 0) {
      const firstButton = buttons.first();
      await expect(firstButton).toHaveScreenshot('button-default-state.png');
      
      await firstButton.hover();
      await page.waitForTimeout(300);
      await expect(firstButton).toHaveScreenshot('button-hover-state.png');
    }
    
    // Test input field interactions
    const inputs = page.locator('input, textarea');
    if (await inputs.count() > 0) {
      const firstInput = inputs.first();
      await expect(firstInput).toHaveScreenshot('input-default-state.png');
      
      await firstInput.focus();
      await expect(firstInput).toHaveScreenshot('input-focused-state.png');
    }
  });

  test('Color scheme and theme consistency', async ({ page }) => {
    // Test light theme (if theme toggle exists)
    const lightThemeButton = page.locator('button:has-text("Light")');
    if (await lightThemeButton.count() > 0) {
      await lightThemeButton.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('dashboard-light-theme.png', {
        fullPage: true
      });
    }
    
    // Test dark theme
    const darkThemeButton = page.locator('button:has-text("Dark")');
    if (await darkThemeButton.count() > 0) {
      await darkThemeButton.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('dashboard-dark-theme.png', {
        fullPage: true
      });
    }
  });

  test('Animation and transition quality', async ({ page }) => {
    // Test page load animations
    await page.reload();
    await page.waitForTimeout(100); // Capture mid-animation
    await expect(page).toHaveScreenshot('dashboard-loading-animation.png');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Full animation completion
    await expect(page).toHaveScreenshot('dashboard-fully-loaded.png');
  });

  test('Visual comparison with premium design standards', async ({ page }) => {
    // This test validates the overall visual quality meets premium standards
    
    // Check for visual elements that indicate premium quality
    const premiumIndicators = {
      glassCards: await page.locator('.pm33-glass-card').count(),
      gradientText: await page.locator('[class*="gradient"]').count(),
      animations: await page.locator('[class*="animate"]').count(),
      shadows: await page.locator('[class*="shadow"]').count()
    };
    
    // Expect multiple premium visual elements
    expect(premiumIndicators.glassCards).toBeGreaterThan(2);
    
    // Take final comprehensive screenshot for design review
    await expect(page).toHaveScreenshot('premium-design-validation-complete.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('Error state and fallback handling', async ({ page }) => {
    // Test how the dashboard handles missing or broken elements
    
    // Intercept potential API calls and simulate failures
    await page.route('**/api/**', route => route.abort('failed'));
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Screenshot showing how dashboard handles errors gracefully
    await expect(page).toHaveScreenshot('dashboard-error-fallback.png', {
      fullPage: true
    });
  });

});

test.describe('Component-Level Visual Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
  });

  test('Individual component visual isolation tests', async ({ page }) => {
    // Test each major component in isolation
    
    // AI Status Banner
    const statusBanner = page.locator('text=AI TEAMS ACTIVE').locator('..');
    if (await statusBanner.count() > 0) {
      await expect(statusBanner).toHaveScreenshot('component-ai-status-banner.png');
    }
    
    // Strategic Tools Navigation
    const toolsNav = page.locator('text=Strategic Tools').locator('..');
    if (await toolsNav.count() > 0) {
      await expect(toolsNav).toHaveScreenshot('component-strategic-tools-nav.png');
    }
    
    // Company Context Panel
    const contextPanel = page.locator('text=Company Context').locator('..');
    if (await contextPanel.count() > 0) {
      await expect(contextPanel).toHaveScreenshot('component-company-context.png');
    }
    
    // Competitive Landscape
    const competitiveSection = page.locator('text=Competitive Landscape').locator('..');
    if (await competitiveSection.count() > 0) {
      await expect(competitiveSection).toHaveScreenshot('component-competitive-landscape.png');
    }
  });

});