import { test, expect } from '@playwright/test';

test.describe('Todo application end‑to‑end flow', () => {
  const newTodo = 'Write Playwright tests';

  test.beforeEach(async ({ page }) => {
    // Assuming the todo app is served at /todos
    await page.goto('/todos');
    // Ensure the list starts empty for a clean state
    await page.evaluate(() => {
      // Clear local storage / indexedDB if the app uses it
      localStorage.clear();
    });
    await page.reload();
  });

  test('should add a new todo item', async ({ page }) => {
    await page.fill('[data-test-id="new-todo-input"]', newTodo);
    await page.press('[data-test-id="new-todo-input"]', 'Enter');

    const todoItem = page.locator('ul[data-test-id="todo-list"] >> li', { hasText: newTodo });
    await expect(todoItem).toBeVisible();
    await expect(todoItem).toHaveAttribute('data-completed', 'false');
  });

  test('should toggle a todo item as completed', async ({ page }) => {
    // Add the item first
    await page.fill('[data-test-id="new-todo-input"]', newTodo);
    await page.press('[data-test-id="new-todo-input"]', 'Enter');

    const todoItem = page.locator('ul[data-test-id="todo-list"] >> li', { hasText: newTodo });
    const toggle = todoItem.locator('[data-test-id="toggle-complete"]');
    await toggle.click();

    await expect(todoItem).toHaveAttribute('data-completed', 'true');
    // Optionally verify visual style (e.g., line‑through)
    await expect(todoItem).toHaveCSS('text-decoration-line', 'line-through');
  });

  test('should delete a todo item', async ({ page }) => {
    // Add the item first
    await page.fill('[data-test-id="new-todo-input"]', newTodo);
    await page.press('[data-test-id="new-todo-input"]', 'Enter');

    const todoItem = page.locator('ul[data-test-id="todo-list"] >> li', { hasText: newTodo });
    const deleteBtn = todoItem.locator('[data-test-id="delete-todo"]');
    await deleteBtn.click();

    await expect(todoItem).toBeHidden();
    // Verify the list is empty
    await expect(page.locator('ul[data-test-id="todo-list"] >> li')).toHaveCount(0);
  });
});