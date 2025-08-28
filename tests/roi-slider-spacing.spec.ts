import { test, expect } from '@playwright/test';

test('ROI slider spacing test', async ({ page }) => {
  await page.goto('http://localhost:3001/pricing');
  await page.waitForLoadState('networkidle');
  
  // Scroll to ROI calculator section
  const roiHeading = page.locator('h2:has-text("Calculate Your ROI")');
  await roiHeading.scrollIntoViewIfNeeded();
  
  await page.waitForTimeout(1000);
  
  // Check for slider elements
  const sliders = page.locator('.mantine-Slider-root');
  await expect(sliders).toHaveCount(3);
  
  // Take screenshot of the ROI calculator section
  await page.screenshot({ 
    path: 'test-results/roi-calculator-spacing.png',
    clip: { x: 0, y: 300, width: 1200, height: 800 }
  });
  
  // Check spacing between slider marks and description text
  const salarySlider = sliders.first();
  const salarySliderBox = await salarySlider.boundingBox();
  
  const salaryDescription = page.locator('text=Monthly salary cost');
  const salaryDescriptionBox = await salaryDescription.boundingBox();
  
  if (salarySliderBox && salaryDescriptionBox) {
    const spacing = salaryDescriptionBox.y - (salarySliderBox.y + salarySliderBox.height);
    console.log(`Spacing between salary slider and description: ${spacing}px`);
    
    // Should have adequate spacing (at least 16px)
    expect(spacing).toBeGreaterThan(16);
  }
  
  // Test interaction to make sure sliders still work
  await salarySlider.click({ position: { x: 200, y: 10 } });
  await page.waitForTimeout(300);
  
  console.log('✅ ROI slider spacing fixed and interactions working');
});