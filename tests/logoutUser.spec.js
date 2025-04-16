import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

test('Test Case 4: Logout User', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.clickSignupLogin();
    await loginPage.verifyLoginPage();

    await loginPage.enterLoginCredentials('ahmadahmad@gmail.com', 'ahmad');
    await loginPage.clickLoginButton();

    await homePage.clickLogout();
    await homePage.verifyLoginPage();
});
