import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
    test.slow(); 
    const productPage = new ProductPage(page); 

    // Step 1 & 2: Launch and Navigate
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Step 3: Verify homepage is visible
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

    // Step 4: Click on 'Products' button
    await productPage.clickProductsButton();

    // Step 5 & 6: Verify ALL PRODUCTS page and product list
    await productPage.verifyProductsPageVisible();

    // Step 7: Click on 'View Product' of first product
    await productPage.clickFirstProductView();

    // Step 8 & 9: Verify product detail is visible
    await productPage.verifyProductDetailPageVisible();
});

