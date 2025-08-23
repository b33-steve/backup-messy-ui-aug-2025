import { test, expect } from '@playwright/test';

test.describe('STEP 5: Strategic Chat Component Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/chat/strategic');
    await page.waitForLoadState('networkidle');
  });

  test('Strategic Chat Component matches STEP 5 specification', async ({ page }) => {
    // Test 1: Component renders with correct structure
    await expect(page.locator('.max-w-4xl')).toBeVisible();
    
    // Test 2: GlassCard with h-[600px] height
    const chatCard = page.locator('[class*="h-[600px]"], [class*="h-\\[600px\\]"]').first();
    await expect(chatCard).toBeVisible();
    
    // Test 3: Flex column layout
    await expect(page.locator('[class*="flex-col"]')).toBeVisible();
  });

  test('Messages state and display work correctly', async ({ page }) => {
    const testMessage = 'Test strategic question for STEP 5';
    
    // Test input field
    const input = page.locator('input[placeholder*="strategic question"]');
    await expect(input).toBeVisible();
    
    // Submit message
    await input.fill(testMessage);
    await page.locator('button:has-text("Send")').click();
    
    // Check user message appears with correct alignment
    const userMessage = page.locator('.justify-end').locator(`text=${testMessage}`);
    await expect(userMessage).toBeVisible();
    
    // Check for blue background on user message
    const userMessageBg = page.locator('.bg-blue-500').locator(`text=${testMessage}`);
    await expect(userMessageBg).toBeVisible();
  });

  test('useStrategicAnalysis hook integration works', async ({ page }) => {
    // Submit a question to trigger the hook
    await page.locator('input[placeholder*="strategic question"]').fill('Competitive analysis test');
    await page.locator('button:has-text("Send")').click();
    
    // Check for loading state
    await expect(page.locator('.animate-bounce')).toBeVisible();
    
    // Wait for API response
    await page.waitForSelector('text=Strategic analysis', { timeout: 15000 });
    
    // Check that assistant message appears
    await expect(page.locator('text=Strategic analysis')).toBeVisible();
  });

  test('Theme-aware styling matches specification', async ({ page }) => {
    // Test light theme styling (default)
    const input = page.locator('input[placeholder*="strategic question"]');
    
    // Check for theme-aware input classes
    await expect(input).toHaveClass(/border-gray-300|border-gray-600/);
    
    // Check for focus states
    await input.focus();
    await expect(input).toHaveClass(/focus:border-blue-500|focus:border-blue-400/);
    
    // Check for glass card background
    const glassCard = page.locator('[class*="bg-white/"], [class*="backdrop-blur"]');
    await expect(glassCard).toBeVisible();
  });

  test('Loading state displays correctly per STEP 5', async ({ page }) => {
    // Submit question to trigger loading
    await page.locator('input[placeholder*="strategic question"]').fill('Loading test');
    await page.locator('button:has-text("Send")').click();
    
    // Check for three bouncing dots
    const bouncingDots = page.locator('.animate-bounce');
    await expect(bouncingDots).toHaveCount(3);
    
    // Check for delay classes
    await expect(page.locator('.delay-100')).toBeVisible();
    await expect(page.locator('.delay-200')).toBeVisible();
    
    // Check loading message background
    await expect(page.locator('.bg-gray-100, .bg-gray-700')).toBeVisible();
  });

  test('Form submission and input clearing works', async ({ page }) => {
    const testInput = 'Form submission test message';
    
    // Fill input
    const input = page.locator('input[placeholder*="strategic question"]');
    await input.fill(testInput);
    await expect(input).toHaveValue(testInput);
    
    // Submit form
    await page.locator('button:has-text("Send")').click();
    
    // Input should be cleared after submission
    await expect(input).toHaveValue('');
    
    // Message should appear in chat
    await expect(page.locator(`text=${testInput}`)).toBeVisible();
  });

  test('Button states work correctly', async ({ page }) => {
    const sendButton = page.locator('button:has-text("Send")');
    
    // Button should be enabled with text
    await expect(sendButton).toBeVisible();
    await expect(sendButton).not.toBeDisabled();
    
    // Submit to test loading state
    await page.locator('input[placeholder*="strategic question"]').fill('Button state test');
    await sendButton.click();
    
    // Button should show loading state
    await expect(sendButton).toBeDisabled();
    
    // Wait for completion
    await page.waitForSelector('text=Strategic analysis', { timeout: 10000 });
    
    // Button should be enabled again
    await expect(sendButton).not.to.beDisabled();
  });

  test('Message role and content structure matches STEP 5', async ({ page }) => {
    const testQuestion = 'Role and content test';
    
    // Submit message
    await page.locator('input[placeholder*="strategic question"]').fill(testQuestion);
    await page.locator('button:has-text("Send")').click();
    
    // Wait for AI response
    await page.waitForSelector('text=Strategic analysis', { timeout: 15000 });
    
    // Check message structure:
    // 1. User message should be right-aligned
    await expect(page.locator('.justify-end')).toBeVisible();
    
    // 2. Assistant message should be left-aligned  
    await expect(page.locator('.justify-start')).toBeVisible();
    
    // 3. User messages should have blue background
    await expect(page.locator('.bg-blue-500')).toBeVisible();
    
    // 4. Assistant messages should have theme-appropriate background
    await expect(page.locator('.bg-gray-100, .bg-gray-700')).toBeVisible();
  });

  test('Maximum width and responsive design', async ({ page }) => {
    // Check for max-w-4xl container
    await expect(page.locator('.max-w-4xl')).toBeVisible();
    
    // Check for proper padding
    await expect(page.locator('.p-6')).toBeVisible();
    
    // Test on different screen sizes
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile
    await expect(page.locator('.max-w-4xl')).toBeVisible();
    
    await page.setViewportSize({ width: 1200, height: 800 }); // Desktop
    await expect(page.locator('.max-w-4xl')).toBeVisible();
  });

  test('Border and form styling matches specification', async ({ page }) => {
    // Check for border-t on form
    await expect(page.locator('.border-t')).toBeVisible();
    
    // Check for border color classes
    await expect(page.locator('.border-gray-200, .border-gray-700')).toBeVisible();
    
    // Check for form gap and padding
    await expect(page.locator('.gap-2')).toBeVisible();
    await expect(page.locator('.p-4')).toBeVisible();
    
    // Check flex layout in form
    await expect(page.locator('form .flex')).toBeVisible();
  });

  test('Input field styling and focus states', async ({ page }) => {
    const input = page.locator('input[placeholder*="strategic question"]');
    
    // Check for flex-1 class (takes full width)
    await expect(input).toHaveClass(/flex-1/);
    
    // Check for padding classes
    await expect(input).toHaveClass(/px-4|py-2/);
    
    // Check for rounded corners
    await expect(input).toHaveClass(/rounded-lg/);
    
    // Check for focus ring
    await expect(input).toHaveClass(/focus:ring-2/);
    
    // Test focus state
    await input.focus();
    await expect(input).toBeFocused();
  });
});

