import { test, expect } from '@playwright/test';

test.describe('FixPilot Playwright Demo – Core UI Flows', () => {
  // Runs before each test and ensures we start from a clean state.
  test.beforeEach(async ({ page }) => {
    // Assuming the baseURL is defined in playwright.config.ts.
    await page.goto('/');
  });

  test('homepage displays the correct title and main heading', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot Demo/i);
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText(/Welcome to FixPilot/i);
  });

  test('navigation to the About page works', async ({ page }) => {
    // Click the navigation link – adjust selector if the actual markup differs.
    await page.click('nav >> text=About');
    await expect(page).toHaveURL(/.*\/about/);
    const aboutHeader = page.locator('h2');
    await expect(aboutHeader).toHaveText(/About FixPilot/i);
  });

  test('user can log in with valid credentials', async ({ page }) => {
    // Open the login modal or navigate to the login page.
    await page.click('nav >> text=Login');
    await expect(page).toHaveURL(/.*\/login/);

    // Fill in the login form.
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'Password123!');
    await page.click('button[type="submit"]');

    // Verify successful login – typically a user avatar or a logout button appears.
    const userMenu = page.locator('nav >> text=Logout');
    await expect(userMenu).toBeVisible();
  });

  test('login fails with invalid credentials and shows an error message', async ({ page }) => {
    await page.click('nav >> text=Login');
    await expect(page).toHaveURL(/.*\/login/);

    await page.fill('#username', 'invalid_user');
    await page.fill('#password', 'wrongPassword');
    await page.click('button[type="submit"]');

    const errorAlert = page.locator('.alert-error, .notification-error, text=Invalid credentials');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText(/invalid/i);
  });

  test('search functionality returns relevant results', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search"]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('playwright');
    await searchInput.press('Enter');

    // Expect the results list to be populated.
    const results = page.locator('.search-results >> .result-item');
    await expect(results).toHaveCountGreaterThan(0);
    await expect(results.first()).toContainText(/playwright/i);
  });
});