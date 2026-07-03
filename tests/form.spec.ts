import { test, expect } from '@playwright/test';

test.describe('Contact form', () => {
  test('should submit the contact form successfully', async ({ page }) => {
    // Open the contact page
    await page.goto('/contact');

    // Fill out the form fields
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message from Playwright.');

    // Submit the form
    const submitButton = page.getByRole('button', { name: /Send Message/i });
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // Verify success notification
    const successToast = page.locator('.toast-success');
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText(/Thank you for your message/i);
  });

  test('should display validation errors for empty required fields', async ({ page }) => {
    await page.goto('/contact');

    // Attempt to submit without filling fields
    const submitButton = page.getByRole('button', { name: /Send Message/i });
    await submitButton.click();

    // Expect validation messages
    const nameError = page.locator('#name-error');
    const emailError = page.locator('#email-error');
    const messageError = page.locator('#message-error');

    await expect(nameError).toHaveText(/Name is required/i);
    await expect(emailError).toHaveText(/Email is required/i);
    await expect(messageError).toHaveText(/Message is required/i);
  });
});