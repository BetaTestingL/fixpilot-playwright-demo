import { test, expect } from '@playwright/test';

test.describe('Example.com sanity checks', () => {
  test('should display correct page title and heading', async ({ page }) => {
    // Navigate to the example page
    await page.goto('https://example.com');

    // Verify the page title
    await expect(page).toHaveTitle('Example Domain');

    // Verify the main heading text
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Example Domain');
  });

  test('should navigate to the IANA information page and verify URL', async ({ page }) => {
    // Open the example page
    await page.goto('https://example.com');

    // Click the "More information" link
    const moreInfoLink = page.locator('text=More information');
    await moreInfoLink.click();

    // Verify that the URL points to the IANA site
    await expect(page).toHaveURL(/.*iana\.org/);

    // Verify that the IANA page contains an expected heading
    const ianaHeading = page.locator('h1');
    await expect(ianaHeading).toContainText('IANA');
  });
});