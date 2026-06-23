import { test, expect } from '@playwright/test';

test.describe('Core Demo Workflow', () => {
  // This test runs on every browser defined in the Playwright config (Chromium, Firefox, WebKit)
  test('should navigate to the demo page, perform actions and validate results', async ({ page }) => {
    // 1. Go to the demo application (replace with the actual URL of the demo)
    await page.goto('https://demo.fixpilot.com');

    // 2. Verify that the page loaded correctly
    await expect(page).toHaveURL(/.*demo\.fixpilot\.com/);
    await expect(page.locator('h1')).toHaveText(/FixPilot Demo/i);

    // 3. Interact with the login form (assumed selectors)
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'Password123!');
    await page.click('button[type="submit"]');

    // 4. Wait for navigation after login and verify successful login
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('.welcome-message')).toContainText('Welcome, testuser');

    // 5. Perform a core workflow action – e.g., create a new project
    await page.click('button#create-project');
    await page.fill('#project-name', 'Playwright Automation');
    await page.click('button#save-project');

    // 6. Validate that the new project appears in the project list
    const projectRow = page.locator('table#projects tbody tr').filter({ hasText: 'Playwright Automation' });
    await expect(projectRow).toBeVisible();

    // 7. Clean‑up: delete the created project to keep the environment stable
    await projectRow.locator('button.delete-project').click();
    await page.click('button.confirm-delete');

    // 8. Ensure the project was removed
    await expect(page.locator('table#projects tbody tr').filter({ hasText: 'Playwright Automation' })).toHaveCount(0);
  });
});