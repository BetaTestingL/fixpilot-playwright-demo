import { test, expect } from '@playwright/test';

test.describe('FixPilot Demo Application', () => {
  test('should load the home page and display the main heading', async ({ page }) => {
    // Navigate to the base URL defined in playwright.config.ts
    await page.goto('/');

    // Verify the page title contains the application name
    await expect(page).toHaveTitle(/FixPilot/i);

    // Verify the main heading is visible and has the expected text
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText('Welcome to FixPilot');
  });

  test('should navigate to the About page via the navigation link', async ({ page }) => {
    await page.goto('/');

    // Click the "About" link in the navigation bar
    const aboutLink = page.locator('nav >> text=About');
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    // Verify the URL changed to the About page
    await expect(page).toHaveURL(/.*\/about/);

    // Verify the About page header is displayed correctly
    const aboutHeader = page.locator('h2');
    await expect(aboutHeader).toBeVisible();
    await expect(aboutHeader).toHaveText('About FixPilot');
  });

  test('should submit the contact form successfully', async ({ page }) => {
    await page.goto('/contact');

    // Fill out the contact form fields
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message from Playwright.');

    // Submit the form
    await page.click('button[type="submit"]');

    // Verify a success notification appears
    const successToast = page.locator('.toast-success');
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText(/thank you/i);
  });
});