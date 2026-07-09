import { test, expect } from '@playwright/test';

test.describe('Demo Application', () => {
  test('should load the home page and display the main heading', async ({ page }) => {
    // Navigate to the base URL defined in playwright.config.ts
    await page.goto('/');

    // Verify that the main heading is visible and contains expected text
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText(/FixPilot Demo/i);
  });

  test('should navigate to the About page and verify its content', async ({ page }) => {
    await page.goto('/');

    // Click the navigation link to the About page
    await page.click('a[href="/about"]');

    // Verify URL and page content
    await expect(page).toHaveURL(/\/about/);
    const aboutHeader = page.locator('h2');
    await expect(aboutHeader).toBeVisible();
    await expect(aboutHeader).toHaveText(/About/i);
  });

  test('should submit the contact form successfully', async ({ page }) => {
    // Open the contact page
    await page.goto('/contact');

    // Fill out the form fields
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('textarea[name="message"]', 'Hello, this is a test message.');

    // Submit the form
    await page.click('button[type="submit"]');

    // Verify success notification
    const successToast = page.locator('.toast-success');
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText(/Thank you/i);
  });
});