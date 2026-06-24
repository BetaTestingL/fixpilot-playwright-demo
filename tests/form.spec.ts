import { test, expect } from '@playwright/test';

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    // Assume the form is located on the /contact page.
    await page.goto('/contact');
  });

  test('should submit the form successfully', async ({ page }) => {
    // Fill out the form fields.
    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email').fill('john.doe@example.com');
    await page.getByLabel('Message').fill('This is a test message.');

    // Submit the form.
    await page.getByRole('button', { name: /Submit/i }).click();

    // Verify success notification.
    const successToast = page.getByRole('alert').filter({ hasText: /Thank you for your message/i });
    await expect(successToast).toBeVisible();
  });

  test('should show validation errors for empty required fields', async ({ page }) => {
    // Submit without filling any fields.
    await page.getByRole('button', { name: /Submit/i }).click();

    // Expect validation messages.
    const nameError = page.getByText(/Name is required/i);
    const emailError = page.getByText(/Email is required/i);
    await expect(nameError).toBeVisible();
    await expect(emailError).toBeVisible();
  });
});