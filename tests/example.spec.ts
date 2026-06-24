import { test, expect } from '@playwright/test';

test.describe('Example page', () => {
  test('should load and display the correct title', async ({ page }) => {
    // Navigate to the example page used in the original demo
    await page.goto('https://example.com');

    // Verify that the page title is exactly "Example Domain"
    await expect(page).toHaveTitle('Example Domain');

    // Verify that the main heading is visible and contains the expected text
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Example Domain');

    // Verify that the page contains the expected paragraph text
    const paragraph = page.locator('p');
    await expect(paragraph).toContainText('illustrative examples');

    // Verify that the "More information" link points to the correct URL
    const moreInfoLink = page.locator('a', { hasText: 'More information...' });
    await expect(moreInfoLink).toHaveAttribute('href', 'https://www.iana.org/domains/example');
  });
});