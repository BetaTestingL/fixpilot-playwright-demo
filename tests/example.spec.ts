import { test, expect } from '@playwright/test';

test.describe('FixPilot Demo – Core UI Flows', () => {
  // Runs before each test in this describe block.
  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL defined in playwright.config.ts
    await page.goto('/');
  });

  test('home page loads with correct title and header', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot Demo/i);
    const header = page.locator('h1');
    await expect(header).toBeVisible();
    await expect(header).toHaveText(/FixPilot Demo/i);
  });

  test('navigation to the About page works', async ({ page }) => {
    // Assume there is a navigation link with text "About"
    await page.click('nav >> text=About');
    await expect(page).toHaveURL(/.*\/about/);
    const aboutHeader = page.locator('h2');
    await expect(aboutHeader).toHaveText(/About Us/i);
  });

  test('user can log in with valid credentials', async ({ page }) => {
    // Open login modal or navigate to login page
    await page.click('nav >> text=Login');
    await expect(page).toHaveURL(/.*\/login/);

    // Fill in credentials – replace with valid test credentials
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'Password123!');
    await page.click('button[type="submit"]');

    // Verify successful login – e.g., presence of logout button or user avatar
    const userMenu = page.locator('nav >> text=Logout');
    await expect(userMenu).toBeVisible();
  });

  test('search functionality returns relevant results', async ({ page }) => {
    // Assume a search input exists in the header
    const searchInput = page.locator('input[placeholder="Search"]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('playwright');
    await searchInput.press('Enter');

    // Verify that results are displayed
    const results = page.locator('.search-results >> .result-item');
    await expect(results).toHaveCountGreaterThan(0);
    await expect(results.first()).toContainText(/playwright/i);
  });

  test('footer contains expected links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const privacyLink = footer.locator('text=Privacy Policy');
    await expect(privacyLink).toHaveAttribute('href', /privacy/);

    const termsLink = footer.locator('text=Terms of Service');
    await expect(termsLink).toHaveAttribute('href', /terms/);
  });
});