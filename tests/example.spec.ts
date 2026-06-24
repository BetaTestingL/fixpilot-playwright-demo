import { test, expect } from '@playwright/test';

test.describe('Demo Application – Example Flow', () => {
  test('should load the home page and display the correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/.*\/$/);
    await expect(page).toHaveTitle(/FixPilot Demo/i);
  });

  test('should navigate to the About page and verify its content', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL(/.*\/about/);
    await expect(page.locator('h1')).toHaveText(/about fixpilot/i);
  });
});