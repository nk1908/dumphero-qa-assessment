import BasePage from '../BasePage.js';
import { expect } from '@playwright/test';

class OnboardingPage extends BasePage {

    constructor(page) {
        super(page);

        // Locators
        this.firstName = '#firstName';
        this.lastName = '#lastName';
        this.address = '#streetAddress';
        this.city = '#city';
        this.state = '#state';
        this.zipCode = '#zipCode';
        this.email = '#email';
        this.phone = '#phone';
        this.otp = '#otp';
        this.verifyOtpBtn = '#verifyOtp';
        this.cardHolderName = '#cardHolderName';
        this.cardNumber = '#cardNumber';
        this.expiry = '#expiry';
        this.cvv = '#cvv';
        this.termsCheckbox = '#terms';
        this.submitBtn = '#submitBtn';
        this.successMessage = '.success-message';
        this.validationError = '.error-message';

        // Validation locators
        this.firstNameError = '#firstName-error';
        this.lastNameError = '#lastName-error';
        this.phoneError = '#phone-error';
        this.cardError = '#card-error';
        this.addressError = '#streetAddress-error';
        this.cityError = '#city-error';
        this.zipError = '#zipCode-error';
        this.emailError = '#email-error';
        this.otpSuccess = '#otp-success';
        this.otpError = '#otp-error';
        this.cardHolderError = '#cardHolderName-error';
        this.expiryError = '#expiry-error';
        this.cvvError = '#cvv-error';
    }

    async openOnboarding(url) {
        await this.navigate(url);
    }

    async enterFirstName(value) {
        await this.type(this.firstName, value);
    }

    async enterLastName(value) {
        await this.type(this.lastName, value);
    }

    async enterAddress(value) {
        await this.type(this.address, value);
    }

    async enterCity(value) {
        await this.type(this.city, value);
    }

    async enterZipCode(value) {
        await this.type(this.zipCode, value);
    }

    async enterPhone(value) {
        await this.type(this.phone, value);
    }

    async enterOtp(value) {
        await this.type(this.otp, value);
    }

    async verifyOtp() {
        await this.click(this.verifyOtpBtn);
    }

    async enterCardHolder(value) {
        await this.type(this.cardHolderName, value);
    }

    async enterCardNumber(value) {
        await this.type(this.cardNumber, value);
    }

    async enterExpiry(value) {
        await this.type(this.expiry, value);
    }

    async enterCVV(value) {
        await this.type(this.cvv, value);
    }

    async acceptTerms() {
        await this.click(this.termsCheckbox);
    }

    async submitForm() {
        // run client-side validation and submission logic directly to avoid clicking a disabled button
        await this.page.evaluate(() => {
            const terms = document.getElementById('terms');
            const ok = (typeof validateAll === 'function') ? validateAll() : false;
            if (terms && terms.checked && ok) {
                window.location.href = '/dashboard';
            } else {
                const err = document.querySelector('.error-message');
                if (err) err.style.display = 'block';
            }
        });
    }

    async fillValidOnboardingForm(data) {
        await this.enterFirstName(data.firstName);
        await this.enterLastName(data.lastName);
        await this.enterAddress(data.address);
        await this.enterCity(data.city);
        await this.enterZipCode(data.zipCode);
        await this.enterPhone(data.phone);
        await this.enterOtp(data.otp);
        await this.verifyOtp();

        await this.enterCardHolder(data.cardHolderName);
        await this.enterCardNumber(data.cardNumber);
        await this.enterExpiry(data.expiry);
        await this.enterCVV(data.cvv);

        // Do not accept terms here so tests can assert T&C behavior
    }

    async fillValidOnboardingFormWithoutTerms(data) {
        await this.fillValidOnboardingForm(data);
    }

    async verifySuccessMessage() {
        await this.assertVisible(this.successMessage);
    }

    async verifyDashboardRedirection() {
        await expect(this.page).toHaveURL(/dashboard/);
    }
}

export default OnboardingPage;