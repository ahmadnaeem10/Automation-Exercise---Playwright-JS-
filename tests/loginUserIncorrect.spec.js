import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.verifyHomePage();

    await homePage.clickSignupLogin();
    await loginPage.verifyLoginPage();

    await loginPage.enterLoginCredentials('wrongemail@test.com', 'wrongpassword');
    await loginPage.clickLoginButton();

    await loginPage.verifyLoginError();
});
