import { test, expect } from '@playwright/test';

test.describe('Sample form submission', () => {
  const formData = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
  };

  test.beforeEach(async ({ page }) => {
    // Navigate to the form page.
    await page.goto('/sample-form');
  });

  test('should display all required form fields', async ({ page }) => {
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="lastName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors when required fields are empty', async ({ page }) => {
    await page.click('button[type="submit"]');

    const firstNameError = page.locator('[data-test-id="error-firstName"]');
    const lastNameError = page.locator('[data-test-id="error-lastName"]');
    const emailError = page.locator('[data-test-id="error-email"]');

    await expect(firstNameError).toBeVisible();
    await expect(lastNameError).toBeVisible();
    await expect(emailError).toBeVisible();
  });

  test('should submit the form successfully with valid data', async ({ page }) => {
    await page.fill('input[name="firstName"]', formData.firstName);
    await page.fill('input[name="lastName"]', formData.lastName);
    await page.fill('input[name="email"]', formData.email);
    await page.click('button[type="submit"]');

    // Expect a success message and that the URL stays on the same page (or redirects as per app design).
    const successMessage = page.locator('[data-test-id="form-success"]');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText(/thank you for your submission/i);
  });
});