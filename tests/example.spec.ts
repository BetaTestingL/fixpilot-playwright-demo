import { test, expect } from '@playwright/test';

test.describe('Example page tests', () => {
  // Verify that the example.com homepage loads correctly and displays the expected title.
  test('should display correct title on example.com', async ({ page }) => {
    // Navigate to the public example domain.
    await page.goto('https://example.com');

    // Assert that the page title contains "Example Domain".
    await expect(page).toHaveTitle(/Example Domain/);
  });

  // Verify that the main heading is present and contains the expected text.
  test('should show main heading with correct text', async ({ page }) => {
    await page.goto('https://example.com');

    // The main heading uses an <h1> selector.
    const heading = page.locator('h1');

    // Ensure the heading is visible.
    await expect(heading).toBeVisible();

    // Verify the heading text.
    await expect(heading).toHaveText('Example Domain');
  });

  // Verify that the "More information" link navigates to the expected URL.
  test('should navigate to IANA when clicking the More information link', async ({ page }) => {
    await page.goto('https://example.com');

    // The link is identified by its exact text.
    const moreInfoLink = page.getByRole('link', { name: 'More information...' });

    // Ensure the link is visible and enabled.
    await expect(moreInfoLink).toBeVisible();
    await expect(moreInfoLink).toBeEnabled();

    // Click the link and wait for navigation.
    await Promise.all([
      page.waitForNavigation(),
      moreInfoLink.click(),
    ]);

    // Verify the new URL contains "iana.org".
    await expect(page).toHaveURL(/.*iana\.org.*/);
  });
});