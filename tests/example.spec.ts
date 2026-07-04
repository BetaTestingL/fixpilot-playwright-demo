import { test, expect } from '@playwright/test';

test.describe('FixPilot Demo Application', () => {
  // Runs before each test in this describe block.
  test.beforeEach(async ({ page }) => {
    // Assumes the baseURL is defined in playwright.config.ts.
    await page.goto('/');
  });

  test('homepage loads with correct title and header', async ({ page }) => {
    // Verify the page title contains the expected text.
    await expect(page).toHaveTitle(/FixPilot Demo/i);

    // Verify the main header is visible and contains the expected text.
    const header = page.locator('h1', { hasText: 'FixPilot Demo' });
    await expect(header).toBeVisible();
  });

  test('navigation to About page works', async ({ page }) => {
    // Click the navigation link to the About page.
    await page.click('nav >> text=About');

    // Expect the URL to contain /about.
    await expect(page).toHaveURL(/\/about/);

    // Verify the About page header.
    const aboutHeader = page.locator('h2', { hasText: 'About Us' });
    await expect(aboutHeader).toBeVisible();
  });

  test('login form can be submitted with valid credentials', async ({ page }) => {
    // Navigate to the login page.
    await page.click('nav >> text=Login');

    // Fill in the username and password fields.
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'Password123!');

    // Submit the form.
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);

    // Verify that the user is redirected to the dashboard.
    await expect(page).toHaveURL(/\/dashboard/);

    // Verify a welcome message appears.
    const welcomeMessage = page.locator('text=Welcome, testuser');
    await expect(welcomeMessage).toBeVisible();
  });

  test('logout functionality returns to homepage', async ({ page }) => {
    // Assume the user is already logged in from the previous test.
    // Directly navigate to the dashboard for safety.
    await page.goto('/dashboard');

    // Click the logout button.
    await page.click('button:has-text("Logout")');

    // Verify redirection to the homepage.
    await expect(page).toHaveURL('/');
    const loginLink = page.locator('nav >> text=Login');
    await expect(loginLink).toBeVisible();
  });
});