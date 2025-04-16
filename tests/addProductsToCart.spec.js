import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test('Test Case 12: Add Products in Cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // Step 1 & 2: Launch browser and navigate
    await page.goto('/');

    // Step 3: Verify home page is visible
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

    // Step 4: Click 'Products'
    await productPage.clickProductsButton();

    // Step 5: Verify ALL PRODUCTS page
    await productPage.verifyAllProductsPageVisible();

    // Step 6: Add first product to cart
    await productPage.addFirstProductToCart();

    // Step 7: Click 'Continue Shopping'
    await productPage.clickContinueShopping();

    // Step 8: Add second product to cart
    await productPage.addSecondProductToCart();

    // Step 9: Click 'View Cart'
    await productPage.clickViewCartButton();

    // Step 10: Verify both products are in cart
    await cartPage.verifyCartHasTwoProducts();
    // Verify price, quantity and total price
    await cartPage.verifyProductPricesQuantityAndTotal();
});