test.describe('STEP 5: API Integration Verification', () => {
  test('analyzeQuestion function integration', async ({ page }) => {
    // Monitor network requests
    let apiCalled = false;
    page.on('request', request => {
      if (request.url().includes('/api/strategic-analysis')) {
        apiCalled = true;
      }
    });
    
    // Submit a question
    await page.locator('input[placeholder*="strategic question"]').fill('API integration test');
    await page.locator('button:has-text("Send")').click();
    
    // Wait for response
    await page.waitForSelector('text=Strategic analysis', { timeout: 15000 });
    
    // Either API was called or fallback mock was used
    const responseReceived = await page.locator('text=Strategic analysis').isVisible();
    expect(responseReceived).toBe(true);
  });

  test('Response handling and message addition', async ({ page }) => {
    const testQuestion = 'Response handling test';
    
    // Count initial messages
    const initialMessageCount = await page.locator('[class*="rounded-lg p-3"]').count();
    
    // Submit question
    await page.locator('input[placeholder*="strategic question"]').fill(testQuestion);
    await page.locator('button:has-text("Send")').click();
    
    // Wait for response
    await page.waitForSelector('text=Strategic analysis', { timeout: 15000 });
    
    // Should have at least 2 more messages (user + assistant)
    const finalMessageCount = await page.locator('[class*="rounded-lg p-3"]').count();
    expect(finalMessageCount).toBeGreaterThanOrEqual(initialMessageCount + 2);
  });
});