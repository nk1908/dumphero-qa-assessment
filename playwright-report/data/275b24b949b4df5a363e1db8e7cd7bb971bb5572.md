# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: onboarding/onboarding.spec.js >> Customer Onboarding Module >> TC-ONB-011 Verify First Name accepts valid alphabetic characters
- Location: automation/tests/onboarding/onboarding.spec.js:36:5

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://your-application-url.com/onboarding
Call log:
  - navigating to "https://your-application-url.com/onboarding", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]: Check if there is a typo in your-application-url.com.
    - generic [ref=e9]: DNS_PROBE_FINISHED_NXDOMAIN
  - button "Reload" [ref=e12] [cursor=pointer]
```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | 
  3  | class BasePage {
  4  | 	constructor(page) {
  5  | 		this.page = page;
  6  | 	}
  7  | 
  8  | 	async navigate(url) {
> 9  | 		await this.page.goto(url);
     |                   ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://your-application-url.com/onboarding
  10 | 	}
  11 | 
  12 | 	async click(locator) {
  13 | 		await this.page.locator(locator).click();
  14 | 	}
  15 | 
  16 | 	async type(locator, value) {
  17 | 		await this.page.locator(locator).fill(value);
  18 | 	}
  19 | 
  20 | 	async getText(locator) {
  21 | 		return await this.page.locator(locator).textContent();
  22 | 	}
  23 | 
  24 | 	async isVisible(locator) {
  25 | 		return await this.page.locator(locator).isVisible();
  26 | 	}
  27 | 
  28 | 	async waitForElement(locator) {
  29 | 		await this.page.locator(locator).waitFor();
  30 | 	}
  31 | 
  32 | 	async assertText(locator, expectedText) {
  33 | 		await expect(this.page.locator(locator)).toHaveText(expectedText);
  34 | 	}
  35 | 
  36 | 	async assertVisible(locator) {
  37 | 		await expect(this.page.locator(locator)).toBeVisible();
  38 | 	}
  39 | 
  40 | 	async assertDisabled(locator) {
  41 | 		await expect(this.page.locator(locator)).toBeDisabled();
  42 | 	}
  43 | 
  44 | 	async assertEnabled(locator) {
  45 | 		await expect(this.page.locator(locator)).toBeEnabled();
  46 | 	}
  47 | }
  48 | 
  49 | export default BasePage;
```