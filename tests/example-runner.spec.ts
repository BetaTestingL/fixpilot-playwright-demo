import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import path from 'path';

test('example.spec.js executes with zero failures', async () => {
  // Resolve the path to the JavaScript spec relative to the project root
  const specPath = path.resolve('tests', 'example.spec.js');

  // Run the existing Playwright test file in a separate process.
  // `execSync` will throw if the command exits with a non‑zero status,
  // which indicates one or more test failures.
  let executionError: Error | null = null;
  try {
    execSync(`npx playwright test "${specPath}" --reporter=list`, {
      stdio: 'ignore', // suppress output; CI will capture logs separately
    });
  } catch (err) {
    executionError = err as Error;
  }

  // Assert that the test runner completed without errors (i.e., zero failures)
  expect(executionError).toBeNull();
});