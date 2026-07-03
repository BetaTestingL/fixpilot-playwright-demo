import { test, expect } from '@playwright/test';

test.describe('Demo Application – Core Flow', () => {
  // Adjust the base URL in playwright.config.ts if needed.
  const APP_URL = '/';

  test('should load the home page with correct title', async ({ page }) => {
    await page.goto(APP_URL);
    await expect(page).toHaveURL(/.*\/$/);
    await expect(page).toHaveTitle(/FixPilot Demo/i);
    const hero = page.locator('h1', { hasText: /welcome/i });
    await expect(hero).toBeVisible();
  });

  test('should navigate to the About page via the main menu', async ({ page }) => {
    await page.goto(APP_URL);
    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL(/.*\/about$/);
    await expect(page.locator('h2', { hasText: /about us/i })).toBeVisible();
  });

  test('should display a 404 page for unknown routes', async ({ page }) => {
    await page.goto('/non‑existent-page');
    await expect(page).toHaveURL(/.*\/non‑existent-page$/);
    await expect(page.locator('h1', { hasText: /404/i })).toBeVisible();
    await expect(page.locator('p')).toContainText('Page not found');
  });
});