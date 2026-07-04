import { test, expect } from '@playwright/test';

test.describe('Demo Application – Core UI Flow', () => {
  // Runs before each test in this describe block.
  test.beforeEach(async ({ page }) => {
    // Assuming the base URL is defined in playwright.config.ts
    await page.goto('/');
  });

  test('should display the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot Demo/i);
  });

  test('should navigate to the About page via the main menu', async ({ page }) => {
    // Main navigation menu – assume it has a data-test-id attribute.
    const aboutMenuItem = page.getByRole('link', { name: /about/i });
    await expect(aboutMenuItem).toBeVisible();
    await aboutMenuItem.click();

    // Verify URL and page content.
    await expect(page).toHaveURL(/.*\/about/);
    await expect(page.getByRole('heading', { name: /about us/i })).toBeVisible();
  });

  test('should allow a user to log in with valid credentials', async ({ page }) => {
    // Open login modal/dialog.
    const loginButton = page.getByRole('button', { name: /login/i });
    await loginButton.click();

    // Fill in the login form.
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Password').fill('Password123!');
    await page.getByRole('button', { name: /submit/i }).click();

    // Assert successful login – e.g., user avatar appears.
    const userAvatar = page.getByTestId('user-avatar');
    await expect(userAvatar).toBeVisible();
    await expect(userAvatar).toHaveAttribute('alt', /testuser/i);
  });

  test('should display validation errors for empty login fields', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: /login/i });
    await loginButton.click();

    // Submit without entering data.
    await page.getByRole('button', { name: /submit/i }).click();

    // Expect validation messages.
    const usernameError = page.getByText(/username is required/i);
    const passwordError = page.getByText(/password is required/i);
    await expect(usernameError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });

  test('should filter the items list correctly', async ({ page }) => {
    // Navigate to the items list page.
    await page.getByRole('link', { name: /items/i }).click();
    await expect(page).toHaveURL(/.*\/items/);

    // Apply a filter – assume there is a select dropdown.
    const filterSelect = page.getByLabel('Category');
    await filterSelect.selectOption('electronics');

    // Verify that only items belonging to the selected category are shown.
    const visibleItems = page.locator('.item-card');
    const count = await visibleItems.count();
    for (let i = 0; i < count; ++i) {
      const categoryTag = visibleItems.nth(i).locator('.category-tag');
      await expect(categoryTag).toHaveText(/electronics/i);
    }
  });

  test('should handle pagination controls', async ({ page }) => {
    // Go to a paginated list page.
    await page.getByRole('link', { name: /reports/i }).click();
    await expect(page).toHaveURL(/.*\/reports/);

    // Verify that the first page is active.
    const firstPageButton = page.getByRole('button', { name: '1' });
    await expect(firstPageButton).toHaveAttribute('aria-current', 'page');

    // Navigate to the next page.
    const nextPageButton = page.getByRole('button', { name: /next/i });
    await nextPageButton.click();

    // Verify that page 2 is now active.
    const secondPageButton = page.getByRole('button', { name: '2' });
    await expect(secondPageButton).toHaveAttribute('aria-current', 'page');
  });
});