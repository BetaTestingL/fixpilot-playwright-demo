import { test, expect } from '@playwright/test';

test.describe('Example page validation', () => {
  test('should load the example.com homepage and display correct title and heading', async ({ page }) => {
    // Navigate to the public example page
    await page.goto('https://example.com');

    // Verify the page title
    await expect(page).toHaveTitle('Example Domain');

    // Verify the main heading text
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Example Domain');

    // Verify that the page contains the expected paragraph
    const paragraph = page.locator('p');
    await expect(paragraph).toContainText('illustrative examples');
  });
});