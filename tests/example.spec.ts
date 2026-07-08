import { test, expect } from '@playwright/test';

test.describe('FixPilot Playwright Demo - Core UI Flows', () => {
  // Adjust the base URL in playwright.config.ts if needed.
  const baseURL = process.env.BASE_URL || 'http://localhost:3000';

  test('Home page loads and displays correct title', async ({ page }) => {
    await page.goto(baseURL);
    await expect(page).toHaveURL(baseURL + '/');
    await expect(page).toHaveTitle(/FixPilot Demo/i);
    // Verify a primary heading is present
    const heading = page.locator('h1', { hasText: /welcome/i });
    await expect(heading).toBeVisible();
  });

  test('Navigate to the About page via the top navigation and verify content', async ({
    page,
  }) => {
    await page.goto(baseURL);
    // Assume there is a navigation link with text "About"
    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL(/.*\/about/);
    // Verify the About page header
    const aboutHeader = page.locator('h1', { hasText: /about us/i });
    await expect(aboutHeader).toBeVisible();
    // Check that a paragraph with some expected text exists
    await expect(page.locator('p')).toContainText(/fixpilot/i);
  });

  test('User can submit the contact form successfully', async ({ page }) => {
    await page.goto(`${baseURL}/contact`);
    // Fill out the contact form – selectors are assumed based on common naming
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message from Playwright.');
    // Assume the submit button has role button and text "Send"
    await page.getByRole('button', { name: /send/i }).click();

    // Expect a success toast/alert to appear
    const successAlert = page.locator('[role="alert"]', {
      hasText: /thank you for your message/i,
    });
    await expect(successAlert).toBeVisible({ timeout: 5000 });
  });

  test('Login flow works with valid credentials', async ({ page }) => {
    await page.goto(`${baseURL}/login`);
    // Fill login form – adjust selectors as needed
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'Password123!');
    await page.getByRole('button', { name: /log in/i }).click();

    // After successful login, user should be redirected to dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
    // Verify a greeting element appears
    const greeting = page.locator('h2', { hasText: /welcome, testuser/i });
    await expect(greeting).toBeVisible();
  });
});