import { test, expect } from '@playwright/test';

test.describe('Example page flow', () => {
  // Runs before each test in this describe block.
  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL defined in playwright.config.ts or fallback to a known URL.
    await page.goto('/');
  });

  test('should display the correct page title on load', async ({ page }) => {
    // Verify that the page title matches the expected value.
    await expect(page).toHaveTitle(/Example Domain/i);
  });

  test('should navigate to the more information page when the link is clicked', async ({ page }) => {
    // Click the link that leads to the "More information" page.
    const moreInfoLink = page.getByRole('link', { name: /More information/i });
    await expect(moreInfoLink).toBeVisible();
    await moreInfoLink.click();

    // Verify that the URL changed to the expected target.
    await expect(page).toHaveURL(/iana\.org/);

    // Verify that the new page contains expected content.
    const heading = page.getByRole('heading', { name: /IANA/i });
    await expect(heading).toBeVisible();
  });

  test('should have a functional navigation menu', async ({ page }) => {
    // Assume there is a navigation menu with a "Home" button.
    const homeButton = page.getByRole('link', { name: /Home/i });
    await expect(homeButton).toBeVisible();

    // Click the Home button and verify we are back at the root URL.
    await homeButton.click();
    await expect(page).toHaveURL('/');
  });
});