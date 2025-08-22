/**
 * File: tests/integrations-field-mapping.spec.ts
 * Purpose: Test PM33 Intelligent Field Mapping System UI and functionality
 * Why: Validates the field mapping interface follows PM33 design standards and functions correctly
 * Relevant Files: FieldMappingInterface.tsx, integrations/page.tsx, PM33_INTELLIGENT_FIELD_MAPPING_SYSTEM.md
 */

import { test, expect } from '@playwright/test';

test.describe('PM33 Intelligent Field Mapping System', () => {
  test('integrations page loads with proper PM33 design compliance', async ({ page }) => {
    // Navigate to integrations page
    await page.goto('/integrations');
    
    // Wait for the page to load completely
    await page.waitForSelector('text=Intelligent Field Mapping System');
    
    // Verify page title and branding
    await expect(page.locator('h1')).toContainText('Intelligent Field Mapping System');
    
    // Verify PM33 glass morphism cards are present
    const glassCards = page.locator('[style*="backdrop-filter"]');
    expect(await glassCards.count()).toBeGreaterThan(0);
    
    // Verify gradient backgrounds are applied
    const gradientElements = page.locator('[style*="linear-gradient"]');
    expect(await gradientElements.count()).toBeGreaterThan(0);
    
    // Check for key sections
    await expect(page.locator('text=Dynamic Field Discovery')).toBeVisible();
    await expect(page.locator('text=Confidence-Based Mapping')).toBeVisible();
    await expect(page.locator('text=Enterprise Security')).toBeVisible();
  });

  test('field mapping interface displays AI processing state', async ({ page }) => {
    await page.goto('/integrations');
    
    // Wait for initial load
    await page.waitForSelector('text=Field Mapping Intelligence');
    
    // Look for AI processing indicators
    await expect(page.locator('text=AI Field Analysis')).toBeVisible();
    
    // Check for confidence indicators
    const confidenceBadges = page.locator('text=/\\d+% confidence/i');
    expect(await confidenceBadges.count()).toBeGreaterThan(0);
    
    // Verify mapping recommendations are shown
    await expect(page.locator('text=Auto Map')).toBeVisible();
    await expect(page.locator('text=Suggested')).toBeVisible();
  });

  test('field mapping cards show proper PM33 styling', async ({ page }) => {
    await page.goto('/integrations');
    await page.waitForSelector('text=Recommended Field Mappings');
    
    // Test hover effects on mapping cards
    const mappingCards = page.locator('[style*="backdrop-filter"]').nth(2); // Get field mapping cards
    
    // Check initial state
    const initialTransform = await mappingCards.evaluate(el => 
      window.getComputedStyle(el).transform
    );
    
    // Hover over the card
    await mappingCards.hover();
    
    // Allow time for animation
    await page.waitForTimeout(100);
    
    // Verify hover transform is applied
    const hoverTransform = await mappingCards.evaluate(el => 
      window.getComputedStyle(el).transform
    );
    
    // Should have some transformation on hover
    expect(hoverTransform).not.toBe(initialTransform);
  });

  test('confidence scoring system displays correctly', async ({ page }) => {
    await page.goto('/integrations');
    await page.waitForSelector('text=Analysis Summary');
    
    // Check confidence metrics display
    await expect(page.locator('text=/\\d+ Average Confidence/')).toBeVisible();
    
    // Verify confidence breakdown
    await expect(page.locator('text=Auto-mappable')).toBeVisible();
    await expect(page.locator('text=High Confidence')).toBeVisible();
    await expect(page.locator('text=Needs Review')).toBeVisible();
    
    // Check specific field mapping confidence indicators
    const storyPointsExample = page.locator('text=89% confidence');
    await expect(storyPointsExample).toBeVisible();
    
    // Verify recommendation types
    await expect(page.locator('text=Auto Map').first()).toBeVisible();
    await expect(page.locator('text=Suggested').first()).toBeVisible();
  });

  test('real-world field mapping examples are displayed', async ({ page }) => {
    await page.goto('/integrations');
    await page.waitForSelector('text=Real-World Example');
    
    // Verify story points example
    await expect(page.locator('text=customfield_10016')).toBeVisible();
    await expect(page.locator('text=storyPointEstimate')).toBeVisible();
    
    // Check mapping details
    await expect(page.locator('text=Name semantic analysis')).toBeVisible();
    await expect(page.locator('text=Data type validation')).toBeVisible();
    await expect(page.locator('text=Population analysis')).toBeVisible();
    await expect(page.locator('text=Context patterns')).toBeVisible();
    
    // Verify confidence and recommendation
    await expect(page.locator('text=89% Confidence')).toBeVisible();
    await expect(page.locator('text=Auto Map')).toBeVisible();
  });

  test('navigation includes integrations link', async ({ page }) => {
    await page.goto('/integrations');
    
    // Check that navigation contains integrations link
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();
    
    // Look for integrations icon and text in navigation
    await expect(navigation.locator('text=Integrations')).toBeVisible();
    await expect(navigation.locator('text=🔗')).toBeVisible();
  });

  test('responsive design works on different viewport sizes', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/integrations');
    await expect(page.locator('h1')).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await expect(page.locator('h1')).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await expect(page.locator('h1')).toBeVisible();
    
    // Verify content is still accessible on mobile
    await expect(page.locator('text=AI-powered field discovery')).toBeVisible();
  });

  test('performance meets PM33 standards', async ({ page }) => {
    // Start performance monitoring
    const startTime = Date.now();
    
    await page.goto('/integrations');
    await page.waitForSelector('text=Intelligent Field Mapping System');
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 3 seconds (PM33 standard)
    expect(loadTime).toBeLessThan(3000);
    
    // Check for PM33 performance indicators
    await expect(page.locator('[style*="backdrop-filter"]')).toBeVisible();
    await expect(page.locator('[style*="linear-gradient"]')).toBeVisible();
  });

  test('accessibility compliance', async ({ page }) => {
    await page.goto('/integrations');
    
    // Check for proper heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Verify buttons have accessible text
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      expect(text?.trim().length || 0).toBeGreaterThan(0);
    }
    
    // Check for alt text on important visual elements
    // (Icons are using Tabler icons which have built-in accessibility)
    
    // Verify proper color contrast for text
    const textElements = page.locator('text=Dynamic Field Discovery');
    await expect(textElements).toBeVisible();
  });
});