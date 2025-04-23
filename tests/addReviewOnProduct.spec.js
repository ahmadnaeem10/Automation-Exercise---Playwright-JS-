import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import env from '../utils/env';

test('Test Case 21: Add review on product', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    // Step 1 & 2: Launch browser and navigate to url
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Step 3: Verify home page is visible
    await homePage.verifyHomePage();
    
    // Step 4: Click on 'Products' button
    await productPage.clickProductsButton();
    
    // Step 5: Verify user is navigated to ALL PRODUCTS page successfully
    await productPage.verifyProductsPageVisible();
    
    // Step 6: Click on 'View Product' button
    await productPage.clickFirstProductView();
    
    // Step 7: Verify 'Write Your Review' is visible
    await productPage.verifyWriteYourReviewVisible();
    
    // Step 8: Enter name, email and review
    await productPage.enterReviewDetails({
        name: env.USER_NAME,
        email: env.USER_EMAIL,
        review: env.CONTACT_MESSAGE // Reusing contact message field for review content
    });
    
    // Step 9: Click 'Submit' button
    await productPage.submitReview();
    
    // Step 10: Verify success message 'Thank you for your review.'
    await productPage.verifyReviewSuccessMessage();
});