import { expect } from '@playwright/test';

export class SubscriptionPage {
    constructor(page) {
        this.page = page;
        this.subscriptionText = page.locator('h2:has-text("Subscription")');
        this.emailInput = page.locator('#susbscribe_email');
        this.subscribeButton = page.locator('#subscribe'); // Arrow button
        this.successMessage = page.locator('div.alert-success');
    }

    async scrollToFooter() {
        await this.subscriptionText.scrollIntoViewIfNeeded();
    }

    async verifySubscriptionTextVisible() {
        await expect(this.subscriptionText).toBeVisible();
    }

    async enterEmailAndSubscribe(email) {
        await this.emailInput.fill(email);
        await this.subscribeButton.click();
    }

    async verifySuccessMessageVisible() {
        await expect(this.successMessage).toHaveText('You have been successfully subscribed!');
    }
}
