import { expect } from '@playwright/test';

export class SignupPage {
    constructor(page) {
        this.page = page;
        this.nameInput = page.getByRole('textbox', { name: 'Name' });
        this.emailInput = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signupButton = page.getByRole('button', { name: 'Signup' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
        this.dayDropdown = page.locator('#days');
        this.monthDropdown = page.locator('#months');
        this.yearDropdown = page.locator('#years');
        this.newsletterCheckbox = page.getByText('Sign up for our newsletter!');
        this.offersCheckbox = page.getByRole('checkbox', { name: 'Receive special offers from' });
        this.firstNameInput = page.getByRole('textbox', { name: 'First name *' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' });
        this.companyInput = page.getByRole('textbox', { name: 'Company', exact: true });
        this.addressInput = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
        this.address2Input = page.getByRole('textbox', { name: 'Address 2' });
        this.stateInput = page.getByRole('textbox', { name: 'State *' });
        this.cityInput = page.getByRole('textbox', { name: 'City * Zipcode *' });
        this.zipcodeInput = page.locator('#zipcode');
        this.mobileNumberInput = page.getByRole('textbox', { name: 'Mobile Number *' });
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    }

    async verifySignupPage() {
        await expect(this.page.getByText('New User Signup!')).toBeVisible();
    }

    async enterUserDetails(name, email) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
    }

    async clickSignupButton() {
        await this.signupButton.click();
    }

    async fillAccountDetails({ password, day, month, year }) {
        await this.passwordInput.fill(password);
        await this.dayDropdown.selectOption(day);
        await this.monthDropdown.selectOption(month);
        await this.yearDropdown.selectOption(year);
        await this.newsletterCheckbox.click();
        await this.offersCheckbox.check();
    }

    async fillAddressDetails({ firstName, lastName, company, address, address2, state, city, zipcode, mobileNumber }) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.companyInput.fill(company);
        await this.addressInput.fill(address);
        await this.address2Input.fill(address2);
        await this.stateInput.fill(state);
        await this.cityInput.fill(city);
        await this.zipcodeInput.fill(zipcode);
        await this.mobileNumberInput.fill(mobileNumber);
    }

    async clickCreateAccount() {
        await this.createAccountButton.click();
    }
}
