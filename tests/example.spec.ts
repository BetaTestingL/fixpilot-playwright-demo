import { test, expect } from '@playwright/test';

test.describe('Example spec (converted from JavaScript)', () => {
  test('should load the demo page and verify title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/FixPilot Demo/);
  });

  test('should navigate to the features section and validate content', async ({ page }) => {
    await page.goto('/');
    const featuresLink = page.getByRole('link', { name: /features/i });
    await featuresLink.click();
    await expect(page).toHaveURL(/\/features$/);
    const featureHeader = page.getByRole('heading', { name: /our features/i });
    await expect(featureHeader).toBeVisible();
  });

  test('should perform a search and display results', async ({ page }) => {
    await page.goto('/');
    const searchInput = page.getByPlaceholder('Search...');
    await searchInput.fill('automation');
    await searchInput.press('Enter');

    // Wait for results to appear
    const results = page.locator('[data-test-id="search-results"] >> .result-item');
    await expect(results).toHaveCountGreaterThan(0);
    await expect(results.first()).toContainText(/automation/i);
  });
});