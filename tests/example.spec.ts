import { test, expect } from '@playwright/test';

test.describe('Example flow – sanity checks', () => {
  // Base URL can be overridden via the Playwright config or CI env vars.
  const baseURL = process.env.BASE_URL ?? 'https://playwright.dev';

  test.beforeEach(async ({ page }) => {
    // Ensure a clean state before each test.
    await page.goto(baseURL);
  });

  test('homepage title contains "Playwright"', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('main navigation is visible and functional', async ({ page }) => {
    // Assume the main navigation bar has a role of "navigation".
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();

    // Verify that the "Docs" link exists and navigates correctly.
    const docsLink = nav.getByRole('link', { name: /Docs/i });
    await expect(docsLink).toBeVisible();
    await docsLink.click();

    // After navigation, the URL should contain "/docs/intro".
    await expect(page).toHaveURL(/.*\/docs\/intro/);
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('search component works', async ({ page }) => {
    // Assume a search button with an accessible label "Search".
    const searchButton = page.getByRole('button', { name: /Search/i });
    await expect(searchButton).toBeVisible();
    await searchButton.click();

    // After opening the search overlay, an input should appear.
    const searchInput = page.getByPlaceholderText('Search');
    await expect(searchInput).toBeVisible();

    // Type a query and verify that results appear.
    await searchInput.fill('expect');
    const firstResult = page.locator('.search-result-item').first();
    await expect(firstResult).toBeVisible();
    await expect(firstResult).toContainText(/expect/);
  });
});