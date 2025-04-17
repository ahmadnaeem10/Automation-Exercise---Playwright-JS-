import { test, expect } from '@playwright/test';
import path from 'path';
import { ContactPage } from '../pages/ContactPage';
import env from '../utils/env';

test('Test Case 6: Contact Us Form', async ({ page }) => {
  const contactPage = new ContactPage(page);

  // Step 1 & 2: Go to base URL
  await page.goto('/', { waitUntil: 'networkidle' });

  // Step 3: Verify homepage
  await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

  // Step 4: Click 'Contact Us'
  await page.getByRole('link', { name: ' Contact us' }).click();

  // Step 5: Verify 'GET IN TOUCH' is visible
  await contactPage.verifyContactPageVisible();

  // Step 6: Fill form using environment variables
  await contactPage.fillContactForm({
    name: env.CONTACT_NAME,
    email: env.CONTACT_EMAIL,
    subject: env.CONTACT_SUBJECT,
    message: env.CONTACT_MESSAGE
  });

  // Step 7: Upload file
  const filePath = path.resolve(__dirname, '../test-data/sample.txt'); // Make sure this file exists
  await contactPage.uploadFile(filePath);

  // Step 8 & 9: Submit and handle alert
  await contactPage.submitFormAndAcceptAlert();

  // Step 10: Verify success message
  await contactPage.verifySuccessMessage();

  // Step 11: Click 'Home' and verify homepage
  await contactPage.clickHomeButton();
  await contactPage.verifyHomePage();
});
