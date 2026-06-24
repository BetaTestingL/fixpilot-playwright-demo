import { test, expect } from '@playwright/test';

test.describe('Contact form submission', () => {
  const contactUrl = 'https://demo.fixpilot.com/contact';

  test.beforeEach(async ({ page }) => {
    await page.goto(contactUrl);
  });

  test('should submit the contact form successfully', async ({ page }) => {
    await page.fill('input[data-test="contact-name"]', 'John Doe');
    await page.fill('input[data-test="contact-email"]', 'john.doe@example.com');
    await page.fill('textarea[data-test="contact-message"]', 'I would like to know more about your product.');

    const submitBtn = page.locator('button[data-test="contact-submit"]');
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // Verify success toast/message
    const successToast = page.locator('[role="alert"][data-test="contact-success"]');
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText(/thank you for contacting us/i);
  });

  test('should display field‑specific validation errors', async ({ page }) => {
    // Submit empty form
    await page.locator('button[data-test="contact-submit"]').click();

    const nameError = page.locator('span[data-test="error-name"]');
    const emailError = page.locator('span[data-test="error-email"]');
    const messageError = page.locator('span[data-test="error-message"]');

    await expect(nameError).toHaveText(/required/i);
    await expect(emailError).toHaveText(/valid email/i);
    await expect(messageError).toHaveText(/required/i);
  });
});