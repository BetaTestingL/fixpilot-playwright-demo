import { test, expect } from '@playwright/test';

test.describe('Theme toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should switch between light and dark mode', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: /Toggle theme/i });

    // Assume the default theme is light (background is white).
    const body = page.locator('body');
    await expect(body).toHaveCSS('background-color', 'rgb(255, 255, 255)');

    // Switch to dark mode.
    await toggleButton.click();
    await expect(body).toHaveCSS('background-color', 'rgb(34, 34, 34)'); // typical dark background

    // Switch back to light mode.
    await toggleButton.click();
    await expect(body).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  });
});