import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  // Use the base URL defined in the Playwright config or fallback to localhost
  const baseUrl = process.env.PW_BASE_URL ?? 'http://localhost:3000';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('should display a non‑empty title', async ({ page }) => {
    await expect(page).toHaveTitle(/.+/);
  });

  test('should have a visible main heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/welcome|home/i);
  });
});