import { expect } from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;
        this.signupLoginButton = page.getByRole('link', { name: ' Signup / Login' });
        this.loggedInText = (username) => this.page.locator(`text=Logged in as ${username}`);
        this.deleteAccountButton = page.getByRole('link', { name: 'Delete Account' });
        this.logoutButton = page.getByRole('link', { name: 'Logout' });
    }

    async goto() {
        await this.page.goto('/');
    }

    async clickSignupLogin() {
        await this.signupLoginButton.click();
    }

    async verifyLoggedIn(username) {
        await expect(this.loggedInText(username)).toBeVisible({ timeout: 10000 });
    }

    async deleteAccount() {
        try {
            // Wait for the delete account button to be visible before clicking
            await this.deleteAccountButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.deleteAccountButton.click({ force: true });
        } catch (error) {
            console.log('Delete Account button not clickable or page is closed:', error.message);
            // Optionally, you can throw or just log and continue
        }
    }

    async clickLogout() {
        await this.logoutButton.click();
    }

    async verifyLoginPage() {
        await expect(this.page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    }

    async verifyHomePage() {
        await expect(this.signupLoginButton).toBeVisible();
    }
}
