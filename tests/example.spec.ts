import { test, expect } from '@playwright/test';

test.describe('Demo Application – Core UI', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test.
    await page.goto('/');
  });

  test('should display the welcome banner on the home page', async ({ page }) => {
    const welcomeBanner = page.locator('h1:has-text("Welcome to FixPilot Demo")');
    await expect(welcomeBanner).toBeVisible();
    await expect(welcomeBanner).toHaveText(/FixPilot Demo/i);
  });

  test('should navigate to the About page and verify its heading', async ({ page }) => {
    // Click the About navigation link.
    await page.click('nav >> a[href="/about"]');

    // Verify that the URL is correct.
    await expect(page).toHaveURL(/.*\/about/);

    // Verify the About page heading.
    const aboutHeading = page.locator('h1:has-text("About")');
    await expect(aboutHeading).toBeVisible();
    await expect(aboutHeading).toHaveText('About');
  });

  test('should open the contact modal and submit a valid inquiry', async ({ page }) => {
    // Open the contact modal.
    await page.click('button#open-contact-modal');

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Fill out the contact form.
    await modal.fill('input[name="name"]', 'Playwright Tester');
    await modal.fill('input[name="email"]', 'tester@example.com');
    await modal.fill('textarea[name="message"]', 'This is an automated test message.');

    // Submit the form.
    await modal.click('button[type="submit"]');

    // Verify success notification.
    const toast = page.locator('.toast-success');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(/thank you for your message/i);
  });
});