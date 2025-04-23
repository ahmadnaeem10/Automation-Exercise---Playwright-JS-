import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SignupPage } from '../pages/SignupPage';
import { AccountPage } from '../pages/AccountPage';
import env from '../utils/env';

test('Test Case 4: Logout User', async ({ page }) => {
    // Increase timeout for this specific test due to potential site latency
    test.setTimeout(120000);
    
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountPage = new AccountPage(page);
    
    // Generate unique email for registration
    const uniqueEmail = env.generateUniqueEmail();
    const username = env.USER_NAME;
    const password = env.USER_PASSWORD;
    
    console.log('Starting logout test with fresh user registration');
    
    try {
        // 1. Navigate to home page
        await page.goto('/', { timeout: 30000, waitUntil: 'networkidle' });
        console.log('Navigated to homepage');
        
        // 2. Click on 'Signup / Login' button
        await homePage.clickSignupLogin();
        console.log('Clicked signup/login button');
        
        // 3. Verify 'New User Signup!' is visible
        await signupPage.verifySignupPage();
        
        // 4. Enter name and unique email
        await signupPage.enterUserDetails(username, uniqueEmail);
        console.log(`Entered user details with email: ${uniqueEmail}`);
        
        // 5. Click 'Signup' button
        await signupPage.clickSignupButton();
        
        // 6. Fill account details with explicit waits
        await page.waitForSelector('#password', { state: 'visible', timeout: 10000 });
        console.log('Account information form is visible');
        
        await signupPage.fillAccountDetails({
            password: password,
            day: env.BIRTH_DAY,
            month: env.BIRTH_MONTH,
            year: env.BIRTH_YEAR
        });
        
        // 7. Fill address information
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
        console.log('Filled all account details');
        
        // 8. Create account
        await signupPage.clickCreateAccount();
        await accountPage.verifyAccountCreated();
        console.log('Account created successfully');
        
        // 9. Click 'Continue' button with retry logic
        try {
            await accountPage.clickContinue();
        } catch (continueError) {
            console.log('Continue button click failed, trying direct navigation:', continueError.message);
            await page.goto('/');
            await page.waitForLoadState('networkidle');
        }
        
        // 10. Ensure the page has loaded completely and verify user is logged in
        await page.waitForTimeout(2000); // Small wait for page stabilization
        await page.waitForLoadState('networkidle');
        console.log('Verifying user is logged in before attempting to log out');
        
        try {
            await homePage.verifyLoggedIn(username);
            console.log('User is confirmed to be logged in');
            
            // Take screenshot for verification
            await page.screenshot({ path: './test-results/before-logout.png' });
            console.log('Screenshot saved before logout attempt');
            
            // 11. Click 'Logout' button - our enhanced implementation handles all edge cases
            console.log('Attempting to logout');
            await homePage.clickLogout();
            
            // 12. Verify that user is navigated to login page
            console.log('Verifying user is redirected to login page');
            await homePage.verifyLoginPage();
            
            console.log('Logout test completed successfully');
        } catch (error) {
            console.error(`Error during logout verification: ${error.message}`);
            
            // Take failure screenshot
            await page.screenshot({ path: './test-results/logout-failure.png' });
            
            // Force logout via URL for test continuity
            await page.goto('/logout');
            
            // Verify we're on login page or homepage
            const isOnLoginPage = await page.getByRole('heading', { name: 'Login to your account' })
                .isVisible().catch(() => false);
            
            if (isOnLoginPage) {
                console.log('Successfully navigated to login page via direct URL');
            } else {
                // If direct logout navigation didn't work, at least try to get to a known state
                await page.goto('/login');
            }
            
            throw error; // Re-throw to mark the test as failed
        }
    } catch (setupError) {
        console.error(`Test setup failed: ${setupError.message}`);
        await page.screenshot({ path: './test-results/test-setup-failure.png' });
        throw setupError;
    }
});
