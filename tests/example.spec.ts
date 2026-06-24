import { test, expect } from '@playwright/test';

test.describe('Example suite (converted to TypeScript)', () => {
  test('should load the example page and display expected content', async ({ page }) => {
    await page.goto('/example');
    const title = page.getByRole('heading', { name: /Example Page/i });
    await expect(title).toBeVisible();

    const description = page.getByText(/This is a demonstration of the FixPilot Playwright demo application/i);
    await expect(description).toBeVisible();
  });

  test('should interact with the dynamic list correctly', async ({ page }) => {
    await page.goto('/example');

    // Add a new item to the list.
    const newItemInput = page.getByPlaceholder('Enter new item');
    await newItemInput.fill('Playwright Test Item');
    await page.getByRole('button', { name: /Add Item/i }).click();

    // Verify the item appears in the list.
    const addedItem = page.getByRole('listitem').filter({ hasText: 'Playwright Test Item' });
    await expect(addedItem).toBeVisible();

    // Remove the item.
    await addedItem.getByRole('button', { name: /Delete/i }).click();

    // Ensure the item is no longer present.
    await expect(addedItem).toHaveCount(0);
  });
});