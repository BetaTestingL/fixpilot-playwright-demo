import { test, expect } from '@playwright/test';

test.describe('Demo Application', () => {
  test('should load the home page and display the main heading', async ({ page }) => {
    // Navigate to the base URL defined in playwright.config.ts (or fallback to localhost)
    await page.goto('/');

    // Verify that the main heading exists and contains expected text
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText(/fixpilot|demo/i);
  });

  test('should navigate to the About page and verify its content', async ({ page }) => {
    await page.goto('/');

    // Click on a navigation link that leads to the About page
    await page.click('nav >> text=About');

    // Ensure the URL changed accordingly
    await expect(page).toHaveURL(/.*\/about/);

    // Verify that the About page header is present
    const aboutHeader = page.locator('h2');
    await expect(aboutHeader).toBeVisible();
    await expect(aboutHeader).toContainText('About');
  });

  test('should submit the contact form successfully', async ({ page }) => {
    // Open the contact page directly
    await page.goto('/contact');

    // Fill out the contact form fields
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message from Playwright.');

    // Submit the form
    await page.click('button:has-text("Submit")');

    // Verify that a success message appears
    const successMessage = page.locator('text=Thank you for your message');
    await expect(successMessage).toBeVisible();
  });
});