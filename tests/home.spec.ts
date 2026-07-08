import { test, expect } from '@playwright/test';

test.describe('Home page functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the welcome banner', async ({ page }) => {
    const banner = page.locator('[data-test-id="welcome-banner"]');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('Welcome to FixPilot');
  });

  test('should allow user to submit the contact form', async ({ page }) => {
    // Fill out the contact form – selectors are assumed
    await page.fill('[data-test-id="contact-name"]', 'John Doe');
    await page.fill('[data-test-id="contact-email"]', 'john.doe@example.com');
    await page.fill('[data-test-id="contact-message"]', 'This is a test message.');
    await page.click('[data-test-id="contact-submit"]');

    // Expect a success toast/message
    const toast = page.locator('[data-test-id="toast-success"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(/Message sent successfully/i);
  });
});