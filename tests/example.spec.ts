import { test, expect } from '@playwright/test';

test.describe('Example UI flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo application before each test
    await page.goto('https://demo.fixpilot.com');
  });

  test('should display the main heading on the home page', async ({ page }) => {
    const heading = page.locator('h1:has-text("FixPilot Demo")');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('FixPilot Demo');
  });

  test('should navigate to the documentation page via the top menu', async ({ page }) => {
    await test.step('Open the Documentation link from the navigation bar', async () => {
      await page.getByRole('link', { name: /documentation/i }).click();
    });

    await test.step('Verify the documentation page loads correctly', async () => {
      await expect(page).toHaveURL(/.*\/documentation/);
      const docTitle = page.locator('h2:has-text("Getting Started")');
      await expect(docTitle).toBeVisible();
    });
  });

  test('should perform a simple search and display results', async ({ page }) => {
    const searchBox = page.getByPlaceholder('Search...');
    await searchBox.fill('playwright');
    await searchBox.press('Enter');

    const results = page.locator('.search-results >> .result-item');
    await expect(results).toHaveCountGreaterThan(0);
    await expect(results.first()).toContainText('Playwright');
  });
});