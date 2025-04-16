import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { SignupPage } from '../pages/SignupPage';
import { AccountPage } from '../pages/AccountPage';

test('Test Case 14: Place Order: Register while Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const signupPage = new SignupPage(page);
    const accountPage = new AccountPage(page);

    // Generate a unique email for registration
    const uniqueEmail = `test_user_${Date.now()}@example.com`;
    const username = 'TestUser';

    // Step 1 & 2: Launch browser and navigate to url
    await page.goto('/');
    
    // Step 3: Verify that home page is visible successfully
    await homePage.verifyHomePage();
    
    // Step 4: Add products to cart
    await productPage.addFirstProductToCart();
    await productPage.clickContinueShopping();
    await productPage.addSecondProductToCart();
    
    // Step 5: Click 'Cart' button
    await checkoutPage.clickCartButton();
    
    // Step 6: Verify that cart page is displayed
    await checkoutPage.verifyCartPageDisplayed();
    
    // Step 7: Click Proceed To Checkout
    await checkoutPage.clickProceedToCheckout();
    
    // Step 8: Click 'Register / Login' button
    await checkoutPage.clickRegisterLogin();
    
    // Step 9: Fill all details in Signup and create account
    await signupPage.verifySignupPage();
    await signupPage.enterUserDetails(username, uniqueEmail);
    await signupPage.clickSignupButton();
    
    // Fill account information
    await signupPage.fillAccountDetails({
        password: 'password123',
        day: '1',
        month: '1',
        year: '2000'
    });
    
    // Fill address information
    await signupPage.fillAddressDetails({
        firstName: 'Test',
        lastName: 'User',
        company: 'Test Company',
        address: '123 Test Street',
        address2: 'Apt 456',
        state: 'Test State',
        city: 'Test City',
        zipcode: '12345',
        mobileNumber: '1234567890'
    });
    
    await signupPage.clickCreateAccount();
    
    // Step 10: Verify 'ACCOUNT CREATED!' and click 'Continue' button
    await accountPage.verifyAccountCreated();
    await accountPage.clickContinue();
    
    // Step 11: Verify 'Logged in as username' at top
    await homePage.verifyLoggedIn(username);
    
    // Step 12: Click 'Cart' button
    await checkoutPage.clickCartButton();
    
    // Step 13: Click 'Proceed To Checkout' button
    await checkoutPage.clickProceedToCheckout();
    
    // Step 14: Verify Address Details and Review Your Order
    await checkoutPage.verifyAddressAndOrderDetails();
    
    // Step 15: Enter description in comment text area and click 'Place Order'
    await checkoutPage.enterCommentAndPlaceOrder('This is a test order. Please deliver ASAP.');
    
    // Step 16 & 17: Enter payment details and click 'Pay and Confirm Order'
    await checkoutPage.fillPaymentDetails({
        nameOnCard: 'Test User',
        cardNumber: '4242424242424242',
        cvc: '123',
        expiryMonth: '12',
        expiryYear: '2030'
    });
    await checkoutPage.clickPayAndConfirmOrder();
    
    // Step 18: Verify success message 'Your order has been placed successfully!'
    await checkoutPage.verifyOrderPlacedSuccessfully();
    
    // Step 19: Click 'Delete Account' button
    await homePage.deleteAccount();
    
    // Step 20: Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await accountPage.verifyAccountDeleted();
});