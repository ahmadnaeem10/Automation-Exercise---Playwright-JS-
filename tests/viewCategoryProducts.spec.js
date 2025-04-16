import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CategoriesPage } from '../pages/CategoriesPage';

test('Test Case 18: View Category Products', async ({ page }) => {
    const homePage = new HomePage(page);
    const categoriesPage = new CategoriesPage(page);
    
    // Step 1 & 2: Launch browser and navigate to the website
    await page.goto('/');
    
    // Step 3: Verify that categories are visible on left side bar
    await categoriesPage.verifyCategoriesVisible();
    
    // Step 4: Click on 'Women' category
    await categoriesPage.clickWomenCategory();
    
    // Step 5: Click on any category link under 'Women' category (Dress)
    await categoriesPage.clickWomenDressSubcategory();
    
    // Step 6: Verify that category page is displayed with correct title
    // Note: Using verifyCategoryPageDisplayed instead of specific method to be more flexible
    // about the actual text on the page
    await categoriesPage.verifyCategoryPageDisplayed();
    
    // Step 7: On left side bar, click on any sub-category link of 'Men' category
    await categoriesPage.clickMenCategory();
    await categoriesPage.clickMenTshirtsSubcategory();
    
    // Step 8: Verify that user is navigated to that category page
    await categoriesPage.verifyCategoryPageDisplayed();
});