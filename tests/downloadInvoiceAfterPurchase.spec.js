import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { AccountPage } from '../pages/AccountPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import env from '../utils/env';

// Test Case 24: Download Invoice after purchase order
test('Download Invoice after purchase order', async ({ page }) => {
    // Create page objects
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountPage = new AccountPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Launch browser
    // 2. Navigate to base URL
    await homePage.goto();

    // 3. Verify that home page is visible successfully
    await homePage.verifyHomePage();
    console.log('Home page is visible');

    // 4. Add products to cart
    await productPage.addFirstProductToCart();
    await productPage.clickContinueShopping();
    console.log('First product added to cart');

    // 5. Click 'Cart' button
    await checkoutPage.clickCartButton();
    console.log('Clicked on Cart button');

    // 6. Verify that cart page is displayed
    await checkoutPage.verifyCartPageDisplayed();
    console.log('Cart page is displayed');

    // 7. Click Proceed To Checkout
    await checkoutPage.clickProceedToCheckout();
    console.log('Clicked on Proceed To Checkout');

    // 8. Click 'Register / Login' button
    await checkoutPage.clickRegisterLogin();
    console.log('Clicked on Register / Login');

    // 9. Fill all details in Signup and create account
    // Generate a unique email using the utility function
    const uniqueEmail = env.generateUniqueEmail();
    const username = env.USER_NAME;
    
    // Fill signup details
    await signupPage.enterUserDetails(username, uniqueEmail);
    await signupPage.clickSignupButton();
    console.log('Entered signup details');

    // Fill account information
    await signupPage.fillAccountDetails({
        password: env.USER_PASSWORD,
        day: env.BIRTH_DAY,
        month: env.BIRTH_MONTH,
        year: env.BIRTH_YEAR
    });
    console.log('Filled account information');

    // Fill address information
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
    await signupPage.fillAddressDetails(addressDetails);
    await signupPage.clickCreateAccount();
    console.log('Filled address information and created account');

    // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    await accountPage.verifyAccountCreated();
    await accountPage.clickContinue();
    console.log('Account created and clicked Continue');

    // 11. Verify ' Logged in as username' at top
    await homePage.verifyLoggedIn(username);
    console.log('Verified logged in as username');

    // 12. Click 'Cart' button
    await checkoutPage.clickCartButton();
    console.log('Clicked on Cart button again');

    // 13. Click 'Proceed To Checkout' button
    await checkoutPage.clickProceedToCheckout();
    console.log('Clicked on Proceed To Checkout again');

    // 14. Verify Address Details and Review Your Order
    await checkoutPage.verifyAddressAndOrderDetails();
    await checkoutPage.verifyDeliveryAddress(addressDetails);
    await checkoutPage.verifyBillingAddress(addressDetails);
    console.log('Verified address details and order review');

    // 15. Enter description in comment text area and click 'Place Order'
    await checkoutPage.enterCommentAndPlaceOrder(env.ORDER_COMMENT);
    console.log('Entered comment and placed order');

    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await checkoutPage.fillPaymentDetails({
        nameOnCard: env.CARD_NAME,
        cardNumber: env.CARD_NUMBER,
        cvc: env.CARD_CVC,
        expiryMonth: env.CARD_EXPIRY_MONTH,
        expiryYear: env.CARD_EXPIRY_YEAR
    });
    console.log('Filled payment details');

    // 17. Click 'Pay and Confirm Order' button
    await checkoutPage.clickPayAndConfirmOrder();
    console.log('Clicked on Pay and Confirm Order');

    // 18. Verify success message 'Your order has been placed successfully!'
    await checkoutPage.verifyOrderPlacedSuccessfully();
    console.log('Verified order placed successfully');

    // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully
    const invoiceFilePath = await checkoutPage.downloadInvoice();
    await checkoutPage.verifyInvoiceDownloaded(invoiceFilePath);
    console.log('Downloaded and verified invoice successfully');

    // 20. Click 'Continue' button
    await checkoutPage.clickContinueAfterOrder();
    console.log('Clicked Continue after order');

    // 21. Click 'Delete Account' button
    await homePage.deleteAccount();
    console.log('Clicked Delete Account');

    // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await accountPage.verifyAccountDeleted();
    console.log('Verified account deleted and clicked Continue');
});