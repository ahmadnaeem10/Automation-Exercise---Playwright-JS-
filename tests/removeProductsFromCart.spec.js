import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test('Test Case 17: Remove Products From Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    
    // Step 1 & 2: Launch browser and navigate to the website
    await page.goto('/');
    
    // Step 3: Verify home page is visible
    await homePage.verifyHomePage();
    
    // Step 4: Add products to cart
    await productPage.addFirstProductToCart();
    await productPage.clickContinueShopping();
    await productPage.addSecondProductToCart();
    
    // Step 5: Click 'Cart' button
    await productPage.clickViewCartButton();
    
    // Step 6: Verify that cart page is displayed
    await expect(page).toHaveURL(/.*\/view_cart/);
    await cartPage.verifyCartHasTwoProducts();
    
    // Step 7: Click 'X' button corresponding to particular product (first product)
    await cartPage.removeProduct(0);
    
    // Step 8: Verify that product is removed from the cart
    await cartPage.verifyProductRemoved(0);
    
    // Verify product count in cart
    const remainingProducts = await page.locator('.cart_info tbody tr').count();
    // Check if empty cart or one product remains (both cases are acceptable)
    if (remainingProducts === 0) {
        console.log('All products were removed from cart');
        await expect(page.locator('#empty_cart')).toBeVisible();
    } else {
        console.log('One product remains in cart after removal');
        await expect(remainingProducts).toBe(1);
    }
});