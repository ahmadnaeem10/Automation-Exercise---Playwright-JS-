import { expect } from '@playwright/test';

export class ContactPage {
    constructor(page) {
        this.page = page;
        this.getInTouchHeader = page.getByRole('heading', { name: 'Get In Touch' });
        this.nameInput = page.locator('input[data-qa="name"]');
        this.emailInput = page.locator('input[data-qa="email"]');
        this.subjectInput = page.locator('input[data-qa="subject"]');
        this.messageTextarea = page.locator('textarea[data-qa="message"]');
        this.uploadInput = page.locator('input[type="file"]');
        this.submitButton = page.locator('#contact-us-form > div:nth-child(7) > input');  // Updated to your selector
        this.successMessage = page.locator('div.status.alert.alert-success');
        // Updated Home button selector based on your input
        this.homeButton = page.locator('#form-section > a > span > i');  // New selector
    }

    async verifyContactPageVisible() {
        await expect(this.getInTouchHeader).toBeVisible();
    }

    async fillContactForm({ name, email, subject, message }) {
        await this.page.waitForLoadState('load');
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageTextarea.fill(message);
    }

    async uploadFile(filePath) {
        await this.uploadInput.setInputFiles(filePath);
    }

    async submitFormAndAcceptAlert() {
        await this.page.waitForLoadState('load');
        const promise = this.page.waitForEvent('dialog').then(dialog => dialog.accept()).catch(() => {});
        await this.submitButton.click();
        await promise;
        // Wait until success message is visible before asserting
        await this.page.waitForSelector('div.status.alert.alert-success', { state: 'visible' });
    }

    async verifySuccessMessage() {
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toHaveText('Success! Your details have been submitted successfully.');
    }

    async clickHomeButton() {
        await this.homeButton.click();
    }

    async verifyHomePage() {
        await expect(this.page.locator('img[alt="Website for automation practice"]')).toBeVisible();
    }
}
