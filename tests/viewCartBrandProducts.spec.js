import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { BrandsPage } from '../pages/BrandsPage';

test('Test Case 19: View & Cart Brand Products', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const brandsPage = new BrandsPage(page);
    
    // Step 1 & 2: Launch browser and navigate to the website
    await page.goto('/');
    
    // Step 3: Click on 'Products' button
    await productPage.clickProductsButton();
    
    // Step 4: Verify that Brands are visible on left side bar
    await brandsPage.verifyBrandsAreVisible();
    
    // Step 5: Click on any brand name (Polo)
    await brandsPage.clickPoloBrand();
    
    // Step 6: Verify that user is navigated to brand page and brand products are displayed
    await brandsPage.verifyBrandPage('Polo');
    
    // Step 7: On left side bar, click on any other brand link (H&M)
    await brandsPage.clickHMBrand();
    
    // Step 8: Verify that user is navigated to that brand page and can see products
    await brandsPage.verifyBrandPage('H&M');
});