import { test, expect } from '@playwright/test';

test.describe('FixPilot Demo Application', () => {
  // Runs before each test in this describe block.
  test.beforeEach(async ({ page }) => {
    // Base URL is defined in playwright.config.ts; navigating to the root of the app.
    await page.goto('/');
  });

  test('should display the main heading on the home page', async ({ page }) => {
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText(/FixPilot Demo/i);
  });

  test('should navigate to the About page via the navigation link', async ({ page }) => {
    // Assuming a navigation bar with a link that contains the text "About".
    await page.click('nav >> text=About');

    // Verify URL contains /about and the page loads the expected header.
    await expect(page).toHaveURL(/.*\/about/);
    const aboutHeader = page.locator('h2');
    await expect(aboutHeader).toBeVisible();
    await expect(aboutHeader).toHaveText(/About Us/i);
  });

  test('should submit the contact form successfully', async ({ page }) => {
    // Navigate to the Contact page.
    await page.click('nav >> text=Contact');
    await expect(page).toHaveURL(/.*\/contact/);

    // Fill out the contact form. Selectors are assumed based on common naming conventions.
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('textarea[name="message"]', 'This is an automated test message.');

    // Submit the form.
    await page.click('button[type="submit"]');

    // Verify a success notification appears.
    const successNotification = page.locator('.notification-success');
    await expect(successNotification).toBeVisible();
    await expect(successNotification).toHaveText(/Thank you for your message/i);
  });
});