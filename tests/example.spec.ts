import { test, expect } from '@playwright/test';

test.describe('Demo Application – Core Flow', () => {
  // Adjust the base URL in playwright.config.ts if needed.
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('should display the home page title', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot Demo/i);
  });

  test('should navigate to the About page and verify content', async ({ page }) => {
    // Assuming there is a navigation link with text "About"
    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL(/.*\/about/);
    // Verify a heading exists on the About page
    const heading = page.getByRole('heading', { name: /about us/i });
    await expect(heading).toBeVisible();
  });

  test('should perform a successful login', async ({ page }) => {
    // Assuming a login button/link is present on the home page
    await page.getByRole('link', { name: /login/i }).click();
    await expect(page).toHaveURL(/.*\/login/);

    // Fill in login form – replace selectors if they differ
    await page.getByLabel(/email/i).fill('testuser@example.com');
    await page.getByLabel(/password/i).fill('Password123!');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Verify successful login – e.g., user avatar appears
    const userAvatar = page.getByRole('img', { name: /user avatar/i });
    await expect(userAvatar).toBeVisible();

    // Optionally verify redirected to dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('should create a new item and verify it appears in the list', async ({ page }) => {
    // Navigate to the items page
    await page.getByRole('link', { name: /items/i }).click();
    await expect(page).toHaveURL(/.*\/items/);

    // Click "Add New" button
    await page.getByRole('button', { name: /add new/i }).click();

    // Fill out the creation form
    await page.getByLabel(/title/i).fill('Playwright Test Item');
    await page.getByLabel(/description/i).fill('Created by automated test');
    await page.getByRole('button', { name: /save/i }).click();

    // Verify the new item appears in the list
    const newItem = page.getByRole('listitem').filter({ hasText: 'Playwright Test Item' });
    await expect(newItem).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // Assuming the user is already logged in from a previous test or we log in first
    // For isolation, perform login steps again
    await page.getByRole('link', { name: /login/i }).click();
    await page.getByLabel(/email/i).fill('testuser@example.com');
    await page.getByLabel(/password/i).fill('Password123!');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Open user menu and click logout
    await page.getByRole('button', { name: /user menu/i }).click();
    await page.getByRole('menuitem', { name: /logout/i }).click();

    // Verify we are back on the home page and login link is visible again
    await expect(page).toHaveURL(baseUrl);
    await expect(page.getByRole('link', { name: /login/i })).toBeVisible();
  });
});