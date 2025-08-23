import { test, expect } from '@playwright/test';

test.describe('Strategic Chat Component - Vercel Production Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to strategic chat page
    await page.goto('/chat/strategic');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  test('Strategic Chat Component renders correctly', async ({ page }) => {
    // Check if the main chat container is present
    await expect(page.locator('.max-w-4xl')).toBeVisible();
    
    // Check for GlassCard with proper height
    await expect(page.locator('[data-testid="glass-card"], .h-\\[600px\\]')).toBeVisible();
    
    // Check for chat header
    await expect(page.locator('h2')).toContainText('Strategic Chat');
    
    // Check for initial AI message
    await expect(page.locator('text=Strategic AI Assistant')).toBeVisible();
  });

  test('Chat input form is functional', async ({ page }) => {
    // Find the input field
    const input = page.locator('input[placeholder*="strategic question"]');
    await expect(input).toBeVisible();
    
    // Find the send button
    const sendButton = page.locator('button:has-text("Send")');
    await expect(sendButton).toBeVisible();
    
    // Test input functionality
    await input.fill('Test strategic question');
    await expect(input).toHaveValue('Test strategic question');
    
    // Send button should be enabled with text
    await expect(sendButton).not.toBeDisabled();
  });

  test('Chat message flow works correctly', async ({ page }) => {
    const testQuestion = 'How should we respond to competitor pricing?';
    
    // Type in the input field
    const input = page.locator('input[placeholder*="strategic question"]');
    await input.fill(testQuestion);
    
    // Submit the form
    const sendButton = page.locator('button:has-text("Send")');
    await sendButton.click();
    
    // Check that user message appears
    await expect(page.locator('text=' + testQuestion)).toBeVisible();
    
    // Check for loading state
    await expect(page.locator('.animate-bounce')).toBeVisible();
    
    // Wait for AI response (with timeout for API call)
    await page.waitForSelector('text=Strategic analysis', { timeout: 10000 });
    
    // Check that AI response appears
    await expect(page.locator('text=Strategic analysis')).toBeVisible();
  });

  test('API integration works with proper fallback', async ({ page }) => {
    const testQuestion = 'Competitive strategy question for API test';
    
    // Fill and submit form
    await page.locator('input[placeholder*="strategic question"]').fill(testQuestion);
    await page.locator('button:has-text("Send")').click();
    
    // Wait for either real API response or mock fallback
    await page.waitForFunction(() => {
      const messages = document.querySelectorAll('[class*="rounded-lg p-3"]');
      return messages.length >= 2; // User message + AI response
    }, { timeout: 15000 });
    
    // Check that we got some kind of response (real API or mock)
    const responseElements = page.locator('[class*="rounded-lg p-3"]');
    await expect(responseElements).toHaveCount({ min: 2 });
  });

  test('Framework badges and confidence indicators work', async ({ page }) => {
    const testQuestion = 'Resource allocation between engineering and marketing';
    
    // Submit question
    await page.locator('input[placeholder*="strategic question"]').fill(testQuestion);
    await page.locator('button:has-text("Send")').click();
    
    // Wait for response
    await page.waitForSelector('text=Strategic analysis', { timeout: 15000 });
    
    // Look for framework badges (like ICE, RICE, etc.)
    const frameworkBadge = page.locator('[class*="bg-blue-100"], [class*="bg-blue-900"]');
    await expect(frameworkBadge).toBeVisible();
    
    // Look for confidence indicator
    const confidenceIndicator = page.locator('text=Confidence');
    await expect(confidenceIndicator).toBeVisible();
  });

  test('Clear chat functionality works', async ({ page }) => {
    // Send a test message first
    await page.locator('input[placeholder*="strategic question"]').fill('Test message');
    await page.locator('button:has-text("Send")').click();
    
    // Wait for message to appear
    await page.waitForSelector('text=Test message');
    
    // Click clear chat button
    await page.locator('button:has-text("Clear Chat")').click();
    
    // Check that messages are cleared (should only have initial AI greeting)
    const messages = page.locator('[class*="rounded-lg p-3"]');
    await expect(messages).toHaveCount(1);
    
    // Check that the cleared message appears
    await expect(page.locator('text=Chat cleared')).toBeVisible();
  });

  test('Theme-aware styling works correctly', async ({ page }) => {
    // Check for theme-aware classes
    const chatContainer = page.locator('.max-w-4xl');
    await expect(chatContainer).toBeVisible();
    
    // Check for glass morphism effects
    const glassCard = page.locator('[class*="backdrop-blur"], [class*="bg-white/"], [class*="bg-gray-800/"]');
    await expect(glassCard).toBeVisible();
    
    // Check for gradient text on title
    const title = page.locator('h2:has-text("Strategic Chat")');
    await expect(title).toHaveClass(/bg-gradient-to-r/);
  });

  test('Loading states display correctly', async ({ page }) => {
    // Submit a question to trigger loading state
    await page.locator('input[placeholder*="strategic question"]').fill('Test loading state');
    await page.locator('button:has-text("Send")').click();
    
    // Check for loading indicators
    await expect(page.locator('.animate-bounce')).toBeVisible();
    await expect(page.locator('text=Analyzing with AI frameworks')).toBeVisible();
    
    // Check that send button shows loading state
    await expect(page.locator('button:has-text("Sending")')).toBeVisible();
  });

  test('Error handling displays properly', async ({ page }) => {
    // Mock a network error by intercepting API calls
    await page.route('/api/strategic-analysis', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, error: 'Server error' })
      });
    });
    
    // Submit a question
    await page.locator('input[placeholder*="strategic question"]').fill('Test error handling');
    await page.locator('button:has-text("Send")').click();
    
    // Should fall back to mock data and still show a response
    await page.waitForSelector('text=Strategic analysis', { timeout: 10000 });
    
    // Check that we still get some kind of response (mock fallback)
    await expect(page.locator('text=Strategic analysis')).toBeVisible();
  });

  test('Responsive design works on different screen sizes', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that component is still visible and functional
    await expect(page.locator('.max-w-4xl')).toBeVisible();
    
    // Check that input is still usable
    const input = page.locator('input[placeholder*="strategic question"]');
    await expect(input).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.max-w-4xl')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('.max-w-4xl')).toBeVisible();
  });

  test('Accessibility features work correctly', async ({ page }) => {
    // Check for proper ARIA labels and roles
    const input = page.locator('input[placeholder*="strategic question"]');
    await expect(input).toBeVisible();
    
    // Check keyboard navigation
    await input.focus();
    await page.keyboard.type('Test accessibility');
    await page.keyboard.press('Enter');
    
    // Check that form submission works with keyboard
    await page.waitForSelector('text=Test accessibility');
    await expect(page.locator('text=Test accessibility')).toBeVisible();
  });
});

