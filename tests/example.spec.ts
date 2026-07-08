import { test, expect } from '@playwright/test';

test.describe('Demo application – example tests', () => {
  // Adjust the base URL to match the application under test.
  const baseURL = process.env.BASE_URL ?? 'https://example.com';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('should display the correct page title', async ({ page }) => {
    // Verify that the page title contains the expected text.
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('should navigate to the secondary page when the link is clicked', async ({ page }) => {
    // Click the link that leads to the secondary page.
    await page.click('text=More information');

    // The URL of the secondary page is expected to contain "iana.org".
    await expect(page).toHaveURL(/.*iana\.org/);
  });

  test('should reveal hidden content after button click', async ({ page }) => {
    // Assume there is a button that toggles visibility of a paragraph.
    const toggleButton = page.locator('button#toggle-content');
    const hiddenParagraph = page.locator('p#secret-text');

    // Initially the paragraph should be hidden.
    await expect(hiddenParagraph).toBeHidden();

    // Click the button to reveal the paragraph.
    await toggleButton.click();

    // Now the paragraph should be visible and contain expected text.
    await expect(hiddenParagraph).toBeVisible();
    await expect(hiddenParagraph).toHaveText('Secret content revealed');
  });
});