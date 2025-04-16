import { test, expect } from '@playwright/test';
import { SubscriptionPage } from '../pages/SubscriptionPage';

test('Test Case 10: Verify Subscription in home page', async ({ page }) => {
    const subscriptionPage = new SubscriptionPage(page);

    // Step 1 & 2: Launch browser and navigate
    await page.goto('/');

    // Step 3: Verify homepage is visible
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

    // Step 4: Scroll to footer
    await subscriptionPage.scrollToFooter();

    // Step 5: Verify 'SUBSCRIPTION' text
    await subscriptionPage.verifySubscriptionTextVisible();

    // Step 6: Enter email and click subscribe
    await subscriptionPage.enterEmailAndSubscribe('testemail@example.com');

    // Step 7: Verify success message
    await subscriptionPage.verifySuccessMessageVisible();
});