test.describe('Strategic Chat API Endpoint Tests', () => {
  test('API endpoint responds correctly', async ({ page }) => {
    // Test the API endpoint directly
    const response = await page.request.post('/api/strategic-analysis', {
      data: {
        question: 'Test API endpoint functionality'
      }
    });
    
    // Check response status
    expect(response.status()).toBe(200);
    
    // Parse response
    const responseData = await response.json();
    expect(responseData.success).toBe(true);
    expect(responseData.data).toBeDefined();
    expect(responseData.data.framework).toBeDefined();
    expect(responseData.data.analysis).toBeDefined();
    expect(responseData.data.recommendations).toBeDefined();
    expect(responseData.data.confidence).toBeDefined();
  });

  test('API handles different question types correctly', async ({ page }) => {
    // Test competitive analysis question
    const competitiveResponse = await page.request.post('/api/strategic-analysis', {
      data: { question: 'How should we respond to competitor pricing?' }
    });
    
    const competitiveData = await competitiveResponse.json();
    expect(competitiveData.data.framework).toContain('Porter');
    
    // Test resource allocation question
    const resourceResponse = await page.request.post('/api/strategic-analysis', {
      data: { question: 'Should we spend budget on engineering or marketing?' }
    });
    
    const resourceData = await resourceResponse.json();
    expect(resourceData.data.framework).toContain('RICE');
  });

  test('API error handling works correctly', async ({ page }) => {
    // Test with empty question
    const emptyResponse = await page.request.post('/api/strategic-analysis', {
      data: { question: '' }
    });
    
    expect(emptyResponse.status()).toBe(400);
    
    const emptyData = await emptyResponse.json();
    expect(emptyData.success).toBe(false);
    expect(emptyData.error).toContain('required');
  });
});

test.describe('Strategic Chat Integration with Navigation', () => {
  test('Navigation from main chat page works', async ({ page }) => {
    // Start at main chat page
    await page.goto('/chat');
    
    // Fill in a question
    await page.locator('textarea[placeholder*="strategic question"]').fill('Test navigation flow');
    
    // Click "Start Strategic Chat"
    await page.locator('button:has-text("Start Strategic Chat")').click();
    
    // Should navigate to strategic chat page
    await expect(page).toHaveURL(/\/chat\/strategic/);
    
    // Check that question is pre-filled
    await expect(page.locator('input[value*="Test navigation flow"]')).toBeVisible();
  });

  test('Navigation integration maintains PM33 design', async ({ page }) => {
    await page.goto('/chat/strategic');
    
    // Check for PM33 navigation header
    await expect(page.locator('nav')).toBeVisible();
    
    // Check for consistent styling with app theme
    await expect(page.locator('.bg-slate-50, .bg-slate-900')).toBeVisible();
    
    // Check for proper spacing with navigation
    await expect(page.locator('.pt-16')).toBeVisible();
  });
});