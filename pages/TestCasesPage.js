import { expect } from '@playwright/test';

export class TestCasesPage {
    constructor(page) {
        this.page = page;
        // Using the provided full selector to target the "Test Cases" button
        this.testCasesButton = page.getByRole('button', { name: 'Test Cases' });
        this.pageTitle = page.locator('h2.page-title');
    }

    async verifyTestCasesPageVisible() {
        // This ensures the page title is visible
        await expect(this.pageTitle).toBeVisible();
    }

    async clickTestCasesButton() {
        // Clicking on the "Test Cases" button
        await this.testCasesButton.click();
    }

    async verifyTestCasesPageNavigation() {
        // Verifying the URL to ensure correct navigation using relative path
        await expect(this.page).toHaveURL(/.*\/test_cases/);
    }
}
