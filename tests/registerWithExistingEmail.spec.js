import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';
import env from '../utils/env';

test.describe('Test Case 5: Register User with Existing Email', () => {

  test('Test Case 5: Register User with existing email', async ({ page }) => {
    const signupPage = new SignupPage(page);

    // Step 1 & 2: Launch browser and navigate to baseURL (already handled by baseURL config)
    await page.goto('/');

    // Step 3: Verify that home page is visible successfully
    await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

    // Step 4: Click on 'Signup / Login' button
    await page.getByRole('link', { name: ' Signup / Login' }).click();

    // Step 5: Verify 'New User Signup!' is visible
    await signupPage.verifySignupPage();

    // Step 6: Enter name and already registered email address
    await signupPage.enterUserDetails(env.USER_NAME, env.EXISTING_EMAIL);

    // Step 7: Click 'Signup' button
    await signupPage.clickSignupButton();

    // Step 8: Verify error 'Email Address already exist!' is visible
    const errorMessage = page.getByText('Email Address already exist!');
    await expect(errorMessage).toBeVisible();
  });

});
