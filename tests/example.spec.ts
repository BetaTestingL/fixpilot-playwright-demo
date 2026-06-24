import { test, expect } from '@playwright/test';

test.describe('Playwright Demo – Example Tests', () => {
  // Runs before each test in this describe block.
  test.beforeEach(async ({ page }) => {
    // Navigate to the official Playwright documentation site – a stable, publicly‑available page.
    await page.goto('https://playwright.dev');
  });

  test('homepage title contains "Playwright"', async ({ page }) => {
    // Verify that the page title includes the word "Playwright".
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('navigation to the "Getting Started" guide works', async ({ page }) => {
    // Click the "Get started" link in the hero section.
    const getStartedLink = page.getByRole('link', { name: /Get started/i });
    await expect(getStartedLink).toBeVisible();
    await getStartedLink.click();

    // The URL should now contain "/docs/intro".
    await expect(page).toHaveURL(/.*\/docs\/intro/);

    // The heading on the page should read "Getting started".
    const heading = page.getByRole('heading', { name: /Getting started/i });
    await expect(heading).toBeVisible();
  });

  test('search functionality returns results for "test"', async ({ page }) => {
    // Open the search modal via the shortcut ("/" key) – Playwright's docs support this.
    await page.keyboard.press('/');
    const searchInput = page.getByPlaceholder('Search docs');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('test');

    // Wait for at least one result to appear.
    const firstResult = page.locator('.DocSearch-Hit-title').first();
    await expect(firstResult).toBeVisible();

    // The result text should contain the search term.
    await expect(firstResult).toContainText(/test/i);
  });
});