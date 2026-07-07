import { test, expect } from '@playwright/test';

test.describe('Example sanity checks', () => {
  test('should load the Example.com page and have the correct title', async ({ page }) => {
    // Navigate to a stable public page that is guaranteed to be reachable in CI.
    await page.goto('https://example.com/');

    // Verify the page title.
    await expect(page).toHaveTitle('Example Domain');

    // Verify the main heading text.
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Example Domain');
  });
});