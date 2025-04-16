import { test, expect } from '@playwright/test';
import { TestCasesPage } from '../pages/TestCasesPage';

test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
    // Instantiate the page object for the test cases page
    const testCasesPage = new TestCasesPage(page);

    // Step 2: Navigate to URL
    await page.goto('http://automationexercise.com');
    
    // Step 3: Verify that home page is visible successfully
    await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

    // Step 4: Click on 'Test Cases' button
    await testCasesPage.clickTestCasesButton();

    // Step 5: Verify user is navigated to test cases page successfully
    await testCasesPage.verifyTestCasesPageNavigation();
});
