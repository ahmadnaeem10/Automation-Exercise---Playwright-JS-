import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupPage } from '../pages/SignupPage';
import { AccountPage } from '../pages/AccountPage';
import env from '../utils/env';

test('Test Case 1: Register User', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);
    const accountPage = new AccountPage(page);

    // Generate unique email to avoid registration conflicts
    const uniqueEmail = env.generateUniqueEmail();

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
    await homePage.verifyLoggedIn(env.USER_NAME);
    await homePage.deleteAccount();
    await accountPage.verifyAccountDeleted();
});
