import { test, expect } from '@playwright/test';

test.describe('Example flow', () => {
  test('should navigate through the example page and validate UI elements', async ({ page }) => {
    // Go to the example page – adjust the path if the route differs
    await page.goto('/example');

    // Verify that the page loads with the correct heading
    const heading = page.getByRole('heading', { name: /example page/i });
    await expect(heading).toBeVisible();

    // Interact with a sample button (assumed selector)
    const actionButton = page.getByRole('button', { name: /perform action/i });
    await expect(actionButton).toBeEnabled();
    await actionButton.click();

    // After clicking, expect a success message to appear
    const successMessage = page.getByText(/action completed successfully/i);
    await expect(successMessage).toBeVisible();

    // Validate that a specific input field accepts text
    const nameInput = page.getByLabel('Name');
    await expect(nameInput).toBeEditable();
    await nameInput.fill('Playwright Tester');

    // Ensure the entered value is reflected correctly
    await expect(nameInput).toHaveValue('Playwright Tester');
  });
});