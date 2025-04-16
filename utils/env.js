// Load environment variables from .env file
require('dotenv').config();

// Function to generate a unique email using timestamp
const generateUniqueEmail = () => {
  return `test_user_${Date.now()}@example.com`;
};

// Export environment variables with fallback values
module.exports = {
  // User Registration Data
  USER_NAME: process.env.USER_NAME || 'TestUser',
  USER_EMAIL: process.env.USER_EMAIL || generateUniqueEmail(),
  USER_PASSWORD: process.env.USER_PASSWORD || 'password123',

  // Account Details
  BIRTH_DAY: process.env.BIRTH_DAY || '1',
  BIRTH_MONTH: process.env.BIRTH_MONTH || '1',
  BIRTH_YEAR: process.env.BIRTH_YEAR || '2000',

  // Address Information
  FIRST_NAME: process.env.FIRST_NAME || 'Test',
  LAST_NAME: process.env.LAST_NAME || 'User',
  COMPANY: process.env.COMPANY || 'Test Company',
  ADDRESS1: process.env.ADDRESS1 || '123 Test Street',
  ADDRESS2: process.env.ADDRESS2 || 'Apt 456',
  STATE: process.env.STATE || 'Test State',
  CITY: process.env.CITY || 'Test City',
  ZIPCODE: process.env.ZIPCODE || '12345',
  MOBILE_NUMBER: process.env.MOBILE_NUMBER || '1234567890',

  // Payment Details
  CARD_NAME: process.env.CARD_NAME || 'Test User',
  CARD_NUMBER: process.env.CARD_NUMBER || '4242424242424242',
  CARD_CVC: process.env.CARD_CVC || '123',
  CARD_EXPIRY_MONTH: process.env.CARD_EXPIRY_MONTH || '12',
  CARD_EXPIRY_YEAR: process.env.CARD_EXPIRY_YEAR || '2030',

  // Product Search
  SEARCH_PRODUCT: process.env.SEARCH_PRODUCT || 'Top',

  // Contact Us Form
  CONTACT_NAME: process.env.CONTACT_NAME || 'Ahmad Tester',
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'ahmad@example.com',
  CONTACT_SUBJECT: process.env.CONTACT_SUBJECT || 'Test Subject',
  CONTACT_MESSAGE: process.env.CONTACT_MESSAGE || 'This is a test message for the contact form.',

  // Existing User Email (for negative tests)
  EXISTING_EMAIL: process.env.EXISTING_EMAIL || 'testuser@example.com',

  // Order Comment
  ORDER_COMMENT: process.env.ORDER_COMMENT || 'This is a test order. Please deliver ASAP.',
  
  // Generate unique email
  generateUniqueEmail
};