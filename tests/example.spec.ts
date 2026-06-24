import { test, expect } from '@playwright/test';

/**
 * Basic sanity check to ensure the Playwright test runner is configured correctly.
 * This test navigates to a blank page and verifies that the page loads without errors.
 */
test('example sanity test – loads a blank page successfully', async ({ page }) => {
  // Navigate to a minimal page that is guaranteed to exist.
  await page.goto('about:blank');

  // Verify that the page URL is exactly what we requested.
  await expect(page).toHaveURL('about:blank');

  // The document should contain a DOCTYPE declaration.
  const doctype = await page.evaluate(() => document.doctype?.name);
  expect(doctype).toBe('html');

  // Ensure the page has no console errors.
  const consoleMessages: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleMessages.push(msg.text());
    }
  });

  // Small wait to capture any late‑firing console errors.
  await page.waitForTimeout(100);
  expect(consoleMessages).toHaveLength(0);
});