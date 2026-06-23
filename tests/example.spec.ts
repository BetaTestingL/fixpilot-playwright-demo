import { test, expect } from '@playwright/test';

test.describe('Example.com page', () => {
  // Navigate to the page before each test to keep tests independent
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com/');
  });

  test('should display the correct title and main heading', async ({ page }) => {
    // Verify the page title contains "Example Domain"
    await expect(page).toHaveTitle(/Example Domain/);

    // Verify the main <h1> heading text
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Example Domain');
  });

  test('should navigate to the IANA page when clicking the "More information" link', async ({
    page,
  }) => {
    // Locate the link by its visible text and ensure it is visible
    const moreInfoLink = page.getByRole('link', { name: 'More information...' });
    await expect(moreInfoLink).toBeVisible();

    // Click the link and wait for navigation
    await Promise.all([page.waitForNavigation(), moreInfoLink.click()]);

    // Verify the new URL points to the IANA website
    await expect(page).toHaveURL(/iana\.org/);

    // Basic sanity check on the destination page
    const ianaHeading = page.locator('h1');
    await expect(ianaHeading).toContainText('IANA');
  });
});