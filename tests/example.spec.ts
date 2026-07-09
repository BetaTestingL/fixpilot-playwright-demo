import { test, expect } from '@playwright/test';

test.describe('Demo Application – Basic Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test.
    await page.goto('/');
  });

  test('should display the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot Demo/);
  });

  test('should navigate to the About page via the main menu', async ({ page }) => {
    // Click the "About" link in the navigation bar.
    await page.getByRole('link', { name: /about/i }).click();

    // Verify URL and page content.
    await expect(page).toHaveURL(/.*\/about/);
    await expect(page.getByRole('heading', { name: /about us/i })).toBeVisible();
  });

  test('should open the contact form modal and submit successfully', async ({ page }) => {
    // Open the contact modal.
    await page.getByRole('button', { name: /contact us/i }).click();

    // Fill out the form.
    await page.fill('[data-test-id="contact-name"]', 'John Doe');
    await page.fill('[data-test-id="contact-email"]', 'john.doe@example.com');
    await page.fill('[data-test-id="contact-message"]', 'Great demo!');

    // Submit the form.
    await page.getByRole('button', { name: /send message/i }).click();

    // Assert success notification.
    const toast = page.getByRole('alert').filter({ hasText: /message sent/i });
    await expect(toast).toBeVisible();
  });
});