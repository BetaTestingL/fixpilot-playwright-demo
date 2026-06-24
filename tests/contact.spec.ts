import { test, expect } from '@playwright/test';

test.describe('Contact page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display the contact form', async ({ page }) => {
    const form = page.locator('form[data-test-id="contact-form"]');
    await expect(form).toBeVisible();

    // Verify required fields are present
    await expect(form.getByLabel('Name')).toBeVisible();
    await expect(form.getByLabel('Email')).toBeVisible();
    await expect(form.getByLabel('Message')).toBeVisible();
  });

  test('should submit the form successfully', async ({ page }) => {
    const form = page.locator('form[data-test-id="contact-form"]');

    await form.getByLabel('Name').fill('Jane Doe');
    await form.getByLabel('Email').fill('jane.doe@example.com');
    await form.getByLabel('Message').fill('I love the demo!');

    await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/contact') && resp.status() === 200),
      form.getByRole('button', { name: /send/i }).click(),
    ]);

    const successToast = page.locator('[data-test-id="toast-success"]');
    await expect(successToast).toBeVisible();
    await expect(successToast).toContainText('Thank you for contacting us');
  });
});