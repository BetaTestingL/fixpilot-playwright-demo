import { test, expect } from '@playwright/test';

test.describe('TodoMVC demo', () => {
  const todoAppUrl = 'https://demo.playwright.dev/todomvc';

  test.beforeEach(async ({ page }) => {
    // Open the TodoMVC demo page before each test
    await page.goto(todoAppUrl);
    await expect(page).toHaveTitle(/TodoMVC/);
  });

  test('should add a new todo item', async ({ page }) => {
    const newTodoInput = page.getByPlaceholder('What needs to be done?');

    // Add a new todo
    await newTodoInput.fill('Write Playwright test');
    await newTodoInput.press('Enter');

    // Verify the new todo appears in the list
    const todoItem = page.getByRole('listitem').filter({ hasText: 'Write Playwright test' });
    await expect(todoItem).toBeVisible();
    await expect(todoItem).toHaveClass(/view/);
  });

  test('should toggle a todo item as completed', async ({ page }) => {
    // Add a todo to toggle
    const newTodoInput = page.getByPlaceholder('What needs to be done?');
    await newTodoInput.fill('Toggle me');
    await newTodoInput.press('Enter');

    const todoItem = page.getByRole('listitem').filter({ hasText: 'Toggle me' });
    const toggleCheckbox = todoItem.getByRole('checkbox');

    // Mark the todo as completed
    await toggleCheckbox.check();

    // Verify the todo item has the completed style
    await expect(todoItem).toHaveClass(/completed/);
  });

  test('should delete a todo item', async ({ page }) => {
    // Add a todo to delete
    const newTodoInput = page.getByPlaceholder('What needs to be done?');
    await newTodoInput.fill('Delete me');
    await newTodoInput.press('Enter');

    const todoItem = page.getByRole('listitem').filter({ hasText: 'Delete me' });

    // Hover to reveal the destroy button and click it
    await todoItem.hover();
    const destroyButton = todoItem.getByRole('button', { name: 'Destroy' });
    await destroyButton.click();

    // Verify the todo item is removed from the DOM
    await expect(todoItem).toBeHidden();
  });
});