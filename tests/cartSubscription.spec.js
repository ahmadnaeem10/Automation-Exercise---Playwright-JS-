import { test, expect } from '@playwright/test';
import { SubscriptionPage } from '../pages/SubscriptionPage';
import env from '../utils/env';

test('Test Case 11: Verify Subscription in Cart page', async ({ page }) => {
    const subscriptionPage = new SubscriptionPage(page);

    // Step 1 & 2: Launch and navigate
    await page.goto('/');

    // Step 3: Verify homepage is visible
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

    // Step 4: Click on 'Cart' button
    await page.getByRole('link', { name: 'Cart' }).click();

    // Step 5: Scroll to footer
    await subscriptionPage.scrollToFooter();

    // Step 6: Verify 'SUBSCRIPTION' text
    await subscriptionPage.verifySubscriptionTextVisible();

    // Step 7: Enter email and click subscribe
    // Using environment variable for email address
    await subscriptionPage.enterEmailAndSubscribe(env.USER_EMAIL);

    // Step 8: Verify success message
    await subscriptionPage.verifySuccessMessageVisible();
});
