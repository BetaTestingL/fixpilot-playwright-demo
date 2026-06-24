import { test, expect } from '@playwright/test';

test.describe('Demo application basic sanity checks', () => {
  test('should load the home page without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Navigate to the base URL defined in Playwright config
    await page.goto('/');
    // Ensure all network activity has settled
    await page.waitForLoadState('networkidle');

    // Assert that no console errors were captured
    expect(consoleErrors).toEqual([]);
  });

  test('should display the main heading', async ({ page }) => {
    await page.goto('/');
    const heading = page.locator('h1');

    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/FixPilot Demo/i);
  });
});