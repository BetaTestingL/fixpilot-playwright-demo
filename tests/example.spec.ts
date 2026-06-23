import { test, expect } from '@playwright/test';

test.describe('Demo site – basic UI checks', () => {
  // Runs before each test in this describe block.
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo application. Adjust the URL if the app runs on a different host/port.
    await page.goto('https://demo.playwright.dev/todomvc');
    // Ensure the page has loaded by waiting for the main app container.
    await expect(page.locator('#todoapp')).toBeVisible();
  });

  test('should display the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/TodoMVC/);
  });

  test('should allow adding a new todo item', async ({ page }) => {
    const newTodo = page.locator('.new-todo');
    const todoList = page.locator('.todo-list li');

    // Add a new todo.
    await newTodo.fill('Write Playwright test');
    await newTodo.press('Enter');

    // Verify the item appears in the list.
    await expect(todoList).toHaveCount(1);
    await expect(todoList.first()).toContainText('Write Playwright test');
  });

  test('should toggle a todo item as completed', async ({ page }) => {
    const newTodo = page.locator('.new-todo');
    const firstTodoCheckbox = page.locator('.todo-list li >> .toggle').first();
    const firstTodoLabel = page.locator('.todo-list li >> label').first();

    // Add a todo to toggle.
    await newTodo.fill('Toggle me');
    await newTodo.press('Enter');

    // Verify the todo is initially not completed.
    await expect(firstTodoLabel).not.toHaveClass(/completed/);

    // Toggle the todo.
    await firstTodoCheckbox.check();

    // Verify the todo is marked as completed.
    await expect(firstTodoLabel).toHaveClass(/completed/);
  });

  test('should filter active and completed todos correctly', async ({ page }) => {
    const newTodo = page.locator('.new-todo');
    const filterAll = page.locator('text=All');
    const filterActive = page.locator('text=Active');
    const filterCompleted = page.locator('text=Completed');
    const todoItems = page.locator('.todo-list li');

    // Add two todos.
    await newTodo.fill('Active task');
    await newTodo.press('Enter');
    await newTodo.fill('Completed task');
    await newTodo.press('Enter');

    // Complete the second todo.
    await page.locator('.todo-list li >> nth=1 >> .toggle').check();

    // Verify All filter shows both items.
    await filterAll.click();
    await expect(todoItems).toHaveCount(2);

    // Verify Active filter shows only the active item.
    await filterActive.click();
    await expect(todoItems).toHaveCount(1);
    await expect(todoItems.first()).toContainText('Active task');

    // Verify Completed filter shows only the completed item.
    await filterCompleted.click();
    await expect(todoItems).toHaveCount(1);
    await expect(todoItems.first()).toContainText('Completed task');
  });
});