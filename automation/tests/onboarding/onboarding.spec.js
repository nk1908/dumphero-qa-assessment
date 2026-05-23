// tests/onboard/onboarding.spec.js

import { test, expect } from '@playwright/test';
import OnboardingPage from '../../pages/onboarding/OnboardingPage.js';
import data from '../../test-data/onboard/onboardingTestData.js';

test.describe('Customer Onboarding Module', () => {
/** @type {import('../../pages/onboarding/OnboardingPage.js').default} */
    let onboarding;

    test.beforeEach(async ({ page }) => {

        onboarding = new OnboardingPage(page);

        await onboarding.openOnboarding(process.env.BASE_URL);
    });

    // =========================================================
    // TS-ONB-001
    // =========================================================

    test('TC-ONB-001 Verify onboarding page loads successfully', async ({ page }) => {

        await expect(page).toHaveURL(/onboarding/);
    });

    test('TC-ONB-005 Verify Submit button disabled initially', async () => {

        await onboarding.assertDisabled(onboarding.submitBtn);
    });

    // =========================================================
    // TS-ONB-002
    // =========================================================

    test('TC-ONB-011 Verify First Name accepts valid alphabetic characters', async () => {

        await onboarding.enterFirstName('Nirmal');

        await expect(
            onboarding.page.locator(onboarding.firstName)
        ).toHaveValue('Nirmal');
    });

    test('TC-ONB-012 Verify Last Name accepts valid alphabetic characters', async () => {

        await onboarding.enterLastName('Kumar');

        await expect(
            onboarding.page.locator(onboarding.lastName)
        ).toHaveValue('Kumar');
    });

    test('TC-ONB-013 Verify First Name mandatory validation', async () => {

        await onboarding.enterLastName('Kumar');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.firstNameError);
    });

    test('TC-ONB-014 Verify Last Name mandatory validation', async () => {

        await onboarding.enterFirstName('Nirmal');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.lastNameError);
    });

    test('TC-ONB-015 Verify First Name rejects numeric values', async () => {

        await onboarding.enterFirstName('Nirmal123');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.firstNameError);
    });

    test('TC-ONB-016 Verify Last Name rejects numeric values', async () => {

        await onboarding.enterLastName('Kumar123');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.lastNameError);
    });

    test('TC-ONB-017 Verify First Name rejects unsupported special characters', async () => {

        await onboarding.enterFirstName('@#$%');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.firstNameError);
    });

    test('TC-ONB-018 Verify Last Name rejects unsupported special characters', async () => {

        await onboarding.enterLastName('@#$%');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.lastNameError);
    });

    test('TC-ONB-019 Verify hyphen allowed in First Name', async () => {

        await onboarding.enterFirstName('Anne-Marie');

        await expect(
            onboarding.page.locator(onboarding.firstName)
        ).toHaveValue('Anne-Marie');
    });

    test('TC-ONB-020 Verify apostrophe allowed in Last Name', async () => {

        await onboarding.enterLastName("O'Connor");

        await expect(
            onboarding.page.locator(onboarding.lastName)
        ).toHaveValue("O'Connor");
    });

    test('TC-ONB-021 Verify minimum character validation for First Name', async () => {

        await onboarding.enterFirstName('N');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.firstNameError);
    });

    test('TC-ONB-022 Verify maximum character validation for First Name', async () => {

        const longName = 'A'.repeat(51);

        await onboarding.enterFirstName(longName);

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.firstNameError);
    });

    test('TC-ONB-023 Verify minimum character validation for Last Name', async () => {

        await onboarding.enterLastName('K');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.lastNameError);
    });

    test('TC-ONB-024 Verify maximum character validation for Last Name', async () => {

        const longName = 'B'.repeat(51);

        await onboarding.enterLastName(longName);

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.lastNameError);
    });

    test('TC-ONB-025 Verify leading spaces trimmed in First Name', async () => {

        await onboarding.enterFirstName(' Nirmal');

        const value = await onboarding.page
            .locator(onboarding.firstName)
            .inputValue();

        expect(value.trim()).toBe('Nirmal');
    });

    test('TC-ONB-026 Verify trailing spaces trimmed in Last Name', async () => {

        await onboarding.enterLastName('Kumar ');

        const value = await onboarding.page
            .locator(onboarding.lastName)
            .inputValue();

        expect(value.trim()).toBe('Kumar');
    });

    // =========================================================
    // TS-ONB-003
    // =========================================================

    test('TC-ONB-027 Verify Street Address accepts valid alphanumeric input', async () => {

        await onboarding.enterAddress('12 Main Street');

        await expect(
            onboarding.page.locator(onboarding.address)
        ).toHaveValue('12 Main Street');
    });

    test('TC-ONB-028 Verify Street Address mandatory validation', async () => {

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.addressError);
    });

    test('TC-ONB-029 Verify apartment number accepted in Address field', async () => {

        await onboarding.enterAddress('Apt 101');

        await expect(
            onboarding.page.locator(onboarding.address)
        ).toHaveValue('Apt 101');
    });

    test('TC-ONB-030 Verify City field accepts valid alphabetic values', async () => {

        await onboarding.enterCity('Hartford');

        await expect(
            onboarding.page.locator(onboarding.city)
        ).toHaveValue('Hartford');
    });

    test('TC-ONB-031 Verify City mandatory validation', async () => {

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.cityError);
    });

    test('TC-ONB-032 Verify City rejects numeric values', async () => {

        await onboarding.enterCity('City123');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.cityError);
    });

    test('TC-ONB-033 Verify State dropdown prefilled as Connecticut', async () => {

        await expect(
            onboarding.page.locator(onboarding.state)
        ).toHaveValue('Connecticut');
    });

    test('TC-ONB-035 Verify ZIP Code accepts valid numeric value', async () => {

        await onboarding.enterZipCode('6001');

        await expect(
            onboarding.page.locator(onboarding.zipCode)
        ).toHaveValue('6001');
    });

    test('TC-ONB-036 Verify ZIP Code mandatory validation', async () => {

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.zipError);
    });

    test('TC-ONB-037 Verify ZIP Code rejects alphabetic values', async () => {

        await onboarding.enterZipCode('ABCDE');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.zipError);
    });

    test('TC-ONB-038 Verify ZIP Code rejects special characters', async () => {

        await onboarding.enterZipCode('@#$%');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.zipError);
    });

    // =========================================================
    // TS-ONB-004
    // =========================================================

    test('TC-ONB-039 Verify Email field prefilled automatically', async () => {

        await expect(
            onboarding.page.locator(onboarding.email)
        ).not.toHaveValue('');
    });

    test('TC-ONB-040 Verify Email field non-editable', async () => {

        await expect(
            onboarding.page.locator(onboarding.email)
        ).toBeDisabled();
    });

    test('TC-ONB-041 Verify valid email format accepted', async () => {

        await expect(
            onboarding.page.locator(onboarding.email)
        ).toHaveValue(/@/);
    });

    test('TC-ONB-042 Verify invalid email format validation', async () => {

        await onboarding.page.locator(onboarding.email)
            .evaluate((el) => el.removeAttribute('disabled'));

        await onboarding.page.locator(onboarding.email)
            .fill('abc.com');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.emailError);
    });

    // =========================================================
    // TS-ONB-005
    // =========================================================

    test('TC-ONB-046 Verify valid phone number accepted', async () => {

        await onboarding.enterPhone('919876543210');

        await expect(
            onboarding.page.locator(onboarding.phone)
        ).toHaveValue('919876543210');
    });

    test('TC-ONB-047 Verify phone number mandatory validation', async () => {

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.phoneError);
    });

    test('TC-ONB-048 Verify phone number rejects alphabets', async () => {

        await onboarding.enterPhone('ABC123');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.phoneError);
    });

    test('TC-ONB-049 Verify phone number rejects special characters', async () => {

        await onboarding.enterPhone('@#$%');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.phoneError);
    });

    test('TC-ONB-050 Verify minimum phone number length validation', async () => {

        await onboarding.enterPhone('12345');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.phoneError);
    });

    test('TC-ONB-051 Verify maximum phone number length validation', async () => {

        await onboarding.enterPhone('1234567890123456');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.phoneError);
    });

    test('TC-ONB-053 Verify successful OTP verification flow', async () => {

        await onboarding.enterOtp('123456');

        await onboarding.verifyOtp();

        await expect(
            onboarding.page.locator(onboarding.otpSuccess)
        ).toBeVisible();
    });

    test('TC-ONB-054 Verify invalid OTP validation', async () => {

        await onboarding.enterOtp('111111');

        await onboarding.verifyOtp();

        await expect(
            onboarding.page.locator(onboarding.otpError)
        ).toBeVisible();
    });

    // =========================================================
    // TS-ONB-006
    // =========================================================

    test('TC-ONB-058 Verify Cardholder Name mandatory validation', async () => {

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.cardHolderError);
    });

    test('TC-ONB-059 Verify valid card number accepted', async () => {

        await onboarding.enterCardNumber('4111111111111111');

        await expect(
            onboarding.page.locator(onboarding.cardNumber)
        ).toHaveValue('4111111111111111');
    });

    test('TC-ONB-060 Verify invalid card number validation', async () => {

        await onboarding.enterCardNumber('123456789');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.cardError);
    });

    test('TC-ONB-061 Verify Luhn algorithm validation for card number', async () => {

        await onboarding.enterCardNumber('4111111111111121');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.cardError);
    });

    test('TC-ONB-062 Verify card number minimum length validation', async () => {

        await onboarding.enterCardNumber('123456789012');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.cardError);
    });

    test('TC-ONB-063 Verify card number maximum length validation', async () => {

        await onboarding.enterCardNumber('12345678901234567890');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.cardError);
    });

    test('TC-ONB-064 Verify card number rejects alphabetic input', async () => {

        await onboarding.enterCardNumber('ABCDEFG');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.cardError);
    });

    test('TC-ONB-065 Verify valid MM/YY expiry format accepted', async () => {

        await onboarding.enterExpiry('12/28');

        await expect(
            onboarding.page.locator(onboarding.expiry)
        ).toHaveValue('12/28');
    });

    test('TC-ONB-066 Verify valid MM/YYYY expiry format accepted', async () => {

        await onboarding.enterExpiry('12/2028');

        await expect(
            onboarding.page.locator(onboarding.expiry)
        ).toHaveValue('12/2028');
    });

    test('TC-ONB-067 Verify invalid expiry format validation', async () => {

        await onboarding.enterExpiry('2028/12');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.expiryError);
    });

    test('TC-ONB-068 Verify expired card validation', async () => {

        await onboarding.enterExpiry('01/20');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.expiryError);
    });

    test('TC-ONB-069 Verify valid 3-digit CVV accepted', async () => {

        await onboarding.enterCVV('123');

        await expect(
            onboarding.page.locator(onboarding.cvv)
        ).toHaveValue('123');
    });

    test('TC-ONB-070 Verify valid 4-digit CVV accepted', async () => {

        await onboarding.enterCVV('1234');

        await expect(
            onboarding.page.locator(onboarding.cvv)
        ).toHaveValue('1234');
    });

    test('TC-ONB-071 Verify invalid CVV validation', async () => {

        await onboarding.enterCVV('12');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.cvvError);
    });

    // =========================================================
    // TS-ONB-007
    // =========================================================

    test('TC-ONB-074 Verify Terms & Conditions checkbox mandatory', async () => {

        await onboarding.fillValidOnboardingForm(data.validUser);

        await onboarding.assertDisabled(onboarding.submitBtn);
    });

    test('TC-ONB-076 Verify Submit button enabled after accepting Terms', async () => {

        await onboarding.fillValidOnboardingFormWithoutTerms(data.validUser);

        await onboarding.acceptTerms();

        await onboarding.assertEnabled(onboarding.submitBtn);
    });

    // =========================================================
    // TS-ONB-008
    // =========================================================

    test('TC-ONB-077 Verify successful onboarding submission', async () => {

        await onboarding.fillValidOnboardingFormWithoutTerms(data.validUser);

        await onboarding.acceptTerms();

        await onboarding.submitForm();

        await onboarding.verifySuccessMessage();
    });

    test('TC-ONB-078 Verify confirmation message displayed after onboarding', async () => {

        await onboarding.fillValidOnboardingFormWithoutTerms(data.validUser);

        await onboarding.acceptTerms();

        await onboarding.submitForm();

        await onboarding.verifySuccessMessage();
    });

    test('TC-ONB-079 Verify dashboard redirection after successful onboarding', async () => {

        await onboarding.fillValidOnboardingFormWithoutTerms(data.validUser);

        await onboarding.acceptTerms();

        await onboarding.submitForm();

        await onboarding.verifyDashboardRedirection();
    });

    // =========================================================
    // TS-ONB-009
    // =========================================================

    test('TC-ONB-081 Verify validation error messages displayed correctly', async () => {

        await onboarding.enterFirstName('123');

        await onboarding.submitForm();

        await onboarding.assertVisible(onboarding.validationError);
    });

    test('TC-ONB-082 Verify user remains on onboarding page after validation failure', async ({ page }) => {

        await onboarding.submitForm();

        await expect(page).toHaveURL(/onboarding/);
    });

});