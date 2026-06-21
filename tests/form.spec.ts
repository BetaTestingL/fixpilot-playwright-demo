import { test, expect } from '@playwright/test';

test.describe('Create Ticket form', () => {
  test.beforeEach(async ({ page }) => {
    // Assume the user must be logged in to access the form
    await page.goto('/login');
    await page.fill('[data-test-id="login-email"]', 'user@example.com');
    await page.fill('[data-test-id="login-password"]', 'Password123!');
    await page.click('[data-test-id="login-submit"]');
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Navigate to the ticket creation page
    await page.goto('/tickets/new');
    await expect(page.locator('[data-test-id="ticket-form"]')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Submit without filling anything
    await page.click('[data-test-id="ticket-submit"]');

    const titleError = page.locator('[data-test-id="ticket-title-error"]');
    const descriptionError = page.locator('[data-test-id="ticket-description-error"]');

    await expect(titleError).toBeVisible();
    await expect(titleError).toHaveText(/required/i);
    await expect(descriptionError).toBeVisible();
    await expect(descriptionError).toHaveText(/required/i);
  });

  test('should create a ticket successfully', async ({ page }) => {
    await page.fill('[data-test-id="ticket-title"]', 'Sample Issue');
    await page.fill('[data-test-id="ticket-description"]', 'The application crashes on launch.');
    await page.selectOption('[data-test-id="ticket-priority"]', 'high');
    await page.click('[data-test-id="ticket-submit"]');

    // Expect a success toast and redirection to ticket detail page
    const toast = page.locator('[data-test-id="toast-success"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(/ticket created successfully/i);

    await expect(page).toHaveURL(/.*\/tickets\/\d+/);
    await expect(page.locator('[data-test-id="ticket-detail-title"]')).toHaveText('Sample Issue');
  });
});