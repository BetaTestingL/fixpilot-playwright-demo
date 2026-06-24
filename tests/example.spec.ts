import { test, expect } from '@playwright/test';

test.describe('Example flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL before each test.
    await page.goto('/');
  });

  test('homepage loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
    const header = page.locator('h1');
    await expect(header).toBeVisible();
    await expect(header).toHaveText(/Playwright/);
  });

  test('navigate to the About page and verify content', async ({ page }) => {
    // Assume there is a navigation link with text "About"
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/.*\/about/);
    const aboutHeader = page.locator('h2');
    await expect(aboutHeader).toHaveText('About Us');
  });

  test('search functionality returns results', async ({ page }) => {
    // Assume a search input with placeholder "Search"
    const searchInput = page.getByPlaceholder('Search');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('Playwright');
    await searchInput.press('Enter');

    // Results container assumed to have data-test-id="search-results"
    const results = page.locator('[data-test-id="search-results"]');
    await expect(results).toBeVisible();
    await expect(results.locator('li')).toHaveCountGreaterThan(0);
  });
});