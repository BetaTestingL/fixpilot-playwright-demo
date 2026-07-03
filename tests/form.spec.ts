import { test, expect } from '@playwright/test';

test.describe('Sample data entry form', () => {
  test('submits the contact form successfully', async ({ page }) => {
    await page.goto('/contact');

    // Fill out the contact form fields
    await page.getByLabel(/first name/i).fill('Jane');
    await page.getByLabel(/last name/i).fill('Doe');
    await page.getByLabel(/email/i).fill('jane.doe@example.com');
    await page.getByLabel(/message/i).fill('I love the FixPilot demo!');

    // Submit the form
    await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/contact') && resp.status() === 200),
      page.getByRole('button', { name: /send message/i }).click(),
    ]);

    // Verify success notification
    const toast = page.locator('.toast-success');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(/thank you for your message/i);
  });

  test('validates required fields before submission', async ({ page }) => {
    await page.goto('/contact');

    // Attempt to submit the form without filling any fields
    await page.getByRole('button', { name: /send message/i }).click();

    // Expect validation messages for each required field
    const requiredMessages = page.locator('.validation-error');
    await expect(requiredMessages).toHaveCount(4);
    await expect(requiredMessages.nth(0)).toHaveText(/first name is required/i);
    await expect(requiredMessages.nth(1)).toHaveText(/last name is required/i);
    await expect(requiredMessages.nth(2)).toHaveText(/email is required/i);
    await expect(requiredMessages.nth(3)).toHaveText(/message is required/i);
  });
});