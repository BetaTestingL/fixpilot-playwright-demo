import { test, expect } from '@playwright/test';

test.describe('Example spec (converted from JavaScript)', () => {
  test('should display the example component and respond to interaction', async ({ page }) => {
    // Navigate to the example page
    await page.goto('/example');

    // Verify the example component is rendered
    const exampleComponent = page.locator('[data-test-id="example-component"]');
    await expect(exampleComponent).toBeVisible();

    // Check initial state text
    const statusText = exampleComponent.locator('.status');
    await expect(statusText).toHaveText('Status: idle');

    // Perform an action (e.g., click a button) that changes the state
    const actionButton = exampleComponent.getByRole('button', { name: /Start/i });
    await expect(actionButton).toBeEnabled();
    await actionButton.click();

    // Verify the state updates accordingly
    await expect(statusText).toHaveText('Status: running');

    // Wait for the operation to complete and verify final state
    await expect(statusText).toHaveText('Status: completed', { timeout: 5000 });
  });
});