import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import env from '../utils/env';

test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Using a modified version of the existing email to ensure it's invalid
    // Adding 'wrong' prefix to ensure it's different from any valid email
    const wrongEmail = 'wrong_' + env.USER_EMAIL;
    // Adding 'wrong' prefix to ensure it's different from any valid password
    const wrongPassword = 'wrong_' + env.USER_PASSWORD;

    await homePage.goto();
    await homePage.verifyHomePage();

    await homePage.clickSignupLogin();
    await loginPage.verifyLoginPage();

    await loginPage.enterLoginCredentials(wrongEmail, wrongPassword);
    await loginPage.clickLoginButton();

    await loginPage.verifyLoginError();
});
