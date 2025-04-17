import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { SignupPage } from '../pages/SignupPage';
import { AccountPage } from '../pages/AccountPage';
import env from '../utils/env';

test('Test Case 23: Verify address details in checkout page', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const signupPage = new SignupPage(page);
    const accountPage = new AccountPage(page);

    // Generate a unique email for registration
    const uniqueEmail = env.generateUniqueEmail();

    // Step 1 & 2: Launch browser and navigate to url
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Step 3: Verify that home page is visible successfully
    await homePage.verifyHomePage();
    
    // Step 4: Click 'Signup / Login' button
    await homePage.clickSignupLogin();
    
    // Step 5: Fill all details in Signup and create account
    await signupPage.verifySignupPage();
    await signupPage.enterUserDetails(env.USER_NAME, uniqueEmail);
    await signupPage.clickSignupButton();
    
    // Prepare address details to use for verification later
    const addressDetails = {
        firstName: env.FIRST_NAME,
        lastName: env.LAST_NAME,
        company: env.COMPANY,
        address: env.ADDRESS1,
        address2: env.ADDRESS2,
        state: env.STATE,
        city: env.CITY,
        zipcode: env.ZIPCODE,
        mobileNumber: env.MOBILE_NUMBER
    };
    
    // Fill account information
    await signupPage.fillAccountDetails({
        password: env.USER_PASSWORD,
        day: env.BIRTH_DAY,
        month: env.BIRTH_MONTH,
        year: env.BIRTH_YEAR
    });
    
    // Fill address information
    await signupPage.fillAddressDetails(addressDetails);
    
    await signupPage.clickCreateAccount();
    
    // Step 6: Verify 'ACCOUNT CREATED!' and click 'Continue' button
    await accountPage.verifyAccountCreated();
    await accountPage.clickContinue();
    
    // Step 7: Verify 'Logged in as username' at top
    await homePage.verifyLoggedIn(env.USER_NAME);
    
    // Step 8: Add products to cart
    await productPage.addFirstProductToCart();
    await productPage.clickContinueShopping();
    await productPage.addSecondProductToCart();
    
    // Step 9: Click 'Cart' button
    await checkoutPage.clickCartButton();
    
    // Step 10: Verify that cart page is displayed
    await checkoutPage.verifyCartPageDisplayed();
    
    // Step 11: Click Proceed To Checkout
    await checkoutPage.clickProceedToCheckout();
    
    // Step 12: Verify that the delivery address is same address filled at the time registration of account
    await checkoutPage.verifyDeliveryAddress(addressDetails);
    
    // Step 13: Verify that the billing address is same address filled at the time registration of account
    await checkoutPage.verifyBillingAddress(addressDetails);
    
    // Step 14: Click 'Delete Account' button
    await homePage.deleteAccount();
    
    // Step 15: Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await accountPage.verifyAccountDeleted();
});