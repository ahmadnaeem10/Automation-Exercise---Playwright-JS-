import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { SignupPage } from '../pages/SignupPage';
import { AccountPage } from '../pages/AccountPage';
import { LoginPage } from '../pages/LoginPage';
import env from '../utils/env';

test('Test Case 15: Place Order: Register before Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const signupPage = new SignupPage(page);
    const accountPage = new AccountPage(page);

    // Generate a unique email for registration
    const uniqueEmail = env.generateUniqueEmail();

    // Step 1 & 2: Launch browser and navigate to url
    await page.goto('/');
    
    // Step 3: Verify that home page is visible successfully
    await homePage.verifyHomePage();
    
    // Step 4: Click 'Signup / Login' button
    await homePage.clickSignupLogin();
    
    // Step 5: Fill all details in Signup and create account
    await signupPage.verifySignupPage();
    await signupPage.enterUserDetails(env.USER_NAME, uniqueEmail);
    await signupPage.clickSignupButton();
    
    // Fill account information
    await signupPage.fillAccountDetails({
        password: env.USER_PASSWORD,
        day: env.BIRTH_DAY,
        month: env.BIRTH_MONTH,
        year: env.BIRTH_YEAR
    });
    
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
    
    // Step 12: Verify Address Details and Review Your Order
    await checkoutPage.verifyAddressAndOrderDetails();
    
    // Step 13: Enter description in comment text area and click 'Place Order'
    await checkoutPage.enterCommentAndPlaceOrder(env.ORDER_COMMENT);
    
    // Step 14 & 15: Enter payment details and click 'Pay and Confirm Order'
    await checkoutPage.fillPaymentDetails({
        nameOnCard: env.CARD_NAME,
        cardNumber: env.CARD_NUMBER,
        cvc: env.CARD_CVC,
        expiryMonth: env.CARD_EXPIRY_MONTH,
        expiryYear: env.CARD_EXPIRY_YEAR
    });
    await checkoutPage.clickPayAndConfirmOrder();
    
    // Step 16: Verify success message 'Your order has been placed successfully!'
    await checkoutPage.verifyOrderPlacedSuccessfully();
    
    // Step 17: Click 'Delete Account' button
    await homePage.deleteAccount();
    
    // Step 18: Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await accountPage.verifyAccountDeleted();
});