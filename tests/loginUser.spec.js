import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import { SignupPage } from '../pages/SignupPage';
import env from '../utils/env';

test('Test Case 2: Login User with correct email and password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);
    const signupPage = new SignupPage(page);

    // Generate unique email for registration
    const uniqueEmail = env.generateUniqueEmail();
    
    // Register a user first
    await homePage.goto();
    await homePage.clickSignupLogin();
    await signupPage.verifySignupPage();
    await signupPage.enterUserDetails(env.USER_NAME, uniqueEmail);
    await signupPage.clickSignupButton();
    await signupPage.fillAccountDetails({
        password: env.USER_PASSWORD,
        day: env.BIRTH_DAY,
        month: env.BIRTH_MONTH,
        year: env.BIRTH_YEAR
    });
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
    await accountPage.verifyAccountCreated();
    await accountPage.clickContinue();
    await homePage.clickLogout();
    
    // Now test the login with the created user
    await homePage.clickSignupLogin();
    await loginPage.verifyLoginPage();
    await loginPage.enterLoginCredentials(uniqueEmail, env.USER_PASSWORD);
    await loginPage.clickLoginButton();

    await homePage.verifyLoggedIn(env.USER_NAME);
    await homePage.deleteAccount();
    await accountPage.verifyAccountDeleted();
});
