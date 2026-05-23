import { expect } from '@playwright/test';

class BasePage {
	constructor(page) {
		this.page = page;
	}

	async navigate(url) {
		await this.page.goto(url);
	}

	async click(locator) {
		await this.page.locator(locator).click();
	}

	async type(locator, value) {
		await this.page.locator(locator).fill(value);
	}

	async getText(locator) {
		return await this.page.locator(locator).textContent();
	}

	async isVisible(locator) {
		return await this.page.locator(locator).isVisible();
	}

	async waitForElement(locator) {
		await this.page.locator(locator).waitFor();
	}

	async assertText(locator, expectedText) {
		await expect(this.page.locator(locator)).toHaveText(expectedText);
	}

	async assertVisible(locator) {
		await expect(this.page.locator(locator)).toBeVisible();
	}

	async assertDisabled(locator) {
		await expect(this.page.locator(locator)).toBeDisabled();
	}

	async assertEnabled(locator) {
		await expect(this.page.locator(locator)).toBeEnabled();
	}
}

export default BasePage;