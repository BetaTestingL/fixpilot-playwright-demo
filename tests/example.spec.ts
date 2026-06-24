import { test, expect } from '@playwright/test';

test.describe('Demo Application – Core Flows', () => {
  // Runs before each test in this describe block.
  test.beforeEach(async ({ page }) => {
    // Assuming the baseURL is defined in playwright.config.ts.
    await page.goto('/');
  });

  test('should display the main heading on the home page', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/welcome/i);
  });

  test('should allow a user to submit the contact form successfully', async ({
    page,
  }) => {
    // Navigate to the contact page.
    await page.click('nav >> text=Contact');

    // Fill out the form.
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john.doe@example.com');
    await page.fill('#message', 'This is an automated test message.');

    // Submit the form.
    await Promise.all([
      page.waitForResponse((response) =>
        response.url().includes('/api/contact') && response.status() === 200,
      ),
      page.click('button[type="submit"]'),
    ]);

    // Verify success notification.
    const toast = page.locator('.toast-success');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Thank you for contacting us');
  });

  test('should navigate to the About page and verify content', async ({
    page,
  }) => {
    await page.click('nav >> text=About');

    const title = page.locator('h2');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('About Us');

    const paragraph = page.locator('section.about p');
    await expect(paragraph).toBeVisible();
    await expect(paragraph).toContainText('Our mission');
  });
});