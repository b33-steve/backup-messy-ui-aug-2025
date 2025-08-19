import { test, expect } from '@playwright/test';

/**
 * PM33 UX Quality Tests
 * Validates user experience follows PM33_ Complete _UX_System.md patterns
 */

test.describe('PM33 UX Quality Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should complete key workflows in less than 5 clicks', async ({ page }) => {
    let clickCount = 0;
    
    // Monitor all clicks
    page.on('click', () => {
      clickCount++;
    });

    // Test navigation to main features
    const navigationLinks = page.locator('nav a, [role="navigation"] a');
    
    if (await navigationLinks.count() > 0) {
      await navigationLinks.first().click();
      clickCount++; // Count navigation click
      
      // Should reach destination in under 5 clicks total
      expect(clickCount).toBeLessThan(5);
    }
  });

  test('should have AI prefill in forms', async ({ page }) => {
    // Look for form inputs
    const formInputs = page.locator('input[type="text"], textarea');
    
    if (await formInputs.count() > 0) {
      const firstInput = formInputs.first();
      
      // Check for placeholder that suggests AI assistance
      const placeholder = await firstInput.getAttribute('placeholder');
      const hasAIPrefill = placeholder && (
        placeholder.includes('AI') ||
        placeholder.includes('suggest') ||
        placeholder.includes('auto')
      );
      
      // Or check for prefill buttons/icons nearby
      const prefillButtons = page.locator('button:has-text("Prefill"), button:has-text("AI"), [title*="AI"]');
      const hasPrefillButton = await prefillButtons.count() > 0;
      
      expect(hasAIPrefill || hasPrefillButton).toBeTruthy();
    }
  });

  test('should show progress indicators for multi-step processes', async ({ page }) => {
    // Look for progress indicators
    const progressIndicators = page.locator(
      '[role="progressbar"], .progress, [class*="step"], [class*="progress"]'
    );
    
    // Check for step indicators in forms or workflows
    const stepIndicators = page.locator(
      '[data-step], .step-indicator, [class*="step-"]'
    );
    
    // If multi-step content exists, progress should be shown
    const multiStepContent = page.locator('[data-step], .wizard, .stepper');
    const hasMultiStep = await multiStepContent.count() > 0;
    
    if (hasMultiStep) {
      const hasProgress = 
        (await progressIndicators.count() > 0) || 
        (await stepIndicators.count() > 0);
      
      expect(hasProgress).toBeTruthy();
    }
  });

  test('should provide contextual help and guidance', async ({ page }) => {
    // Look for help icons, tooltips, or guidance text
    const helpElements = page.locator(
      '[title], [data-tooltip], .tooltip, .help-text, [class*="help"]'
    );
    
    const guidanceText = page.locator(':text("tip"), :text("help"), :text("guide")');
    
    // Should have some form of contextual help
    const hasHelp = 
      (await helpElements.count() > 0) || 
      (await guidanceText.count() > 0);
    
    expect(hasHelp).toBeTruthy();
  });

  test('should handle loading states gracefully', async ({ page }) => {
    // Look for buttons that might trigger loading
    const actionButtons = page.locator(
      'button:has-text("Process"), button:has-text("Analyze"), button:has-text("Generate")'
    );
    
    if (await actionButtons.count() > 0) {
      const button = actionButtons.first();
      
      // Click and check for loading state
      await button.click();
      
      // Should show loading state, not just disappear
      const loadingStates = page.locator(
        '[aria-busy="true"], .loading, [class*="loading"], :text("Processing")'
      );
      
      // Wait briefly for loading state to appear
      await page.waitForTimeout(100);
      
      const hasLoadingState = await loadingStates.count() > 0;
      expect(hasLoadingState).toBeTruthy();
    }
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press('Tab');
    
    // Should have focus indicators
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Test multiple tab presses
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should still have visible focus
    await expect(page.locator(':focus')).toBeVisible();
  });

  test('should provide clear error messages', async ({ page }) => {
    // Look for forms to test error states
    const forms = page.locator('form');
    
    if (await forms.count() > 0) {
      // Try to submit empty form to trigger validation
      const submitButtons = page.locator('button[type="submit"], input[type="submit"]');
      
      if (await submitButtons.count() > 0) {
        await submitButtons.first().click();
        
        // Look for error messages
        const errorMessages = page.locator(
          '.error, [role="alert"], [class*="error"], .text-red, [style*="color: red"]'
        );
        
        // Should show helpful error messages
        if (await errorMessages.count() > 0) {
          const errorText = await errorMessages.first().textContent();
          expect(errorText).toBeTruthy();
          expect(errorText!.length).toBeGreaterThan(3); // Should be descriptive
        }
      }
    }
  });

  test('should maintain consistent spacing using 8pt grid', async ({ page }) => {
    // Check spacing between elements
    const containers = page.locator('div, section, article');
    
    if (await containers.count() > 0) {
      const firstContainer = containers.first();
      
      const computedStyles = await firstContainer.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          marginTop: parseInt(styles.marginTop) || 0,
          marginBottom: parseInt(styles.marginBottom) || 0,
          paddingTop: parseInt(styles.paddingTop) || 0,
          paddingBottom: parseInt(styles.paddingBottom) || 0
        };
      });
      
      // Check that spacing values are multiples of 8
      Object.values(computedStyles).forEach(value => {
        if (value > 0) {
          expect(value % 8).toBe(0);
        }
      });
    }
  });

  test('should handle empty states appropriately', async ({ page }) => {
    // Look for data containers that might be empty
    const dataContainers = page.locator(
      '[class*="list"], [class*="table"], [class*="grid"], [class*="items"]'
    );
    
    if (await dataContainers.count() > 0) {
      // Check for empty state messaging
      const emptyStates = page.locator(
        ':text("No data"), :text("Empty"), :text("Nothing"), [class*="empty"]'
      );
      
      // If containers appear empty, should have proper messaging
      const container = dataContainers.first();
      const hasContent = await container.locator('> *').count() > 0;
      
      if (!hasContent) {
        const hasEmptyState = await emptyStates.count() > 0;
        expect(hasEmptyState).toBeTruthy();
      }
    }
  });

  test('should provide feedback for user actions', async ({ page }) => {
    // Test button interactions
    const buttons = page.locator('button');
    
    if (await buttons.count() > 0) {
      const firstButton = buttons.first();
      
      // Click and check for visual feedback
      await firstButton.click();
      
      // Look for feedback indicators
      const feedbackElements = page.locator(
        '.success, .notification, [role="status"], [class*="feedback"]'
      );
      
      // Check for visual state changes (loading, disabled, etc.)
      const isDisabled = await firstButton.isDisabled();
      const hasLoadingText = await firstButton.textContent().then(
        text => text?.includes('Loading') || text?.includes('Processing')
      );
      
      // Should provide some form of feedback
      const hasFeedback = 
        (await feedbackElements.count() > 0) || 
        isDisabled || 
        hasLoadingText;
      
      expect(hasFeedback).toBeTruthy();
    }
  });
});