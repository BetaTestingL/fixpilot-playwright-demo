import { test, expect } from '@playwright/test';

test.describe('Demo site – Chromium', () => {
  // Force the test suite to run only on Chromium
  test.use({ browserName: 'chromium' });

  // Navigate to the demo page before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com');
  });

  test('should display the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('should have a visible and functional external link', async ({ page }) => {
    const moreInfoLink = page.locator('a:has-text("More information")');
    await expect(moreInfoLink).toBeVisible();

    // Verify the link navigates to the expected URL
    await moreInfoLink.click();
    await expect(page).toHaveURL('https://www.iana.org/domains/example');

    // Verify the target page loaded correctly
    const heading = page.locator('h1');
    await expect(heading).toHaveText('IANA-managed Reserved Domains');
  });
});