import { test, expect } from '@playwright/test';

test.describe('New Button Navigation', () => {
  // Adjust this URL if your app uses a different base path
  const baseUrl = '/';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('should navigate to the target page when the new button is clicked', async ({
    page,
  }) => {
    // Locate the new button.
    // Replace the selector with the actual one used in the application.
    const newButton = page.getByRole('button', { name: /new feature/i });

    // Ensure the button is visible and enabled before interacting.
    await expect(newButton).toBeVisible();
    await expect(newButton).toBeEnabled();

    // Click the button and wait for navigation to complete.
    await Promise.all([
      page.waitForNavigation({ url: /\/new-page/ }), // Adjust the pattern as needed.
      newButton.click(),
    ]);

    // Verify that the URL is correct.
    await expect(page).toHaveURL(/\/new-page/);

    // Verify that the target page contains expected content.
    // Adjust the selector/text to match the actual page.
    const pageHeader = page.getByRole('heading', { level: 1 });
    await expect(pageHeader).toHaveText(/new page/i);
  });
});