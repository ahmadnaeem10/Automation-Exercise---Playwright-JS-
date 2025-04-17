import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test('Test Case 22: Add to cart from Recommended items', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    
    // Step 1 & 2: Launch browser and navigate to url
    await page.goto('/');
    
    // Step 3: Scroll to bottom of page
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight - 500);
    });
    
    // Step 4: Verify 'RECOMMENDED ITEMS' are visible
    const recommendedItemsHeader = page.locator('h2:has-text("RECOMMENDED ITEMS")');
    await expect(recommendedItemsHeader).toBeVisible();
    
    // Verify recommended products carousel is visible
    const recommendedItemsCarousel = page.locator('#recommended-item-carousel');
    await expect(recommendedItemsCarousel).toBeVisible();
    
    // Step 5: Click on 'Add To Cart' on Recommended product
    // Wait for carousel to initialize - use non-timeout approach
    await page.waitForLoadState('domcontentloaded');
    
    // Ensure the carousel section is in view
    await recommendedItemsHeader.scrollIntoViewIfNeeded();
    
    // Get all products in the carousel (not just active ones)
    const recommendedProducts = recommendedItemsCarousel.locator('.product-image-wrapper');
    
    // Make sure there are products in the carousel
    const productCount = await recommendedProducts.count();
    console.log(`Found ${productCount} recommended products`);
    expect(productCount).toBeGreaterThan(0);
    
    // Get the first product
    const firstProduct = recommendedProducts.first();
    
    // Scroll it into view and hover
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.hover();
    
    // Allow a brief moment for the overlay to appear but without explicit timeout
    await page.waitForLoadState('networkidle');
    
    // Find and click the Add to Cart button directly within this product
    const addToCartButton = firstProduct.locator('.add-to-cart');
    await addToCartButton.click({ force: true });
    
    // Wait for the modal to be visible
    await page.waitForSelector('.modal-content', { state: 'visible' });
    
    // Step 6: Click on 'View Cart' button - using modal-specific selector
    await page.locator('.modal-body a[href="/view_cart"]').click();
    
    // Step 7: Verify that product is displayed in cart page
    await cartPage.verifyProductInCart();
    
    console.log('Test Case 22 completed successfully: Added a product from Recommended Items to cart');
});