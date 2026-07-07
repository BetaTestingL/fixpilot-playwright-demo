import { test, expect } from '@playwright/test';

test.describe('Demo site basic checks', () => {
  test('should load the homepage and have the correct title', async ({ page }) => {
    // Navigate to the demo homepage
    await page.goto('https://example.com/');

    // Verify that the page title contains "Example Domain"
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('should navigate to the "More information" link and verify the target URL', async ({ page }) => {
    // Open the homepage first
    await page.goto('https://example.com/');

    // Locate the link using its accessible name and click it
    const moreInfoLink = page.getByRole('link', { name: /More information/i });
    await moreInfoLink.click();

    // The link should redirect to an IANA page; verify the URL pattern
    await expect(page).toHaveURL(/.*iana\.org/);
  });
});