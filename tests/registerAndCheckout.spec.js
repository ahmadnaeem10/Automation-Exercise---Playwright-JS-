import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { SignupPage } from '../pages/SignupPage';
import { AccountPage } from '../pages/AccountPage';
import env from '../utils/env';

test('Test Case 14: Place Order: Register while Checkout', async ({ page }) => {
    // Increase timeout for this complex test flow
    test.setTimeout(120000);
    
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const signupPage = new SignupPage(page);
    const accountPage = new AccountPage(page);

    // Generate a unique email for registration using the utility function
    const uniqueEmail = env.generateUniqueEmail();
    const username = env.USER_NAME;
    
    console.log(`Starting Register-and-Checkout test with email: ${uniqueEmail}`);

    try {
        // Step 1 & 2: Launch browser and navigate to url with reliable loading
        await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
        console.log('Navigated to homepage');
        
        // Step 3: Verify that home page is visible successfully
        await homePage.verifyHomePage();
        
        // Step 4: Add products to cart with retry logic
        let addToCartSuccess = false;
        for (let attempt = 0; attempt < 3 && !addToCartSuccess; attempt++) {
            try {
                console.log(`Attempt ${attempt + 1} to add products to cart`);
                await productPage.addFirstProductToCart();
                await productPage.clickContinueShopping();
                await productPage.addSecondProductToCart();
                addToCartSuccess = true;
                console.log('Successfully added products to cart');
            } catch (error) {
                console.log(`Error adding products to cart: ${error.message}`);
                if (attempt === 2) throw error; // Rethrow on final attempt
                
                // Refresh page and try again
                await page.reload({ waitUntil: 'networkidle' });
                await page.waitForTimeout(1000);
            }
        }
        
        // Step 5: Click 'Cart' button
        await checkoutPage.clickCartButton();
        console.log('Clicked on Cart button');
        
        // Step 6: Verify that cart page is displayed
        await checkoutPage.verifyCartPageDisplayed();
        
        // Step 7: Click Proceed To Checkout
        await checkoutPage.clickProceedToCheckout();
        console.log('Clicked Proceed To Checkout');
        
        // Step 8: Click 'Register / Login' button
        await checkoutPage.clickRegisterLogin();
        console.log('Clicked Register/Login');
        
        // Step 9: Fill all details in Signup and create account
        await signupPage.verifySignupPage();
        await signupPage.enterUserDetails(username, uniqueEmail);
        await signupPage.clickSignupButton();
        console.log('Entered signup details');
        
        // Wait for account creation form with explicit wait
        await page.waitForSelector('#password', { state: 'visible', timeout: 10000 })
            .catch(e => console.log('Warning: Password field not immediately visible, proceeding anyway'));
        
        // Fill account information
        await signupPage.fillAccountDetails({
            password: env.USER_PASSWORD,
            day: env.BIRTH_DAY,
            month: env.BIRTH_MONTH,
            year: env.BIRTH_YEAR
        });
        console.log('Filled account information');
        
        // Fill address information
        await signupPage.fillAddressDetails({
            firstName: env.FIRST_NAME,
            lastName: env.LAST_NAME,
            company: env.COMPANY,
            address: env.ADDRESS1,
            address2: env.ADDRESS2,
            state: env.STATE,
            city: env.CITY,
            zipcode: env.ZIPCODE,
            mobileNumber: env.MOBILE_NUMBER
        });
        console.log('Filled address information');
        
        await signupPage.clickCreateAccount();
        console.log('Clicked Create Account');
        
        // Step 10: Verify 'ACCOUNT CREATED!' and click 'Continue' button with retry
        await accountPage.verifyAccountCreated();
        try {
            await accountPage.clickContinue();
        } catch (continueError) {
            console.log('Error clicking continue button:', continueError.message);
            // Try alternative approach - direct navigation
            await page.goto('/');
            await page.waitForLoadState('networkidle');
        }
        console.log('Account created and clicked Continue');
        
        // Step 11: Verify 'Logged in as username' at top
        // Wait for potential ads or overlays to clear
        await page.waitForTimeout(2000);
        await homePage.verifyLoggedIn(username);
        console.log('Successfully verified login with username');
        
        // Step 12: Click 'Cart' button
        await checkoutPage.clickCartButton();
        console.log('Clicked on Cart button again');
        
        // Step 13: Click 'Proceed To Checkout' button
        await checkoutPage.clickProceedToCheckout();
        console.log('Clicked on Proceed To Checkout again');
        
        // Step 14: Verify Address Details and Review Your Order
        await checkoutPage.verifyAddressAndOrderDetails();
        console.log('Verified address details and order review');
        
        // Step 15: Enter description in comment text area and click 'Place Order'
        await checkoutPage.enterCommentAndPlaceOrder(env.ORDER_COMMENT);
        console.log('Entered comment and placed order');
        
        // Step 16 & 17: Enter payment details and click 'Pay and Confirm Order'
        await checkoutPage.fillPaymentDetails({
            nameOnCard: env.CARD_NAME,
            cardNumber: env.CARD_NUMBER,
            cvc: env.CARD_CVC,
            expiryMonth: env.CARD_EXPIRY_MONTH,
            expiryYear: env.CARD_EXPIRY_YEAR
        });
        console.log('Filled payment details');
        
        await checkoutPage.clickPayAndConfirmOrder();
        console.log('Clicked on Pay and Confirm Order');
        
        // Step 18: Verify success message with screenshot for verification
        await page.screenshot({ path: './test-results/order-confirmation.png' });
        await checkoutPage.verifyOrderPlacedSuccessfully();
        console.log('Verified order placed successfully');
        
        // Step 19: Click 'Delete Account' button
        await homePage.deleteAccount();
        console.log('Clicked Delete Account');
        
        // Step 20: Verify 'ACCOUNT DELETED!' and click 'Continue' button
        await accountPage.verifyAccountDeleted();
        console.log('Test completed successfully');
    } catch (error) {
        console.error(`Test failed: ${error.message}`);
        
        // Take a screenshot on failure for debugging
        await page.screenshot({ path: './test-results/register-checkout-error.png' });
        
        throw error; // Re-throw to fail the test
    }
});