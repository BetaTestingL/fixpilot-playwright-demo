import { test, expect } from '@playwright/test';

test.describe('Dashboard interactions', () => {
  test.beforeEach(async ({ page }) => {
    // Log in once for all dashboard tests
    await page.goto('/');
    await page.getByRole('link', { name: /login/i }).click();
    await page.getByLabel('Email').fill('testuser@example.com');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should display a list of items on the dashboard', async ({ page }) => {
    const itemList = page.locator('[data-test-id="item-list"]');
    await expect(itemList).toBeVisible();
    await expect(itemList.locator('li')).toHaveCountGreaterThan(0);
  });

  test('should create a new item via the add‑item form', async ({ page }) => {
    await page.getByRole('button', { name: /add item/i }).click();

    await page.getByLabel('Title').fill('New Playwright Item');
    await page.getByLabel('Description').fill('Created by automated test');
    await page.getByRole('button', { name: /save/i }).click();

    const toast = page.locator('.toast-success');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(/item created successfully/i);

    const newItem = page.locator('li', { hasText: 'New Playwright Item' });
    await expect(newItem).toBeVisible();
  });

  test('should delete an existing item after confirmation', async ({ page }) => {
    // Assume there is at least one item named "Sample Item"
    const targetItem = page.locator('li', { hasText: 'Sample Item' });
    await expect(targetItem).toBeVisible();

    await targetItem.getByRole('button', { name: /delete/i }).click();

    // Confirmation modal
    const confirmButton = page.getByRole('button', { name: /confirm/i });
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();

    await expect(targetItem).not.toBeVisible();
    const toast = page.locator('.toast-success');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(/item deleted successfully/i);
  });
});