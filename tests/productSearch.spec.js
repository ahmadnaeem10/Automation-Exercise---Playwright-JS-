import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import env from '../utils/env';

test.setTimeout(60000);

test('Test Case 9: Search Product', async ({ page }) => {
    const productPage = new ProductPage(page);

    // Step 1 & 2: Launch and Navigate
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Step 3: Verify homepage is visible
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

    // Step 4: Click on 'Products' button
    await productPage.clickProductsButton();

    // Step 5: Verify All Products page
    await productPage.verifyProductsPageVisible();

    // Step 6: Search for product
    await productPage.searchForProduct(env.SEARCH_PRODUCT);

    // Step 7 & 8: Verify searched products section and results
    await productPage.verifySearchedProductsVisible();
});
