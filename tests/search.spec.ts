import { test, expect } from '@playwright/test';

test.describe('Search Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should return results for a valid query', async ({ page }) => {
    const searchBox = page.locator('input[placeholder="Search…"]');
    await expect(searchBox).toBeVisible();

    await searchBox.fill('playwright');
    await page.press('input[placeholder="Search…"]', 'Enter');

    // Verify that the results page loads and displays at least one result.
    await expect(page).toHaveURL(/.*\/search\?q=playwright/);
    const results = page.locator('.search-result');
    await expect(results).toHaveCountGreaterThan(0);
    await expect(results.first()).toContainText(/playwright/i);
  });

  test('should show a friendly message when no results are found', async ({ page }) => {
    const searchBox = page.locator('input[placeholder="Search…"]');
    await searchBox.fill('nonexistentquery12345');
    await page.press('input[placeholder="Search…"]', 'Enter');

    await expect(page).toHaveURL(/.*\/search\?q=nonexistentquery12345/);
    const noResultMsg = page.locator('.no-results');
    await expect(noResultMsg).toBeVisible();
    await expect(noResultMsg).toHaveText(/no results found/i);
  });
});