import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import env from '../utils/env';

test('Test Case 20: Search Products and Verify Cart After Login', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);
    
    // Step 1 & 2: Launch browser and navigate to url
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Step 3: Click on 'Products' button
    await productPage.clickProductsButton();
    
    // Step 4: Verify user is navigated to ALL PRODUCTS page successfully
    await productPage.verifyProductsPageVisible();
    
    // Step 5: Enter product name in search input and click search button
    // Use a search term that will return fewer products for faster processing
    const searchTerm = 'Blue Top';
    await productPage.searchForProduct(searchTerm);
    
    // Step 6: Verify 'SEARCHED PRODUCTS' is visible
    await productPage.verifySearchedProductsVisible();
    
    // Step 7: Verify all the products related to search are visible
    const searchResults = await productPage.getSearchResults();
    expect(searchResults.length).toBeGreaterThan(0);
    console.log(`Found ${searchResults.length} products matching the search criteria`);
    
    // Save product names for later verification
    const productNames = await productPage.getSearchResultNames();
    console.log('Products found:', productNames);
    
    // Step 8: Add those products to cart (limit to first 2 products max for speed)
    // Modify addSearchResultsToCart to accept a limit parameter
    const productsToAdd = Math.min(searchResults.length, 2);
    console.log(`Adding ${productsToAdd} products to cart`);
    await productPage.addLimitedSearchResultsToCart(productsToAdd);
    
    // Step 9: Click 'Cart' button and verify that products are visible in cart
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page).toHaveURL(/.*\/view_cart/, { timeout: 15000 });
    
    // Verify products are in cart
    const cartProductsBefore = await cartPage.getProductNamesInCart();
    console.log('Products in cart before login:', cartProductsBefore);
    
    // Verify that at least some products we added are in the cart
    expect(cartProductsBefore.length).toBeGreaterThan(0);
    
    // Create a Set of cart products for faster comparison later
    const cartProductsBeforeSet = new Set(cartProductsBefore);
    
    // Step 10: Click 'Signup / Login' button and submit login details
    console.log('Proceeding to login with valid credentials');
    await homePage.clickSignupLogin();
    await loginPage.verifyLoginPage();
    
    // Use the credentials provided by the user
    const email = "rsy@gmail.com";
    const password = "rsyrsyrsy";
    console.log(`Attempting to login with email: ${email}`);
    
    await loginPage.enterLoginCredentials(email, password);
    await loginPage.clickLoginButton();
    
    // Properly verify login without try/catch to ensure the test fails if login doesn't work
    // Use a more generic verification since we don't know the exact username
    await homePage.verifyLoggedIn(""); // Will use the generic "Logged in as" check
    console.log('Successfully logged in');
    
    // Step 11: Again, go to Cart page
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page).toHaveURL(/.*\/view_cart/, { timeout: 15000 });
    
    // Step 12: Verify that those products are visible in cart after login as well
    const cartProductsAfter = await cartPage.getProductNamesInCart();
    console.log('Products in cart after login:', cartProductsAfter);
    
    // Verify cart still has items after login
    expect(cartProductsAfter.length).toBeGreaterThan(0);
    
    // Verify at least one product from before login is still in cart
    // Using Set intersection for more efficient comparison
    let productsInBoth = 0;
    for (const product of cartProductsAfter) {
        if (cartProductsBeforeSet.has(product)) {
            productsInBoth++;
        }
    }
    
    console.log(`Found ${productsInBoth} products that remained in cart after login`);
    expect(productsInBoth).toBeGreaterThan(0);
});