// @ts-check
import { test, expect } from '@playwright/test';

// Note: This is just an example file that may not be used in your actual testing
// If this is only an example, you can leave it as is or update it to use your testing URL

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Exercise/);
});

test('get started link', async ({ page }) => {
  await page.goto('/');

  // Click the Products link
  await page.getByRole('link', { name: 'Products' }).click();

  // Expects page to have a heading with the name of All Products
  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
});
