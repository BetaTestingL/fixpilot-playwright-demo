import { test, expect } from '@playwright/test';

test.describe('Demo Application – Core Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test.
    await page.goto('/');
  });

  test('should display the correct home page title', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot Demo/i);
  });

  test('should navigate to the About page and verify content', async ({ page }) => {
    // Click the navigation link to the About page.
    await page.getByRole('link', { name: /about/i }).click();

    // Verify URL contains /about and the heading is present.
    await expect(page).toHaveURL(/.*\/about/);
    await expect(page.getByRole('heading', { level: 1, name: /about us/i })).toBeVisible();
  });

  test('should open the documentation modal and close it', async ({ page }) => {
    // Open the modal.
    await page.getByRole('button', { name: /documentation/i }).click();

    const modal = page.getByRole('dialog', { name: /documentation/i });
    await expect(modal).toBeVisible();

    // Close the modal.
    await modal.getByRole('button', { name: /close/i }).click();
    await expect(modal).toBeHidden();
  });
});