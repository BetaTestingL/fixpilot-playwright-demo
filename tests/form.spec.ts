import { test, expect } from '@playwright/test';

test.describe('Reusable Form Component', () => {
  test('validates required fields and shows error messages', async ({ page }) => {
    await page.goto('/signup');

    // Submit without filling fields
    await page.getByRole('button', { name: /sign up/i }).click();

    const nameError = page.getByText(/name is required/i);
    const emailError = page.getByText(/email is required/i);
    const passwordError = page.getByText(/password is required/i);

    await expect(nameError).toBeVisible();
    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();

    // Fill valid data
    await page.getByLabel('Name').fill('Alice');
    await page.getByLabel('Email').fill('alice@example.com');
    await page.getByLabel('Password').fill('StrongPass!123');

    // Errors should disappear
    await expect(nameError).toBeHidden();
    await expect(emailError).toBeHidden();
    await expect(passwordError).toBeHidden();

    // Successful submission
    await page.getByRole('button', { name: /sign up/i }).click();
    const successBanner = page.getByRole('alert').filter({ hasText: /welcome, alice/i });
    await expect(successBanner).toBeVisible();
  });
});