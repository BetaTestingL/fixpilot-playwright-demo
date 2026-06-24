import { test, expect } from '@playwright/test';

test.describe('Demo application', () => {
  // Runs before each test – navigates to the base URL defined in playwright.config.ts
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have the correct page title', async ({ page }) => {
    // Adjust the expected title fragment to match the demo app
    await expect(page).toHaveTitle(/FixPilot Demo|Demo/i);
  });

  test('should display the main heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/FixPilot Demo|Demo/i);
  });

  test('should navigate to the About page when clicking the About link', async ({ page }) => {
    const aboutLink = page.locator('a', { hasText: /about/i });
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    await expect(page).toHaveURL(/about/);
    const aboutHeader = page.locator('h2', { hasText: /about/i });
    await expect(aboutHeader).toBeVisible();
  });

  test('should submit the contact form successfully', async ({ page }) => {
    const contactLink = page.locator('a', { hasText: /contact/i });
    await expect(contactLink).toBeVisible();
    await contactLink.click();

    await expect(page).toHaveURL(/contact/);

    // Fill out the form – selectors are generic and can be adjusted to the actual markup
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('textarea[name="message"]', 'Hello, this is a test message.');
    await page.click('button[type="submit"]');

    // Verify a success notification appears
    const successMessage = page.locator('.notification-success, .alert-success, .toast-success');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText(/thank you|success/i);
  });
});