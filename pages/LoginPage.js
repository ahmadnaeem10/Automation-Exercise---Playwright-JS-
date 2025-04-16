import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginHeader = page.getByText('Login to your account');
        this.emailInput = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.passwordInput = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByText('Your email or password is incorrect!');
    }

    async verifyLoginPage() {
        await expect(this.loginHeader).toBeVisible();
    }

    async enterLoginCredentials(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password); //
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async verifyLoginError() {
        await expect(this.errorMessage).toBeVisible();
    }
}
