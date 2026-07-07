import { test, expect } from '@playwright/test';

test.describe('Sample Form Submission', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to the form page.
    await page.goto('/sample-form');
  });

  test('should submit the form with valid data and display success message', async ({ page }) => {
    // Fill out the form fields.
    await page.getByLabel(/first name/i).fill('John');
    await page.getByLabel(/last name/i).fill('Doe');
    await page.getByLabel(/email/i).fill('john.doe@example.com');
    await page.getByLabel(/age/i).fill('30');

    // Select an option from a dropdown.
    await page.getByLabel(/country/i).selectOption({ label: 'United States' });

    // Check a terms & conditions checkbox.
    await page.getByLabel(/agree to terms/i).check();

    // Submit the form.
    await page.getByRole('button', { name: /submit/i }).click();

    // Verify success toast/message appears.
    const successToast = page.getByRole('alert').filter({ hasText: /form submitted successfully/i });
    await expect(successToast).toBeVisible();

    // Optionally verify that the form is reset.
    await expect(page.getByLabel(/first name/i)).toHaveValue('');
  });

  test('should show validation errors when required fields are missing', async ({ page }) => {
    // Submit the form without filling any fields.
    await page.getByRole('button', { name: /submit/i }).click();

    // Expect validation messages for each required field.
    const requiredFields = ['first name', 'last name', 'email', 'country', 'agree to terms'];
    for (const field of requiredFields) {
      const error = page.getByRole('alert').filter({ hasText: new RegExp(`${field}.*required`, 'i') });
      await expect(error).toBeVisible();
    }
  });
});